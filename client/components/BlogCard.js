"use client";

export default function BlogCard({ blog }) {
  return (
    <article className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={blog.image || "/plant-placeholder.svg"}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/plant-placeholder.svg";
          }}
        />
      </div>
      <div className="p-5">
        <p className="text-xs text-primary font-semibold mb-2 uppercase tracking-wide">
          {blog.category || "General"}
        </p>
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {blog.excerpt || "Read the full update from our team."}
        </p>
        {blog.content && (
          <p className="text-sm text-gray-500 line-clamp-3">{blog.content}</p>
        )}
        <p className="text-xs text-gray-400 mt-3">
          {blog.author && `By ${blog.author}`}
          {blog.createdAt?.seconds
            ? ` · ${new Date(blog.createdAt.seconds * 1000).toLocaleDateString()}`
            : ""}
        </p>
      </div>
    </article>
  );
}
