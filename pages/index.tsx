import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState<'ka' | 'en' | 'ru'>('ka');
  const [mood, setMood] = useState('');
  const [activity, setActivity] = useState('');
  const [vibe, setVibe] = useState('');

  const translate = {
    ka: {
      title: 'შენი განწყობის მუსიკა',
      mood: 'განწყობა',
      activity: 'აქტივობა',
      vibe: 'ვიბრაცია',
      generate: 'დაწყება'
    },
    en: {
      title: 'Your Mood Music',
      mood: 'Mood',
      activity: 'Activity',
      vibe: 'Vibe',
      generate: 'Generate'
    },
    ru: {
      title: 'Музыка по настроению',
      mood: 'Настроение',
      activity: 'Активность',
      vibe: 'Вайб',
      generate: 'Начать'
    }
  };

  const handleStart = () => {
    if (!mood || !activity || !vibe) return alert('გთხოვ შეავსე ყველა ველი');
    router.push({
      pathname: '/result',
      query: { mood, activity, vibe }
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => setLanguage('ka')}>🇬🇪</button>
        <button onClick={() => setLanguage('en')}>🇬🇧</button>
        <button onClick={() => setLanguage('ru')}>🇷🇺</button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {translate[language].title}
      </h1>

      <div className="mb-4">
        <label className="block mb-1">{translate[language].mood}</label>
        <select
          className="w-full border rounded p-2"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="">--</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="energetic">⚡ Energetic</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">{translate[language].activity}</label>
        <select
          className="w-full border rounded p-2"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value="">--</option>
          <option value="work">💼 Work</option>
          <option value="relax">🛋️ Relax</option>
          <option value="study">📚 Study</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1">{translate[language].vibe}</label>
        <select
          className="w-full border rounded p-2"
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
        >
          <option value="">--</option>
          <option value="lofi">🎧 Lofi</option>
          <option value="pop">🎤 Pop</option>
          <option value="ambient">🌌 Ambient</option>
        </select>
      </div>

      <button
        onClick={handleStart}
        className="bg-blue-600 text-white w-full py-3 rounded-full hover:bg-blue-700"
      >
        {translate[language].generate}
      </button>
    </div>
  );
}
