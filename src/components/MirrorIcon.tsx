// ─────────────────────────────────────────────────────────────────────────────
// MirrorIcon — a HAND-DRAWN glyph for am_i_problem (Simo, 2026-07-27). Phosphor has
// no mirror, and pulling in a second icon library for one glyph would put a
// stroke-only Lucide icon in the Home grid next to twelve duotone Phosphor ones.
// Drawing it here keeps the set visually single-family at zero dependency cost.
//
// It implements Phosphor's own contract (`Icon = React.FC<IconProps>`) so it drops
// straight into ModuleIcon's registry and renders through the SAME code path as
// every other glyph — same size / colour / duotone props, theme tinting included.
//
// GRAMMAR (must match Phosphor or it will read as a foreign icon):
//   • 256×256 viewBox, content inside ~24px of padding
//   • 16-unit stroke, round caps + joins (Phosphor's `regular` weight)
//   • duotone = the enclosed shape filled in `duotoneColor` at `duotoneOpacity`,
//     drawn UNDER the outline — exactly what phosphor's icon-base does
// Phosphor ships filled compound paths rather than strokes; at these sizes a stroked
// path is optically identical, and it is how AuraOrb already draws.
//
// SHAPE: a standing oval mirror — glass, stem, foot, plus one short glint that says
// "reflective surface". A hand mirror was rejected: at rs(26) in a History row it
// reads as a magnifying glass.
//
// GEOMETRY, tuned against real Phosphor glyphs side by side (do not nudge blind):
//   • the glass stays clearly TALLER than wide (56×70). Rounder made it read as a
//     circle, which would collide with SmileySad on who_will_hurt_me one tile away.
//   • it is wider than a literal mirror wants to be, because a narrow glyph reads
//     lighter than Sparkle / Heart at the same `size` — this is optical sizing.
//   • the glint sits well inside the frame's INNER edge; pushed out even ~6 units it
//     fuses with the frame at small sizes and looks like a notch bitten out of it.
// ─────────────────────────────────────────────────────────────────────────────

import React, { memo } from 'react';
import Svg, { Ellipse, Path } from 'react-native-svg';
import type { Icon, IconProps } from 'phosphor-react-native';

/** Phosphor's `regular` stroke on the 256 grid. */
const STROKE = 16;
/** The glint is secondary detail, so it sits a step below the frame weight. */
const GLINT_STROKE = 12;

const MirrorIcon: Icon = memo(function MirrorIcon({
  size = 24,
  color = '#000',
  duotoneColor,
  duotoneOpacity = 0.2,
  weight = 'duotone',
  mirrored = false,
  style,
  testID,
}: IconProps) {
  // Same fallback as phosphor's icon-base: an unset duotoneColor tints with `color`.
  const bodyColor = duotoneColor ?? color;
  const showBody = weight === 'duotone';

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      testID={testID ?? 'aurafy-mirror'}
      style={[style, mirrored ? { transform: [{ scaleX: -1 }] } : null]}
    >
      {/* Duotone body — the glass, under everything. */}
      {showBody && (
        <Ellipse cx={128} cy={100} rx={56} ry={70} fill={bodyColor} opacity={duotoneOpacity} />
      )}
      {/* Frame */}
      <Ellipse cx={128} cy={100} rx={56} ry={70} fill="none" stroke={color} strokeWidth={STROKE} />
      {/* Stem — starts ON the frame's path so the two read as one object. */}
      <Path
        d="M128 170 L128 206"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      {/* Foot — the stem's round cap lands on it, so the join reads as one piece. */}
      <Path
        d="M98 214 L158 214"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      {/* Glint */}
      <Path
        d="M110 66 L96 96"
        stroke={color}
        strokeWidth={GLINT_STROKE}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
});

export default MirrorIcon;
