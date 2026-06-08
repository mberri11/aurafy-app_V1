import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';
import GlassCard from './GlassCard';

const COLOR_OPTIONS = [
  '#A78BFA', '#2FEAAC', '#E84393', '#F5C542',
  '#60A5FA', '#FB923C', '#34D399', '#F87171',
];

interface PersonInputProps {
  index: number;
  name: string;
  color: string;
  onNameChange: (name: string) => void;
  onColorChange: (color: string) => void;
}

const PersonInput = memo(function PersonInput({
  index,
  name,
  color,
  onNameChange,
  onColorChange,
}: PersonInputProps) {
  const theme = useTheme();
  // Empty slot shows a "?" placeholder (design 07-person-entry); once typed, the first letter.
  const displayChar = name.trim().length > 0 ? name.trim()[0].toUpperCase() : '?';

  const handleColorPress = useCallback(
    (c: string) => () => onColorChange(c),
    [onColorChange],
  );

  return (
    <GlassCard style={styles.card}>
      <View style={styles.row}>
        {/* Avatar circle */}
        <View style={[styles.avatar, { backgroundColor: color }]}>
          <Text style={[styles.avatarText, { color: theme.background }]}>{displayChar}</Text>
        </View>

        {/* Name input */}
        <TextInput
          style={[styles.input, { color: theme.text }]}
          value={name}
          onChangeText={onNameChange}
          placeholder={`Person ${index + 1}`}
          placeholderTextColor={theme.textMuted}
          maxLength={30}
          accessibilityLabel={`Name for person ${index + 1}`}
        />
      </View>

      {/* Color picker */}
      <View style={styles.colorRow}>
        {COLOR_OPTIONS.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={handleColorPress(c)}
            accessibilityLabel={`Select color ${c}`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={[
              styles.colorDot,
              { backgroundColor: c },
              color === c && styles.colorDotSelected,
            ]}
          />
        ))}
      </View>
    </GlassCard>
  );
});

export default PersonInput;

const styles = StyleSheet.create({
  // Parent (`person-entry` entries) already applies gap between cards — no marginBottom here.
  card: { padding: rs(14) },
  row: { flexDirection: 'row', alignItems: 'center', gap: rs(12), marginBottom: rs(12) },
  avatar: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontWeight: '700', fontSize: rs(14), fontFamily: 'Inter_700Bold' },
  input: {
    flex: 1,
    fontSize: rs(15),
    fontFamily: 'Inter_400Regular',
    minHeight: rs(40),
  },
  // 8 swatches on one evenly-spaced row (design 07-person-entry) — never wrap.
  colorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  colorDot: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(10),
  },
  colorDotSelected: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
