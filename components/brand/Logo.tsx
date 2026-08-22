import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The ADAS Globus Pro lockup — the client's artwork, not a re-typeset copy.
 *
 * The supplied file is a poster lockup: monogram stacked over wordmark over a
 * ruled tagline. Dropped into a site header that whole stack has to fit inside
 * ~50px, which leaves the wordmark around 8px tall and the tagline illegible.
 *
 * So `scripts/build-logo-assets.js` composites a horizontal lockup from the
 * client's own crops — monogram beside wordmark — which carries roughly three
 * times the wordmark height in the same vertical space. Every pixel is still
 * theirs; nothing is re-drawn.
 *
 * ── Why `tone` matters ──────────────────────────────────────────────────────
 * The wordmark and tagline are navy ink (#041B3C) and the site's dark bands are
 * navy (#041C3E). They are the same colour to within a rounding error, so on a
 * dark surface the wordmark does not merely look weak — it is invisible.
 *
 * There is no light-ink version of this artwork, and inverting it would change
 * the client's colours. The honest options are a light plate behind it or a
 * re-typeset wordmark; the plate keeps the real artwork, so that is what
 * `tone="dark"` renders.
 */

const SIZES = {
  sm: "h-8",
  md: "h-10",
  lg: "h-14",
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
  const src = tone === "dark" ? "/assets/logo-horizontal.png" : "/assets/logo-horizontal-alpha.png";

  const image = (
    <Image
      src={src}
      alt="ADAS Globus Pro — Finance, Talent, Growth"
      width={2056}
      height={320}
      priority={priority}
      className={cn(SIZES[size], "w-auto object-contain")}
    />
  );

  if (tone === "dark") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-xl bg-white px-4 py-2.5 shadow-soft",
          className
        )}
      >
        {image}
      </span>
    );
  }

  return <span className={cn("inline-flex items-center", className)}>{image}</span>;
}
