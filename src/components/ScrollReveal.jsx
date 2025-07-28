import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollReveal = ({ 
  children, 
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
  once = true,
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: once,
    amount: threshold 
  });

  // Animation variants
  const variants = {
    fadeUp: {
      hidden: { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    fadeIn: {
      hidden: { 
        opacity: 0,
        scale: 0.9
      },
      visible: { 
        opacity: 1,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    slideLeft: {
      hidden: { 
        opacity: 0, 
        x: 50,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    slideRight: {
      hidden: { 
        opacity: 0, 
        x: -50,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    scaleUp: {
      hidden: { 
        opacity: 0, 
        scale: 0.8,
        y: 30
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    rotateIn: {
      hidden: { 
        opacity: 0, 
        rotate: -10,
        scale: 0.9
      },
      visible: { 
        opacity: 1, 
        rotate: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    bounceIn: {
      hidden: { 
        opacity: 0, 
        scale: 0.3,
        y: 50
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: {
          duration: duration,
          delay: delay,
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      }
    },
    flipIn: {
      hidden: { 
        opacity: 0, 
        rotateY: 90,
        scale: 0.8
      },
      visible: { 
        opacity: 1, 
        rotateY: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    zoomIn: {
      hidden: { 
        opacity: 0, 
        scale: 0.5
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal; 