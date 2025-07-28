import React from 'react';
import { motion } from 'framer-motion';
import './ProductBadge.css';

const ProductBadge = ({ type, value, position = 'top-left' }) => {
  const getBadgeContent = () => {
    switch (type) {
      case 'trending':
        return { text: '🔥 Trending', color: '#ff6b35', icon: '🔥' };
      case 'discount':
        return { text: `${value}% OFF`, color: '#e74c3c', icon: '💥' };
      case 'new':
        return { text: 'NEW', color: '#27ae60', icon: '✨' };
      case 'bestseller':
        return { text: 'Bestseller', color: '#f39c12', icon: '⭐' };
      case 'limited':
        return { text: 'Limited', color: '#9b59b6', icon: '⏰' };
      case 'organic':
        return { text: 'Organic', color: '#2ecc71', icon: '🌿' };
      case 'sale':
        return { text: 'SALE', color: '#e74c3c', icon: '🏷️' };
      case 'hot':
        return { text: 'HOT', color: '#ff4757', icon: '🔥' };
      case 'featured':
        return { text: 'Featured', color: '#3742fa', icon: '💎' };
      case 'premium':
        return { text: 'Premium', color: '#ffa502', icon: '👑' };
      default:
        return { text: 'Special', color: '#8B4513', icon: '🎯' };
    }
  };

  const badgeContent = getBadgeContent();

  const getPositionClass = () => {
    switch (position) {
      case 'top-left':
        return 'badge-top-left';
      case 'top-right':
        return 'badge-top-right';
      case 'bottom-left':
        return 'badge-bottom-left';
      case 'bottom-right':
        return 'badge-bottom-right';
      case 'center':
        return 'badge-center';
      default:
        return 'badge-top-left';
    }
  };

  return (
    <motion.div
      className={`product-badge ${getPositionClass()}`}
      style={{ 
        backgroundColor: badgeContent.color,
        '--badge-color': badgeContent.color 
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="badge-icon">{badgeContent.icon}</span>
      <span className="badge-text">{badgeContent.text}</span>
    </motion.div>
  );
};

export default ProductBadge; 