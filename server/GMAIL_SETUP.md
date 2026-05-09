# Gmail App Password Setup Guide for OTP Functionality

## Why You Need an App Password

Gmail requires an "App Password" for applications like Nodemailer to send emails programmatically. Regular passwords won't work due to Gmail's security settings.

## Steps to Generate Gmail App Password

### 1. Enable 2-Factor Authentication (2FA)
1. Go to https://myaccount.google.com/security
2. Under "Signing in to Google", ensure "2-Step Verification" is enabled
3. If not enabled, click on it and follow the setup process

### 2. Generate App Password
1. Go to https://myaccount.google.com/security
2. Under "Signing in to Google", click on "App passwords"
3. You may need to sign in again
4. Click "Select app" → Choose "Mail" or "Other (Custom name)"
5. If "Other", enter a name like "Evergreen Server"
6. Click "Select device" → Choose "Other (Custom name)"
7. Enter "Evergreen Server" or similar
8. Click "Generate"
9. **Copy the 16-character password** (this will only be shown once!)

### 3. Update Environment Variables

Update your `.env` file with the new App Password:

```env
EMAIL_USER=evergreenterrain99@gmail.com
EMAIL_APP_PASSWORD=your_16_character_app_password_here
```

### 4. Restart the Server

After updating the `.env` file:
1. Stop the current server (Ctrl+C or taskkill)
2. Restart with `npm start`

### 5. Test the Email Service

Run the test script:
```bash
node test-email.js
```

## Troubleshooting

### "Less secure apps" error
- Make sure 2FA is enabled on your Google account
- App passwords only work with 2FA enabled

### Authentication failed
- Double-check the app password (no spaces)
- Ensure the email address is correct
- Try regenerating the app password

### Still not working
- Check if your network allows SMTP connections (port 587)
- Some corporate networks block email services
- Try from a different network

## Security Notes

- Never commit the App Password to version control
- Keep the App Password secure
- You can revoke app passwords from your Google account if needed
- Each app password is unique to the application you created it for
