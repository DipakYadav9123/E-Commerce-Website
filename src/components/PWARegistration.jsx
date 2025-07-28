import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PWARegistration.css';

const PWARegistration = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      console.log('PWA was installed');
    };

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available
                showUpdateNotification();
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  const showUpdateNotification = () => {
    if (confirm('New version available! Reload to update?')) {
      window.location.reload();
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
      }
    }
  };

  const sendTestNotification = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Ayurveda Store', {
            body: 'Welcome to our store! Discover natural wellness products.',
            icon: '/pwa-icon-192.svg',
            badge: '/pwa-icon-192.svg',
            vibrate: [100, 50, 100],
            actions: [
              {
                action: 'explore',
                title: 'Explore Products'
              }
            ]
          });
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            navigator.serviceWorker.ready.then((registration) => {
              registration.showNotification('Ayurveda Store', {
                body: 'Welcome to our store! Discover natural wellness products.',
                icon: '/pwa-icon-192.svg',
                badge: '/pwa-icon-192.svg',
                vibrate: [100, 50, 100],
                actions: [
                  {
                    action: 'explore',
                    title: 'Explore Products'
                  }
                ]
              });
            });
          }
        });
      } else {
        alert('Notification permission is blocked. Please enable it in your browser settings.');
      }
    }
  };

  if (isInstalled) {
    return null; // Don't show anything if already installed
  }

  return (
    <>
      {/* Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            className="pwa-install-prompt"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="install-content">
              <div className="install-icon">📱</div>
              <div className="install-text">
                <h3>Install Ayurveda Store</h3>
                <p>Add to home screen for quick access</p>
              </div>
              <div className="install-actions">
                <motion.button
                  className="install-btn"
                  onClick={handleInstallClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Install
                </motion.button>
                <motion.button
                  className="dismiss-btn"
                  onClick={handleDismissInstall}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Later
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Message */}
      <AnimatePresence>
        {showOfflineMessage && (
          <motion.div
            className="offline-message"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="offline-content">
              <span className="offline-icon">📶</span>
              <span>You're offline. Some features may be limited.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Features (for testing) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="pwa-debug-panel">
          <h4>PWA Debug Panel</h4>
          <div className="debug-actions">
            <button onClick={requestNotificationPermission}>
              Request Notifications
            </button>
            <button onClick={sendTestNotification}>
              Send Test Notification
            </button>
            <button onClick={() => window.location.reload()}>
              Reload App
            </button>
          </div>
          <div className="debug-info">
            <p>Online: {isOnline ? 'Yes' : 'No'}</p>
            <p>Installed: {isInstalled ? 'Yes' : 'No'}</p>
            <p>Service Worker: {'serviceWorker' in navigator ? 'Supported' : 'Not Supported'}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PWARegistration; 