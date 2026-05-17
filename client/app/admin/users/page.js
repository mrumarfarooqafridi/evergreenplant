"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Shield, ShieldOff, Edit, Trash2, X } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user", isBlocked: false, newPassword: "" });
  const router = useRouter();

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data.users || []);
    } catch (e) {
      toast.error("Failed to fetch users");
      if (e.response?.status === 401) router.push("/login");
    } finally { setLoading(false); }
  };

  const openEdit = (u) => {
    setEditingUser(u);
    setFormData({ name: u.name || "", email: u.email || "", role: u.role || "user", isBlocked: u.isBlocked || false, newPassword: "" });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = { name: formData.name, email: formData.email, role: formData.role, isBlocked: formData.isBlocked };
      if (formData.newPassword.trim()) {
        if (formData.newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
        payload.newPassword = formData.newPassword;
      }
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${editingUser._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("User updated");
      setShowModal(false); setEditingUser(null);
      setFormData({ name: "", email: "", role: "user", isBlocked: false, newPassword: "" });
      fetchUsers();
    } catch (e) { toast.error(e.response?.data?.message || "Failed to update user"); }
  };

  const toggleBlock = async (id, current) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}/toggle-block`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`User ${current ? "unblocked" : "blocked"}`); fetchUsers();
    } catch { toast.error("Failed to update user"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("User deleted"); fetchUsers();
    } catch { toast.error("Failed to delete user"); }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" /></div>;

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Users</h1>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">{users.length} total</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Mobile card list */}
        <div className="md:hidden divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
          {users.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-sm">No users found.</p>
          ) : users.map((u) => (
            <div key={u._id} className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">{u.name}</p>
                <p className="text-xs text-gray-400 truncate">{u.email}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{u.role}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{u.isBlocked ? "Blocked" : "Active"}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <button onClick={() => openEdit(u)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={14} /></button>
                <button onClick={() => toggleBlock(u._id, u.isBlocked)} className={`p-1.5 rounded-lg ${u.isBlocked ? "text-green-600 hover:bg-green-50" : "text-orange-500 hover:bg-orange-50"}`}>{u.isBlocked ? <ShieldOff size={14} /> : <Shield size={14} />}</button>
                <button onClick={() => handleDelete(u._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto max-h-[70vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
              <tr>
                {["User","Role","Status","Joined","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-500">No users found.</td></tr>
              ) : users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"><User size={15} className="text-gray-500" /></div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[150px]">{u.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[150px]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{u.role}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${u.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{u.isBlocked ? "Blocked" : "Active"}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => openEdit(u)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={14} /></button>
                      <button onClick={() => toggleBlock(u._id, u.isBlocked)} className={`p-1.5 rounded-lg ${u.isBlocked ? "text-green-600 hover:bg-green-50" : "text-orange-500 hover:bg-orange-50"}`}>{u.isBlocked ? <ShieldOff size={14} /> : <Shield size={14} />}</button>
                      <button onClick={() => handleDelete(u._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:rounded-2xl sm:max-w-md max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900">Edit User</h2>
              <button onClick={() => { setShowModal(false); setEditingUser(null); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Role</label>
                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.isBlocked} onChange={e => setFormData({ ...formData, isBlocked: e.target.checked })} className="w-4 h-4 rounded accent-green-600" />
                <span className="text-sm text-gray-700">Block this user</span>
              </label>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">New Password <span className="font-normal text-gray-400">(leave blank to keep current)</span></label>
                <input type="password" value={formData.newPassword} onChange={e => setFormData({ ...formData, newPassword: e.target.value })} placeholder="Min. 6 characters" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="flex gap-2 pt-2 pb-1">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-sm">Update User</button>
                <button type="button" onClick={() => { setShowModal(false); setEditingUser(null); }} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
