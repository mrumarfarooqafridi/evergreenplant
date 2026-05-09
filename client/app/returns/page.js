"use client";

import { motion } from "framer-motion";
import {
  Undo,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  CreditCard,
} from "lucide-react";

export default function ReturnsPage() {
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
              <Undo className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Returns & Exchanges
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a customer-first 7-day return and exchange process for
              eligible products. Your satisfaction is our priority.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Returns Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Return Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Return Policy
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      7-Day Return Window
                    </h3>
                    <p className="text-gray-600">
                      Returns must be initiated within 7 days of delivery date
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Original Condition Required
                    </h3>
                    <p className="text-gray-600">
                      Items must be unused, in original condition with all tags
                      and packaging
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Proof of Purchase
                    </h3>
                    <p className="text-gray-600">
                      Valid order number or receipt is required for all returns
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Return Process */}
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
                  Return Process
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Contact Support
                    </h3>
                    <p className="text-gray-600">
                      Reach out to our support team with your order number and
                      reason for return
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Provide Details
                    </h3>
                    <p className="text-gray-600">
                      Submit photos of the item and describe the issue (if
                      applicable)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Get Approval
                    </h3>
                    <p className="text-gray-600">
                      Our team will review and approve your return request
                      within 24-48 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Ship Item Back
                    </h3>
                    <p className="text-gray-600">
                      We'll provide a prepaid shipping label for eligible
                      returns
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Refund Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Refund Options
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Full Refund
                    </h3>
                    <p className="text-gray-600">
                      Refund to original payment method within 5-7 business days
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Store Credit
                    </h3>
                    <p className="text-gray-600">
                      Immediate store credit for future purchases (bonus 5%
                      value)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Exchange
                    </h3>
                    <p className="text-gray-600">
                      Exchange for a different product of equal or higher value
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Non-Returnable Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-red-50 rounded-2xl p-8 border border-red-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Non-Returnable Items
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Custom Orders
                    </h3>
                    <p className="text-gray-600">
                      Made-to-order items cannot be returned unless defective
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Sale Items
                    </h3>
                    <p className="text-gray-600">
                      Final sale items are non-returnable and non-exchangeable
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Used Items
                    </h3>
                    <p className="text-gray-600">
                      Items that show signs of use or damage cannot be returned
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Plant Health Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  14-Day Plant Health Guarantee
                </h2>
              </div>
              <p className="text-gray-700 mb-6">
                If your plant dies within 14 days due to factors beyond your
                control, we'll replace it free of charge. This guarantee covers
                delivery damage and plant health issues not caused by neglect or
                improper care.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                Claim Guarantee
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
