'use client';

import { useInventoryStore } from '@/store/inventoryStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Edit, Trash2, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

export function InventoryTable() {
    const { products, deleteProduct } = useInventoryStore();
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const toggleRow = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newSet = new Set(expandedRows);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setExpandedRows(newSet);
    };

    return (
        <div className="w-full text-sm text-left overflow-x-auto pb-4">
            <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-brand-800/50 bg-brand-950/30">
                    <div className="col-span-4 pl-8">Produto</div>
                    <div className="col-span-2">SKU</div>
                    <div className="col-span-2">Categoria</div>
                    <div className="col-span-2">Nível de Estoque</div>
                    <div className="col-span-1">Preço</div>
                    <div className="col-span-1 text-right">Ações</div>
                </div>

                <div className="divide-y divide-brand-800/30">
                    <AnimatePresence initial={false}>
                        {products.map((product) => (
                            <InventoryRow
                                key={product.id}
                                product={product}
                                isExpanded={expandedRows.has(product.id)}
                                onToggle={(e) => toggleRow(product.id, e)}
                                onDelete={() => deleteProduct(product.id)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function InventoryRow({ product, isExpanded, onToggle, onDelete }: { product: Product, isExpanded: boolean, onToggle: (e: React.MouseEvent) => void, onDelete: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className="group relative bg-transparent hover:bg-brand-800/20 transition-colors"
        >
            <div
                onClick={onToggle}
                className="grid grid-cols-12 gap-4 px-6 py-3 items-center cursor-pointer"
            >
                <div className="col-span-4 flex items-center gap-3">
                    <button
                        onClick={onToggle}
                        className="p-1 rounded hover:bg-brand-700/50 text-slate-500 transition-colors"
                    >
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <div>
                        <div className="font-medium text-slate-200">{product.name}</div>
                        {product.variants.length > 0 && (
                            <div className="text-xs text-slate-500">{product.variants.length} variações</div>
                        )}
                    </div>
                </div>

                <div className="col-span-2 text-slate-400 font-mono text-xs">{product.id.split('-')[1]?.toUpperCase() || 'SKU-001'}</div>

                <div className="col-span-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-800/50 text-slate-300">
                        {product.category}
                    </span>
                </div>

                <div className="col-span-2 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                            "text-xs font-bold",
                            product.status === 'OUT_OF_STOCK' ? 'text-red-400' :
                                product.status === 'LOW_STOCK' ? 'text-amber-400' : 'text-emerald-400'
                        )}>
                            {product.totalStock} un
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-brand-950 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((product.totalStock / 200) * 100, 100)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={cn(
                                "h-full rounded-full",
                                product.status === 'OUT_OF_STOCK' ? 'bg-red-500' :
                                    product.status === 'LOW_STOCK' ? 'bg-amber-500' : 'bg-emerald-500'
                            )}
                        />
                    </div>
                </div>

                <div className="col-span-1 text-slate-300 font-mono">
                    R${product.basePrice.toFixed(2)}
                </div>

                <div className="col-span-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-brand-700/50 rounded-md"
                    >
                        <Edit className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-md"
                    >
                        <Trash2 className="h-4 w-4" />
                    </motion.button>
                </div>
            </div>

            {/* Expanded Content (Variants) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-brand-950/20 border-t border-brand-800/20 shadow-inner"
                    >
                        <div className="px-14 py-4 grid gap-2">
                            <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Variações do Produto</div>
                            {product.variants.length === 0 ? (
                                <div className="text-sm text-slate-600 italic">Nenhuma variação configurada. Apenas produto base.</div>
                            ) : (
                                product.variants.map(v => (
                                    <div key={v.id} className="flex justify-between text-sm text-slate-400 border-b border-white/5 py-2 last:border-0">
                                        <span>{v.name}</span>
                                        <span className="font-mono">{v.stock} un</span>
                                    </div>
                                ))
                            )}

                            <button className="mt-2 text-xs text-accent-400 hover:text-accent-300 flex items-center gap-1 font-medium">
                                <Plus className="h-3 w-3" /> Adicionar Variação
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
