

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";

import Login from "./components/Login";
import Signup from "./components/Signup";

import Home from "./pages/Home";
import BuildKit from "./pages/BuildKit";
import ShopAll from "./pages/ShopAll";

import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import ManageProduct from "./pages/ManageProduct";
import EditProduct from "./pages/EditProduct";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import ManageOrder from "./pages/ManageOrder";
import Search from "./pages/Search";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Orderpage from "./pages/Orderpage";
import AdminProtectRoute from "./components/AdminProtectRoute";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const location = useLocation();

  
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const openSignup = () => setShowSignup(true);
  const closeSignup = () => setShowSignup(false);

  useEffect(() => {
    if (location.search.includes("login=true")) {
      setShowLogin(true);
    }
  }, [location]);

  return (
    <>
      
      {user?.isAdmin ? (
        <AdminNavbar setUser={setUser} />
      ) : (
        <Navbar
          openLogin={openLogin}
          openSignup={openSignup}
          user={user}
          setUser={setUser}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BuildKit" element={<BuildKit />} />
        <Route path="/ShopAll" element={<ShopAll />} />
        

        <Route element={<AdminProtectRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/ManageProduct" element={<ManageProduct />} />
          <Route path="/EditProduct/:id" element={<EditProduct />} />
          <Route path="/ManageOrder" element={<ManageOrder />} />
        </Route>

        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/address" element={<Address />} />

        <Route path="/Search" element={<Search />} />
        <Route path="/category/:type" element={<Category />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Orderpage" element={<Orderpage />} />
      </Routes>

      {showLogin && <Login closeModal={closeLogin} setUser={setUser} />}

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
