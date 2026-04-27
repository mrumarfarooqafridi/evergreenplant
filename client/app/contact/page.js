"use client";

import { useState } from "react";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-primary text-xl mr-4" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">
                    Greece K15 office 08 international city Dubai
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaPhone className="text-primary text-xl mr-4" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+971 44522367</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaEnvelope className="text-primary text-xl mr-4" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">muazam@greenie.ae</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaClock className="text-primary text-xl mr-4" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-gray-600">
                    Mon-Sat: 9AM-7PM, Sun: 10AM-4PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 h-64 rounded-3xl flex items-center justify-center mb-8">
              <span className="text-gray-500">Google Map Placeholder</span>
            </div>

            <a
              href="https://wa.me/97144522367"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-600 px-7 py-4 text-lg font-semibold text-white shadow-2xl shadow-emerald-500/10 transition-all duration-300 hover:bg-emerald-700"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginBottom: "1.5rem" }}
            >
              <FaWhatsapp className="text-2xl" />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-2 border rounded"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FaPaperPlane />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
