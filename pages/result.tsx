import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
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
      await addDoc(collection(db, 'user
