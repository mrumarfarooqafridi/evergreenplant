const { sendContactEmail } = require("../utils/emailService");

// Handle contact form submission
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Send email
    const emailResult = await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    if (emailResult.success) {
      return res.status(200).json({
        success: true,
        message:
          "Your message has been sent successfully. We'll get back to you soon!",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: emailResult.message || "Failed to send message",
      });
    }
  } catch (error) {
    console.error("Contact submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
