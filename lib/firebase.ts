// lib/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Firebase Config — .env.local-დან
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
};

// ✅ App Initialization (Avoid Double Init)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Firebase Services
const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ Named exports avoiding duplicate 'auth'
export { app, firebaseAuth, provider, db };
