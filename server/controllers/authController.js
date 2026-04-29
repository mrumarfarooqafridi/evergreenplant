const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendPasswordResetOtp } = require("../utils/emailService");

const createToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user;
    if (req.useFileDatabase) {
      user = await req.fileDatabase.findUser({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (req.useFileDatabase) {
      user = await req.fileDatabase.createUser({
        name,
        email,
        password: hashedPassword,
        role: "user",
        isBlocked: false,
        wishlist: [],
      });
    } else {
      user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
    }

    const token = createToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user;
    if (req.useFileDatabase) {
      user = await req.fileDatabase.findUser({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "Account is blocked" });
    }

    const token = createToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.me = async (req, res) => {
  try {
    if (req.useFileDatabase) {
      const user = await req.fileDatabase.getUserById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      const { password, ...withoutPassword } = user;
      return res.json(withoutPassword);
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let updated;
    if (req.useFileDatabase) {
      const existing = await req.fileDatabase.getUserById(req.user.id);
      if (!existing) return res.status(404).json({ message: "User not found" });

      let passwordToSave;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        passwordToSave = await bcrypt.hash(password, salt);
      }

      updated = await req.fileDatabase.updateUserInternal(req.user.id, {
        name,
        email,
        ...(passwordToSave ? { password: passwordToSave } : {}),
      });
      const { password: _, ...withoutPassword } = updated;
      updated = withoutPassword;
    } else {
      const update = { name, email };
      if (password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(password, salt);
      }

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      if (update.password) user.password = update.password;
      await user.save();
      updated = await User.findById(req.user.id).select("-password");
    }

    // Return a fresh token so header greeting updates immediately
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

    let user;
    if (req.useFileDatabase) {
      user = await req.fileDatabase.findUser({ email });
    } else {
      user = await User.findOne({ email });
    }

    // Don't reveal whether the email exists (professional behavior)
    if (!user) {
      return res.json({ message: "If the email exists, an OTP has been sent." });
    }

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    if (req.useFileDatabase) {
      await req.fileDatabase.updateUserInternal(user._id, {
        resetOtpHash: otpHash,
        resetOtpExpires: otpExpires,
      });
    } else {
      user.resetOtpHash = otpHash;
      user.resetOtpExpires = otpExpires;
      await user.save();
    }

    const emailResult = await sendPasswordResetOtp({
      to: email,
      name: user.name,
      otp,
    });

    if (!emailResult.success) {
      return res.status(500).json({ message: emailResult.message });
    }

    res.json({ message: "If the email exists, an OTP has been sent." });
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

    let user;
    if (req.useFileDatabase) {
      user = await req.fileDatabase.findUser({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP or expired" });
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const expires =
      req.useFileDatabase ? user.resetOtpExpires : user.resetOtpExpires;
    const savedHash =
      req.useFileDatabase ? user.resetOtpHash : user.resetOtpHash;

    if (!savedHash || !expires || Date.now() > Number(expires) || savedHash !== otpHash) {
      return res.status(400).json({ message: "Invalid OTP or expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    if (req.useFileDatabase) {
      await req.fileDatabase.updateUserInternal(user._id, {
        password: hashedPassword,
        resetOtpHash: null,
        resetOtpExpires: null,
      });
    } else {
      user.password = hashedPassword;
      user.resetOtpHash = null;
      user.resetOtpExpires = null;
      await user.save();
    }

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
