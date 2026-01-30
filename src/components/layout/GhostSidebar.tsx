'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Settings, BarChart3, Bell } from 'lucide-react';
import Link from 'next/link';

const navItems = [
    { icon: LayoutDashboard, label: 'Painel', href: '/' },
    { icon: Package, label: 'Estoque', href: '/inventory' },
    { icon: BarChart3, label: 'Análises', href: '/analytics' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
];

export function GhostSidebar() {
    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 h-full w-20 lg:w-64 z-40 hidden md:flex flex-col border-r border-brand-800/50 bg-brand-950/80 backdrop-blur-xl"
        >
            <div className="flex h-16 items-center justify-center lg:justify-start lg:px-6 border-b border-brand-800/50">
                <div className="h-8 w-8 rounded-lg bg-accent-500 flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                </div>
                <span className="ml-3 font-semibold text-white hidden lg:block tracking-tight">Concept Stock</span>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-brand-800/50 transition-all duration-200 ease-out relative overflow-hidden"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <item.icon className="h-5 w-5 lg:mr-3 relative z-10 text-slate-500 group-hover:text-accent-500 transition-colors" />
                        <span className="hidden lg:block relative z-10 font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-brand-800/50">
                <div className="flex items-center justify-center lg:justify-start px-2 py-2 text-slate-500 hover:text-white transition-colors cursor-pointer">
                    <Bell className="h-5 w-5" />
                    <span className="hidden lg:block ml-3 text-sm font-medium">Notificações</span>
                </div>
            </div>
        </motion.aside>
    );
}
