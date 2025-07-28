import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackNewsletterSignup, trackFormSubmit, trackButtonClick } from '../utils/analytics';
import { showSuccessToast, showErrorToast, showInfoToast } from './CustomToast';
import ResumeModal from './ResumeModal';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribedEmails, setSubscribedEmails] = useState([]);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Load subscribed emails from localStorage on component mount
  useEffect(() => {
    const savedEmails = localStorage.getItem('newsletter_subscribers');
    if (savedEmails) {
      try {
        setSubscribedEmails(JSON.parse(savedEmails));
      } catch (error) {
        console.error('Error loading newsletter subscribers:', error);
      }
    }
  }, []);

  // Save subscribed emails to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribedEmails));
  }, [subscribedEmails]);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Offers', path: '/offers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    // Comprehensive email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    // Name should be at least 2 characters and contain only letters and spaces
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!formData.name.trim()) {
      showErrorToast('Please enter your name.');
      return;
    }

    if (!validateName(formData.name)) {
      showErrorToast('Please enter a valid name (2-50 characters, letters only).');
      return;
    }

    if (!formData.email.trim()) {
      showErrorToast('Please enter your email address.');
      return;
    }

    if (!validateEmail(formData.email)) {
      showErrorToast('Please enter a valid email address.');
      return;
    }

    // Check if email is already subscribed
    if (subscribedEmails.some(sub => sub.email.toLowerCase() === formData.email.toLowerCase())) {
      showInfoToast('This email is already subscribed to our newsletter!');
      return;
    }

    setIsLoading(true);
    
    // Track newsletter signup
    trackNewsletterSignup(formData.email);
    trackFormSubmit('newsletter_signup', true);
    
    // Simulate API call
    setTimeout(() => {
      // Add to subscribed emails
      const newSubscriber = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subscribedAt: new Date().toISOString(),
        id: Date.now()
      };
      
      setSubscribedEmails(prev => [...prev, newSubscriber]);
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '' });
      
      // Show success toast
      showSuccessToast(`Welcome ${formData.name}! You've been subscribed to our newsletter.`);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '' });
  };

  const handleUnsubscribe = (email) => {
    setSubscribedEmails(prev => prev.filter(sub => sub.email !== email));
    showSuccessToast('You have been unsubscribed from our newsletter.');
  };

  const getSubscriberCount = () => {
    return subscribedEmails.length;
  };

  const handleHireMeClick = () => {
    trackButtonClick('hire_me_button', 'footer');
    setIsResumeModalOpen(true);
  };

  const handleCloseResumeModal = () => {
    setIsResumeModalOpen(false);
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <h3>🌿 AyurvedaHerbs</h3>
            </div>
            <p className="footer-description">
              Your trusted source for authentic Ayurvedic and herbal products. 
              Natural healing for modern wellness.
            </p>
            <div className="footer-address">
              <p>📍 123 Wellness Street</p>
              <p>Natural City, NC 12345</p>
              <p>United States</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📧 info@ayurvedaherbs.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>🕒 Mon-Fri: 9AM-6PM</p>
              <p>🕒 Sat: 10AM-4PM</p>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="footer-section newsletter-section">
            <h4>Stay Updated</h4>
            <p className="newsletter-description">
              Subscribe to our newsletter for wellness tips, new products, and exclusive offers.
            </p>
            <div className="subscriber-count">
              <span className="count-icon">📧</span>
              <span className="count-text">{getSubscriberCount()} subscribers</span>
            </div>
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  className="newsletter-form"
                  onSubmit={handleSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="btn subscribe-btn"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <span className="loading-text">
                        <span className="spinner"></span>
                        Subscribing...
                      </span>
                    ) : (
                      'Subscribe'
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  className="newsletter-success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="success-icon">✅</div>
                  <h5>Thank You!</h5>
                  <p>You've been successfully subscribed to our newsletter.</p>
                  <motion.button
                    className="btn reset-btn"
                    onClick={resetForm}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe Another Email
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Social Media Row */}
        <div className="footer-social-row">
          <h4>Follow Us</h4>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} AyurvedaHerbs. All rights reserved.</p>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/shipping">Shipping Info</Link>
            </div>
          </div>
          
          {/* Hire Me Section */}
          <div className="hire-me-section">
            <motion.button
              className="btn hire-me-btn"
              onClick={handleHireMeClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💼 Hire Me
            </motion.button>
            <p className="hire-me-text">Looking for a developer? Check out my resume!</p>
          </div>
        </div>
      </div>
      
      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={handleCloseResumeModal} 
      />
    </footer>
  );
};

export default Footer; 