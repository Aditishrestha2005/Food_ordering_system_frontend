import React, { useState } from "react";
import '../../css/Register.css';
import main from '../../images/main.png';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');

    const handleRegister = () => {
        // Add registration logic here
        console.log('Register clicked', { name, email, password, contact });
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={main} alt="Khanamandu Register Page" />
            </div>
            <div className="login-form">
                <h2>Register for Khanamandu</h2>
                
                <div className="form-group">
                    <label htmlFor="register-name">Name</label>
                    <input
                        type="text"
                        id="register-name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="register-email">Email</label>
                    <input
                        type="email"
                        id="register-email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input
                        type="password"
                        id="register-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="register-contact">Contact</label>
                    <input
                        type="text"
                        id="register-contact"
                        placeholder="Enter your contact number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <button type="button" onClick={handleRegister}>
                        Register
                    </button>
                </div>

                <div className="login">
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
