import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const RoseWithStem = ({ delay = 0, x = 0, y = 0, rotate = 0, scale = 1, isBloomed = false, height = 32 }) => (
  <motion.div 
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: 1, 
      opacity: 1,
      rotate 
    }}
    transition={{ delay, type: 'spring', stiffness: 100, damping: 15 }}
    className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom"
    style={{ x, y: -y }}
  >
    {/* Stem */}
    <motion.div 
      initial={{ height: 0 }}
      animate={{ height: isBloomed ? height : height * 1.2 }}
      transition={{ delay, duration: 1 }}
      className="w-1 bg-gradient-to-b from-green-700 via-green-800 to-green-950 rounded-full relative shadow-sm mx-auto"
    >
      {/* Thorns */}
      <div className="absolute top-1/4 left-[-2px] w-0 h-0 border-t-[3px] border-t-transparent border-r-[5px] border-r-green-900 border-b-[3px] border-b-transparent"></div>
      <div className="absolute top-2/3 right-[-2px] w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-green-950 border-b-[3px] border-b-transparent"></div>
      
      {/* Leaves */}
      <motion.div 
        animate={{ rotate: [-20, -25, -20] }}
        className="absolute top-1/2 -left-4 w-6 h-3 bg-green-800 rounded-br-[15px] rounded-tl-[15px] shadow-xs"
      ></motion.div>
      <motion.div 
        animate={{ rotate: [20, 25, 20] }}
        className="absolute top-1/3 -right-4 w-6 h-3 bg-green-700 rounded-bl-[15px] rounded-tr-[15px] shadow-xs"
      ></motion.div>
    </motion.div>

    {/* Rose Head */}
    <motion.div
      animate={{ 
        scale: isBloomed ? scale * 1.1 : scale,
        filter: isBloomed ? 'drop-shadow(0 0 25px #ff4d6d)' : 'drop-shadow(0 0 10px rgba(255,77,109,0.4))'
      }}
      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-16 h-16"
    >
      <div className="absolute inset-0 bg-red-600 rounded-full blur-[0.5px]"></div>
      <div className="absolute inset-[-4px] bg-red-700/30 rounded-full blur-lg animate-pulse"></div>
      
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="absolute inset-0 border-[1.5px] border-red-800/20 rounded-full"
          style={{ 
            transform: `rotate(${i * 60}deg) scale(${0.7 + i * 0.05}) translate(${i * 1.2}px, ${i * 0.8}px)`,
            backgroundColor: i % 2 === 0 ? '#b91c1c' : '#dc2626',
            borderRadius: '50% 10% 50% 10%'
          }}
        ></div>
      ))}
      <div className="absolute inset-3 bg-gradient-to-br from-red-600 to-red-950 rounded-full shadow-inner border border-red-500/20"></div>
    </motion.div>
  </motion.div>
);

const GlassBoxFlower = () => {
  const [isBloomed, setIsBloomed] = useState(false);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 120 - 60,
      y: Math.random() * 100 - 50,
      rotate: Math.random() * 360,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 5
    }));
    setPetals(items);
  }, []);

  const handleBloom = () => {
    setIsBloomed(!isBloomed);
  };

  const bouquetRoses = [
    { id: 1, x: -45, y: 15, rotate: -25, scale: 0.7, delay: 0.1, height: 28 },
    { id: 2, x: 45, y: 15, rotate: 25, scale: 0.7, delay: 0.3, height: 28 },
    { id: 3, x: -20, y: 35, rotate: -10, scale: 0.85, delay: 0.2, height: 35 },
    { id: 4, x: 20, y: 35, rotate: 10, scale: 0.85, delay: 0.4, height: 35 },
    { id: 5, x: 0, y: 50, rotate: 0, scale: 1, delay: 0.5, height: 45 },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-2 w-full h-full overflow-hidden">
      <div 
        className="relative w-64 h-[380px] flex items-center justify-center cursor-pointer perspective-1000 group shrink-0 scale-90 sm:scale-100"
        onClick={handleBloom}
      >
        {/* Ornate Pedestal Base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-28 z-0">
          <div className="absolute bottom-0 w-full h-10 bg-gradient-to-b from-[#d4af37] via-[#f9e27c] to-[#b8860b] rounded-xl shadow-2xl skew-x-[-2deg]"></div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 h-6 bg-gradient-to-b from-[#f9e27c] to-[#d4af37] rounded-lg"></div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-3 bg-gradient-to-b from-[#d4af37] to-[#b8860b] rounded-t-full"></div>
          
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 h-8 pointer-events-none">
            <div className="absolute left-4 top-2 w-5 h-3 bg-red-600 rounded-br-[15px] rounded-tl-[8px] rotate-45 opacity-80 blur-[0.5px]"></div>
            <div className="absolute right-6 top-1 w-4 h-2 bg-red-700 rounded-br-[12px] rounded-tl-[6px] -rotate-12 opacity-90 blur-[0.5px]"></div>
          </div>
        </div>

        {/* Bell Jar / Glass Dome */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-56 h-[320px] z-20">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] border-[1.5px] border-white/20 rounded-t-[120px] shadow-[inset_0_0_60px_rgba(255,255,255,0.1),_0_0_20px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="absolute top-10 left-6 w-5 h-40 bg-white/10 rounded-full blur-md -rotate-[15deg] opacity-40"></div>
            <div className="absolute top-16 right-8 w-1.5 h-28 bg-white/10 rounded-full blur-sm rotate-[5deg] opacity-30"></div>
          </div>

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-white/30 to-transparent backdrop-blur-md border border-white/20 rounded-full shadow-lg z-30">
            <div className="absolute inset-1.5 bg-[#d4af37] rounded-full shadow-inner opacity-40"></div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
             {[...Array(6)].map((_, i) => (
               <motion.div
                 key={i}
                 animate={{ 
                   opacity: [0, 0.8, 0],
                   scale: [0, 1, 0],
                   y: [Math.random() * 250, Math.random() * 250 - 20],
                   x: [Math.random() * 180, Math.random() * 180]
                 }}
                 transition={{ repeat: Infinity, duration: 4 + Math.random() * 4, delay: i * 0.5 }}
                 className="absolute text-yellow-200/40 text-[8px]"
               >
                 ✨
               </motion.div>
             ))}
          </div>
        </div>

        {/* Enchanted Rose(s) with Distinct Stems */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full h-full z-10 pointer-events-none">
          {/* Main Rose */}
          <RoseWithStem 
            isBloomed={isBloomed} 
            y={15} 
            height={35}
            scale={0.9}
          />

          {/* Bouquet Roses */}
          <AnimatePresence>
            {isBloomed && bouquetRoses.map((r) => (
              <RoseWithStem 
                key={r.id}
                isBloomed={true}
                x={r.x * 0.8}
                y={r.y * 0.8}
                rotate={r.rotate}
                scale={r.scale * 0.9}
                delay={r.delay}
                height={r.height * 0.85}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Petals System */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-52 h-[320px] z-15 pointer-events-none overflow-hidden rounded-t-[120px]">
          {petals.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -50, x: p.x, opacity: 0, rotate: p.rotate }}
              animate={{ 
                y: [Math.random() * 80, 260],
                x: [p.x * 0.8, (p.x + (Math.random() - 0.5) * 50) * 0.8],
                rotate: [p.rotate, p.rotate + 360],
                opacity: [0, 0.9, 0.7, 0]
              }}
              transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                delay: p.delay,
                ease: "linear"
              }}
              className="absolute w-4 h-3 bg-red-600 rounded-br-[12px] rounded-tl-[6px]"
            ></motion.div>
          ))}
        </div>

        {/* Bloom Effect */}
        <AnimatePresence>
          {isBloomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
            >
              <div className="absolute w-64 h-64 bg-primary/10 blur-[80px] rounded-full"></div>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    x: [(Math.random() - 0.5) * 280],
                    y: [(Math.random() - 0.5) * 280],
                    rotate: 720
                  }}
                  transition={{ duration: 2, delay: i * 0.05 }}
                  className="absolute text-yellow-400"
                >
                  <Sparkles size={12 + Math.random() * 12} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Narrative Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-2 text-center max-w-xs space-y-2 shrink-0 px-2"
      >
        <div className="p-4 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/20 rounded-[2rem] shadow-xl relative overflow-hidden group/card">
          <h3 className="text-xl font-serif text-white italic mb-1 tracking-tighter">Enchanted Gift</h3>
          <p className="text-soft font-light leading-snug italic text-sm opacity-90 transition-all duration-700">
            {isBloomed 
              ? "A miracle of love! The rose has bloomed into a radiant bouquet. ❤️" 
              : "A piece of magic, waiting for your touch. Tap the jar..."}
          </p>
          
          <AnimatePresence>
            {isBloomed && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-2 flex justify-center gap-2 items-center"
              >
                <Sparkles className="text-yellow-400" size={14} />
                <span className="text-white text-[9px] uppercase tracking-[0.2em] font-black">Miracle</span>
                <Sparkles className="text-yellow-400" size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-black pb-4">
          {isBloomed ? "Bloomed" : "Tap to bloom"}
        </p>
      </motion.div>
    </div>
  );
};

export default GlassBoxFlower;
