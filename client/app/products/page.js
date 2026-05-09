"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import ProductFilters from "../../components/ProductFilters";
import ProductPagination from "../../components/ProductPagination";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import Modal from "../../components/ui/Modal";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  const ITEMS_PER_PAGE = 12;
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category") || "";
    setFilters((prev) => ({ ...prev, category }));
    fetchProducts({ ...filters, category });
    setCurrentPage(1);
  }, [searchParams]);

  const fetchProducts = async (filterParams = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?${params}`,
      );
      setAllProducts(response.data.products || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    fetchProducts();
    setIsFilterModalOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      search: "",
    });
    fetchProducts({
      category: "",
      minPrice: "",
      maxPrice: "",
      search: "",
    });
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.product._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
      toast.success(`Increased ${product.name} quantity in cart!`, {
        icon: "🛒",
        duration: 2000,
      });
    } else {
      cart.push({ product, quantity: 1 });
      toast.success(`${product.name} added to cart!`, {
        icon: "✅",
        duration: 3000,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Pagination logic
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
          Our Plants Collection
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Discover our beautiful selection of plants for every space
        </p>
      </motion.div>

      {/* Filters - Hidden on mobile, shown in modal */}
      <div className="hidden lg:block">
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onFilterSubmit={handleFilterSubmit}
          onReset={handleResetFilters}
        />
      </div>

      {/* Results Info & Mobile Filter Button */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
        <p className="text-gray-600 font-medium">
          Showing {allProducts.length === 0 ? 0 : startIndex + 1}-
          {Math.min(endIndex, allProducts.length)} of {allProducts.length}{" "}
          products
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFilterModalOpen(true)}
          className="lg:hidden flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </motion.button>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12"
          >
            {currentProducts.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
                onViewDetails={(product) => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
                onAddToCart={addToCart}
              />
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetFilters}
            className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
          >
            Clear Filters
          </motion.button>
        </motion.div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={addToCart}
      />

      {/* Mobile Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Products"
        size="md"
      >
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onFilterSubmit={handleFilterSubmit}
          onReset={handleResetFilters}
        />
      </Modal>
    </div>
  );
}
