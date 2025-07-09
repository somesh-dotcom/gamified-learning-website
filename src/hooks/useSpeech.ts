import { useCallback, useEffect, useState } from 'react';

interface UseSpeechProps {
  autoPlay?: boolean;
}

const useSpeech = (text: string, { autoPlay = false }: UseSpeechProps = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const newUtterance = new SpeechSynthesisUtterance(text);
    
    // Use a friendly voice for kids
    newUtterance.rate = 0.9; // Slightly slower than default
    newUtterance.pitch = 1.2; // Slightly higher pitch
    
    // Try to find a voice that sounds friendly
    const voices = synth.getVoices();
    const preferredVoices = voices.filter(
      voice => voice.name.includes('Female') || voice.name.includes('Girl')
    );
    
    if (preferredVoices.length > 0) {
      newUtterance.voice = preferredVoices[0];
    }

    newUtterance.onstart = () => setIsSpeaking(true);
    newUtterance.onend = () => setIsSpeaking(false);
    newUtterance.onpause = () => setIsPaused(true);
    newUtterance.onresume = () => setIsPaused(false);

    setUtterance(newUtterance);

    return () => {
      synth.cancel();
    };
  }, [text]);

  useEffect(() => {
    if (autoPlay && utterance) {
      speak();
    }
  }, [utterance, autoPlay]);

  const speak = useCallback(() => {
    if (utterance) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    }
  }, [utterance]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused
  };
};

export default useSpeech;