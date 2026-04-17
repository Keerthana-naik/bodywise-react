import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Footer from "../components/Footer";

function Profile() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

   
     useEffect(() => {
    const storedUser=JSON.parse(localStorage.getItem("user"));
    if(!storedUser){
        navigate("/login");
    }
    else{
        setUser(storedUser);
}
    }, []);

  const handleLogout= ( ) =>{
    localStorage.removeItem("user");
    navigate("/");
  };
  
return (
    <>
    <div className="profilecontainer">
        <div className="profileheader">
           
            <h1>{user?.name}</h1>
             <p>{user?.email}</p>
             <p>{user?.phone}</p>

             <button onClick={handleLogout}>Logout</button> 
        </div>
        <div className="profileboxes">
            <div className="box">Account</div>
            <div className="box" onClick={() => navigate("/Orderpage")}>Order</div>
            <div className="box">Address</div>
           < div className="box">Wallet</div>

        </div>
         <Footer/>
    </div>
      
     </>
   

);

}
export default Profile;