
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const GST_RATE = 0.18;

  useEffect(() => {
    const loadCart = async () => {
      const buyNowData = JSON.parse(localStorage.getItem("buyNow"));

if (buyNowData) {

  if (!Array.isArray(buyNowData)) {
    setCart([{ ...buyNowData, count: 1 }]);
  }

  else {
    setCart(buyNowData);
  }

  return;
} 
      const kitData = JSON.parse(localStorage.getItem("buildYourKit"));
      if (kitData && kitData.length > 0) {

        const updatedKit = kitData.map((item) => ({
          ...item,
          count: 1,
        }));

        setCart(updatedKit);
        return;
      }
      
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart/${userId}`
        );

        const updatedCart = res.data.map((item) => ({
          ...item.productId,
          count: item.count,
          cartId: item._id,
        }));
        setCart(updatedCart);

      } catch (err) {
        console.log(err);
      }
    };

    loadCart();
  }, []);


  const calculateItem = (item) => {
  const price = Number(item.price || 0);
  const quantity = item.count || 1;
  const subtotal = Math.round(price * quantity);
  const gst = Math.round(subtotal * GST_RATE);
  const total = Math.round(subtotal + gst);

  return {
    price,
    quantity,
    subtotal,
    gst,
    total,
  };
};
  const grandTotal = cart.reduce((sum, item) => {
    const { total } = calculateItem(item);
    return sum + total;
  }, 0);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-container">

        <div className="checkout-form">
          <h3>Delivery Details</h3>

          <button onClick={() => navigate("/address")}>
            Place Order
          </button>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => {

            const { price, quantity, subtotal, gst, total } =
              calculateItem(item);

            return (
              <div
                key={item.cartId || item._id || item.title}
                className="summary-item"
              >
                <p>
                  <strong>{item.title}</strong>
                </p>
                <p>Price: ₹{price}</p>
                <p>Qty: {quantity}</p>
                <p>Subtotal: ₹{subtotal}</p>
               <p>GST (18%): ₹{gst}</p>
              <strong>Total: ₹{total}</strong>
                <hr />
              </div>
            );
          })}
          
          <h2>Grand Total: ₹{Math.round(grandTotal)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Checkout;