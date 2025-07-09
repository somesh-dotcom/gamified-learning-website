import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import Button from '../components/Button';
import { Trophy, ArrowLeft, Star, Medal, User } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const { gameState } = useGameContext();
  const navigate = useNavigate();
  
  // Sort users by stars in descending order
  const sortedUsers = [...gameState.users].sort((a, b) => b.stars - a.stars);
  
  // Find rank of current user
  const currentUserRank = gameState.currentUser 
    ? sortedUsers.findIndex(user => user.id === gameState.currentUser?.id) + 1 
    : 0;
  
  // Get medal color based on rank
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-warning-500'; // Gold
      case 2: return 'text-gray-400'; // Silver
      case 3: return 'text-amber-700'; // Bronze
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-300 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
              <Trophy size={32} className="text-warning-500 mr-3" />
              Leaderboard
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Top players ranked by stars earned
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/levels')} 
            variant="secondary" 
            size="sm"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to Levels
          </Button>
        </header>
        
        {/* Leaderboard Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Table Header */}
          <div className="bg-primary-600 text-white p-4 grid grid-cols-12 font-semibold">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-7">Player</div>
            <div className="col-span-3 text-center">Stars</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {sortedUsers.map((user, index) => {
              const rank = index + 1;
              const isCurrentUser = user.id === gameState.currentUser?.id;
              
              return (
                <motion.div 
                  key={user.id} 
                  className={`grid grid-cols-12 p-4 items-center ${isCurrentUser ? 'bg-primary-50' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Rank */}
                  <div className="col-span-2 text-center">
                    {rank <= 3 ? (
                      <Medal size={24} className={getMedalColor(rank)} />
                    ) : (
                      <span className="text-lg font-medium">{rank}</span>
                    )}
                  </div>
                  
                  {/* Username */}
                  <div className="col-span-7 flex items-center">
                    <div className="bg-gray-100 rounded-full p-2 mr-3">
                      <User size={20} className="text-gray-600" />
                    </div>
                    <span className={`text-lg ${isCurrentUser ? 'font-bold text-primary-600' : 'font-medium'}`}>
                      {user.username} {isCurrentUser && '(You)'}
                    </span>
                  </div>
                  
                  {/* Stars */}
                  <div className="col-span-3 flex items-center justify-center">
                    <span className="font-bold text-lg mr-2">{user.stars}</span>
                    <Star size={18} className="text-warning-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Current User Rank */}
        {gameState.currentUser && (
          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-medium mb-2">Your Ranking</h3>
            <div className="flex justify-center items-center space-x-3">
              <div className="bg-primary-100 rounded-full p-3">
                <Trophy size={24} className="text-primary-600" />
              </div>
              <p className="text-lg">
                You are ranked <span className="font-bold text-primary-600">#{currentUserRank}</span> with <span className="font-bold">{gameState.currentUser.stars}</span> stars!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;