import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export default function ResultPage() {
  const [audioUrl] = useState("/example.mp3");
  const [moodData] = useState({ mood: "Happy", activity: "Work", vibe: "Chill" });
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const saveTrack = async () => {
    const user = auth.currentUser;
    if (!user || !audioUrl || !moodData) return alert("შესვლაა საჭირო ტრეკის შესანახად");
    try {
      await addDoc(collection(db, 'users', user.uid, 'tracks'), {
        audioUrl,
        ...moodData,
        createdAt: new Date().toISOString(),
      });
      const pubRef = await addDoc(collection(db, 'tracks'), {
        audioUrl,
        ...moodData,
        createdAt: new Date().toISOString(),
      });
      const link = `${window.location.origin}/track/${pubRef.id}`;
      setShareUrl(link);
      navigator.clipboard.writeText(link);
      alert("ბმული დაკოპირდა! 🎉");
    } catch (e) {
      alert("შეცდომა ტრეკის შენახვისას");
    }
  };

  return (
    <div className="p-6">
      <h1>შენი AI მუსიკა</h1>
      <audio src={audioUrl} controls className="my-4" />
      <button onClick={saveTrack}>💾 შეინახე და გააზიარე</button>
      {shareUrl && <p>🔗 ბმული: <a href={shareUrl}>{shareUrl}</a></p>}
    </div>
  );
}