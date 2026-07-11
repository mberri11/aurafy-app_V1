import React, { useRef, useState } from 'react';
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';
import { toArabicDigits, arMeridiem } from '../utils/dateLocale';

interface TimeWheelSheetProps {
  visible: boolean;
  /** Current value as "h:mm AM/PM" (e.g. "9:00 PM"). */
  value: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

// "System Sheet" cyan accent — matches ConfirmSheet's safe/info tone.
const ACCENT = '#22D3EE';
const ACCENT_GRADIENT: readonly [string, string] = ['#22D3EE', '#06B6D4'];

const ITEM_H = rs(36);
const VISIBLE = 5; // odd → one centred row
const WHEEL_H = ITEM_H * VISIBLE;
const PAD = ITEM_H * Math.floor(VISIBLE / 2); // top/bottom spacer so ends can centre

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const MERIDIEM = ['AM', 'PM'];

function parseTime(value: string): { h: number; m: number; ap: number } {
  const match = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(value);
  if (!match) return { h: 8, m: 0, ap: 1 }; // 9:00 PM-ish default lives in store; fallback safe
  const hour = Math.min(12, Math.max(1, parseInt(match[1], 10)));
  const min = Math.min(59, Math.max(0, parseInt(match[2], 10)));
  const ap = match[3].toUpperCase() === 'AM' ? 0 : 1;
  return { h: hour - 1, m: min, ap };
}

function Wheel({
  data,
  initialIndex,
  width,
  onChange,
}: {
  data: string[];
  initialIndex: number;
  width: number;
  onChange: (index: number) => void;
}) {
  const theme = useTheme();
  const ref = useRef<ScrollView>(null);
  const inited = useRef(false);

  const handleEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let i = Math.round(e.nativeEvent.contentOffset.y / ITEM_H);
    i = Math.max(0, Math.min(data.length - 1, i));
    onChange(i);
  };

  return (
    <ScrollView
      ref={ref}
      style={{ width, height: WHEEL_H }}
      contentContainerStyle={{ paddingVertical: PAD }}
      snapToInterval={ITEM_H}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      onLayout={() => {
        if (!inited.current) {
          inited.current = true;
          ref.current?.scrollTo({ y: initialIndex * ITEM_H, animated: false });
        }
      }}
      onMomentumScrollEnd={handleEnd}
    >
      {data.map((d) => (
        <View key={d} style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]} numberOfLines={1}>{d}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

/**
 * Any-time reminder picker, dressed in the shared **"System Sheet"** grammar
 * (see `ConfirmSheet`): a glass sheen over `bg2`, a cyan top bloom, a clock
 * icon badge with a glow halo, an uppercase eyebrow + serif title, and the
 * cyan gradient primary pill. The body is three snap-scroll wheels (hour /
 * minute / AM-PM); a fixed centre band + top/bottom fade frame the selection,
 * and the "Set time" CTA emits an "h:mm AM/PM" string.
 *
 * The sheet content lives under a `GestureHandlerRootView` (RN `Modal` renders
 * in its own window, outside the app's root one) and the wheels use the
 * gesture-handler `ScrollView` — without this the wheels don't scroll. The
 * backdrop is an absolute sibling `Pressable` (not a wrapping one) so it never
 * competes with the wheels' scroll responder.
 */
export default function TimeWheelSheet({ visible, value, onSelect, onClose }: TimeWheelSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <GestureHandlerRootView style={styles.root}>
        <View style={styles.container}>
          <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" />
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: theme.bg2,
                borderColor: theme.borderStrong,
                paddingBottom: insets.bottom + rs(20),
              },
            ]}
          >
            {/* White-5% sheen over bg2 → lifted app-glass (matches GlassCard / ConfirmSheet). */}
            <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface }]} />

            {/* Cyan bloom rising from behind the icon. */}
            <Svg pointerEvents="none" style={styles.bloom} width="100%" height="100%">
              <Defs>
                <RadialGradient id="tw_bloom" cx="50%" cy="0%" r="62%">
                  <Stop offset="0%" stopColor={ACCENT} stopOpacity={0.3} />
                  <Stop offset="55%" stopColor={ACCENT} stopOpacity={0.07} />
                  <Stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#tw_bloom)" />
            </Svg>

            <View style={[styles.grabber, { backgroundColor: theme.surfaceBorder }]} />

            {/* Icon badge — glass tile + cyan glow halo. */}
            <View style={styles.iconWrap}>
              <View style={[styles.iconHalo, { backgroundColor: `${ACCENT}26` }]} pointerEvents="none" />
              <View style={[styles.iconTile, { borderColor: `${ACCENT}80`, backgroundColor: `${ACCENT}1A` }]}>
                <Feather name="clock" size={rs(22)} color={ACCENT} />
              </View>
            </View>

            <Text style={[styles.eyebrow, { color: ACCENT }]}>{t('settings.notifications')}</Text>
            <Text style={[styles.title, { color: theme.text }]}>{t('settings.selectTime')}</Text>

            {visible ? <Wheels value={value} onSelect={onSelect} onClose={onClose} /> : null}
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

/** Inner body — remounts on open so the wheels re-seed from the current value. */
function Wheels({
  value,
  onSelect,
  onClose,
}: {
  value: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const initial = parseTime(value);
  const [h, setH] = useState(initial.h);
  const [m, setM] = useState(initial.m);
  const [ap, setAp] = useState(initial.ap);

  // Arabic: show Arabic-Indic numerals + صباحًا/مساءً in the wheels. Selection is still
  // index-based, and confirm() below always emits the canonical Latin "h:mm AM/PM" so the
  // stored value + scheduler stay language-independent. (AppText applies the Naskh face,
  // and the app's global RTL mirrors the row.)
  const isAr = i18n.language === 'ar';
  const hoursDisplay = isAr ? HOURS.map(toArabicDigits) : HOURS;
  const minutesDisplay = isAr ? MINUTES.map(toArabicDigits) : MINUTES;
  const meridiemDisplay = isAr ? [arMeridiem(false), arMeridiem(true)] : MERIDIEM;

  const confirm = () => {
    onSelect(`${HOURS[h]}:${MINUTES[m]} ${MERIDIEM[ap]}`);
    onClose();
  };

  return (
    <>
      {/* Wheel container has NO fill — fully transparent, so the sheet (bloom +
          sheen and all) shows straight through. Its background is therefore the
          surrounding area continued; only the thin border outlines it. The cyan
          centre band is the single highlight that marks the selected row. */}
      <View style={[styles.wheelArea, { borderColor: theme.borderStrong }]}>
        {/* centre selection band (behind the numbers) */}
        <View
          pointerEvents="none"
          style={[
            styles.band,
            { backgroundColor: `${ACCENT}14`, borderColor: `${ACCENT}66` },
          ]}
        />

        <View style={styles.wheelRow}>
          <Wheel data={hoursDisplay} initialIndex={initial.h} width={rs(58)} onChange={setH} />
          <Text style={[styles.colon, { color: theme.text }]}>:</Text>
          <Wheel data={minutesDisplay} initialIndex={initial.m} width={rs(58)} onChange={setM} />
          <Wheel data={meridiemDisplay} initialIndex={initial.ap} width={isAr ? rs(92) : rs(64)} onChange={setAp} />
        </View>
      </View>

      {/* Primary — cyan gradient pill (matches ConfirmSheet's safe confirm). */}
      <TouchableOpacity
        style={styles.primaryWrap}
        activeOpacity={0.9}
        onPress={confirm}
        accessibilityRole="button"
        accessibilityLabel={t('settings.setTime')}
      >
        <LinearGradient colors={ACCENT_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primary}>
          <Text style={[styles.primaryLabel, { color: theme.background }]}>{t('settings.setTime')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,5,15,0.6)',
  },
  sheet: {
    borderTopLeftRadius: rs(24),
    borderTopRightRadius: rs(24),
    borderWidth: 0.7,
    borderBottomWidth: 0,
    paddingTop: rs(10),
    paddingHorizontal: rs(20),
    overflow: 'hidden',
    alignItems: 'center',
  },
  bloom: { position: 'absolute', top: 0, left: 0, right: 0, height: rs(190) },
  grabber: {
    width: rs(40),
    height: rs(4.5),
    borderRadius: rs(3),
    marginBottom: rs(16),
  },
  iconWrap: { width: rs(52), height: rs(52), alignItems: 'center', justifyContent: 'center', marginBottom: rs(10) },
  iconHalo: { position: 'absolute', width: rs(68), height: rs(68), borderRadius: rs(22) },
  iconTile: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(15),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: rs(6),
  },
  title: {
    fontSize: rs(22),
    lineHeight: rs(26),
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
  },

  wheelArea: {
    height: WHEEL_H,
    justifyContent: 'center',
    marginTop: rs(12),
    marginBottom: rs(10),
    borderWidth: 0.3,
    borderRadius: rs(20),
    overflow: 'hidden',
  },
  wheelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(6),
  },
  band: {
    position: 'absolute',
    left: rs(8),
    right: rs(8),
    top: PAD,
    height: ITEM_H,
    borderRadius: rs(11),
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  item: { height: ITEM_H, alignItems: 'center', justifyContent: 'center' },
  itemText: { fontSize: rs(19), fontFamily: 'HankenGrotesk_500Medium' },
  colon: { fontSize: rs(19), fontFamily: 'HankenGrotesk_600SemiBold', marginBottom: rs(2) },

  primaryWrap: {
    width: '100%',
    marginTop: rs(16),
    borderRadius: 999,
    overflow: 'hidden',
  },
  primary: {
    height: rs(50),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: { fontSize: rs(15.5), fontFamily: 'HankenGrotesk_700Bold' },
});
