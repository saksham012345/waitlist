'use client';

import React, { Suspense } from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import DashboardPreview from '@/components/sections/DashboardPreview';
import TripShowcase from '@/components/sections/TripShowcase';
import Impact from '@/components/sections/Impact';
import Giveaway from '@/components/sections/Giveaway';
import WaitlistForm from '@/components/forms/WaitlistForm';
import Leaderboard from '@/components/sections/Leaderboard';
import CountdownTimer from '@/components/ui/CountdownTimer';
import ActivityFeed from '@/components/ui/ActivityFeed';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAF9]">
      <Navbar />
      
      <Hero />
      
      <TripShowcase />
      
      <Features />
      
      <DashboardPreview />
      
      <Impact />
      
      <Giveaway />
      
      <section id="waitlist" className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <CountdownTimer />
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Ready to Join the <span className="text-gradient">Tribe?</span>
              </h2>
              <p className="text-lg text-gray-600">
                Secure your early explorer spot and get exclusive access to our premium launch events.
              </p>
            </div>
            <Suspense fallback={
              <div className="h-[600px] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <WaitlistForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
             <Leaderboard />
          </div>
        </div>
      </section>

      <ActivityFeed />

      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-black">T</div>
              <span className="font-black text-xl text-gray-900 tracking-tighter">TrekTribe</span>
            </div>
            <p className="text-gray-500 font-medium">© 2026 TrekTribe. Leading the charge in sustainable exploration.</p>
            <div className="flex gap-6 text-sm font-bold text-gray-400">
              <a href="#" className="hover:text-green-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-green-600 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
