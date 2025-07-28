import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './CartNotification.css';

const CartNotification = () => {
  const { cartItemCount } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [lastCount, setLastCount] = useState(0);

  useEffect(() => {
    if (cartItemCount > lastCount && lastCount > 0) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
    setLastCount(cartItemCount);
  }, [cartItemCount, lastCount]);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          className="cart-notification"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          <div className="notification-content">
            <div className="notification-icon">
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                🛒
              </motion.span>
            </div>
            <div className="notification-text">
              <h4>Item Added to Cart!</h4>
              <p>Your item has been successfully added to your shopping cart.</p>
            </div>
            <motion.button
              className="notification-close"
              onClick={() => setShowNotification(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close notification"
            >
              ×
            </motion.button>
          </div>
          
          <motion.div
            className="notification-progress"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification; 