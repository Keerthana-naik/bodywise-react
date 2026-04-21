import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => qty > 1 && setQty(qty - 1);

  const addProduct = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const productId = String(product._id || product.id);

    const existingItemIndex = existingCart.findIndex(
      (item) => String(item.id) === productId,
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].count += qty;
    } else {
      existingCart.push({ id: productId, count: qty });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    console.log(existingCart);

    alert("Added to cart");
    navigate("/Cart");
  };

  if (!product) return <h2>Loading...</h2>;
  return (
    <div className="details">
      <img src={`http://localhost:3001/uploads/${product.imageUpload}`}
        alt={product.title} className="productimage"/>
      <h2>{product.title}</h2>
      <p className="price">Rs.{product.price}</p>
      <p>Rating {product.rating}</p>

      <div className="quantity">
        <button onClick={decreaseQty}>-</button>
        <span>{qty}</span>

        <button onClick={increaseQty}>+</button>
      </div>
      <div className="btns">
        <button className="addcart" onClick={addProduct}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default Product;
