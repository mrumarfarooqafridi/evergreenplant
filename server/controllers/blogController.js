const { COLLECTIONS } = require("../firebase");

exports.getBlogs = async (req, res) => {
  try {
    const { db } = req;
    const snapshot = await db
      .collection(COLLECTIONS.BLOGS)
      .orderBy("createdAt", "desc")
      .get();
    
    const blogs = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.published === true || data.published === "true") {
        blogs.push({ _id: doc.id, id: doc.id, ...data });
      }
    });

    return res.json({ blogs });
  } catch (error) {
    console.error("Get blogs error:", error);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

