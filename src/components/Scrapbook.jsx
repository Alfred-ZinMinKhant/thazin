import React from 'react';
import { motion } from 'framer-motion';
import favoriteImg from '../assets/Favorite.jpg';
import firstPicImg from '../assets/First_pic.jpeg';
import secondFavoriteImg from '../assets/Second_favorite.jpeg';

const Scrapbook = () => {
  const images = [
    { url: firstPicImg, caption: 'First pic' },
    { url: favoriteImg, caption: 'Favorite' },
    { url: secondFavoriteImg, caption: 'Second favorite' },
  ];

  return (
    <div className="flex flex-col gap-8 overflow-y-auto max-h-[75vh] px-4 pb-12 scrollbar-hide">
      <div className="text-center py-4">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">Our Journey</p>
      </div>

      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -3 : 3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ rotate: 0, scale: 1.05, zIndex: 50 }}
          className="bg-white p-4 pb-12 rounded-sm shadow-2xl relative group cursor-pointer"
        >
          <div className="overflow-hidden bg-gray-100 aspect-[4/5] relative">
            <img 
              src={img.url} 
              alt={img.caption} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>
          
          <div className="absolute bottom-3 left-0 w-full px-4 flex justify-between items-center">
            <p className="font-serif text-gray-700 text-base italic tracking-tight">
              {img.caption.replace(/_/g, ' ')}
            </p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-[10px]">❤️</span>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 py-8"
      >
        <div className="h-px w-12 bg-white/20 mx-auto" />
        <p className="text-white/80 font-serif italic text-xl leading-relaxed px-4">
          "I want to make more memories with you every single day. I can't wait for us to take pictures together... ❤️"
        </p>
        <p className="text-[#ffccd5] text-xs uppercase tracking-[0.3em] font-black pt-4">
          Forever & Always
        </p>
      </motion.div>
    </div>
  );
};

export default Scrapbook;
