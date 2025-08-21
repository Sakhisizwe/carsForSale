import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD16xcn1ADmm-aHGGEfhD4B7aRm9KelTe0",
  authDomain: "carsforsaleauth.firebaseapp.com",
  projectId: "carsforsaleauth",
  storageBucket: "carsforsaleauth.firebasestorage.app",
  messagingSenderId: "343310097920",
  appId: "1:343310097920:web:ccf1564b5c7745201f42e5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
