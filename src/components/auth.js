import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={signIn}>
        Sign in
      </button>
      <button type="button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <button type="button" onClick={logOut}>
        Sign Out
      </button>
    </div>
  );
};
