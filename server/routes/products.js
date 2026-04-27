const express = require("express");
const multer = require("multer");
const { auth, adminAuth } = require("../middleware/auth");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", adminAuth, upload.array("images"), createProduct);
router.put("/:id", adminAuth, upload.array("images"), updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

module.exports = router;
