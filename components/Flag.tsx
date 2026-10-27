import type { CountryIso } from "@/lib/regions";
import { cn } from "@/lib/utils";

/**
 * U.S. and Canadian flags, drawn as inline SVG.
 *
 * Not emoji, for the reason in components/CountryCode.tsx: Windows ships no
 * flag glyphs, so a regional-indicator pair renders as two bare capitals on
 * most of this audience's machines. An SVG draws the same everywhere.
 *
 * Both are set on a 3:2 field rather than their official proportions (19:10
 * and 2:1) so they sit as a matched pair in a switcher or a two-column card.
 * At 20px wide the difference is invisible; a mismatched pair is not.
 *
 * Decorative by default. The country is always named in text beside the flag,
 * so the flag itself is hidden from assistive technology.
 */
export default function Flag({ code, className }: { code: CountryIso; className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "inline-block h-[0.95rem] w-auto shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_hsl(var(--slate-200))]",
        className
      )}
    >
      {code === "US" ? <UnitedStates /> : <Canada />}
    </svg>
  );
}

const STRIPE = 20 / 13;

function UnitedStates() {
  return (
    <>
      <rect width="30" height="20" fill="#FFFFFF" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 2 * STRIPE} width="30" height={STRIPE} fill="#B31942" />
      ))}
      <rect width="12" height={STRIPE * 7} fill="#0A3161" />
      {/* Stars as a dot field. Fifty points at this size read as noise; a
          staggered grid reads as the canton. */}
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: row % 2 ? 4 : 5 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={1.3 + col * 2.35 + (row % 2 ? 1.17 : 0)}
            cy={1.45 + row * 2.45}
            r="0.45"
            fill="#FFFFFF"
          />
        ))
      )}
    </>
  );
}

/* Leaf outline from the Flag of Canada as published on Wikimedia Commons
   (public domain), drawn on a 9600x4800 field with the leaf centred on x=4800. */
const MAPLE_LEAF =
  "M4890 4430l-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z";

function Canada() {
  return (
    <>
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect width="7.5" height="20" fill="#D52B1E" />
      <rect x="22.5" width="7.5" height="20" fill="#D52B1E" />
      <path
        d={MAPLE_LEAF}
        fill="#D52B1E"
        transform="translate(15 10.2) scale(0.0031) translate(-4800 -2415)"
      />
    </>
  );
}
