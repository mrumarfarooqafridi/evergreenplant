"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaLeaf,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const pathname = usePathname();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSubscribing(true);
    try {
      // Here you would typically send the email to your backend
      // For now, we'll just show a success message
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Newsletter Section */}
      {pathname === "/" && (
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-gray-700">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Stay Connected with Nature
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Get the latest updates on new plants, care tips, and
                    exclusive offers delivered to your inbox
                  </p>
                </div>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={subscribing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary whitespace-nowrap px-8 py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {subscribing ? "Subscribing..." : "Subscribe"}
                  </motion.button>
                </form>

                <p className="text-sm text-gray-400">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <FaLeaf className="text-primary text-2xl" />
              <h3 className="text-xl font-bold">Evergreen Nursery</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted source for beautiful, healthy plants and expert
              gardening advice. Bringing nature closer to your home.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, href: "#", label: "Facebook" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                {
                  icon: FaWhatsapp,
                  href: "https://wa.me/97144522367",
                  label: "WhatsApp",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/orders", label: "Track Order" },
                { href: "/returns", label: "Returns & Exchanges" },
                { href: "/faq", label: "FAQ" },
                { href: "/support", label: "Support" },
                { href: "/shipping", label: "Shipping Info" },
              ].map((item) => (
                <li key={item.href}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Greece K15 office 08 international city Dubai
                    <br />
                    United Arab Emirates
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary flex-shrink-0" />
                <a
                  href="tel:+97144522367"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  +971 44 522 367
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <a
                  href="mailto:muazam@greenie.ae"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  muazam@greenie.ae
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <FaClock className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Mon - Sat: 9AM - 7PM
                    <br />
                    Sunday: 10AM - 4PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              &copy; 2024 Evergreen Plant Nursery. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
