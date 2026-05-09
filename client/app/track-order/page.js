"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Search,
  CheckCircle,
  Truck,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate tracking lookup
    setTimeout(() => {
      setTracking({
        status: "In Transit",
        estimatedDelivery: "2-3 business days",
        steps: [
          {
            status: "completed",
            title: "Order Placed",
            date: "Jan 15, 2024",
            time: "10:30 AM",
          },
          {
            status: "completed",
            title: "Order Confirmed",
            date: "Jan 15, 2024",
            time: "11:00 AM",
          },
          {
            status: "completed",
            title: "Order Packed",
            date: "Jan 15, 2024",
            time: "2:00 PM",
          },
          {
            status: "in-progress",
            title: "Out for Delivery",
            date: "Jan 16, 2024",
            time: "9:00 AM",
          },
          {
            status: "pending",
            title: "Delivered",
            date: "Expected",
            time: "Jan 17-18, 2024",
          },
        ],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Your Order
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track delivery progress, order status, and shipment milestones
              from your account.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Tracking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Enter Order Details
              </h2>
              <form
                onSubmit={handleTrack}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your Order ID (e.g., ORD-12345)"
                  className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Track Order
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Tracking Results */}
            {tracking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Status Card */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        Order Status: {tracking.status}
                      </h3>
                      <p className="text-green-100">
                        Estimated Delivery: {tracking.estimatedDelivery}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Truck className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Delivery Timeline
                  </h3>
                  <div className="space-y-6">
                    {tracking.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {step.status === "completed" ? (
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                          ) : step.status === "in-progress" ? (
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`font-semibold ${step.status === "in-progress" ? "text-blue-600" : "text-gray-900"}`}
                            >
                              {step.title}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {step.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Account Login CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Package className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Track All Your Orders
                </h2>
              </div>
              <p className="text-gray-700 mb-6">
                For logged-in customers, live tracking is available in your
                orders dashboard with detailed history and notifications.
              </p>
              <Link
                href="/orders"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Go to My Orders
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help With Your Order?
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about your order, our support team is
                here to help.
              </p>
              <Link
                href="/support"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                Contact Support
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
