# Evergreen Plant Nursery eCommerce Website

A complete production-ready eCommerce website for a plant nursery business in UAE, built with modern web technologies and enhanced UI/UX.

## 🚀 Features

### ✨ Enhanced UI/UX Features

- **Beautiful Typography**: Playfair Display for headings, Inter for body text
- **Responsive Design**: Fully responsive across all screen sizes (mobile, tablet, desktop, 4K)
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Interactive Notifications**: Toast notifications for all user actions (login, cart, errors)
- **Modern Icons**: Lucide React and React Icons throughout the interface
- **Loading States**: Skeleton loaders and spinners for better UX
- **SEO Optimized**: Meta tags, structured data, sitemap, robots.txt
- **Performance Optimized**: Image optimization, lazy loading, code splitting
- **Accessibility**: ARIA labels, keyboard navigation, focus management

### 🌿 Nature-Inspired Design

- **Plant Quote**: Inspirational quote from John Muir about nature
- **Typing Animation**: Dynamic text animation on hero section
- **Gradient Backgrounds**: Beautiful green gradients throughout
- **Hover Effects**: Smooth transitions and micro-interactions
- **Visual Hierarchy**: Clear typography and spacing

### User Side

- **Home Page**: Hero section with typing animation, featured products, categories, testimonials, newsletter
- **Product Catalog**: Grid layout with filters (price, category, availability), search functionality
- **Product Details**: Image gallery, detailed information, add to cart
- **Shopping Cart**: Update quantities, remove items, total calculation with real-time updates
- **Checkout**: Shipping form, payment options (Cash on Delivery + Online)
- **User Authentication**: Register, login, logout with enhanced notifications
- **Order Management**: View order history, track order status
- **Additional Pages**: About Us, Founders, Blog, Contact with Google Maps

### Admin Panel

- **Dashboard**: Total orders, revenue, users, recent orders
- **Product Management**: Add, edit, delete products with image upload
- **Order Management**: View all orders, update status
- **Customer Management**: View users, block/unblock accounts
- **Content Management**: Edit About page, manage blog posts, FAQs
- **Reports**: Sales reports, top products, low stock alerts

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ (App Router), React 18, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary (image uploads)
- **Email**: Nodemailer (notifications)
- **Maps**: Google Maps integration
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Notifications**: React Hot Toast
- **SEO**: Next SEO
- **Type Animation**: React Type Animation

## 📱 Responsive Design

The website is fully responsive and optimized for:

- **Mobile phones** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Laptops** (1024px - 1440px)
- **Desktop** (1440px - 1920px)
- **4K displays** (1920px+)

## 🚀 Performance Features

- **Image Optimization**: WebP/AVIF formats, responsive images
- **Lazy Loading**: Images load as they enter viewport
- **Code Splitting**: Automatic route-based code splitting
- **CSS Optimization**: Tailwind purging and minification
- **Caching**: Proper cache headers and service worker ready
- **SEO**: Meta tags, Open Graph, Twitter Cards, structured data

## 🗂 Project Structure

```
EverGreen/
├── client/                 # Next.js frontend
│   ├── app/               # Next.js app directory
│   │   ├── globals.css    # Global styles with custom animations
│   │   ├── layout.js      # Root layout with SEO and fonts
│   │   ├── page.js        # Home page
│   │   └── ...            # Other pages
│   ├── components/        # Reusable React components
│   │   ├── Header.js      # Enhanced navigation with animations
│   │   ├── Hero.js        # Hero with typing animation and quote
│   │   ├── FeaturedProducts.js # Product grid with hover effects
│   │   ├── Footer.js      # Comprehensive footer with newsletter
│   │   └── LoadingSpinner.js # Custom loading component
│   ├── lib/              # Utility functions
│   └── public/           # Static assets
│       ├── favicon.svg   # Custom favicon
│       ├── plant-placeholder.svg # Placeholder images
│       ├── robots.txt    # SEO robots file
│       └── sitemap.xml   # SEO sitemap
├── server/                # Express.js backend
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── utils/           # Helper functions
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- Google Maps API key (for contact page)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EverGreen
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory:

   ```
   MONGO_URI=mongodb://localhost:27017/evergreen
   JWT_SECRET=your_jwt_secret_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_APP_PASSWORD=your_gmail_app_password
   PORT=5000
   ```

3. **Frontend Setup**

   ```bash
   cd ../client
   npm install
   ```

   Create a `.env.local` file in the client directory:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the Application**

   **Backend:**

   ```bash
   cd server
   npm run dev
   ```

   **Frontend:**

   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders

- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (Admin only)

## 🔐 Admin Access

To create an admin user, you can manually update a user's role in the database:

```javascript
// In MongoDB shell or MongoDB Compass
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

## 🌟 Key Features Implemented

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimization**: Next.js built-in SEO features
- **Image Upload**: Cloudinary integration for product images
- **Email Notifications**: Order confirmations and updates
- **WhatsApp Integration**: Direct contact button
- **Google Maps**: Location display on contact page
- **Protected Routes**: Admin panel access control
- **Error Handling**: Comprehensive error management
- **Loading States**: User-friendly loading indicators

## 🚀 Deployment

### Production Environment Setup

The application is configured to work with both MongoDB and a file-based database fallback. For production, MongoDB is recommended.

#### Environment Variables

**Backend (.env):**

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/evergreen
JWT_SECRET=your_secure_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
NODE_ENV=production
```

**Frontend (.env.local):**

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Backend Deployment

#### Option 1: Railway (Recommended)

1. **Connect Repository:**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the `server` directory as the root

2. **Environment Variables:**
   - Add all backend environment variables in Railway dashboard

3. **Database:**
   - Railway provides MongoDB automatically
   - Or connect to MongoDB Atlas

4. **Deploy:**
   - Railway auto-deploys on push to main branch

#### Option 2: Heroku

1. **Create Heroku App:**

   ```bash
   heroku create your-app-name
   ```

2. **Add Buildpacks:**

   ```bash
   heroku buildpacks:add heroku/nodejs
   ```

3. **Environment Variables:**

   ```bash
   heroku config:set MONGO_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_jwt_secret"
   # Add other variables...
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

#### Option 3: DigitalOcean App Platform

1. **Create App:**
   - Connect GitHub repository
   - Set source directory to `server`

2. **Environment Variables:**
   - Add all required environment variables

3. **Database:**
   - Use DigitalOcean Managed MongoDB or MongoDB Atlas

### Frontend Deployment

#### Option 1: Vercel (Recommended for Next.js)

1. **Connect Repository:**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `client`

2. **Environment Variables:**
   - Add `NEXT_PUBLIC_API_URL` pointing to your backend
   - Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy:**
   - Vercel auto-deploys on push to main branch

#### Option 2: Netlify

1. **Connect Repository:**
   - Go to [Netlify.com](https://netlify.com)
   - Connect GitHub repository
   - Set publish directory to `client`

2. **Build Settings:**
   - Build Command: `npm run build`
   - Publish Directory: `client/.next`

3. **Environment Variables:**
   - Add all required environment variables

### Database Setup

#### MongoDB Atlas (Recommended)

1. **Create Cluster:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a free cluster

2. **Database User:**
   - Create database user with read/write access

3. **Network Access:**
   - Add IP address (0.0.0.0/0 for development)

4. **Connection String:**
   - Get connection string and update `MONGO_URI`

#### File Database Fallback

The application automatically falls back to JSON file storage if MongoDB is unavailable. No additional setup required.

### Production Checklist

- [ ] Environment variables configured
- [ ] Database connected and seeded
- [ ] Backend deployed and accessible
- [ ] Frontend deployed with correct API URL
- [ ] SSL certificates configured
- [ ] Domain configured
- [ ] Admin user created
- [ ] Email service configured
- [ ] Google Maps API key configured
- [ ] Cloudinary configured for image uploads

### Testing Production Build

```bash
# Test backend build
cd server
npm run build

# Test frontend build
cd ../client
npm run build
```

### Monitoring

- Check application logs in your deployment platform
- Monitor API endpoints with health checks
- Set up error tracking (Sentry, etc.)
- Configure analytics (Google Analytics, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email info@evergreennursery.ae or contact us through the website.

---

Built with ❤️ for the UAE plant community
