import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  // Enhanced animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      x: -20,
      scale: 0.98,
      filter: 'blur(2px)'
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    out: {
      opacity: 0,
      x: 20,
      scale: 0.98,
      filter: 'blur(2px)',
      transition: {
        duration: 0.4,
        ease: [0.55, 0.055, 0.675, 0.19]
      }
    }
  };

  // Different transition styles for different routes
  const getTransitionStyle = (pathname) => {
    switch (pathname) {
      case '/':
        return {
          initial: { 
            opacity: 0, 
            y: 50,
            scale: 0.95,
            filter: 'blur(3px)'
          },
          in: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { 
              duration: 0.7, 
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1
            }
          },
          out: { 
            opacity: 0, 
            y: -30,
            scale: 0.95,
            filter: 'blur(3px)',
            transition: { 
              duration: 0.5, 
              ease: [0.55, 0.055, 0.675, 0.19]
            }
          }
        };
      case '/products':
        return {
          initial: { 
            opacity: 0, 
            x: -40,
            scale: 0.9,
            filter: 'blur(2px)'
          },
          in: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          },
          out: { 
            opacity: 0, 
            x: 40,
            scale: 0.9,
            filter: 'blur(2px)',
            transition: { 
              duration: 0.4, 
              ease: [0.55, 0.055, 0.675, 0.19]
            }
          }
        };
      case '/offers':
        return {
          initial: { 
            opacity: 0, 
            scale: 0.8, 
            rotateY: -20,
            filter: 'blur(4px)'
          },
          in: { 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            transition: { 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          },
          out: { 
            opacity: 0, 
            scale: 0.8,
            rotateY: 20,
            filter: 'blur(4px)',
            transition: { 
              duration: 0.4, 
              ease: [0.55, 0.055, 0.675, 0.19]
            }
          }
        };
      case '/blog':
        return {
          initial: { 
            opacity: 0, 
            y: -40,
            scale: 0.95,
            filter: 'blur(2px)'
          },
          in: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          },
          out: { 
            opacity: 0, 
            y: 40,
            scale: 0.95,
            filter: 'blur(2px)',
            transition: { 
              duration: 0.4, 
              ease: [0.55, 0.055, 0.675, 0.19]
            }
          }
        };
      case '/contact':
        return {
          initial: { 
            opacity: 0, 
            x: 40,
            scale: 0.9,
            filter: 'blur(2px)'
          },
          in: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          },
          out: { 
            opacity: 0, 
            x: -40,
            scale: 0.9,
            filter: 'blur(2px)',
            transition: { 
              duration: 0.4, 
              ease: [0.55, 0.055, 0.675, 0.19]
            }
          }
        };
      default:
        return {
          initial: { 
            opacity: 0, 
            x: -20,
            scale: 0.98,
            filter: 'blur(2px)'
          },
          in: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          },
          out: { 
            opacity: 0, 
            x: 20,
            scale: 0.98,
            filter: 'blur(2px)',
            transition: { 
              duration: 0.4, 
              ease: [0.55, 0.055, 0.675, 0.19]
            }
          }
        };
    }
  };

  const currentVariants = getTransitionStyle(location.pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={currentVariants}
        className="page-transition-container"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition; 