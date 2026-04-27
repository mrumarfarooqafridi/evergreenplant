const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const fileDatabase = require("./fileDatabase");

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://evergreen-nursery.ae", "https://www.evergreen-nursery.ae"]
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Global variable to track database mode
let useFileDatabase = false;

// Connect to MongoDB with fallback to file database
const connectDB = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.db.databaseName}`);

    // Seed database in development
    if (process.env.NODE_ENV === "development") {
      const seedDatabase = require("./seed");
      await seedDatabase();
    }
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("🔄 Switching to file-based database...");

    useFileDatabase = true;

    try {
      await fileDatabase.init();
      console.log("✅ File database ready for use");
    } catch (fileError) {
      console.error("❌ File database initialization failed:", fileError);
      process.exit(1);
    }
  }

  // Now that database is ready, set up routes and start server
  // Make database mode available to routes
  app.use(setDatabaseMode);

  // Routes
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/products", require("./routes/products"));
  app.use("/api/orders", require("./routes/orders"));
  app.use("/api/contact", require("./routes/contact"));
  app.use("/api/admin", require("./routes/admin"));

  // Health check route
  app.get("/api/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      message: "Evergreen Plant Nursery API is running",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  // Basic route
  app.get("/", (req, res) => {
    res.json({
      message: "Evergreen Plant Nursery API",
      version: "1.0.0",
      status: "Running",
      endpoints: {
        auth: "/api/auth",
        products: "/api/products",
        orders: "/api/orders",
        health: "/api/health",
      },
    });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: "Something went wrong!",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      message: "Route not found",
      path: req.path,
      method: req.method,
    });
  });

  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(
      `📱 Frontend URL: ${process.env.NODE_ENV === "production" ? "https://evergreen-nursery.ae" : "http://localhost:3001"}`,
    );
    console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
      process.exit(1);
    });
  });
};

// Make database mode available to routes
const setDatabaseMode = (req, res, next) => {
  req.useFileDatabase = useFileDatabase;
  req.fileDatabase = fileDatabase;
  next();
};

connectDB();

module.exports = app;
