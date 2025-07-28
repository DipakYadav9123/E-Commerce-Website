import React, { useEffect } from 'react';
import './AccessibilityEnhancements.css';

const AccessibilityEnhancements = () => {
  // Skip to main content functionality
  useEffect(() => {
    const handleSkipToMain = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const skipLink = document.getElementById('skip-to-main');
    if (skipLink) {
      skipLink.addEventListener('keydown', handleSkipToMain);
    }

    return () => {
      if (skipLink) {
        skipLink.removeEventListener('keydown', handleSkipToMain);
      }
    };
  }, []);

  // Focus management for modals and overlays
  useEffect(() => {
    const handleTabKey = (event) => {
      if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Add focus trap for modals
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => {
      modal.addEventListener('keydown', handleTabKey);
    });

    return () => {
      modals.forEach(modal => {
        modal.removeEventListener('keydown', handleTabKey);
      });
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default AccessibilityEnhancements; 