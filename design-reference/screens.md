# Aurafy V11 — Screen Inventory

## Extraction limits

The HTML mockup is a Replit "bundler" export: visible static markup is just a splash, while the actual screen JSX lives inside an encoded `<script type="__bundler/manifest">` + `<script type="__bundler/template">` block. That payload is too compressed/escaped to parse statically — most string literals, layout dimensions, and per-component structure could not be extracted without rendering the page in a browser.

What follows is the **structural skeleton** that *is* recoverable from string literals leaking through the bundle, plus the design-token grouping logic from `tokens.md`.

## Top-level sections (mockup organization)

The HTML mockup organizes screens into 5 labeled sections — these match the SVG/section titles found in the static markup:

1. **Onboarding & Home**
2. **Reading Flow**
3. **Results & Stars**
4. **Shareable Result Cards**
5. **System & Settings**

## Identified screen / component names

PascalCase identifiers found in the bundle that map to screens or modal components:

| Mockup name | Likely app target | Notes |
|---|---|---|
| `SplashScreen` | (currently splash logic in `_layout.tsx`) | aurora radial gradient + serif "aurafy" wordmark |
| `LoadingScreen` | `app/loading.tsx` | constellation/orbit animation visible in static SVG fallback |
| `AdGateScreen` | (no current screen — appears between flows for rewarded ad) | gates a free reading behind a watch-ad CTA |
| `UnlockModal` | (no current modal) | shown when a locked module is tapped; offers stars-spend or ad-watch |
| `StarsWallet` | `app/(tabs)/stars.tsx` | currency balance + transaction list |
| `HistoryScreen` | `app/(tabs)/history.tsx` | past readings list |
| `SettingsScreen` | `app/(tabs)/settings.tsx` | preferences + app-info |

Other screens in the app source (`onboarding`, `home tab`, `module detail`, `person-entry`, `quiz`, `result`, `daily-reading`, `reading-mode`, `theme-gallery`, `+not-found`) are not surfaced as named components in extractable strings — their JSX is buried in the bundle. Layout audit for these requires rendering the HTML.

## What we know structurally per category (from token usage + section names)

These are **inferred** patterns from how the design tokens are shaped, not directly observed structures:

### Cards / glass surfaces
- 20px radius
- `rgba(255,255,255,0.05)` fill, `rgba(255,255,255,0.08)` border (or `0.14` for emphasis)
- `backdrop-filter: blur(20px)`
- Shadowed with the cosmic/desert colored glow when active or "primary" surface

### Buttons / pills
- 999px radius
- Primary: linear gradient (cosmic 135° or desert 135°)
- Top inner highlight: `inset 0 1px 0 rgba(255,255,255,0.25)`
- Outer glow: `0 8px 32px rgba(theme-primary,0.35)`

### Tab bar
- Glass surface with `--border-strong` top border
- Likely 4 tabs (matches app: Home, Stars, History, Settings)
- Feather-style icons

### Currency (stars) styling
- Amber gold `#F5C542` with `0 0 16px rgba(245,197,66,0.25)` glow
- Probably a serif numeric on the wallet balance

### Aurora / hero background
- Single radial gradient halo: `#A78BFA → #5B6FE8 → #05060F` at 50%/55%/100% stops
- Used on splash, possibly home greeting, possibly result hero

### Device frame (only for mockup chrome — not app)
- 44px outer radius, dark inner bezel rings (`#1a1d2e` then `#2a2d40`)
- Skip when implementing in RN — phone uses the actual device frame.

## Recommended next step

Render the HTML in a browser headlessly (or have the user screenshot each section) so we can do a proper per-screen audit of layout, copy, hierarchy, and animation. Until then, the audit can only verify the app uses the right **design system tokens** (colors, fonts, gradients, radii, shadows) — not whether each screen's *layout* matches the mockup.
