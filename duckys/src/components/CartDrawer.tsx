"use client";

import { useEffect, useState } from "react";
import { FREE_DELIVERY_OVER, formatPrice, orderTotals } from "@/lib/pricing";
import type { Order, OrderType } from "@/lib/types";
import DuckLogo from "./DuckLogo";
import { useCart } from "./CartProvider";

type Step = "cart" | "checkout" | "done";

export default function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove, clear, withLoader, toast } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open && step === "done") setStep("cart");
  }, [open, step]);

  const totals = orderTotals(subtotal, orderType);

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const placed = await withLoader(async () => {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderType,
            customer: form,
            lines: lines.map((l) => ({ itemId: l.itemId, selections: l.selections, quantity: l.quantity })),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Could not place order");
        return data as Order;
      }, "Sending your order to the flock…");
      setOrder(placed);
      clear();
      setStep("done");
      toast("Order placed! The duck is on it 🦆🔥");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <>
      <div className={`drawer-backdrop${open ? " open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer${open ? " open" : ""}`} aria-hidden={!open} aria-label="Your cart">
        <div className="drawer-head">
          {step === "checkout" ? (
            <button className="link-btn" onClick={() => setStep("cart")}>
              ← Back
            </button>
          ) : (
            <h3>Your bag 🛍️</h3>
          )}
          <button className="modal-x static" onClick={() => setOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        {step === "done" && order ? (
          <div className="done">
            <div className="done-duck">
              <DuckLogo size={140} shades />
            </div>
            <h3>Order {order.id} is in!</h3>
            <p>
              {order.orderType === "delivery"
                ? `Arriving in about ${order.etaMinutes} minutes. Look cute.`
                : `Ready for pickup in about ${order.etaMinutes} minutes.`}
            </p>
            <ul className="done-lines">
              {order.lines.map((l, n) => (
                <li key={n}>
                  <span>
                    {l.quantity}× {l.name}
                  </span>
                  <span>{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
              <li className="total">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </li>
            </ul>
            <button className="btn btn-primary" onClick={() => setOpen(false)}>
              Back to the menu
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="empty-cart">
            <div className="sad-duck">
              <DuckLogo size={110} />
            </div>
            <p>Your bag is empty. The duck is disappointed.</p>
            <button className="btn btn-primary" onClick={() => setOpen(false)}>
              Fix that 👉
            </button>
          </div>
        ) : step === "cart" ? (
          <>
            <ul className="cart-lines">
              {lines.map((l) => (
                <li key={l.key} className="cart-line">
                  <span className="cl-emoji">{l.emoji}</span>
                  <div className="cl-info">
                    <strong>{l.name}</strong>
                    {l.summary && <small>{l.summary}</small>}
                    <div className="qty small">
                      <button onClick={() => setQty(l.key, l.quantity - 1)} aria-label="Decrease">
                        −
                      </button>
                      <span key={l.quantity} className="pop">
                        {l.quantity}
                      </span>
                      <button onClick={() => setQty(l.key, l.quantity + 1)} aria-label="Increase">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cl-right">
                    <span>{formatPrice(l.unitPrice * l.quantity)}</span>
                    <button className="link-btn" onClick={() => remove(l.key)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              {subtotal < FREE_DELIVERY_OVER && (
                <div className="free-bar">
                  <span>Add {formatPrice(FREE_DELIVERY_OVER - subtotal)} more for free delivery 🛵</span>
                  <i style={{ width: `${(subtotal / FREE_DELIVERY_OVER) * 100}%` }} />
                </div>
              )}
              <div className="row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <button className="btn btn-primary block" onClick={() => setStep("checkout")}>
                Checkout →
              </button>
            </div>
          </>
        ) : (
          <form className="checkout" onSubmit={placeOrder}>
            <div className="seg-toggle">
              {(["delivery", "pickup"] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  className={orderType === t ? "on" : ""}
                  onClick={() => setOrderType(t)}
                >
                  {t === "delivery" ? "🛵 Delivery" : "🏃 Pickup"}
                </button>
              ))}
            </div>
            <label>
              Name
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              Phone
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
            {orderType === "delivery" && (
              <label>
                Address
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </label>
            )}
            <label>
              Notes for the kitchen <small>(optional)</small>
              <input
                value={form.notes}
                placeholder="Extra napkins, no onions, etc."
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>

            <div className="totals">
              <div className="row">
                <span>Subtotal</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              {orderType === "delivery" && (
                <div className="row">
                  <span>Delivery</span>
                  <span>{totals.deliveryFee ? formatPrice(totals.deliveryFee) : "Free 🎉"}</span>
                </div>
              )}
              <div className="row">
                <span>Tax</span>
                <span>{formatPrice(totals.tax)}</span>
              </div>
              <div className="row grand">
                <span>Total</span>
                <strong>{formatPrice(totals.total)}</strong>
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button className="btn btn-primary block" type="submit">
              Place order · {formatPrice(totals.total)}
            </button>
            <p className="fine">Pay on {orderType === "delivery" ? "delivery" : "pickup"}. Online payments coming soon.</p>
          </form>
        )}
      </aside>
    </>
  );
}
