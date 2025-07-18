import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Admin = () => {
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Admin Dashboard
      </h2>

      {/* Navigation Tabs */}
      <nav className="flex justify-center gap-6 mb-10">
        {["dashboard","users", "products", "orders"].map((item) => (
          <Link
            key={item}
            to={item}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === item
                ? "bg-indigo-600 text-white shadow-md"
                : "text-indigo-600 hover:bg-indigo-100"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Nested route content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
