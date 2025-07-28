import React, { useEffect, useRef } from 'react';
import { preloadOnHover, shouldPreload } from '../utils/lazyLoadingConfig';

const PreloadManager = () => {
  const preloadedComponents = useRef(new Set());

  useEffect(() => {
    // Only preload if network conditions allow
    if (!shouldPreload()) {
      return;
    }

    // Preload high-priority components on page load
    const preloadHighPriority = async () => {
      try {
        // Preload Products page (high priority)
        if (!preloadedComponents.current.has('Products')) {
          const ProductsModule = await import('./Products');
          preloadedComponents.current.add('Products');
          console.log('🚀 Preloaded Products component');
        }
      } catch (error) {
        console.warn('Failed to preload Products:', error);
      }
    };

    // Preload after a short delay to not block initial render
    const timer = setTimeout(preloadHighPriority, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Preload components on navigation hover
  const handleNavHover = async (componentName) => {
    if (preloadedComponents.current.has(componentName) || !shouldPreload()) {
      return;
    }

    try {
      switch (componentName) {
        case 'Products':
          await import('./Products');
          break;
        case 'Cart':
          await import('./Cart');
          break;
        case 'Offers':
          await import('./Offers');
          break;
        case 'Blog':
          await import('./Blog');
          break;
        case 'Contact':
          await import('./Contact');
          break;
        default:
          return;
      }
      
      preloadedComponents.current.add(componentName);
      console.log(`🚀 Preloaded ${componentName} component`);
    } catch (error) {
      console.warn(`Failed to preload ${componentName}:`, error);
    }
  };

  // Add hover listeners to navigation links
  useEffect(() => {
    const navLinks = document.querySelectorAll('a[href]');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (href === '/products') {
        link.addEventListener('mouseenter', () => handleNavHover('Products'));
      } else if (href === '/cart') {
        link.addEventListener('mouseenter', () => handleNavHover('Cart'));
      } else if (href === '/offers') {
        link.addEventListener('mouseenter', () => handleNavHover('Offers'));
      } else if (href === '/blog') {
        link.addEventListener('mouseenter', () => handleNavHover('Blog'));
      } else if (href === '/contact') {
        link.addEventListener('mouseenter', () => handleNavHover('Contact'));
      }
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('mouseenter', () => {});
      });
    };
  }, []);

  // Intersection Observer for preloading components when they come into view
  useEffect(() => {
    if (!shouldPreload()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const componentName = entry.target.dataset.component;
            if (componentName && !preloadedComponents.current.has(componentName)) {
              handleNavHover(componentName);
            }
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    // Observe navigation elements
    const navElements = document.querySelectorAll('[data-component]');
    navElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
};

export default PreloadManager; 