'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/waitlist` : 'http://localhost:5000/api/waitlist';

interface WaitlistContextType {
  user: any;
  loading: boolean;
  error: string | null;
  activity: any[];
  signup: (formData: any, refCode: string | null) => Promise<void>;
  leaderboard: any[];
  fetchLeaderboard: () => Promise<void>;
  explorerCount: number;
  stats: { total: number, organizers: number, travelers: number };
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export const WaitlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Real-time notifications queue
  const [activity, setActivity] = useState<any[]>([]);
  const seenActivityIds = useRef<Set<string>>(new Set());

  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [explorerCount, setExplorerCount] = useState(128);
  const [stats, setStats] = useState({ total: 128, organizers: 15, travelers: 113 });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('trektribe_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = async (formData: any, refCode: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(API_URL, { ...formData, ref: refCode });
      setUser(data.user);
      localStorage.setItem('trektribe_user', JSON.stringify(data.user));
      
      // Trigger local popup for self
      const newActivity = {
        id: `self-${Date.now()}`,
        message: `You successfully joined the waitlist!`,
        type: 'joined',
        timestamp: new Date()
      };
      setActivity((prev) => [...prev, newActivity]);
      setTimeout(() => {
        setActivity((prev) => prev.filter(a => a.id !== newActivity.id));
      }, 2500);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/leaderboard`);
      setLeaderboard(data);
    } catch (err) {
      console.warn('Leaderboard fetch failed');
    }
  }, []);

  // Real-Time Community Data
  useEffect(() => {
    let initialFetchComplete = false;

    const fetchData = async () => {
      try {
        const promises: Promise<any>[] = [
          axios.get(`${API_URL}/count`),
          axios.get(`${API_URL}/recent`)
        ];
        
        // Polling user profile if logged in
        if (user?.email) {
          promises.push(axios.get(`${API_URL}/profile/${encodeURIComponent(user.email)}`));
        }

        const results = await Promise.all(promises);
        const countRes = results[0];
        const recentRes = results[1];
        const profileRes = user?.email ? results[2] : null;

        if (countRes.data) {
          setExplorerCount(120 + countRes.data.count);
          setStats({
            total: 120 + countRes.data.count,
            organizers: countRes.data.organizers || 0,
            travelers: 120 + (countRes.data.travelers || 0)
          });
        }
        
        if (recentRes.data) {
          const recentItems: any[] = recentRes.data;
          
          if (!initialFetchComplete) {
            recentItems.forEach(item => seenActivityIds.current.add(String(item.id || item._id)));
            initialFetchComplete = true;
          } else {
            const newActivities = recentItems.filter(item => !seenActivityIds.current.has(String(item.id || item._id)));
            if (newActivities.length > 0) {
              setActivity(prev => [...prev, ...newActivities]);
              newActivities.forEach(item => seenActivityIds.current.add(String(item.id || item._id)));

              newActivities.forEach(item => {
                setTimeout(() => {
                  setActivity(prev => prev.filter(a => a.id !== item.id && a._id !== item._id));
                }, 3000);
              });
            }
          }
        }

        if (profileRes && profileRes.data) {
          setUser((prevUser: any) => {
            if (!prevUser) return profileRes.data;
            if (prevUser.referralCount !== profileRes.data.referralCount || 
                prevUser.waitlistPosition !== profileRes.data.waitlistPosition) {
              const updatedUser = { ...prevUser, ...profileRes.data };
              localStorage.setItem('trektribe_user', JSON.stringify(updatedUser));
              return updatedUser;
            }
            return prevUser;
          });
        }
      } catch (err) {
        console.warn('Could not fetch real-time community stats', err);
      }
    };

    fetchData(); // initial fetch
    const pollInterval = setInterval(fetchData, 15000); // Poll every 15s

    return () => clearInterval(pollInterval);
  }, [user?.email]);

  return (
    <WaitlistContext.Provider value={{ 
      user, 
      loading, 
      error, 
      activity, 
      signup, 
      leaderboard, 
      fetchLeaderboard, 
      explorerCount,
      stats
    }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
};
