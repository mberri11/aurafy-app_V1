import React, { useState, useMemo, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/themes/ThemeProvider';
import { isPrismModule, moduleTheme } from '@/src/themes/categoryTheme';
import { useUserStore } from '@/src/store/userStore';
import { useReadingStore } from '@/src/store/readingStore';
import { MODULES, FREE_TRIAL_MODULE_ID } from '@/src/data/modules';
import { Person, ReadingMode } from '@/src/types';
import PersonInput from '@/src/components/PersonInput';
import GradientButton from '@/src/components/GradientButton';
import GlassCard from '@/src/components/GlassCard';
import StarsBadge from '@/src/components/StarsBadge';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';

const COLOR_OPTIONS = ['#A78BFA', '#2FEAAC', '#E84393', '#F5C542', '#60A5FA', '#FB923C'];

const SLOT_COUNTS: Record<ReadingMode, number> = {
  solo: 1,
  compare: 2,
  triangle: 3,
  circle: 4,
};

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export default function PersonEntryScreen() {
  const { moduleId, mode } = useLocalSearchParams<{ moduleId: string; mode: ReadingMode }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const isRTL = useIsRTL();
  const insets = useSafeAreaInsets();
  const { stars, spendStars } = useUserStore();
  const freeTrialUsed = useUserStore((s) => s.freeTrialUsed);
  const markFreeTrialUsed = useUserStore((s) => s.markFreeTrialUsed);
  const { startReading } = useReadingStore();

  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);
  const resolvedMode: ReadingMode = (mode as ReadingMode) ?? 'solo';
  const cost = module?.starsCost[resolvedMode] ?? 1;
  // The free-trial module's first reading costs nothing (any mode) until consumed.
  const isFreeTrial = moduleId === FREE_TRIAL_MODULE_ID && !freeTrialUsed;
  const effectiveCost = isFreeTrial ? 0 : cost;
  // Not enough stars to start (free trial is always affordable). Drives the locked/blurred
  // "You" card and the CTA's redirect-to-Stars behavior — no blocking popup.
  const canAfford = stars >= effectiveCost;
  const minSlots = SLOT_COUNTS[resolvedMode];
  // Only self-discovery modules (type 'solo') lock the reading to "You". Every other
  // module — even in solo mode — takes a name input (design 07-person-entry.png).
  const isLockedSelf = module?.type === 'solo' && resolvedMode === 'solo';

  const [persons, setPersons] = useState<Person[]>(() => {
    if (isLockedSelf) {
      return [{ id: generateId(), name: t('personEntry.you'), color: '#A78BFA' }];
    }
    return Array.from({ length: minSlots }, (_, i) => ({
      id: generateId(),
      name: '',
      color: COLOR_OPTIONS[i % COLOR_OPTIONS.length],
    }));
  });

  // Multi readings need distinguishable people — the quiz answers and the result's
  // "full picture" are meaningless with two identical "A"s. Case-insensitive on the
  // trimmed name; only counts filled fields so the hint never fires while typing
  // into empty slots.
  const hasDuplicates = useMemo(() => {
    const names = persons.map((p) => p.name.trim().toLowerCase()).filter((n) => n.length > 0);
    return new Set(names).size !== names.length;
  }, [persons]);

  const canStart = useMemo(
    () => persons.every((p) => p.name.trim().length > 0) && !hasDuplicates,
    [persons, hasDuplicates],
  );

  const updateName = useCallback((idx: number, name: string) => {
    setPersons((prev) => prev.map((p, i) => (i === idx ? { ...p, name } : p)));
  }, []);

  const updateColor = useCallback((idx: number, color: string) => {
    setPersons((prev) => prev.map((p, i) => (i === idx ? { ...p, color } : p)));
  }, []);

  const addPerson = useCallback(() => {
    if (persons.length >= 10) return;
    setPersons((prev) => [
      ...prev,
      {
        id: generateId(),
        name: '',
        color: COLOR_OPTIONS[prev.length % COLOR_OPTIONS.length],
      },
    ]);
  }, [persons.length]);

  const handleStart = useCallback(() => {
    if (isFreeTrial) {
      // First free reading — consume the trial, no stars spent.
      markFreeTrialUsed();
    } else if (stars < cost) {
      // Not enough stars — no blocking popup; route to Stars to earn more, matching
      // every other insufficient-balance entry point.
      router.push('/(tabs)/stars');
      return;
    } else {
      spendStars(cost, 'reading');
    }
    startReading(moduleId ?? '', resolvedMode, persons);
    // trial flag tells the quiz what THIS attempt charged, so a mid-quiz abandon can
    // give it back (stars refund vs. trial restore).
    router.push({
      pathname: '/quiz',
      params: { moduleId, mode: resolvedMode, trial: isFreeTrial ? '1' : '0' },
    });
  }, [isFreeTrial, markFreeTrialUsed, spendStars, stars, cost, startReading, moduleId, resolvedMode, persons]);

  const handleStarsPress = useCallback(() => router.push('/(tabs)/stars'), []);

  if (!module) return null;

  const accent = module.color;
  // Blooms use the spine's SOFT tone — dark module colors (jealous) wash out to
  // near-black at low opacity and made this screen read unlit.
  const bloomTint = moduleTheme(module.id).accentSoft;
  // Prismatic identity (aura_color): gradient bloom / card ring / avatar.
  const prism = isPrismModule(module.id);
  const g = theme.gradient;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Ambient depth base + per-module accent bloom (mirrors module detail / reading mode) */}
      <LinearGradient
        colors={theme.fieldGradient}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="entry_glow" cx="50%" cy="18%" r="60%">
            {prism
              ? [
                  <Stop key="p0" offset="0%" stopColor={g[1]} stopOpacity={0.22} />,
                  <Stop key="p1" offset="45%" stopColor={g[0]} stopOpacity={0.09} />,
                  <Stop key="p2" offset="80%" stopColor={g[2]} stopOpacity={0.04} />,
                  <Stop key="p3" offset="100%" stopColor={theme.background} stopOpacity={0} />,
                ]
              : [
                  <Stop key="s0" offset="0%" stopColor={bloomTint} stopOpacity={0.22} />,
                  <Stop key="s1" offset="55%" stopColor={bloomTint} stopOpacity={0.07} />,
                  <Stop key="s2" offset="100%" stopColor={theme.background} stopOpacity={0} />,
                ]}
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#entry_glow)" />
      </Svg>

      {/* Header: back button (left) + stars badge (right) */}
      <View style={[styles.header, { paddingTop: insets.top + rs(12) }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityLabel={t('common.back')}
          accessibilityRole="button"
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
        >
          <Feather name={isRTL ? 'chevron-right' : 'chevron-left'} size={rs(20)} color={theme.text} />
        </TouchableOpacity>
        <StarsBadge balance={stars} onPress={handleStarsPress} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.eyebrow, { color: theme.textMuted }]}>
          {t(`modules.${module.id}.title`).toUpperCase()}
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>
          {isLockedSelf ? t('personEntry.soloTitle') : t('personEntry.title')}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          {isLockedSelf ? t('personEntry.soloSubtitle') : t('personEntry.subtitle')}
        </Text>

        <View style={styles.entries}>
          {persons.map((person, idx) => {
            if (!isLockedSelf) {
              return (
                <PersonInput
                  key={person.id}
                  index={idx}
                  name={person.name}
                  color={person.color}
                  onNameChange={(name) => updateName(idx, name)}
                  onColorChange={(color) => updateColor(idx, color)}
                />
              );
            }
            // Self-discovery solo: name pre-filled as "You", locked — accent border +
            // glow mirror the selected mode card on reading-mode (Simo 2026-07-03).
            // Prism (aura_color): the accent border becomes a gradient ring and the
            // avatar fills with the brand gradient.
            const card = (
              <View style={styles.soloCardWrap}>
                <GlassCard
                  glowColor={prism ? g[1] : accent}
                  style={[
                    styles.soloCard,
                    prism
                      ? { borderWidth: 0 }
                      : { borderColor: accent, borderWidth: 2 },
                    {
                      shadowOpacity: 0.9,
                      shadowRadius: rs(20),
                      elevation: 14,
                    },
                  ]}
                >
                  <View style={styles.soloRow}>
                    {prism ? (
                      <LinearGradient
                        colors={g}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.soloAvatar}
                      >
                        <Text style={[styles.soloAvatarText, { color: theme.background }]}>
                          {person.name.charAt(0).toUpperCase() || 'Y'}
                        </Text>
                      </LinearGradient>
                    ) : (
                      <View style={[styles.soloAvatar, { backgroundColor: accent }]}>
                        <Text style={[styles.soloAvatarText, { color: theme.background }]}>
                          {person.name.charAt(0).toUpperCase() || 'Y'}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.soloNameLine}>
                      <Text style={[styles.soloName, { color: theme.text }]}>{person.name}</Text>
                      <Text style={[styles.soloLocked, { color: theme.textMuted }]}>
                        {'  ·  '}
                        {t('personEntry.locked')}
                      </Text>
                    </Text>
                  </View>
                </GlassCard>

                {/* Not enough stars → the "You" card reads as locked. Real gaussian blur
                    in a release/native build; on Expo Go (dev) the Android BlurView no-ops,
                    so the dark scrim underneath carries the locked look there. */}
                {!canAfford && (
                  <View pointerEvents="none" style={styles.lockOverlay}>
                    <BlurView intensity={22} tint="dark" style={StyleSheet.absoluteFill} />
                    <View style={[StyleSheet.absoluteFill, styles.lockScrim]} />
                  </View>
                )}
              </View>
            );
            return prism ? (
              <LinearGradient
                key={person.id}
                colors={g}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.soloRingPrism}
              >
                {card}
              </LinearGradient>
            ) : (
              <React.Fragment key={person.id}>{card}</React.Fragment>
            );
          })}

          {/* Add person button (circle mode only) */}
          {resolvedMode === 'circle' && persons.length < 10 && (
            <TouchableOpacity
              onPress={addPerson}
              style={[styles.addBtn, { borderColor: theme.surfaceBorder }]}
              accessibilityLabel={t('personEntry.addPerson')}
            >
              <Text style={[styles.addBtnText, { color: theme.textMuted }]}>
                + {t('personEntry.addPerson')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Pinned CTA */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + rs(20) }]}>
        {hasDuplicates && (
          <Text style={[styles.duplicateHint, { color: theme.rose }]}>
            {t('personEntry.duplicateNames')}
          </Text>
        )}
        <GradientButton
          label={isFreeTrial ? t('personEntry.startFree') : t('personEntry.startButton', { cost })}
          onPress={handleStart}
          disabled={!canStart}
          labelColor={theme.background}
          bold
          glow
          trailingIcon={isFreeTrial ? undefined : 'star-four-points'}
        />
        <View style={styles.balanceRow}>
          <Text style={[styles.balanceAfter, { color: theme.textMuted }]}>
            {t('personEntry.balanceAfter', { balance: Math.max(0, stars - effectiveCost) })}
          </Text>
          <MaterialCommunityIcons name="star-four-points" size={rs(12)} color={theme.textMuted} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    paddingBottom: rs(8),
  },
  backBtn: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Body */
  scroll: { flex: 1 },
  content: { paddingHorizontal: rs(28), paddingTop: rs(12) },
  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: rs(8),
  },
  title: {
    fontSize: rs(24),
    lineHeight: rs(30),
    fontFamily: 'PlayfairDisplay_400Regular',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: rs(13),
    lineHeight: rs(18),
    fontFamily: 'HankenGrotesk_400Regular',
    marginTop: rs(6),
  },

  entries: { gap: rs(12), marginTop: rs(22) },

  /* Solo "You · locked" card — selected-state treatment (accent border + glow) applied inline. */
  soloCardWrap: { position: 'relative' },
  soloCard: { padding: rs(16) },
  // Locked (insufficient-stars) veil over the "You" card — matches GlassCard's rs(20) radius.
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: rs(20),
    overflow: 'hidden',
    zIndex: 2,
  },
  lockScrim: { backgroundColor: 'rgba(7,9,26,0.5)' },
  soloRingPrism: { borderRadius: rs(22), padding: rs(2) },
  soloRow: { flexDirection: 'row', alignItems: 'center', gap: rs(14) },
  soloAvatar: {
    width: rs(46),
    height: rs(46),
    borderRadius: rs(23),
    alignItems: 'center',
    justifyContent: 'center',
  },
  soloAvatarText: { fontSize: rs(18), fontFamily: 'HankenGrotesk_700Bold' },
  soloNameLine: { flex: 1 },
  soloName: { fontSize: rs(16), fontFamily: 'HankenGrotesk_700Bold', opacity: 0.9 },
  soloLocked: { fontSize: rs(13), fontFamily: 'HankenGrotesk_400Regular', opacity: 0.6 },

  addBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: rs(16),
    paddingVertical: rs(14),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: rs(50),
  },
  addBtnText: { fontSize: rs(15), fontFamily: 'HankenGrotesk_400Regular' },

  /* Footer */
  footer: { paddingHorizontal: rs(28), paddingTop: rs(8) },
  duplicateHint: {
    fontSize: rs(12.5),
    fontFamily: 'HankenGrotesk_500Medium',
    textAlign: 'center',
    marginBottom: rs(10),
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(4),
    marginTop: rs(10),
    opacity: 0.65,
  },
  balanceAfter: { fontSize: rs(11.5), fontFamily: 'HankenGrotesk_400Regular' },
});
