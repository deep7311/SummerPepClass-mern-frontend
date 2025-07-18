import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { AppContext } from "../context/AppContext";


// Chartjs ke elements ko register karna zaroori hai
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const [data, setData] = useState(null);
    const { user } = useContext(AppContext);

    // Backend se dashboard data fetch karne ka function
    const fetchDashboardData = async () => {
        try {
            const url = import.meta.env.VITE_API_URL;
            const res = await axios.get(`${url}/api/admin/dashboard`, {
                headers: { Authorization: `Bearer ${user?.token}` },
                withCredentials: true,
            });
            setData(res.data);
        } catch (error) {
            console.error("Error fetching dashboard data", error);
        }
    };

    // Component mount hote hi data fetch karo
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Jab tak data load ho raha ho, loading
    if (!data) return <p className="text-center mt-8">Loading dashboard...</p>;

    // Bar chart data: order status ke hisaab se
    const orderStatusData = {
        labels: ["Pending", "Shipped", "Delivered"],
        datasets: [
            {
                label: "Orders",
                data: [data.pendingOrders, data.shippedOrders, data.deliveredOrders],
                backgroundColor: ["#facc15", "#60a5fa", "#34d399"],
            },
        ],
    };

    // Pie chart data: total users aur products ke liye
    const userProductPieData = {
        labels: ["Users", "Products"],
        datasets: [
            {
                label: "Counts",
                data: [data.totalUsers, data.totalProducts],
                backgroundColor: ["#6366f1", "#f472b6"],
            },
        ],
    };

    return (
        <div className="p-6 md:p-10">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
                📊 Admin Analytics Dashboard
            </h2>

            {/* Chart Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="bg-white shadow-lg p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Users vs Products</h3>
                    <Pie data={userProductPieData} />
                </div>

                {/* Bar Chart */}
                <div className="bg-white shadow-lg p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Order Status</h3>
                    <Bar data={orderStatusData} options={{ responsive: true, animation: true }} />
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                <Card title="👥 Total Users" value={data.totalUsers} color="indigo" />
                <Card title="🛍️ Total Products" value={data.totalProducts} color="pink" />
                <Card title="📦 Total Orders" value={data.totalOrders} color="yellow" />
                <Card title="✅ Delivered Orders" value={data.deliveredOrders} color="green" />
            </div>
        </div>
    );
};

// Stat Card Component ka new component banaya hai niche cards dikhane ke liye
const Card = ({ title, value, color }) => {
    const bgColor = {
        indigo: "bg-indigo-100 text-indigo-700",
        pink: "bg-pink-100 text-pink-700",
        yellow: "bg-yellow-100 text-yellow-700",
        green: "bg-green-100 text-green-700",
    }[color];

    return (
        <div className={`p-4 rounded-xl shadow-md text-center ${bgColor}`}>
            <h4 className="text-sm">{title}</h4>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
};

export default Dashboard;
