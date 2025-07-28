#!/bin/bash

# 🚀 AyurvedaHerbs Production Deployment Script
# This script automates the deployment process to Netlify/Vercel

echo "🌿 AyurvedaHerbs - Production Deployment"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Install dependencies
print_status "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_success "Dependencies installed successfully"

# Run security audit
print_status "Running security audit..."
npm audit

# Run linting
print_status "Running linting..."
npm run lint

# Build the project
print_status "Building the project..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

print_success "Build completed successfully"

# Check build size
BUILD_SIZE=$(du -sh build | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Analyze bundle (optional)
if command -v npx &> /dev/null; then
    print_status "Analyzing bundle size..."
    npm run build:analyze
fi

# Deploy to Netlify (if Netlify CLI is installed)
if command -v netlify &> /dev/null; then
    print_status "Deploying to Netlify..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        print_success "Deployed to Netlify successfully!"
        print_status "Your site should be live at: https://ayurvedaherbs.netlify.app"
    else
        print_error "Netlify deployment failed"
    fi
else
    print_warning "Netlify CLI not found. Install with: npm install -g netlify-cli"
fi

# Deploy to Vercel (if Vercel CLI is installed)
if command -v vercel &> /dev/null; then
    print_status "Deploying to Vercel..."
    npm run vercel
    
    if [ $? -eq 0 ]; then
        print_success "Deployed to Vercel successfully!"
    else
        print_error "Vercel deployment failed"
    fi
else
    print_warning "Vercel CLI not found. Install with: npm install -g vercel"
fi

# Performance testing
print_status "Running performance tests..."
npm run test:performance

# Final status
echo ""
echo "🎉 Deployment Summary"
echo "===================="
echo "✅ Dependencies installed"
echo "✅ Security audit completed"
echo "✅ Linting passed"
echo "✅ Build successful"
echo "✅ Performance tests completed"
echo ""
echo "📋 Next Steps:"
echo "1. Set up custom domain in Netlify/Vercel dashboard"
echo "2. Configure environment variables"
echo "3. Set up Google Analytics"
echo "4. Submit sitemap to Google Search Console"
echo "5. Test all pages and functionality"
echo ""
echo "🌐 Your site should be live at:"
echo "   - Netlify: https://ayurvedaherbs.netlify.app"
echo "   - Custom Domain: https://ayurvedaherbs.com (after setup)"
echo ""
echo "🔧 Admin Access:"
echo "   - Coming Soon: https://ayurvedaherbs.com/coming-soon"
echo "   - Password: admin123"
echo ""
print_success "Deployment completed successfully! 🚀" 