

import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Orderpage.css";

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.log("User not logged in");
      return;
    }

    axios.get(`https://bodywise-react-backend.onrender.com/my-orders/${user.email}`)
      .then((res) => {
        console.log("USER ORDERS:", res.data); 
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="order-page">
      <div className="order-container">
        <h1>Order History</h1>

        {orders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-card">

              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
               <p>
                <strong>Product:</strong> {order.productName}
              </p>
             <p>
              <strong>Quantity:</strong> {order.quantity}
             </p>
            <p>
             <strong>Total:</strong> ₹{order.total}
            </p>
          <p>
           <strong>Status:</strong> {order.status}
           </p>
                       <p>
                     <strong>Payment:</strong> {order.method}
                     </p>

              <p>
                <strong>Phone:</strong> {order.phone}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.address?.address}, {order.address?.city},{" "}
                {order.address?.state} - {order.address?.pincode}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrderPage;
