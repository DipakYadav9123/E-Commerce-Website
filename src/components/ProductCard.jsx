import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { trackProductView, trackAddToCart, trackButtonClick } from '../utils/analytics';
import LazyImage from './LazyImage';
import ProductBadge from './ProductBadge';
import './ProductCard.css';

const ProductCard = ({ product, onBuyNow, variant = 'default', showRating = false, showAddToCart = false, showReviewCount = false, showBadge = false }) => {
  const { addToCart, cartItems } = useCart();
  
  const handleBuyNow = () => {
    // Track product view and buy now click
    trackProductView(product.id, product.name, product.category, product.price);
    trackButtonClick('Buy Now', 'Product Card');
    
    if (onBuyNow) {
      onBuyNow(product.id);
    }
  };

  const handleAddToCart = () => {
    // Track add to cart event
    trackAddToCart(product.id, product.name, product.category, product.price, 1);
    trackButtonClick('Add to Cart', 'Product Card');
    
    addToCart(product);
  };

  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <motion.article 
      className={`product-card ${variant}`}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image">
        <Link to={`/products/${product.id}`}>
          <LazyImage src={product.image} alt={product.name} />
        </Link>
        
        {/* Discount Label */}
        {product.discount && (
          <div className="discount-label">
            <span className="discount-text">{product.discount}% OFF</span>
          </div>
        )}
        
        {showBadge && product.badge && (
          <ProductBadge 
            type={product.badge.type}
            value={product.badge.value}
            position={product.badge.position}
          />
        )}
      </div>
      
      <div className="product-content">
        <h3 className="product-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        
        <div className="product-price">
          <span className="price">{product.price}</span>
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice}</span>
          )}
        </div>
        
        {showRating && product.rating && (
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-value">{product.rating}</span>
            {showReviewCount && product.reviewCount && (
              <span className="review-count">({product.reviewCount} reviews)</span>
            )}
          </div>
        )}
        
        <div className="product-actions">
          {showAddToCart && (
            <button
              className={`btn add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
          )}
          
          <button
            className="btn buy-now-btn"
            onClick={handleBuyNow}
            disabled={!product.inStock}
          >
            Buy Now
          </button>
        </div>
        
        {!product.inStock && (
          <div className="out-of-stock">
            <span>Out of Stock</span>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProductCard; 