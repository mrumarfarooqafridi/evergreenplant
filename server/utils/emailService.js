const nodemailer = require("nodemailer");

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const FROM = `"Evergreen Plant Nursery" <${emailUser}>`;

// Send contact form email
const sendContactEmail = async (contactData) => {
  try {
    const { name, email, subject, message } = contactData;

    // Email to business owner
    const mailOptionsToOwner = {
      from: FROM,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb;">
          <h3 style="color: #10b981;">Message:</h3>
          <p style="white-space: pre-wrap; color: #374151;">${message}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af;">
            This email was sent from your Evergreen website contact form.
          </p>
        </div>
      `,
    };

    // Confirmation email to customer
    const mailOptionsToCustomer = {
      from: FROM,
      to: email,
      subject: "We received your message - Evergreen Nursery",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Thank you for contacting us!</h2>
          <p>Hi ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb;">
          <h3 style="color: #10b981;">Your Message:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="white-space: pre-wrap; color: #374151;">${message}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #374151;">
            <strong>Contact Details:</strong><br>
            📞 +971 55 481 3234<br>
            📧 plantnurseryevergreen@gmail.com<br>
            🕐 Mon-Sat: 9AM-7PM, Sun: 10AM-4PM
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af;">
            Best regards,<br>
            Evergreen Plant Nursery Team
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToOwner);
    await transporter.sendMail(mailOptionsToCustomer);

    return {
      success: true,
      message: "Emails sent successfully",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    const authIssue = /535|5\.7\.8|BadCredentials|EAUTH|Invalid login/i.test(
      error.message,
    );
    const message = authIssue
      ? "Email authentication failed. Please use a valid Gmail account with a generated App Password (EMAIL_APP_PASSWORD) or check your EMAIL_USER and email credentials."
      : error.message;

    return {
      success: false,
      message,
    };
  }
};

module.exports = { sendContactEmail };

const sendPasswordResetOtp = async ({ to, name, otp }) => {
  try {
    const mailOptions = {
      from: FROM,
      to,
      subject: "Your Evergreen password reset code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Password Reset</h2>
          <p>Hi ${name || "there"},</p>
          <p>Use the OTP below to reset your password. This code expires in <strong>10 minutes</strong>.</p>
          <div style="margin: 24px 0; padding: 16px; background: #f3f4f6; border-radius: 12px; text-align:center;">
            <div style="font-size: 28px; letter-spacing: 6px; font-weight: 700; color: #111827;">
              ${otp}
            </div>
          </div>
          <p style="color:#6b7280; font-size: 12px;">
            If you didn’t request this, you can ignore this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP email sent" };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    const authIssue = /535|5\.7\.8|BadCredentials|EAUTH|Invalid login/i.test(
      error.message,
    );
    const message = authIssue
      ? "Email authentication failed. Please use a valid Gmail account with a generated App Password (EMAIL_APP_PASSWORD) or check your EMAIL_USER and email credentials."
      : error.message;
    return { success: false, message };
  }
};

module.exports.sendPasswordResetOtp = sendPasswordResetOtp;
