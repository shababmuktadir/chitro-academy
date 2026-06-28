import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase/firebase";

// 🔥 GOOGLE LOGIN
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

// 🔥 EMAIL REGISTER
export const registerWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await sendEmailVerification(userCredential.user);

  return userCredential;
};

// 🔥 EMAIL LOGIN
export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// 🔥 LOGOUT
export const logoutUser = async () => {
  return await signOut(auth);
};