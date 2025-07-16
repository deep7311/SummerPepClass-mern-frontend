import "./App.css";
import Admin from "./components/Admin";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Order from "./components/Order";
import Product from "./components/Product";
import Register from "./components/Register";
import Users from "./components/Users";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Profile from "./components/Profile";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider, AppContext } from "./context/AppContext";
import { useContext } from "react";

// Separate component for routing and navbar logic
function AppContent() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({});
    toast.success("Logged out successfully", { position: "top-center" });
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">MEGA STORE</h1>
      </header>

      {/* Navigation Bar */}
      <nav className="flex flex-wrap justify-center gap-4 py-4 bg-white shadow">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          Home
        </Link>
        <Link
          to="/cart"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          My Cart
        </Link>
        <Link
          to="/order"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          My Order
        </Link>

        {/* Admin tab only if token exists AND user is admin */}
        {user?.token && user?.role === "Admin" && (
          <Link
            to="/admin"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Admin
          </Link>
        )}

        {/* Profile + Logout if token exists */}
        {user?.token ? (
          <>
            <Link
              to="/profile"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Main Routes */}
      <main className="flex-grow px-4 py-6 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin nested routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Users />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </main>

      {/* Toast Container */}
      <ToastContainer />

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-3 text-sm text-gray-600">
        &copy; 2023 Mega Store
      </footer>
    </>
  );
}

// Main App wrapper
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <AppProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
