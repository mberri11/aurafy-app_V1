# C-10 — Weekly Curriculum & Result System (ARCHITECTURE BRIEF)

> Paste this into `CLAUDE.md` (and reference from `BUILD-STATUS.md`). It documents the FULL incoming target for the daily ritual → weekly result loop so nothing built before C-10 has to be ripped out. **Do not build the result screen or swap the daily pickers until C-10 is greenlit with Week 1 content in hand.** This brief is the spec; the master content map (`aurafy-article-content-map.md`) is the data.

## What changes and why

Today the daily **article** and daily **question** are picked by two *independent* date-hashes over two *separate* pools (`getDailyInsightId`, `getDailyQuestionId`). They are not related, the featured pool is size-1 (so the article never rotates), and the 7-day streak pays +10 but reveals **no reading** — breaking the "complete the week to unlock your reading" promise.

**Model B replaces this with a themed weekly curriculum:** content is grouped into **54 themed weeks** (`aurafy-article-content-map.md`). Each week = 7 paired (article ↔ question) days that resolve into ONE weekly result built from the user's 7 answers. This pairs article+question by design, makes the article rotate, and finally delivers the day-7 payoff.

## New data shapes (single source of truth)

```ts
// src/data/weeks/types.ts
export interface WeekOutcome { key:string; title:LocalizedString; body:LocalizedString; shareLine:LocalizedString; }
export interface WeekDay    { articleId:string; questionId:string; }           // exactly 7 per week
export interface WeeklyTheme {
  id:string;
  title:LocalizedString;
  category:ArticleCategory;          // dominant chip for the week
  resultPrompt:LocalizedString;      // "what this week measures"
  days: WeekDay[];                   // EXACTLY 7, index 0..6
  outcomes: WeekOutcome[];           // EXACTLY 4
  answerOutcomes: Record<string,string[]>; // questionId → [outcomeKey per answer index]
}
export const WEEKS: WeeklyTheme[] = [ /* 54 rows, authored via the week-generator skill */ ];
```

Per-week **4-outcome model**: every question = a 4-way vote (4 answers ↔ 4 outcomes). Day-7 tally of the 7 outcome keys → highest wins (tiebreak = order in `outcomes[]`).

## The curriculum walker (replaces BOTH independent pickers)

```ts
// src/data/weeks/walker.ts
// weekIndex from ISO week number so it advances once per real week and wraps cleanly (52/53/54).
function isoWeekNumber(d: Date): number { /* standard ISO week */ }

export function getActiveWeekIndex(date = new Date(), forcedNextWeekId?: string|null): number {
  // If a forced week is queued for the user's NEXT cycle, the consumer resolves it (see override).
  return isoWeekNumber(date) % WEEKS.length;
}
export function getActiveWeek(date = new Date()): WeeklyTheme { return WEEKS[getActiveWeekIndex(date)]; }

// dayIndex 0..6 within the active week (define Monday=0; keep ONE definition app-wide).
export function getDayIndex(date = new Date()): number { /* (date.getDay()+6)%7 */ }

export function getTodayPairing(date = new Date()): WeekDay {
  return getActiveWeek(date).days[getDayIndex(date)];
}
```

- `getDailyInsightId` / `getDailyQuestionId` become thin wrappers over `getTodayPairing()` (or are removed and callers updated). Article + question are now always the same day's pair.
- **Keep determinism**: still a pure function of local date; no randomness, no backend.

### Forced-week override (promo hook — build the SLOT now, even if unused)

Store field: `forcedNextWeekId: string | null` (default `null`). Semantics: when set, the user's **next fresh weekly cycle** (the one starting after they receive their current week's result) resolves to `WEEKS.find(id === forcedNextWeekId)` instead of the calendar week, then the field auto-clears to `null` and normal rotation resumes.

Use case: when zodiac modules ship (~V1.4), the update sets `forcedNextWeekId = 'w28_four_elements'` (a bundled constant — no backend needed), funneling every user's next week into zodiac articles+questions whose result promotes the new module. Building the slot now means zero retrofit later.

## Weekly result sequencing (the day-7 payoff — STRICT ORDER)

On the **7th** consecutive completed ritual:
1. **Tally** the last 7 `dailyAnswers` outcome keys against the active week's `outcomes` → winning `WeekOutcome`.
2. **Reveal** the weekly result card (headline = outcome.title, body, shareable image with `@aurafy.app` watermark). THIS is the hero moment and the share asset.
3. **THEN** award `+STREAK_BONUS_REWARD` (+10).
4. **THEN** reset streak to 0 and advance to the next week (apply `forcedNextWeekId` if set, then clear it).

Never award +10 or reset before the result reveal. The existing `claimDailyReward` already pays +10 on day 7 — C-10 must gate that behind the reveal, not before it.

## Store deltas (`src/store/userStore.ts`)

- `dailyAnswers[].dimension` now holds the **week-local outcome key** for the active week (the field is already typed `string` — no type change). It is set from `activeWeek.answerOutcomes[questionId][answerIndex]` at ritual completion.
- Add `forcedNextWeekId: string | null` (persisted; default `null`).
- Add `weeklyResult: { weekId:string; outcomeKey:string; claimedAt:number } | null` so a completed week's result can be re-opened from History until the next cycle.
- **Atomic rollover (fixes the desync bug):** the streak reset (Stars screen) and the "Day X of 7" shown in the article reader must read from ONE store value and flip in the SAME update on day-7 completion. Eliminate any independent/cached day calc in `ArticleReaderScreen`.

## Anti-exploit (offline-realistic; full fix = V3 server time)

The store already gates on epoch `lastDailyClaim` (good). Add:
- **Backwards-clock detection:** if `now < lastDailyClaim`, treat as tampering — award nothing, don't advance streak.
- **Cap +1 streak per genuine ~20–24h window;** never advance multiple days from one reload or a forward clock jump.
- Streak advances **only** via `completeDailyRitual()`/`claimDailyReward()` — never on mount, focus, or reload. (Audit the stray `streak: s.streak + 1` path so a terminal reload alone cannot increment.)
- Comment-tag as a known V1 limitation (true prevention = server-authoritative time, V3).

## Schema additions (safe to do now)

- `ArticleCategory`: **add `'zodiac'`** and a 7th feed chip (`zodiac`). Do NOT add Communication/Healing/Social as chips — those map to existing chips (mostly `self`) at the article level. Total chips = 7.
- Articles with `relatedModuleId:''` hide the end-of-article CTA (no "Take the … reading").

## Corrected module mapping (real `modules.ts` ids)

Real ids: `who_loves_me, energy_reading, who_hates_me, who_jealous, who_soulmate, who_admires, who_cut_off, birth_chart, attachment_style, am_i_problem, am_i_healing`.

- `who_drains_me` **does not exist** → weeks 18 (Protecting Your Energy) & 45 (Social Energy) map to **`energy_reading`**.
- Healing weeks → **`am_i_healing`** (exists): week 21 (Energy of Healing), 52 (Letting Go), 54 (Becoming Whole).
- `who_admires` (exists) is available for love/social weeks where "who admires you" fits (e.g. week 7 Hidden Feelings).
- **`birth_chart` already exists.** Zodiac weeks 28–33: if `birth_chart` is LIVE, wire their CTA to it now; if it's stubbed/not shippable, keep `relatedModuleId:''` (no CTA) until the V1.4 zodiac modules, then wire + use the forced-week hook to promote.

## Content scale & locales

- 54 weeks × 7 = **378 articles + 378 questions + 54 weekly results**, plus a 3-theme seasonal reserve pool (swap-in).
- **EN-first**; FR/AR/ES use the existing `getArticleContent` fallback. Translate high-traffic weeks over time.
- Author content as **one cluster file per locale** (9 clusters) so startup never parses a single 2MB module.

## Build order (so result is still built last, per the Golden Loop)

1. **Now (safe rails):** add `'zodiac'` chip; add `WeeklyTheme`/`WeekOutcome`/`WeekDay` types + empty `WEEKS[]`; add walker (`isoWeekNumber`, `getDayIndex`, `getTodayPairing`) **behind a feature flag** so current behavior is unchanged; add `forcedNextWeekId` + `weeklyResult` store fields; add the weekly-tally pure function. Typecheck clean. No screen changes yet.
2. **Pilot:** drop in **Week 1** content (authored via the skill), flip the flag for a dev build, wire the day-7 result reveal + strict sequencing, device-test the full loop (article → 7 questions across the cycle → day-7 result → +10 → reset).
3. **Scale:** bulk-import weeks 2–54.
4. **Result screen polish** lands here (built last), reusing the same outcome data.
