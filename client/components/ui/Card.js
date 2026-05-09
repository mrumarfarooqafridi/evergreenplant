import React from 'react';
import { motion } from 'framer-motion';

const Card = React.forwardRef(({ 
  children, 
  className = '', 
  hover = true,
  onClick,
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md overflow-hidden
        ${hover ? 'transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;
