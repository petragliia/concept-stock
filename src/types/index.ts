export type InventoryStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface ProductVariant {
    id: string;
    sku: string;
    name: string; // e.g., "Size: M", "Color: Red"
    stock: number;
    price: number;
}

export interface AnalyticsDataPoint {
    name: string;
    value: number;
    orders: number;
}

export interface CategoryDataPoint {
    name: string;
    value: number;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    basePrice: number;
    totalStock: number;
    status: InventoryStatus;
    variants: ProductVariant[];
    burnRate: number; // Simulated units sold per day
    lastUpdated: string; // ISO Date
}

export interface Toast {
    id: string;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'warning' | 'info';
}
