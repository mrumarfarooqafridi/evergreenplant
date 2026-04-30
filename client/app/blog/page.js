export const metadata = {
  title: "Blog | Evergreen Nursery",
  description: "Plant care tips, guides, and updates from Evergreen Nursery.",
};

import Image from "next/image";

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-gray-600 max-w-2xl mb-8">
        Discover plant care guides, nursery updates, and seasonal inspiration.
      </p>

      {blogs.length === 0 ? (
        <p className="text-gray-600">No blog posts yet. Please check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={blog.image || "/plant-placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-primary font-semibold mb-2 uppercase">
                  {blog.category || "General"}
                </p>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {blog.excerpt || "Read the full update from our team."}
                </p>
                <p className="text-sm text-gray-500">{blog.content}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

