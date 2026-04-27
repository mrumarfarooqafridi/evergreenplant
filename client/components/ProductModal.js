"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaX,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaPlus,
} from "react-icons/fa6";
import toast from "react-hot-toast";

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images || ["/placeholder.jpg"];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-all z-10"
          >
            <FaX size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Image Carousel */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gray-100 rounded-xl overflow-hidden h-96"
              >
                <Image
                  src={images[currentImageIndex] || "/placeholder.jpg"}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Carousel Navigation */}
              {images.length > 1 && (
                <div className="flex justify-between items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrevImage}
                    className="p-3 bg-primary hover:bg-green-700 text-white rounded-lg transition-all"
                  >
                    <FaChevronLeft size={20} />
                  </motion.button>

                  {/* Thumbnail Images */}
                  <div className="flex gap-2 flex-1 overflow-x-auto">
                    {images.map((img, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 rounded-lg flex-shrink-0 border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-primary"
                            : "border-gray-200 hover:border-primary"
                        }`}
                      >
                        <Image
                          src={img || "/placeholder.jpg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNextImage}
                    className="p-3 bg-primary hover:bg-green-700 text-white rounded-lg transition-all"
                  >
                    <FaChevronRight size={20} />
                  </motion.button>
                </div>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <p className="text-center text-sm text-gray-600">
                  {currentImageIndex + 1} of {images.length}
                </p>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={18}
                        className={
                          i < Math.round(product.rating || 4)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price and Stock */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Price</p>
                    <p className="text-3xl md:text-4xl font-bold text-primary">
                      AED {product.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm mb-1">In Stock</p>
                    <p
                      className={`text-xl font-bold ${
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.stock} {product.stock === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-gray-600 text-sm mb-2">Category</p>
                <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold capitalize">
                  {product.category}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Additional Info */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaPlus size={20} />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-4 px-6 rounded-lg text-lg transition-all"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
