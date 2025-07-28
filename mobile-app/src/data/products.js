export const products = [
  {
    id: 1,
    name: "Organic Ashwagandha Powder",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    description: "Pure organic ashwagandha powder for stress relief and energy boost.",
    category: "Herbal Supplements",
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    stockQuantity: 50,
    weight: "100g",
    origin: "India",
    organic: true,
    discount: 17,
    badge: {
      type: 'trending',
      value: 'Popular'
    }
  },
  {
    id: 2,
    name: "Turmeric Golden Milk Mix",
    price: 19.99,
    originalPrice: 24.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Traditional golden milk blend with premium turmeric and warming spices.",
    category: "Herbal Supplements",
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 75,
    weight: "200g",
    origin: "India",
    organic: true,
    discount: 20,
    badge: {
      type: 'new',
      value: 'New'
    }
  },
  {
    id: 3,
    name: "Holy Basil (Tulsi) Tea",
    price: 15.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    description: "Sacred tulsi tea for immunity and stress relief.",
    category: "Herbal Teas",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 100,
    weight: "50g",
    origin: "India",
    organic: true,
    discount: 20,
    badge: {
      type: 'bestseller',
      value: 'Best Seller'
    }
  },
  {
    id: 4,
    name: "Triphala Digestive Blend",
    price: 18.99,
    originalPrice: 22.99,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop",
    description: "Traditional three-fruit blend for digestive health and detoxification.",
    category: "Digestive Health",
    rating: 4.4,
    reviewCount: 203,
    inStock: true,
    stockQuantity: 60,
    weight: "100g",
    origin: "India",
    organic: true,
    discount: 17,
    badge: {
      type: 'organic',
      value: 'Organic'
    }
  },
  {
    id: 5,
    name: "Neem Leaf Powder",
    price: 12.99,
    originalPrice: 15.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Natural neem powder for skin health and purification.",
    category: "Skin Care",
    rating: 4.2,
    reviewCount: 78,
    inStock: true,
    stockQuantity: 80,
    weight: "100g",
    origin: "India",
    organic: true,
    discount: 19,
    badge: {
      type: 'natural',
      value: 'Natural'
    }
  },
  {
    id: 6,
    name: "Amla (Indian Gooseberry) Powder",
    price: 16.99,
    originalPrice: 20.99,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    description: "Vitamin C rich amla powder for immunity and hair health.",
    category: "Immunity Boosters",
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    stockQuantity: 90,
    weight: "100g",
    origin: "India",
    organic: true,
    discount: 19,
    badge: {
      type: 'vitamin',
      value: 'High Vitamin C'
    }
  }
];

export const categories = [
  {
    id: 1,
    name: "Herbal Supplements",
    icon: "🌿",
    count: 2
  },
  {
    id: 2,
    name: "Herbal Teas",
    icon: "🍵",
    count: 1
  },
  {
    id: 3,
    name: "Digestive Health",
    icon: "🌱",
    count: 1
  },
  {
    id: 4,
    name: "Skin Care",
    icon: "🌸",
    count: 1
  },
  {
    id: 5,
    name: "Immunity Boosters",
    icon: "💪",
    count: 1
  }
];

export const featuredProducts = products.filter(product => 
  product.badge?.type === 'trending' || product.badge?.type === 'bestseller'
);

export const newProducts = products.filter(product => 
  product.badge?.type === 'new'
);

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
}; 