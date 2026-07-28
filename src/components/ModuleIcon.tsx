// ─────────────────────────────────────────────────────────────────────────────
// MODULE ICON — the ONE component that draws a module's glyph, on every surface:
// Home card, module detail hero, unlock dialog, ad-gate orb, result reveal and the
// History rows. It replaced BOTH of the old icon paths (2026-07-24):
//
//   • the emoji `Module.icon`, which rendered from the DEVICE's system font — so a
//     module looked different on every phone and could fall back to a tofu box; and
//   • `CategoryMotif`'s MaterialCommunityIcons glyph, a second, independent table
//     that had already drifted (Home showed a crystal ball where History showed an
//     eye for the same module).
//
// Now there is exactly one source of truth — `Module.iconName` in src/data/modules.ts
// — and one renderer, this file. Screens NEVER import phosphor-react-native directly.
//
// BUNDLE RULE: every icon below is DEEP-imported (`phosphor-react-native/src/icons/X`).
// Metro does not tree-shake, so a barrel import (`from 'phosphor-react-native'`) would
// pull all ~1500 icons — roughly 14 MB of source — into the bundle. Adding an icon =
// add its name to `ModuleIconName` (src/types) + a deep import + a registry row;
// the `Record<ModuleIconName, Icon>` type makes a half-done addition a build error.
// ─────────────────────────────────────────────────────────────────────────────

import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Icon, IconWeight } from 'phosphor-react-native';

import { BabyIcon } from 'phosphor-react-native/src/icons/Baby';
import { EyeIcon } from 'phosphor-react-native/src/icons/Eye';
import { FlagPennantIcon } from 'phosphor-react-native/src/icons/FlagPennant';
import { FlameIcon } from 'phosphor-react-native/src/icons/Flame';
import { HeartIcon } from 'phosphor-react-native/src/icons/Heart';
import { HeartBreakIcon } from 'phosphor-react-native/src/icons/HeartBreak';
import { InfinityIcon } from 'phosphor-react-native/src/icons/Infinity';
import { LightningIcon } from 'phosphor-react-native/src/icons/Lightning';
import { MaskHappyIcon } from 'phosphor-react-native/src/icons/MaskHappy';
import { MaskSadIcon } from 'phosphor-react-native/src/icons/MaskSad';
import { MoonStarsIcon } from 'phosphor-react-native/src/icons/MoonStars';
import { PawPrintIcon } from 'phosphor-react-native/src/icons/PawPrint';
import { PersonIcon } from 'phosphor-react-native/src/icons/Person';
import { PlantIcon } from 'phosphor-react-native/src/icons/Plant';
import { ScanIcon } from 'phosphor-react-native/src/icons/Scan';
import { ScissorsIcon } from 'phosphor-react-native/src/icons/Scissors';
import { SmileySadIcon } from 'phosphor-react-native/src/icons/SmileySad';
import { SparkleIcon } from 'phosphor-react-native/src/icons/Sparkle';

// The one glyph Phosphor does not ship — drawn in-house to Phosphor's grammar so the
// set stays single-family. See its header before reaching for a second icon library.
import MirrorIcon from './MirrorIcon';

import { MODULES } from '../data/modules';
import {
  auraSkin,
  AURA_V2,
  FLAG_DUO,
  isDualFlagModule,
  isPrismModule,
  moduleTheme,
} from '../themes/categoryTheme';
import { resolveModuleCardStyle } from '../themes/moduleCardStyle';
import { useTheme } from '../themes/ThemeProvider';
import type { ModuleIconName } from '../types';

/** name → component. Typed against the union, so the two can never drift.
 *  NOTE: `MaskSadIcon` is deliberately absent — it is not a module's own glyph, only
 *  the back half of shadow_self's composed pair (see ShadowMaskGlyph). */
const PHOSPHOR: Record<ModuleIconName, Icon> = {
  Baby: BabyIcon,
  Eye: EyeIcon,
  Flame: FlameIcon,
  FlagPennant: FlagPennantIcon,
  Heart: HeartIcon,
  HeartBreak: HeartBreakIcon,
  Infinity: InfinityIcon,
  Lightning: LightningIcon,
  MaskHappy: MaskHappyIcon,
  Mirror: MirrorIcon,
  MoonStars: MoonStarsIcon,
  // PawPrint + Scan are registered AHEAD of their modules (energy_animal /
  // new_person_scanner, approved 2026-07-24 but not yet in modules.ts). Wire them by
  // adding the module row with `iconName: 'PawPrint' | 'Scan'` — nothing else changes.
  PawPrint: PawPrintIcon,
  Person: PersonIcon,
  Plant: PlantIcon,
  Scan: ScanIcon,
  Scissors: ScissorsIcon,
  SmileySad: SmileySadIcon,
  Sparkle: SparkleIcon,
};

/**
 * Aurafy's icon weight (Simo, 2026-07-24). Duotone = a low-opacity filled body under
 * the regular stroke, both in the accent — structurally the same two-tone treatment the
 * module tiles already use (accent-tinted plate + brighter ink). It keeps interior
 * detail at rs(90)/rs(150) where `fill` would flatten MoonStars / SmileySad into a
 * silhouette, and still carries enough body to read at rs(26) in a History row.
 */
const WEIGHT: IconWeight = 'duotone';

/** Phosphor's default (0.2) is tuned for light backgrounds and all but vanishes on
 *  the #07091A field — raised so the duotone body actually reads as an inner bloom. */
const DUOTONE_OPACITY = 0.35;

/** Fallback glyph for an id that is not a real module (defensive — every MODULES row
 *  declares an `iconName`, so this only fires on a bad/legacy id). */
const FALLBACK: ModuleIconName = 'Sparkle';

const MODULE_ICON_NAME: Record<string, ModuleIconName> = Object.fromEntries(
  MODULES.map((m) => [m.id, m.iconName]),
);

interface ModuleIconProps {
  /** Module id — resolves the glyph, and (unless `color` is given) its tint. */
  id: string;
  /** The glyph's RENDERED size in px. Tiles pass the inset glyph size, not the tile
   *  box (e.g. a 40dp Home tile passes rs(25)). */
  size?: number;
  /** Override the tint. Post-compute surfaces pass their OUTCOME colour here (the
   *  aura skin accent, a red/green flag band) so the glyph follows the verdict rather
   *  than the module's resting accent. */
  color?: string;
  /** AURA ONLY — an outcome category key (e.g. 'white'). Tints the Flame with that
   *  outcome's SMALL-ACCENT tone, so a saved reading keeps its colour. Absent → the
   *  module's resting violet. */
  auraOutcome?: string;
}

/** red_green_flag's identity is BOTH poles, so it draws its pennant twice, the two
 *  pointing in OPPOSITE directions (Simo, 2026-07-25).
 *
 *  The RED one is the mirrored one and comes FIRST. That ordering matters: FlagPennant
 *  has no pole, so mirroring the SECOND flag instead makes the two triangles meet
 *  tip-to-tip and read as a single bowtie. Mirroring the first puts both staffs
 *  together in the middle with the pennants flying outward — two flags planted back to
 *  back, red still on the start side. The pair spans ≈1.1× one glyph, because two small
 *  marks read lighter than one large one. */
function DualFlagGlyph({ size }: { size: number }) {
  const s = size * 0.58;
  return (
    <View style={styles.row}>
      <FlagPennantIcon
        size={s}
        color={FLAG_DUO.red}
        weight={WEIGHT}
        duotoneOpacity={DUOTONE_OPACITY}
        mirrored
      />
      <FlagPennantIcon
        size={s}
        color={FLAG_DUO.green}
        weight={WEIGHT}
        duotoneOpacity={DUOTONE_OPACITY}
        style={{ marginStart: -s * 0.11 }}
      />
    </View>
  );
}

/** shadow_self's pair is ACHROMATIC (Simo, 2026-07-27) — persona vs shadow, so the
 *  comedy mask you show reads WHITE and the tragedy mask you hide reads BLACK. Like
 *  aura's locked pearl/silver, these ignore the module accent and the theme's glyph
 *  tint; the module's indigo stays on the card, bar and glow.
 *
 *  The black mask can't be pure ink or it dissolves into the #07091A field, so its
 *  duotone BODY is lifted to a charcoal while the stroke stays black — from a step
 *  back it reads as a black mask with an edge, not as a hole. It also sits behind the
 *  white one, which gives its silhouette a second contrast edge. */
const SHADOW_MASK_WHITE = '#FFFFFF';
const SHADOW_MASK_BLACK = '#08070D';
const SHADOW_MASK_BLACK_BODY = '#3E3D4B';
const SHADOW_MASK_BLACK_OPACITY = 0.85;

/** shadow_self is a PAIR (Simo, 2026-07-25): the tragedy mask tilted away behind, the
 *  comedy mask in front — "the face you show over the side you hide". The front mask is
 *  drawn second so it overlaps, and the outward tilt gives the classic theatre pairing. */
function ShadowMaskGlyph({ size }: { size: number }) {
  const s = size * 0.68; // pair spans ≈1.15× one glyph after the overlap
  return (
    <View style={styles.row}>
      <View style={styles.tiltBack}>
        <MaskSadIcon
          size={s}
          color={SHADOW_MASK_BLACK}
          weight={WEIGHT}
          duotoneColor={SHADOW_MASK_BLACK_BODY}
          duotoneOpacity={SHADOW_MASK_BLACK_OPACITY}
        />
      </View>
      <View style={[styles.tiltFront, { marginStart: -s * 0.31 }]}>
        <MaskHappyIcon
          size={s}
          color={SHADOW_MASK_WHITE}
          weight={WEIGHT}
          duotoneOpacity={DUOTONE_OPACITY}
        />
      </View>
    </View>
  );
}

const ModuleIcon = memo(function ModuleIcon({
  id,
  size = 24,
  color,
  auraOutcome,
}: ModuleIconProps) {
  const theme = useTheme();

  if (isDualFlagModule(id)) {
    return <DualFlagGlyph size={size} />;
  }

  const isAura = isPrismModule(id);
  // AURA is ACHROMATIC at rest (Simo, 2026-07-25): a PEARL flame over a SILVER body —
  // the AURA_V2 white/black pair, never a hue. That is the module's real pre-reveal
  // identity (every single colour already belongs to another module), and it keeps the
  // glyph consistent with the obsidian card + spectrum hairline around it.
  const auraResting = isAura && !auraOutcome && !color;

  // Tint: an explicit outcome colour wins; then AURA's per-outcome tone (the skin's
  // SMALL-ACCENT, so rare Black resolves to silver and White to pearl rather than to
  // the near-invisible orb body); then aura's resting pearl; otherwise the ACTIVE
  // THEME's module-card skin resolves it exactly as the surrounding tile does —
  // `moduleCard.iconTint` when the theme overrides it (Desert Oracle / Elven Grove can
  // tint every module into their palette), else the module's own accent. Never a
  // hardcoded hex outside the locked AURA_V2 pair.
  const tint =
    color ??
    (isAura && auraOutcome
      ? auraSkin(auraOutcome).accent
      : isAura
        ? AURA_V2.pearl
        : resolveModuleCardStyle(theme, moduleTheme(id).accent).iconGlyph);
  // undefined → Phosphor falls back to the stroke colour, i.e. a single-tone glyph.
  const duotoneColor = auraResting ? AURA_V2.silver : undefined;

  // Achromatic locked pair — deliberately ignores `tint` (module accent / theme glyph
  // tint / any caller override), same as aura's resting pearl-on-silver.
  if (id === 'shadow_self') {
    return <ShadowMaskGlyph size={size} />;
  }

  const Glyph = PHOSPHOR[MODULE_ICON_NAME[id] ?? FALLBACK];
  return (
    <Glyph
      size={size}
      color={tint}
      weight={WEIGHT}
      duotoneColor={duotoneColor}
      duotoneOpacity={DUOTONE_OPACITY}
    />
  );
});

export default ModuleIcon;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  tiltBack: { transform: [{ rotate: '-9deg' }] },
  tiltFront: { transform: [{ rotate: '9deg' }] },
});
