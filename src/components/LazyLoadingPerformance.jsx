import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { lazyLoadMetrics, getNetworkSpeed } from '../utils/lazyLoadingConfig';
import './LazyLoadingPerformance.css';

const LazyLoadingPerformance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    totalLoads: 0,
    averageLoadTime: 0,
    fastestLoad: Infinity,
    slowestLoad: 0,
    networkInfo: null
  });

  useEffect(() => {
    // Show performance panel in development mode
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    // Get network information
    const networkInfo = getNetworkSpeed();
    setMetrics(prev => ({ ...prev, networkInfo }));

    // Monitor lazy loading metrics
    const updateMetrics = () => {
      if (lazyLoadMetrics.startTime && lazyLoadMetrics.endTime) {
        const loadTime = lazyLoadMetrics.endTime - lazyLoadMetrics.startTime;
        
        setMetrics(prev => ({
          ...prev,
          totalLoads: prev.totalLoads + 1,
          averageLoadTime: (prev.averageLoadTime * prev.totalLoads + loadTime) / (prev.totalLoads + 1),
          fastestLoad: Math.min(prev.fastestLoad, loadTime),
          slowestLoad: Math.max(prev.slowestLoad, loadTime)
        }));
      }
    };

    // Check for updates every second
    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="performance-panel"
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="performance-header">
        <h4>🚀 Performance Monitor</h4>
        <button 
          className="close-btn"
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
      </div>
      
      <div className="performance-content">
        <div className="metric">
          <span className="metric-label">Total Loads:</span>
          <span className="metric-value">{metrics.totalLoads}</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Avg Load Time:</span>
          <span className="metric-value">
            {metrics.averageLoadTime > 0 ? `${metrics.averageLoadTime.toFixed(2)}ms` : 'N/A'}
          </span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Fastest Load:</span>
          <span className="metric-value">
            {metrics.fastestLoad !== Infinity ? `${metrics.fastestLoad.toFixed(2)}ms` : 'N/A'}
          </span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Slowest Load:</span>
          <span className="metric-value">
            {metrics.slowestLoad > 0 ? `${metrics.slowestLoad.toFixed(2)}ms` : 'N/A'}
          </span>
        </div>
        
        {metrics.networkInfo && (
          <div className="metric">
            <span className="metric-label">Network:</span>
            <span className="metric-value">
              {metrics.networkInfo.effectiveType.toUpperCase()}
              {metrics.networkInfo.downlink && ` (${metrics.networkInfo.downlink} Mbps)`}
            </span>
          </div>
        )}
        
        <div className="metric">
          <span className="metric-label">RTT:</span>
          <span className="metric-value">
            {metrics.networkInfo?.rtt ? `${metrics.networkInfo.rtt}ms` : 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="performance-footer">
        <small>Development Mode Only</small>
      </div>
    </motion.div>
  );
};

export default LazyLoadingPerformance; 