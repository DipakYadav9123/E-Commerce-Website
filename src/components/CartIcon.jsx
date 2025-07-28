import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './CartIcon.css';

const CartIcon = ({ onClick }) => {
  const { cartItemCount } = useCart();
  const [isPulsing, setIsPulsing] = useState(false);

  // Pulse animation when cart count changes
  useEffect(() => {
    if (cartItemCount > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  return (
    <motion.div 
      className="cart-icon" 
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="cart-icon-container"
        animate={isPulsing ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <motion.span 
          className="cart-icon-symbol"
          animate={isPulsing ? { rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          🛒
        </motion.span>
        
        <AnimatePresence>
          {cartItemCount > 0 && (
            <motion.span 
              className={`cart-badge ${isPulsing ? 'pulse' : ''}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
            >
              {cartItemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CartIcon; 