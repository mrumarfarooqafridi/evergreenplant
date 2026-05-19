"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Headphones,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full mb-4 sm:mb-6">
              <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Customer Support
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Our support specialists are here to help with orders, products,
              and account assistance. We're committed to providing you with the
              best service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-3 gap-3 sm:gap-6"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-3 sm:mb-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm md:text-base">
                  Phone Support
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-sm mb-2 sm:mb-3">
                  Call us directly for immediate assistance
                </p>
                <a
                  href="tel:+97144522367"
                  className="text-green-600 font-semibold text-[10px] sm:text-sm md:text-base"
                >
                  +971 44 522 367
                </a>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-3 sm:mb-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm md:text-base">
                  Email Support
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-sm mb-2 sm:mb-3">
                  Send us an email for detailed inquiries
                </p>
                <a
                  href="mailto:muazam@greenie.ae"
                  className="text-green-600 font-semibold text-[10px] sm:text-sm md:text-base"
                >
                  muazam@greenie.ae
                </a>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-3 sm:mb-4">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm md:text-base">
                  WhatsApp
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-sm mb-2 sm:mb-3">
                  Chat with us for quick responses
                </p>
                <a
                  href="https://wa.me/97144522367"
                  className="text-green-600 font-semibold text-[10px] sm:text-sm md:text-base"
                >
                  Chat Now
                </a>
              </motion.div>
            </motion.div>

            {/* Support Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Support Hours
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">
                      Monday - Saturday
                    </h3>
                    <p className="text-gray-600 text-[10px] sm:text-sm md:text-base">
                      9:00 AM - 7:00 PM (GST)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">
                      Sunday
                    </h3>
                    <p className="text-gray-600 text-[10px] sm:text-sm md:text-base">
                      10:00 AM - 4:00 PM (GST)
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-[10px] sm:text-sm mt-3 sm:mt-4">
                Response time: We typically respond within 24 hours for emails
                and immediately during business hours for phone and WhatsApp.
              </p>
            </motion.div>

            {/* What We Help With */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  What We Help With
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "Order tracking and status updates",
                  "Product recommendations and advice",
                  "Plant care guidance and tips",
                  "Returns and exchanges",
                  "Payment and billing issues",
                  "Account management and security",
                  "Delivery scheduling and changes",
                  "Technical support for website issues",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 sm:space-x-3"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-[10px] sm:text-sm md:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-100"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Quick Links
              </h2>
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <Link
                  href="/faq"
                  className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900 text-[10px] sm:text-sm md:text-base">
                    Frequently Asked Questions
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </Link>
                <Link
                  href="/track-order"
                  className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900 text-[10px] sm:text-sm md:text-base">
                    Track Your Order
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </Link>
                <Link
                  href="/returns"
                  className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900 text-[10px] sm:text-sm md:text-base">
                    Returns & Exchanges
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </Link>
                <Link
                  href="/shipping"
                  className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900 text-[10px] sm:text-sm md:text-base">
                    Shipping Information
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Contact Form CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Still Need Help?
              </h2>
              <p className="text-gray-600 text-[10px] sm:text-sm md:text-base mb-4 sm:mb-6">
                Can't find what you're looking for? Send us a message and we'll
                get back to you as soon as possible.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl text-[10px] sm:text-sm md:text-base"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
