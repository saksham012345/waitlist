'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/waitlist/leaderboard';

export default function Leaderboard() {
    const [board, setBoard] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const { data } = await axios.get(API_URL);
                setBoard(data);
            } catch (err) {
                console.error('Board Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBoard();
        const interval = setInterval(fetchBoard, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="leaderboard" className="py-24 bg-[#F8FAF9]">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary-eco/30 bg-primary-eco/10 text-primary-eco text-sm font-medium">
                        🏆 Explorer Rewards
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900">Top Explorers</h2>
                    <p className="text-slate-600">
                        The top two explorers win a <span className="text-primary-eco font-bold">free adventure</span> on one of our first organized trips!
                    </p>
                </div>

                <div className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(22,163,74,0.05)]">
                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    ) : board.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {board.map((user, index) => (
                                <motion.div
                                    key={user._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 text-2xl font-black text-slate-300">
                                            {index + 1}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                {user.name}
                                                {index === 0 && <Trophy className="w-4 h-4 text-yellow-500" />}
                                                {index === 1 && <Medal className="w-4 h-4 text-slate-400" />}
                                                {index === 2 && <Award className="w-4 h-4 text-amber-600" />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <div className="text-xl font-black text-primary-eco">{user.referralCount}</div>
                                            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Invites</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-gray-500">
                            No explorers yet. Be the first to invite friends!
                        </div>
                    )}
                </div>

                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-primary-eco/5 to-accent-mint/10 border border-emerald-50 text-center">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Adventure Giveaway</h4>
                    <p className="text-slate-600">
                        Two random innovators win sustainably curated travel rewards. Every share counts!
                    </p>
                </div>
            </div>
        </section>
    );
}
