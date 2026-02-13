import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const emojis = ['❤️', '🌹', '🍫', '🎁', '✨', '💍'];
const allCards = [...emojis, ...emojis];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCards(allCards.sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = (index) => {
    if (disabled || flipped.includes(index) || matched.includes(index)) return;

    if (flipped.length === 0) {
      setFlipped([index]);
    } else if (flipped.length === 1) {
      setFlipped([flipped[0], index]);
      setDisabled(true);

      if (cards[flipped[0]] === cards[index]) {
        setMatched([...matched, flipped[0], index]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-3 w-full">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);

          return (
            <motion.div
              key={index}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(index)}
              className={`h-16 aspect-square rounded-xl cursor-pointer flex items-center justify-center text-2xl transition-all duration-500 transform-gpu
                ${isFlipped ? 'bg-white rotate-y-180 shadow-md' : 'bg-[#ff4d6d] shadow-lg'}
                ${isMatched ? 'bg-green-100 border-2 border-green-300' : ''}
              `}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={isFlipped ? '' : 'hidden'}>{card}</div>
              {!isFlipped && <Heart size={20} className="text-white/50" />}
            </motion.div>
          );
        })}
      </div>
      {matched.length === cards.length && matched.length > 0 && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-green-300 font-bold"
        >
          You matched them all! ❤️
        </motion.p>
      )}
    </div>
  );
};

const Heart = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default MemoryGame;
