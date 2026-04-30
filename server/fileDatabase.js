const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class FileDatabase {
  constructor() {
    this.dataDir = path.join(__dirname, "data");
    this.usersFile = path.join(this.dataDir, "users.json");
    this.productsFile = path.join(this.dataDir, "products.json");
    this.ordersFile = path.join(this.dataDir, "orders.json");
    this.blogsFile = path.join(this.dataDir, "blogs.json");
    this.reviewsFile = path.join(this.dataDir, "reviews.json");
    this.contactsFile = path.join(this.dataDir, "contacts.json");
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      await fs.mkdir(this.dataDir, { recursive: true });

      // Initialize files if they don't exist
      await this.ensureFile(this.usersFile, []);
      await this.ensureFile(this.productsFile, []);
      await this.ensureFile(this.ordersFile, []);
      await this.ensureFile(this.blogsFile, []);
      await this.ensureFile(this.reviewsFile, []);
      await this.ensureFile(this.contactsFile, []);

      // Seed initial data
      await this.seedInitialData();

      this.initialized = true;
      console.log("📁 File database initialized");
    } catch (error) {
      console.error("❌ Error initializing file database:", error);
      throw error;
    }
  }

  async ensureFile(filePath, defaultData) {
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
    }
  }

  async seedInitialData() {
    const users = await this.readData(this.usersFile);
    const products = await this.readData(this.productsFile);

    // Seed admin user
    if (users.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      users.push({
        _id: this.generateId(),
        name: "Admin User",
        email: "admin@evergreen.com",
        password: hashedPassword,
        role: "admin",
        avatarUrl: "",
        isBlocked: false,
        wishlist: [],
        createdAt: new Date().toISOString(),
      });
      await this.writeData(this.usersFile, users);
      console.log("👤 Admin user created");
    }

    // Seed products
    if (products.length === 0) {
      const sampleProducts = [
        {
          _id: this.generateId(),
          name: "Snake Plant",
          description:
            "Low-maintenance indoor plant known for air purification",
          price: 45,
          category: "indoor",
          stock: 25,
          images: ["/plant_imgs/snake-plant.png"],
          isAvailable: true,
          createdAt: new Date().toISOString(),
        },
        {
          _id: this.generateId(),
          name: "Peace Lily",
          description: "Beautiful flowering plant that thrives in low light",
          price: 35,
          category: "indoor",
          stock: 20,
          images: ["/plant_imgs/peace-lily.png"],
          isAvailable: true,
          createdAt: new Date().toISOString(),
        },
        {
          _id: this.generateId(),
          name: "Spider Plant",
          description: "Easy to grow plant with cascading leaves",
          price: 25,
          category: "indoor",
          stock: 30,
          images: ["/plant-placeholder.svg"],
          isAvailable: true,
          createdAt: new Date().toISOString(),
        },
        {
          _id: this.generateId(),
          name: "Pothos",
          description: "Trailing vine perfect for beginners",
          price: 20,
          category: "indoor",
          stock: 40,
          images: ["/plant-placeholder.svg"],
          isAvailable: true,
          createdAt: new Date().toISOString(),
        },
        {
          _id: this.generateId(),
          name: "Lavender",
          description: "Fragrant herb perfect for gardens",
          price: 15,
          category: "outdoor",
          stock: 50,
          images: ["/plant-placeholder.svg"],
          isAvailable: true,
          createdAt: new Date().toISOString(),
        },
        {
          _id: this.generateId(),
          name: "Rosemary",
          description: "Aromatic herb for cooking and gardens",
          price: 12,
          category: "outdoor",
          stock: 35,
          images: ["/plant-placeholder.svg"],
          isAvailable: true,
          createdAt: new Date().toISOString(),
        },
      ];

      await this.writeData(this.productsFile, sampleProducts);
      console.log("🌱 Sample products created");
    }
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async readData(filePath) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return [];
    }
  }

  async writeData(filePath, data) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${filePath}:`, error);
      throw error;
    }
  }

  // User operations
  async findUser(query) {
    const users = await this.readData(this.usersFile);
    return users.find((user) =>
      Object.keys(query).every((key) => user[key] === query[key]),
    );
  }

  async createUser(userData) {
    const users = await this.readData(this.usersFile);
    const newUser = {
      _id: this.generateId(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    await this.writeData(this.usersFile, users);
    return newUser;
  }

  async updateUser(id, updateData) {
    const users = await this.readData(this.usersFile);
    const idx = users.findIndex((u) => u._id === id);
    if (idx === -1) return null;

    const updated = {
      ...users[idx],
      ...Object.fromEntries(
        Object.entries(updateData).filter(([, v]) => v !== undefined),
      ),
      updatedAt: new Date().toISOString(),
    };

    users[idx] = updated;
    await this.writeData(this.usersFile, users);

    const { password, ...withoutPassword } = updated;
    return withoutPassword;
  }

  async updateUserInternal(id, updateData) {
    const users = await this.readData(this.usersFile);
    const idx = users.findIndex((u) => u._id === id);
    if (idx === -1) return null;

    const updated = {
      ...users[idx],
      ...Object.fromEntries(
        Object.entries(updateData).filter(([, v]) => v !== undefined),
      ),
      updatedAt: new Date().toISOString(),
    };

    users[idx] = updated;
    await this.writeData(this.usersFile, users);
    return updated;
  }

  async getAllUsers() {
    const users = await this.readData(this.usersFile);
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async getUserById(id) {
    const users = await this.readData(this.usersFile);
    return users.find((user) => user._id === id);
  }

  async deleteUser(id) {
    const users = await this.readData(this.usersFile);
    const filteredUsers = users.filter((user) => user._id !== id);
    await this.writeData(this.usersFile, filteredUsers);
    return true;
  }

  // Product operations
  async getProducts(query = {}, options = {}) {
    let products = await this.readData(this.productsFile);

    // Apply filters
    if (query.category) {
      products = products.filter((p) => p.category === query.category);
    }
    if (query.minPrice || query.maxPrice) {
      products = products.filter((p) => {
        const price = p.price;
        if (query.minPrice && price < query.minPrice) return false;
        if (query.maxPrice && price > query.maxPrice) return false;
        return true;
      });
    }
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm),
      );
    }

    // Apply pagination
    const limit = options.limit || 10;
    const page = options.page || 1;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      totalPages: Math.ceil(products.length / limit),
      currentPage: page,
    };
  }

  async getProduct(id) {
    const products = await this.readData(this.productsFile);
    return products.find((product) => product._id === id);
  }

  async createProduct(productData) {
    const products = await this.readData(this.productsFile);
    const newProduct = {
      _id: this.generateId(),
      ...productData,
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    await this.writeData(this.productsFile, products);
    return newProduct;
  }

  async updateProduct(productId, updateData) {
    const products = await this.readData(this.productsFile);
    const idx = products.findIndex((p) => p._id === productId);
    if (idx === -1) return null;

    const current = products[idx];
    const merged = {
      ...current,
      ...Object.fromEntries(
        Object.entries(updateData).filter(([, v]) => v !== undefined),
      ),
      updatedAt: new Date().toISOString(),
    };

    // If stock changes, keep availability roughly in sync
    if (typeof merged.stock === "number") {
      merged.isAvailable = merged.stock > 0;
    }

    products[idx] = merged;
    await this.writeData(this.productsFile, products);
    return merged;
  }

  async deleteProduct(productId) {
    const products = await this.readData(this.productsFile);
    const filteredProducts = products.filter(
      (product) => product._id !== productId,
    );
    await this.writeData(this.productsFile, filteredProducts);
    return true;
  }

  // Order operations
  async createOrder(orderData) {
    const orders = await this.readData(this.ordersFile);
    const newOrder = {
      _id: this.generateId(),
      ...orderData,
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    await this.writeData(this.ordersFile, orders);
    return newOrder;
  }

  async getOrders(userId, { admin = false } = {}) {
    const orders = await this.readData(this.ordersFile);
    const filtered = admin ? orders : orders.filter((o) => o.user === userId);
    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async getOrder(orderId, userId, isAdmin = false) {
    const orders = await this.readData(this.ordersFile);
    const order = orders.find((o) => o._id === orderId);
    if (!order) return null;
    if (!isAdmin && order.user !== userId) return null;
    return order;
  }

  async updateOrderStatus(orderId, status) {
    const orders = await this.readData(this.ordersFile);
    const idx = orders.findIndex((o) => o._id === orderId);
    if (idx === -1) return null;

    orders[idx] = {
      ...orders[idx],
      status,
      updatedAt: new Date().toISOString(),
    };
    await this.writeData(this.ordersFile, orders);
    return orders[idx];
  }

  async getUserOrders(userId) {
    return this.getOrders(userId, { admin: false });
  }

  // Blog operations
  async getBlogs() {
    const blogs = await this.readData(this.blogsFile);
    return blogs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async createBlog(blogData) {
    const blogs = await this.readData(this.blogsFile);
    const newBlog = {
      _id: this.generateId(),
      ...blogData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    blogs.push(newBlog);
    await this.writeData(this.blogsFile, blogs);
    return newBlog;
  }

  async updateBlog(id, updateData) {
    const blogs = await this.readData(this.blogsFile);
    const idx = blogs.findIndex((b) => b._id === id);
    if (idx === -1) return null;
    blogs[idx] = {
      ...blogs[idx],
      ...Object.fromEntries(
        Object.entries(updateData).filter(([, v]) => v !== undefined),
      ),
      updatedAt: new Date().toISOString(),
    };
    await this.writeData(this.blogsFile, blogs);
    return blogs[idx];
  }

  async deleteBlog(id) {
    const blogs = await this.readData(this.blogsFile);
    const filtered = blogs.filter((b) => b._id !== id);
    await this.writeData(this.blogsFile, filtered);
    return filtered.length !== blogs.length;
  }

  // Review operations
  async getReviews() {
    const reviews = await this.readData(this.reviewsFile);
    return reviews.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async createReview(reviewData) {
    const reviews = await this.readData(this.reviewsFile);
    const review = {
      _id: this.generateId(),
      ...reviewData,
      createdAt: new Date().toISOString(),
    };
    reviews.push(review);
    await this.writeData(this.reviewsFile, reviews);
    return review;
  }

  // Contact fallback storage
  async saveContactMessage(messageData) {
    const messages = await this.readData(this.contactsFile);
    const newMessage = {
      _id: this.generateId(),
      ...messageData,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    await this.writeData(this.contactsFile, messages);
    return newMessage;
  }
}

module.exports = new FileDatabase();
