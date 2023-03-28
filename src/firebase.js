import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI8KFHbPhm7_vDiC6pOLvLcI8SUGCVhB4",
  authDomain: "chatapp-544f7.firebaseapp.com",
  projectId: "chatapp-544f7",
  storageBucket: "chatapp-544f7.appspot.com",
  messagingSenderId: "318254009903",
  appId: "1:318254009903:web:fc67142e92d6c0b44bc0da",
  measurementId: "G-W2E4S01B5N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()