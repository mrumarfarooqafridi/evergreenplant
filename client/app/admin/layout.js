"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, FileText, Settings, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const quickActions = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { href: "/admin/products", label: "Manage Products", icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { href: "/admin/orders", label: "Manage Orders", icon: <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { href: "/admin/users", label: "Manage Users", icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { href: "/admin/blogs", label: "Manage Blogs", icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-base font-bold text-gray-900">Evergreen Admin</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex min-w-0">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Evergreen</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>

            <nav className="space-y-2 flex-1">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    typeof window !== "undefined" && window.location.pathname === action.href
                      ? "bg-green-50 text-green-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {action.icon}
                  <span className="text-xs sm:text-sm">{action.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-8 border-t border-gray-200">
              <button
                onClick={logout}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
