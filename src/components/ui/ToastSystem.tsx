'use client';

import { useInventoryStore } from '@/store/inventoryStore';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Keep this imports if you've already created the utils file

export function ToastSystem() {
    const { toasts, dismissToast } = useInventoryStore();

    return (
        <div className="fixed bottom-24 md:bottom-4 right-4 z-50 flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)] pointer-events-none">
            <AnimatePresence mode='popLayout'>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className={cn(
                            "pointer-events-auto relative overflow-hidden rounded-xl border p-4 shadow-lg backdrop-blur-md",
                            "border-brand-800 bg-brand-900/90",
                            toast.type === 'success' && "border-emerald-500/30",
                            toast.type === 'error' && "border-red-500/30",
                            toast.type === 'warning' && "border-amber-500/30",
                        )}
                    >
                        {/* Glow effect */}
                        <div className={cn(
                            "absolute inset-0 opacity-10",
                            toast.type === 'success' && "bg-emerald-500",
                            toast.type === 'error' && "bg-red-500",
                            toast.type === 'warning' && "bg-amber-500",
                            toast.type === 'info' && "bg-blue-500",
                        )} />

                        <div className="flex gap-3 relative z-10">
                            <div className={cn(
                                "flex-shrink-0 mt-0.5",
                                toast.type === 'success' && "text-emerald-400",
                                toast.type === 'error' && "text-red-400",
                                toast.type === 'warning' && "text-amber-400",
                                toast.type === 'info' && "text-blue-400",
                            )}>
                                {toast.type === 'success' && <CheckCircle className="h-5 w-5" />}
                                {toast.type === 'error' && <AlertOctagon className="h-5 w-5" />}
                                {toast.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                                {toast.type === 'info' && <Info className="h-5 w-5" />}
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
                                {toast.description && (
                                    <p className="mt-1 text-xs text-slate-400">{toast.description}</p>
                                )}
                            </div>

                            <button
                                onClick={() => dismissToast(toast.id)}
                                className="flex-shrink-0 text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
