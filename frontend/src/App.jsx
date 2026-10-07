import { useState, useEffect } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    brand: "MilkyFresh",
    category: "Dairy & Breakfast",
    price: 52,
    mrp: 60,
    rating: 4.7,
    reviews: 245,
    delivery: 24,
    stock: 18,
    unit: "1 L",
    icon: "🥛",
    description:
      "Fresh and nutritious cow milk delivered quickly from your nearest QuickBasket inventory hub.",
  },
  {
    id: 2,
    name: "Fresh Red Apples",
    brand: "FreshFarm",
    category: "Fruits & Vegetables",
    price: 120,
    mrp: 145,
    rating: 4.8,
    reviews: 389,
    delivery: 18,
    stock: 25,
    unit: "1 kg",
    icon: "🍎",
    description:
      "Crisp and naturally sweet red apples selected from fresh local inventory.",
  },
  {
    id: 3,
    name: "Farm Fresh Bananas",
    brand: "GreenFarm",
    category: "Fruits & Vegetables",
    price: 45,
    mrp: 55,
    rating: 4.6,
    reviews: 178,
    delivery: 15,
    stock: 40,
    unit: "1 kg",
    icon: "🍌",
    description:
      "Fresh bananas sourced from nearby farms and delivered quickly to your doorstep.",
  },
  {
    id: 4,
    name: "Potato Chips",
    brand: "Crunchy",
    category: "Snacks",
    price: 30,
    mrp: 35,
    rating: 4.5,
    reviews: 120,
    delivery: 12,
    stock: 35,
    unit: "100 g",
    icon: "🍟",
    description:
      "Crispy and delicious potato chips perfect for quick snacking.",
  },
  {
    id: 5,
    name: "Orange Juice",
    brand: "FreshSip",
    category: "Beverages",
    price: 85,
    mrp: 100,
    rating: 4.6,
    reviews: 210,
    delivery: 20,
    stock: 22,
    unit: "1 L",
    icon: "🧃",
    description:
      "Refreshing orange juice made for a delicious and healthy drink.",
  },
  {
    id: 6,
    name: "Shampoo",
    brand: "CarePlus",
    category: "Personal Care",
    price: 180,
    mrp: 220,
    rating: 4.4,
    reviews: 156,
    delivery: 28,
    stock: 15,
    unit: "650 ml",
    icon: "🧴",
    description:
      "Everyday shampoo for clean and healthy looking hair.",
  },
  {
    id: 7,
    name: "Dish Wash Liquid",
    brand: "CleanHome",
    category: "Household",
    price: 110,
    mrp: 135,
    rating: 4.5,
    reviews: 98,
    delivery: 25,
    stock: 19,
    unit: "500 ml",
    icon: "🧽",
    description:
      "Powerful dish wash liquid for everyday kitchen cleaning.",
  },
  {
    id: 8,
    name: "Chocolate Cookies",
    brand: "ChocoBite",
    category: "Snacks",
    price: 75,
    mrp: 90,
    rating: 4.7,
    reviews: 320,
    delivery: 14,
    stock: 30,
    unit: "200 g",
    icon: "🍪",
    description:
      "Delicious chocolate cookies with a rich and crunchy taste.",
  },
];

const categories = [
  {
    name: "Fruits & Vegetables",
    icon: "🍎",
  },
  {
    name: "Dairy & Breakfast",
    icon: "🥛",
  },
  {
    name: "Snacks",
    icon: "🍪",
  },
  {
    name: "Beverages",
    icon: "🥤",
  },
  {
    name: "Personal Care",
    icon: "🧴",
  },
  {
    name: "Household",
    icon: "🏠",
  },
];

function App() {
  const [page, setPage] = useState("home");

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("Coimbatore");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [deliveryFilter, setDeliveryFilter] = useState("all");

  const [authMode, setAuthMode] = useState("login");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [orders] = useState([
    {
      id: "QB1001",
      product: "Fresh Red Apples",
      quantity: 1,
      total: 120,
      status: "Out for Delivery",
      time: 18,
    },
  ]);

  const cartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    let matchesDelivery = true;

    if (deliveryFilter === "30") {
      matchesDelivery = product.delivery <= 30;
    }

    if (deliveryFilter === "60") {
      matchesDelivery = product.delivery <= 60;
    }

    if (deliveryFilter === "120") {
      matchesDelivery = product.delivery <= 120;
    }

    return matchesSearch && matchesDelivery;
  });

  function addToCart(product, amount = 1) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + amount,
            }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: amount,
        },
      ];
    });
  }

  function removeFromCart(productId) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );
  }

  function decreaseQuantity(productId) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === productId
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setQuantity(1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function closeProduct() {
    setSelectedProduct(null);
    setPage("home");
  }

  function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setIsLoggedIn(true);
    setUserName(email.split("@")[0]);
    setPage("home");

    alert("Login successful!");
  }

  function handleRegister(event) {
    event.preventDefault();

    if (!userName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoggedIn(true);
    setPage("home");

    alert("Registration successful!");
  }

  function logout() {
    setIsLoggedIn(false);
    setUserName("");
    setEmail("");
    setPassword("");
    setPage("home");
  }

  function scrollToProducts() {
    setPage("home");

    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  }

  return (
    <div className="app">

      {/* TOP DELIVERY BAR */}
      <div className="top-bar">
        ⚡ QuickBasket Express
        <span>Get your essentials delivered in minutes</span>
      </div>

      {/* NAVBAR */}
      <header className="navbar">

        <div
          className="logo"
          onClick={() => {
            setPage("home");
            setSelectedProduct(null);
          }}
        >
          🛒 <span>Quick</span>Basket
        </div>

        <nav>
          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={scrollToProducts}>
            Products
          </button>

          <button
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Categories
          </button>

          <button onClick={() => setPage("orders")}>
            Orders
          </button>
        </nav>

        <div className="location-box">
          📍
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Coimbatore</option>
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Madurai</option>
          </select>
        </div>

        <div className="top-search">
          🔍
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage("home");
            }}
          />
        </div>

        {isLoggedIn ? (
          <button
            className="user-button"
            onClick={logout}
          >
            👤 {userName}
          </button>
        ) : (
          <button
            className="login-button"
            onClick={() => {
              setAuthMode("login");
              setPage("auth");
            }}
          >
            Login
          </button>
        )}

        <button
          className="cart-button"
          onClick={() => setPage("cart")}
        >
          🛒
          <span>{cartItems}</span>
        </button>

      </header>

      {/* ================= HOME ================= */}

      {page === "home" && !selectedProduct && (
        <main>

          {/* HERO */}
          <section className="hero">

            <div className="hero-content">

              <div className="hero-badge">
                ⚡ SMART FAST-COMMERCE
              </div>

              <h1>
                Everything you need,
                <br />
                delivered in{" "}
                <span>minutes.</span>
              </h1>

              <p>
                Shop groceries, snacks and daily essentials
                from nearby inventory and get them delivered
                quickly.
              </p>

              <div className="hero-location">
                📍 Delivering to

                <select
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                >
                  <option>Coimbatore</option>
                  <option>Chennai</option>
                  <option>Bangalore</option>
                  <option>Madurai</option>
                </select>
              </div>

              <button
                className="primary-button"
                onClick={scrollToProducts}
              >
                Start Shopping →
              </button>

              <div className="hero-stats">

                <div>
                  <strong>⚡ 30 min</strong>
                  <span>Average delivery</span>
                </div>

                <div>
                  <strong>10K+</strong>
                  <span>Products</span>
                </div>

                <div>
                  <strong>⭐ 4.8</strong>
                  <span>Customer rating</span>
                </div>

              </div>

            </div>

            <div className="hero-card">

              <div className="delivery-card">

                <div className="delivery-icon">
                  🛵
                </div>

                <div>
                  <small>QUICK DELIVERY</small>

                  <h3>
                    28 MINUTES
                  </h3>

                  <p>
                    Your order is coming!
                  </p>
                </div>

              </div>

              <div className="hero-products">
                🍎 🥛 🍌 🍪 🧃
              </div>

            </div>

          </section>

          {/* CATEGORIES */}
          <section
            className="section"
            id="categories"
          >

            <div className="section-heading">

              <div>
                <span className="small-title">
                  SHOP BY CATEGORY
                </span>

                <h2>
                  What are you looking for?
                </h2>
              </div>

            </div>

            <div className="category-grid">

              {categories.map((category) => (
                <button
                  className="category-card"
                  key={category.name}
                  onClick={() =>
                    setSearch(category.name)
                  }
                >
                  <div className="category-icon">
                    {category.icon}
                  </div>

                  <strong>
                    {category.name}
                  </strong>

                  <span>
                    Explore products →
                  </span>
                </button>
              ))}

            </div>

          </section>

          {/* PRODUCTS */}
          <section
            className="section products-section"
            id="products"
          >

            <div className="section-heading">

              <div>
                <span className="small-title">
                  QUICK DELIVERY
                </span>

                <h2>
                  Products near you
                </h2>
              </div>

              <div className="filters">

                <button
                  className={
                    deliveryFilter === "all"
                      ? "active-filter"
                      : ""
                  }
                  onClick={() =>
                    setDeliveryFilter("all")
                  }
                >
                  All
                </button>

                <button
                  className={
                    deliveryFilter === "30"
                      ? "active-filter"
                      : ""
                  }
                  onClick={() =>
                    setDeliveryFilter("30")
                  }
                >
                  Under 30 min
                </button>

                <button
                  className={
                    deliveryFilter === "60"
                      ? "active-filter"
                      : ""
                  }
                  onClick={() =>
                    setDeliveryFilter("60")
                  }
                >
                  Under 1 hour
                </button>

              </div>

            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                🔍
                <h3>
                  No products found
                </h3>
                <p>
                  Try another search.
                </p>
              </div>
            ) : (
              <div className="product-grid">

                {filteredProducts.map((product) => {

                  const discount = Math.round(
                    ((product.mrp - product.price) /
                      product.mrp) *
                    100
                  );

                  return (
                    <div
                      className="product-card"
                      key={product.id}
                    >

                      <div
                        className="product-image"
                        onClick={() =>
                          openProduct(product)
                        }
                      >

                        <span className="discount">
                          {discount}% OFF
                        </span>

                        <span className="product-emoji">
                          {product.icon}
                        </span>

                        <span className="delivery-badge">
                          ⚡ {product.delivery} min
                        </span>

                      </div>

                      <div className="product-info">

                        <span className="product-category">
                          {product.category}
                        </span>

                        <h3>
                          {product.name}
                        </h3>

                        <p className="product-unit">
                          {product.unit}
                        </p>

                        <div className="rating">
                          ⭐ {product.rating}
                          <span>
                            ({product.reviews})
                          </span>
                        </div>

                        <div className="price-row">

                          <strong>
                            ₹{product.price}
                          </strong>

                          <del>
                            ₹{product.mrp}
                          </del>

                        </div>

                        <div className="stock">
                          🟢 {product.stock} available
                        </div>

                        <button
                          className="add-button"
                          onClick={() =>
                            addToCart(product)
                          }
                        >
                          + Add to Cart
                        </button>

                        <button
                          className="view-button"
                          onClick={() =>
                            openProduct(product)
                          }
                        >
                          View Details
                        </button>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </section>

          {/* QUICKBASKET FEATURES */}
          <section className="why-section">

            <div className="section-heading center">

              <span className="small-title">
                WHY QUICKBASKET?
              </span>

              <h2>
                Shopping designed for speed
              </h2>

            </div>

            <div className="feature-grid">

              <div className="feature-card">
                <div>⚡</div>
                <h3>Fast Delivery</h3>
                <p>
                  Get your products in minutes,
                  not days.
                </p>
              </div>

              <div className="feature-card">
                <div>📍</div>
                <h3>Local Inventory</h3>
                <p>
                  Products available from nearby
                  inventory.
                </p>
              </div>

              <div className="feature-card">
                <div>📦</div>
                <h3>Live Tracking</h3>
                <p>
                  Track your order from store to
                  doorstep.
                </p>
              </div>

              <div className="feature-card">
                <div>🔒</div>
                <h3>Secure Shopping</h3>
                <p>
                  Safe and reliable shopping
                  experience.
                </p>
              </div>

            </div>

          </section>

        </main>
      )}

      {/* ================= PRODUCT DETAILS ================= */}

      {selectedProduct && (
        <main className="detail-page">

          <button
            className="back-button"
            onClick={closeProduct}
          >
            ← Back to Products
          </button>

          <div className="detail-container">

            <div className="detail-image">

              <span>
                {selectedProduct.icon}
              </span>

              <div>
                ⚡ QuickBasket Fast Delivery
              </div>

            </div>

            <div className="detail-info">

              <span className="small-title">
                {selectedProduct.category}
              </span>

              <h1>
                {selectedProduct.name}
              </h1>

              <p>
                Brand:
                <strong>
                  {" "}
                  {selectedProduct.brand}
                </strong>
              </p>

              <div className="rating">
                ⭐ {selectedProduct.rating}
                <span>
                  {" "}
                  {selectedProduct.reviews}
                  {" "}Ratings & Reviews
                </span>
              </div>

              <div className="detail-price">

                <strong>
                  ₹{selectedProduct.price}
                </strong>

                <del>
                  ₹{selectedProduct.mrp}
                </del>

              </div>

              <div className="quick-delivery">

                <small>
                  ⚡ QUICK DELIVERY
                </small>

                <h2>
                  Get it in{" "}
                  {selectedProduct.delivery}
                  {" "}minutes
                </h2>

                <p>
                  📍 Available at your nearest{" "}
                  {location} inventory hub
                </p>

                <strong>
                  🟢 {selectedProduct.stock}
                  {" "}units available
                </strong>

              </div>

              <p className="description">
                {selectedProduct.description}
              </p>

              <div className="quantity-section">

                <strong>
                  Quantity
                </strong>

                <div className="quantity">

                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(
                          1,
                          quantity - 1
                        )
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="detail-actions">

                <button
                  className="secondary-button"
                  onClick={() =>
                    addToCart(
                      selectedProduct,
                      quantity
                    )
                  }
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="primary-button"
                  onClick={() => {
                    addToCart(
                      selectedProduct,
                      quantity
                    );
                    setSelectedProduct(null);
                    setPage("cart");
                  }}
                >
                  Buy Now →
                </button>

              </div>

              <div className="product-highlights">

                <h3>
                  Product Highlights
                </h3>

                <p>
                  ✓ Fast local delivery
                </p>

                <p>
                  ✓ Fresh inventory
                </p>

                <p>
                  ✓ Quality checked
                </p>

                <p>
                  ✓ Secure packaging
                </p>

              </div>

            </div>

          </div>

        </main>
      )}

      {/* ================= CART ================= */}

      {page === "cart" && !selectedProduct && (
        <main className="page-container">

          <div className="page-title">
            <span>🛒 YOUR CART</span>
            <h1>
              Shopping Cart
            </h1>
          </div>

          {cart.length === 0 ? (

            <div className="empty-page">

              <div>🛒</div>

              <h2>
                Your cart is empty
              </h2>

              <p>
                Add some products to continue.
              </p>

              <button
                className="primary-button"
                onClick={scrollToProducts}
              >
                Start Shopping
              </button>

            </div>

          ) : (

            <div className="cart-layout">

              <div className="cart-items">

                {cart.map((item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <div className="cart-product-icon">
                      {item.icon}
                    </div>

                    <div className="cart-product-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.unit}
                      </p>

                      <strong>
                        ₹{item.price}
                      </strong>

                    </div>

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          addToCart(item)
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                ))}

              </div>

              <div className="cart-summary">

                <h2>
                  Order Summary
                </h2>

                <div>
                  <span>
                    Items
                  </span>

                  <strong>
                    {cartItems}
                  </strong>
                </div>

                <div>
                  <span>
                    Delivery
                  </span>

                  <strong className="free">
                    FREE
                  </strong>
                </div>

                <hr />

                <div className="total">
                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{cartTotal}
                  </strong>
                </div>

                <button
                  className="primary-button full"
                  onClick={() => {
                    if (!isLoggedIn) {
                      setAuthMode("login");
                      setPage("auth");
                    } else {
                      setPage("orders");
                    }
                  }}
                >
                  Proceed to Checkout →
                </button>

              </div>

            </div>

          )}

        </main>
      )}

      {/* ================= LOGIN / REGISTER ================= */}

      {page === "auth" && (
        <main className="auth-page">

          <div className="auth-card">

            <div className="auth-logo">
              🛒
            </div>

            {authMode === "login" ? (
              <>
                <span className="small-title">
                  WELCOME BACK
                </span>

                <h1>
                  Login to QuickBasket
                </h1>

                <p>
                  Continue your fast shopping
                  experience.
                </p>

                <form onSubmit={handleLogin}>

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <button
                    className="primary-button full"
                    type="submit"
                  >
                    Login →
                  </button>

                </form>

                <p className="auth-switch">
                  Don't have an account?

                  <button
                    onClick={() =>
                      setAuthMode("register")
                    }
                  >
                    Create Account
                  </button>
                </p>
              </>
            ) : (
              <>
                <span className="small-title">
                  CREATE ACCOUNT
                </span>

                <h1>
                  Join QuickBasket
                </h1>

                <p>
                  Create your account and start
                  shopping faster.
                </p>

                <form onSubmit={handleRegister}>

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) =>
                      setUserName(e.target.value)
                    }
                  />

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <button
                    className="primary-button full"
                    type="submit"
                  >
                    Create Account →
                  </button>

                </form>

                <p className="auth-switch">
                  Already have an account?

                  <button
                    onClick={() =>
                      setAuthMode("login")
                    }
                  >
                    Login
                  </button>
                </p>
              </>
            )}

          </div>

        </main>
      )}

      {/* ================= ORDERS ================= */}

      {page === "orders" && (
        <main className="page-container">

          <div className="page-title">
            <span>📦 MY ORDERS</span>

            <h1>
              Your Orders
            </h1>

            <p>
              Track all your QuickBasket deliveries.
            </p>
          </div>

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-header">

                <div>
                  <small>
                    ORDER ID
                  </small>

                  <strong>
                    {order.id}
                  </strong>
                </div>

                <span className="status">
                  🟢 {order.status}
                </span>

              </div>

              <div className="order-body">

                <div className="order-product-icon">
                  🍎
                </div>

                <div>
                  <h3>
                    {order.product}
                  </h3>

                  <p>
                    Quantity: {order.quantity}
                  </p>

                  <strong>
                    ₹{order.total}
                  </strong>
                </div>

                <div className="order-delivery">

                  <strong>
                    ⚡ {order.time} minutes
                  </strong>

                  <span>
                    Estimated delivery
                  </span>

                </div>

              </div>

              <button
                className="track-button"
                onClick={() =>
                  setPage("tracking")
                }
              >
                🚚 Track Order →
              </button>

            </div>

          ))}

        </main>
      )}

      {/* ================= TRACKING ================= */}

      {page === "tracking" && (
        <main className="page-container">

          <div className="page-title">
            <span>
              🚚 LIVE DELIVERY
            </span>

            <h1>
              Track Your Order
            </h1>

            <p>
              Your QuickBasket order is on the way.
            </p>
          </div>

          <div className="tracking-card">

            <div className="tracking-top">

              <div>
                <small>
                  ORDER #QB1001
                </small>

                <h2>
                  Arriving in 18 minutes
                </h2>

                <p>
                  Delivering to {location}
                </p>
              </div>

              <div className="tracking-icon">
                🛵
              </div>

            </div>

            <div className="progress-line">

              <div className="progress-fill"></div>

            </div>

            <div className="tracking-steps">

              <div className="completed">
                <span>✓</span>
                <strong>Order Placed</strong>
                <small>09:20 AM</small>
              </div>

              <div className="completed">
                <span>✓</span>
                <strong>Preparing</strong>
                <small>09:23 AM</small>
              </div>

              <div className="completed">
                <span>✓</span>
                <strong>Packed</strong>
                <small>09:28 AM</small>
              </div>

              <div className="current">
                <span>🛵</span>
                <strong>Out for Delivery</strong>
                <small>Now</small>
              </div>

              <div>
                <span>🏠</span>
                <strong>Delivered</strong>
                <small>Expected soon</small>
              </div>

            </div>

            <div className="delivery-message">
              ⚡ Your delivery partner is heading
              to your location.
            </div>

          </div>

        </main>
      )}

      {/* CART FLOATING BAR */}

      {cart.length > 0 &&
        page !== "cart" &&
        page !== "auth" && (
          <div className="floating-cart">

            <div>
              🛒
              <strong>
                {cartItems} items
              </strong>
            </div>

            <strong>
              ₹{cartTotal}
            </strong>

            <button
              onClick={() => setPage("cart")}
            >
              View Cart →
            </button>

          </div>
        )}

      {/* FOOTER */}

      <footer>

        <div>
          <h2>
            🛒 Quick<span>Basket</span>
          </h2>

          <p>
            Fast shopping. Get it in minutes.
          </p>
        </div>

        <div>
          <h3>
            Quick Links
          </h3>

          <p onClick={() => setPage("home")}>
            Home
          </p>

          <p onClick={() => setPage("orders")}>
            Orders
          </p>

          <p onClick={() => setPage("cart")}>
            Cart
          </p>
        </div>

        <div>
          <h3>
            Delivery
          </h3>

          <p>
            Fast Delivery
          </p>

          <p>
            Local Inventory
          </p>

          <p>
            Live Tracking
          </p>
        </div>

        <div>
          <h3>
            Support
          </h3>

          <p>
            Help Center
          </p>

          <p>
            Delivery Information
          </p>

          <p>
            Returns
          </p>
        </div>

      </footer>

    </div>
  );
}

export default App;