# Concept Stock - Precision Inventory Management

<div align="center">

![Concept Stock Banner](https://img.shields.io/badge/Status-Live_Demo-emerald?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_•_Zustand_•_Tailwind_v4-blue?style=for-the-badge)

**Transforming mundane inventory control into a premium, fluid experience.**

[View Live Demo](https://concept-stock.vercel.app/)

</div>

## 🎨 Project Philosophy: "Precision Fluidity"

Most enterprise software feels utilitarian and clunky. **Concept Stock** was built to challenge that norm. The goal was to create an inventory management system that feels as premium as a consumer fintech app, without sacrificing density or utility.

**Key Design Pillars:**
*   **Glassmorphism & Depth:** Using `backdrop-blur` and layered opacities to create hierarchy without heavy borders.
*   **Micro-interactions:** Every hover, click, and transition gives immediate tactile feedback using `framer-motion`.
*   **Data Density:** Presenting complex data (SKUs, Stock Levels, Pricing) clearly on both desktop and mobile.

## 🛠️ Under the Hood (Technical Deep Dive)

This project isn't just a pretty UI. It solves specific engineering challenges encountered in modern web development.

### 1. Hybrid State Management (Zustand + Persistence)
Instead of the boilerplate-heavy Redux or the prop-drilling hell of Context API, I chose **Zustand**.
*   **Why?** It allowed for a clean separation of business logic (inventory actions) from UI components.
*   **Implementation:** The store (`inventoryStore.ts`) handles everything from CRUD operations to the "Daily Simulation" logic that degrades stock levels over time.

### 2. Solving the hydration Mismatch (Deterministic RNG)
**The Challenge:** The app generates mock data for the demo. Using `Math.random()` caused hydration errors because the server-rendered HTML didn't match the client-side random numbers.
**The Solution:** Implemented a seeded random number generator. This ensures that the "random" data is identical on every render pass, satisfying Next.js hydration requirements while still providing a varied dataset for the user.

### 3. Tailwind v4 & Safe Areas
Adopted the alpha/beta features of **Tailwind CSS v4** for a zero-runtime CSS-in-JS experience.
*   **Mobile Optimizations:** Extensive use of `pb-[env(safe-area-inset-bottom)]` to ensure the UI respects the Home Indicator on iOS devices (iPhone X/11/12+), preventing UI elements from being covered or unclickable.

## ✨ Key Features

*   **Real-time Dashboard:** Interactive charts (Recharts) showing revenue trends and stock distribution.
*   **Fluid Inventory Table:** Sortable, filterable, and responsive tables with expandable rows for product variants.
*   **Demo Mode Sandbox:** A complete, persistent simulation environment. Changes you make (adding products, editing profiles) persist for your session.
*   **Mobile-First Design:** A completely unique navigation experience for mobile users vs. desktop power users.

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 📂 Project Structure

```
src/
├── app/              # Next.js App Router Pages
├── components/
│   ├── dashboard/    # Charts & Stats components
│   ├── inventory/    # Complex Table & Drawer logic
│   └── layout/       # Shell, Sidebar, MobileNav
├── store/            # Zustand State Logic
└── lib/              # Utilities & Helpers
```

---

<div align="center">
Built by [Your Name] as a showcase of modern frontend capabilities.
</div>
