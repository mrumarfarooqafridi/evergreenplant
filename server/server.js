const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { db, auth } = require("./firebase");

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("📋 Environment Configuration:");
console.log(
  "  - FIREBASE_PROJECT_ID:",
  process.env.FIREBASE_PROJECT_ID ? "✓ Set" : "✗ Missing",
);
console.log(
  "  - CLOUDINARY_CLOUD_NAME:",
  process.env.CLOUDINARY_CLOUD_NAME || "✗ Missing",
);
console.log("  - EMAIL_USER:", process.env.EMAIL_USER || "✗ Missing");

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
    origin: true, // Allow any origin to connect dynamically
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Make Firebase available to routes
app.use((req, res, next) => {
  req.db = db;
  req.auth = auth;
  next();
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/reviews", require("./routes/reviews"));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Evergreen Plant Nursery API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: "Firebase Firestore",
  });
});

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Evergreen Plant Nursery API",
    version: "2.0.0",
    status: "Running",
    database: "Firebase Firestore",
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
  console.log(`📊 Database: Firebase Firestore`);
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

module.exports = app;
