import { useState, useEffect } from 'react';

const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];
    const fullText = currentWord + '....';

    let timeoutId;

    if (isPaused) {
      timeoutId = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
    } else if (!isDeleting) {
      // Typing forward
      if (currentText.length < fullText.length) {
        timeoutId = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
      }
    } else {
      // Deleting backward
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseTime]);

  return currentText;
};

export default useTypewriter;
