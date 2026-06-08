# Aurafy — Screen-Match Playbook

How to drive Claude Code so every screen actually matches the design. Copy the commands
verbatim. Replace `<SCREEN>`, `<file>`, `<png>` each time.

---

## Why this works (the one idea)

Claude Code can read your code and the design PNG, but it **cannot see your phone**. The
only way it knows whether its output matches is if **you** paste a device screenshot back.
That single step — your screenshot re-entering the loop — is what was missing. Everything
here is built around it.

**Rule for you:** after every IMPLEMENT or DIFF stage, reload on the device and send a
screenshot. Full screen, straight from the phone (the WhatsApp-to-self trick is fine).
Don't describe it in words — paste the image.

---

## The Golden Loop — 4 commands per screen

### ▶ Command 1 — SPEC
```
Read CLAUDE.md and docs/BUILD-STATUS.md. We are working on the <SCREEN> screen.

Do NOT write any code yet.

1. view design-reference/screenshots/<png>.
2. Write a full element-by-element spec of that screenshot, top to bottom. For every
   element give: exact text (verbatim), font family + weight + px, color mapped to a
   theme token name, spacing/margins/padding, width/height, alignment, and any
   icon/gradient/glow. If a size isn't labeled, estimate from proportion and mark it (est).
3. view app/<file> and list every difference between the spec and the current code.

Then STOP and wait for my approval.
```

### ▶ Command 2 — IMPLEMENT
```
Spec approved. Implement it in app/<file>.

Match fonts, weights, sizes, colors (from useTheme()/tokens.md — never hardcode), spacing
and layout exactly. If matching needs a shared component edit, a font, an i18n string, or
an asset, do it — nothing is out of scope. Replace any hardcoded user-facing string with
an i18n key (en/fr/ar/es). Run pnpm typecheck only if you touched src/types, src/store, or
src/engine.

Then STOP and tell me to screenshot. Do NOT say it matches — I will verify.
```

### ▶ Command 3 — DIFF (repeat until you say it matches)
*(attach the device screenshot in the same message)*
```
Here is the current render on my device (attached). Compare it side by side with
design-reference/screenshots/<png>, both in front of you now.

List every remaining visual difference as bullets — be picky: font weight, exact color
shade, letter-spacing, glow radius, 1–2px spacing, icon vs emoji all count. Then fix each
one in app/<file>.

STOP and ask me for another screenshot.
```

### ▶ Command 4 — LOCK
```
It matches now. Do Stage 4:
- Update docs/BUILD-STATUS.md: set <SCREEN> to ✅ with a one-line note of what changed and
  today's date.
- Update the status column for this screen in design-reference/screen-map.md.
Then STOP.
```

---

## Build order (do not jump around)

**Phase 0 — Foundation (run these first, before any screen loop):**

**0a — Fonts**
```
Read CLAUDE.md (FONTS section). Install Playfair Display and make it the heading font.

1. pnpm add @expo-google-fonts/playfair-display
2. In app/_layout.tsx import PlayfairDisplay_400Regular, PlayfairDisplay_600SemiBold,
   PlayfairDisplay_700Bold and add them to the useFonts() map next to the Inter fonts.
3. Find every usage of 'Fraunces_400Regular', 'Fraunces_600SemiBold', 'Fraunces_700Bold'
   across the whole repo and replace with the matching PlayfairDisplay_* weight.
4. Remove the @expo-google-fonts/fraunces import from _layout.tsx (leave the dep in
   package.json for now).
5. Run pnpm typecheck.

List every file you changed, then STOP. I'll reload and screenshot the splash to confirm
the wordmark changed.
```

**0b — Shared component audit** (one component per loop — same SPEC/IMPLEMENT/DIFF idea):
```
Read CLAUDE.md and docs/BUILD-STATUS.md. Audit the <Component> shared component
(src/components/<Component>.tsx) against design-reference/tokens.md and how it appears in
the screenshots that use it.

Do NOT write code yet. List every value (radius, colors, borders, blur, shadow/glow,
padding, font) that differs from tokens.md. Then STOP for approval.
```
Order: `GlassCard` → `GradientButton` → `StarsBadge` → `ModuleCard` → `ProgressBar`.

**0c — Splash logo + timer** (needs your decision first — see "Decisions" below).

**Phase 1 — Screens, in flow order** (each via the 4-command loop):
1. `splash` → `app/index.tsx` → `splash.png`
2. `onboarding` → `app/onboarding.tsx` → `onboarding-1.png`, `onboarding-2.png`
3. `home` → `app/(tabs)/index.tsx` → `home.png`
4. `module detail` → `app/module/[id].tsx` → `module-detail.png`
5. `reading mode` → `app/reading-mode.tsx` → `reading-mode.png`
6. `person entry` → `app/person-entry.tsx` → `person-entry.png`
7. `quiz` → `app/quiz.tsx` → `quiz-multi.png`, `quiz-solo.png`
8. `loading` → `app/loading.tsx` → `loading.png`
9. `result` → `app/result.tsx` → `result-multi.png`, `result-solo.png`
10. `stars` → `app/(tabs)/stars.tsx` → `stars.png`
11. `history` → `app/(tabs)/history.tsx` → `history.png`
12. `settings` → `app/(tabs)/settings.tsx` → `settings.png`
13. `theme gallery` → `app/theme-gallery.tsx` → `theme-gallery.png`
14. `daily` → `app/daily-reading.tsx` → `daily.png`

**Phases 2→5:** content gap (365 daily Qs), performance, AdMob, EAS/Play Store.

---

## Per-screen "watch for" (paste into the SPEC command if useful)

- **onboarding** — two PNGs (one per slide). Kill the hardcoded English in EarnCardsRow and
  the `iconOnTint='undefined'` line; confirm whether slide-2 title really has `✨`.
- **home** — i18n the section labels + "Tap" + banner subtitle. ModuleCard look comes from
  the 0b audit.
- **quiz** — clean the `isSolo` expression; confirm framework tag = localized label or raw.
- **stars / loading / daily / module-detail / reading-mode** — heavy emoji usage; replace
  with Feather/MaterialCommunityIcons unless the PNG clearly shows an emoji.
- **theme-gallery** — build a real `UnlockModal` component (not `Alert.alert`).
- **result** — most complex; expect 2–4 DIFF rounds.

---

## Decisions only you can make (answer once, tell Claude Code)

1. **Logo** — your built logo (clean ring + core) ≠ the logo in `splash.png` (atom + glow +
   orbit dots). Which is final?
   - If the **clean** one is final → re-export `splash.png` (and any other logo PNGs) from
     your current design so the references match the app.
   - If the **atom** one is final → tell Claude Code to rebuild `AurafyLogo.tsx` to match
     `splash.png` (magenta glowing core, orbit dots, no hard ring).
2. **Fonts** — confirmed Playfair Display (recommended). Say so and run 0a.
3. **`who_hates_me` label** — module id says "hates", UI copy says "Resents". Keep
   "Resents"? (cosmetic, your call.)

---

## House rules that keep Claude Code on rails
- One stage per message. It must STOP at every STOP.
- It may NEVER say "this matches the design" — only you confirm, after a screenshot.
- If it starts editing files unrelated to the current screen → stop it, point back here.
- If it can't see a screenshot you "sent" → you forgot to attach the image; re-send.
- Keep `BUILD-STATUS.md` updated at every LOCK so a fresh session always knows the state.
