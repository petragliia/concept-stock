export default function LowStockAlert({ count }: { count: number }) {
    if (count === 0) return null;

    return (
        <div className="bg-red-500 text-white p-3 text-center font-bold fixed top-0 left-0 right-0 z-50 shadow-md">
            ⚠️ Attention: {count} product{count > 1 ? "s" : ""} below 5 units!
        </div>
    );
}
