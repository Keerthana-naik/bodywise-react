import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageOrder.css";

function ManageOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_uRL}/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  const updateStatus = (id, status) => {
    axios .put(`${import.meta.env.VITE_API_uRL}/orders/${id}`, { status })
      .then(() => window.location.reload());
  };

  const deleteOrder = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_uRL}/orders/${id}`)
      .then(() => window.location.reload());
  };

  return (
    <div>
      <h2>Manage Order</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
             <th>Product</th>
              <th>Qty</th>
                <th>Total</th>
                  <th>Address</th>
                    <th>Payment</th>
                      <th>Status</th>
                        <th>Actions</th>
                  </tr>
             </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>

              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>₹. {order.total}</td>

              <td>
                {order.address?.address},{order.address?.city},
                {order.address?.state} - {order.address?.pincode}
              </td>

              <td>{order.method}</td>
              <td>{order.status}</td>

              <td>
                <button onClick={() => updateStatus(order._id, "Shipped")}>
                  Shipped
                </button>


                <button onClick={() => updateStatus(order._id, "Delivered")}>
                  Delivered
                </button>


                <button onClick={() => deleteOrder(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageOrder;
