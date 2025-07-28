import React from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import './CustomToast.css';

// Custom Toast Components
const ToastContent = ({ icon, title, message, type }) => (
  <motion.div 
    className={`custom-toast ${type}`}
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -50, scale: 0.8 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <div className="toast-icon">
      {icon}
    </div>
    <div className="toast-content">
      <h4 className="toast-title">{title}</h4>
      <p className="toast-message">{message}</p>
    </div>
  </motion.div>
);

// Toast Functions
export const showSuccessToast = (title, message) => {
  toast.success(
    <ToastContent 
      icon="✅" 
      title={title} 
      message={message} 
      type="success"
    />,
    {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast-container success",
    }
  );
};

export const showErrorToast = (title, message) => {
  toast.error(
    <ToastContent 
      icon="❌" 
      title={title} 
      message={message} 
      type="error"
    />,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast-container error",
    }
  );
};

export const showWarningToast = (title, message) => {
  toast.warning(
    <ToastContent 
      icon="⚠️" 
      title={title} 
      message={message} 
      type="warning"
    />,
    {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast-container warning",
    }
  );
};

export const showInfoToast = (title, message) => {
  toast.info(
    <ToastContent 
      icon="ℹ️" 
      title={title} 
      message={message} 
      type="info"
    />,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast-container info",
    }
  );
};

// Cart-specific toasts
export const showCartToast = (action, productName) => {
  const messages = {
    add: {
      title: "Added to Cart",
      message: `${productName} has been added to your cart`,
      icon: "🛒"
    },
    remove: {
      title: "Removed from Cart",
      message: `${productName} has been removed from your cart`,
      icon: "🗑️"
    },
    update: {
      title: "Cart Updated",
      message: `Quantity updated for ${productName}`,
      icon: "📝"
    },
    clear: {
      title: "Cart Cleared",
      message: "All items have been removed from your cart",
      icon: "🧹"
    }
  };

  const { title, message, icon } = messages[action];
  
  toast.success(
    <ToastContent 
      icon={icon} 
      title={title} 
      message={message} 
      type="success"
    />,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast-container cart",
    }
  );
};

// Form-specific toasts
export const showFormToast = (action, formName) => {
  const messages = {
    submit: {
      title: "Form Submitted",
      message: `Your ${formName} has been submitted successfully`,
      icon: "📤"
    },
    error: {
      title: "Submission Error",
      message: `There was an error submitting your ${formName}`,
      icon: "❌"
    },
    validation: {
      title: "Validation Error",
      message: `Please check your ${formName} for errors`,
      icon: "⚠️"
    }
  };

  const { title, message, icon } = messages[action];
  
  if (action === 'error' || action === 'validation') {
    toast.error(
      <ToastContent 
        icon={icon} 
        title={title} 
        message={message} 
        type="error"
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast-container form",
      }
    );
  } else {
    toast.success(
      <ToastContent 
        icon={icon} 
        title={title} 
        message={message} 
        type="success"
      />,
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast-container form",
      }
    );
  }
};

// Product-specific toasts
export const showProductToast = (action, productName) => {
  const messages = {
    view: {
      title: "Product Viewed",
      message: `You're viewing ${productName}`,
      icon: "👁️"
    },
    buy: {
      title: "Purchase Initiated",
      message: `Proceeding to checkout for ${productName}`,
      icon: "💳"
    },
    wishlist: {
      title: "Added to Wishlist",
      message: `${productName} has been added to your wishlist`,
      icon: "❤️"
    },
    review: {
      title: "Review Submitted",
      message: `Thank you for reviewing ${productName}`,
      icon: "⭐"
    }
  };

  const { title, message, icon } = messages[action];
  
  toast.success(
    <ToastContent 
      icon={icon} 
      title={title} 
      message={message} 
      type="success"
    />,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast-container product",
    }
  );
};

// Voice search toasts
export const showVoiceToast = (action, query = '') => {
  const messages = {
    start: {
      title: "Voice Search Started",
      message: "Listening for your voice command...",
      icon: "🎤"
    },
    success: {
      title: "Voice Search Complete",
      message: `Searching for: "${query}"`,
      icon: "🔍"
    },
    error: {
      title: "Voice Search Error",
      message: "Could not recognize your voice. Please try again.",
      icon: "❌"
    },
    noSpeech: {
      title: "No Speech Detected",
      message: "Please speak clearly and try again.",
      icon: "🔇"
    }
  };

  const { title, message, icon } = messages[action];
  
  if (action === 'error' || action === 'noSpeech') {
    toast.error(
      <ToastContent 
        icon={icon} 
        title={title} 
        message={message} 
        type="error"
      />,
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast-container voice",
      }
    );
  } else {
    toast.info(
      <ToastContent 
        icon={icon} 
        title={title} 
        message={message} 
        type="info"
      />,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast-container voice",
      }
    );
  }
};

// Theme toggle toasts
export const showThemeToast = (theme) => {
  const messages = {
    light: {
      title: "Light Theme Applied",
      message: "Switched to light mode for better visibility",
      icon: "☀️"
    },
    dark: {
      title: "Dark Theme Applied",
      message: "Switched to dark mode for eye comfort",
      icon: "🌙"
    },
    system: {
      title: "System Theme Applied",
      message: "Following your system preference",
      icon: "⚙️"
    }
  };

  const { title, message, icon } = messages[theme];
  
  toast.info(
    <ToastContent 
      icon={icon} 
      title={title} 
      message={message} 
      type="info"
    />,
    {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast-container theme",
    }
  );
};

// PWA toasts
export const showPWAToast = (action) => {
  const messages = {
    install: {
      title: "App Install Available",
      message: "Install our app for a better experience",
      icon: "📱"
    },
    installed: {
      title: "App Installed",
      message: "Thank you for installing our app!",
      icon: "✅"
    },
    offline: {
      title: "You're Offline",
      message: "Some features may be limited",
      icon: "📡"
    },
    online: {
      title: "Back Online",
      message: "All features are now available",
      icon: "🌐"
    }
  };

  const { title, message, icon } = messages[action];
  
  if (action === 'offline') {
    toast.warning(
      <ToastContent 
        icon={icon} 
        title={title} 
        message={message} 
        type="warning"
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast-container pwa",
      }
    );
  } else {
    toast.success(
      <ToastContent 
        icon={icon} 
        title={title} 
        message={message} 
        type="success"
      />,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast-container pwa",
      }
    );
  }
};

export default {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showCartToast,
  showFormToast,
  showProductToast,
  showVoiceToast,
  showThemeToast,
  showPWAToast
}; 