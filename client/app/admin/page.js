"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  Users,
  Package,
  FileText,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Admin() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    checkAdminAccess();
    fetchStats();
  }, []);

  const checkAdminAccess = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role !== "admin") {
      router.push("/");
      return;
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const [ordersRes, usersRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const response = ordersRes;
      const usersResponse = usersRes;
      const users = usersResponse?.data?.users || [];

      const orders = response.data;
      const totalRevenue = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0,
      );

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalUsers: users.length,
        recentOrders: orders.slice(0, 5),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to fetch dashboard data");
    }
    setLoading(false);
  };

  const statCards = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      label: "Total Orders",
      value: stats.totalOrders,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      label: "Total Revenue",
      value: `AED ${stats.totalRevenue.toFixed(2)}`,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
    },
    {
      icon: <Users className="w-8 h-8" />,
      label: "Total Users",
      value: stats.totalUsers,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Package className="w-8 h-8" />,
      label: "Recent Orders",
      value: stats.recentOrders.length,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const quickActions = [
    {
      href: "/admin/products",
      label: "Manage Products",
      icon: <Package className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      href: "/admin/orders",
      label: "Manage Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      href: "/admin/users",
      label: "Manage Users",
      icon: <Users className="w-5 h-5" />,
      color: "bg-purple-500",
    },
    {
      href: "/admin/blogs",
      label: "Manage Blogs",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"
          ></motion.div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Admin
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your store today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div
                className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}
              >
                <div
                  className={`bg-gradient-to-br ${stat.color} text-white rounded-lg p-3`}
                >
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <motion.div
                    key={action.href}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={action.href}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}
                        >
                          {action.icon}
                        </div>
                        <span className="font-medium text-gray-900">
                          {action.label}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Orders
                </h2>
                <Link
                  href="/admin/orders"
                  className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {stats.recentOrders.length > 0 ? (
                  stats.recentOrders.map((order) => (
                    <motion.div
                      key={order._id}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order #{order._id.slice(-8)}
                          </p>
                          <p className="text-sm text-gray-600">
                            AED {order.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No recent orders</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
