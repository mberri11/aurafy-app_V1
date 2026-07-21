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
// Cycle-safe edge: countTier lives in its own leaf module (types-only imports).
// NEVER import from resultGenerator/scoringEngine here — scoringEngine imports
// THIS file (spectrumHex), so that path is a cycle.
import { countTier } from '../engine/countTier';

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
  who_will_hurt_me: 'jealousy',
  red_green_flag: 'jealousy',
  am_i_problem: 'self',
  am_i_healing: 'self',
  shadow_self: 'self',
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
  // Warm scarlet warning (Simo 2026-07-12: pure red #EF4444 read cool/pink on the
  // loader — warmed toward vermilion; the peach accentSoft is what the loading dots
  // actually render). Protective shield motif (self-protection, not the attacker),
  // distinct from hates' broken heart and cut_off's broken link.
  who_will_hurt_me: { accent: '#F0563C', accentSoft: '#FBAB8C', motif: { kind: 'icon', name: 'shield-alert' } },
  // Same warm scarlet as who_will_hurt_me (Simo's ship spec, 2026-07-19) — the flag
  // motif is what keeps the two warning modules apart across loading/result/History.
  red_green_flag: { accent: '#F0563C', accentSoft: '#FBAB8C', motif: { kind: 'icon', name: 'flag-variant' } },
  attachment_style: { accent: '#22D3EE', accentSoft: '#67E8F9', motif: { kind: 'icon', name: 'orbit' } },
  // Gold — matches its Home card; the mirror motif (vs admires' eye) keeps them apart.
  am_i_problem: { accent: '#F5C542', accentSoft: '#F8DE7E', motif: { kind: 'icon', name: 'mirror' } },
  am_i_healing: { accent: '#2FEAAC', accentSoft: '#86EFCC', motif: { kind: 'icon', name: 'sprout' } },
  // Twilight indigo + persona masks — Jungian shadow work. (birth_chart's placeholder
  // shares the indigo family; re-tint it when zodiac ships in V1.4.)
  shadow_self: { accent: '#6366F1', accentSoft: '#818CF8', motif: { kind: 'icon', name: 'drama-masks' } },
  birth_chart: { accent: '#818CF8', accentSoft: '#A5B4FC', motif: { kind: 'icon', name: 'star-shooting' } },
  aura_color: { accent: '#A78BFA', accentSoft: '#C4B5FD', motif: { kind: 'wheel' } },
};

// ─────────────────────────────────────────────────────────────────────────────
// AURA_PRISM_V2 — the LOCKED Aura Color identity (Simo, 2026-07-19; design mockups
// "Aura Color - Prism Identity" are canonical). Obsidian base + a six-stop spectrum
// used ONLY as thin accents (the SpectrumHairline motif + the orb's refracted
// crescent), never as a fill. Distinct from Attachment (teal) and Who-Loves-Me
// (violet). These values are canonical — do not re-tint without a new mockup.
// ─────────────────────────────────────────────────────────────────────────────

/** Achromatic base tokens. */
export const AURA_V2 = {
  obsidian: '#08070D',
  graphite: '#15141C',
  silver: '#9B99A8',
  pearl: '#F1F0F6',
} as const;

/** The six chromatic outcomes → their locked spectrum hex. */
export const AURA_SPECTRUM: Record<string, string> = {
  violet: '#8E6FE0',
  blue: '#5A8FD6',
  green: '#4FB08C',
  gold: '#D8B25C',
  red: '#D06A5E',
  rose: '#CE84AD',
};

/** The spectrum in CANONICAL ORDER (violet→rose) — the ONLY order the hairline, the
 *  orb crescent and the loader dots ever use. */
export const AURA_SPECTRUM_STOPS: [string, string, string, string, string, string] = [
  AURA_SPECTRUM.violet,
  AURA_SPECTRUM.blue,
  AURA_SPECTRUM.green,
  AURA_SPECTRUM.gold,
  AURA_SPECTRUM.red,
  AURA_SPECTRUM.rose,
];

/** Resolve an aura outcome key → its display hex: chromatics use the spectrum; the two
 *  achromatic rares resolve to their pole (black→obsidian body, white→pearl body). */
export function spectrumHex(categoryKey: string): string {
  if (AURA_SPECTRUM[categoryKey]) return AURA_SPECTRUM[categoryKey];
  if (categoryKey === 'black') return AURA_V2.obsidian;
  if (categoryKey === 'white') return AURA_V2.pearl;
  return AURA_SPECTRUM.violet;
}

/**
 * AURA RESULT SKIN (Simo, 2026-07-19) — the FULL per-outcome identity, not just an
 * accent. Before this, every colour reused one pale accent for the orb / reveal name /
 * confidence bar / share button, so Black and White came out looking identical. Each
 * skin now carries everything a result surface needs to read unmistakably as ITS colour:
 *
 *  • accent / accentSoft — eyebrow, sparkles, %number, blooms.
 *  • orbSoft/orbBody/orbDeep/orbRim — the four sphere stops under a white glint
 *    (BLACK = obsidian with a silver top-light; WHITE = bright pearl; chromatics = vivid).
 *  • name / nameGlow — the big reveal name fill + its halo (BLACK = obsidian letters with
 *    a silver backlight so the name itself reads "black"; everything else = white + glow).
 *  • bar — the confidence-fill colour (BLACK = graphite, not pale).
 *  • cta / ctaText — the Share/unlock button gradient + label ink (BLACK = obsidian pill
 *    with WHITE text; light skins keep dark ink on their bright pill).
 *
 * The whole 8-colour result experience derives from this one table.
 */
export interface AuraSkin {
  accent: string;
  accentSoft: string;
  orbSoft: string;
  orbBody: string;
  orbDeep: string;
  orbRim: string;
  name: string;
  nameGlow: string;
  bar: string;
  cta: [string, string];
  ctaText: string;
  /** RARE handling (black/white) — the result card gets a silver-foil frame + a
   *  "RARE · …" micro-label, and the orb uses its achromatic-pole rendering. Optional:
   *  chromatics omit these. Consumed by the result screen + share card in S5. */
  rare?: boolean;
  /** Confidence-bar track (defaults to theme.surface at the call site when absent). */
  barTrack?: string;
  /** Silver hairline border on the CTA (obsidian rare button). */
  ctaBorder?: string;
}

// V2 CTA: every chromatic shares one pearl pill with obsidian ink (the colour lives in
// the name/orb/bar, not the button); rares invert per their pole.
const PEARL_CTA: [string, string] = [AURA_V2.pearl, '#D6D5E0'];

export const AURA_SKINS: Record<string, AuraSkin> = {
  violet: {
    accent: '#8E6FE0', accentSoft: '#B9A6F0',
    orbSoft: '#B9A6F0', orbBody: '#8E6FE0', orbDeep: '#4A3A82', orbRim: AURA_V2.obsidian,
    name: '#8E6FE0', nameGlow: '#8E6FE0', bar: '#8E6FE0',
    cta: PEARL_CTA, ctaText: AURA_V2.obsidian,
  },
  blue: {
    accent: '#5A8FD6', accentSoft: '#9EC0EC',
    orbSoft: '#9EC0EC', orbBody: '#5A8FD6', orbDeep: '#2E5488', orbRim: AURA_V2.obsidian,
    name: '#5A8FD6', nameGlow: '#5A8FD6', bar: '#5A8FD6',
    cta: PEARL_CTA, ctaText: AURA_V2.obsidian,
  },
  green: {
    accent: '#4FB08C', accentSoft: '#93D6BE',
    orbSoft: '#93D6BE', orbBody: '#4FB08C', orbDeep: '#276B52', orbRim: AURA_V2.obsidian,
    name: '#4FB08C', nameGlow: '#4FB08C', bar: '#4FB08C',
    cta: PEARL_CTA, ctaText: AURA_V2.obsidian,
  },
  gold: {
    accent: '#D8B25C', accentSoft: '#ECD59B',
    orbSoft: '#ECD59B', orbBody: '#D8B25C', orbDeep: '#8A6A24', orbRim: AURA_V2.obsidian,
    name: '#D8B25C', nameGlow: '#D8B25C', bar: '#D8B25C',
    cta: PEARL_CTA, ctaText: AURA_V2.obsidian,
  },
  red: {
    accent: '#D06A5E', accentSoft: '#E6A79E',
    orbSoft: '#E6A79E', orbBody: '#D06A5E', orbDeep: '#7E3129', orbRim: AURA_V2.obsidian,
    name: '#D06A5E', nameGlow: '#D06A5E', bar: '#D06A5E',
    cta: PEARL_CTA, ctaText: AURA_V2.obsidian,
  },
  rose: {
    accent: '#CE84AD', accentSoft: '#E4B4CE',
    orbSoft: '#E4B4CE', orbBody: '#CE84AD', orbDeep: '#7E4863', orbRim: AURA_V2.obsidian,
    name: '#CE84AD', nameGlow: '#CE84AD', bar: '#CE84AD',
    cta: PEARL_CTA, ctaText: AURA_V2.obsidian,
  },
  // WHITE — "Clear Light" (RARE). Reveal name / % / bar render PURE WHITE (Simo 2026-07-19);
  // white fill on a graphite track reads cleanly. Pearl/opal orb, pearl CTA.
  white: {
    accent: AURA_V2.pearl, accentSoft: '#FBFBFE',
    orbSoft: '#FFFFFF', orbBody: AURA_V2.pearl, orbDeep: '#C9C7D4', orbRim: '#7C7A88',
    name: '#FFFFFF', nameGlow: '#FBF8EE', bar: '#FFFFFF',
    cta: PEARL_CTA, ctaText: AURA_V2.obsidian,
    rare: true, barTrack: AURA_V2.graphite,
  },
  // BLACK — "Obsidian" (RARE). Deep obsidian pole. Silver name + silver bar; CTA obsidian
  // fill / white ink / silver hairline border. Small accents use silver to stay visible.
  black: {
    accent: AURA_V2.silver, accentSoft: '#C4C2D0',
    orbSoft: '#4A4856', orbBody: '#14131A', orbDeep: '#0C0B12', orbRim: AURA_V2.obsidian,
    // Reveal name / % / bar render NEAR-BLACK with a bright silver backlight halo
    // (legible via the glow, Simo 2026-07-19); bar = black fill on a SILVER track so it
    // reads. Small accents (eyebrow/sparkles/blooms) stay silver.
    name: '#0C0C12', nameGlow: '#C9C7D6', bar: '#0C0C12',
    cta: [AURA_V2.obsidian, '#050509'], ctaText: '#FFFFFF',
    rare: true, barTrack: '#6E6C7A', ctaBorder: AURA_V2.silver,
  },
};

export function auraSkin(key: string): AuraSkin {
  return AURA_SKINS[key] ?? AURA_SKINS.violet;
}

/** Legacy accent/soft view of a skin — kept for callers that only need the two colours
 *  (History left-bar + tile tint). New surfaces should read the full `auraSkin`. */
export function auraOutcomeTheme(category: string): CategoryTheme {
  const s = auraSkin(category);
  return { accent: s.accent, accentSoft: s.accentSoft, motif: { kind: 'wheel' } };
}

/**
 * AURA COLOR ONLY (Simo, 2026-07-04) — the namesake module's PRE-REVEAL identity
 * is PRISMATIC, not a single hue: Home card, module detail, person entry and quiz
 * render the brand `theme.gradient` (blooms, rings, borders, progress fill) with
 * white ink, because every single hue already belongs to another module (the old
 * static violet read as Who Loves Me). `MODULE_THEMES.aura_color`'s violet stays
 * as the single-color fallback for surfaces that can't take a gradient (loading
 * bloom, low-alpha washes). The post-reveal accent stays per-outcome (above).
 */
export function isPrismModule(moduleId: string): boolean {
  return moduleId === 'aura_color';
}

// ─────────────────────────────────────────────────────────────────────────────
// RED/GREEN DUAL IDENTITY (Simo, 2026-07-19) — red_green_flag is the second
// module with a non-single-hue identity (after aura's prism). PRE-REVEAL, every
// surface shows BOTH poles: red stays the base accent (Module.color) and green
// joins as the paired counter-accent — dual-flag glyph, green counter-bloom,
// alternating loader dots, red→amber→green progress sweep. POST-COMPUTE, the
// surfaces that follow the verdict (ad-gate orb, result, share, History) switch
// wholesale to the OUTCOME color: green (none/low), amber (medium — "Mixed
// Signals"), red (high, and every multi/circle read — the winner is by
// definition the reddest flag).
// ─────────────────────────────────────────────────────────────────────────────

export function isDualFlagModule(moduleId: string): boolean {
  return moduleId === 'red_green_flag';
}

/** The dual palette. Red = the who_will_hurt_me scarlet family (ship spec);
 *  green is a distinct signal green (NOT who_jealous' #34D399 emerald or
 *  am_i_healing's #2FEAAC mint); amber reuses the gold family for "Mixed". */
export const FLAG_DUO = {
  red: '#F0563C',
  redSoft: '#FBAB8C',
  green: '#22C55E',
  greenSoft: '#86EFAC',
  amber: '#F5C542',
  amberSoft: '#F8DE7E',
} as const;

/** Red→green pair for alternating loader dots / dual sweeps. */
export const FLAG_DUO_STOPS: [string, string] = [FLAG_DUO.red, FLAG_DUO.green];

/** Red→amber→green traffic sweep for the quiz progress fill ("which will it be"). */
export const FLAG_SWEEP: [string, string, string] = [FLAG_DUO.red, FLAG_DUO.amber, FLAG_DUO.green];

export type FlagOutcome = 'green' | 'mixed' | 'red';

/**
 * Resolve a red_green_flag ResultData → its outcome pole. Count (solo) reads
 * derive the tier from the SAME thresholds as the verdict copy
 * (resultGenerator.countTier over the persisted signalCount/signalTotal);
 * multi/circle reads are always red (the winner is the reddest flag).
 */
export function flagOutcomeKey(result: {
  isCountResult?: boolean;
  signalCount?: number;
  signalTotal?: number;
}): FlagOutcome {
  if (result.isCountResult && result.signalTotal) {
    const tier = countTier(result.signalCount ?? 0, result.signalTotal);
    return tier === 'high' ? 'red' : tier === 'medium' ? 'mixed' : 'green';
  }
  return 'red';
}

/** Outcome pole → the accent pair the post-compute surfaces render in. */
export function flagOutcomeTheme(key: FlagOutcome): CategoryTheme {
  const accent =
    key === 'green' ? FLAG_DUO.green : key === 'mixed' ? FLAG_DUO.amber : FLAG_DUO.red;
  const accentSoft =
    key === 'green' ? FLAG_DUO.greenSoft : key === 'mixed' ? FLAG_DUO.amberSoft : FLAG_DUO.redSoft;
  return { accent, accentSoft, motif: { kind: 'icon', name: 'flag-variant' } };
}


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
