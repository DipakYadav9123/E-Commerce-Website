import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  variant = 'default', 
  text = 'Loading...',
  fullScreen = false,
  overlay = false 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const variantClasses = {
    default: 'spinner-default',
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    light: 'spinner-light',
    dark: 'spinner-dark'
  };

  const spinnerContent = (
    <div className={`loading-spinner ${sizeClasses[size]} ${variantClasses[variant]}`}>
      <div className="spinner-container">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {text && <div className="spinner-text">{text}</div>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-overlay">
          {spinnerContent}
        </div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="loading-overlay">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner; 