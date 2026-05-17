"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaEye,
  FaShoppingCart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?limit=6`,
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-300 rounded w-20"></div>
                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
              🌿 FEATURED COLLECTION
            </span>
          </motion.div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Premium Plants
            <span className="block text-green-600 text-base sm:text-2xl md:text-3xl font-medium mt-2">
              Handpicked for You
            </span>
          </h2>
          <p className="text-xs sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of exceptional plants, each chosen
            for their beauty, health, and ability to transform your space into a
            lush paradise
          </p>
        </motion.div>

        <div className="relative px-4 sm:px-8">
          <style jsx>{`
            .swiper-pagination-bullet {
              background: rgba(34, 197, 94, 0.4);
              opacity: 1;
            }
            .swiper-pagination-bullet-active {
              background: rgb(34, 197, 94);
            }
            .swiper-button-next,
            .swiper-button-prev {
              color: rgb(34, 197, 94);
              background: rgba(255, 255, 255, 0.9);
              width: 44px;
              height: 44px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              top: 50%;
              transform: translateY(-50%);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease;
            }
            .swiper-button-next:hover,
            .swiper-button-prev:hover {
              background: rgba(255, 255, 255, 1);
              box-shadow: 0 6px 16px rgba(34, 197, 94, 0.2);
            }
            .swiper-button-next::after,
            .swiper-button-prev::after {
              font-size: 16px;
              font-weight: bold;
            }
          `}</style>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.25 },
                  }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 h-full transition-all duration-300"
                >
                  {/* Compact Image Section */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-gray-50">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-48"
                    >
                      <Image
                        src={product.images[0] || "/plant-placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>

                    {/* Compact Rating Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      viewport={{ once: true }}
                      className="absolute top-3 right-3 bg-white shadow-md rounded-full p-2"
                    >
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-xs font-bold text-gray-700">
                          4.8
                        </span>
                      </div>
                    </motion.div>

                    {/* Compact Stock Badge */}
                    {product.stock < 10 && (
                      <motion.div
                        initial={{ x: -50 }}
                        whileInView={{ x: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        viewport={{ once: true }}
                        className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md"
                      >
                        Low Stock
                      </motion.div>
                    )}

                    {/* Compact Quick View Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      <Link
                        href={`/products/${product._id}`}
                        className="bg-white text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2 shadow-lg text-sm"
                      >
                        <FaEye className="text-sm" />
                        <span>View</span>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Compact Content Section */}
                  <div className="p-5 bg-white flex flex-col justify-between h-full">
                    <div>
                      <motion.h3
                        className="text-lg font-bold mb-2 text-gray-900 line-clamp-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {product.name}
                      </motion.h3>

                      <motion.p
                        className="text-gray-600 mb-4 leading-snug text-xs line-clamp-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        viewport={{ once: true }}
                      >
                        {product.description}
                      </motion.p>
                    </div>

                    <div>
                      <motion.div
                        className="flex items-center justify-between mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            AED {product.price}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.stock} in stock
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          Premium
                        </span>
                      </motion.div>

                      {/* Compact Action Buttons */}
                      <motion.div
                        className="flex gap-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        viewport={{ once: true }}
                      >
                        <Link
                          href={`/products/${product._id}`}
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-green-400 text-center transition-all duration-300"
                        >
                          Details
                        </Link>
                        <motion.button
                          onClick={() => addToCart(product)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-xs font-semibold hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1"
                        >
                          <FaShoppingCart className="text-xs" />
                          <span>Cart</span>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Space?
            </h3>
            <p className="text-gray-600 mb-8">
              Explore our complete collection of premium plants and find the
              perfect additions to your home or garden
            </p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaShoppingCart className="text-xl" />
              <span>Explore All Products</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
