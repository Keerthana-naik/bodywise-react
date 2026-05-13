import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );

        console.log("PRODUCT RESPONSE:", res.data);
        const productData = res.data.product || res.data;

        setProduct(productData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  }; 
  const addProduct = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    if (!product?._id) {
      alert("Product not found");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
        userId,
        productId: product._id,
        count: qty,
      });

      alert("Added to cart");

      navigate("/cart");
    } catch (err) {
      console.log(err);
      alert("Error adding to cart");
    }
  };
  const buyNow = () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    return;
  }

  if (!product?._id) {
    alert("Product not found");
    return;
  }

  const buyNowItem = {
    ...product,
    count: qty,
    productId: product._id,
  };

  
  localStorage.removeItem("buyNow");
  localStorage.setItem(
    "buyNow",
    JSON.stringify([buyNowItem])
  );

  navigate("/checkout");
};
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="details">

      <img src={product?.imageUpload || "/placeholder.png"}
        alt={product?.title || "Product"}
        className="productimage" />
      <h2>{product?.title}</h2>

      <p className="price">
        Rs. {product?.price}
      </p>

      <p>
        Rating: {product?.rating} ⭐
      </p>

      <p>
        Category: {product?.category}
      </p>
      <div className="quantity">
        <button onClick={decreaseQty}>
          -
        </button>

        <span>{qty}</span>

        <button onClick={increaseQty}>
          +
        </button>
      </div>

      <div className="btns">
        <button
          className="addcart"
          onClick={addProduct}>
          Add to Cart
        </button>

        <button
          className="buynow"
          onClick={buyNow} >
          Buy Now
        </button>
      </div>
    </div>
  );
}
export default Product;