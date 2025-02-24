import axios from "axios";

// Base URL for your backend API
const API_BASE_URL = "http://localhost:8080"; // Adjust if deployed

// Axios instance for consistent configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set or remove Authorization token in headers and localStorage
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Ensure header is set
    return true;
  }
  return false;
};

// User Registration
const register = async (userData) => {
  try {
    const response = await api.post("/user/register", userData);
    return response.data; // Expecting { message, user, token? }
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// User Login
const login = async (credentials) => {
  try {
    const response = await api.post("/user/login", credentials);
    const { token } = response.data; // Assuming token is returned
    if (token) setAuthToken(token); // Store token if provided
    return response.data; // Expecting { user, token }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// User Logout
const logout = () => {
  setAuthToken(null); // Clear token from storage and headers
  // Add backend logout endpoint if it exists: await api.post("/user/logout");
};

// Export auth functions
const authService = {
  register,
  login,
  logout,
  isAuthenticated,
};

export default authService;