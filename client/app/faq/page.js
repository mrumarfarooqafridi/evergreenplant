"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Leaf,
  Truck,
  Shield,
  Clock,
} from "lucide-react";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Order & Delivery",
      icon: <Truck className="w-5 h-5" />,
      questions: [
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 1-3 business days in major UAE cities (Dubai, Abu Dhabi, Sharjah). For other emirates, delivery may take 3-5 business days. Express delivery is available for an additional fee.",
        },
        {
          q: "What are the delivery charges?",
          a: "Delivery is free for orders above AED 200. For orders below AED 200, a flat delivery fee of AED 25 applies. Express delivery charges vary based on location and urgency.",
        },
        {
          q: "Can I track my order?",
          a: "Yes! Once your order is dispatched, you'll receive a tracking number via email and SMS. You can track your order in real-time through our Track Order page or by contacting our support team.",
        },
        {
          q: "Do you deliver on weekends?",
          a: "We deliver Monday through Saturday. Sunday deliveries are available in select areas with prior arrangement. Contact our support team to check availability in your area.",
        },
      ],
    },
    {
      category: "Plant Care",
      icon: <Leaf className="w-5 h-5" />,
      questions: [
        {
          q: "Do you offer plant care support?",
          a: "Absolutely! Our team of horticulture experts provides comprehensive after-sale care guidance. You can reach us via WhatsApp, email, or phone for personalized plant care advice.",
        },
        {
          q: "What if my plant arrives damaged?",
          a: "We take great care in packaging, but if your plant arrives damaged, please contact us within 24 hours with photos. We'll either replace the plant or provide a full refund, no questions asked.",
        },
        {
          q: "Do plants come with care instructions?",
          a: "Yes, every plant comes with detailed care instructions including watering schedules, light requirements, and repotting guidelines. We also have video tutorials on our blog for visual learners.",
        },
        {
          q: "Can I get plant care consultations?",
          a: "Yes, we offer personalized plant care consultations for AED 50 per session. Our experts will assess your space, lighting conditions, and lifestyle to recommend the perfect plants for you.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          q: "What is your return policy?",
          a: "We accept returns within 7 days of delivery if the plant is in its original condition. Plants must be returned with the original pot and packaging. Custom orders and sale items are non-returnable.",
        },
        {
          q: "How do I request a refund?",
          a: "To request a refund, contact our support team with your order number and reason for return. Refunds are processed within 5-7 business days to your original payment method.",
        },
        {
          q: "Can I exchange my plant?",
          a: "Yes, you can exchange your plant within 7 days of delivery if you're not satisfied. You can exchange for a different plant of equal or higher value, paying any difference if applicable.",
        },
        {
          q: "What if the plant dies after delivery?",
          a: "We offer a 14-day plant health guarantee. If your plant dies within 14 days due to factors beyond your control, we'll replace it free of charge. This doesn't cover neglect or improper care.",
        },
      ],
    },
    {
      category: "Payment & Security",
      icon: <Clock className="w-5 h-5" />,
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, cash on delivery, and bank transfers. All transactions are secure and encrypted.",
        },
        {
          q: "Is my payment information safe?",
          a: "Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your credit card details on our servers. Your security is our top priority.",
        },
        {
          q: "Can I pay in installments?",
          a: "Yes, we offer installment plans through Tabby and Tamara for orders above AED 100. You can split your payment into 4 interest-free installments. Select this option at checkout.",
        },
        {
          q: "Do you offer corporate accounts?",
          a: "Yes, we offer corporate accounts for businesses with regular plant needs. Corporate accounts come with special pricing, dedicated account managers, and flexible payment terms. Contact us for more details.",
        },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

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
              <HelpCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our plants, delivery, and
              services. Can't find what you're looking for? Contact our support
              team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openIndex === key;

                    return (
                      <motion.div
                        key={questionIndex}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : "auto",
                        }}
                      >
                        <button
                          onClick={() =>
                            toggleQuestion(categoryIndex, questionIndex)
                          }
                          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">
                            {faq.q}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-6 pb-5 pt-0"
                          >
                            <p className="text-gray-600 leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Our support team is here to help you with any questions or
              concerns.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
