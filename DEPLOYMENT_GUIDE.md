# 🚀 Production Deployment Guide

## 📋 Overview

This guide will help you deploy your AyurvedaHerbs E-Commerce website to production with:
- ✅ **Netlify/Vercel** hosting
- ✅ **Custom Domain** setup
- ✅ **HTTPS** enabled
- ✅ **Global CDN** for fast delivery
- ✅ **SEO Optimization**
- ✅ **Performance Optimization**

## 🎯 Quick Deploy Options

### Option 1: Netlify (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
npm run deploy
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
npm run vercel
```

## 🔧 Step-by-Step Deployment

### 1. Prepare Your Repository

#### A. Git Setup
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit for production deployment"

# Add remote repository (replace with your GitHub repo)
git remote add origin https://github.com/yourusername/ayurvedaherbs-ecommerce.git

# Push to GitHub
git push -u origin main
```

#### B. Environment Variables
Create `.env.production` file:
```env
REACT_APP_ENV=production
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_GA_TRACKING_ID=GA_MEASUREMENT_ID
REACT_APP_SITE_URL=https://ayurvedaherbs.com
```

### 2. Netlify Deployment

#### A. Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Choose your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: `18`

#### B. Environment Variables in Netlify
Go to Site settings → Environment variables:
```
REACT_APP_ENV=production
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_GA_TRACKING_ID=GA_MEASUREMENT_ID
REACT_APP_SITE_URL=https://ayurvedaherbs.com
```

#### C. Custom Domain Setup
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `ayurvedaherbs.com`
4. Follow DNS setup instructions

#### D. DNS Configuration
Add these records to your domain provider:

**For Netlify:**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

**For Vercel:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.36
```

### 3. Vercel Deployment

#### A. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Configure build settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

#### B. Environment Variables in Vercel
Go to Project settings → Environment Variables:
```
REACT_APP_ENV=production
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_GA_TRACKING_ID=GA_MEASUREMENT_ID
REACT_APP_SITE_URL=https://ayurvedaherbs.com
```

### 4. Performance Optimization

#### A. Build Optimization
```bash
# Analyze bundle size
npm run build:analyze

# Test performance
npm run test:performance

# Check Lighthouse score
npm run lighthouse
```

#### B. Image Optimization
- Use WebP format for images
- Implement lazy loading
- Optimize image sizes
- Use responsive images

#### C. Caching Strategy
The `netlify.toml` file includes:
- Static asset caching (1 year)
- HTML caching (1 hour)
- API caching (5 minutes)

### 5. SEO Configuration

#### A. Meta Tags
Update `public/index.html`:
```html
<meta name="description" content="Authentic Ayurvedic products and herbal remedies for natural wellness">
<meta name="keywords" content="ayurveda, herbal, natural, wellness, immunity, health">
<meta name="author" content="AyurvedaHerbs">
<meta property="og:title" content="AyurvedaHerbs - Natural Wellness Products">
<meta property="og:description" content="Discover authentic Ayurvedic products for natural wellness">
<meta property="og:image" content="https://ayurvedaherbs.com/og-image.jpg">
<meta property="og:url" content="https://ayurvedaherbs.com">
```

#### B. Google Analytics
Add to `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### C. Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership
4. Submit sitemap: `https://ayurvedaherbs.com/sitemap.xml`

### 6. Security Configuration

#### A. Security Headers
Already configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

#### B. HTTPS
- Automatically enabled on Netlify/Vercel
- Force HTTPS redirects configured
- SSL certificates auto-renewed

#### C. Content Security Policy
Add to `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com;">
```

### 7. Monitoring & Analytics

#### A. Performance Monitoring
- **Lighthouse**: Automated performance testing
- **Web Vitals**: Core Web Vitals tracking
- **Bundle Analyzer**: Bundle size optimization

#### B. Error Tracking
Add Sentry for error tracking:
```bash
npm install @sentry/react @sentry/tracing
```

#### C. Uptime Monitoring
- Set up uptime monitoring with UptimeRobot
- Configure alerts for downtime
- Monitor response times

### 8. Post-Deployment Checklist

#### ✅ Technical
- [ ] HTTPS is working
- [ ] Custom domain is active
- [ ] All pages load correctly
- [ ] Images are optimized
- [ ] Performance score > 90
- [ ] Mobile responsive
- [ ] PWA is working

#### ✅ SEO
- [ ] Meta tags are correct
- [ ] Sitemap is submitted
- [ ] Robots.txt is working
- [ ] Google Analytics is tracking
- [ ] Search Console is verified

#### ✅ Security
- [ ] Security headers are active
- [ ] HTTPS redirects work
- [ ] No mixed content warnings
- [ ] CSP is configured

#### ✅ Performance
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

### 9. Maintenance

#### A. Regular Updates
```bash
# Update dependencies
npm run update:deps

# Security audit
npm run security:check

# Performance testing
npm run test:performance
```

#### B. Backup Strategy
- Regular database backups
- Code repository backups
- Configuration backups

#### C. Monitoring
- Set up alerts for errors
- Monitor performance metrics
- Track user analytics

## 🚀 Deployment Commands

### Quick Deploy
```bash
# Build and deploy to Netlify
npm run prod

# Deploy to Vercel
npm run vercel

# Preview deployment
npm run deploy:preview
```

### Performance Testing
```bash
# Build and analyze
npm run build:analyze

# Lighthouse audit
npm run lighthouse

# Full performance test
npm run test:performance
```

## 📞 Support

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test locally with `npm run build`
4. Check browser console for errors
5. Verify DNS settings

## 🎉 Success!

Your AyurvedaHerbs website is now live with:
- ✅ **Fast Global CDN**
- ✅ **HTTPS Security**
- ✅ **Custom Domain**
- ✅ **SEO Optimization**
- ✅ **Performance Optimization**
- ✅ **Mobile Responsive**
- ✅ **PWA Ready**

**Live URL**: https://ayurvedaherbs.com
**Admin Access**: https://ayurvedaherbs.com/coming-soon (password: admin123) 