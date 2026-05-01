

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(  `${import.meta.env.VITE_API_URL}/cart/${userId}` );

        
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

    fetchCart();
  }, []);

  
  const removeItem = async (index) => {
    const item = cart[index];

    try {
      await axios.delete( `${import.meta.env.VITE_API_URL}/cart/${item.cartId}`
  );

      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
    } catch (err) {
      console.log(err);
    }
  };

  
  const increaseQty = async (index) => {
    const item = cart[index];

    try {
      const res = await axios.put( `${import.meta.env.VITE_API_URL}/cart/${item.cartId}`,
        {
          count: item.count + 1,
        }
      );

      const updatedCart = cart.map((c, i) =>
        i === index ? { ...c, count: res.data.count } : c
      );

      setCart(updatedCart);
    } catch (err) {
      console.log(err);
    }
  };


  const decreaseQty = async (index) => {
    const item = cart[index];
    if (item.count <= 1) return;

    try {
      const res = await axios.put(  `${import.meta.env.VITE_API_URL}/cart/${item.cartId}`,
        {
          count: item.count - 1,
        }
      );

      const updatedCart = cart.map((c, i) =>
        i === index ? { ...c, count: res.data.count } : c
      );

      setCart(updatedCart);
    } catch (err) {
      console.log(err);
    }
  };


  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.count,
    0
  );

  return (
    <div className="cartpage">
      <h2 className="carttitle">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty</p>
      ) : (
        <>
          <div className="cartcontainer">
            {cart.map((item, index) => (
              <div className="cartcard" key={index}>
                <img src={item.imageUpload} alt={item.title} />

                <div className="cartdetails">
                  <h3>{item.title}</h3>
                  <p>Price: ₹{item.price}</p>

                  <div className="qty">
                    <button onClick={() => decreaseQty(index)}>
                      -
                    </button>
                    <span>{item.count}</span>
                    <button onClick={() => increaseQty(index)}>
                      +
                    </button>
                  </div>

                  <button
                    className="removebtn"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="carttotal">
            <h3>Total: ₹{totalPrice}</h3>

            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;