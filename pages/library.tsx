import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function LibraryPage() {
  const [tracks, setTracks] = useState<any[]>([]);
  useEffect(() => {
    const fetchTracks = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'tracks'));
      setTracks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTracks();
  }, []);
  return (
    <div className="p-6">
      <h1>📚 ჩემი არქივი</h1>
      {tracks.map(track => (
        <div key={track.id} className="mb-4">
          <p><strong>{track.mood}</strong> • {track.activity} • {track.vibe}</p>
          <audio controls src={track.audioUrl} />
        </div>
      ))}
    </div>
  );
}