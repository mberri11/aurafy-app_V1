# CLAUDE.md

Guidance for Claude Code on the Aurafy project.

## Commands

Package manager: **pnpm**

- `pnpm start` — Expo dev server offline mode (`EXPO_OFFLINE=true`)
- `pnpm start:online` — Expo dev server with network
- `pnpm android` — start on Android (offline by default)
- `pnpm typecheck` — `tsc --noEmit` (only static gate — no ESLint, no Prettier)

**NEVER use `npm` or `npx` — always `pnpm` and `pnpm exec`.** Mixing managers (e.g. `npx expo install`) rewrites `package.json` with versions from a different SDK and corrupts the lockfile, leading to errors like `withPodfile is not a function`. For Expo CLI commands use `pnpm exec expo <cmd>` (or `pnpm dlx` only when the package is not a project dep).

Native builds via EAS (`eas.json`). Android package: `com.simobr.aurafy`.

---

## Behavior Rules (READ EVERY SESSION)

**Context:** At the start of every session, read this entire file + check the PHASES table below to know what's done and what's next. Never assume — verify state from the file.

**Scope:** Do not touch files outside the task unless directly required. If a related file needs changing, do it and mention it — no silent refactoring of unrelated things.

**On task completion:** Give a conceptual summary of what changed, suggest the logical next step, then STOP and wait for approval. If more than 3 files were touched, list every file. Never auto-proceed.

**On unexpected errors:** Hard stop. Flag the error clearly, explain what happened, wait for instruction. No creative workarounds without approval.

**Web preview:** Never run `expo export` or any static web server. Testing is exclusively on physical Android via Expo Go. Web renders are not valid verification.

**TypeScript:** Run `pnpm typecheck` only after changes to `src/types/`, `src/store/`, or `src/engine/`. Not needed for pure UI/style changes.

**Design reference:** All UI work must match `design-reference/screenshots/` and use tokens from `design-reference/tokens.md`. Always pull colors/spacing/fonts from `useTheme()` or the token file — never hardcode.

**Pixel-perfect mandate:** Every screen MUST match the design reference screenshots EXACTLY — same text, same fonts, same font weights, same dimensions, same icons, same spacing, same colors, same layout. If matching the design requires editing other files (importing fonts, installing packages, updating i18n strings, modifying shared components, adding assets), DO IT without asking. There are no "out of scope" files during UI work — whatever it takes to match the design is in scope. Never say "out of scope" or "would need to" — just do it. If the design shows bold text, load the bold font. If the design shows a specific icon, install the icon library. If the design shows specific copy, update the i18n file. Zero compromises on visual accuracy.

---

## Architecture

Expo Router (file-based routing), Expo SDK 54, React 19, RN 0.81, New Architecture + React Compiler enabled, `typedRoutes` on. Path alias `@/*` → repo root.

### Routing (`app/`)
Stack in `app/_layout.tsx`. Flow:
`index → onboarding → (tabs) → module/[id] → reading-mode → person-entry → quiz → loading → result`

Tabs: `index` (home), `history`, `stars`, `settings`.

Layout tree: `SafeAreaProvider → ThemeProvider → AurafyErrorBoundary → GestureHandlerRootView`

### Domain model (`src/types/index.ts`)
- **`multi`** — user enters 2–N persons; questions answered by picking a person; highest scorer = winner
- **`solo`** — single user; 4 soloAnswers per question scored {-2,-1,+1,+2}; total → verdict `positive | neutral | negative`

`ReadingMode`: `solo | compare | triangle | circle` — controls participant count and stars cost.

All content copy = `LocalizedString { en, fr, ar, es }`. Static UI strings = `src/i18n/*.json` via `react-i18next`.

### Engine (`src/engine/`) — pure, no side effects
1. `scoringEngine.ts` — produces `ResultData` (scores, `dominantDimension`, `confidence` 60–95, `winner` or `verdict`)
2. `insightSelector.ts` — deterministic insight selection from dimension pool
3. `resultGenerator.ts` — composes scoring output with module results content

Adding a module: `src/data/modules.ts` + `src/data/questions/name.ts` + `src/data/results/nameResults.ts`. Keep filenames parallel.

### State (`src/store/`, Zustand)
- `userStore.ts` — **persisted** (AsyncStorage `aurafy-user`). Stars [0–50], history cap 20, transactions cap 5. Daily bonus 24h cooldown, streak resets after 48h gap.
- `readingStore.ts` — **transient** session state. Reset between readings.
- `settingsStore.ts` — theme + language preferences.

### Theming (`src/themes/`)
`useTheme()` exposes `ThemeColors`. All components use `useTheme()` — never hardcode colors. Two themes: `cosmic`, `desertOracle`. Background `#07091A` hardcoded in `app.json` for splash — keep in sync if changed.

### Ads (`src/ads/`)
`AdMobManager` is a **stub**. Do not touch during UI phase.

### Fonts
- **Fraunces** — all headings, titles, result verdicts
- **Inter** — all body text, labels, captions

Loaded in `app/_layout.tsx`. Splash held until fonts resolve.

### Animations
Reanimated 4 + `react-native-worklets`. All animations on UI thread. No deprecated `Animated` API.

---

## UI Standards

- Icons: `@expo/vector-icons` Feather or MaterialCommunityIcons — no emoji as icons
- StarsBadge: filled gold ★ with subtle glow — not ✨ emoji
- GlassCard: BlurView with strong intensity, works on Android
- GradientButton outline variant: neutral glass pill with subtle border (not gradient ring)
- Module accent colors: verify against `design-reference/tokens.md`

---

## Phases & Progress

### PHASE 1 — UI Match (IN PROGRESS)
Match every screen to `design-reference/screenshots/` exactly.

| Screen | Status | Notes |
|---|---|---|
| Splash (index.tsx) | ✅ done | Diagonal aurora gradient + wordmark sized to 48 / spacing 0. Verified on device. |
| Onboarding | 🔄 in progress | Pixel-perfect pass: Fraunces_700Bold titles, hero vertically centered in top half, solid filled dark plate behind star, ✨ on slide-2 title, gradient pagination pill, filled-circle icon backgrounds on earn cards, en/fr/ar/es subtitles updated. Pending device verification. |
| Home tab (module list) | 🔲 todo | |
| Person entry | 🔲 todo | |
| Quiz screen | 🔲 todo | |
| Loading/transition | 🔲 todo | |
| Result screen | 🔲 todo | |
| Stars/wallet | 🔲 todo | |
| History | 🔲 todo | |
| Settings | 🔲 todo | |
| Theme gallery + UnlockModal | 🔲 todo | UnlockModal = real component, not Alert.alert |

**Update this table as work completes. ✅ = done, 🔄 = in progress.**

### PHASE 2 — Content (PENDING)
Complete all 7 modules to 20 questions each + full results.ts. Modules: `who_loves_me`, `who_hates_me`, `who_jealous`, `who_cut_off`, `energy_reading`, `attachment_style`, `am_i_problem`.

### PHASE 3 — Performance (PENDING)
React.memo on list items, useMemo on expensive renders, useCallback on prop-passed handlers, UI-thread animation audit.

### PHASE 4 — AdMob Hardening (PENDING)
Real ad IDs, error handling, offline safety, persisted interstitial counter.

### PHASE 5 — EAS Build + Play Store (PENDING)
Production AAB, Play Store listing copy, privacy policy.
