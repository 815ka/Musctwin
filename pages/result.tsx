import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { firebaseAuth, db } from '../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function ResultPage() {
  const router = useRouter();
  const { mood, activity, vibe } = router.query;

  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');
  const [savedTracks, setSavedTracks] = useState<any[]>([]);

  useEffect(() => {
    if (!mood || !activity || !vibe) {
      setError('ემოციები არ არის შერჩეული');
      return;
    }
    const filePath = `/tracks/${mood}_${activity}_${vibe}.mp3`;
    setAudioUrl(filePath);
  }, [mood, activity, vibe]);

  const saveTrack = async () => {
    const user = auth.currentUser;
    if (!user || !audioUrl) return alert('შესვლა სავალდებულოა');
    try {
      await addDoc(collection(db, 'users', user.uid, 'tracks'), {
        audioUrl,
        mood,
        activity,
        vibe,
        createdAt: new Date().toISOString(),
      });
      alert('✅ ტრეკი შენახულია');
    } catch (e) {
      console.error(e);
      alert('შეცდომა შენახვისას');
    }
  };

  const loadLibrary = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'tracks'));
    const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSavedTracks(list);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">🎵 შენს ემოციებზე მორგებული მუსიკა</h1>
      {error && <p className="text-red-500">{error}</p>}
      {audioUrl && (
        <div className="flex flex-col items-center gap-4">
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="flex gap-3">
            <button
              onClick={saveTrack}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition"
            >
              💾 შეინახე
            </button>
            <button
              onClick={loadLibrary}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-full"
            >
              📁 ჩემი არქივი
            </button>
          </div>
        </div>
      )}
      {savedTracks.length > 0 && (
        <div className="mt-10 text-left">
          <h2 className="text-xl font-semibold mb-4">📂 შენახული ტრეკები</h2>
          <div className="space-y-4">
            {savedTracks.map((track: any) => (
              <div key={track.id} className="border p-4 rounded-xl shadow bg-white flex flex-col gap-2">
                <p className="text-sm text-gray-500">
                  🕒 {new Date(track.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">🧠 {track.mood} | ⚡ {track.activity} | 🎧 {track.vibe}</p>
                <audio controls className="w-full">
                  <source src={track.audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
