const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  toggleUserBlock,
  getBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/adminController");

const router = express.Router();

// All admin routes require admin authentication
router.use(adminAuth);

// User management routes
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/toggle-block", toggleUserBlock);
router.get("/blogs", getBlogsAdmin);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
