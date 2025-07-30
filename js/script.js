// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Wishlist Counter Initialization
function initializeWishlistCounter() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const counters = document.querySelectorAll('.wishlist-counter');
    
    counters.forEach(counter => {
        counter.textContent = wishlist.length;
        counter.style.display = wishlist.length > 0 ? 'inline' : 'none';
    });
}

// Theme Management
let currentTheme = 'light';

// Initialize theme on page load
function initializeTheme() {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('fashionStoreTheme') || 'light';
    setTheme(savedTheme);
}

// Set theme function
function setTheme(theme) {
    console.log('Setting theme to:', theme);
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fashionStoreTheme', theme);
    console.log('Theme applied to document:', document.documentElement.getAttribute('data-theme'));
    
    // Force immediate visual change
    if (theme === 'dark') {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff';
    } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#333333';
    }
    
    // Update theme toggle button
    updateThemeToggleButton();
    console.log('Theme toggle button updated');
}

// Toggle theme function
function toggleTheme() {
    console.log('Toggle theme clicked! Current theme:', currentTheme);
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log('Switching to theme:', newTheme);
    setTheme(newTheme);
    console.log('Theme switched successfully');
}

// Update theme toggle button
function updateThemeToggleButton() {
    const themeToggle = document.querySelector('.theme-toggle-btn');
    if (themeToggle) {
        if (currentTheme === 'light') {
            themeToggle.innerHTML = '🌙';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            themeToggle.title = 'Switch to dark mode';
        } else {
            themeToggle.innerHTML = '🌞';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
            themeToggle.title = 'Switch to light mode';
        }
    }
}

// Create theme toggle button
function createThemeToggleButton() {
    // Check if button already exists
    if (document.querySelector('.theme-toggle-btn')) {
        console.log('Theme toggle button already exists');
        // Update button appearance
        updateThemeToggleButton();
        return;
    }
    
    // Find the navbar container
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) {
        console.log('Nav container not found');
        return;
    }
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle-btn';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Insert button before the hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.parentNode.insertBefore(themeToggle, hamburger);
        console.log('Theme toggle button inserted before hamburger');
    } else {
        // If no hamburger, add to the end
        navContainer.appendChild(themeToggle);
        console.log('Theme toggle button added to nav container');
    }
    
    // Update button appearance
    updateThemeToggleButton();
    console.log('Theme toggle button created successfully');
}

// Cart Counter Initialization
function initializeCartCounter() {
    const cart = JSON.parse(localStorage.getItem('fashionStoreCart') || '[]');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart link in navbar
    const cartLink = document.querySelector('.nav-link[href="cart.html"]');
    if (cartLink) {
        cartLink.innerHTML = `🛒 Cart (${totalItems})`;
    }
}

// Scroll to Top Button
function createScrollToTopButton() {
    // Create the button element
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top-btn';
    scrollButton.innerHTML = '↑ Top';
    scrollButton.setAttribute('aria-label', 'Scroll to top of page');
    scrollButton.setAttribute('title', 'Scroll to top');
    
    // Add click event listener
    scrollButton.addEventListener('click', function() {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click feedback
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 200);
    });
    
    // Add to page
    document.body.appendChild(scrollButton);
    
    return scrollButton;
}

// Show/hide scroll to top button based on scroll position
function toggleScrollToTopButton() {
    const scrollButton = document.querySelector('.scroll-to-top-btn');
    if (!scrollButton) return;
    
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
}

// Initialize scroll to top functionality
function initializeScrollToTop() {
    // Create the button
    createScrollToTopButton();
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleScrollToTopButton);
    
    // Initial check
    toggleScrollToTopButton();
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Newsletter Signup System
function initializeNewsletterSignup() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();
            
            // Validate email
            if (validateNewsletterEmail(email)) {
                // Save email to localStorage
                saveNewsletterEmail(email);
                
                // Show success message
                showNewsletterSuccess();
                
                // Reset form
                newsletterForm.reset();
                
                console.log('Newsletter subscription successful:', email);
            } else {
                // Show error message
                showNewsletterError();
            }
        });
        
        // Real-time validation
        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                // Clear error when user starts typing
                hideNewsletterError();
                this.style.borderColor = '#ddd';
            });
            
            emailInput.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email && !validateNewsletterEmail(email)) {
                    this.style.borderColor = '#e74c3c';
                } else if (email) {
                    this.style.borderColor = '#27ae60';
                }
            });
        }
    }
}

function validateNewsletterEmail(email) {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if email is not empty and matches regex
    if (!email) {
        return false;
    }
    
    if (!emailRegex.test(email)) {
        return false;
    }
    
    // Check if email is already subscribed
    const subscribedEmails = getNewsletterEmails();
    if (subscribedEmails.includes(email.toLowerCase())) {
        return false; // Already subscribed
    }
    
    return true;
}

function saveNewsletterEmail(email) {
    // Get existing emails from localStorage
    const existingEmails = getNewsletterEmails();
    
    // Add new email (convert to lowercase for consistency)
    existingEmails.push(email.toLowerCase());
    
    // Save back to localStorage
    localStorage.setItem('newsletterEmails', JSON.stringify(existingEmails));
    
    console.log('Newsletter email saved:', email);
}

function getNewsletterEmails() {
    // Get emails from localStorage
    const savedEmails = localStorage.getItem('newsletterEmails');
    
    if (savedEmails) {
        try {
            return JSON.parse(savedEmails);
        } catch (error) {
            console.error('Error loading newsletter emails:', error);
            return [];
        }
    }
    
    return [];
}

function showNewsletterSuccess() {
    // Show success message in the message div
    const messageDiv = document.getElementById('newsletterMessage');
    if (messageDiv) {
        messageDiv.textContent = '✅ Thank you for subscribing to our newsletter!';
        messageDiv.className = 'newsletter-message success';
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'newsletter-message';
        }, 5000);
    }
}

function showNewsletterError() {
    // Show error message in the message div
    const messageDiv = document.getElementById('newsletterMessage');
    if (messageDiv) {
        messageDiv.textContent = '❌ Please enter a valid email address or you are already subscribed.';
        messageDiv.className = 'newsletter-message error';
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'newsletter-message';
        }, 5000);
    }
}

function hideNewsletterError() {
    // Clear any existing messages
    const messageDiv = document.getElementById('newsletterMessage');
    if (messageDiv) {
        messageDiv.textContent = '';
        messageDiv.className = 'newsletter-message';
    }
}

// Product Discount Labels System
function initializeDiscountLabels() {
    // Product data with discount information
    const productData = [
        {
            name: 'Casual T-Shirt',
            category: 'men',
            discount: { type: 'sale', percentage: 20 }
        },
        {
            name: 'Elegant Dress',
            category: 'women',
            discount: { type: 'new', percentage: 0 }
        },
        {
            name: 'Denim Jeans',
            category: 'men',
            discount: null // No discount
        },
        {
            name: 'Summer Blouse',
            category: 'women',
            discount: { type: 'hot', percentage: 15 }
        },
        {
            name: 'Cargo Pants',
            category: 'sale',
            discount: { type: 'sale', percentage: 25 }
        },
        {
            name: 'Formal Shirt',
            category: 'men',
            discount: null // No discount
        },
        {
            name: 'Evening Gown',
            category: 'women',
            discount: { type: 'sale', percentage: 30 }
        },
        {
            name: 'Sports Jacket',
            category: 'men',
            discount: { type: 'hot', percentage: 10 }
        }
    ];
    
    // Apply discount labels to product cards
    applyDiscountLabels(productData);
}

function applyDiscountLabels(productData) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        const productInfo = card.querySelector('.product-info h3');
        if (productInfo) {
            const productName = productInfo.textContent;
            
            // Find matching product data
            const product = productData.find(p => p.name === productName);
            
            if (product && product.discount) {
                // Create discount label
                createDiscountLabel(card, product.discount);
                
                // Update price if there's a percentage discount
                if (product.discount.percentage > 0) {
                    updateProductPrice(card, product.discount.percentage);
                }
            }
        }
    });
}

function createDiscountLabel(productCard, discount) {
    // Remove existing discount label if any
    const existingLabel = productCard.querySelector('.discount-label');
    if (existingLabel) {
        existingLabel.remove();
    }
    
    // Create new discount label
    const discountLabel = document.createElement('div');
    discountLabel.className = `discount-label ${discount.type}`;
    
    // Set label text based on discount type
    let labelText = '';
    switch (discount.type) {
        case 'sale':
            labelText = discount.percentage > 0 ? `${discount.percentage}% OFF` : 'SALE';
            break;
        case 'new':
            labelText = 'NEW';
            break;
        case 'hot':
            labelText = discount.percentage > 0 ? `${discount.percentage}% OFF` : 'HOT';
            break;
        default:
            labelText = 'SALE';
    }
    
    discountLabel.textContent = labelText;
    
    // Add label to product card
    productCard.appendChild(discountLabel);
    
    console.log(`Discount label added: ${labelText} for ${productCard.querySelector('.product-info h3').textContent}`);
}

function updateProductPrice(productCard, discountPercentage) {
    const priceElement = productCard.querySelector('.price');
    if (priceElement) {
        const currentPrice = priceElement.textContent;
        
        // Extract numeric price value
        const priceMatch = currentPrice.match(/\$(\d+\.?\d*)/);
        if (priceMatch) {
            const originalPrice = parseFloat(priceMatch[1]);
            const discountedPrice = originalPrice * (1 - discountPercentage / 100);
            
            // Update price display
            priceElement.innerHTML = `
                <span class="original-price">$${originalPrice.toFixed(2)}</span> 
                $${discountedPrice.toFixed(2)}
            `;
            
            console.log(`Price updated: $${originalPrice.toFixed(2)} → $${discountedPrice.toFixed(2)} (${discountPercentage}% off)`);
        }
    }
}

// Enhanced Testimonial Slider System
function initializeTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isAutoPlaying = true;
    
    // Initialize slider
    function showSlide(index) {
        // Hide all slides with fade animation
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = 'translateX(20px)';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide with smooth animation
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.transform = 'translateX(0)';
        dots[index].classList.add('active');
        
        currentSlide = index;
        
        // Add visual feedback to buttons
        updateButtonStates();
    }
    
    // Next slide function
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    // Update button states
    function updateButtonStates() {
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides - 1;
            nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
        }
    }
    
    // Start auto-play
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        isAutoPlaying = true;
    }
    
    // Stop auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        isAutoPlaying = false;
    }
    
    // Add event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            if (isAutoPlaying) {
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            if (isAutoPlaying) {
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play
            }
        });
    }
    
    // Add dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            if (isAutoPlaying) {
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play
            }
        });
    });
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            if (isAutoPlaying) {
                stopAutoPlay();
                startAutoPlay();
            }
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            if (isAutoPlaying) {
                stopAutoPlay();
                startAutoPlay();
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            
            if (isAutoPlaying) {
                stopAutoPlay();
                startAutoPlay();
            }
        }
    }
    
    // Initialize
    showSlide(0);
    startAutoPlay();
    
    console.log('Enhanced testimonial slider initialized with auto-play, keyboard navigation, and touch support');
}

// Reusable Navigation Components
function createNavbar() {
    return `
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo">
                    <h2>Fashion Store</h2>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Home</a></li>
                    <li><a href="products.html" class="nav-link">Products</a></li>
                    <li><a href="about.html" class="nav-link">About</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                    <li class="cart-item">
                        <a href="#" class="nav-link cart-link">
                            🛒 <span class="cart-count">0</span>
                        </a>
                    </li>
                </ul>
                <div class="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
    `;
}

function createFooter() {
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Fashion Store</h3>
                        <p>Your one-stop destination for trendy fashion.</p>
                    </div>
                    <div class="footer-section">
                        <h4>Contact Info</h4>
                        <p>Email: info@fashionstore.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                        <p>Address: 123 Fashion St, City, State</p>
                    </div>
                    <div class="footer-section">
                        <h4>Follow Us</h4>
                        <div class="social-icons">
                            <a href="#" class="social-icon">📘</a>
                            <a href="#" class="social-icon">📷</a>
                            <a href="#" class="social-icon">🐦</a>
                            <a href="#" class="social-icon">📺</a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>Newsletter</h4>
                        <p>Subscribe to get the latest fashion updates!</p>
                        <form class="newsletter-form" id="newsletterForm">
                            <div class="newsletter-input-group">
                                <input type="email" id="newsletterEmail" placeholder="Enter your email" required>
                                <button type="submit" class="newsletter-btn">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Fashion Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function insertNavigation() {
    // Insert navbar at the beginning of body
    const body = document.body;
    const navbarHTML = createNavbar();
    body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Insert footer before closing body tag
    const footerHTML = createFooter();
    body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Set active nav link based on current page
    setActiveNavLink();
    
    // Re-initialize mobile menu functionality
    initializeMobileMenu();
    
    // Initialize cart functionality
    loadCartFromLocalStorage();
    
    // Create theme toggle button
    createThemeToggle();
    
    // Initialize newsletter signup
    initializeNewsletterSignup();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
}

// Enhanced Buy Button Functionality with Loading States
function enhanceBuyButtons() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if size is selected (if size selector exists)
            const productCard = this.closest('.product-card');
            if (productCard && productCard.querySelector('.size-selector-container')) {
                if (!validateSizeSelection(productCard)) {
                    return;
                }
            }
            
            // Add loading state
            this.classList.add('loading');
            this.textContent = '';
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = 'Added!';
                this.style.background = '#27ae60';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = 'Buy Now';
                    this.style.background = '';
                }, 2000);
                
                // Add to cart functionality
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').src;
                const selectedSize = getSelectedSize(productCard);
                
                if (selectedSize) {
                    addToCartWithSize(productName, productPrice, productImage, selectedSize);
                } else {
                    addToCart(productName, productPrice, productImage);
                }
                
            }, 1000);
        });
    });
}

// Enhanced Form Submit with Loading States
function enhanceFormSubmits() {
    const submitButtons = document.querySelectorAll('.submit-btn, .newsletter-btn');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit') {
                // Add loading state for form submissions
                this.classList.add('loading');
                const originalText = this.textContent;
                this.textContent = '';
                
                // Reset loading state after form processing
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 2000);
            }
        });
    });
}

// Enhanced Filter Button Interactions
function enhanceFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Social Icon Interactions
function enhanceSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Add floating animation
            this.style.animation = 'float 0.6s ease-in-out';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Add floating animation CSS
function addFloatingCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Vanilla JS Scroll Animation System
class ScrollAnimator {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -50px 0px',
            triggerOnce: options.triggerOnce !== false,
            debug: options.debug || false
        };
        
        this.observer = null;
        this.animatedElements = new Set();
        this.init();
    }
    
    init() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, falling back to basic animations');
            this.fallbackAnimation();
            return;
        }
        
        // Create observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.handleIntersection(entry);
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
        
        // Start observing elements
        this.observeElements();
        
        console.log('ScrollAnimator initialized');
    }
    
    handleIntersection(entry) {
        const element = entry.target;
        
        if (entry.isIntersecting) {
            // Element is visible
            this.animateIn(element);
            
            // Unobserve if trigger once
            if (this.options.triggerOnce) {
                this.observer.unobserve(element);
                this.animatedElements.add(element);
            }
        } else if (!this.options.triggerOnce) {
            // Element is not visible and can be triggered multiple times
            this.animateOut(element);
        }
    }
    
    animateIn(element) {
        // Add fade-in class
        element.classList.add('fade-in');
        
        // Add debug outline if enabled
        if (this.options.debug) {
            element.classList.add('animation-debug');
        }
        
        // Trigger custom event
        element.dispatchEvent(new CustomEvent('scrollAnimateIn', {
            detail: { element }
        }));
        
        console.log(`Animated in: ${element.tagName}`, element);
    }
    
    animateOut(element) {
        // Remove fade-in class
        element.classList.remove('fade-in');
        
        // Remove debug outline
        element.classList.remove('animation-debug');
        
        // Trigger custom event
        element.dispatchEvent(new CustomEvent('scrollAnimateOut', {
            detail: { element }
        }));
    }
    
    observeElements() {
        const elements = document.querySelectorAll('.scroll-animate');
        
        elements.forEach(element => {
            this.observer.observe(element);
        });
        
        console.log(`Observing ${elements.length} elements for animation`);
    }
    
    observeElement(element) {
        if (element && !this.animatedElements.has(element)) {
            this.observer.observe(element);
        }
    }
    
    unobserveElement(element) {
        if (element) {
            this.observer.unobserve(element);
        }
    }
    
    // Fallback for browsers without IntersectionObserver
    fallbackAnimation() {
        const elements = document.querySelectorAll('.scroll-animate');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 100);
        });
    }
    
    // Destroy observer
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Enhanced Scroll Animation with Staggered Effects
class StaggeredScrollAnimator extends ScrollAnimator {
    constructor(options = {}) {
        super(options);
        this.staggerDelay = options.staggerDelay || 100;
    }
    
    animateIn(element) {
        super.animateIn(element);
        
        // Add staggered delay if parent has stagger-children class
        const parent = element.closest('.stagger-children');
        if (parent) {
            const children = parent.querySelectorAll('.scroll-animate');
            const index = Array.from(children).indexOf(element);
            const delay = index * this.staggerDelay;
            
            element.style.transitionDelay = `${delay}ms`;
        }
    }
}

// Lightweight Animation Utilities
const ScrollAnimationUtils = {
    // Initialize animations
    init(options = {}) {
        window.scrollAnimator = new ScrollAnimator(options);
        return window.scrollAnimator;
    },
    
    // Initialize staggered animations
    initStaggered(options = {}) {
        window.staggeredAnimator = new StaggeredScrollAnimator(options);
        return window.staggeredAnimator;
    },
    
    // Add animation class to element
    addAnimationClass(element, animationClass) {
        if (element) {
            element.classList.add('scroll-animate', animationClass);
            window.scrollAnimator?.observeElement(element);
        }
    },
    
    // Remove animation class from element
    removeAnimationClass(element) {
        if (element) {
            element.classList.remove('scroll-animate', 'fade-in');
            window.scrollAnimator?.unobserveElement(element);
        }
    },
    
    // Animate element immediately
    animateElement(element, animationClass = '') {
        if (element) {
            element.classList.add('scroll-animate', animationClass);
            setTimeout(() => {
                element.classList.add('fade-in');
            }, 10);
        }
    },
    
    // Animate multiple elements with stagger
    animateElements(elements, animationClass = '', staggerDelay = 100) {
        elements.forEach((element, index) => {
            element.classList.add('scroll-animate', animationClass);
            element.style.transitionDelay = `${index * staggerDelay}ms`;
            
            setTimeout(() => {
                element.classList.add('fade-in');
            }, 10);
        });
    },
    
    // Reset all animations
    resetAnimations() {
        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach(element => {
            element.classList.remove('fade-in');
        });
    },
    
    // Destroy animations
    destroy() {
        window.scrollAnimator?.destroy();
        window.staggeredAnimator?.destroy();
    }
};

// Initialize Scroll Animations
function initializeScrollAnimations() {
    // Initialize main scroll animator
    ScrollAnimationUtils.init({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        triggerOnce: true,
        debug: false
    });
    
    // Initialize staggered animator for product cards
    ScrollAnimationUtils.initStaggered({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        triggerOnce: true,
        staggerDelay: 150
    });
    
    // Add animation classes to elements
    addAnimationClassesToElements();
    
    console.log('Scroll animations initialized');
}

// Add animation classes to elements
function addAnimationClassesToElements() {
    // Hero section
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .cta-btn');
    heroElements.forEach((element, index) => {
        element.classList.add('scroll-animate', 'fade-up');
        element.classList.add(`delay-${index * 100}`);
    });
    
    // Featured products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.classList.add('scroll-animate', 'fade-up');
        card.classList.add(`delay-${index * 100}`);
    });
    
    // Testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.classList.add('scroll-animate', 'slide-left');
        card.classList.add(`delay-${index * 200}`);
    });
    
    // Contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('scroll-animate', 'fade-up');
        item.classList.add(`delay-${index * 150}`);
    });
    
    // Value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.classList.add('scroll-animate', 'scale-in');
        item.classList.add(`delay-${index * 200}`);
    });
    
    // Section headings
    const sectionHeadings = document.querySelectorAll('h2, h3');
    sectionHeadings.forEach((heading, index) => {
        heading.classList.add('scroll-animate', 'fade-up');
        heading.classList.add(`delay-${index * 100}`);
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((button, index) => {
        button.classList.add('scroll-animate', 'bounce-in');
        button.classList.add(`delay-${index * 100}`);
    });
    
    // Footer elements
    const footerElements = document.querySelectorAll('.footer h3, .footer p, .social-icon');
    footerElements.forEach((element, index) => {
        element.classList.add('scroll-animate', 'fade-up');
        element.classList.add(`delay-${index * 100}`);
    });
}

// Enhanced Animation for Product Cards
function enhanceProductCardAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Add staggered animation to product card children
        const children = card.querySelectorAll('img, h3, .price, .buy-btn, .size-selector-container');
        
        children.forEach((child, childIndex) => {
            child.classList.add('scroll-animate', 'fade-up');
            child.classList.add(`delay-${(index * 100) + (childIndex * 50)}`);
        });
    });
}

// Animation Performance Optimizer
function optimizeAnimationPerformance() {
    // Use requestAnimationFrame for smooth animations
    const animateElements = () => {
        const elements = document.querySelectorAll('.scroll-animate:not(.fade-in)');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                requestAnimationFrame(() => {
                    element.classList.add('fade-in');
                });
            }
        });
    };
    
    // Throttled scroll listener for performance
    let ticking = false;
    
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                animateElements();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Animation Debug Mode
function enableAnimationDebug() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        element.classList.add('animation-debug');
        
        // Add click to toggle animation
        element.addEventListener('click', () => {
            element.classList.toggle('fade-in');
        });
    });
    
    console.log('Animation debug mode enabled');
}

// Animation Statistics
function getAnimationStats() {
    const totalElements = document.querySelectorAll('.scroll-animate').length;
    const animatedElements = document.querySelectorAll('.scroll-animate.fade-in').length;
    const pendingElements = totalElements - animatedElements;
    
    return {
        total: totalElements,
        animated: animatedElements,
        pending: pendingElements,
        percentage: Math.round((animatedElements / totalElements) * 100)
    };
}

// Interactive Size Selector System
function createSizeSelector(productCard) {
    // Create size selector container
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'size-selector-container';
    
    // Create size label
    const sizeLabel = document.createElement('div');
    sizeLabel.className = 'size-label';
    sizeLabel.textContent = 'Select Size';
    
    // Create size selector
    const sizeSelector = document.createElement('div');
    sizeSelector.className = 'size-selector';
    
    // Available sizes
    const sizes = ['S', 'M', 'L', 'XL'];
    
    // Create size buttons
    sizes.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = 'size-btn';
        sizeBtn.textContent = size;
        sizeBtn.setAttribute('data-size', size);
        sizeBtn.setAttribute('aria-label', `Select size ${size}`);
        
        // Add click event
        sizeBtn.addEventListener('click', function() {
            selectSize(this, productCard);
        });
        
        // Add hover tooltip
        sizeBtn.setAttribute('title', `Size ${size}`);
        
        sizeSelector.appendChild(sizeBtn);
    });
    
    // Add elements to container
    sizeContainer.appendChild(sizeLabel);
    sizeContainer.appendChild(sizeSelector);
    
    // Add to product card
    productCard.appendChild(sizeContainer);
    
    console.log('Size selector created for product card');
    return sizeContainer;
}

function selectSize(clickedBtn, productCard) {
    // Remove selected class from all buttons in this product card
    const sizeBtns = productCard.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    clickedBtn.classList.add('selected');
    
    // Get selected size
    const selectedSize = clickedBtn.getAttribute('data-size');
    
    // Update product card with selected size
    productCard.setAttribute('data-selected-size', selectedSize);
    
    // Show success message
    showSizeSelectedMessage(productCard, selectedSize);
    
    // Update buy button text
    updateBuyButtonWithSize(productCard, selectedSize);
    
    // Add to cart with size
    updateAddToCartWithSize(productCard, selectedSize);
    
    console.log(`Size ${selectedSize} selected for product`);
}

function showSizeSelectedMessage(productCard, selectedSize) {
    // Remove existing message
    const existingMessage = productCard.querySelector('.size-selected-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const message = document.createElement('div');
    message.className = 'size-selected-message';
    message.textContent = `Size ${selectedSize} selected`;
    
    // Add to size selector container
    const sizeContainer = productCard.querySelector('.size-selector-container');
    sizeContainer.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

function updateBuyButtonWithSize(productCard, selectedSize) {
    const buyBtn = productCard.querySelector('.buy-btn');
    if (buyBtn) {
        const originalText = buyBtn.getAttribute('data-original-text') || 'Buy Now';
        buyBtn.textContent = `Buy Now - Size ${selectedSize}`;
        buyBtn.setAttribute('data-original-text', originalText);
    }
}

function updateAddToCartWithSize(productCard, selectedSize) {
    // Update the addToCart function to include size
    const buyBtn = productCard.querySelector('.buy-btn');
    if (buyBtn) {
        buyBtn.onclick = function(e) {
            e.preventDefault();
            
            // Check if size is selected
            if (!selectedSize) {
                showSizeWarning(productCard);
                return;
            }
            
            // Add loading state
            this.classList.add('loading');
            this.textContent = '';
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = 'Added!';
                this.style.background = '#27ae60';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = `Buy Now - Size ${selectedSize}`;
                    this.style.background = '';
                }, 2000);
                
                // Add to cart with size
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').src;
                
                addToCartWithSize(productName, productPrice, productImage, selectedSize);
                
            }, 1000);
        };
    }
}

function showSizeWarning(productCard) {
    // Remove existing warning
    const existingWarning = productCard.querySelector('.size-warning');
    if (existingWarning) {
        existingWarning.remove();
    }
    
    // Create warning message
    const warning = document.createElement('div');
    warning.className = 'size-warning';
    warning.textContent = 'Please select a size before adding to cart';
    
    // Add to size selector container
    const sizeContainer = productCard.querySelector('.size-selector-container');
    sizeContainer.appendChild(warning);
    
    // Remove warning after 3 seconds
    setTimeout(() => {
        if (warning.parentNode) {
            warning.remove();
        }
    }, 3000);
    
    // Add error animation to size buttons
    const sizeBtns = productCard.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.classList.add('error');
        setTimeout(() => {
            btn.classList.remove('error');
        }, 500);
    });
}

function addToCartWithSize(productName, price, image, size) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => 
        item.name === productName && item.size === size
    );
    
    if (existingItem) {
        // If product with same size exists, increase quantity
        existingItem.quantity += 1;
        console.log(`Increased quantity for ${productName} (Size: ${size})`);
    } else {
        // If product doesn't exist, add new item
        cart.push({
            name: productName,
            price: price,
            image: image,
            size: size,
            quantity: 1
        });
        console.log(`Added new item: ${productName} (Size: ${size})`);
    }
    
    // Update cart count in navbar
    updateCartCount();
    
    // Update floating cart counter
    updateFloatingCartCounter();
    
    // Save cart to localStorage
    saveCartToLocalStorage();
    
    // Show success message with size
    showAddToCartMessageWithSize(productName, size);
    
    // Add floating cart button if not exists
    if (!document.querySelector('.floating-cart-btn')) {
        createFloatingCartButton();
    }
}

function showAddToCartMessageWithSize(productName, size) {
    // Create a temporary success message
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.innerHTML = `✅ ${productName} (Size: ${size}) added to cart!`;
    
    // Add message to page
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function initializeSizeSelectors() {
    // Find all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Add size selector to each product card
        createSizeSelector(card);
        
        // Add some random size availability for demo
        const sizeBtns = card.querySelectorAll('.size-btn');
        const randomUnavailable = Math.floor(Math.random() * 2); // 0-1 unavailable sizes
        
        if (randomUnavailable > 0) {
            const randomIndex = Math.floor(Math.random() * sizeBtns.length);
            sizeBtns[randomIndex].classList.add('disabled');
            sizeBtns[randomIndex].setAttribute('aria-label', 'Size not available');
            sizeBtns[randomIndex].title = 'Size not available';
        }
    });
    
    console.log(`Size selectors initialized for ${productCards.length} product cards`);
}

function getSelectedSize(productCard) {
    return productCard.getAttribute('data-selected-size');
}

function clearSizeSelection(productCard) {
    const sizeBtns = productCard.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    productCard.removeAttribute('data-selected-size');
    
    // Reset buy button
    const buyBtn = productCard.querySelector('.buy-btn');
    if (buyBtn) {
        const originalText = buyBtn.getAttribute('data-original-text') || 'Buy Now';
        buyBtn.textContent = originalText;
    }
    
    // Remove messages
    const messages = productCard.querySelectorAll('.size-selected-message, .size-warning');
    messages.forEach(msg => msg.remove());
}

function validateSizeSelection(productCard) {
    const selectedSize = getSelectedSize(productCard);
    
    if (!selectedSize) {
        showSizeWarning(productCard);
        return false;
    }
    
    return true;
}

// Enhanced Product Card with Size Selector
function enhanceProductCardsWithSize() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add size selector if not already present
        if (!card.querySelector('.size-selector-container')) {
            createSizeSelector(card);
        }
        
        // Enhance buy button to check for size selection
        const buyBtn = card.querySelector('.buy-btn');
        if (buyBtn) {
            buyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Check if size is selected
                if (!validateSizeSelection(card)) {
                    return;
                }
                
                // Proceed with add to cart
                const selectedSize = getSelectedSize(card);
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.price').textContent;
                const productImage = card.querySelector('img').src;
                
                addToCartWithSize(productName, productPrice, productImage, selectedSize);
            });
        }
    });
}

// Back to Top Button System
function createBackToTopButton() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.title = 'Back to Top';
    backToTopBtn.setAttribute('aria-label', 'Scroll to top of page');
    
    // Add button to page
    document.body.appendChild(backToTopBtn);
    
    // Add click event for smooth scrolling
    backToTopBtn.addEventListener('click', function() {
        scrollToTop();
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        toggleBackToTopButton();
    });
    
    console.log('Back to top button created');
    return backToTopBtn;
}

function toggleBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (!backToTopBtn) return;
    
    // Show button after scrolling 400px
    if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (!backToTopBtn) return;
    
    // Add loading state
    backToTopBtn.classList.add('loading');
    
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Remove loading state after scroll completes
    setTimeout(() => {
        backToTopBtn.classList.remove('loading');
        backToTopBtn.classList.add('success');
        
        // Remove success state after 2 seconds
        setTimeout(() => {
            backToTopBtn.classList.remove('success');
        }, 2000);
    }, 1000);
    
    console.log('Scrolled to top');
}

// Enhanced Scroll to Top with Progress Tracking
function createEnhancedBackToTopButton() {
    const backToTopBtn = createBackToTopButton();
    
    // Add scroll progress tracking
    window.addEventListener('scroll', function() {
        const scrollProgress = getScrollProgress();
        updateBackToTopButtonProgress(backToTopBtn, scrollProgress);
    });
    
    return backToTopBtn;
}

function getScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    return Math.min(scrollPercent, 100);
}

function updateBackToTopButtonProgress(button, progress) {
    if (progress > 10) { // Show button after 10% scroll
        button.classList.add('show');
        
        // Add visual feedback based on scroll progress
        if (progress > 50) {
            button.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        } else {
            button.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        }
    } else {
        button.classList.remove('show');
    }
}

// Floating Cart Button System
function createFloatingCartButton() {
    // Create floating cart button
    const floatingCartBtn = document.createElement('button');
    floatingCartBtn.className = 'floating-cart-btn';
    floatingCartBtn.innerHTML = '🛒';
    floatingCartBtn.title = 'View Cart';
    floatingCartBtn.setAttribute('aria-label', 'View shopping cart');
    
    // Create cart counter badge
    const cartCounter = document.createElement('span');
    cartCounter.className = 'cart-counter';
    cartCounter.textContent = '0';
    
    // Add counter to button
    floatingCartBtn.appendChild(cartCounter);
    
    // Add button to page
    document.body.appendChild(floatingCartBtn);
    
    // Add click event to navigate to cart
    floatingCartBtn.addEventListener('click', function() {
        navigateToCart();
    });
    
    // Initialize cart counter
    updateFloatingCartCounter();
    
    console.log('Floating cart button created');
    return { button: floatingCartBtn, counter: cartCounter };
}

function updateFloatingCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    if (!cartCounter) return;
    
    // Get cart data from localStorage
    const cartData = getCartFromLocalStorage();
    const totalItems = cartData.reduce((total, item) => total + item.quantity, 0);
    
    // Update counter text
    cartCounter.textContent = totalItems;
    
    // Show/hide counter based on items
    if (totalItems > 0) {
        cartCounter.classList.add('show');
    } else {
        cartCounter.classList.remove('show');
    }
    
    // Add pulse animation if items were just added
    if (totalItems > 0) {
        cartCounter.classList.add('updated');
        setTimeout(() => {
            cartCounter.classList.remove('updated');
        }, 600);
    }
    
    console.log(`Floating cart counter updated: ${totalItems} items`);
}

function getCartFromLocalStorage() {
    try {
        const savedCart = localStorage.getItem('fashionCart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
    }
}

function navigateToCart() {
    // Check if cart.html exists, otherwise show cart summary
    if (window.location.pathname.includes('cart.html')) {
        // Already on cart page, just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Navigate to cart page
        window.location.href = 'cart.html';
    }
}

// Enhanced Cart System with Floating Button Integration
let cart = [];

function addToCart(productName, price, image) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        // If product exists, increase quantity
        existingItem.quantity += 1;
        console.log(`Increased quantity for ${productName}`);
    } else {
        // If product doesn't exist, add new item
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
        console.log(`Added new item: ${productName}`);
    }
    
    // Update cart count in navbar
    updateCartCount();
    
    // Update floating cart counter
    updateFloatingCartCounter();
    
    // Save cart to localStorage
    saveCartToLocalStorage();
    
    // Show success message
    showAddToCartMessage(productName);
    
    // Add floating cart button if not exists
    if (!document.querySelector('.floating-cart-btn')) {
        createFloatingCartButton();
    }
}

function updateCartCount() {
    // Calculate total items in cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count in navbar
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        
        // Add animation class
        cartCountElement.classList.add('cart-updated');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            cartCountElement.classList.remove('cart-updated');
        }, 300);
    }
    
    console.log(`Cart updated: ${totalItems} items`);
}

function saveCartToLocalStorage() {
    // Save cart data to browser's localStorage
    localStorage.setItem('fashionCart', JSON.stringify(cart));
    console.log('Cart saved to localStorage');
}

function loadCartFromLocalStorage() {
    // Load cart data from localStorage
    const savedCart = localStorage.getItem('fashionCart');
    
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartCount();
            updateFloatingCartCounter();
            console.log('Cart loaded from localStorage');
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            cart = [];
        }
    } else {
        cart = [];
        console.log('No saved cart found, starting with empty cart');
    }
}

function showAddToCartMessage(productName) {
    // Create a temporary success message
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.innerHTML = `✅ ${productName} added to cart!`;
    
    // Add message to page
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function showCartMessage() {
    // Show cart contents in a simple alert
    if (cart.length === 0) {
        alert('Your cart is empty. Add some products!');
    } else {
        let cartSummary = 'Your Cart:\n\n';
        let totalPrice = 0;
        
        cart.forEach(item => {
            const price = parseFloat(item.price.replace('$', ''));
            const itemTotal = price * item.quantity;
            totalPrice += itemTotal;
            
            const sizeInfo = item.size ? ` (Size: ${item.size})` : '';
            cartSummary += `${item.name}${sizeInfo} x${item.quantity} - $${itemTotal.toFixed(2)}\n`;
        });
        
        cartSummary += `\nTotal: $${totalPrice.toFixed(2)}`;
        cartSummary += '\n\nThis is a demo cart. In a real store, you would proceed to checkout.';
        
        alert(cartSummary);
    }
}

function clearCart() {
    // Clear all items from cart
    cart = [];
    updateCartCount();
    updateFloatingCartCounter();
    saveCartToLocalStorage();
    console.log('Cart cleared');
}

// Contact Form Validation
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Get error elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            
            // Reset error messages
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            
            // Remove error styling
            nameInput.style.borderColor = '#ddd';
            emailInput.style.borderColor = '#ddd';
            messageInput.style.borderColor = '#ddd';
            
            let isValid = true;
            
            // Validate Name
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required';
                nameInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                nameInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required';
                messageInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                messageInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                submitForm(nameInput.value.trim(), emailInput.value.trim(), messageInput.value.trim());
            }
        });
        
        // Real-time validation on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
                this.style.borderColor = '#ddd';
            });
        });
    }
}

function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    
    if (field.id === 'name') {
        if (!field.value.trim()) {
            errorElement.textContent = 'Name is required';
            field.style.borderColor = '#e74c3c';
        } else if (field.value.trim().length < 2) {
            errorElement.textContent = 'Name must be at least 2 characters';
            field.style.borderColor = '#e74c3c';
        } else {
            errorElement.textContent = '';
            field.style.borderColor = '#27ae60';
        }
    }
    
    if (field.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!field.value.trim()) {
            errorElement.textContent = 'Email is required';
            field.style.borderColor = '#e74c3c';
        } else if (!emailRegex.test(field.value.trim())) {
            errorElement.textContent = 'Please enter a valid email address';
            field.style.borderColor = '#e74c3c';
        } else {
            errorElement.textContent = '';
            field.style.borderColor = '#27ae60';
        }
    }
    
    if (field.id === 'message') {
        if (!field.value.trim()) {
            errorElement.textContent = 'Message is required';
            field.style.borderColor = '#e74c3c';
        } else if (field.value.trim().length < 10) {
            errorElement.textContent = 'Message must be at least 10 characters';
            field.style.borderColor = '#e74c3c';
        } else {
            errorElement.textContent = '';
            field.style.borderColor = '#27ae60';
        }
    }
}

function submitForm(name, email, message) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset all field borders
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
        });
        
        // Clear all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
    }, 2000);
}

// Enhanced Product Filtering System
function initializeProductFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    let currentCategory = 'all';

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active button state
            updateActiveFilterButton(this);
            
            // Filter products
            filterProducts(selectedCategory);
            
            // Update current category
            currentCategory = selectedCategory;
            
            // Add animation to filtered products
            animateFilteredProducts();
            
            console.log(`Filtered to category: ${selectedCategory}`);
        });
    });

    // Function to update active filter button
    function updateActiveFilterButton(activeButton) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(1)';
        });
        
        // Add active class to clicked button
        activeButton.classList.add('active');
        activeButton.style.transform = 'scale(1.05)';
        
        // Add ripple effect
        addRippleEffect(activeButton);
    }

    // Function to filter products
    function filterProducts(category) {
        let visibleCount = 0;
        
        productCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                // Show product card
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Staggered animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
                
                visibleCount++;
            } else {
                // Hide product card
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
        
        // Show/hide no products message
        if (visibleCount === 0) {
            showNoProductsMessage(category);
        } else {
            hideNoProductsMessage();
        }
        
        // Update product count display
        updateProductCount(visibleCount, category);
    }

    // Function to animate filtered products
    function animateFilteredProducts() {
        const visibleCards = document.querySelectorAll('.product-card[style*="display: block"]');
        
        visibleCards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
        });
    }

    // Function to add ripple effect to filter buttons
    function addRippleEffect(button) {
        const ripple = document.createElement('span');
        ripple.className = 'filter-ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(231, 76, 60, 0.3);
            transform: scale(0);
            animation: filterRipple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Function to show no products message
    function showNoProductsMessage(category) {
        let message = document.querySelector('.no-products-message');
        if (!message) {
            message = document.createElement('div');
            message.className = 'no-products-message';
            message.style.cssText = `
                text-align: center;
                padding: 3rem;
                color: #666;
                font-size: 1.1rem;
                background: #f8f9fa;
                border-radius: 10px;
                margin: 2rem 0;
                animation: fadeIn 0.5s ease;
            `;
        }
        
        const categoryNames = {
            'men': 'Men\'s',
            'women': 'Women\'s',
            'kids': 'Kids\'',
            'sale': 'Sale'
        };
        
        const categoryName = categoryNames[category] || category;
        message.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <span style="font-size: 3rem;">🛍️</span>
            </div>
            <h3 style="margin-bottom: 1rem; color: #333;">No ${categoryName} Products Found</h3>
            <p style="margin-bottom: 1.5rem;">We're currently updating our ${categoryName.toLowerCase()} collection. Please check back soon!</p>
            <button class="filter-btn" data-category="all" style="margin: 0 0.5rem;">View All Products</button>
        `;
        
        document.querySelector('.products-grid').appendChild(message);
        
        // Add click event to "View All Products" button
        const viewAllBtn = message.querySelector('.filter-btn');
        viewAllBtn.addEventListener('click', function() {
            filterProducts('all');
            updateActiveFilterButton(document.querySelector('.filter-btn[data-category="all"]'));
            message.remove();
        });
    }

    // Function to hide no products message
    function hideNoProductsMessage() {
        const message = document.querySelector('.no-products-message');
        if (message) {
            message.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                message.remove();
            }, 300);
        }
    }

    // Function to update product count display
    function updateProductCount(count, category) {
        let countDisplay = document.querySelector('.product-count');
        if (!countDisplay) {
            countDisplay = document.createElement('div');
            countDisplay.className = 'product-count';
            countDisplay.style.cssText = `
                text-align: center;
                margin: 1rem 0;
                font-size: 1rem;
                color: #666;
                font-weight: 500;
            `;
            document.querySelector('.filter-section .container').appendChild(countDisplay);
        }
        
        const categoryNames = {
            'all': 'All Products',
            'men': 'Men\'s Products',
            'women': 'Women\'s Products',
            'kids': 'Kids\' Products',
            'sale': 'Sale Products'
        };
        
        const categoryName = categoryNames[category] || category;
        countDisplay.textContent = `${count} ${categoryName} found`;
        
        // Animate count update
        countDisplay.style.animation = 'none';
        countDisplay.offsetHeight; // Trigger reflow
        countDisplay.style.animation = 'fadeInUp 0.5s ease';
    }

    // Add CSS for filter animations
    addFilterAnimationsCSS();
    
    // Initialize with all products
    updateProductCount(productCards.length, 'all');
}

// Add CSS for filter animations
function addFilterAnimationsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes filterRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .product-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .no-products-message {
            transition: all 0.3s ease;
        }
        
        .product-count {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Buy Button Functionality with Loading States
function enhanceBuyButtons() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if size is selected (if size selector exists)
            const productCard = this.closest('.product-card');
            if (productCard && productCard.querySelector('.size-selector-container')) {
                if (!validateSizeSelection(productCard)) {
                    return;
                }
            }
            
            // Add loading state
            this.classList.add('loading');
            this.textContent = '';
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = 'Added!';
                this.style.background = '#27ae60';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = 'Buy Now';
                    this.style.background = '';
                }, 2000);
                
                // Add to cart functionality
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').src;
                const selectedSize = getSelectedSize(productCard);
                
                if (selectedSize) {
                    addToCartWithSize(productName, productPrice, productImage, selectedSize);
                } else {
                    addToCart(productName, productPrice, productImage);
                }
                
            }, 1000);
        });
    });
}

// Enhanced Form Submit with Loading States
function enhanceFormSubmits() {
    const submitButtons = document.querySelectorAll('.submit-btn, .newsletter-btn');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit') {
                // Add loading state for form submissions
                this.classList.add('loading');
                const originalText = this.textContent;
                this.textContent = '';
                
                // Reset loading state after form processing
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 2000);
            }
        });
    });
}

// Parallax Effect for Product Cards
function addParallaxEffect() {
    const productCards = document.querySelectorAll('.product-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        productCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Magnetic Effect for Buttons
function addMagneticEffect() {
    const magneticButtons = document.querySelectorAll('.cta-btn, .buy-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Enhanced Filter Button Interactions
function enhanceFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Social Icon Interactions
function enhanceSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Add floating animation
            this.style.animation = 'float 0.6s ease-in-out';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Add floating animation CSS
function addFloatingCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Scroll Animation System - Duplicate removed

// Initialize Scroll Animations
function initializeScrollAnimations() {
    // Initialize main scroll animator
    ScrollAnimationUtils.init({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        triggerOnce: true,
        debug: false
    });
    
    // Initialize staggered animator for product cards
    ScrollAnimationUtils.initStaggered({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        triggerOnce: true,
        staggerDelay: 150
    });
    
    // Add animation classes to elements
    addAnimationClassesToElements();
    
    console.log('Scroll animations initialized');
}

// Add animation classes to elements
function addAnimationClassesToElements() {
    // Hero section
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .cta-btn');
    heroElements.forEach((element, index) => {
        element.classList.add('scroll-animate', 'fade-up');
        element.classList.add(`delay-${index * 100}`);
    });
    
    // Featured products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.classList.add('scroll-animate', 'fade-up');
        card.classList.add(`delay-${index * 100}`);
    });
    
    // Testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.classList.add('scroll-animate', 'slide-left');
        card.classList.add(`delay-${index * 200}`);
    });
    
    // Contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('scroll-animate', 'fade-up');
        item.classList.add(`delay-${index * 150}`);
    });
    
    // Value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.classList.add('scroll-animate', 'scale-in');
        item.classList.add(`delay-${index * 200}`);
    });
    
    // Section headings
    const sectionHeadings = document.querySelectorAll('h2, h3');
    sectionHeadings.forEach((heading, index) => {
        heading.classList.add('scroll-animate', 'fade-up');
        heading.classList.add(`delay-${index * 100}`);
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((button, index) => {
        button.classList.add('scroll-animate', 'bounce-in');
        button.classList.add(`delay-${index * 100}`);
    });
    
    // Footer elements
    const footerElements = document.querySelectorAll('.footer h3, .footer p, .social-icon');
    footerElements.forEach((element, index) => {
        element.classList.add('scroll-animate', 'fade-up');
        element.classList.add(`delay-${index * 100}`);
    });
}

// Enhanced Animation for Product Cards
function enhanceProductCardAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Add staggered animation to product card children
        const children = card.querySelectorAll('img, h3, .price, .buy-btn, .size-selector-container');
        
        children.forEach((child, childIndex) => {
            child.classList.add('scroll-animate', 'fade-up');
            child.classList.add(`delay-${(index * 100) + (childIndex * 50)}`);
        });
    });
}

// Animation Performance Optimizer
function optimizeAnimationPerformance() {
    // Use requestAnimationFrame for smooth animations
    const animateElements = () => {
        const elements = document.querySelectorAll('.scroll-animate:not(.fade-in)');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                requestAnimationFrame(() => {
                    element.classList.add('fade-in');
                });
            }
        });
    };
    
    // Throttled scroll listener for performance
    let ticking = false;
    
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                animateElements();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Animation Debug Mode
function enableAnimationDebug() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        element.classList.add('animation-debug');
        
        // Add click to toggle animation
        element.addEventListener('click', () => {
            element.classList.toggle('fade-in');
        });
    });
    
    console.log('Animation debug mode enabled');
}

// Animation Statistics
function getAnimationStats() {
    const totalElements = document.querySelectorAll('.scroll-animate').length;
    const animatedElements = document.querySelectorAll('.scroll-animate.fade-in').length;
    const pendingElements = totalElements - animatedElements;
    
    return {
        total: totalElements,
        animated: animatedElements,
        pending: pendingElements,
        percentage: Math.round((animatedElements / totalElements) * 100)
    };
}

// Interactive Size Selector System
function createSizeSelector(productCard) {
    // Create size selector container
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'size-selector-container';
    
    // Create size label
    const sizeLabel = document.createElement('div');
    sizeLabel.className = 'size-label';
    sizeLabel.textContent = 'Select Size';
    
    // Create size selector
    const sizeSelector = document.createElement('div');
    sizeSelector.className = 'size-selector';
    
    // Available sizes
    const sizes = ['S', 'M', 'L', 'XL'];
    
    // Create size buttons
    sizes.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = 'size-btn';
        sizeBtn.textContent = size;
        sizeBtn.setAttribute('data-size', size);
        sizeBtn.setAttribute('aria-label', `Select size ${size}`);
        
        // Add click event
        sizeBtn.addEventListener('click', function() {
            selectSize(this, productCard);
        });
        
        // Add hover tooltip
        sizeBtn.setAttribute('title', `Size ${size}`);
        
        sizeSelector.appendChild(sizeBtn);
    });
    
    // Add elements to container
    sizeContainer.appendChild(sizeLabel);
    sizeContainer.appendChild(sizeSelector);
    
    // Add to product card
    productCard.appendChild(sizeContainer);
    
    console.log('Size selector created for product card');
    return sizeContainer;
}

function selectSize(clickedBtn, productCard) {
    // Remove selected class from all buttons in this product card
    const sizeBtns = productCard.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    clickedBtn.classList.add('selected');
    
    // Get selected size
    const selectedSize = clickedBtn.getAttribute('data-size');
    
    // Update product card with selected size
    productCard.setAttribute('data-selected-size', selectedSize);
    
    // Show success message
    showSizeSelectedMessage(productCard, selectedSize);
    
    // Update buy button text
    updateBuyButtonWithSize(productCard, selectedSize);
    
    // Add to cart with size
    updateAddToCartWithSize(productCard, selectedSize);
    
    console.log(`Size ${selectedSize} selected for product`);
}

function showSizeSelectedMessage(productCard, selectedSize) {
    // Remove existing message
    const existingMessage = productCard.querySelector('.size-selected-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const message = document.createElement('div');
    message.className = 'size-selected-message';
    message.textContent = `Size ${selectedSize} selected`;
    
    // Add to size selector container
    const sizeContainer = productCard.querySelector('.size-selector-container');
    sizeContainer.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

function updateBuyButtonWithSize(productCard, selectedSize) {
    const buyBtn = productCard.querySelector('.buy-btn');
    if (buyBtn) {
        const originalText = buyBtn.getAttribute('data-original-text') || 'Buy Now';
        buyBtn.textContent = `Buy Now - Size ${selectedSize}`;
        buyBtn.setAttribute('data-original-text', originalText);
    }
}

function updateAddToCartWithSize(productCard, selectedSize) {
    // Update the addToCart function to include size
    const buyBtn = productCard.querySelector('.buy-btn');
    if (buyBtn) {
        buyBtn.onclick = function(e) {
            e.preventDefault();
            
            // Check if size is selected
            if (!selectedSize) {
                showSizeWarning(productCard);
                return;
            }
            
            // Add loading state
            this.classList.add('loading');
            this.textContent = '';
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = 'Added!';
                this.style.background = '#27ae60';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = `Buy Now - Size ${selectedSize}`;
                    this.style.background = '';
                }, 2000);
                
                // Add to cart with size
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').src;
                
                addToCartWithSize(productName, productPrice, productImage, selectedSize);
                
            }, 1000);
        };
    }
}

function showSizeWarning(productCard) {
    // Remove existing warning
    const existingWarning = productCard.querySelector('.size-warning');
    if (existingWarning) {
        existingWarning.remove();
    }
    
    // Create warning message
    const warning = document.createElement('div');
    warning.className = 'size-warning';
    warning.textContent = 'Please select a size before adding to cart';
    
    // Add to size selector container
    const sizeContainer = productCard.querySelector('.size-selector-container');
    sizeContainer.appendChild(warning);
    
    // Remove warning after 3 seconds
    setTimeout(() => {
        if (warning.parentNode) {
            warning.remove();
        }
    }, 3000);
    
    // Add error animation to size buttons
    const sizeBtns = productCard.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.classList.add('error');
        setTimeout(() => {
            btn.classList.remove('error');
        }, 500);
    });
}

function addToCartWithSize(productName, price, image, size) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => 
        item.name === productName && item.size === size
    );
    
    if (existingItem) {
        // If product with same size exists, increase quantity
        existingItem.quantity += 1;
        console.log(`Increased quantity for ${productName} (Size: ${size})`);
    } else {
        // If product doesn't exist, add new item
        cart.push({
            name: productName,
            price: price,
            image: image,
            size: size,
            quantity: 1
        });
        console.log(`Added new item: ${productName} (Size: ${size})`);
    }
    
    // Update cart count in navbar
    updateCartCount();
    
    // Update floating cart counter
    updateFloatingCartCounter();
    
    // Save cart to localStorage
    saveCartToLocalStorage();
    
    // Show success message with size
    showAddToCartMessageWithSize(productName, size);
    
    // Add floating cart button if not exists
    if (!document.querySelector('.floating-cart-btn')) {
        createFloatingCartButton();
    }
}

function showAddToCartMessageWithSize(productName, size) {
    // Create a temporary success message
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.innerHTML = `✅ ${productName} (Size: ${size}) added to cart!`;
    
    // Add message to page
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function initializeSizeSelectors() {
    // Find all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Add size selector to each product card
        createSizeSelector(card);
        
        // Add some random size availability for demo
        const sizeBtns = card.querySelectorAll('.size-btn');
        const randomUnavailable = Math.floor(Math.random() * 2); // 0-1 unavailable sizes
        
        if (randomUnavailable > 0) {
            const randomIndex = Math.floor(Math.random() * sizeBtns.length);
            sizeBtns[randomIndex].classList.add('disabled');
            sizeBtns[randomIndex].setAttribute('aria-label', 'Size not available');
            sizeBtns[randomIndex].title = 'Size not available';
        }
    });
    
    console.log(`Size selectors initialized for ${productCards.length} product cards`);
}

function getSelectedSize(productCard) {
    return productCard.getAttribute('data-selected-size');
}

function clearSizeSelection(productCard) {
    const sizeBtns = productCard.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    productCard.removeAttribute('data-selected-size');
    
    // Reset buy button
    const buyBtn = productCard.querySelector('.buy-btn');
    if (buyBtn) {
        const originalText = buyBtn.getAttribute('data-original-text') || 'Buy Now';
        buyBtn.textContent = originalText;
    }
    
    // Remove messages
    const messages = productCard.querySelectorAll('.size-selected-message, .size-warning');
    messages.forEach(msg => msg.remove());
}

function validateSizeSelection(productCard) {
    const selectedSize = getSelectedSize(productCard);
    
    if (!selectedSize) {
        showSizeWarning(productCard);
        return false;
    }
    
    return true;
}

// Enhanced Product Card with Size Selector
function enhanceProductCardsWithSize() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add size selector if not already present
        if (!card.querySelector('.size-selector-container')) {
            createSizeSelector(card);
        }
        
        // Enhance buy button to check for size selection
        const buyBtn = card.querySelector('.buy-btn');
        if (buyBtn) {
            buyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Check if size is selected
                if (!validateSizeSelection(card)) {
                    return;
                }
                
                // Proceed with add to cart
                const selectedSize = getSelectedSize(card);
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.price').textContent;
                const productImage = card.querySelector('img').src;
                
                addToCartWithSize(productName, productPrice, productImage, selectedSize);
            });
        }
    });
}

// Back to Top Button System
function createBackToTopButton() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.title = 'Back to Top';
    backToTopBtn.setAttribute('aria-label', 'Scroll to top of page');
    
    // Add button to page
    document.body.appendChild(backToTopBtn);
    
    // Add click event for smooth scrolling
    backToTopBtn.addEventListener('click', function() {
        scrollToTop();
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        toggleBackToTopButton();
    });
    
    console.log('Back to top button created');
    return backToTopBtn;
}

function toggleBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (!backToTopBtn) return;
    
    // Show button after scrolling 400px
    if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (!backToTopBtn) return;
    
    // Add loading state
    backToTopBtn.classList.add('loading');
    
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Remove loading state after scroll completes
    setTimeout(() => {
        backToTopBtn.classList.remove('loading');
        backToTopBtn.classList.add('success');
        
        // Remove success state after 2 seconds
        setTimeout(() => {
            backToTopBtn.classList.remove('success');
        }, 2000);
    }, 1000);
    
    console.log('Scrolled to top');
}

// Enhanced Scroll to Top with Progress Tracking
function createEnhancedBackToTopButton() {
    const backToTopBtn = createBackToTopButton();
    
    // Add scroll progress tracking
    window.addEventListener('scroll', function() {
        const scrollProgress = getScrollProgress();
        updateBackToTopButtonProgress(backToTopBtn, scrollProgress);
    });
    
    return backToTopBtn;
}

function getScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    return Math.min(scrollPercent, 100);
}

function updateBackToTopButtonProgress(button, progress) {
    if (progress > 10) { // Show button after 10% scroll
        button.classList.add('show');
        
        // Add visual feedback based on scroll progress
        if (progress > 50) {
            button.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        } else {
            button.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        }
    } else {
        button.classList.remove('show');
    }
}

// Floating Cart Button System
function createFloatingCartButton() {
    // Create floating cart button
    const floatingCartBtn = document.createElement('button');
    floatingCartBtn.className = 'floating-cart-btn';
    floatingCartBtn.innerHTML = '🛒';
    floatingCartBtn.title = 'View Cart';
    floatingCartBtn.setAttribute('aria-label', 'View shopping cart');
    
    // Create cart counter badge
    const cartCounter = document.createElement('span');
    cartCounter.className = 'cart-counter';
    cartCounter.textContent = '0';
    
    // Add counter to button
    floatingCartBtn.appendChild(cartCounter);
    
    // Add button to page
    document.body.appendChild(floatingCartBtn);
    
    // Add click event to navigate to cart
    floatingCartBtn.addEventListener('click', function() {
        navigateToCart();
    });
    
    // Initialize cart counter
    updateFloatingCartCounter();
    
    console.log('Floating cart button created');
    return { button: floatingCartBtn, counter: cartCounter };
}

function updateFloatingCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    if (!cartCounter) return;
    
    // Get cart data from localStorage
    const cartData = getCartFromLocalStorage();
    const totalItems = cartData.reduce((total, item) => total + item.quantity, 0);
    
    // Update counter text
    cartCounter.textContent = totalItems;
    
    // Show/hide counter based on items
    if (totalItems > 0) {
        cartCounter.classList.add('show');
    } else {
        cartCounter.classList.remove('show');
    }
    
    // Add pulse animation if items were just added
    if (totalItems > 0) {
        cartCounter.classList.add('updated');
        setTimeout(() => {
            cartCounter.classList.remove('updated');
        }, 600);
    }
    
    console.log(`Floating cart counter updated: ${totalItems} items`);
}

function getCartFromLocalStorage() {
    try {
        const savedCart = localStorage.getItem('fashionCart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
    }
}

function navigateToCart() {
    // Check if cart.html exists, otherwise show cart summary
    if (window.location.pathname.includes('cart.html')) {
        // Already on cart page, just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Navigate to cart page
        window.location.href = 'cart.html';
    }
}

// Enhanced Cart System with Floating Button Integration
let cart = [];

function addToCart(productName, price, image) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        // If product exists, increase quantity
        existingItem.quantity += 1;
        console.log(`Increased quantity for ${productName}`);
    } else {
        // If product doesn't exist, add new item
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
        console.log(`Added new item: ${productName}`);
    }
    
    // Update cart count in navbar
    updateCartCount();
    
    // Update floating cart counter
    updateFloatingCartCounter();
    
    // Save cart to localStorage
    saveCartToLocalStorage();
    
    // Show success message
    showAddToCartMessage(productName);
    
    // Add floating cart button if not exists
    if (!document.querySelector('.floating-cart-btn')) {
        createFloatingCartButton();
    }
}

function updateCartCount() {
    // Calculate total items in cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count in navbar
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        
        // Add animation class
        cartCountElement.classList.add('cart-updated');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            cartCountElement.classList.remove('cart-updated');
        }, 300);
    }
    
    console.log(`Cart updated: ${totalItems} items`);
}

function saveCartToLocalStorage() {
    // Save cart data to browser's localStorage
    localStorage.setItem('fashionCart', JSON.stringify(cart));
    console.log('Cart saved to localStorage');
}

function loadCartFromLocalStorage() {
    // Load cart data from localStorage
    const savedCart = localStorage.getItem('fashionCart');
    
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartCount();
            updateFloatingCartCounter();
            console.log('Cart loaded from localStorage');
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            cart = [];
        }
    } else {
        cart = [];
        console.log('No saved cart found, starting with empty cart');
    }
}

function showAddToCartMessage(productName) {
    // Create a temporary success message
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.innerHTML = `✅ ${productName} added to cart!`;
    
    // Add message to page
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function showCartMessage() {
    // Show cart contents in a simple alert
    if (cart.length === 0) {
        alert('Your cart is empty. Add some products!');
    } else {
        let cartSummary = 'Your Cart:\n\n';
        let totalPrice = 0;
        
        cart.forEach(item => {
            const price = parseFloat(item.price.replace('$', ''));
            const itemTotal = price * item.quantity;
            totalPrice += itemTotal;
            
            const sizeInfo = item.size ? ` (Size: ${item.size})` : '';
            cartSummary += `${item.name}${sizeInfo} x${item.quantity} - $${itemTotal.toFixed(2)}\n`;
        });
        
        cartSummary += `\nTotal: $${totalPrice.toFixed(2)}`;
        cartSummary += '\n\nThis is a demo cart. In a real store, you would proceed to checkout.';
        
        alert(cartSummary);
    }
}

function clearCart() {
    // Clear all items from cart
    cart = [];
    updateCartCount();
    updateFloatingCartCounter();
    saveCartToLocalStorage();
    console.log('Cart cleared');
}

// Contact Form Validation
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Get error elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            
            // Reset error messages
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            
            // Remove error styling
            nameInput.style.borderColor = '#ddd';
            emailInput.style.borderColor = '#ddd';
            messageInput.style.borderColor = '#ddd';
            
            let isValid = true;
            
            // Validate Name
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required';
                nameInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                nameInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required';
                messageInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                messageInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                submitForm(nameInput.value.trim(), emailInput.value.trim(), messageInput.value.trim());
            }
        });
        
        // Real-time validation on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
                this.style.borderColor = '#ddd';
            });
        });
    }
}

function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    
    if (field.id === 'name') {
        if (!field.value.trim()) {
            errorElement.textContent = 'Name is required';
            field.style.borderColor = '#e74c3c';
        } else if (field.value.trim().length < 2) {
            errorElement.textContent = 'Name must be at least 2 characters';
            field.style.borderColor = '#e74c3c';
        } else {
            errorElement.textContent = '';
            field.style.borderColor = '#27ae60';
        }
    }
    
    if (field.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!field.value.trim()) {
            errorElement.textContent = 'Email is required';
            field.style.borderColor = '#e74c3c';
        } else if (!emailRegex.test(field.value.trim())) {
            errorElement.textContent = 'Please enter a valid email address';
            field.style.borderColor = '#e74c3c';
        } else {
            errorElement.textContent = '';
            field.style.borderColor = '#27ae60';
        }
    }
    
    if (field.id === 'message') {
        if (!field.value.trim()) {
            errorElement.textContent = 'Message is required';
            field.style.borderColor = '#e74c3c';
        } else if (field.value.trim().length < 10) {
            errorElement.textContent = 'Message must be at least 10 characters';
            field.style.borderColor = '#e74c3c';
        } else {
            errorElement.textContent = '';
            field.style.borderColor = '#27ae60';
        }
    }
}

function submitForm(name, email, message) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset all field borders
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
        });
        
        // Clear all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
    }, 2000);
}

// Enhanced Product Filtering System
function initializeProductFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    let currentCategory = 'all';

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active button state
            updateActiveFilterButton(this);
            
            // Filter products
            filterProducts(selectedCategory);
            
            // Update current category
            currentCategory = selectedCategory;
            
            // Add animation to filtered products
            animateFilteredProducts();
            
            console.log(`Filtered to category: ${selectedCategory}`);
        });
    });

    // Function to update active filter button
    function updateActiveFilterButton(activeButton) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(1)';
        });
        
        // Add active class to clicked button
        activeButton.classList.add('active');
        activeButton.style.transform = 'scale(1.05)';
        
        // Add ripple effect
        addRippleEffect(activeButton);
    }

    // Function to filter products
    function filterProducts(category) {
        let visibleCount = 0;
        
        productCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                // Show product card
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Staggered animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
                
                visibleCount++;
            } else {
                // Hide product card
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
        
        // Show/hide no products message
        if (visibleCount === 0) {
            showNoProductsMessage(category);
        } else {
            hideNoProductsMessage();
        }
        
        // Update product count display
        updateProductCount(visibleCount, category);
    }

    // Function to animate filtered products
    function animateFilteredProducts() {
        const visibleCards = document.querySelectorAll('.product-card[style*="display: block"]');
        
        visibleCards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
        });
    }

    // Function to add ripple effect to filter buttons
    function addRippleEffect(button) {
        const ripple = document.createElement('span');
        ripple.className = 'filter-ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(231, 76, 60, 0.3);
            transform: scale(0);
            animation: filterRipple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Function to show no products message
    function showNoProductsMessage(category) {
        let message = document.querySelector('.no-products-message');
        if (!message) {
            message = document.createElement('div');
            message.className = 'no-products-message';
            message.style.cssText = `
                text-align: center;
                padding: 3rem;
                color: #666;
                font-size: 1.1rem;
                background: #f8f9fa;
                border-radius: 10px;
                margin: 2rem 0;
                animation: fadeIn 0.5s ease;
            `;
        }
        
        const categoryNames = {
            'men': 'Men\'s',
            'women': 'Women\'s',
            'kids': 'Kids\'',
            'sale': 'Sale'
        };
        
        const categoryName = categoryNames[category] || category;
        message.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <span style="font-size: 3rem;">🛍️</span>
            </div>
            <h3 style="margin-bottom: 1rem; color: #333;">No ${categoryName} Products Found</h3>
            <p style="margin-bottom: 1.5rem;">We're currently updating our ${categoryName.toLowerCase()} collection. Please check back soon!</p>
            <button class="filter-btn" data-category="all" style="margin: 0 0.5rem;">View All Products</button>
        `;
        
        document.querySelector('.products-grid').appendChild(message);
        
        // Add click event to "View All Products" button
        const viewAllBtn = message.querySelector('.filter-btn');
        viewAllBtn.addEventListener('click', function() {
            filterProducts('all');
            updateActiveFilterButton(document.querySelector('.filter-btn[data-category="all"]'));
            message.remove();
        });
    }

    // Function to hide no products message
    function hideNoProductsMessage() {
        const message = document.querySelector('.no-products-message');
        if (message) {
            message.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                message.remove();
            }, 300);
        }
    }

    // Function to update product count display
    function updateProductCount(count, category) {
        let countDisplay = document.querySelector('.product-count');
        if (!countDisplay) {
            countDisplay = document.createElement('div');
            countDisplay.className = 'product-count';
            countDisplay.style.cssText = `
                text-align: center;
                margin: 1rem 0;
                font-size: 1rem;
                color: #666;
                font-weight: 500;
            `;
            document.querySelector('.filter-section .container').appendChild(countDisplay);
        }
        
        const categoryNames = {
            'all': 'All Products',
            'men': 'Men\'s Products',
            'women': 'Women\'s Products',
            'kids': 'Kids\' Products',
            'sale': 'Sale Products'
        };
        
        const categoryName = categoryNames[category] || category;
        countDisplay.textContent = `${count} ${categoryName} found`;
        
        // Animate count update
        countDisplay.style.animation = 'none';
        countDisplay.offsetHeight; // Trigger reflow
        countDisplay.style.animation = 'fadeInUp 0.5s ease';
    }

    // Add CSS for filter animations
    addFilterAnimationsCSS();
    
    // Initialize with all products
    updateProductCount(productCards.length, 'all');
}

// Add CSS for filter animations
function addFilterAnimationsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes filterRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .product-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .no-products-message {
            transition: all 0.3s ease;
        }
        
        .product-count {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Buy Button Functionality with Loading States
function enhanceBuyButtons() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if size is selected (if size selector exists)
            const productCard = this.closest('.product-card');
            if (productCard && productCard.querySelector('.size-selector-container')) {
                if (!validateSizeSelection(productCard)) {
                    return;
                }
            }
            
            // Add loading state
            this.classList.add('loading');
            this.textContent = '';
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = 'Added!';
                this.style.background = '#27ae60';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = 'Buy Now';
                    this.style.background = '';
                }, 2000);
                
                // Add to cart functionality
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').src;
                const selectedSize = getSelectedSize(productCard);
                
                if (selectedSize) {
                    addToCartWithSize(productName, productPrice, productImage, selectedSize);
                } else {
                    addToCart(productName, productPrice, productImage);
                }
                
            }, 1000);
        });
    });
}

// Enhanced Form Submit with Loading States
function enhanceFormSubmits() {
    const submitButtons = document.querySelectorAll('.submit-btn, .newsletter-btn');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit') {
                // Add loading state for form submissions
                this.classList.add('loading');
                const originalText = this.textContent;
                this.textContent = '';
                
                // Reset loading state after form processing
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 2000);
            }
        });
    });
}

// Parallax Effect for Product Cards
function addParallaxEffect() {
    const productCards = document.querySelectorAll('.product-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        productCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Magnetic Effect for Buttons
function addMagneticEffect() {
    const magneticButtons = document.querySelectorAll('.cta-btn, .buy-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Enhanced Filter Button Interactions
function enhanceFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Social Icon Interactions
function enhanceSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Add floating animation
            this.style.animation = 'float 0.6s ease-in-out';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Add floating animation CSS
function addFloatingCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Scroll Progress Bar Functionality
function createScrollProgressBar() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.setAttribute('data-progress', '0%');
    document.body.appendChild(progressBar);
    
    // Function to update progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollHeight > 0) ? (scrollTop / scrollHeight) * 100 : 0;
        
        // Update progress bar width
        progressBar.style.width = scrollPercent + '%';
        progressBar.setAttribute('data-progress', Math.round(scrollPercent) + '%');
        
        // Add visual feedback for scroll direction
        if (scrollPercent > 0) {
            progressBar.style.boxShadow = '0 2px 8px rgba(0, 198, 255, 0.4)';
        } else {
            progressBar.style.boxShadow = '0 2px 4px rgba(0, 198, 255, 0.3)';
        }
    }
    
    // Add scroll event listener with throttling for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initialize progress on page load
    updateScrollProgress();
    
    console.log('Scroll progress bar initialized');
}

// Initialize all enhanced hover effects
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fashion Store loaded successfully!');
    
    // Initialize theme system
    console.log('Initializing theme system...');
    initializeTheme();
    createThemeToggleButton();
    console.log('Theme system initialized');
    
    // Initialize wishlist counter
    initializeWishlistCounter();
    
    // Initialize cart counter
    initializeCartCounter();
    
    // Insert navigation if not already present
    if (!document.querySelector('.navbar')) {
        insertNavigation();
    }
    
    // Create scroll to top button
    createBackToTopButton();
    
    // Create floating cart button
    createFloatingCartButton();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize newsletter signup
    initializeNewsletterSignup();
    
    // Initialize product filtering
    initializeProductFiltering();
    
    // Initialize discount labels
    initializeDiscountLabels();
    
    // Initialize testimonial slider
    initializeTestimonialSlider();
    
    // Initialize AOS
    initializeAOS();
    
    // Initialize size selectors
    initializeSizeSelectors();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize enhanced hover effects
    initializeHoverEffects();
    enhanceBuyButtons();
    enhanceFormSubmits();
    enhanceFilterButtons();
    enhanceSocialIcons();
    
    // Initialize product card click functionality
    initializeProductCardClicks();
    
            // Create scroll progress bar
        createScrollProgressBar();
        
        // Create WhatsApp floating button
        createWhatsAppButton();
        
        // WhatsApp Floating Button Functionality
        function createWhatsAppButton() {
            // Create WhatsApp button element
            const whatsappButton = document.createElement('a');
            whatsappButton.className = 'whatsapp-float';
            whatsappButton.href = 'https://wa.me/919876543210?text=Hi%20I%20want%20to%20inquire%20about%20your%20products';
            whatsappButton.target = '_blank';
            whatsappButton.rel = 'noopener noreferrer';
            whatsappButton.setAttribute('aria-label', 'Chat with us on WhatsApp');
            
            // Create WhatsApp icon
            const whatsappIcon = document.createElement('span');
            whatsappIcon.className = 'whatsapp-icon';
            whatsappIcon.innerHTML = '💬';
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'whatsapp-tooltip';
            tooltip.textContent = 'Chat with us on WhatsApp';
            
            // Append elements
            whatsappButton.appendChild(whatsappIcon);
            whatsappButton.appendChild(tooltip);
            document.body.appendChild(whatsappButton);
            
            // Add click event for analytics (optional)
            whatsappButton.addEventListener('click', function() {
                console.log('WhatsApp button clicked');
                // You can add analytics tracking here
            });
        }
    
    // Add CSS for additional effects
    addRippleCSS();
    addFloatingCSS();
    
    // Add parallax effect (optional - can be performance heavy)
    // addParallaxEffect();
    
    // Add magnetic effect (optional - can be performance heavy)
    // addMagneticEffect();
    
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .testimonial-card, .contact-item, .value-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add product image lazy loading
    const productImages = document.querySelectorAll('.product-card img');
    productImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x500?text=Product+Image';
        });
    });
    
    // Initialize seasonal themes
    initializeSeasonalThemes();
    
    // Initialize daily deal banner
    initializeDailyDealBanner();
    
    // Initialize page loader
    initializePageLoader();
    

    
    // Initialize section navigation indicator
    initializeSectionNavigationWithOptions({
        position: 'side',
        threshold: 0.3,
        showLabels: true,
        smoothScroll: true
    });
    
    // Initialize theme system
    console.log('Initializing theme system...');
    initializeTheme();
    createThemeToggleButton();
    console.log('Theme system initialized');
    
    // Initialize wishlist counter
    initializeWishlistCounter();
    
    // Initialize cart counter
    initializeCartCounter();
    
    // Initialize scroll to top button
    initializeScrollToTop();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key for buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Export functions for use in other pages
window.FashionStore = {
    addToCart,
    updateCartCount,
    saveCartToLocalStorage,
    loadCartFromLocalStorage,
    clearCart,
    showCartMessage,
    searchProducts,
    validateForm,
    initializeProductFiltering,
    initializeContactForm,
    createNavbar,
    createFooter,
    insertNavigation,
    setActiveNavLink,
    createBackToTopButton,
    toggleBackToTopButton,
    scrollToTop,
    createEnhancedBackToTopButton,
    getScrollProgress,
    updateBackToTopButtonProgress,
    createFloatingCartButton,
    updateFloatingCartCounter,
    navigateToCart,
    getCartFromLocalStorage,
    toggleTheme,
    saveThemePreference,
    loadThemePreference,
    initializeNewsletterSignup,
    validateNewsletterEmail,
    saveNewsletterEmail,
    getNewsletterEmails,
    showNewsletterSuccess,
    showNewsletterError,
    initializeDiscountLabels,
    createDiscountLabel,
    updateProductPrice,
    applyDiscountLabels,
    initializeTestimonialSlider,
    initializeAOS,
    initializeHoverEffects,
    enhanceBuyButtons,
    enhanceFormSubmits,
    enhanceFilterButtons,
    enhanceSocialIcons,
    createSizeSelector,
    selectSize,
    showSizeSelectedMessage,
    updateBuyButtonWithSize,
    updateAddToCartWithSize,
    showSizeWarning,
    addToCartWithSize,
    showAddToCartMessageWithSize,
    initializeSizeSelectors,
    getSelectedSize,
    clearSizeSelection,
    validateSizeSelection,
    enhanceProductCardsWithSize,
    // Scroll Animation exports
    ScrollAnimator,
    StaggeredScrollAnimator,
    ScrollAnimationUtils,
    initializeScrollAnimations,
    addAnimationClassesToElements,
    enhanceProductCardAnimations,
    optimizeAnimationPerformance,
    enableAnimationDebug,
    getAnimationStats,
    // Seasonal Theme exports
    createSeasonalThemeToggle,
    changeTheme,
    loadSavedTheme,
    getCurrentTheme,
    resetToDefaultTheme,
    getThemeInfo,
    enhanceThemeExperience,
    initializeSeasonalThemes,
    // Daily Deal Banner exports
    createDailyDealBanner,
    startDailyDealCountdown,
    updateTimerDisplay,
    addUrgencyEffects,
    handleDealExpired,
    hideDailyDealBanner,
    showUrgentNotification,
    showDealExpiredNotification,
    loadDailyDealBanner,
    resetDailyDeal,
    getDealProgress,
    createProgressBar,
    initializeDailyDealBanner,
    // Page Loader exports
    createPageLoader,
    simulateLoadingProgress,
    hidePageLoader,
    initializePageLoader,
    createAlternativeLoader,
    showLoaderWithMessage,
    showErrorLoader,
    showSuccessLoader,
    getLoaderProgress,
    updateLoaderProgress,
    isLoaderVisible,
    pauseLoader,
    resumeLoader,
    // Section Navigation exports
    createSectionNavIndicator,
    createSectionDots,
    initializeSectionNavigation,
    updateActiveDot,
    updateProgress,
    updateProgressOnScroll,
    scrollToSection,
    createTopSectionIndicator,
    createSideSectionIndicator,
    toggleSectionIndicatorPosition,
    hideSectionIndicator,
    showSectionIndicator,
    updateSectionLabels,
    addSectionIndicatorsToElements,
    getCurrentSection,
    highlightSectionOnScroll,
    addScrollListenerForSections,
    initializeSectionNavigationWithOptions
};

// Seasonal Theme Toggle System
function createSeasonalThemeToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'seasonal-theme-toggle';
    toggleButton.innerHTML = 'Theme';
    
    const dropdown = document.createElement('div');
    dropdown.className = 'theme-dropdown';
    
    const themes = [
        { name: 'Default', value: 'default', icon: '🎯' },
        { name: 'Diwali', value: 'diwali', icon: '🪔' },
        { name: 'Winter', value: 'winter', icon: '❄️' },
        { name: 'Monsoon', value: 'monsoon', icon: '🌧️' },
        { name: 'Spring', value: 'spring', icon: '🌸' },
        { name: 'Summer', value: 'summer', icon: '☀️' },
        { name: 'Autumn', value: 'autumn', icon: '🍂' }
    ];
    
    themes.forEach(theme => {
        const option = document.createElement('button');
        option.className = 'theme-option';
        option.setAttribute('data-theme', theme.value);
        option.innerHTML = theme.name;
        option.addEventListener('click', () => changeTheme(theme.value));
        dropdown.appendChild(option);
    });
    
    toggleButton.appendChild(dropdown);
    toggleButton.addEventListener('click', toggleThemeDropdown);
    
    document.body.appendChild(toggleButton);
    
    // Load saved theme
    loadSavedTheme();
}

function toggleThemeDropdown() {
    const toggle = document.querySelector('.seasonal-theme-toggle');
    toggle.classList.toggle('active');
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!toggle.contains(e.target)) {
            toggle.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

function changeTheme(themeName) {
    const body = document.body;
    const toggle = document.querySelector('.seasonal-theme-toggle');
    
    // Add loading state
    toggle.classList.add('loading');
    
    // Remove all existing theme classes
    body.classList.remove('theme-diwali', 'theme-winter', 'theme-monsoon', 'theme-spring', 'theme-summer', 'theme-autumn');
    
    // Add new theme class
    if (themeName !== 'default') {
        body.classList.add(`theme-${themeName}`);
    }
    
    // Save theme to localStorage
    localStorage.setItem('fashionSeasonalTheme', themeName);
    
    // Update active state in dropdown
    updateActiveThemeOption(themeName);
    
    // Show theme notification
    showThemeNotification(themeName);
    
    // Remove loading state after transition
    setTimeout(() => {
        toggle.classList.remove('loading');
    }, 500);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('fashionSeasonalTheme');
    if (savedTheme && savedTheme !== 'default') {
        changeTheme(savedTheme);
    }
}

function updateActiveThemeOption(themeName) {
    const options = document.querySelectorAll('.theme-option');
    options.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === themeName) {
            option.classList.add('active');
        }
    });
}

function showThemeNotification(themeName) {
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.setAttribute('data-theme', themeName);
    
    const themeNames = {
        'default': 'Default Theme',
        'diwali': 'Diwali Theme',
        'winter': 'Winter Theme',
        'monsoon': 'Monsoon Theme',
        'spring': 'Spring Theme',
        'summer': 'Summer Theme',
        'autumn': 'Autumn Theme'
    };
    
    notification.textContent = themeNames[themeName] || 'Theme Changed';
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

function createThemeTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

function animateThemeTransition() {
    const overlay = createThemeTransitionOverlay();
    
    // Show overlay
    setTimeout(() => {
        overlay.classList.add('active');
    }, 100);
    
    // Hide overlay
    setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }, 500);
}

function getCurrentTheme() {
    const body = document.body;
    if (body.classList.contains('theme-diwali')) return 'diwali';
    if (body.classList.contains('theme-winter')) return 'winter';
    if (body.classList.contains('theme-monsoon')) return 'monsoon';
    if (body.classList.contains('theme-spring')) return 'spring';
    if (body.classList.contains('theme-summer')) return 'summer';
    if (body.classList.contains('theme-autumn')) return 'autumn';
    return 'default';
}

function resetToDefaultTheme() {
    changeTheme('default');
}

function getThemeInfo(themeName) {
    const themes = {
        'default': { name: 'Default', description: 'Classic fashion theme' },
        'diwali': { name: 'Diwali', description: 'Festive celebration theme' },
        'winter': { name: 'Winter', description: 'Cool and cozy theme' },
        'monsoon': { name: 'Monsoon', description: 'Fresh and green theme' },
        'spring': { name: 'Spring', description: 'Blossoming beauty theme' },
        'summer': { name: 'Summer', description: 'Warm and vibrant theme' },
        'autumn': { name: 'Autumn', description: 'Earthy and warm theme' }
    };
    return themes[themeName] || themes['default'];
}

function enhanceThemeExperience() {
    // Add theme-specific animations to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.position = 'relative';
    });
    
    // Add theme-specific background patterns
    const currentTheme = getCurrentTheme();
    if (currentTheme !== 'default') {
        document.body.style.backgroundImage = getThemeBackground(currentTheme);
    }
}

function getThemeBackground(themeName) {
    const backgrounds = {
        'diwali': 'radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
        'winter': 'radial-gradient(circle at 20% 80%, rgba(52, 152, 219, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 240, 241, 0.1) 0%, transparent 50%)',
        'monsoon': 'radial-gradient(circle at 20% 80%, rgba(39, 174, 96, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(22, 160, 133, 0.1) 0%, transparent 50%)',
        'spring': 'radial-gradient(circle at 20% 80%, rgba(233, 30, 99, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 152, 0, 0.1) 0%, transparent 50%)',
        'summer': 'radial-gradient(circle at 20% 80%, rgba(255, 152, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 235, 59, 0.1) 0%, transparent 50%)',
        'autumn': 'radial-gradient(circle at 20% 80%, rgba(141, 110, 99, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 112, 67, 0.1) 0%, transparent 50%)'
    };
    return backgrounds[themeName] || 'none';
}

function initializeSeasonalThemes() {
    createSeasonalThemeToggle();
    enhanceThemeExperience();
}

// Update DOMContentLoaded to include seasonal themes
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize seasonal themes
    initializeSeasonalThemes();
    
    // ... existing code ...
});

// Export seasonal theme functions
window.FashionStore = {
    ...window.FashionStore,
    createSeasonalThemeToggle,
    changeTheme,
    loadSavedTheme,
    getCurrentTheme,
    resetToDefaultTheme,
    getThemeInfo,
    enhanceThemeExperience,
    initializeSeasonalThemes
}; 

// Daily Deal Banner System
function createDailyDealBanner() {
    const banner = document.createElement('div');
    banner.className = 'daily-deal-banner';
    
    const content = document.createElement('div');
    content.className = 'daily-deal-content';
    
    const dealText = document.createElement('div');
    dealText.className = 'daily-deal-text';
    dealText.innerHTML = '🔥 FLASH SALE! Up to 50% OFF on Premium Collection';
    
    const timer = document.createElement('div');
    timer.className = 'daily-deal-timer';
    
    const timerLabel = document.createElement('span');
    timerLabel.className = 'timer-label';
    timerLabel.textContent = 'Ends in:';
    
    const timerDisplay = document.createElement('div');
    timerDisplay.className = 'timer-display';
    
    // Create timer units
    const hours = document.createElement('div');
    hours.className = 'timer-unit';
    hours.id = 'deal-hours';
    
    const minutes = document.createElement('div');
    minutes.className = 'timer-unit';
    minutes.id = 'deal-minutes';
    
    const seconds = document.createElement('div');
    seconds.className = 'timer-unit';
    seconds.id = 'deal-seconds';
    
    const separator1 = document.createElement('span');
    separator1.className = 'timer-separator';
    separator1.textContent = ':';
    
    const separator2 = document.createElement('span');
    separator2.className = 'timer-separator';
    separator2.textContent = ':';
    
    timerDisplay.appendChild(hours);
    timerDisplay.appendChild(separator1);
    timerDisplay.appendChild(minutes);
    timerDisplay.appendChild(separator2);
    timerDisplay.appendChild(seconds);
    
    timer.appendChild(timerLabel);
    timer.appendChild(timerDisplay);
    
    const cta = document.createElement('a');
    cta.className = 'daily-deal-cta';
    cta.href = '#products';
    cta.textContent = 'Shop Now';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'banner-close';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', hideDailyDealBanner);
    
    content.appendChild(dealText);
    content.appendChild(timer);
    content.appendChild(cta);
    banner.appendChild(content);
    banner.appendChild(closeBtn);
    
    // Insert banner at the top of the page
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Start countdown
    startDailyDealCountdown();
}

function startDailyDealCountdown() {
    // Set end time (24 hours from now)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    // Save end time to localStorage
    localStorage.setItem('dailyDealEndTime', endTime.toString());
    
    // Update countdown every second
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Deal has ended
            clearInterval(countdownInterval);
            handleDealExpired();
            return;
        }
        
        // Calculate time units
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update timer display
        updateTimerDisplay(hours, minutes, seconds);
        
        // Add urgency effects
        addUrgencyEffects(distance);
        
    }, 1000);
}

function updateTimerDisplay(hours, minutes, seconds) {
    const hoursElement = document.getElementById('deal-hours');
    const minutesElement = document.getElementById('deal-minutes');
    const secondsElement = document.getElementById('deal-seconds');
    
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function addUrgencyEffects(distance) {
    const banner = document.querySelector('.daily-deal-banner');
    const timerUnits = document.querySelectorAll('.timer-unit');
    
    // Add urgent class when less than 1 hour remaining
    if (distance < 60 * 60 * 1000) {
        banner.classList.add('urgent');
        timerUnits.forEach(unit => unit.classList.add('urgent'));
    }
    
    // Add more urgency when less than 10 minutes remaining
    if (distance < 10 * 60 * 1000) {
        showUrgentNotification();
    }
}

function handleDealExpired() {
    const banner = document.querySelector('.daily-deal-banner');
    const dealText = banner.querySelector('.daily-deal-text');
    const timer = banner.querySelector('.daily-deal-timer');
    const cta = banner.querySelector('.daily-deal-cta');
    
    // Update banner content
    dealText.innerHTML = '🔥 Sale Ended! Check back tomorrow for new deals';
    dealText.style.opacity = '0.7';
    
    // Hide timer
    timer.style.display = 'none';
    
    // Update CTA
    cta.textContent = 'View All Products';
    cta.href = '#products';
    
    // Add expired class
    banner.classList.add('expired');
    
    // Show expired notification
    showDealExpiredNotification();
    
    // Hide banner after 5 seconds
    setTimeout(() => {
        hideDailyDealBanner();
    }, 5000);
}

function hideDailyDealBanner() {
    const banner = document.querySelector('.daily-deal-banner');
    if (banner) {
        banner.classList.add('fade-out');
        setTimeout(() => {
            if (banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 500);
    }
}

function showUrgentNotification() {
    const notification = document.createElement('div');
    notification.className = 'banner-notification';
    notification.innerHTML = '⏰ Hurry! Deal ends in less than 10 minutes!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

function showDealExpiredNotification() {
    const notification = document.createElement('div');
    notification.className = 'banner-notification';
    notification.innerHTML = '⏰ Daily deal has ended! New deals coming tomorrow!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

function loadDailyDealBanner() {
    const savedEndTime = localStorage.getItem('dailyDealEndTime');
    
    if (savedEndTime) {
        const endTime = parseInt(savedEndTime);
        const now = new Date().getTime();
        
        if (endTime > now) {
            // Deal is still active
            createDailyDealBanner();
            startDailyDealCountdown();
        } else {
            // Deal has expired, create new one
            createDailyDealBanner();
        }
    } else {
        // No saved deal, create new one
        createDailyDealBanner();
    }
}

function resetDailyDeal() {
    localStorage.removeItem('dailyDealEndTime');
    const banner = document.querySelector('.daily-deal-banner');
    if (banner) {
        banner.parentNode.removeChild(banner);
    }
    createDailyDealBanner();
}

function getDealProgress() {
    const savedEndTime = localStorage.getItem('dailyDealEndTime');
    if (!savedEndTime) return 0;
    
    const endTime = parseInt(savedEndTime);
    const now = new Date().getTime();
    const totalDuration = 24 * 60 * 60 * 1000; // 24 hours
    const elapsed = totalDuration - (endTime - now);
    
    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
}

function createProgressBar() {
    const banner = document.querySelector('.daily-deal-banner');
    if (!banner) return;
    
    const progress = document.createElement('div');
    progress.className = 'banner-progress';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'banner-progress-fill';
    
    progress.appendChild(progressFill);
    banner.appendChild(progress);
    
    // Update progress
    const updateProgress = () => {
        const progressPercent = getDealProgress();
        progressFill.style.width = `${progressPercent}%`;
    };
    
    updateProgress();
    setInterval(updateProgress, 1000);
}

function initializeDailyDealBanner() {
    // Check if banner should be shown (not hidden by user)
    const bannerHidden = localStorage.getItem('dailyDealBannerHidden');
    
    if (!bannerHidden) {
        loadDailyDealBanner();
        createProgressBar();
    }
}

// ... existing code ...

// Page Load Animation / Spinner System
function createPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    
    const container = document.createElement('div');
    container.className = 'loader-container';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'loader-spinner';
    
    // Create text elements
    const text = document.createElement('div');
    text.className = 'loader-text';
    text.textContent = 'Loading Fashion Store...';
    
    const subtitle = document.createElement('div');
    subtitle.className = 'loader-subtitle';
    subtitle.textContent = 'Preparing your shopping experience';
    
    // Create progress bar
    const progress = document.createElement('div');
    progress.className = 'loader-progress';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'loader-progress-fill';
    
    progress.appendChild(progressFill);
    
    // Create loading dots
    const dots = document.createElement('div');
    dots.className = 'loader-dots';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'loader-dot';
        dots.appendChild(dot);
    }
    
    // Create brand name
    const brand = document.createElement('div');
    brand.className = 'loader-brand';
    brand.textContent = 'Fashion Store';
    
    // Create loading message
    const message = document.createElement('div');
    message.className = 'loader-message';
    message.textContent = 'Loading amazing products...';
    
    // Assemble loader
    container.appendChild(spinner);
    container.appendChild(text);
    container.appendChild(subtitle);
    container.appendChild(progress);
    container.appendChild(dots);
    
    loader.appendChild(container);
    loader.appendChild(brand);
    loader.appendChild(message);
    
    // Add loader to page
    document.body.appendChild(loader);
    
    return { loader, progressFill, text, subtitle, message };
}

function simulateLoadingProgress(progressFill, text, subtitle, message) {
    const messages = [
        'Loading amazing products...',
        'Preparing your shopping experience...',
        'Setting up the latest trends...',
        'Almost ready...',
        'Welcome to Fashion Store!'
    ];
    
    const subtitles = [
        'Preparing your shopping experience',
        'Loading product catalog',
        'Setting up navigation',
        'Finalizing your experience',
        'Ready to explore!'
    ];
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random progress between 5-20%
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        
        progressFill.style.width = `${progress}%`;
        
        // Update messages based on progress
        if (progress < 25) {
            text.textContent = 'Loading Fashion Store...';
            subtitle.textContent = subtitles[0];
            message.textContent = messages[0];
        } else if (progress < 50) {
            text.textContent = 'Loading Products...';
            subtitle.textContent = subtitles[1];
            message.textContent = messages[1];
        } else if (progress < 75) {
            text.textContent = 'Setting Up Navigation...';
            subtitle.textContent = subtitles[2];
            message.textContent = messages[2];
        } else if (progress < 100) {
            text.textContent = 'Almost Ready...';
            subtitle.textContent = subtitles[3];
            message.textContent = messages[3];
        } else {
            text.textContent = 'Welcome!';
            subtitle.textContent = subtitles[4];
            message.textContent = messages[4];
        }
    }, 200);
    
    return interval;
}

function hidePageLoader(loader, success = true) {
    return new Promise((resolve) => {
        // Add success state briefly
        if (success) {
            loader.classList.add('success');
            setTimeout(() => {
                loader.classList.remove('success');
            }, 600);
        }
        
        // Fade out animation
        loader.classList.add('fade-out');
        
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
                resolve();
            }, 500);
        }, 500);
    });
}

function initializePageLoader() {
    const { loader, progressFill, text, subtitle, message } = createPageLoader();
    
    // Start progress simulation
    const progressInterval = simulateLoadingProgress(progressFill, text, subtitle, message);
    
    // Hide loader when DOM is ready or after 2 seconds
    const hideLoader = () => {
        clearInterval(progressInterval);
        hidePageLoader(loader, true);
    };
    
    // Check if DOM is already ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoader);
    } else {
        // DOM is already ready, hide after 2 seconds for better UX
        setTimeout(hideLoader, 2000);
    }
    
    // Fallback: hide after 3 seconds maximum
    setTimeout(() => {
        if (document.body.contains(loader)) {
            clearInterval(progressInterval);
            hidePageLoader(loader, true);
        }
    }, 3000);
}

function createAlternativeLoader(type = 'spinner') {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    
    const container = document.createElement('div');
    container.className = 'loader-container';
    
    let spinnerElement;
    
    switch (type) {
        case 'pulse':
            spinnerElement = document.createElement('div');
            spinnerElement.className = 'loader-pulse';
            break;
            
        case 'bars':
            spinnerElement = document.createElement('div');
            spinnerElement.className = 'loader-bars';
            for (let i = 0; i < 5; i++) {
                const bar = document.createElement('div');
                bar.className = 'loader-bar';
                spinnerElement.appendChild(bar);
            }
            break;
            
        case 'hearts':
            spinnerElement = document.createElement('div');
            spinnerElement.className = 'loader-hearts';
            for (let i = 0; i < 3; i++) {
                const heart = document.createElement('div');
                heart.className = 'loader-heart';
                heart.textContent = '❤️';
                spinnerElement.appendChild(heart);
            }
            break;
            
        default:
            spinnerElement = document.createElement('div');
            spinnerElement.className = 'loader-spinner';
            break;
    }
    
    const text = document.createElement('div');
    text.className = 'loader-text';
    text.textContent = 'Loading...';
    
    container.appendChild(spinnerElement);
    container.appendChild(text);
    loader.appendChild(container);
    
    document.body.appendChild(loader);
    
    return { loader, text };
}

function showLoaderWithMessage(message, type = 'spinner') {
    const { loader, text } = createAlternativeLoader(type);
    text.textContent = message;
    
    return {
        hide: (success = true) => hidePageLoader(loader, success),
        updateMessage: (newMessage) => {
            text.textContent = newMessage;
        }
    };
}

function showErrorLoader(message = 'Something went wrong') {
    const { loader, text } = createAlternativeLoader('spinner');
    text.textContent = message;
    loader.classList.add('error');
    
    setTimeout(() => {
        hidePageLoader(loader, false);
    }, 2000);
}

function showSuccessLoader(message = 'Success!') {
    const { loader, text } = createAlternativeLoader('spinner');
    text.textContent = message;
    loader.classList.add('success');
    
    setTimeout(() => {
        hidePageLoader(loader, true);
    }, 1500);
}

function getLoaderProgress() {
    const progressFill = document.querySelector('.loader-progress-fill');
    if (progressFill) {
        return parseInt(progressFill.style.width) || 0;
    }
    return 0;
}

function updateLoaderProgress(progress) {
    const progressFill = document.querySelector('.loader-progress-fill');
    if (progressFill) {
        progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
}

function isLoaderVisible() {
    const loader = document.querySelector('.page-loader');
    return loader && !loader.classList.contains('hidden');
}

function pauseLoader() {
    const spinner = document.querySelector('.loader-spinner');
    if (spinner) {
        spinner.style.animationPlayState = 'paused';
    }
}

function resumeLoader() {
    const spinner = document.querySelector('.loader-spinner');
    if (spinner) {
        spinner.style.animationPlayState = 'running';
    }
}

// ... existing code ...

// Section Navigation Indicator System
function createSectionNavIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'section-nav-indicator';
    
    // Create progress line
    const progress = document.createElement('div');
    progress.className = 'section-nav-progress';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'section-nav-progress-fill';
    
    progress.appendChild(progressFill);
    indicator.appendChild(progress);
    
    // Add indicator to page
    document.body.appendChild(indicator);
    
    return { indicator, progressFill };
}

function createSectionDots(sections) {
    const indicator = document.querySelector('.section-nav-indicator');
    if (!indicator) return;
    
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'section-nav-dot';
        dot.setAttribute('data-section', section.id);
        dot.setAttribute('data-index', index);
        
        // Create label
        const label = document.createElement('div');
        label.className = 'section-nav-label';
        label.textContent = section.dataset.label || section.id.replace('-', ' ').replace(/([A-Z])/g, ' $1').trim();
        
        dot.appendChild(label);
        indicator.appendChild(dot);
        
        // Add click event
        dot.addEventListener('click', () => {
            scrollToSection(section);
        });
    });
}

function initializeSectionNavigation() {
    const sections = document.querySelectorAll('section[id], .section-indicator');
    if (sections.length === 0) return;
    
    const { indicator, progressFill } = createSectionNavIndicator();
    createSectionDots(sections);
    
    // Initialize IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const dot = document.querySelector(`[data-section="${section.id}"]`);
            
            if (entry.isIntersecting) {
                updateActiveDot(dot);
                updateProgress(progressFill, sections, section);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add scroll event for smooth updates
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateProgressOnScroll(progressFill, sections);
        }, 10);
    });
    
    return { observer, indicator, progressFill };
}

function updateActiveDot(activeDot) {
    // Remove active class from all dots
    document.querySelectorAll('.section-nav-dot').forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Add active class to current dot
    if (activeDot) {
        activeDot.classList.add('active');
        
        // Mark previous dots as completed
        const dots = Array.from(document.querySelectorAll('.section-nav-dot'));
        const activeIndex = dots.indexOf(activeDot);
        
        dots.forEach((dot, index) => {
            if (index < activeIndex) {
                dot.classList.add('completed');
            } else {
                dot.classList.remove('completed');
            }
        });
    }
}

function updateProgress(progressFill, sections, currentSection) {
    if (!progressFill) return;
    
    const sectionIndex = Array.from(sections).indexOf(currentSection);
    const progress = ((sectionIndex + 1) / sections.length) * 100;
    
    progressFill.style.height = `${progress}%`;
}

function updateProgressOnScroll(progressFill, sections) {
    if (!progressFill) return;
    
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressFill.style.height = `${scrollProgress}%`;
}

function scrollToSection(section) {
    if (!section) return;
    
    const offset = 100; // Account for fixed navbar
    const targetPosition = section.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function createTopSectionIndicator() {
    const indicator = document.querySelector('.section-nav-indicator');
    if (indicator) {
        indicator.classList.add('top');
    }
}

function createSideSectionIndicator() {
    const indicator = document.querySelector('.section-nav-indicator');
    if (indicator) {
        indicator.classList.remove('top');
    }
}

function toggleSectionIndicatorPosition() {
    const indicator = document.querySelector('.section-nav-indicator');
    if (indicator) {
        indicator.classList.toggle('top');
    }
}

function hideSectionIndicator() {
    const indicator = document.querySelector('.section-nav-indicator');
    if (indicator) {
        indicator.classList.add('hidden');
    }
}

function showSectionIndicator() {
    const indicator = document.querySelector('.section-nav-indicator');
    if (indicator) {
        indicator.classList.remove('hidden');
        indicator.classList.add('fade-in');
    }
}

function updateSectionLabels() {
    const sections = document.querySelectorAll('section[id], .section-indicator');
    const dots = document.querySelectorAll('.section-nav-dot');
    
    dots.forEach((dot, index) => {
        const section = sections[index];
        const label = dot.querySelector('.section-nav-label');
        
        if (section && label) {
            label.textContent = section.dataset.label || 
                              section.id.replace('-', ' ').replace(/([A-Z])/g, ' $1').trim();
        }
    });
}

function addSectionIndicatorsToElements() {
    // Add section-indicator class to main sections
    const sections = [
        'hero',
        'featured',
        'testimonials',
        'about-content',
        'contact-content',
        'products-section'
    ];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('section-indicator');
        }
    });
    
    // Add data-label attributes for better labels
    const sectionLabels = {
        'hero': 'Home',
        'featured': 'Featured Products',
        'testimonials': 'Reviews',
        'about-content': 'About Us',
        'contact-content': 'Contact',
        'products-section': 'All Products'
    };
    
    Object.entries(sectionLabels).forEach(([id, label]) => {
        const section = document.getElementById(id);
        if (section) {
            section.setAttribute('data-label', label);
        }
    });
}

function getCurrentSection() {
    const sections = document.querySelectorAll('.section-indicator');
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop - windowHeight / 2) {
            return section;
        }
    }
    
    return sections[0];
}

function highlightSectionOnScroll() {
    const currentSection = getCurrentSection();
    const dot = document.querySelector(`[data-section="${currentSection.id}"]`);
    
    if (dot) {
        updateActiveDot(dot);
    }
}

function addScrollListenerForSections() {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(highlightSectionOnScroll, 50);
    });
}

function initializeSectionNavigationWithOptions(options = {}) {
    const defaultOptions = {
        position: 'side', // 'side' or 'top'
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px',
        showLabels: true,
        smoothScroll: true
    };
    
    const config = { ...defaultOptions, ...options };
    
    // Add section indicators to elements
    addSectionIndicatorsToElements();
    
    // Initialize navigation
    const { observer, indicator, progressFill } = initializeSectionNavigation();
    
    // Set position
    if (config.position === 'top') {
        createTopSectionIndicator();
    }
    
    // Add scroll listener
    addScrollListenerForSections();
    
    // Show indicator with animation
    setTimeout(() => {
        showSectionIndicator();
    }, 1000);
    
    return { observer, indicator, progressFill };
}

// ... existing code ...

// Add missing functions that are called in DOMContentLoaded
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
}

function initializeHoverEffects() {
    // Add hover effects to elements
    const elements = document.querySelectorAll('.product-card, .buy-btn, .cta-btn');
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize product card click functionality
function initializeProductCardClicks() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add cursor pointer to indicate clickable
        card.style.cursor = 'pointer';
        
        // Add click event listener
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buy button or size selector
            if (e.target.classList.contains('buy-btn') || 
                e.target.closest('.size-selector-container') ||
                e.target.classList.contains('size-btn')) {
                return;
            }
            
            // Get product information
            const productName = this.querySelector('h3').textContent;
            const productPrice = this.querySelector('.price').textContent;
            const productImage = this.querySelector('img').src;
            const productCategory = this.getAttribute('data-category');
            
            // Show product details modal or navigate to product detail page
            showProductDetails(productName, productPrice, productImage, productCategory);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add hover effect for better UX
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    console.log(`Product card click functionality initialized for ${productCards.length} cards`);
}

// Show product details modal
function showProductDetails(productName, productPrice, productImage, productCategory) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'product-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'product-modal-content';
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = '#f0f0f0';
        this.style.color = '#333';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'none';
        this.style.color = '#666';
    });
    
    // Create product content
    const productHTML = `
        <div class="product-modal-image" style="text-align: center; margin-bottom: 20px;">
            <img src="${productImage}" alt="${productName}" style="max-width: 100%; height: auto; border-radius: 10px;">
        </div>
        <div class="product-modal-info">
            <h2 style="margin-bottom: 10px; color: #333; font-size: 1.5rem;">${productName}</h2>
            <p class="product-modal-price" style="font-size: 1.3rem; font-weight: bold; color: #e74c3c; margin-bottom: 15px;">${productPrice}</p>
            <p class="product-modal-category" style="color: #666; margin-bottom: 20px; text-transform: capitalize;">Category: ${productCategory}</p>
            <div class="product-modal-description" style="margin-bottom: 25px; line-height: 1.6; color: #555;">
                <p>This is a high-quality ${productCategory} product. Perfect for everyday wear and special occasions.</p>
                <ul style="margin-top: 15px; padding-left: 20px;">
                    <li>Premium quality material</li>
                    <li>Comfortable fit</li>
                    <li>Easy to maintain</li>
                    <li>Multiple size options available</li>
                </ul>
            </div>
            <div class="product-modal-actions" style="display: flex; gap: 15px; flex-wrap: wrap;">
                <button class="modal-buy-btn" style="
                    background: linear-gradient(45deg, #e74c3c, #c0392b);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    flex: 1;
                    min-width: 120px;
                ">Add to Cart</button>
                <button class="modal-close-btn" style="
                    background: #f8f9fa;
                    color: #333;
                    border: 2px solid #ddd;
                    padding: 12px 25px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    flex: 1;
                    min-width: 120px;
                ">Close</button>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = productHTML;
    modalContent.appendChild(closeBtn);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Show modal with animation
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Add event listeners for close functionality
    const closeModal = () => {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modalOverlay.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Add buy button functionality
    const modalBuyBtn = modalContent.querySelector('.modal-buy-btn');
    modalBuyBtn.addEventListener('click', function() {
        // Add to cart functionality
        addToCart(productName, productPrice, productImage);
        
        // Show success message
        this.textContent = 'Added to Cart!';
        this.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        }, 2000);
    });
    
    // Add close button functionality
    const modalCloseBtn = modalContent.querySelector('.modal-close-btn');
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Add hover effects for buttons
    [modalBuyBtn, modalCloseBtn].forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeydown);
        }
    });
    
    console.log(`Product details modal shown for: ${productName}`);
}

// ... existing code ...