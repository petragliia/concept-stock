import { InventoryItem } from "@/hooks/useInventory";

interface InventoryRowProps {
    item: InventoryItem;
    onUpdateStock: (id: string, delta: number) => void;
}

export default function InventoryRow({ item, onUpdateStock }: InventoryRowProps) {
    const isLowStock = item.qty < 5;

    return (
        <div className={`p-4 border-b flex items-center justify-between ${isLowStock ? "bg-red-50" : "bg-white"}`}>
            <div className="flex-1">
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="text-gray-400 text-sm">SKU: {item.sku}</div>
                <div className={`text-sm font-medium mt-1 ${isLowStock ? "text-red-600" : "text-green-600"}`}>
                    {isLowStock ? "Low Stock" : "In Stock"}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => onUpdateStock(item.id, -1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 active:bg-gray-400 transition"
                >
                    -
                </button>
                <span className={`text-xl font-bold w-12 text-center ${isLxowStock ? "text-red-600" : ""}`}>
                    {item.qty}
                </span>
                <button
                    onClick={() => onUpdateStock(item.id, 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold hover:bg-blue-200 active:bg-blue-300 transition"
                >
                    +
                </button>
            </div>
        </div>
    );
}
