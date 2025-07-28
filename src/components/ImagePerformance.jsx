import React, { useState, useEffect } from 'react';

const ImagePerformance = () => {
  const [metrics, setMetrics] = useState({
    totalImages: 0,
    loadedImages: 0,
    failedImages: 0,
    averageLoadTime: 0,
    startTime: Date.now()
  });

  useEffect(() => {
    // Track image loading performance
    const trackImageLoad = () => {
      const images = document.querySelectorAll('img');
      let loaded = 0;
      let failed = 0;
      let totalLoadTime = 0;

      images.forEach(img => {
        if (img.complete) {
          loaded++;
          if (img.dataset.loadTime) {
            totalLoadTime += parseInt(img.dataset.loadTime);
          }
        } else {
          failed++;
        }
      });

      setMetrics(prev => ({
        ...prev,
        totalImages: images.length,
        loadedImages: loaded,
        failedImages: failed,
        averageLoadTime: loaded > 0 ? Math.round(totalLoadTime / loaded) : 0
      }));
    };

    // Monitor image loading
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource' && entry.name.includes('unsplash')) {
          const img = document.querySelector(`img[src="${entry.name}"]`);
          if (img) {
            img.dataset.loadTime = entry.duration;
          }
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });

    // Update metrics periodically
    const interval = setInterval(trackImageLoad, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <div>📊 Image Performance</div>
      <div>Total: {metrics.totalImages}</div>
      <div>Loaded: {metrics.loadedImages}</div>
      <div>Failed: {metrics.failedImages}</div>
      <div>Avg Load: {metrics.averageLoadTime}ms</div>
      <div>Uptime: {Math.round((Date.now() - metrics.startTime) / 1000)}s</div>
    </div>
  );
};

export default ImagePerformance; 