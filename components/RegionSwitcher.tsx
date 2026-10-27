"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import Flag from "@/components/Flag";
import { EASE } from "@/lib/motion";
import {
  defaultRegion,
  getRegion,
  isRegionCode,
  regionForCountry,
  regionForTimeZone,
  regions,
  type RegionCode,
} from "@/lib/regions";
import { cn } from "@/lib/utils";

/**
 * The U.S. / Canada switch at the top right of the header.
 *
 * Two looks, both from the 17 October call: a dropdown (the default, because
 * it takes a third country without a redesign) and side-by-side tabs (what the
 * client asked about). `features.regionSwitcher` in lib/site.ts picks one, so
 * both can be screenshotted for the client before they choose.
 *
 * The client also asked that the switch be noticed, not just available: a
 * visitor from Canada should realise on arrival that there is something to
 * change. So until a visitor has used it, the dropdown carries a slow pulse,
 * and once per browser session a short callout names it. Both stop for good
 * the first time the visitor opens the menu, picks a country or dismisses the
 * callout.
 *
 * The starting country follows the visitor's location: Canada for a visitor
 * in Canada, the U.S. for everyone else (client request, 22 October). Their
 * own choice, once made, always wins. See `useRegion`.
 *
 * Storage is a convenience only. Every read is guarded, and with storage
 * blocked the site still detects the country, it just cannot remember a choice.
 */

const REGION_KEY = "agp-region";
const INTRO_KEY = "agp-region-intro";
const HINT_KEY = "agp-region-hint";
/* This session's location lookup, so it runs once per visit rather than on
   every full page load. "none" means "not one of ours: use the default". */
const DETECTED_KEY = "agp-region-detected";

function read(storage: () => Storage, key: string) {
  try {
    return storage().getItem(key);
  } catch {
    return null;
  }
}

function write(storage: () => Storage, key: string, value: string) {
  try {
    storage().setItem(key, value);
  } catch {
    /* Private mode or blocked storage: the choice just is not remembered. */
  }
}

const local = () => window.localStorage;
const session = () => window.sessionStorage;

/**
 * Which of our countries the visitor is in, or null for "use the default".
 *
 * Asks /api/region, which reports the country Vercel has already resolved from
 * the connection. A known country decides it outright, so a visitor in India
 * gets the default rather than a time-zone guess. Only when the country is
 * unknown (local development, another host, or the request failing) does the
 * browser's time zone decide instead.
 */
async function detectRegion(): Promise<RegionCode | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const res = await fetch("/api/region", { signal: controller.signal, cache: "no-store" });
    clearTimeout(timer);
    if (res.ok) {
      const { country } = (await res.json()) as { country: string | null };
      if (country) return regionForCountry(country);
    }
  } catch {
    /* Unknown, so fall through to the time zone. */
  }
  try {
    return regionForTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return null;
  }
}

/**
 * The visitor's country, plus whether they have discovered the switch yet.
 *
 * Owned once, by the header, and passed down: the desktop switch, the compact
 * one beside the menu button and the one in the drawer are all the same
 * control, and three independent states would disagree after the first click.
 *
 * Which country it starts on, in order:
 *   1. the visitor's own earlier choice, saved in this browser;
 *   2. their location (see `detectRegion`), looked up once per session;
 *   3. the default, the U.S.
 * A detected country is never saved, so someone who travels gets the right
 * one next time; only an explicit choice is remembered.
 *
 * Starts on the default and settles after mount. Reading storage or the
 * location during render would make the server HTML and the first client
 * render differ.
 */
export function useRegion() {
  const [region, setRegionState] = useState<RegionCode>(defaultRegion);
  const [discovered, setDiscovered] = useState(true);
  /** True when the current country came from the visitor's location. */
  const [detected, setDetected] = useState(false);
  /* Set the moment the visitor picks a country, so a lookup that resolves
     after their click cannot overrule it. */
  const chosen = useRef(false);

  useEffect(() => {
    setDiscovered(read(local, INTRO_KEY) === "done");

    const saved = read(local, REGION_KEY);
    if (isRegionCode(saved)) {
      setRegionState(saved);
      return;
    }

    const apply = (code: RegionCode | null) => {
      if (chosen.current || !code) return;
      setRegionState(code);
      setDetected(code !== defaultRegion);
    };

    const cached = read(session, DETECTED_KEY);
    if (cached !== null) {
      apply(isRegionCode(cached) ? cached : null);
      return;
    }

    let live = true;
    detectRegion().then((code) => {
      write(session, DETECTED_KEY, code ?? "none");
      if (live) apply(code);
    });
    return () => {
      live = false;
    };
  }, []);

  const markDiscovered = useCallback(() => {
    setDiscovered(true);
    write(local, INTRO_KEY, "done");
  }, []);

  const setRegion = useCallback(
    (code: RegionCode) => {
      chosen.current = true;
      setRegionState(code);
      setDetected(false);
      write(local, REGION_KEY, code);
      markDiscovered();
    },
    [markDiscovered]
  );

  return { region, setRegion, discovered, markDiscovered, detected };
}

type SwitcherProps = {
  region: RegionCode;
  onChange: (code: RegionCode) => void;
  /** False until the visitor has used the switch at least once. */
  discovered?: boolean;
  onDiscovered?: () => void;
  className?: string;
};

/* ---------------------------------------------------------------------------
   Dropdown
   --------------------------------------------------------------------------- */

type DropdownProps = SwitcherProps & {
  /** Flag and chevron only, for the narrow header beside the menu button. */
  compact?: boolean;
  /** Show the one-time callout. */
  hint?: boolean;
  /** The country was set from the visitor's location; the callout says so. */
  detected?: boolean;
};

export function RegionDropdown({
  region,
  onChange,
  discovered = true,
  onDiscovered,
  compact = false,
  hint = true,
  detected = false,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [callout, setCallout] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const current = getRegion(region);

  /* The callout: once per session, a beat after load, gone on its own. */
  useEffect(() => {
    if (!hint || discovered || read(session, HINT_KEY)) return;
    const show = setTimeout(() => {
      setCallout(true);
      write(session, HINT_KEY, "shown");
    }, 1200);
    const hide = setTimeout(() => setCallout(false), 1200 + 9000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [hint, discovered]);

  useEffect(() => {
    if (discovered) setCallout(false);
  }, [discovered]);

  /* Outside click and Escape close the menu. */
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Focus the current country when the menu opens, so arrows start there. */
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')?.focus();
  }, [open]);

  const toggle = () => {
    setOpen((value) => !value);
    setCallout(false);
    onDiscovered?.();
  };

  const choose = (code: RegionCode) => {
    onChange(code);
    setOpen(false);
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>("[role=option]") ?? []
    );
    const at = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = (at + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {/* Pulse, until the switch has been used once. */}
      {!discovered && (
        <span
          className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full border-2 border-accent motion-reduce:hidden"
          aria-hidden="true"
        />
      )}

      {/* Gradient rim. The one element in the header drawn in the accent
          family besides the CTA, which is what makes it findable. */}
      <span
        className="relative block rounded-full p-[1.5px] shadow-soft transition-shadow hover:shadow-accent"
        style={{ backgroundImage: "var(--gradient-accent-x)" }}
      >
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`Country: ${current.name}. Change country`}
          className={cn(
            "flex h-9 items-center gap-2 rounded-full bg-white text-[13px] font-bold text-navy-deep transition-colors hover:bg-slate-50",
            compact ? "px-2.5" : "pl-3 pr-2.5"
          )}
        >
          <Flag code={current.iso} />
          {!compact && <span>{current.short}</span>}
          <ChevronDown
            className={cn("h-3.5 w-3.5 text-brand transition-transform duration-200", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute right-0 top-full z-50 w-72 pt-3"
          >
            <div className="rounded-xl border border-border bg-white p-2 shadow-lift">
              <p className="px-3 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                Choose your country
              </p>
              <ul
                ref={listRef}
                id={listId}
                role="listbox"
                aria-label="Country"
                onKeyDown={onListKey}
              >
                {regions.map((option) => {
                  const active = option.code === region;
                  return (
                    <li key={option.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => choose(option.code)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
                          active ? "bg-brand/5" : "hover:bg-slate-50"
                        )}
                      >
                        <Flag code={option.iso} className="h-5" />
                        <span className="flex-1">
                          <span className="block text-[14px] font-semibold text-navy-deep">
                            {option.name}
                          </span>
                          <span className="block text-[12.5px] text-ink-muted">{option.tagline}</span>
                        </span>
                        {active && <Check className="h-4 w-4 text-accent-dark" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* One-time callout. */}
      <AnimatePresence>
        {callout && !open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3, ease: EASE }}
            role="status"
            className="absolute right-0 top-full z-50 w-64 pt-3"
          >
            <div className="relative rounded-xl bg-navy-deep p-4 pr-9 text-white shadow-lift">
              <span
                className="absolute -top-1.5 right-6 h-3 w-3 rotate-45 bg-navy-deep"
                aria-hidden="true"
              />
              {/* A visitor placed in Canada is told so, and how to undo it;
                  everyone else is told Canada exists. */}
              <p className="flex items-center gap-2 text-[13.5px] font-bold">
                <Flag code={detected ? current.iso : "CA"} className="shadow-none" />
                {detected ? `Showing services for ${current.name}` : "Now serving Canada too"}
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/70">
                {detected
                  ? `Matched to your location. Not in ${current.name}? Change your country here.`
                  : "Choose your country here to see the services for your firm."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setCallout(false);
                  onDiscovered?.();
                }}
                className="absolute right-2 top-2 rounded-md p-1.5 text-white/60 transition-colors hover:text-white"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Tabs: the side-by-side alternative the client asked about
   --------------------------------------------------------------------------- */

export function RegionTabs({ region, onChange, className }: SwitcherProps) {
  const groupId = useId();

  return (
    <div
      role="radiogroup"
      aria-label="Country"
      className={cn("inline-flex rounded-full bg-slate-100 p-1 ring-1 ring-inset ring-slate-200", className)}
    >
      {regions.map((option) => {
        const active = option.code === region;
        return (
          <button
            key={option.code}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.code)}
            className={cn(
              "relative flex h-8 items-center gap-2 rounded-full px-3.5 text-[13px] font-bold transition-colors",
              active ? "text-navy-deep" : "text-ink-muted hover:text-navy-deep"
            )}
          >
            {active && (
              <motion.span
                layoutId={`region-tab-${groupId}`}
                transition={{ duration: 0.28, ease: EASE }}
                className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-accent/50"
                aria-hidden="true"
              />
            )}
            <Flag code={option.iso} className="relative" />
            <span className="relative">{option.short}</span>
          </button>
        );
      })}
    </div>
  );
}
