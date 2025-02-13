import React, { useState } from 'react';
import '../../css/dashboard.css';
import chickenMomo from '../../images/chickenmomo.jpg';
import buffMomo from '../../images/buffmomo.jpg';
import porkMomo from '../../images/pork momo.jpg'; // Ensure this file exists
import frenchFries from '../../images/frenchfries.jpg';
import tandooriMomo from '../../images/tandoori momo.jpg';
import paneerMomo from '../../images/pannermomo.jpg';
import meatLoverPizza from '../../images/meatloverpizza.jpg';
import chipsChilli from '../../images/chilli potato.jpg';
import margherita from '../../images/margheritapizza.jpg';
import veggiePizza from '../../images/veggiepizza.jpg';
import chickenBurger from '../../images/chicken burger.jpg';
import loadedFries from '../../images/loadedfries.jpg';
import hamburger from '../../images/hambueger.jpg';
import baconBurger from '../../images/bacon burger.jpg';
import vegBurger from '../../images/vegburger.jpg';
import tandoori from '../../images/tandoorifull.jpg';
import spicyWings from '../../images/spicy wings.jpg';
import bbqWings from '../../images/bbqwings.jpg';

const menuItems = [
  { name: 'Chicken Momo', price: 250, img: chickenMomo },
  { name: 'Buff Momo', price: 300, img: buffMomo },
  { name: 'Pork Momo', price: 350, img: porkMomo },
  { name: 'French Fries', price: 180, img: frenchFries },
  { name: 'Tandoori Momo', price: 220, img: tandooriMomo },
  { name: 'Paneer Momo', price: 240, img: paneerMomo },
  { name: 'Meat Lover Pizza', price: 480, img: meatLoverPizza },
  { name: 'Chips Chilli', price: 300, img: chipsChilli },
  { name: 'Margherita Pizza', price: 480, img: margherita },
  { name: 'Veggie Pizza', price: 450, img: veggiePizza },
  { name: 'Chicken Burger', price: 380, img: chickenBurger },
  { name: 'Loaded Fries', price: 420, img: loadedFries },
  { name: 'Hamburger', price: 400, img: hamburger },
  { name: 'Bacon Burger', price: 450, img: baconBurger },
  { name: 'Veg Burger', price: 300, img: vegBurger },
  { name: 'Tandoori', price: 250, img: tandoori },
  { name: 'Spicy Wings', price: 220, img: spicyWings },
  { name: 'BBQ Wings', price: 520, img: bbqWings },
];

const Dashboard = () => {
  const [quantities, setQuantities] = useState(Array(menuItems.length).fill(0));
  const [modalVisible, setModalVisible] = useState(false); // Define modalVisible state
  const increment = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
    }
    setQuantities(newQuantities);
  };
  const handleProceed = () => {
    setModalVisible(true);
  };

  const total = quantities.reduce((acc, qty, index) => acc + qty * menuItems[index].price, 0);


  return (
    <div className="dashboard">
      <h1>Menu</h1>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.img} alt={item.name} className="menu-image" />
            <h2>{item.name}</h2>
            <p>Rs {item.price}</p>
            <div className="quantity-controls">
              <button onClick={() => decrement(index)}>-</button>
              <span>{quantities[index]}</span>
              <button onClick={() => increment(index)}>+</button>
            </div>
          </div>
        ))}
     </div>
      <button className="proceed-button" onClick={handleProceed}>Proceed</button>

      {/* Modal for Order Summary */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Total</h2>
            <ul>
              {menuItems.map((item, index) => (
                quantities[index] > 0 && (
                  <li key={index}>
                    {item.name}: {quantities[index]} x Rs {item.price} = Rs {quantities[index] * item.price}
                  </li>
                )
              ))}
            </ul>
            <h3>Total: Rs {total}</h3>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;