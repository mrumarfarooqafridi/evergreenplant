#!/bin/bash

# Evergreen Plant Nursery Deployment Script
# This script helps prepare the application for deployment

echo "🚀 Evergreen Plant Nursery - Deployment Preparation"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -d "client" ] || [ ! -d "server" ]; then
    print_error "Please run this script from the root EverGreen directory"
    exit 1
fi

echo "📦 Installing dependencies..."

# Install server dependencies
echo "Installing server dependencies..."
cd server
if npm install; then
    print_status "Server dependencies installed"
else
    print_error "Failed to install server dependencies"
    exit 1
fi

# Install client dependencies
echo "Installing client dependencies..."
cd ../client
if npm install; then
    print_status "Client dependencies installed"
else
    print_error "Failed to install client dependencies"
    exit 1
fi

cd ..

echo ""
echo "🔨 Building applications..."

# Build server (if needed)
echo "Building server..."
cd server
if npm run build 2>/dev/null; then
    print_status "Server built successfully"
else
    print_warning "Server doesn't have a build script (using raw Node.js)"
fi

# Build client
echo "Building client..."
cd ../client
if npm run build; then
    print_status "Client built successfully"
else
    print_error "Failed to build client"
    exit 1
fi

cd ..

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo ""
echo "Backend Environment Variables (.env):"
echo "  - MONGO_URI: MongoDB connection string"
echo "  - JWT_SECRET: Secure JWT secret key"
echo "  - CLOUDINARY_CLOUD_NAME: Cloudinary cloud name"
echo "  - CLOUDINARY_API_KEY: Cloudinary API key"
echo "  - CLOUDINARY_API_SECRET: Cloudinary API secret"
echo "  - EMAIL_USER: Email service username"
echo "  - EMAIL_PASS: Email service password/app password"
echo "  - PORT: 5000 (or your preferred port)"
echo "  - NODE_ENV: production"
echo ""
echo "Frontend Environment Variables (.env.local):"
echo "  - NEXT_PUBLIC_API_URL: Backend API URL (e.g., https://your-backend.com/api)"
echo "  - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: Google Maps API key"
echo ""
echo "🚀 Deployment Platforms:"
echo "  - Backend: Railway, Heroku, DigitalOcean App Platform"
echo "  - Frontend: Vercel, Netlify"
echo "  - Database: MongoDB Atlas"
echo ""
echo "📚 Next Steps:"
echo "  1. Set up your MongoDB database (Atlas recommended)"
echo "  2. Configure environment variables in your deployment platform"
echo "  3. Deploy backend first, get the URL"
echo "  4. Update frontend NEXT_PUBLIC_API_URL with backend URL"
echo "  5. Deploy frontend"
echo "  6. Test all functionality"
echo ""
print_status "Deployment preparation complete!"
echo ""
echo "For detailed instructions, see README.md"