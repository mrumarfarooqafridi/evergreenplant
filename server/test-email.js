const { sendPasswordResetOtp } = require('./utils/emailService');

// Test the OTP email functionality
async function testEmail() {
  try {
    console.log('Testing OTP email service...');
    
    const result = await sendPasswordResetOtp({
      to: 'evergreenterrain99@gmail.com',
      name: 'Test User',
      otp: '123456'
    });
    
    console.log('Email test result:', result);
  } catch (error) {
    console.error('Email test failed:', error);
  }
}

testEmail();
