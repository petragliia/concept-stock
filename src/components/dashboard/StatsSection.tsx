'use client';

import { useInventoryStore } from '@/store/inventoryStore';
import { StatCard } from './StatCard';
import { Package, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';

export function StatsSection() {
    const { products } = useInventoryStore();

    const totalProducts = products.length;
    const totalStock = products.reduce((acc, p) => acc + p.totalStock, 0);
    const totalValue = products.reduce((acc, p) => acc + (p.basePrice * p.totalStock), 0);
    const lowStockCount = products.filter(p => p.status === 'LOW_STOCK' || p.status === 'OUT_OF_STOCK').length;

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Valor Total"
                value={`R$${totalValue.toLocaleString('pt-BR')}`}
                icon={DollarSign}
                trend={2.5}
                delay={0}
            />
            <StatCard
                title="Total de Produtos"
                value={totalProducts}
                icon={Package}
                trend={12}
                delay={0.1}
            />
            <StatCard
                title="Itens em Estoque"
                value={totalStock.toLocaleString('pt-BR')}
                icon={TrendingDown} // Just an icon example
                trend={-0.4}
                delay={0.2}
            />
            <StatCard
                title="Alertas de Estoque"
                value={lowStockCount}
                icon={AlertTriangle}
                status={lowStockCount > 0 ? 'warning' : 'success'}
                trend={lowStockCount > 2 ? 15 : -5} // Mock trend
                trendLabel="alertas ativos"
                delay={0.3}
            />
        </div>
    );
}
