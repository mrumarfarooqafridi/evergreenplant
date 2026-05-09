const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
const formattedPrivateKey = privateKey
  .replace(/^"|"$/g, "")
  .replace(/\\n/g, "\n");

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

async function makeAdmin(email) {
  try {
    const usersSnapshot = await db
      .collection("evergreen_users")
      .where("email", "==", email)
      .get();

    if (usersSnapshot.empty) {
      console.log(`No user found with email: ${email}`);
      process.exit(1);
    }

    const userDoc = usersSnapshot.docs[0];
    await db.collection("evergreen_users").doc(userDoc.id).update({
      role: "admin",
    });

    console.log(`Successfully made ${email} an admin!`);
    process.exit(0);
  } catch (error) {
    console.error("Error making user admin:", error);
    process.exit(1);
  }
}

const email = process.argv[2];
if (!email) {
  console.log("Usage: node make-admin.js <user-email>");
  process.exit(1);
}

makeAdmin(email);
