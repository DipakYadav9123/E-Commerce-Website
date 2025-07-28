import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { languageManager } from '../utils/translations';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import ProductCard from './ProductCard';
import TestimonialsCarousel from './TestimonialsCarousel';
import Testimonials from './Testimonials';
import Blog from './Blog';
import ProductVideo from './ProductVideo';
import Newsletter from './Newsletter';
import WhatsAppChat from './WhatsAppChat';
import VoiceSearch from './VoiceSearch';
import AccessibilityEnhancements from './AccessibilityEnhancements';
import LazyImage from './LazyImage';
import ProductBadge from './ProductBadge';
import { trackButtonClick, trackPageView } from '../utils/analytics';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(languageManager.getLanguage());

  useEffect(() => {
    const handleLanguageChange = (newLanguage) => {
      setCurrentLanguage(newLanguage);
    };

    languageManager.addListener(handleLanguageChange);
    return () => languageManager.removeListener(handleLanguageChange);
  }, []);
  
  const featuredProducts = [
    {
      id: 1,
      name: "Turmeric Powder",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      description: "Pure organic turmeric powder for natural healing and immunity boost.",
      rating: 4.7,
      reviewCount: 234,
      inStock: true,
      badge: {
        type: 'trending',
        position: 'top-left'
      }
    },
    {
      id: 2,
      name: "Neem Leaves",
      price: "$8.99",
      originalPrice: "$10.99",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      description: "Fresh neem leaves for skin care and natural detoxification.",
      rating: 4.5,
      reviewCount: 156,
      inStock: true,
      discount: 20,
      badge: {
        type: 'discount',
        value: 15,
        position: 'top-right'
      }
    },
    {
      id: 3,
      name: "Ashwagandha Root",
      price: "$15.99",
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop",
      description: "Traditional ashwagandha root for stress relief and energy.",
      rating: 4.8,
      reviewCount: 189,
      inStock: true,
      badge: {
        type: 'bestseller',
        position: 'top-left'
      }
    }
  ];

  // Example recommended products (could be personalized in a real app)
  const recommendedProducts = [
    featuredProducts[2],
    featuredProducts[0],
    featuredProducts[1],
  ];

  // Example deal of the day (could be dynamic)
  const dealOfTheDay = {
    ...featuredProducts[1],
    deal: true,
    dealText: 'Deal of the Day! 20% OFF',
  };

  // Example video data
  const brandVideo = {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Our Ayurveda Story',
    description: 'Discover the journey and values behind AyurvedaHerbs.'
  };

  // Recently viewed products (from localStorage)
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  useEffect(() => {
    const viewed = localStorage.getItem('recently_viewed');
    if (viewed) {
      setRecentlyViewed(JSON.parse(viewed));
    }
  }, []);

  // Track Home page view for analytics
  useEffect(() => {
    trackPageView('Home', window.location.pathname);
  }, []);

  // Add to cart with analytics event
  const handleAddToCart = (product) => {
    addToCart(product);
    trackButtonClick('Add to Cart', 'Home Product Card');
  };

  // Add to recently viewed when product is clicked
  const handleProductClick = (product) => {
    let viewed = localStorage.getItem('recently_viewed');
    viewed = viewed ? JSON.parse(viewed) : [];
    // Remove if already exists
    viewed = viewed.filter(p => p.id !== product.id);
    // Add to front
    viewed.unshift(product);
    // Keep only 5
    viewed = viewed.slice(0, 5);
    localStorage.setItem('recently_viewed', JSON.stringify(viewed));
    setRecentlyViewed(viewed);
  };

  const handleBuyNow = (productId) => {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      alert(`${product.name} added to cart!`);
      navigate('/cart');
    }
  };

  // Order Section State and Logic
  const [orders, setOrders] = useState([]);
  const [orderForm, setOrderForm] = useState({ name: '', address: '', product: '', quantity: 1 });

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.address || !orderForm.product || !orderForm.quantity) return;
    const newOrder = {
      ...orderForm,
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: 'Processing'
    };
    setOrders(prev => [newOrder, ...prev]);
    setOrderForm({ name: '', address: '', product: '', quantity: 1 });
  };

  return (
    <div className="home-page">
      <SEO 
        title="Ayurveda Herbal Store - Natural Healing Products"
        description="Discover authentic Ayurvedic remedies and natural healing products. Shop for turmeric, neem, ashwagandha and more organic herbs."
        keywords={['ayurveda', 'herbal products', 'natural healing', 'turmeric', 'neem', 'ashwagandha', 'organic supplements']}
        url="/"
      />
      <Navbar />
      
      <main id="main-content" role="main">
        {/* Accessibility Enhancements (invisible, but important) */}
        <AccessibilityEnhancements />

        {/* Voice Search Bar */}
        <section className="voice-search-section">
          <div className="container">
            <VoiceSearch placeholder="Search for herbs, products, or categories..." />
          </div>
        </section>

        {/* Deal of the Day Banner */}
        <section className="deal-banner-section">
          <div className="container">
            <div className="deal-banner">
              <h2>{dealOfTheDay.dealText}</h2>
              <ProductCard product={dealOfTheDay} showBadge={true} showRating={true} showReviewCount={true} />
            </div>
          </div>
        </section>

        {/* Hero Section with Animation and CTA */}
        <section className="hero-section">
          <div className="hero-background animated-bg"></div>
          <div className="container">
            <div className="hero-content">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {languageManager.translate('heroTitle')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {languageManager.translate('heroSubtitle')}
              </motion.p>
              <motion.div 
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link to="/products" className="btn primary-btn" onClick={() => trackButtonClick('Shop Now', 'Hero Banner')}>
                  {languageManager.translate('shopNow')}
                </Link>
                <Link to="/offers" className="btn secondary-btn" onClick={() => trackButtonClick('View Offers', 'Hero Banner')}>
                  {languageManager.translate('viewOffers')}
                </Link>
                <a href="#newsletter-section" className="btn outline-btn" onClick={() => trackButtonClick('Get Discount', 'Hero Banner')}>
                  Get Discount
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic Offers Section */}
        <section className="offers-section">
          <div className="container">
            <h2>Best Sellers & Limited Time Offers</h2>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuyNow={handleBuyNow}
                  showRating={true}
                  showReviewCount={true}
                  showBadge={true}
                  onAddToCart={handleAddToCart}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <section className="recently-viewed-section">
            <div className="container">
              <h2>Recently Viewed</h2>
              <div className="products-grid">
                {recentlyViewed.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onBuyNow={handleBuyNow}
                    showRating={true}
                    showReviewCount={true}
                    showBadge={true}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trust Badges Section */}
        <section className="trust-badges-section">
          <div className="container trust-badges">
            <div className="trust-badge"><span role="img" aria-label="genuine">✅</span> 100% Genuine</div>
            <div className="trust-badge"><span role="img" aria-label="secure">🔒</span> Secure Payment</div>
            <div className="trust-badge"><span role="img" aria-label="fast delivery">🚚</span> Fast Delivery</div>
          </div>
        </section>

        {/* Lazy Loading Example (for images) */}
        <section className="lazy-loading-demo-section">
          <div className="container">
            <h2>Image Performance Demo</h2>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className="lazy-image-demo">
                  <LazyImage src={product.image} alt={product.name} />
                  <div>{product.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-products">
          <div className="container">
            <div className="section-header">
              <h2>{languageManager.translate('featuredProducts')}</h2>
              <p>{languageManager.translate('featuredSubtitle')}</p>
            </div>
            
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuyNow={handleBuyNow}
                  showRating={true}
                  showReviewCount={true}
                  showBadge={true}
                />
              ))}
            </div>
            
            <div className="view-all-container">
              <Link to="/products" className="btn outline-btn">
                {languageManager.translate('viewAllProducts')}
              </Link>
            </div>
          </div>
        </section>

        {/* Recommended for You Section */}
        <section className="recommended-section">
          <div className="container">
            <div className="section-header">
              <h2>Recommended for You</h2>
              <p>Handpicked products just for you!</p>
            </div>
            <div className="products-grid">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuyNow={handleBuyNow}
                  showRating={true}
                  showReviewCount={true}
                  showBadge={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Brand/Product Video Section */}
        <section className="brand-video-section">
          <div className="container">
            <h2>{brandVideo.title}</h2>
            <p>{brandVideo.description}</p>
            <ProductVideo video={{ src: brandVideo.videoUrl }} isOpen={true} />
          </div>
        </section>

        {/* Blog Highlights Section */}
        <section className="blog-highlights-section">
          <div className="container">
            <h2>Ayurveda Blog Highlights</h2>
            <Blog />
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="newsletter-section" id="newsletter-section">
          <div className="container">
            <Newsletter />
          </div>
        </section>

        {/* Order Section */}
        <section className="order-section">
          <div className="container">
            <h2>Place an Order</h2>
            <form className="order-form" onSubmit={handleOrderSubmit} autoComplete="on">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="order-name">Name</label>
                  <input
                    type="text"
                    id="order-name"
                    name="name"
                    value={orderForm.name}
                    onChange={handleOrderInputChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="order-address">Address</label>
                  <input
                    type="text"
                    id="order-address"
                    name="address"
                    value={orderForm.address}
                    onChange={handleOrderInputChange}
                    required
                    autoComplete="street-address"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="order-product">Product</label>
                  <input
                    type="text"
                    id="order-product"
                    name="product"
                    value={orderForm.product}
                    onChange={handleOrderInputChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="order-quantity">Quantity</label>
                  <input
                    type="number"
                    id="order-quantity"
                    name="quantity"
                    min="1"
                    value={orderForm.quantity}
                    onChange={handleOrderInputChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn primary-btn">Place Order</button>
            </form>
            <h3 style={{marginTop: '2rem'}}>My Orders</h3>
            {orders.length === 0 ? (
              <p>No orders placed yet.</p>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.date}</td>
                      <td>{order.product}</td>
                      <td>{order.quantity}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* WhatsApp/Live Chat Support */}
        <WhatsAppChat />

        {/* Testimonials Carousel Section */}
        <TestimonialsCarousel />
      </main>
      
      <Testimonials />
      
      <Footer />
    </div>
  );
};

export default Home; 