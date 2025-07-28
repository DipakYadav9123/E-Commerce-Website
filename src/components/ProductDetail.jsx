import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { trackProductView, trackAddToCart, trackButtonClick, trackProductAnalytics } from '../utils/analytics';
import { showProductToast, showCartToast } from './CustomToast';
import ScrollReveal from './ScrollReveal';
import SEO from './SEO';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductVideo from './ProductVideo';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Dummy product data
  const dummyProducts = [
    {
      id: 1,
      name: "Organic Ashwagandha Powder",
      price: "$24.99",
      originalPrice: "$29.99",
      images: [
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=600&fit=crop"
      ],
      description: "Pure organic ashwagandha powder sourced from the finest herbs. This ancient adaptogen has been used in Ayurvedic medicine for centuries to promote vitality, reduce stress, and enhance overall wellness. Our premium grade ashwagandha is carefully harvested and processed to maintain its natural potency.",
      shortDescription: "Pure organic ashwagandha powder for stress relief and energy boost.",
      category: "Herbal Supplements",
      rating: 4.5,
      reviewCount: 127,
      inStock: true,
      stockQuantity: 50,
      weight: "100g",
      origin: "India",
      organic: true,
      ingredients: [
        "100% Pure Ashwagandha Root Powder",
        "No artificial additives",
        "No preservatives",
        "No fillers or binders"
      ],
      benefits: [
        "Reduces stress and anxiety",
        "Boosts energy and vitality",
        "Improves sleep quality",
        "Enhances cognitive function",
        "Supports immune system",
        "Balances hormones naturally"
      ],
      usage: [
        "Take 1/2 to 1 teaspoon daily",
        "Mix with warm milk or water",
        "Best taken in the morning or evening",
        "Consult healthcare provider before use"
      ],
      warnings: [
        "Not suitable for pregnant women",
        "May interact with certain medications",
        "Consult doctor if you have thyroid issues",
        "Start with small doses"
      ],
      storage: "Store in a cool, dry place away from direct sunlight. Keep container tightly sealed.",
      expiry: "24 months from date of manufacture",
      certifications: ["USDA Organic", "Non-GMO", "Gluten-Free", "Vegan"],
      badges: {
        type: 'trending',
        position: 'top-left'
      },
      video: {
        youtubeId: 'dQw4w9WgXcQ', // Example YouTube video ID
        title: 'Ashwagandha Benefits & How to Use',
        description: 'Learn about the amazing benefits of Ashwagandha and how to incorporate it into your daily routine.',
        duration: '3:45'
      }
    },
    {
      id: 2,
      name: "Turmeric Golden Milk Mix",
      price: "$19.99",
      originalPrice: "$24.99",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop"
      ],
      description: "Traditional golden milk blend with premium turmeric and warming spices. This ancient Ayurvedic recipe combines the power of turmeric with black pepper, ginger, and other natural ingredients to create a soothing and health-promoting beverage.",
      shortDescription: "Traditional golden milk blend with anti-inflammatory properties.",
      category: "Herbal Supplements",
      rating: 4.8,
      reviewCount: 89,
      inStock: true,
      stockQuantity: 75,
      weight: "200g",
      origin: "India",
      organic: true,
      ingredients: [
        "Organic Turmeric Powder",
        "Black Pepper (for absorption)",
        "Organic Ginger Powder",
        "Cinnamon Powder",
        "Cardamom Powder",
        "Organic Honey Crystals"
      ],
      benefits: [
        "Powerful anti-inflammatory properties",
        "Supports joint health",
        "Boosts immune system",
        "Aids digestion",
        "Promotes healthy skin",
        "Natural pain relief"
      ],
      usage: [
        "Mix 1-2 teaspoons with warm milk",
        "Add honey to taste",
        "Best consumed before bedtime",
        "Can be taken daily"
      ],
      warnings: [
        "May stain teeth temporarily",
        "Not recommended for children under 2",
        "Consult doctor if on blood thinners",
        "Avoid on empty stomach"
      ],
      storage: "Store in an airtight container in a cool, dry place.",
      expiry: "18 months from date of manufacture",
      certifications: ["USDA Organic", "Non-GMO", "Gluten-Free", "Dairy-Free"],
      badges: {
        type: 'discount',
        value: 20,
        position: 'top-right'
      },
      video: {
        youtubeId: 'jNQXAC9IVRw', // Example YouTube video ID
        title: 'Golden Milk Benefits & Preparation',
        description: 'Discover the traditional recipe and health benefits of golden milk with turmeric.',
        duration: '4:20'
      }
    },
    {
      id: 3,
      name: "Neem Face Wash",
      price: "$14.99",
      originalPrice: "$14.99",
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop"
      ],
      description: "Natural neem-based face wash formulated for clear, healthy skin. This gentle yet effective cleanser combines the antibacterial properties of neem with other natural ingredients to provide deep cleansing without stripping your skin of its natural oils.",
      shortDescription: "Natural neem-based face wash for clear, healthy skin.",
      category: "Skincare",
      rating: 4.2,
      reviewCount: 156,
      inStock: true,
      stockQuantity: 100,
      weight: "150ml",
      origin: "India",
      organic: true,
      ingredients: [
        "Neem Extract",
        "Aloe Vera Gel",
        "Coconut Oil",
        "Tea Tree Oil",
        "Natural Glycerin",
        "Purified Water"
      ],
      benefits: [
        "Fights acne and blemishes",
        "Natural antibacterial properties",
        "Soothes irritated skin",
        "Controls oil production",
        "Prevents breakouts",
        "Suitable for all skin types"
      ],
      usage: [
        "Wet face with lukewarm water",
        "Apply small amount and massage gently",
        "Rinse thoroughly with water",
        "Use twice daily for best results"
      ],
      warnings: [
        "Avoid contact with eyes",
        "Do a patch test before first use",
        "Discontinue if irritation occurs",
        "Keep away from children"
      ],
      storage: "Store in a cool, dry place. Keep cap tightly closed.",
      expiry: "12 months from date of manufacture",
      certifications: ["Cruelty-Free", "Vegan", "Natural", "Chemical-Free"],
      badges: {
        type: 'new',
        position: 'top-left'
      }
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = dummyProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
      
      if (foundProduct) {
        // Track detailed product view
        trackProductView(
          foundProduct.id, 
          foundProduct.name, 
          foundProduct.category, 
          foundProduct.price
        );
        
        // Track category view
        trackProductAnalytics.trackCategoryView(foundProduct.category);
        
        showProductToast('view', foundProduct.name);
      }
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Track add to cart event
      trackAddToCart(product.id, product.name, product.category, product.price, quantity);
      trackButtonClick('Add to Cart', 'Product Detail');
      
      const productWithQuantity = { ...product, quantity };
      addToCart(productWithQuantity);
      showCartToast('add', product.name);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Track buy now event
      trackButtonClick('Buy Now', 'Product Detail');
      
      showProductToast('buy', product.name);
      // Navigate to checkout or cart
      navigate('/cart');
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleImageModalToggle = () => {
    setShowImageModal(!showImageModal);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    
    // Track wishlist event
    if (!isWishlisted) {
      trackProductAnalytics.trackWishlistAdd(product.id, product.name);
    }
    
    showProductToast('wishlist', product.name);
  };

  const handleShare = () => {
    setShowShareModal(true);
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href
      });
    }
  };

  const handleShareModalClose = () => {
    setShowShareModal(false);
  };

  const getRelatedProducts = () => {
    return dummyProducts.filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.rating >= 4.5)
    ).slice(0, 4);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index} 
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
      >
        {index < Math.floor(rating) ? '⭐' : '☆'}
      </span>
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="tab-content">
            <p>{product.description}</p>
            <div className="product-specs">
              <div className="spec-item">
                <strong>Weight:</strong> {product.weight}
              </div>
              <div className="spec-item">
                <strong>Origin:</strong> {product.origin}
              </div>
              <div className="spec-item">
                <strong>Organic:</strong> {product.organic ? 'Yes' : 'No'}
              </div>
              <div className="spec-item">
                <strong>Storage:</strong> {product.storage}
              </div>
              <div className="spec-item">
                <strong>Expiry:</strong> {product.expiry}
              </div>
            </div>
          </div>
        );
      
      case 'ingredients':
        return (
          <div className="tab-content">
            <h4>Ingredients</h4>
            <ul className="ingredients-list">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        );
      
      case 'benefits':
        return (
          <div className="tab-content">
            <h4>Health Benefits</h4>
            <ul className="benefits-list">
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        );
      
      case 'usage':
        return (
          <div className="tab-content">
            <h4>How to Use</h4>
            <ul className="usage-list">
              {product.usage.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            <div className="warnings">
              <h5>⚠️ Important Warnings</h5>
              <ul className="warnings-list">
                {product.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case 'reviews':
        return (
          <div className="tab-content">
            <div className="reviews-summary">
              <div className="rating-overview">
                <div className="average-rating">
                  <span className="rating-number">{product.rating}</span>
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span className="review-count">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            <div className="reviews-placeholder">
              <p>Customer reviews will be displayed here.</p>
              <button className="btn outline-btn">Write a Review</button>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="tab-content">
            {product.video ? (
              <div className="video-section">
                <div className="video-thumbnail" onClick={() => setShowVideoModal(true)}>
                  <img 
                    src={`https://img.youtube.com/vi/${product.video.youtubeId}/maxresdefault.jpg`}
                    alt={product.video.title}
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${product.video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  <button className="play-button">▶️</button>
                  <div className="video-duration">{product.video.duration}</div>
                </div>
                <div className="video-info">
                  <h4>{product.video.title}</h4>
                  <p>{product.video.description}</p>
                  <button 
                    className="btn primary-btn"
                    onClick={() => setShowVideoModal(true)}
                  >
                    🎥 Watch Video
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-video">
                <p>No video available for this product.</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <div className="container">
          <div className="not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn primary-btn">
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <SEO 
        title={`${product.name} - Ayurveda Herbal Store`}
        description={product.shortDescription}
        keywords={[product.name, 'ayurvedic', 'herbal', 'natural', 'organic']}
        url={`https://ayurvedaherbalstore.com/products/${product.id}`}
      />
      <Navbar />
      
      <main className="product-detail-main">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <ScrollReveal variant="fadeIn" delay={0.1}>
            <nav className="breadcrumb-nav">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <Link to="/products" className="breadcrumb-link">Products</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{product.name}</span>
            </nav>
          </ScrollReveal>

          <div className="product-detail-content">
            {/* Product Images */}
            <ScrollReveal variant="slideLeft" delay={0.2}>
              <div className="product-images">
                <div className="main-image-container">
                  <motion.img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="main-image"
                    onClick={handleImageModalToggle}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                  {product.badges && (
                    <div className={`product-badge ${product.badges.position}`}>
                      {product.badges.type === 'trending' && '🔥 Trending'}
                      {product.badges.type === 'discount' && `${product.badges.value}% Off`}
                      {product.badges.type === 'new' && '🆕 New'}
                    </div>
                  )}
                </div>
                
                {product.images.length > 1 && (
                  <div className="thumbnail-images">
                    {product.images.map((image, index) => (
                      <motion.img
                        key={index}
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => handleImageClick(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Product Information */}
            <ScrollReveal variant="slideRight" delay={0.3}>
              <div className="product-info">
                <div className="product-header">
                  <h1 className="product-title">{product.name}</h1>
                  <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="rating-text">({product.rating})</span>
                    <span className="review-count">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="product-price">
                  <span className="current-price">{product.price}</span>
                  {product.originalPrice !== product.price && (
                    <span className="original-price">{product.originalPrice}</span>
                  )}
                </div>

                <div className="product-status">
                  <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                  </span>
                  {product.inStock && (
                    <span className="stock-quantity">
                      {product.stockQuantity} units available
                    </span>
                  )}
                </div>

                <div className="product-description">
                  <p>{product.shortDescription}</p>
                </div>

                {/* Quantity Selector */}
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min="1"
                      max={product.stockQuantity}
                      className="quantity-input"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stockQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="product-actions">
                  <div className="primary-actions">
                    <motion.button
                      className="btn primary-btn add-to-cart-btn"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🛒 Add to Cart
                    </motion.button>
                    
                    <motion.button
                      className="btn secondary-btn buy-now-btn"
                      onClick={handleBuyNow}
                      disabled={!product.inStock}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      💳 Buy Now
                    </motion.button>
                  </div>
                  
                  <div className="secondary-actions">
                    <motion.button
                      className={`btn icon-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
                      onClick={handleWishlistToggle}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      {isWishlisted ? '❤️' : '🤍'}
                    </motion.button>
                    
                    <motion.button
                      className="btn icon-btn share-btn"
                      onClick={handleShare}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Share Product"
                    >
                      📤
                    </motion.button>
                  </div>
                </div>

                {/* Certifications */}
                <div className="certifications">
                  {product.certifications.map((cert, index) => (
                    <span key={index} className="certification-badge">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Product Tabs */}
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <div className="product-tabs">
              <div className="tab-buttons">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'ingredients', label: 'Ingredients' },
                  { id: 'benefits', label: 'Benefits' },
                  { id: 'usage', label: 'Usage' },
                  { id: 'video', label: 'Video', show: product.video },
                  { id: 'reviews', label: 'Reviews' }
                ].filter(tab => tab.show !== false).map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="tab-content-container">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="tab-content-wrapper"
                  >
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>

          {/* Related Products */}
          <ScrollReveal variant="fadeUp" delay={0.5}>
            <div className="related-products">
              <h3 className="section-title">You Might Also Like</h3>
              <div className="related-products-grid">
                {getRelatedProducts().map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    className="related-product-card"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to={`/products/${relatedProduct.id}`}>
                      <div className="related-product-image">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                        />
                        {relatedProduct.badges && (
                          <div className={`product-badge ${relatedProduct.badges.position}`}>
                            {relatedProduct.badges.type === 'trending' && '🔥 Trending'}
                            {relatedProduct.badges.type === 'discount' && `${relatedProduct.badges.value}% Off`}
                            {relatedProduct.badges.type === 'new' && '🆕 New'}
                          </div>
                        )}
                      </div>
                      <div className="related-product-info">
                        <h4 className="related-product-name">{relatedProduct.name}</h4>
                        <div className="related-product-rating">
                          <div className="stars">{renderStars(relatedProduct.rating)}</div>
                          <span className="rating-text">({relatedProduct.rating})</span>
                        </div>
                        <div className="related-product-price">
                          <span className="current-price">{relatedProduct.price}</span>
                          {relatedProduct.originalPrice !== relatedProduct.price && (
                            <span className="original-price">{relatedProduct.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleImageModalToggle}
          >
            <motion.div
              className="image-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={handleImageModalToggle}>
                ✕
              </button>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="modal-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            className="share-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleShareModalClose}
          >
            <motion.div
              className="share-modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="share-modal-header">
                <h3>Share This Product</h3>
                <button className="modal-close-btn" onClick={handleShareModalClose}>
                  ✕
                </button>
              </div>
              <div className="share-options">
                <button className="share-option" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                  📘 Facebook
                </button>
                <button className="share-option" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}>
                  🐦 Twitter
                </button>
                <button className="share-option" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${product.name} - ${product.shortDescription} ${window.location.href}`)}`, '_blank')}>
                  📱 WhatsApp
                </button>
                <button className="share-option" onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showProductToast('share', 'Link copied to clipboard!');
                  handleShareModalClose();
                }}>
                  📋 Copy Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <ProductVideo 
        video={product?.video}
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail; 