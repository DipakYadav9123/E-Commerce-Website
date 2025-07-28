// Simple Translation System for Hindi + English

const translations = {
  en: {
    // Navigation
    home: "Home",
    products: "Products",
    cart: "Cart",
    offers: "Offers",
    blog: "Blog",
    contact: "Contact",
    
    // Home Page
    heroTitle: "Discover Natural Healing",
    heroSubtitle: "Experience the power of authentic Ayurvedic remedies and organic herbal products for holistic wellness.",
    shopNow: "Shop Now",
    viewOffers: "View Offers",
    featuredProducts: "Featured Products",
    featuredSubtitle: "Our most popular Ayurvedic remedies and herbal products",
    viewAllProducts: "View All Products",
    
    // Product Details
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    quantity: "Quantity",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    unitsAvailable: "units available",
    description: "Description",
    ingredients: "Ingredients",
    benefits: "Benefits",
    usage: "Usage",
    reviews: "Reviews",
    video: "Video",
    watchVideo: "Watch Video",
    noVideoAvailable: "No video available for this product.",
    
    // Product Information
    weight: "Weight",
    origin: "Origin",
    organic: "Organic",
    storage: "Storage",
    expiry: "Expiry",
    healthBenefits: "Health Benefits",
    howToUse: "How to Use",
    importantWarnings: "Important Warnings",
    writeReview: "Write a Review",
    customerReviews: "Customer reviews will be displayed here.",
    
    // Cart
    shoppingCart: "Shopping Cart",
    cartEmpty: "Your cart is empty",
    continueShopping: "Continue Shopping",
    proceedToCheckout: "Proceed to Checkout",
    removeItem: "Remove Item",
    clearCart: "Clear Cart",
    applyCoupon: "Apply Coupon",
    couponCode: "Coupon Code",
    invalidCoupon: "Invalid coupon code",
    couponApplied: "Coupon applied successfully!",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    discount: "Discount",
    total: "Total",
    placeOrder: "Place Order",
    
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    
    // Footer
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    shippingInfo: "Shipping Information",
    returnPolicy: "Return Policy",
    contactUs: "Contact Us",
    newsletter: "Newsletter",
    subscribe: "Subscribe",
    emailPlaceholder: "Enter your email",
    
    // Language
    language: "Language",
    english: "English",
    hindi: "हिंदी",
    switchLanguage: "Switch Language",
    
    // Testimonials
    whatOurCustomersSay: "What Our Customers Say",
    testimonialsSubtitle: "Real experiences from our valued customers across India",
    productUsed: "Product Used",
    securePayment: "Secure Payment",
    freeShipping: "Free Shipping",
    qualityAssured: "Quality Assured",
    easyReturns: "Easy Returns"
  },
  
  hi: {
    // Navigation
    home: "होम",
    products: "उत्पाद",
    cart: "कार्ट",
    offers: "ऑफर्स",
    blog: "ब्लॉग",
    contact: "संपर्क",
    
    // Home Page
    heroTitle: "प्राकृतिक उपचार की खोज करें",
    heroSubtitle: "समग्र कल्याण के लिए प्रामाणिक आयुर्वेदिक उपचार और जैविक हर्बल उत्पादों की शक्ति का अनुभव करें।",
    shopNow: "अभी खरीदें",
    viewOffers: "ऑफर्स देखें",
    featuredProducts: "विशेष उत्पाद",
    featuredSubtitle: "हमारे सबसे लोकप्रिय आयुर्वेदिक उपचार और हर्बल उत्पाद",
    viewAllProducts: "सभी उत्पाद देखें",
    
    // Product Details
    addToCart: "कार्ट में जोड़ें",
    buyNow: "अभी खरीदें",
    quantity: "मात्रा",
    inStock: "स्टॉक में उपलब्ध",
    outOfStock: "स्टॉक में नहीं",
    unitsAvailable: "इकाइयां उपलब्ध",
    description: "विवरण",
    ingredients: "सामग्री",
    benefits: "लाभ",
    usage: "उपयोग",
    reviews: "समीक्षाएं",
    video: "वीडियो",
    watchVideo: "वीडियो देखें",
    noVideoAvailable: "इस उत्पाद के लिए कोई वीडियो उपलब्ध नहीं है।",
    
    // Product Information
    weight: "वजन",
    origin: "मूल",
    organic: "जैविक",
    storage: "भंडारण",
    expiry: "समाप्ति",
    healthBenefits: "स्वास्थ्य लाभ",
    howToUse: "कैसे उपयोग करें",
    importantWarnings: "महत्वपूर्ण चेतावनियां",
    writeReview: "समीक्षा लिखें",
    customerReviews: "ग्राहक समीक्षाएं यहां प्रदर्शित की जाएंगी।",
    
    // Cart
    shoppingCart: "शॉपिंग कार्ट",
    cartEmpty: "आपकी कार्ट खाली है",
    continueShopping: "खरीदारी जारी रखें",
    proceedToCheckout: "चेकआउट करें",
    removeItem: "आइटम हटाएं",
    clearCart: "कार्ट खाली करें",
    applyCoupon: "कूपन लागू करें",
    couponCode: "कूपन कोड",
    invalidCoupon: "अमान्य कूपन कोड",
    couponApplied: "कूपन सफलतापूर्वक लागू किया गया!",
    orderSummary: "ऑर्डर सारांश",
    subtotal: "उप-कुल",
    shipping: "शिपिंग",
    discount: "छूट",
    total: "कुल",
    placeOrder: "ऑर्डर दें",
    
    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    close: "बंद करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    yes: "हाँ",
    no: "नहीं",
    search: "खोजें",
    filter: "फ़िल्टर",
    sort: "क्रमबद्ध करें",
    
    // Footer
    aboutUs: "हमारे बारे में",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    shippingInfo: "शिपिंग जानकारी",
    returnPolicy: "वापसी नीति",
    contactUs: "संपर्क करें",
    newsletter: "न्यूज़लेटर",
    subscribe: "सदस्यता लें",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    
    // Language
    language: "भाषा",
    english: "English",
    hindi: "हिंदी",
    switchLanguage: "भाषा बदलें",
    
    // Testimonials
    whatOurCustomersSay: "हमारे ग्राहक क्या कहते हैं",
    testimonialsSubtitle: "भारत भर के हमारे मूल्यवान ग्राहकों के वास्तविक अनुभव",
    productUsed: "उपयोग किया गया उत्पाद",
    securePayment: "सुरक्षित भुगतान",
    freeShipping: "मुफ्त शिपिंग",
    qualityAssured: "गुणवत्ता की गारंटी",
    easyReturns: "आसान वापसी"
  }
};

// Language detection
const getDefaultLanguage = () => {
  const savedLang = localStorage.getItem('language');
  if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
    return savedLang;
  }
  
  // Detect browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('hi')) {
    return 'hi';
  }
  
  return 'en'; // Default to English
};

// Translation function
const t = (key, language = 'en') => {
  const lang = translations[language] || translations.en;
  return lang[key] || key;
};

// Language context
class LanguageManager {
  constructor() {
    this.currentLanguage = getDefaultLanguage();
    this.listeners = [];
  }

  getLanguage() {
    return this.currentLanguage;
  }

  setLanguage(language) {
    if (language === 'en' || language === 'hi') {
      this.currentLanguage = language;
      localStorage.setItem('language', language);
      this.notifyListeners();
    }
  }

  translate(key) {
    return t(key, this.currentLanguage);
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }
}

// Create global instance
const languageManager = new LanguageManager();

export { translations, t, languageManager, getDefaultLanguage }; 