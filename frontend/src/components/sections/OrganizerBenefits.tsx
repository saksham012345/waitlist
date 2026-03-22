'use client';

import { motion } from 'framer-motion';
import { Layout, Users, BarChart3, Star, CheckCircle } from 'lucide-react';

const benefits = [
    'Create & Publish Trips in Seconds',
    'Manage Participants & Custom Itineraries',
    'Real-time Traveler Insights & Analytics',
    'Vetted Community & Reputation Building',
];

export default function OrganizerBenefits() {
    return (
        <section className="py-24 bg-[#F0FDF4] relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                            Empowering Organizers with <br />
                            <span className="text-primary-eco">Professional Tools</span>
                        </h2>
                        <p className="text-xl text-slate-600">
                            TrekTribe isn't just a platform; it's a lightweight CRM for sustainable travel creators.
                            Manage your community, track impact, and grow your reputation.
                        </p>

                        <ul className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 text-slate-700 text-lg"
                                >
                                    <CheckCircle className="w-5 h-5 text-primary-eco" />
                                    {benefit}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        {/* Mockup UI */}
                        <div className="bg-[rgba(255,255,255,0.85)] backdrop-blur-md rounded-3xl border border-[rgba(34,197,94,0.15)] shadow-[0_10px_25px_rgba(34,197,94,0.15)] overflow-hidden p-6 aspect-video flex flex-col gap-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-eco/10 flex items-center justify-center">
                                        <Layout className="w-4 h-4 text-primary-eco" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">Trip Dashboard</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-emerald-50/30 p-4 rounded-xl space-y-2 border border-emerald-100/50">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Active Explorers</p>
                                    <p className="text-2xl font-black text-slate-900">124</p>
                                </div>
                                <div className="bg-emerald-50/30 p-4 rounded-xl space-y-2 border border-emerald-100/50">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">New Requests</p>
                                    <p className="text-2xl font-black text-primary-eco">+12</p>
                                </div>
                            </div>

                            <div className="bg-emerald-50/30 flex-1 rounded-xl p-4 space-y-3 border border-emerald-100/50">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Upcoming: Eco-Trek Bali</p>
                                <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[70%] bg-primary-eco rounded-full" />
                                </div>
                                <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
                                    <span>14 / 20 Slots Filled</span>
                                    <span className="text-primary-eco">70%</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-4 bg-primary-eco rounded-2xl shadow-[0_10px_30px_rgba(22,163,74,0.3)] z-20"
                        >
                            <Users className="w-6 h-6 text-white" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-4 -left-4 p-4 bg-emerald-600 rounded-2xl shadow-lg z-20"
                        >
                            <Star className="w-5 h-5 text-white" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
