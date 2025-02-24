import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/payment.css";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    Order_id: '',
    Payment_method: '',
    Payment_status: '',
    Payment_date: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all payments on component mount
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/payments');
      setPayments(response.data.payments);
    } catch (err) {
      setError('Error fetching payments');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing payment
        await axios.put(`http://localhost:3000/api/payments/${editingId}`, formData);
      } else {
        // Create new payment
        await axios.post('http://localhost:3000/api/payments/create', formData);
      }
      fetchPayments();
      resetForm();
    } catch (err) {
      setError('Error saving payment');
    }
  };

  const handleEdit = (payment) => {
    setEditingId(payment.Payment_id);
    setFormData({
      Order_id: payment.Order_id,
      Payment_method: payment.Payment_method,
      Payment_status: payment.Payment_status,
      Payment_date: payment.Payment_date.split('T')[0] // Format date for input
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/payments/${id}`);
      fetchPayments();
    } catch (err) {
      setError('Error deleting payment');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      Order_id: '',
      Payment_method: '',
      Payment_status: '',
      Payment_date: ''
    });
    setError(null);
  };

  return (
    <div className="payment-container">
      <h1>Payment Management</h1>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="payment-form">
        <input
          type="number"
          name="Order_id"
          value={formData.Order_id}
          onChange={handleInputChange}
          placeholder="Order ID"
          required
        />
        <select
          name="Payment_method"
          value={formData.Payment_method}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash">Cash</option>
        </select>
        <select
          name="Payment_status"
          value={formData.Payment_status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Payment Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
        <input
          type="date"
          name="Payment_date"
          value={formData.Payment_date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'} Payment</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      {error && <p className="error">{error}</p>}

      {/* Payment List */}
      <div className="payment-list">
        <h2>Payments</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.Payment_id}>
                <td>{payment.Payment_id}</td>
                <td>{payment.Order_id}</td>
                <td>{payment.Payment_method}</td>
                <td>{payment.Payment_status}</td>
                <td>{new Date(payment.Payment_date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(payment)}>Edit</button>
                  <button onClick={() => handleDelete(payment.Payment_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;