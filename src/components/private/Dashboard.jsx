import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import '../../css/dashboard.css';
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Product Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <img
              src={`http://localhost:8080/${product.productImage}`}
              alt={product.productName}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <button>Order</button>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import '../../css/dashboard.css';
// import chickenMomo from '../../images/chickenmomo.jpg';
// import buffMomo from '../../images/buffmomo.jpg';
// import porkMomo from '../../images/pork_momo.jpg';
// import frenchFries from '../../images/frenchfries.jpg';
// import tandooriMomo from '../../images/tandoori_momo.jpg';
// import paneerMomo from '../../images/pannermomo.jpg';
// import meatLoverPizza from '../../images/meatloverpizza.jpg';
// import chipsChilli from '../../images/chilli_potato.jpg';
// import margherita from '../../images/margheritapizza.jpg';
// import veggiePizza from '../../images/veggiepizza.jpg';
// import chickenBurger from '../../images/chickenburger.jpg';
// import loadedFries from '../../images/loadedfries.jpg';
// import hamburger from '../../images/hambueger.jpg';
// import baconBurger from '../../images/bacon_burger.jpg';
// import vegBurger from '../../images/vegburger.jpg';
// import tandoori from '../../images/tandoorifull.jpg';
// import spicyWings from '../../images/spicy_wings.jpg';
// import bbqWings from '../../images/bbqwings.jpg';

// const menuItems = [
//   { name: 'Chicken Momo', price: 350, img: chickenMomo },
//   { name: 'Buff Momo', price: 300, img: buffMomo },
//   { name: 'Pork Momo', price: 450, img: porkMomo },
//   { name: 'French Fries', price: 180, img: frenchFries },
//   { name: 'Tandoori Momo', price: 580, img: tandooriMomo },
//   { name: 'Paneer Momo', price: 240, img: paneerMomo },
//   { name: 'Meat Lover Pizza', price: 1050, img: meatLoverPizza },
//   { name: 'Chips Chilli', price: 300, img: chipsChilli },
//   { name: 'Margherita Pizza', price: 880, img: margherita },
//   { name: 'Veggie Pizza', price: 550, img: veggiePizza },
//   { name: 'Chicken Burger', price: 480, img: chickenBurger },
//   { name: 'Loaded Fries', price: 420, img: loadedFries },
//   { name: 'Hamburger', price: 400, img: hamburger },
//   { name: 'Bacon Burger', price: 550, img: baconBurger },
//   { name: 'Veg Burger', price: 300, img: vegBurger },
//   { name: 'Tandoori', price: 800, img: tandoori },
//   { name: 'Spicy Wings', price: 420, img: spicyWings },
//   { name: 'BBQ Wings', price: 520, img: bbqWings },
// ];

// const UserDashboard = () => {
//   const [quantities, setQuantities] = useState(Array(menuItems.length).fill(0)); // Start at 0
//   const [modalVisible, setModalVisible] = useState(false);
//   const [orderConfirmed, setOrderConfirmed] = useState(false);

//   // Debug state changes
//   useEffect(() => {
//     console.log('Modal Visible:', modalVisible);
//   }, [modalVisible]);

//   useEffect(() => {
//     console.log('Quantities:', quantities);
//   }, [quantities]);

//   const increment = (index) => {
//     setQuantities((prevQuantities) => {
//       const newQuantities = [...prevQuantities];
//       newQuantities[index] += 1;
//       return newQuantities;
//     });
//   };

//   const decrement = (index) => {
//     setQuantities((prevQuantities) => {
//       const newQuantities = [...prevQuantities];
//       if (newQuantities[index] > 0) {
//         newQuantities[index] -= 1;
//       }
//       return newQuantities;
//     });
//   };

//   const handleProceed = () => {
//     console.log('Proceed button clicked!'); // Debug log
//     if (quantities.some(qty => qty > 0)) { // Only proceed if items are selected
//       setModalVisible(true);
//       setOrderConfirmed(false); // Reset confirmation
//     } else {
//       alert('Please select at least one item before proceeding.'); // Optional user feedback
//     }
//   };

//   const confirmOrder = () => {
//     setOrderConfirmed(true);
//     // Optional: Add logic to send order to backend or reset quantities
//     console.log('Order confirmed with totals:', { items: menuItems, quantities, total });
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setOrderConfirmed(false); // Reset confirmation when closing
//   };

//   const total = quantities.reduce((acc, qty, index) => acc + qty * menuItems[index].price, 0);

//   return (
//     <div className="dashboard">
//       <h1>Menu</h1>
//       <div className="menu-grid">
//         {menuItems.map((item, index) => (
//           <div key={index} className="menu-item">
//             <img src={item.img} alt={item.name} className="menu-image" />
//             <h2>{item.name}</h2>
//             <p>Rs {item.price}</p>
//             <div className="quantity-controls">
//               <button 
//                 onClick={() => decrement(index)} 
//                 className="quantity-button"
//                 disabled={quantities[index] <= 0} // Disable if quantity is 0
//               >
//                 -
//               </button>
//               <span className="quantity">{quantities[index]}</span>
//               <button 
//                 onClick={() => increment(index)} 
//                 className="quantity-button"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button 
//         className="proceed-button" 
//         onClick={handleProceed}
//         disabled={total === 0} // Disable if no items selected
//       >
//         Proceed
//       </button>

//       {/* Modal for Order Summary */}
//       {modalVisible && (
//         <div className="modal" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close" onClick={closeModal}>×</span>
//             <h2>Total</h2>
//             <ul className="order-list">
//               {menuItems.map((item, index) => (
//                 quantities[index] > 0 && (
//                   <li key={index} className="order-item">
//                     {item.name}: {quantities[index]} x Rs {item.price} = Rs {quantities[index] * item.price}
//                   </li>
//                 )
//               ))}
//             </ul>
//             <h3>Total: Rs {total}</h3>
//             <button 
//               className="confirm-button" 
//               onClick={confirmOrder}
//               disabled={orderConfirmed} // Disable after confirmation
//             >
//               Confirm Order
//             </button>
//             {orderConfirmed && <p className="confirmation-message">✅ Your order has been confirmed!</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;