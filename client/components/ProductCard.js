"use client";

import { useState } from "react";
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
        delay: (index % 4) * 0.1,
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
        <div className="relative h-56 md:h-64 bg-gray-100 overflow-hidden rounded-t-xl">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold uppercase">
              {product.category}
            </span>
          </div>

          {/* Stock Status */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
            </span>
          </div>

          {/* Overlay with Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-3 p-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleViewDetails}
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white hover:bg-primary hover:text-white text-gray-800 rounded-full transition-all"
              title="View Details"
            >
              <FaEye size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-primary hover:bg-green-700 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to Cart"
            >
              <FaPlus size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex-grow flex flex-col">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
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
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl md:text-2xl font-bold text-primary">
              AED {product.price}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewDetails}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-3 rounded-lg transition-all text-xs md:text-sm"
            >
              Details
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-3 rounded-lg transition-all text-xs md:text-sm"
            >
              Add
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
