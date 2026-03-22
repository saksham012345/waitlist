'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-gradient-to-r from-primary-eco to-accent-green text-white shadow-[0_4px_20px_rgba(22,163,74,0.2)] hover:shadow-[0_4px_30px_rgba(22,163,74,0.4)] border-none',
            secondary: 'bg-white border border-primary-eco/20 text-primary-eco hover:bg-emerald-50 shadow-sm',
            outline: 'bg-transparent border-2 border-primary-eco text-primary-eco hover:bg-primary-eco hover:text-white',
            ghost: 'bg-transparent text-slate-500 hover:text-primary-eco',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg font-bold',
            xl: 'px-10 py-5 text-xl font-extrabold tracking-tight',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    'relative inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading}
                {...props}
            >
                <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
                    {children}
                </span>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
