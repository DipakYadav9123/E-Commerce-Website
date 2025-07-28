import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import LazyImage from './LazyImage';
import './Offers.css';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "New Customer Special",
      description: "Get 20% off on your first order! Use code WELCOME20 for any purchase above $50. Perfect for trying our best-selling herbal supplements.",
      discount: "20% OFF",
      originalPrice: "$100",
      discountedPrice: "$80",
      expiryDate: "2024-02-15",
      category: "First Order",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Bundle & Save",
      description: "Buy any 3 herbal supplements together and save 30%! Mix and match from our premium collection. Limited time offer on our most popular combinations.",
      discount: "30% OFF",
      originalPrice: "$150",
      discountedPrice: "$105",
      expiryDate: "2024-02-20",
      category: "Bundle Deal",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Free Shipping Weekend",
      description: "Free shipping on all orders this weekend! No minimum purchase required. Valid on all our Ayurvedic products and herbal remedies.",
      discount: "FREE SHIPPING",
      originalPrice: "$15",
      discountedPrice: "$0",
      expiryDate: "2024-02-18",
      category: "Shipping",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Loyalty Rewards",
      description: "Double points on all purchases this month! Earn 2x rewards points on every dollar spent. Redeem points for future discounts and exclusive products.",
      discount: "2X POINTS",
      originalPrice: "100 pts",
      discountedPrice: "200 pts",
      expiryDate: "2024-02-28",
      category: "Rewards",
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleGrabOffer = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    alert(`Offer grabbed! ${offer.title} - ${offer.discount} will be applied to your order.`);
  };

  return (
    <div className="offers-page">
      <SEO 
        title="Special Offers"
        description="Exclusive deals and discounts on premium Ayurvedic and herbal products. Limited time offers on organic supplements, skincare, and wellness products."
        keywords={['ayurvedic offers', 'herbal discounts', 'special deals', 'organic products sale', 'wellness offers', 'ayurveda deals']}
        url="https://ayurvedaherbalstore.com/offers"
      />
      <Navbar />
      
      {/* Header */}
      <div className="offers-header">
        <div className="container">
          <h1>Special Offers & Deals</h1>
          <p>Discover amazing discounts on authentic Ayurvedic products</p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="container">
        <div className="offers-grid">
          {offers.map(offer => {
            const daysRemaining = getDaysRemaining(offer.expiryDate);
            const isExpiringSoon = daysRemaining <= 3;
            
            return (
              <div key={offer.id} className={`offer-card ${isExpiringSoon ? 'expiring-soon' : ''}`}>
                <div className="offer-image">
                  <LazyImage src={offer.image} alt={offer.title} />
                  <div className="offer-badge">
                    <span className="discount-text">{offer.discount}</span>
                  </div>
                  {isExpiringSoon && (
                    <div className="expiring-badge">
                      <span>⚠️ Expiring Soon!</span>
                    </div>
                  )}
                </div>
                
                <div className="offer-content">
                  <div className="offer-category">{offer.category}</div>
                  <h3 className="offer-title">{offer.title}</h3>
                  <p className="offer-description">{offer.description}</p>
                  
                  <div className="offer-pricing">
                    <div className="price-comparison">
                      <span className="original-price">{offer.originalPrice}</span>
                      <span className="discounted-price">{offer.discountedPrice}</span>
                    </div>
                  </div>
                  
                  <div className="offer-footer">
                    <div className="expiry-info">
                      <span className="expiry-label">Expires:</span>
                      <span className="expiry-date">{formatDate(offer.expiryDate)}</span>
                      <span className="days-remaining">
                        {daysRemaining > 0 ? `${daysRemaining} days left` : 'Expired'}
                      </span>
                    </div>
                    
                    <button 
                      className="btn grab-offer-btn"
                      onClick={() => handleGrabOffer(offer.id)}
                      disabled={daysRemaining <= 0}
                    >
                      {daysRemaining > 0 ? 'Grab Offer' : 'Expired'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Info */}
      <div className="offers-info">
        <div className="container">
          <h2>How Our Offers Work</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">🎯</div>
              <h3>Limited Time</h3>
              <p>All offers have specific expiry dates. Don't miss out on these exclusive deals!</p>
            </div>
            <div className="info-item">
              <div className="info-icon">💳</div>
              <h3>Easy Redemption</h3>
              <p>Simply click "Grab Offer" and the discount will be automatically applied at checkout.</p>
            </div>
            <div className="info-item">
              <div className="info-icon">🔄</div>
              <h3>Stackable Deals</h3>
              <p>Some offers can be combined with other promotions for even greater savings.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Offers; 