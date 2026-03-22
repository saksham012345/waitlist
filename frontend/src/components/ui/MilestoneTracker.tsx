'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ChevronRight, Lock } from 'lucide-react';

interface MilestoneTrackerProps {
  referralCount: number;
}

const milestones = [
  { count: 3, label: 'Scratch Card', reward: 'Mystery Prize' },
  { count: 10, label: '₹200 Discount', reward: 'Voucher' },
  { count: 25, label: '₹300 Discount', reward: 'Voucher' },
  { count: 50, label: '₹500 Discount', reward: 'Voucher' },
  { count: 70, label: '₹1000 Discount', reward: 'Voucher' },
  { count: 99, label: 'Sponsored Trek', reward: 'Full Trip' },
];

export default function MilestoneTracker({ referralCount }: MilestoneTrackerProps) {
  const nextMilestone = milestones.find(m => m.count > referralCount) || milestones[milestones.length - 1];
  const prevCount = [...milestones].reverse().find(m => m.count <= referralCount)?.count || 0;
  
  const progressPercent = Math.min(
    100, 
    ((referralCount - prevCount) / (nextMilestone.count - prevCount)) * 100
  );

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 mb-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Your Referrals</p>
          <h3 className="text-5xl font-black text-gray-900">{referralCount}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-1">Next Milestone</p>
          <div className="flex items-center gap-2 justify-end">
             <span className="text-2xl font-black text-gray-900">{nextMilestone.count}</span>
             <ChevronRight className="text-gray-300" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
           <span>{prevCount}</span>
           <span>Next Reward: {nextMilestone.label}</span>
           <span>{nextMilestone.count}</span>
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-3">
        {milestones.map((m, i) => {
          const isUnlocked = referralCount >= m.count;
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isUnlocked ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-slate-50 text-gray-300'
              }`}>
                {isUnlocked ? <Gift size={20} /> : <Lock size={18} />}
              </div>
              <span className={`text-[9px] font-black uppercase text-center ${
                isUnlocked ? 'text-green-600' : 'text-gray-400'
              }`}>{m.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
