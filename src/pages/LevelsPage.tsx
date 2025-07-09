import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import LevelCard from '../components/LevelCard';
import Button from '../components/Button';
import { Trophy, LogOut } from 'lucide-react';

const LevelsPage: React.FC = () => {
  const { gameState, logout } = useGameContext();
  const navigate = useNavigate();
  
  const handleLevelSelect = (levelId: number) => {
    navigate(`/quiz/${levelId}`);
  };
  
  const handleViewLeaderboard = () => {
    navigate('/leaderboard');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-300 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Hello, {gameState.currentUser?.username || 'Friend'}!
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Choose a level to start playing
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <motion.div 
              className="flex items-center bg-white px-4 py-2 rounded-full shadow-md mr-4"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy size={20} className="text-warning-500 mr-2" />
              <span className="font-semibold">{gameState.currentUser?.stars || 0} Stars</span>
            </motion.div>
            
            <Button 
              onClick={handleLogout} 
              variant="secondary" 
              size="sm"
            >
              <LogOut size={18} className="mr-1" />
              Logout
            </Button>
          </div>
        </header>
        
        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {gameState.levels.map((level) => (
            <LevelCard 
              key={level.id} 
              level={level} 
              onClick={() => handleLevelSelect(level.id)} 
            />
          ))}
        </div>
        
        {/* Leaderboard Button */}
        <div className="text-center">
          <Button 
            onClick={handleViewLeaderboard} 
            variant="primary" 
            size="lg"
            className="px-8"
          >
            <Trophy size={20} className="mr-2" />
            View Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LevelsPage;