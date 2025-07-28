import React from 'react';
import { motion } from 'framer-motion';
import './TestimonialsCarousel.css';

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      text: "Amazing quality products! The turmeric powder has really helped with my joint pain.",
      rating: 5
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      text: "Great service and authentic Ayurvedic products. Highly recommended!",
      rating: 5
    },
    {
      id: 3,
      name: "Anita Patel",
      text: "The neem leaves have done wonders for my skin. Natural and effective!",
      rating: 4
    },
    {
      id: 4,
      name: "Dr. Mehta",
      text: "As a practitioner, I trust their products for my patients. Excellent quality.",
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="testimonial-content">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < testimonial.rating ? 'star filled' : 'star'}>
                      ★
                    </span>
                  ))}
                </div>
                
                <p className="testimonial-text">"{testimonial.text}"</p>
                
                <div className="testimonial-author">
                  <span className="author-name">{testimonial.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel; 