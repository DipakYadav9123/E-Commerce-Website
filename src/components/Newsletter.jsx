import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackNewsletterSignup, trackFormSubmit } from '../utils/analytics';
import { showSuccessToast, showErrorToast, showInfoToast } from './CustomToast';
import './Newsletter.css';

const Newsletter = ({ 
  title = "Stay Updated", 
  description = "Subscribe to our newsletter for exclusive offers and Ayurvedic wisdom",
  showSubscriberCount = true,
  className = ""
}) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribedEmails, setSubscribedEmails] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(0);

  // Load subscribed emails from localStorage on component mount
  useEffect(() => {
    const savedEmails = localStorage.getItem('newsletter_subscribers');
    if (savedEmails) {
      try {
        const emails = JSON.parse(savedEmails);
        setSubscribedEmails(emails);
        setSubscriberCount(emails.length);
      } catch (error) {
        console.error('Error loading newsletter subscribers:', error);
      }
    }
  }, []);

  // Save subscribed emails to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribedEmails));
    setSubscriberCount(subscribedEmails.length);
  }, [subscribedEmails]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name (2-50 characters, letters only)';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
      setErrors({});
      
      // Show success toast
      showSuccessToast(`Welcome ${formData.name}! You've been subscribed to our newsletter.`);
    }, 1500);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '' });
    setErrors({});
  };

  return (
    <div className={`newsletter-component ${className}`}>
      <motion.div 
        className="newsletter-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="newsletter-header">
          <h3 className="newsletter-title">📧 {title}</h3>
          <p className="newsletter-description">{description}</p>
          
          {showSubscriberCount && subscriberCount > 0 && (
            <div className="subscriber-count">
              <span className="count-icon">👥</span>
              <span className="count-text">{subscriberCount} subscribers</span>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              className="newsletter-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="newsletter-name">Name</label>
                  <input
                    type="text"
                    id="newsletter-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className={errors.name ? 'error' : ''}
                    disabled={isLoading}
                    required
                    autoComplete="name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="newsletter-email">Email</label>
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className={errors.email ? 'error' : ''}
                    disabled={isLoading}
                    required
                    autoComplete="email"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <button
                type="submit"
                className={`subscribe-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span className="btn-icon">📬</span>
                    <span>Subscribe Now</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              className="newsletter-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="success-icon">✅</div>
              <h5>Successfully Subscribed!</h5>
              <p>Thank you for joining our newsletter. You'll receive updates soon!</p>
              <button 
                className="reset-btn"
                onClick={resetForm}
              >
                Subscribe Another Email
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="newsletter-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">🎁</span>
            <span>Exclusive Offers</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🌿</span>
            <span>Ayurvedic Tips</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📱</span>
            <span>Mobile Friendly</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Newsletter; 