"use client";

import { useState, useEffect } from "react";

export interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    qty: number;
}

const STORAGE_KEY = "concept-stock-data";

export function useInventory() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse inventory data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever items change (but only after initial load)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (name: string, sku: string, initialQty: number) => {
        const newItem: InventoryItem = {
            id: crypto.randomUUID(),
            name,
            sku,
            qty: initialQty,
        };
        setItems((prev) => [...prev, newItem]);
    };

    const updateStock = (id: string, delta: number) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(0, item.qty + delta);
                    return { ...item, qty: newQty };
                }
                return item;
            })
        );
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return {
        items,
        addItem,
        updateStock,
        removeItem,
        isLoaded,
    };
}
