# Aurafy — Result Experience DESIGN SPEC (handoff to Claude Code)

> Pairs with the **13 screenshots** in the reference folder. The screenshots are the visual target; this doc is the exact values + the rules Claude Code can't read off a picture. **This is a category-keyed SYSTEM, not 13 one-off screens** — implement the theming once and drive every screen from the reading's category.

---

## 0. The theming system (the spine — read first)

Every reading has a `category`. Each category defines an accent + motif. The result screen, history card, loading screen, and share card all pull their palette/motif from the reading's category. Claude Design rendered **Love, Energy, Aura** as examples — you must **extrapolate the same system to ALL categories** using this table (do NOT leave the others gray):

| Category | Accent (primary / soft) | Motif |
|---|---|---|
| `love` | `#F472B6` / `#F9A8D0` | crystal ball, warm bloom |
| `energy` | `#34D399` / `#6EE7BF` | sparkle-burst |
| `attachment` | `#22D3EE` / `#67E8F9` | interlinked orbits |
| `aura` | `#A78BFA` / `#C4B5FD` | halo / color-wheel |
| `self` | `#FBBF24` / `#FCD34D` | mirror |
| `jealousy` | `#FB7185` / `#FDA4AF` | thorn / scissors |
| `zodiac` (V1.4) | `#818CF8` / `#A5B4FC` | constellation |

The **atom mark** (cyan+magenta crossing ellipses, bright core) stays the constant brand anchor on every screen; the category motif is the secondary accent. Background base: `#0c0810` → category-tinted radial gradient bloom behind the focal element.

## 1. Typography (ADOPT new body font)

- **Display / headings:** Playfair Display (already in app). Weights seen: 700–900. Reveal names use ~34–40px 700; share-card reveals 90–130px 900.
- **Body / UI:** **Hanken Grotesk** — NEW, adopt it. Add font files + `expo-font` config, load at startup. Weights used: 600 (labels), 700 (buttons/emphasis), 900 (share CTAs). Eyebrows: 700, `letter-spacing:.2–.28em`, uppercase, category accent.
- Map any remaining system-sans usages to Hanken Grotesk.

## 2. Reading Result screen (per-category)

Anatomy (keep, theme by category): eyebrow (module subtitle, caps, accent) → reveal name (Playfair, **accent glow** via `text-shadow`) → verdict line → **confidence card** (bar filled in accent) → "What this means" card (3 bullets, ✦ markers in accent) → disclaimer ("Aurafy is for self-reflection and entertainment — not a clinical diagnostic tool.") → actions: **Share this reading** (gradient, → share card) · **Try another** · **Save & exit**. A faint **category motif** sits behind/around the reveal so each category reads as a different screen.

## 3. Confidence line rule (IMPORTANT — replaces the fake "tonight" data)

The line "Higher than X% of readings **tonight**" implies cross-user data the offline app doesn't have. Replace with a history-derived, honest version:

- **Cold start — fewer than 5 readings in local history:** show ONLY `We're {confidence}% confident in this reading.` (no comparison line), optionally a neutral qualitative tag like "A clear, strong read." NO data implication.
- **Warm — 5+ readings in history:** compute this reading's confidence percentile against the user's OWN past reading confidences, and show `Higher than {percentile}% of your readings.` — note **"your readings"**, never "tonight". Truthful, offline-computable, and gets more personal with engagement.
- `confidence` itself = the existing margin-based formula (Phase B). The percentile is a separate derived stat from `history`.

## 4. Ad-gate ("lifting the veil")

Bottom sheet over a dimmed result with the category motif glowing faintly through. Eyebrow "One veil left to lift" → "Your reading is ready" (accent) → "Watch a short video to unlock your full result — or spend a star and we'll lift it for you." → primary **Watch Now** (gradient) + secondary **Skip the wait** showing the **1 ✦** cost. Must read as a fair trade (Option C: watch ad OR spend 1★), not a wall. Preserve the star price visibly.

## 5. Loading screen (themed + the animation Simo flagged)

Themed per category (glow + dots in the accent). The animation (see the loading screenshots) has THREE moving parts — implement all in Reanimated 4 (+ react-native-svg for the atom):

1. **Orbiting node:** 6 nodes on a regular hexagon connected by thin low-opacity accent lines; one "active" node is brighter/larger with a glow, and the active state **travels around the hexagon on a loop** (sequenced across the 6 nodes, ~0.35–0.45s each, or a smooth interpolated orbit).
2. **Rotating atom:** the center atom (crossing ellipses) **rotates continuously** (slow, ~360° over 6–8s) with the core **pulsing** (scale 1↔1.15, opacity breathe). This is the detail Simo specifically wants — the logo itself moves, not just the dots.
3. **Glow pulse:** radial-gradient bloom behind everything, gently pulsing in the accent.

Plus **rotating copy** below, a per-category pool of ~3 lines cycling (fade ~1.5–2s each):
- Love: "Reading the warmth…", "Tracing who stays…", "Naming the quiet love…"
- Energy: "Reading the energy…", "Decoding patterns…", "Sensing the frequency…"
- (Author a 3-line pool per category in the same spirit.)

This is **not hard** in Reanimated: `useSharedValue` + `withRepeat`/`withTiming`/`withSequence`; rotate transform on the atom; orbit via interpolated angle or sequenced node opacity.

## 6. Weekly Result reveal (new — the 7-day payoff)

Full-screen ceremony, bigger than the daily "Star earned" card. Eyebrow "Your week revealed" → big Playfair outcome reveal (accent glow, e.g. "The Anchor Seeker") → short personalized reading body → **+10 ✦ streak bonus** as an earned celebration (tasteful, no cheap confetti) → **Share my week** (→ weekly share card) → onward. Themed by the week's category. Saved to History as a distinct weekly entry.

## 7. History ("Your Readings")

- **Empty:** atom mark + "Your readings will live here" + gradient "Start a reading" CTA.
- **Populated:** each card themed by its reading's category (accent + motif icon) — Love card feels pink/crystal, Energy feels green/sparkle; show module icon, result name, confidence, Solo/Multi tag, date; tap → re-open full result.
- **Weekly entries:** distinct treatment ("Weekly reading" eyebrow + 7-day badge) so they stand out.
- **Banner ad slot:** styled placeholder at the bottom, online-only.

## 8. System sheets (Clear history / Reset all data)

Bottom sheets, Playfair title + supporting line + small icon. **Clear reading history** = neutral/cyan primary + Cancel. **Reset all data** = crimson danger (`#FB7185`), eyebrow "Cannot be undone", "Reset everything" primary + Cancel.

## 9. Share cards (exportable images, 1080×1920)

Generated as a **real image via an off-screen render target** (e.g. `react-native-view-shot` capturing a hidden themed component) — NOT a screenshot of the live screen. Two variants:
- **Reading:** eyebrow + reveal name (huge Playfair, accent glow) + shareLine + atom mark/"Aurafy"/`@aurafy.app` + "Discover yours →".
- **Weekly:** "My week revealed" + outcome (e.g. "The Anchor Seeker") + week shareLine + brand + "Start your week →".
- Centered composition so a 1:1 crop still reads. No confidence bar / bullets / buttons.

---

## Handoff checklist for Claude Code
- [ ] Implement category theming as ONE system; extrapolate to all 7 categories from the table.
- [ ] Adopt Hanken Grotesk (body) + keep Playfair (display).
- [ ] Confidence line: cold-start fallback + 5-reading percentile-from-history, drop "tonight".
- [ ] Loading: orbiting node + rotating atom + glow pulse + rotating per-category copy (Reanimated).
- [ ] Ad-gate keeps the visible 1★ skip (Option C).
- [ ] Share cards are off-screen render targets, both variants.
- [ ] Golden Loop: device screenshot per screen group before LOCK.
