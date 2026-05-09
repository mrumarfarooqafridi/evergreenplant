const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendPasswordResetOtp } = require("../utils/emailService");
const OTPService = require("../utils/otpService");
const { COLLECTIONS, admin } = require("../firebase");

const createToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl || "",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { db, auth } = req;

    console.log("Registration attempt:", { name, email });

    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists in Firebase Auth
    try {
      const existingUser = await auth.getUserByEmail(email);
      console.log("User already exists:", existingUser.uid);
      return res.status(400).json({ message: "User already exists" });
    } catch (error) {
      if (error.code !== "auth/user-not-found") {
        console.error("Error checking user existence:", error);
        throw error;
      }
      console.log("User does not exist, proceeding with registration");
    }

    // Create user in Firebase Auth
    console.log("Creating user in Firebase Auth...");
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });
    console.log("User created in Firebase Auth:", userRecord.uid);

    // Store additional user data in Firestore
    const userData = {
      id: userRecord.uid,
      email: userRecord.email,
      name: name,
      username: email.split("@")[0],
      role: "user",
      avatarUrl: "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    console.log("Storing user data in Firestore...");
    await db.collection(COLLECTIONS.USERS).doc(userRecord.uid).set(userData);
    console.log("User data stored in Firestore");

    const token = createToken(userData);

    res.status(201).json({
      token,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatarUrl: userData.avatarUrl || "",
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    res
      .status(500)
      .json({ message: "Server error", error: err.message, code: err.code });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { db, auth } = req;

    // Sign in with Firebase Auth
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      throw error;
    }

    // Verify password by attempting to sign in using Firebase Auth REST API
    try {
      const apiKey = process.env.FIREBASE_API_KEY;
      if (!apiKey) {
        console.error("FIREBASE_API_KEY is missing from environment variables.");
        return res.status(500).json({ message: "Server configuration error" });
      }

      const verifyResponse = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        console.error("Firebase REST API Error:", verifyData.error?.message);
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Fetch user data from Firestore
      const userDoc = await db
        .collection(COLLECTIONS.USERS)
        .doc(userRecord.uid)
        .get();

      if (!userDoc.exists) {
        return res.status(400).json({ message: "User data not found" });
      }

      const userData = userDoc.data();

      const token = createToken(userData);

      res.json({
        token,
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatarUrl: userData.avatarUrl || "",
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.me = async (req, res) => {
  try {
    const { db } = req;
    const userDoc = await db
      .collection(COLLECTIONS.USERS)
      .doc(req.user.id)
      .get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userDoc.data());
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, email, password, avatarUrl } = req.body;
    const { db, auth } = req;

    const userRef = db.collection(COLLECTIONS.USERS).doc(req.user.id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

    // Update in Firestore
    await userRef.update(updateData);

    // Update email in Firebase Auth if changed
    if (email !== undefined) {
      try {
        await auth.updateUser(req.user.id, { email });
      } catch (error) {
        console.error("Error updating email in Firebase Auth:", error);
      }
    }

    // Update password in Firebase Auth if provided
    if (password !== undefined) {
      try {
        await auth.updateUser(req.user.id, { password });
      } catch (error) {
        console.error("Error updating password in Firebase Auth:", error);
      }
    }

    // Get updated user data
    const updatedDoc = await userRef.get();
    const updated = updatedDoc.data();

    const token = createToken(updated);
    res.json({ token, user: updated });
  } catch (err) {
    console.error("Update me error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const { db, auth } = req;

    // Check if user exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return res.json({
          message: "If the email exists, an OTP has been sent.",
        });
      }
      throw error;
    }

    // Get user data from Firestore
    const userRef = db.collection(COLLECTIONS.USERS).doc(userRecord.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    // Use the OTP service
    const otpResult = await OTPService.sendOTP(
      email,
      userData.name,
      userRecord.uid,
    );

    if (!otpResult.success) {
      return res.status(500).json({ message: otpResult.message });
    }

    // Store OTP in Firestore
    const otp = OTPService.getDevelopmentOTP(email);
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const otpExpires = Date.now() + 60 * 1000; // 60 seconds

    await userRef.update({
      resetOtpHash: otpHash,
      resetOtpExpires: otpExpires,
    });

    res.json({
      message: "If the email exists, an OTP has been sent.",
      developmentMode: otpResult.developmentMode || false,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, OTP and newPassword are required" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const { db, auth } = req;

    // Get user from Firebase Auth
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return res.status(400).json({ message: "Invalid OTP or expired" });
      }
      throw error;
    }

    // Get user data from Firestore
    const userRef = db.collection(COLLECTIONS.USERS).doc(userRecord.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    // Verify OTP
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (
      !userData.resetOtpHash ||
      !userData.resetOtpExpires ||
      Date.now() > Number(userData.resetOtpExpires) ||
      userData.resetOtpHash !== otpHash
    ) {
      return res.status(400).json({ message: "Invalid OTP or expired" });
    }

    // Update password in Firebase Auth
    await auth.updateUser(userRecord.uid, { password: newPassword });

    // Clear OTP from Firestore
    await userRef.update({
      resetOtpHash: null,
      resetOtpExpires: null,
    });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
