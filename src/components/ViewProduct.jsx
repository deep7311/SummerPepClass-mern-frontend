import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const { addToCart, cart } = useContext(AppContext);

  const fetchProduct = async () => {
    const url = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.get(`${url}/api/products/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const isInCart = cart.some((item) => item._id === product._id);

  if (loading)
    return <div className="text-center py-10 text-lg">Loading...</div>;

  if (!product)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left - Product ki Images */}
        <div className="w-full md:w-1/2 p-6 flex justify-center items-center bg-gray-100">
          <img
            src={product.productImage?.[0]?.url}
            alt={product.productName}
            className="w-80 h-80 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right - product ki Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {product.productName}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              {product.description || "No description available."}
            </p>

            {/* Price */}
            <div className="mb-4">
              <p className="text-2xl font-bold text-pink-600 mb-1">&#8377;{product.price}</p>
              <p className="text-xs text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* Delivery Info */}
            <div className="mb-4">
              <p className="text-sm text-green-600 font-medium">
                Free Delivery within 4-7 days
              </p>
              <p className="text-xs text-gray-400">
                Check availability for your pincode
              </p>
            </div>

            {/* Warranty related information yaha par */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">7 Days Replacement Policy</p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div>
            {isInCart ? (
              <button
                disabled
                className="w-full md:w-auto bg-gray-400 text-white text-sm font-medium px-6 py-3 rounded-lg shadow cursor-not-allowed"
              >
                Already in Cart
              </button>
            ) : (
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.productName} added to cart`);
                  navigate("/cart"); // cart me navigate karenge agar add to cart hua to
                }}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-3 rounded-lg shadow transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
