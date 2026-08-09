import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserLocalPersistence,
  browserPopupRedirectResolver,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKzVi2EC69alhciYzL8xLNynbe91T5Kh4",
  authDomain: "sih-project-b7abb.firebaseapp.com",
  projectId: "sih-project-b7abb",
  storageBucket: "sih-project-b7abb.firebasestorage.app",
  messagingSenderId: "829367765166",
  appId: "1:829367765166:web:f3748655bff717f3b3053f",
};

const app = initializeApp(firebaseConfig);

// localStorage avoids @firebase/auth 1.13.4 IndexedDB bug with popups
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});
