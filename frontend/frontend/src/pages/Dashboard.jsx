import { useAuthContext } from "../context/AuthContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Dashboard</h2>
        <p className="user-email">{user?.email}</p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;