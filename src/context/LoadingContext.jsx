import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({
    page: false,
    products: false,
    cart: false,
    form: false,
    images: false
  });

  const [loadingMessages, setLoadingMessages] = useState({
    page: 'Loading page...',
    products: 'Loading products...',
    cart: 'Updating cart...',
    form: 'Submitting...',
    images: 'Loading images...'
  });

  const setLoading = useCallback((key, isLoading, message = null) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }));

    if (message) {
      setLoadingMessages(prev => ({
        ...prev,
        [key]: message
      }));
    }
  }, []);

  const setMultipleLoading = useCallback((states) => {
    setLoadingStates(prev => ({
      ...prev,
      ...states
    }));
  }, []);

  const clearAllLoading = useCallback(() => {
    setLoadingStates({
      page: false,
      products: false,
      cart: false,
      form: false,
      images: false
    });
  }, []);

  const isLoading = useCallback((key) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some(state => state);
  }, [loadingStates]);

  const getLoadingMessage = useCallback((key) => {
    return loadingMessages[key] || 'Loading...';
  }, [loadingMessages]);

  const value = {
    loadingStates,
    loadingMessages,
    setLoading,
    setMultipleLoading,
    clearAllLoading,
    isLoading,
    isAnyLoading,
    getLoadingMessage
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 