import React from 'react';
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
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleRemoveItem = (productId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => removeFromCart(productId), style: 'destructive' },
      ]
    );
  };

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    } else {
      handleRemoveItem(productId);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add some items to your cart first.');
      return;
    }
    Alert.alert('Checkout', 'Proceed to checkout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Proceed', onPress: () => navigation.navigate('Checkout') },
    ]);
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: clearCart, style: 'destructive' },
      ]
    );
  };

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity, -1)}
          >
            <Icon name="remove" size={20} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity, 1)}
          >
            <Icon name="add" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.itemTotal}>
          <Text style={styles.itemTotalText}>
            Total: ₹{(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Icon name="delete" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCart}>
      <Icon name="shopping-cart" size={80} color="#ccc" />
      <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
      <Text style={styles.emptyCartSubtitle}>
        Add some products to get started
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.browseButtonText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCartSummary = () => (
    <View style={styles.cartSummary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Items:</Text>
        <Text style={styles.summaryValue}>{itemCount}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal:</Text>
        <Text style={styles.summaryValue}>₹{total.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping:</Text>
        <Text style={styles.summaryValue}>₹50.00</Text>
      </View>
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>₹{(total + 50).toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      {items.length > 0 && (
        <TouchableOpacity
          style={styles.clearCartButton}
          onPress={handleClearCart}
        >
          <Icon name="clear-all" size={20} color="#FF6B6B" />
          <Text style={styles.clearCartText}>Clear Cart</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        style={[styles.checkoutButton, items.length === 0 && styles.disabledButton]}
        onPress={handleCheckout}
        disabled={items.length === 0}
      >
        <Icon name="shopping-cart-checkout" size={24} color="#fff" />
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>Shopping Cart</Text>
              <Text style={styles.cartSubtitle}>{itemCount} items</Text>
            </View>
            
            <View style={styles.cartItems}>
              {items.map(renderCartItem)}
            </View>
            
            {renderCartSummary()}
          </>
        )}
      </ScrollView>
      
      {items.length > 0 && renderActionButtons()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cartHeader: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 8,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cartSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  cartItems: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    marginTop: 4,
  },
  itemTotalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  removeButton: {
    padding: 8,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cartSummary: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionButtons: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  clearCartText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 12,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CartScreen; 