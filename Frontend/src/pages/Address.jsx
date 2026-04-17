import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Address.css";

function Address() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    phone: "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.city || !form.pincode) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem("address", JSON.stringify(form));
    navigate("/payment");
  };

  return (
    <div className="address-page">
      <h2>Enter Address</h2>

      <input type="text"name="name"
        placeholder="Name" onChange={handleChange} />

      <input type="text" name="address"
        placeholder="Address" onChange={handleChange} />

      <input type="text" name="city"
        placeholder="City" onChange={handleChange} />

          <input type="text" name="pincode"
        placeholder="Pincode" onChange={handleChange} />
      
             <input type="text" name="state"
        placeholder="State" onChange={handleChange}/>


      <input type="text"name="phone"
        placeholder="Phone Number"  onChange={handleChange}/>


      <div className="btns">
        
        <button onClick={handleSubmit}>Continue to Payment</button>
      </div>
    </div>
  );
}

export default Address;
