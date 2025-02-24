import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/public/Login';
import RegisterPage from './components/public/Register';
import DashboardPage from './components/private/Dashboard';
import MainPage from './components/public/Main';
import ProfilePage from './components/public/Profile';
import OrderList from './components/public/Order';
import PaymentList from './components/public/Payment';
import AdminDashboardPage from './components/private/Admindashboard';
import ProductList from './components/public/ProductList';


import './App.css';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/productlist" element={<ProductList />} />
                <Route path="/orderlist" element={<OrderList />} />
                <Route path="/paymentlist" element={<PaymentList />} />
                <Route path="/admindashboard" element={<AdminDashboardPage />} />
            </Routes>
        </Router>
    );
};

export default App;