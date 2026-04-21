import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    const fetchProducts = async () => {
      try {
        const updatedCart = await Promise.all(
          cartData.map(async (item) => {
            const res = await axios.get( `http://localhost:3001/products/${item.id}`,);

            return {
              ...res.data,
              count: item.count,
            };
          }),
        );

        setCart(updatedCart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.count,
    0,
  );

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-container">
        <div className="checkout-form">
          <h3>Delivery Details</h3>

          <p>Click below to add address</p>

          <button onClick={() => navigate("/address")}>Place Order</button>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map((item, index) => (
            <div key={index} className="summary-item">
              <p>{item.title}</p>
              <p>
                ₹{item.price} × {item.count}
              </p>
            </div>
          ))}

          <h2>Total: ₹{totalPrice}</h2>
            </div>
            </div>
         </div>
  );
}

export default Checkout;
