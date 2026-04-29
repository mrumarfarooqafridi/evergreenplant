"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view orders");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "⏳";
      case "processing":
        return "🔄";
      case "shipped":
        return "📦";
      case "delivered":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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
        My Orders
      </motion.h1>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 mb-4 text-lg">
            You haven&apos;t placed any orders yet.
          </p>
          <a href="/products" className="btn-primary inline-block">
            Start Shopping
          </a>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          {orders.map((order) => (
            <motion.div
              key={order._id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(order.status)}`}
                >
                  <span>{getStatusIcon(order.status)}</span>
                  {order.status}
                </motion.span>
              </div>

              <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Items:</h4>
                <div className="space-y-2">
                  {order.products.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-700">
                        {item.product.name} x{" "}
                        <span className="font-semibold">{item.quantity}</span>
                      </span>
                      <span className="font-semibold text-gray-900">
                        AED {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Shipping To</p>
                    <p className="font-semibold text-sm">
                      {order.address.street}, {order.address.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      AED {order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  origin="left"
                  className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
                >
                  <div
                    className={`h-full rounded-full ${
                      (order.status || "").toLowerCase() === "pending"
                        ? "w-1/4 bg-yellow-500"
                        : (order.status || "").toLowerCase() === "processing"
                          ? "w-1/2 bg-blue-500"
                          : (order.status || "").toLowerCase() === "shipped"
                            ? "w-3/4 bg-purple-500"
                            : (order.status || "").toLowerCase() === "delivered"
                              ? "w-full bg-green-500"
                              : "w-full bg-red-500"
                    }`}
                  ></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
