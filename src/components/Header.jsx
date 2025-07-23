import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { IoMenu, IoClose } from "react-icons/io5";
import logo from '../assets/logo.png';

const Header = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser({});
    toast.success("Logged out successfully", { position: "top-center" });
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 text-white sticky top-0 z-50 shadow-xl backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          {/* <h1 className="text-2xl font-bold tracking-wide hidden sm:block">MyApp</h1> */}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-5 font-medium text-white">
          <Link to="/" className="hover:underline hover:text-yellow-200 transition">Home</Link>
          <Link to="/cart" className="hover:underline hover:text-yellow-200 transition">Cart</Link>
          <Link to="/order" className="hover:underline hover:text-yellow-200 transition">Orders</Link>
          {user?.token && user?.role === "Admin" && (
            <Link to="/admin" className="hover:underline hover:text-yellow-200 transition">Admin</Link>
          )}
          {user?.token ? (
            <>
              <Link to="/profile" className="hover:underline hover:text-yellow-200 transition">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-yellow-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-yellow-50 transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 animate-fadeInDown">
          <div className="bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-500 rounded-xl p-4 space-y-3 shadow-lg backdrop-blur-md">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-white font-medium hover:underline">Home</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="block text-white font-medium hover:underline">Cart</Link>
            <Link to="/order" onClick={() => setMenuOpen(false)} className="block text-white font-medium hover:underline">Orders</Link>
            {user?.token && user?.role === "Admin" && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="block text-white font-medium hover:underline">Admin</Link>
            )}
            {user?.token ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block text-white font-medium hover:underline">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-white text-pink-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-50 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
