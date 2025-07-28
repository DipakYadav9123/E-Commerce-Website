import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { featuredProducts, categories } from '../data/products';

const HomeScreen = ({ navigation }) => {
  const renderHeader = () => (
    <LinearGradient
      colors={['#4CAF50', '#45a049']}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>AyurvedaHerbs</Text>
          <Text style={styles.tagline}>Pure • Natural • Organic</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => navigation.navigate('Products', { category: category.name })}
    >
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={styles.categoryCount}>{category.count} products</Text>
    </TouchableOpacity>
  );

  const renderProductCard = (product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}% OFF</Text>
          </View>
        )}
        {product.badge && (
          <View style={styles.productBadge}>
            <Text style={styles.badgeText}>{product.badge.value}</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title, children) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        
        <View style={styles.content}>
          {/* Categories */}
          {renderSection(
            'Shop by Category',
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {categories.map(renderCategoryCard)}
            </ScrollView>
          )}

          {/* Featured Products */}
          {renderSection(
            'Featured Products',
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
              {featuredProducts.map(renderProductCard)}
            </ScrollView>
          )}

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="local-offer" size={32} color="#FF6B6B" />
              <Text style={styles.actionTitle}>Special Offers</Text>
              <Text style={styles.actionSubtitle}>Up to 50% off</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="favorite" size={32} color="#4ECDC4" />
              <Text style={styles.actionTitle}>Wishlist</Text>
              <Text style={styles.actionSubtitle}>Save for later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  appName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  tagline: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  searchButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    elevation: 3,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 100,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  productsContainer: {
    marginBottom: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    width: 160,
    elevation: 3,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen; 