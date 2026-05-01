

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Checkout.css";

// function Checkout() {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

 
//   useEffect(() => {
//     const buyNowData = JSON.parse(localStorage.getItem("buyNow"));

    
//     if (buyNowData) {
//       setCart(buyNowData);
//       return;
//     }

  
//     const userId = localStorage.getItem("userId");

//     if (!userId) return;

//     axios.get(`${import.meta.env.VITE_API_URL}/cart/${userId}`)
//       .then((res) => {
//         setCart(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);


  

//     const GST_RATE = 0.18; 
    
//   const totalPrice = cart.reduce((total, item) => {
//   const price = Number(item.productId?.price || 0);
//   const gst = price * GST_RATE;
//   return total + (price + gst) * item.count;
// }, 0);



//   return (
//     <div className="checkout-page">
//       <h2>Checkout</h2>

//       <div className="checkout-container">
//         <div className="checkout-form">
//           <h3>Delivery Details</h3>

//           <p>Click below to add address</p>

//           <button onClick={() => navigate("/address")}>
//             Place Order
//           </button>
//         </div>

//         <div className="checkout-summary">
//           <h3>Order Summary</h3>

       

//           {cart.map((item, index) => {
//   const product = item.productId;
//   if (!product) return null;

//   const price = Number(product.price);
//   const gstAmount = price * GST_RATE;
//   const finalPrice = price + gstAmount; 

//   return (
//     <div key={index} className="summary-item">
//       <p><strong>{product.title}</strong></p>

//       GST details
//       <p>Price: ₹{price}</p>
//       <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>

//       Final price 
//       <p>
//         ₹{finalPrice.toFixed(2)} × {item.count}
//            </p>
//          </div> 
//   );
// })} 


//           <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
//         </div>
//            </div>
//            </div>
//   );
// }

// export default Checkout;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const buyNowData = JSON.parse(localStorage.getItem("buyNow"));

    if (buyNowData) {
      setCart(buyNowData);
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/cart/${userId}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const GST_RATE = 0.18;

  // ✅ FIXED TOTAL LOGIC
  const totalPrice = cart.reduce((total, item) => {
    const product = item.productData || item.productId || item;

    const price = Number(product?.price || 0);
    const quantity = item.count || item.quantity || 1;

    const gst = price * GST_RATE;

    return total + (price + gst) * quantity;
  }, 0);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-container">
        <div className="checkout-form">
          <h3>Delivery Details</h3>

          <p>Click below to add address</p>

          <button onClick={() => navigate("/address")}>
            Place Order
          </button>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map((item, index) => {
            const product = item.productData || item.productId || item;
            if (!product) return null;

            const price = Number(product?.price || 0);
            const quantity = item.count || item.quantity || 1;

            const gstAmount = price * GST_RATE;
            const finalPrice = price + gstAmount;

            return (
              <div key={index} className="summary-item">
                <p>
                  <strong>{product?.title || "Product"}</strong>
                </p>

                GST details
                <p>Price: ₹{price}</p>
                <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>

                Final price
                <p>
                  ₹{finalPrice.toFixed(2)} × {quantity}
                </p>
              </div>
            );
          })}

          <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Checkout;