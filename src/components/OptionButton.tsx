import React from 'react';
import { motion } from 'framer-motion';

interface OptionButtonProps {
  text: string;
  onClick: () => void;
  isCorrect?: boolean | null;
  isSelected?: boolean;
  disabled?: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({ 
  text, 
  onClick, 
  isCorrect = null,
  isSelected = false,
  disabled = false
}) => {
  // Determine background color based on state
  let bgColor = 'bg-white hover:bg-gray-50';
  
  if (isCorrect === true) {
    bgColor = 'bg-success-100 border-success-500';
  } else if (isCorrect === false) {
    bgColor = 'bg-error-100 border-error-500';
  } else if (isSelected) {
    bgColor = 'bg-primary-100 border-primary-500';
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full py-4 px-6 mb-4 text-lg font-medium 
        rounded-2xl border-2 shadow-md
        ${bgColor}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200
      `}
      whileHover={!disabled ? { scale: 1.03, y: -5 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {text}
      
      {/* Show checkmark or X icon for correct/incorrect answers */}
      {isCorrect === true && (
        <motion.div 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-success-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
        >
          ✓
        </motion.div>
      )}
      
      {isCorrect === false && (
        <motion.div 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-error-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          ✗
        </motion.div>
      )}
    </motion.button>
  );
};

export default OptionButton;