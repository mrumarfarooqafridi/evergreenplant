const { COLLECTIONS, admin } = require("../firebase");

const hydrateOrder = async (req, order) => {
  const hydrated = { ...order, _id: order.id };

  // Get user details if admin
  if (req.user?.role === "admin" && typeof order.userId === "string" && order.userId.trim() !== "") {
    const userDoc = await req.db
      .collection(COLLECTIONS.USERS)
      .doc(order.userId)
      .get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      hydrated.user = {
        _id: userData.id,
        name: userData.name,
        email: userData.email,
      };
    }
  } else {
    hydrated.user = order.userId;
  }

  // Get product details for each item
  hydrated.items = await Promise.all(
    (order.items || []).map(async (item) => {
      let productDoc = null;
      let productData = null;

      if (typeof item.productId === "string" && item.productId.trim() !== "") {
        productDoc = await req.db
          .collection(COLLECTIONS.PRODUCTS)
          .doc(item.productId)
          .get();
        productData = productDoc.exists ? productDoc.data() : null;
      }
      return {
        ...item,
        product: productData
          ? {
              _id: productDoc.id,
              name: productData.name,
              price: productData.price,
              images: productData.images,
            }
          : null,
      };
    }),
  );

  return hydrated;
};

exports.getOrders = async (req, res) => {
  try {
    const { db } = req;
    let query = db.collection(COLLECTIONS.ORDERS);

    // Filter by user if not admin
    if (req.user.role !== "admin") {
      query = query.where("userId", "==", req.user.id);
    }

    const snapshot = await query.orderBy("createdAt", "desc").get();
    let orders = [];

    for (const doc of snapshot.docs) {
      const order = { id: doc.id, ...doc.data() };
      const hydrated = await hydrateOrder(req, order);
      orders.push(hydrated);
    }

    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { db } = req;

    const doc = await db.collection(COLLECTIONS.ORDERS).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = { id: doc.id, ...doc.data() };

    // Access control
    if (req.user.role !== "admin" && order.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const hydrated = await hydrateOrder(req, order);
    res.json(hydrated);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, contactInfo } = req.body;
    const { db } = req;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const productDoc = await db
        .collection(COLLECTIONS.PRODUCTS)
        .doc(item.productId)
        .get();

      if (!productDoc.exists) {
        return res.status(400).json({ message: "Product not found" });
      }

      const product = productDoc.data();

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      orderItems.push({
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0] || "",
      });

      totalPrice += product.price * item.quantity;

      // Update stock
      await db
        .collection(COLLECTIONS.PRODUCTS)
        .doc(item.productId)
        .update({
          stock: admin.firestore.FieldValue.increment(-item.quantity),
        });
    }

    // Get user details
    const userDoc = await db
      .collection(COLLECTIONS.USERS)
      .doc(req.user.id)
      .get();
    const userData = userDoc.data();

    const orderData = {
      userId: req.user.id,
      userEmail: userData?.email || "",
      userName: userData?.name || "",
      items: orderItems,
      totalPrice,
      shippingAddress: shippingAddress || {},
      contactInfo: contactInfo || {
        name: userData?.name || "",
        email: userData?.email || "",
        phone: shippingAddress?.phone || "",
      },
      paymentMethod,
      status: "Pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTIONS.ORDERS).add(orderData);
    const order = { id: docRef.id, _id: docRef.id, ...orderData };

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const { db } = req;

    const normalizedStatus =
      typeof status === "string" && status.length
        ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        : status;

    const doc = await db.collection(COLLECTIONS.ORDERS).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Order not found" });
    }

    await db.collection(COLLECTIONS.ORDERS).doc(id).update({
      status: normalizedStatus,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await db.collection(COLLECTIONS.ORDERS).doc(id).get();
    const order = { id: updatedDoc.id, ...updatedDoc.data() };

    res.json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
