import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const navigate = useNavigate();

  // Admin password (you can change this)
  const ADMIN_PASSWORD = 'admin123';

  // Launch date (set this to your desired launch date)
  const launchDate = new Date('2024-12-31T00:00:00').getTime();

  useEffect(() => {
    // Check if user is already in admin mode
    const adminMode = localStorage.getItem('adminMode');
    if (adminMode === 'true') {
      setIsAdminMode(true);
    }

    // Countdown timer
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        // Launch time reached
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleAdminAccess = () => {
    setShowPasswordPrompt(true);
    setError('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      localStorage.setItem('adminMode', 'true');
      setShowPasswordPrompt(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleExitAdmin = () => {
    setIsAdminMode(false);
    localStorage.removeItem('adminMode');
  };

  const handleEnterSite = () => {
    navigate('/');
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    alert('Thank you! You\'ll be notified when we launch.');
  };

  const features = [
    {
      icon: '🛒',
      title: 'E-Commerce Platform',
      description: 'Complete online shopping experience with secure payments'
    },
    {
      icon: '🌿',
      title: 'Ayurvedic Products',
      description: 'Authentic herbal remedies and natural wellness products'
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Perfect experience on all devices and screen sizes'
    },
    {
      icon: '🔒',
      title: 'Secure Shopping',
      description: 'SSL encryption and secure payment processing'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' }
  ];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (isAdminMode) {
    return (
      <div className="admin-mode">
        <div className="admin-header">
          <h2>🔓 Admin Mode Active</h2>
          <button className="btn exit-admin-btn" onClick={handleExitAdmin}>
            Exit Admin Mode
          </button>
        </div>
        <div className="admin-content">
          <h3>Welcome to Admin Mode!</h3>
          <p>You now have full access to the website.</p>
          <button className="btn enter-site-btn" onClick={handleEnterSite}>
            Enter Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="coming-soon-page">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="floating-element" style={{ '--delay': '0s' }}>🌿</div>
        <div className="floating-element" style={{ '--delay': '2s' }}>💚</div>
        <div className="floating-element" style={{ '--delay': '4s' }}>🌱</div>
        <div className="floating-element" style={{ '--delay': '6s' }}>🍃</div>
        <div className="floating-element" style={{ '--delay': '8s' }}>🌿</div>
      </div>

      <div className="container">
        <header className="coming-soon-header">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>🌿 AyurvedaHerbs</h1>
          </motion.div>
          
          <motion.button
            className="admin-access-btn"
            onClick={handleAdminAccess}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔓 Admin Access
          </motion.button>
        </header>

        <main className="coming-soon-content">
          <motion.div 
            className="hero-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2>Something Amazing is Coming</h2>
            <p className="subtitle">
              We're crafting the perfect Ayurvedic shopping experience for you. 
              Get ready to discover authentic herbal remedies and natural wellness products.
            </p>
          </motion.div>

          <motion.div 
            className="countdown-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3>Launching In</h3>
            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="countdown-number">{countdown.days}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.hours}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.minutes}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.seconds}</span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="features-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <h3>What to Expect</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="newsletter-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <h3>Get Notified</h3>
            <p>Be the first to know when we launch!</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSignup}>
              <input
                type="email"
                placeholder="Enter your email address"
                required
              />
              <button type="submit" className="btn notify-btn">
                Notify Me
              </button>
            </form>
          </motion.div>

          <motion.div 
            className="social-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <h3>Follow Our Journey</h3>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </main>

        <footer className="coming-soon-footer">
          <p>&copy; 2024 AyurvedaHerbs. All rights reserved.</p>
        </footer>
      </div>

      {/* Password Prompt Modal */}
      <AnimatePresence>
        {showPasswordPrompt && (
          <motion.div
            className="password-modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowPasswordPrompt(false)}
          >
            <motion.div
              className="password-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="password-modal-header">
                <h3>🔐 Admin Access</h3>
                <button 
                  className="close-btn" 
                  onClick={() => setShowPasswordPrompt(false)}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <p>Enter admin password to access the site:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoFocus
                />
                {error && <p className="error-message">{error}</p>}
                <div className="password-actions">
                  <button type="submit" className="btn submit-btn">
                    Access Site
                  </button>
                  <button 
                    type="button" 
                    className="btn cancel-btn"
                    onClick={() => setShowPasswordPrompt(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComingSoon; 