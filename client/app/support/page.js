"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Headset,
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
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Headset className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Customer Support
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our support specialists are here to help with orders, products,
              and account assistance. We're committed to providing you with the
              best service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Phone Support
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Call us directly for immediate assistance
                </p>
                <a
                  href="tel:+97144522367"
                  className="text-green-600 font-semibold"
                >
                  +971 44 522 367
                </a>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Email Support
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Send us an email for detailed inquiries
                </p>
                <a
                  href="mailto:muazam@greenie.ae"
                  className="text-green-600 font-semibold"
                >
                  muazam@greenie.ae
                </a>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Chat with us for quick responses
                </p>
                <a
                  href="https://wa.me/97144522367"
                  className="text-green-600 font-semibold"
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
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Support Hours
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Monday - Saturday
                    </h3>
                    <p className="text-gray-600">9:00 AM - 7:00 PM (GST)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sunday</h3>
                    <p className="text-gray-600">10:00 AM - 4:00 PM (GST)</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
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
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <Headset className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  What We Help With
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
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
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Links
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/faq"
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900">
                    Frequently Asked Questions
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </Link>
                <Link
                  href="/track-order"
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900">
                    Track Your Order
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </Link>
                <Link
                  href="/returns"
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900">
                    Returns & Exchanges
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </Link>
                <Link
                  href="/shipping"
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900">
                    Shipping Information
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Still Need Help?
              </h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Send us a message and we'll
                get back to you as soon as possible.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
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
