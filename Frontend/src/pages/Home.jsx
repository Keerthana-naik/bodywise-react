import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  

  const [selectedCategory, setSelectedCategory] = useState("hair");

  useEffect(() => {
    const url = selectedCategory
      ? `${import.meta.env.VITE_API_uRL}/products/search/${selectedCategory}`
      : `${import.meta.env.VITE_API_uRL}/products`;

    axios
      .get(url)
      .then((res) => 
      {
      console.log(res.data);
      setProducts(res.data);
  })
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
  };

  return (
    <div className="home">
      <Carousel showDots={true}responsive={responsive}
        autoPlay={true} autoPlaySpeed={2000} infinite={true}
      >
        <div className="card">
          <img className="slide" src="slide1.png" alt="slide1" />
        </div>

         <div className="card">
          <img className="slide" src="slide2.png" alt="slide2" />
         </div>

          <div className="card">
            <img className="slide" src="slide3.png" alt="slide3" />
          </div>

           <div className="card">
             <img className="slide" src="slide4.png" alt="slide4" />
           </div>

            <div className="card">
               <img className="slide" src="slide5.png" alt="slide5" />
            </div>
           </Carousel>

     
     
             <div className="bestsellers">
                <h1> Best Sellers</h1>
               <p className="bestSellers">
                 Browse our best sellers by type of your concerns{" "}
                 </p>

        <div className="category-buttons">
          <button className={`category-btn ${selectedCategory === "hair" ? "active" : ""}`}
            onClick={() => setSelectedCategory("hair")}>
            Hair Care
                </button>



          <button className={`category-btn ${selectedCategory === "body" ? "active" : ""}`}
            onClick={() => setSelectedCategory("body")} >
               Body Care
          </button>


          <button className={`category-btn ${selectedCategory === "health" ? "active" : ""}`}
            onClick={() => setSelectedCategory("health")} >
            Health & Fitness
          </button>

          <button className={`category-btn ${selectedCategory === "sun" ? "active" : ""}`}
            onClick={() => setSelectedCategory("sun")} >
            Sun Shield
          </button>

          <button className={`category-btn ${selectedCategory === "face" ? "active" : ""}`}
           onClick={() => setSelectedCategory("face")} >
            Face Care
          </button>
        </div>

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

      <div className="heroimage">
        <img src="/heroimage.png" alt="heroimage"
          style={{ width: "100%" }} onClick={() => navigate("/ShopAll")} />
      </div>

      <div className="herotext">
        <h1>Every Body Works Wonder</h1>
        <p>We work to keep it that way</p>
      </div>

         <div className="payment">
        <h2>Complete your payment using any one of the payment option</h2>
        <div className="paymenticons">
          <div>
            <img src="/amex.png" alt="amex" />
          </div>

          <div>
            <img src="/master.png" alt="master" />
          </div>

          <div>
            <img src="/visa.png" alt="visa" />
          </div>

          <div>
            <img src="/upi.png" alt="upi" />
          </div>

          <div>
            <img src="/gpay.jpg" alt="gpay" />
          </div>

          <div>
            <img src="/netbanking.jpg" alt="net" />
          </div>

          <div>
            <img src="/cash.jpg" alt="cas" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
