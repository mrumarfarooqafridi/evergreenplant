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
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") {
        router.push("/");
        return;
      }
    } catch {
      router.push("/login");
      return;
    }
    fetchStats();
  }, []);

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
      const orders = ordersRes.data;
      const users = usersRes.data?.users || [];
      const totalRevenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalUsers: users.length,
        recentOrders: orders.slice(0, 5),
      });
    } catch {
      toast.error("Failed to fetch dashboard data");
    }
    setLoading(false);
  };

  const statCards = [
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Total Orders",
      value: stats.totalOrders,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: "Revenue",
      value: `AED ${stats.totalRevenue.toFixed(0)}`,
      color: "from-green-500 to-emerald-600",
      bg: "bg-green-50",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Users",
      value: stats.totalUsers,
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: <Package className="w-5 h-5" />,
      label: "Recent",
      value: stats.recentOrders.length,
      color: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const quickActions = [
    {
      href: "/admin/products",
      label: "Products",
      icon: <Package className="w-4 h-4" />,
      color: "bg-green-500",
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: <ShoppingBag className="w-4 h-4" />,
      color: "bg-blue-500",
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="w-4 h-4" />,
      color: "bg-purple-500",
    },
    {
      href: "/admin/blogs",
      label: "Blogs",
      icon: <FileText className="w-4 h-4" />,
      color: "bg-orange-500",
    },
  ];

  const statusColor = (s) => {
    const m = {
      pending: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-100 text-green-800",
    };
    return m[(s || "").toLowerCase()] || "bg-blue-100 text-blue-800";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );

  return (
    <div className="p-2 sm:p-3 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-3 sm:mb-5">
          <h1 className="text-base sm:text-xl lg:text-3xl font-bold text-gray-900">
            Welcome back, Admin
          </h1>
          <p className="text-gray-500 text-[10px] sm:text-sm mt-0.5 sm:mt-1">
            Here's what's happening with your store.
          </p>
        </div>

        {/* Stat Cards — 4 in a row on all screens, compact on mobile */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:gap-6 mb-3 sm:mb-5">
          {statCards.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-1.5 sm:p-3 lg:p-4 shadow-sm border border-gray-100"
            >
              <div
                className={`w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${s.bg} rounded-lg flex items-center justify-center mb-1 sm:mb-2`}
              >
                <div
                  className={`bg-gradient-to-br ${s.color} text-white rounded-md p-0.5 sm:p-1 lg:p-2`}
                >
                  <s.icon className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
              <p className="text-[8px] sm:text-xs lg:text-sm text-gray-500 leading-tight">
                {s.label}
              </p>
              <p className="text-[10px] sm:text-sm lg:text-2xl font-bold text-gray-900 truncate">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100">
              <h2 className="text-xs sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />{" "}
                Quick Actions
              </h2>
              {/* 2×2 grid on mobile, list on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2">
                {quickActions.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 ${a.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
                    >
                      <a.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[10px] sm:text-sm font-medium text-gray-900 truncate">
                      {a.label}
                    </span>
                    <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400 ml-auto hidden lg:block group-hover:text-green-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <h2 className="text-xs sm:text-base font-bold text-gray-900">
                  Recent Orders
                </h2>
                <Link
                  href="/admin/orders"
                  className="text-green-600 text-[10px] sm:text-xs font-medium flex items-center gap-0.5 sm:gap-1 hover:text-green-700"
                >
                  View All <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3" />
                </Link>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {stats.recentOrders.length > 0 ? (
                  stats.recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-2 sm:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] sm:text-sm font-semibold text-gray-900 truncate">
                            #{(order._id || "").slice(-8)}
                          </p>
                          <p className="text-[8px] sm:text-xs text-gray-500">
                            AED {(order.totalPrice || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-medium flex-shrink-0 ml-1 sm:ml-2 ${statusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 sm:py-8 text-gray-400">
                    <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 text-gray-200" />
                    <p className="text-[10px] sm:text-sm">No recent orders</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
