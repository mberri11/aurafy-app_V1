import { ThemeColors } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Elven Grove — unlockable paid theme (25★), added in the Part-B theme upgrade
// (2026-07-19; renamed from the working title "Midnight Oasis" — the palette
// reads deep-forest green, so the name follows, Simo). A moonlit elven grove:
// deep emerald woodland under teal light, veined with old gold.
//   • Background: grove night #04150F → #0A2A1E (bg2 = the lighter green pole)
//   • Accent: grove teal #2EC4A0 · Highlight: old gold #E9C46A
//   • Text: moonlit mint #DFF5EC
//   • Module cards: dark emerald glass, soft teal glow
// Same unlock flow as Desert Oracle (theme-gallery → ThemeUnlockDialog →
// spendStars('theme_unlock')).
// ─────────────────────────────────────────────────────────────────────────────
export const elvenGroveTheme: ThemeColors = {
  id: 'elvenGrove',
  background: '#04150F',
  bg2: '#0A2A1E',
  // Mint-tinted glass over the grove night.
  surface: 'rgba(223,245,236,0.05)',
  surfaceBorder: 'rgba(46,196,160,0.16)',
  borderStrong: 'rgba(46,196,160,0.26)',
  primary: '#2EC4A0',
  // Grove CTA sweep: teal → moon-mint → old gold.
  gradient: ['#2EC4A0', '#8FD9BC', '#E9C46A'],
  // The ambient field — lighter forest-green at the top sinking to the deep pole.
  fieldGradient: ['#0A2A1E', '#072017', '#04150F'],
  text: '#DFF5EC',
  textMuted: '#A3C6B8',
  textDim: '#6B9483',
  gold: '#E9C46A',
  rose: '#E84393',
  emerald: '#34D399',
  glow: 'rgba(46,196,160,0.35)',
  // Module cards: dark emerald glass with a soft teal glow; per-module accents
  // keep driving bloom + icon tile (null) so module identity survives the skin.
  moduleCard: {
    background: '#0B241A',
    gradient: null,
    border: 'rgba(46,196,160,0.28)',
    glow: '#2EC4A055', // soft teal glow (~33%)
    bloom: null, // → module.color
    bloomOpacity: [0.32, 0.09],
    iconTint: null, // → module.color ('33' bg / '66' border)
    lockedOverlay: '#04150FCC', // background + 'CC'
    lockedTint: '#A3C6B8', // textMuted
    comingSoonBorder: 'rgba(46,196,160,0.16)',
    comingSoonTint: '#6B9483', // textDim
  },
  // No ambient particles — the grove reads through palette alone.
  ambientParticles: null,
};
