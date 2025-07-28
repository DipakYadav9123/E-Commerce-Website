import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button after scrolling 300px
      setIsVisible(scrolled > 300);
      
      // Calculate scroll progress
      const progress = Math.min((scrolled / (documentHeight - windowHeight)) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const progressVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="scroll-to-top-container"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          onClick={scrollToTop}
        >
          {/* Progress Circle */}
          <motion.div 
            className="progress-circle"
            variants={progressVariants}
            initial="hidden"
            animate="visible"
          >
            <svg className="progress-svg" viewBox="0 0 36 36">
              <path
                className="progress-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="progress-fill"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{
                  strokeDasharray: `${scrollProgress}, 100`
                }}
              />
            </svg>
          </motion.div>

          {/* Arrow Icon */}
          <motion.div 
            className="arrow-icon"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ↑
          </motion.div>

          {/* Tooltip */}
          <motion.div 
            className="tooltip"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            Back to Top
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton; 