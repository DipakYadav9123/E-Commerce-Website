import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Us - Ayurveda Herbal Store"
        description="Get in touch with us for any questions about our Ayurvedic products, herbal remedies, or wellness advice."
        keywords={['contact', 'customer support', 'ayurvedic products', 'herbal remedies', 'wellness advice']}
        url="/contact"
      />
      <Navbar />
      
      <main id="main-content" role="main">
        <div className="container">
          <h1>Contact Us</h1>
          
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have questions about our products or need wellness advice? We're here to help!</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <h3>📧 Email</h3>
                  <p>info@ayurvedaherbs.com</p>
                </div>
                
                <div className="contact-item">
                  <h3>📞 Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                
                <div className="contact-item">
                  <h3>📍 Address</h3>
                  <p>123 Wellness Street<br />Natural City, NC 12345</p>
                </div>
                
                <div className="contact-item">
                  <h3>🕒 Hours</h3>
                  <p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn primary-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            
            <div className="faq-item">
              <h3>What are your shipping policies?</h3>
              <p>We offer free shipping on orders over $100. Standard shipping takes 3-5 business days.</p>
            </div>
            
            <div className="faq-item">
              <h3>Are your products organic?</h3>
              <p>Yes, all our products are certified organic and sourced from trusted suppliers.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer refunds?</h3>
              <p>We offer a 30-day money-back guarantee on all our products.</p>
            </div>
            
            <div className="faq-item">
              <h3>How can I track my order?</h3>
              <p>You'll receive a tracking number via email once your order ships.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact; 