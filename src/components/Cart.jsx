import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    user,
    setCart,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${url}/api/orders/place-order`, {
        orderValue: totalPrice,
        userId: user._id,
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);

        // Clear cart
        setCart([]);

        // Navigate to Order Page
        navigate("/order");
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while placing order");
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        My Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 max-w-4xl mx-auto">
            {cart.map((product) => (
              <li
                key={product._id}
                className="bg-white p-4 rounded-xl shadow border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.productImage?.[0]?.url}
                    alt={product.productName}
                    className="w-20 h-20 object-contain border rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {product.productName}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementQuantity(product._id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(product._id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Total Summary */}
          <div className="max-w-4xl mx-auto mt-8 bg-white p-4 rounded-xl shadow border text-right">
            <p className="text-lg font-semibold text-gray-700">
              Total Items: <span className="text-indigo-700">{totalItems}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Total Price:{" "}
              <span className="text-green-600">₹{totalPrice}</span>
            </p>
          </div>
        </>
      )}

      {/* Checkout Button */}
      {user ? (
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-4 py-2 rounded mt-6 mx-auto block"
        >
          Checkout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-6 mx-auto block"
        >
          Login to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
