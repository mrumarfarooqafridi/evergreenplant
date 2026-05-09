# Evergreen Nursery - Production Deployment Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for image storage
- Gmail account with App Password for email functionality

## Environment Configuration

### Server Environment (.env)
```bash
# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://your_connection_string

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password
EMAIL_PASS=your_app_password

# JWT Secret (change this in production)
JWT_SECRET=your_secure_jwt_secret

# Server Configuration
PORT=5000
NODE_ENV=production
USE_LOCAL_DB=false  # Set to true for local file database fallback
```

### Client Environment (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Deployment Steps

### 1. Build the Client
```bash
cd client
npm run build
```

### 2. Start the Server
```bash
cd server
npm start
```

### 3. Production Deployment Options

#### Option A: Vercel (Recommended for Client)
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

#### Option B: VPS/Dedicated Server
1. Install Node.js and PM2
2. Clone repository
3. Install dependencies
4. Build client
5. Configure PM2 for server
6. Set up Nginx reverse proxy
7. Configure SSL certificate

#### Option C: Docker
```bash
# Build Docker images
docker-compose build

# Run containers
docker-compose up -d
```

## PM2 Configuration (for VPS)
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'evergreen-server',
    script: './server.js',
    cwd: '/path/to/server',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

## Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Checklist
- [ ] Test all API endpoints
- [ ] Verify database connection
- [ ] Test email functionality
- [ ] Check image uploads to Cloudinary
- [ ] Test user registration and login
- [ ] Test product browsing and filtering
- [ ] Test cart and checkout
- [ ] Verify SEO metadata
- [ ] Test responsive design on mobile
- [ ] Configure SSL certificate
- [ ] Set up domain DNS
- [ ] Configure backup strategy
- [ ] Set up monitoring and logging

## Troubleshooting

### MongoDB Connection Issues
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Check network connectivity

### Email Not Sending
- Verify Gmail App Password
- Check email credentials
- Review email service logs

### Image Upload Issues
- Verify Cloudinary credentials
- Check Cloudinary API limits
- Review image size restrictions

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## Performance Optimization
- Enable gzip compression
- Configure CDN for static assets
- Optimize images
- Implement caching strategy
- Use PM2 cluster mode for scaling

## Security Recommendations
- Change default JWT secret
- Enable HTTPS
- Implement rate limiting
- Use environment variables for sensitive data
- Regular security updates
- Implement CORS properly
- Sanitize user inputs
- Use helmet.js for security headers

## Monitoring
- Set up error tracking (Sentry)
- Monitor server performance
- Track API response times
- Monitor database performance
- Set up uptime monitoring

## Backup Strategy
- Regular database backups
- Backup Cloudinary assets
- Version control for code
- Disaster recovery plan
