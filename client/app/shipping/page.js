export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-3 text-gray-700">
        <p><strong>Coverage:</strong> We deliver across the UAE.</p>
        <p><strong>Delivery Time:</strong> 1-3 business days for in-stock items.</p>
        <p><strong>Shipping Fee:</strong> Calculated at checkout based on area and order value.</p>
        <p><strong>Live Updates:</strong> Track your shipment from the Track Order page after checkout.</p>
      </div>
    </div>
  );
}
