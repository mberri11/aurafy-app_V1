import { ThemeColors } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Desert Oracle — unlockable paid theme (30★). PART-B REWORK (2026-07-19):
// smooth, premium dusk palette replacing the old near-black ember look.
//   • Background: deep dusk #1C0F08 → #2E1A0E (bg2 = the lighter dusk pole)
//   • Accent: terracotta #C97B4F · Highlight: amber gold #E8B04B
//   • Text: warm sand #F3E3CE (muted/dim are sand-shifted, not cool gray)
//   • Module cards: warm umber glass #2A180D + subtle amber border glow
//   • Ambient: static sand dusting over the field (AmbientMotes — no animation)
// ─────────────────────────────────────────────────────────────────────────────
export const desertOracleTheme: ThemeColors = {
  id: 'desertOracle',
  background: '#1C0F08',
  bg2: '#2E1A0E',
  // Warm sand-tinted glass instead of neutral white glass.
  surface: 'rgba(243,227,206,0.05)',
  surfaceBorder: 'rgba(232,176,75,0.16)',
  borderStrong: 'rgba(232,176,75,0.26)',
  primary: '#C97B4F',
  // Dusk-sunset CTA sweep: amber gold → terracotta → deep clay.
  gradient: ['#E8B04B', '#C97B4F', '#A85B3A'],
  // The ambient field — lighter dusk at the top sinking into the deep pole,
  // same lighter→darker relationship cosmic's field has to its background.
  fieldGradient: ['#2E1A0E', '#241409', '#1C0F08'],
  text: '#F3E3CE',
  textMuted: '#C7B299',
  textDim: '#8C7963',
  gold: '#E8B04B',
  rose: '#E84393',
  emerald: '#34D399',
  glow: 'rgba(201,123,79,0.35)',
  // Module cards: warm umber glass with a subtle amber border glow. The
  // per-module accent still drives bloom + icon tile (null) so modules stay
  // tellable apart — the theme owns the card's body, not the module identity.
  moduleCard: {
    background: '#2A180D',
    gradient: null,
    border: 'rgba(232,176,75,0.30)',
    glow: '#E8B04B55', // subtle amber glow (~33%)
    bloom: null, // → module.color
    bloomOpacity: [0.32, 0.09],
    iconTint: null, // → module.color ('33' bg / '66' border)
    lockedOverlay: '#1C0F08CC', // background + 'CC'
    lockedTint: '#C7B299', // textMuted
    comingSoonBorder: 'rgba(232,176,75,0.18)',
    comingSoonTint: '#8C7963', // textDim
  },
  // Static sand dusting — warm gold/sand motes scattered over the dusk field.
  // No animation (Simo, 2026-07-19): pure atmosphere, zero runtime cost.
  ambientParticles: {
    colors: ['#E8B04B', '#F3E3CE', '#C97B4F'],
    count: 14,
    size: [2, 4],
    opacity: [0.1, 0.35],
  },
};
