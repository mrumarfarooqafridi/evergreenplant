"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/submit`,
        formData,
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error.response?.data?.message ||
          "Error sending message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      content:
        "Greece K15 office 08 international city Dubai, United Arab Emirates",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+971 44 522 367",
      link: "tel:+97144522367",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "muazam@greenie.ae",
      link: "mailto:muazam@greenie.ae",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      content: "Mon-Sat: 9AM-7PM, Sun: 10AM-4PM",
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
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-lg sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-3 sm:mb-6 leading-tight">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Touch
              </span>
            </h1>
            <p className="text-[10px] sm:text-sm md:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-8">
              Have questions about our plants or need expert advice? We're here
              to help you create your perfect green space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-lg sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6 mb-10">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-2 sm:space-x-4 p-2 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-green-50 transition-colors"
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 text-[10px] sm:text-sm md:text-base">
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-gray-600 hover:text-green-600 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 sm:h-64 md:h-80 rounded-lg sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-8 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
                    <p className="text-gray-500 font-medium text-[10px] sm:text-sm">
                      Google Maps Integration
                    </p>
                    <p className="text-gray-400 text-[8px] sm:text-sm">
                      Interactive map coming soon
                    </p>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <motion.a
                  href="https://wa.me/97144522367"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-[10px] sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                  Chat on WhatsApp
                </motion.a>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-green-100">
                  <h2 className="text-lg sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-8">
                    Send us a Message
                  </h2>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 sm:space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
                      <div>
                        <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-2 sm:px-4 py-1 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors text-[10px] sm:text-sm md:text-base"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-2 sm:px-4 py-1 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors text-[10px] sm:text-sm md:text-base"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-2 sm:px-4 py-1 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors text-[10px] sm:text-sm md:text-base"
                        placeholder="How can we help?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-2 sm:px-4 py-1 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors resize-none text-[10px] sm:text-sm md:text-base"
                        placeholder="Tell us more about your inquiry..."
                        required
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-[10px] sm:text-sm"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="mt-4 sm:mt-8 flex items-center justify-center space-x-2 text-[10px] sm:text-sm text-gray-500">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span>We typically respond within 24 hours</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
