# 🚀 Deploy to Railway

This Laravel portfolio is configured for easy deployment to Railway! 

## 📋 Prerequisites

1. **GitHub Repository**: Code pushed to GitHub
2. **Railway Account**: Sign up at [railway.app](https://railway.app)

## 🛠️ Railway Configuration Files

The project includes optimized Railway configurations:

- **`railway.toml`**: PHP 8.3, build settings, environment variables
- **`php.toml`**: Required PHP extensions (including EXIF for images)
- **`railway/init-app.sh`**: Development deployment with sample data
- **`railway/init-prod.sh`**: Production deployment without test data

## 🚀 Quick Deployment

### 1. Connect Repository
1. Go to [Railway dashboard](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your portfolio repository

### 2. Auto-Configuration
Railway will automatically:
- ✅ Detect Laravel project
- ✅ Create PostgreSQL database
- ✅ Set database environment variables
- ✅ Use PHP 8.3 with required extensions

### 3. Set Environment Variables
Add these in Railway dashboard:

```env
# Application
APP_NAME=Portfolio
APP_ENV=production
APP_DEBUG=false
APP_URL=[Your Railway domain - set after deployment]

# Email (for contact form)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"

# Admin User (optional - creates admin account)
ADMIN_NAME="Your Name"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="SecurePassword123"
```

### 4. Deploy & Launch
1. Railway builds and deploys automatically
2. Database migrations run automatically
3. Storage is configured for file uploads
4. Your portfolio is live! 🎉

## ⚙️ Deployment Options

**For Production (recommended):**
```toml
[deploy]
startCommand = "bash railway/init-prod.sh"
```

**For Development/Demo (with sample data):**
```toml
[deploy]
startCommand = "bash railway/init-app.sh"
```

## 🔧 Troubleshooting

### Common Issues

**PHP Extensions Missing**
- All required extensions are in `php.toml`
- EXIF extension included for image processing

**Database Connection**
- PostgreSQL is auto-configured by Railway
- No manual database setup needed

**File Uploads**
- Storage symlink created automatically
- Images stored in `storage/app/public`

**Email Issues**
- Use Gmail app passwords, not regular passwords
- Enable 2-factor authentication first

### Monitoring
- Check Railway dashboard for deployment logs
- View application logs in Railway console
- Monitor resource usage and costs

## 📧 Email Setup (Gmail)

1. Enable 2-factor authentication on Gmail
2. Generate app password: Google Account → Security → App passwords
3. Use app password (not regular password) in `MAIL_PASSWORD`

## 🎯 Features Ready to Use

- ✅ Blog with rich text editor and HTML rendering
- ✅ Project showcase with image uploads
- ✅ Admin dashboard (`/admin`) with authentication
- ✅ Contact form with email notifications
- ✅ Tag management system
- ✅ Responsive design with Tailwind CSS
- ✅ SEO-friendly URLs and meta tags

## 🌐 Custom Domain (Optional)

1. In Railway dashboard: **Settings** → **Domains**
2. Add your custom domain
3. Update `APP_URL` environment variable

---

**🌟 Your professional portfolio is ready to impress employers and clients!**

Railway Free Tier: $5/month credit • PostgreSQL included • Automatic scaling