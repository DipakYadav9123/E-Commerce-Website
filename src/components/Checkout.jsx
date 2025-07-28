import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { languageManager } from '../utils/translations';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [currentLanguage, setCurrentLanguage] = useState(languageManager.getLanguage());
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMode: 'cod',
    upiId: '',
    deliveryInstructions: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleLanguageChange = (newLanguage) => {
      setCurrentLanguage(newLanguage);
    };

    languageManager.addListener(handleLanguageChange);
    return () => languageManager.removeListener(handleLanguageChange);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
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

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile validation (Indian format)
    if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    // UPI validation
    if (formData.paymentMode === 'upi' && !formData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required for UPI payment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store order in localStorage
    const order = {
      id: Date.now(),
      customer: formData,
      items: cartItems,
      total: calculateTotal(),
      subtotal: calculateSubtotal(),
      shipping: calculateShipping(),
      tax: calculateTax(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart
    clearCart();

    setIsSubmitting(false);
    setShowSuccess(true);

    // Show success message
    alert(`🎉 Order placed successfully!\n\nOrder ID: ${order.id}\nTotal Amount: ₹${order.total.toFixed(2)}\n\nThank you for shopping with us!`);

    // Redirect to home after a delay
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (cartItems.length === 0) {
    return null; // Will redirect to cart
  }

  if (showSuccess) {
    return (
      <div className="checkout-success">
        <SEO 
          title="Order Confirmed - Ayurveda Herbal Store"
          description="Your order has been successfully placed."
          keywords={['order confirmation', 'checkout success']}
          url="/checkout"
        />
        <Navbar />
        <main className="success-main">
          <motion.div 
            className="success-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="success-icon">✅</div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
            <p>You will receive an email confirmation shortly.</p>
            <button 
              className="btn primary-btn"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <SEO 
        title="Checkout - Ayurveda Herbal Store"
        description="Complete your purchase with secure payment options."
        keywords={['checkout', 'payment', 'order', 'shipping']}
        url="/checkout"
      />
      <Navbar />
      
      <main className="checkout-main">
        <div className="checkout-container">
          <motion.div 
            className="checkout-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>🛒 Checkout</h1>
            <p>Complete your purchase with secure payment options</p>
          </motion.div>

          <div className="checkout-content">
            <motion.div 
              className="checkout-form-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2>📝 Customer Information</h2>
              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number *</label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={errors.mobile ? 'error' : ''}
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                    />
                    {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Delivery Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                    placeholder="Enter your complete delivery address"
                    rows="3"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                      placeholder="Enter your city"
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? 'error' : ''}
                      placeholder="Enter your state"
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode *</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={errors.pincode ? 'error' : ''}
                      placeholder="Enter 6-digit pincode"
                      maxLength="6"
                    />
                    {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</label>
                  <textarea
                    id="deliveryInstructions"
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special delivery instructions..."
                    rows="2"
                  />
                </div>

                <div className="payment-section">
                  <h3>💳 Payment Method</h3>
                  <div className="payment-options">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="cod"
                        checked={formData.paymentMode === 'cod'}
                        onChange={handleInputChange}
                      />
                      <span className="payment-label">
                        <span className="payment-icon">💵</span>
                        Cash on Delivery (COD)
                      </span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="upi"
                        checked={formData.paymentMode === 'upi'}
                        onChange={handleInputChange}
                      />
                      <span className="payment-label">
                        <span className="payment-icon">📱</span>
                        UPI Payment
                      </span>
                    </label>
                  </div>

                  {formData.paymentMode === 'upi' && (
                    <div className="form-group">
                      <label htmlFor="upiId">UPI ID *</label>
                      <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        className={errors.upiId ? 'error' : ''}
                        placeholder="Enter your UPI ID (e.g., name@upi)"
                      />
                      {errors.upiId && <span className="error-message">{errors.upiId}</span>}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`btn primary-btn submit-btn ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </motion.div>

            <motion.div 
              className="order-summary-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2>📋 Order Summary</h2>
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="item-price">₹{parseFloat(item.price.replace('$', ''))} × {item.quantity}</p>
                    </div>
                    <div className="item-total">
                      ₹{(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>{calculateShipping() === 0 ? 'Free' : formatCurrency(calculateShipping())}</span>
                </div>
                <div className="total-row">
                  <span>Tax (18% GST):</span>
                  <span>{formatCurrency(calculateTax())}</span>
                </div>
                <div className="total-row total">
                  <span>Total:</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>

              <div className="security-badges">
                <div className="security-badge">
                  <span className="badge-icon">🔒</span>
                  <span>Secure Payment</span>
                </div>
                <div className="security-badge">
                  <span className="badge-icon">🚚</span>
                  <span>Free Delivery</span>
                </div>
                <div className="security-badge">
                  <span className="badge-icon">🔄</span>
                  <span>Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout; 