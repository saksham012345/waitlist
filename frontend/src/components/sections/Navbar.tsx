'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg shadow-green-900/5 border border-white/40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-primary-eco rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
              T
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">Trek<span className="text-primary-eco leading-none">Tribe</span></span>
          </motion.div>

          <div className="hidden md:flex gap-8 items-center">
            {['Features', 'Dashboard', 'Giveaway', 'Rewards'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-secondary-text hover:text-primary-eco transition-colors text-sm font-semibold relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-eco transition-all group-hover:w-full" />
              </motion.a>
            ))}
            
            <motion.a
              href="#waitlist"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-eco text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-500/30 hover:bg-accent-green transition-all"
            >
              Join Waitlist
            </motion.a>
          </div>

          {/* Mobile Menu Icon (Placeholder) */}
          <div className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5 cursor-pointer">
            <div className="w-6 h-0.5 bg-slate-900 rounded-full" />
            <div className="w-4 h-0.5 bg-slate-900 rounded-full" />
            <div className="w-6 h-0.5 bg-slate-900 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
