import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { MODULES } from '@/src/data/modules';
import ModuleCard from '@/src/components/ModuleCard';
import StarsBadge from '@/src/components/StarsBadge';
import GlassCard from '@/src/components/GlassCard';
import AurafyLogo from '@/src/components/AurafyLogo';

const RELATIONSHIP_MODULES = MODULES.filter((m) => m.type === 'multi');
const SELF_MODULES = MODULES.filter((m) => m.type === 'solo');

type HomeListItem =
  | { id: string; kind: 'section'; label: string }
  | { id: string; kind: 'row'; modules: typeof MODULES };

const makeRows = (modules: typeof MODULES) => {
  const rows: typeof MODULES[] = [];
  for (let i = 0; i < modules.length; i += 2) {
    rows.push(modules.slice(i, i + 2));
  }
  return rows;
};

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const stars = useUserStore((s) => s.stars);
  const streak = useUserStore((s) => s.streak);

  const handleModulePress = useCallback((moduleId: string) => {
    router.push({ pathname: '/module/[id]', params: { id: moduleId } });
  }, []);

  const handleStarsPress = useCallback(() => {
    router.push('/(tabs)/stars');
  }, []);

  const handleDailyPress = useCallback(() => {
    router.push('/daily-reading');
  }, []);

  const listData: HomeListItem[] = [
    { id: 'relationships-header', kind: 'section', label: 'RELATIONSHIPS' },
    ...makeRows(RELATIONSHIP_MODULES).map((row, index) => ({
      id: `relationships-row-${index}`,
      kind: 'row' as const,
      modules: row,
    })),
    { id: 'self-header', kind: 'section', label: 'SELF-DISCOVERY' },
    ...makeRows(SELF_MODULES).map((row, index) => ({
      id: `self-row-${index}`,
      kind: 'row' as const,
      modules: row,
    })),
  ];

  const renderItem: ListRenderItem<HomeListItem> = ({ item }) => {
    if (item.kind === 'section') {
      return <Text style={[styles.sectionLabel, { color: theme.textDim }]}>{item.label}</Text>;
    }

    return (
      <View style={styles.row}>
        {item.modules.map((module) => (
          <View key={module.id} style={styles.rowItem}>
            <ModuleCard
              module={module}
              title={t(`modules.${module.id}.title`)}
              subtitle={t(`modules.${module.id}.subtitle`)}
              starsCost={module.starsCost.solo}
              onPress={() => handleModulePress(module.id)}
            />
          </View>
        ))}
        {item.modules.length === 1 ? <View style={styles.rowItem} /> : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Subtle vertical wash to lift the upper half */}
      <LinearGradient
        colors={[theme.background, theme.bg2, theme.background]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header: logo + wordmark on left, stars badge on right */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.brandRow}>
          <AurafyLogo size={22} withHalo={false} />
          <Text
            style={[
              styles.wordmark,
              { color: theme.text, fontFamily: 'Fraunces_400Regular' },
            ]}
          >
            Aurafy
          </Text>
        </View>
        <StarsBadge balance={stars} onPress={handleStarsPress} />
      </View>

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={handleDailyPress}
            activeOpacity={0.85}
            accessibilityLabel="Open daily question"
            accessibilityRole="button"
          >
            <GlassCard
              glowColor={`${theme.gold}80`}
              style={[styles.dailyCard, { borderColor: `${theme.gold}40` }]}
            >
              <View style={styles.dailyRow}>
                <View
                  style={[
                    styles.dailyIconTile,
                    {
                      backgroundColor: `${theme.gold}1F`,
                      borderColor: `${theme.gold}55`,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="moon-waning-crescent"
                    size={20}
                    color={theme.gold}
                  />
                </View>
                <View style={styles.dailyText}>
                  <View style={styles.dailyTitleRow}>
                    <Text style={[styles.dailyTitle, { color: theme.text }]}>
                      {t('daily.title')}
                    </Text>
                    {streak > 0 ? (
                      <View
                        style={[
                          styles.streakChip,
                          { backgroundColor: `${theme.rose}26`, borderColor: `${theme.rose}40` },
                        ]}
                      >
                        <Feather name="zap" size={10} color={theme.rose} />
                        <Text style={[styles.streakText, { color: theme.rose }]}>{streak}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={[styles.dailySub, { color: theme.textMuted }]} numberOfLines={1}>
                    Today's free question is ready
                  </Text>
                </View>
                <View style={styles.dailyTap}>
                  <Text style={[styles.dailyTapLabel, { color: theme.gold }]}>Tap</Text>
                  <Feather name="chevron-right" size={16} color={theme.gold} />
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        }
      />
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
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordmark: {
    fontSize: 22,
    letterSpacing: -0.3,
  },

  /* FlatList contents */
  scroll: { paddingHorizontal: 16 },

  /* Daily Question banner */
  dailyCard: {
    padding: 14,
    marginBottom: 22,
    borderWidth: 1,
  },
  dailyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dailyIconTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyText: { flex: 1, gap: 2 },
  dailyTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dailyTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  streakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  streakText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  dailySub: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  dailyTap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 4,
  },
  dailyTapLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },

  /* Section heading */
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.8,
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 4,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  rowItem: {
    flex: 1,
  },
});
