
import React, { useState, useEffect } from "react";
import "./Payment.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [method, setMethod] = useState(""); 
  const [cart, setCart] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const address = JSON.parse(localStorage.getItem("address"));

  const navigate = useNavigate();

  const GST_RATE = 0.18;
  const calculateItem = (item) => {
  const price = Number(item?.price || 0);
  const quantity = item.count || 1;
  const subtotal = Math.round(price * quantity);
  const gst = Math.round(subtotal * GST_RATE);
  const total = Math.round(subtotal + gst);

  return {
    product: item, price,quantity, subtotal,gst, total,
  };
};

  useEffect(() => {
    const loadCart = async () => {
      const buyNowData = JSON.parse(localStorage.getItem("buyNow"));

      if (buyNowData) {
        const data = Array.isArray(buyNowData)
          ? buyNowData
          : [buyNowData];

        setCart(data);
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
          productId: item.productId._id, 
        }));

        setCart(updatedCart);
      } catch (err) {
        console.log(err);
      }
    };

    loadCart();
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
  const { total } = calculateItem(item);
  totalAmount += total;
}

totalAmount = Number(totalAmount.toFixed(2));

      if (method === "cod" ) {
const products = cart.map((item) => {

  const { product, quantity, subtotal, gst, total } =
    calculateItem(item);

  return {
  productId: product.productId || product._id,
  productName: product.title,
  quantity,
  subtotal,
  gst,
  total,
};
});

let grandSubtotal = 0;
let grandGST = 0;
let grandTotal = 0;

products.forEach((item) => {
  grandSubtotal += item.subtotal;
  grandGST += item.gst;
  grandTotal += item.total;
});

const paymentData = {
  products,
  grandSubtotal,
  grandGST,
  grandTotal,
  phone: address.phone,
  address,
  method,
  email: user?.email,
};

console.log("Sending:", paymentData);

await axios.post(
  `${import.meta.env.VITE_API_URL}/payment`,
  paymentData
);
        alert("Order placed successfully");
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/cart/user/${localStorage.getItem(
            "userId"
          )}`
        );

        localStorage.removeItem("buyNow");
        localStorage.removeItem("address");

        navigate("/");
      }

      if (method === "razorpay") {
        const orderRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-order`,
          {
            amount: totalAmount, 
          }
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
                `${import.meta.env.VITE_API_URL}/verify-payment`,
                {
                  razorpay_order_id: orderRes.data.id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }
              );

              if (verifyRes.data.success) {
              
const products = cart.map((item) => {

  const { product, quantity, subtotal, gst, total } =
    calculateItem(item);

 
  return {
  productId: product.productId || product._id,
  productName: product.title,
  quantity,
  subtotal,
  gst,
  total,
};
});

let grandSubtotal = 0;
let grandGST = 0;
let grandTotal = 0;

products.forEach((item) => {
  grandSubtotal += item.subtotal;
  grandGST += item.gst;
  grandTotal += item.total;
});

const paymentData = {
  products,

  grandSubtotal,
  grandGST,
  grandTotal,
  phone: address.phone,
  address,
  method: "razorpay",
  paymentId: response.razorpay_payment_id,
  email: user?.email,
};

console.log("Razorpay Save:", paymentData);

await axios.post(
  `${import.meta.env.VITE_API_URL}/payment`,
  paymentData
);
                alert("Payment Successful & Verified");

                await axios.delete(
                  `${import.meta.env.VITE_API_URL}/cart/user/${localStorage.getItem(
                    "userId"
                  )}`
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
        <input type="radio"
          name="payment" value="razorpay"
          onChange={(e) => setMethod(e.target.value)}  />
        <label>Razorpay</label>
      </div>

      <button className="paybutton" onClick={handlePayment}>
        Place Order
      </button>
    </div>
  );
}

export default Payment;