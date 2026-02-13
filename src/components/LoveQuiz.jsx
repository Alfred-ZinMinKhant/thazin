import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  { q: "What's my favorite thing about you?", a: ["Your smile", "Your personality", "Everything!", "The way you talk"], correct: 2 },
  { q: "When did we start talking?", a: ["May 18 2025", "Jun 18 2025", "Jul 18 2025", "Aug 18 2025"], correct: 1 },
  { q: "Who's the most prettiest girl in the world?", a: ["Miss Universe", "Thazin", "Rose", "Jennie"], correct: 1 }
];

const LoveQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAnswer = (idx) => {
    const isCorrect = idx === questions[current].correct;
    
    // Lockdown logic for all questions: must be correct to progress
    if (!isCorrect) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return; // don't progress
    }

    setScore(score + 1);
    
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setShowError(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xl text-white/90 font-medium">{questions[current].q}</p>
              {showError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium italic"
                >
                  ❌ Wrong answer! Try again... I know you know this one. 😉
                </motion.p>
              )}
            </div>
            
            <div className="flex flex-col gap-3">
              {questions[current].a.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl text-left border border-white/10 transition-colors relative overflow-hidden group"
                >
                  <span className="relative z-10">{opt}</span>
                  <div className="absolute inset-0 bg-primary/20 translate-y-full group-active:translate-y-0 transition-transform duration-200" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <h3 className="text-2xl font-serif text-white">Quiz Finished!</h3>
            <p className="text-[#ffccd5] text-lg">
              You're amazing! {score}/{questions.length} correct! 💘
            </p>
            <p className="italic text-white/60">Basically, we're a perfect match. 😉</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoveQuiz;
