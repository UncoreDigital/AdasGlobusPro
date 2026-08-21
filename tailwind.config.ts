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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        /* ---- Brand tokens, sampled from "Updated loog.jpeg" ---- */

        /* Navy — the wordmark, the A's inner triangle, the P's right edge. */
        navy: {
          DEFAULT: "hsl(var(--navy))",
          deep: "hsl(var(--navy-deep))",
          light: "hsl(var(--navy-light))",
        },
        /* Blue — the G and the P bowl. The primary. */
        brand: {
          DEFAULT: "hsl(var(--brand))",
          dark: "hsl(var(--brand-dark))",
          light: "hsl(var(--brand-light))",
          bright: "hsl(var(--brand-bright))",
        },
        /* Teal — the A. */
        teal: {
          DEFAULT: "hsl(var(--teal))",
          deep: "hsl(var(--teal-deep))",
          light: "hsl(var(--teal-light))",
        },
        /*
          Cyan — the accent. Owns primary CTAs and emphasis.

          This replaces the `gold` family the previous mark carried. It is named
          `accent` rather than `cyan` on purpose: the role is "the colour that
          owns conversion", and naming it for the role means the next rebrand is
          a token change rather than another site-wide find-and-replace.
        */
        accent: {
          DEFAULT: "hsl(var(--accent))",
          dark: "hsl(var(--accent-dark))",
          light: "hsl(var(--accent-light))",
          foreground: "hsl(var(--accent-foreground))",
        },
        /* Mid blues, for gradient stops and on-dark accents. */
        sky: {
          DEFAULT: "hsl(var(--sky))",
          light: "hsl(var(--sky-light))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          muted: "hsl(var(--ink-muted))",
        },
        /* Trust accent — verified / secure / success states only. */
        emerald: {
          DEFAULT: "hsl(var(--emerald))",
          light: "hsl(var(--emerald-light))",
          mint: "hsl(var(--emerald-mint))",
        },
        slate: {
          50: "hsl(var(--slate-50))",
          100: "hsl(var(--slate-100))",
          200: "hsl(var(--slate-200))",
          400: "hsl(var(--slate-400))",
          600: "hsl(var(--slate-600))",
          800: "hsl(var(--slate-800))",
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
