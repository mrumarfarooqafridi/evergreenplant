"use client";

import { motion } from "framer-motion";
import {
  Truck,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  Package,
} from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shipping Information
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fast, reliable, and secure delivery across the UAE. Your plants
              arrive safely at your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Delivery Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Areas
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Major Cities (1-3 Days)
                    </h3>
                    <p className="text-gray-600">
                      Dubai, Abu Dhabi, Sharjah, Ajman, and Al Ain
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Other Emirates (3-5 Days)
                    </h3>
                    <p className="text-gray-600">
                      Umm Al Quwain, Ras Al Khaimah, and Fujairah
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Remote Areas (5-7 Days)
                    </h3>
                    <p className="text-gray-600">
                      Delivery to remote locations may take additional time
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Delivery Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Time
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Standard Delivery
                    </h3>
                    <p className="text-gray-600">
                      1-3 business days for in-stock items in major cities
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Express Delivery
                    </h3>
                    <p className="text-gray-600">
                      Same-day or next-day delivery available in Dubai and Abu
                      Dhabi (additional fee applies)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Order Processing
                    </h3>
                    <p className="text-gray-600">
                      Orders are processed within 24 hours on business days
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shipping Fees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <Package className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Shipping Fees
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Free Shipping
                    </h3>
                    <p className="text-gray-600">
                      Orders above AED 200 qualify for free standard delivery
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Standard Delivery
                    </h3>
                    <p className="text-gray-600">
                      AED 25 for orders below AED 200
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Express Delivery
                    </h3>
                    <p className="text-gray-600">
                      AED 50 for same-day/next-day delivery in select areas
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Packaging & Safety */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Packaging & Safety
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Professional Packaging
                    </h3>
                    <p className="text-gray-600">
                      Each plant is carefully packaged to prevent damage during
                      transit
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Climate Control
                    </h3>
                    <p className="text-gray-600">
                      Temperature-controlled vehicles for sensitive plant
                      species
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Damage Guarantee
                    </h3>
                    <p className="text-gray-600">
                      Free replacement if your plant arrives damaged (contact
                      within 24 hours)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                  <Truck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Track Your Order
                </h2>
              </div>
              <p className="text-gray-700 mb-6">
                Once your order is dispatched, you'll receive a tracking number
                via email and SMS. You can track your order in real-time through
                our Track Order page or by contacting our support team.
              </p>
              <a
                href="/track-order"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                Track Your Order
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
