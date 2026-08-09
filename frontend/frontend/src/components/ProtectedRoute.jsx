import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <h2>Loading...</h2>;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;