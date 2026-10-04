"use client";

import { useEffect, useState } from "react";
import DuckLogo from "./DuckLogo";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count, setOpen, bump } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a href="#top" className="brand" aria-label="Ducky's home">
        <DuckLogo size={42} className="brand-duck" />
        <span className="brand-name">Ducky&apos;s</span>
      </a>
      <nav className="header-nav">
        <a href="#menu">Menu</a>
        <a href="#about">About</a>
        <a href="#visit">Visit</a>
      </nav>
      <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
        <span key={bump} className={bump ? "cart-icon jiggle" : "cart-icon"}>
          🛒
        </span>
        <span>Cart</span>
        {count > 0 && (
          <span key={`c${bump}`} className="cart-count pop">
            {count}
          </span>
        )}
      </button>
    </header>
  );
}
