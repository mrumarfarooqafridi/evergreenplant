import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Customer Support</h1>
      <p className="text-gray-600 mb-6">Our support specialists are here to help with orders, products, and account assistance.</p>
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-2">
        <p><strong>Email:</strong> muazam@greenie.ae</p>
        <p><strong>Phone:</strong> +971 44 522 367</p>
        <p><strong>Hours:</strong> Mon-Sat: 9AM-7PM | Sun: 10AM-4PM</p>
      </div>
      <Link href="/contact" className="btn-primary inline-block mt-6">Contact Support Team</Link>
    </div>
  );
}
