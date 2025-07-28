# 📱 AyurvedaHerbs Mobile App

A React Native mobile application for the AyurvedaHerbs e-commerce platform, featuring a beautiful and intuitive user interface for browsing products, managing cart, and seamless shopping experience.

## 🎯 Features

### ✅ Core Features
- **Home Screen** - Featured products, categories, and quick actions
- **Products Screen** - Browse all products with search and filtering
- **Product Details** - Detailed product information with image gallery
- **Shopping Cart** - Add, remove, and manage cart items
- **Navigation** - Bottom tab navigation with stack navigation

### ✅ UI/UX Features
- **Modern Design** - Clean, intuitive interface with Material Design
- **Responsive Layout** - Optimized for different screen sizes
- **Smooth Animations** - Enhanced user experience with animations
- **Dark/Light Theme** - Theme support (ready for implementation)
- **Loading States** - Proper loading indicators and error handling

### ✅ E-commerce Features
- **Product Catalog** - Complete product listing with categories
- **Search & Filter** - Search products and filter by category
- **Cart Management** - Add, remove, update quantities
- **Price Display** - Current price, original price, and discounts
- **Stock Status** - Real-time stock availability
- **Rating System** - Product ratings and reviews

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ayurvedaherbs/mobile-app.git
cd mobile-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Install iOS dependencies (macOS only)**
```bash
cd ios && pod install && cd ..
```

4. **Start Metro bundler**
```bash
npm start
```

5. **Run on Android**
```bash
npm run android
```

6. **Run on iOS (macOS only)**
```bash
npm run ios
```

## 📱 App Structure

```
mobile-app/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Home screen with featured products
│   │   ├── ProductsScreen.js      # Product listing with search/filter
│   │   ├── ProductDetailScreen.js # Detailed product view
│   │   └── CartScreen.js          # Shopping cart management
│   ├── context/
│   │   └── CartContext.js         # Cart state management
│   ├── data/
│   │   └── products.js            # Product data and categories
│   └── App.js                     # Main app component with navigation
├── package.json                   # Dependencies and scripts
└── README.md                     # This file
```

## 🎨 UI Components

### Home Screen
- **Header** - App branding with search button
- **Categories** - Horizontal scrollable category cards
- **Featured Products** - Highlighted products with badges
- **Quick Actions** - Special offers and wishlist shortcuts

### Products Screen
- **Search Bar** - Real-time product search
- **Category Filter** - Filter products by category
- **Sort Options** - Sort by name, price, or rating
- **Product Cards** - Product information with add to cart

### Product Detail Screen
- **Image Gallery** - Product images with thumbnail navigation
- **Product Info** - Name, rating, price, and description
- **Product Details** - Category, weight, origin, stock status
- **Quantity Selector** - Adjust quantity before adding to cart
- **Action Buttons** - Add to cart and buy now options

### Cart Screen
- **Cart Items** - List of added products with quantities
- **Item Management** - Update quantities and remove items
- **Cart Summary** - Subtotal, shipping, and total calculation
- **Action Buttons** - Clear cart and proceed to checkout

## 🔧 Configuration

### Environment Setup

1. **Android Setup**
   - Install Android Studio
   - Set up Android SDK
   - Configure ANDROID_HOME environment variable
   - Create Android Virtual Device (AVD)

2. **iOS Setup (macOS only)**
   - Install Xcode from App Store
   - Install Xcode Command Line Tools
   - Install CocoaPods

3. **React Native CLI**
```bash
npm install -g react-native-cli
```

### Dependencies

The app uses the following key dependencies:

```json
{
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "react-native-vector-icons": "^10.0.2",
  "react-native-linear-gradient": "^2.8.3",
  "react-native-async-storage": "^1.19.5"
}
```

## 📊 Data Structure

### Product Object
```javascript
{
  id: 1,
  name: "Organic Ashwagandha Powder",
  price: 24.99,
  originalPrice: 29.99,
  image: "https://example.com/image.jpg",
  description: "Pure organic ashwagandha powder...",
  category: "Herbal Supplements",
  rating: 4.5,
  reviewCount: 127,
  inStock: true,
  stockQuantity: 50,
  weight: "100g",
  origin: "India",
  organic: true,
  discount: 17,
  badge: {
    type: 'trending',
    value: 'Popular'
  }
}
```

### Cart State
```javascript
{
  items: [],           // Array of cart items
  total: 0,           // Total cart value
  itemCount: 0        // Total number of items
}
```

## 🎯 Key Features Implementation

### 1. Navigation Structure
```javascript
// Bottom Tab Navigation
- Home (HomeScreen)
- Products (ProductStack)
  - ProductsList (ProductsScreen)
  - ProductDetail (ProductDetailScreen)
- Cart (CartStack)
  - CartList (CartScreen)
```

### 2. State Management
```javascript
// Cart Context provides:
- addToCart(product)
- removeFromCart(productId)
- updateQuantity(productId, quantity)
- clearCart()
- items, total, itemCount
```

### 3. Product Filtering
```javascript
// Search and filter functionality:
- Text search across product name and description
- Category filtering
- Sort by name, price, or rating
- Real-time filtering and sorting
```

## 🚀 Deployment

### Android Build
```bash
# Generate signed APK
cd android
./gradlew assembleRelease
```

### iOS Build
```bash
# Archive for App Store
cd ios
xcodebuild -workspace AyurvedaHerbs.xcworkspace -scheme AyurvedaHerbs -configuration Release archive
```

### App Store Deployment
1. **Android Play Store**
   - Generate signed APK/AAB
   - Upload to Google Play Console
   - Configure store listing and metadata

2. **iOS App Store**
   - Archive app in Xcode
   - Upload to App Store Connect
   - Configure app metadata and screenshots

## 🔧 Customization

### Theme Colors
```javascript
// Primary colors
primary: '#4CAF50',      // Green
secondary: '#FF6B6B',    // Red
accent: '#4ECDC4',       // Teal
background: '#f5f5f5',   // Light gray
```

### Product Categories
```javascript
const categories = [
  { id: 1, name: "Herbal Supplements", icon: "🌿" },
  { id: 2, name: "Herbal Teas", icon: "🍵" },
  { id: 3, name: "Digestive Health", icon: "🌱" },
  { id: 4, name: "Skin Care", icon: "🌸" },
  { id: 5, name: "Immunity Boosters", icon: "💪" }
];
```

### Adding New Products
```javascript
// Add to src/data/products.js
{
  id: 7,
  name: "New Product Name",
  price: 19.99,
  // ... other properties
}
```

## 📱 Screenshots

### Home Screen
- Welcome header with app branding
- Category cards with icons
- Featured products carousel
- Quick action buttons

### Products Screen
- Search bar with real-time filtering
- Category filter chips
- Sort options (name, price, rating)
- Product cards with images and details

### Product Detail Screen
- Image gallery with thumbnails
- Product information and pricing
- Quantity selector
- Add to cart and buy now buttons

### Cart Screen
- Cart items with quantities
- Price summary and totals
- Clear cart and checkout options
- Empty cart state with call-to-action

## 🔄 Future Enhancements

### Planned Features
- **User Authentication** - Login/signup functionality
- **Wishlist** - Save products for later
- **Order History** - Track past orders
- **Push Notifications** - Order updates and promotions
- **Payment Integration** - Secure payment processing
- **Offline Support** - Cache products for offline browsing
- **Dark Theme** - Complete dark mode implementation
- **Multi-language** - Internationalization support

### Technical Improvements
- **Performance Optimization** - Image caching and lazy loading
- **Error Handling** - Comprehensive error boundaries
- **Testing** - Unit and integration tests
- **Analytics** - User behavior tracking
- **Accessibility** - Screen reader support
- **Deep Linking** - Direct product links

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
```bash
# Clear cache and restart
npm start -- --reset-cache
```

2. **Android build errors**
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
```

3. **iOS build errors**
```bash
# Clean and reinstall pods
cd ios && pod deintegrate && pod install && cd ..
```

4. **Vector icons not showing**
```bash
# Link vector icons
npx react-native link react-native-vector-icons
```

### Debug Commands
```bash
# Start with debugging
npm start -- --reset-cache

# Run with specific device
npm run android -- --deviceId=your_device_id

# Enable Hermes (performance)
npx react-native run-android --variant=release
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for AyurvedaHerbs** 