import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The ADAS Globus Pro lockup.
 *
 * The supplied artwork is a *stacked* lockup — monogram over wordmark over a
 * ruled tagline — which is a poster lockup, not a header one. Scaled to the
 * ~40px a site header allows, the wordmark and the rule turn to mush, and on
 * the navy footer the whole lower half disappears because the wordmark and
 * tagline are navy ink.
 *
 * So this composes a horizontal lockup instead: the AGP monogram, which is the
 * distinctive part of the mark and reads at any size on any ground, set beside
 * the wordmark as live text. Live text stays crisp at every size, recolours for
 * dark surfaces, and costs no image request. The full artwork still appears at
 * poster scale — the OG card and the About page — where it was designed to be
 * seen.
 *
 * The wordmark is set in a single colour rather than the tri-colour treatment
 * the previous brand used. That is faithful to the 2026 artwork, where the
 * wordmark is uniform navy and all the colour lives in the monogram beside it.
 *
 * Sizes are fixed steps rather than inherited from a parent height: `h-full` on
 * the image needs a definite height on every ancestor, and one caller
 * forgetting that is what silently renders the mark at its natural 1075px.
 */

const SIZES = {
  sm: { mark: "h-7", name: "text-[13.5px]", rule: "text-[7px] tracking-[0.18em]", gap: "gap-2" },
  md: { mark: "h-9", name: "text-[17px]", rule: "text-[8px] tracking-[0.2em]", gap: "gap-2.5" },
  lg: { mark: "h-12", name: "text-[22px]", rule: "text-[9.5px] tracking-[0.22em]", gap: "gap-3" },
} as const;

export default function Logo({
  size = "md",
  tone = "light",
  rule = true,
  className,
  priority = false,
}: {
  size?: keyof typeof SIZES;
  tone?: "light" | "dark";
  /** Show the FINANCE · TALENT · GROWTH rule under the wordmark. */
  rule?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const s = SIZES[size];
  const dark = tone === "dark";

  return (
    <span className={cn("flex items-center", s.gap, className)}>
      <Image
        src="/assets/logo-mark-alpha.png"
        alt=""
        width={1075}
        height={365}
        priority={priority}
        aria-hidden="true"
        className={cn(s.mark, "w-auto object-contain")}
      />

      <span className="flex flex-col justify-center leading-none">
        <span
          className={cn(
            "font-display font-extrabold uppercase tracking-[-0.01em]",
            s.name,
            dark ? "text-white" : "text-navy-deep"
          )}
        >
          Adas Globus Pro
        </span>
        {rule && (
          <span
            className={cn(
              "mt-[0.45em] font-bold uppercase",
              s.rule,
              dark ? "text-accent-light/80" : "text-brand/70"
            )}
          >
            Finance · Talent · Growth
          </span>
        )}
      </span>

      <span className="sr-only">ADAS Globus Pro</span>
    </span>
  );
}
