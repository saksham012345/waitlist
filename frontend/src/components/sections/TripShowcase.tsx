'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Mountain, TreePalm, Waves, TreePine, ArrowRight, Sparkles } from 'lucide-react';

const DESTINATION_CATEGORIES = [
  { icon: Mountain, label: 'High Altitude Treks', count: '12+', color: 'from-slate-500 to-blue-700', desc: 'Himalayan passes, base camps & ridge walks' },
  { icon: Waves, label: 'Coastal Escapes', count: '8+', color: 'from-cyan-500 to-blue-600', desc: 'Goa, Konkan, Andamans & Kerala backwaters' },
  { icon: TreePine, label: 'Forest & Wildlife', count: '6+', color: 'from-green-500 to-emerald-700', desc: 'Safaris, jungle camps & eco-retreats' },
  { icon: TreePalm, label: 'Culture & Heritage', count: '10+', color: 'from-amber-500 to-orange-600', desc: 'Rajasthan, Northeast India & ancient ruins' },
];

export default function TripShowcase() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-green-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-bold mb-6 border border-green-100"
          >
            <Sparkles size={14} /> Launching Summer 2026
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
          >
            Explore the <span className="text-gradient">Untraveled</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            30+ curated group expeditions across India's most breathtaking landscapes are coming — 
            from icy Himalayan passes to sun-soaked coastlines. Join the waitlist for first access.
          </motion.p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {DESTINATION_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-[28px] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 cursor-default"
            >
              {/* Gradient top strip */}
              <div className={`h-32 bg-gradient-to-br ${cat.color} relative flex items-center justify-center`}>
                <cat.icon size={48} className="text-white/40" strokeWidth={1.5} />
                <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-full">
                  {cat.count} trips
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-black text-gray-900 mb-1.5 text-base group-hover:text-green-600 transition-colors">{cat.label}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-10 md:p-14 text-center shadow-2xl shadow-green-500/20"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Compass size={20} className="text-green-200" />
              <span className="text-green-200 text-sm font-bold uppercase tracking-widest">Full Trip Catalogue</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Detailed itineraries & prices drop at launch
            </h3>
            <p className="text-green-100 font-medium text-lg">
              Over 30 trips across 15+ destinations — spanning beach, mountains, forests & heritage — 
              are being finalised by our organizer partners right now.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {['Himachal Pradesh', 'Goa', 'Kerala', 'Rajasthan', 'Uttarakhand', 'Ladakh', 'Northeast India', '& more'].map((tag) => (
                <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                  <MapPin size={10} className="inline mr-1" />{tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-4 inline-flex items-center gap-2 bg-white text-green-700 font-black px-8 py-4 rounded-2xl hover:bg-green-50 transition-colors shadow-lg"
            >
              Get Early Access <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
