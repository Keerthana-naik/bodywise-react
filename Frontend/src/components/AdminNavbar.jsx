
import { useNavigate } from "react-router-dom";

function AdminNavbar({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("justLoggedOut", "true");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    setUser(null); 
    navigate("/");
  };

  return (
    <div style={{
      background: "#111",
      color: "#fff",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h3>Admin Panel</h3>

      <button
        onClick={handleLogout}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminNavbar;