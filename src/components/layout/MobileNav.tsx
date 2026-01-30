'use client';

import { LayoutDashboard, Package, BarChart3, Settings, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
    { icon: LayoutDashboard, label: 'Painel', href: '/' },
    { icon: Package, label: 'Estoque', href: '/inventory' },
    { icon: BarChart3, label: 'Análises', href: '/analytics' },
    { icon: Settings, label: 'Config', href: '/settings' },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-950/90 backdrop-blur-xl border-t border-brand-800/50 md:hidden pb-[env(safe-area-inset-bottom)]">
            <nav className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 relative",
                                isActive ? "text-white" : "text-slate-500"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-indicator"
                                    className="absolute -top-[1px] w-8 h-1 bg-accent-500 rounded-b-full shadow-[0_4px_12px_rgba(99,102,241,0.5)]"
                                />
                            )}
                            <item.icon className={cn("h-6 w-6 transition-colors", isActive && "text-accent-400")} />
                            <span className="text-[10px] font-medium transition-colors">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
