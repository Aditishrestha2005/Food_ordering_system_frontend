import React from 'react';
import Header from '../layout/Header';
import '../../css/Main.css';
import orderImage from '../../images/order.png';
import pizzaImage from '../../images/p.png';
import burgerImage from '../../images/b.png';
import momoImage from '../../images/momo.png';
import friesImage from '../../images/f.png';
import AboutUs from './AboutUs';
import Offers from './Offers';
import ContactUs from './ContactUs';

const Main = () => {
    return (
        <div>
            <Header />
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

                <AboutUs />
                <Offers />
                <ContactUs />
            </main>
            <footer>
                <p>&copy; 2025 Khanamandu. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Main;
