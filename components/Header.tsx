"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { navItems, site, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sticky header with hover dropdowns and a mobile drawer.
 *
 * Dropdowns open on hover for pointer users and on click/keyboard for everyone
 * else — a hover-only menu is unreachable by keyboard, and a click-only menu
 * feels broken to mouse users on a site this navigation-heavy. Both paths drive
 * the same `open` state so they cannot disagree.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Route change closes everything — otherwise the drawer survives navigation. */
  useEffect(() => {
    setDrawer(false);
    setOpenDropdown(null);
  }, [pathname]);

  /* The drawer is a full-screen overlay; the page behind it must not scroll. */
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenDropdown(null);
      setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /*
    Small grace period before a dropdown closes. Without it the menu vanishes
    while the pointer crosses the gap between the trigger and the panel.
  */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (item: NavItem) =>
    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-border bg-white/95 shadow-soft backdrop-blur-md"
            : "border-transparent bg-white"
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-6 md:h-24">
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Logo size="md" priority />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = isActive(item);
              const open = openDropdown === item.name;

              if (!item.dropdown) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-md px-2.5 py-2 text-[13.5px] font-semibold transition-colors xl:px-3 xl:text-[14px]",
                      active ? "text-brand" : "text-navy-deep hover:text-brand"
                    )}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-light" />
                    )}
                  </Link>
                );
              }

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenDropdown(item.name);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(open ? null : item.name)}
                    className={cn(
                      "relative flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[13.5px] font-semibold transition-colors xl:px-3 xl:text-[14px]",
                      active || open ? "text-brand" : "text-navy-deep hover:text-brand"
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
                      aria-hidden="true"
                    />
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-light" />
                    )}
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                        className="absolute left-1/2 top-full z-50 w-[26rem] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-xl border border-border bg-white p-2 shadow-lift">
                          <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-border bg-white" />
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="group relative block rounded-lg px-3.5 py-2.5 transition-colors hover:bg-slate-50"
                            >
                              <span className="flex items-center justify-between gap-3">
                                <span className="text-[14px] font-semibold text-navy-deep transition-colors group-hover:text-brand">
                                  {sub.name}
                                </span>
                                <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-5" />
                              </span>
                              {sub.blurb && (
                                <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">
                                  {sub.blurb}
                                </span>
                              )}
                            </Link>
                          ))}
                          <Link
                            href={item.href}
                            className="mt-1 block rounded-lg bg-slate-50 px-3.5 py-2.5 text-[13px] font-semibold text-brand transition-colors hover:bg-brand/5"
                          >
                            View all {item.name.toLowerCase()} →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[14px] font-semibold text-navy-deep transition-colors hover:text-brand 2xl:flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>
            <Button href="/contact" size="md" className="hidden sm:inline-flex">
              Talk to Us
            </Button>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="rounded-md p-2 text-navy-deep lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} pathname={pathname} />
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-navy-deep/60 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: EASE }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(22rem,88vw)] flex-col bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-5">
              <Logo size="sm" />
              <button type="button" onClick={onClose} className="rounded-md p-2 text-navy-deep" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                if (!item.dropdown) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3.5 py-3 text-[15px] font-semibold transition-colors",
                        active ? "bg-brand/5 text-brand" : "text-navy-deep hover:bg-slate-50"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                }

                const isOpen = expanded === item.name;
                return (
                  <div key={item.name}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.name)}
                      aria-expanded={isOpen}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3.5 py-3 text-[15px] font-semibold transition-colors",
                        active ? "text-brand" : "text-navy-deep hover:bg-slate-50"
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5 border-l-2 border-accent/40 pb-2 pl-3 ml-4">
                            <Link
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-[13.5px] font-semibold text-brand"
                            >
                              All {item.name.toLowerCase()}
                            </Link>
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block rounded-md px-3 py-2 text-[13.5px] text-ink-muted transition-colors hover:bg-slate-50 hover:text-navy-deep"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="shrink-0 space-y-3 border-t border-border p-5">
              <Button href="/contact" size="lg" className="w-full">
                Talk to Us
              </Button>
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 text-[14px] font-semibold text-navy-deep"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
