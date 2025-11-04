# 🚀 Deploy to Railway

This Laravel portfolio is ready to deploy to Railway! Follow these steps:

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Railway Account**: Sign up at [railway.app](https://railway.app)

## 🛠️ Deployment Steps

### 1. Create Database Service
1. Go to your Railway dashboard
2. Create a new project
3. Add a **PostgreSQL** database service

### 2. Deploy App Service
1. Create a new service in the same project
2. Connect your GitHub repository
3. In service settings:
   - **Build Command**: `npm run build`
   - **Pre-Deploy Command**: `chmod +x ./railway/init-app.sh && sh ./railway/init-app.sh`

### 3. Set Environment Variables
Add these variables in your Railway service:

```env
# Required
APP_KEY=[Generate with: php artisan key:generate --show]
APP_URL=[Your Railway domain]
DB_URL=${{Postgres.DATABASE_URL}}

# Production Settings
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=pgsql
QUEUE_CONNECTION=database

# Logging (for Railway)
LOG_CHANNEL=stderr
LOG_STDERR_FORMATTER=\Monolog\Formatter\JsonFormatter

# Email (Optional - use your Gmail credentials)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com

# Admin User
ADMIN_NAME="Your Name"
ADMIN_EMAIL="your-email@gmail.com"
ADMIN_PASSWORD="YourSecurePassword"
```

### 4. Generate Domain
1. Go to service **Settings** → **Networking**
2. Click **Generate Domain**
3. Your portfolio is live! 🎉

## 🔧 Optional: Add Queue Worker & Cron Services

For background jobs and scheduled tasks:

1. **Worker Service**: Create another service, set start command to `chmod +x ./railway/run-worker.sh && sh ./railway/run-worker.sh`
2. **Cron Service**: Create another service, set start command to `chmod +x ./railway/run-cron.sh && sh ./railway/run-cron.sh`

## 📧 Email Configuration

The contact form will work automatically once you set your Gmail credentials in the environment variables.

## 🎯 Features Included

- ✅ Blog with rich text editor
- ✅ Project showcase with image uploads
- ✅ Admin dashboard (`/admin`)
- ✅ Contact form with email notifications
- ✅ Database seeding with sample content
- ✅ Responsive design
- ✅ SEO-friendly URLs

---

**🌟 Your portfolio is ready to impress!**