import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
// const firebase_app =
//   getApps().length === 0
//     ? initializeApp(firebaseConfig)
//     : getApps().length === 0;

const firebase_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase_app);
export const db = getFirestore(firebase_app);

//Export function to initialize firebase
export const initFirebase = () => {
  return firebase_app;
};

export const initFireStore = () => {
  return db;
};
