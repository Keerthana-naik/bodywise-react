

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import "./Product.css";

// function Product() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [qty, setQty] = useState(1);

  
//   useEffect(() => {
//     axios .get(`${import.meta.env.VITE_API_URL}/products/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.log(err));
//   }, [id]);


//   const increaseQty = () => setQty(qty + 1);
//   const decreaseQty = () => qty > 1 && setQty(qty - 1);

  
//   const addProduct = async () => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       alert("Please login first");
//       return;
//     }

//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
//         userId: userId,
//         productId: product._id,
//         count: qty, 
//       });

//       alert("Added to cart ");
//       navigate("/Cart");
//     } catch (err) {
//       console.log(err);
//       alert("Error adding to cart");
//     }
//   };

//   const buyNow = () => {
//   const userId = localStorage.getItem("userId");

//   if (!userId) {
//     alert("Please login first");
//     return;
//   }

//   const buyNowItem = {
//     productId: product,
//     count: qty,
//   };

//   localStorage.setItem("buyNow", JSON.stringify([buyNowItem]));

//   navigate("/checkout");
// };

  

//   if (!product) return <h2>Loading...</h2>;

//   return (
//     <div className="details">
//       <img src={product.imageUpload}
//         alt={product.title}
//         className="productimage"  />

//       <h2>{product.title}</h2>
//       <p className="price">Rs.{product.price}</p>
//       <p>Rating {product.rating}</p>

//       <div className="quantity">
//         <button onClick={decreaseQty}>-</button>
//         <span>{qty}</span>
//         <button onClick={increaseQty}>+</button>
//       </div>

//       <div className="btns">
//         <button className="addcart" onClick={addProduct}>
//           Add to Cart
//         </button>

//         <button className="buynow" onClick={buyNow}>
//   Buy Now
// </button>
//       </div>
//     </div>
//   );
// }

// export default Product;








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
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => {
        console.log("PRODUCT RESPONSE:", res.data);

        if (res.data.product) {
          setProduct(res.data.product);
        } else {
          setProduct(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => qty > 1 && setQty(qty - 1);

  const addProduct = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
        userId: userId,
        productId: product._id,
        count: qty,
      });

      alert("Added to cart");
      navigate("/Cart");
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

    const buyNowItem = {
      productId: product._id,
      productData: product,
      count: qty,
    };

    localStorage.setItem("buyNow", JSON.stringify([buyNowItem]));
    navigate("/checkout");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="details">
      <img
        src={product.imageUpload || "/placeholder.png"}
        alt={product.title}
        className="productimage"
      />

      <h2>{product.title}</h2>
      <p className="price">Rs. {product.price}</p>
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

        <button className="buynow" onClick={buyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Product;