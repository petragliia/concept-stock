import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { ToastSystem } from "@/components/ui/ToastSystem";
import { PortfolioButton } from "@/components/layout/PortfolioButton";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Concept Stock | Precision Inventory",
    description: "High-fidelity inventory management system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={cn("bg-brand-950 text-slate-50 antialiased selection:bg-accent-500/30")}>
                <Shell>{children}</Shell>
                <PortfolioButton />
                <ToastSystem />
            </body>
        </html>
    );
}
