
import { useEffect, useState } from "react";
import axios from "axios";
import "./BuildKit.css";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function BuildKit() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("hair");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const navigate = useNavigate();

  const categories = ["hair", "body", "health", "sun", "face"];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
  };

  useEffect(() => {

    const url = `${import.meta.env.VITE_API_URL}/products/search/${selectedCategory}`;
    axios .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  const addToKit = (product) => {

    const exists = selectedProducts.find(
      (item) => item._id === product._id);

    if (exists) {
      setSelectedProducts(
        selectedProducts.filter((item) => item._id !== product._id));

    } else {
        setSelectedProducts([...selectedProducts, product]);
    }
  };

  const totalAmount = selectedProducts.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );

  const handleCheckout = () => {

    if (selectedProducts.length < 2) {
      alert("Please add minimum 2 products to create a kit");
      return;
    }
    localStorage.setItem( "buildYourKit", JSON.stringify(selectedProducts)
    );
    navigate("/checkout");
  };

  return (
    <div>
      <div className="carousel-container">

        <Carousel showDots={true}
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}
        >

          <div className="carouselcard">
            <img className="slide" src="/hairslide1.png" alt="slide1" />
          </div>

          <div className="carouselcard">
            <img className="slide" src="/hairslide2.png" alt="slide2" />
          </div>

          <div className="carouselcard">
            <img className="slide" src="/hairslide3.png" alt="slide3" />
          </div>

        </Carousel>

      </div>

      <div className="shop-container">
        <div className="sidebar">
          <h3>Categories</h3>

          {categories.map((cat, index) => (

            <p  key={index}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)} >
              {cat}
            </p>

          ))}

        </div>
        <div className="products">
               {products.length === 0 ? ( <h2>No products found</h2>
          ) : (
            products.map((item) => {
              const isAdded = selectedProducts.find(
                (product) => product._id === item._id );

              return (
                <div className="shopcard" key={item._id}>

                  <img src={item.imageUpload} alt={item.title}
                    onClick={() => navigate(`/product/${item._id}`)} />

                  <h4>{item.title}</h4>
                  <p>₹{item.price}</p>
                  <p>{item.rating}⭐</p>
                  <button
                    className={isAdded ? "added-btn" : "addshop"}
                    onClick={() => addToKit(item)} >
                    {isAdded ? "Added" : "Add"}
                  </button>
                </div>
              );
            })
          )}

        </div>
      </div>

      <div className="kit-bottom-bar">
        <div>
          <h3>{selectedProducts.length} Products Added</h3>
          <p>Add minimum 2 products</p>
          <h2>₹{totalAmount.toFixed(2)}</h2>
        </div>
        <button className="go-cart-btn" onClick={handleCheckout}>
          Go To Cart
        </button>
      </div>
    </div>
  );
}

export default BuildKit;