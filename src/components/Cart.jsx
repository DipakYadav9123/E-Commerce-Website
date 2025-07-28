import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLoading } from '../context/LoadingContext';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import LazyImage from './LazyImage';
import LoadingSpinner from './LoadingSpinner';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const { setLoading, isLoading } = useLoading();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponForm, setShowCouponForm] = useState(false);

  // Coupon codes (dummy data)
  const availableCoupons = [
    { code: 'WELCOME10', discount: 10, type: 'percentage', minAmount: 50 },
    { code: 'SAVE20', discount: 20, type: 'percentage', minAmount: 100 },
    { code: 'FREESHIP', discount: 0, type: 'shipping', minAmount: 75 }
  ];

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

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
      alert('Invalid coupon code');
      return;
    }
    
    if (cartTotal < coupon.minAmount) {
      alert(`Minimum order amount of $${coupon.minAmount} required for this coupon`);
      return;
    }
    
    setAppliedCoupon(coupon);
    setShowCouponForm(false);
    alert(`Coupon applied! ${coupon.type === 'percentage' ? `${coupon.discount}% off` : 'Free shipping'}`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (cartTotal * appliedCoupon.discount) / 100;
    }
    return 0;
  };

  const calculateShipping = () => {
    if (appliedCoupon && appliedCoupon.type === 'shipping') {
      return 0;
    }
    return cartTotal > 100 ? 0 : 10;
  };

  const handleCheckout = async () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const subtotal = cartTotal;
  const discount = calculateDiscount();
  const shipping = calculateShipping();
  const total = subtotal - discount + shipping;

  return (
    <div className="cart-page">
      <SEO 
        title="Shopping Cart - Ayurveda Herbal Store"
        description="Review your cart items and proceed to checkout. Shop for authentic Ayurvedic products and natural healing remedies."
        keywords={['shopping cart', 'checkout', 'ayurvedic products', 'herbal remedies', 'natural healing']}
        url="/cart"
      />
      <Navbar />
      
      <main id="main-content" role="main">
        <div className="container">
          <h1>Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Add some products to your cart to get started!</p>
              <Link to="/products" className="btn primary-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                <h2>Cart Items ({cartItems.length})</h2>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <LazyImage src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">${item.price}</p>
                      
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                          disabled={isUpdating === item.id}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                          disabled={isUpdating === item.id}
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        className="remove-item-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isUpdating === item.id}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="cart-actions">
                  <button
                    className="clear-cart-btn"
                    onClick={handleClearCart}
                    disabled={isLoading('cart')}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="cart-summary">
                <h2>Order Summary</h2>
                
                <div className="summary-items">
                  <div className="summary-item">
                    <span>Subtotal ({cartItems.length} items):</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="summary-item discount">
                      <span>Discount ({appliedCoupon.discount}% off):</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="summary-item">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>
                
                {appliedCoupon && (
                  <div className="applied-coupon">
                    <span>Applied Coupon: {appliedCoupon.code}</span>
                    <button
                      className="remove-coupon-btn"
                      onClick={handleRemoveCoupon}
                    >
                      Remove
                    </button>
                  </div>
                )}
                
                <div className="total-section">
                  <div className="total-item">
                    <span>Total:</span>
                    <span className="total-amount">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {!appliedCoupon && (
                  <div className="coupon-section">
                    <button
                      className="apply-coupon-btn"
                      onClick={() => setShowCouponForm(!showCouponForm)}
                    >
                      {showCouponForm ? 'Cancel' : 'Apply Coupon'}
                    </button>
                    
                    {showCouponForm && (
                      <div className="coupon-form">
                        <div className="coupon-input">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                          <button onClick={handleApplyCoupon}>Apply</button>
                        </div>
                        <div className="available-coupons">
                          <p>Available coupons:</p>
                          <ul>
                            <li><strong>WELCOME10</strong> - 10% off (min $50)</li>
                            <li><strong>SAVE20</strong> - 20% off (min $100)</li>
                            <li><strong>FREESHIP</strong> - Free shipping (min $75)</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="checkout-actions">
                  <button
                    className="btn continue-shopping-btn"
                    onClick={handleContinueShopping}
                  >
                    Continue Shopping
                  </button>
                  
                  <button
                    className={`btn checkout-btn ${isLoading('checkout') ? 'loading' : ''}`}
                    onClick={handleCheckout}
                    disabled={isLoading('checkout')}
                  >
                    {isLoading('checkout') ? (
                      <>
                        <LoadingSpinner size="small" variant="light" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      `Proceed to Checkout ($${total.toFixed(2)})`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart; 