import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="Logo" />
                <p>Choose from a diverse menu featuring a delectable array of dished crafted with the finest ingredients and culinary expertise that satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="Facebook" />
                    <img src={assets.twitter_icon} alt="Twitter" />
                    <img src={assets.linkedin_icon} alt="Linkedin" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Mern Stack</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <ul>
                    <li>+91 9876543211</li>
                    <li>mern@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 © Arshit Gajera - All Rights Reserved</p>
    </div>
  )
}

export default Footer
