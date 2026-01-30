import { create } from 'zustand';
import { Product, Toast, AnalyticsDataPoint } from '@/types';

// Deterministic Random Number Generator (Linear Congruential Generator)
class SeededRandom {
    private seed: number;
    constructor(seed: number) {
        this.seed = seed;
    }
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
}

const rng = new SeededRandom(12345); // Fixed seed

// Mock Data Generator (Deterministic)
const generateMockProducts = (count: number): Product[] => {
    const categories = ['Eletrônicos', 'Casa & Jardim', 'Vestuário', 'Acessórios', 'Esportes'];
    return Array.from({ length: count }).map((_, i) => {
        const stock = Math.floor(rng.next() * 200);
        return {
            id: `prod-${i + 1}`,
            name: `Produto ${i + 1}`,
            category: categories[Math.floor(rng.next() * categories.length)],
            basePrice: Math.floor(rng.next() * 1000) + 10,
            totalStock: stock,
            status: stock === 0 ? 'OUT_OF_STOCK' : stock < 20 ? 'LOW_STOCK' : 'IN_STOCK',
            variants: [],
            burnRate: Math.floor((rng.next() * 5) + 0.1),
            lastUpdated: new Date().toISOString(),
        };
    });
};

// ... previous imports

interface UserProfile {
    name: string;
    email: string;
    role: string;
    avatar: string;
}

interface UserSettings {
    notifications: {
        email: boolean;
        push: boolean;
        lowStock: boolean;
        weeklyReport: boolean;
    };
    theme: 'dark' | 'light' | 'system';
    language: 'pt-BR' | 'en-US';
}

const initialUser: UserProfile = {
    name: 'João Vitor',
    email: 'joao@concept.digital',
    role: 'Administrador',
    avatar: 'https://github.com/shadcn.png'
};

const initialSettings: UserSettings = {
    notifications: {
        email: true,
        push: false,
        lowStock: true,
        weeklyReport: true
    },
    theme: 'dark',
    language: 'pt-BR'
};

// Mock Analytics Data Generator
const generateAnalyticsData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    return months.map(month => ({
        name: month,
        value: Math.floor(Math.random() * 50000) + 10000,
        orders: Math.floor(Math.random() * 500) + 50,
    }));
};

interface InventoryState {
    products: Product[];
    toasts: Toast[];
    user: UserProfile;
    settings: UserSettings;
    analyticsData: AnalyticsDataPoint[]; // For charts

    // Actions
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    addToast: (toast: Omit<Toast, 'id'>) => void;
    dismissToast: (id: string) => void;
    runDailySimulation: () => void;

    // Settings Actions
    updateUser: (updates: Partial<UserProfile>) => void;
    updateSettings: (updates: Partial<UserSettings>) => void;
    toggleNotification: (key: keyof UserSettings['notifications']) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
    products: generateMockProducts(20),
    toasts: [],
    user: initialUser,
    settings: initialSettings,
    analyticsData: generateAnalyticsData(),

    addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
    updateProduct: (id, updates) =>
        set((state) => ({
            products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
    deleteProduct: (id) =>
        set((state) => ({
            products: state.products.filter((p) => p.id !== id),
        })),
    addToast: (toast) => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
        setTimeout(() => {
            set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 5000)
    },
    dismissToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    runDailySimulation: () =>
        set((state) => {
            const newProducts = state.products.map((p) => {
                const newStock = Math.max(0, p.totalStock - p.burnRate);
                let status = p.status;
                if (newStock === 0) status = 'OUT_OF_STOCK';
                else if (newStock < 20) status = 'LOW_STOCK';

                return { ...p, totalStock: Math.floor(newStock), status };
            });
            return { products: newProducts };
        }),

    updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
    updateSettings: (updates) => set((state) => ({ settings: { ...state.settings, ...updates } })),
    toggleNotification: (key) => set((state) => ({
        settings: {
            ...state.settings,
            notifications: {
                ...state.settings.notifications,
                [key]: !state.settings.notifications[key]
            }
        }
    }))
}));

