# 📊 Google Analytics v4 Setup Guide

## 🎯 Overview

This guide will help you set up Google Analytics v4 for your AyurvedaHerbs e-commerce website to track:
- ✅ **User Visits** - New vs returning users
- ✅ **Most Viewed Products** - Product popularity tracking
- ✅ **Session Time** - User engagement metrics
- ✅ **E-commerce Events** - Purchase funnel tracking
- ✅ **User Behavior** - Scroll depth, time on page
- ✅ **Performance Metrics** - Page load times, errors

## 🔧 Step-by-Step Setup

### 1. Create Google Analytics Account

1. **Go to Google Analytics**: [analytics.google.com](https://analytics.google.com)
2. **Sign in** with your Google account
3. **Click "Start measuring"**
4. **Create Account**:
   - Account name: `AyurvedaHerbs`
   - Data sharing settings: Choose your preferences

### 2. Create Property

1. **Click "Create Property"**
2. **Property details**:
   - Property name: `AyurvedaHerbs Website`
   - Reporting time zone: `Asia/Kolkata`
   - Currency: `Indian Rupee (INR)`
3. **Business information**:
   - Industry category: `E-commerce`
   - Business size: `Small business`
   - Business objectives: Select relevant options

### 3. Create Data Stream

1. **Click "Create Stream"**
2. **Choose platform**: `Web`
3. **Website details**:
   - Website URL: `https://ayurvedaherbs.com`
   - Stream name: `AyurvedaHerbs Website`
4. **Click "Create stream"**

### 4. Get Measurement ID

1. **Copy the Measurement ID** (format: `G-XXXXXXXXXX`)
2. **Save it** for environment variables

## 🔧 Environment Variables Setup

### For Development (.env.local)
```env
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_ENV=development
```

### For Production (.env.production)
```env
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_ENV=production
```

### For Netlify/Vercel
Add these environment variables in your deployment platform:
```
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_ENV=production
```

## 📊 Tracking Features Implemented

### 1. User Visit Tracking
```javascript
// Track new vs returning users
trackUserVisit('new'); // or 'returning'
```

### 2. Session Time Tracking
```javascript
// Automatic session tracking
sessionManager.startSession();
sessionManager.endSession();
```

### 3. Product View Tracking
```javascript
// Track product views with detailed data
trackProductView(productId, productName, category, price);
```

### 4. E-commerce Events
```javascript
// Add to cart
trackAddToCart(productId, productName, category, price, quantity);

// Purchase
trackPurchase(transactionId, totalValue, items);
```

### 5. User Engagement
```javascript
// Scroll depth tracking
trackScrollDepth(75); // 75% scroll depth

// Time on page
trackTimeOnPage('/products', 120); // 120 seconds
```

## 📈 Analytics Dashboard Setup

### 1. Create Custom Reports

#### **Product Performance Report**
1. Go to **Reports** → **Engagement** → **Events**
2. Create custom report for:
   - `view_item` events
   - `add_to_cart` events
   - `purchase` events

#### **User Engagement Report**
1. Create custom report for:
   - `session_duration`
   - `scroll_depth`
   - `time_on_page`

#### **E-commerce Funnel Report**
1. Create funnel for:
   - Product view → Add to cart → Checkout → Purchase

### 2. Set Up Goals

#### **E-commerce Goals**
1. **Purchase Goal**:
   - Goal type: Event
   - Event name: `purchase`
   - Value: Yes

2. **Add to Cart Goal**:
   - Goal type: Event
   - Event name: `add_to_cart`
   - Value: Yes

3. **Product View Goal**:
   - Goal type: Event
   - Event name: `view_item`
   - Value: Yes

### 3. Create Audiences

#### **High-Value Customers**
- Users who made purchases > ₹1000
- Users with session duration > 5 minutes

#### **Product Researchers**
- Users who viewed > 5 products
- Users who spent > 3 minutes on product pages

#### **Cart Abandoners**
- Users who added to cart but didn't purchase
- Users who started checkout but didn't complete

## 📊 Key Metrics to Monitor

### 1. User Engagement
- **Session Duration**: Average time spent on site
- **Pages per Session**: How many pages users view
- **Bounce Rate**: Percentage of single-page sessions
- **Returning Users**: User retention rate

### 2. E-commerce Performance
- **Product Views**: Most popular products
- **Add to Cart Rate**: Conversion from view to cart
- **Purchase Rate**: Conversion from cart to purchase
- **Average Order Value**: Revenue per transaction

### 3. User Behavior
- **Scroll Depth**: How far users scroll on pages
- **Time on Page**: Engagement with specific content
- **Exit Pages**: Where users leave the site
- **Click Tracking**: Button and link interactions

### 4. Technical Performance
- **Page Load Time**: Site speed metrics
- **Error Tracking**: JavaScript errors and issues
- **Mobile vs Desktop**: Device usage patterns
- **Browser Performance**: Cross-browser compatibility

## 🔍 Custom Dimensions & Metrics

### 1. Product Analytics
```javascript
// Custom dimensions
- product_category
- product_id
- product_name
- user_type
- session_duration
```

### 2. User Analytics
```javascript
// Custom metrics
- session_duration (seconds)
- scroll_depth (percentage)
- time_on_page (seconds)
- products_viewed (count)
```

## 📱 Enhanced E-commerce Tracking

### 1. Product Impression Tracking
```javascript
// Track when products are viewed in lists
trackEvent('product_impression', {
  product_id: product.id,
  product_name: product.name,
  list_name: 'Featured Products'
});
```

### 2. Product Click Tracking
```javascript
// Track when users click on products
trackEvent('product_click', {
  product_id: product.id,
  product_name: product.name,
  list_name: 'Search Results'
});
```

### 3. Checkout Funnel Tracking
```javascript
// Track each step of the checkout process
trackEcommerceAnalytics.trackCheckoutStep(1, 'Cart Review');
trackEcommerceAnalytics.trackCheckoutStep(2, 'Shipping Info');
trackEcommerceAnalytics.trackCheckoutStep(3, 'Payment');
```

## 🎯 Conversion Tracking

### 1. Newsletter Signups
```javascript
// Track newsletter subscriptions
trackNewsletterSignup('user@example.com');
```

### 2. Contact Form Submissions
```javascript
// Track contact form completions
trackFormSubmission('Contact Form', 'General Inquiry');
```

### 3. WhatsApp Clicks
```javascript
// Track WhatsApp contact clicks
trackWhatsAppClick(productId);
```

## 📊 Reporting & Insights

### 1. Daily Reports
- **User Visits**: New vs returning users
- **Top Products**: Most viewed products
- **Revenue**: Daily sales and AOV
- **Engagement**: Session duration and pages per session

### 2. Weekly Reports
- **Product Performance**: Best and worst performing products
- **User Behavior**: Popular pages and user flow
- **Conversion Funnel**: Cart abandonment analysis
- **Technical Issues**: Error tracking and performance

### 3. Monthly Reports
- **Growth Trends**: Month-over-month growth
- **Seasonal Patterns**: Product demand trends
- **User Acquisition**: Traffic source analysis
- **Revenue Analysis**: Sales trends and forecasting

## 🔧 Advanced Features

### 1. Enhanced E-commerce
- **Product Refunds**: Track return rates
- **Promotion Tracking**: Coupon and discount usage
- **Inventory Tracking**: Stock level monitoring
- **Shipping Tracking**: Delivery performance

### 2. User Segmentation
- **Geographic**: Location-based analysis
- **Demographic**: Age and gender insights
- **Behavioral**: Purchase patterns and preferences
- **Technical**: Device and browser usage

### 3. A/B Testing Integration
- **Page Variations**: Test different layouts
- **Product Positioning**: Test product placement
- **Pricing Tests**: Test different price points
- **Content Testing**: Test different messaging

## 🚀 Quick Start Commands

```bash
# Set up environment variables
echo "REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX" > .env.local

# Start development with analytics
npm start

# Build for production with analytics
npm run build

# Deploy with analytics tracking
npm run deploy
```

## 📋 Verification Checklist

- [ ] Google Analytics account created
- [ ] Property and data stream set up
- [ ] Measurement ID configured
- [ ] Environment variables added
- [ ] Analytics component integrated
- [ ] Events firing correctly
- [ ] Real-time data showing
- [ ] Goals and conversions set up
- [ ] Custom reports created
- [ ] Alerts configured

## 🎉 Success!

Your AyurvedaHerbs website now has comprehensive Google Analytics v4 tracking for:
- ✅ **User Visits** - Track new vs returning users
- ✅ **Most Viewed Products** - Product popularity analysis
- ✅ **Session Time** - User engagement metrics
- ✅ **E-commerce Events** - Complete purchase funnel
- ✅ **User Behavior** - Scroll depth and time tracking
- ✅ **Performance Monitoring** - Error and speed tracking

**Next Steps:**
1. **Verify tracking** in Google Analytics real-time reports
2. **Set up goals** for key conversions
3. **Create custom reports** for business insights
4. **Configure alerts** for important metrics
5. **Monitor performance** and optimize based on data

Your analytics are now live and tracking! 📊 