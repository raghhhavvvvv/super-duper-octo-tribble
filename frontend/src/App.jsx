import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRegister, setIsRegister] = useState(true);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        // REGISTER
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        const newUser = userCredential.user;

        setUser(newUser);

        console.log("Registered user:", newUser);

        alert("Registration successful!");
      } else {
        // LOGIN
        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        const loggedInUser = userCredential.user;

        setUser(loggedInUser);

        console.log("Logged in user:", loggedInUser);

        // Get Firebase ID Token
        const token = await loggedInUser.getIdToken();

        console.log("Firebase ID Token:", token);

        alert("Login successful!");
      }
    } catch (error) {
      console.error("Authentication error:", error);

      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      setUser(null);

      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="container">
      <h1>SIH Project</h1>

      {!user ? (
        <>
          <h2>
            {isRegister ? "Register" : "Login"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <br />
            <br />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <br />
            <br />

            <button type="submit">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <br />

          <button
          className="switch-button"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </>
      ) : (
        <>
          <h2>Welcome!</h2>

          <p>Logged in as: {user.email}</p>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;