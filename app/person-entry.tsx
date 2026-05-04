import React, { useState, useMemo, useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useUserStore } from '@/src/store/userStore';
import { useReadingStore } from '@/src/store/readingStore';
import { MODULES } from '@/src/data/modules';
import { Person, ReadingMode } from '@/src/types';
import PersonInput from '@/src/components/PersonInput';
import GradientButton from '@/src/components/GradientButton';

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
  const insets = useSafeAreaInsets();
  const { stars, spendStars } = useUserStore();
  const { startReading } = useReadingStore();

  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);
  const resolvedMode: ReadingMode = (mode as ReadingMode) ?? 'solo';
  const cost = module?.starsCost[resolvedMode] ?? 1;
  const minSlots = SLOT_COUNTS[resolvedMode];

  const [persons, setPersons] = useState<Person[]>(() => {
    if (resolvedMode === 'solo') {
      return [{ id: generateId(), name: 'You', color: '#A78BFA' }];
    }
    return Array.from({ length: minSlots }, (_, i) => ({
      id: generateId(),
      name: '',
      color: COLOR_OPTIONS[i % COLOR_OPTIONS.length],
    }));
  });

  const canStart = useMemo(
    () => persons.every((p) => p.name.trim().length > 0),
    [persons],
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
    const success = spendStars(cost);
    if (!success) {
      Alert.alert('Not enough stars', t('errors.notEnoughStars'));
      return;
    }
    startReading(moduleId ?? '', resolvedMode, persons);
    router.push({ pathname: '/quiz', params: { moduleId, mode: resolvedMode } });
  }, [spendStars, cost, t, startReading, moduleId, resolvedMode, persons]);

  const isSolo = resolvedMode === 'solo';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 60 },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
        {t('personEntry.title')}
      </Text>

      {persons.map((person, idx) => (
        isSolo ? (
          // Solo mode: name pre-filled as "You", non-editable
          <View key={person.id} style={styles.soloRow}>
            <View style={[styles.soloAvatar, { backgroundColor: person.color }]}>
              <Text style={styles.soloAvatarText}>Y</Text>
            </View>
            <Text style={[styles.soloName, { color: theme.text }]}>You</Text>
          </View>
        ) : (
          <PersonInput
            key={person.id}
            index={idx}
            name={person.name}
            color={person.color}
            onNameChange={(name) => updateName(idx, name)}
            onColorChange={(color) => updateColor(idx, color)}
          />
        )
      ))}

      {/* Add person button (circle mode only) */}
      {resolvedMode === 'circle' && persons.length < 10 && (
        <TouchableOpacity
          onPress={addPerson}
          style={[styles.addBtn, { borderColor: theme.surfaceBorder }]}
          accessibilityLabel="Add another person"
        >
          <Text style={[styles.addBtnText, { color: theme.textMuted }]}>
            + {t('personEntry.addPerson')}
          </Text>
        </TouchableOpacity>
      )}

      <GradientButton
        label={t('personEntry.startButton', { cost })}
        onPress={handleStart}
        disabled={!canStart}
        style={styles.startBtn}
      />
      <Text style={[styles.balanceAfter, { color: theme.textMuted }]}>
        {t('personEntry.balanceAfter', { balance: Math.max(0, stars - cost) })} ✨
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 12 },
  title: { fontSize: 28, marginBottom: 8 },
  soloRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 8 },
  soloAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  soloAvatarText: { color: '#fff', fontSize: 20, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  soloName: { fontSize: 20, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  addBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  addBtnText: { fontSize: 15, fontFamily: 'Inter_400Regular' },
  startBtn: { marginTop: 12 },
  balanceAfter: { textAlign: 'center', fontSize: 13, fontFamily: 'Inter_400Regular' },
});
