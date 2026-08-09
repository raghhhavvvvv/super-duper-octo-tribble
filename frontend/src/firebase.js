// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuaB88LRe7oyQp9jEKv7SheG0O_BK2tt8",
  authDomain: "sih-project-26605.firebaseapp.com",
  projectId: "sih-project-26605",
  storageBucket: "sih-project-26605.firebasestorage.app",
  messagingSenderId: "309878475747",
  appId: "1:309878475747:web:f9f7914142537583066ed6",
  measurementId: "G-JG6JMYCWZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);