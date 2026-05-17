"use client";

import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 5 page numbers
  const visiblePages = pages.filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1),
  );

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 sm:p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <FaChevronLeft size={14} className="sm:hidden" />
        <FaChevronLeft size={16} className="hidden sm:block" />
      </motion.button>

      {/* Page Numbers */}
      <div className="flex gap-1 sm:gap-2">
        {visiblePages.map((page, index) => {
          const showDots =
            index > 0 && visiblePages[index - 1] !== page - 1 && page !== 1;

          return (
            <div key={page}>
              {showDots && <span className="px-2 text-gray-400">...</span>}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                  currentPage === page
                    ? "bg-primary text-white shadow-lg"
                    : "border-2 border-gray-200 text-gray-700 hover:border-primary hover:bg-green-50"
                }`}
              >
                {page}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 sm:p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <FaChevronRight size={14} className="sm:hidden" />
        <FaChevronRight size={16} className="hidden sm:block" />
      </motion.button>

      {/* Page Info */}
      <div className="hidden sm:block ml-4 text-xs sm:text-sm text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
