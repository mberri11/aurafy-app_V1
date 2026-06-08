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
- **Inter** — all body text, labels, captions. (`Inter_400Regular`, `_500Medium`,
  `_600SemiBold`, `_700Bold`.)

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
- `userStore.ts` — **persisted** (AsyncStorage `aurafy-user`). Stars [0–50], history cap
  20, transactions cap 5. Daily bonus 24h cooldown, streak resets after 48h gap.
- `contentSlice.ts` — **Insights** state (`readArticleIds`, `savedArticleIds`,
  `lastDailyBonusDate`, `markRead`, `toggleSaved`, `claimDailyInsightBonus`). Composed
  INTO `userStore` via the zustand slices pattern (not a separate store) — persisted in
  the same `aurafy-user` blob.
- `readingStore.ts` — **transient** session state. Reset between readings.
- `settingsStore.ts` — theme + language preferences (persisted, `aurafy-settings`).

### Theming (`src/themes/`)
`useTheme()` exposes `ThemeColors`. All components use `useTheme()` — never hardcode
colors. Two themes: `cosmic`, `desertOracle`. Splash bg `#07091A` is also hardcoded in
`app.json` — keep in sync if changed.

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
| Quiz (multi + solo) | `app/quiz.tsx` | 🔲 |
| Loading / ad-gate | `app/loading.tsx` | 🔲 |
| Result (multi + solo) | `app/result.tsx` | 🔲 |
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
