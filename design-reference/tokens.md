# Aurafy V11 — Design Tokens

Extracted from `/home/mberri/Music/Aurafy V11 _standalone_.html` (Replit-bundled hi-fi mockup). The HTML's static `<style>` blocks expose the full design system. Per-screen layouts are inside an encoded `__bundler` script and could not be statically read — see `screens.md` for what is and isn't extractable.

## Themes

The mockup defines two parallel themes that override the same CSS variables:

### Cosmic (default / primary theme)

| Token | Value |
|---|---|
| `--bg` | `#07091A` |
| `--bg-2` | `#0B0E25` |
| `--purple` | `#A78BFA` |
| `--indigo` | `#5B6FE8` |
| `--teal` | `#2FEAAC` |

### Desert Oracle (alt theme)

| Token | Value |
|---|---|
| `--bg` | `#120A04` |
| `--bg-2` | `#1A0E06` |
| `--purple` (accent 1) | `#E8A04A` |
| `--indigo` (accent 2) | `#C73E1D` |
| `--teal` (accent 3) | `#8B1A0A` |

## Shared tokens (both themes)

| Token | Value |
|---|---|
| `--text` | `#FFFFFF` |
| `--text-muted` | `#A0A4B8` |
| `--text-dim` | `#6E7290` |
| `--gold` | `#F5C542` |
| `--rose` | `#E84393` |
| `--amber` | `#F59E5C` |
| `--crimson` | `#B23A3A` |
| `--glass` | `rgba(255,255,255,0.05)` |
| `--glass-strong` | `rgba(255,255,255,0.08)` |
| `--border` | `rgba(255,255,255,0.08)` |
| `--border-strong` | `rgba(255,255,255,0.14)` |

App-shell background (outside any theme): `#05060F`.

## Fonts

| CSS var | Stack |
|---|---|
| `--sans` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` |
| `--serif` | `'Playfair Display', Georgia, serif` |

**Important:** the design uses **Playfair Display**, not Fraunces. The current app has Fraunces installed instead. Either swap to Playfair Display or accept Fraunces as an intentional substitution (similar serif feel, but distinct visual character).

Arabic text uses `'Noto Naskh Arabic'`.

### Font weights in use
`300, 400, 500, 600, 700, 800`

### Font sizes seen in static CSS
`10, 11, 13, 13.5, 14, 15, 16, 20px`
(Larger display sizes for screen titles live inline in JSX inside the bundle — assume 24, 28, 32, 36, 44, 64 are still in play based on app code, but unverified.)

### Letter spacing
`-0.01em` (display), `0.01em` (body), `0.12em` (small caps / labels)

## Gradients

### Linear

| Use | Value |
|---|---|
| Cosmic primary (135°) | `linear-gradient(135deg, #A78BFA 0%, #5B6FE8 50%, #2FEAAC 100%)` |
| Desert primary (135°) | `linear-gradient(135deg, #E8A04A 0%, #C73E1D 50%, #8B1A0A 100%)` |
| Accent line / progress | `linear-gradient(90deg, #A78BFA, #2FEAAC)` |
| Accent line full | `linear-gradient(90deg, #A78BFA, #5B6FE8, #2FEAAC)` |
| Bottom-fade overlay | `linear-gradient(to top, rgba(7,9,26,0.95), transparent)` |

### Radial (used for glow halos, one per accent color)

```
radial-gradient(circle, #A78BFA 0%, transparent 70%)
radial-gradient(circle, #5B6FE8 0%, transparent 70%)
radial-gradient(circle, #2FEAAC 0%, transparent 70%)
radial-gradient(circle, #E8A04A 0%, transparent 70%)
radial-gradient(circle, #C73E1D 0%, transparent 70%)
radial-gradient(circle, #F5C542 0%, transparent 70%)
radial-gradient(circle, #E84393 0%, transparent 70%)
```

## Border radius

| Use | px |
|---|---|
| Pills / full-rounded buttons | `999` |
| Phone bezel / device frame | `44` |
| Cards / glass surfaces | `20` |
| Preview / medium cards | `12` |
| Inputs / mid badges | `8` |
| Modal corners | `6` |
| Small chips / dots | `4` |
| Avatars / circles | `50%` |

## Shadows

```
/* glass card glow (cosmic) */
0 8px 32px rgba(167,139,250,0.35), inset 0 1px 0 rgba(255,255,255,0.25)

/* glass card glow (desert) */
0 8px 32px rgba(232,160,74,0.35), inset 0 1px 0 rgba(255,255,255,0.25)

/* gold / currency glow */
0 0 16px rgba(245,197,66,0.25)

/* device drop shadow + inner bezel */
0 30px 80px rgba(0,0,0,0.5), 0 0 0 8px #1a1d2e, 0 0 0 9px #2a2d40
```

## Backdrop / blur

`backdrop-filter: blur(20px)` (default glass)
`backdrop-filter: blur(24px)` (stronger glass / overlays)

## Spacing (padding values seen)

`5, 6, 8, 10, 12, 14, 16, 28px`

The horizontal screen padding pattern is `0 28px` for outer gutter.

## Misc

- SVG strokes: `stroke-width="3"` (matches existing `ConstellationLoader` thickness).
- Auras / glows around stars badge: `box-shadow: 0 0 16px rgba(245,197,66,0.25)`.
- Subtle grays for system chrome: `#999`, `#666`, `#2a2d40`.
- Error toast color: `#ff8a80` on `#2a1215` background, border `#5c2b2e` (dev-only, ignore for app UI).
