'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, MapPin } from 'lucide-react';
import { useWaitlist } from '@/context/WaitlistContext';

export default function Leaderboard() {
  const { leaderboard, fetchLeaderboard } = useWaitlist();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
             <Award className="text-amber-500" size={32} />
             Top Explorers
          </h2>
          <p className="text-gray-500 font-medium">Leading the charge into new landscapes.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-600 text-xs font-bold uppercase tracking-widest">
          <TrendingUp size={16} /> Live Updates
        </div>
      </div>

      <div className="space-y-4">
        {leaderboard.map((explorer, index) => (
          <motion.div
            key={explorer._id || index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01, backgroundColor: '#F8FAF9' }}
            className={`flex items-center gap-4 p-5 rounded-3xl border transition-all duration-300 ${
              index === 0 ? 'bg-amber-50/50 border-amber-100 shadow-lg shadow-amber-500/5' : 'bg-transparent border-slate-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
              index === 0 ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' :
              index === 1 ? 'bg-slate-300 text-white' :
              index === 2 ? 'bg-amber-700/50 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {index + 1}
            </div>

            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{explorer.name}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-400 font-medium tracking-tight">
                <MapPin size={12} /> {explorer.city || 'Explorer'}
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-gray-900">{explorer.referralCount}</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Referrals</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
        <p className="text-sm font-medium text-gray-500">
          The <span className="text-green-600 font-bold">top 2 explorers</span> will win a sponsored Himalayan Trek in May!
        </p>
      </div>
    </div>
  );
}
