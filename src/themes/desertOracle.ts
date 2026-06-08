import { ThemeColors } from '../types';

// Desert Oracle — unlockable, 50 stars. Values mirror design-reference/tokens.md.
export const desertOracleTheme: ThemeColors = {
  id: 'desertOracle',
  background: '#120A04',
  bg2: '#1A0E06',
  surface: 'rgba(255,255,255,0.05)',
  surfaceBorder: 'rgba(255,180,80,0.15)',
  borderStrong: 'rgba(255,180,80,0.25)',
  primary: '#E8A04A',
  // Sunset gradient (orange → pink → purple) sampled from 14-settings_themes.png.
  gradient: ['#F2AA52', '#E85C8E', '#8D3BDF'],
  text: '#FFFFFF',
  textMuted: '#A0A4B8',
  textDim: '#6E7290',
  gold: '#F5C542',
  rose: '#E84393',
  emerald: '#34D399',
  glow: 'rgba(232,160,74,0.35)',
};
