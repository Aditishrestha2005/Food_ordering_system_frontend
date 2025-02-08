import React from 'react';
import Header from '../layout/Header'; // or adjust the path
import '../../css/Main.css'
import orderImage from '../../images/order.png';
import pizzaImage from '../../images/p.png';
import burgerImage from '../../images/b.png';
import momoImage from '../../images/momo.png';
import friesImage from '../../images/f.png';

const Main = () => {
    return (
        <div>
            <Header /> {/* Use the existing Header component */}

            <main>
                <section className="welcome-section">
                    <h2>Welcome to Khanamandu</h2>
                    <p>A taste you'll remember.</p>
                    <img src={orderImage} alt="Pizza delivery" className="delivery-image" />
                    <div className="buttons">
                        <a href="/login"><button>Login</button></a>
                        <a href="/register"><button>Sign up</button></a>
                    </div>
                </section>

                <section className="about-us" id="About us">
                    <h3>About Khanamandu</h3>
                    <p>
                        At Khanamandu, we take pride in serving freshly made dishes using only the highest quality ingredients. Our menu offers a variety of delicious options, from handcrafted pizzas to juicy burgers and crispy fries, all prepared with care and passion. Each meal is thoughtfully crafted to ensure the perfect balance of flavor, freshness, and satisfaction, making every bite a memorable experience.
                        Whether you're here for a quick snack or a full meal, Khanamandu is committed to providing an enjoyable dining experience. We believe in delivering not just great food, but a welcoming atmosphere where you can enjoy flavorful dishes that bring people together, every time.
                    </p>
                </section>

                <section className="offer-section">
                    <h3>What we offer</h3>
                    <div className="offer-container">
                        <div className="offer-box">
                            <img src={pizzaImage} alt="Pizza" className="offer-image" />
                            <p>Delicious Pizzas</p>
                        </div>
                        <div className="offer-box">
                            <img src={burgerImage} alt="Burger" className="offer-image" />
                            <p>Juicy Burgers</p>
                        </div>
                        <div className="offer-box">
                            <img src={momoImage} alt="Momo" className="offer-image" />
                            <p>Momo</p>
                        </div>
                        <div className="offer-box">
                            <img src={friesImage} alt="French Fries" className="offer-image" />
                            <p>French Fries</p>
                        </div>
                    </div>
                </section>

                <section className="contact-us" id="Contact">
                    <h4>Phone number</h4>
                    <p>+977 9876543210</p>
                    <h5>Email</h5>
                    <p>khanamandu@gmail.com</p>
                </section>
            </main>

            <footer>
                <p>&copy; 2025 Khanamandu. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Main;