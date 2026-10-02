"use client";

import { useEffect, useState } from "react";
import DuckLogo from "./DuckLogo";

const SEGMENTS = 18;

const LINES = [
  "Quacking up your order…",
  "Waddling to the kitchen…",
  "Convincing the centipede to hurry…",
  "Fluffing feathers…",
  "Adding extra sass…",
];

/** Full-screen loader: Ducky in the middle, a centipede marching laps around them. */
export default function DuckLoader({ show, message }: { show: boolean; message?: string }) {
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (!show) return;
    setLine(Math.floor(Math.random() * LINES.length));
    const t = setInterval(() => setLine((l) => (l + 1) % LINES.length), 1100);
    return () => clearInterval(t);
  }, [show]);

  if (!show) return null;

  return (
    <div className="loader-overlay" role="status" aria-live="polite">
      <div className="loader-stage">
        <div className="orbit" aria-hidden="true">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span
              key={i}
              className={`seg${i === 0 ? " seg-head" : ""}${i === SEGMENTS - 1 ? " seg-tail" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="seg-body">
                <i className="leg leg-l" />
                <i className="leg leg-r" />
                {i === 0 && (
                  <>
                    <i className="eye eye-l" />
                    <i className="eye eye-r" />
                    <i className="antenna antenna-l" />
                    <i className="antenna antenna-r" />
                  </>
                )}
              </span>
            </span>
          ))}
        </div>
        <div className="loader-duck">
          <DuckLogo size={110} />
        </div>
      </div>
      <p className="loader-text" key={message ?? line}>
        {message ?? LINES[line]}
      </p>
    </div>
  );
}
