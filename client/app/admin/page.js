"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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

      // Orders
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

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-primary"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8"
      >
        Admin Dashboard
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        {[
          { label: "Total Orders", value: stats.totalOrders },
          {
            label: "Total Revenue",
            value: `AED ${stats.totalRevenue.toFixed(2)}`,
          },
          { label: "Total Users", value: stats.totalUsers },
          { label: "Recent Orders", value: stats.recentOrders.length },
        ].map((stat, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={statVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-600">
              {stat.label}
            </h3>
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { href: "/admin/products", label: "Manage Products" },
              { href: "/admin/orders", label: "Manage Orders" },
              { href: "/admin/users", label: "Manage Users" },
            ].map((action) => (
              <motion.div key={action.href} whileHover={{ x: 5 }}>
                <Link
                  href={action.href}
                  className="block btn-primary text-center transition-all"
                >
                  {action.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats.recentOrders.map((order) => (
              <motion.div
                key={order._id}
                whileHover={{ x: 5 }}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                  <p className="text-sm text-gray-600">
                    AED {order.totalPrice.toFixed(2)}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
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
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
