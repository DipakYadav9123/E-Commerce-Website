#!/bin/bash

# AyurvedaHerbs Mobile App Setup Script
# This script automates the setup process for the React Native mobile app

echo "🚀 Setting up AyurvedaHerbs Mobile App..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Check if Node.js is installed
check_node() {
    print_header "Checking Node.js Installation"
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is installed: $NODE_VERSION"
    else
        print_error "Node.js is not installed. Please install Node.js v16 or higher."
        print_status "Download from: https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    print_header "Checking npm Installation"
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_status "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Check if React Native CLI is installed
check_react_native_cli() {
    print_header "Checking React Native CLI"
    if command -v react-native &> /dev/null; then
        print_status "React Native CLI is installed"
    else
        print_warning "React Native CLI not found. Installing..."
        npm install -g react-native-cli
        if [ $? -eq 0 ]; then
            print_status "React Native CLI installed successfully"
        else
            print_error "Failed to install React Native CLI"
            exit 1
        fi
    fi
}

# Install dependencies
install_dependencies() {
    print_header "Installing Dependencies"
    print_status "Installing npm packages..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_status "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Setup iOS (macOS only)
setup_ios() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        print_header "Setting up iOS (macOS detected)"
        
        # Check if Xcode is installed
        if command -v xcodebuild &> /dev/null; then
            print_status "Xcode is installed"
        else
            print_warning "Xcode not found. Please install Xcode from the App Store."
            print_status "After installing Xcode, run: xcode-select --install"
        fi
        
        # Check if CocoaPods is installed
        if command -v pod &> /dev/null; then
            print_status "CocoaPods is installed"
        else
            print_warning "CocoaPods not found. Installing..."
            sudo gem install cocoapods
        fi
        
        # Install iOS dependencies
        print_status "Installing iOS dependencies..."
        cd ios && pod install && cd ..
        
        if [ $? -eq 0 ]; then
            print_status "iOS dependencies installed successfully"
        else
            print_warning "Failed to install iOS dependencies. You can still run on Android."
        fi
    else
        print_status "Skipping iOS setup (not on macOS)"
    fi
}

# Setup Android
setup_android() {
    print_header "Setting up Android"
    
    # Check if ANDROID_HOME is set
    if [ -z "$ANDROID_HOME" ]; then
        print_warning "ANDROID_HOME environment variable is not set."
        print_status "Please set ANDROID_HOME to your Android SDK location."
        print_status "Example: export ANDROID_HOME=/Users/username/Library/Android/sdk"
    else
        print_status "ANDROID_HOME is set: $ANDROID_HOME"
    fi
    
    # Check if Android Studio is installed (basic check)
    if [ -d "/Applications/Android Studio.app" ] || [ -d "$HOME/Android/Sdk" ]; then
        print_status "Android Studio or Android SDK found"
    else
        print_warning "Android Studio not found. Please install Android Studio."
        print_status "Download from: https://developer.android.com/studio"
    fi
}

# Create necessary directories
create_directories() {
    print_header "Creating Project Structure"
    
    # Create src directories if they don't exist
    mkdir -p src/screens
    mkdir -p src/context
    mkdir -p src/data
    mkdir -p src/components
    mkdir -p src/utils
    
    print_status "Project structure created"
}

# Setup environment variables
setup_env() {
    print_header "Setting up Environment Variables"
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        cat > .env << EOF
# AyurvedaHerbs Mobile App Environment Variables
REACT_APP_API_URL=https://api.ayurvedaherbs.com
REACT_APP_ENV=development
EOF
        print_status "Created .env file"
    else
        print_status ".env file already exists"
    fi
}

# Run tests
run_tests() {
    print_header "Running Tests"
    print_status "Running npm test..."
    npm test -- --watchAll=false
    
    if [ $? -eq 0 ]; then
        print_status "Tests passed"
    else
        print_warning "Some tests failed. Check the output above."
    fi
}

# Display next steps
show_next_steps() {
    print_header "Setup Complete!"
    echo ""
    print_status "Your AyurvedaHerbs mobile app is ready to run!"
    echo ""
    print_status "Next steps:"
    echo "1. Start Metro bundler: npm start"
    echo "2. Run on Android: npm run android"
    echo "3. Run on iOS (macOS): npm run ios"
    echo ""
    print_status "Additional commands:"
    echo "- Clean build: npm run clean"
    echo "- Build Android: npm run build:android"
    echo "- Build iOS: npm run build:ios"
    echo ""
    print_status "For more information, see README.md"
    echo ""
    print_status "Happy coding! 🚀"
}

# Main setup function
main() {
    print_header "AyurvedaHerbs Mobile App Setup"
    echo ""
    
    # Run all setup steps
    check_node
    check_npm
    check_react_native_cli
    create_directories
    install_dependencies
    setup_android
    setup_ios
    setup_env
    run_tests
    show_next_steps
}

# Run the setup
main "$@" 