# Aurafy — Build Status

**Last updated:** 2026-06-07 · Maintained by Claude Code at the end of every screen (Stage 4 LOCK).

## Legend
- ✅ **DONE** — matches design + Simo-verified on device
- 🔄 **IN PROGRESS** — actively being matched via the Golden Loop
- ⚠️ **CODED, NOT VERIFIED** — exists in code but never diffed against the design PNG on device (treat as not done)
- ⛔ **BLOCKED** — waiting on a decision/dependency
- 🔲 **NOT STARTED**

---

## 0 · FOUNDATION — do before more screens

| Item | Status | Detail |
|---|---|---|
| Playfair Display fonts | ✅ | 2026-06-03: installed `@expo-google-fonts/playfair-display`, wired in `_layout.tsx`, swapped every `'Fraunces_*'` → `'PlayfairDisplay_*'` across the repo (16 files), removed Fraunces import. Verified on device via splash. |
| Shared component audit | 🔲 | `GlassCard`, `GradientButton`, `ModuleCard`, `StarsBadge`, `ProgressBar`. Every screen inherits these — if they're off, per-screen fixes are whack-a-mole. Diff each against `tokens.md` (radius 20, glass `rgba(255,255,255,.05)`, border `.08/.14`, gold glow `0 0 16px rgba(245,197,66,.25)`, etc.). |
| Splash logo reconcile | ✅ | 2026-06-03: the atom-style `AurafyLogo` (2 ellipses, glowing magenta core, orbit dots) is canonical and matches `screenshots/splash.png`. Simo-verified on device. |
| Splash timer | ⚠️ | `app/index.tsx` `setTimeout(..., 20000)` — currently a **20s debug hold** (Simo bumped it from 10s to allow time to screenshot). Reduce to ~1800–2200ms before release. |

---

## 1 · SCREENS (Phase 1 — UI match)

### Splash — `app/index.tsx` — ✅ DONE (Simo-verified 2026-06-03)
- **Final state:** soft indigo radial glow (`#4338CA` 0.26 → fade) + top-left purple aurora + bottom teal aurora; `AurafyLogo` at 116; wordmark Playfair Display 700, 44px, letter-spacing −0.4; tagline 13px; "LOADING THE STARS" footer.
- **What changed this pass:** swapped wordmark Fraunces → Playfair Display; replaced flat bg with centered radial glow; grew logo 64 → 116; tightened logo→wordmark gap (`marginTop` −22, container `gap` 12); wordmark 48 → 44 with −0.4 tracking; tagline 15 → 13.
- **Outstanding (non-visual):** timer still 20000ms — see Foundation → Splash timer; reduce to ~2s before release.

### Onboarding — `app/onboarding.tsx` — ✅ DONE (Simo-verified 2026-06-03)
- **Final state:** 3 slides, all copy via i18n, Playfair headings.
  - Slide 1 = three glowing person glyphs (teal/violet/emerald) each with a soft radial head-halo + title + subtitle.
  - Slide 2 = fanned 3-card stack; front card is **dark frosted glass** (`cardOpaque rgba(24,29,52,0.93)`, width 228) that fully occludes the two dimmed back cards so only their edges/tags peek; "ATTACHMENT THEORY" one line + 3-line question.
  - Slide 3 = gold star + glow, three earn mini-cards (Use/Daily/Watch), gold 4-point sparkle (`MaterialCommunityIcons star-four-points`) beside the title + subtitle.
  - Shared: `BackgroundGlow` soft violet radial bloom in the upper field (all slides); cyan→violet active pagination dot; gradient Continue/Begin CTA; Skip top-right.
- **What changed across the loop:** Fraunces → Playfair Display; `EarnCardsRow` + sample cards fully i18n'd; dropped the `✨` emoji for a gold vector sparkle; replaced opaque `GlassCard` (renders black on Android) with custom dark-frosted cards; added per-glyph head glow + background bloom; tuned card occlusion/brightness/peek over several DIFF passes.

### Home — `app/(tabs)/index.tsx` — ✅ DONE (Simo-verified 2026-06-04)
- **Final state:** cosmic indigo→navy gradient bg (`#181430→#0E0B22→#08061A`) + violet radial bloom behind the hero; header = atom `AurafyLogo` + Playfair wordmark + gold `StarsBadge`; "TONIGHT'S QUESTION" eyebrow + Playfair hero; Daily Question card (gold left accent bar, moon tile, 🔥 streak chip, "Tap ›"); RELATIONSHIPS / SELF-DISCOVERY sections; 2-up `ModuleCard` grid with a soft per-module corner bloom; dashed/lock "Coming soon" cards (Birth Chart, Am I Healing); cyan-active tab bar with gold Stars star.
- **What changed across the loop:** background reworked from near-black to indigo→navy + violet bloom; card density compacted (minHeight 190→148, title 18→16, subtitle 12→11, tighter padding/spacer) and **kept compact per Simo's choice**; all copy i18n'd (sections, "Tap", daily-ready); module-card corner bloom softened (radial stops 0.55/0.16 → 0.32/0.09) to kill the over-saturated "neon" glow and match the design's subtle upper-right blooms. Begin→Home intro is a root overlay (`CosmicReveal`) — confirmed good on device.
- **Notes:** card sizing is intentionally smaller than the mock (Simo's call) — divergence accepted. "Who's Pulling Away" still has no reading content (Phase-2 gap), unrelated to the visual lock.
- **2026-06-05:** `ModuleCard` accents follow `module.color`; the Energy Reading (`#10B981` emerald) and Attachment Style (`#22D3EE` cyan) card colours changed when those data colours were corrected for the per-module detail theming — re-verified, still locked. Also responsive `rs()` + Android BlurView `__DEV__`-gate applied app-wide (no visual change in Expo Go).

### Module detail — `app/module/[id].tsx` — ✅ DONE (Simo-verified 2026-06-04; per-module theming 2026-06-05)
- **Per-module theming (2026-06-05, Simo-verified):** the whole screen is now driven by a
  single `accent = module.color` — background **bloom**, framework **tag** (dot/text/border),
  **icon circle** (brightened to `${accent}2E` fill + `${accent}66` border), and the **title**
  (full accent colour, Simo's choice) all take the module's accent instead of the old fixed
  violet `theme.primary`. Cost label shows **"from"** only for tiered modules (`Math.max ≠
  Math.min` of `starsCost`): Attachment shows `1 ✦`, Energy shows `from 1 ✦`. Corrected two
  placeholder-duplicate colours in `src/data/modules.ts`: `energy_reading #2FEAAC → #10B981`
  (emerald), `attachment_style #2FEAAC → #22D3EE` (cyan) — these also retint those two **Home**
  cards (re-verified). Design refs: `05-module-detail_1.png` (Attachment cyan) / `_2.png`
  (Energy emerald). **⚠️ Source-of-truth:** colored titles diverge from the PNGs (white titles
  there) — Simo to re-export `05-module-detail*.png` so code + reference agree.
- **Final state (base layout):** cosmic indigo→navy gradient + per-module radial bloom behind the icon; header = glass back chevron (left) + live `StarsBadge` (right); 116dp icon circle holding the glossy emoji; Playfair title; framework pill ("• ATTACHMENT THEORY" etc., dot + uppercase); muted 3-line description; glass info card (20 questions / ~5 minutes / cost ✦ to read) with Playfair-bold **lining** figures; bottom-pinned gradient "Begin Reading" button (dark bold label).
- **What changed across the loop:** removed the `iconCircle` `elevation`/shadow that rendered a dark box on Android; tried a hand-authored crystal-ball SVG then reverted to the glossy emoji (matches design, the SVG read flat-violet); removed the duplicate **native** Stack header back arrow (`headerShown: false`) so only the custom glass chevron shows; resized every text element down to the measured design dp (title 36→29, description 16→13.5, info values 26→18, labels 13→11.5, tag 12.5→10.5); added `fontVariant: ['lining-nums']` so the digits are full-height like the design; added i18n `moduleDetail.*` + reworded `who_loves_me.description`; `GradientButton` gained an optional `bold` prop.
- **Responsive:** all sizes/spacing wrapped in `rs()` from `src/utils/responsive.ts` (design-dp scaled by `screenWidth/360`, clamped 0.85–1.25) — identical on the 360dp baseline device, scales on others. **First screen on the responsive helper; roll out to the rest per-screen.**
- **Notes:** GlassCard info card renders opaque navy on Android (BlurView limit) — accepted. Only `who_loves_me` description got the short design copy; other modules keep their longer i18n copy.

### Reading mode — `app/reading-mode.tsx` — ✅ DONE (Simo-verified 2026-06-05)
- **2026-06-05:** matched `06-mode-select.png` / `_1` (Energy) / `_2` (Jealous). Per-module
  theming (accent bloom bg + `${accent}` icon tiles + accent selected glow), vector icons in
  tiles (blue person / light outline shapes, no emoji), gold `{n} ✦` cost badges. Sizes
  measured from the PNG via the /2.444 method and `rs()`-wrapped (title 24, card title 15,
  subtitle 12, tile 40); cards use `minHeight: rs(82)` for even height. Own glass back button
  (native header removed in `_layout.tsx`), Continue pinned + cyan glow.
- **Free trial:** `FREE_TRIAL_MODULE_ID` (energy_reading) shows "Free" (accent) on every mode
  until consumed; reverts to gold costs after. Persisted `freeTrialUsed` in `userStore`.
- **Deferred (Simo):** Compare/Circle cards a hair taller than Solo/Triangle when the subtitle
  wraps to 2 lines (`minHeight` mitigates; not fully equalised).

### Person entry — `app/person-entry.tsx` — ✅ DONE (Simo-verified 2026-06-05)
- **2026-06-05:** solo variant matched `06-mode-select_3.png` — shared chrome (glass back
  button + StarsBadge + per-module accent bloom), eyebrow + "This reading is for you" +
  "Answer honestly…" subtitle, subtle glass "You · locked" card with accent avatar, pinned
  "Start Reading — {cost} ✦" (glow + `star-four-points` trailing icon) and dimmed grey
  balance line. Multi variant keeps `PersonInput` list under the same chrome. Free-trial
  consume point: skips `spendStars`, calls `markFreeTrialUsed()`, button → "Start Reading — Free".
- i18n added: `personEntry.soloTitle/soloSubtitle/locked/startFree`.
- **2026-06-05 (reopened → re-locked, Simo-verified):** matched the new `07-person-entry.png`
  /`_1`…`_4` name-input refs. (a) **`PersonInput` resized** — it was the only piece authored in
  raw dp; avatar 40→30, swatches 28→20 on a single `space-between` row (were wrapping to 2 rows),
  "?" placeholder instead of the index number, dark avatar text, dropped double margin, every
  value now `rs()`-wrapped — this was the "looks too big" defect. (b) **Solo no longer always
  locked**: the "You · locked" card is now gated on `isLockedSelf = module.type === 'solo' &&
  mode === 'solo'`, so only **self-discovery** modules lock to "You"; relationship modules
  (incl. the Energy free trial) get a normal name-input card in solo. (c) Subtitle now shows on
  both variants; added `personEntry.subtitle` (en/fr/ar/es).

### Quiz — `app/quiz.tsx` — ✅ matches — Simo-verified 2026-06-13
- Full rewrite (breath interstitial + question phase). Per-module theming: background bloom,
  breath halo, framework tag, progress bar all driven by `module.color` so each module's quiz
  is visually distinct. Breath float faster (±6dp/800ms) + 4.5s hold; breath copy is 3-way
  (`quiz.breath.solo` self / `soloPerson` named relationship-solo / `multi`).
- Solo-relationship: question's `{name}` rendered in the module accent; answers = generic
  frequency scale. Self-discovery: 4 `soloAnswers` cards. Multi: one card per person.
- Cards are glass (diagonal sheen gradient, `borderStrong`, taller/roomier); person cards
  have a straight accent strip and NO chevron (Simo override of the design PNG, which showed
  one). New i18n: `quiz.breath.soloPerson` (en/fr/ar/es — FR/AR/ES pending native review).

### Loading / ad-gate — `app/loading.tsx` — ✅ matches — Simo-verified 2026-06-13
- Full rewrite (the old `CosmicReveal` scattered-dot field is gone for this screen).
  Loader = a hexagon of 6 **module-coloured** dots around a small centered atom, joined by a
  faint outline; a single shared `phase` (3.6s loop) sweeps a brighten+swell "chase" around
  the ring. Background bloom is module-tinted too — each module's loading screen is unique.
- Cycling phrases via i18n (`loading.phrases.*`), 4 phrases, 1.6s interval.
- Ad-gate is a **bottom sheet** (slides up, drag handle, rounded-top border, translucent glass
  `rgba(11,14,37,.90)`). Title = per-module **emoji** (`module.icon`) + Playfair "ready";
  full-width "▶ Watch Now" (`GradientButton` `leadingIcon="play"`, dark label) + gold-star
  "Skip (1 ✦)". When the sheet is up the loader ghosts back (`loaderDim` 0.4) yet keeps chasing.
- All strings localized (new `loading` i18n block, en/fr/ar/es — FR/AR/ES pending native review).
  Added `GradientButton.leadingIcon` prop.

### Result — `app/result.tsx` — 🔲 (matches `result-multi.png` + `result-solo.png`)
- **Implemented:** multi = winner name (glow) + confidence + comparison bars; solo = verdict + confidence + "what this means"; insights card; share/retry/save.
- **Watch for:** winner name font; insight prefix `✦`; share text format. Heaviest screen — most likely to need several DIFF passes.

### Stars / wallet — `app/(tabs)/stars.tsx` — ✅ matches — Simo-verified 2026-06-06
- **Final state:** transparent container over the root CosmicField (indigo→navy) + top-center violet
  `CosmicBloom` glow; balance hero = gold `MaterialCommunityIcons` star vertically centered on a
  Playfair-Bold 52 number (gold glow) + "Your Stars ✦" label; "EARN MORE" + 4 earn cards (colored
  icon tile `play`/`calendar`/`fire`/`share-2` + title + subtitle + "+N ✦" accent pill, whole card
  tappable); daily-bonus **claimed** state (dimmed, "Come back in 24h", grey "Claimed" chip);
  7-day streak = 7 thin (~5dp) rounded rose dashes with glow; "RECENT ACTIVITY" = single glass card,
  hairline-divided rows (localized reason + relative time / "+N ✦", emerald earn / rose spend);
  light (non-gold) "+N ✦ earned" toast on earn; gold active Stars tab label.
- **Plumbing:** added `emerald` (#34D399) theme token (type + cosmic + desertOracle); store reasons
  normalized to stable keys (`reading`, `daily_bonus`) + seeded "Welcome gift +5"; new i18n keys
  (subtitles, claimed, comeBack, earnedSuffix, reason* labels) in en/fr/ar/es.
- **Testing shim:** every card earns directly (watch/streak/share bypass real gating) — real
  rewarded-ad / 7-day / share-completion gating is Phase 4.

### History — `app/(tabs)/history.tsx` — 🔲
- **Implemented:** list of past readings (module icon, title, result preview, mode badge, date), empty state, banner-ad footer.
- **Watch for:** module emoji icon fallback `🔮`; "Reading from …" a11y; date format.

### Settings — `app/(tabs)/settings.tsx` — ✅ matches — Simo-verified 2026-06-07
- **Final state:** transparent over root CosmicField + top `CosmicBloom`; Playfair title; sectioned
  glass cards (Appearance / Language / Sound & Audio / Notifications / Reading preferences / About /
  Data), each a translucent `rgba(255,255,255,0.05)` panel with **shadow/elevation killed** (the dark
  drop-shadow was muddying the translucent interior) and hairline dividers between rows. Rows: label
  Inter-500 14 + muted sublabel 12, `minHeight rs(48)` (Simo's value). Appearance is **2 rows**
  (Theme + Haptic) — Background-animations/Reduce-motion intentionally dropped (Simo-approved); the
  stale `14-settings.png` shows 4 → re-export.
- **Interactions reworked across the loop:** default mode **cycles on tap of the mode chip only**
  (not the whole row); **Volume** = custom `Slider` (absolute tap-to-set + drag, Tap+Pan race) that's
  **disabled (dimmed + inert) when both Sound effects AND Ambient audio are off**; **Reminder time**
  row disabled when Daily reminder is off; reminder uses a 3-wheel `TimeWheelSheet` (any time) —
  scroll fixed via `GestureHandlerRootView` + gesture-handler `ScrollView` + sibling-backdrop;
  "How Aurafy works" → onboarding tour.
- **Pop-ups (replaced every `Alert.alert`):** Clear / Reset / Export-empty → `ConfirmSheet`
  (bottom sheet: serif title, full-width solid pill — **Clear cyan `#06B6D4`**, **Reset rose**,
  space under Cancel) with the app-glass surface sheen; theme unlock → `ThemeUnlockDialog`.
- **i18n:** design-matched copy (`Reset all data?`, factory-reset body) + action keys, all 4 locales.

### Theme gallery — `app/theme-gallery.tsx` — ✅ matches — Simo-verified 2026-06-07
- **Final state:** stack chrome (glass back + `StarsBadge`), Playfair title, 2-up grid. Cosmic (active,
  cyan border) + Desert Oracle (sunset swatch + `50 ✦` cost pill) full-strength; **4 locked "Soon"
  tiles faded** (whole cell `opacity 0.6` + frosted `BlurView`, "Soon" dimmed to `textDim`) so they
  recede like the design; locked tile gradients re-tinted to the design centers (Ember = warm plum,
  not navy).
- **Unlock dialog → `ThemeUnlockDialog`** (real component, replaces `Alert.alert`): gradient **hero**
  (explicit widths — `width:'100%'` collapsed the no-content child to 0 and it never painted),
  serif name, **COST | BALANCE** split, contextual button (gradient "Unlock for N" when affordable,
  gold-outline "Need N more →" → routes to Stars), Cancel; **app-glass card** (surface sheen, not
  pure black) over a **blurred backdrop** (`expo-blur` dimezis). i18n keys cost/balance/unlockForCost/
  needMore in all 4 locales.

### About the psychology — `app/about-psychology.tsx` — ✅ matches — Simo-verified 2026-06-07
- **Final state:** stack-screen chrome (glass back + bloom), reached from Settings → About. Matched
  over the Settings-area DIFF rounds; locked alongside Settings.

### Daily reading — `app/daily-reading.tsx` — 🔲
- **Implemented:** day-of-year question, answer cards, insight reveal animation, bonus claim, already-answered state.
- **Watch for:** header 🌙 emoji + hardcoded; only 10 daily questions exist.

---

## 1.5 · INSIGHTS / ARTICLES (CORE feature — see CLAUDE.md → Insights)

**Scaffolded 2026-06-06** (typed stubs + content layer + state + routes; no UI matched yet).

| Piece | File | Status |
|---|---|---|
| Content types + metadata | `src/content/articles/index.ts` | ✅ scaffolded (types + `ARTICLES` registry + resolvers) |
| EN content | `src/content/articles/content.en.ts` | 🔄 1 full article (`ten_signs_secret_love`) + 8 backlog w/ titles + starter bodies |
| FR / AR / ES content | `src/content/articles/content.{fr,ar,es}.ts` | 🔲 empty stubs (EN fallback) |
| Daily pick | `src/content/articles/dailyInsight.ts` | ✅ deterministic `getDailyInsightId` (date-hash) |
| State slice | `src/store/contentSlice.ts` | ✅ wired into `userStore` (read/saved/daily bonus) |
| Insights feed | `src/screens/insights/InsightsScreen.tsx` | 🔄 built — awaiting device DIFF |
| Article reader | `src/screens/insights/ArticleReaderScreen.tsx` | 🔄 built — awaiting device DIFF |
| Feed/reader components | `src/screens/insights/components/*` | 🔄 built (`FeaturedInsightCard`, `ArticleCard`, `ArticleBlocks`, `ReadingProgressBar`, `OrbitArt`) |
| Home "Tonight's Read" card | `app/(tabs)/index.tsx` | 🔄 built — awaiting device DIFF |
| Nav (5th tab + reader route) | `app/(tabs)/{_layout,insights}.tsx`, `app/_layout.tsx`, `app/article/[id].tsx` | ✅ registered |
| Images | `assets/insights/` | 🔲 placeholder (`.gitkeep`) — art uses generated `OrbitArt` for now |
| i18n chrome | `src/i18n/{en,fr,ar,es}.json` → `insights.*` | ✅ all 4 locales |

- **2026-06-06 (build pass):** feed + reader + Home hook implemented (typecheck clean). Art is the generated `OrbitArt` (atom motif) per category — no image assets yet. **Open Q for Simo:** feed chips include an "All" (default); design shows "Love" highlighted over a mixed list — confirm desired default/whether to drop "All".
- **V1 remaining:** device DIFF passes (Golden Loop) → AR RTL → real images → broaden daily `featured` pool. Economy = free + read-to-earn (+1 ✦/day behind an ad; ad gate stubbed).
- **V1.1:** real AdMob native/rewarded wiring, FR/AR/ES translations, saved + read-history surfaces. No IAP (AdMob-only).
- **Note (non-blocking):** new earn reason key `insight_read` needs a localized label in `stars.tsx` `reasonLabel` + i18n when the reward UI is built.

---

## 2 · CONTENT — ✅ (with gaps)
- ✅ 7 modules in `modules.ts`; 20 questions each in `src/data/questions/*` (en/fr/ar/es).
- ✅ Results files `src/data/results/*` with insight pools (≥6 variants, ≥3 dimensions).
- ✅ Engine wiring traced: quiz → loading → scoringEngine → resultGenerator → result.
- ⚠️ `src/data/dailyQuestions.ts` — **10 / 365**. Expand before release.

## 3 · ENGINE — ✅
- `scoringEngine.ts`, `insightSelector.ts` (seeded), `resultGenerator.ts` — pure, working.

## 4 · INFRA / RELEASE — 🔲
- 🔲 AdMob: replace stub with `react-native-google-mobile-ads` + real IDs (`src/ads/adIds.ts` still has `REPLACE_WITH_REAL_*`).
- 🔲 EAS production AAB.
- 🔲 Privacy policy + Play Store listing copy (AdMob requires a privacy policy URL).
- 🔲 Icon + splash assets at all required densities.

---

## CLEANUP BACKLOG (fix opportunistically while on the relevant screen)
- ~~`onboarding.tsx`: hardcoded EN strings in `EarnCardsRow`; `iconOnTint = 'undefined'` dead var; `✨` appended to title.~~ ✅ resolved 2026-06-03 (i18n'd, gold vector sparkle, cleaned up).
- `quiz.tsx`: dead/confusing `isSolo` expression.
- `daily-reading.tsx`: `const setLastDailyQuestion = useUserStore.getState;` — unused/confused line.
- ~~`(tabs)/index.tsx`: hardcoded `RELATIONSHIPS`, `SELF-DISCOVERY`, `Tap`, `Today's free question is ready`.~~ ✅ resolved 2026-06-04 (all via `t()`: `home.sectionRelationships/sectionSelf`, `common.tap`, `home.dailyReady`).
- `(tabs)/stars.tsx`, `daily-reading.tsx`: emoji used as icons → vector icons + i18n.
  (`loading.tsx` ✅ resolved 2026-06-13 — i18n'd; ad-gate emoji is now the per-module
  `module.icon`, an intentional Simo-confirmed design choice, not a cleanup target.)
- `app/index.tsx`: dual splash (native `app.json` splash + custom screen) + 20s debug timer → reduce to ~2s.
- `dailyQuestions.ts`: 10 → 365.
