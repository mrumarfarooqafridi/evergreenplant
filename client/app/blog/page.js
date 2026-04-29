export const metadata = {
  title: "Blog | Evergreen Nursery",
  description: "Plant care tips, guides, and updates from Evergreen Nursery.",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-gray-600 max-w-2xl">
        We’re preparing plant care guides, seasonal tips, and nursery updates.
        Check back soon.
      </p>
    </div>
  );
}

