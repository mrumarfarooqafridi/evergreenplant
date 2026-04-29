const Order = require("../models/Order");
const Product = require("../models/Product");

const hydrateFileOrder = async (req, order) => {
  const hydrated = { ...order };

  // user
  if (req.user?.role === "admin") {
    const u = await req.fileDatabase.getUserById(order.user);
    hydrated.user = u ? { _id: u._id, name: u.name, email: u.email } : null;
  } else {
    hydrated.user = order.user;
  }

  // products
  hydrated.products = await Promise.all(
    (order.products || []).map(async (item) => {
      const p = await req.fileDatabase.getProduct(item.product);
      return {
        ...item,
        product: p
          ? { _id: p._id, name: p.name, price: p.price, images: p.images }
          : null,
      };
    }),
  );

  return hydrated;
};

exports.getOrders = async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== "admin") {
      query.user = req.user.id;
    }

    let orders;
    if (req.useFileDatabase) {
      const rawOrders = await req.fileDatabase.getOrders(req.user.id, {
        admin: req.user.role === "admin",
      });
      orders = await Promise.all(rawOrders.map((o) => hydrateFileOrder(req, o)));
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
      const rawOrder = await req.fileDatabase.getOrder(
        req.params.id,
        req.user.id,
        req.user.role === "admin",
      );
      order = rawOrder ? await hydrateFileOrder(req, rawOrder) : null;
    } else {
      order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("products.product", "name price images");
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Access control (file DB uses string ids, Mongo uses populated doc)
    if (req.user.role !== "admin") {
      const orderUserId =
        typeof order.user === "string" ? order.user : order.user?._id?.toString();
      if (orderUserId && orderUserId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
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
      status: "Pending",
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
    const normalizedStatus =
      typeof status === "string" && status.length
        ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        : status;

    let order;
    if (req.useFileDatabase) {
      order = await req.fileDatabase.updateOrderStatus(
        req.params.id,
        normalizedStatus,
      );
    } else {
      order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: normalizedStatus },
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
