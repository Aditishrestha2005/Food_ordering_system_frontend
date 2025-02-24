import React, { useState } from "react";
import API from "../api/api"; // Import API object
import "../../css/Register.css";
import main from "../../images/main.png";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState(""); // Success message
    const [error, setError] = useState(""); // Error message

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Basic client-side validation
        if (!username || !password || !email || !phoneNumber || !address) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            const userData = {
                username,
                password,
                email,
                phone_number: phoneNumber, // Match backend field name
                address,
            };
            const response = await API.registerUser(userData);

            if (response.status === 201) {
                setMessage("Registration successful! Redirecting to login...");
                setError(""); // Clear any previous errors
                setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
            }
        } catch (err) {
            // Handle specific error messages from backend
            const errorMessage =
                err.response?.data?.error || "Registration failed. Please try again.";
            setError(errorMessage);
            setMessage(""); // Clear any previous success message
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={main} alt="Khanamandu Register Page" />
            </div>
            <div className="login-form">
                <h2>Register for Khanamandu</h2>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="register-username">Username</label>
                        <input
                            type="text"
                            id="register-username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
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
                            required
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
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-phone">Phone Number</label>
                        <input
                            type="tel"
                            id="register-phone"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-address">Address</label>
                        <input
                            type="text"
                            id="register-address"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit">Register</button>
                    </div>
                </form>

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