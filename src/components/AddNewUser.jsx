import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const AddUser = ({ setDisplayAddUserForm, fetchUsers }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  const handleOnChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${url}/api/users/create-user`, data);
      if (res.data.success) {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 3000,
          theme: 'light',
        });
        fetchUsers();
        setDisplayAddUserForm(false);
        setData({
          name: '',
          email: '',
          password: '',
          role: 'User',
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
      console.log(error);
    }
  };

  return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 px-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg relative p-6">
          {/* Close Button */}
          <button
            onClick={() => setDisplayAddUserForm(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition text-2xl cursor-pointer"
          >
            <IoClose />
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Add New User</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={data.role}
                onChange={handleOnChange}
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    )
};

export default AddUser;
