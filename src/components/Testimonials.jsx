import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { languageManager } from '../utils/translations';
import './Testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(languageManager.getLanguage());

  useEffect(() => {
    const handleLanguageChange = (newLanguage) => {
      setCurrentLanguage(newLanguage);
    };

    languageManager.addListener(handleLanguageChange);
    return () => languageManager.removeListener(handleLanguageChange);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: {
        en: "Priya Sharma",
        hi: "प्रिया शर्मा"
      },
      location: {
        en: "Mumbai, Maharashtra",
        hi: "मुंबई, महाराष्ट्र"
      },
      rating: 5,
      text: {
        en: "The Ashwagandha powder has completely transformed my sleep quality. I used to struggle with insomnia, but now I sleep like a baby. The quality is exceptional and the taste is much better than other brands I've tried.",
        hi: "अश्वगंधा पाउडर ने मेरी नींद की गुणवत्ता को पूरी तरह से बदल दिया है। मुझे पहले अनिद्रा की समस्या थी, लेकिन अब मैं बच्चे की तरह सोती हूं। गुणवत्ता बेहतरीन है और स्वाद अन्य ब्रांड्स से कहीं बेहतर है।"
      },
      product: {
        en: "Ashwagandha Powder",
        hi: "अश्वगंधा पाउडर"
      },
      avatar: "👩‍⚕️"
    },
    {
      id: 2,
      name: {
        en: "Rajesh Kumar",
        hi: "राजेश कुमार"
      },
      location: {
        en: "Delhi, NCR",
        hi: "दिल्ली, एनसीआर"
      },
      rating: 5,
      text: {
        en: "I've been using the Tulsi tea for 3 months now and my immunity has improved significantly. Even during flu season, I didn't catch any cold. The organic quality is evident from the first sip.",
        hi: "मैं तुलसी चाय 3 महीने से इस्तेमाल कर रहा हूं और मेरी रोग प्रतिरोधक क्षमता में काफी सुधार हुआ है। फ्लू सीजन में भी मुझे कोई सर्दी नहीं हुई। जैविक गुणवत्ता पहली घूंट से ही स्पष्ट है।"
      },
      product: {
        en: "Tulsi Green Tea",
        hi: "तुलसी ग्रीन टी"
      },
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: {
        en: "Meera Patel",
        hi: "मीरा पटेल"
      },
      location: {
        en: "Ahmedabad, Gujarat",
        hi: "अहमदाबाद, गुजरात"
      },
      rating: 5,
      text: {
        en: "The Chyawanprash is absolutely amazing! My kids love the taste and I love that it's boosting their immunity naturally. We've been using it for 6 months and the results are incredible.",
        hi: "च्यवनप्राश बिल्कुल अद्भुत है! मेरे बच्चों को इसका स्वाद पसंद है और मुझे यह पसंद है कि यह उनकी रोग प्रतिरोधक क्षमता को प्राकृतिक रूप से बढ़ा रहा है। हम 6 महीने से इस्तेमाल कर रहे हैं और परिणाम अविश्वसनीय हैं।"
      },
      product: {
        en: "Chyawanprash",
        hi: "च्यवनप्राश"
      },
      avatar: "👩‍👧‍👦"
    },
    {
      id: 4,
      name: {
        en: "Amit Singh",
        hi: "अमित सिंह"
      },
      location: {
        en: "Bangalore, Karnataka",
        hi: "बैंगलोर, कर्नाटक"
      },
      rating: 5,
      text: {
        en: "The Triphala tablets have helped me with digestion issues I've had for years. Within just 2 weeks, I noticed a significant improvement. The packaging is also very convenient for travel.",
        hi: "त्रिफला टैबलेट ने मेरी पाचन समस्याओं में मदद की जो मुझे सालों से थी। सिर्फ 2 हफ्ते में ही मुझे काफी सुधार दिखाई दिया। पैकेजिंग भी यात्रा के लिए बहुत सुविधाजनक है।"
      },
      product: {
        en: "Triphala Tablets",
        hi: "त्रिफला टैबलेट"
      },
      avatar: "👨‍🦱"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : 'empty'}`}>
        {index < rating ? '⭐' : '☆'}
      </span>
    ));
  };

  return (
    <section className="testimonials-section" data-aos="fade-up">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-delay="100">
          <h2>{languageManager.translate('whatOurCustomersSay')}</h2>
          <p>{languageManager.translate('testimonialsSubtitle')}</p>
        </div>

        <div className="testimonials-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="testimonial-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="testimonial-content">
                <div className="testimonial-header">
                  <div className="avatar">{testimonials[currentTestimonial].avatar}</div>
                  <div className="customer-info">
                    <h4>{testimonials[currentTestimonial].name[currentLanguage]}</h4>
                    <p className="location">{testimonials[currentTestimonial].location[currentLanguage]}</p>
                    <div className="rating">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                  </div>
                </div>

                <blockquote className="testimonial-text">
                  "{testimonials[currentTestimonial].text[currentLanguage]}"
                </blockquote>

                <div className="product-mention">
                  <span className="product-label">{languageManager.translate('productUsed')}:</span>
                  <span className="product-name">{testimonials[currentTestimonial].product[currentLanguage]}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="testimonial-dots" data-aos="fade-up" data-aos-delay="300">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="nav-arrow prev"
            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            ‹
          </button>
          <button
            className="nav-arrow next"
            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            aria-label="Next testimonial"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            ›
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators" data-aos="fade-up" data-aos-delay="500">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span>{languageManager.translate('securePayment')}</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🚚</span>
            <span>{languageManager.translate('freeShipping')}</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✅</span>
            <span>{languageManager.translate('qualityAssured')}</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔄</span>
            <span>{languageManager.translate('easyReturns')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 