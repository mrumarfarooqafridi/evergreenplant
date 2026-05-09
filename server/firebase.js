const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require("path");

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, ".env") });

// Debug logging
console.log("Firebase Configuration Check:");
console.log(
  "  - FIREBASE_PROJECT_ID:",
  process.env.FIREBASE_PROJECT_ID ? "✓ Set" : "✗ Missing",
);
console.log(
  "  - FIREBASE_PRIVATE_KEY_ID:",
  process.env.FIREBASE_PRIVATE_KEY_ID ? "✓ Set" : "✗ Missing",
);
console.log(
  "  - FIREBASE_PRIVATE_KEY:",
  process.env.FIREBASE_PRIVATE_KEY ? "✓ Set" : "✗ Missing",
);
console.log(
  "  - FIREBASE_CLIENT_EMAIL:",
  process.env.FIREBASE_CLIENT_EMAIL ? "✓ Set" : "✗ Missing",
);
console.log(
  "  - FIREBASE_CLIENT_ID:",
  process.env.FIREBASE_CLIENT_ID ? "✓ Set" : "✗ Missing",
);

// Parse the private key - remove quotes and replace escaped newlines
const privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
const formattedPrivateKey = privateKey
  .replace(/^"|"$/g, "") // Remove surrounding quotes
  .replace(/\\n/g, "\n"); // Replace escaped newlines with actual newlines

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: formattedPrivateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

// Collection names
const COLLECTIONS = {
  USERS: "evergreen_users",
  PRODUCTS: "evergreen_products",
  ORDERS: "evergreen_orders",
  CATEGORIES: "evergreen_categories",
  BLOGS: "evergreen_blogs",
};

module.exports = { db, auth, COLLECTIONS, admin };
