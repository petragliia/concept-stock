'use client';

import { StatsSection } from "@/components/dashboard/StatsSection";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { ProductDrawer } from "@/components/inventory/ProductDrawer";
import { WelcomeModal } from "@/components/dashboard/WelcomeModal";
import { useInventoryStore } from "@/store/inventoryStore";
import { motion } from "framer-motion";
import { Plus, PlayCircle } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { runDailySimulation } = useInventoryStore();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">Painel de Controle</h1>
                    <p className="text-slate-400">Visão geral do desempenho do seu estoque.</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={runDailySimulation}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-brand-800/50 transition-colors border border-brand-800"
                    >
                        <PlayCircle className="h-5 w-5" />
                        <span className="hidden sm:inline">Simular Dia</span>
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsDrawerOpen(true)}
                        className="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-accent-900/20"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Novo Produto</span>
                    </motion.button>
                </div>
            </div>

            {/* Stats */}
            <StatsSection />

            {/* Table Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="rounded-2xl border border-brand-800/50 bg-brand-900/50 backdrop-blur-sm overflow-hidden"
            >
                <div className="p-6 border-b border-brand-800/50 flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-white">Estoque Recente</h3>
                    {/* Filters placeholder */}
                    <div className="flex gap-2">
                        {/* Visual placeholder for filters */}
                        <div className="hidden sm:block text-xs text-slate-500 bg-brand-950/50 px-3 py-1 rounded-full border border-brand-800/50">
                            Categoria: Todas
                        </div>
                    </div>
                </div>
                <InventoryTable />
            </motion.div>

            {/* Drawer */}
            <ProductDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Demo Welcome Modal */}
            <WelcomeModal />
        </div>
    );
}
