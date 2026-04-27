@echo off
REM Evergreen Plant Nursery Deployment Script for Windows
REM This script helps prepare the application for deployment

echo 🚀 Evergreen Plant Nursery - Deployment Preparation
echo ==================================================

REM Check if we're in the right directory
if not exist "client" (
    echo ✗ Please run this script from the root EverGreen directory
    pause
    exit /b 1
)

if not exist "server" (
    echo ✗ Please run this script from the root EverGreen directory
    pause
    exit /b 1
)

echo.
echo 📦 Installing dependencies...

REM Install server dependencies
echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install server dependencies
    cd ..
    pause
    exit /b 1
)
echo ✓ Server dependencies installed
cd ..

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install client dependencies
    cd ..
    pause
    exit /b 1
)
echo ✓ Client dependencies installed
cd ..

echo.
echo 🔨 Building applications...

REM Build server (if needed)
echo Building server...
cd server
call npm run build 2>nul
if %errorlevel% equ 0 (
    echo ✓ Server built successfully
) else (
    echo ⚠ Server doesn't have a build script (using raw Node.js)
)
cd ..

REM Build client
echo Building client...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo ✗ Failed to build client
    cd ..
    pause
    exit /b 1
)
echo ✓ Client built successfully
cd ..

echo.
echo 📋 Deployment Checklist:
echo ========================
echo.
echo Backend Environment Variables (.env):
echo   - MONGO_URI: MongoDB connection string
echo   - JWT_SECRET: Secure JWT secret key
echo   - CLOUDINARY_CLOUD_NAME: Cloudinary cloud name
echo   - CLOUDINARY_API_KEY: Cloudinary API key
echo   - CLOUDINARY_API_SECRET: Cloudinary API secret
echo   - EMAIL_USER: Email service username
echo   - EMAIL_PASS: Email service password/app password
echo   - PORT: 5000 (or your preferred port)
echo   - NODE_ENV: production
echo.
echo Frontend Environment Variables (.env.local):
echo   - NEXT_PUBLIC_API_URL: Backend API URL (e.g., https://your-backend.com/api)
echo   - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: Google Maps API key
echo.
echo 🚀 Deployment Platforms:
echo   - Backend: Railway, Heroku, DigitalOcean App Platform
echo   - Frontend: Vercel, Netlify
echo   - Database: MongoDB Atlas
echo.
echo 📚 Next Steps:
echo   1. Set up your MongoDB database (Atlas recommended)
echo   2. Configure environment variables in your deployment platform
echo   3. Deploy backend first, get the URL
echo   4. Update frontend NEXT_PUBLIC_API_URL with backend URL
echo   5. Deploy frontend
echo   6. Test all functionality
echo.
echo ✓ Deployment preparation complete!
echo.
echo For detailed instructions, see README.md
echo.
pause