// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Home() {
//   const [products, setProducts] = useState([]);
  

//   const [selectedCategory, setSelectedCategory] = useState("hair");

//   useEffect(() => {
//     const url = selectedCategory
//       ? `${import.meta.env.VITE_API_uRL}/products/search/${selectedCategory}`
//       : `${import.meta.env.VITE_API_uRL}/products`;

//     axios
//       .get(url)
//       .then((res) => 
//       {
//       console.log(res.data);
//       setProducts(res.data);
//   })
//       .catch((err) => console.log(err));
//   }, [selectedCategory]);

//   const navigate = useNavigate();

//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//     },
//   };

//   return (
//     <div className="home">
//       <Carousel showDots={true}responsive={responsive}
//         autoPlay={true} autoPlaySpeed={2000} infinite={true}
//       >
//         <div className="card">
//           <img className="slide" src="slide1.png" alt="slide1" />
//         </div>

//          <div className="card">
//           <img className="slide" src="slide2.png" alt="slide2" />
//          </div>

//           <div className="card">
//             <img className="slide" src="slide3.png" alt="slide3" />
//           </div>

//            <div className="card">
//              <img className="slide" src="slide4.png" alt="slide4" />
//            </div>

//             <div className="card">
//                <img className="slide" src="slide5.png" alt="slide5" />
//             </div>
//            </Carousel>

     
     
//              <div className="bestsellers">
//                 <h1> Best Sellers</h1>
//                <p className="bestSellers">
//                  Browse our best sellers by type of your concerns{" "}
//                  </p>

//         <div className="category-buttons">
//           <button className={`category-btn ${selectedCategory === "hair" ? "active" : ""}`}
//             onClick={() => setSelectedCategory("hair")}>
//             Hair Care
//                 </button>



//           <button className={`category-btn ${selectedCategory === "body" ? "active" : ""}`}
//             onClick={() => setSelectedCategory("body")} >
//                Body Care
//           </button>


//           <button className={`category-btn ${selectedCategory === "health" ? "active" : ""}`}
//             onClick={() => setSelectedCategory("health")} >
//             Health & Fitness
//           </button>

//           <button className={`category-btn ${selectedCategory === "sun" ? "active" : ""}`}
//             onClick={() => setSelectedCategory("sun")} >
//             Sun Shield
//           </button>

//           <button className={`category-btn ${selectedCategory === "face" ? "active" : ""}`}
//            onClick={() => setSelectedCategory("face")} >
//             Face Care
//           </button>
//         </div>

//         <div className="bestgrid">
//           {products.map((product) => (
//             <div key={product._id}
//               onClick={() => navigate(`/product/${product._id}`)}
//             >
//               <img
//                 // src={`http://localhost:3001/uploads/${product.imageUpload}`}
//                 src={product.imageUpload}
//                 alt={product.title} style={{ width: "200px" }}/>
//               <h3>{product.title}</h3>
//                    <p>Price: {product.price}</p>
//                     <p>Rating: {product.rating}</p>
//                       <button>Add to Cart</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="heroimage">
//         <img src="/heroimage.png" alt="heroimage"
//           style={{ width: "100%" }} onClick={() => navigate("/ShopAll")} />
//       </div>

//       <div className="herotext">
//         <h1>Every Body Works Wonder</h1>
//         <p>We work to keep it that way</p>
//       </div>

//          <div className="payment">
//         <h2>Complete your payment using any one of the payment option</h2>
//         <div className="paymenticons">
//           <div>
//             <img src="/amex.png" alt="amex" />
//           </div>

//           <div>
//             <img src="/master.png" alt="master" />
//           </div>

//           <div>
//             <img src="/visa.png" alt="visa" />
//           </div>

//           <div>
//             <img src="/upi.png" alt="upi" />
//           </div>

//           <div>
//             <img src="/gpay.jpg" alt="gpay" />
//           </div>

//           <div>
//             <img src="/netbanking.jpg" alt="net" />
//           </div>

//           <div>
//             <img src="/cash.jpg" alt="cas" />
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Home;






// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("hair");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const url = selectedCategory
//       ? `${import.meta.env.VITE_API_URL}/products/search/${selectedCategory}`
//       : `${import.meta.env.VITE_API_URL}/products`;

//     axios
//       .get(url)
//       .then((res) => {
//         console.log("API RESPONSE:", res.data);

        
//         if (Array.isArray(res.data)) {
//           setProducts(res.data);
//         } else if (Array.isArray(res.data.products)) {
//           setProducts(res.data.products);
//         } else {
//           setProducts([]); 
//         }
//       })
//       .catch((err) => {
//         console.log("API ERROR:", err);
//         setProducts([]); 
//       });
//   }, [selectedCategory]);

//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//     },
//   };

//   return (
//     <div className="home">
      
//       <Carousel
//         showDots={true}
//         responsive={responsive}
//         autoPlay={true}
//         autoPlaySpeed={2000}
//         infinite={true}
//       >
//         <div className="card">
//           <img className="slide" src="slide1.png" alt="slide1" />
//         </div>
//         <div className="card">
//           <img className="slide" src="slide2.png" alt="slide2" />
//         </div>
//         <div className="card">
//           <img className="slide" src="slide3.png" alt="slide3" />
//         </div>
//         <div className="card">
//           <img className="slide" src="slide4.png" alt="slide4" />
//         </div>
//         <div className="card">
//           <img className="slide" src="slide5.png" alt="slide5" />
//         </div>
//       </Carousel>

      
//       <div className="bestsellers">
//         <h1>Best Sellers</h1>
//         <p className="bestSellers">
//           Browse our best sellers by type of your concerns
//         </p>

//         <div className="category-buttons">
//           {["hair", "body", "health", "sun", "face"].map((cat) => (
//             <button
//               key={cat}
//               className={`category-btn ${
//                 selectedCategory === cat ? "active" : ""
//               }`}
//               onClick={() => setSelectedCategory(cat)}
//             >
//               {cat === "hair" && "Hair Care"}
//               {cat === "body" && "Body Care"}
//               {cat === "health" && "Health & Fitness"}
//               {cat === "sun" && "Sun Shield"}
//               {cat === "face" && "Face Care"}
//             </button>
//           ))}
//         </div>

       
//         <div className="bestgrid">
//           {Array.isArray(products) && products.length > 0 ? (
//             products.map((product) => (
//               <div
//                 key={product._id}
//                 onClick={() => navigate(`/product/${product._id}`)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <img
//                   src={product.imageUpload}
//                   alt={product.title}
//                   style={{ width: "200px" }}
//                 />
//                 <h3>{product.title}</h3>
//                 <p>Price: ₹{product.price}</p>
//                 <p>Rating: {product.rating}</p>
//                 <button>Add to Cart</button>
//               </div>
//             ))
//           ) : (
//             <p>Loading products...</p>
//           )}
//         </div>
//       </div>

 
//       <div className="heroimage">
//         <img
//           src="/heroimage.png"
//           alt="hero"
//           style={{ width: "100%", cursor: "pointer" }}
//           onClick={() => navigate("/ShopAll")}
//         />
//       </div>

//       <div className="herotext">
//         <h1>Every Body Works Wonder</h1>
//         <p>We work to keep it that way</p>
//       </div>

     
//       <div className="payment">
//         <h2>
//           Complete your payment using any one of the payment options
//         </h2>
//         <div className="paymenticons">
//           {[
//             "amex.png",
//             "master.png",
//             "visa.png",
//             "upi.png",
//             "gpay.jpg",
//             "netbanking.jpg",
//             "cash.jpg",
//           ].map((img, i) => (
//             <div key={i}>
//               <img src={`/${img}`} alt={img} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Home;









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

  // ✅ FIX: category mapping (matches DB)
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

    axios
      .get(url)
      .then((res) => {
        console.log("API RESPONSE:", res.data);

        // ✅ Handle both response formats safely
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
      {/* 🔹 Carousel */}
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

      {/* 🔹 Best Sellers */}
      <div className="bestsellers">
        <h1>Best Sellers</h1>
        <p>Browse our best sellers by type of your concerns</p>

        {/* 🔹 Category Buttons */}
        <div className="category-buttons">
          {["hair", "body", "health", "sun", "face"].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
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

        {/* 🔹 Products Grid */}
        <div className="bestgrid">
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={product.imageUpload || "/placeholder.png"}
                  alt={product.title}
                  style={{ width: "200px" }}
                />
                <h3>{product.title}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Rating: {product.rating}</p>
                <button>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>

      {/* 🔹 Hero Section */}
      <div className="heroimage">
        <img
          src="/heroimage.png"
          alt="hero"
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => navigate("/ShopAll")}
        />
      </div>

      <div className="herotext">
        <h1>Every Body Works Wonder</h1>
        <p>We work to keep it that way</p>
      </div>

      {/* 🔹 Payments */}
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