

import { useEffect, useState } from "react";
import axios from "axios";
import "./ShopAll.css";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ShopAll() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();

  const categories = ["all", "hair", "body", "health", "sun", "face"];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3, 
    },
  };
  



  useEffect(() => {
    const url = selectedCategory === "all"
        ? "http://localhost:3001/products"
        : `http://localhost:3001/products/search/${selectedCategory}`;


    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  

  return (
    <div>

      
      <div className="carousel-container">
        <Carousel showDots={true}
          responsive={responsive} autoPlay={true}
          autoPlaySpeed={2000} infinite={true} >
          <div className="carouselcard">
            <img className="slide" src="/hairslide1.png" alt="slide1" />
          </div>

          <div className="carouselcard">
            <img className="slide" src="/hairslide2.png" alt="slide2" />
          </div>

          <div className="carouselcard">
            <img className="slide" src="/hairslide3.png" alt="slide3" />
          </div>

          <div className="carouselcard">
            <img className="slide" src="/hairslide4.png" alt="slide4" />
          </div>

           <div className="carouselcard">
            <img className="slide" src="/hairslide5.png" alt="slide5" />
          </div>
        </Carousel>
      </div>

   
      <div className="shop-container">

        
        <div className="sidebar">
          <h3>Categories</h3>

          {categories.map((cat, index) => (
            <p
              key={index}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "Shop All" : cat}
            </p>
          ))}
        </div>

      
        <div className="products">
          {products.length === 0 ? (
            <h2>No products found</h2>
          ) : (
            products.map((item) => (
              <div
                className="shopcard"
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img src={item.imageUpload} alt={item.title} />
                <h4>{item.title}</h4>
                <p>₹{item.price}</p>
                <p> {item.rating}</p>
                <button>Add</button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default ShopAll;