"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaX, FaSearch, FaTag, FaDollarSign } from "react-icons/fa6";

export default function ProductFilters({
  filters,
  onFilterChange,
  onFilterSubmit,
  onReset,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: "", label: "All Categories" },
    { value: "indoor", label: "Indoor Plants" },
    { value: "outdoor", label: "Outdoor Plants" },
    { value: "succulents", label: "Succulents" },
    { value: "flowering", label: "Flowering Plants" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit();
    setIsOpen(false);
  };

  const handleReset = () => {
    onReset();
    setIsOpen(false);
  };

  return (
    <div className="w-full mb-4 sm:mb-8">
      {/* Filter Button */}
      <div className="mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-all text-xs sm:text-sm"
        >
          <FaFilter size={14} className="sm:hidden" />
          <FaFilter size={18} className="hidden sm:block" />
          <span className="text-[10px] sm:text-sm">Filter Products</span>
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            >
              <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative">
                {/* Header */}
                <div className="flex items-center justify-between p-2 sm:p-4 md:p-6 border-b border-gray-200">
                  <h2 className="text-[10px] sm:text-lg md:text-xl font-bold text-gray-800">
                    Filter Products
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <FaX size={12} className="sm:hidden" />
                    <FaX size={20} className="hidden sm:block" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-2 sm:p-4 md:p-6">
                  <div className="space-y-2 sm:space-y-4 md:space-y-6">
                    {/* Search Input */}
                    <div className="flex flex-col">
                      <label className="text-[8px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 uppercase tracking-wide flex items-center gap-1 sm:gap-2">
                        <FaSearch size={8} className="text-primary sm:hidden" />
                        <FaSearch
                          size={14}
                          className="text-primary hidden sm:block"
                        />
                        Search
                      </label>
                      <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={onFilterChange}
                        className="w-full px-2 sm:px-4 py-1 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-[8px] sm:text-sm md:text-base placeholder-gray-400"
                        placeholder="Search plants..."
                      />
                    </div>

                    {/* Category Select */}
                    <div className="flex flex-col">
                      <label className="text-[8px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 uppercase tracking-wide flex items-center gap-1 sm:gap-2">
                        <FaTag size={8} className="text-primary sm:hidden" />
                        <FaTag
                          size={14}
                          className="text-primary hidden sm:block"
                        />
                        Category
                      </label>
                      <select
                        name="category"
                        value={filters.category}
                        onChange={onFilterChange}
                        className="w-full px-2 sm:px-4 py-1 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-[8px] sm:text-sm md:text-base cursor-pointer bg-white"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <div className="flex flex-col">
                        <label className="text-[8px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 uppercase tracking-wide flex items-center gap-1 sm:gap-2">
                          <FaDollarSign
                            size={8}
                            className="text-primary sm:hidden"
                          />
                          <FaDollarSign
                            size={14}
                            className="text-primary hidden sm:block"
                          />
                          Min Price
                        </label>
                        <input
                          type="number"
                          name="minPrice"
                          value={filters.minPrice}
                          onChange={onFilterChange}
                          className="w-full px-2 sm:px-4 py-1 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-[8px] sm:text-sm md:text-base placeholder-gray-400"
                          placeholder="Min"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[8px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 uppercase tracking-wide flex items-center gap-1 sm:gap-2">
                          <FaDollarSign
                            size={8}
                            className="text-primary sm:hidden"
                          />
                          <FaDollarSign
                            size={14}
                            className="text-primary hidden sm:block"
                          />
                          Max Price
                        </label>
                        <input
                          type="number"
                          name="maxPrice"
                          value={filters.maxPrice}
                          onChange={onFilterChange}
                          className="w-full px-2 sm:px-4 py-1 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-[8px] sm:text-sm md:text-base placeholder-gray-400"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 sm:gap-3 mt-3 sm:mt-6 md:mt-8">
                    <button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-green-700 text-white font-semibold px-2 sm:px-6 py-1 sm:py-3 rounded-lg transition-all text-[8px] sm:text-sm md:text-base uppercase tracking-wide"
                    >
                      Apply Filters
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-2 sm:px-6 py-1 sm:py-3 rounded-lg transition-all text-[8px] sm:text-sm md:text-base uppercase tracking-wide"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
