export const metadata = {
  title: "Blog | Evergreen Nursery",
  description: "Plant care tips, guides, and updates from Evergreen Nursery.",
};

import BlogCard from "../../components/BlogCard";

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.blogs || [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <h1 className="text-lg sm:text-4xl font-bold mb-2 sm:mb-4">Blog</h1>
      <p className="text-gray-600 text-[10px] sm:text-sm max-w-2xl mb-4 sm:mb-8">
        Discover plant care guides, nursery updates, and seasonal inspiration.
      </p>

      {blogs.length === 0 ? (
        <p className="text-gray-600 text-[10px] sm:text-sm">
          No blog posts yet. Please check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id || blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
