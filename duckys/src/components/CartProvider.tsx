"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { MAX_QUANTITY } from "@/lib/pricing";
import type { CartLine, Selections } from "@/lib/types";
import DuckLoader from "./DuckLoader";

type State = { lines: CartLine[] };
type Action =
  | { type: "add"; line: CartLine }
  | { type: "qty"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => l.key === action.line.key);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.key === action.line.key
              ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + action.line.quantity) }
              : l,
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case "qty":
      return {
        lines: state.lines
          .map((l) => (l.key === action.key ? { ...l, quantity: Math.min(MAX_QUANTITY, action.quantity) } : l))
          .filter((l) => l.quantity > 0),
      };
    case "remove":
      return { lines: state.lines.filter((l) => l.key !== action.key) };
    case "clear":
      return { lines: [] };
    case "hydrate":
      return { lines: action.lines };
  }
}

type Toast = { id: number; text: string };

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  addToCart: (itemId: string, selections: Selections, quantity: number) => Promise<boolean>;
  setQty: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  /** Show the duck loader around any async work (min duration keeps the animation visible). */
  withLoader: <T>(work: () => Promise<T>, message?: string) => Promise<T>;
  toast: (text: string) => void;
  bump: number;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "duckys-cart-v1";
const MIN_LOADER_MS = 1400;

const SASSY_ADDED = [
  "Quack! {x} is in the bag 🛍️",
  "Great taste. Obviously. {x} added",
  "{x}? Iconic choice 💅",
  "Say less. {x} added 🦆",
  "{x} has joined the flock",
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<{ on: boolean; message?: string }>({ on: false });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bump, setBump] = useState(0);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {
      /* storage unavailable — start empty */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* ignore */
    }
  }, [state.lines]);

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const withLoader = useCallback(async <T,>(work: () => Promise<T>, message?: string) => {
    setLoading({ on: true, message });
    const started = Date.now();
    try {
      return await work();
    } finally {
      const wait = MIN_LOADER_MS - (Date.now() - started);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      setLoading({ on: false });
    }
  }, []);

  const addToCart = useCallback(
    async (itemId: string, selections: Selections, quantity: number) => {
      try {
        const line = await withLoader(async () => {
          const res = await fetch("/api/cart/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemId, selections }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Could not add item");
          return { ...data, quantity } as CartLine;
        });
        dispatch({ type: "add", line });
        setBump((b) => b + 1);
        const msg = SASSY_ADDED[Math.floor(Math.random() * SASSY_ADDED.length)];
        toast(msg.replace("{x}", line.name));
        return true;
      } catch (e) {
        toast(`Uh-oh 🦆 ${e instanceof Error ? e.message : "Something went wrong"}`);
        return false;
      }
    },
    [withLoader, toast],
  );

  const value = useMemo<CartCtx>(
    () => ({
      lines: state.lines,
      count: state.lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: state.lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0),
      open,
      setOpen,
      addToCart,
      setQty: (key, quantity) => dispatch({ type: "qty", key, quantity }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
      withLoader,
      toast,
      bump,
    }),
    [state.lines, open, addToCart, withLoader, toast, bump],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <DuckLoader show={loading.on} message={loading.message} />
      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.text}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
