import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, LevelData, GameState } from '../types';
import { levels as initialLevels } from '../data/levels';
import { mockUsers } from '../data/users';

interface GameContextProps {
  gameState: GameState;
  login: (username: string) => void;
  logout: () => void;
  updateLevelStars: (levelId: number, stars: number) => void;
  unlockNextLevel: (currentLevelId: number) => void;
  resetLevels: () => void;
}

const defaultGameState: GameState = {
  currentUser: null,
  levels: initialLevels,
  users: mockUsers,
};

const GameContext = createContext<GameContextProps>({
  gameState: defaultGameState,
  login: () => {},
  logout: () => {},
  updateLevelStars: () => {},
  unlockNextLevel: () => {},
  resetLevels: () => {},
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to load saved state from localStorage
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : defaultGameState;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const login = (username: string) => {
    // Check if user already exists
    const existingUser = gameState.users.find(user => user.username === username);
    
    if (existingUser) {
      setGameState(prev => ({
        ...prev,
        currentUser: existingUser
      }));
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        username,
        stars: 0
      };
      
      setGameState(prev => ({
        ...prev,
        currentUser: newUser,
        users: [...prev.users, newUser]
      }));
    }
  };

  const logout = () => {
    setGameState(prev => ({
      ...prev,
      currentUser: null
    }));
  };

  const updateLevelStars = (levelId: number, stars: number) => {
    // Update stars for the level
    const updatedLevels = gameState.levels.map(level => 
      level.id === levelId 
        ? { ...level, stars, completed: true } 
        : level
    );

    // Calculate total stars for the user
    const totalStars = updatedLevels.reduce((sum, level) => sum + level.stars, 0);

    // Update user's stars
    const updatedUsers = gameState.currentUser 
      ? gameState.users.map(user => 
          user.id === gameState.currentUser?.id 
            ? { ...user, stars: totalStars } 
            : user
        )
      : gameState.users;

    // Update current user if exists
    const updatedCurrentUser = gameState.currentUser 
      ? { ...gameState.currentUser, stars: totalStars } 
      : null;

    setGameState(prev => ({
      ...prev,
      levels: updatedLevels,
      users: updatedUsers,
      currentUser: updatedCurrentUser
    }));
  };

  const unlockNextLevel = (currentLevelId: number) => {
    const nextLevelId = currentLevelId + 1;
    
    if (nextLevelId <= gameState.levels.length) {
      const updatedLevels = gameState.levels.map(level => 
        level.id === nextLevelId 
          ? { ...level, unlocked: true } 
          : level
      );
      
      setGameState(prev => ({
        ...prev,
        levels: updatedLevels
      }));
    }
  };

  const resetLevels = () => {
    setGameState(prev => ({
      ...prev,
      levels: initialLevels
    }));
  };

  return (
    <GameContext.Provider 
      value={{ 
        gameState, 
        login, 
        logout, 
        updateLevelStars, 
        unlockNextLevel,
        resetLevels
      }}
    >
      {children}
    </GameContext.Provider>
  );
};