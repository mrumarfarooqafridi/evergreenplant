const Order = require("../models/Order");
const Product = require("../models/Product");

exports.getOrders = async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== "admin") {
      query.user = req.user.id;
    }

    let orders;
    if (req.useFileDatabase) {
      orders = await req.fileDatabase.getOrders(req.user.id, {
        admin: req.user.role === "admin",
      });
    } else {
      orders = await Order.find(query)
        .populate("user", "name email")
        .populate("products.product", "name price images")
        .sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    let order;
    if (req.useFileDatabase) {
      order = await req.fileDatabase.getOrder(
        req.params.id,
        req.user.id,
        req.user.role === "admin",
      );
    } else {
      order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("products.product", "name price images");
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { products, address, paymentMethod } = req.body;

    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
      let product;
      if (req.useFileDatabase) {
        product = await req.fileDatabase.getProduct(item.product);
      } else {
        product = await Product.findById(item.product);
      }

      if (!product || product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: "Product not available or insufficient stock" });
      }

      orderProducts.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
      });

      totalPrice += product.price * item.quantity;

      // Update stock
      if (!req.useFileDatabase) {
        product.stock -= item.quantity;
        await product.save();
      } else {
        // For file database, update stock in the product
        await req.fileDatabase.updateProduct(item.product, {
          stock: product.stock - item.quantity,
        });
      }
    }

    const orderData = {
      user: req.user.id,
      products: orderProducts,
      totalPrice,
      address,
      paymentMethod,
      status: "pending",
    };

    let order;
    if (req.useFileDatabase) {
      order = await req.fileDatabase.createOrder(orderData);
    } else {
      order = new Order(orderData);
      await order.save();
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    let order;
    if (req.useFileDatabase) {
      order = await req.fileDatabase.updateOrderStatus(req.params.id, status);
    } else {
      order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true },
      ).populate("user", "name email");
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
