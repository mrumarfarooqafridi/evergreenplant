const User = require("../models/User");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    let users;
    if (req.useFileDatabase) {
      users = await req.fileDatabase.getAllUsers();
    } else {
      users = await User.find().select("-password");
    }

    res.json({ users });
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user (admin only)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, isBlocked } = req.body;

    let user;
    if (req.useFileDatabase) {
      user = await req.fileDatabase.updateUser(id, {
        name,
        email,
        role,
        isBlocked,
      });
    } else {
      user = await User.findByIdAndUpdate(
        id,
        { name, email, role, isBlocked },
        { new: true },
      ).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user;
    if (req.useFileDatabase) {
      user = await req.fileDatabase.deleteUser(id);
    } else {
      user = await User.findByIdAndDelete(id);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Block/Unblock user (admin only)
exports.toggleUserBlock = async (req, res) => {
  try {
    const { id } = req.params;

    let user;
    if (req.useFileDatabase) {
      user = await req.fileDatabase.getUserById(id);
      if (user) {
        user.isBlocked = !user.isBlocked;
        await req.fileDatabase.updateUser(id, user);
        user = await req.fileDatabase.getUserById(id);
      }
    } else {
      user = await User.findById(id);
      if (user) {
        user.isBlocked = !user.isBlocked;
        await user.save();
        user = await User.findById(id).select("-password");
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Toggle user block error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBlogsAdmin = async (req, res) => {
  try {
    if (req.useFileDatabase) {
      const blogs = await req.fileDatabase.getBlogs();
      return res.json({ blogs });
    }
    return res.json({ blogs: [] });
  } catch (err) {
    console.error("Get blogs admin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, image, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    if (req.useFileDatabase) {
      const blog = await req.fileDatabase.createBlog({
        title,
        excerpt: excerpt || content.slice(0, 140),
        content,
        image: image || "/plant-placeholder.svg",
        category: category || "General",
        author: req.user.name || "Admin",
      });
      return res.status(201).json(blog);
    }

    return res.status(501).json({ message: "Blog admin is not configured in Mongo mode yet" });
  } catch (err) {
    console.error("Create blog error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.useFileDatabase) {
      const blog = await req.fileDatabase.updateBlog(id, req.body);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      return res.json(blog);
    }
    return res.status(501).json({ message: "Blog admin is not configured in Mongo mode yet" });
  } catch (err) {
    console.error("Update blog error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.useFileDatabase) {
      const deleted = await req.fileDatabase.deleteBlog(id);
      if (!deleted) return res.status(404).json({ message: "Blog not found" });
      return res.json({ message: "Blog deleted" });
    }
    return res.status(501).json({ message: "Blog admin is not configured in Mongo mode yet" });
  } catch (err) {
    console.error("Delete blog error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
