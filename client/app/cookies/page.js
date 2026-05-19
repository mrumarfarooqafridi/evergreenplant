"use client";

import { motion } from "framer-motion";
import { Cookie, Shield, Settings, Info } from "lucide-react";

export default function CookiesPage() {
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
              <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Cookie Policy
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Learn how we use cookies to enhance your browsing experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Essential Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Essential Cookies
                </h2>
              </div>
              <div className="space-y-3 text-[10px] sm:text-sm md:text-base text-gray-700">
                <p>
                  We use cookies to keep you logged in, remember preferences,
                  and improve browsing performance.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Authentication and session management</li>
                  <li>Shopping cart functionality</li>
                  <li>Security and fraud prevention</li>
                  <li>Essential for website operation</li>
                </ul>
              </div>
            </motion.div>

            {/* Analytics Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Analytics Cookies
                </h2>
              </div>
              <div className="space-y-3 text-[10px] sm:text-sm md:text-base text-gray-700">
                <p>
                  Analytics cookies help us understand how visitors use the
                  website and where we can improve experience.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Track page views and user behavior</li>
                  <li>Measure website performance</li>
                  <li>Identify popular content</li>
                  <li>Help us improve user experience</li>
                </ul>
              </div>
            </motion.div>

            {/* Cookie Control */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Managing Cookies
                </h2>
              </div>
              <div className="space-y-3 text-[10px] sm:text-sm md:text-base text-gray-700">
                <p>
                  You can control cookies through browser settings, but some
                  website features may be limited.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Adjust cookie settings in your browser preferences</li>
                  <li>Clear cookies from your browser history</li>
                  <li>Disable third-party cookies for more privacy</li>
                  <li>Note: essential cookies cannot be disabled</li>
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
                For questions, contact us at privacy@evergreen-nursery.ae
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
