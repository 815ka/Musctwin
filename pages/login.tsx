import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth, provider } from '../lib/firebase';

export default function LoginPage() {
  const login = async () => {
    try {
      await signInWithPopup(firebaseAuth, provider);
    } catch (e) {
      alert('Login error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to MusicTwin</h1>
        <button onClick={login} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
