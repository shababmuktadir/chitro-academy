import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBX61T_qW7-_81j2dqaxz2Uhdpfsjx22k",
  authDomain: "chitro-academy.firebaseapp.com",
  projectId: "chitro-academy",
  storageBucket: "chitro-academy.appspot.com",
  messagingSenderId: "341190732597",
  appId: "1:341190732597:web:ef28465aa6d18ee3093a7c",
};

// Init app
const app = initializeApp(firebaseConfig);

// AUTH
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();