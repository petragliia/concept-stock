'use client';

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: number; // percentage change
    trendLabel?: string;
    status?: 'neutral' | 'warning' | 'danger' | 'success';
    delay?: number;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendLabel = "vs mês anterior",
    status = 'neutral',
    delay = 0
}: StatCardProps) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "relative overflow-hidden rounded-2xl border bg-card-bg/50 p-6 backdrop-blur-sm",
                "border-brand-800/50 hover:border-brand-700 hover:shadow-lg hover:shadow-brand-950/50 transition-all",
                status === 'danger' && "border-red-900/30 bg-red-950/10",
                status === 'warning' && "border-orange-900/30 bg-orange-950/10"
            )}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</h3>
                </div>
                <div className={cn(
                    "p-2 rounded-lg bg-brand-800/50 text-slate-400",
                    status === 'success' && "text-emerald-400 bg-emerald-950/30",
                    status === 'danger' && "text-red-400 bg-red-950/30",
                )}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>

            {trend !== undefined && (
                <div className="mt-4 flex items-center gap-2">
                    <span className={cn(
                        "flex items-center text-xs font-medium px-2 py-0.5 rounded-full",
                        trend > 0 ? "text-emerald-400 bg-emerald-950/30" : trend < 0 ? "text-red-400 bg-red-950/30" : "text-slate-400 bg-slate-800/50"
                    )}>
                        {trend > 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : trend < 0 ? <TrendingDown className="mr-1 h-3 w-3" /> : <Minus className="mr-1 h-3 w-3" />}
                        {Math.abs(trend)}%
                    </span>
                    <span className="text-xs text-slate-500">{trendLabel}</span>
                </div>
            )}

            {/* Decorative gradient blob */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-500/10 blur-2xl transition-all group-hover:bg-accent-500/20" />
        </motion.div>
    );
}
