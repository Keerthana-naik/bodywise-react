import React from "react";
import "./EditProduct.css";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => {
        setTitle(res.data.title);
         setCategory(res.data.category);
          setPrice(res.data.price);
           setQuantity(res.data.quantity);
            setRating(res.data.rating);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageUpload);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("rating", rating);

    axios .put(`${import.meta.env.VITE_API_URL}/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Product Updated Successfully");
        navigate("/ManageProduct");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="main-update">
        <h2>UPDATE PRODUCTS</h2>

        <form className="updatepro" onSubmit={handleSubmit}>
          <div>
            <label className="wordings">Product Title</label>
            <br />
            <input
              type="text" placeholder="Enter product title"
              value={title} onChange={(e) => setTitle(e.target.value)}  />
          </div>

          <div>
            <label className="wordings">File Upload</label>
            <br />
            <input
              type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
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
            <input type="number"placeholder="Enter price"
              value={price} onChange={(e) => setPrice(e.target.value)}
              required />
          </div>

          <div>
            <label className="wordings">Quantity</label>
            <br />
            <input type="number" min="1"
              placeholder="Enter quantity"value={quantity}
              onChange={(e) => setQuantity(e.target.value)} required/>
          </div>

          <div>
            <label className="wordings">Rating</label>
            <br />
            <input type="number" min="0"max="5"
              placeholder="Enter rating" value={rating}
              onChange={(e) => setRating(e.target.value)} required/>
          </div>

          <button className="updatebtn" type="submit">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
