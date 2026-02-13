import React from 'react';
import { motion } from 'framer-motion';

const Scrapbook = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400', caption: 'The start of us... ❤️' },
    { url: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=400', caption: 'Every moment is precious ✨' },
    { url: 'https://images.unsplash.com/photo-1516589174184-c68526614488?q=80&w=400', caption: 'I love our adventures 🏔️' },
    { url: 'https://images.unsplash.com/photo-1511270339343-9dd7adfcc287?q=80&w=400', caption: 'Together forever 👩‍❤️‍👨' },
  ];

  return (
    <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh] px-2 pb-8 scrollbar-hide">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="bg-white p-3 rounded-sm shadow-2xl relative"
        >
          <div className="overflow-hidden mb-3">
            <img 
              src={img.url} 
              alt="Memory" 
              className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <p className="font-serif text-gray-800 text-sm italic">{img.caption}</p>
          <div className="absolute top-2 right-2 text-white/30 text-[8px]">02/14/2026</div>
        </motion.div>
      ))}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-white/60 italic text-sm py-4"
      >
        To many more memories... 🥂
      </motion.p>
    </div>
  );
};

export default Scrapbook;
