import React, { memo, useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import type { AmbientParticleTokens } from '../types';

/**
 * Theme-driven ambient particle layer — e.g. Desert Oracle's sand dusting.
 * Parameterized per theme via `ThemeColors.ambientParticles` and rendered ONCE
 * inside the shared CosmicField (behind the navigator), so it never re-mounts
 * on navigation.
 *
 * STATIC by design (Simo, 2026-07-19): plain Views, no Reanimated, no drift —
 * an animated version existed briefly but was cut for app smoothness. The motes
 * are pure atmosphere at zero runtime cost. Do not re-add motion here without
 * a new perf pass.
 */

interface MoteSpec {
  left: number;
  top: number;
  size: number;
  color: string;
  opacity: number;
}

function buildMotes(tokens: AmbientParticleTokens, w: number, h: number): MoteSpec[] {
  const motes: MoteSpec[] = [];
  const [minS, maxS] = tokens.size;
  const [minO, maxO] = tokens.opacity;
  for (let i = 0; i < tokens.count; i++) {
    motes.push({
      left: Math.random() * w,
      top: Math.random() * h,
      size: minS + Math.random() * (maxS - minS),
      color: tokens.colors[i % tokens.colors.length],
      opacity: minO + Math.random() * (maxO - minO),
    });
  }
  return motes;
}

const AmbientMotes = memo(function AmbientMotes({ tokens }: { tokens: AmbientParticleTokens }) {
  const { width, height } = useWindowDimensions();
  // Positions are rolled once per mount/theme (CosmicField keys this component
  // by theme.id) — stable across re-renders, fresh per theme switch.
  const motes = useMemo(() => buildMotes(tokens, width, height), [tokens, width, height]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {motes.map((m, i) => (
        <View
          key={i}
          style={[
            styles.mote,
            {
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              borderRadius: m.size / 2,
              backgroundColor: m.color,
              opacity: m.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
});

export default AmbientMotes;

const styles = StyleSheet.create({
  mote: { position: 'absolute' },
});
