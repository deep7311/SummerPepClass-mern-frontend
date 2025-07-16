import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const { cart, addToCart, incrementQuantity, decrementQuantity } =
    useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.get(
        `${url}/api/products/all-products?page=${page}&limit=${limit}&search=${search}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  // Check if product is in cart
  const getCartItem = (productId) =>
    cart.find((item) => item._id === productId);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-sky-50 to-blue-100">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-8">
        Our Products
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none"
        />
      </div>

      {/* Grid Cards */}
      {products.length === 0 ? (
        <div className="text-center mt-20 text-xl font-semibold text-gray-500">
          No Products Found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {products.map((product) => {
            const cartItem = getCartItem(product._id);
            return (
              <div
                key={product._id}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-200 flex flex-col items-center"
              >
                <img
                  src={product.productImage?.[0]?.url}
                  alt={product.productName}
                  className="w-24 h-24 object-contain mb-3"
                />

                <h2 className="text-sm font-semibold text-gray-800 text-center">
                  {product.productName}
                </h2>
                <p className="text-xs text-gray-500 text-center line-clamp-2">
                  {product.description}
                </p>
                <p className="text-indigo-600 font-bold text-sm mt-2">
                  ₹{product.price}
                </p>

                {cartItem ? (
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => decrementQuantity(product._id)}
                      className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(product._id)}
                      className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded shadow-sm transition"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-md font-medium text-sm shadow transition ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          Prev
        </button>

        <span className="text-sm font-medium text-gray-700 mt-1">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-md font-medium text-sm shadow transition ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
