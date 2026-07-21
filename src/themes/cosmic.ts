import { ThemeColors } from '../types';

// Cosmic — default free theme. Values mirror design-reference/tokens.md, except
// `gradient`, which matches the onboarding CTA/dot in the design screenshots
// (cyan → violet → mint) rather than tokens.md's violet → blue → teal.
export const cosmicTheme: ThemeColors = {
  id: 'cosmic',
  background: '#07091A',
  bg2: '#0B0E25',
  surface: 'rgba(255,255,255,0.05)',
  surfaceBorder: 'rgba(255,255,255,0.10)',
  borderStrong: 'rgba(255,255,255,0.14)',
  primary: '#A78BFA',
  gradient: ['#22D3EE', '#A855F7', '#2FEAAC'],
  // The ambient field (CosmicField + inline screen bases) — indigo → navy → deep.
  fieldGradient: ['#181430', '#0E0B22', '#08061A'],
  text: '#FFFFFF',
  textMuted: '#A0A4B8',
  textDim: '#6E7290',
  gold: '#F5C542',
  rose: '#E84393',
  emerald: '#34D399',
  glow: 'rgba(167,139,250,0.35)',
  // Module-card skin — the pre-token ModuleCard look, verbatim: everything
  // derives from the module's own accent (null), GlassCard keeps its default
  // fill/border, locked/coming-soon reuse background/textMuted/surfaceBorder/
  // textDim exactly as the old inline values did. Zero visual change.
  moduleCard: {
    background: null,
    gradient: null,
    border: null,
    glow: null, // → `${module.color}66`
    bloom: null, // → module.color
    bloomOpacity: [0.32, 0.09],
    iconTint: null, // → module.color ('33' bg / '66' border)
    lockedOverlay: '#07091ACC', // background + 'CC'
    lockedTint: '#A0A4B8', // textMuted
    comingSoonBorder: 'rgba(255,255,255,0.10)', // surfaceBorder
    comingSoonTint: '#6E7290', // textDim
  },
  // No ambient particle layer — the cosmic field is the plain gradient it has
  // always been.
  ambientParticles: null,
};
