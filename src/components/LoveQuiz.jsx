import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  { q: "What's my favorite thing about you?", a: ["Your smile", "Your personality", "Everything!", "The way you talk"], correct: 2 },
  { q: "Our perfect date would be...", a: ["Fancy Dinner", "Stargazing", "Movie Marathon", "A Road Trip"], correct: 1 },
  { q: "How much space do you take in my heart?", a: ["A tiny bit", "The whole thing", "Infinity!", "50/50"], correct: 2 }
];

const LoveQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (idx) => {
    if (idx === questions[current].correct) setScore(score + 1);
    
    if (current < questions.length - 1) {
      setCurrent(current + 1);
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
            <p className="text-xl text-white/90 font-medium">{questions[current].q}</p>
            <div className="flex flex-col gap-3">
              {questions[current].a.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl text-left border border-white/10 transition-colors"
                >
                  {opt}
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
              You got {score}/{questions.length} correct! 💘
            </p>
            <p className="italic text-white/60">Basically, we're a perfect match. 😉</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoveQuiz;
