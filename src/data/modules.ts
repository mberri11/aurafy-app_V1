import { Module } from '../types';

/** The one module whose first reading is free (Home "Try free ✦" pill + reading-mode
 *  "Free" badges), until the user consumes it once via the persisted freeTrialUsed flag. */
export const FREE_TRIAL_MODULE_ID = 'energy_reading';

export const MODULES: Module[] = [
  // RELATIONSHIP MODULES (multi-person) — order matches the Home design (05-home-cosmic.png)
  {
    id: 'who_loves_me',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'Heart',
    color: '#8B5CF6',
    framework: 'attachment',
  },
  {
    id: 'energy_reading',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'Lightning',
    // Radiant white — pure light/aura (Simo 2026-07-03). Its old green moved to
    // who_jealous. Matches MODULE_THEMES.
    color: '#FFFFFF',
    framework: 'colorWheel',
  },
  {
    id: 'who_hates_me',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'HeartBreak',
    color: '#E84393',
    framework: 'sociometry',
  },
  {
    id: 'who_jealous',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'Eye',
    // Emerald "green with envy" (Simo 2026-07-03) — took over energy_reading's original
    // green; the venom-dark #046B50 read black on device. Matches MODULE_THEMES.
    color: '#34D399',
    framework: 'sociometry',
  },
  {
    id: 'who_soulmate',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'Infinity',
    color: '#FB7185',
    framework: 'loveLanguages',
  },
  {
    id: 'who_admires',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'Sparkle',
    color: '#F5C542',
    framework: 'intuition',
  },
  {
    id: 'who_cut_off',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'SmileySad',
    color: '#FB923C',
    framework: 'sociometry',
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'birth_chart',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'MoonStars',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
  {
    // Star-unlocked module (30★) — LIVE (content shipped 2026-07-12). Warm scarlet
    // "warning" accent (warmed from pure red 2026-07-12 — read cool on the loader),
    // distinct from who_hates_me's pink and who_cut_off's orange. Matches
    // MODULE_THEMES.who_will_hurt_me.
    id: 'who_will_hurt_me',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'ShieldWarning',
    color: '#F0563C',
    framework: 'sociometry',
    unlockCost: 30,
  },
  {
    // Star-unlocked module (25★) — LIVE (content shipped 2026-07-19). Same warm
    // scarlet as who_will_hurt_me per Simo's ship spec; flag motif keeps them
    // apart. Matches MODULE_THEMES.red_green_flag.
    id: 'red_green_flag',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    iconName: 'FlagPennant',
    color: '#F0563C',
    framework: 'mixed',
    unlockCost: 25,
    // SOLO + COMPARE only: at 3+ people the signed 20 picks spread too thin and
    // every read collapses to "no clear signal" (see availableModes doc).
    availableModes: ['solo', 'compare'],
  },
  // SELF-DISCOVERY MODULES (solo)
  {
    id: 'attachment_style',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    // A single human figure (Simo, 2026-07-25) — chosen over PersonSimple, whose
    // stick-figure line goes weak at the rs(26) History size.
    iconName: 'Person',
    color: '#22D3EE',
    framework: 'attachment',
  },
  {
    // Categorical solo: answers vote for one of 8 aura colors (black + white joined
    // in the 2026-07-16 expansion); winner + "edge" runner-up (scoreCategorical).
    // Violet — matches MODULE_THEMES.aura_color.
    id: 'aura_color',
    type: 'solo',
    resultKind: 'categorical',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    // Flame (Simo, 2026-07-25) — REPLACES the Prism Orb as this module's glyph.
    // Tinted per-outcome at render time (ModuleIcon reads auraSkin(outcome).accent),
    // so a reading's saved colour still shows: the two rares resolve to their SMALL-
    // ACCENT tones (black → silver, white → pearl), never to the near-black orb body,
    // which would vanish on the #07091A field. See AURA_PRISM_V2 in categoryTheme —
    // the obsidian CARD treatment (spectrum border/hairline) is unchanged.
    iconName: 'Flame',
    color: '#A78BFA',
    framework: 'colorWheel',
  },
  {
    id: 'am_i_problem',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    // A question mark struck into a wax seal (Simo, 2026-07-25) — "Am I The Problem?"
    // as a verdict stamp. Also the ONLY thing separating this module from who_admires,
    // which shares its gold accent.
    iconName: 'SealQuestion',
    color: '#F5C542',
    framework: 'mixed',
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'am_i_healing',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    iconName: 'Plant',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
  {
    // Star-unlocked module (30★) — LIVE (content shipped 2026-07-12). Jungian shadow-work
    // solo read; twilight indigo. Matches MODULE_THEMES.shadow_self.
    // The glyph is a PAIR (Simo, 2026-07-25): MaskSad tilted behind + MaskHappy in
    // front — the face you show over the side you hide. `iconName` names the front
    // mask; ModuleIcon composes the pair.
    id: 'shadow_self',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    iconName: 'MaskHappy',
    color: '#6366F1',
    framework: 'mixed',
    unlockCost: 30,
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'inner_child',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    iconName: 'Baby',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
];
