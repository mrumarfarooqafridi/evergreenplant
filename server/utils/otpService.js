const crypto = require('crypto');
const { sendPasswordResetOtp } = require('./emailService');

// In-memory OTP storage for development/testing
const otpStore = new Map();

// Enhanced OTP service with fallback mechanisms
class OTPService {
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static hashOTP(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }

  static async sendOTP(email, name, userId) {
    try {
      const otp = this.generateOTP();
      const otpHash = this.hashOTP(otp);
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      // Store OTP in memory for fallback
      otpStore.set(email, {
        otp,
        otpHash,
        expiresAt,
        userId
      });

      console.log(`🔢 OTP Generated for ${email}: ${otp} (expires in 60 seconds)`);

      // Try to send email
      const emailResult = await sendPasswordResetOtp({
        to: email,
        name: name || 'there',
        otp
      });

      if (!emailResult.success) {
        console.warn('⚠️ Email service failed, OTP available in console for testing:', emailResult.message);
        return {
          success: true,
          message: 'OTP generated. Email service temporarily unavailable - check server console for OTP.',
          developmentMode: true
        };
      }

      return {
        success: true,
        message: 'OTP sent successfully to your email'
      };
    } catch (error) {
      console.error('OTP generation error:', error);
      return {
        success: false,
        message: 'Failed to generate OTP'
      };
    }
  }

  static verifyOTP(email, otp) {
    const storedData = otpStore.get(email);
    
    if (!storedData) {
      return { valid: false, message: 'OTP not found or expired' };
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email);
      return { valid: false, message: 'OTP expired' };
    }

    const otpHash = this.hashOTP(otp);
    
    if (storedData.otpHash !== otpHash) {
      return { valid: false, message: 'Invalid OTP' };
    }

    // Clean up after successful verification
    otpStore.delete(email);
    
    return { 
      valid: true, 
      message: 'OTP verified successfully',
      userId: storedData.userId
    };
  }

  // Development helper to get current OTP for testing
  static getDevelopmentOTP(email) {
    const stored = otpStore.get(email);
    return stored ? stored.otp : null;
  }

  // Clean up expired OTPs
  static cleanup() {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
      if (now > data.expiresAt) {
        otpStore.delete(email);
      }
    }
  }
}

// Auto-cleanup expired OTPs every 1 minute
setInterval(() => {
  OTPService.cleanup();
}, 60 * 1000);

module.exports = OTPService;
