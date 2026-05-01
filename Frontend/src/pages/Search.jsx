import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Search.css";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const query = params.get("query");

  useEffect(() => {
    let url = `${import.meta.env.VITE_API_uRL}/products`;

    if (query) {
      url = `${import.meta.env.VITE_API_uRL}/products/search/${query}`;
      setSearchKey(query);
    } else if (category) {
      url = `${import.meta.env.VITE_API_uRL}/products/search/${category}`;
    }

    axios  .get(url)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [category, query]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchKey(value);

    if (value === "") {
      navigate("/search");
    } else {
      navigate(`/search?query=${value}`);
    }
  };

  return (
    <div className="Search">
      <input type="text"
        placeholder="Search for Gummies" onChange={handleSearch} value={searchKey} />

      <div className="product-grid">
        {product.map((item) => (
          <div
            key={item._id}
            className="product-card"
            onClick={() => navigate(`/product/${item._id}`)}
          >
            <img
              // src={`http://localhost:3001/uploads/${item.imageUpload}`}
              
               src={item.imageUpload}
              alt={item.title}
            />
                <h4>{item.title}</h4>
                 <p>₹{item.price}</p>
          </div>
        ))}
      </div>

      <h2>Popular searches</h2>
      <div className="PopularButtons">
        <button onClick={() => navigate("/search?query=sunscreen")}>Sunscreen </button>
        <button onClick={() => navigate("/search?query=hairfall")}> Hairfall</button>
        <button onClick={() => navigate("/search?query=acne")}>  Body Acne </button>
        <button onClick={() => navigate("/search?query=under")}>  Underarm odour </button>
        <button onClick={() => navigate("/search?query=heels")}> Cracked Heels </button>
        <button onClick={() => navigate("/search?query=drandruff")}> Dandruff</button>
        <button onClick={() => navigate("/search?query=dry")}>Dry Skin</button>
        <button onClick={() => navigate("/search?query=bodywash")}>  Bodywash</button>
      </div>
      
      
      <h2>Explore Categories</h2>
      <div className="SearchCategories">
        <div
          className="Searchcard"
          onClick={() => navigate("/search?category=sun")} >
             <img src="SunCare.avif" alt="suncare" />
        </div>

        <div className="Searchcard"
          onClick={() => navigate("/search?category=hair")}>
          <img src="Hair.avif" alt="hair" />
        </div>

        <div className="Searchcard"
          onClick={() => navigate("/search?category=face")} >
          <img src="Face.avif" alt="face" />
        </div>

        <div className="Searchcard"
          onClick={() => navigate("/search?category=body")}>
          <img src="Body.avif" alt="body" />
        </div>
      </div>
    </div>
  );
}

export default Search;
