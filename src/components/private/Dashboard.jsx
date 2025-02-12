import React, { useState } from "react";
import "../../css/dashboard.css";
import pizzaImage from '../../images/p.png';
import burgerImage from '../../images/b.png';
import momoImage from '../../images/momo.png';
import friesImage from '../../images/f.png';

const menuItems = [
  { id: 1, name: "Momo", price: 5, image: momoImage },
  { id: 2, name: "Pizza", price: 8, image: pizzaImage },
  { id: 3, name: "Burger", price: 6, image: burgerImage },
  { id: 4, name: "French Fries", price: 4, image: friesImage },
];

const Dashboard = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Menu</h1>
      <div className="menu-list">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h2 className="cart-title">Cart ({cart.length})</h2>
    </div>
  );
};

export default Dashboard;
