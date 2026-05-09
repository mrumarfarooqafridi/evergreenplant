const cloudinary = require("cloudinary").v2;
const { COLLECTIONS, admin } = require("../firebase");

// Helper function to extract public_id from Cloudinary URL
const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return publicId;
};

// Helper function to delete images from Cloudinary
const deleteImagesFromCloudinary = async (imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) return;

  const publicIds = imageUrls.map((url) => getPublicIdFromUrl(url));
  try {
    await cloudinary.api.delete_resources(publicIds);
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
  }
};

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

    // Apply filters
    if (category) {
      query = query.where("category", "==", category);
    }
    if (minPrice) {
      query = query.where("price", ">=", parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.where("price", "<=", parseFloat(maxPrice));
    }

    // Get all products (Firestore doesn't have built-in pagination like MongoDB)
    const snapshot = await query.orderBy("createdAt", "desc").get();
    let products = [];

    snapshot.forEach((doc) => {
      products.push({ _id: doc.id, id: doc.id, ...doc.data() });
    });

    // Apply search filter in memory (Firestore doesn't support regex)
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower),
      );
    }

    // Apply pagination in memory
    const total = products.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      totalPages: Math.ceil(total / limit),
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

    if (!doc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ _id: doc.id, id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, featured } = req.body;
    const { db } = req;

    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "evergreen/products",
        });
        images.push(result.secure_url);
      }
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      images,
      featured: featured || false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTIONS.PRODUCTS).add(productData);
    const product = { _id: docRef.id, id: docRef.id, ...productData };

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      stock,
      featured,
      existingImages,
    } = req.body;
    const { db } = req;

    // Normalize existingImages so single values and arrays both work
    const imagesFromRequest = Array.isArray(existingImages)
      ? existingImages
      : existingImages
        ? [existingImages]
        : [];

    // Get existing product to delete old images
    const doc = await db.collection(COLLECTIONS.PRODUCTS).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingProduct = doc.data();

    // Handle image updates
    let images = imagesFromRequest;

    // Delete images that are no longer in the list
    if (existingProduct.images && existingProduct.images.length > 0) {
      const imagesToDelete = existingProduct.images.filter(
        (img) => !images.includes(img),
      );
      if (imagesToDelete.length > 0) {
        await deleteImagesFromCloudinary(imagesToDelete);
      }
    }

    // Upload new images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "evergreen/products",
        });
        images.push(result.secure_url);
      }
    }

    const updateData = {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      featured: featured !== undefined ? featured : existingProduct.featured,
      images,
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

    if (!doc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = doc.data();

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      await deleteImagesFromCloudinary(product.images);
    }

    // Delete from Firestore
    await db.collection(COLLECTIONS.PRODUCTS).doc(id).delete();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
