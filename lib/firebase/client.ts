import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
// const firebase_app =
//   getApps().length === 0
//     ? initializeApp(firebaseConfig)
//     : getApps().length === 0;

const firebase_app = initializeApp(firebaseConfig);
// const analytics = isSupported ? getAnalytics(firebase_app) : null;
export const db = getFirestore(firebase_app);

//Export function to initialize firebase
export const initFirebase = () => {
  return firebase_app;
};

export const initFireStore = () => {
  return db;
};
