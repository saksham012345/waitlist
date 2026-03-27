'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Copy, Share2, Users, Shield, Send, 
  MapPin, Phone, User, ChevronDown, Instagram, Mail 
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useWaitlist } from '@/context/WaitlistContext';
import MilestoneTracker from '@/components/ui/MilestoneTracker';
import ScratchCard from '@/components/ui/ScratchCard';
import confetti from 'canvas-confetti';

export default function WaitlistForm() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');
  const { user, loading, error, signup, explorerCount } = useWaitlist();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    role: 'traveler',
  });

  const [hasRef, setHasRef] = useState(!!refCode);
  const [inputRefCode, setInputRefCode] = useState(refCode || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData, hasRef ? inputRefCode : null);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#16A34A', '#F8FAF9']
      });
    } catch (err) {
      console.error('Signup failed');
    }
  };

  const [copied, setCopied] = React.useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const shareUrl = `${window.location.origin}?ref=${user.referralCode}`;
    const text = `Join TrekTribe — the premium social travel platform for India! Use my referral code *${user.referralCode}* or click the link to join the waitlist and get priority access 🏔️\n\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnInstagram = async () => {
    const shareUrl = `${window.location.origin}?ref=${user.referralCode}`;
    const text = `Join TrekTribe — the premium social travel platform for India! Use my referral code ${user.referralCode} or click the link to join the waitlist and get priority access 🏔️\n\n${shareUrl}`;
    
    // Use Web Share API if available (works well on mobile for Native Instagram share)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TrekTribe Waitlist',
          text: text,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for desktop: copy to clipboard and open Instagram
      navigator.clipboard.writeText(text);
      alert('Referral text copied to clipboard! Paste it in your Instagram Story or DMs.');
      window.open('https://instagram.com', '_blank');
    }
  };

  if (user) {
    return (
      <div id="waitlist-dashboard" className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-dark border-white/40 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-12"
        >
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
              You're on the <span className="text-gradient">Waitlist!</span>
            </h2>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Position</p>
              <span className="text-5xl font-black text-green-600">#{user.waitlistPosition}</span>
              <p className="text-sm text-gray-500 font-medium mt-2">Invite friends to move up the list.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Referral Code</p>
                <p className="text-xs text-gray-400 font-medium ml-1">Share this code with friends — they enter it when signing up.</p>
                <div className="flex items-center gap-3 bg-green-50 p-5 rounded-2xl border-2 border-green-100">
                  <code className="text-2xl font-black text-green-700 tracking-widest flex-1 select-all">
                    {user.referralCode}
                  </code>
                  <button
                    onClick={copyCode}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      copied
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-green-700 hover:bg-green-100 border border-green-200'
                    }`}
                  >
                    <Copy size={16} />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={shareOnWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4 font-bold h-auto">
                  <Share2 className="mr-2" size={20} /> WhatsApp
                </Button>
                <Button onClick={shareOnInstagram} variant="outline" className="flex-1 border-2 border-slate-100 rounded-2xl py-4 font-bold h-auto">
                   <Instagram className="mr-2" size={20} /> Instagram
                </Button>
              </div>
            </div>

            <div className="space-y-4">
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Unlock Milestone Rewards</p>
               <ScratchCard 
                 isUnlocked={user.referralCount >= 3} 
                 seed={user._id || user.email}
                 onComplete={(r) => alert(`🎉 You won: ${r}!`)} 
               />
            </div>
          </div>

          <MilestoneTracker referralCount={user.referralCount} />
        </motion.div>
      </div>
    );
  }

  return (
    <div id="waitlist-form" className="max-w-2xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="glass border-white/60 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden"
      >
        <div className="text-center mb-10 space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest mb-2">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             {explorerCount}+ Joined Today
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
             Join the <span className="text-gradient">Tribe.</span>
           </h2>
           <p className="text-gray-500 font-medium">Secure your spot for the official Summer 2026 launch.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-600 transition-colors">
                 <User size={20} />
              </div>
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-14 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-600 transition-colors">
                 <Mail size={20} />
              </div>
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-14 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-600 transition-colors">
                 <Phone size={20} />
              </div>
              <input
                required
                type="tel"
                pattern="[6-9][0-9]{9}"
                title="Please enter a valid 10-digit Indian mobile number"
                placeholder="Phone Number"
                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-14 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              />
            </div>

            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-600 transition-colors">
                 <MapPin size={20} />
              </div>
              <input
                required
                type="text"
                placeholder="City"
                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-14 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                onClick={() => setHasRef(!hasRef)}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  hasRef ? 'bg-green-600 border-green-600' : 'bg-white border-slate-200'
                }`}
              >
                {hasRef && <CheckCircle2 size={16} className="text-white" />}
              </div>
              <span className="text-sm font-bold text-gray-600">Did a friend invite you?</span>
            </label>

            <AnimatePresence>
              {hasRef && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Enter referral code (e.g. TREK-ARJUN21)"
                    className="w-full bg-green-50 border-2 border-green-100 rounded-2xl px-6 py-4 text-green-700 focus:outline-none focus:border-green-500 transition-all font-bold placeholder:text-green-300"
                    value={inputRefCode}
                    onChange={(e) => setInputRefCode(e.target.value.toUpperCase())}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-[2rem] py-6 text-xl font-black shadow-2xl shadow-green-500/20 transition-all flex items-center justify-center gap-3"
          >
            Join the Waitlist <Send size={20} />
          </Button>
          
          <p className="text-[10px] text-gray-400 text-center font-bold px-12 group">
            By joining, you agree to our <span className="text-gray-600 hover:text-green-600 cursor-pointer">Terms of Service</span> and <span className="text-gray-600 hover:text-green-600 cursor-pointer">Privacy Policy</span>.
          </p>
        </form>

        {/* Floating Activity */}
        <div className="absolute -right-4 -top-4 w-12 h-12 bg-green-500/10 rounded-full blur-2xl" />
        <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-blue-500/10 rounded-full blur-2xl" />
      </motion.div>
    </div>
  );
}
