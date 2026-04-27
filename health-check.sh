#!/bin/bash

# Evergreen Plant Nursery Health Check Script
# Run this after deployment to verify everything is working

echo "🏥 Evergreen Plant Nursery - Health Check"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BACKEND_URL=${1:-"http://localhost:5000"}
FRONTEND_URL=${2:-"http://localhost:3000"}

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

echo "🔍 Checking Backend API..."

# Check health endpoint
if curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/health" | grep -q "200"; then
    print_status "Backend health endpoint responding"
else
    print_error "Backend health endpoint not responding"
fi

# Check products endpoint
if curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/products" | grep -q "200"; then
    print_status "Products API endpoint responding"
else
    print_error "Products API endpoint not responding"
fi

echo ""
echo "🔍 Checking Frontend..."

# Check if frontend is responding
if curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" | grep -q "200"; then
    print_status "Frontend responding"
else
    print_error "Frontend not responding"
fi

# Check products page
if curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/products" | grep -q "200"; then
    print_status "Products page responding"
else
    print_error "Products page not responding"
fi

echo ""
echo "📋 Manual Testing Checklist:"
echo "============================"
echo ""
echo "User Flows to Test:"
echo "  1. Homepage loads correctly"
echo "  2. Product catalog displays with pagination"
echo "  3. Product filters work (search, category, price)"
echo "  4. Product modal opens with image carousel"
echo "  5. User registration and login"
echo "  6. Add products to cart"
echo "  7. Checkout process"
echo "  8. Admin login (admin@evergreen.com / password)"
echo "  9. Admin panel functionality"
echo "  10. Order management"
echo ""
echo "API Endpoints to Test:"
echo "  - POST /api/auth/login"
echo "  - GET /api/products"
echo "  - POST /api/orders"
echo "  - GET /api/orders (authenticated)"
echo ""
echo "Usage: $0 [backend_url] [frontend_url]"
echo "Example: $0 https://my-backend.com https://my-frontend.com"