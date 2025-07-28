import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, items } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      Alert.alert('Error', 'Product not found');
      navigation.goBack();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      Alert.alert('Success', `${product.name} added to cart!`);
    }
  };

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? 'star' : 'star-border'}
        size={20}
        color="#FFD700"
      />
    ));
  };

  const renderImageGallery = () => {
    const images = [
      product.image,
      product.image, // Using same image for demo
      product.image,
      product.image,
    ];

    return (
      <View style={styles.imageGallery}>
        <Image source={{ uri: images[selectedImage] }} style={styles.mainImage} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.thumbnail, selectedImage === index && styles.selectedThumbnail]}
              onPress={() => setSelectedImage(index)}
            >
              <Image source={{ uri: image }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{product.name}</Text>
      
      <View style={styles.ratingContainer}>
        {renderStars(product.rating)}
        <Text style={styles.ratingText}>{product.rating}</Text>
        <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>₹{product.price}</Text>
        {product.originalPrice && (
          <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
        )}
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}% OFF</Text>
          </View>
        )}
      </View>

      <Text style={styles.description}>{product.description}</Text>
    </View>
  );

  const renderProductDetails = () => (
    <View style={styles.detailsSection}>
      <Text style={styles.sectionTitle}>Product Details</Text>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Category:</Text>
        <Text style={styles.detailValue}>{product.category}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Weight:</Text>
        <Text style={styles.detailValue}>{product.weight}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Origin:</Text>
        <Text style={styles.detailValue}>{product.origin}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Stock:</Text>
        <Text style={[styles.detailValue, { color: product.inStock ? '#4CAF50' : '#FF6B6B' }]}>
          {product.inStock ? `${product.stockQuantity} available` : 'Out of stock'}
        </Text>
      </View>
      
      {product.organic && (
        <View style={styles.organicBadge}>
          <Icon name="eco" size={16} color="#4CAF50" />
          <Text style={styles.organicText}>Organic</Text>
        </View>
      )}
    </View>
  );

  const renderQuantitySelector = () => (
    <View style={styles.quantitySection}>
      <Text style={styles.sectionTitle}>Quantity</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          <Icon name="remove" size={24} color={quantity <= 1 ? '#ccc' : '#333'} />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(1)}
          disabled={quantity >= product.stockQuantity}
        >
          <Icon name="add" size={24} color={quantity >= product.stockQuantity ? '#ccc' : '#333'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[styles.addToCartButton, !product.inStock && styles.disabledButton]}
        onPress={handleAddToCart}
        disabled={!product.inStock}
      >
        <Icon name="add-shopping-cart" size={24} color="#fff" />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.buyNowButton, !product.inStock && styles.disabledButton]}
        onPress={() => {
          handleAddToCart();
          navigation.navigate('Cart');
        }}
        disabled={!product.inStock}
      >
        <Icon name="shopping-cart" size={24} color="#fff" />
        <Text style={styles.buyNowText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderImageGallery()}
        {renderProductInfo()}
        {renderProductDetails()}
        {renderQuantitySelector()}
      </ScrollView>
      
      {renderActionButtons()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGallery: {
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#4CAF50',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  productInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  organicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  organicText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  quantitySection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  actionButtons: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  buyNowButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProductDetailScreen; 