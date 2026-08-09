import axios from "axios";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getCurrentUser = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

api.interceptors.request.use(async (config) => {
  let user = auth.currentUser;

  if (!user) {
    user = await getCurrentUser();
  }

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
