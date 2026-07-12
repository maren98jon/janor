#!/bin/bash

# Janor Setup Script
# Run this to quickly set up the project for local development

echo "🍳 Janor Setup"
echo "==============="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker Desktop first."
  exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🐳 Starting PostgreSQL..."
docker-compose up -d

echo ""
echo "⏳ Waiting for database to be ready..."
sleep 5

echo ""
echo "📋 Running migrations..."
npx prisma migrate dev --name init

echo ""
echo "🌱 Seeding database..."
npx prisma db seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the dev server:"
echo "  npm run dev          (localhost only)"
echo "  npm run dev:mobile   (accessible from phone)"
echo ""
echo "To open the database browser:"
echo "  npm run db:studio"
