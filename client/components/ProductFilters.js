"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaX } from "react-icons/fa6";

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
    <div className="w-full mb-8">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          <FaFilter size={18} />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Container */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen || window.innerWidth >= 768 ? 1 : 0,
          height: isOpen || window.innerWidth >= 768 ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:opacity-100 md:height-auto overflow-hidden"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-gray-50 to-green-50 p-6 rounded-xl shadow-md border border-green-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Search Input */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Search
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={onFilterChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-sm sm:text-base placeholder-gray-400"
                placeholder="Search plants..."
              />
            </div>

            {/* Category Select */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={onFilterChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-sm sm:text-base cursor-pointer bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={onFilterChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-sm sm:text-base placeholder-gray-400"
                placeholder="Min"
              />
            </div>

            {/* Max Price */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={onFilterChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-sm sm:text-base placeholder-gray-400"
                placeholder="Max"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-green-700 text-white font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-xs sm:text-sm uppercase tracking-wide"
              >
                Filter
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-xs sm:text-sm uppercase tracking-wide"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
