# 🚀 Railway Deployment Setup Guide (SQLite)

## Step 1: Generate Required Values

### 1.1 Generate Laravel Application Key
```bash
# Run locally to generate a key
php artisan key:generate --show
```
Copy the output (starts with `base64:`)

### 1.2 Create Gmail App Password
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account → Security → App passwords
3. Generate a new app password for "Laravel Portfolio"
4. Copy the 16-character password (no spaces)

## Step 2: Railway Environment Variables

In Railway dashboard, set these environment variables:

### Required Variables:
```env
APP_NAME="Albin Rushiti Portfolio"
APP_ENV=production
APP_KEY=base64:YOUR_GENERATED_KEY_FROM_STEP_1.1
APP_DEBUG=false
APP_URL=https://your-railway-domain.railway.app

LOG_CHANNEL=stderr
LOG_STDERR_FORMATTER=\Monolog\Formatter\JsonFormatter

DB_CONNECTION=sqlite
DB_DATABASE=/app/database/database.sqlite

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=albin.rushiti2004@gmail.com
MAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD_FROM_STEP_1.2
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=albin.rushiti2004@gmail.com
MAIL_FROM_NAME="${APP_NAME}"

ADMIN_NAME="Albin Rushiti"
ADMIN_EMAIL="albin.rushiti2004@gmail.com"
ADMIN_PASSWORD=create_secure_password_here
```

### Auto-Configured (Railway handles these):
- `PORT` (for server listening)

## Step 3: Deploy to Railway

1. **Connect Repository**: 
   - Go to railway.app
   - Create new project from GitHub repo

2. **No Database Service Needed**:
   - ✅ SQLite database file is created automatically
   - ❌ No need to add PostgreSQL service

3. **Set Environment Variables**:
   - Go to your app service settings
   - Add all variables from Step 2

4. **Deploy**:
   - Railway will automatically build and deploy
   - Check logs for any issues

## Step 4: Post-Deployment

1. **Get your Railway URL**:
   - Copy the generated domain from Railway dashboard
   - Update `APP_URL` environment variable with this domain

2. **Test the application**:
   - Visit your Railway URL
   - Try logging in with admin credentials
   - Test contact form
   - Check admin dashboard

## Step 5: Custom Domain (Optional)

1. In Railway dashboard → Settings → Domains
2. Add your custom domain
3. Update `APP_URL` environment variable
4. Configure DNS records as instructed by Railway

## 🔧 Troubleshooting

### Common Issues:

**Build Fails**:
- Check Node.js and PHP versions in logs
- Verify all files are committed to Git

**Database Issues**:
- SQLite file is created automatically
- Check migration logs for errors

**Email Not Working**:
- Verify Gmail app password (not regular password)
- Check 2-factor authentication is enabled

**Admin Login Issues**:
- Verify `ADMIN_PASSWORD` is set
- Check database seeding logs

### SQLite Benefits:
- ✅ No external database service needed
- ✅ Faster deployment
- ✅ Lower costs (no database service fees)
- ✅ Perfect for portfolios and small apps
- ✅ Automatic backups with Railway

### Useful Commands:
```bash
# Check Railway logs
railway logs

# Connect to Railway shell
railway shell

# Run artisan commands on Railway
railway run php artisan migrate
```

## 📁 File Structure
```
railway/
├── init-app.sh      # Development deployment (with sample data)
├── init-prod.sh     # Production deployment (no sample data)
railway.toml         # Railway configuration (SQLite)
php.toml            # PHP extensions
.env.production     # Environment template (SQLite)
```

## 🎯 Final Checklist
- [ ] Generated Laravel app key
- [ ] Created Gmail app password
- [ ] Set all environment variables in Railway
- [ ] ❌ No database service needed (SQLite)
- [ ] Updated APP_URL with Railway domain
- [ ] Tested login and admin features
- [ ] Verified contact form works
- [ ] Set up custom domain (optional)

## 💡 Why SQLite for Railway?

Perfect choice for your portfolio because:
- **Simple**: No external database to manage
- **Fast**: File-based database is very quick
- **Cost-effective**: No additional database service costs
- **Reliable**: SQLite is rock-solid for read-heavy applications
- **Portable**: Database travels with your app