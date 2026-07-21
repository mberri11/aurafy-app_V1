// ─────────────────────────────────────────────────────────────────────────────
// MODULE-CARD SKIN RESOLVER — the ONE place ModuleCardTokens become concrete
// colors. Components (ModuleCard) consume the resolved style, never the raw
// tokens, so the null-means-derive rule lives here and nowhere else.
//
// Derivation rule (see ModuleCardTokens in src/types): a `null` token derives
// from the module's own accent (`Module.color`) exactly as the pre-token code
// did — glow `${accent}66`, bloom = accent, icon tile `${accent}33`/`${accent}66`.
// A non-null token overrides that derivation wholesale (Part B themes tint every
// card into their own palette).
// ─────────────────────────────────────────────────────────────────────────────

import type { ThemeColors } from '../types';

/** Fully-resolved module-card colors — no nulls left except the two GlassCard
 *  pass-throughs (`background`/`border`), where null = "keep GlassCard's own
 *  platform default fill/border" rather than a color. */
export interface ModuleCardStyle {
  /** Card fill override for GlassCard. null → GlassCard default. */
  background: string | null;
  /** Optional top→bottom wash gradient rendered over the fill. */
  gradient: [string, string] | null;
  /** Card border override for GlassCard. null → GlassCard default. */
  border: string | null;
  /** GlassCard glowColor. */
  glow: string;
  /** Corner-bloom radial tint + its [peak, mid] opacity stops. */
  bloom: string;
  bloomOpacity: [number, number];
  /** Icon tile. */
  iconBg: string;
  iconBorder: string;
  /** Locked-card treatment. */
  lockedOverlay: string;
  lockedTint: string;
  /** Coming-soon placeholder (tile bg/border derive from the tint — hex only). */
  comingSoonBorder: string;
  comingSoonTint: string;
  comingSoonIconBg: string;
  comingSoonIconBorder: string;
}

/**
 * Resolve the active theme's module-card skin for one module.
 * @param accent The module's own accent (`Module.color`, 6-digit hex).
 */
export function resolveModuleCardStyle(theme: ThemeColors, accent: string): ModuleCardStyle {
  const mc = theme.moduleCard;
  const iconTint = mc.iconTint ?? accent;
  return {
    background: mc.background,
    gradient: mc.gradient,
    border: mc.border,
    glow: mc.glow ?? `${accent}66`,
    bloom: mc.bloom ?? accent,
    bloomOpacity: mc.bloomOpacity,
    iconBg: `${iconTint}33`,
    iconBorder: `${iconTint}66`,
    lockedOverlay: mc.lockedOverlay,
    lockedTint: mc.lockedTint,
    comingSoonBorder: mc.comingSoonBorder,
    comingSoonTint: mc.comingSoonTint,
    comingSoonIconBg: `${mc.comingSoonTint}14`,
    comingSoonIconBorder: `${mc.comingSoonTint}40`,
  };
}
