
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("hair");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const categoryMap = {
    hair: "hair",
    body: "bodycare",
    health: "health",
    sun: "sun",
    face: "face",
  };

  useEffect(() => {
    const category = categoryMap[selectedCategory];

    const url = `${import.meta.env.VITE_API_URL}/products/search/${category}`;

    setLoading(true);
console.log("API URL:", import.meta.env.VITE_API_URL);
    axios.get(url)
      .then((res) => {
        console.log("API RESPONSE:", res.data);

        
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          setProducts([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        setProducts([]);
        setLoading(false);
      });
  }, [selectedCategory]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
  };

  return (
    <div className="home">
     
      <Carousel
        showDots
         responsive={responsive}
        autoPlay
        autoPlaySpeed={2000}
        infinite
      >
        {["slide1.png", "slide2.png", "slide3.png", "slide4.png", "slide5.png"].map((img, i) => (
          <div className="card" key={i}>
            <img className="slide" src={img} alt={img} />
          </div>
        ))}
      </Carousel>

      
      <div className="bestsellers">
        <h1>Best Sellers</h1>
        
        <div className="category-buttons">
          {["hair", "body", "health", "sun", "face"].map((cat) => (
            <button key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active" : ""  }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "hair" && "Hair Care"}
              {cat === "body" && "Body Care"}
              {cat === "health" && "Health & Fitness"}
              {cat === "sun" && "Sun Shield"}
              {cat === "face" && "Face Care"}
            </button>
          ))}
        </div>

        <div className="bestgrid">
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                style={{ cursor: "pointer" }} >
                <img
                  src={product.imageUpload || "/placeholder.png"}
                  alt={product.title}
                  style={{ width: "200px" }} />
                <h3>{product.title}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Rating: {product.rating}⭐</p>
                <button>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>

      
      <div className="heroimage">
        <img  src="/heroimage.png"  alt="hero"
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => navigate("/ShopAll")} />
      </div>

      <div className="herotext">
        <h1>Every Body Works Wonder</h1>
        
      </div>

      <div className="payment">
        <h2>Complete your payment using any option</h2>
        <div className="paymenticons">
          {[
            "amex.png",
            "master.png",
            "visa.png",
            "upi.png",
            "gpay.jpg",
            "netbanking.jpg",
            "cash.jpg",
          ].map((img, i) => (
            <div key={i}>
              <img src={`/${img}`} alt={img} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;