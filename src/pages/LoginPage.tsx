import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import Button from '../components/Button';
import { BookOpen, Brain, Star } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useGameContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (username.length < 3) {
      setError('Name must be at least 3 characters');
      return;
    }
    
    // Login and navigate to levels page
    login(username);
    navigate('/levels');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-300 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-primary-500 py-6 px-8 text-white text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Brain size={60} className="mx-auto mb-3" />
          </motion.div>
          <h1 className="text-3xl font-bold">KidsQuiz</h1>
          <p className="mt-2">Fun Learning Adventure!</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                What's your name?
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-xl border-2 border-primary-300 focus:border-primary-500 focus:outline-none text-lg"
                placeholder="Enter your name here"
              />
              {error && (
                <motion.p 
                  className="text-error-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </div>
            
            <Button 
              onClick={handleSubmit} 
              variant="primary" 
              size="lg" 
              className="w-full"
            >
              Start Playing!
            </Button>
          </form>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center text-gray-600">
              <BookOpen size={20} className="mr-2 text-primary-500" />
              <p>Learn about colors, animals, fruits and more!</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Star size={20} className="mr-2 text-warning-500" />
              <p>Collect stars and reach the leaderboard!</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;