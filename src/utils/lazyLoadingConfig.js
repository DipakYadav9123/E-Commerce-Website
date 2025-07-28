// Lazy Loading Configuration and Optimizations

// Preloading strategies for better UX
export const preloadComponent = (importFn) => {
  return () => {
    const Component = importFn();
    // Preload the component in the background
    Component.then(() => {
      console.log('Component preloaded successfully');
    }).catch((error) => {
      console.error('Component preload failed:', error);
    });
    return Component;
  };
};

// Priority-based loading
export const HIGH_PRIORITY = 'high';
export const MEDIUM_PRIORITY = 'medium';
export const LOW_PRIORITY = 'low';

// Component loading priorities
export const componentPriorities = {
  Home: HIGH_PRIORITY,
  Products: HIGH_PRIORITY,
  ProductDetail: MEDIUM_PRIORITY,
  Cart: MEDIUM_PRIORITY,
  Offers: LOW_PRIORITY,
  Blog: LOW_PRIORITY,
  Contact: LOW_PRIORITY,
  NewsletterAdmin: LOW_PRIORITY,
  NotFound: LOW_PRIORITY
};

// Performance monitoring
export const lazyLoadMetrics = {
  startTime: null,
  endTime: null,
  componentName: null
};

export const startLazyLoadTimer = (componentName) => {
  lazyLoadMetrics.startTime = performance.now();
  lazyLoadMetrics.componentName = componentName;
};

export const endLazyLoadTimer = () => {
  if (lazyLoadMetrics.startTime) {
    lazyLoadMetrics.endTime = performance.now();
    const loadTime = lazyLoadMetrics.endTime - lazyLoadMetrics.startTime;
    
    console.log(`🚀 ${lazyLoadMetrics.componentName} loaded in ${loadTime.toFixed(2)}ms`);
    
    // Reset for next component
    lazyLoadMetrics.startTime = null;
    lazyLoadMetrics.endTime = null;
    lazyLoadMetrics.componentName = null;
  }
};

// Intersection Observer for smart preloading
export const createIntersectionObserver = (callback, options = {}) => {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
};

// Preload components when user hovers over navigation
export const preloadOnHover = (importFn, componentName) => {
  let hasPreloaded = false;
  
  return () => {
    if (!hasPreloaded) {
      hasPreloaded = true;
      startLazyLoadTimer(componentName);
      
      return importFn().then((module) => {
        endLazyLoadTimer();
        return module;
      });
    }
    return importFn();
  };
};

// Error boundary for lazy loading
export const lazyLoadErrorHandler = (error, errorInfo) => {
  console.error('Lazy loading error:', error, errorInfo);
  
  // Fallback to a simple loading state
  return {
    default: () => (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: '#666'
      }}>
        <p>Loading...</p>
        <p>If this persists, please refresh the page.</p>
      </div>
    )
  };
};

// Bundle size optimization
export const getBundleSize = async (importFn) => {
  try {
    const module = await importFn();
    // This is a rough estimation - in real apps you'd use webpack-bundle-analyzer
    console.log('Component loaded successfully');
    return 'estimated-size';
  } catch (error) {
    console.error('Bundle size check failed:', error);
    return 'unknown';
  }
};

// Network-aware loading
export const getNetworkSpeed = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt
    };
  }
  return null;
};

// Adaptive loading based on network speed
export const shouldPreload = () => {
  const networkInfo = getNetworkSpeed();
  
  if (!networkInfo) return true; // Default to preloading
  
  // Don't preload on slow connections
  if (networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g') {
    return false;
  }
  
  // Don't preload if RTT is high
  if (networkInfo.rtt > 200) {
    return false;
  }
  
  return true;
};

// Export default configuration
export default {
  preloadComponent,
  componentPriorities,
  startLazyLoadTimer,
  endLazyLoadTimer,
  createIntersectionObserver,
  preloadOnHover,
  lazyLoadErrorHandler,
  getBundleSize,
  getNetworkSpeed,
  shouldPreload
}; 