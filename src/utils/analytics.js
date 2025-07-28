// Google Analytics v4 Integration
// Enhanced tracking for user visits, product views, and session time

// Initialize Google Analytics
export const initializeGA = () => {
  // Check if GA is already loaded
  if (typeof window !== 'undefined' && window.gtag) {
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
    page_title: 'AyurvedaHerbs - Home',
    page_location: window.location.href,
    send_page_view: true,
    custom_map: {
      'custom_parameter_1': 'product_category',
      'custom_parameter_2': 'product_id',
      'custom_parameter_3': 'session_duration',
      'custom_parameter_4': 'user_type'
    }
  });

  console.log('Google Analytics v4 initialized');
};

// Track page views
export const trackPageView = (pageTitle, pagePath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
      page_title: pageTitle,
      page_location: pagePath,
      send_page_view: true
    });
  }
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    gtag('event', eventName, {
      event_category: parameters.event_category || 'User Interaction',
      event_label: parameters.event_label || 'General',
      value: parameters.value,
      custom_parameter_1: parameters.product_category,
      custom_parameter_2: parameters.product_id,
      custom_parameter_3: parameters.session_duration,
      custom_parameter_4: parameters.user_type,
      ...parameters
    });
  }
};

// Track user visits and sessions
export const trackUserVisit = (userType = 'new') => {
  const sessionStart = sessionStorage.getItem('session_start');
  const currentTime = Date.now();
  
  if (!sessionStart) {
    sessionStorage.setItem('session_start', currentTime);
  }

  trackEvent('user_visit', {
    event_category: 'User Engagement',
    event_label: 'Page Visit',
    user_type: userType,
    session_duration: sessionStart ? Math.floor((currentTime - sessionStart) / 1000) : 0
  });
};

// Track session time
export const trackSessionTime = () => {
  const sessionStart = sessionStorage.getItem('session_start');
  if (sessionStart) {
    const sessionDuration = Math.floor((Date.now() - sessionStart) / 1000);
    
    trackEvent('session_duration', {
      event_category: 'User Engagement',
      event_label: 'Session Time',
      value: sessionDuration,
      session_duration: sessionDuration
    });
  }
};

// Track product views with enhanced data
export const trackProductView = (productId, productName, category, price) => {
  trackEvent('view_item', {
    event_category: 'E-commerce',
    event_label: 'Product View',
    product_id: productId,
    product_name: productName,
    product_category: category,
    value: price,
    currency: 'INR',
    items: [{
      item_id: productId,
      item_name: productName,
      item_category: category,
      price: price,
      currency: 'INR'
    }]
  });

  // Track most viewed products
  trackEvent('product_view', {
    event_category: 'Product Analytics',
    event_label: 'Product View',
    product_id: productId,
    product_name: productName,
    product_category: category,
    value: price
  });
};

// Track add to cart events
export const trackAddToCart = (productId, productName, category, price, quantity = 1) => {
  trackEvent('add_to_cart', {
    event_category: 'E-commerce',
    event_label: 'Add to Cart',
    product_id: productId,
    product_name: productName,
    product_category: category,
    value: price * quantity,
    currency: 'INR',
    quantity: quantity,
    items: [{
      item_id: productId,
      item_name: productName,
      item_category: category,
      price: price,
      quantity: quantity,
      currency: 'INR'
    }]
  });
};

// Track purchase events
export const trackPurchase = (transactionId, totalValue, items = []) => {
  trackEvent('purchase', {
    event_category: 'E-commerce',
    event_label: 'Purchase',
    transaction_id: transactionId,
    value: totalValue,
    currency: 'INR',
    tax: 0,
    shipping: 0,
    items: items
  });
};

// Track form submissions
export const trackFormSubmission = (formName, formType) => {
  trackEvent('form_submit', {
    event_category: 'User Engagement',
    event_label: 'Form Submission',
    form_name: formName,
    form_type: formType
  });
};

// Track form submit (alias for trackFormSubmission)
export const trackFormSubmit = (formName, formType) => {
  trackFormSubmission(formName, formType);
};

// Track button clicks
export const trackButtonClick = (buttonName, buttonLocation) => {
  trackEvent('button_click', {
    event_category: 'User Interaction',
    event_label: 'Button Click',
    button_name: buttonName,
    button_location: buttonLocation
  });
};

// Track search queries
export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent('search', {
    event_category: 'User Engagement',
    event_label: 'Search',
    search_term: searchTerm,
    results_count: resultsCount
  });
};

// Track newsletter signups
export const trackNewsletterSignup = (email) => {
  trackEvent('newsletter_signup', {
    event_category: 'User Engagement',
    event_label: 'Newsletter Signup',
    email_domain: email.split('@')[1]
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (productId = null) => {
  trackEvent('whatsapp_click', {
    event_category: 'User Engagement',
    event_label: 'WhatsApp Contact',
    product_id: productId
  });
};

// Track resume download
export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    event_category: 'User Engagement',
    event_label: 'Resume Download'
  });
};

// Track resume view online
export const trackResumeViewOnline = () => {
  trackEvent('resume_view_online', {
    event_category: 'User Engagement',
    event_label: 'Resume View Online'
  });
};

// Track resume contact
export const trackResumeContact = () => {
  trackEvent('resume_contact', {
    event_category: 'User Engagement',
    event_label: 'Resume Contact'
  });
};

// Track theme toggle
export const trackThemeToggle = (theme) => {
  trackEvent('theme_toggle', {
    event_category: 'User Preference',
    event_label: 'Theme Change',
    theme: theme
  });
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  trackEvent('scroll_depth', {
    event_category: 'User Engagement',
    event_label: 'Scroll Depth',
    value: depth
  });
};

// Track time on page
export const trackTimeOnPage = (pagePath, timeSpent) => {
  trackEvent('time_on_page', {
    event_category: 'User Engagement',
    event_label: 'Time on Page',
    page_path: pagePath,
    value: timeSpent
  });
};

// Track errors
export const trackError = (errorType, errorMessage) => {
  trackEvent('error', {
    event_category: 'Error Tracking',
    event_label: 'Error Occurred',
    error_type: errorType,
    error_message: errorMessage
  });
};

// Track consent management
export const trackConsent = (consentType, consentValue) => {
  trackEvent('consent', {
    event_category: 'Privacy',
    event_label: 'Consent Management',
    consent_type: consentType,
    consent_value: consentValue
  });
};

// Enhanced product analytics
export const trackProductAnalytics = {
  // Track product category views
  trackCategoryView: (categoryName) => {
    trackEvent('category_view', {
      event_category: 'Product Analytics',
      event_label: 'Category View',
      category_name: categoryName
    });
  },

  // Track product comparison
  trackProductComparison: (productIds) => {
    trackEvent('product_comparison', {
      event_category: 'Product Analytics',
      event_label: 'Product Comparison',
      product_ids: productIds.join(',')
    });
  },

  // Track wishlist additions
  trackWishlistAdd: (productId, productName) => {
    trackEvent('wishlist_add', {
      event_category: 'Product Analytics',
      event_label: 'Wishlist Add',
      product_id: productId,
      product_name: productName
    });
  },

  // Track product reviews
  trackProductReview: (productId, rating, reviewLength) => {
    trackEvent('product_review', {
      event_category: 'Product Analytics',
      event_label: 'Product Review',
      product_id: productId,
      rating: rating,
      review_length: reviewLength
    });
  }
};

// Enhanced user analytics
export const trackUserAnalytics = {
  // Track user registration
  trackRegistration: (registrationMethod) => {
    trackEvent('user_registration', {
      event_category: 'User Analytics',
      event_label: 'User Registration',
      registration_method: registrationMethod
    });
  },

  // Track login events
  trackLogin: (loginMethod) => {
    trackEvent('user_login', {
      event_category: 'User Analytics',
      event_label: 'User Login',
      login_method: loginMethod
    });
  },

  // Track user preferences
  trackUserPreference: (preferenceType, preferenceValue) => {
    trackEvent('user_preference', {
      event_category: 'User Analytics',
      event_label: 'User Preference',
      preference_type: preferenceType,
      preference_value: preferenceValue
    });
  }
};

// Enhanced e-commerce analytics
export const trackEcommerceAnalytics = {
  // Track cart abandonment
  trackCartAbandonment: (cartValue, itemCount) => {
    trackEvent('cart_abandonment', {
      event_category: 'E-commerce Analytics',
      event_label: 'Cart Abandonment',
      value: cartValue,
      item_count: itemCount
    });
  },

  // Track checkout steps
  trackCheckoutStep: (stepNumber, stepName) => {
    trackEvent('checkout_step', {
      event_category: 'E-commerce Analytics',
      event_label: 'Checkout Step',
      step_number: stepNumber,
      step_name: stepName
    });
  },

  // Track payment method selection
  trackPaymentMethod: (paymentMethod) => {
    trackEvent('payment_method', {
      event_category: 'E-commerce Analytics',
      event_label: 'Payment Method',
      payment_method: paymentMethod
    });
  },

  // Track coupon usage
  trackCouponUsage: (couponCode, discountAmount) => {
    trackEvent('coupon_usage', {
      event_category: 'E-commerce Analytics',
      event_label: 'Coupon Usage',
      coupon_code: couponCode,
      discount_amount: discountAmount
    });
  }
};

// Session management
export const sessionManager = {
  // Start session tracking
  startSession: () => {
    const sessionId = Date.now().toString();
    sessionStorage.setItem('ga_session_id', sessionId);
    sessionStorage.setItem('session_start', Date.now().toString());
    
    trackEvent('session_start', {
      event_category: 'Session Analytics',
      event_label: 'Session Start',
      session_id: sessionId
    });
  },

  // End session tracking
  endSession: () => {
    const sessionStart = sessionStorage.getItem('session_start');
    const sessionId = sessionStorage.getItem('ga_session_id');
    
    if (sessionStart) {
      const sessionDuration = Math.floor((Date.now() - parseInt(sessionStart)) / 1000);
      
      trackEvent('session_end', {
        event_category: 'Session Analytics',
        event_label: 'Session End',
        session_id: sessionId,
        session_duration: sessionDuration
      });
    }
  },

  // Get session duration
  getSessionDuration: () => {
    const sessionStart = sessionStorage.getItem('session_start');
    if (sessionStart) {
      return Math.floor((Date.now() - parseInt(sessionStart)) / 1000);
    }
    return 0;
  }
};

// Initialize analytics when the app loads
export const initializeAnalytics = () => {
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    initializeGA();
    sessionManager.startSession();
    
    // Track initial page view
    trackPageView('AyurvedaHerbs - Home', window.location.pathname);
    
    // Set up session end tracking
    window.addEventListener('beforeunload', () => {
      sessionManager.endSession();
    });
  }
};

// Export all tracking functions
export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackUserVisit,
  trackSessionTime,
  trackProductView,
  trackAddToCart,
  trackPurchase,
  trackFormSubmission,
  trackButtonClick,
  trackSearch,
  trackNewsletterSignup,
  trackWhatsAppClick,
  trackThemeToggle,
  trackScrollDepth,
  trackTimeOnPage,
  trackError,
  trackConsent,
  trackProductAnalytics,
  trackUserAnalytics,
  trackEcommerceAnalytics,
  sessionManager
}; 