import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/user";
import "../styles/Login.css";

const Login = () => {
  const {
    loginWithGoogle,
    loginWithGithub,
    pendingLinkEmail,
    linkGithubToGoogle,
    user,
    loading,
  } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const syncUser = async () => {
      try {
        await getUser();
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Could not reach the server. Please try again."
        );
      }
    };

    if (!loading && user) {
      syncUser();
    }
  }, [user, loading, navigate]);

  const handleLogin = async (login, provider) => {
    setError("");
    try {
      await login();
    } catch (err) {
      console.error(err);

      if (err.code === "auth/popup-blocked") {
        setError(
          "Your browser blocked the sign-in window. Allow popups for this site, then try again."
        );
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled.");
      } else {
        setError(`${provider} sign-in failed. Please try again.`);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (pendingLinkEmail !== null) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Link your GitHub account</h2>

          <p className="login-note">
            {pendingLinkEmail || "This email"} is already registered with
            Google. Sign in with Google once and GitHub will be linked to it.
          </p>

          {error && <p className="login-error">{error}</p>}

          <button
            className="login-provider-btn"
            onClick={() => handleLogin(linkGithubToGoogle, "Google")}
          >
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>

        {error && <p className="login-error">{error}</p>}

        <button
          className="login-provider-btn"
          onClick={() => handleLogin(loginWithGoogle, "Google")}
        >
          Continue with Google
        </button>

        <button
          className="login-provider-btn github-btn"
          onClick={() => handleLogin(loginWithGithub, "GitHub")}
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
