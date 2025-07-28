import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import LazyImage from './LazyImage';
import ScrollReveal from './ScrollReveal';
import './Blog.css';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your Dosha: A Complete Guide to Ayurvedic Body Types",
      date: "February 10, 2024",
      author: "Dr. Priya Sharma",
      authorTitle: "Ayurvedic Practitioner",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop",
      intro: "Discover the three doshas - Vata, Pitta, and Kapha - and learn how understanding your unique body type can transform your health and wellness journey. This comprehensive guide explores the ancient wisdom of Ayurveda and how it applies to modern life.",
      readTime: "8 min read",
      category: "Ayurvedic Basics"
    },
    {
      id: 2,
      title: "Daily Rituals for Balance: Morning Routines According to Ayurveda",
      date: "February 8, 2024",
      author: "Sarah Johnson",
      authorTitle: "Wellness Coach",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      intro: "Start your day the Ayurvedic way with these simple yet powerful morning rituals. From tongue scraping to oil pulling, discover ancient practices that promote detoxification, mental clarity, and overall well-being.",
      readTime: "6 min read",
      category: "Daily Practices"
    },
    {
      id: 3,
      title: "Herbal Remedies for Modern Stress: Natural Solutions for Anxiety and Sleep",
      date: "February 5, 2024",
      author: "Michael Chen",
      authorTitle: "Herbal Medicine Expert",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop",
      intro: "Explore the healing power of adaptogenic herbs like Ashwagandha, Tulsi, and Brahmi. Learn how these ancient remedies can help manage stress, improve sleep quality, and restore your natural energy levels in today's fast-paced world.",
      readTime: "10 min read",
      category: "Herbal Medicine"
    },
    {
      id: 4,
      title: "Seasonal Eating: Ayurvedic Diet for Spring Wellness",
      date: "February 3, 2024",
      author: "Anita Patel",
      authorTitle: "Nutritionist",
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=400&fit=crop",
      intro: "Learn how to adapt your diet according to the seasons using Ayurvedic principles. Discover spring-specific foods that promote detoxification, energy, and balance for optimal health during this rejuvenating season.",
      readTime: "7 min read",
      category: "Seasonal Wellness"
    },
    {
      id: 5,
      title: "The Power of Meditation: Ancient Techniques for Modern Minds",
      date: "February 1, 2024",
      author: "Rajesh Kumar",
      authorTitle: "Meditation Teacher",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop",
      intro: "Explore traditional meditation techniques from Ayurvedic wisdom that can help calm your mind, reduce stress, and improve focus in today's busy world. Simple practices for beginners and advanced practitioners alike.",
      readTime: "9 min read",
      category: "Mental Wellness"
    },
    {
      id: 6,
      title: "Natural Skincare: Ayurvedic Beauty Secrets Revealed",
      date: "January 30, 2024",
      author: "Dr. Sarah Wilson",
      authorTitle: "Dermatologist",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      intro: "Discover ancient Ayurvedic beauty secrets that promote radiant, healthy skin naturally. From herbal face masks to oil cleansing, learn traditional practices that work wonders for all skin types.",
      readTime: "11 min read",
      category: "Beauty & Skincare"
    },
    {
      id: 7,
      title: "Detoxification: Ayurvedic Methods for Body Cleansing",
      date: "January 28, 2024",
      author: "Dr. Amit Singh",
      authorTitle: "Ayurvedic Doctor",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop",
      intro: "Learn about traditional Ayurvedic detoxification methods that help cleanse your body naturally. From Panchakarma to simple home remedies, discover safe and effective ways to eliminate toxins.",
      readTime: "12 min read",
      category: "Detoxification"
    },
    {
      id: 8,
      title: "Yoga and Ayurveda: The Perfect Union for Holistic Health",
      date: "January 25, 2024",
      author: "Priya Desai",
      authorTitle: "Yoga Instructor",
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=400&fit=crop",
      intro: "Explore the deep connection between Yoga and Ayurveda, two sister sciences that work together for complete wellness. Learn how to combine asanas, pranayama, and Ayurvedic principles for optimal health.",
      readTime: "10 min read",
      category: "Yoga & Wellness"
    },
    {
      id: 9,
      title: "Sleep Better Naturally: Ayurvedic Solutions for Insomnia",
      date: "January 22, 2024",
      author: "Dr. Lisa Chen",
      authorTitle: "Sleep Specialist",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop",
      intro: "Discover natural Ayurvedic remedies for better sleep quality. From herbal teas to bedtime rituals, learn how to create the perfect environment for restful, rejuvenating sleep naturally.",
      readTime: "8 min read",
      category: "Sleep & Rest"
    },
    {
      id: 10,
      title: "Immunity Boosters: Ayurvedic Herbs for Stronger Health",
      date: "January 20, 2024",
      author: "Dr. Ramesh Patel",
      authorTitle: "Immunologist",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      intro: "Strengthen your immune system naturally with powerful Ayurvedic herbs and spices. Learn about traditional immunity boosters like Tulsi, Turmeric, and Ginger that have been used for centuries.",
      readTime: "9 min read",
      category: "Immunity"
    },
    {
      id: 11,
      title: "Digestive Health: Ayurvedic Approaches to Gut Wellness",
      date: "January 18, 2024",
      author: "Dr. Maria Garcia",
      authorTitle: "Gastroenterologist",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop",
      intro: "Explore Ayurvedic approaches to digestive health and gut wellness. From dietary guidelines to herbal remedies, discover natural ways to improve digestion and maintain a healthy gut microbiome.",
      readTime: "11 min read",
      category: "Digestive Health"
    },
    {
      id: 12,
      title: "Women's Health: Ayurvedic Wisdom for Feminine Wellness",
      date: "January 15, 2024",
      author: "Dr. Kavita Sharma",
      authorTitle: "Women's Health Specialist",
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=400&fit=crop",
      intro: "Discover Ayurvedic wisdom specifically tailored for women's health and wellness. Learn about natural remedies for hormonal balance, reproductive health, and feminine vitality through traditional practices.",
      readTime: "10 min read",
      category: "Women's Health"
    }
  ];

  // Pagination calculations
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => {
    return blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, blogPosts]);

  const handleReadMore = (postId) => {
    alert(`Reading full article: ${blogPosts.find(post => post.id === postId).title}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className="blog-page">
      <SEO 
        title="Blog - Ayurvedic Wisdom & Wellness Tips"
        description="Discover Ayurvedic wisdom and wellness tips through our expert blog. Learn about natural remedies, holistic health practices, traditional healing methods, and dosha balance."
        keywords={['ayurvedic blog', 'wellness tips', 'natural remedies', 'holistic health', 'ayurveda wisdom', 'traditional healing', 'dosha balance', 'herbal medicine', 'meditation', 'detoxification']}
        url="/blog"
        image="/blog-banner.jpg"
        article={false}
      />
      <Navbar />
      
      {/* Header */}
      <ScrollReveal variant="fadeUp" delay={0.2}>
        <div className="blog-header">
          <div className="container">
            <h1>Ayurvedic Wisdom & Wellness</h1>
            <p>Discover ancient wisdom for modern living through our curated articles on Ayurveda, herbal medicine, and holistic wellness.</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Blog Posts */}
      <div className="container">
        <div className="blog-grid">
          {currentPosts.map((post, index) => (
            <ScrollReveal key={post.id} variant="scaleUp" delay={index * 0.2}>
              <article className="blog-post">
              <div className="post-image">
                <LazyImage src={post.image} alt={post.title} />
                <div className="post-category">{post.category}</div>
              </div>
              
              <div className="post-content">
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-read-time">{post.readTime}</span>
                </div>
                
                <h2 className="post-title">{post.title}</h2>
                
                <div className="post-author">
                  <div className="author-info">
                    <span className="author-name">{post.author}</span>
                    <span className="author-title">{post.authorTitle}</span>
                  </div>
                </div>
                
                <p className="post-intro">{post.intro}</p>
                
                <button 
                  className="read-more-btn"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More
                  <span className="arrow">→</span>
                </button>
              </div>
            </article>
          </ScrollReveal>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <div className="pagination-container">
              <div className="pagination-info">
                <span className="pagination-text">
                  Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, blogPosts.length)} of {blogPosts.length} articles
                </span>
              </div>
              
              <div className="pagination-controls">
                <motion.button
                  className={`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                >
                  <span className="btn-icon">←</span>
                  Previous
                </motion.button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === currentPage;
                    const isNearActive = Math.abs(pageNumber - currentPage) <= 1;
                    const isFirstOrLast = pageNumber === 1 || pageNumber === totalPages;
                    
                    // Show page number if it's active, near active, first, or last
                    if (isActive || isNearActive || isFirstOrLast) {
                      return (
                        <motion.button
                          key={pageNumber}
                          className={`page-number ${isActive ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                          whileHover={{ scale: isActive ? 1 : 1.1 }}
                          whileTap={{ scale: isActive ? 1 : 0.95 }}
                        >
                          {pageNumber}
                        </motion.button>
                      );
                    } else if (pageNumber === 2 && currentPage > 3) {
                      return <span key={`ellipsis-start`} className="page-ellipsis">...</span>;
                    } else if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
                      return <span key={`ellipsis-end`} className="page-ellipsis">...</span>;
                    }
                    return null;
                  })}
                </div>

                <motion.button
                  className={`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                >
                  Next
                  <span className="btn-icon">→</span>
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Newsletter Signup */}
      <ScrollReveal variant="fadeUp" delay={0.3}>
        <div className="blog-newsletter">
          <div className="container">
            <div className="newsletter-content">
              <h2>Stay Updated with Ayurvedic Wisdom</h2>
              <p>Get the latest articles on herbal remedies, wellness tips, and ancient wisdom delivered to your inbox.</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
      <Footer />
    </div>
  );
};

export default Blog; 