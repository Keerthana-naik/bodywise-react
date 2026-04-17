import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
   

      <div>
        <footer className="footer">
          <div className="app">
         <div className="appbuttons">
          <img src="/appstore.png" alt="appstore" />
          <img src="/googleplay.png" alt="googleplay" />
            </div>
          </div>

          <div className="footerlinks">
            <div>
            <p>All Products</p>
             <p>Body Care</p>
            <p>Nutrition</p>
            </div>

            <div>
              <p>Hair</p>
              <p>Face</p>
              <p>Blog</p>
            </div>
          </div>

          <hr />
          <div className="footerlinks">
            <div>
                   <p>Contact us at</p>
                   <p>About Us</p>
               </div>

            <div>
                   <p>FAQs</p>
                    <p>Returns & Refunds</p>
               </div>
          </div>
          <hr />
          <div className="footerlinks">
            <div>
            <p>Privacy Policy</p>
            <p>Join Community</p>
            </div>

            <div>
             <p>Sitemap</p>
            <p>Terms & Conditions</p>
            </div>
          </div>
          <hr />

          <p className="copyright">
            Copyright &copy; 2025 BeBodywise. All rights reserved
          </p>
          <div className="socialicons">
            <FaInstagram />
             <FaFacebookF />
              <FaYoutube />
          </div>
        </footer>
      </div>
    </>
  );
}
export default Footer;
