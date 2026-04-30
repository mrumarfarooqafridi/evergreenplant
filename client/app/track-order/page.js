import Link from "next/link";

export default function TrackOrderPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
      <p className="text-gray-600 mb-6">
        Track delivery progress, order status, and shipment milestones from your account.
      </p>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <p className="mb-4">For logged-in customers, live tracking is available in your orders dashboard.</p>
        <Link href="/orders" className="btn-primary inline-block">Go to My Orders</Link>
      </div>
    </div>
  );
}

