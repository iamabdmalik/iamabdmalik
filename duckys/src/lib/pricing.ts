import type { MenuItem, Selections } from "./types";

/** Change these to match the restaurant's real currency/fees. */
export const CURRENCY = "USD";
export const LOCALE = "en-US";
export const DELIVERY_FEE = 299; // cents
export const FREE_DELIVERY_OVER = 3000; // cents
export const TAX_RATE = 0.08;
export const MAX_QUANTITY = 20;

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY }).format(cents / 100);
}

/** Selections where every required single-choice group has its first option picked. */
export function defaultSelections(item: MenuItem): Selections {
  const sel: Selections = {};
  for (const g of item.optionGroups) {
    sel[g.id] = g.type === "single" && g.required ? [g.options[0].id] : [];
  }
  return sel;
}

export class SelectionError extends Error {}

/**
 * Validates selections against the item's option groups and returns a cleaned copy.
 * Throws SelectionError on anything invalid. Used by both the UI and the API so the
 * server never trusts prices sent from the browser.
 */
export function validateSelections(item: MenuItem, selections: Selections): Selections {
  const clean: Selections = {};
  for (const g of item.optionGroups) {
    const picked = Array.from(new Set(selections?.[g.id] ?? []));
    for (const id of picked) {
      if (!g.options.some((o) => o.id === id)) throw new SelectionError(`Unknown option "${id}" for ${g.name}`);
    }
    if (g.type === "single" && picked.length > 1) throw new SelectionError(`Pick only one ${g.name}`);
    if (g.required && picked.length === 0) throw new SelectionError(`Please choose a ${g.name}`);
    if (g.max !== undefined && picked.length > g.max) throw new SelectionError(`Max ${g.max} for ${g.name}`);
    // keep option order stable so identical choices produce identical cart keys
    clean[g.id] = g.options.filter((o) => picked.includes(o.id)).map((o) => o.id);
  }
  for (const key of Object.keys(selections ?? {})) {
    if (!item.optionGroups.some((g) => g.id === key)) throw new SelectionError(`Unknown option group "${key}"`);
  }
  return clean;
}

export function unitPrice(item: MenuItem, selections: Selections): number {
  let price = item.basePrice;
  for (const g of item.optionGroups) {
    for (const id of selections[g.id] ?? []) {
      price += g.options.find((o) => o.id === id)?.priceDelta ?? 0;
    }
  }
  return price;
}

export function summarize(item: MenuItem, selections: Selections): string {
  const parts: string[] = [];
  for (const g of item.optionGroups) {
    for (const id of selections[g.id] ?? []) {
      const o = g.options.find((x) => x.id === id);
      if (o && !(g.id === "meal" && o.id === "none") && !(g.id === "side" && o.id === "none")) parts.push(o.label);
    }
  }
  return parts.join(" · ");
}

export function lineKey(itemId: string, selections: Selections): string {
  const parts = Object.keys(selections)
    .sort()
    .map((k) => `${k}=${selections[k].join("+")}`);
  return [itemId, ...parts].join("|");
}

export function orderTotals(subtotal: number, orderType: "delivery" | "pickup") {
  const deliveryFee = orderType === "delivery" && subtotal < FREE_DELIVERY_OVER && subtotal > 0 ? DELIVERY_FEE : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, deliveryFee, tax, total: subtotal + deliveryFee + tax };
}
