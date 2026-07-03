// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY SPINE (DESIGN-SPEC §0) — the single source for per-category palette +
// motif. Every result-experience surface (History cards now; the Result screen,
// loading screen and share card later) pulls accent / accentSoft / motif from a
// reading's category through THIS file, so the theming is implemented once.
//
// NOTE: distinct from `CATEGORY_COLORS` in src/content/articles (the Insights
// chip palette). This spine owns the result-experience palette from spec §0.
// ─────────────────────────────────────────────────────────────────────────────

import type { ComponentProps } from 'react';
import type { MaterialCommunityIcons } from '@expo/vector-icons';

export type Category =
  | 'love'
  | 'energy'
  | 'attachment'
  | 'aura'
  | 'self'
  | 'jealousy'
  | 'zodiac';

type MciName = ComponentProps<typeof MaterialCommunityIcons>['name'];

/** A category's secondary glyph. `wheel` = the aura colour-wheel disc, drawn by
 *  CategoryMotif; everything else is a tinted MaterialCommunityIcons glyph. */
export type CategoryMotif = { kind: 'icon'; name: MciName } | { kind: 'wheel' };

export interface CategoryTheme {
  /** Primary accent — glow, bar, eyebrow dot, confidence fill. */
  accent: string;
  /** Softer tint — blooms, soft fills. */
  accentSoft: string;
  motif: CategoryMotif;
}

/** Spec §0 palette + motif, extrapolated to all categories (none left gray). */
export const CATEGORY_THEME: Record<Category, CategoryTheme> = {
  love: { accent: '#F472B6', accentSoft: '#F9A8D0', motif: { kind: 'icon', name: 'crystal-ball' } },
  energy: { accent: '#FFFFFF', accentSoft: '#E2E8F0', motif: { kind: 'icon', name: 'star-four-points' } },
  attachment: { accent: '#22D3EE', accentSoft: '#67E8F9', motif: { kind: 'icon', name: 'orbit' } },
  aura: { accent: '#A78BFA', accentSoft: '#C4B5FD', motif: { kind: 'wheel' } },
  self: { accent: '#FBBF24', accentSoft: '#FCD34D', motif: { kind: 'icon', name: 'mirror' } },
  jealousy: { accent: '#FB7185', accentSoft: '#FDA4AF', motif: { kind: 'icon', name: 'content-cut' } },
  zodiac: { accent: '#818CF8', accentSoft: '#A5B4FC', motif: { kind: 'icon', name: 'star-shooting' } },
};

/** Maps a module id → its category. Forward-declares `aura_color` (the future
 *  Aura module) so the spine is wired the day that module ships. Unknown ids
 *  fall back to `attachment` (neutral cyan). */
const MODULE_CATEGORY: Record<string, Category> = {
  who_loves_me: 'love',
  who_soulmate: 'love',
  who_admires: 'love',
  energy_reading: 'energy',
  aura_color: 'aura',
  attachment_style: 'attachment',
  who_jealous: 'jealousy',
  who_hates_me: 'jealousy',
  who_cut_off: 'jealousy',
  am_i_problem: 'self',
  am_i_healing: 'self',
  birth_chart: 'zodiac',
};

/**
 * Per-MODULE themes (Simo, 2026-07-02): two modules sharing a category must still
 * read as two different experiences (Who Admires ≠ Who Loves Me) across the
 * loading screen, the ad-gate orb, the result reveal and the History card. Every
 * playable module gets its own accent + motif here; the category base above stays
 * as the grouping/fallback layer (weekly themes, future modules).
 *
 * COLOR RULE (Simo, 2026-07-03): a module's `accent` MUST equal its `Module.color`
 * in src/data/modules.ts — Home card, entry, loading, result and History must read
 * as ONE color per module. Change them together or not at all.
 */
const MODULE_THEMES: Record<string, CategoryTheme> = {
  // Violet — the module's ORIGINAL Home color (the earlier pink hijacked soulmate's family).
  // Soft is violet-400, NOT the paler 300: #C4B5FD read WHITE in the loading glow on device.
  who_loves_me: { accent: '#8B5CF6', accentSoft: '#A78BFA', motif: { kind: 'icon', name: 'crystal-ball' } },
  who_soulmate: { accent: '#FB7185', accentSoft: '#FDA4AF', motif: { kind: 'icon', name: 'heart-multiple' } },
  who_admires: { accent: '#F5C542', accentSoft: '#F8DE7E', motif: { kind: 'icon', name: 'eye' } },
  // Radiant white — pure light/aura (Simo 2026-07-03; the green family now belongs to
  // who_jealous). Soft is a SILVER — darker than the accent, inverting the usual
  // lighter-soft pattern — so blooms read as visible starlight mist, not blank white.
  energy_reading: { accent: '#FFFFFF', accentSoft: '#E2E8F0', motif: { kind: 'icon', name: 'star-four-points' } },
  who_hates_me: { accent: '#E84393', accentSoft: '#F2A9C4', motif: { kind: 'icon', name: 'heart-broken' } },
  // Emerald — "green with envy" (Simo 2026-07-03): inherited energy_reading's original
  // green wholesale after the venom-dark #046B50 kept reading black on device.
  who_jealous: { accent: '#34D399', accentSoft: '#6EE7BF', motif: { kind: 'icon', name: 'content-cut' } },
  who_cut_off: { accent: '#FB923C', accentSoft: '#FDBA74', motif: { kind: 'icon', name: 'link-variant-off' } },
  attachment_style: { accent: '#22D3EE', accentSoft: '#67E8F9', motif: { kind: 'icon', name: 'orbit' } },
  // Gold — matches its Home card; the mirror motif (vs admires' eye) keeps them apart.
  am_i_problem: { accent: '#F5C542', accentSoft: '#F8DE7E', motif: { kind: 'icon', name: 'mirror' } },
  am_i_healing: { accent: '#2FEAAC', accentSoft: '#86EFCC', motif: { kind: 'icon', name: 'sprout' } },
  birth_chart: { accent: '#818CF8', accentSoft: '#A5B4FC', motif: { kind: 'icon', name: 'star-shooting' } },
  aura_color: { accent: '#A78BFA', accentSoft: '#C4B5FD', motif: { kind: 'wheel' } },
};

export function categoryForModule(moduleId: string): Category {
  return MODULE_CATEGORY[moduleId] ?? 'attachment';
}

export function categoryTheme(category: Category): CategoryTheme {
  return CATEGORY_THEME[category];
}

/** Resolve a module id to its theme — per-module first, category base as fallback. */
export function moduleTheme(moduleId: string): CategoryTheme {
  return MODULE_THEMES[moduleId] ?? CATEGORY_THEME[categoryForModule(moduleId)];
}

/**
 * Darken a 6-digit hex by `amount` (0..1). Accent CTAs use `[accent,
 * darkenHex(accent, ~0.2)]` — a uniform saturated pill with subtle depth (the
 * ConfirmSheet cyan pattern). The earlier `[accentSoft, accent]` pale→bright mix
 * read as a washed two-tone on device.
 */
/**
 * Accent tone for inline TEXT sitting inside white copy (the solo quiz
 * question's {name} highlight): the accent itself — except near-white accents
 * (energy's radiant white), which swap to an ice-blue ink so the highlight
 * doesn't vanish into the surrounding white text (Simo, 2026-07-03).
 * NOTE: luminous reveal names (result screen, share card) deliberately stay
 * white-ink + accent-glow even on the white module — Simo approved that look;
 * this ink is ONLY for accent-colored text inside white copy.
 */
export function accentInk(accent: string): string {
  return accent.toUpperCase() === '#FFFFFF' ? '#9CC2FF' : accent;
}

export function darkenHex(hex: string, amount: number): string {
  const m = /^#?([0-9a-fA-F]{6})$/.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const f = (c: number) => Math.max(0, Math.round(c * (1 - amount)));
  const r = f((n >> 16) & 255);
  const g = f((n >> 8) & 255);
  const b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
