import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BackHandler,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/themes/ThemeProvider';
import { auraSkin, AURA_V2, darkenHex, FLAG_BAND_THEME, flagOutcomeKey, flagOutcomeTheme, isDualFlagModule, moduleTheme } from '@/src/themes/categoryTheme';
import ModuleIcon from '@/src/components/ModuleIcon';
import AuraOrb from '@/src/components/AuraOrb';
import { useReadingStore } from '@/src/store/readingStore';
import { useUserStore } from '@/src/store/userStore';
import { AdMobManager } from '@/src/ads/AdMobManager';
import { maybeShowInterstitial } from '@/src/ads/interstitialGate';
import { captureRef } from 'react-native-view-shot';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import ShareCard, { SHARE_CARD_H, SHARE_CARD_W } from '@/src/components/ShareCard';
import { saveImageToGallery, shareImage, shareResult } from '@/src/utils/share';
import { successNotification, lightTap } from '@/src/utils/haptics';
import { MODULES } from '@/src/data/modules';
import { Reading, Language, SoloResults, CategoricalResults, FlagBand } from '@/src/types';
import { joinNames } from '@/src/engine/scoringEngine';
import { attachmentStyleResults } from '@/src/data/results/attachmentStyleResults';
import { amITheProblemResults } from '@/src/data/results/amITheProblemResults';
import { auraColorResults } from '@/src/data/results/auraColorResults';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';
import { playEffect } from '@/src/utils/sound';

// Delay before the reveal-name entrance begins — shared by the animation and the
// reveal chime so the sound lands exactly when the name starts animating in.
const REVEAL_DELAY_MS = 250;

// red_green_flag COMPARE/CIRCLE big title — TODO(Prompt 1C): replace this fixed
// placeholder with the distribution-based group-verdict → title selector. Kept a
// plain constant on purpose so this display-layer change ships standalone without
// pre-empting 1C's selector (the engine already stores result.groupVerdict). SOLO
// mode does NOT use this — it reads the single person's real band.
const FLAG_COMPARE_TITLE_BAND: FlagBand = 'NEUTRAL';

const SOLO_RESULTS: Record<string, SoloResults> = {
  attachment_style: attachmentStyleResults,
  am_i_problem: amITheProblemResults,
};

const CATEGORICAL_RESULTS: Record<string, CategoricalResults> = {
  aura_color: auraColorResults,
};

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export default function ResultScreen() {
  const { viewOnly, readingId } = useLocalSearchParams<{
    viewOnly?: string;
    readingId?: string;
  }>();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = useIsRTL();
  const insets = useSafeAreaInsets();
  const language = i18n.language as Language;
  const {
    currentResult,
    currentPersons,
    currentAnswers,
    currentModuleId,
    currentMode,
    currentQuestionIds,
    viewOnlyResult,
    viewOnlyPersons,
  } = useReadingStore();
  const resultUnlocked = useReadingStore((s) => s.resultUnlocked);
  const setResultUnlocked = useReadingStore((s) => s.setResultUnlocked);
  const { addReading, incrementReadingCount, spendStars, stars } = useUserStore();
  const readingCount = useUserStore((s) => s.readingCount);
  const markReadingUnlocked = useUserStore((s) => s.markReadingUnlocked);

  const isViewOnly = viewOnly === '1';
  const result = isViewOnly ? viewOnlyResult : currentResult;
  // The History entry this reopen is showing, subscribed live so unlocking from here
  // re-renders straight out of the persisted flag (no second copy of the state to sync).
  const viewOnlyEntry = useUserStore((s) =>
    readingId ? s.history.find((h) => h.id === readingId) : undefined,
  );
  // Option C two-tier: minimal (name + verdict + confidence) until unlocked via the
  // gate or the unlock card below.
  //
  // A reopen used to be `isViewOnly || resultUnlocked` — unconditionally unlocked —
  // which made the whole gate optional: Skip → Save & exit → reopen from History gave
  // the full reading for free. It now reads the flag persisted ON THE READING, so the
  // state is identical at reveal and on every reopen. `?? true` covers readings saved
  // before the flag existed (and the dev panel, which pushes no readingId): they were
  // already viewable in full, so they stay that way.
  //
  // Zero-signal short-circuits both branches: Section G refunds that reading, so the
  // gate must not turn round and charge for the same non-result.
  const isZeroSignalResult = result?.isZeroSignal === true;
  const unlocked =
    isZeroSignalResult || (isViewOnly ? viewOnlyEntry?.unlocked ?? true : resultUnlocked);
  const [adFailed, setAdFailed] = useState(false);

  // Reveal animation for the eyebrow + big title
  const titleScale = useSharedValue(0.85);
  const titleOpacity = useSharedValue(0);

  // §3 honest confidence line — percentile vs the user's OWN past readings. Captured at
  // render time (refs initialize before effects), so for a fresh reading this snapshot
  // excludes the reading the save-effect below is about to add. Cold start (<5 prior
  // readings) shows no comparison line at all.
  const priorConfidences = useRef(
    useUserStore.getState().history.map((h) => h.result.confidence),
  ).current;

  // Id of the row the save effect wrote, so a later unlock can persist onto it.
  const savedReadingIdRef = useRef<string | null>(null);
  // Set by applyUnlock. Normally the save effect commits first (passive effects flush
  // before any touch can be handled), so this is false when the row is written. It
  // exists for the inverted order: an unlock landing BEFORE the save would find a null
  // id, no-op markReadingUnlocked, and then be clobbered by a `false` write. ORing this
  // in makes losing the unlock structurally impossible instead of merely unlikely.
  const unlockedBeforeSaveRef = useRef(false);

  useEffect(() => {
    if (!result || isViewOnly) return;
    // A zero-signal read has no content — saving it would leave a dead row in History
    // that reopens to "No Signal" and nothing else. The attempt was refunded in
    // loading.tsx, so it costs the user nothing and leaves no trace.
    if (result.isZeroSignal) return;
    // Kept so an unlock performed AFTER this save (via the unlock card below) can flip
    // the persisted flag on the row this effect just wrote.
    const id = generateId();
    savedReadingIdRef.current = id;
    const reading: Reading = {
      id,
      moduleId: currentModuleId,
      mode: currentMode,
      persons: currentPersons,
      answers: currentAnswers,
      result,
      createdAt: Date.now(),
      // The exact served set (pooled modules vary it) — lets History reopens show
      // what was actually asked.
      questionIds: currentQuestionIds,
      // Whatever the gate decided for THIS reading, persisted with it. Skip → false,
      // so the reopen is locked too instead of handing the full reading over free.
      // No `|| isZeroSignal` term: the guard above already returned for zero-signal
      // reads, so one can never reach this object (tsc narrows the flag to
      // false|undefined here and rejects the comparison outright).
      // The ref term can only be true if an unlock beat this write — see its comment.
      unlocked: resultUnlocked || unlockedBeforeSaveRef.current,
    };
    addReading(reading);
    // readingCount keeps ticking for the Phase-4 frequency-capped interstitial; the old
    // every-3rd-reading interstitial here stacked with the loading.tsx rewarded gate and
    // was removed — real placement returns with the AdMob wiring, at a natural transition.
    incrementReadingCount();
    successNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    titleScale.value = withDelay(REVEAL_DELAY_MS, withSpring(1, { stiffness: 200, damping: 16 }));
    titleOpacity.value = withDelay(REVEAL_DELAY_MS, withTiming(1, { duration: 500 }));
    // Reveal chime, synced to the VISIBLE start of the entrance (after the same
    // delay) — not screen mount. This one entrance drives EVERY result type: multi
    // winner name, solo verdict word, and the categorical (aura) label all animate
    // in through this shared titleScale/titleOpacity, so one hook covers both paths.
    // History reopens are review, not ceremony — the entrance still plays, the
    // chime does not.
    if (isViewOnly) return;
    const chime = setTimeout(() => playEffect('reveal'), REVEAL_DELAY_MS);
    return () => clearTimeout(chime);
  }, [titleScale, titleOpacity, isViewOnly]);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
    opacity: titleOpacity.value,
  }));

  const module = result ? MODULES.find((m) => m.id === result.moduleId) : undefined;
  const isMulti = module?.type === 'multi';
  const isCategorical = module?.resultKind === 'categorical';
  // A MIGRATED `multi` module read in SOLO mode → a "signs present" COUNT about one
  // person, not a contest. Gated on the persisted `isCountResult` flag (set only by
  // generateCountResult), NOT on signalTotal — that's set for EVERY solo-read multi,
  // including ones still on the winner-race fallback. Persisted, so History reopens too.
  const isCount = isMulti && !!result?.isCountResult;

  // Winning category's content block for categorical modules (aura_color) — the
  // label re-resolves from the persisted dominantDimension, so History reopens work.
  const categoricalCategory = useMemo(() => {
    if (!result || !isCategorical) return null;
    const cr = CATEGORICAL_RESULTS[result.moduleId];
    if (!cr) return null;
    return cr.categories[result.dominantDimension] ?? cr.categories[Object.keys(cr.categories)[0]] ?? null;
  }, [result, isCategorical]);

  // Big-title verdict word for self-discovery modules (e.g. "Secure" / "Violet").
  const verdictWord = useMemo(() => {
    if (!result || isMulti) return null;
    if (isCategorical) return categoricalCategory?.label ?? null;
    if (!result.verdict) return null;
    const sr = SOLO_RESULTS[result.moduleId];
    return sr ? sr.verdictLabel[result.verdict] : null;
  }, [result, isMulti, isCategorical, categoricalCategory]);

  // Share/Save = the off-screen ShareCard captured at story size (1080×1920); the
  // old text share stays as the Share fallback (web / capture unavailable).
  const shareCardRef = useRef<View>(null);
  const captureCard = useCallback(
    () =>
      captureRef(shareCardRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
        // Names the saved/shared file. Without it the library's default prefix
        // ("ReactNative-snapshot-image…") is what lands in the user's gallery and in
        // whatever they share it to. Android-only option, ≥3 chars; the platform still
        // appends random digits, which is what keeps repeat saves from colliding.
        fileName: 'Aurafy_reading_',
        width: 1080,
        height: 1920,
      }),
    [],
  );
  const handleShare = useCallback(async () => {
    if (!result) return;
    try {
      const uri = await captureCard();
      if (await shareImage(uri, t('shareCard.dialogTitle'))) return;
    } catch {
      // capture unavailable — fall through to the text share
    }
    const insights = result.insights.map((i) => i[language] ?? i.en).join('\n\n');
    // A clustered ("too close to call") or zero-signal ("no signal recorded") read makes
    // no confidence claim on screen — appending "— 50% confidence" here contradicted it.
    // Drop the suffix entirely rather than substituting another number. Read off `result`
    // (not the render-scope flags, which are declared further down) so the deps stay [result].
    const noConfidenceClaim = result.isClustered === true || result.isZeroSignal === true;
    const text = noConfidenceClaim
      ? `My Aurafy reading:\n\n${insights}`
      : `My Aurafy reading:\n\n${insights}\n\n— ${result.confidence}% confidence`;
    await shareResult(text);
  }, [result, language, t, captureCard]);

  // Top-edge scrim (mirrors the bottom bar's fade). Its OPACITY rides the scroll
  // instead of being painted permanently: the ambient field gradient + the bloom/orb
  // Svg glows are painted BELOW the ScrollView, so a permanently-opaque strip would
  // flatten that glow inside the status-bar band and change the header at rest. Fading
  // it in over the first rs(24) of scroll keeps position 0 pixel-for-pixel as it is,
  // and only masks the band once there is scrolling content to mask.
  //
  // rs() is a PLAIN JS function — calling it inside a worklet crashes the screen
  // ("Tried to synchronously call a non-worklet function on the UI thread"), so every
  // dp value is resolved here on the JS thread and the worklets close over numbers only.
  const SCRIM_FADE_IN = rs(24); // scroll distance over which the scrim reaches full
  const SCRIM_TAIL = rs(8); // fade-out height below the status bar
  const scrimH = insets.top + SCRIM_TAIL;
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });
  const topScrimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, SCRIM_FADE_IN], [0, 1], Extrapolation.CLAMP),
  }));

  // The sticky action bar's REAL height, measured. Its height is not one number: it
  // changes with the tier (Share row present only when unlocked), with the zero-signal
  // single-button row, with a button label that wraps to two lines (GradientButton is
  // minHeight, not height), with the transient "saved" line, and with the bottom inset.
  // The old hardcoded paddingBottom was a guess against all of that and lost — insight
  // text scrolled to rest underneath the buttons. onLayout is exact in every state.
  const [actionBarH, setActionBarH] = useState(0);
  const onActionBarLayout = useCallback((e: LayoutChangeEvent) => {
    const h = Math.round(e.nativeEvent.layout.height);
    setActionBarH((prev) => (prev === h ? prev : h));
  }, []);

  // Save-to-gallery beside Share, with a transient confirmation line.
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashSavedMsg = useCallback((msg: string) => {
    setSavedMsg(msg);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSavedMsg(null), 2500);
  }, []);
  useEffect(
    () => () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    },
    [],
  );
  const handleSave = useCallback(async () => {
    lightTap();
    try {
      const uri = await captureCard();
      if (await saveImageToGallery(uri)) {
        successNotification();
        flashSavedMsg(t('shareCard.saved'));
        return;
      }
    } catch {
      // capture failed — fall through to the denied/error hint
    }
    flashSavedMsg(t('shareCard.saveDenied'));
  }, [captureCard, flashSavedMsg, t]);

  // One unlock, written to BOTH places: the session flag (drives this render) and the
  // saved reading's persisted flag (so reopening it later is free forever). On a fresh
  // reading the target row is the one the save effect wrote; on a History reopen it is
  // the row that was reopened. Without the persisted half, a user could be charged
  // again for the same reading on every reopen.
  const applyUnlock = useCallback(() => {
    setResultUnlocked(true);
    unlockedBeforeSaveRef.current = true;
    const id = isViewOnly ? readingId : savedReadingIdRef.current;
    if (id) markReadingUnlocked(id);
  }, [isViewOnly, readingId, setResultUnlocked, markReadingUnlocked]);

  // Unlock card actions — same fair trade as the gate: a rewarded ad or 1★.
  const handleUnlockWatch = useCallback(async () => {
    const watched = await AdMobManager.showRewarded();
    if (watched) {
      applyUnlock();
      successNotification();
    } else {
      setAdFailed(true);
    }
  }, [applyUnlock]);

  const handleUnlockStar = useCallback(() => {
    lightTap();
    if (spendStars(1, 'result_unlock')) {
      applyUnlock();
      successNotification();
    }
  }, [spendStars, applyUnlock]);

  // Frequency-capped interstitial on a user-initiated EXIT of a FRESH reading only
  // (never on share, never on unmount, never on a History reopen). Fire-and-forget:
  // the SDK overlays on top and we're already home when it closes — so we do NOT await.
  const maybeInterstitialOnExit = useCallback(() => {
    if (isViewOnly) return;
    void maybeShowInterstitial(readingCount);
  }, [isViewOnly, readingCount]);

  const handleTryAnother = useCallback(() => {
    lightTap();
    maybeInterstitialOnExit();
    // Collapse the whole reading-flow stack (module → … → result) — a plain replace
    // left every flow screen alive beneath the tabs, so hardware back from a tab
    // walked into a dead quiz instead of exiting the app.
    router.dismissAll();
    router.navigate('/(tabs)');
  }, [maybeInterstitialOnExit]);

  // Zero-signal: the only sensible next step is to answer again. Straight back to
  // person-entry for the SAME module/mode, with the refunded star (or the restored free
  // trial) already back in the wallet, so the retake costs what the first attempt did.
  // dismissAll first, for the same reason handleTryAnother does it — otherwise the dead
  // quiz/loading screens stay alive under the new one.
  const handleRetake = useCallback(() => {
    lightTap();
    router.dismissAll();
    router.navigate({
      pathname: '/person-entry',
      params: { moduleId: currentModuleId, mode: currentMode },
    });
  }, [currentModuleId, currentMode]);

  const handleSaveExit = useCallback(() => {
    lightTap();
    maybeInterstitialOnExit();
    router.dismissAll();
    router.navigate('/(tabs)/history');
  }, [maybeInterstitialOnExit]);

  // Hardware back on a FRESH result acts as "Save & exit" — it must never fall
  // through into the flow beneath. View-only reopens (from History) keep the default
  // pop back to History.
  useEffect(() => {
    if (isViewOnly) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      handleSaveExit();
      return true;
    });
    return () => sub.remove();
  }, [isViewOnly, handleSaveExit]);

  if (!result) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>{t('result.notFound')}</Text>
      </View>
    );
  }

  // Category spine (DESIGN-SPEC §0, per-MODULE since 2026-07-02): the MODULE's theme
  // drives every accent on this screen — glow, eyebrow, confidence bar, ✦ markers,
  // Share pill — not the winner's avatar colour. Two modules sharing a category
  // (Who Loves Me / Who Admires) still read as two different experiences.
  // Aura Color is the sole exception: it glows in the OUTCOME color the user got.
  // Aura resolves the FULL per-outcome skin (name/bar/CTA all differ by colour so Black
  // and White read as opposites); other modules keep their single module accent, with
  // name/bar/CTA falling back to the historic white-name + accent-pill treatment.
  const isAura = result.moduleId === 'aura_color';
  const skin = isAura ? auraSkin(result.dominantDimension) : null;
  const isRare = !!skin?.rare;
  // A chromatic aura outcome (violet/blue/green/gold/red/rose) — its Share pill takes the
  // outcome colour itself (violet button for Violet, gold for Gold…); rares keep their
  // obsidian/pearl pill.
  const chromaticAura = isAura && !!skin && !isRare;
  // Top scrim ink: fieldGradient[0] is literally what the ambient base paints at y = 0,
  // so the scrim is invisible against it — the action bar's flat theme.background would
  // read as a band up here, where the field gradient is at its lightest.
  const topScrimColor = isAura ? AURA_V2.obsidian : theme.fieldGradient[0];
  // RED/GREEN dual identity: red_green_flag re-colors per OUTCOME like aura does —
  // green (none/low), amber (medium "Mixed Signals"), red (high + every circle read).
  // Accent-pair only; name/bar/CTA keep the standard white-name + accent treatment.
  const dualOutcome = isDualFlagModule(result.moduleId)
    ? flagOutcomeTheme(flagOutcomeKey(result))
    : null;
  const { accent, accentSoft } = skin ?? dualOutcome ?? moduleTheme(result.moduleId);
  const nameColor = skin?.name ?? theme.text;
  const nameGlow = skin?.nameGlow ?? accent;
  const barFill = skin?.bar ?? accent;
  const barTrack = skin?.barTrack ?? theme.surface;
  const ctaColors: [string, string] = chromaticAura
    ? [skin!.bar, darkenHex(skin!.bar, 0.24)]
    : skin?.cta ?? [accent, darkenHex(accent, 0.22)];
  const ctaText = chromaticAura ? AURA_V2.obsidian : skin?.ctaText ?? theme.background;
  const ctaBorder = skin?.ctaBorder;
  // The runner-up hue, when the reading landed close enough to a second colour
  // (AURA_SECONDARY_THRESHOLD in scoringEngine). Drives the orb's rim arc, which is
  // how a two-colour aura shows its second colour; null → the arc renders silver.
  const auraSecondary = isAura ? result.secondaryColor ?? null : null;
  const rareLabelKey =
    result.dominantDimension === 'black'
      ? 'result.aura.rareKeeper'
      : result.dominantDimension === 'white'
        ? 'result.aura.rareClearLight'
        : null;
  // Count path frames the reveal as being ABOUT the person ("ABOUT SIMO"), not a module
  // subtitle — the person's name lives in the eyebrow, the ratio is the reveal itself.
  const eyebrow = isCount
    ? t('result.count.aboutEyebrow', { name: result.winner?.name ?? '' }).toUpperCase()
    : t(`modules.${result.moduleId}.subtitle`, { defaultValue: '' }).toUpperCase();

  const personCount = Object.keys(result.scores).length;
  const showComparison = isMulti && !isCount && personCount > 1;
  // Multi tie: 2+ persons at the max score — reveal ALL of them; never imply an
  // arbitrary single winner. Readings persisted before ties shipped carry neither
  // field → [] → normal single-winner path.
  const tiedWinners = result.tiedWinners ?? [];
  // CLUSTERED: a flat read across 3+ people. Nobody is crowned — the big title is the
  // name-free clusterTitle and the confidence row becomes "too close to call". Older
  // persisted readings carry neither field → normal winner/tie path.
  // ZERO-SIGNAL: nobody was picked once. It reuses clusterTitle (holding the zeroTitle),
  // so it must be excluded from isClustered — the two say different things and show
  // different lines where the confidence bar was.
  const clusterTitle = result.clusterTitle?.[language] ?? result.clusterTitle?.en ?? null;
  const isZeroSignal = isMulti && !isCount && result.isZeroSignal === true;
  const isClustered = isMulti && !isCount && !isZeroSignal && !!clusterTitle;
  // Zero-signal leaves everyone tied at 0 — that is an absence, not a tie verdict.
  const isTie = isMulti && !isClustered && !isZeroSignal && tiedWinners.length > 1;
  // Verdict line under the reveal name — the winner template minus the name itself
  // ("Simo loves you the most." → "loves you the most.", per the Result PNGs). Shown for
  // EVERY multi reading with a winner, not just single-person ones. On a tie,
  // insights[0] IS the full tie verdict (no leading name to strip). result.verdictLine
  // is derived per-locale from the RAW template at generation time; readings persisted
  // before it shipped fall back to the legacy name-strip of the populated sentence.
  const winnerSentence = result.insights[0]?.[language] ?? result.insights[0]?.en ?? '';
  // red_green_flag: the big title shows the VERDICT (band name / group-verdict
  // title), never a person's name — the name lives in the subtitle + share card.
  const isFlag = isDualFlagModule(result.moduleId);
  const winnerSubtitle =
    // clustered → the clusterLine; zero-signal → the zeroLine; tie → the tie verdict;
    // count → the tiered template; flag → the group-verdict sentence. All already read
    // as whole, self-contained sentences.
    isClustered || isZeroSignal || isTie || isCount || isFlag
      ? winnerSentence
      : isMulti && result.winner
        ? result.verdictLine?.[language] ??
          result.verdictLine?.en ??
          winnerSentence.replace(`${result.winner.name} `, '')
        : null;

  // red_green_flag big title = the VERDICT, never a name:
  //   • SOLO    → the single person's real band title (result.bands[thePerson])
  //   • COMPARE → the standout verdict title, selected + localized at generation
  //     time (result.verdictTitle). Older readings without it fall back to the
  //     NEUTRAL placeholder.
  const flagSoloBand: FlagBand | undefined =
    isFlag && isCount ? result.bands?.[result.winner?.id ?? ''] : undefined;
  const flagCompareTitle =
    isFlag && !isCount
      ? result.verdictTitle?.[language] ??
        result.verdictTitle?.en ??
        t(`result.flagTitles.${FLAG_COMPARE_TITLE_BAND}`)
      : undefined;

  // Count path: the reveal is the honest signal PERCENTAGE (confidence now IS the share,
  // post floor-removal), NOT a name-as-verdict — same big typography as a winner name.
  // The ratio demotes to the sub-line below; the percentage is the one hero number.
  const bigTitle = flagSoloBand
    ? t(`result.flagTitles.${flagSoloBand}`)
    : flagCompareTitle
      ? flagCompareTitle
      : isCount
        ? `${result.confidence}%`
        : isMulti
          ? // Clustered and zero-signal reads crown NOBODY — the name-free verdict IS
            // the title (clusterTitle carries both).
            clusterTitle ??
            (isTie
              ? joinNames(tiedWinners.map((p) => p.name), language)
              : result.winner?.name ?? '')
          : (verdictWord?.[language] ?? verdictWord?.en ?? '');

  const confidence = result.confidence;
  // §3: percentile of this confidence against the user's OTHER past readings. The
  // numerator is a strict `<`, so an equal-scoring reading never counts as beaten and
  // a reading can never rank above itself.
  //
  // The pool must also EXCLUDE the reading being described, on both routes. A fresh
  // reading gets that for free — the snapshot is taken before the save effect runs —
  // but a History reopen finds itself already in `history` and was padding its own
  // denominator, so the same reading read 100% at reveal and 83% when reopened. Drop
  // one entry on the reopen and the two agree.
  const priorCount = priorConfidences.length - (isViewOnly ? 1 : 0);
  const showPercentile = priorCount >= 5;
  const percentile = showPercentile
    ? Math.round((priorConfidences.filter((c) => c < confidence).length / priorCount) * 100)
    : 0;
  const bullets = result.insights.slice(1);
  // EVERY number on the comparison card — bar length, the "N signals" count and the
  // share percentage — comes from the same UNWEIGHTED pick counts that decide the
  // winner. Nothing on this screen may be derived from the weighted `scores`: that is
  // exactly what let a bar contradict the verdict above it. Readings persisted before
  // pickCounts existed fall back to `scores`, which for them WAS the displayed number.
  const cardCounts = result.pickCounts ?? result.scores;
  // Leader-relative bar, so a clear winner in a 5-person circle still reads strong
  // instead of a weak-looking 40%. Floors at 1 so a zero-signal read divides safely
  // (0/1 = an empty track for everyone).
  const maxPicks = Math.max(...Object.values(cardCounts), 1);
  // Total signal actually recorded — with the "No one" option this can be less than
  // the question count, since questions that pointed at nobody award nothing.
  const pickTotal = Object.values(cardCounts).reduce((sum, v) => sum + v, 0);
  // Persons for the comparison card: live session persons for a fresh reading,
  // the persisted persons for a History reopen (session state is empty there —
  // this is what fixed the empty "THE FULL PICTURE" card).
  const cardPersons = isViewOnly ? viewOnlyPersons : currentPersons;
  // red_green_flag: the card lists EVERY participant by signed net, greenest first,
  // each with their own band chip — so nobody is implied clear while banded red.
  const flagNets = result.netScores;
  const comparisonPersons = flagNets
    ? [...cardPersons].sort((a, b) => (flagNets[b.id] ?? 0) - (flagNets[a.id] ?? 0))
    : cardPersons;

  return (
    <View style={[styles.container, { backgroundColor: isAura ? AURA_V2.obsidian : theme.background }]}>
      {/* iOS swipe-dismiss must not fall into the flow beneath a fresh result;
          view-only reopens keep the gesture (their way back to History). */}
      <Stack.Screen options={{ gestureEnabled: isViewOnly }} />
      {/* Ambient base + module-tinted top bloom (aura sits on flat obsidian). */}
      <LinearGradient
        colors={isAura ? [AURA_V2.obsidian, AURA_V2.obsidian, AURA_V2.obsidian] : theme.fieldGradient}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          {/* Main category-tinted bloom behind the reveal header. */}
          <RadialGradient id="result_bloom" cx="50%" cy="10%" r="58%">
            <Stop offset="0%" stopColor={accentSoft} stopOpacity={0.26} />
            <Stop offset="45%" stopColor={accent} stopOpacity={0.1} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
          {/* Softer offset orb top-end — the warm sphere in the Result PNGs. */}
          <RadialGradient id="result_orb" cx="80%" cy="13%" r="26%">
            <Stop offset="0%" stopColor={accentSoft} stopOpacity={0.34} />
            <Stop offset="70%" stopColor={accentSoft} stopOpacity={0.08} />
            <Stop offset="100%" stopColor={accentSoft} stopOpacity={0} />
          </RadialGradient>
          {/* Floor bloom — fills the minimal tier's short-content bottom void. SOFT tone
              + higher opacity (the accent version was invisible even on gold). */}
          <RadialGradient id="result_floor" cx="50%" cy="112%" r="60%">
            <Stop offset="0%" stopColor={accentSoft} stopOpacity={0.22} />
            <Stop offset="60%" stopColor={accentSoft} stopOpacity={0.06} />
            <Stop offset="100%" stopColor={accentSoft} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#result_bloom)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#result_orb)" />
        {!unlocked && <Rect x="0" y="0" width="100%" height="100%" fill="url(#result_floor)" />}
      </Svg>


      <Animated.ScrollView
        style={styles.flex}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + rs(28),
            // Clear the sticky bar by MEASUREMENT, not by a constant. actionBarH already
            // includes the bar's own padding and the bottom inset; rs(24) is breathing
            // room so the last line rests clear of it rather than touching. The old
            // constants stand in only for the single frame before first layout.
            paddingBottom: actionBarH
              ? actionBarH + rs(24)
              : insets.bottom + (isViewOnly ? rs(124) : rs(184)),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Eyebrow + luminous reveal name over the faint category motif */}
        <Animated.View style={[styles.header, titleStyle]}>
          {/* Oversized module motif ghosted behind the name (spec §0 secondary accent).
              Aura is the exception: the reveal keeps the PRISM ORB in the outcome colour
              (+ the secondary hue on its rim arc), not the Flame glyph — the Flame is the
              module's mark on Home/detail/History, the orb is what carries the colour the
              user actually got. See src/components/AuraOrb.tsx. */}
          <View pointerEvents="none" style={styles.motifWrap}>
            {isAura ? (
              <AuraOrb
                size={rs(150)}
                mode="outcome"
                outcomeKey={result.dominantDimension}
                secondary={auraSecondary}
              />
            ) : (
              <ModuleIcon id={result.moduleId} size={rs(150)} color={accent} />
            )}
          </View>
          {/* Accent sparkles scattered around the reveal (per the Result PNGs). */}
          <MaterialCommunityIcons
            name="star-four-points"
            size={rs(13)}
            color={accent}
            style={[styles.sparkle, { top: rs(14), start: rs(34), opacity: 0.75 }]}
          />
          <MaterialCommunityIcons
            name="star-four-points"
            size={rs(9)}
            color={accent}
            style={[styles.sparkle, { top: rs(64), end: rs(28), opacity: 0.55 }]}
          />
          <MaterialCommunityIcons
            name="star-four-points"
            size={rs(7)}
            color={accent}
            style={[styles.sparkle, { bottom: rs(6), start: rs(64), opacity: 0.4 }]}
          />

          {/* RARE micro-label above the reveal (Black/White only). */}
          {isRare && rareLabelKey && (
            <Text style={[styles.rareLabel, { color: AURA_V2.silver }]}>{t(rareLabelKey)}</Text>
          )}
          {!!eyebrow && !isRare && (
            <Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text>
          )}
          {/* Crisp white reveal name with a single soft accent glow — the stacked
              multi-layer glow read as a blurry doubled name on device. */}
          <Text
            style={[styles.bigTitle, { color: nameColor, textShadowColor: nameGlow }]}
            // Tied reveals join 2+ names — let them wrap before auto-shrinking. Cluster
            // and zero-signal titles run 2–4 words, so give them a second line rather
            // than shrinking "Quiet Admiration Everywhere" to fit one.
            numberOfLines={isClustered || isZeroSignal ? 2 : isTie ? 3 : 1}
            adjustsFontSizeToFit
          >
            {bigTitle}
          </Text>
          {/* Count path: the ratio explainer under the hero percentage. */}
          {isCount && (
            <Text style={[styles.countLabel, { color: theme.textMuted }]}>
              {t('result.count.signsRatio', {
                count: result.signalCount ?? 0,
                total: result.signalTotal ?? 0,
              })}
            </Text>
          )}
          {!!winnerSubtitle && (
            <Text style={[styles.winnerSubtitle, { color: theme.text }]}>{winnerSubtitle}</Text>
          )}
        </Animated.View>

        {/* Confidence — a clustered read has no confidence to claim and a zero-signal
            read has nothing to be confident ABOUT, so for both the headline, the
            percentile and the bar are replaced by one honest line. */}
        <GlassCard style={styles.card}>
          {isZeroSignal || isClustered ? (
            <Text style={[styles.confHead, { color: theme.text }]}>
              {t(isZeroSignal ? 'result.noSignal' : 'result.tooClose')}
            </Text>
          ) : (
            <>
              {(() => {
                // Count path relabels this as "Signal strength: N%" — the same honest ratio,
                // just not phrased as a confidence-in-a-verdict claim. Same bar, same number.
                const head = t(isCount ? 'result.count.signalStrength' : 'result.confidenceHeadline', {
                  confidence,
                });
                const token = `${confidence}%`;
                const parts = head.split(token);
                return (
                  <Text style={[styles.confHead, { color: theme.text }]}>
                    {parts[0]}
                    <Text
                      style={{
                        // Aura: the % takes the literal outcome ink (Black = near-black lit by a
                        // silver halo so it stays legible; White = white; chromatics = their hue).
                        color: isAura ? nameColor : accent,
                        fontFamily: 'HankenGrotesk_700Bold',
                        ...(isRare
                          ? { textShadowColor: nameGlow, textShadowRadius: rs(7), textShadowOffset: { width: 0, height: 0 } }
                          : null),
                      }}
                    >
                      {token}
                    </Text>
                    {parts.slice(1).join(token)}
                  </Text>
                );
              })()}
              {/* Both ends of the scale are reachable and both read as nonsense as a
                  percentage: 100 became "Higher than 100% of your readings" (it just
                  means this is the best one so far — say that), and 0 would claim
                  "Higher than 0%", which is worth less than silence. */}
              {showPercentile && percentile > 0 && (
                <Text style={[styles.confSub, { color: theme.textDim }]}>
                  {percentile >= 100
                    ? t('result.confidenceBest')
                    : t('result.confidenceSub', { pct: percentile })}
                </Text>
              )}
              <View style={[styles.bar, { backgroundColor: barTrack }]}>
                <View style={[styles.barFill, { width: `${confidence}%`, backgroundColor: barFill }]} />
              </View>
            </>
          )}
        </GlassCard>

        {/* Unlock card (minimal tier) — the rest of the reading sits behind Option C. */}
        {!unlocked && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: accent }]}>{t('result.lockedEyebrow')}</Text>
            <Text style={[styles.lockedBody, { color: theme.textMuted }]}>
              {t('result.lockedBody')}
            </Text>
            <GradientButton
              label={t('result.unlockWatch')}
              onPress={handleUnlockWatch}
              leadingIcon="play"
              labelColor={ctaText}
              colors={ctaColors}
              glowColor={accent}
              bold
            />
            {adFailed && (
              <Text style={[styles.adFailed, { color: theme.textDim }]}>
                {t('loading.adUnavailable')}
              </Text>
            )}
            <TouchableOpacity
              onPress={handleUnlockStar}
              disabled={stars === 0}
              accessibilityRole="button"
              accessibilityLabel={`${t('result.unlockStar')} 1`}
              style={[
                styles.unlockStarBtn,
                { backgroundColor: theme.surface, borderColor: theme.borderStrong },
                stars === 0 && styles.unlockDisabled,
              ]}
            >
              <Text style={[styles.unlockStarText, { color: theme.text }]}>
                {t('result.unlockStar')}
              </Text>
              <View
                style={[
                  styles.costPill,
                  { borderColor: `${theme.gold}66`, backgroundColor: `${theme.gold}14` },
                ]}
              >
                <Text style={[styles.costText, { color: theme.gold }]}>1</Text>
                <MaterialCommunityIcons name="star-four-points" size={rs(11)} color={theme.gold} />
              </View>
            </TouchableOpacity>
          </GlassCard>
        )}

        {/* The full picture (multi, >1 person) */}
        {unlocked && showComparison && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.comparison')}</Text>
            {comparisonPersons.map((p) => {
              // ONE number, three renderings: this person's unweighted pick count drives
              // the bar length, the "N signals" label and the share percentage alike, so
              // the card can never contradict the verdict above it.
              const signalCount = cardCounts[p.id] ?? 0;
              // Bar width = share OF THE LEADER (the winner always fills).
              const pct = Math.round((signalCount / maxPicks) * 100);
              // Share of all picks, so a 10–10 tie reads "10 signals · 50%" for both
              // instead of the old "100%" each, which implied "100% a red flag".
              const sharePct = pickTotal > 0 ? Math.round((signalCount / pickTotal) * 100) : 0;
              // Polarity read → signed net + this person's OWN band, never a
              // leader-relative bar (that implied "cleared" for anyone behind).
              const net = flagNets?.[p.id] ?? 0;
              const flagBand = result.bands?.[p.id];
              const bandAccent = flagBand ? FLAG_BAND_THEME[flagBand].accent : accent;
              // Bars fill in the CATEGORY accent (winner full-strength, the rest softened)
              // so the card reads in the reading's palette; avatars keep person colours.
              // On a tie EVERY max-scorer gets the winner treatment — equal scores
              // already draw equal bars, the emphasis must match.
              //
              // POLARITY reads crown NOBODY. There is no winner to crown: the stored
              // `result.winner` is only the reddest participant, so highlighting it put
              // an arbitrary name in bold accent — visibly wrong on a draw (both at
              // net 0 / MIXED, yet one name rendered gold), and wrong in general
              // whenever the screen themes GREEN off a green standout while the accent
              // landed on the reddest person. The band chip + signed net say it all.
              // CLUSTERED and ZERO-SIGNAL reads crown nobody either, for the same reason:
              // the read is flat (or empty), so putting one arbitrary name in bold accent
              // contradicts the verdict directly above it. Zero-signal also leaves every
              // bar at 0 — maxPicks floors at 1, so 0/1 renders as an empty track.
              const isWinner =
                !isFlag &&
                !isClustered &&
                !isZeroSignal &&
                (isTie ? (result.tiedWinnerIds ?? []).includes(p.id) : p.id === result.winner?.id);
              return (
                <View key={p.id} style={styles.compRow}>
                  <View style={[styles.avatar, { backgroundColor: p.color }]}>
                    <Text style={[styles.avatarText, { color: theme.background }]}>
                      {p.name[0]?.toUpperCase() ?? '?'}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.compName,
                      { color: isWinner ? accent : theme.text },
                      isWinner && { fontFamily: 'HankenGrotesk_700Bold' },
                    ]}
                    numberOfLines={1}
                  >
                    {p.name}
                  </Text>
                  {flagBand ? (
                    // Band chip in that band's OWN accent — LEAN_GREEN never renders
                    // as GREEN, LEAN_RED never as RED (FLAG_BAND_THEME ramp).
                    <View
                      style={[
                        styles.bandChip,
                        {
                          borderColor: `${bandAccent}66`,
                          backgroundColor: `${bandAccent}1F`,
                        },
                      ]}
                    >
                      <Text style={[styles.bandChipText, { color: bandAccent }]} numberOfLines={1}>
                        {t(`result.bands.${flagBand}`)}
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.compTrack, { backgroundColor: theme.surface }]}>
                      <View
                        style={[
                          styles.compFill,
                          { width: `${pct}%`, backgroundColor: accent, opacity: isWinner ? 1 : 0.45 },
                        ]}
                      />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.compPct,
                      { color: flagBand ? bandAccent : theme.textMuted, textAlign: isRTL ? 'left' : 'right' },
                      flagBand != null && styles.compNet,
                    ]}
                    numberOfLines={1}
                  >
                    {flagBand
                      ? t('result.compNet', { net: net > 0 ? `+${net}` : `${net}` })
                      : t('result.compSignals', { count: signalCount, pct: sharePct })}
                  </Text>
                </View>
              );
            })}
          </GlassCard>
        )}

        {/* The read (self-discovery one-liner) */}
        {unlocked && !isMulti && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.theRead')}</Text>
            <Text
              style={[styles.theReadText, { color: theme.text, fontFamily: 'PlayfairDisplay_600SemiBold' }]}
            >
              {winnerSentence}
            </Text>
          </GlassCard>
        )}

        {/* What this means */}
        {unlocked && (bullets.length > 0 || categoricalCategory) && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.whatThisMeans')}</Text>
            {/* Categorical modules carry a per-category body paragraph above the bullets. */}
            {categoricalCategory && (
              <>
                <Text style={[styles.meaningBody, { color: theme.text }]}>
                  {categoricalCategory.whatThisMeans[language] ?? categoricalCategory.whatThisMeans.en}
                </Text>
                {bullets.length > 0 && (
                  <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />
                )}
              </>
            )}
            {bullets.map((insight, i) => (
              <View key={i}>
                {i > 0 && <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />}
                <View style={styles.bulletRow}>
                  <Text style={[styles.bulletStar, { color: accent }]}>
                    {t('result.insightPrefix')}
                  </Text>
                  <Text style={[styles.bulletText, { color: theme.text }]}>
                    {insight[language] ?? insight.en}
                  </Text>
                </View>
              </View>
            ))}
          </GlassCard>
        )}

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: theme.textDim }]}>{t('result.disclaimer')}</Text>
      </Animated.ScrollView>

      {/* Top-edge scrim — the mirror of the action bar's fade, so scrolling content
          stops rendering legibly across the clock and battery icons. Solid for the
          full status-bar height, then a short rs(8) fade out, in the SAME colour the
          field gradient paints at y=0 (aura sits on flat obsidian). Opacity is
          scroll-driven, so at rest at the top it is fully transparent. */}
      <Animated.View
        pointerEvents="none"
        style={[styles.topScrim, { height: scrimH }, topScrimStyle]}
      >
        <LinearGradient
          colors={[topScrimColor, topScrimColor, `${topScrimColor}00`]}
          locations={[0, insets.top / scrimH, 1]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Fixed action bar — History reopens (view-only) keep Share + Save; the
          Try-another/Save-&-exit nav row is fresh-reading only. */}
      <View
        style={[styles.actionBar, { paddingBottom: insets.bottom + rs(12) }]}
        onLayout={onActionBarLayout}
      >
        <LinearGradient
          colors={[`${theme.background}00`, theme.background]}
          // Reaches full background BEFORE the first button rather than halfway down
          // the bar: at 0.5 the fade's tail landed level with the Share/pill gap, so a
          // line of scrolling text ghosted through at ~4% alpha right there.
          locations={[0, 0.28]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        {/* Category-accent pill (accentSoft→accent), per the Result PNGs — NOT the
            3-color brand gradient. Share belongs to the FULL tier (Option C). */}
        {unlocked && (
          <View style={styles.shareRow}>
            <GradientButton
              label={t('result.shareButton')}
              onPress={handleShare}
              leadingIcon="share-variant"
              labelColor={ctaText}
              colors={ctaColors}
              glowColor={accent}
              bold
              glow
              style={
                ctaBorder
                  ? { flex: 1, borderWidth: 1, borderColor: ctaBorder, borderRadius: 999 }
                  : styles.shareFlex
              }
            />
            <TouchableOpacity
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel={t('shareCard.save')}
              activeOpacity={0.85}
              style={[styles.saveBtn, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <MaterialCommunityIcons name="download" size={rs(20)} color={theme.text} />
            </TouchableOpacity>
          </View>
        )}
        {!!savedMsg && (
          <Text style={[styles.savedMsg, { color: theme.textMuted }]}>{savedMsg}</Text>
        )}
        {/* Zero-signal replaces the Try-another / Save-&-exit pair with ONE action:
            there is nothing to save and nothing to try another of — only this reading,
            answered properly. Hardware back still exits (see the BackHandler above). */}
        {!isViewOnly && isZeroSignal && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={handleRetake}
              accessibilityRole="button"
              accessibilityLabel={t('result.retakeFree')}
              activeOpacity={0.8}
              // `pill` is flex:1, so alone in the row it already spans the full width;
              // the accent border is what marks it as the one primary action.
              style={[styles.pill, { backgroundColor: theme.surface, borderColor: accent }]}
            >
              <Text style={[styles.pillText, { color: theme.text }]} numberOfLines={1}>
                {t('result.retakeFree')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!isViewOnly && !isZeroSignal && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={handleTryAnother}
              accessibilityRole="button"
              accessibilityLabel={t('result.retryButton')}
              activeOpacity={0.8}
              style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <Text style={[styles.pillText, { color: theme.text }]} numberOfLines={1}>
                {t('result.retryButton')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSaveExit}
              accessibilityRole="button"
              accessibilityLabel={t('result.saveButton')}
              activeOpacity={0.8}
              style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <Text style={[styles.pillText, { color: theme.text }]} numberOfLines={1}>
                {t('result.saveButton')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Off-screen share card — captured by handleShare, never visible on screen. */}
      {unlocked && (
        <View ref={shareCardRef} collapsable={false} pointerEvents="none" style={styles.shareCardHost}>
          <ShareCard
            variant="reading"
            accent={accent}
            accentSoft={accentSoft}
            nameColor={nameColor}
            nameGlow={nameGlow}
            eyebrow={isRare && rareLabelKey ? t(rareLabelKey) : eyebrow}
            rare={isRare}
            name={bigTitle}
            // Cluster / zero-signal titles are multi-word verdicts, not names — let them
            // wrap to 2 lines instead of auto-shrinking. Person names are unaffected.
            isVerdictTitle={isClustered || isZeroSignal}
            verdictLine={winnerSubtitle ?? winnerSentence}
            quote={result.shareLine?.[language] ?? result.shareLine?.en ?? ''}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  shareRow: { flexDirection: 'row', alignItems: 'center', gap: rs(10) },
  shareFlex: { flex: 1 },
  // Circular so it echoes the pill row instead of adding a fourth rectangle.
  saveBtn: {
    width: rs(52),
    height: rs(52),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedMsg: {
    fontSize: rs(12),
    fontFamily: 'HankenGrotesk_500Medium',
    textAlign: 'center',
    marginTop: rs(8),
  },
  // Parked past the left edge (raw px on purpose — the card canvas never scales).
  shareCardHost: {
    position: 'absolute',
    top: 0,
    left: -SHARE_CARD_W - 60,
    width: SHARE_CARD_W,
    height: SHARE_CARD_H,
  },
  center: { alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: rs(20), gap: rs(14) },

  header: { alignItems: 'center', gap: rs(6), paddingVertical: rs(10) },
  motifWrap: {
    position: 'absolute',
    top: -rs(12),
    end: -rs(14),
    opacity: 0.16,
  },
  sparkle: { position: 'absolute' },
  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: rs(1.6),
    textAlign: 'center',
  },
  // RARE micro-label ("RARE · THE KEEPER") above the reveal name.
  rareLabel: {
    fontSize: rs(10),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: rs(2.2),
    textAlign: 'center',
  },
  // Short centred spectrum rule beneath the chromatic CTA.
  ctaHairline: { width: rs(150), alignSelf: 'center', marginTop: rs(10) },
  // Silver-foil frame around a rare reveal.
  rareFrame: {
    position: 'absolute',
    left: rs(8),
    right: rs(8),
    borderWidth: 1,
    borderRadius: rs(24),
  },
  bigTitle: {
    fontSize: rs(38),
    lineHeight: rs(46),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.4,
    textAlign: 'center',
    width: '100%',
    marginTop: rs(4),
    marginBottom: rs(4),
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: rs(16),
  },
  winnerSubtitle: {
    fontSize: rs(16),
    lineHeight: rs(22),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
    marginTop: rs(4),
  },
  countLabel: {
    fontSize: rs(12.5),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: rs(0.6),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: rs(2),
  },

  // NOTE: no `gap` here — GlassCard wraps children in an inner content View, so a
  // gap on the card style silently never applies. Spacing is explicit margins below.
  card: { padding: rs(16) },
  cardTitle: {
    fontSize: rs(11.5),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: rs(1.2),
    textTransform: 'uppercase',
    marginBottom: rs(8),
  },

  // Confidence
  confHead: { fontSize: rs(15), fontFamily: 'HankenGrotesk_500Medium', lineHeight: rs(21) },
  confSub: { fontSize: rs(12.5), fontFamily: 'HankenGrotesk_400Regular', marginTop: rs(2) },
  bar: { height: rs(9), borderRadius: rs(5), overflow: 'hidden', marginTop: rs(10) },
  barFill: { height: rs(9), borderRadius: rs(5) },

  // Comparison
  compRow: { flexDirection: 'row', alignItems: 'center', gap: rs(10), paddingVertical: rs(6) },
  avatar: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: rs(13), fontFamily: 'HankenGrotesk_700Bold' },
  compName: { width: rs(64), fontSize: rs(14), fontFamily: 'HankenGrotesk_500Medium' },
  compTrack: { flex: 1, height: rs(8), borderRadius: rs(4), overflow: 'hidden' },
  compFill: { height: rs(8), borderRadius: rs(4) },
  // Wider than the old bare "100%" — now holds "10 / 20 · 50%".
  compPct: { width: rs(86), fontSize: rs(11.5), fontFamily: 'HankenGrotesk_500Medium' },
  // Signed net (+6 / −4 / 0) — narrower and bolder than the ratio label.
  compNet: { width: rs(34), fontSize: rs(14), fontFamily: 'HankenGrotesk_700Bold' },
  bandChip: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    alignItems: 'center',
  },
  bandChipText: {
    fontSize: rs(10),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: 0.5,
  },

  // Unlock card (minimal tier) — explicit margins (GlassCard gap is a no-op).
  lockedBody: {
    fontSize: rs(13.5),
    lineHeight: rs(19),
    fontFamily: 'HankenGrotesk_400Regular',
    marginBottom: rs(12),
  },
  adFailed: {
    fontSize: rs(12),
    textAlign: 'center',
    fontFamily: 'HankenGrotesk_400Regular',
    marginTop: rs(8),
  },
  unlockStarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: rs(48),
    borderRadius: 999,
    borderWidth: 1,
    marginTop: rs(10),
  },
  unlockStarText: { fontSize: rs(14.5), fontFamily: 'HankenGrotesk_600SemiBold' },
  unlockDisabled: { opacity: 0.35 },
  costPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(2),
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    marginStart: rs(8),
  },
  costText: { fontSize: rs(12), fontFamily: 'HankenGrotesk_700Bold' },

  // The read
  theReadText: { fontSize: rs(18), lineHeight: rs(26) },

  // What this means
  meaningBody: { fontSize: rs(14.5), lineHeight: rs(21), fontFamily: 'HankenGrotesk_400Regular' },
  divider: { height: 1, marginVertical: rs(12) },
  bulletRow: { flexDirection: 'row', gap: rs(12), alignItems: 'flex-start' },
  bulletStar: { fontSize: rs(15), marginTop: rs(2) },
  bulletText: { flex: 1, fontSize: rs(14.5), lineHeight: rs(21), fontFamily: 'HankenGrotesk_400Regular' },

  disclaimer: {
    fontSize: rs(12),
    textAlign: 'center',
    fontFamily: 'HankenGrotesk_400Regular',
    lineHeight: rs(18),
    paddingHorizontal: rs(20),
    marginTop: rs(4),
  },

  // Action bar
  topScrim: { position: 'absolute', top: 0, left: 0, right: 0 },
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: rs(20),
    paddingTop: rs(22),
    gap: rs(12),
  },
  actionRow: { flexDirection: 'row', gap: rs(12) },
  pill: {
    flex: 1,
    height: rs(52),
    borderRadius: rs(14),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  pillText: { fontSize: rs(13), fontFamily: 'HankenGrotesk_600SemiBold', textAlign: 'center' },
});
