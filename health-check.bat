@echo off
REM Evergreen Plant Nursery Health Check Script for Windows
REM Run this after deployment to verify everything is working

echo 🏥 Evergreen Plant Nursery - Health Check
echo =========================================

set BACKEND_URL=%1
if "%BACKEND_URL%"=="" set BACKEND_URL=http://localhost:5000

set FRONTEND_URL=%2
if "%FRONTEND_URL%"=="" set FRONTEND_URL=http://localhost:3000

echo.
echo 🔍 Checking Backend API...

REM Check health endpoint
powershell -Command "& {try { $response = Invoke-WebRequest -Uri '%BACKEND_URL%/api/health' -Method GET -UseBasicParsing; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend health endpoint responding
) else (
    echo ✗ Backend health endpoint not responding
)

REM Check products endpoint
powershell -Command "& {try { $response = Invoke-WebRequest -Uri '%BACKEND_URL%/api/products' -Method GET -UseBasicParsing; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Products API endpoint responding
) else (
    echo ✗ Products API endpoint not responding
)

echo.
echo 🔍 Checking Frontend...

REM Check if frontend is responding
powershell -Command "& {try { $response = Invoke-WebRequest -Uri '%FRONTEND_URL%' -Method GET -UseBasicParsing; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Frontend responding
) else (
    echo ✗ Frontend not responding
)

REM Check products page
powershell -Command "& {try { $response = Invoke-WebRequest -Uri '%FRONTEND_URL%/products' -Method GET -UseBasicParsing; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Products page responding
) else (
    echo ✗ Products page not responding
)

echo.
echo 📋 Manual Testing Checklist:
echo ============================
echo.
echo User Flows to Test:
echo   1. Homepage loads correctly
echo   2. Product catalog displays with pagination
echo   3. Product filters work (search, category, price)
echo   4. Product modal opens with image carousel
echo   5. User registration and login
echo   6. Add products to cart
echo   7. Checkout process
echo   8. Admin login (admin@evergreen.com / password)
echo   9. Admin panel functionality
echo   10. Order management
echo.
echo API Endpoints to Test:
echo   - POST /api/auth/login
echo   - GET /api/products
echo   - POST /api/orders
echo   - GET /api/orders (authenticated)
echo.
echo Usage: %0 [backend_url] [frontend_url]
echo Example: %0 https://my-backend.com https://my-frontend.com
echo.
pause