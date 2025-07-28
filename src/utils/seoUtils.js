// SEO Utility Functions for Ayurveda Herbal Store

// Default SEO configuration
export const defaultSEOConfig = {
  siteName: 'Ayurveda Herbal Store',
  siteUrl: 'https://ayurvedaherbalstore.com',
  defaultDescription: 'Discover authentic Ayurvedic and herbal products for natural wellness. Premium quality organic supplements, skincare, and wellness products.',
  defaultKeywords: ['ayurveda', 'herbal', 'natural', 'wellness', 'organic', 'supplements', 'skincare', 'health', 'traditional medicine', 'holistic healing'],
  defaultImage: '/favicon.ico',
  twitterHandle: '@ayurvedaherbalstore',
  facebookPage: 'https://facebook.com/ayurvedaherbalstore',
  instagramPage: 'https://instagram.com/ayurvedaherbalstore'
};

// Generate page-specific SEO data
export const generatePageSEO = (pageType, data = {}) => {
  const config = defaultSEOConfig;
  
  switch (pageType) {
    case 'home':
      return {
        title: 'Ayurveda Herbal Store - Natural Healing Products',
        description: 'Discover authentic Ayurvedic remedies and natural healing products. Shop for turmeric, neem, ashwagandha and more organic herbs. Premium quality organic supplements, skincare, and wellness products for holistic health.',
        keywords: ['ayurveda', 'herbal products', 'natural healing', 'turmeric', 'neem', 'ashwagandha', 'organic supplements', 'wellness', 'holistic health', 'traditional medicine'],
        url: '/',
        image: '/hero-image.jpg',
        type: 'website'
      };
      
    case 'products':
      return {
        title: 'Our Products - Ayurvedic Herbal Remedies',
        description: 'Explore our comprehensive collection of authentic Ayurvedic products, herbal supplements, and natural remedies for holistic wellness. Shop organic herbs, supplements, skincare, and wellness products.',
        keywords: ['ayurvedic products', 'herbal supplements', 'natural remedies', 'organic herbs', 'wellness products', 'ashwagandha', 'turmeric', 'neem', 'tulsi', 'triphala', 'dosha balance'],
        url: '/products',
        image: '/products-banner.jpg',
        type: 'website'
      };
      
    case 'product-detail':
      return {
        title: `${data.name} - Ayurveda Herbal Store`,
        description: data.shortDescription || data.description || 'Premium quality Ayurvedic product for natural wellness and holistic health.',
        keywords: [
          data.name?.toLowerCase(),
          'ayurvedic',
          'herbal',
          'natural',
          'organic',
          data.category?.toLowerCase(),
          ...defaultSEOConfig.defaultKeywords
        ].filter(Boolean),
        url: `/products/${data.id}`,
        image: data.images?.[0] || '/product-default.jpg',
        type: 'product'
      };
      
    case 'blog':
      return {
        title: 'Blog - Ayurvedic Wisdom & Wellness Tips',
        description: 'Discover Ayurvedic wisdom and wellness tips through our expert blog. Learn about natural remedies, holistic health practices, traditional healing methods, and dosha balance.',
        keywords: ['ayurvedic blog', 'wellness tips', 'natural remedies', 'holistic health', 'ayurveda wisdom', 'traditional healing', 'dosha balance', 'herbal medicine', 'meditation', 'detoxification'],
        url: '/blog',
        image: '/blog-banner.jpg',
        type: 'website',
        article: false
      };
      
    case 'blog-post':
      return {
        title: `${data.title} - Ayurveda Herbal Store Blog`,
        description: data.intro || data.description || 'Discover Ayurvedic wisdom and natural healing practices.',
        keywords: [
          data.title?.toLowerCase(),
          'ayurvedic blog',
          'wellness',
          'natural healing',
          data.category?.toLowerCase(),
          ...defaultSEOConfig.defaultKeywords
        ].filter(Boolean),
        url: `/blog/${data.id}`,
        image: data.image || '/blog-default.jpg',
        type: 'article',
        article: true,
        publishedTime: data.date,
        author: data.author,
        section: data.category
      };
      
    case 'contact':
      return {
        title: 'Contact Us - Ayurvedic Experts & Customer Support',
        description: 'Get in touch with our Ayurvedic experts for product inquiries, wellness consultations, or customer support. We\'re here to help with your natural health journey and provide personalized guidance.',
        keywords: ['contact ayurveda', 'herbal consultation', 'wellness support', 'ayurvedic experts', 'customer service', 'natural health help', 'product inquiries', 'wellness advice'],
        url: '/contact',
        image: '/contact-banner.jpg',
        type: 'website'
      };
      
    case 'cart':
      return {
        title: 'Shopping Cart - Ayurveda Herbal Store',
        description: 'Review your cart items and proceed to secure checkout. Shop authentic Ayurvedic products, herbal supplements, and natural remedies with confidence.',
        keywords: ['shopping cart', 'checkout', 'ayurvedic products', 'herbal supplements', 'secure shopping', 'natural remedies', 'organic herbs'],
        url: '/cart',
        image: '/cart-banner.jpg',
        type: 'website'
      };
      
    case 'offers':
      return {
        title: 'Special Offers - Ayurvedic Products & Discounts',
        description: 'Discover exclusive offers and discounts on authentic Ayurvedic products. Save on herbal supplements, natural remedies, and wellness products.',
        keywords: ['ayurvedic offers', 'herbal discounts', 'natural products sale', 'wellness deals', 'organic supplements', 'special offers'],
        url: '/offers',
        image: '/offers-banner.jpg',
        type: 'website'
      };
      
    case '404':
      return {
        title: 'Page Not Found - 404 Error',
        description: 'The page you\'re looking for doesn\'t exist. Browse our Ayurvedic products, wellness blog, or contact us for assistance. Find natural healing products and herbal remedies.',
        keywords: ['page not found', '404 error', 'ayurveda store', 'herbal products', 'natural healing', 'wellness blog'],
        url: '/404',
        image: '/404-banner.jpg',
        type: 'website'
      };
      
    default:
      return {
        title: config.siteName,
        description: config.defaultDescription,
        keywords: config.defaultKeywords,
        url: '/',
        image: config.defaultImage,
        type: 'website'
      };
  }
};

// Generate structured data for different page types
export const generateStructuredData = (pageType, data = {}) => {
  const config = defaultSEOConfig;
  
  switch (pageType) {
    case 'organization':
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": config.siteName,
        "description": config.defaultDescription,
        "url": config.siteUrl,
        "logo": `${config.siteUrl}/logo.png`,
        "sameAs": [
          config.facebookPage,
          config.instagramPage,
          `https://twitter.com/${config.twitterHandle.replace('@', '')}`
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9876543210",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": "English, Hindi"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Ayurveda Street",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400001",
          "addressCountry": "IN"
        }
      };
      
    case 'product':
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.name,
        "description": data.description,
        "image": data.images?.[0] || `${config.siteUrl}/product-default.jpg`,
        "brand": {
          "@type": "Brand",
          "name": config.siteName
        },
        "offers": {
          "@type": "Offer",
          "price": data.price?.replace('$', ''),
          "priceCurrency": "USD",
          "availability": data.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": config.siteName
          }
        },
        "aggregateRating": data.rating ? {
          "@type": "AggregateRating",
          "ratingValue": data.rating,
          "reviewCount": data.reviewCount || 0
        } : undefined
      };
      
    case 'article':
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.description,
        "image": data.image || `${config.siteUrl}/blog-default.jpg`,
        "author": {
          "@type": "Person",
          "name": data.author
        },
        "publisher": {
          "@type": "Organization",
          "name": config.siteName,
          "logo": {
            "@type": "ImageObject",
            "url": `${config.siteUrl}/logo.png`
          }
        },
        "datePublished": data.publishedTime,
        "dateModified": data.modifiedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${config.siteUrl}${data.url}`
        }
      };
      
    default:
      return null;
  }
};

// Generate breadcrumb structured data
export const generateBreadcrumbData = (breadcrumbs) => {
  const config = defaultSEOConfig;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${config.siteUrl}${crumb.url}`
    }))
  };
};

// Generate FAQ structured data
export const generateFAQData = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate review structured data
export const generateReviewData = (reviews) => {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Product"
    },
    "ratingValue": reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    "reviewCount": reviews.length,
    "review": reviews.map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewBody": review.text
    }))
  };
};

// Utility function to clean and format keywords
export const formatKeywords = (keywords) => {
  if (Array.isArray(keywords)) {
    return keywords
      .filter(Boolean)
      .map(keyword => keyword.toLowerCase().trim())
      .join(', ');
  }
  return keywords || '';
};

// Utility function to truncate description
export const truncateDescription = (description, maxLength = 160) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
};

// Utility function to generate canonical URL
export const generateCanonicalUrl = (path) => {
  const config = defaultSEOConfig;
  return `${config.siteUrl}${path}`;
}; 