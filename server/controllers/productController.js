const { COLLECTIONS, admin } = require("../firebase");

exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      search,
    } = req.query;
    const { db } = req;

    let query = db.collection(COLLECTIONS.PRODUCTS);

    if (category) query = query.where("category", "==", category);
    if (minPrice) query = query.where("price", ">=", parseFloat(minPrice));
    if (maxPrice) query = query.where("price", "<=", parseFloat(maxPrice));

    const snapshot = await query.orderBy("createdAt", "desc").get();
    let products = [];
    snapshot.forEach((doc) => {
      products.push({ _id: doc.id, id: doc.id, ...doc.data() });
    });

    if (search) {
      const s = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s)
      );
    }

    const total = products.length;
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const paginatedProducts = products.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      products: paginatedProducts,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { db } = req;
    const doc = await db.collection(COLLECTIONS.PRODUCTS).doc(id).get();
    if (!doc.exists) return res.status(404).json({ message: "Product not found" });
    res.json({ _id: doc.id, id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, featured, images } = req.body;
    const { db } = req;

    if (!name || !description || price === undefined || !category || stock === undefined) {
      return res.status(400).json({
        message: "Name, description, price, category, and stock are required",
      });
    }

    // images is an array of URLs already uploaded by the client to Firebase Storage
    const imageUrls = Array.isArray(images) ? images : [];

    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      images: imageUrls,
      featured: featured === true || featured === "true",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTIONS.PRODUCTS).add(productData);
    res.status(201).json({ _id: docRef.id, id: docRef.id, ...productData });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, featured, images } = req.body;
    const { db } = req;

    const doc = await db.collection(COLLECTIONS.PRODUCTS).doc(id).get();
    if (!doc.exists) return res.status(404).json({ message: "Product not found" });

    // images is the full updated array of URLs from the client
    const imageUrls = Array.isArray(images) ? images : doc.data().images || [];

    const updateData = {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      featured: featured === true || featured === "true",
      images: imageUrls,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection(COLLECTIONS.PRODUCTS).doc(id).update(updateData);
    const updatedDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(id).get();
    res.json({ _id: updatedDoc.id, id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { db } = req;
    const doc = await db.collection(COLLECTIONS.PRODUCTS).doc(id).get();
    if (!doc.exists) return res.status(404).json({ message: "Product not found" });
    await db.collection(COLLECTIONS.PRODUCTS).doc(id).delete();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
