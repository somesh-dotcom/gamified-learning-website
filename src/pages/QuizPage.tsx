import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import SpeechBubble from '../components/SpeechBubble';
import OptionButton from '../components/OptionButton';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import Stars from '../components/Stars';
import Confetti from '../components/Confetti';
import { Home, ArrowRight, RotateCcw } from 'lucide-react';
import useSpeech from '../hooks/useSpeech';

const QuizPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const { gameState, updateLevelStars, unlockNextLevel } = useGameContext();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [randomizedOptions, setRandomizedOptions] = useState<string[]>([]);
  
  // Convert levelId to number (default to 1 if invalid)
  const parsedLevelId = levelId ? parseInt(levelId, 10) : 1;
  
  // Get current level data
  const level = gameState.levels.find(l => l.id === parsedLevelId) || gameState.levels[0];
  
  // Get current question
  const currentQuestion = level.questions[currentQuestionIndex];

  // Randomize options when question changes
  useEffect(() => {
    if (currentQuestion) {
      const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
      setRandomizedOptions(shuffled);
    }
  }, [currentQuestion]);
  
  // Set up speech for correct/incorrect feedback
  const correctSpeech = useSpeech("That's correct! Good job!");
  const incorrectSpeech = useSpeech("Sorry, that's not right. Try again next time!");
  
  // Handle selecting an answer
  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      correctSpeech.speak();
    } else {
      incorrectSpeech.speak();
    }
  };
  
  // Move to next question or show results
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    if (currentQuestionIndex < level.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };
  
  // Calculate results and stars earned
  const calculateResults = () => {
    let stars = 0;
    
    if (correctAnswers >= level.questions.length) {
      stars = 3;
    } else if (correctAnswers >= 7) {
      stars = 2;
    } else if (correctAnswers >= 4) {
      stars = 1;
    }
    
    setEarnedStars(stars);
    setShowResults(true);
    
    // Update level stars in context
    updateLevelStars(level.id, stars);
    
    // Unlock next level if at least 1 star was earned
    if (stars >= 1) {
      unlockNextLevel(level.id);
    }
    
    // Show confetti for good results
    if (stars >= 2) {
      setShowConfetti(true);
    }
  };
  
  // Navigate to next level
  const handleNextLevel = () => {
    navigate(`/quiz/${level.id + 1}`);
  };
  
  // Navigate back to levels page
  const handleBackToLevels = () => {
    navigate('/levels');
  };
  
  // Try the level again
  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCorrectAnswers(0);
    setShowResults(false);
    setEarnedStars(0);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-300 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with level name and progress */}
        <header className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {level.name}
          </h1>
          
          <Button 
            onClick={handleBackToLevels} 
            variant="secondary" 
            size="sm"
          >
            <Home size={18} className="mr-1" />
            Back to Levels
          </Button>
        </header>
        
        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={level.questions.length} 
          />
          <p className="text-right mt-2 text-gray-600">
            Question {currentQuestionIndex + 1} of {level.questions.length}
          </p>
        </div>
        
        {/* Main content */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question image */}
              {currentQuestion.imageUrl && (
                <div className="mb-6">
                  <motion.img 
                    src={currentQuestion.imageUrl} 
                    alt="Question"
                    className="w-full max-h-64 object-contain rounded-xl shadow-md mx-auto"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
              
              {/* Question */}
              <div className="mb-8">
                <SpeechBubble 
                  text={currentQuestion.question} 
                  autoSpeak={true}
                />
              </div>
              
              {/* Answer options */}
              <div className="space-y-4">
                {randomizedOptions.map((option) => (
                  <OptionButton
                    key={option}
                    text={option}
                    onClick={() => handleSelectAnswer(option)}
                    isCorrect={selectedAnswer === option ? isCorrect : null}
                    isSelected={selectedAnswer === option}
                    disabled={selectedAnswer !== null}
                  />
                ))}
              </div>
              
              {/* Next button */}
              {selectedAnswer && (
                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    onClick={handleNextQuestion} 
                    variant="primary"
                    size="lg"
                  >
                    {currentQuestionIndex < level.questions.length - 1 ? (
                      <>Next Question <ArrowRight size={18} className="ml-1" /></>
                    ) : (
                      <>See Results <ArrowRight size={18} className="ml-1" /></>
                    )}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="bg-white rounded-3xl p-8 shadow-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
              
              <p className="text-xl mb-6">
                You got <span className="font-bold text-primary-600">{correctAnswers}</span> out of <span className="font-bold">{level.questions.length}</span> questions correct!
              </p>
              
              <div className="mb-8">
                <p className="text-lg mb-3">You earned:</p>
                <Stars count={earnedStars} size="lg" />
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                <Button 
                  onClick={handleTryAgain} 
                  variant="secondary"
                  size="lg"
                >
                  <RotateCcw size={18} className="mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  onClick={handleBackToLevels} 
                  variant="primary"
                  size="lg"
                >
                  <Home size={18} className="mr-2" />
                  Back to Levels
                </Button>
                
                {earnedStars >= 1 && level.id < gameState.levels.length && (
                  <Button 
                    onClick={handleNextLevel} 
                    variant="success"
                    size="lg"
                  >
                    Next Level
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Confetti effect */}
      {showConfetti && <Confetti count={150} duration={4000} />}
    </div>
  );
};

export default QuizPage;