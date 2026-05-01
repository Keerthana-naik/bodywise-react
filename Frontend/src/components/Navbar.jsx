


import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";

function Navbar({ openLogin, openSignup, user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
     localStorage.setItem("justLoggedOut", "true");

    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        
        <div className="logo">
          <img
            src="/logo.png"
            alt="Logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/BuildKit">Build Your Own Kit</Link>
          </li>

          <li className="dropdown">
            <span>Shop by Category</span>

            <div className="dropdown-menu">
              <p onClick={() => navigate("/category/hair")}>Hair</p>
              <p onClick={() => navigate("/category/bodycare")}>
                Body Care
              </p>
              <p onClick={() => navigate("/category/health")}>
                Health & Fitness
              </p>
              <p onClick={() => navigate("/category/sun")}>
                Sun Protection
              </p>
              <p onClick={() => navigate("/category/face")}>
                Face
              </p>
            </div>
          </li>

          <li>
            <Link to="/ShopAll">Shop All</Link>
          </li>

          <li>
            <Link to="/HonestReports">Honest Reports</Link>
          </li>

          
          {!user ? (
            <>
              <li onClick={openLogin} style={{ cursor: "pointer" }}>
                Login
              </li>

              <li onClick={openSignup} style={{ cursor: "pointer" }}>
                SignUp
              </li>
            </>
          ) : (
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </li>
          )}
        </ul>

        <div className="nav-icons">
          <FiSearch
            onClick={() => navigate("/search")}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />

          <FaRegUser
            onClick={() => navigate("/Profile")}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />

          <Link to="/Cart">
            <HiOutlineShoppingCart />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;