import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", imageUpload);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("rating", rating);

    axios.post("http://localhost:3001/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then(() => {
        alert("Product added successfully");

        navigate("/ManageProduct");

        setTitle("");
        setImageUpload("");
        setCategory("");
        setPrice("");
        setQuantity("");
        setRating("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="main">
        <h2>ADD PRODUCTS</h2>

        <form className="addpro" onSubmit={handleSubmit}>
          <div>
            <label className="wordings">Product Title</label>
            <br />
            <input type="text"placeholder="Enter product title"
              value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>



          <div>
            <label className="wordings">File Upload</label>
            <br />
            <input type="file"
              onChange={(e) => setImageUpload(e.target.files[0])} required />
          </div>

          <div>
            <label className="wordings">Category</label>
            <br />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginBottom: "10px", width: "100%", height: "40px" }}
            >
              <option value="">SELECT</option>
                 <option value="hair">HAIR</option>
                    <option value="bodycare">BODYCARE</option>
                       <option value="face">FACE</option>
                         <option value="sunprotection">SUN PROTECTION</option>
                 </select>
          </div>

          <div>
            <label className="wordings">Price</label>
            <br />
            <input type="number" placeholder="Enter price" value={price}
              onChange={(e) => setPrice(e.target.value)} required/>
          </div>

          <div>
            <label className="wordings">Quantity</label>
            <br />
            <input type="number"
              placeholder="Enter quantity" value={quantity}
              onChange={(e) => setQuantity(e.target.value)}  required/>
          </div>

          <div>
            <label className="wordings">Rating</label>
            <br />
            <input type="number"
              placeholder="Enter rating" value={rating}
              onChange={(e) => setRating(e.target.value)} required />
          </div>

          <button className="addprobtn" type="submit">
            Add Product
              </button>
             </form>
               </div>
    </>
  );
}

export default AddProduct;
