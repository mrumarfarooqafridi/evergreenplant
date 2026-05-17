"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaLeaf,
  FaSignOutAlt,
  FaUserCircle,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const syncAuthAndCart = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUser(payload);
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    syncAuthAndCart();

    const handleAuthChange = () => syncAuthAndCart();
    const handleStorage = (event) => {
      if (!event.key || event.key === "token" || event.key === "cart") {
        syncAuthAndCart();
      }
    };

    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("storage", handleStorage);

    // Get cart count from localStorage
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChanged"));
    setUser(null);
    setIsUserMenuOpen(false);
    toast.success("Logged out successfully!");
    window.location.reload();
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMenus = () => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-bold text-primary flex items-center gap-2 hover:text-secondary transition-colors shrink-0"
            onClick={closeMenus}
          >
            <FaLeaf className="text-green-600" />
            <span>Evergreen Nursery</span>
          </Link>

          <nav className="hidden lg:flex space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors font-medium relative group"
                onClick={closeMenus}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={closeMenus}
            >
              <FaShoppingCart className="text-lg md:text-xl text-gray-700 hover:text-primary" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-1 min-w-[20px] text-center font-bold shadow-lg"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="User menu"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <FaUserCircle className="text-lg md:text-xl text-gray-700" />
                  )}
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user.name || user.email}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                    >
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>

                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={closeMenus}
                        >
                          <FaUserCircle className="mr-3 text-gray-400" />
                          Profile
                        </Link>

                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={closeMenus}
                        >
                          <FaClipboardList className="mr-3 text-gray-400" />
                          Orders
                        </Link>

                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={closeMenus}
                          >
                            <FaCog className="mr-3 text-gray-400" />
                            Admin Panel
                          </Link>
                        )}

                        <div className="border-t border-gray-100 mt-2">
                          <button
                            onClick={logout}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <FaSignOutAlt className="mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="sm:hidden relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={closeMenus}
                  aria-label="Login"
                >
                  <FaUserCircle className="text-lg text-gray-700 hover:text-primary" />
                </Link>
                <Link
                  href="/login"
                  className="btn-primary hidden sm:flex items-center space-x-2"
                  onClick={closeMenus}
                >
                  <FaUser className="text-sm" />
                  <span>Login</span>
                </Link>
              </>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/products", label: "Products" },
                  { href: "/about", label: "About" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
                      onClick={closeMenus}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {!user && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      href="/login"
                      className="btn-primary inline-flex items-center space-x-2 mt-2"
                      onClick={closeMenus}
                    >
                      <FaUser className="text-sm" />
                      <span>Login</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
