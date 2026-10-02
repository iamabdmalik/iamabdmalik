import { randomUUID } from "crypto";
import { getItem } from "./menu";
import { MAX_QUANTITY, SelectionError, orderTotals, summarize, unitPrice, validateSelections } from "./pricing";
import type { Order, OrderRequest } from "./types";

/*
 * In-memory order store. Good enough for the template/demo, but on Vercel each
 * serverless instance has its own memory, so orders are NOT persisted.
 * Swap this for a real database (Vercel Postgres / Neon, Supabase, Upstash Redis…)
 * before going live — only `saveOrder` and `findOrder` need to change.
 */
const globalStore = globalThis as unknown as { __duckysOrders?: Map<string, Order> };
const orders = (globalStore.__duckysOrders ??= new Map<string, Order>());

export class OrderError extends Error {}

export function buildOrder(req: OrderRequest): Order {
  const name = req?.customer?.name?.trim();
  const phone = req?.customer?.phone?.trim();
  const address = req?.customer?.address?.trim();
  const orderType = req?.orderType;

  if (orderType !== "delivery" && orderType !== "pickup") throw new OrderError("Choose delivery or pickup");
  if (!name || name.length > 80) throw new OrderError("Please enter your name");
  if (!phone || !/^[+\d][\d\s()-]{6,19}$/.test(phone)) throw new OrderError("Please enter a valid phone number");
  if (orderType === "delivery" && (!address || address.length < 5)) throw new OrderError("We need an address to deliver to");
  if (!Array.isArray(req.lines) || req.lines.length === 0) throw new OrderError("Your cart is empty");
  if (req.lines.length > 50) throw new OrderError("That's a lot of food. Call us for catering!");

  const lines = req.lines.map((l) => {
    const item = getItem(l.itemId);
    if (!item) throw new OrderError(`Item "${l.itemId}" is no longer on the menu`);
    const qty = Number(l.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QUANTITY) throw new OrderError(`Invalid quantity for ${item.name}`);
    let selections;
    try {
      selections = validateSelections(item, l.selections);
    } catch (e) {
      throw new OrderError(e instanceof SelectionError ? `${item.name}: ${e.message}` : "Invalid options");
    }
    const price = unitPrice(item, selections);
    return {
      itemId: item.id,
      name: item.name,
      summary: summarize(item, selections),
      quantity: qty,
      unitPrice: price,
      lineTotal: price * qty,
    };
  });

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const totals = orderTotals(subtotal, orderType);

  return {
    id: "DK-" + randomUUID().slice(0, 8).toUpperCase(),
    createdAt: new Date().toISOString(),
    status: "received",
    orderType,
    customer: {
      name,
      phone,
      address: orderType === "delivery" ? address : undefined,
      notes: req.customer.notes?.trim().slice(0, 300) || undefined,
    },
    lines,
    ...totals,
    etaMinutes: orderType === "delivery" ? 35 : 20,
  };
}

export async function saveOrder(order: Order): Promise<void> {
  orders.set(order.id, order);
}

export async function findOrder(id: string): Promise<Order | undefined> {
  return orders.get(id);
}
