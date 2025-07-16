import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const { cart, addToCart, incrementQuantity, decrementQuantity } = useContext(AppContext);

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

  const getCartItem = (productId) => cart.find((item) => item._id === productId);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-10">
        Our Products
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none transition"
        />
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center mt-20 text-xl font-semibold text-gray-500">
          No Products Found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((product) => {
            const cartItem = getCartItem(product._id);
            return (
              <div
                key={product._id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-lg border border-gray-200 transition-all flex flex-col items-center"
              >
                <img
                  src={product.productImage?.[0]?.url}
                  alt={product.productName}
                  className="w-24 h-24 object-contain mb-4"
                />
                <h2 className="text-base font-semibold text-gray-800 text-center">
                  {product.productName}
                </h2>
                <p className="text-xs text-gray-500 text-center mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-indigo-600 font-bold text-sm mt-2">
                  ₹{product.price}
                </p>

                {/* Cart Buttons */}
                {cartItem ? (
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => decrementQuantity(product._id)}
                      className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded shadow"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{cartItem.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(product._id)}
                      className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded shadow"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded shadow transition"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {products.length > 0 && (
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md text-sm font-medium shadow transition-all ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            Prev
          </button>

          <span className="text-sm text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md text-sm font-medium shadow transition-all ${
              page === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
