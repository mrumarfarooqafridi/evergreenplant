"use client";

import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { FaLeaf, FaSeedling, FaTree } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/HeroBackground.png')",
        }}
      ></div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <FaLeaf className="text-6xl" />
        </div>
        <div className="absolute top-20 right-20">
          <FaSeedling className="text-4xl" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <FaTree className="text-5xl" />
        </div>
        <div className="absolute bottom-10 right-10">
          <FaLeaf className="text-7xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">Evergreen</span>{" "}
            Nursery
          </h1>

          <div className="text-xl md:text-2xl lg:text-3xl mb-8 h-20 md:h-16 flex items-center justify-center">
            <TypeAnimation
              sequence={[
                "Discover a world of beautiful plants",
                2000,
                "Expert care tips for your garden",
                2000,
                "Everything for your green space",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-medium"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <blockquote className="text-lg md:text-xl italic font-light max-w-2xl mx-auto leading-relaxed">
              "The clearest way into the Universe is through a forest
              wilderness."
              <br />
              <cite className="block mt-4 text-yellow-300 font-semibold">
                — John Muir
              </cite>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/products"
              className="btn-primary bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <FaSeedling className="inline mr-2" />
              Shop Plants
            </Link>
            <Link
              href="/about"
              className="btn-outline border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <FaLeaf className="inline mr-2" />
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements for visual appeal */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
