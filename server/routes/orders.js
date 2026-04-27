const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", auth, getOrders);
router.get("/:id", auth, getOrder);
router.post("/", auth, createOrder);
router.put("/:id", adminAuth, updateOrderStatus);

module.exports = router;
