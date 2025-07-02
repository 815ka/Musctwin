import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">🎶 MusicTwin</h1>
      <p className="mb-6">აირჩიე შენი ემოცია და მიიღე მელოდია 🎧</p>
      <Link href="/result?mood=happy&activity=work&vibe=lofi">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition">
          ▶️ დაიწყე
        </button>
      </Link>
    </main>
  );
}
