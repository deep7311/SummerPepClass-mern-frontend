import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { FaUserCircle, FaEnvelope, FaUserShield, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AppContext);

  const fetchProfile = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${url}/api/users/${user._id}/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProfile(res.data);
    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchProfile();
    }
  }, [user]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
        <p className="text-gray-600 text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-10 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-md shadow-xl rounded-2xl border p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT SIDE - USER DETAILS */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <FaUserCircle className="text-indigo-600 text-6xl" />
            <div>
              <h2 className="text-3xl font-bold text-indigo-700">{profile.name}</h2>
              <p className="text-sm text-gray-600">Welcome to your profile dashboard</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-800">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-500" />
              <p className="font-medium">Email: <span className="font-normal">{profile.email}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <FaUserShield className="text-indigo-500" />
              <p className="font-medium">Role: <span className="font-normal">{profile.role}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-indigo-500" />
              <p className="font-medium">Joined:{" "}
                <span className="font-normal">{new Date(profile.createdAt).toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - ACTION BUTTONS */}
        <div className="flex flex-col justify-center items-center gap-6">
          <button className="w-full md:w-2/3 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Update Profile
          </button>
          <button className="w-full md:w-2/3 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
