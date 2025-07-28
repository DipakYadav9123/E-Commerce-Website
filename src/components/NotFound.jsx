import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import './NotFound.css';

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const suggestionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="not-found-page">
      <SEO 
        title="Page Not Found - 404 Error"
        description="The page you're looking for doesn't exist. Browse our Ayurvedic products, wellness blog, or contact us for assistance. Find natural healing products and herbal remedies."
        keywords={['page not found', '404 error', 'ayurveda store', 'herbal products', 'natural healing', 'wellness blog']}
        url="/404"
        image="/404-banner.jpg"
      />
      <Navbar />
      
      <motion.div 
        className="not-found-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <motion.div 
            className="not-found-card"
            variants={itemVariants}
          >
            <motion.div 
              className="not-found-icon"
              variants={iconVariants}
              whileHover="hover"
            >
              🌿
            </motion.div>
            
            <motion.h1 
              className="error-code"
              variants={itemVariants}
            >
              404
            </motion.h1>
            
            <motion.h2 
              className="error-title"
              variants={itemVariants}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p 
              className="error-description"
              variants={itemVariants}
            >
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </motion.p>
            
            <motion.div 
              className="not-found-actions"
              variants={itemVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/" className="btn primary-btn">
                  🏠 Go Home
                </Link>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/products" className="btn secondary-btn">
                  🛍️ Browse Products
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="not-found-suggestions"
              variants={suggestionVariants}
            >
              <h3>You might be looking for:</h3>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li variants={itemVariants}>
                  <Link to="/">🏠 Home</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link to="/products">🛍️ Products</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link to="/offers">🎉 Offers</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link to="/blog">📝 Blog</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link to="/contact">📞 Contact</Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div 
            className="floating-elements"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="floating-herb">🌿</div>
            <div className="floating-leaf">🍃</div>
            <div className="floating-flower">🌸</div>
          </motion.div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default NotFound; 