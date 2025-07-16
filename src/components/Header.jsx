import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { IoMenu, IoClose } from "react-icons/io5";

const Header = () => {
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        setUser({});
        toast.success("Logged out successfully", { position: "top-center" });
        navigate("/");
        setIsMenuOpen(false); // menu close karna hai logout ke baad
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-2">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img src={logo} alt="Logo" className="w-24 h-auto" />
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:bg-white/20 px-3 py-1 rounded transition">
                            Home
                        </Link>
                        <Link to="/cart" className="hover:bg-white/20 px-3 py-1 rounded transition">
                            My Cart
                        </Link>
                        <Link to="/order" className="hover:bg-white/20 px-3 py-1 rounded transition">
                            My Order
                        </Link>
                        {user?.token && user?.role === "Admin" && (
                            <Link to="/admin" className="hover:bg-white/20 px-3 py-1 rounded transition">
                                Admin
                            </Link>
                        )}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {user?.token ? (
                            <>
                                <Link to="/profile" className="hover:bg-white/20 px-3 py-1 rounded transition">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-white text-purple-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-white text-purple-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            {isMenuOpen ? <IoClose className="w-9 h-9" /> : <IoMenu className="w-9 h-9" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4 pt-2 animate-fadeInDown">
                    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-opacity-90 backdrop-blur-md rounded-xl p-4 space-y-3 shadow-lg transition-all duration-300 ease-in-out">

                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition">
                            Home
                        </Link>
                        <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition">
                            My Cart
                        </Link>
                        <Link to="/order" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition">
                            My Order
                        </Link>
                        {user?.token && user?.role === "Admin" && (
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition">
                                Admin
                            </Link>
                        )}
                        {user?.token ? (
                            <>
                                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition">
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="w-full text-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition">
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
