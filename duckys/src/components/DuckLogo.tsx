/**
 * Placeholder Ducky's mascot. Replace with the real logo (e.g. /public/logo.svg)
 * once the brand assets arrive — every usage goes through this component.
 */
export default function DuckLogo({
  size = 64,
  shades = false,
  className,
}: {
  size?: number;
  shades?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Ducky's duck"
    >
      {/* tail */}
      <path d="M22 74 Q8 52 30 60 Z" fill="var(--duck-dark)" />
      {/* body */}
      <ellipse cx="58" cy="80" rx="40" ry="27" fill="var(--duck)" />
      {/* wing */}
      <path className="duck-wing" d="M36 74 Q56 60 74 76 Q58 94 36 84 Z" fill="var(--duck-dark)" />
      {/* head */}
      <circle cx="80" cy="44" r="24" fill="var(--duck)" />
      {/* tuft */}
      <path d="M76 21 Q78 10 86 14 Q80 16 82 22 Z" fill="var(--duck-dark)" />
      {/* beak */}
      <path d="M99 44 Q119 44 114 53 Q106 59 97 52 Z" fill="var(--beak)" />
      <path d="M99 50 Q107 52 113 51" stroke="var(--beak-dark)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* cheek */}
      <circle cx="90" cy="54" r="5" fill="#ff8fa3" opacity=".55" />
      {shades ? (
        <g>
          <path d="M70 37 H101" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="74" y="35" width="13" height="9" rx="4" fill="var(--ink)" />
          <rect x="90" y="35" width="11" height="9" rx="4" fill="var(--ink)" />
          <path d="M77 37 L81 37" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity=".8" />
        </g>
      ) : (
        <g className="duck-eye">
          <circle cx="87" cy="39" r="4.6" fill="var(--ink)" />
          <circle cx="88.6" cy="37.6" r="1.6" fill="#fff" />
        </g>
      )}
    </svg>
  );
}
