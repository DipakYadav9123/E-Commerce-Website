import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';

// Import context providers
import { CartProvider } from './context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Product Stack Navigator
const ProductStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#4CAF50',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="ProductsList" 
      component={ProductsScreen}
      options={{ title: 'Products' }}
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen}
      options={{ title: 'Product Details' }}
    />
  </Stack.Navigator>
);

// Cart Stack Navigator
const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#4CAF50',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="CartList" 
      component={CartScreen}
      options={{ title: 'Shopping Cart' }}
    />
  </Stack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Products') {
          iconName = 'shopping-bag';
        } else if (route.name === 'Cart') {
          iconName = 'shopping-cart';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4CAF50',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ title: 'Home' }}
    />
    <Tab.Screen 
      name="Products" 
      component={ProductStack}
      options={{ title: 'Products' }}
    />
    <Tab.Screen 
      name="Cart" 
      component={CartStack}
      options={{ title: 'Cart' }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <CartProvider>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App; 