const WORDS = ["Fresh", "Sassy", "Quackin' hot", "Made to order", "No fowl play", "Extra cheese, always"];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...row, ...row].map((w, n) => (
          <span key={n}>
            {w} <b>🦆</b>
          </span>
        ))}
      </div>
    </div>
  );
}
