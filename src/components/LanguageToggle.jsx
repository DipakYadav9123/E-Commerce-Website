import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { languageManager } from '../utils/translations';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState(languageManager.getLanguage());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleLanguageChange = (newLanguage) => {
      setCurrentLanguage(newLanguage);
    };

    languageManager.addListener(handleLanguageChange);
    return () => languageManager.removeListener(handleLanguageChange);
  }, []);

  const handleLanguageSwitch = (language) => {
    languageManager.setLanguage(language);
    setIsOpen(false);
  };

  const getLanguageDisplay = (lang) => {
    return lang === 'en' ? '🇺🇸 EN' : '🇮🇳 हिंदी';
  };

  const getCurrentLanguageDisplay = () => {
    return currentLanguage === 'en' ? '🇺🇸 EN' : '🇮🇳 हिंदी';
  };

  return (
    <div className="language-toggle-container">
      <motion.button
        className="language-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch language"
      >
        <span className="language-icon">
          {currentLanguage === 'en' ? '🇺🇸' : '🇮🇳'}
        </span>
        <span className="language-text">
          {currentLanguage === 'en' ? 'EN' : 'हिंदी'}
        </span>
        <motion.span 
          className="dropdown-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="language-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className={`language-option ${currentLanguage === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageSwitch('en')}
              whileHover={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flag">🇺🇸</span>
              <span className="language-name">English</span>
              {currentLanguage === 'en' && (
                <motion.span 
                  className="checkmark"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>

            <motion.button
              className={`language-option ${currentLanguage === 'hi' ? 'active' : ''}`}
              onClick={() => handleLanguageSwitch('hi')}
              whileHover={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flag">🇮🇳</span>
              <span className="language-name">हिंदी</span>
              {currentLanguage === 'hi' && (
                <motion.span 
                  className="checkmark"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown when clicking outside */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="language-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggle; 