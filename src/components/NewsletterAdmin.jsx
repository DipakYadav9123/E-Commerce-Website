import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showSuccessToast, showErrorToast } from './CustomToast';
import './NewsletterAdmin.css';

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load subscribers from localStorage
    const savedSubscribers = localStorage.getItem('newsletter_subscribers');
    if (savedSubscribers) {
      try {
        setSubscribers(JSON.parse(savedSubscribers));
      } catch (error) {
        console.error('Error loading subscribers:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleRemoveSubscriber = (email) => {
    const updatedSubscribers = subscribers.filter(sub => sub.email !== email);
    setSubscribers(updatedSubscribers);
    localStorage.setItem('newsletter_subscribers', JSON.stringify(updatedSubscribers));
    showSuccessToast(`Removed ${email} from subscribers`);
  };

  const handleClearAll = () => {
    setSubscribers([]);
    localStorage.removeItem('newsletter_subscribers');
    showSuccessToast('All subscribers cleared');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="newsletter-admin">
        <div className="admin-header">
          <h2>📧 Newsletter Admin</h2>
          <p>Loading subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-admin">
      <div className="admin-header">
        <h2>📧 Newsletter Admin</h2>
        <div className="admin-stats">
          <span className="stat-item">
            <span className="stat-icon">👥</span>
            <span className="stat-text">{subscribers.length} subscribers</span>
          </span>
          <span className="stat-item">
            <span className="stat-icon">📅</span>
            <span className="stat-text">Last updated: {subscribers.length > 0 ? formatDate(subscribers[subscribers.length - 1].subscribedAt) : 'Never'}</span>
          </span>
        </div>
      </div>

      <div className="admin-actions">
        <motion.button
          className="btn clear-all-btn"
          onClick={handleClearAll}
          disabled={subscribers.length === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🗑️ Clear All Subscribers
        </motion.button>
      </div>

      <div className="subscribers-list">
        <AnimatePresence>
          {subscribers.length === 0 ? (
            <motion.div
              className="no-subscribers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="no-subscribers-icon">📭</div>
              <h3>No Subscribers Yet</h3>
              <p>Subscribers will appear here once they sign up for the newsletter.</p>
            </motion.div>
          ) : (
            subscribers.map((subscriber, index) => (
              <motion.div
                key={subscriber.id}
                className="subscriber-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="subscriber-info">
                  <div className="subscriber-name">{subscriber.name}</div>
                  <div className="subscriber-email">{subscriber.email}</div>
                  <div className="subscriber-date">
                    Subscribed: {formatDate(subscriber.subscribedAt)}
                  </div>
                </div>
                <motion.button
                  className="remove-subscriber-btn"
                  onClick={() => handleRemoveSubscriber(subscriber.email)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Remove ${subscriber.name} from subscribers`}
                >
                  ×
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewsletterAdmin; 