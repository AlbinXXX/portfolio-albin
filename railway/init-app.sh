#!/bin/bash
# Make sure this file has executable permissions, run `chmod +x railway/init-app.sh`

# Exit the script if any command fails
set -e

echo "� Creating SQLite database file..."
mkdir -p /app/database
touch /app/database/database.sqlite

echo "�🗄️  Running database migrations..."
php artisan migrate --force

echo "🔗 Creating storage symlink..."
php artisan storage:link

echo "🌱 Seeding database with admin user and sample data..."
php artisan db:seed --force

echo "🧹 Clearing application cache..."
php artisan optimize:clear

echo "⚡ Caching configuration for production..."
php artisan config:cache
php artisan event:cache
php artisan route:cache
php artisan view:cache

echo "🚀 Starting Laravel server on port ${PORT:-8000}..."
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}