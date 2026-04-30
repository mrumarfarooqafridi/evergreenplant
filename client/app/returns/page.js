export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
      <p className="text-gray-600 mb-6">We offer a customer-first 7-day return and exchange process for eligible products.</p>
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-3">
        <p><strong>Eligibility:</strong> Item must be unused, in original condition, and reported within 7 days.</p>
        <p><strong>Process:</strong> Contact support with order number, reason, and product photos if needed.</p>
        <p><strong>Resolution:</strong> Exchange, store credit, or refund based on item condition.</p>
      </div>
    </div>
  );
}
