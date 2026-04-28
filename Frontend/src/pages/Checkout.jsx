
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Checkout.css";

// function Checkout() {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

  
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) return;

//     axios.get(`http://localhost:3001/cart/${userId}`)
//       .then((res) => {
//         setCart(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);


//   const totalPrice = cart.reduce(
//     (total, item) =>
//       total + Number(item.productId?.price || 0) * item.count,
//     0
//   );

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
//             const product = item.productId;

//             if (!product) return null;

//             return (
//               <div key={index} className="summary-item">
//                 <p>{product.title}</p>
//                 <p>
//                   ₹{product.price} × {item.count}
//                 </p>
//               </div>
//             );
//           })}

//           <h2>Total: ₹{totalPrice}</h2>
//         </div>
//       </div>
//     </div>
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

  // ✅ SINGLE useEffect (handles both Buy Now + Cart)
  useEffect(() => {
    const buyNowData = JSON.parse(localStorage.getItem("buyNow"));

    // 🔥 PRIORITY: BUY NOW
    if (buyNowData) {
      setCart(buyNowData);
      return;
    }

    // 🔵 OTHERWISE: FETCH FROM DB
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    axios
      .get(`http://localhost:3001/cart/${userId}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ TOTAL CALCULATION (works for both cases)
  // const totalPrice = cart.reduce(
  //   (total, item) =>
  //     total + Number(item.productId?.price || 0) * item.count,
  //   0
  // );

    const GST_RATE = 0.18; // 18%
    
  const totalPrice = cart.reduce((total, item) => {
  const price = Number(item.productId?.price || 0);
  const gst = price * GST_RATE;
  return total + (price + gst) * item.count;
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

          {/* {cart.map((item, index) => {
            const product = item.productId;

            if (!product) return null;

            return (
              <div key={index} className="summary-item">
                <p>{product.title}</p>
                <p>
                  ₹{product.price} × {item.count}
                </p>
              </div>
            );
          })} */}


          {cart.map((item, index) => {
  const product = item.productId;
  if (!product) return null;

  const price = Number(product.price);
  const gstAmount = price * GST_RATE;
  const finalPrice = price + gstAmount; 

  return (
    <div key={index} className="summary-item">
      <p><strong>{product.title}</strong></p>

      GST details
      <p>Price: ₹{price}</p>
      <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>

      Final price 
      <p>
        ₹{finalPrice.toFixed(2)} × {item.count}
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