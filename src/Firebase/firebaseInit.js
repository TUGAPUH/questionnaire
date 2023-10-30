import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const env = process.env;

const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID,
  measurementId: env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
