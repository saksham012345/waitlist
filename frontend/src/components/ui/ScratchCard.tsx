'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Gift, Lock } from 'lucide-react';

interface ScratchCardProps {
  onComplete: (reward: string) => void;
  isUnlocked: boolean;
  /** Seed to make the reward deterministic per-user (e.g. user._id). Falls back to random if not provided. */
  seed?: string;
}

// Weighted reward pool — probabilities must sum to 1
const REWARDS = [
  { label: '₹100 off your first trip', prob: 0.50 },
  { label: '₹250 off your first trip', prob: 0.28 },
  { label: '₹500 off your first trip', prob: 0.15 },
  { label: 'Priority Boarding Pass',   prob: 0.05 },
  { label: 'Free Merchandise Kit',     prob: 0.02 },
];

/** Seeded pseudo-random number in [0,1) using a simple hash so the same user always gets the same reward. */
function seededRandom(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // Mix in the REWARDS length so adding rewards changes outcomes
  h ^= REWARDS.length;
  h = Math.imul(h, 0x01000193);
  return ((h >>> 0) / 0xffffffff);
}

function pickReward(seed?: string): string {
  const rand = seed ? seededRandom(seed) : Math.random();
  let cum = 0;
  for (const r of REWARDS) {
    cum += r.prob;
    if (rand < cum) return r.label;
  }
  return REWARDS[REWARDS.length - 1].label;
}

export default function ScratchCard({ onComplete, isUnlocked, seed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Reward is fixed at mount time — same seed → same reward, can't be "re-rolled"
  const [reward] = useState<string>(() => pickReward(seed));

  // Draw silver scratch layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 160;

    // Base silver
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#d1d5db');
    grad.addColorStop(0.5, '#9ca3af');
    grad.addColorStop(1, '#d1d5db');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Noise grain
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let i = 0; i < 3000; i++) {
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }

    // Label
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    ctx.fillText('✦  SCRATCH TO REVEAL  ✦', canvas.width / 2, canvas.height / 2 + 6);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const checkScratched = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPx = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPx++;
    }
    const percent = (transparentPx / (pixels.length / 4)) * 100;
    if (percent > 40) {
      setIsScratched(true);
      onComplete(reward);
    }
  }, [isScratched, reward, onComplete]);

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    checkScratched();
  };

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      {/* Prize layer behind scratch */}
      <div className="w-full h-[160px] bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl flex flex-col items-center justify-center p-6 text-white text-center shadow-xl">
        <Gift size={32} className="mb-2 opacity-60" />
        <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Your Reward</p>
        <p className="text-lg font-black leading-tight">{reward}</p>
      </div>

      {/* Canvas scratch layer */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair rounded-3xl touch-none"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={scratch}
        onTouchStart={(e) => { e.preventDefault(); setIsDrawing(true); }}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={scratch}
        animate={isScratched ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Locked overlay — only shown when not yet unlocked */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-white z-20 gap-3">
          <Lock size={24} className="opacity-70" />
          <p className="text-sm font-bold uppercase tracking-widest text-center px-6 leading-snug">
            Refer 3 friends<br />to unlock your reward
          </p>
        </div>
      )}
    </div>
  );
}
