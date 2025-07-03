/* MusicTwin + Firebase Auth + Firestore Track Storage with Modern Design, Auth Pages, and i18n */

// FILE: /lib/firebase.ts

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// თავიდან თავიდან Initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 🟡 აქ პრობლემა იყო: auth ორჯერ გამოცხადდა
const _auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { _auth as auth, provider, db };


// FILE: /pages/result.tsx

import { collection, addDoc } from 'firebase/firestore';
import { _auth, db } from '../lib/firebase';

const saveTrack = async () => {
  const user = auth.currentUser;
  if (!user || !audioUrl || !moodData) return alert("Login is required to save track");
  try {
    await addDoc(collection(db, 'users', user.uid, 'tracks'), {
      audioUrl,
      mood: moodData.mood,
      activity: moodData.activity,
      vibe: moodData.vibe,
      createdAt: new Date().toISOString(),
    });
    alert("Track saved successfully 🔒");
  } catch (e) {
    console.error("Error saving track:", e);
    alert("Error saving track");
  }
};

<button onClick={saveTrack} className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition duration-200 shadow-lg">
  💾 Save Track
</button>

// FILE: /pages/login.tsx

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../lib/firebase';

export default function LoginPage() {
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
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

// FILE: /pages/register.tsx

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Register an Account</h1>
        <p>Google sign-in is used. Go to Login page to register with your Google Account.</p>
      </div>
    </div>
  );
}

// FILE: /pages/_app.tsx

import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);

// FILE: /next-i18next.config.js

module.exports = {
  i18n: {
    locales: ['en', 'ka'],
    defaultLocale: 'en',
  },
};

// FILE: /public/locales/en/common.json
{
  "welcome": "Welcome to MusicTwin",
  "saveTrack": "Save Track",
  "login": "Login",
  "logout": "Logout"
}

// FILE: /public/locales/ka/common.json
{
  "welcome": "მოგესალმებით MusicTwin-ზე",
  "saveTrack": "შეინახე ტრეკი",
  "login": "შესვლა",
  "logout": "გასვლა"
}
