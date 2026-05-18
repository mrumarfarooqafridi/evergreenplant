"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaPlus, FaEye } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  index,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsAdmin(user.role === "admin");
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onViewDetails(product);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: (index % 3) * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-15 sm:h-56 md:h-64 bg-gray-100 overflow-hidden rounded-t-xl">
          <div className="w-full h-full flex items-center justify-center p-1">
            <Image
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.name}
              width={60}
              height={60}
              className="object-cover w-[60px] h-[60px] sm:w-full sm:h-full group-hover:scale-110 transition-transform duration-500 rounded-lg"
            />
          </div>

          {/* Category Badge */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="bg-primary text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-xs md:text-sm font-semibold uppercase">
              {product.category}
            </span>
          </div>

          {/* Stock Status - Admin Only */}
          {isAdmin && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
              <span
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-xs md:text-sm font-semibold ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out of Stock"}
              </span>
            </div>
          )}

          {/* Overlay with Action Buttons - Hidden on small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex absolute inset-0 bg-black bg-opacity-60 items-center justify-center gap-3 p-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleViewDetails}
              className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white hover:bg-primary hover:text-white text-gray-800 rounded-full transition-all"
              title="View Details"
            >
              <FaEye size={16} className="sm:hidden" />
              <FaEye size={20} className="hidden sm:block" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary hover:bg-green-700 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to Cart"
            >
              <FaPlus size={16} className="sm:hidden" />
              <FaPlus size={20} className="hidden sm:block" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-1.5 sm:p-4 md:p-5 flex-grow flex flex-col">
          {/* Rating - Hidden on small screens */}
          <div className="hidden sm:flex items-center gap-1 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating || 4)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({product.reviews?.length || 0})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-[8px] sm:text-base md:text-lg font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-1 sm:line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>

          {/* Description - Hidden on small screens */}
          <p className="hidden sm:block text-[10px] sm:text-xs md:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mb-1 sm:mb-4">
            <span className="text-[10px] sm:text-xl md:text-2xl font-bold text-primary">
              AED {product.price}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-1 sm:gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewDetails}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-1 sm:py-2 px-1 sm:px-3 rounded-lg transition-all text-[8px] sm:text-xs md:text-sm"
            >
              Details
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-1 sm:py-2 px-1 sm:px-3 rounded-lg transition-all text-[8px] sm:text-xs md:text-sm"
            >
              Add
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
