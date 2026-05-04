import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../themes/ThemeProvider';
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
  const displayChar = name.trim().length > 0 ? name.trim()[0].toUpperCase() : String(index + 1);

  const handleColorPress = useCallback(
    (c: string) => () => onColorChange(c),
    [onColorChange],
  );

  return (
    <GlassCard style={styles.card}>
      <View style={styles.row}>
        {/* Avatar circle */}
        <View style={[styles.avatar, { backgroundColor: color }]}>
          <Text style={styles.avatarText}>{displayChar}</Text>
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
  card: { padding: 14, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16, fontFamily: 'Inter_700Bold' },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    minHeight: 44,
  },
  colorRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  colorDotSelected: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
});
