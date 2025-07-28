import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useLoading } from '../context/LoadingContext';
import LazyImage from './LazyImage';
import LoadingSpinner from './LoadingSpinner';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const { setLoading, isLoading, updatingItem } = useLoading();
  const [isUpdating, setIsUpdating] = useState(null);

  const handleCheckout = async () => {
    setLoading('cart', true, 'Processing checkout...');
    // Simulate checkout process
    setTimeout(() => {
      setLoading('cart', false);
      alert('Checkout completed! (This is a demo)');
      clearCart();
      onClose();
    }, 2000);
  };

  const handleQuantityUpdate = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(itemId);
    setLoading('cart', true, 'Updating quantity...');
    
    // Simulate API call
    setTimeout(() => {
      updateQuantity(itemId, newQuantity);
      setLoading('cart', false);
      setIsUpdating(null);
    }, 500);
  };

  const handleRemoveItem = async (itemId) => {
    setIsUpdating(itemId);
    setLoading('cart', true, 'Removing item...');
    
    // Simulate API call
    setTimeout(() => {
      removeFromCart(itemId);
      setLoading('cart', false);
      setIsUpdating(null);
    }, 500);
  };

  const handleClearCart = async () => {
    setLoading('cart', true, 'Clearing cart...');
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      setLoading('cart', false);
    }, 500);
  };

  // Animation variants
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="cart-modal-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div 
          className="cart-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Loading Overlay */}
          {isLoading('cart') && (
            <div className="cart-loading-overlay">
              <LoadingSpinner 
                size="medium" 
                variant="primary"
                text={isLoading('cart') ? 'Updating cart...' : ''}
              />
            </div>
          )}

          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <motion.button 
              className="close-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </div>

          {cartItems.length === 0 ? (
            <motion.div 
              className="empty-cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="cart-items"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="wait">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className={`cart-item ${updatingItem === item.id ? 'updating' : ''}`}
                      variants={itemVariants}
                      layout
                    >
                      <div className="item-image">
                        <LazyImage
                          src={item.image}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </div>
                      
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-price">{item.price}</p>
                      </div>
                      
                      <div className="item-quantity">
                        <motion.button
                          className="quantity-btn"
                          onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                          disabled={isLoading('cart') || updatingItem === item.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          -
                        </motion.button>
                        <span className="quantity">{item.quantity}</span>
                        <motion.button
                          className="quantity-btn"
                          onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                          disabled={isLoading('cart') || updatingItem === item.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                      </div>
                      
                      <div className="item-total">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </div>
                      
                      <motion.button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading('cart') || updatingItem === item.id}
                        whileHover={{ scale: 1.1, color: '#ff4444' }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ×
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className="cart-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="cart-actions">
                  <motion.button
                    className="btn clear-cart-btn"
                    onClick={handleClearCart}
                    disabled={isLoading('cart')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Cart
                  </motion.button>
                  
                  <motion.button
                    className="btn checkout-btn btn-loading"
                    onClick={handleCheckout}
                    disabled={isLoading('cart')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading('cart') ? (
                      <>
                        <LoadingSpinner size="small" variant="light" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      'Checkout'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal; 