exports.getBlogs = async (req, res) => {
  try {
    if (req.useFileDatabase) {
      const blogs = await req.fileDatabase.getBlogs();
      return res.json(blogs);
    }
    return res.json([]);
  } catch (error) {
    console.error("Get blogs error:", error);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

