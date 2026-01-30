import { ReactNode } from 'react';
import { GhostSidebar } from './GhostSidebar';
import { MobileNav } from './MobileNav';

interface ShellProps {
    children: ReactNode;
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="min-h-screen bg-brand-950 text-slate-200 selection:bg-accent-500/30 pb-20 md:pb-0">
            {/* Background Grain/Noise Texture */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            <GhostSidebar />
            <MobileNav />

            <main className="relative z-10 md:pl-20 lg:pl-64 min-h-screen transition-all duration-300">
                <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
