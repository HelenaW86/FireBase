import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCQPNBxtdhn4a9Z4CmPcKG21SNcWtYvlUc',
  authDomain: 'practice-61678.firebaseapp.com',
  projectId: 'practice-61678',
  storageBucket: 'practice-61678.appspot.com',
  messagingSenderId: '979368100328',
  appId: '1:979368100328:web:593d613c4c847a6479a45d',
  measurementId: 'G-T4JP5ND2Y3'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);