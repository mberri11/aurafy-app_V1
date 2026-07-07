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
    icon: '🔮',
    color: '#8B5CF6',
    framework: 'attachment',
  },
  {
    id: 'energy_reading',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '✨',
    // Radiant white — pure light/aura (Simo 2026-07-03). Its old green moved to
    // who_jealous. Matches MODULE_THEMES.
    color: '#FFFFFF',
    framework: 'colorWheel',
  },
  {
    id: 'who_hates_me',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '🖤',
    color: '#E84393',
    framework: 'sociometry',
  },
  {
    id: 'who_jealous',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '✂',
    // Emerald "green with envy" (Simo 2026-07-03) — took over energy_reading's original
    // green; the venom-dark #046B50 read black on device. Matches MODULE_THEMES.
    color: '#34D399',
    framework: 'sociometry',
  },
  {
    id: 'who_soulmate',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '💕',
    color: '#FB7185',
    framework: 'loveLanguages',
  },
  {
    id: 'who_admires',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '👁',
    color: '#F5C542',
    framework: 'intuition',
  },
  {
    id: 'who_cut_off',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '😮',
    color: '#FB923C',
    framework: 'sociometry',
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'birth_chart',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '🔒',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'who_will_hurt_me',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '🔒',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'red_green_flag',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '🔒',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
  // SELF-DISCOVERY MODULES (solo)
  {
    id: 'attachment_style',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    icon: '🧠',
    color: '#22D3EE',
    framework: 'attachment',
  },
  {
    // Categorical solo: answers vote for one of 6 aura colors; winner + "edge"
    // runner-up (scoreCategorical). Violet — matches MODULE_THEMES.aura_color.
    id: 'aura_color',
    type: 'solo',
    resultKind: 'categorical',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    icon: '🌈',
    color: '#A78BFA',
    framework: 'colorWheel',
  },
  {
    id: 'am_i_problem',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    icon: '🪞',
    color: '#F5C542',
    framework: 'mixed',
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'am_i_healing',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    icon: '🔒',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'shadow_self',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    icon: '🔒',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
  {
    // Placeholder — locked "Coming soon" card on Home (no reading content yet).
    id: 'inner_child',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    icon: '🔒',
    color: '#6E7290',
    framework: 'mixed',
    comingSoon: true,
  },
];
