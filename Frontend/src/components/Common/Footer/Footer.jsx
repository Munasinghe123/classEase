import React from 'react';
import './Footer.css'; 

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <p>© {new Date().getFullYear()} JBRO_PRODUCTIONS. All Rights Reserved.</p>
                <div className="footer-links">
                    <a href="#about" className="footer-link">About Us</a>
                    <a href="#contact" className="footer-link">Contact</a>
                    <a href="#privacy" className="footer-link">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
