"use client";

import { motion } from "framer-motion";
import { FileText, ShoppingBag, AlertCircle, RefreshCw } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Order Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Orders & Pricing
                </h2>
              </div>
              <div className="space-y-3 text-[10px] sm:text-sm md:text-base text-gray-700">
                <p>
                  By placing orders on Evergreen Nursery, you agree to our
                  pricing, availability, and order fulfillment policies.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    All prices are in AED and include VAT where applicable
                  </li>
                  <li>Order confirmation is sent via email after purchase</li>
                  <li>
                    We reserve the right to cancel orders due to stock issues
                  </li>
                  <li>Payment is processed securely at checkout</li>
                </ul>
              </div>
            </motion.div>

            {/* Product Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Product Information
                </h2>
              </div>
              <div className="space-y-3 text-[10px] sm:text-sm md:text-base text-gray-700">
                <p>
                  Product images are illustrative; natural variation may occur
                  in live plants.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Plants may vary slightly in size and appearance</li>
                  <li>Colors may differ due to lighting and screen settings</li>
                  <li>We ensure all plants are healthy before shipping</li>
                  <li>Care instructions are provided with each purchase</li>
                </ul>
              </div>
            </motion.div>

            {/* Policy Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Policy Updates
                </h2>
              </div>
              <div className="space-y-3 text-[10px] sm:text-sm md:text-base text-gray-700">
                <p>
                  We reserve the right to update products, pricing, and service
                  policies to maintain quality and reliability.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Changes will be posted on this page</li>
                  <li>Continued use constitutes acceptance of new terms</li>
                  <li>Major changes will be communicated via email</li>
                  <li>Terms are effective as of January 2024</li>
                </ul>
              </div>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center text-[9px] sm:text-xs text-gray-500"
            >
              <p>Last updated: January 2024</p>
              <p className="mt-1">
                For questions, contact us at legal@evergreen-nursery.ae
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
