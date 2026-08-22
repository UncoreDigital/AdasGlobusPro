import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      /*
        Height-based variant. Every other breakpoint here is a width, but the
        hero has to clear the fold, and on a laptop the binding constraint is
        vertical. `short:` marks the adjustments that only apply when the screen
        is too short for the full stack, so tall screens keep the designed layout.
      */
      screens: {
        short: { raw: "(max-height: 820px)" },
      },
      /*
        Every colour below carries the <alpha-value> placeholder.

        Without it Tailwind cannot build the opacity modifiers, and — this is
        the dangerous part — it does not warn. `bg-brand/10` simply produces no
        rule, so the element renders with no background at all rather than a
        tint. That silently broke 39 classes across this site: every tinted icon
        plate, every hover border, and the wash that darkens photo-free page
        banners.

        The CSS variables must stay in space-separated `H S% L%` form for this
        to work. A variable written as `hsl(215 88% 13%)` would break it again.
      */
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },

        /* ---- Brand tokens, sampled from "Updated loog.jpeg" ---- */

        /* Navy — the wordmark, the A's inner triangle, the P's right edge. */
        navy: {
          DEFAULT: "hsl(var(--navy) / <alpha-value>)",
          deep: "hsl(var(--navy-deep) / <alpha-value>)",
          light: "hsl(var(--navy-light) / <alpha-value>)",
        },
        /* Blue — the G and the P bowl. The primary. */
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          dark: "hsl(var(--brand-dark) / <alpha-value>)",
          light: "hsl(var(--brand-light) / <alpha-value>)",
          bright: "hsl(var(--brand-bright) / <alpha-value>)",
        },
        /* Teal — the A. */
        teal: {
          DEFAULT: "hsl(var(--teal) / <alpha-value>)",
          deep: "hsl(var(--teal-deep) / <alpha-value>)",
          light: "hsl(var(--teal-light) / <alpha-value>)",
        },
        /*
          Cyan — the accent. Owns primary CTAs and emphasis.

          This replaces the `gold` family the previous mark carried. It is named
          `accent` rather than `cyan` on purpose: the role is "the colour that
          owns conversion", and naming it for the role means the next rebrand is
          a token change rather than another site-wide find-and-replace.
        */
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          dark: "hsl(var(--accent-dark) / <alpha-value>)",
          light: "hsl(var(--accent-light) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        /* Mid blues, for gradient stops and on-dark accents. */
        sky: {
          DEFAULT: "hsl(var(--sky) / <alpha-value>)",
          light: "hsl(var(--sky-light) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "hsl(var(--ink) / <alpha-value>)",
          muted: "hsl(var(--ink-muted) / <alpha-value>)",
        },
        /* Trust accent — verified / secure / success states only. */
        emerald: {
          DEFAULT: "hsl(var(--emerald) / <alpha-value>)",
          light: "hsl(var(--emerald-light) / <alpha-value>)",
          mint: "hsl(var(--emerald-mint) / <alpha-value>)",
        },
        slate: {
          50: "hsl(var(--slate-50) / <alpha-value>)",
          100: "hsl(var(--slate-100) / <alpha-value>)",
          200: "hsl(var(--slate-200) / <alpha-value>)",
          400: "hsl(var(--slate-400) / <alpha-value>)",
          600: "hsl(var(--slate-600) / <alpha-value>)",
          800: "hsl(var(--slate-800) / <alpha-value>)",
        },
      },
      fontFamily: {
        /* Headings — geometric sans with tight apertures, for financial authority. */
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        /* Body — optimised for long-form readability. */
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 2px 10px -2px hsl(215 88% 13% / 0.10)",
        card: "0 10px 30px -6px hsl(215 88% 13% / 0.12)",
        lift: "0 22px 55px -14px hsl(215 88% 13% / 0.24)",
        accent: "0 10px 30px -8px hsl(185 96% 37% / 0.45)",
        brand: "0 10px 30px -8px hsl(206 99% 33% / 0.40)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        /*
          Drift replaces the orbit rotation the old globe justified. The 2026
          mark is flat and angular with no rotational element in it, so the
          background motif travels along the monogram's own diagonal instead of
          spinning. Slow enough to register as atmosphere rather than motion.
        */
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-88px, -44px, 0)" },
        },
        /* Slow scale-and-fade for the angled plates behind the hero. */
        "breathe": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.04)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.55" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 44s linear infinite",
        drift: "drift 24s linear infinite",
        "drift-slow": "drift 44s linear infinite",
        breathe: "breathe 9s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
