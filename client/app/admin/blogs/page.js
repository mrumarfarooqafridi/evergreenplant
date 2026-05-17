"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, X } from "lucide-react";

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
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.blogs || []);
    } catch {
      toast.error("Failed to fetch blogs");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const saveBlog = async (e) => {
    e.preventDefault();
    setSaving(true);
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
      setShowModal(false);
      fetchBlogs();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save blog");
    } finally {
      setSaving(false);
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
    setShowModal(true);
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

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" /></div>;

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <div className="flex items-center justify-between mb-5 gap-3">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Blogs</h1>
        <button onClick={() => { resetForm(); setShowModal(true); }} className="btn-primary flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Blog</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="md:hidden divide-y divide-gray-100 max-h-[70vh] overflow-y-auto overflow-x-hidden">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-sm">No blogs yet.</p>
          ) : blogs.map((b) => (
            <div key={b._id || b.id} className="p-4 flex items-start gap-3">
              <img
                src={b.image || "/plant-placeholder.svg"}
                alt={b.title}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">{b.title}</p>
                <p className="text-xs text-gray-500 truncate">{b.excerpt}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{b.category || "General"}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => editBlog(b)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={15} /></button>
                <button onClick={() => deleteBlog(b._id || b.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto max-h-[70vh] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
              <tr>
                {["Blog", "Category", "Published", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-500">No blogs yet.</td></tr>
              ) : blogs.map((b) => (
                <tr key={b._id || b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={b.image || "/plant-placeholder.svg"}
                        alt={b.title}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[260px]">{b.title}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[260px]">{b.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{b.category || "General"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${b.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {b.published ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => editBlog(b)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={15} /></button>
                      <button onClick={() => deleteBlog(b._id || b.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:rounded-2xl sm:max-w-lg max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900">{editingId ? "Edit Blog" : "Add New Blog"}</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><X size={18} /></button>
            </div>

            <form onSubmit={saveBlog} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
                <input
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Blog title"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                  <input
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Plant Care"
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL</label>
                  <input
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://..."
                    value={form.image}
                    onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Excerpt</label>
                <input
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Short summary..."
                  value={form.excerpt}
                  onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Content *</label>
                <textarea
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none min-h-44"
                  placeholder="Write your blog content..."
                  value={form.content}
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                  required
                />
              </div>

              <div className="flex gap-2 pt-2 pb-1">
                <button type="submit" disabled={saving} className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  {saving ? "Saving…" : editingId ? "Update Blog" : "Add Blog"}
                </button>
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

