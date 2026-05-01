

import React, { useState, useEffect } from "react";
import "./Payment.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [method, setMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cart, setCart] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const address = JSON.parse(localStorage.getItem("address"));

  const navigate = useNavigate();

  
  useEffect(() => {
    const buyNowData = JSON.parse(localStorage.getItem("buyNow"));


    if (buyNowData) {
      setCart(buyNowData);
      return;
    }

    
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    axios .get(`http://localhost:3001/cart/${userId}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    if (!user) {
      alert("Login required!");
      navigate("/");
    }
  }, []);

  const handlePayment = async () => {
    if (!method) {
      alert("Please select payment method");
      return;
    }

    if (!address) {
      alert("Address not found");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      let totalAmount = 0;

      for (let item of cart) {
        const product = item.productId;
        totalAmount += product.price * item.count;
      }

     
      if (method === "cod" || method === "upi") {
        for (let item of cart) {
          const product = item.productId;

          const paymentData = {
            productId: product._id,
            productName: product.title,
            quantity: item.count,
            total: product.price * item.count,
            phone: address.phone,
            address,
            method,
            upiId: method === "upi" ? upiId : "",
            email: user?.email,
          };

          await axios.post("http://localhost:3001/payment", paymentData);
        }

        alert("Order placed successfully");

        await axios.delete(
          `http://localhost:3001/cart/user/${localStorage.getItem("userId")}`
        );

        
        localStorage.removeItem("buyNow");

        localStorage.removeItem("address");
        navigate("/");
      }

      
      if (method === "razorpay") {
        const orderRes = await axios.post(
          "http://localhost:3001/create-order",
          { amount: totalAmount }
        );

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderRes.data.amount,
          currency: "INR",
          name: "My Shop",
          description: "Order Payment",
          order_id: orderRes.data.id,

          handler: async function (response) {
            try {
              const verifyRes = await axios.post(
                "http://localhost:3001/verify-payment",
                {
                  razorpay_order_id: orderRes.data.id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }
              );

              if (verifyRes.data.success) {
                for (let item of cart) {
                  const product = item.productId;

                  const paymentData = {
                    productId: product._id,
                    productName: product.title,
                    quantity: item.count,
                    total: product.price * item.count,
                    phone: address.phone,
                    address,
                    method: "razorpay",
                    paymentId: response.razorpay_payment_id,
                    email: user?.email,
                  };

                  await axios.post( "http://localhost:3001/payment",
                    paymentData
                  );
                }

                alert("Payment Successful & Verified");

                await axios.delete(
                  `http://localhost:3001/cart/user/${localStorage.getItem("userId")}`
                );

              
                localStorage.removeItem("buyNow");

                localStorage.removeItem("address");
                navigate("/");
              } else {
                alert("Payment verification failed");
              }
            } catch (err) {
              console.log(err);
              alert("Error verifying payment");
            }
          },

          prefill: {
            name: user?.name,
            email: user?.email,
            contact: address.phone,
          },

          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.log(error);
      alert("Error placing order");
    }
  };

  return (
    <div className="paymentpage">
      <h2>Payment</h2>

      <h3>Address</h3>
      {address ? (
        <div className="address-box">
          <p>{address.name}</p>
          <p>{address.address}</p>
          <p>{address.city}</p>
          <p>{address.pincode}</p>
        </div>
      ) : (
        <p>No address found</p>
      )}

      <div className="paymentoption">
        <input
          type="radio"
          name="payment"
          value="cod"
          onChange={(e) => setMethod(e.target.value)}
        />
        <label>Cash on Delivery</label>
      </div>

      <div className="paymentoption">
        <input
          type="radio"
          name="payment"
          value="razorpay"
          onChange={(e) => setMethod(e.target.value)}
        />
        <label>Razorpay</label>
      </div>

      <div className="paymentoption">
        <input
          type="radio"
          name="payment"
          value="upi"
          onChange={(e) => setMethod(e.target.value)}
        />
        <label>UPI</label>
      </div>

      {method === "upi" && (
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="upiinput"
        />
      )}

      <button className="paybutton" onClick={handlePayment}>
        Place Order
      </button>
    </div>
  );
}

export default Payment;