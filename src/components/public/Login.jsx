import React, { useState } from "react";
import API from "../api/api";
import "../../css/Login.css";
import main from "../../images/main.png";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState(""); // Optional: Success message

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Basic client-side validation
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            const credentials = { username, password };
            const response = await API.loginUser(credentials);

            console.log("Login Response:", response); // Debug log

            // Check for successful login (adjust based on backend response)
            if (response.status === 200) {
                setMessage("Login successful! Redirecting...");
                setError("");
                setTimeout(() => navigate("/main"), 1000); // Redirect after 1 second
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.error || "Login failed. Check your credentials.";
            setError(errorMessage);
            setMessage("");
            console.error("Login Error:", err.response || err);
        }
    };

    return (
        <section className="login-page-container">
            <div className="login-container">
                <div className="login-image">
                    <img src={main} alt="Khanamandu Login page" />
                </div>
                <div className="login-form">
                    <h2>Login to Khanamandu</h2>

                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="username"
                                id="username"
                                placeholder="Enter your Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
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
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Login</button>
                        </div>
                    </form>

                    <div className="register">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;