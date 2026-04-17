
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


import Login from "./components/Login";
import Signup from "./components/Signup";


import Home from "./pages/Home";
import BuildKit from "./pages/BuildKit";
import ShopByCategory from "./pages/ShopByCategory";
import ShopAll from "./pages/ShopAll";
import HonestReports from "./pages/HonestReports";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import ManageProduct from "./pages/ManageProduct";
import EditProduct from"./pages/EditProduct";
import Product from"./pages/Product";
import Cart from"./pages/Cart";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import ManageOrder from "./pages/ManageOrder";
import Search from "./pages/Search";
import Category from "./pages/Category";
import AdminProtectRoute from "./components/AdminProtectRoute";
import Profile from "./pages/Profile";
import Orderpage from "./pages/Orderpage";





function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const openSignup = () => setShowSignup(true);
  const closeSignup = () => setShowSignup(false);

  return (
    <>
      <Navbar openLogin={openLogin} openSignup={openSignup} />


      <Routes>
  <Route path="/" element={<Home/>}/>
 
  <Route path="/BuildKit" element={<BuildKit />} />
  <Route path="/ShopByCategory" element={<ShopByCategory />} />
  <Route path="/ShopAll" element={<ShopAll/>}/>
  <Route path="/HonestReports" element={<HonestReports/>}/>

  <Route element={<AdminProtectRoute />}>
    <Route path="/Dashboard" element={<Dashboard />} />
    <Route path="/AddProduct" element={<AddProduct />} />
    <Route path="/ManageProduct" element={<ManageProduct />} />
    <Route path="/EditProduct/:id" element={<EditProduct />} />
    <Route path="/ManageOrder" element={<ManageOrder />} />
  </Route>

  <Route path="/Product/:id" element={<Product />} />
  <Route path="/Cart" element={<Cart/>} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/payment" element={<Payment />} />
  <Route path="/address" element={<Address />} /> 
  <Route path="/Search" element={<Search/>}/>
  <Route path="/category/:type" element={<Category />} />
  <Route path="/Profile" element={<Profile/>}/>
  <Route path="/Orderpage" element={<Orderpage/>}/>
</Routes>
      
  

      {showLogin && <Login closeModal={closeLogin} />}
      {showSignup && (
  <Signup 
    closeModal={closeSignup} 
    openLogin={() => {
      setShowSignup(false);
      setShowLogin(true);
    }}
  />
)}
    
    </>
  );

  
}

export default App;



