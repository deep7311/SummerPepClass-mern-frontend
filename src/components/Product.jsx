import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const { cart, addToCart, incrementQuantity, decrementQuantity } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${url}/api/products/all-products?page=${page}&limit=${limit}&search=${search}`);
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
    // <div className="min-h-screen px-4 py-10 bg-gradient-to-b from-blue-50 to-blue-100">
    //   <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-10">Our Products</h1>

    //   <div className="flex justify-center mb-10">
    //     <input
    //       type="text"
    //       placeholder="Search products..."
    //       value={search}
    //       onChange={(e) => {
    //         setSearch(e.target.value);
    //         setPage(1);
    //       }}
    //       className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none transition"
    //     />
    //   </div>

    //   {products.length === 0 ? (
    //     <div className="text-center mt-20 text-xl font-semibold text-gray-500">No Products Found.</div>
    //   ) : (
    //     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
    //       {products.map((product) => {
    //         const cartItem = getCartItem(product._id);
    //         const isInCart = !!cartItem;

    //         return (
    //           <div
    //             key={product._id}
    //             onClick={() => navigate(`/product/${product._id}`)}
    //             className={`relative cursor-pointer ${
    //               isInCart
    //                 ? "bg-gradient-to-br from-green-100 via-green-50 to-green-200"
    //                 : "bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100"
    //             } rounded-2xl p-4 shadow hover:shadow-lg border hover:border-indigo-300 transition-all duration-300 flex flex-col items-center group`}
    //           >
    //             {/* agar item cart me hai to uske liye green tick */}
    //             {isInCart && (
    //               <FaCheckCircle className="absolute top-2 left-2 text-green-500 text-xl z-10" />
    //             )}

    //             {/* Product ki Image */}
    //             <img
    //               src={product.productImage?.[0]?.url}
    //               alt={product.productName}
    //               className="w-20 h-20 object-contain mb-3 transition-transform group-hover:scale-105 duration-300"
    //             />

    //             <h2 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
    //               {product.productName}
    //             </h2>

    //             <p className="text-pink-600 font-bold text-sm mt-1">₹{product.price}</p>

    //             {isInCart ? (
    //               <div
    //                 className="flex items-center gap-2 mt-3"
    //                 onClick={(e) => e.stopPropagation()}
    //               >
    //                 <button
    //                   onClick={() => decrementQuantity(product._id)}
    //                   className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded shadow"
    //                 >
    //                   -
    //                 </button>
    //                 <span className="text-sm font-medium">{cartItem.quantity}</span>
    //                 <button
    //                   onClick={() => incrementQuantity(product._id)}
    //                   className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded shadow"
    //                 >
    //                   +
    //                 </button>
    //               </div>
    //               ) : (
    //               <button
    //                 onClick={(e) => {
    //                   e.stopPropagation();
    //                   addToCart(product);
    //                 }}
    //                 className="mt-3 text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded shadow transition"
    //               >
    //                 Add to Cart
    //               </button>
    //             )}
    //           </div>
    //         );
    //       })}
    //     </div>
    //   )}

    //   {products.length > 0 && (
    //     <div className="flex justify-center items-center gap-6 mt-12">
    //       <button
    //         onClick={() => setPage(page - 1)}
    //         disabled={page === 1}
    //         className={`px-4 py-2 rounded-md text-sm font-medium shadow transition-all ${
    //           page === 1
    //             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
    //             : "bg-indigo-500 hover:bg-indigo-600 text-white"
    //         }`}
    //       >
    //         Prev
    //       </button>

    //       <span className="text-sm text-gray-700 font-medium">
    //         Page {page} of {totalPages}
    //       </span>

    //       <button
    //         onClick={() => setPage(page + 1)}
    //         disabled={page === totalPages}
    //         className={`px-4 py-2 rounded-md text-sm font-medium shadow transition-all ${
    //           page === totalPages
    //             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
    //             : "bg-indigo-500 hover:bg-indigo-600 text-white"
    //         }`}
    //       >
    //         Next
    //       </button>
    //     </div>
    //   )}
    // </div>
    // 🟪🟣 Beautiful background & card styling added
<div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-100">
  <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-10">
    Our Products
  </h1>

  <div className="flex justify-center mb-10">
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      className="w-full max-w-md px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 outline-none transition"
    />
  </div>

  {products.length === 0 ? (
    <div className="text-center mt-20 text-xl font-semibold text-gray-500">
      No Products Found.
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
      {products.map((product) => {
        const cartItem = getCartItem(product._id);
        const isInCart = !!cartItem;

        return (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className={`relative cursor-pointer group rounded-2xl p-4 shadow-md border transition-all duration-300 flex flex-col items-center
              ${
                isInCart
                  ? "bg-gradient-to-br from-green-200 via-green-100 to-green-300 border-green-300 hover:shadow-green-300"
                  : "bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 border-pink-200 hover:shadow-xl hover:shadow-pink-200"
              }`}
          >
            {/* ✅ Tick if in cart */}
            {isInCart && (
              <FaCheckCircle className="absolute top-2 left-2 text-green-600 text-xl z-10" />
            )}

            {/* 🖼️ Image */}
            <img
              src={product.productImage?.[0]?.url}
              alt={product.productName}
              className="w-20 h-20 object-contain mb-3 transition-transform group-hover:scale-110 duration-300"
            />

            {/* 🔤 Title */}
            <h2 className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300 text-center">
              {product.productName}
            </h2>

            {/* 💰 Price */}
            <p className="text-pink-600 font-bold text-sm mt-1">
              ₹{product.price}
            </p>

            {/* 🛒 Buttons */}
            {isInCart ? (
              <div
                className="flex items-center gap-2 mt-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => decrementQuantity(product._id)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded shadow"
                >
                  -
                </button>
                <span className="text-sm font-medium">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => incrementQuantity(product._id)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded shadow"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="mt-3 text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  )}

  {/* Pagination Buttons */}
  {products.length > 0 && (
    <div className="flex justify-center items-center gap-6 mt-12">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded-md text-sm font-medium shadow transition-all ${
          page === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
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
            : "bg-purple-600 hover:bg-purple-700 text-white"
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
