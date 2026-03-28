'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shield, Leaf, Globe, Mountain, Compass } from 'lucide-react';
import HeroGlobe from './HeroGlobe';

const FloatingIcon = ({ Icon, top, left, right, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2],
      y: [0, -20, 0],
      rotate: [0, 10, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    style={{ top, left, right }}
    className="absolute pointer-events-none text-green-600/20"
  >
    <Icon size={120} strokeWidth={0.5} />
  </motion.div>
);

const CommunityAvatars = ({ explorerCount }: { explorerCount: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="flex items-center gap-4 mt-12 mb-8 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white inline-flex shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex -space-x-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">
          U{i}
        </div>
      ))}
      <div className="w-10 h-10 rounded-full border-2 border-white bg-green-500 flex items-center justify-center text-[10px] font-bold text-white">
        +{explorerCount}
      </div>
    </div>
    <div className="text-left">
      <div className="flex items-center gap-1 text-amber-500">
        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
        <span className="text-gray-900 font-bold ml-1 text-xs">4.9/5</span>
      </div>
      <p className="text-gray-500 font-medium tracking-tight text-xs">join {explorerCount}+ active explorers</p>
    </div>
  </motion.div>
);

import { useWaitlist } from '@/context/WaitlistContext';

export default function Hero() {
  const { explorerCount } = useWaitlist();
  const [showToast, setShowToast] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreTrips = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#F8FAF9]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="blob w-[600px] h-[600px] bg-green-100/40 top-[-10%] left-[-10%]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="blob w-[500px] h-[500px] bg-mint-100/30 bottom-[10%] right-[-5%]" 
        />
        <HeroGlobe />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-bold mb-8 border border-green-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Launching Summer 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8"
          >
            Find Your <span className="text-gradient">Tribe.</span><br />
            Travel Together.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium"
          >
            Build connections, discover hidden gems, and protect the world you explore. 
            The premium community for the modern eco-conscious traveler.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToWaitlist}
              className="w-full sm:w-auto px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-green-200 transition-all"
            >
              Join the Early Explorer Waitlist
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreTrips}
              className="w-full sm:w-auto px-10 py-5 bg-white text-gray-800 border-2 border-gray-100 hover:border-green-600 rounded-2xl font-bold text-lg transition-all"
            >
              Explore Trips
            </motion.button>
          </div>

          <CommunityAvatars explorerCount={explorerCount} />

          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
            <div className="flex items-center gap-2 font-black text-2xl text-gray-400">
              <Shield className="text-green-600" /> VERIFIED
            </div>
            <div className="flex items-center gap-2 font-black text-2xl text-gray-400">
              <Star className="text-amber-500" /> TOP RATED
            </div>
            <div className="flex items-center gap-2 font-black text-2xl text-gray-400 uppercase tracking-widest">
              Community Powered
            </div>
          </div>
        </div>
      </div>

      {/* Toast overlay */}
      <AnimatePresence>
        {showToast && (
          <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 glass px-6 py-4 rounded-2xl shadow-2xl border-white/60 flex items-center gap-4 max-w-md w-max"
          >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Compass size={20} />
              </div>
              <div>
                  <h4 className="font-bold text-gray-900 text-sm text-left">Coming Soon!</h4>
                  <p className="text-xs text-gray-600 font-medium text-left leading-relaxed">
                    Currently we do not have any trips available.<br/> 
                    Exploring trips will be available from day 1 of launch!
                  </p>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative icons floating with parallax effect */}
      <div className="hidden lg:block">
        <FloatingIcon Icon={Leaf} top="20%" left="10%" delay={0} />
        <FloatingIcon Icon={Globe} top="60%" left="15%" delay={1} />
        <FloatingIcon Icon={Mountain} top="15%" right="12%" delay={0.5} />
        <FloatingIcon Icon={Compass} top="55%" right="8%" delay={1.5} />
      </div>
    </section>
  );
}
