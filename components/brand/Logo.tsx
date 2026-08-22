import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The ADAS Globus Pro lockup — the client's artwork, exactly as supplied.
 *
 * This is the full stacked lockup: AGP monogram, ADAS GLOBUS PRO beneath it,
 * then the ruled FINANCE · TALENT · GROWTH line. Nothing is rearranged,
 * re-typeset or recomposed.
 *
 * An earlier revision split the monogram out and set it beside the wordmark, to
 * buy the wordmark more height in the header. The client asked for the artwork
 * as drawn instead, so the header is sized around the lockup rather than the
 * lockup being reshaped to fit the header: it runs at 64px tall on desktop
 * inside a 96px bar. Do not shrink the header without checking what happens to
 * the tagline rule — it is the first thing to become unreadable.
 *
 * ── Why `tone` matters ──────────────────────────────────────────────────────
 * The wordmark and tagline are navy ink (#041B3C) and the site's dark bands are
 * navy (#041C3E) — the same colour to within a rounding error. On a dark
 * surface the lower two thirds of this lockup do not merely look weak, they are
 * invisible.
 *
 * There is no light-ink version of the artwork, and inverting it would change
 * the client's colours. So `tone="dark"` sets the real lockup on a white plate,
 * which is the only option that keeps the artwork intact.
 */

const SIZES = {
  sm: "h-11",
  md: "h-16",
  lg: "h-20",
} as const;

export default function Logo({
  size = "md",
  tone = "light",
  className,
  priority = false,
}: {
  size?: keyof typeof SIZES;
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  /*
    Opaque on the plate, alpha everywhere else. The plate version has to be
    flattened: the artwork's transparent counters would otherwise let the navy
    behind it show through the letterforms and undo the point of the plate.
  */
  const src = tone === "dark" ? "/assets/logo.png" : "/assets/logo-alpha.png";

  const image = (
    <Image
      src={src}
      alt="ADAS Globus Pro — Finance, Talent, Growth"
      width={1149}
      height={615}
      priority={priority}
      className={cn(SIZES[size], "w-auto object-contain")}
    />
  );

  if (tone === "dark") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-xl bg-white px-5 py-4 shadow-soft",
          className
        )}
      >
        {image}
      </span>
    );
  }

  return <span className={cn("inline-flex items-center", className)}>{image}</span>;
}
