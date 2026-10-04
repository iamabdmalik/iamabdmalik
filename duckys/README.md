# Ducky's 🦆

Restaurant website + online ordering for **Ducky's**: a menu with options (sizes, crusts, flavours, add-ons), a cart and checkout, and a duck-and-centipede loading animation.

Built with **Next.js (App Router) + TypeScript**. The frontend and backend live in this one project. The backend is Next.js API routes, which Vercel runs as serverless functions.

## Run locally

```bash
cd duckys
npm install
npm run dev        # http://localhost:3000
```

`npm run build` makes a production build and `npm run typecheck` runs TypeScript.

## Project layout

```
src/
  app/
    page.tsx              home page (hero, menu, footer, cart)
    globals.css           all styles and animations
    api/
      menu/               GET  /api/menu          full menu as JSON
      cart/quote/         POST /api/cart/quote    checks an item's options, returns the server price
      orders/             POST /api/orders        checks the cart, works out totals, creates the order
      orders/[id]/        GET  /api/orders/:id    looks up an order
  components/
    DuckLoader.tsx        the duck + centipede loader
    DuckLogo.tsx          placeholder duck mascot (swap in the real logo here)
    Menu.tsx / ItemModal.tsx / CartDrawer.tsx / CartProvider.tsx / Hero.tsx …
  lib/
    menu.ts               ← THE MENU (temporary items, edit this)
    pricing.ts            currency, delivery fee, tax, price rules (shared by the UI and the API)
    orders.ts             order checks and storage
```

## Editing the menu

All items are in `src/lib/menu.ts`. Each item has a base price **in cents** and a list of option groups:

- `type: "single"` means pick exactly one (size, crust, sauce)
- `type: "multi"` means pick several, with an optional `max` (toppings, dips)
- each option has a `priceDelta`, also in cents, added to the base price

Currency, delivery fee, the free-delivery minimum and tax are set at the top of `src/lib/pricing.ts`.

The server works out every price again from `menu.ts`, so a price sent from the browser is never trusted.

## Before going live

- **Orders are kept in memory.** On Vercel they don't persist and aren't shared between function instances. To fix this, connect a database (Vercel Postgres/Neon, Supabase or Upstash) and change `saveOrder` / `findOrder` in `src/lib/orders.ts`.
- Swap `DuckLogo.tsx` and `public/favicon.svg` for the real logo.
- Swap the item emojis for real food photos.
- Add real contact details, an address and opening hours in `Footer.tsx`.
- Payment is "pay on delivery/pickup" for now. Stripe or a local payment gateway can be added later.

## Deploy to Vercel

1. In Vercel, go to **Add New → Project** and import the `iamabdmalik/iamabdmalik` GitHub repo.
2. Set **Root Directory** to `duckys`. This matters because the app lives in a subfolder.
3. Vercel detects Next.js on its own. Click **Deploy**.

Each push to the connected branch then deploys again automatically.
