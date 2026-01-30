import { InventoryItem } from "@/hooks/useInventory";
import InventoryRow from "./InventoryRow";

interface InventoryTableProps {
    items: InventoryItem[];
    onUpdateStock: (id: string, delta: number) => void;
}

export default function InventoryTable({ items, onUpdateStock }: InventoryTableProps) {
    if (items.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                No products yet. Use the + button to add one.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {items.map((item) => (
                <InventoryRow key={item.id} item={item} onUpdateStock={onUpdateStock} />
            ))}
        </div>
    );
}
