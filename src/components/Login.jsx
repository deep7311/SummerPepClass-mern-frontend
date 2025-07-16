import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${url}/api/users/login`, data);
      setUser({
        ...res.data.userObj,
        token: res.data.token,
      });
      console.log(res.data)

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Invalid credentials", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-600">
          Login
        </h2>

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
