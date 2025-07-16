import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Orders = () => {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${url}/api/orders/user-orders/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-100 to-pink-200">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-pink-700 mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-pink-200 transition hover:shadow-xl"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Order ID:</span>{" "}
                  {order._id}
                </div>
                <div
                  className={`text-sm font-semibold ${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : order.status === "Delivered"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  Status: {order.status}
                </div>
              </div>

              {/* Order Info */}
              <div className="text-sm text-gray-700 mb-2">
                Placed on:{" "}
                <span className="text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="text-md font-bold text-green-700 mb-4">
                Total Amount: ₹{order.orderValue}
              </div>

              {/* Order Items */}
              <ul className="space-y-3">
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 p-3 bg-white border rounded-md shadow-sm"
                  >
                    <img
                      src={item.productId?.productImage?.[0]?.url}
                      alt={item.productId?.productName}
                      className="w-16 h-16 object-contain rounded border"
                    />

                    <div className="flex-1">
                      <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {item.productId?.productName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Price: ₹{item.productId?.price}
                      </p>
                      <p className="text-sm text-indigo-600 font-medium">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
