import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGameContext } from './context/GameContext';
import LoginPage from './pages/LoginPage';
import LevelsPage from './pages/LevelsPage';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderboardPage';

// Protected route component that requires authentication
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { gameState } = useGameContext();
  
  // Redirect to login if no user is logged in
  if (!gameState.currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route 
        path="/levels" 
        element={<ProtectedRoute element={<LevelsPage />} />} 
      />
      <Route 
        path="/quiz/:levelId" 
        element={<ProtectedRoute element={<QuizPage />} />} 
      />
      <Route 
        path="/leaderboard" 
        element={<ProtectedRoute element={<LeaderboardPage />} />} 
      />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <GameProvider>
      <Router>
        <AppRoutes />
      </Router>
    </GameProvider>
  );
}

export default App;