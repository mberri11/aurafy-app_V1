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
  text: '#FFFFFF',
  textMuted: '#A0A4B8',
  textDim: '#6E7290',
  gold: '#F5C542',
  rose: '#E84393',
  emerald: '#34D399',
  glow: 'rgba(167,139,250,0.35)',
};
