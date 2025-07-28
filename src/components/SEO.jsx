import React, { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  image = '/favicon.ico',
  url = '',
  type = 'website',
  article = false,
  publishedTime = '',
  modifiedTime = '',
  author = 'Ayurveda Herbal Store',
  section = '',
  tags = []
}) => {
  const siteName = 'Ayurveda Herbal Store';
  const siteUrl = 'https://ayurvedaherbalstore.com';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || 'Discover authentic Ayurvedic and herbal products for natural wellness. Premium quality organic supplements, skincare, and wellness products.';
  const fullKeywords = keywords.join(', ') || 'ayurveda, herbal, natural, wellness, organic, supplements, skincare, health, traditional medicine, holistic healing';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = fullDescription;
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = fullKeywords;
    
    // Update Open Graph tags
    const ogTags = {
      'og:title': fullTitle,
      'og:description': fullDescription,
      'og:image': fullImage,
      'og:url': fullUrl,
      'og:type': article ? 'article' : type,
      'og:site_name': siteName,
      'og:locale': 'en_US'
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
    
    // Update Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': fullDescription,
      'twitter:image': fullImage,
      'twitter:site': '@ayurvedaherbalstore',
      'twitter:creator': '@ayurvedaherbalstore'
    };
    
    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (url && !canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (canonical && url) {
      canonical.href = url;
    }
    
    // Update theme color
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      document.head.appendChild(themeColor);
    }
    themeColor.content = '#8B4513';
    
    // Cleanup function
    return () => {
      // Optional: Reset title when component unmounts
      // document.title = siteName;
    };
  }, [fullTitle, fullDescription, fullKeywords, fullUrl, fullImage, article, type, url]);

  // Return null since we're not using react-helmet anymore
  return null;
};

export default SEO; 