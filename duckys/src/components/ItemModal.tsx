"use client";

import { useEffect, useState } from "react";
import { MAX_QUANTITY, defaultSelections, formatPrice, unitPrice } from "@/lib/pricing";
import type { MenuItem, OptionGroup } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function ItemModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const [selections, setSelections] = useState(() => defaultSelections(item));
  const [qty, setQty] = useState(1);
  const [closing, setClosing] = useState(false);
  const { addToCart } = useCart();

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 220);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (g: OptionGroup, optionId: string) => {
    setSelections((s) => {
      const cur = s[g.id] ?? [];
      if (g.type === "single") return { ...s, [g.id]: [optionId] };
      if (cur.includes(optionId)) return { ...s, [g.id]: cur.filter((x) => x !== optionId) };
      if (g.max && cur.length >= g.max) return s;
      return { ...s, [g.id]: [...cur, optionId] };
    });
  };

  const price = unitPrice(item, selections) * qty;

  const submit = async () => {
    onClose(); // close instantly so the duck loader takes centre stage
    await addToCart(item.id, selections, qty);
  };

  return (
    <div className={`modal-backdrop${closing ? " closing" : ""}`} onClick={close}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={close} aria-label="Close">
          ✕
        </button>
        <div className="modal-art">
          <span>{item.emoji}</span>
        </div>
        <div className="modal-content">
          <h3 id="modal-title">{item.name}</h3>
          <p className="modal-desc">{item.description}</p>

          {item.optionGroups.map((g) => (
            <fieldset key={g.id} className="opt-group">
              <legend>
                {g.name}
                <small>{g.required ? "Required" : g.max ? `Optional · up to ${g.max}` : "Optional"}</small>
              </legend>
              <div className={`opts${g.id === "size" ? " opts-size" : ""}`}>
                {g.options.map((o) => {
                  const on = selections[g.id]?.includes(o.id);
                  return (
                    <label key={o.id} className={`opt${on ? " on" : ""}`}>
                      <input
                        type={g.type === "single" ? "radio" : "checkbox"}
                        name={`${item.id}-${g.id}`}
                        checked={!!on}
                        onChange={() => toggle(g, o.id)}
                      />
                      <span className="opt-label">
                        {o.label}
                        {o.note && <em>{o.note}</em>}
                      </span>
                      {o.priceDelta > 0 && <span className="opt-price">+{formatPrice(o.priceDelta)}</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="modal-foot">
          <div className="qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              −
            </button>
            <span key={qty} className="pop">
              {qty}
            </span>
            <button onClick={() => setQty((q) => Math.min(MAX_QUANTITY, q + 1))} aria-label="Increase quantity">
              +
            </button>
          </div>
          <button className="btn btn-primary add-big" onClick={submit}>
            Add to cart · <span key={price} className="pop">{formatPrice(price)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
