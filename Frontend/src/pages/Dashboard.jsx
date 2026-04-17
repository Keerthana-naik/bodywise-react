import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-title">Admin Dashboard</div>
      <p>Welcome to Dashboard</p>
      <div className="dashboardbuttons">
        <div>
          <Link to="/AddProduct" className="dashbtn">   Add Product</Link>
        </div>
        <div>
          <Link to="/ManageProduct" className="dashbtn">  Manage Product </Link>
        </div>
        <div>
          <Link to="/ManageOrder" className="dashbtn"> Manage Order </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
