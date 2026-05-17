"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, X } from "lucide-react";
import ImageUploader from "../../../components/ImageUploader";
import ProductPagination from "../../../components/ProductPagination";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "", stock: "", featured: false });
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const ITEMS_PER_PAGE = 20;

  useEffect(() => { fetchProducts(1); }, []);

  const fetchProducts = async (pageNum = currentPage) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: pageNum, limit: ITEMS_PER_PAGE },
      });
      setProducts(res.data.products || []);
      setCurrentPage(pageNum);
      setTotalPages(res.data.totalPages || 1);
      setTotal(typeof res.data.total === "number" ? res.data.total : 0);
    } catch (e) {
      toast.error("Failed to fetch products");
      if (e.response?.status === 401) router.push("/login");
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", category: "", stock: "", featured: false });
    setImages([]);
    setEditingProduct(null);
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setFormData({ name: p.name || "", description: p.description || "", price: String(p.price || ""), category: p.category || "", stock: String(p.stock || ""), featured: p.featured || false });
    setImages(p.images || []);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const payload = { ...formData, images };
      const cfg = { headers: { Authorization: `Bearer ${token}` } };
      if (editingProduct) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${editingProduct._id || editingProduct.id}`, payload, cfg);
        toast.success("Product updated");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, payload, cfg);
        toast.success("Product added");
      }
      setShowModal(false); resetForm(); fetchProducts(1);
    } catch (e) { toast.error(e.response?.data?.message || "Failed to save product"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Product deleted"); fetchProducts(Math.min(currentPage, totalPages));
    } catch { toast.error("Failed to delete product"); }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" /></div>;

  return (
    <div className="p-3 sm:p-4 lg:p-8 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 gap-3">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">{total} total</span>
          <button onClick={() => { resetForm(); setShowModal(true); }} className="btn-primary flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm">
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Table — card layout on mobile, table on md+ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Mobile card list */}
        <div className="md:hidden divide-y divide-gray-100 max-h-[70vh] overflow-y-auto overflow-x-hidden">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-sm">No products yet.</p>
          ) : products.map((p) => (
            <div key={p._id || p.id} className="p-4 flex items-center gap-3">
              <img src={(p.images && p.images[0]) || "/plant-placeholder.svg"} alt={p.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-500 truncate">{p.description}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.category}</span>
                  <span className="text-xs font-semibold text-gray-800">AED {p.price}</span>
                  <span className="text-xs text-gray-500">Stock: {p.stock}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={15} /></button>
                <button onClick={() => handleDelete(p._id || p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto max-h-[70vh] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
              <tr>
                {["Product", "Category", "Price", "Stock", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-500">No products yet.</td></tr>
              ) : products.map((p) => (
                <tr key={p._id || p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={(p.images && p.images[0]) || "/plant-placeholder.svg"} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[180px]">{p.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[180px]">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{p.category}</span></td>
                  <td className="px-4 py-3 font-medium text-gray-900">AED {p.price}</td>
                  <td className="px-4 py-3 text-gray-700">{p.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={15} /></button>
                      <button onClick={() => handleDelete(p._id || p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => fetchProducts(Math.max(1, Math.min(totalPages, p)))}
        />
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:rounded-2xl sm:max-w-lg max-h-[95vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Name *</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description *</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Price (AED) *</label>
                  <input type="number" step="0.01" min="0" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Stock *</label>
                  <input type="number" min="0" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                  <option value="">Select category</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="herbs">Herbs</option>
                  <option value="succulents">Succulents</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded accent-green-600" />
                <span className="text-sm text-gray-700">Featured product</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Images</label>
                <ImageUploader existingImages={images} onImagesChange={setImages} maxImages={5} />
              </div>

              <div className="flex gap-2 pt-2 pb-1">
                <button type="submit" disabled={saving} className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  {saving ? "Saving…" : editingProduct ? "Update Product" : "Add Product"}
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
