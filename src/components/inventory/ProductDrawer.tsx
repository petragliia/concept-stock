'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus } from 'lucide-react';
import { useState } from 'react';
import { useInventoryStore } from '@/store/inventoryStore';

interface ProductDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ProductDrawer({ isOpen, onClose }: ProductDrawerProps) {
    const { addProduct, addToast } = useInventoryStore();

    // Local form state
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: 'Eletrônicos',
        price: '',
        stock: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation logic
        if (!formData.name || !formData.price || !formData.stock) {
            return;
        }

        addProduct({
            id: `new-${Date.now()}`,
            name: formData.name,
            category: formData.category,
            basePrice: Number(formData.price),
            totalStock: Number(formData.stock),
            status: Number(formData.stock) < 20 ? 'LOW_STOCK' : 'IN_STOCK',
            variants: [],
            burnRate: 1.5,
            lastUpdated: new Date().toISOString()
        });

        addToast({
            title: "Produto Adicionado",
            description: `${formData.name} foi adicionado ao estoque.`,
            type: 'success'
        });

        onClose();
        // Reset form
        setFormData({ name: '', sku: '', category: 'Eletrônicos', price: '', stock: '' });
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
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-brand-950/80 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-[200] w-full md:max-w-md bg-brand-900 border-l border-brand-800 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-800/50">
                            <h2 className="text-xl font-bold text-white">Adicionar Novo Produto</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white hover:bg-brand-800 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <form id="product-form" onSubmit={handleSubmit} className="space-y-6 pb-32">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Nome do Produto</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder:text-slate-600"
                                        placeholder="ex: Cadeira Ergonômica"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">SKU</label>
                                        <input
                                            type="text"
                                            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-500 transition-all placeholder:text-slate-600"
                                            placeholder="Automático"
                                            value={formData.sku}
                                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Categoria</label>
                                        <select
                                            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-500 transition-all"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option>Eletrônicos</option>
                                            <option>Casa & Jardim</option>
                                            <option>Vestuário</option>
                                            <option>Escritório</option>
                                            <option>Acessórios</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Preço (R$)</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-500 transition-all placeholder:text-slate-600"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Estoque Inicial</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-500 transition-all placeholder:text-slate-600"
                                            placeholder="0"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Variations Placeholder */}
                                <div className="pt-4 border-t border-brand-800/50">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-medium text-slate-400">Variações (Opcional)</h3>
                                        <button type="button" className="text-xs text-accent-400 hover:text-accent-300 flex items-center gap-1">
                                            <Plus className="h-3 w-3" /> Add Opção
                                        </button>
                                    </div>
                                    <div className="p-4 rounded-lg bg-brand-950/50 border border-dashed border-brand-800 text-center text-xs text-slate-600">
                                        Nenhuma variação adicionada.
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-brand-800/50 bg-brand-950/30 pb-24 md:pb-6">
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3.5 rounded-lg border border-brand-700 text-slate-300 font-medium hover:bg-brand-800/50 transition-colors active:scale-95 touch-manipulation"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    form="product-form"
                                    className="flex-1 px-4 py-3.5 rounded-lg bg-accent-600 text-white font-medium hover:bg-accent-500 shadow-lg shadow-accent-900/20 transition-all flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
                                >
                                    <Save className="h-4 w-4" />
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
