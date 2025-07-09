import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  animateHover?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  animateHover = true,
}) => {
  const baseStyles = 'font-semibold rounded-full transition-colors focus:outline-none focus:ring-4';
  
  const variantStyles = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-300',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-300',
    success: 'bg-success-500 hover:bg-success-600 text-white focus:ring-success-300',
    error: 'bg-error-500 hover:bg-error-600 text-white focus:ring-error-300',
    warning: 'bg-warning-500 hover:bg-warning-600 text-white focus:ring-warning-300',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };
  
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';

  const buttonVariants = {
    hover: animateHover ? { 
      scale: 1.05,
      y: -5,
      transition: { type: 'spring', stiffness: 400 }
    } : {},
    tap: { scale: 0.95 }
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      {children}
    </motion.button>
  );
};

export default Button;