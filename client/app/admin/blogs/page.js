"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  category: "",
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.blogs || []);
    } catch {
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const saveBlog = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editingId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs/${editingId}`, form, config);
        toast.success("Blog updated");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs`, form, config);
        toast.success("Blog created");
      }
      setForm(initialForm);
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save blog");
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image: blog.image || "",
      category: blog.category || "",
    });
  };

  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog deleted");
      fetchBlogs();
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Management</h1>

      <form onSubmit={saveBlog} className="bg-white rounded-lg border border-gray-100 p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="w-full p-2 border rounded-md" placeholder="Blog title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          <input className="w-full p-2 border rounded-md" placeholder="Category (e.g., Plant Care)" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
        </div>
        <input className="w-full p-2 border rounded-md" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))} />
        <input className="w-full p-2 border rounded-md" placeholder="Image URL" value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} />
        <textarea className="w-full p-2 border rounded-md min-h-40" placeholder="Blog content" value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} required />
        <div className="flex gap-2">
          <button type="submit" className="btn-primary">{editingId ? "Update Blog" : "Create Blog"}</button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(initialForm); }} className="px-4 py-2 border rounded-md">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white border border-gray-100 rounded-lg p-4 flex justify-between gap-4">
            <div>
              <p className="font-semibold">{blog.title}</p>
              <p className="text-sm text-gray-600">{blog.excerpt}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => editBlog(blog)} className="text-blue-600">Edit</button>
              <button onClick={() => deleteBlog(blog._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

