
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  LineChart, 
  Line, 
  XAxis,
   YAxis, 
   Tooltip, 
   CartesianGrid,
  BarChart, 
  Bar
} from "recharts";
import "./Dashboard.css";

function Dashboard() {

  const [data, setData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalSales: 0,
    totalPayments: 0,
    salesData: [],
    signupData: [],
    paymentData: []
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`)
      .then(res => {
        console.log("API DATA:", res.data);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="admin-layout">

      
      <div className="sidebar">
        <Link to="/AddProduct" className="sidebtn">Add Products</Link>
        <Link to="/ManageProduct" className="sidebtn">Manage Products</Link>
        <Link to="/ManageOrder" className="sidebtn">Manage Orders</Link>
      </div>

     
      <div className="main-content">

        <h1 className="dashboard-title">Admin Dashboard</h1>

    
        <div className="dashcards">
          <div className="dashcard">Total Sales ₹ {data.totalSales}</div>
              <div className="dashcard">Total Payments ₹ {data.totalPayments}</div>
                    <div className="dashcard">Total Users {data.totalUsers}</div>
                       <div className="dashcard">Total Orders {data.totalOrders}</div>
        </div>

      
        <div className="charts">

         
          <div className="chart-box">
            <h3>Sales Trend</h3>
            <LineChart width={400} height={300} data={data.salesData || []}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </div>

         
          <div className="chart-box">
            <h3>Orders Overview</h3>
            <BarChart width={400} height={300} data={data.salesData || []}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </div>

        
          <div className="chart-box">
            <h3>Signup Growth</h3>
            <LineChart width={400} height={300} data={data.signupData || []}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="blue" />
            </LineChart>
          </div>

          
          <div className="chart-box">
            <h3>Payment Overview</h3>
            <BarChart width={400} height={300} data={data.paymentData || []}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#ff7300" />
            </BarChart>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;