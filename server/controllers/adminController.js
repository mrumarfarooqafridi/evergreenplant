const { COLLECTIONS, admin } = require("../firebase");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const { db } = req;
    const snapshot = await db.collection(COLLECTIONS.USERS).get();
    const users = [];

    snapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        _id: doc.id,
        id: doc.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatarUrl: userData.avatarUrl || "",
        createdAt: userData.createdAt,
      });
    });

    res.json({ users });
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update user (admin only)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const { db, auth } = req;

    const doc = await db.collection(COLLECTIONS.USERS).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    await db.collection(COLLECTIONS.USERS).doc(id).update(updateData);

    // Update email in Firebase Auth if changed
    if (email !== undefined) {
      try {
        await auth.updateUser(id, { email });
      } catch (error) {
        console.error("Error updating email in Firebase Auth:", error);
      }
    }

    const updatedDoc = await db.collection(COLLECTIONS.USERS).doc(id).get();
    const user = updatedDoc.data();

    res.json({ _id: updatedDoc.id, id: updatedDoc.id, ...user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { db, auth } = req;

    const doc = await db.collection(COLLECTIONS.USERS).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete from Firebase Auth
    try {
      await auth.deleteUser(id);
    } catch (error) {
      console.error("Error deleting user from Firebase Auth:", error);
    }

    // Delete from Firestore
    await db.collection(COLLECTIONS.USERS).doc(id).delete();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Block/Unblock user (admin only)
exports.toggleUserBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { db } = req;

    const doc = await db.collection(COLLECTIONS.USERS).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = doc.data();
    const newBlockedStatus = !userData.isBlocked;

    await db.collection(COLLECTIONS.USERS).doc(id).update({
      isBlocked: newBlockedStatus,
    });

    const updatedDoc = await db.collection(COLLECTIONS.USERS).doc(id).get();
    const user = updatedDoc.data();

    res.json({ _id: updatedDoc.id, id: updatedDoc.id, ...user });
  } catch (err) {
    console.error("Toggle user block error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBlogsAdmin = async (req, res) => {
  try {
    const { db } = req;
    const snapshot = await db
      .collection(COLLECTIONS.BLOGS)
      .orderBy("createdAt", "desc")
      .get();
    const blogs = [];

    snapshot.forEach((doc) => {
      blogs.push({ _id: doc.id, id: doc.id, ...doc.data() });
    });

    res.json({ blogs });
  } catch (err) {
    console.error("Get blogs admin error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, image, category } = req.body;
    const { db } = req;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const blogData = {
      title,
      slug,
      excerpt: excerpt || content.slice(0, 140),
      content,
      image: image || "/plant-placeholder.svg",
      category: category || "General",
      author: req.user.name || "Admin",
      published: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTIONS.BLOGS).add(blogData);
    const blog = { _id: docRef.id, id: docRef.id, ...blogData };

    res.status(201).json(blog);
  } catch (err) {
    console.error("Create blog error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, image, category, published } = req.body;
    const { db } = req;

    const doc = await db.collection(COLLECTIONS.BLOGS).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updateData = {};
    if (title !== undefined) {
      updateData.title = title;
      updateData.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (published !== undefined) updateData.published = published;
    updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    await db.collection(COLLECTIONS.BLOGS).doc(id).update(updateData);

    const updatedDoc = await db.collection(COLLECTIONS.BLOGS).doc(id).get();
    const blog = {
      _id: updatedDoc.id,
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };

    res.json(blog);
  } catch (err) {
    console.error("Update blog error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { db } = req;

    const doc = await db.collection(COLLECTIONS.BLOGS).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await db.collection(COLLECTIONS.BLOGS).doc(id).delete();

    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Delete blog error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
