// pages/index.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [mood, setMood] = useState('');
  const [activity, setActivity] = useState('');
  const [vibe, setVibe] = useState('');
  const router = useRouter();

  const generateMusic = () => {
    if (!mood || !activity || !vibe) {
      alert('გთხოვ შეავსე ყველა ველი');
      return;
    }
    router.push(`/result?mood=${mood}&activity=${activity}&vibe=${vibe}`);
  };

  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">🎵 MusicTwin</h1>
      <p className="mb-4">აირჩიე შენი ემოციები და შეიქმნება შენზე მორგებული მუსიკა</p>

      <div className="mb-4">
        <label className="block mb-1">🧠 ემოცია (Mood):</label>
        <select value={mood} onChange={e => setMood(e.target.value)} className="w-full border rounded p-2">
          <option value="">აირჩიე</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="energetic">Energetic</option>
          <option value="calm">Calm</option>
          <option value="angry">Angry</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">⚡ აქტივობა (Activity):</label>
        <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full border rounded p-2">
          <option value="">აირჩიე</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="relax">Relax</option>
          <option value="gym">Gym</option>
          <option value="focus">Focus</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1">🎧 სტილი (Vibe):</label>
        <select value={vibe} onChange={e => setVibe(e.target.value)} className="w-full border rounded p-2">
          <option value="">აირჩიე</option>
          <option value="lofi">Lofi</option>
          <option value="ambient">Ambient</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="classical">Classical</option>
        </select>
      </div>

      <button
        onClick={generateMusic}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        ▶️ გაუშვი მუსიკა
      </button>
    </div>
  );
}
