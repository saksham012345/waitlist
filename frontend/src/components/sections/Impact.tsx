'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WorldMap from '../ui/WorldMap';
import { Globe, Heart, Zap } from 'lucide-react';
import { useWaitlist } from '@/context/WaitlistContext';

const ImpactStat = ({ icon: Icon, value, label, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-4">
      <Icon size={24} />
    </div>
    <h4 className="text-3xl font-black text-gray-900 mb-1">{value}</h4>
    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{label}</p>
  </motion.div>
);

export default function Impact() {
  const { stats } = useWaitlist();
  const [baseCount, setBaseCount] = useState(128);

  useEffect(() => {
    // Start from a baseline of 128 and add real stats
    setBaseCount(128 + (stats.total || 0));
  }, [stats.total]);

  return (
    <section id="rewards" className="py-24 bg-[#F8FAF9] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
          >
            A Global <span className="text-gradient">Community</span> for Good
          </motion.h2>
          <p className="text-lg text-gray-600">
            TrekTribe isn't just about travel. It's about connecting people and protecting 
            the places we love. Join a movement that leaves a positive trace.
          </p>
        </div>

        <div className="relative mb-20">
          <WorldMap />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
              <ImpactStat icon={Globe} value="1" label="Country" delay={0.1} />
              <ImpactStat icon={Heart} value={`${baseCount}+`} label="Community" delay={0.2} />
              <ImpactStat icon={Zap} value="100%" label="Sustainable" delay={0.3} />
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-mint-50/50 to-transparent pointer-events-none" />
    </section>
  );
}
