// ─────────────────────────────────────────────────────────────────────────────
// OrbitArt — the atom/orbit illustration used as article art (hero + thumbnails).
// Parametrized version of AurafyLogo's motif: crossed orbit ellipses + a glowing
// core + a couple of electron dots, all tinted by an `accent` color so each
// category reads distinctly (LOVE magenta, ENERGY emerald, …). Pure SVG, offline,
// no image assets needed. Matches the cosmic art in 10-Insight-*.png.
// ─────────────────────────────────────────────────────────────────────────────

import React, { memo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';

interface OrbitArtProps {
  /** Rendered size in px (square). */
  size: number;
  /** Core/orbit accent color (use CATEGORY_COLORS[category]). */
  accent: string;
  /** Secondary orbit color — defaults to a cyan that reads against any accent. */
  secondary?: string;
}

const OrbitArt = memo(function OrbitArt({
  size,
  accent,
  secondary = '#22D3EE',
}: OrbitArtProps) {
  return (
    <View style={{ width: size, height: size }} pointerEvents="none">
      <Svg width={size} height={size} viewBox="-120 -120 240 240">
        <Defs>
          <RadialGradient id="oa_core" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <Stop offset="28%" stopColor={accent} stopOpacity="0.9" />
            <Stop offset="70%" stopColor={accent} stopOpacity="0.25" />
            <Stop offset="100%" stopColor={accent} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="oa_dot" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={secondary} stopOpacity="0.9" />
            <Stop offset="100%" stopColor={secondary} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Orbit ellipses, crossed ±42° */}
        <Ellipse rx={86} ry={34} fill="none" stroke={secondary} strokeWidth={2.4} opacity={0.85} transform="rotate(-42)" />
        <Ellipse rx={86} ry={34} fill="none" stroke={accent} strokeWidth={2.4} opacity={0.9} transform="rotate(42)" />

        {/* Glowing core */}
        <Circle r={40} fill="url(#oa_core)" />
        <Circle r={7} fill="#FFFFFF" />

        {/* Electron dots riding the orbits */}
        <Circle cx={-70} cy={26} r={8} fill="url(#oa_dot)" />
        <Circle cx={-70} cy={26} r={2.4} fill={secondary} />
        <Circle cx={66} cy={36} r={6} fill="url(#oa_core)" />
        <Circle cx={48} cy={-52} r={6} fill="url(#oa_dot)" />
        <Circle cx={48} cy={-52} r={2} fill={accent} />
      </Svg>
    </View>
  );
});

export default OrbitArt;
