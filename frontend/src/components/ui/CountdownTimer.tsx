'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LAUNCH_DATE = new Date('2026-04-16T00:00:00').getTime();

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [isLive, setIsLive] = useState(false);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = LAUNCH_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync effect when tab becomes visible to prevent background throttling drift
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeLeft(calculateTimeLeft());
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Cascading Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.days === 0 && prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          setIsLive(true);
          clearInterval(timer);
          return prev;
        }

        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const DigitColumn = ({ digit }: { digit: string }) => (
    <div className="relative w-4 md:w-6 lg:w-8 h-full flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.6 }}
          className="text-3xl md:text-5xl font-black text-slate-800 absolute"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );

  const TimeUnit = ({ value, label }: { value: number, label: string }) => {
    const padVal = String(value).padStart(2, '0');
    return (
      <div className="flex flex-col items-center">
        <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-xl md:rounded-2xl w-16 sm:w-20 md:w-24 h-20 md:h-24 lg:h-28 flex items-center justify-center shadow-lg mb-2 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-50/50 z-0" />
          <div className="relative z-10 flex gap-0.5 md:gap-1 items-center justify-center h-full w-full">
             {padVal.split('').map((char, index) => (
               <DigitColumn key={`${index}-${char}`} digit={char} />
             ))}
          </div>
        </div>
        <span className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-12 px-4">
      <AnimatePresence mode="wait">
        {!isLive ? (
          <motion.div
            key="timer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-[10px] md:text-xs font-black mb-4 md:mb-6 border border-green-100 uppercase tracking-widest">
              🚀 TrekTribe Launching Soon
            </div>
            <div className="flex gap-3 sm:gap-4 md:gap-8 justify-center flex-wrap md:flex-nowrap">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="live"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 md:p-12 glass rounded-3xl md:rounded-[3rem] border-green-400 mx-4"
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 md:mb-4 tracking-tighter">
              🎉 TrekTribe is now <span className="text-gradient">Live!</span>
            </h2>
            <p className="text-sm md:text-lg text-slate-600 font-medium">Head over to the app store to start your adventure.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
