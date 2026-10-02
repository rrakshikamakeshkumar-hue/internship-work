import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>🛒 QuickBasket</h1>
        <p>Fast shopping. Get it in minutes.</p>
      </header>

      <main className="container">
        <h2>Available Products</h2>

        {loading && <p className="message">Loading products...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  🛍️
                </div>

                <h3>{product.name}</h3>

                <p className="price">
                  ₹{product.price}
                </p>

                <p className="category">
                  Category ID: {product.category_id}
                </p>

                <button>
                  View Product
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;