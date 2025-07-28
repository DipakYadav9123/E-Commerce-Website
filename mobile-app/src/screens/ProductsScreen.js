import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { products, categories } from '../data/products';

const ProductsScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        )}
        {item.badge && (
          <View style={styles.productBadge}>
            <Text style={styles.badgeText}>{item.badge.value}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          )}
        </View>
        
        <View style={styles.productMeta}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
          
          <View style={styles.stockContainer}>
            <Icon 
              name={item.inStock ? "check-circle" : "cancel"} 
              size={16} 
              color={item.inStock ? "#4CAF50" : "#FF6B6B"} 
            />
            <Text style={[styles.stockText, { color: item.inStock ? "#4CAF50" : "#FF6B6B" }]}>
              {item.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.addToCartButton, !item.inStock && styles.disabledButton]}
          disabled={!item.inStock}
        >
          <Icon name="add-shopping-cart" size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFilter}
    >
      <TouchableOpacity
        style={[styles.categoryFilterItem, selectedCategory === 'All' && styles.selectedCategory]}
        onPress={() => setSelectedCategory('All')}
      >
        <Text style={[styles.categoryFilterText, selectedCategory === 'All' && styles.selectedCategoryText]}>
          All
        </Text>
      </TouchableOpacity>
      
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[styles.categoryFilterItem, selectedCategory === category.name && styles.selectedCategory]}
          onPress={() => setSelectedCategory(category.name)}
        >
          <Text style={[styles.categoryFilterText, selectedCategory === category.name && styles.selectedCategoryText]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSortOptions = () => (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      <TouchableOpacity
        style={[styles.sortOption, sortBy === 'name' && styles.selectedSort]}
        onPress={() => setSortBy('name')}
      >
        <Text style={[styles.sortText, sortBy === 'name' && styles.selectedSortText]}>Name</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.sortOption, sortBy === 'price' && styles.selectedSort]}
        onPress={() => setSortBy('price')}
      >
        <Text style={[styles.sortText, sortBy === 'price' && styles.selectedSortText]}>Price</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.sortOption, sortBy === 'rating' && styles.selectedSort]}
        onPress={() => setSortBy('rating')}
      >
        <Text style={[styles.sortText, sortBy === 'rating' && styles.selectedSortText]}>Rating</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="clear" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      {renderCategoryFilter()}

      {/* Sort Options */}
      {renderSortOptions()}

      {/* Products List */}
      <FlatList
        data={sortedProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoryFilter: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryFilterItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    elevation: 1,
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryFilterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  selectedSort: {
    backgroundColor: '#4CAF50',
  },
  sortText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  selectedSortText: {
    color: '#fff',
  },
  productsList: {
    padding: 16,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default ProductsScreen; 