import React from 'react';
import './Footer.css';

const Footer = () => {

  const socialMediaStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px'
  };

  const iconStyle = {
    color: '#fff',
    marginRight: '10px',
    textDecoration: 'none',
    fontSize: '20px',
    padding: '0 10px'
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We offer the best turf booking services with a wide range of options for all your sporting needs.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@turfbooking.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div style={socialMediaStyle}>
            <a style={iconStyle} href="#"><i className="fab fa-facebook-f"></i></a>
            <a style={iconStyle} href="#"><i className="fab fa-twitter"></i></a>
            <a style={iconStyle} href="#"><i className="fab fa-instagram"></i></a>
            <a style={iconStyle} href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Turf Booking. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
