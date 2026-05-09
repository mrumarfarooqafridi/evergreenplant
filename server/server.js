const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load .env FIRST before any other requires that need env vars
dotenv.config({ path: path.join(__dirname, ".env") });

// Ensure uploads directory exists only when NOT on Vercel (writable filesystem only)
const isVercel = process.env.VERCEL || process.env.NOW_REGION;
if (!isVercel) {
  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
}

const express = require("express");
const cors = require("cors");
const { db, auth } = require("./firebase");

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".onrender.com")
      ) {
        return callback(null, true);
      }
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Make Firebase available to all routes
app.use((req, res, next) => {
  req.db = db;
  req.auth = auth;
  next();
});

// Serve uploaded images as static files (local dev only — Vercel filesystem is read-only)
if (!isVercel) {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/reviews", require("./routes/reviews"));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Evergreen Plant Nursery API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: "Firebase Firestore",
  });
});

// Root
app.get("/", (req, res) => {
  res.json({
    message: "Evergreen Plant Nursery API",
    version: "2.0.0",
    status: "Running",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.path });
});

// Only call app.listen() in local development — Vercel handles this itself
if (!isVercel) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  });
}

// Export the app for Vercel serverless functions
module.exports = app;
