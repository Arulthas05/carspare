import React from 'react';
import './Footer.css';

function Footer() {
  return (
    

    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            We are a company dedicated to providing the best services to our customers. Our goal is to deliver high-quality products that meet our customers' needs.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        {/* <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
            <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CarSpare. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
