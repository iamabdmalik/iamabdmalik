"use client";

import { useEffect, useState } from "react";
import DuckLogo from "./DuckLogo";

const TAGLINES = [
  "Food so good, it's quackin' illegal.",
  "We don't do average. We do Ducky's.",
  "Your diet called. We let it go to voicemail.",
  "Hot food. Cool duck. Zero apologies.",
];

const FLOATERS = ["🍕", "🍔", "🍟", "🍗", "🥤", "🍩", "🌶️", "🧀"];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % TAGLINES.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="floaters" aria-hidden="true">
        {FLOATERS.map((f, n) => (
          <span key={n} className="floater" style={{ "--n": n, left: `${4 + n * 12}%`, top: `${12 + ((n * 37) % 70)}%` } as React.CSSProperties}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="hero-copy">
        <p className="eyebrow">Est. with attitude 🦆</p>
        <h1 className="hero-title" aria-label="Ducky's">
          {"Ducky's".split("").map((ch, n) => (
            <span key={n} className="wave-letter" style={{ "--n": n } as React.CSSProperties} aria-hidden="true">
              {ch}
            </span>
          ))}
        </h1>
        <p className="tagline" key={i}>
          {TAGLINES[i]}
        </p>
        <div className="hero-ctas">
          <a href="#menu" className="btn btn-primary">
            See the menu 👀
          </a>
          <a href="#visit" className="btn btn-ghost">
            Find us
          </a>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="hero-duck">
          <DuckLogo size={300} shades />
        </div>
        <div className="speech">Hungry? Thought so. 💅</div>
        <svg className="waves" viewBox="0 0 600 60" preserveAspectRatio="none">
          <path d="M0 30 Q75 0 150 30 T300 30 T450 30 T600 30 V60 H0 Z" />
        </svg>
      </div>
    </section>
  );
}
