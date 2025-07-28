import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getNetworkSpeed } from '../utils/lazyLoadingConfig';
import './LazyLoadingSpinner.css';

const LazyLoadingSpinner = () => {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  useEffect(() => {
    // Get network information
    const network = getNetworkSpeed();
    setNetworkInfo(network);

    // Set appropriate loading message based on network speed
    if (network) {
      if (network.effectiveType === 'slow-2g' || network.effectiveType === '2g') {
        setLoadingMessage('Loading (slow connection detected)...');
      } else if (network.effectiveType === '3g') {
        setLoadingMessage('Loading (moderate connection)...');
      } else {
        setLoadingMessage('Loading...');
      }
    }

    // Update network info when connection changes
    if ('connection' in navigator) {
      const handleConnectionChange = () => {
        setNetworkInfo(getNetworkSpeed());
      };

      navigator.connection.addEventListener('change', handleConnectionChange);
      return () => {
        navigator.connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, []);

  return (
    <motion.div 
      className="lazy-loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="lazy-loading-content">
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: networkInfo?.effectiveType === 'slow-2g' ? 2.5 : 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </motion.div>
        
        <motion.h3 
          className="loading-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {loadingMessage}
        </motion.h3>
        
        <motion.p 
          className="loading-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {networkInfo ? (
            <>
              Connection: {networkInfo.effectiveType} 
              {networkInfo.downlink && ` • ${networkInfo.downlink} Mbps`}
              {networkInfo.rtt && ` • ${networkInfo.rtt}ms RTT`}
            </>
          ) : (
            'Preparing your experience'
          )}
        </motion.p>
        
        <motion.div 
          className="loading-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.span 
            className="dot"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: networkInfo?.effectiveType === 'slow-2g' ? 2.5 : 1.5, 
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.span 
            className="dot"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: networkInfo?.effectiveType === 'slow-2g' ? 2.5 : 1.5, 
              repeat: Infinity,
              delay: 0.2
            }}
          />
          <motion.span 
            className="dot"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: networkInfo?.effectiveType === 'slow-2g' ? 2.5 : 1.5, 
              repeat: Infinity,
              delay: 0.4
            }}
          />
        </motion.div>
        
        <motion.div 
          className="loading-progress"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: networkInfo?.effectiveType === 'slow-2g' ? 4 : 2, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Network speed indicator */}
        {networkInfo && (
          <motion.div 
            className="network-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className={`network-badge ${networkInfo.effectiveType}`}>
              {networkInfo.effectiveType.toUpperCase()}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LazyLoadingSpinner; 