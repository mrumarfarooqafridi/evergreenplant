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
  FaTruck,
  FaUndo,
  FaQuestionCircle,
  FaHeadset,
  FaBox,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

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
          <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                <div>
                  <h3 className="text-sm sm:text-xl md:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Stay Connected with Nature
                  </h3>
                  <p className="text-gray-300 text-[10px] sm:text-sm md:text-lg">
                    Get the latest updates on new plants, care tips, and
                    exclusive offers delivered to your inbox
                  </p>
                </div>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-lg mx-auto"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 sm:px-5 py-2 sm:py-4 rounded-lg text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={subscribing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary whitespace-nowrap px-4 sm:px-8 py-2 sm:py-4 text-[10px] sm:text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {subscribing ? "Subscribing..." : "Subscribe"}
                  </motion.button>
                </form>

                <p className="text-[10px] sm:text-sm text-gray-400">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-4 md:mb-6">
              <FaLeaf className="text-primary text-sm sm:text-lg md:text-2xl" />
              <h3 className="text-xs sm:text-base md:text-xl font-bold">
                Evergreen Nursery
              </h3>
            </div>
            <p className="text-gray-300 mb-2 sm:mb-4 md:mb-6 leading-relaxed text-[10px] sm:text-xs md:text-base">
              Your trusted source for beautiful, healthy plants and expert
              gardening advice. Bringing nature closer to your home.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {[
                {
                  icon: FaFacebook,
                  href: "https://www.facebook.com/share/14c5rcPo3iP/",
                  label: "Facebook",
                },
                {
                  icon: FaTwitter,
                  href: "https://x.com/uaeevergreen",
                  label: "Twitter",
                },
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/nurseryevergreenplants/",
                  label: "Instagram",
                },
                {
                  icon: FaWhatsapp,
                  href: "https://wa.me/97144522367",
                  label: "WhatsApp",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="text-[10px] sm:text-xs md:text-sm" />
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
            className="hidden md:block"
          >
            <h4 className="text-xs sm:text-sm md:text-lg font-semibold mb-2 sm:mb-4 md:mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/reviews", label: "Reviews" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      href={item.href}
                      className="text-gray-300 text-[10px] sm:text-xs md:text-sm hover:text-primary transition-colors duration-300 flex items-center group"
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
            <h4 className="text-xs sm:text-sm md:text-lg font-semibold mb-2 sm:mb-4 md:mb-6 text-white">
              Customer Service
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "/track-order", label: "Track Order", icon: FaBox },
                {
                  href: "/returns",
                  label: "Returns & Exchanges",
                  icon: FaUndo,
                },
                { href: "/faq", label: "FAQ", icon: FaQuestionCircle },
                { href: "/support", label: "Support", icon: FaHeadset },
                { href: "/shipping", label: "Shipping Info", icon: FaTruck },
              ].map((item) => (
                <li key={item.href}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      href={item.href}
                      className="text-gray-300 text-[10px] sm:text-xs md:text-sm hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1.5 sm:mr-2 text-primary/70 group-hover:text-primary transition-colors" />
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
            className="hidden md:block"
          >
            <h4 className="text-xs sm:text-sm md:text-lg font-semibold mb-2 sm:mb-4 md:mb-6 text-white">
              Contact Info
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0 text-xs sm:text-sm md:text-base" />
                <div>
                  <p className="text-gray-300 text-[10px] sm:text-xs md:text-base">
                    Greece K15 office 08 international city Dubai
                    <br />
                    United Arab Emirates
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaPhone className="text-primary flex-shrink-0 text-xs sm:text-sm md:text-base" />
                <a
                  href="tel:+97144522367"
                  className="text-gray-300 text-[10px] sm:text-xs md:text-base hover:text-primary transition-colors"
                >
                  +971 44 522 367
                </a>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaEnvelope className="text-primary flex-shrink-0 text-xs sm:text-sm md:text-base" />
                <a
                  href="mailto:muazam@greenie.ae"
                  className="text-gray-300 text-[10px] sm:text-xs md:text-base hover:text-primary transition-colors"
                >
                  muazam@greenie.ae
                </a>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <FaClock className="text-primary mt-1 flex-shrink-0 text-xs sm:text-sm md:text-base" />
                <div>
                  <p className="text-gray-300 text-[10px] sm:text-xs md:text-base">
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
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 sm:space-y-4 md:space-y-0">
            <p className="text-gray-300 text-[9px] sm:text-xs">
              &copy; 2024 Evergreen Plant Nursery. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-6 text-[9px] sm:text-xs">
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
