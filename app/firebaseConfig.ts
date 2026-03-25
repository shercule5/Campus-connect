import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQBTJfN7VP8zryLo8C_nSd2lyNo0siT6U",
  authDomain: "campus-connect-eb687.firebaseapp.com",
  projectId: "campus-connect-eb687",
  storageBucket: "campus-connect-eb687.firebasestorage.app",
  messagingSenderId: "672600750032",
  appId: "1:672600750032:web:b5e78e9b87dcfd8f862bd5",
  measurementId: "G-LJSF029HCC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);