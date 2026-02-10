#!/bin/bash

# Smart Job Application Tracker - Quick Start Script

set -e

PROJECT_DIR="/Users/poornachandrad/Documents/Smart Job Application Tracker"

echo "🚀 Smart Job Application Tracker - Quick Start"
echo "=============================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js v18 or higher."
    exit 1
fi
echo "  Node: $(node --version)"
echo "  npm: $(npm --version)"
echo ""

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "✓ Docker is available"
    echo ""
    echo "Choose your setup method:"
    echo "1. Docker Compose (easiest - requires Docker)"
    echo "2. Local development (needs PostgreSQL installed)"
    echo ""
    read -p "Enter choice (1 or 2): " CHOICE
else
    CHOICE=2
    echo "⚠️  Docker not found. Using local development setup..."
    echo ""
fi

if [ "$CHOICE" == "1" ]; then
    echo "Starting with Docker Compose..."
    cd "$PROJECT_DIR"
    docker-compose up -d
    echo ""
    echo "✅ Services started!"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:5000"
    echo "   Database: localhost:5432"
    echo ""
    echo "View logs:"
    echo "  docker-compose logs -f backend"
    echo "  docker-compose logs -f frontend"
    echo "  docker-compose logs -f postgres"
    echo ""
    echo "Stop services:"
    echo "  docker-compose down"
else
    echo "Starting local development..."
    echo ""
    
    # Check PostgreSQL
    echo "✓ Checking PostgreSQL..."
    if ! command -v psql &> /dev/null; then
        echo "❌ PostgreSQL not found. Please install PostgreSQL or use Docker Compose instead."
        exit 1
    fi
    
    # Install dependencies if needed
    echo "✓ Checking dependencies..."
    cd "$PROJECT_DIR/backend"
    if [ ! -d "node_modules" ]; then
        echo "  Installing backend dependencies..."
        npm install > /dev/null 2>&1
    fi
    
    cd "$PROJECT_DIR/frontend"
    if [ ! -d "node_modules" ]; then
        echo "  Installing frontend dependencies..."
        npm install > /dev/null 2>&1
    fi
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Start in separate terminals:"
    echo ""
    echo "Terminal 1 - Backend:"
    echo "  cd '$PROJECT_DIR/backend'"
    echo "  npm run dev"
    echo ""
    echo "Terminal 2 - Frontend:"
    echo "  cd '$PROJECT_DIR/frontend'"
    echo "  npm start"
    echo ""
    echo "Then open: http://localhost:3000"
fi
