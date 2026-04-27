const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

console.log("Testing MongoDB connection...");
console.log("MongoDB URI:", process.env.MONGO_URI ? "Set" : "Not set");

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
    console.log("🌐 Host:", mongoose.connection.host);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("🔌 Connection closed successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Error codeName:", err.codeName);
    process.exit(1);
  });
