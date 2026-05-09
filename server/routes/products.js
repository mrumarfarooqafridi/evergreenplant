const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Images are uploaded client-side to Firebase Storage.
// The server only receives/stores the resulting download URLs as JSON.
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", adminAuth, createProduct);
router.put("/:id", adminAuth, updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

module.exports = router;
