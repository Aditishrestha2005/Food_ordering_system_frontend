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
      <nav className="navbar">
        <h1 className="logo">Khanamandu</h1>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About us</a></li>
          <li><a href="#contact">Contact us</a></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <h2 className="hero-title">Welcome to Khanamandu</h2>
        <p className="hero-subtitle">A taste you'll remember.</p>
        <div className="hero-image-container">
          <img src={orderImage} alt="Food Delivery" className="hero-image" />
        </div>
        <div className="button-group">
          <button className="auth-button">Login</button>
          <button className="auth-button signup">Sign up</button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us" id="about">
        <h3>About Khanamandu</h3>
        <p>
          At Khanamandu, we take pride in serving freshly made dishes using only the highest quality ingredients. Our menu offers a variety of delicious options, from handcrafted pizzas to juicy burgers and crispy fries, all prepared with care and passion. Each meal is thoughtfully crafted to ensure the perfect balance of flavor, freshness, and satisfaction, making every bite a memorable experience.
        </p>
        <p>
          Whether you're here for a quick snack or a full meal, Khanamandu is committed to providing an enjoyable dining experience. We believe in delivering not just great food, but a welcoming atmosphere where you can enjoy flavorful dishes that bring people together, every time.
        </p>
      </section>

      {/* Offer Section */}
      <section className="section">
        <h2 className="section-title">What We Offer</h2>
        <div className="offer-container">
          <div className="offer-box">
            <img src={pizzaImage} alt="Pizza" className="offer-image" />
            <p className="offer-text">Delicious Pizzas</p>
          </div>
          <div className="offer-box">
            <img src={burgerImage} alt="Burger" className="offer-image" />
            <p className="offer-text">Juicy Burgers</p>
          </div>
          <div className="offer-box">
            <img src={momoImage} alt="Momo" className="offer-image" />
            <p className="offer-text">Tasty Momos</p>
          </div>
          <div className="offer-box">
            <img src={friesImage} alt="Fries" className="offer-image" />
            <p className="offer-text">Crispy Fries</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Khanamandu. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Main;
