

import "./auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login({ closeModal }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

 
    if (email === "admin@gmail.com" && password === "admin") {

     
      localStorage.setItem("user", JSON.stringify({
  name: "Admin",
  email: email,
  isAdmin: true,
}));
        
      navigate("/dashboard");
      closeModal();
      return;
    }

    
    axios.post("https://bodywise-react-backend.onrender.com/login", { email, password })
      .then((result) => {
        console.log("Response:", result.data);

        
        if (result.data && result.data.email) {

          
          localStorage.setItem("user", JSON.stringify({
  ...result.data,
  isAdmin: false
}));

          closeModal();
          navigate("/");
          alert("Login Successful");

        } else {
          alert("No record found");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal">
      <div className="auth-box">
        <span className="close-btn" onClick={closeModal}>
          ×
        </span>

        <h2>Sign In</h2>
        <p className="sub-text">Welcome back to Bodywise</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email"required 
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" placeholder="Enter your password"
            required value={password}onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
