import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LoadingProvider } from './context/LoadingContext';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import ThemeToggle from './components/ThemeToggle';
import ImagePerformance from './components/ImagePerformance';
import PageLoader from './components/PageLoader';
import WhatsAppChat from './components/WhatsAppChat';
import PageTransition from './components/PageTransition';
import PWARegistration from './components/PWARegistration';
import AccessibilityEnhancements from './components/AccessibilityEnhancements';
import LazyLoadingSpinner from './components/LazyLoadingSpinner';
import LazyLoadingPerformance from './components/LazyLoadingPerformance';
import CartNotification from './components/CartNotification';
import PreloadManager from './components/PreloadManager';
import GoogleAnalytics from './components/GoogleAnalytics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './components/PageTransition.css';
import './themes.css';
import { 
  startLazyLoadTimer, 
  endLazyLoadTimer, 
  shouldPreload,
  componentPriorities 
} from './utils/lazyLoadingConfig';

// Enhanced lazy loading with performance monitoring
const createLazyComponent = (importFn, componentName) => {
  return lazy(() => {
    startLazyLoadTimer(componentName);
    return importFn().then((module) => {
      endLazyLoadTimer();
      return module;
    });
  });
};

// Lazy load all major components with enhanced monitoring
const Home = createLazyComponent(() => import('./components/Home'), 'Home');
const Products = createLazyComponent(() => import('./components/Products'), 'Products');
const ProductDetail = createLazyComponent(() => import('./components/ProductDetail'), 'ProductDetail');
const Cart = createLazyComponent(() => import('./components/Cart'), 'Cart');
const NewsletterAdmin = createLazyComponent(() => import('./components/NewsletterAdmin'), 'NewsletterAdmin');
const Offers = createLazyComponent(() => import('./components/Offers'), 'Offers');
const Blog = createLazyComponent(() => import('./components/Blog'), 'Blog');
const Contact = createLazyComponent(() => import('./components/Contact'), 'Contact');
const Admin = createLazyComponent(() => import('./components/Admin'), 'Admin');
const Checkout = createLazyComponent(() => import('./components/Checkout'), 'Checkout');
const ComingSoon = createLazyComponent(() => import('./components/ComingSoon'), 'ComingSoon');
const NotFound = createLazyComponent(() => import('./components/NotFound'), 'NotFound');

function App() {
  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedSystemTheme = localStorage.getItem('system-theme');
    
    if (savedTheme && savedSystemTheme !== 'true') {
      // User has manually set a theme
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 0
    });
  }, []);

  return (
    <LoadingProvider>
      <CartProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <div className="App">
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-link" id="skip-to-main">
              Skip to main content
            </a>
            
            <GoogleAnalytics />
            <PageLoader />
            <ScrollToTop />
            <PageTransition>
              <Suspense fallback={<LazyLoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:productId" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/coming-soon" element={<ComingSoon />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
            <ScrollToTopButton />
            <ThemeToggle />
            <WhatsAppChat />
            <ImagePerformance />
            <PWARegistration />
            <AccessibilityEnhancements />
            <LazyLoadingPerformance />
            <CartNotification />
            <PreloadManager />
            <ToastContainer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </LoadingProvider>
  );
}

export default App; 