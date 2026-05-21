"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Leaf,
  Truck,
  MessageCircle,
  Award,
  Users,
  Heart,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  const stats = [
    { value: "5000+", label: "Happy Customers" },
    { value: "200+", label: "Plant Varieties" },
    { value: "5+", label: "Years Experience" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const features = [
    {
      icon: <Leaf className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />,
      title: "Quality Plants",
      description:
        "Handpicked selections, carefully nurtured for longevity and beauty. Every plant is inspected before delivery.",
    },
    {
      icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />,
      title: "Fast Delivery",
      description:
        "Reliable, on-time delivery across Dubai and the UAE with careful handling to ensure plants arrive healthy.",
    },
    {
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />,
      title: "Expert Advice",
      description:
        "Professional guidance to help every plant thrive. Our team is always available for your questions.",
    },
    {
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />,
      title: "Premium Quality",
      description:
        "We source only the finest plants from trusted growers, ensuring excellence in every purchase.",
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />,
      title: "Community Focus",
      description:
        "Building a community of plant lovers who share knowledge and passion for greenery.",
    },
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />,
      title: "Customer Care",
      description:
        "Dedicated support before and after purchase. Your satisfaction is our top priority.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-1 sm:space-x-2 bg-green-100 text-green-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[8px] sm:text-sm font-semibold mb-3 sm:mb-6"
            >
              <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[8px] sm:text-sm">
                About Evergreen Nursery
              </span>
            </motion.div>

            <h1 className="text-lg sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-3 sm:mb-6 leading-tight">
              Growing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Inspiration
              </span>{" "}
              and Green Spaces
            </h1>

            <p className="text-[10px] sm:text-sm md:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-8 leading-relaxed">
              Evergreen Nursery brings premium indoor and outdoor plants to UAE
              homes and offices with thoughtful care, expert guidance, and a
              love for sustainable greenery.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-4 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl text-[10px] sm:text-sm"
              >
                Explore Our Plants
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 sm:px-8 py-2 sm:py-4 bg-white text-gray-900 font-semibold rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-green-600 hover:text-green-600 transition-all text-[10px] sm:text-sm"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-[1.25rem] sm:text-4xl md:text-5xl font-bold text-green-600 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-[1.25rem] sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 text-[1rem] sm:text-lg leading-relaxed mb-3 sm:mb-6">
                  What began as a family passion project has grown into a
                  trusted Dubai nursery delivering premium plants, expert care,
                  and distinctive garden experiences across the UAE.
                </p>
                <p className="text-gray-600 text-[1rem] sm:text-lg leading-relaxed mb-4 sm:mb-8">
                  Rooted in thoughtful cultivation, we source only the
                  healthiest plants and nurture every customer relationship.
                  Each plant arrives ready to flourish, curated with premium
                  soil, styling, and plant care expertise.
                </p>

                <div className="space-y-4">
                  {[
                    "Family-owned and operated since 2020",
                    "Expert horticulturists on staff",
                    "Sustainable and eco-friendly practices",
                    "Personalized plant care consultations",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/about.png"
                    alt="About Evergreen Nursery"
                    width={900}
                    height={700}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 sm:p-8 md:p-10 border border-green-100"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-lg leading-relaxed">
                  To make premium plants and thoughtful gardening support
                  accessible for every home and workplace in the UAE, while
                  delivering an elevated customer experience that exceeds
                  expectations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-100"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-lg leading-relaxed">
                  To become the region's most trusted nursery brand, known for
                  sustainability, design, and exceptional care in every plant we
                  deliver, inspiring a greener future for generations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[1.2rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-[1rem] sm:text-lg max-w-2xl mx-auto">
              Experience the difference with our premium quality plants and
              exceptional service
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-green-100 text-[10px] sm:text-lg md:text-xl mb-4 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have brought nature into
              their homes with Evergreen Nursery
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Start Shopping Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
