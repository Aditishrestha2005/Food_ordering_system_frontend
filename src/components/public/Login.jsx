import React, { useState } from 'react';
import '../../css/Login.css';
import main from '../../images/main.png';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Login clicked', { email, password });
        // Navigate to the main page on login
        navigate('/main');
    };

    return (
        <section className='login-page-container'>
            <div className="login-container">
                <div className="login-image">
                    <img src={main} alt="Khanamandu Login page" />
                </div>
                <div className="login-form">
                    <h2>Login to Khanamandu</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <div className="register">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;