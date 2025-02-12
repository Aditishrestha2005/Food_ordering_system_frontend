import React from "react";
import { Link } from "react-router-dom";
import orderImage from "../../images/order.png";
import pizzaImage from "../../images/p.png";
import burgerImage from "../../images/b.png";
import momoImage from "../../images/momo.png";
import friesImage from "../../images/f.png";
import "../../css/Main.css";

const Main = () => {
  return (
    <div className="container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">Khanamandu</h1>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About us</a></li>
          <li><a href="#contact">Contact us</a></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </header>

      {/* Hero Section */}
      <main id="home" className="hero">
        <h2 className="hero-title">Welcome to Khanamandu</h2>
        <p className="hero-subtitle">A taste you'll remember.</p>
        <div className="hero-image-container">
          <img src={orderImage} alt="Food Delivery" className="hero-image" />
        </div>
        <div className="button-group">
          <Link to="Login">
            <button className="auth-button" aria-label="Login">Login</button>
          </Link>
          <Link to="Register">
            <button className="auth-button signup" aria-label="Sign up">Sign up</button>
          </Link>
        </div>
      </main>

      {/* About Us Section */}
      <section className="about-us" id="about">
        <h3>About Khanamandu</h3>
        <p>
          At Khanamandu, we take immense pride in serving freshly made dishes that not only tantalize your taste buds but also nourish your soul. Our culinary philosophy is rooted in quality, and we source only the highest quality ingredients from trusted local suppliers. This commitment ensures that every dish we serve is a celebration of flavor and freshness. Our diverse menu offers a wide array of delicious options, catering to every palate and preference. From our handcrafted pizzas, featuring a variety of toppings that range from classic margherita to gourmet creations, to our juicy burgers that are made from premium cuts of meat and cooked to perfection, each item is prepared with meticulous care and passion. Our crispy fries, golden and seasoned just right, provide the perfect accompaniment to any meal, and our selection of mouthwatering momos is sure to delight those seeking a taste of something different. Every meal at Khanamandu is thoughtfully crafted to ensure the perfect balance of flavor, freshness, and satisfaction.
        </p>
      </section>

      {/* Offer Section */}
      <section className="section">
        <h2 className="section-title">What We Offer</h2>
        <div className="offer-container">
          <div className="offer-box">
            <img src={pizzaImage} alt="Delicious Pizza" className="offer-image" />
            <p className="offer-text">Delicious Pizzas</p>
          </div>
          <div className="offer-box">
            <img src={burgerImage} alt="Juicy Burger" className="offer-image" />
            <p className="offer-text">Juicy Burgers</p>
          </div>
          <div className="offer-box">
            <img src={momoImage} alt="Tasty Momo" className="offer-image" />
            <p className="offer-text">Tasty Momos</p>
          </div>
          <div className="offer-box">
            <img src={friesImage} alt="Crispy Fries" className="offer-image" />
            <p className="offer-text">Crispy Fries</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us" id="contact">
        <h4>Phone Number</h4>
        <p>+977 9876543210</p>
        <h5>Email</h5>
        <p>khanamandu@gmail.com</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Khanamandu. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Main;