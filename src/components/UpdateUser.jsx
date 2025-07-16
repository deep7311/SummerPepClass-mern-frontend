import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const UpdateUser = ({
  setDisplayUpdateUserForm,
  fetchUsers,
  updatedUser,
  setSelectedUserToUpdate
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  const { user } = useContext(AppContext);

  useEffect(() => {
    if (updatedUser) {
      console.log(updatedUser);
      setFormData({
        name: updatedUser.name || '',
        email: updatedUser.email || '',
        password: '',
        role: updatedUser.role || 'User',
      });
    }
  }, [updatedUser]);

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.put(`${url}/api/users/update-user/${updatedUser._id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 3000,
          theme: 'light',
        });
        fetchUsers();
        setDisplayUpdateUserForm(false);
        setSelectedUserToUpdate(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
      console.log(error);
    }
  };

  const closeForm = () => {
    setDisplayUpdateUserForm(false);
    setSelectedUserToUpdate(null);
  };

  return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg relative p-6">
          {/* Close Button */}
          <button
            onClick={closeForm}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition text-2xl"
          >
            <IoClose />
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Update User</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                value={formData.email}
                onChange={handleOnChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password (optional)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Leave blank to keep existing password"
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleOnChange}
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              >
                Update User
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
};

export default UpdateUser;
