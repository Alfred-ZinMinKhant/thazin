import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlowerBouquet3D = () => {
  const [isBloomed, setIsBloomed] = useState(false);

  const flowers = [
    { id: 1, rotate: 0, delay: 0.1, color: 'text-red-600', x: 0, y: -50, size: 'text-5xl' },
    { id: 2, rotate: 35, delay: 0.2, color: 'text-pink-500', x: 40, y: -30, size: 'text-4xl' },
    { id: 3, rotate: -35, delay: 0.3, color: 'text-rose-500', x: -40, y: -30, size: 'text-4xl' },
    { id: 4, rotate: 70, delay: 0.4, color: 'text-red-500', x: 60, y: 10, size: 'text-3xl' },
    { id: 5, rotate: -70, delay: 0.5, color: 'text-pink-500', x: -60, y: 10, size: 'text-3xl' },
    { id: 6, rotate: 20, delay: 0.6, color: 'text-rose-400', x: 20, y: -10, size: 'text-4xl' },
    { id: 7, rotate: -20, delay: 0.7, color: 'text-red-400', x: -20, y: -10, size: 'text-4xl' },
    { id: 8, rotate: 10, delay: 0.8, color: 'text-red-500', x: 5, y: -20, size: 'text-2xl' },
    { id: 9, rotate: 45, delay: 0.9, color: 'text-pink-600', x: 50, y: -10, size: 'text-3xl' },
    { id: 10, rotate: -45, delay: 1.0, color: 'text-rose-600', x: -50, y: -10, size: 'text-3xl' },
    { id: 11, rotate: 15, delay: 1.1, color: 'text-red-500', x: 10, y: -40, size: 'text-4xl' },
    { id: 12, rotate: -15, delay: 1.2, color: 'text-pink-400', x: -10, y: -40, size: 'text-4xl' },
  ];

  return (
    <div className="flex flex-col items-center py-20">
      <div 
        className="relative w-64 h-80 flex flex-col items-center justify-center cursor-pointer group"
        onClick={() => setIsBloomed(!isBloomed)}
      >
        {/* Bouquet Wrapping - Realistic Paper Layering */}
        <motion.div 
          animate={{ scale: isBloomed ? 1.05 : 1, rotate: isBloomed ? 0 : -3 }}
          className="absolute bottom-4 w-44 h-64 origin-bottom z-10"
        >
          {/* Outer Rustic Paper */}
          <div className="absolute inset-x-0 bottom-0 h-full bg-[#f3e5ab] rounded-b-3xl border-2 border-[#e6d58e] shadow-2xl skew-x-[-8deg] translate-x-2 origin-bottom overflow-hidden">
             <div className="absolute top-0 w-full h-8 bg-black/5"></div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-full bg-[#faedd0] rounded-b-3xl border-2 border-[#e6d58e] shadow-xl skew-x-[8deg] translate-x-[-2deg] origin-bottom"></div>
          
          {/* Inner Tissue Paper Look */}
          <motion.div 
            animate={{ scaleY: isBloomed ? 1.2 : 1 }}
            className="absolute top-0 left-4 right-4 h-1/2 bg-white/40 backdrop-blur-sm -translate-y-4 skew-y-6 rounded-t-full border-t border-white/30"
          ></motion.div>

          {/* Luxury Ribbon & Message */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-52 h-10 bg-primary shadow-lg z-30 flex items-center justify-center rounded-full border border-white/30 group-hover:scale-105 transition-transform">
             <div className="text-white text-[10px] font-black tracking-[0.3em] uppercase">Beautiful</div>
             <div className="absolute -bottom-1 w-4 h-4 bg-primary rotate-45 border-r border-b border-white/20"></div>
          </div>
        </motion.div>

        {/* Flowers Internal Container */}
        <div className="relative z-20 mb-32 h-0 w-0">
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              initial={{ scale: 0, y: 0, rotate: 0 }}
              animate={{ 
                scale: isBloomed ? 2 : 1.2, 
                x: isBloomed ? flower.x : 0,
                y: isBloomed ? flower.y : 30,
                rotate: isBloomed ? flower.rotate : 0,
              }}
              transition={{ delay: flower.delay, type: 'spring', damping: 12, stiffness: 90 }}
              className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 ${flower.size} ${flower.color} drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] filter contrast-125 saturate-150 hover:brightness-125 transition-all active:scale-110`}
            >
               🌹
            </motion.div>
          ))}
          
          {/* Sparkles / Petals Blowing */}
          <AnimatePresence>
            {isBloomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-40 -left-40 w-80 h-80 pointer-events-none"
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -60, -20], 
                      x: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 50],
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                    className="absolute text-primary/40 text-xl"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  >
                    {i % 2 === 0 ? '✨' : '💖'}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex flex-col items-center mt-8 space-y-2">
          <p className="text-white font-serif text-2xl tracking-wider leading-none">Your Bouquet</p>
          <p className="text-soft/60 italic text-sm">
            {isBloomed ? "Bloomed with infinite love ✨" : "Tap the flowers below to bloom 💐"}
          </p>
      </div>
    </div>
  );
};

export default FlowerBouquet3D;
