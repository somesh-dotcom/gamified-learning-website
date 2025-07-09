import React from 'react';
import { motion } from 'framer-motion';

interface StarsProps {
  count: number;
  totalStars?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Stars: React.FC<StarsProps> = ({ count, totalStars = 3, size = 'md' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 0; i < totalStars; i++) {
      const filled = i < count;
      
      stars.push(
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: i * 0.2,
            duration: 0.5,
            type: 'spring',
            stiffness: 200
          }}
        >
          <span 
            className={`${sizes[size]} ${filled ? 'text-warning-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        </motion.div>
      );
    }
    
    return stars;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {renderStars()}
    </div>
  );
};

export default Stars;