#!/bin/bash

echo "🚀 Portfolio Deployment Script"
echo "=============================="

echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "📦 Installing Node dependencies..."
npm install

echo "🔨 Building assets..."
npm run build

echo "🔑 Generating application key..."
php artisan key:generate --force

echo "🗄️  Running database migrations..."
php artisan migrate --force

echo "🔗 Creating storage symlink..."
php artisan storage:link

echo "🌱 Seeding database..."
php artisan db:seed --force

echo "🧹 Clearing caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "✅ Deployment complete!"
echo "🌐 Your portfolio is ready!"