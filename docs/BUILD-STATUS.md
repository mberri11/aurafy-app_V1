# Aurafy — Build Status

**Last updated:** 2026-07-04 · Maintained by Claude Code at the end of every screen (Stage 4 LOCK).

> **EAS DEV BUILD LIVE (2026-07-04):** first Android development build (profile `development`,
> dev-client APK, internal distribution) built + installed on Simo's device. `expo-dev-client@6.0.21`
> added to deps. Verified on it: **gallery save works (no WARN)** and **notifications deliver**
> (dev-panel test button). Native-dep or `app.json`-plugin changes now require an EAS rebuild;
> JS/TS changes hot-reload via `pnpm start` as before. Build:
> https://expo.dev/accounts/simobr/projects/aurafy/builds/712ce554-4561-485d-bf58-3d5d34f65d29

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

## Cross-cutting · RTL (Arabic) — ✅ matches 95% (Simo 2026-06-22; residual: careful per-screen device retest pending)

Full app-wide RTL correctness pass. **Root cause:** widgets/icons branched on the JS
`I18nManager.isRTL` flag, which reads stale under Expo Go + New Arch (mirrored layout but
flag `false`); and physical `left`/`right` styles get auto-swapped by native RTL.

**Fix pattern (now the standard):** positions use **logical props** (`start`/`end`,
`marginStart`/`paddingStart`/`borderStart*`, `*StartRadius`) which auto-mirror with the
native layout; transforms (`translateX`) keep physical and flip **sign** via `useIsRTL()`
(`src/utils/rtl.ts`, language-based — the one sanctioned JS RTL signal); directional icons
branch their glyph on `useIsRTL()`. **Never read `I18nManager.isRTL` for rendering.**

- **Widgets:** `Toggle` + `Slider` re-anchored to logical `start`, language-signed travel.
- **Icons:** 9 back/forward chevrons + CTA arrow now flip (module, reading-mode, person-entry,
  theme-gallery, about-psychology, article reader, home, article card).
- **Positions:** Insights cards/accents/quote-border, Home daily accent, onboarding skip +
  fanned card stack, settings header/picker, GradientButton icons, ModuleCard bloom.
- **Transforms:** quiz slide + onboarding card fan mirror by `useIsRTL()`.
- **Naskh font:** loaded `@expo-google-fonts/noto-naskh-arabic` (4 weights); new `AppText`
  wrapper (`{ AppText as Text }` per file) auto-swaps Inter/Playfair → Noto Naskh in Arabic;
  wordmark opts out via `latin`.
- **Restart behaviour:** language ⇄ Arabic needs a native restart. **Dev (Expo Go):** the
  in-app "Restart" button can't apply `forceRTL` — use a **terminal reload (`r`) / full
  relaunch**. **Production (Phase D):** `expo-updates` `Updates.reloadAsync()` does it
  automatically + seamlessly. See `src/utils/reloadApp.ts`.
- **Verify:** Simo screenshots Arabic (after terminal reload) — Home, Settings, Insights feed
  + reader, Onboarding, Quiz, Result — then this flips to ✅.

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
- **2026-07-03:** the locked "You" card now carries the selected-state treatment (2px
  module-accent border + glow), mirroring reading-mode's selected card — Simo-verified 2026-07-03.

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

### Loading / ad-gate — `app/loading.tsx` — ✅ matches — Simo-verified 2026-06-13; C-10 pass re-approved 2026-07-03 (98%)
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
- **2026-07-03 (C-10 result-experience pass, Simo-approved):** the centered atom now rotates (7s,
  rs64) with a breathing accentSoft glow behind it; phrases → per-CATEGORY copy pools ×3 with
  crossfade (`loading.pool.<cat>1..3`, 4 locales). Gate sheet rebuilt per `ad_gate*.png`: glowing
  module orb (Svg sphere) + expanding pulse ring + "YOUR READING IS READY" accent eyebrow +
  Playfair "One veil left to lift" + ▶ Watch Now (ad→FULL) / "See the full reading" 1✦ glass pill
  (spend→FULL) / "Skip" text (free→MINIMAL). All colors from the per-module spine. Flagged
  divergence (accepted): design shows a blurred result behind the gate; we ship dimmed loader +
  scrim (Expo Go blur cost).

### Result — `app/result.tsx` — ✅ matches (98%) — Simo-approved 2026-07-03
- **Final state (C-10 result experience; spec `aurafy-result-experience-DESIGN-SPEC.md` +
  `Screenshots_new/Result_*.png` — these supersede the old `result-multi/solo.png`):** per-module
  themed via the category spine — accent eyebrow (module subtitle) → crisp white reveal name
  (single accent textShadow r16) + ghosted oversized motif + 3 accent ✦ sparkles → verdict line →
  confidence card (§3 honest: percentile sub-line only after ≥5 prior readings) → THE FULL PICTURE
  (accent bars, winner emphasized) → WHAT THIS MEANS (✦ bullets) → disclaimer → accent Share pill
  (`[accent, darkenHex(accent,.22)]`) → Try another | Save & exit.
- **Two-tier (Option C):** gate on loading → ad or 1✦ unlocks FULL; free Skip → MINIMAL (eyebrow +
  name + verdict + confidence + "STILL VEILED" unlock card + accentSoft floor bloom). Reading is
  saved on mount regardless of tier; History reopen is always full (accepted).
- **Module-color pass (2026-07-03, device-verified):** spine accents realigned to `Module.color`
  (COLOR RULE comment in `src/themes/categoryTheme.ts`) — loves **violet #8B5CF6** (was wrongly
  pink; pink stays with soulmate), jealous **emerald #34D399** (took energy's original green;
  venom #046B50 dropped), energy **radiant white #FFFFFF** (soft = silver #E2E8F0, deliberately
  darker than the accent so blooms stay visible), am_i_problem **gold #F5C542** (matches its Home
  card; mirror motif keeps it apart from admires' eye).
- **Residual retouch (~2%, logged per matches-protocol):** Simo's minor polish TBD; energy
  Home/module tile is still the gold ✨ emoji on the now-white tile (emoji→vector standing item);
  History love `crystal-ball` glyph swap still optional.

### Share card (result + weekly) — `src/components/ShareCard.tsx` — ✅ matches (98%) — Simo-approved 2026-07-03
- **One generator, two variants** (design `Screenshots_new/share_card.png`, 1080×1920 story):
  fixed 360×640 logical canvas in RAW px (deliberately no `rs()` — the export must be identical
  on every device), captured at 3× via react-native-view-shot (4.0.3, SDK-pinned → capture works
  in Expo Go) and shared as PNG through expo-sharing. Off-screen host parked past the left edge
  on `result.tsx` + `weekly-result.tsx`; the old text share remains the automatic fallback.
- **Anatomy:** accent-tinted night sky + deterministic star field + ✦ sparkles → atom logo +
  Playfair wordmark → center block (reading: spine-colored eyebrow / white glowing name /
  verdict line + faint planet rim · weekly: constant weekly-cyan venn motif + "MY WEEK REVEALED"
  + outcome title) → Playfair-Italic pull-quote → glass CTA pill ("Discover yours →" /
  "Start your week →") → `@aurafy.app` watermark. New font loaded:
  `PlayfairDisplay_400Regular_Italic` (+ Naskh mapping so the AR quote never falls to Latin).
- **Quote = designed shareLines (Simo's option b):** `shareLines` added to `MultiResults`
  (per dimension) + `SoloResults` (per verdict) and filled in all 9 results files — 27 lines ×
  4 locales (multi modules second-person, self modules first-person confession);
  `resultGenerator` stamps the pick into `ResultData.shareLine`. Weekly reuses
  `WeekOutcome.shareLine` (already existed for exactly this).
- **Save-to-gallery:** expo-media-library (18.2.1 + app.json plugin) — circular download button
  beside Share on the result (ALSO on History view-only reopens; nav pills stay fresh-reading
  only) and on weekly, with a transient "Saved ✓ / allow photos" hint. i18n `shareCard.*` ×4.
- **Same-day retouches:** loves `accentSoft` #C4B5FD→#A78BFA (loading glow read white on
  device); solo-quiz `{name}` highlight now `accentInk(accent)` — ice-blue #9CC2FF ONLY for the
  white energy accent, which vanished inside white question copy (every colored module keeps its
  accent); reveal names on result/card stay white-ink + accent-glow (re-approved after a blue-ink
  detour — do NOT re-tint them); planet rim softened .06→.04; download button made circular.
- **Gallery save CONFIRMED on the EAS dev build (Simo, 2026-07-04)** — no media-library WARN,
  PNG lands in the local gallery. (Expo Go's "limited access" warning was a Go-only artifact.)
- **Residual (~2%):** pre-2026-07-03 History readings carry no stored shareLine →
  their cards render without the pull-quote (accepted); `share_card.png` shows pre-swap pink
  loves — re-export pending; FR/AR/ES shareLines pending native review.

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

### History — `app/(tabs)/history.tsx` — ✅ matches (90%) — Simo-approved 2026-06-30 (advance now; residual logged)
- **Final state:** transparent over root CosmicField + top `CosmicBloom` (was flat-black; the fix). Playfair "Your
  Readings" title. Merged, date-sorted timeline of `history` (readings) + `weeklyHistory` (weekly entries).
- **Reading cards** are category-themed via the new **category spine** (`src/themes/categoryTheme.ts`,
  `src/components/CategoryMotif.tsx`): accent left-bar + soft category bloom + motif tile (vector, no emoji) + dot-eyebrow
  (module) + Playfair result name + inline "— X% confidence" + Solo/Compare/… pill + date; tap → view-only result.
  Result name via `src/utils/readingDisplay.ts` (winner name → solo verdict LABEL → dominantDimension).
- **Weekly card:** distinct constant-cyan treatment — orbit tile + "WEEKLY READING" eyebrow + "7-DAY" badge + outcome
  title (Playfair) + "7 nights · completed {date}" (single completion date — NOT a continuous range, since the streak is
  forgiving). Saved idempotently in `userStore.claimWeeklyResult` → persisted `weeklyHistory[]` (cap 20; cleared by
  `clearHistory` + `resetAll`).
- **Empty state:** canonical `AurafyLogo` (rs116) over a violet bloom + "Your readings will live here" + spec copy +
  gradient "Start a reading" CTA. **Sponsored ad slot renders in BOTH states** (online-only; empty pushes it to the bottom).
- **i18n:** 4 locales — `emptyMessage` (new copy), `confidenceLine`, `weeklyEyebrow`, `sevenDayBadge`, `nights`, `sponsored`.
- **RESIDUAL (final-revision retouch, non-blocking):** love card motif is the spec's `crystal-ball` glyph — reads slightly
  webcam-like at small size; offered Simo a one-line swap to a glow-orb/heart. No `aura`-category card appears from real data
  until the Aura module ships (spine already supports `aura_color`).

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

### Daily reading — `app/daily-reading.tsx` — ✂️ REMOVED (absorbed)
- The standalone screen was deleted: the daily ritual question now lives at the bottom of
  the daily article in `ArticleReaderScreen` (see CLAUDE.md → Stars Economy → Key rules).

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

## 1.6 · C-10 — WEEKLY CURRICULUM & RESULT — 🔄 PILOT IN PROGRESS (flag ON)

**2026-06-24 (foundation pass):** safe, non-breaking rails for the daily ritual → weekly result
system. Full spec in **CLAUDE.md → "C-10 — Weekly Curriculum & Result System"**; data plan in
**`docs/aurafy-article-content-map.md`** (54-week canonical map). Current app behavior unchanged
(`WEEKLY_CURRICULUM_ENABLED = false`, `WEEKS` empty → walker no-ops, legacy daily pickers still run).
Typecheck clean. (The 2 `reading-mode.tsx` errors noted here at the time — both caused by
`GlassCard`'s `style` prop being typed `ViewStyle | ViewStyle[]` instead of `StyleProp<ViewStyle>`,
which rejected the conditional `style={[...]}` arrays used for the selected-mode-card treatment —
were fixed 2026-07-07 by retyping `GlassCard.style` to `StyleProp<ViewStyle>`.)

| Piece | File | Status |
|---|---|---|
| Feature flag | `src/config/flags.ts` | ✅ `WEEKLY_CURRICULUM_ENABLED = false` |
| Week types | `src/data/weeks/types.ts` | ✅ `WeekOutcome` / `WeekDay` / `WeeklyTheme` |
| Empty registry + validators | `src/data/weeks/index.ts` | ✅ `WEEKS: [] ` + `getWeekById` + dev-only `validateWeek` |
| Curriculum walker | `src/data/weeks/walker.ts` | ✅ `isoWeekNumber` / `getDayIndex` (Mon=0) / `getActiveWeek` / `getTodayPairing` (flag-gated, null no-op) |
| Store fields | `src/store/userStore.ts` | ✅ persisted `forcedNextWeekId` + `weeklyResult`; pure `tallyWeeklyOutcome` exported |
| Anti-exploit | `src/store/userStore.ts` | ✅ backwards-clock guard; +1/24h cap; removed stray `incrementStreak` |
| `zodiac` chip | `src/content/articles/index.ts` + `i18n/*.json` | ✅ 7th category (accent `#818CF8`, 4 locales) |

**Content map placed:** `docs/aurafy-article-content-map.md`. **Skill placed:**
`.claude/skills/aurafy-week-generator/SKILL.md`.

**2026-06-28 (pilot — economy lock + reveal · reveal loop ~90% DONE):** Simo locked the streak model and built the reveal.
- **Insurance system REMOVED** — `insuredDays`, the 5★ auto-spend, the gap/cap logic, the 48h grace:
  all deleted from `userStore` + `dev-panel`. Nothing references it anywhere.
- **Streak is now FORGIVING** — `completeDailyRitual` = +1 per ritual (once/local day); a missed day
  HOLDS the streak (never resets). Reaching 7 stages the pending `weeklyResult`; `claimWeeklyResult`
  pays the bonus and rolls the streak → 0. Backwards-clock + once-per-local-day anti-exploit kept.
- **Weekly reveal bonus +10 → +5** (`STREAK_BONUS_REWARD`; `app/weekly-result.tsx` `STREAK_BONUS`;
  i18n `weekly.bonusTitle` is `{{amount}}`-parameterized so it follows automatically).
- **Reveal screen** `app/weekly-result.tsx` — **🔄 ~90% (logic solid; visuals nearly there)**.
  Category-tinted bloom + **breathing atom-mark glow** (matches `Screenshots_new/7-DayPayoff_animationStar*`
  pulse) + **luminous outcome title** (stacked accent HALO + GLOW copies behind a crisp white CORE that
  breathe with the same twinkle — RN has no multi-pass text-shadow on one `Text`, so the glow is faked
  with layered copies; closest achievable to the screenshot's neon without Skia), +5 bonus card, share, save.
  **Remaining ~10% = small retouches to circle back to:** `Screenshots_new/7-DayPayoff.png` still shows
  **+10** in the bonus card → needs a re-export to +5 (Golden-Loop source-of-truth); plus any glow-intensity
  tuning after the device DIFF. 🔄 awaiting device DIFF.
- **Reset-to-factory** — `userStore.resetAll` re-seeds the welcome **+5 wallet row**; Settings reset
  now hard-reloads (default language + LTR) so strings/content/RTL return to defaults, not the prior
  language. (Expo Go: RTL flag fully re-applies only on a manual relaunch; prod = expo-updates.)
- **Keep-awake** — the benign dev-only Expo wake-lock rejection ("Unable to activate keep awake") is
  silenced via `LogBox.ignoreLogs` in `app/_layout.tsx` (dev-only; cannot occur in a prod build).

**FOLLOW-UP (deferred — NOT built):** **Daily reminder notification.** `expo-notifications` installed
(`~0.32.17`); the guarded, lazy-loaded **dev-panel test button** ("Send test notification",
`src/utils/notifications.ts`) **delivered on-device on the EAS dev build (Simo-verified 2026-07-04)**
— the native module is in the binary and works. Still TODO: schedule a daily local notification at
the user's `reminderTime` (the Settings `dailyReminder` / `streakReminder` toggles already exist),
permission UX, reschedule on time/locale change, cancel on toggle-off. Offline, no backend.

**Build order:** (1) rails ✅ now · (2) PILOT — Week 1 content + flip flag + day-7 reveal + route
reader through walker (device DIFF) · (3) scale weeks 2–54 · (4) result-screen polish (built last).
**Not done in this pass:** no result screen, no picker swap, no content, no screen routed through the
walker. `getDailyInsightId`/`getDailyQuestionId` untouched.

---

## 1.7 · DESIGN SYSTEM · DIALOGS — 🔄 restyled to "System Sheet", awaiting device DIFF

**2026-06-28:** brought every confirmation popup onto the new **System Sheet** language from
`Screenshots_new/Reset_all_Data.png` + `Clear_history.png` (tone icon badge over a top bloom,
optional eyebrow, serif title, **tone-gradient** primary pill, glass cancel pill).
- **`ConfirmSheet`** (bottom sheet — Settings: Reset / Clear / Restart / Export) — full restyle +
  new `icon` / `eyebrow` props. Reset = rose + `alert-triangle` + "Cannot be undone"; Clear = cyan +
  `trash-2`; Restart = rose + `refresh-cw`; Export-empty = cyan + `inbox`. Matches the 2 PNGs.
- **`AppDialog`** (centered quick-dialog — person-entry "not enough stars") — same grammar in a
  centered card (kept centered for fast info/errors). New `tone`/`icon`/`eyebrow` props; `destructive`
  back-compat → rose. The not-enough-stars use = cyan + `star`. ⚠️ **Note for Simo:** person-entry has
  **no** leave/discard dialog — its only `AppDialog` is the not-enough-stars info. If a discard dialog
  is wanted, point me to it.
- **`ThemeUnlockDialog`** (theme-gallery) — kept the gradient theme-preview hero (better than a generic
  icon here); added a **lock badge** over the hero + upgraded the cancel text-link → glass pill. Tone
  stays gold (★ cost).
- **Pickers** (`PickerSheet` / `TimeWheelSheet`) — out of scope (not confirmations), untouched.
- i18n: added `common.cannotBeUndone` (4 locales); aligned EN reset/clear messages to the PNGs.
- No PNG exists for AppDialog / ThemeUnlockDialog — extended the same language by judgment (Simo-approved).

---

## 2 · CONTENT — ✅ (with gaps)
- ✅ 7 modules in `modules.ts`; 20 questions each in `src/data/questions/*` (en/fr/ar/es).
- ✅ Results files `src/data/results/*` with insight pools (≥6 variants, ≥3 dimensions).
- ✅ Engine wiring traced: quiz → loading → scoringEngine → resultGenerator → result.
- ⚠️ `src/data/dailyQuestions.ts` — **10 / 365**. Expand before release.
- 🆕 **(2026-06-20 — see `docs/V1-REVIEW-BACKLOG.md` items 14, 16, 22):** the daily article and
  daily question are being **merged into one "daily ritual"** — `dailyInsight.ts` and
  `dailyQuestions.ts` move to a **single paired source** (one `dailyContent[]` table, or questions
  carry an `articleId`) sharing theme/dimension. This **reverses** the old "deliberately not in
  lockstep" rule — they are now deliberately **in lockstep**. Daily questions expand + pair under
  this source; the standalone `daily-reading.tsx` is absorbed into the article reader. The
  **weekly report** is generated deterministically from the 7 persisted ritual answers
  (dimension tally) and shown as a shareable card. Economy numbers: `CLAUDE.md → Stars Economy (FINAL)`.

## 3 · ENGINE — ✅
- `scoringEngine.ts`, `insightSelector.ts` (seeded), `resultGenerator.ts` — pure, working.

## 4 · INFRA / RELEASE — 🔲
- 🔲 AdMob: replace stub with `react-native-google-mobile-ads` + real IDs (`src/ads/adIds.ts` still has `REPLACE_WITH_REAL_*`).
- 🆕 **Ad strategy (FINAL 2026-06-20 — see `docs/V1-REVIEW-BACKLOG.md` items 12, 13, 25):**
  **Option C on result** — remove the pre-result ad gate from `loading.tsx`; on `result.tsx` the
  headline is free and the insight bullets + share card unlock behind **1★ or a rewarded ad**.
  **Rewarded video = +2★ flat, capped 25/day.** **Banners only on linger/scroll screens**
  (Insights / History / Stars) — never on quiz/loading/result/module/person-entry. **Interstitial**
  only at natural transitions, frequency-capped, and **never stacked with a rewarded ad in the same
  flow** (✅ 2026-07-07: the every-3rd-reading interstitial in `result.tsx` — which could stack with
  the `loading.tsx` rewarded ad — was removed; the real placement returns with the Phase-4 AdMob
  wiring). Native = the SPONSORED Insights card. Add **Google UMP** consent
  before personalized ads (EU).
- 🔲 EAS production AAB.
- 🔲 Privacy policy + Play Store listing copy (AdMob requires a privacy policy URL).
- 🔲 Icon + splash assets at all required densities.

---

## CLEANUP BACKLOG (fix opportunistically while on the relevant screen)
- ~~`onboarding.tsx`: hardcoded EN strings in `EarnCardsRow`; `iconOnTint = 'undefined'` dead var; `✨` appended to title.~~ ✅ resolved 2026-06-03 (i18n'd, gold vector sparkle, cleaned up).
- ~~`quiz.tsx`: dead/confusing `isSolo` expression.~~ ✅ gone (no `isSolo` left in the file).
- ~~`daily-reading.tsx`: `const setLastDailyQuestion = useUserStore.getState;` — unused/confused line.~~ ✅ moot — the file was deleted (ritual absorbed into the article reader).
- ~~`(tabs)/index.tsx`: hardcoded `RELATIONSHIPS`, `SELF-DISCOVERY`, `Tap`, `Today's free question is ready`.~~ ✅ resolved 2026-06-04 (all via `t()`: `home.sectionRelationships/sectionSelf`, `common.tap`, `home.dailyReady`).
- `(tabs)/stars.tsx`: emoji used as icons → vector icons + i18n. (`daily-reading.tsx` no longer exists.)
  (`loading.tsx` ✅ resolved 2026-06-13 — i18n'd; ad-gate emoji is now the per-module
  `module.icon`, an intentional Simo-confirmed design choice, not a cleanup target.)
- `app/index.tsx`: dual splash (native `app.json` splash + custom screen) + 20s debug timer → reduce to ~2s.
- `dailyQuestions.ts`: 10 → 365.
