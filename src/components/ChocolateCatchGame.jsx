import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const ChocolateCatchGame = ({ onWin }) => {
  const [basketPos, setBasketPos] = useState(50);
  const basketXRef = useRef(50);
  const [chocolates, setChocolates] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const gameContainerRef = useRef(null);
  const requestRef = useRef();
  const chocolatesRef = useRef([]); // Critical for stable collision detection
  const scoreRef = useRef(0);

  const WIN_SCORE = 10;

  // Handle move basket
  const handleMove = (e) => {
    if (gameOver) return;
    const container = gameContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let x;
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
    } else {
      x = e.clientX - rect.left;
    }
    
    const pos = (x / rect.width) * 100;
    const clampedPos = Math.min(Math.max(pos, 5), 95);
    setBasketPos(clampedPos);
    basketXRef.current = clampedPos;
  };

  // Stability: One effect to start the loop
  useEffect(() => {
    let lastTime = performance.now();
    let spawnTimer = 0;

    const gameLoop = (time) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      // Spawning logic
      spawnTimer += deltaTime;
      if (spawnTimer > 1000 && !gameOver) {
        const newChoc = {
          id: Math.random(),
          x: Math.random() * 90 + 5,
          y: -10,
          rotation: Math.random() * 360,
          caught: false, // Flag to prevent double counting
        };
        chocolatesRef.current.push(newChoc);
        spawnTimer = 0;
      }

      // Update positions and check collisions
      chocolatesRef.current = chocolatesRef.current.filter(choc => {
        if (!choc.caught) {
          choc.y += 0.1 * deltaTime; // Move based on time, not frames

          // Collision Check
          if (choc.y > 85 && choc.y < 95 && Math.abs(choc.x - basketXRef.current) < 12) {
            choc.caught = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
            
            if (scoreRef.current >= WIN_SCORE) {
              setGameOver(true);
            }
            return false; // Remove caught chocolate
          }
        }
        return choc.y < 110; // Keep if not fallen off
      });

      // Sync state for rendering
      setChocolates([...chocolatesRef.current]);

      if (!gameOver) {
        requestRef.current = requestAnimationFrame(gameLoop);
      }
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        onWin();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameOver, onWin]);

  return (
    <div 
      ref={gameContainerRef}
      className="relative w-full h-[400px] bg-black/20 rounded-3xl border border-white/10 overflow-hidden cursor-none touch-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <div className="absolute top-4 left-4 z-20 text-white font-bold bg-black/30 px-4 py-1 rounded-full backdrop-blur-md">
        Caught: {score} / {WIN_SCORE}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {chocolates.map(choc => (
          <div
            key={choc.id}
            className="absolute w-10 h-10 transition-transform duration-75"
            style={{ 
              left: `${choc.x}%`, 
              top: `${choc.y}%`, 
              transform: `translate(-50%, -50%) rotate(${choc.rotation}deg)` 
            }}
          >
             <div 
                className="w-10 h-10 bg-gradient-to-tr from-amber-700 via-amber-400 to-amber-200 rounded-lg shadow-xl overflow-hidden border border-white/10"
                style={{ borderRadius: '35% 65% 65% 35% / 45% 45% 55% 55%' }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)]"></div>
                <div className="absolute inset-[6px] bg-[#2a130c] rounded-full shadow-inner opacity-90"></div>
              </div>
          </div>
        ))}
      </div>

      {/* Basket */}
      <motion.div 
        className="absolute bottom-4 z-20"
        animate={{ left: `${basketPos}%` }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{ transform: 'translateX(-50%)' }}
      >
        <div className="relative">
          <Heart size={60} fill="#ff4d6d" className="text-primary drop-shadow-[0_0_15px_rgba(255,77,109,0.6)]" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="w-10 h-6 border-2 border-white/30 rounded-full bg-white/10 backdrop-blur-sm -translate-y-1"></div>
          </div>
        </div>
      </motion.div>

      {gameOver && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="text-center p-8">
            <h2 className="text-4xl font-serif text-white mb-2">Wonderful! ❤️</h2>
            <p className="text-soft font-light italic">You've recovered the chocolates!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChocolateCatchGame;
