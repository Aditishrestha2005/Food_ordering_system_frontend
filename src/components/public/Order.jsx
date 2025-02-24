import React, { useState, useEffect } from 'react';
import apiService from '../api/api'; // Adjust path to your api.js file
import '../..//css/order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    Customer_id: '',
    Restaurant_id: '1', // Default to 1 as per your backend comment
    Order_date: '',
    Total_amount: '',
    Order_status: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Your fetchOrders function
  const fetchOrders = async () => {
    try {
      const response = await apiService.getAllOrders();
      setOrders(response.orders);
    } catch (err) {
      setError('Error fetching orders');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Your handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateOrder(editingId, formData);
      } else {
        await apiService.createOrder(formData);
      }
      fetchOrders();
      resetForm();
    } catch (err) {
      setError('Error saving order');
    }
  };

  const handleEdit = (order) => {
    setEditingId(order.Order_id);
    setFormData({
      Customer_id: order.Customer_id,
      Restaurant_id: order.Restaurant_id,
      Order_date: order.Order_date.split('T')[0], // Format date for input
      Total_amount: order.Total_amount,
      Order_status: order.Order_status
    });
  };

  // Your handleDelete function
  const handleDelete = async (id) => {
    try {
      await apiService.deleteOrder(id);
      fetchOrders();
    } catch (err) {
      setError('Error deleting order');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      Customer_id: '',
      Restaurant_id: '1',
      Order_date: '',
      Total_amount: '',
      Order_status: ''
    });
    setError(null);
  };

  return (
    <div className="order-container">
      <h1>Order Management</h1>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="order-form">
        <input
          type="number"
          name="Customer_id"
          value={formData.Customer_id}
          onChange={handleInputChange}
          placeholder="Customer ID"
          required
        />
        <input
          type="number"
          name="Restaurant_id"
          value={formData.Restaurant_id}
          onChange={handleInputChange}
          placeholder="Restaurant ID"
          required
          disabled // Fixed to 1 as per your backend
        />
        <input
          type="date"
          name="Order_date"
          value={formData.Order_date}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="Total_amount"
          value={formData.Total_amount}
          onChange={handleInputChange}
          placeholder="Total Amount"
          step="0.01"
          required
        />
        <select
          name="Order_status"
          value={formData.Order_status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Order Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Create'} Order</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      {error && <p className="error">{error}</p>}

      {/* Order List */}
      <div className="order-list">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Restaurant ID</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.Order_id}>
                <td>{order.Order_id}</td>
                <td>{order.Customer_id}</td>
                <td>{order.Restaurant_id}</td>
                <td>{new Date(order.Order_date).toLocaleDateString()}</td>
                <td>${order.Total_amount.toFixed(2)}</td>
                <td>{order.Order_status}</td>
                <td>
                  <button onClick={() => handleEdit(order)}>Edit</button>
                  <button onClick={() => handleDelete(order.Order_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;