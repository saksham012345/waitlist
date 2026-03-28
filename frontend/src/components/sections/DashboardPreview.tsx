'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield, BarChart3, Zap, Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import FloatingElements from '../ui/FloatingElements';
import { useWaitlist } from '@/context/WaitlistContext';

const MetricCard = ({ icon: Icon, label, value, sub, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass p-6 rounded-3xl group hover:scale-[1.02] transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-green-50 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
        <Icon size={22} />
      </div>
    </div>
    <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
    <h4 className="text-3xl font-black text-gray-900 mb-0.5">{value}</h4>
    {sub && <p className="text-xs text-green-600 font-bold">{sub}</p>}
  </motion.div>
);

const FeatureRow = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
    <span className="text-gray-700 font-medium text-sm">{text}</span>
  </div>
);

export default function DashboardPreview() {
  const { stats } = useWaitlist();

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden bg-[#F8FAF9]">
      <FloatingElements />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-bold mb-6"
          >
            <Shield size={16} /> For Trip Organizers
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            The Hub for <span className="text-gradient">Professional</span> Organizers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stop juggling spreadsheets and WhatsApp groups. TrekTribe gives organizers a 
            professional command center to run and grow their travel business.
          </p>
        </div>

        {/* Live stats from real signups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          <MetricCard
            icon={Users}
            label="Travelers on Waitlist"
            value={stats.total > 0 ? `${stats.total.toLocaleString()}+` : '130+'}
            sub="Ready to book trips at launch"
            delay={0.1}
          />
          <MetricCard
            icon={Star}
            label="Verified Organizers Joining"
            value={stats.organizers > 0 ? stats.organizers : '15+'}
            sub="Early access secured"
            delay={0.2}
          />
          <MetricCard
            icon={TrendingUp}
            label="Avg. Group Size Target"
            value="12–20"
            sub="Per curated expedition"
            delay={0.3}
          />
        </div>

        {/* Value Props — two columns */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="glass-dark p-8 md:p-14 rounded-[40px] border-white/40 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: What organizers get */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <BarChart3 className="text-green-600" size={24} />
                <h3 className="text-2xl font-bold text-gray-900">What You Get as an Organizer</h3>
              </div>
              <div className="space-y-5">
                <FeatureRow text="Your own organizer profile & trip listings visible to all TrekTribe members" />
                <FeatureRow text="Built-in CRM to track leads, manage bookings, and communicate with travelers" />
                <FeatureRow text="Automated payment collection & participant confirmation flow" />
                <FeatureRow text="Real-time trip fill-rate analytics and demand insights" />
                <FeatureRow text="Verified organizer badge that builds trust and drives conversions" />
                <FeatureRow text="Direct access to a growing community of 130+ active traveler sign-ups" />
              </div>
            </div>

            {/* Right: Why join now */}
            <div className="flex flex-col gap-6">
              <div className="bg-green-600 rounded-3xl p-8 text-white space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Zap size={20} className="text-green-200" />
                  <span className="text-green-200 font-bold text-sm uppercase tracking-widest">Founding Organizer Offer</span>
                </div>
                <h4 className="text-2xl font-black leading-tight">
                  Free for your first 2 months — then a simple flat subscription.
                </h4>
                <p className="text-green-100 text-sm font-medium leading-relaxed">
                  No per-booking fees. No percentage cut. TrekTribe is subscription-based, so every rupee you earn stays with you.
                  Founding organizers get the first 2 months completely free — no card required.
                </p>
                <button
                  onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-green-700 font-black py-3.5 rounded-2xl hover:bg-green-50 transition-colors"
                >
                  Secure Your Organizer Spot <ArrowRight size={16} />
                </button>
              </div>

              <div className="glass rounded-3xl p-6 border border-white/60 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Platform Launch</span>
                </div>
                <p className="text-gray-800 font-black text-xl">Summer 2026</p>
                <p className="text-gray-500 text-sm font-medium">
                  Organizer onboarding begins 8 weeks before launch. Waitlist members get first invites.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
