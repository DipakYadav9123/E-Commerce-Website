import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { showThemeToast } from './CustomToast';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isSystemTheme, setIsSystemTheme] = useState(false);

  // Function to get system theme preference
  const getSystemTheme = useCallback(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // Function to apply theme
  const applyTheme = useCallback((theme) => {
    const isDarkTheme = theme === 'dark';
    setIsDark(isDarkTheme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, []);

  // Function to apply system theme
  const applySystemTheme = useCallback(() => {
    const systemIsDark = getSystemTheme();
    applyTheme(systemIsDark ? 'dark' : 'light');
    setIsSystemTheme(true);
  }, [getSystemTheme, applyTheme]);

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedSystemTheme = localStorage.getItem('system-theme');
    
    if (savedTheme && savedSystemTheme !== 'true') {
      // User has manually set a theme
      applyTheme(savedTheme);
      setIsSystemTheme(false);
    } else {
      // Use system preference
      applySystemTheme();
    }
  }, [applyTheme, applySystemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      if (isSystemTheme) {
        // Only update if user hasn't manually set a theme
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [isSystemTheme, applyTheme]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    setIsSystemTheme(false);
    localStorage.setItem('system-theme', 'false');
    showThemeToast(newTheme);
  };

  const toggleSystemTheme = () => {
    if (isSystemTheme) {
      // Switch to manual mode
      const currentTheme = isDark ? 'dark' : 'light';
      applyTheme(currentTheme);
      setIsSystemTheme(false);
      localStorage.setItem('system-theme', 'false');
      showThemeToast(currentTheme);
    } else {
      // Switch to system mode
      applySystemTheme();
      localStorage.setItem('system-theme', 'true');
      showThemeToast('system');
    }
  };

  // Animation variants
  const toggleVariants = {
    light: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    dark: {
      rotate: 180,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hover: {
      scale: 1.05,
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

  return (
    <motion.div
      className="theme-toggle-container"
      variants={containerVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {/* System Theme Indicator */}
      {isSystemTheme && (
        <motion.div
          className="system-theme-indicator"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <span className="system-icon">🖥️</span>
        </motion.div>
      )}
      
      <motion.button
        className="theme-toggle"
        onClick={toggleTheme}
        variants={toggleVariants}
        animate={isDark ? 'dark' : 'light'}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          className="toggle-icon"
          variants={iconVariants}
          initial="hidden"
          animate="visible"
        >
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              ☀️
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
            >
              🌙
            </motion.span>
          )}
        </motion.div>
        
        <motion.div
          className="toggle-track"
          animate={{
            backgroundColor: isDark ? '#4a5568' : '#e2e8f0'
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="toggle-thumb"
            animate={{
              x: isDark ? 20 : 0,
              backgroundColor: isDark ? '#2d3748' : '#ffffff'
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </motion.div>
      </motion.button>
      
      {/* System Theme Toggle */}
      <motion.button
        className="system-theme-toggle"
        onClick={toggleSystemTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isSystemTheme ? "Switch to manual mode" : "Follow system theme"}
      >
        <span className="system-toggle-icon">
          {isSystemTheme ? "🔄" : "🖥️"}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default ThemeToggle; 