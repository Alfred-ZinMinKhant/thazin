import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Heart, Gift, Camera, BookOpen, ChevronLeft, Sparkles } from 'lucide-react'

// Components
import ChocolateBox3D from './components/ChocolateBox3D'
import ChocolateCatchGame from './components/ChocolateCatchGame'
import GlassBoxFlower from './components/GlassBoxFlower'
import MemoryGame from './components/MemoryGame'
import LoveQuiz from './components/LoveQuiz'
import Scrapbook from './components/Scrapbook'

// Reusable Page Layout (Premium Glassmorphism)
const PageLayout = ({ children, title, showBack = true }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="p-4 max-w-lg mx-auto h-[100dvh] flex flex-col items-center relative z-10 overflow-hidden"
    >
      <div className="w-full flex items-center justify-between mb-2 px-2 h-14 shrink-0">
        {showBack ? (
          <button 
            onClick={() => navigate('/menu')} 
            className="p-3 bg-white/10 rounded-full text-white backdrop-blur-xl border border-white/20 z-50 transition-all hover:bg-white/20 active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>
        ) : <div className="w-10" />}
        
        {title && (
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-2xl font-serif text-white tracking-tight leading-tight text-center">{title}</h1>
            <div className="h-0.5 w-8 bg-primary rounded-full mt-1"></div>
          </div>
        )}
        <div className="w-10" />
      </div>
      
      <div className="glass-card w-full flex-1 relative overflow-hidden flex flex-col">
        {/* Background Decor - Inner Heart */}
        <div className="absolute -top-16 -right-16 text-primary rotate-12 opacity-10 pointer-events-none">
            <Heart size={200} fill="currentColor" />
        </div>
        
        <div className="relative z-10 p-2 flex-1 flex flex-col overflow-hidden">
          <div className="w-full flex-1 overflow-y-auto overflow-x-hidden pt-2">
              {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Landing / Proposal Page
const Landing = () => {
  const navigate = useNavigate();
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const moveNo = () => {
    // Generate a position that is guaranteed to be within the safe area of the screen
    // and far enough from the current position to look like a "jump"
    const padding = 100;
    const newX = Math.random() * (window.innerWidth - padding * 2) + padding;
    const newY = Math.random() * (window.innerHeight - padding * 2) + padding;
    
    setNoPos({ x: newX - window.innerWidth / 2, y: newY - window.innerHeight / 2 });
    setIsHovered(true);
  }

  return (
    <PageLayout showBack={false}>
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="text-primary mb-8 flex justify-center"
      >
        <Heart size={80} fill="currentColor" className="drop-shadow-[0_0_20px_rgba(255,77,109,0.5)]" />
      </motion.div>
      <h1 className="text-5xl font-serif mb-6 text-white text-center italic">Hello Thazin! ❤️</h1>
      <p className="text-soft/90 text-center mb-12 text-lg font-light leading-relaxed">
        I've been thinking about something... <br/>
        Thazin ka Valentine's Day atwat gift ma yu poo so loh <br/>
        And I made this just for you.
      </p>
      
      <div className="space-y-8">
        <h2 className="text-2xl italic text-white text-center font-serif">Will you be my Valentine?</h2>
        <div className="flex justify-center gap-6 relative min-h-[140px] items-center">
          <motion.button 
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0px 0px 0px rgba(255,77,109,0)", "0px 0px 20px rgba(255,77,109,0.5)", "0px 0px 0px rgba(255,77,109,0)"] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/menu')}
            className="bg-primary hover:bg-[#ff1b4d] text-white px-12 py-4 rounded-full font-bold shadow-2xl z-20 transition-all active:scale-95"
          >
            Yes! ❤️
          </motion.button>
          
          <motion.button 
            animate={{ 
              x: noPos.x, 
              y: noPos.y,
              scale: isHovered ? 0.8 : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onHoverStart={moveNo}
            onTapStart={moveNo} // For mobile
            className="border-2 border-white/40 text-white/70 px-12 py-4 rounded-full font-bold z-10 hover:border-white/60"
          >
            No 😢
          </motion.button>
        </div>
      </div>
      
      {isHovered && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-soft/40 text-xs mt-8 italic"
        >
          Hehe, you can't click it! 😉
        </motion.p>
      )}
    </PageLayout>
  )
}

// Gift Menu Page
const Menu = () => {
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Chocolate Box', icon: <Gift />, path: '/chocolate', color: 'from-amber-500/30 to-amber-700/10' },
    { name: 'Eternal Flower', icon: <Sparkles />, path: '/flowers', color: 'from-green-500/30 to-green-700/10' },
    { name: 'Memory Game', icon: <Heart />, path: '/memory', color: 'from-red-500/30 to-red-700/10' },
    { name: 'Love Quiz', icon: <BookOpen />, path: '/quiz', color: 'from-blue-500/30 to-blue-700/10' },
    { name: 'Our Moments', icon: <Camera />, path: '/scrapbook', color: 'from-pink-500/30 to-pink-700/10' },
  ];

  return (
    <PageLayout title="Choose a Gift" showBack={false}>
      <div className="grid grid-cols-2 gap-5 py-4">
        {menuItems.map((item) => (
          <motion.button 
            key={item.path}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(item.path)}
            className={`bg-gradient-to-br ${item.color} p-8 rounded-[2.5rem] flex flex-col items-center gap-4 border border-white/10 backdrop-blur-md shadow-xl`}
          >
            <div className="text-primary bg-white/10 p-4 rounded-2xl shadow-inner">
                {React.cloneElement(item.icon, { size: 32 })}
            </div>
            <p className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/80">{item.name}</p>
          </motion.button>
        ))}
      </div>
      <p className="text-center text-soft/40 text-[10px] mt-8 tracking-widest uppercase">Select with love</p>
    </PageLayout>
  )
}

// Interactive Pages
const ChocolatePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);

  return (
    <PageLayout title="Chocolate For Thazin">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="box-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <ChocolateBox3D 
              isEmpty={true} 
              onChocolateClick={() => {}} 
              onOpen={() => setIsOpen(true)}
            />
            
            <div className="mt-8 text-center space-y-6 min-h-[140px]">
              {!isOpen ? (
                <p className="text-white/40 text-sm font-serif italic animate-pulse">
                  Tap the box to open... 💝
                </p>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                    <p className="text-soft font-serif italic text-2xl mb-2">Oh no! 😱</p>
                    <p className="text-white/70 text-sm">The chocolates are missing! Someone must have taken them...</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="px-10 py-4 bg-primary text-white rounded-full font-bold shadow-xl flex items-center gap-2 mx-auto"
                  >
                    <Sparkles size={20} />
                    Recover Them!
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : !isWon ? (
          <motion.div
            key="game-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div className="mb-6 text-center">
              <h2 className="text-xl font-serif text-white italic">Catch the falling sweets!</h2>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Move your heart to catch them</p>
            </div>
            <ChocolateCatchGame onWin={() => setIsWon(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="win-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10"
          >
             <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-primary mb-6 flex justify-center"
            >
              <Heart size={80} fill="currentColor" />
            </motion.div>
            <h2 className="text-4xl font-serif text-white mb-4 italic">Success! ❤️</h2>
            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl space-y-4">
              <p className="text-soft font-serif italic text-2xl leading-relaxed">
                "Yayyyy, You caught them all. Chocolate tway treat chin pay mae lay. Here's some virtual chocolate for Thazin"
              </p>
              <div className="h-px w-20 bg-primary/30 mx-auto"></div>
              <p className="text-white/60 text-sm italic">You're my favorite! 🥰</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}

// Main App component
function App() {
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5
  }));

  return (
    <Router>
      <div className="relative min-h-screen">
          {/* Animated Background Objects */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
              {hearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ y: '110vh', opacity: 0 }}
                  animate={{ y: '-10vh', opacity: [0, 1, 0], x: ['0px', `${(Math.random() - 0.5) * 50}px`, '0px'] }}
                  transition={{ repeat: Infinity, duration: h.duration, delay: h.delay, ease: 'linear' }}
                  style={{ position: 'absolute', left: h.left }}
                  className="text-white"
                >
                  <Heart size={h.size} fill="currentColor" />
                </motion.div>
              ))}
          </div>
          
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/chocolate" element={<ChocolatePage />} />
              <Route path="/flowers" element={<PageLayout title="Eternal Flower"><GlassBoxFlower /></PageLayout>} />
              <Route path="/memory" element={<PageLayout title="Memory Match"><MemoryGame /></PageLayout>} />
              <Route path="/quiz" element={<PageLayout title="Love Quiz"><LoveQuiz /></PageLayout>} />
              <Route path="/scrapbook" element={<PageLayout title="Our Moments"><Scrapbook /></PageLayout>} />
            </Routes>
          </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
