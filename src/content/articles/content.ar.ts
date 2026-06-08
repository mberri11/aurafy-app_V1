// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — Arabic long-form content (stub)
// ─────────────────────────────────────────────────────────────────────────────
// Same shape as content.en.ts (keyed by article id). Untranslated ids fall back
// to English automatically (see getArticleContent in ./index.ts).
// NOTE: Arabic renders RTL — the reader/feed must mirror layout and use the
// Naskh face for body text (see CLAUDE.md → Insights → RTL).
// ─────────────────────────────────────────────────────────────────────────────

import type { ArticleContentMap } from './index';

export const articlesAr: ArticleContentMap = {
  // TODO: fill manually — ترجمة "10 Signs Someone Secretly Loves You" (id: ten_signs_secret_love)
  // TODO: fill manually — باقي المقالات (انظر المعرّفات في content.en.ts)
};
