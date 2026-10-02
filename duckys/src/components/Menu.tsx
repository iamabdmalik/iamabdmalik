"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { defaultSelections, formatPrice, unitPrice } from "@/lib/pricing";
import type { Category, MenuItem, Tag } from "@/lib/types";
import { useCart } from "./CartProvider";
import ItemModal from "./ItemModal";

const TAG_LABEL: Record<Tag, string> = {
  bestseller: "🔥 Bestseller",
  spicy: "🌶️ Spicy",
  veg: "🌱 Veg",
  new: "✨ New",
};

export default function Menu({ categories, items }: { categories: Category[]; items: MenuItem[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.name} ${i.description} ${i.tags.join(" ")}`.toLowerCase().includes(q));
  }, [items, query]);

  // Scroll-spy: highlight the category currently in view
  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("cat-", ""));
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [categories, filtered]);

  // Card reveal-on-scroll
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".card:not(.in)");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [filtered]);

  const quickAdd = (item: MenuItem) => {
    if (item.optionGroups.length === 0) addToCart(item.id, {}, 1);
    else setSelected(item);
  };

  return (
    <section className="menu" id="menu">
      <div className="menu-head">
        <h2 className="section-title">
          The Menu <span className="title-duck">🦆</span>
        </h2>
        <p className="section-sub">Pick something. Pick everything. We&apos;re not your mum.</p>
        <label className="search">
          <span aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Craving something? (try “spicy”)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <CategoryTabs categories={categories} active={active} />

      {categories.map((cat) => {
        const catItems = filtered.filter((i) => i.categoryId === cat.id);
        if (catItems.length === 0) return null;
        return (
          <div key={cat.id} id={`cat-${cat.id}`} className="category">
            <div className="category-head">
              <span className="category-emoji">{cat.emoji}</span>
              <div>
                <h3>{cat.name}</h3>
                <p>{cat.blurb}</p>
              </div>
            </div>
            <div className="grid">
              {catItems.map((item, n) => (
                <article
                  key={item.id}
                  className="card"
                  style={{ "--d": `${(n % 3) * 90}ms` } as React.CSSProperties}
                  onClick={() => setSelected(item)}
                >
                  <div className="card-art">
                    <span className="card-emoji">{item.emoji}</span>
                  </div>
                  <div className="card-body">
                    <div className="tags">
                      {item.tags.map((t) => (
                        <span key={t} className={`tag tag-${t}`}>
                          {TAG_LABEL[t]}
                        </span>
                      ))}
                    </div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <div className="card-foot">
                      <span className="price">
                        {item.optionGroups.some((g) => g.options.some((o) => o.priceDelta > 0)) && <small>from </small>}
                        {formatPrice(unitPrice(item, defaultSelections(item)))}
                      </span>
                      <button
                        className="add-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          quickAdd(item);
                        }}
                        aria-label={`Add ${item.name}`}
                      >
                        Add <span>+</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="empty">
          <span>🦆❓</span>
          <p>Nothing matches “{query}”. The duck is confused. Try something else?</p>
        </div>
      )}

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function CategoryTabs({ categories, active }: { categories: Category[]; active?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = wrap.current?.querySelector<HTMLAnchorElement>(`[data-cat="${active}"]`);
    if (!el || !wrap.current) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
    const { scrollLeft, clientWidth } = wrap.current;
    if (el.offsetLeft < scrollLeft || el.offsetLeft + el.offsetWidth > scrollLeft + clientWidth) {
      wrap.current.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div className="tabs-bar">
      <div className="tabs" ref={wrap}>
        <span className="tab-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} />
        {categories.map((c) => (
          <a key={c.id} href={`#cat-${c.id}`} data-cat={c.id} className={`tab${c.id === active ? " active" : ""}`}>
            <span>{c.emoji}</span> {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}
