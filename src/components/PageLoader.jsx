import React from 'react';
import { useLoading } from '../context/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

const PageLoader = () => {
  const { isLoading, getLoadingMessage } = useLoading();

  // Show page loader when any loading state is active
  if (!isLoading('page')) {
    return null;
  }

  return (
    <LoadingSpinner
      fullScreen={true}
      size="large"
      variant="primary"
      text={getLoadingMessage('page')}
    />
  );
};

export default PageLoader; 