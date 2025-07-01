import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function TrackPage() {
  const router = useRouter();
  const { id } = router.query;
  const [track, setTrack] = useState<any>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    getDoc(doc(db, 'tracks', id)).then(snap => {
      if (snap.exists()) setTrack(snap.data());
    });
  }, [id]);

  if (!track) return <p>იტვირთება...</p>;

  return (
    <div className="p-6">
      <h1>🎵 გაზიარებული მუსიკა</h1>
      <p><strong>{track.mood}</strong> • {track.activity} • {track.vibe}</p>
      <audio controls src={track.audioUrl} />
    </div>
  );
}