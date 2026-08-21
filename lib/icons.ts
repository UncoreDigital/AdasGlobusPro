import {
  BadgeCheck,
  BarChart3,
  Bot,
  CalendarCheck,
  Calculator,
  CheckCheck,
  ClipboardList,
  Clock,
  Cloud,
  Cpu,
  Database,
  Factory,
  FileSignature,
  Globe2,
  Headphones,
  Hotel,
  KeyRound,
  Landmark,
  Layers,
  ListChecks,
  Lock,
  Plug,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  Users,
  Users2,
  UtensilsCrossed,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry.
 *
 * The data files (services, industries, content) name their icon as a string so
 * they stay serialisable and importable from server components without pulling
 * the icon library into every module. This is the one place strings become
 * components.
 *
 * Only icons listed here are bundled — a typo in a data file resolves to the
 * fallback rather than crashing the page, but it will look wrong, which is the
 * intended signal.
 */
const registry: Record<string, LucideIcon> = {
  BadgeCheck,
  BarChart3,
  Bot,
  CalendarCheck,
  Calculator,
  CheckCheck,
  ClipboardList,
  Clock,
  Cloud,
  Cpu,
  Database,
  Factory,
  FileSignature,
  Globe2,
  Headphones,
  Hotel,
  KeyRound,
  Landmark,
  Layers,
  ListChecks,
  Lock,
  Plug,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  Users,
  Users2,
  UtensilsCrossed,
  Workflow,
};

export function getIcon(name: string): LucideIcon {
  return registry[name] ?? Sparkles;
}
