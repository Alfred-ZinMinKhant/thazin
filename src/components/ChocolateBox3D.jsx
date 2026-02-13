import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChocolateBox3D = ({ onChocolateClick, onOpen, isEmpty = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Precise positions for 9 chocolates to fit inside a 256x256 heart
  // Relative to a 256x256 tray
  const chocolatePositions = [
    { x: 128, y: 110 }, // Center
    { x: 90, y: 75 },   // Top Left Lobe
    { x: 166, y: 75 },  // Top Right Lobe
    { x: 65, y: 120 },  // Far Left
    { x: 191, y: 120 }, // Far Right
    { x: 128, y: 60 },  // Top Peak
    { x: 95, y: 160 },  // Bottom Left
    { x: 161, y: 160 }, // Bottom Right
    { x: 128, y: 185 }, // Bottom Point
  ];

  const chocolates = chocolatePositions.map((pos, i) => ({
    id: i,
    ...pos,
    delay: i * 0.05,
    rotation: Math.random() * 360,
  }));

  // SVG Heart Path for a 256x256 viewbox
  const heartPath = "M128 216 L116 204 C46 142 0 102 0 66 C0 28 30 0 68 0 C90 0 110 10 128 26 C146 10 166 0 188 0 C226 0 256 28 256 66 C256 102 210 142 140 204 Z";

  const closeBox = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center py-6">
      {/* SVG Definitions for Clipping */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
            <path transform="scale(0.00390625, 0.00390625)" d={heartPath} />
          </clipPath>
        </defs>
      </svg>

      <div 
        className="scene w-72 h-72 cursor-pointer"
        onClick={() => { if (!isOpen) { setIsOpen(true); if (onOpen) onOpen(); } }}
      >
        <div 
          className="box-3d relative w-full h-full transform-gpu transition-all duration-1000"
          style={{ transform: isOpen ? 'rotateX(25deg) translateY(20px)' : 'rotateX(0deg)' }}
        >
          
          {/* Box Bottom / Tray - The Heart Tray */}
          <div className="absolute inset-0 flex items-center justify-center translate-z-[-20px]">
            {/* The clipped tray containing EVERYTHING */}
            <div 
              className="relative w-64 h-64 shadow-2xl overflow-hidden pointer-events-auto"
              style={{ clipPath: 'url(#heartClip)' }}
              onClick={isOpen ? closeBox : undefined}
            >
              {/* Velvet Background */}
              <div className="absolute inset-0 bg-[#3d0b1a]">
                <div className="inner-rim absolute inset-0 border-[10px] border-primary/10 rounded-full blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5"></div>
              </div>

              {/* Individual Chocolates - Placed directly in the clipped tray */}
              {!isEmpty && chocolates.map((choc) => (
                <motion.div
                  key={choc.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: choc.delay + 0.5, type: 'spring', stiffness: 260, damping: 20 }}
                  style={{ 
                    position: 'absolute', 
                    left: `${choc.x}px`, 
                    top: `${choc.y}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 200,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isOpen) onChocolateClick(choc.id);
                  }}
                  className="w-12 h-12 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                >
                  <div 
                    className="w-10 h-10 bg-gradient-to-tr from-amber-700 via-amber-400 to-amber-200 rounded-lg shadow-xl overflow-hidden border border-white/10"
                    style={{ rotate: `${choc.rotation}deg`, borderRadius: '35% 65% 65% 35% / 45% 45% 55% 55%' }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)]"></div>
                    <div className="absolute inset-[6px] bg-[#2a130c] rounded-full shadow-inner opacity-90"></div>
                  </div>
                  <div className="absolute -top-0 -right-0 w-3.5 h-3.5 bg-white text-[5px] rounded-full flex items-center justify-center text-amber-800 font-black shadow-sm pointer-events-none border border-amber-50">F</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Box Lid */}
          <motion.div 
            className="absolute inset-0 z-[300] origin-top"
            animate={{ 
              rotateX: isOpen ? -110 : 0,
              y: isOpen ? -50 : 0,
              z: isOpen ? 70 : 0,
              opacity: isOpen ? 0.9 : 1
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 90 }}
            style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
            onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); if (!isOpen && onOpen) onOpen(); }}
          >
            <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                {/* Main Lid Body */}
                <div className="relative w-64 h-64 bg-primary overflow-hidden"
                     style={{ clipPath: 'url(#heartClip)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/30"></div>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 0.8px, transparent 0.8px)', backgroundSize: '12px 12px' }}></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 -translate-y-4">
                    <p className="font-serif text-3xl italic font-bold tracking-tight drop-shadow-xl">Ferrero</p>
                    <p className="text-[10px] tracking-[0.5em] uppercase opacity-90 mt-1 font-black text-amber-200">Collection</p>
                    <div className="w-12 h-[1px] bg-amber-400 mt-2"></div>
                  </div>
                </div>

                {/* Outer Rim Shadow/Depth */}
                <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700"
                     style={{ clipPath: 'url(#heartClip)', transform: 'scale(1.02)' }}>
                </div>
            </div>
          </motion.div>
          
        </div>
      </div>
      
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-14 text-white/50 text-[10px] font-bold tracking-[0.4em] uppercase"
      >
        {isOpen ? "A surprise in every bite 🍫" : "Tap to open your heart ❤️"}
      </motion.p>
    </div>
  );
};

export default ChocolateBox3D;
