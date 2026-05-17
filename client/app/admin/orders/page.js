"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, Package, Truck, CheckCircle, XCircle, X } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } });
      setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []);
    } catch (e) {
      toast.error("Failed to fetch orders");
      if (e.response?.status === 401) router.push("/login");
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Status updated"); fetchOrders();
    } catch { toast.error("Failed to update status"); }
  };

  const statusColor = (s) => {
    const m = { pending: "bg-yellow-100 text-yellow-800", processing: "bg-blue-100 text-blue-800", shipped: "bg-purple-100 text-purple-800", delivered: "bg-green-100 text-green-800", cancelled: "bg-red-100 text-red-800" };
    return m[(s || "").toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const statusIcon = (s) => {
    const m = { pending: <Package className="text-yellow-500" size={14} />, processing: <Package className="text-blue-500" size={14} />, shipped: <Truck className="text-purple-500" size={14} />, delivered: <CheckCircle className="text-green-500" size={14} />, cancelled: <XCircle className="text-red-500" size={14} /> };
    return m[(s || "").toLowerCase()] || <Package className="text-gray-400" size={14} />;
  };

  const q = search.trim().toLowerCase();
  const filteredOrders = q
    ? orders.filter((o) => {
      const id = (o._id || "").toLowerCase();
      const shortId = id.slice(-8);
      return id.includes(q) || shortId.includes(q);
    })
    : orders;

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" /></div>;

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Orders</h1>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">{orders.length} total</span>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID (full or last 8)"
            className="w-full sm:max-w-md px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          />
        </div>
        {q && (
          <button
            onClick={() => setSearch("")}
            className="px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Mobile card list */}
        <div className="md:hidden divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-sm">No orders yet.</p>
          ) : filteredOrders.map((order) => (
            <div key={order._id} className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-semibold text-sm text-gray-900">#{(order._id || "").slice(-8)}</p>
                  <p className="text-xs text-gray-500">{order.user?.name || order.userName || order.contactInfo?.name || "N/A"}</p>
                  <p className="text-xs text-gray-400">{order.user?.email || order.userEmail || "N/A"}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm text-gray-900">AED {order.totalPrice}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1.5">
                  {statusIcon(order.status)}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(order.status)}`}>{order.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={15} /></button>
                  <select value={(order.status || "").toLowerCase()} onChange={e => updateStatus(order._id, e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
                    {["pending","processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto max-h-[70vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
              <tr>
                {["Order ID","Customer","Items","Total","Status","Date","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-500">No orders yet.</td></tr>
              ) : filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">#{(order._id || "").slice(-8)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 text-xs">{order.user?.name || order.userName || order.contactInfo?.name || "N/A"}</p>
                    <p className="text-gray-400 text-xs truncate max-w-[140px]">{order.user?.email || order.userEmail || "N/A"}</p>
                    {(order.contactInfo?.phone || order.shippingAddress?.phone) && (
                      <p className="text-gray-400 text-xs">📞 {order.contactInfo?.phone || order.shippingAddress?.phone}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{(order.items || order.products)?.length || 0}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">AED {order.totalPrice}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {statusIcon(order.status)}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(order.status)}`}>{order.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={14} /></button>
                      <select value={(order.status || "").toLowerCase()} onChange={e => updateStatus(order._id, e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white">
                        {["pending","processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:rounded-2xl sm:max-w-xl max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900">Order #{(selectedOrder._id || "").slice(-8)}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><X size={18} /></button>
            </div>
            <div className="p-4 space-y-4">
              {/* Customer */}
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Customer</p>
                <p className="text-sm font-medium">{selectedOrder.user?.name || selectedOrder.userName || selectedOrder.contactInfo?.name || "N/A"}</p>
                <p className="text-xs text-gray-500">{selectedOrder.user?.email || selectedOrder.userEmail || selectedOrder.contactInfo?.email || "N/A"}</p>
                {(selectedOrder.contactInfo?.phone || selectedOrder.shippingAddress?.phone) && (
                  <p className="text-xs text-gray-500">📞 {selectedOrder.contactInfo?.phone || selectedOrder.shippingAddress?.phone}</p>
                )}
                {selectedOrder.shippingAddress?.street && (
                  <p className="text-xs text-gray-500 mt-1">
                    📍 {[selectedOrder.shippingAddress.street, selectedOrder.shippingAddress.city, selectedOrder.shippingAddress.state, selectedOrder.shippingAddress.country].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>

              {/* Items */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Items</p>
                <div className="space-y-2">
                  {(selectedOrder.items || selectedOrder.products || []).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                      <img src={item.image || item.product?.images?.[0] || "/plant-placeholder.svg"} alt={item.name || "Product"} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name || item.product?.name || "Unknown"}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold flex-shrink-0">AED {((item.price || item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selectedOrder.status)}`}>{selectedOrder.status}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-green-600">AED {selectedOrder.totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
