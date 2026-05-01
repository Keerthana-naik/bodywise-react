

import { Navigate, Outlet } from "react-router-dom";

function AdminProtectRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  const justLoggedOut = localStorage.getItem("justLoggedOut");

  if (!user?.isAdmin) {

    if (justLoggedOut === "true") {
      localStorage.removeItem("justLoggedOut"); 
      return <Navigate to="/" />;
    }

    
    alert("Access Denied! Admins only.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default AdminProtectRoute;