import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    const fetchProducts = async () => {
      try {
        const updatedCart = await Promise.all(
          cartData.map(async (item) => {
            const res = await axios.get(
              `https://bodywise-react-backend.onrender.com/products/${item.id}`,
            );

            return {
              ...res.data,
              count: item.count,
              id: item.id,
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

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);

    const simplifiedCart = updatedCart.map((item) => ({
      id: item.id,
      count: item.count,
    }));

    localStorage.setItem("cart", JSON.stringify(simplifiedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateLocalStorage(updatedCart);
  };

  const increaseQty = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, count: item.count + 1 } : item,
    );
    updateLocalStorage(updatedCart);
  };

         const decreaseQty = (index) => {
          const updatedCart = cart.map((item, i) =>
      i === index && item.count > 1 ? { ...item, count: item.count - 1 } : item,
    );
    updateLocalStorage(updatedCart);
  };

           const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.count,
    0,
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
               <img src={`https://bodywise-react-backend.onrender.com/uploads/${item.imageUpload}`}
                  alt={item.title} />

        <div className="cartdetails">
         <h3>{item.title}</h3>
         <p>Price: ₹{item.price}</p>

           <div className="qty">
            <button onClick={() => decreaseQty(index)}>-</button>
              <span>{item.count}</span>
             <button onClick={() => increaseQty(index)}>+</button>
            </div>

               <button className="removebtn"
                    onClick={() => removeItem(index)} > Remove
                  </button>
                    </div>
                    </div>
            ))}
          </div>

          <div className="carttotal">
            <h3>Total: ₹{totalPrice}</h3>

            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
              </div>
        </>
      )}
    </div>
  );
}

export default Cart;
