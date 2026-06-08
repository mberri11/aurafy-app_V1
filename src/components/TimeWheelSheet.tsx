import React, { useRef, useState } from 'react';
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../themes/ThemeProvider';
import GradientButton from './GradientButton';
import { rs } from '../utils/responsive';

interface TimeWheelSheetProps {
  visible: boolean;
  /** Current value as "h:mm AM/PM" (e.g. "9:00 PM"). */
  value: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const ITEM_H = rs(40);
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
          <Text style={[styles.itemText, { color: theme.text }]}>{d}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

/**
 * Any-time reminder picker — three snap-scroll wheels (hour / minute / AM-PM)
 * inside the cosmic-glass bottom sheet. A fixed centre band + top/bottom fade
 * frame the selection; the "Set time" CTA emits an "h:mm AM/PM" string.
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
                paddingBottom: insets.bottom + rs(16),
              },
            ]}
          >
            <LinearGradient
              colors={theme.gradient}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.accentLine}
            />
            <View style={[styles.grabber, { backgroundColor: theme.surfaceBorder }]} />
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
  const { t } = useTranslation();
  const initial = parseTime(value);
  const [h, setH] = useState(initial.h);
  const [m, setM] = useState(initial.m);
  const [ap, setAp] = useState(initial.ap);

  const confirm = () => {
    onSelect(`${HOURS[h]}:${MINUTES[m]} ${MERIDIEM[ap]}`);
    onClose();
  };

  return (
    <>
      <View style={styles.wheelArea}>
        {/* centre selection band (behind the numbers) */}
        <View
          pointerEvents="none"
          style={[
            styles.band,
            { backgroundColor: theme.surface, borderColor: theme.gradient[0] },
          ]}
        />

        <View style={styles.wheelRow}>
          <Wheel data={HOURS} initialIndex={initial.h} width={rs(58)} onChange={setH} />
          <Text style={[styles.colon, { color: theme.text }]}>:</Text>
          <Wheel data={MINUTES} initialIndex={initial.m} width={rs(58)} onChange={setM} />
          <Wheel data={MERIDIEM} initialIndex={initial.ap} width={rs(64)} onChange={setAp} />
        </View>

        {/* top + bottom fade so edge rows recede */}
        <LinearGradient
          colors={[theme.bg2, `${theme.bg2}00`]}
          style={[styles.fade, styles.fadeTop]}
          pointerEvents="none"
        />
        <LinearGradient
          colors={[`${theme.bg2}00`, theme.bg2]}
          style={[styles.fade, styles.fadeBottom]}
          pointerEvents="none"
        />
      </View>

      <View style={styles.cta}>
        <GradientButton label={t('settings.setTime')} onPress={confirm} labelColor="#0A0B1A" />
      </View>
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
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingTop: rs(10),
    paddingHorizontal: rs(20),
    overflow: 'hidden',
  },
  accentLine: { position: 'absolute', top: 0, left: 0, right: 0, height: rs(2) },
  grabber: {
    alignSelf: 'center',
    width: rs(40),
    height: rs(4.5),
    borderRadius: rs(3),
    marginBottom: rs(14),
  },
  title: { fontSize: rs(16), fontFamily: 'Inter_600SemiBold', marginBottom: rs(8) },

  wheelArea: { height: WHEEL_H, justifyContent: 'center', marginVertical: rs(6) },
  wheelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(6),
  },
  band: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: PAD,
    height: ITEM_H,
    borderRadius: rs(12),
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  item: { height: ITEM_H, alignItems: 'center', justifyContent: 'center' },
  itemText: { fontSize: rs(21), fontFamily: 'Inter_500Medium' },
  colon: { fontSize: rs(21), fontFamily: 'Inter_600SemiBold', marginBottom: rs(2) },

  fade: { position: 'absolute', left: 0, right: 0, height: PAD },
  fadeTop: { top: 0 },
  fadeBottom: { bottom: 0 },

  cta: { marginTop: rs(16) },
});
