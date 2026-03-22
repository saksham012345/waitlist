'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bell, User, Plane } from 'lucide-react';

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Traveler Avatar 1 */}
      <motion.div
        className="absolute top-[10%] left-[5%] glass p-2 rounded-full flex items-center gap-2 shadow-lg"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <User size={16} />
        </div>
        <span className="text-xs font-medium text-gray-700 pr-2">Arjun joined...</span>
      </motion.div>

      {/* Booking Notification */}
      <motion.div
        className="absolute top-[20%] right-[10%] glass p-3 rounded-xl flex items-center gap-3 shadow-xl"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
          <Bell size={20} />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">New Booking</p>
          <p className="text-xs font-semibold text-gray-800">Spiti Valley Expedition</p>
        </div>
      </motion.div>

      {/* Map Pin 1 */}
      <motion.div
        className="absolute bottom-[30%] left-[8%] glass p-2 rounded-lg flex items-center gap-2 shadow-md border-green-100"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <MapPin size={14} className="text-green-500" />
        <span className="text-[10px] font-bold text-gray-600">Leh, Ladakh</span>
      </motion.div>

      {/* Trip Card Mini */}
      <motion.div
        className="absolute bottom-[15%] right-[15%] glass-dark p-3 rounded-2xl shadow-2xl border-white/20"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-inner">
            <Plane size={24} />
          </div>
          <div>
            <div className="h-2 w-16 bg-green-200/50 rounded-full mb-2" />
            <div className="h-2 w-10 bg-green-100/30 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-green-200/10 blur-[120px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-mint-200/10 blur-[100px] rounded-full translate-x-1/4 translate-y-1/4" />
    </div>
  );
};

export default FloatingElements;
