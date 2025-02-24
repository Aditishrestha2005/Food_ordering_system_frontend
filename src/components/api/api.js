import axios from "axios";

// Base URL for your backend API
const API_BASE_URL = "http://localhost:8080";

// Create an Axios instance for consistent configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set or remove Authorization token in headers (for authenticated requests)
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token); // Store token in localStorage
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token"); // Clear token
  }
};

// Check if user is authenticated (optional, for protected routes)
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  }
  return false;
};

// User Registration
const registerUser = async (userData) => {
  try {
    const response = await api.post("/user/register", userData); // Updated to /api/user
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// User Login
const loginUser = async (credentials) => {
  try {
    const response = await api.post("/user/login", credentials); // Updated to /api/user
    const { token } = response.data; // Assuming backend returns a token
    if (token) setAuthToken(token); // Set token for future requests
    return response.data; // Assuming response contains token & user data
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Get all products (use api instance for consistency)
export const getProducts = async () => {
  try {
    const response = await api.get("/product/getallproducts"); // Remove isAuthenticated()
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    isAuthenticated(); // Ensure token is set in headers if needed
    const response = await api.get(`/product/products/${id}`); // Matches backend
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Create a product
export const createProduct = async (productData) => {
  try {
    isAuthenticated(); // Ensure token is set in headers if needed
    const formData = new FormData();
    formData.append("productName", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description || "");
    if (productData.productImage) {
      formData.append("productImage", productData.productImage);
    }
    const response = await api.post("/product/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Override default JSON header
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    isAuthenticated(); // Ensure token is set in headers if needed
    const formData = new FormData();
    formData.append("productName", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description || "");
    if (productData.productImage) {
      formData.append("productImage", productData.productImage);
    }
    const response = await api.put(`/product/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Override default JSON header
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    isAuthenticated(); // Ensure token is set in headers if needed
    await api.delete(`/product/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Create a payment
const createPayment = async (paymentData) => {
  try {
    isAuthenticated(); // Ensure token is set in headers if needed
    const response = await api.post("/payment/create", paymentData);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Get all payments
const getAllPayments = async () => {
  try {
    const response = await api.get("/payment");
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Get payment by ID
const getPaymentById = async (id) => {
  try {
    isAuthenticated(); // Ensure token is set in headers if needed
    const response = await api.get(`/payment/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching payment with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Update a payment
const updatePayment = async (id, paymentData) => {
  try {
    isAuthenticated(); // Ensure token is set in headers if needed
    const response = await api.put(`/payment/${id}`, paymentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating payment with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Delete a payment
const deletePayment = async (id) => {
  try {
    isAuthenticated(); // Ensure token is set in headers if needed
    await api.delete(`/payment/${id}`);
  } catch (error) {
    console.error(`Error deleting payment with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Add to api.js after payment methods
const createOrder = async (orderData) => {
  try {
    isAuthenticated();
    const response = await api.post("/order/create", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const getAllOrders = async () => {
  try {
    const response = await api.get("/order");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const getOrderById = async (id) => {
  try {
    isAuthenticated();
    const response = await api.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const updateOrder = async (id, orderData) => {
  try {
    isAuthenticated();
    const response = await api.put(`/order/${id}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const deleteOrder = async (id) => {
  try {
    isAuthenticated();
    await api.delete(`/order/${id}`);
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Export all functions as a single object
const apiService = {
  registerUser,
  loginUser,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};

export default apiService;