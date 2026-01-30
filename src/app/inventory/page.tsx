'use client';

import { InventoryTable } from "@/components/inventory/InventoryTable";
import { ProductDrawer } from "@/components/inventory/ProductDrawer";
import { motion } from "framer-motion";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";

export default function InventoryPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">Gerenciamento de Estoque</h1>
                    <p className="text-slate-400">Visualize e edite todo o seu inventário.</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <button className="p-2.5 text-slate-400 border border-brand-800 rounded-lg hover:text-white hover:bg-brand-800/50 transition-colors">
                        <Filter className="h-5 w-5" />
                    </button>
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="rounded-2xl border border-brand-800/50 bg-brand-900/50 backdrop-blur-sm overflow-hidden"
            >
                <InventoryTable />
            </motion.div>

            <ProductDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </div>
    );
}
