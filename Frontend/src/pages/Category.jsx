import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import "./Category.css";
import { useNavigate } from "react-router-dom";

function Category() {
  const { type } = useParams(); 

  const navigate = useNavigate();
 const responsive = {
    desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
    },
  };

   const [products, setProducts] = useState([]);

  useEffect(() => {axios .get(`${import.meta.env.VITE_API_uRL}/products/category/${type}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [type]);

  return (
    <div className="category-page">
 <Carousel showDots={true}responsive={responsive}
        autoPlay={true} autoPlaySpeed={2000} infinite={true}
      >
        <div className="card">
          <img className="slide" src="/hairslide1.png" alt="slide1" />
        </div>

         <div className="card">
          <img className="slide" src="/hairslide2.png" alt="slide2" />
         </div>

          <div className="card">
            <img className="slide" src="/hairslide3.png" alt="slide3" />
          </div>
 <div className="card">
            <img className="slide" src="/hairslide4.png" alt="slide4" />
          </div>
<div className="card">
            <img className="slide" src="/hairslide5.png" alt="slide5" />
          </div>

          
           </Carousel>
     

    
      <h2>{type.toUpperCase()} PRODUCTS</h2>
      

      <div className="bestgrid">
          {products.map((product) => (
            <div key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                // src={`http://localhost:3001/uploads/${product.imageUpload}`}
                src={product.imageUpload}
                alt={product.title} style={{ width: "200px" }}/>
              <h3>{product.title}</h3>
                   <p>Price: {product.price}</p>
                    <p>Rating: {product.rating}</p>
                      <button>Add to Cart</button>
            </div>
          ))}
        </div>



    </div>
  );
}

export default Category;
