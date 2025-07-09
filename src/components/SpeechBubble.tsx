import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import useSpeech from '../hooks/useSpeech';

interface SpeechBubbleProps {
  text: string;
  autoSpeak?: boolean;
  className?: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ 
  text, 
  autoSpeak = true,
  className = '' 
}) => {
  const { speak, stop, isSpeaking } = useSpeech(text, { autoPlay: autoSpeak });

  return (
    <motion.div 
      className={`relative bg-white rounded-3xl p-5 shadow-lg ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        <p className="text-xl font-medium text-gray-800 flex-grow">{text}</p>
        <button
          onClick={isSpeaking ? stop : speak}
          className="ml-3 p-2 rounded-full bg-primary-100 hover:bg-primary-200 text-primary-600 transition-colors"
          aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
        >
          {isSpeaking ? (
            <VolumeX size={20} />
          ) : (
            <Volume2 size={20} />
          )}
        </button>
      </div>
      
      {/* Speech bubble arrow */}
      <div className="absolute w-8 h-8 bg-white transform rotate-45 -bottom-4 left-1/2 -ml-4"></div>
      
      {/* Animated sound waves when speaking */}
      {isSpeaking && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <motion.div 
            className="flex space-x-1"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-6 bg-primary-500 rounded-full"
                animate={{ 
                  height: [6, 24, 6],
                  y: [0, -4, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.8 + (i * 0.2),
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SpeechBubble;