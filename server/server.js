const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load .env FIRST before any other requires that need env vars
dotenv.config({ path: path.join(__dirname, ".env") });

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { db, auth } = require("./firebase");

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
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".onrender.com")
      ) {
        return callback(null, true);
      }
      callback(null, true); // Allow all for now — tighten after go-live
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Make Firebase available to routes
app.use((req, res, next) => {
  req.db = db;
  req.auth = auth;
  next();
});

// Serve uploaded product images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
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
