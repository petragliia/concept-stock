'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Info, X, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Force show modal on mount
        const timer = setTimeout(() => setIsOpen(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('concept-stock-welcome', 'true');
        // Dispatch event so other components know the welcome sequence is done
        window.dispatchEvent(new Event('concept-welcome-closed'));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[60] bg-brand-950/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-lg bg-brand-900/90 border border-brand-800 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative">
                            {/* Decorative gradient top */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-purple-500 to-accent-500" />

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-brand-800/50 rounded-xl border border-brand-700/50">
                                        <Sparkles className="h-8 w-8 text-accent-400" />
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="text-slate-500 hover:text-white transition-colors p-1"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Bem-vindo ao Concept Stock
                                </h2>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    Esta é uma <span className="text-accent-400 font-medium">demonstração técnica interativa</span>.
                                    Sinta-se livre para adicionar produtos, editar preços e testar as funcionalidades.
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex gap-4 p-4 rounded-xl bg-brand-950/50 border border-brand-800/50">
                                        <Zap className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-200">Ambiente Sandbox</h3>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Os dados são gerados localmente no seu navegador. Nenhuma alteração é salva permanentemente no servidor.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 rounded-xl bg-brand-950/50 border border-brand-800/50">
                                        <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-200">Dica de UX</h3>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Tente passar o mouse sobre os gráficos e cards para ver as micro-interações do <strong>Framer Motion</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="w-full py-4 bg-accent-600 hover:bg-accent-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-accent-900/20 active:scale-[0.98]"
                                >
                                    Começar a Explorar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
