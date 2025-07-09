import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  count?: number;
  duration?: number;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const colors = [
  '#FFC107', // yellow
  '#FF5722', // orange
  '#2196F3', // blue
  '#4CAF50', // green
  '#E91E63', // pink
  '#9C27B0', // purple
];

const Confetti: React.FC<ConfettiProps> = ({ 
  count = 100,
  duration = 3000
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Create confetti pieces
    const newPieces = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random x position (0-100%)
      y: -20, // start above the viewport
      size: Math.random() * 10 + 5, // random size (5-15px)
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360, // random initial rotation
    }));
    
    setPieces(newPieces);
    
    // Hide confetti after duration
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [count, duration]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%', // circles and squares
          }}
          initial={{ 
            y: -20,
            rotate: piece.rotation
          }}
          animate={{ 
            y: ['0vh', '100vh'],
            x: [
              `${piece.x}%`, 
              `${piece.x + (Math.random() * 20 - 10)}%`,
              `${piece.x + (Math.random() * 20 - 10)}%`, 
              `${piece.x + (Math.random() * 20 - 10)}%`
            ],
            rotate: [piece.rotation, piece.rotation + Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 2 + 2,
            ease: "linear",
            times: [0, 0.7, 1]
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;