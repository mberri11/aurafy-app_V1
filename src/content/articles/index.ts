// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS / ARTICLES — content model + metadata registry
// ─────────────────────────────────────────────────────────────────────────────
// Insights is a permanent core feature of Aurafy, parallel to the reading
// `modules` system. Like modules, its content is BUNDLED LOCAL CONTENT — fully
// offline, no backend:
//   • metadata (locale-independent)         → this file (`ARTICLES`)
//   • long-form text (one file per locale)  → `content.<lang>.ts`
//   • daily deterministic pick              → `dailyInsight.ts`
// Long-form copy lives in the per-locale content files (NOT `src/i18n/*.json`,
// which is only for short UI chrome). Only short UI labels for Insights screens
// belong in i18n.
//
// Design reference (canonical): design-reference/screenshots/
//   10-Insight.png      — Home with "Tonight's Read" hook card + 5-tab nav
//   10-Insight-1/-2.png — Insights feed (featured card, chips, list, sponsored)
//   10-Insight-3/-4.png — Article reader (progress bar, hero, blocks, end CTA)
// ─────────────────────────────────────────────────────────────────────────────

import type { Language } from '../../types';
// Re-exported so Insights screens can pull the locale type from one place.
export type { Language } from '../../types';
// C-10 PILOT — Week 1 days 2–7 article metadata (day 1 reuses ten_signs_secret_love).
import { w01Articles } from '../../data/weeks/w01_secret_signs_of_love';
// C-10 — Week 2 "When They Pull Away" days 1–7 article metadata (all new, no reuse).
import { w02Articles } from '../../data/weeks/w02_when_they_pull_away';
// C-10 — Week 3 "Mixed Signals" days 1–7 article metadata (all new, no reuse).
import { w03Articles } from '../../data/weeks/w03_mixed_signals';
// C-10 — Week 4 "What Feels Like Home" days 1–7 article metadata (all new, no reuse).
import { w04Articles } from '../../data/weeks/w04_what_feels_like_home';
// C-10 — Week 5 "Situationships" days 1–7 article metadata (all new, no reuse).
import { w05Articles } from '../../data/weeks/w05_situationships';
// C-10 — Week 6 "Your Worth in Love" days 1–7 article metadata (first self-discovery week).
import { w06Articles } from '../../data/weeks/w06_your_worth_in_love';
// C-10 — Week 7 "Hidden Feelings" days 1–7 article metadata (all new, no reuse).
import { w07Articles } from '../../data/weeks/w07_hidden_feelings';
// C-10 — Week 8 "The Chase" days 1–7 article metadata (all new, no reuse).
import { w08Articles } from '../../data/weeks/w08_the_chase';

/** Editorial categories. Drive the feed filter chips + each card's accent tag. */
export type ArticleCategory =
  | 'love'
  | 'aura'
  | 'energy'
  | 'attachment'
  | 'self'
  | 'jealousy'
  | 'zodiac';

/** Chip / filter order in the feed (matches 10-Insight-1.png). 7 categories — do NOT
 *  add Communication/Healing/Social chips; those articles carry existing categories. */
export const CATEGORY_ORDER: ArticleCategory[] = [
  'love',
  'aura',
  'energy',
  'attachment',
  'self',
  'jealousy',
  'zodiac',
];

/**
 * Accent hex per category — drives the colored tag dot, unread dot, and the
 * orbit-art tint on cards. Mirrors the module accent palette (cosmic theme).
 * Labels are localized via i18n (`insights.categories.<cat>`), NOT here.
 */
export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  love: '#E84393', // rose
  aura: '#A855F7', // violet
  energy: '#34D399', // emerald
  attachment: '#22D3EE', // cyan
  self: '#F5C542', // gold
  jealousy: '#C084FC', // lilac
  zodiac: '#818CF8', // cosmic indigo (C-10 — zodiac/cosmic weeks)
};

/** A single row inside an ordered-list block (e.g. one of the "10 signs"). */
export interface ArticleListItem {
  /** Short bold lead-in shown on the numbered row (the sign / step itself). */
  title?: string;
  /** Supporting explanation rendered under/after the title. */
  text: string;
}

/** Visual treatment for a callout box (see ArticleBlocks renderer). */
export type CalloutVariant = 'info' | 'tip' | 'warning';

/**
 * Structured article body. The reader renders these top-to-bottom with
 * scroll-reveal animation. This discriminated union is the contract the
 * ArticleBlocks renderer switches on — add a new block type here AND in the
 * renderer together.
 */
export type ArticleBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'orderedList'; items: ArticleListItem[] }
  | { type: 'quote'; text: string; attribution?: string }
  /** `asset` is a key into ARTICLE_IMAGES (offline-bundled require map). */
  | { type: 'image'; asset: string; caption?: string }
  | { type: 'callout'; variant?: CalloutVariant; title?: string; text: string }
  | { type: 'divider' };

/**
 * Locale-independent article metadata. The localized title + body live in the
 * per-locale ArticleContent (see `content.<lang>.ts`), keyed by this `id`.
 */
export interface Article {
  id: string;
  category: ArticleCategory;
  /** Estimated read time in minutes — shown as "N min read". */
  readMinutes: number;
  /**
   * Cross-sell link for the end-of-article CTA.
   * MUST equal a `Module.id` from `src/data/modules.ts`
   * (e.g. 'who_loves_me', 'energy_reading'). Typed as the module id string;
   * the reader resolves it to the live module for the "Take the … reading" CTA.
   */
  relatedModuleId: string;
  /** Hero/list image key resolved via ARTICLE_IMAGES. Optional → falls back to a gradient. */
  image?: string;
  /**
   * Eligible to be the rotating daily-featured article (the big card at the top
   * of the feed + Home "Tonight's Read" hook). The actual pick is deterministic
   * per local day — see getDailyInsightId in `dailyInsight.ts`.
   * Only mark `true` once the article has real content in content.en.ts.
   */
  featured?: boolean;
  /**
   * Native-ad / sponsored slot rendered as a "SPONSORED" card in the feed — NOT
   * a real article (no reader, no reward). In V1 this is a placeholder; Phase 4
   * replaces it with a real AdMob native ad. See CLAUDE.md → Insights → AdMob.
   */
  sponsored?: boolean;
  /** ISO date (YYYY-MM-DD) the article was added — newest-first ordering + tiebreak. */
  publishedAt?: string;
}

/** Localized, long-form article content (one entry per article id, per locale). */
export interface ArticleContent {
  title: string;
  /** One-line hook shown on the featured card ("The quiet tells most people miss"). */
  subtitle?: string;
  /** The structured body rendered by the reader. */
  blocks: ArticleBlock[];
}

/** Map of articleId → localized content. Each content.<lang>.ts exports one of these. */
export type ArticleContentMap = Record<string, ArticleContent>;

// ── Image registry ───────────────────────────────────────────────────────────
// Offline-bundled hero/inline images live in `assets/insights/` and are mapped
// here by key. Empty for now (folder is a placeholder); `image`/`asset` keys
// that aren't found fall back to a gradient placeholder in the renderers.
// TODO: add `require('../../../assets/insights/<file>')` entries as art lands.
export const ARTICLE_IMAGES: Record<string, number> = {};

/** Resolve an image key to its bundled asset module, or undefined if not present. */
export function getArticleImage(key?: string): number | undefined {
  if (!key) return undefined;
  return ARTICLE_IMAGES[key];
}

// ── Article metadata registry ──────────────────────────────────────────────────
// Order here is the default feed order (newest-first by publishedAt is applied
// at render). Titles below are in comments only — real titles live per-locale.
export const ARTICLES: Article[] = [
  {
    // The one fully-written V1 article (content in content.en.ts). Featured pool.
    id: 'ten_signs_secret_love', // "10 Signs Someone Secretly Loves You"
    category: 'love',
    readMinutes: 6,
    relatedModuleId: 'who_loves_me',
    image: 'ten-signs-hero',
    featured: true,
    publishedAt: '2026-06-06',
  },
  // ── Editorial backlog (metadata stubbed; copy filled in content.en.ts later) ──
  // These appear in the feed list. Mark `featured: true` only once their
  // content.en.ts blocks exist, so the daily pick never lands on an empty body.
  {
    id: 'energy_you_carry', // "The Energy You Carry Into a Room"
    category: 'energy',
    readMinutes: 4,
    relatedModuleId: 'energy_reading',
    image: 'energy-you-carry-hero',
    publishedAt: '2026-06-05',
  },
  {
    id: 'anxious_hearts_silence', // "Why Anxious Hearts Read Silence as Rejection"
    category: 'attachment',
    readMinutes: 5,
    relatedModuleId: 'attachment_style',
    image: 'anxious-hearts-hero',
    publishedAt: '2026-06-04',
  },
  {
    id: 'reading_auras_colors', // "Reading Auras: What Each Color Really Means"
    category: 'aura',
    readMinutes: 7,
    relatedModuleId: 'energy_reading',
    image: 'reading-auras-hero',
    publishedAt: '2026-06-03',
  },
  {
    id: 'am_i_the_problem', // "Am I the Problem? An Honest Mirror"
    category: 'self',
    readMinutes: 5,
    relatedModuleId: 'am_i_problem',
    image: 'am-i-the-problem-hero',
    publishedAt: '2026-06-02',
  },
  {
    id: 'quiet_tells_jealousy', // "The Quiet Tells of Jealousy"
    category: 'jealousy',
    readMinutes: 4,
    relatedModuleId: 'who_jealous',
    image: 'quiet-tells-jealousy-hero',
    publishedAt: '2026-06-01',
  },
  {
    id: 'someone_pulling_away', // "How to Tell When Someone Is Pulling Away"
    category: 'attachment',
    readMinutes: 6,
    relatedModuleId: 'who_cut_off',
    image: 'pulling-away-hero',
    publishedAt: '2026-05-31',
  },
  {
    id: 'increase_your_aura', // "How to Increase Your Aura"
    category: 'aura',
    readMinutes: 5,
    relatedModuleId: 'energy_reading',
    image: 'increase-your-aura-hero',
    publishedAt: '2026-05-30',
  },
  {
    id: 'who_secretly_resents_you', // "Who Secretly Resents You — and Why"
    category: 'self',
    readMinutes: 6,
    relatedModuleId: 'who_hates_me',
    image: 'secretly-resents-hero',
    publishedAt: '2026-05-29',
  },
  {
    // SPONSORED placeholder — replaced by a real AdMob native ad in Phase 4.
    id: 'sponsored_astra_dating',
    category: 'love',
    readMinutes: 0,
    relatedModuleId: 'who_soulmate',
    sponsored: true,
    publishedAt: '2026-06-06',
  },
  // C-10 PILOT — Week 1 "Secret Signs of Love" days 2–7 (day 1 = ten_signs_secret_love above).
  ...w01Articles,
  // C-10 — Week 2 "When They Pull Away" days 1–7.
  ...w02Articles,
  // C-10 — Week 3 "Mixed Signals" days 1–7.
  ...w03Articles,
  // C-10 — Week 4 "What Feels Like Home" days 1–7.
  ...w04Articles,
  // C-10 — Week 5 "Situationships" days 1–7.
  ...w05Articles,
  // C-10 — Week 6 "Your Worth in Love" days 1–7 (category: self).
  ...w06Articles,
  // C-10 — Week 7 "Hidden Feelings" days 1–7.
  ...w07Articles,
  // C-10 — Week 8 "The Chase" days 1–7.
  ...w08Articles,
];

// ── Content resolution ─────────────────────────────────────────────────────────
// Lazy-required so a locale's long-form file is only parsed when that language
// is active. content.en.ts is the source-of-truth fallback for any id/locale
// whose translation hasn't been filled yet.
import { articlesEn } from './content.en';
import { articlesFr } from './content.fr';
import { articlesAr } from './content.ar';
import { articlesEs } from './content.es';

const CONTENT_BY_LANG: Record<Language, ArticleContentMap> = {
  en: articlesEn,
  fr: articlesFr,
  ar: articlesAr,
  es: articlesEs,
};

/** Look up an article's metadata by id. */
export function getArticle(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

/**
 * Localized content for an article, falling back to English when the requested
 * locale hasn't been translated yet (so every article always renders).
 */
export function getArticleContent(id: string, lang: Language): ArticleContent | undefined {
  return CONTENT_BY_LANG[lang]?.[id] ?? articlesEn[id];
}
