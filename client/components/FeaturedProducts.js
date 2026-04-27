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
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Autoplay } from "swiper/modules";

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
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
              🌿 FEATURED COLLECTION
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Premium Plants
            <span className="block text-green-600 text-2xl md:text-3xl font-medium mt-2">
              Handpicked for You
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of exceptional plants, each chosen
            for their beauty, health, and ability to transform your space into a
            lush paradise
          </p>
        </motion.div>

        <div className="relative">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product._id} style={{ width: "300px" }}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden border border-white/50"
                >
                  {/* Enhanced Image Section */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <Image
                        src={product.images[0] || "/plant-placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={280}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>

                    {/* Enhanced Rating Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                      viewport={{ once: true }}
                      className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/50"
                    >
                      <div className="flex items-center space-x-2">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm font-bold text-gray-800">
                          4.8
                        </span>
                      </div>
                    </motion.div>

                    {/* Enhanced Stock Badge */}
                    {product.stock < 10 && (
                      <motion.div
                        initial={{ x: -100 }}
                        whileInView={{ x: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        viewport={{ once: true }}
                        className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-4 py-2 rounded-2xl font-bold shadow-lg"
                      >
                        ⚡ Low Stock
                      </motion.div>
                    )}

                    {/* Quick View Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Link
                        href={`/products/${product._id}`}
                        className="bg-white/95 backdrop-blur-md text-gray-800 px-6 py-3 rounded-2xl font-semibold hover:bg-white transition-all duration-300 flex items-center space-x-2 shadow-xl"
                      >
                        <FaEye className="text-lg" />
                        <span>Quick View</span>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="p-8 bg-gradient-to-b from-white to-gray-50/50">
                    <motion.h3
                      className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-green-700 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {product.name}
                    </motion.h3>

                    <motion.p
                      className="text-gray-600 mb-6 leading-relaxed text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {product.description.substring(0, 120)}...
                    </motion.p>

                    <motion.div
                      className="flex items-center justify-between mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div>
                        <p className="text-3xl font-bold text-green-600 mb-1">
                          AED {product.price}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          {product.stock} in stock
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Premium
                        </span>
                      </div>
                    </motion.div>

                    {/* Enhanced Action Buttons */}
                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={`/products/${product._id}`}
                        className="flex-1 rounded-2xl border-2 border-gray-200 px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-green-300 text-center transition-all duration-300 group/btn"
                      >
                        <span className="group-hover/btn:text-green-700 transition-colors duration-300">
                          View Details
                        </span>
                      </Link>
                      <motion.button
                        onClick={() => addToCart(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 text-sm font-semibold hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaShoppingCart className="text-sm" />
                        <span>Add to Cart</span>
                      </motion.button>
                    </motion.div>
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
