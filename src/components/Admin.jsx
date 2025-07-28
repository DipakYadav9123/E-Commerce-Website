import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { languageManager } from '../utils/translations';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import './Admin.css';

const Admin = () => {
  const [currentLanguage, setCurrentLanguage] = useState(languageManager.getLanguage());
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const handleLanguageChange = (newLanguage) => {
      setCurrentLanguage(newLanguage);
    };

    languageManager.addListener(handleLanguageChange);
    return () => languageManager.removeListener(handleLanguageChange);
  }, []);

  // Sample products data
  const sampleProducts = [
    {
      id: 1,
      name: "Turmeric Powder",
      price: "$12.99",
      originalPrice: "$15.99",
      category: "Powders",
      stock: 150,
      sales: 89,
      status: "active",
      discount: 20,
      rating: 4.7,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Neem Leaves",
      price: "$8.99",
      originalPrice: "$10.99",
      category: "Leaves",
      stock: 75,
      sales: 156,
      status: "active",
      discount: 20,
      rating: 4.5,
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Ashwagandha Root",
      price: "$15.99",
      originalPrice: "$19.99",
      category: "Roots",
      stock: 45,
      sales: 234,
      status: "active",
      discount: 25,
      rating: 4.8,
      createdAt: "2024-01-05"
    },
    {
      id: 4,
      name: "Ginger Powder",
      price: "$9.99",
      originalPrice: "$12.99",
      category: "Powders",
      stock: 120,
      sales: 98,
      status: "active",
      discount: 25,
      rating: 4.6,
      createdAt: "2024-01-20"
    },
    {
      id: 5,
      name: "Tulsi Leaves",
      price: "$7.99",
      originalPrice: "$9.99",
      category: "Leaves",
      stock: 0,
      sales: 76,
      status: "out-of-stock",
      discount: 20,
      rating: 4.4,
      createdAt: "2024-01-12"
    }
  ];

  // Sample analytics data
  const sampleAnalytics = {
    totalVisitors: 15420,
    totalOrders: 892,
    totalRevenue: 15680,
    activeUsers: 234
  };

  useEffect(() => {
    setProducts(sampleProducts);
    setAnalytics(sampleAnalytics);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'out-of-stock': return '#dc3545';
      case 'draft': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="admin-dashboard">
      <SEO 
        title="Admin Dashboard - Ayurveda Herbal Store"
        description="Admin dashboard for managing products, analytics, and store operations."
        keywords={['admin', 'dashboard', 'product management', 'analytics']}
        url="/admin"
      />
      <Navbar />
      
      <main className="admin-main">
        <div className="admin-container">
          {/* Header */}
          <motion.div 
            className="admin-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="header-content">
              <h1>🏥 Admin Dashboard</h1>
              <p>Manage your Ayurvedic products and monitor store performance</p>
            </div>
            <div className="header-actions">
              <button 
                className="btn primary-btn"
                onClick={handleAddProduct}
              >
                ➕ Add Product
              </button>
            </div>
          </motion.div>

          {/* Analytics Cards */}
          <motion.div 
            className="analytics-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="analytics-card">
              <div className="card-icon">👥</div>
              <div className="card-content">
                <h3>Total Visitors</h3>
                <p className="card-value">{analytics.totalVisitors.toLocaleString()}</p>
                <span className="card-change positive">+12.5%</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="card-icon">📦</div>
              <div className="card-content">
                <h3>Total Orders</h3>
                <p className="card-value">{analytics.totalOrders}</p>
                <span className="card-change positive">+8.3%</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <h3>Total Revenue</h3>
                <p className="card-value">{formatCurrency(analytics.totalRevenue)}</p>
                <span className="card-change positive">+15.2%</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="card-icon">👤</div>
              <div className="card-content">
                <h3>Active Users</h3>
                <p className="card-value">{analytics.activeUsers}</p>
                <span className="card-change positive">+5.7%</span>
              </div>
            </div>
          </motion.div>

          {/* Products Section */}
          <motion.div 
            className="products-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="section-header">
              <h2>📋 Product Management</h2>
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  <option value="powders">Powders</option>
                  <option value="leaves">Leaves</option>
                  <option value="roots">Roots</option>
                </select>
              </div>
            </div>

            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Sales</th>
                    <th>Status</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="product-row"
                    >
                      <td className="product-info">
                        <div className="product-name">{product.name}</div>
                        {product.discount && (
                          <span className="discount-badge">{product.discount}% OFF</span>
                        )}
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <span className="current-price">{product.price}</span>
                        {product.originalPrice && (
                          <span className="original-price">{product.originalPrice}</span>
                        )}
                      </td>
                      <td>
                        <span className={`stock-level ${product.stock === 0 ? 'out-of-stock' : product.stock < 50 ? 'low-stock' : 'in-stock'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td>{product.sales}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(product.status) }}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <div className="rating">
                          <span className="stars">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                                ★
                              </span>
                            ))}
                          </span>
                          <span className="rating-value">{product.rating}</span>
                        </div>
                      </td>
                      <td className="actions">
                        <button
                          className="btn-icon edit"
                          onClick={() => handleEditProduct(product)}
                          title="Edit Product"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete Product"
                        >
                          🗑️
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin; 