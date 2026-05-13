
import { useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";
import { useState } from "react";

function Signup({ closeModal, openLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
  e.preventDefault();

  axios.post(`${import.meta.env.VITE_API_URL}/register`, { name, email, password })
 
.then((result) => {
  console.log(result);

  if (result.data.status === "success") {
    alert("Signup successful!please login");

    localStorage.setItem("user", JSON.stringify(result.data.user));
    localStorage.setItem("userId", result.data.user._id);

    closeModal();
    navigate("/");

  } else {
 alert(result.data.message);

  }
})
    .catch((err) => {
      console.log(err);
      alert("Signup failed");
    });
};


  const navigate = useNavigate();
  return (
    <div className="modal">
      <div className="auth-box">
        <span className="close-btn" onClick={closeModal}>
          ×
        </span>

        <h2>Sign up</h2>
        <p className="sub-text">Join Bodywise</p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text"  placeholder="Enter your name" required
            onChange={(e) => setName(e.target.value)} />

          <label>Email</label>
          <input type="email"placeholder="Enter your email" required 
            onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" placeholder="Enter your password"
            required onChange={(e) => setPassword(e.target.value)}/>

          <button type="submit" className="primary-btn">
            Sign Up
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <span className="login-link" onClick={openLogin}>
              Login
            </span>
                 </p>
             </form>
          </div>
           </div>
  );
}

export default Signup;

