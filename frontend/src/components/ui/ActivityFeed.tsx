'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWaitlist } from '@/context/WaitlistContext';
import { UserPlus, Sparkles, UserCheck } from 'lucide-react';

export default function ActivityFeed() {
  const { activity } = useWaitlist();

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto md:bottom-24 md:left-6 flex flex-col gap-3 z-[100] md:max-w-sm pointer-events-none">
      <AnimatePresence mode="popLayout">
        {activity.map((item) => (
          <motion.div
            key={item.id || item._id}
            layout
            initial={{ opacity: 0, x: -60, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              x: -30,
              scale: 0.9,
              transition: { duration: 0.5, ease: 'easeInOut' }
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="glass-dark border-white/20 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-4 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 transition-transform group-hover:rotate-12 ${
              item.type === 'joined'  ? 'bg-green-500 text-white' :
              item.type === 'reward' ? 'bg-amber-500 text-white' : 'bg-purple-500 text-white'
            }`}>
              {item.type === 'joined'  ? <UserPlus  size={18} /> :
               item.type === 'reward' ? <Sparkles  size={18} /> : <UserCheck size={18} />}
            </div>

            <p className="text-sm font-bold text-gray-900 leading-tight">
              {item.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
