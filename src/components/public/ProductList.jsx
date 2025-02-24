import React, { useState, useEffect } from "react";
import apiService from "../api/api"; // Adjust path to where api.js is located
import "../../css/ProductList.css"; // Optional: For styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const data = await apiService.getProducts();
        console.log("Products fetched:", data);
        setProducts(data); // Assuming data is an array of products
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only on mount

  // Render loading state
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render product list
  return (
    <div className="product-list">
      <h1>Menu - Khanamandu</h1>
      {products.length === 0 ? (
        <p>No products available at the moment.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.Product_id} className="product-item">
              <h2>{product.productName}</h2>
              <p>Price: NPR {product.price}</p>
              {product.description && <p>{product.description}</p>}
              {product.productImage && (
                <img
                  src={`http://localhost:8080/${product.productImage}`} // Use full URL to backend uploads
                  alt={product.productName}
                  style={{ maxWidth: "200px", maxHeight: "200px" }} // Limit image size
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg"; // Fallback if image fails to load
                  }}
                />
              )}
              <button onClick={() => alert(`Added ${product.productName} to cart!`)}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;