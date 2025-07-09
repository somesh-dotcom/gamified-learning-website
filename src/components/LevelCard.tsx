import React from 'react';
import { motion } from 'framer-motion';
import { LevelData } from '../types';
import Stars from './Stars';
import { Lock } from 'lucide-react';

interface LevelCardProps {
  level: LevelData;
  onClick: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, onClick }) => {
  const { name, description, stars, completed, unlocked } = level;

  return (
    <motion.div 
      className={`
        relative overflow-hidden rounded-2xl shadow-lg 
        ${unlocked ? 'bg-white cursor-pointer' : 'bg-gray-100 cursor-not-allowed'}
        transition-all duration-300
      `}
      onClick={unlocked ? onClick : undefined}
      whileHover={unlocked ? { y: -8, scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Level content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Show stars if completed, otherwise show status */}
        {completed ? (
          <div className="mt-4">
            <Stars count={stars} />
          </div>
        ) : (
          <p className={`text-sm font-medium ${unlocked ? 'text-primary-600' : 'text-gray-500'}`}>
            {unlocked ? 'Ready to play!' : 'Complete previous level to unlock'}
          </p>
        )}
      </div>
      
      {/* Locked overlay */}
      {!unlocked && (
        <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
          <motion.div 
            className="bg-white rounded-full p-4 shadow-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Lock size={36} className="text-gray-600" />
          </motion.div>
        </div>
      )}
      
      {/* Colorful accent border at bottom */}
      <div className={`
        h-2 w-full absolute bottom-0 left-0
        ${level.id === 1 ? 'bg-primary-500' : 
          level.id === 2 ? 'bg-secondary-500' : 
          level.id === 3 ? 'bg-success-500' : 'bg-warning-500'}
      `} />
    </motion.div>
  );
};

export default LevelCard;