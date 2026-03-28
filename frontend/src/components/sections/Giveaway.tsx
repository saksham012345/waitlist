'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Trophy, Star, Users } from 'lucide-react';
import { useWaitlist } from '@/context/WaitlistContext';

const Giveaway = () => {
  const { leaderboard } = useWaitlist();
  return (
    <section id="giveaway" className="section-padding bg-section-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-mint/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-eco/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-primary-eco font-bold text-sm">
            <Gift size={16} /> Exciting News
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Explorer Launch <span className="text-gradient">Giveaway</span>
          </h2>
          <p className="text-lg text-secondary-text leading-relaxed">
            The top 10 explorers on our leaderboard will win a **free seat** on one of the 
            first three TrekTribe curated expeditions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-8 rounded-[2rem] border-white/60 text-left space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Trophy size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Grand Prize</h3>
            <p className="text-secondary-text font-medium text-sm">A free trip to either Jaipur or Jibhi on one of the trips curated by the organizer for the #1 contributor.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-primary-eco p-10 rounded-[2rem] text-left space-y-6 shadow-2xl shadow-green-500/30 relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Gift size={32} />
            </div>
            <div className="text-white">
              <h3 className="text-3xl font-black">Join Early</h3>
              <p className="mt-2 font-medium opacity-90 text-sm">Start earning rewards by inviting friends when you join the waitlist today.</p>
            </div>
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-4 bg-white text-primary-eco font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Join the Waitlist
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-8 rounded-[2rem] border-white/60 text-left space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Community Tier</h3>
            <p className="text-secondary-text font-medium text-sm">Exclusive TrekTribe swag and early platform access for top 100.</p>
          </motion.div>
        </div>

        {/* Mini Leaderboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 glass max-w-2xl mx-auto rounded-3xl p-8 border-white/40"
        >
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-black text-slate-900">Top Explorers</h4>
            <div 
              onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' }) || window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="text-primary-eco font-bold text-sm cursor-pointer hover:underline"
            >
              View Full Leaderboard
            </div>
          </div>
          <div className="space-y-4">
            {leaderboard.slice(0, 3).map((user, i) => (
              <div key={user._id || i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className={`font-black text-lg ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : 'text-amber-700'}`}>#{i + 1}</span>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 border-2 border-white">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="font-bold text-slate-800">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900">{user.referralCount}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Referrals</span>
                </div>
              </div>
            ))}
            {leaderboard.length === 0 && (
              <div className="text-center py-4 text-gray-500 font-medium">Be the first to join the leaderboard!</div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Giveaway;
