"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-8">
          Subscribe to our newsletter for gardening tips and exclusive offers
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-l-lg text-gray-800"
            required
          />
          <button
            type="submit"
            className="bg-secondary text-white px-6 py-2 rounded-r-lg hover:bg-green-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
