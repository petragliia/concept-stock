"use client";

import { useState } from "react";

interface QuickAddFABProps {
    onAdd: (name: string, sku: string, qty: number) => void;
}

export default function QuickAddFAB({ onAdd }: QuickAddFABProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [qty, setQty] = useState("10");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && sku) {
            onAdd(name, sku, parseInt(qty) || 0);
            setName("");
            setSku("");
            setQty("10");
            setIsOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl font-bold hover:bg-blue-700 transition active:scale-95"
            >
                +
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Add Product</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border p-2 rounded"
                                autoFocus
                            />
                            <input
                                type="text"
                                placeholder="SKU"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                className="border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                className="border p-2 rounded"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
