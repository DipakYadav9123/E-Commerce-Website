import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  initializeAnalytics, 
  trackPageView, 
  trackUserVisit, 
  trackSessionTime,
  trackScrollDepth,
  trackTimeOnPage,
  sessionManager
} from '../utils/analytics';

const GoogleAnalytics = () => {
  const location = useLocation();
  const pageStartTime = useRef(Date.now());
  const scrollDepth = useRef(0);
  const maxScrollDepth = useRef(0);

  useEffect(() => {
    // Initialize Google Analytics
    initializeAnalytics();
    
    // Track initial user visit
    trackUserVisit('new');
  }, []);

  // Track page views when location changes
  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    trackPageView(pageTitle, location.pathname);
    
    // Reset page tracking
    pageStartTime.current = Date.now();
    scrollDepth.current = 0;
    maxScrollDepth.current = 0;
    
    // Track session time periodically
    const sessionInterval = setInterval(() => {
      trackSessionTime();
    }, 30000); // Track every 30 seconds

    return () => {
      clearInterval(sessionInterval);
      
      // Track time spent on page when leaving
      const timeSpent = Math.floor((Date.now() - pageStartTime.current) / 1000);
      if (timeSpent > 5) { // Only track if spent more than 5 seconds
        trackTimeOnPage(location.pathname, timeSpent);
      }
    };
  }, [location]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercent;
        
        // Track scroll depth at key milestones
        if (scrollPercent >= 25 && scrollDepth.current < 25) {
          trackScrollDepth(25);
          scrollDepth.current = 25;
        } else if (scrollPercent >= 50 && scrollDepth.current < 50) {
          trackScrollDepth(50);
          scrollDepth.current = 50;
        } else if (scrollPercent >= 75 && scrollDepth.current < 75) {
          trackScrollDepth(75);
          scrollDepth.current = 75;
        } else if (scrollPercent >= 90 && scrollDepth.current < 90) {
          trackScrollDepth(90);
          scrollDepth.current = 90;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track user engagement
  useEffect(() => {
    const handleUserActivity = () => {
      // Track user engagement after 10 seconds of inactivity
      setTimeout(() => {
        trackSessionTime();
      }, 10000);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, []);

  // Track page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, track session time
        trackSessionTime();
      } else {
        // Page is visible again, track user return
        trackUserVisit('returning');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Track before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionManager.endSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Helper function to get page title
  const getPageTitle = (pathname) => {
    const titles = {
      '/': 'AyurvedaHerbs - Home',
      '/products': 'AyurvedaHerbs - Products',
      '/cart': 'AyurvedaHerbs - Shopping Cart',
      '/contact': 'AyurvedaHerbs - Contact Us',
      '/blog': 'AyurvedaHerbs - Blog',
      '/offers': 'AyurvedaHerbs - Special Offers',
      '/coming-soon': 'AyurvedaHerbs - Coming Soon',
      '/admin': 'AyurvedaHerbs - Admin',
      '/checkout': 'AyurvedaHerbs - Checkout'
    };
    
    return titles[pathname] || 'AyurvedaHerbs';
  };

  // This component doesn't render anything
  return null;
};

export default GoogleAnalytics; 