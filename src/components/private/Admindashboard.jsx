import React, { useState } from 'react';
import "../../css/AdminDashboard.css";
import chickenMomo from '../../images/chickenmomo.jpg';
import buffMomo from '../../images/buffmomo.jpg';
import porkMomo from '../../images/pork_momo.jpg';
import frenchFries from '../../images/frenchfries.jpg';
import tandooriMomo from '../../images/tandoori_momo.jpg';
import paneerMomo from '../../images/pannermomo.jpg';
import meatLoverPizza from '../../images/meatloverpizza.jpg';
import chipsChilli from '../../images/chilli_potato.jpg';
import margherita from '../../images/margheritapizza.jpg';
import veggiePizza from '../../images/veggiepizza.jpg';
import chickenBurger from '../../images/chickenburger.jpg';
import loadedFries from '../../images/loadedfries.jpg';
import hamburger from '../../images/hambueger.jpg';
import baconBurger from '../../images/bacon_burger.jpg';
import vegBurger from '../../images/vegburger.jpg';
import tandoori from '../../images/tandoorifull.jpg';
import spicyWings from '../../images/spicy_wings.jpg';
import bbqWings from '../../images/bbqwings.jpg';

const generateMenuItemsWithRandomQuantities = () => {
  const baseMenuItems = [
    { name: 'Margherita Pizza', price: 880, img: margherita },
    { name: 'Veggie Pizza', price: 550, img: veggiePizza },
    { name: 'Chicken Burger', price: 480, img: chickenBurger },
    { name: 'Loaded Fries', price: 420, img: loadedFries },
    { name: 'Hamburger', price: 400, img: hamburger },
    { name: 'Bacon Burger', price: 550, img: baconBurger },
    { name: 'Veg Burger', price: 300, img: vegBurger },
    { name: 'Tandoori', price: 800, img: tandoori },
    { name: 'Spicy Wings', price: 420, img: spicyWings },
    { name: 'BBQ Wings', price: 520, img: bbqWings },
    { name: 'Chicken Momo', price: 350, img: chickenMomo },
    { name: 'Buff Momo', price: 300, img: buffMomo },
    { name: 'Pork Momo', price: 450, img: porkMomo },
    { name: 'French Fries', price: 180, img: frenchFries },
    { name: 'Tandoori Momo', price: 580, img: tandooriMomo },
    { name: 'Paneer Momo', price: 240, img: paneerMomo },
    { name: 'Meat Lover Pizza', price: 1050, img: meatLoverPizza },
    { name: 'Chips Chilli', price: 300, img: chipsChilli },
  ];

  // Generate random quantities (2 to 5) for each item
  return baseMenuItems.map(item => {
    const quantity = Math.floor(Math.random() * 4) + 2; // Random number between 2 and 5
    return {
      ...item,
      name: `${item.name}*${quantity}`, // Append quantity to name (e.g., "Margherita Pizza*3")
    };
  });
};

const menuItems = generateMenuItemsWithRandomQuantities(); // Generate menu with random quantities

const generateUniqueFoodLists = (days) => {
  const dates = {};
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateKey = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    
    // Shuffle menu items and select 4 unique items for each day
    const shuffled = menuItems.sort(() => 0.5 - Math.random());
    dates[dateKey] = shuffled.slice(0, 4); // Take 4 random items for each day
  }
  return dates;
};

const foodDataByDate = generateUniqueFoodLists(10); // Generate unique food lists for the past 10 days

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(Object.keys(foodDataByDate)[0]); // Default to the most recent date
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [menu, setMenu] = useState(menuItems); // State for menu items
  const [showAddMenu, setShowAddMenu] = useState(false); // State for showing/hiding add menu form
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', image: null }); // State for new menu item
  const dailyFood = foodDataByDate[selectedDate] || [];

  // Parse quantity from food name and calculate total price with quantity
  const calculateTotalPrice = (foods) => {
    return foods.reduce((sum, food) => {
      const quantityMatch = food.name.match(/\*(\d+)/); // Extract quantity (e.g., *2, *3, *4, *5)
      const quantity = quantityMatch ? parseInt(quantityMatch[1], 10) : 1; // Default to 1 if no quantity
      return sum + (food.price * quantity);
    }, 0);
  };

  const totalPrice = calculateTotalPrice(dailyFood);

  // Extract just the food name (without quantity) for display
  const getDisplayName = (name) => {
    return name.replace(/\*\d+/, '').trim(); // Remove "*number" from the name
  };

  // Parse quantity from food name
  const getQuantity = (name) => {
    const quantityMatch = name.match(/\*(\d+)/);
    return quantityMatch ? parseInt(quantityMatch[1], 10) : 1; // Default to 1 if no quantity
  };

  // Get the top 3 best-selling items (highest quantities) for the selected date
  const getBestSellers = (foods) => {
    return [...foods]
      .sort((a, b) => getQuantity(b.name) - getQuantity(a.name)) // Sort by quantity (descending)
      .slice(0, 3); // Take top 3
  };

  const bestSellers = getBestSellers(dailyFood);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMenuItem({ ...newMenuItem, image: reader.result }); // Store base64 image data
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new menu item
  const handleAddMenu = (e) => {
    e.preventDefault();
    if (newMenuItem.name && newMenuItem.price && newMenuItem.image) {
      const newItem = {
        name: `${newMenuItem.name}*1`, // Default quantity of 1 for new items
        price: parseFloat(newMenuItem.price),
        img: newMenuItem.image, // Use base64 image data
      };
      setMenu([...menu, newItem]);
      setNewMenuItem({ name: '', price: '', image: null }); // Reset form
      setShowAddMenu(false); // Hide form
    }
  };

  // Delete menu item
  const handleDeleteMenu = (index) => {
    setMenu(menu.filter((_, i) => i !== index));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return (
          <div className="content">
            <div className="best-seller">
              <h2>Best seller of the day</h2>
              <div className="best-seller-images">
                {bestSellers.map((food, index) => (
                  <img key={index} src={food.img} alt={food.name} className="food-image" />
                ))}
              </div>
              <div className="income-dropdown">
                <label>Income of </label>
                <select onChange={(e) => setSelectedDate(e.target.value)} className="dropdown">
                  {Object.keys(foodDataByDate).sort((a, b) => new Date(b) - new Date(a)).map((day, index) => (
                    <option key={index} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </div>

            <table className="food-table">
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {dailyFood.map((food, index) => {
                  const quantity = getQuantity(food.name);
                  const displayName = getDisplayName(food.name);
                  const itemTotal = food.price * quantity;
                  return (
                    <tr key={index}>
                      <td>{displayName}*{quantity}</td>
                      <td>{itemTotal}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{totalPrice}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Orders':
        return (
          <div className="content">
            <h2>Orders Section</h2>
            {/* Add Orders content here */}
          </div>
        );
      case 'Menu':
        return (
          <div className="content">
            <h2>Menu</h2>
            <div className="menu-grid">
              {menu.map((item, index) => (
                <div key={index} className="menu-item">
                  <img src={item.img} alt={item.name} className="menu-image" />
                  <p>{getDisplayName(item.name)}</p>
                  <p>Rs {item.price}</p>
                  <button className="delete-menu-button" onClick={() => handleDeleteMenu(index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button className="add-menu-button" onClick={() => setShowAddMenu(true)}>
              Add Menu +
            </button>

            {showAddMenu && (
              <div className="add-menu-modal">
                <h3>Add New Menu Item</h3>
                <form onSubmit={handleAddMenu}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Food Name"
                    value={newMenuItem.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (Rs)"
                    value={newMenuItem.price}
                    onChange={handleInputChange}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <button type="submit">Add Item</button>
                  <button type="button" onClick={() => setShowAddMenu(false)}>Cancel</button>
                </form>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="title">Khanamandu</h1>
      <div className="sidebar">
        <ul>
          <li 
            className={activeSection === 'Dashboard' ? 'active' : ''} 
            onClick={() => setActiveSection('Dashboard')}
          >
            Dashboard
          </li>
          <li 
            className={activeSection === 'Orders' ? 'active' : ''} 
            onClick={() => setActiveSection('Orders')}
          >
            Orders
          </li>
          <li 
            className={activeSection === 'Menu' ? 'active' : ''} 
            onClick={() => setActiveSection('Menu')}
          >
            Menu
          </li>
        </ul>
      </div>
      {renderSection()}
    </div>
  );
};

export default AdminDashboard;