'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function PortfolioButton() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-24 md:bottom-6 left-6 z-50 flex flex-col items-start shadow-2xl"
        >
            <div className="bg-black text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 flex items-center gap-2 rounded-t-sm">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                Projeto Demonstrativo
            </div>

            <Link
                href="https://concept-digital-portfolio.vercel.app/"
                className="bg-[#D4AF37] hover:bg-[#C5A028] text-black font-extrabold text-sm px-5 py-3 flex items-center gap-3 transition-colors rounded-b-sm rounded-r-sm"
            >
                <span>VOLTAR AO PORTFÓLIO</span>
                <ArrowLeft className="h-4 w-4 stroke-[3px]" />
            </Link>
        </motion.div>
    );
}
