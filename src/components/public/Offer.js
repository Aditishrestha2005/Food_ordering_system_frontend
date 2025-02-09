import React from 'react';
import pizzaImage from '../../images/p.png';
import burgerImage from '../../images/b.png';
import momoImage from '../../images/momo.png';
import friesImage from '../../images/f.png';

const Offers = () => {
    return (
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
    );
};

export default Offers;
