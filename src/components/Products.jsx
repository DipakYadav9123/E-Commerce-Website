import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample products data
  const sampleProducts = [
    {
      id: 1,
      name: "Turmeric Powder",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      description: "Pure organic turmeric powder for natural healing and immunity boost.",
      category: "powders",
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
      category: "leaves",
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
      category: "roots",
      rating: 4.8,
      reviewCount: 189,
      inStock: true,
      badge: {
        type: 'bestseller',
        position: 'top-left'
      }
    },
    {
      id: 4,
      name: "Ginger Powder",
      price: "$9.99",
      originalPrice: "$12.99",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      description: "Organic ginger powder for digestive health and immunity.",
      category: "powders",
      rating: 4.6,
      reviewCount: 98,
      inStock: true,
      discount: 25
    },
    {
      id: 5,
      name: "Tulsi Leaves",
      price: "$7.99",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      description: "Holy basil leaves for respiratory health and stress relief.",
      category: "leaves",
      rating: 4.4,
      reviewCount: 76,
      inStock: false
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleBuyNow = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    }
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'powders', name: 'Powders' },
    { id: 'leaves', name: 'Leaves' },
    { id: 'roots', name: 'Roots' }
  ];

  return (
    <div className="products-page">
      <SEO 
        title="Ayurvedic Products - Natural Healing Remedies"
        description="Discover our collection of authentic Ayurvedic products, herbal remedies, and natural healing supplements for holistic wellness."
        keywords={['ayurvedic products', 'herbal remedies', 'natural healing', 'organic supplements', 'wellness products']}
        url="/products"
      />
      <Navbar />
      
      <main id="main-content" role="main">
        <div className="container">
          <h1>Our Products</h1>
          
          <div className="products-filters">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-section">
              <div className="category-filter">
                <label>Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="sort-filter">
                <label>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuyNow={handleBuyNow}
                  showRating={true}
                  showReviewCount={true}
                  showBadge={true}
                  showAddToCart={true}
                />
              ))
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products; 