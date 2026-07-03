// ─────────────────────────────────────────────────────────────────────────────
// CategoryMotif — renders a category's secondary motif (DESIGN-SPEC §0) inside a
// card/tile. A tinted MaterialCommunityIcons glyph for most categories; the aura
// category gets a small rainbow colour-wheel disc. Reused by History cards (and
// the Result / loading / share surfaces later) so the motif system lives once.
// ─────────────────────────────────────────────────────────────────────────────

import React, { memo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { Category, categoryTheme, moduleTheme } from '@/src/themes/categoryTheme';

/** Hues for the aura colour-wheel, walking the spectrum once around the disc. */
const WHEEL_HUES = ['#F472B6', '#FB7185', '#FBBF24', '#34D399', '#22D3EE', '#A78BFA'];

function ColorWheel({ size }: { size: number }) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const n = WHEEL_HUES.length;
  return (
    <Svg width={size} height={size}>
      {WHEEL_HUES.map((hue, i) => {
        const a0 = (i / n) * 2 * Math.PI - Math.PI / 2;
        const a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
        const x0 = cx + r * Math.cos(a0);
        const y0 = cy + r * Math.sin(a0);
        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        return <Path key={hue} d={`M${cx},${cy} L${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1} Z`} fill={hue} />;
      })}
      {/* Punched-out centre → reads as a halo / aura ring, not a solid pie. */}
      <Circle cx={cx} cy={cy} r={r * 0.42} fill="#0c0810" opacity={0.9} />
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
}

const CategoryMotif = memo(function CategoryMotif({
  moduleId,
  category = 'attachment',
  size = 24,
  color,
}: CategoryMotifProps) {
  const { accent, motif } = moduleId ? moduleTheme(moduleId) : categoryTheme(category);
  if (motif.kind === 'wheel') return <ColorWheel size={size} />;
  return <MaterialCommunityIcons name={motif.name} size={size} color={color ?? accent} />;
});

export default CategoryMotif;
