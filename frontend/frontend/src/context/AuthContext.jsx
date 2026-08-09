import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { auth } from "../firebase/config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingLinkEmail, setPendingLinkEmail] = useState(null);
  const pendingCredential = useRef(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const loginWithGithub = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope("user:email");

    try {
      return await signInWithPopup(auth, provider);
    } catch (err) {
      if (err.code !== "auth/account-exists-with-different-credential") {
        throw err;
      }

      // Firebase allows one account per email and this address already signed
      // up with Google. Hold the GitHub credential until the user clicks again:
      // opening a second popup here would be blocked as it no longer counts as
      // a user gesture.
      pendingCredential.current = GithubAuthProvider.credentialFromError(err);
      setPendingLinkEmail(err.customData?.email ?? "");
      return null;
    }
  };

  // Signs into the original Google account, then attaches the held GitHub
  // credential so either button works from now on.
  const linkGithubToGoogle = async () => {
    const provider = new GoogleAuthProvider();

    if (pendingLinkEmail) {
      provider.setCustomParameters({ login_hint: pendingLinkEmail });
    }

    const result = await signInWithPopup(auth, provider);

    if (pendingCredential.current) {
      await linkWithCredential(result.user, pendingCredential.current);
      pendingCredential.current = null;
    }

    setPendingLinkEmail(null);
    return result;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithGithub,
        pendingLinkEmail,
        linkGithubToGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
