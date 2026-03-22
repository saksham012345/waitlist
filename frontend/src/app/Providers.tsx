'use client';

import React from 'react';
import { WaitlistProvider } from '@/context/WaitlistContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WaitlistProvider>
      {children}
    </WaitlistProvider>
  );
}
