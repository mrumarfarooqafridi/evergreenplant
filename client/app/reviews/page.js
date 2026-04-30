"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: "",
    service: "Website",
    rating: 5,
    comment: "",
  });

  const loadReviews = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
      setReviews(res.data || []);
    } catch {
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, form);
      toast.success("Thanks for your feedback!");
      setForm({ name: "", service: "Website", rating: 5, comment: "" });
      loadReviews();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2">Customer Reviews</h1>
      <p className="text-gray-600 mb-8">Rate our website and services to help us improve.</p>

      <form onSubmit={submitReview} className="bg-white border border-gray-100 rounded-xl p-6 mb-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="p-2 border rounded-md" placeholder="Your name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <select className="p-2 border rounded-md" value={form.service} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}>
            <option>Website</option>
            <option>Delivery</option>
            <option>Support</option>
            <option>Products</option>
          </select>
          <select className="p-2 border rounded-md" value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
        <textarea className="w-full p-2 border rounded-md min-h-28" placeholder="Write your review" value={form.comment} onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))} required />
        <button className="btn-primary" type="submit">Submit Review</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white border border-gray-100 rounded-lg p-5">
            <div className="flex justify-between mb-2">
              <p className="font-semibold">{review.name}</p>
              <p className="text-amber-500">{Array(review.rating).fill("★").join("")}</p>
            </div>
            <p className="text-xs text-primary mb-2">{review.service}</p>
            <p className="text-gray-700 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

