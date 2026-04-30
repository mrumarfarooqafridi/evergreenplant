export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100"><h2 className="font-semibold mb-1">How long does delivery take?</h2><p className="text-gray-600">Standard delivery takes 1-3 business days in major UAE cities.</p></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100"><h2 className="font-semibold mb-1">Do you offer plant care support?</h2><p className="text-gray-600">Yes, our team provides after-sale care guidance through support channels.</p></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100"><h2 className="font-semibold mb-1">Can I change my order?</h2><p className="text-gray-600">Order changes are possible before dispatch. Contact support quickly.</p></div>
      </div>
    </div>
  );
}
