'use client';

import { useInventoryStore } from "@/store/inventoryStore";
import { motion } from "framer-motion";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { DollarSign, TrendingUp, Package } from "lucide-react";

import { CategoryDataPoint } from "@/types";

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
    const { analyticsData, products } = useInventoryStore();

    // Calculate category distribution
    const categoryData = products.reduce((acc: CategoryDataPoint[], product) => {
        const existing = acc.find(c => c.name === product.category);
        if (existing) {
            existing.value += product.totalStock;
        } else {
            acc.push({ name: product.category, value: product.totalStock });
        }
        return acc;
    }, []);

    // Calculate top stock items
    const topStockData = [...products]
        .sort((a, b) => b.totalStock - a.totalStock)
        .slice(0, 5)
        .map(p => ({ name: p.name, value: p.totalStock }));


    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white">Análises Avançadas</h1>
                <p className="text-slate-400">Visão detalhada do desempenho do seu negócio.</p>
            </motion.div>

            {/* Main Trend Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl border border-brand-800/50 bg-brand-900/50 backdrop-blur-sm"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Receita Mensal</h3>
                        <p className="text-sm text-slate-400">Crescimento de +12.5% no último período</p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <TrendingUp className="h-5 w-5" />
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                tick={{ fill: '#64748b' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                tick={{ fill: '#64748b' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => `R$${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#e2e8f0' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#6366f1"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Distribution */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl border border-brand-800/50 bg-brand-900/50 backdrop-blur-sm"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">Distribuição por Categoria</h3>
                    <div className="h-[250px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e2e8f0' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center mt-4">
                        {categoryData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-xs text-slate-400">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Top Products */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl border border-brand-800/50 bg-brand-900/50 backdrop-blur-sm"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">Top Produtos em Estoque</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topStockData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={100}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                                    cursor={{ fill: '#1e293b' }}
                                />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
