const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

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

    let result;
    if (req.useFileDatabase) {
      const query = {};
      if (category) query.category = category;
      if (minPrice) query.minPrice = parseFloat(minPrice);
      if (maxPrice) query.maxPrice = parseFloat(maxPrice);
      if (search) query.search = search;

      const options = { limit: parseInt(limit), page: parseInt(page) };
      result = await req.fileDatabase.getProducts(query, options);
    } else {
      let query = {};

      if (category) query.category = category;
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      const products = await Product.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Product.countDocuments(query);

      result = {
        products,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      };
    }

    res.json(result);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product;
    if (req.useFileDatabase) {
      product = await req.fileDatabase.getProduct(id);
    } else {
      product = await Product.findById(id);
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

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
    };

    let product;
    if (req.useFileDatabase) {
      product = await req.fileDatabase.createProduct(productData);
    } else {
      product = new Product(productData);
      await product.save();
    }

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, existingImages } =
      req.body;

    // Normalize existingImages so single values and arrays both work
    const imagesFromRequest = Array.isArray(existingImages)
      ? existingImages
      : existingImages
        ? [existingImages]
        : [];

    // Get existing product to delete old images
    let existingProduct;
    if (req.useFileDatabase) {
      existingProduct = await req.fileDatabase.getProduct(id);
    } else {
      existingProduct = await Product.findById(id);
    }

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

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
      images,
    };

    let product;
    if (req.useFileDatabase) {
      product = await req.fileDatabase.updateProduct(id, updateData);
    } else {
      product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    res.json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product;
    if (req.useFileDatabase) {
      product = await req.fileDatabase.getProduct(id);
      if (product) {
        // Delete images from Cloudinary
        if (product.images && product.images.length > 0) {
          await deleteImagesFromCloudinary(product.images);
        }
        // Remove from file database
        await req.fileDatabase.deleteProduct(id);
        res.json({ message: "Product deleted successfully" });
        return;
      }
    } else {
      product = await Product.findByIdAndDelete(id);
      if (product && product.images && product.images.length > 0) {
        await deleteImagesFromCloudinary(product.images);
      }
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
