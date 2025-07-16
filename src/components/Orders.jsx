import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${url}/api/orders/user-orders`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const url = import.meta.env.VITE_API_URL;
      await axios.patch(
        `${url}/api/orders/update-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    if (user?.token) fetchOrders();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo-100 text-left text-sm">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="px-4 py-2 text-sm">{order._id}</td>
                <td className="px-4 py-2 text-sm">{order.userId?.name || "User"}</td>
                <td className="px-4 py-2 text-sm text-green-600 font-semibold">
                  ₹{order.orderValue}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm text-blue-600 underline cursor-pointer">
                  View
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
