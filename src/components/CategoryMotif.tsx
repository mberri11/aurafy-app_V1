// ─────────────────────────────────────────────────────────────────────────────
// CategoryMotif — renders a category's secondary motif (DESIGN-SPEC §0) inside a
// card/tile. A tinted MaterialCommunityIcons glyph for most categories; the aura
// category gets the PRISM ORB (AURA_PRISM_V2, locked 2026-07-19). Reused by Home
// cards, module detail, History and the result surfaces so the motif lives once.
// ─────────────────────────────────────────────────────────────────────────────

import React, { memo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Defs, Path, RadialGradient, Stop } from 'react-native-svg';
import {
  Category,
  categoryTheme,
  moduleTheme,
  auraSkin,
  AURA_SPECTRUM_STOPS,
  AURA_V2,
} from '@/src/themes/categoryTheme';

type OrbMode = 'base' | 'outcome' | 'mono';

/**
 * THE PRISM ORB (AURA_PRISM_V2 — locked to the "Aura Color · Prism Identity" mockups).
 * A glassy glossy sphere with three modes:
 *
 *  • base — obsidian body, an ENLARGED pearl specular upper-left, a refracted spectrum
 *    CRESCENT (six stops in canonical order sweeping the lower/right rim, open at the
 *    highlight — never a closed ring), and a faint silver rim-light for separation.
 *    Used pre-reveal: home card, module detail, loading, person entry.
 *  • outcome(outcomeKey, secondary) — the body fills with the outcome colour; a short
 *    ~110° rim arc renders in the SECONDARY hue (or silver when none). The two rares
 *    render their pole: black = deep obsidian gloss + silver ghost arc; white = pearl/
 *    opal glass with the spectrum held faintly INSIDE. Used on result / history / share.
 *  • mono — flat 2-tone silhouette for 48×48 and tiny placements.
 *
 * All layers are plain radial gradients / stroked arcs (no blur filter — unreliable on
 * Android). Every gradient id is namespaced with a per-instance `uid` so several orbs on
 * one screen (a History list) never collide.
 */
function AuraOrb({
  size,
  mode,
  outcomeKey,
  secondary,
}: {
  size: number;
  mode: OrbMode;
  outcomeKey?: string;
  secondary?: string | null;
}) {
  const uid = React.useId().replace(/:/g, '');
  const r = size / 2;
  const cx = r;
  const cy = r;
  const orbR = r * 0.72;
  // Light source upper-left → pearl specular top-left, shadow lower-right.
  const hx = cx - orbR * 0.32;
  const hy = cy - orbR * 0.34;
  const specR = orbR * 0.22; // enlarged, per the locked spec (bigger than the mockup)

  // Polar helper + an SVG arc path (clockwise) along a circle of radius `rad`.
  const polar = (rad: number, deg: number) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a) };
  };
  const arc = (rad: number, a0: number, a1: number) => {
    const s = polar(rad, a0);
    const e = polar(rad, a1);
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${rad} ${rad} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  // Refracted crescent — 6 canonical stops sweeping -90°→170° (top, clockwise around the
  // right/bottom), leaving the upper-left highlight open.
  const crescent = (rad: number, band: number, opacity: number) => {
    const seg = 260 / 6;
    return AURA_SPECTRUM_STOPS.map((color, i) => {
      const a0 = -90 + i * seg;
      return (
        <Path
          key={`${uid}_c${i}`}
          d={arc(rad, a0, a0 + seg + 1)}
          stroke={color}
          strokeWidth={band}
          strokeLinecap="round"
          strokeOpacity={opacity}
          fill="none"
        />
      );
    });
  };

  // ── MONO — flat 2-tone silhouette. ─────────────────────────────────────────
  if (mode === 'mono') {
    return (
      <Svg width={size} height={size}>
        <Circle cx={cx} cy={cy} r={orbR} fill={AURA_V2.obsidian} />
        <Path
          d={arc(orbR * 0.9, -60, 150)}
          stroke={AURA_V2.silver}
          strokeWidth={Math.max(1.2, orbR * 0.1)}
          strokeLinecap="round"
          strokeOpacity={0.9}
          fill="none"
        />
        <Circle cx={hx} cy={hy} r={specR * 0.7} fill={AURA_V2.pearl} opacity={0.9} />
      </Svg>
    );
  }

  const bodyId = `${uid}_body`;
  const specId = `${uid}_spec`;
  const haloId = `${uid}_halo`;

  // ── OUTCOME — the orb wears the result colour (skin drives the body stops). ──
  if (mode === 'outcome' && outcomeKey) {
    const s = auraSkin(outcomeKey);
    const isWhite = outcomeKey === 'white';
    const isBlack = outcomeKey === 'black';
    const arcColor = secondary ?? AURA_V2.silver;
    const band = Math.max(1.5, orbR * 0.11);
    return (
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={haloId} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} rx={r} ry={r}>
            <Stop offset="0%" stopColor={s.accent} stopOpacity={0.42} />
            <Stop offset="62%" stopColor={s.accent} stopOpacity={0.12} />
            <Stop offset="100%" stopColor={s.accent} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={bodyId} gradientUnits="userSpaceOnUse" cx={hx} cy={hy} rx={orbR * 1.34} ry={orbR * 1.34}>
            <Stop offset="0%" stopColor={s.orbSoft} />
            <Stop offset="42%" stopColor={s.orbBody} />
            <Stop offset="80%" stopColor={s.orbDeep} />
            <Stop offset="100%" stopColor={s.orbRim} />
          </RadialGradient>
          <RadialGradient id={specId} gradientUnits="userSpaceOnUse" cx={hx} cy={hy} rx={specR} ry={specR}>
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={isWhite ? 0.85 : 0.95} />
            <Stop offset="45%" stopColor="#FFFFFF" stopOpacity={0.4} />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={cx} cy={cy} r={r} fill={`url(#${haloId})`} />
        <Circle cx={cx} cy={cy} r={orbR} fill={`url(#${bodyId})`} />
        {/* White pole: spectrum held faintly INSIDE the glass (inner, low-opacity). */}
        {isWhite && crescent(orbR * 0.56, Math.max(1.2, orbR * 0.07), 0.32)}
        {/* Black pole: a silver ghost arc. Chromatics: a short secondary-hue arc. */}
        <Path
          d={arc(orbR * 0.9, -10, 100)}
          stroke={isBlack ? AURA_V2.silver : arcColor}
          strokeWidth={band}
          strokeLinecap="round"
          strokeOpacity={isBlack ? 0.5 : 0.85}
          fill="none"
        />
        <Circle cx={hx} cy={hy} r={specR} fill={`url(#${specId})`} />
        {/* Silver rim-light for separation from the obsidian field. */}
        <Circle cx={cx} cy={cy} r={orbR} fill="none" stroke={AURA_V2.silver} strokeWidth={1} strokeOpacity={0.16} />
      </Svg>
    );
  }

  // ── BASE — neutral prism (obsidian body + full spectrum crescent). ──────────
  return (
    <Svg width={size} height={size}>
      <Defs>
        <RadialGradient id={haloId} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} rx={r} ry={r}>
          <Stop offset="0%" stopColor={AURA_V2.silver} stopOpacity={0.16} />
          <Stop offset="60%" stopColor={AURA_V2.silver} stopOpacity={0.05} />
          <Stop offset="100%" stopColor={AURA_V2.silver} stopOpacity={0} />
        </RadialGradient>
        {/* Obsidian glass sphere: a slight lift near the highlight → deep near-black. */}
        <RadialGradient id={bodyId} gradientUnits="userSpaceOnUse" cx={hx} cy={hy} rx={orbR * 1.4} ry={orbR * 1.4}>
          <Stop offset="0%" stopColor="#3A3947" />
          <Stop offset="34%" stopColor="#17161E" />
          <Stop offset="74%" stopColor="#0C0B11" />
          <Stop offset="100%" stopColor={AURA_V2.obsidian} />
        </RadialGradient>
        <RadialGradient id={specId} gradientUnits="userSpaceOnUse" cx={hx} cy={hy} rx={specR} ry={specR}>
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.98} />
          <Stop offset="45%" stopColor="#FFFFFF" stopOpacity={0.42} />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={cx} cy={cy} r={r} fill={`url(#${haloId})`} />
      <Circle cx={cx} cy={cy} r={orbR} fill={`url(#${bodyId})`} />
      {crescent(orbR * 0.9, Math.max(1.5, orbR * 0.12), 0.95)}
      <Circle cx={hx} cy={hy} r={specR} fill={`url(#${specId})`} />
      <Circle cx={cx} cy={cy} r={orbR} fill="none" stroke={AURA_V2.silver} strokeWidth={1} strokeOpacity={0.16} />
    </Svg>
  );
}

interface CategoryMotifProps {
  /** Module id — resolves the PER-MODULE motif (preferred; falls back to category). */
  moduleId?: string;
  /** Category fallback when no moduleId is given. */
  category?: Category;
  /** Glyph / disc size in px. */
  size?: number;
  /** Override the glyph colour (defaults to the resolved accent). Ignored for aura. */
  color?: string;
  /** AURA ONLY — an outcome category key (e.g. 'white'). When set, the orb renders in
   *  `outcome` mode wearing that colour; otherwise it renders the neutral `base` prism. */
  auraOutcome?: string;
  /** AURA outcome ONLY — the secondary hue hex for the orb's rim arc (from the reading's
   *  `secondaryColor`); null/absent → the arc renders silver. */
  auraSecondary?: string | null;
  /** AURA ONLY — force the flat 2-tone `mono` orb (tiny placements). */
  auraMono?: boolean;
}

const CategoryMotif = memo(function CategoryMotif({
  moduleId,
  category = 'attachment',
  size = 24,
  color,
  auraOutcome,
  auraSecondary,
  auraMono,
}: CategoryMotifProps) {
  const { accent, motif } = moduleId ? moduleTheme(moduleId) : categoryTheme(category);
  // motif.kind 'wheel' is the aura module's token — now the Prism Orb.
  if (motif.kind === 'wheel') {
    const mode: OrbMode = auraMono ? 'mono' : auraOutcome ? 'outcome' : 'base';
    return <AuraOrb size={size} mode={mode} outcomeKey={auraOutcome} secondary={auraSecondary} />;
  }
  return <MaterialCommunityIcons name={motif.name} size={size} color={color ?? accent} />;
});

export default CategoryMotif;
