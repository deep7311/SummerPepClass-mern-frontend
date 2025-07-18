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
import Dashboard from "./components/Dashboard";
import ViewProduct from "./components/ViewProduct";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider, AppContext } from "./context/AppContext";
import Header from "./components/Header";

// Separate component for routing and navbar logic
function AppContent() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin nested routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-3 text-sm text-gray-600">
        &copy; 2025 Mega Store
      </footer>

      {/* Toast */}
      <ToastContainer />
    </>
  );
}

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
