'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WorldMap = () => {
  // Simplified paths for travel visualization
  const routes = [
    { d: "M 150 100 Q 250 50 350 120", id: "route1" },
    { d: "M 100 200 Q 200 150 300 180", id: "route2" },
    { d: "M 400 150 Q 500 200 600 100", id: "route3" },
    { d: "M 200 300 Q 400 250 550 280", id: "route4" },
  ];

  return (
    <div className="relative w-full h-[400px] overflow-hidden opacity-30 select-none">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full text-green-200"
        fill="currentColor"
      >
        {/* Simplified Continent Shapes */}
        <path d="M150,150 Q180,100 220,130 T280,150 Q300,200 250,220 T150,200 Z" />
        <path d="M400,100 Q450,50 500,100 T550,150 Q500,200 450,180 T400,150 Z" />
        <path d="M600,200 Q650,150 700,200 T750,250 Q700,300 650,280 T600,250 Z" />
        <path d="M200,300 Q250,250 300,300 T350,350 Q300,400 250,380 T200,350 Z" />

        {/* Animated Routes */}
        {routes.map((route, index) => (
          <g key={route.id}>
            <motion.path
              d={route.d}
              fill="none"
              stroke="#16A34A"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2, delay: index * 0.5, ease: "easeInOut" }}
            />
            <motion.circle
              r="3"
              fill="#16A34A"
              initial={{ offset: 0, opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                offset: 1 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: index * 0.5,
                ease: "linear" 
              }}
            >
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path={route.d}
              />
            </motion.circle>
          </g>
        ))}
      </svg>
      
      {/* Background soft glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/20 blur-[100px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-mint-200/20 blur-[100px] animate-pulse-soft" />
    </div>
  );
};

export default WorldMap;
