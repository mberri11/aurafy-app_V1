// ─────────────────────────────────────────────────────────────────────────────
// ArticleBlocks — structured-block renderer for the article reader.
// Renders the ArticleBlock discriminated union (10-Insight-3 / 10-Insight-4):
//   heading | paragraph | orderedList | quote | image | callout | divider
// Each block reveals with a staggered Reanimated FadeInDown (UI thread).
// `accent` (the article's category color) tints list numbers, the quote bar,
// and the callout border.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '@/src/themes/ThemeProvider';
import { type ArticleBlock, getArticleImage } from '@/src/content/articles';
import { rs } from '@/src/utils/responsive';
import OrbitArt from './OrbitArt';

export interface ArticleBlocksProps {
  blocks: ArticleBlock[];
  /** Article category accent (CATEGORY_COLORS[...]). */
  accent: string;
}

export default function ArticleBlocks({ blocks, accent }: ArticleBlocksProps) {
  return (
    <View>
      {blocks.map((block, i) => (
        <Animated.View key={i} entering={FadeInDown.delay(40 + i * 50).duration(420)}>
          <ArticleBlockView block={block} accent={accent} />
        </Animated.View>
      ))}
    </View>
  );
}

function ArticleBlockView({ block, accent }: { block: ArticleBlock; accent: string }) {
  const theme = useTheme();

  switch (block.type) {
    case 'heading':
      return <Text style={[styles.heading, { color: theme.text }]}>{block.text}</Text>;

    case 'paragraph':
      return <Text style={[styles.paragraph, { color: theme.textMuted }]}>{block.text}</Text>;

    case 'orderedList':
      return (
        <View style={styles.list}>
          {block.items.map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <View style={[styles.listNum, { backgroundColor: `${accent}26`, borderColor: `${accent}66` }]}>
                <Text style={[styles.listNumText, { color: accent }]}>{idx + 1}</Text>
              </View>
              <View style={styles.listBody}>
                {item.title ? (
                  <Text style={[styles.listTitle, { color: theme.text }]}>{item.title}</Text>
                ) : null}
                <Text style={[styles.listText, { color: theme.textMuted }]}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
      );

    case 'quote':
      return (
        <View style={[styles.quote, { borderStartColor: accent }]}>
          <Text style={[styles.quoteText, { color: theme.text }]}>{block.text}</Text>
          {block.attribution ? (
            <Text style={[styles.quoteAttr, { color: theme.textMuted }]}>— {block.attribution}</Text>
          ) : null}
        </View>
      );

    case 'image': {
      const asset = getArticleImage(block.asset);
      return (
        <View style={styles.imageWrap}>
          <View style={[styles.imageBanner, { backgroundColor: '#241733' }]}>
            {asset ? (
              <Image source={asset} style={styles.image} resizeMode="cover" />
            ) : (
              <OrbitArt size={rs(110)} accent={accent} />
            )}
          </View>
          {block.caption ? (
            <Text style={[styles.caption, { color: theme.textDim }]}>{block.caption}</Text>
          ) : null}
        </View>
      );
    }

    case 'callout':
      return (
        <View style={[styles.callout, { borderColor: `${accent}55`, backgroundColor: `${accent}12` }]}>
          <Feather name="info" size={rs(16)} color={accent} style={styles.calloutIcon} />
          <View style={styles.calloutBody}>
            {block.title ? (
              <Text style={[styles.calloutTitle, { color: theme.text }]}>{block.title}</Text>
            ) : null}
            <Text style={[styles.calloutText, { color: theme.textMuted }]}>{block.text}</Text>
          </View>
        </View>
      );

    case 'divider':
      return <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />;

    default:
      return assertNever(block);
  }
}

function assertNever(_x: never): null {
  return null;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: rs(20),
    lineHeight: rs(26),
    fontFamily: 'PlayfairDisplay_700Bold',
    marginTop: rs(22),
    marginBottom: rs(10),
  },
  paragraph: {
    fontSize: rs(15),
    lineHeight: rs(24),
    fontFamily: 'Inter_400Regular',
    marginBottom: rs(14),
  },

  list: { marginBottom: rs(8), gap: rs(16) },
  listItem: { flexDirection: 'row', gap: rs(12), alignItems: 'flex-start' },
  listNum: {
    width: rs(24),
    height: rs(24),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(2),
  },
  listNumText: { fontSize: rs(12), fontFamily: 'Inter_700Bold' },
  listBody: { flex: 1, gap: rs(3) },
  listTitle: { fontSize: rs(15), lineHeight: rs(21), fontFamily: 'Inter_700Bold' },
  listText: { fontSize: rs(14), lineHeight: rs(21), fontFamily: 'Inter_400Regular' },

  quote: {
    borderStartWidth: rs(3),
    paddingStart: rs(16),
    paddingVertical: rs(4),
    marginVertical: rs(22),
  },
  quoteText: {
    fontSize: rs(20),
    lineHeight: rs(28),
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontStyle: 'italic',
  },
  quoteAttr: { fontSize: rs(13), fontFamily: 'Inter_500Medium', marginTop: rs(8) },

  imageWrap: { marginVertical: rs(18) },
  imageBanner: {
    height: rs(170),
    borderRadius: rs(16),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  caption: {
    fontSize: rs(12),
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: rs(8),
  },

  callout: {
    flexDirection: 'row',
    gap: rs(12),
    borderWidth: 1,
    borderRadius: rs(16),
    padding: rs(16),
    marginVertical: rs(18),
  },
  calloutIcon: { marginTop: rs(2) },
  calloutBody: { flex: 1, gap: rs(5) },
  calloutTitle: { fontSize: rs(14), fontFamily: 'Inter_700Bold' },
  calloutText: { fontSize: rs(13.5), lineHeight: rs(20), fontFamily: 'Inter_400Regular' },

  divider: { height: StyleSheet.hairlineWidth, marginVertical: rs(24) },
});
