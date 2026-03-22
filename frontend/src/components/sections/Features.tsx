'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Globe, Users, BarChart, Mountain, Leaf, Compass, Map as MapIcon, Calendar, MessageSquare } from 'lucide-react';

const travelerFeatures = [
    {
        title: 'Curated Trips',
        description: 'Join trips organized by experienced hosts with vetted itineraries.',
        icon: MapIcon,
    },
    {
        title: 'Like-minded Travelers',
        description: 'Find companions who share your interests and travel style.',
        icon: Users,
    },
    {
        title: 'Verified Communities',
        description: 'Join safe, trusted travel groups with person verification.',
        icon: Shield,
    },
];

const organizerFeatures = [
    {
        title: 'Trip Management CRM',
        description: 'Set itineraries, prices, and group sizes with ease.',
        icon: Calendar,
    },
    {
        title: 'Participant Tracking',
        description: 'Manage join requests and track interested travelers.',
        icon: Compass,
    },
    {
        title: 'Direct Communication',
        description: 'Chat with potential participants before they join.',
        icon: MessageSquare,
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            {/* Background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-eco/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Subtle Background Illustrations */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <Mountain className="absolute top-10 left-[10%] rotate-12" size={300} />
                <Leaf className="absolute bottom-20 right-[5%] -rotate-12" size={200} />
                <Compass className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={500} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24 max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-eco/10 text-primary-eco text-sm font-bold">
                        Why TrekTribe?
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
                        Designed for <span className="text-gradient">Sustainability</span> & Community.
                    </h2>
                    <p className="text-xl text-secondary-text leading-relaxed">
                        Whether you're looking for your next eco-adventure or building a travel community, 
                        TrekTribe provides the tools for a better planet.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Travelers */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary-eco/10 flex items-center justify-center text-primary-eco">
                                <Users size={24} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900">For Explorers</h3>
                        </div>
                        <div className="grid gap-6">
                            {travelerFeatures.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="p-8 rounded-[2rem] glass border-white/60 hover:shadow-2xl hover:shadow-green-900/10 transition-all group"
                                >
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-eco shrink-0 group-hover:bg-primary-eco group-hover:text-white transition-colors">
                                            <feature.icon size={24} />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black text-slate-900">{feature.title}</h4>
                                            <p className="text-secondary-text leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Organizers */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent-green/10 flex items-center justify-center text-accent-green">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900">For Organizers</h3>
                        </div>
                        <div className="grid gap-6">
                            {organizerFeatures.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="p-8 rounded-[2rem] glass border-white/60 hover:shadow-2xl hover:shadow-green-900/10 transition-all group"
                                >
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-accent-green shrink-0 group-hover:bg-accent-green group-hover:text-white transition-colors">
                                            <feature.icon size={24} />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black text-slate-900">{feature.title}</h4>
                                            <p className="text-secondary-text leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
