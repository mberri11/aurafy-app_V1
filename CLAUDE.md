# CLAUDE.md

Guidance for Claude Code on the Aurafy project.

---

## ⚠️ READ THIS FIRST — why screens kept missing the design

Past UI work (splash, onboarding) "looked finished" in code but did **not** match the
design reference on device. The reason is mechanical, not a skill problem:

**Claude Code cannot see the Android device. Only Simo can.**

So every time the old protocol said "compare the screenshot to the current render ON
DEVICE," Claude Code was actually comparing the design PNG to *its own mental image of
the code* — which is guesswork. The loop was never closed.

From now on the loop is closed by a human screenshot. The rule is simple:

> **A screen is NEVER "done" until Simo pastes a device screenshot and Claude Code has
> diffed it, in context, against the design PNG — and the remaining differences are
> zero.** Claude Code may never *claim* a match. Only Simo confirms.

Everything below enforces this.

---

## Commands

Package manager: **pnpm**

- `pnpm start` — Expo dev server offline mode (`EXPO_OFFLINE=true`)
- `pnpm start:online` — Expo dev server with network
- `pnpm android` — start on Android (offline by default)
- `pnpm typecheck` — `tsc --noEmit` (only static gate — no ESLint, no Prettier)

**NEVER use `npm` or `npx` — always `pnpm` and `pnpm exec`.** Mixing managers (e.g.
`npx expo install`) rewrites `package.json` with versions from a different SDK and
corrupts the lockfile (`withPodfile is not a function`). For Expo CLI commands use
`pnpm exec expo <cmd>` (or `pnpm dlx` only when the package is not a project dep).

Native builds via EAS (`eas.json`). Android package: `com.simobr.aurafy`.

---

## THE GOLDEN LOOP — how every screen gets built (READ EVERY SESSION)

Each screen goes through 4 numbered stages. Claude Code does ONE stage per message, then
stops. Never auto-advance past a STOP.

### Stage 1 — SPEC (no code)
1. `view` the design PNG in `design-reference/screenshots/<file>`.
2. Produce a **written, element-by-element spec** of the screenshot, top to bottom. For
   every visible element list: exact **text** (copy it verbatim), **font family + weight
   + px**, **color mapped to a token name** (e.g. `theme.gold`, not `#F5C542`),
   **spacing/margins/padding**, **width/height**, **alignment**, and any **icon / gradient
   / glow**. Guess sizes from proportions if unlabeled, and say they are estimates.
3. `view` the current `app/<file>` and list **every difference** between the spec and the
   code (text, font, size, color, spacing, layout, missing/extra elements).
4. STOP. Wait for Simo's approval of the spec + diff list.

### Stage 2 — IMPLEMENT
1. Implement the approved spec in `app/<file>`.
2. Match fonts, weights, sizes, colors (from `useTheme()` / `tokens.md` — never hardcode),
   spacing and layout exactly.
3. If matching requires editing a shared component, loading a font, adding an i18n string,
   or adding an asset — **do it.** There is no "out of scope" during a match. Never say
   "would need to."
4. Run `pnpm typecheck` only if you touched `src/types/`, `src/store/`, or `src/engine/`.
5. STOP and tell Simo: "Reload on device and send me a screenshot." Do **not** claim it
   matches.

### Stage 3 — DIFF (repeat until zero deltas)
1. Simo pastes a **device screenshot**.
2. With the device screenshot AND `design-reference/screenshots/<file>` both in context,
   list **every remaining visual difference** as a bullet list (be picky: 1px, font
   weight, color shade, glow radius, letter-spacing all count).
3. Fix each delta.
4. STOP and ask Simo for another screenshot.
5. Repeat 1–4 until Simo says "matches."

### Stage 4 — LOCK
1. Update `docs/BUILD-STATUS.md`: set the screen to ✅, with a one-line note of what
   changed and the date.
2. Update the status column in `design-reference/screen-map.md`.
3. STOP.

**Source-of-truth rule:** `design-reference/screenshots/` is canonical. If the code
*intentionally* diverges from a screenshot (e.g. a redesigned logo), do NOT silently leave
them in conflict — flag it to Simo, and once he confirms, the OLD screenshot must be
replaced with a fresh export. A screen can only be ✅ when code and screenshot agree.

---

## Behavior Rules (READ EVERY SESSION)

**Scope:** Do not touch files outside the task unless directly required for the match. If
a related file needs changing, do it and mention it — no silent refactoring of unrelated
things.

**On task completion:** Give a conceptual summary of what changed, suggest the logical
next step, then STOP and wait for approval. If more than 3 files were touched, list every
file. Never auto-proceed.

**On unexpected errors:** Hard stop. Flag the error clearly, explain what happened, wait
for instruction. No creative workarounds without approval.

**Web preview:** Never run `expo export` or any static web server. Testing is exclusively
on physical Android via Expo Go. Web renders are not valid verification.

**No false "done":** Claude Code may never write "this now matches the design" or mark a
screen ✅ on its own. Matching is asserted only by Simo after a screenshot.

**Pixel-perfect mandate:** Every screen MUST match its design screenshot exactly — same
text, fonts, weights, sizes, icons, spacing, colors, layout. Whatever it takes to match
(importing fonts, installing an icon set, updating i18n, editing shared components, adding
assets) is in scope. Zero compromises on visual accuracy.

---

## FONTS — decision baked in

The design system (`design-reference/tokens.md`, `design-tokens.txt`) uses
**Playfair Display** for all serif headings. The app historically shipped **Fraunces**
instead, which is why headings (including the "Aurafy" wordmark) read differently from the
design.

**Decision: headings use Playfair Display.** Loaded in `app/_layout.tsx`. Splash held
until fonts resolve.

- **Playfair Display** — all headings, titles, the wordmark, result verdicts, big numbers.
  Weights in use: `PlayfairDisplay_400Regular`, `PlayfairDisplay_600SemiBold`,
  `PlayfairDisplay_700Bold`.
- **Hanken Grotesk** — all body text, labels, captions, buttons (adopted in the C-10
  result-experience pilot, 2026-06-25, replacing **Inter**). Weights:
  `HankenGrotesk_400Regular`, `_500Medium`, `_600SemiBold`, `_700Bold`, plus `_800ExtraBold`
  / `_900Black` for share-card + big-CTA emphasis. The old `Inter_*` family refs were renamed
  app-wide to `HankenGrotesk_*`; the `@expo-google-fonts/inter` dep is left installed-but-unused
  (no longer loaded in `app/_layout.tsx`). Do NOT reintroduce Inter for body — the body face is
  Hanken Grotesk. (Pending Simo's device DIFF confirmation of the look.)

> If Simo ever decides to keep Fraunces as an intentional substitute, that's allowed — but
> then every `PlayfairDisplay_*` reference reverts to `Fraunces_*` AND this section is
> updated. The two must never be mixed.

Arabic uses a Naskh face for RTL (`Noto Naskh Arabic` in the design).

---

## Architecture

Expo Router (file-based routing), Expo SDK 54, React 19, RN 0.81, New Architecture +
React Compiler enabled, `typedRoutes` on. Path alias `@/*` → repo root.

### Routing (`app/`)
Stack in `app/_layout.tsx`. Flow:
`index → onboarding → (tabs) → module/[id] → reading-mode → person-entry → quiz → loading → result`

Tabs: `index` (home), `stars`, `history`, `settings`.

Layout tree: `SafeAreaProvider → ThemeProvider → AurafyErrorBoundary → GestureHandlerRootView`

### Domain model (`src/types/index.ts`)
- **`multi`** — user enters 2–N persons; questions answered by picking a person; highest
  scorer = winner.
- **`solo`** — single user; 4 soloAnswers per question scored {-2,-1,+1,+2}; total →
  verdict `positive | neutral | negative`.

`ReadingMode`: `solo | compare | triangle | circle` — controls participant count and stars
cost. All content copy = `LocalizedString { en, fr, ar, es }`. Static UI strings =
`src/i18n/*.json` via `react-i18next`.

### Engine (`src/engine/`) — pure, no side effects
1. `scoringEngine.ts` — produces `ResultData` (scores, `dominantDimension`,
   `confidence` 60–95, `winner` or `verdict`).
2. `insightSelector.ts` — deterministic seeded insight selection from a dimension pool.
3. `resultGenerator.ts` — composes scoring output with module results content.

Adding a module: `src/data/modules.ts` + `src/data/questions/name.ts` +
`src/data/results/nameResults.ts`. Keep filenames parallel.

### State (`src/store/`, Zustand)
- `userStore.ts` — **persisted** (AsyncStorage `aurafy-user`). Stars [0–100], history cap
  20, transactions cap 5. Daily ritual once per local day; streak is **forgiving** (a missed
  day holds it, never resets — see Stars Economy).
- `contentSlice.ts` — **Insights** state (`readArticleIds`, `savedArticleIds`,
  `lastDailyBonusDate`, `markRead`, `toggleSaved`, `claimDailyInsightBonus`). Composed
  INTO `userStore` via the zustand slices pattern (not a separate store) — persisted in
  the same `aurafy-user` blob.
- `readingStore.ts` — **transient** session state. Reset between readings.
- `settingsStore.ts` — theme + language preferences (persisted, `aurafy-settings`).

### Theming (`src/themes/`)
`useTheme()` exposes `ThemeColors`. All components use `useTheme()` — never hardcode
colors. Two themes: `cosmic`, `desertOracle`. Splash bg `#07091A` is also hardcoded in the
`expo-splash-screen` plugin config in `app.json` (matches `android.backgroundColor` /
`ios.backgroundColor`) — keep in sync if changed. Note: `android.adaptiveIcon.backgroundColor`
(`#16102E`) is intentionally different — that's the launcher icon canvas, not the splash.

### Ads (`src/ads/`)
`AdMobManager` is a **stub** that returns false everywhere. Do not touch during the UI
phase. Real wiring is Phase 4.

### Animations
Reanimated 4 + `react-native-worklets`. All animations on the UI thread. No deprecated
`Animated` API.

---

## Insights / Articles — PERMANENT CORE FEATURE

Insights is a **permanent, core pillar of Aurafy, on equal footing with `modules`** —
not an experiment, not a "future option." Treat it like the reading engine: it has its
own content layer, its own screens, and its own state. Build and maintain it accordingly.

**Purpose.** An editorial layer of short psychology-flavored articles ("10 Signs Someone
Secretly Loves You", "The Energy You Carry Into a Room", …) that gives the app daily
re-engagement value beyond paid readings, and cross-sells the reading modules.

### Information architecture (IA)
- **5th bottom-nav tab "Insights"** — order is **Home / Insights / Stars / History /
  Settings** (`app/(tabs)/_layout.tsx`). Route file `app/(tabs)/insights.tsx`.
- **Home "Tonight's Read" hook card** — a `FeaturedInsightCard` on Home linking to the
  daily article (design `10-Insight.png`).
- **Insights feed** (`InsightsScreen`) — featured daily card + category filter chips +
  "LATEST" article list + a SPONSORED native-ad card.
- **Article reader** (`ArticleReaderScreen`, route `app/article/[id].tsx`, on the root
  Stack) — reading-progress bar, hero, **structured blocks**, end-of-article cross-sell
  CTA to `relatedModuleId`, Share, and the daily "Claim +1 ✦" reward.
- **Screen/route split:** screen implementations live in `src/screens/insights/` (+
  `components/`); the `app/` files are thin re-exports. This split is specific to Insights.

### Content model (bundled, offline — like modules)
`src/content/articles/`:
- `index.ts` — TS types (`Article`, `ArticleContent`, `ArticleBlock` union,
  `ArticleCategory`, `ArticleListItem`), the locale-independent `ARTICLES` metadata
  registry, the `ARTICLE_IMAGES` require-map, and the `getArticle` / `getArticleContent`
  resolvers.
- `content.en.ts` (source-of-truth) + `content.fr.ts` / `content.ar.ts` / `content.es.ts`
  — long-form bodies keyed by article id, one file per locale. **Long-form copy lives
  here, NEVER in `src/i18n/*.json`.** Missing translations fall back to EN automatically.
- `dailyInsight.ts` — `getDailyInsightId(date)`.
- Images: `assets/insights/` (offline-bundled), referenced by key via `ARTICLE_IMAGES`.

**`ArticleBlock` types:** `heading | paragraph | orderedList | quote | image | callout |
divider`. The reader renders them top-to-bottom with Reanimated scroll-reveal. Adding a
block type = update the union in `index.ts` AND the `ArticleBlocks` switch together.

**Cross-sell link:** `Article.relatedModuleId` MUST equal a `Module.id` from
`src/data/modules.ts` (e.g. `'who_loves_me'`). The reader's end CTA pushes
`/module/<relatedModuleId>`.

### Offline daily-pick rule
`getDailyInsightId` is a **pure function of the local calendar date** (hash of the
`YYYY-MM-DD` key over the `featured` pool) — fully offline, deterministic, stable all day,
same on every device. **Distinct from the Daily QUESTION** (`dailyQuestions.ts`, picks by
day-of-year) so the two never move in lockstep. Only mark an article `featured: true`
once it has real EN content, so the pick never lands on an empty body.

### Economy V1 (free + read-to-earn)
- All articles are **free** to read. **No premium articles in V1, no IAP** (Moroccan
  account restriction — AdMob only).
- **Read-to-earn:** reading the **daily featured** article grants **+1 ✦ once per local
  day**, gated behind a rewarded/interstitial ad. Enforced by
  `claimDailyInsightBonus(articleId)` (once-per-day via `lastDailyBonusDate`, requires the
  article to have been read). Reward credited through `userStore.earnStars` with reason
  key `insight_read`.
- **Read state** (`readArticleIds`) drives the earn gate, the feed unread dots, and the
  History surface.

### i18n approach
Two layers, kept separate:
- **Long-form article copy** → `src/content/articles/content.<lang>.ts` (plain strings per
  locale; NOT i18n key files; EN fallback).
- **Short UI chrome** on Insights screens (tab label, "TONIGHT'S READ", "LATEST",
  "SPONSORED", "Claim +1 ✦", "min read", chip labels) → `src/i18n/*.json` like every other
  screen. No hardcoded user-facing strings in the screens.

### RTL (Arabic)
Feed + reader must mirror for AR (chip row, card thumbnail side, list-number side, back/
share placement, text alignment) and use the Naskh face for Arabic body text. Build RTL in
from the start — don't retrofit.

### AdMob placements (Phase 4 wiring; stubbed now)
- **Native ad** = the SPONSORED card in the feed (`Article.sponsored` placeholder today).
- **Rewarded / interstitial** = the gate before the daily "Claim +1 ✦" reward.
- **Banner** may sit at the feed footer (confirm against design).
All go through the existing `src/ads/` manager (stub until Phase 4). No IAP anywhere.

### Design reference (canonical)
`design-reference/screenshots/`: `10-Insight.png` (Home + "Tonight's Read" + 5-tab nav),
`10-Insight-1.png` / `10-Insight-2.png` (feed), `10-Insight-3.png` / `10-Insight-4.png`
(article reader). Same Golden-Loop rule as every screen: not "done" until Simo screenshots.

### Theme tokens Insights reuses (from `src/themes/cosmic.ts` via `useTheme()` — never hardcode)
| Use | Token |
|---|---|
| Screen / card backgrounds | `background` `#07091A`, `bg2` `#0B0E25` |
| Glass surfaces + borders | `surface` `rgba(255,255,255,.05)`, `surfaceBorder` `.10`, `borderStrong` `.14` |
| Category tags / accents, active tab | `primary` `#A78BFA`, `gradient` `['#22D3EE','#A855F7','#2FEAAC']` |
| Reading-progress bar, end-CTA button | `gradient` (cyan→violet→mint) |
| Reward pill / "Claim +1 ✦" / stars | `gold` `#F5C542` |
| Love/jealousy accents | `rose` `#E84393` · earn states `emerald` `#34D399` |
| Text scale | `text` `#FFF` (titles), `textMuted` `#A0A4B8` (body), `textDim` `#6E7290` (eyebrows/meta) |
| Fonts | headings/quotes **Playfair Display** (`_700Bold` / `_600SemiBold` / `_400Regular`); body/labels **Inter**; AR body Naskh |
| Radii / sizing | cards `rs(16–20)`, all layout dp wrapped in `rs()` (`src/utils/responsive.ts`) |
| Per-article accent | reuse the linked module's `Module.color` for hero bloom / tag, mirroring `ModuleCard` |

---

## Stars Economy (FINAL)

> Canonical numbers — finalized 2026-06-20. The detailed, tickable work items live in
> `docs/V1-REVIEW-BACKLOG.md`; this table is the source of truth so a session never has to
> re-read the backlog to know the economy. **If they ever disagree, this section wins.**
> `MAX_STARS` lives in `src/store/userStore.ts`.

**Economy = free + read-to-earn, AdMob-only (no IAP — Moroccan account constraint).**
**MAX BALANCE = 100** (raised from the old 50).

### Sources (exhaustive — no other earn paths exist)
| Source | Amount | Rule |
|---|---|---|
| Welcome gift | **+5** | Once, on first launch. |
| Daily ritual | **+1** | Once per local day. Earned by **entering the daily article AND answering the daily question** at its bottom. One completed ritual = **streak +1** (a missed day holds the streak, never resets it). |
| 7-day streak complete | **+5** | After the 7th completed ritual (forgiving streak — see Key rules). Fires the **weekly result reveal**, then **resets the streak to 0** for a new cycle. Paid AFTER the reveal. |
| Rewarded video | **+2 flat** | Daily cap **25 videos/day** (max **+50★/day**). No escalating ladder. |

**Removed sources:** share-app reward (unverifiable — `Share.share` resolves on sheet open, not on
send; keep the share **button** for organic growth, just no stars); the daily article as a separate
+1 (absorbed into the daily ritual).

### Sinks (exhaustive)
| Sink | Cost | Note |
|---|---|---|
| Reading | **solo −1 · compare −2 · triangle −3 · circle −5** | Circle = 4–10 people. |
| Unlock full result + share card | **−1** *(or watch a rewarded ad)* | Option C gate on `result.tsx` — headline is free, insight bullets + saveable/shareable card unlock here. |
| Theme unlock | **−30** | Was 50. |
| Module unlock | **−20 to −30** | Aura + future locked modules. |
| OST unlock | **−20 to −30** | Ambient soundtracks. |
| Extra daily reading | **−3** | 2nd daily question same day. Does **not** count toward the streak or weekly report. |

**Removed sinks:** deep reading −2 (folded into the −1 result unlock); re-roll −3 (cut — felt
exploitative); **streak insurance −5** (removed 2026-06-28 — the streak is now forgiving, so there
is nothing to insure; no `insuredDays`, no 5★ auto-spend, no 48h grace).

### Key rules
- **Daily ritual = the merged article + question flow.** The daily article and daily question are
  paired in a single canonical source (one `dailyContent[]` table, or questions carry an `articleId`)
  so they always share theme/dimension. This **reverses** the old "deliberately not in lockstep" rule
  for `dailyInsight.ts` vs `dailyQuestions.ts` — they are now deliberately **in lockstep**. The
  question sits at the bottom of the article reader; the user must enter the article first, but there
  is **no** scroll/read-time hard-gate. The standalone `app/daily-reading.tsx` is **removed** (absorbed).
- **Streak (FORGIVING — 2026-06-28):** advances **+1 per completed ritual** (once per local day). A
  **missed day does NOT reset it** — the streak simply HOLDS at its current number and resumes
  climbing on the next answer. No insurance, no Stars cost, no buy-back, no punishment, no 48h grace.
  The 7th completed ritual fires the **weekly reveal** (+5★, paid AFTER the reveal) and resets the
  streak to 0 for the next cycle. A **daily local notification** (`expo-notifications`, offline, no
  backend) is the honest nudge that keeps users answering — wired as a follow-up (a dev-panel test
  button exists now; see `docs/BUILD-STATUS.md`).
- **Weekly report:** deterministic, offline, generated from the **last 7 ritual answers**
  (dimension tally → "This week you leaned toward [X]"). Rendered as a **shareable card** via the
  shared `react-native-view-shot` generator (same one the result share card uses — build once,
  reuse). +5★ is paid **with** the reveal (after it's on screen); then `streak` resets to 0 (recent
  `dailyAnswers` are kept, capped at 14, feeding the next cycle's tally window).
- **Ad strategy (Phase 4):** Option C result gate (no ad before result; gate insights + card).
  Banners only on linger/scroll screens (Insights / History / Stars) — **never** on
  quiz/loading/result/module/person-entry. Interstitial only at natural transitions, frequency-capped,
  and **never stacked with a rewarded ad in the same flow**. Rewarded only at the result unlock + the
  +2★ video. Native = the SPONSORED Insights card. Google **UMP** consent before personalized ads.

---

## UI Standards (design-system rules — enforce on every screen)

- Icons: `@expo/vector-icons` Feather or MaterialCommunityIcons — **no emoji as icons.**
  (Several screens currently use emoji like ✨ 📺 🎁 🔥 🔗 / module emoji icons — replace
  with vector icons during that screen's match unless the design PNG clearly shows an
  emoji.)
- StarsBadge / stars currency: filled gold ★ with subtle glow — **not** ✨ emoji.
- GlassCard: BlurView, strong intensity, must read as "glass" on Android.
- GradientButton outline variant: neutral glass pill with subtle border (not a gradient
  ring) if the design shows that — confirm against the PNG.
- Module accent colors, radii, shadows: verify against `design-reference/tokens.md`.
- No hardcoded user-facing strings. Section labels, "Tap", banner copy etc. must come from
  `src/i18n/*.json` so AR/FR/ES work.

---

## C-10 — Weekly Curriculum & Result System (ARCHITECTURE BRIEF)

> Documents the FULL incoming target for the daily ritual → weekly result loop so nothing
> built before C-10 has to be ripped out. The data is the master content map
> (`docs/aurafy-article-content-map.md`). **Do not build the result screen or swap the daily
> pickers until C-10 is greenlit with Week 1 content in hand.**
>
> **STATUS — foundation pass done (2026-06-24): rails only, flag OFF.** Types + empty `WEEKS[]`
> + walker (flag-gated, no-ops on empty) + store fields (`forcedNextWeekId`, `weeklyResult`) +
> pure `tallyWeeklyOutcome` + anti-exploit hardening + `zodiac` chip are in. No screen is routed
> through the walker yet; current app behavior is unchanged.

### What changes and why
Today the daily **article** and daily **question** are picked by two *independent* date-hashes over
two *separate* pools (`getDailyInsightId`, `getDailyQuestionId`). They are not related, the featured
pool is size-1 (so the article never rotates), and the 7-day streak pays a flat bonus but reveals **no
reading** — breaking the "complete the week to unlock your reading" promise.

**Model B** replaces this with a themed weekly curriculum: content is grouped into **54 themed
weeks**. Each week = 7 paired (article ↔ question) days that resolve into ONE weekly result built
from the user's 7 answers. This pairs article+question by design, makes the article rotate, and
finally delivers the day-7 payoff.

### New data shapes (single source of truth — `src/data/weeks/types.ts`)
```ts
export interface WeekOutcome { key:string; title:LocalizedString; body:LocalizedString; shareLine:LocalizedString; }
export interface WeekDay    { articleId:string; questionId:string; }            // exactly 7 per week
export interface WeeklyTheme {
  id:string; title:LocalizedString; category:ArticleCategory; resultPrompt:LocalizedString;
  days: WeekDay[];                          // EXACTLY 7, index 0..6
  outcomes: WeekOutcome[];                  // EXACTLY 4
  answerOutcomes: Record<string,string[]>;  // questionId → [outcomeKey per answer index]
}
export const WEEKS: WeeklyTheme[] = [ /* 54 rows, authored via the week-generator skill */ ];
```
Per-week **4-outcome model**: every question = a 4-way vote (4 answers ↔ 4 outcomes). Day-7 tally of
the 7 outcome keys → highest wins (tiebreak = order in `outcomes[]`, via `tallyWeeklyOutcome`).

### The curriculum walker (`src/data/weeks/walker.ts` — replaces BOTH pickers)
- **ANCHOR-RELATIVE (pilot fix, 2026-06-25), NOT calendar-weekday.** Paced off a per-user
  `weekAnchorDate` (epoch ms at local midnight of the user's first-ever completed ritual; set
  once in `userStore.completeDailyRitual`, persisted, never overwritten). This stops a user who
  starts on, say, Friday from landing mid-week and getting a 2-answer weekly result.
  - `getDaysSinceAnchor(anchor, d)` = `floor((d - anchor)/86_400_000)` (0 when anchor null or
    clock < anchor — backwards-clock clamp). THE single app-wide day-count definition.
  - `getDayIndex(anchor, d)` = `daysSinceAnchor % 7`; `getActiveWeekIndex(anchor, d)` =
    `floor(daysSinceAnchor / 7) % WEEKS.length`; `getActiveWeek` / `getTodayPairing(anchor, d)`.
  - **The anchor is THREADED AS A PARAMETER** — the walker never imports the store (the chain
    `userStore → contentSlice → dailyInsight → walker` would otherwise cycle). React screens read
    `weekAnchorDate` from the store and pass it down through `getDailyInsightId`/`getDailyQuestionId`.
  - Anchor null (brand-new user, no ritual yet) → Day 0 / Week 0 default. `isoWeekNumber` is kept
    only as a generic date util; it no longer drives indexing.
- Behind `WEEKLY_CURRICULUM_ENABLED` (`src/config/flags.ts`, **flipped ON 2026-06-25** for the
  pilot); the date-based resolvers no-op (return null) while the flag is off or `WEEKS` is empty →
  callers fall back to the legacy pickers.
- `getDailyInsightId(anchor, …)`/`getDailyQuestionId(anchor, …)` are now thin wrappers over
  `getTodayPairing(anchor, …)` (legacy hash retained as the flag-off fallback).

#### Forced-week override (promo hook — slot built now, unused)
Store field `forcedNextWeekId: string | null` (default `null`). When set, the user's **next fresh
weekly cycle** resolves to `getWeekById(forcedNextWeekId)` instead of the calendar week, then the
field auto-clears. Use case (~V1.4): zodiac modules ship → set `forcedNextWeekId = 'w28_four_elements'`
to funnel everyone's next week into zodiac content that promotes the new module. Zero retrofit later.

### Weekly result sequencing (day-7 payoff — STRICT ORDER)
On the **7th** completed ritual (streak reaches 7; forgiving, so the 7 need not be calendar-consecutive):
1) **Tally** last 7 answers → winning `WeekOutcome`; 2) **Reveal** the weekly result card (headline =
`outcome.title`, body, shareable image w/ `@aurafy.app` watermark) — THIS is the hero moment + share
asset; 3) **THEN** award `+5`; 4) **THEN** reset streak to 0 and advance to the next week (apply
`forcedNextWeekId` if set, then clear it). **Never** award +5 or reset before the reveal. C-10 gates
the day-7 +5 behind the reveal (mounting `app/weekly-result.tsx` runs `claimWeeklyResult()`), not
before it.

### Store deltas (`src/store/userStore.ts`)
- `dailyAnswers[].dimension` holds the **week-local outcome key** under C-10 (already typed `string`
  — no type change), set from `activeWeek.answerOutcomes[questionId][answerIndex]` at completion.
- `forcedNextWeekId` + `weeklyResult: { weekId; outcomeKey; claimedAt } | null` (both persisted).
- **Atomic rollover (fixes the desync bug):** the streak reset (Stars screen) and the "Day X of 7"
  in the article reader must read from ONE store value and flip in the SAME update on day-7
  completion. Eliminate any independent/cached day calc in `ArticleReaderScreen`.

### Anti-exploit (offline-realistic; full fix = V3 server time)
Store gates on epoch `lastDailyClaim`. Added: **backwards-clock detection** (`now < lastDailyClaim`
→ award nothing, no advance); **cap +1 streak per genuine ~20–24h window** (the existing oneDay gate);
streak advances **only** via `completeDailyRitual()`/`claimDailyBonus()` (the stray `incrementStreak`
path was removed so a mount/reload can't bump it). Tagged a known V1 limitation.

### Schema additions
- `ArticleCategory`: **`'zodiac'`** added + a 7th feed chip (accent `#818CF8`, i18n
  `insights.categories.zodiac`). Do NOT add Communication/Healing/Social chips — those map to
  existing chips at the article level. Total chips = 7.
- Articles with `relatedModuleId:''` hide the end-of-article CTA.

### Corrected module mapping (real `modules.ts` ids)
`who_loves_me, energy_reading, who_hates_me, who_jealous, who_soulmate, who_admires, who_cut_off,
birth_chart, attachment_style, am_i_problem, am_i_healing`.
- `who_drains_me` **does not exist** → energy weeks 18 & 45 map to **`energy_reading`**.
- Healing weeks → **`am_i_healing`** (weeks 21, 52, 54).
- `who_admires` available for love/social weeks (e.g. week 7).
- **`birth_chart` already exists.** Zodiac weeks 28–33: if live, wire CTA now; else keep
  `relatedModuleId:''` (no CTA) until the V1.4 zodiac modules, then wire + use the forced-week hook.

### Content scale & locales
54 weeks × 7 = **378 articles + 378 questions + 54 weekly results** + a 3-theme seasonal reserve.
**EN-first**; FR/AR/ES use the existing `getArticleContent` fallback. Author as **one cluster file
per locale** (9 clusters) so startup never parses a single 2MB module.

### Build order (result still built last, per the Golden Loop)
1. **Now (safe rails) ✅** — `zodiac` chip; `WeeklyTheme`/`WeekOutcome`/`WeekDay` + empty `WEEKS[]`;
   flag-gated walker; `forcedNextWeekId` + `weeklyResult`; `tallyWeeklyOutcome`; anti-exploit.
   Typecheck clean, no screen changes.
2. **Pilot** — drop in **Week 1**, flip the flag (dev build), wire the day-7 reveal + strict
   sequencing, route the reader through the walker, device-test the full loop.
3. **Scale** — bulk-import weeks 2–54.
4. **Result screen polish** — built last, reusing the same outcome data.

---

## Phases & Progress

> The living, detailed tracker is **`docs/BUILD-STATUS.md`**. This table is the quick view.
> Update both when a screen locks.

### PHASE 0 — FOUNDATION (do before any more screens)
The screens kept missing because the *primitives* were off. Fix these first:
1. **Fonts** → install + wire Playfair Display, swap all `Fraunces_*` refs.
2. **Shared-component design audit** → GlassCard, GradientButton, ModuleCard, StarsBadge,
   ProgressBar vs `tokens.md` + their PNG appearances. Every screen inherits these.
3. **Splash logo reconcile** → the coded `AurafyLogo` (ring + 2 ellipses + solid core)
   does NOT match `screenshots/splash.png` (atom-style mark, glowing core, orbit dots).
   Decide canonical, then make code + screenshot agree.
4. **Splash timer** → `app/index.tsx` waits 10000ms. Reduce to ~1800–2200ms.

### PHASE 1 — UI MATCH (per-screen, via the Golden Loop)

| Screen | File | Status |
|---|---|---|
| Splash | `app/index.tsx` | ✅ matches — Simo-verified 2026-06-03 (timer still 20s, reduce to ~2s before release) |
| Onboarding (3 slides) | `app/onboarding.tsx` | ✅ matches — Simo-verified 2026-06-03 |
| Home | `app/(tabs)/index.tsx` | ✅ matches — Simo-verified 2026-06-04 |
| Module detail | `app/module/[id].tsx` | ✅ matches — Simo-verified 2026-06-04 |
| Reading mode | `app/reading-mode.tsx` | ✅ matches — Simo-verified 2026-06-05 |
| Person entry | `app/person-entry.tsx` | ✅ matches — Simo-verified 2026-06-05 (solo per `_3`) |
| Quiz (multi + solo) | `app/quiz.tsx` | ✅ matches — Simo-verified 2026-06-13 |
| Loading / ad-gate | `app/loading.tsx` | ✅ matches — Simo-verified 2026-06-13; C-10 pass re-approved 2026-07-03 |
| Result (multi + solo) | `app/result.tsx` | ✅ matches (98%) — Simo-approved 2026-07-03 (residuals in BUILD-STATUS) |
| Share card (reading + weekly) | `src/components/ShareCard.tsx` | ✅ matches (98%) — Simo-approved 2026-07-03 (view-shot capture; residuals in BUILD-STATUS) |
| Stars / wallet | `app/(tabs)/stars.tsx` | ✅ matches — Simo-verified 2026-06-06 |
| History | `app/(tabs)/history.tsx` | 🔲 |
| Settings | `app/(tabs)/settings.tsx` | ✅ matches — Simo-verified 2026-06-07 |
| Theme gallery | `app/theme-gallery.tsx` | ✅ matches — Simo-verified 2026-06-07 |
| About the psychology | `app/about-psychology.tsx` | ✅ matches — Simo-verified 2026-06-07 |
| Daily reading | `app/daily-reading.tsx` | 🔲 |
| Home "Tonight's Read" card | `app/(tabs)/index.tsx` | 🔄 built — awaiting device DIFF |
| Insights feed | `src/screens/insights/InsightsScreen.tsx` | 🔄 built — awaiting device DIFF |
| Article reader | `src/screens/insights/ArticleReaderScreen.tsx` | 🔄 built — awaiting device DIFF |

Legend: ✅ matches & Simo-verified · 🔄 in progress · ⚠️ "coded" but NOT design-verified ·
🔲 not started.

#### Insights roadmap (CORE feature — V1 / V1.1)
**V1 (ship-blocking):** content layer scaffolded ✅ (`src/content/articles/*`, one full
article); persisted state slice wired ✅ (`contentSlice`); 5th tab + reader route
registered ✅. Remaining: `ArticleBlocks` block renderer; `InsightsScreen` feed UI (featured
+ chips + list + sponsored); `ArticleReaderScreen` UI (progress bar, hero, blocks, end CTA,
Share, Claim +1 ✦); Home "Tonight's Read" card; scroll-reveal animations; i18n chrome
strings; **AR RTL**; fill the 8 backlog articles in `content.en.ts`. Economy V1 = free +
read-to-earn (+1 ✦/day behind an ad).

**V1.1 (post-launch):** real AdMob native/rewarded wiring (replaces the SPONSORED
placeholder + the reward gate); translate `content.fr/ar/es`; saved/bookmark surface;
"continue reading" + read-history surface; broaden the `featured` daily pool as articles
land. (No premium articles / IAP — Moroccan AdMob-only constraint.)



### PHASE 2 — CONTENT (mostly done)
7 modules × 20 questions (en/fr/ar/es), insight pools ≥6 variants × ≥3 dimensions, results
files, engine wiring traced end-to-end. **Gaps:** `dailyQuestions.ts` has 10/365; some
screens still hardcode English strings (see BUILD-STATUS cleanup list).

### PHASE 3 — PERFORMANCE
React.memo on list items, useMemo on expensive renders, useCallback on prop handlers,
UI-thread animation audit.

### PHASE 4 — ADMOB HARDENING
Install `react-native-google-mobile-ads`, real ad unit IDs, error handling, offline
safety, persisted interstitial counter.

### PHASE 5 — EAS BUILD + PLAY STORE
Production AAB, store listing copy, privacy policy, icon/splash assets at required sizes.


