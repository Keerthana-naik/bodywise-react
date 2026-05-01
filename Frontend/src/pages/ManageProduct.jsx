import React from "react";
import "./ManageProduct.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_uRL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm( "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_uRL}/products/${id}`);
      alert("Product deleted successfully");
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <h2>Manage Product</h2>
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        Back
      </button>


      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
             <th>Product Name</th>
              <th>Category</th>
                <th>Price</th>
                 <th>Quantity</th>
                   <th>Rating</th>
                     <th>Actions</th>
                </tr>
              </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img 
                // src={`http://localhost:3001/uploads/${product.imageUpload}`}
                src={product.imageUpload}
                 alt={product.title}
                  style={{ width: "100px" }}  />
              </td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.rating}</td>
              <td>

                <button onClick={() => navigate(`/EditProduct/${product._id}`)}>
                  Edit
                </button>


      <button onClick={() => deleteProduct(product._id)}>
        Delete
  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default ManageProduct;
