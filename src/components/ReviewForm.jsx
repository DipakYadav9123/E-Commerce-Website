import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ReviewForm.css';

const ReviewForm = ({ productId, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));

    if (errors.rating) {
      setErrors(prev => ({
        ...prev,
        rating: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Rating validation
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Review title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    // Comment validation
    if (!formData.comment.trim()) {
      newErrors.comment = 'Review comment is required';
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = 'Comment must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        const newReview = {
          id: Date.now(),
          productId: productId,
          user: formData.name,
          email: formData.email,
          rating: formData.rating,
          title: formData.title,
          comment: formData.comment,
          date: new Date().toISOString().split('T')[0],
          verified: false
        };

        onSubmit(newReview);
        setIsSubmitting(false);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          rating: 0,
          title: '',
          comment: ''
        });
        
        // Close form
        if (onClose) {
          onClose();
        }
      }, 1000);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <motion.span
        key={index}
        className={`star ${index < rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={interactive ? () => handleRatingChange(index + 1) : undefined}
        whileHover={interactive ? { scale: 1.2 } : {}}
        whileTap={interactive ? { scale: 0.9 } : {}}
      >
        {index < rating ? '⭐' : '☆'}
      </motion.span>
    ));
  };

  return (
    <motion.div
      className="review-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="review-form-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="review-form-header">
          <h3>Write a Review</h3>
          <button 
            className="close-btn"
            onClick={onClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form className="review-form" onSubmit={handleSubmit}>
          {/* Rating Selection */}
          <div className="form-group">
            <label>Your Rating *</label>
            <div className="rating-input">
              {renderStars(formData.rating, true)}
              <span className="rating-text">
                {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'Select your rating'}
              </span>
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>

          {/* Review Title */}
          <div className="form-group">
            <label htmlFor="title">Review Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? 'error' : ''}
              placeholder="Summarize your experience..."
              disabled={isSubmitting}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your name"
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Review Comment */}
          <div className="form-group">
            <label htmlFor="comment">Your Review *</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className={errors.comment ? 'error' : ''}
              placeholder="Share your experience with this product..."
              rows="5"
              disabled={isSubmitting}
            ></textarea>
            {errors.comment && <span className="error-message">{errors.comment}</span>}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <motion.button
              type="button"
              className="btn cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="submit"
              className={`btn submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit Review'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ReviewForm; 