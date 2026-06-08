import React, { memo } from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';

interface AurafyLogoProps {
  /** Rendered diameter in px. Default 80. */
  size?: number;
  /**
   * Kept for API compatibility — glows are now baked into the SVG.
   * Previously added a separate full-canvas halo; now a no-op.
   */
  withHalo?: boolean;
}

/**
 * Canonical Aurafy atom mark.
 * Geometry derived exactly from assets/images/aurafy-mark.svg.
 * Do NOT edit coordinates here — update the source SVG first, then re-sync.
 *
 * viewBox "-120 -120 240 240" → centre at (0,0).
 * Elements: two orbit ellipses (±42°) + cyan eye/lens fill + magenta pupil
 * glow + solid core + white dot + 3 violet electron dots + 1 green spark dot.
 */
const AurafyLogo = memo(function AurafyLogo({ size = 80 }: AurafyLogoProps) {
  return (
    <View
      style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
      pointerEvents="none"
    >
      <Svg width={size} height={size} viewBox="-120 -120 240 240">
        <Defs>
          {/* Very faint cyan fill inside the orbit ellipse area */}
          <RadialGradient id="lm_orbitglow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%"   stopColor="#22D3EE" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </RadialGradient>

          {/* Cyan glow filling the vesica-piscis / eye shape */}
          <RadialGradient id="lm_eyefill" cx="50%" cy="50%" r="55%">
            <Stop offset="0%"   stopColor="#67E8F9" stopOpacity="0.7" />
            <Stop offset="40%"  stopColor="#22D3EE" stopOpacity="0.35" />
            <Stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
          </RadialGradient>

          {/* Magenta→violet glow around the central pupil */}
          <RadialGradient id="lm_pupilglow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%"   stopColor="#D946EF" stopOpacity="0.95" />
            <Stop offset="45%"  stopColor="#A855F7" stopOpacity="0.35" />
            <Stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </RadialGradient>

          {/* Green glow for the single spark / electron dot */}
          <RadialGradient id="lm_spark" cx="50%" cy="50%" r="50%">
            <Stop offset="0%"   stopColor="#10B981" stopOpacity="0.92" />
            <Stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </RadialGradient>

          {/* Violet glow for the three aura / electron dots */}
          <RadialGradient id="lm_aura" cx="50%" cy="50%" r="50%">
            <Stop offset="0%"   stopColor="#A855F7" stopOpacity="0.85" />
            <Stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* ── Orbit area glows (filled, very transparent) ─────────────── */}
        <Ellipse rx={86} ry={36} fill="url(#lm_orbitglow)" opacity={0.7} transform="rotate(-42)" />
        <Ellipse rx={86} ry={36} fill="url(#lm_orbitglow)" opacity={0.7} transform="rotate(42)"  />

        {/* ── Orbit strokes ──────────────────────────────────────────────── */}
        <Ellipse rx={80} ry={33} fill="none" stroke="#06B6D4" strokeWidth={2.2} opacity={0.72} transform="rotate(-42)" />
        <Ellipse rx={80} ry={33} fill="none" stroke="#22D3EE" strokeWidth={2.2} opacity={0.92} transform="rotate(42)"  />

        {/* ── Eye / vesica-piscis lens fill ─────────────────────────────── */}
        <Path
          d="M -40 0 C -34 -10, -18 -22, 0 -20 C 18 -22, 34 -10, 40 0 C 34 10, 18 22, 0 20 C -18 22, -34 10, -40 0 Z"
          fill="url(#lm_eyefill)"
        />

        {/* ── Pupil glow ────────────────────────────────────────────────── */}
        <Circle r={22} fill="url(#lm_pupilglow)" />

        {/* ── Solid magenta core + white centre dot ─────────────────────── */}
        <Circle r={6.5} fill="#C026D3" />
        <Circle r={1.6}  fill="#FFFFFF" />

        {/* ── Violet electron dots (×3) ────────────────────────────────── */}
        {/* Top-right */}
        <Circle cx={38}  cy={-56} r={6.5} fill="url(#lm_aura)" />
        <Circle cx={38}  cy={-56} r={2}   fill="#A855F7" />
        {/* Left-centre */}
        <Circle cx={-58} cy={-32} r={5.5} fill="url(#lm_aura)" />
        <Circle cx={-58} cy={-32} r={1.7} fill="#A855F7" />
        {/* Bottom-left */}
        <Circle cx={-44} cy={50}  r={5}   fill="url(#lm_aura)" />
        <Circle cx={-44} cy={50}  r={1.5} fill="#A855F7" />

        {/* ── Green spark dot (×1, bottom-right) ───────────────────────── */}
        <Circle cx={58} cy={44} r={9} fill="url(#lm_spark)" />
        <Circle cx={58} cy={44} r={3} fill="#10B981" />
        <Circle cx={58} cy={44} r={1} fill="#A7F3D0" />
      </Svg>
    </View>
  );
});

export default AurafyLogo;
