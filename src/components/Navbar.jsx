import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import LanguageToggle from './LanguageToggle';
import { languageManager } from '../utils/translations';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languageManager.getLanguage());
  const location = useLocation();

  useEffect(() => {
    const handleLanguageChange = (newLanguage) => {
      setCurrentLanguage(newLanguage);
    };

    languageManager.addListener(handleLanguageChange);
    return () => languageManager.removeListener(handleLanguageChange);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <Link to="/" onClick={closeMenu} aria-label="Go to homepage">
              <h2>🌿 AyurvedaHerbs</h2>
            </Link>
          </div>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} role="menubar">
            <li role="none">
              <Link 
                to="/" 
                onClick={closeMenu}
                className={isActive('/') ? 'active' : ''}
                role="menuitem"
                aria-current={isActive('/') ? 'page' : undefined}
              >
                {languageManager.translate('home')}
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/products" 
                onClick={closeMenu}
                className={isActive('/products') ? 'active' : ''}
                role="menuitem"
                aria-current={isActive('/products') ? 'page' : undefined}
              >
                {languageManager.translate('products')}
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/offers" 
                onClick={closeMenu}
                className={isActive('/offers') ? 'active' : ''}
                role="menuitem"
                aria-current={isActive('/offers') ? 'page' : undefined}
              >
                {languageManager.translate('offers')}
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/blog" 
                onClick={closeMenu}
                className={isActive('/blog') ? 'active' : ''}
                role="menuitem"
                aria-current={isActive('/blog') ? 'page' : undefined}
              >
                {languageManager.translate('blog')}
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/contact" 
                onClick={closeMenu}
                className={isActive('/contact') ? 'active' : ''}
                role="menuitem"
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                {languageManager.translate('contact')}
              </Link>
            </li>
          </ul>
          
          <div className="nav-actions">
            <LanguageToggle />
            <CartIcon onClick={openCart} />
            <Link to="/cart" className="cart-link" aria-label="View shopping cart">
              <span className="cart-text">{languageManager.translate('cart')}</span>
            </Link>
          </div>
          
          <button 
            className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-items"
          >
            <span className="sr-only">Menu</span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <CartModal isOpen={isCartOpen} onClose={closeCart} />
      </div>
    </nav>
  );
};

export default Navbar; 