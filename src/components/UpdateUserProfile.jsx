import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const UpdateUserProfile = ({ setOpenUpdateProfilePage }) => {
  const { user, setUser } = useContext(AppContext);
  const [updateDetails, setUpdateDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.put(
        `${url}/api/users/${user._id}/update-profile`,
        updateDetails,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // context ko update karenge
      setUser({ ...user, ...res.data });

      toast.success("Profile updated successfully!");
      setOpenUpdateProfilePage(false);
    } catch (error) {
      console.log("Update error:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleUpdateUserProfile}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-indigo-600 text-center">Update Profile</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={updateDetails.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={updateDetails.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={updateDetails.mobile}
            onChange={handleChange}
            maxLength={10}
            placeholder="10-digit number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => setOpenUpdateProfilePage(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
