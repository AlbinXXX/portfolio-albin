#!/bin/bash
# Production-ready initialization script for Railway
# Only runs migrations without seeding in production

set -e

echo "🚀 Starting production initialization..."

echo "� Creating SQLite database file..."
mkdir -p /app/database
touch /app/database/database.sqlite

echo "�🗄️  Running database migrations..."
php artisan migrate --force

echo "🔗 Creating storage symlink..."
php artisan storage:link

echo "🧹 Clearing application cache..."
php artisan optimize:clear

echo "⚡ Caching configuration for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Production initialization complete!"

echo "🚀 Starting Laravel server on port ${PORT:-8000}..."
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}