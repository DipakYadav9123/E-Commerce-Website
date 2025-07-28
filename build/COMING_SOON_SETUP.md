# Coming Soon Page Setup Guide

## 🚀 Features Included

- **Beautiful Coming Soon Page** with animated background
- **Countdown Timer** to your launch date
- **Password-Protected Admin Access** for testing
- **Newsletter Signup** for launch notifications
- **Social Media Links** to build anticipation
- **Responsive Design** for all devices

## 🔧 How to Customize

### 1. Change Launch Date
Edit the launch date in `src/components/ComingSoon.jsx`:
```javascript
const launchDate = new Date('2024-12-31T00:00:00').getTime();
```

### 2. Change Admin Password
Update the password in `src/components/ComingSoon.jsx`:
```javascript
const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
```

### 3. Customize Content
Update the following sections in `src/components/ComingSoon.jsx`:

#### Hero Section
```javascript
<h2>Something Amazing is Coming</h2>
<p className="subtitle">
  We're crafting the perfect Ayurvedic shopping experience for you. 
  Get ready to discover authentic herbal remedies and natural wellness products.
</p>
```

#### Features Section
```javascript
const features = [
  {
    icon: '🛒',
    title: 'E-Commerce Platform',
    description: 'Complete online shopping experience with secure payments'
  },
  // Add your own features...
];
```

#### Social Links
```javascript
const socialLinks = [
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
  // Update with your social media links...
];
```

### 4. Access the Coming Soon Page
Visit: `http://localhost:3000/coming-soon`

### 5. Admin Access
- Click the "🔓 Admin Access" button
- Enter the password: `admin123` (or your custom password)
- You'll be granted access to the full site

## 🎨 Design Features

- **Animated Background** with floating elements
- **Glassmorphism Effects** with backdrop blur
- **Smooth Animations** using Framer Motion
- **Responsive Layout** for mobile, tablet, desktop
- **Professional Color Scheme** with gradients
- **Interactive Elements** with hover effects

## 🔒 Security Features

- **Password Protection** for admin access
- **localStorage Persistence** for admin mode
- **Secure Password Input** with proper validation
- **Session Management** for admin state

## 📱 Mobile Optimization

- **Touch-Friendly** buttons and interactions
- **Responsive Typography** that scales properly
- **Optimized Layout** for small screens
- **Fast Loading** with lazy loading

## 🚀 Usage Scenarios

1. **Pre-Launch Marketing**: Show anticipation for your new site
2. **Development Testing**: Password-protect access during development
3. **Client Demos**: Show progress with a professional coming soon page
4. **Beta Testing**: Control access to beta versions
5. **Maintenance Mode**: Show during site updates

## 💡 Tips

- **Change the password** before deploying to production
- **Update the launch date** to match your actual launch
- **Customize the content** to match your brand
- **Add your social media links** to build anticipation
- **Test on mobile devices** to ensure responsiveness

The Coming Soon page is now ready to use! 🎉 