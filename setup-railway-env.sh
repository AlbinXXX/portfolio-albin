#!/bin/bash
# Railway Environment Variables Setup Script
# Run this with: bash setup-railway-env.sh

echo "Setting up Railway environment variables for email configuration..."

# Email Configuration
railway variables set MAIL_MAILER=smtp
railway variables set MAIL_HOST=smtp.gmail.com
railway variables set MAIL_PORT=587
railway variables set MAIL_USERNAME=albin.rushiti2004@gmail.com
railway variables set MAIL_PASSWORD="nxyq vrgr hzme ghkp"
railway variables set MAIL_ENCRYPTION=tls
railway variables set MAIL_FROM_ADDRESS=albin.rushiti2004@gmail.com
railway variables set "MAIL_FROM_NAME=Albin Rushiti Portfolio"

# Admin User Configuration
railway variables set ADMIN_NAME="Albin Rushiti"
railway variables set ADMIN_EMAIL=albin.rushiti2004@gmail.com
railway variables set ADMIN_PASSWORD="AlbinPortfolio2024!@#"

# App Key (generate a new one for production)
railway variables set APP_KEY="base64:$(openssl rand -base64 32)"

echo "✅ Railway environment variables set successfully!"
echo "🚀 Your next deployment will use these secure environment variables."