// import { useNavigate } from "react-router-dom";

// function AdminNavbar({ setUser }){
//   const navigate = useNavigate();

//   // const handleLogout = () => {
//   //   localStorage.removeItem("user");
//   //   localStorage.removeItem("userId");
//   //   navigate("/");
//   // };
// // const handleLogout = () => {
// //   localStorage.removeItem("user");
// //   localStorage.removeItem("userId");

// //   navigate("/?login=true");
// //   window.location.reload();
// // };
// const handleLogout = () => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("userId");

//   setUser(null); // ✅ IMPORTANT
//   navigate("/");
// };

//   return (
//     <div style={{
//       background: "#111",
//       color: "#fff",
//       padding: "15px",
//       display: "flex",
//       justifyContent: "space-between"
//     }}>
//       <h3>Admin Panel</h3>

//       <button onClick={handleLogout} style={{
//         background: "red",
//         color: "white",
//         border: "none",
//         padding: "8px 12px",
//         cursor: "pointer"
//       }}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default AdminNavbar;

import { useNavigate } from "react-router-dom";

function AdminNavbar({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    setUser(null); // 🔥 instant UI update
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