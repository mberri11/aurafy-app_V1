AURAFY — C-10 FOUNDATION (rails only; result built later, per Golden Loop)

I'm attaching two docs: the C-10 ARCHITECTURE BRIEF and the MASTER ARTICLE CONTENT MAP. Read both fully before doing anything. This task lays SAFE, NON-BREAKING foundation for the weekly curriculum + result system. You are NOT building the result screen and NOT swapping the live daily pickers in this task — those wait until Week 1 content lands and I greenlight the pilot. Everything here must keep the current app behavior identical (flag-gated) and typecheck clean (the 2 known reading-mode errors excepted).

⚠️ FRONT-LOADED WARNINGS
- Do NOT remove or rewire `getDailyInsightId` / `getDailyQuestionId` yet. Add the new walker ALONGSIDE them, behind a feature flag that defaults to OFF.
- Do NOT build any per-day result/reading. The ONLY result in this system is the day-7 weekly result, and it is NOT built in this task.
- Do NOT generate article/question content. Content comes from me via the week-generator skill. Use an EMPTY `WEEKS: WeeklyTheme[] = []` for now.
- Pure types, scaffolds, and one feature flag. No screen/UI changes.

TASK 1 — Project bible
- Paste the C-10 ARCHITECTURE BRIEF into `CLAUDE.md` under a new "C-10 — Weekly Curriculum & Result System" section.
- Add a `BUILD-STATUS.md` entry: C-10 = SCAFFOLD STARTED (rails only, flag OFF), with the build order from the brief.

TASK 2 — Types + empty registry
- New file `src/data/weeks/types.ts` exporting EXACTLY the brief's shapes: `WeekOutcome`, `WeekDay`, `WeeklyTheme` (7 days, 4 outcomes, `answerOutcomes: Record<string,string[]>`).
- New file `src/data/weeks/index.ts` exporting `export const WEEKS: WeeklyTheme[] = [];` plus helpers `getWeekById(id)` and a dev-only `validateWeek(w)` that asserts 7 days / 4 outcomes / all `answerOutcomes` keys valid / every outcome reachable (used later when content lands).

TASK 3 — Walker (behind a flag, OFF by default)
- New file `src/data/weeks/walker.ts`: `isoWeekNumber(date)`, `getDayIndex(date)` (Monday=0 via `(getDay()+6)%7` — keep this single definition), `getActiveWeekIndex(date)` = `isoWeekNumber % WEEKS.length`, `getActiveWeek(date)`, `getTodayPairing(date): WeekDay`.
- Add a feature flag `WEEKLY_CURRICULUM_ENABLED` (default `false`) in the app's config/flags module. While OFF, all existing daily-pick behavior is untouched. Guard the walker so it no-ops safely when `WEEKS` is empty (return null/undefined; callers fall back to current pickers).
- Do NOT yet route the article reader / Home / Insights through the walker. Just make it importable and unit-safe.

TASK 4 — Store scaffolding (no behavior change yet)
In `src/store/userStore.ts`:
- Add persisted `forcedNextWeekId: string | null` (default `null`).
- Add persisted `weeklyResult: { weekId:string; outcomeKey:string; claimedAt:number } | null` (default `null`).
- Add a PURE helper `tallyWeeklyOutcome(answers: {dimension:string}[], outcomes: {key:string}[]): string` that counts outcome keys over the last 7 answers and returns the winning key (tiebreak = order in `outcomes`). Export it; do not call it from the live flow yet.
- Do NOT change `completeDailyRitual` / `claimDailyReward` reward logic in this task. (The day-7 gating + atomic rollover happen in the pilot task.)

TASK 5 — Anti-exploit hardening (safe to ship now)
In the daily-claim path:
- Add backwards-clock detection: if `now < lastDailyClaim`, return 0 / award nothing / do not advance streak.
- Ensure streak can advance by at most +1 per ~20–24h window; never multiple days from one call/reload.
- Audit and remove any path where streak increments outside `completeDailyRitual`/`claimDailyReward` (e.g. a stray `streak: s.streak + 1`) so a terminal reload or screen mount alone cannot increment it.
- Comment-tag as a known V1 limitation (full fix = server time, V3).

TASK 6 — Feed chip
- Add `'zodiac'` to `ArticleCategory` and as the 7th feed filter chip (with its `CATEGORY_COLORS` accent + i18n label key `insights.categories.zodiac`). Do NOT add Communication/Healing/Social chips — those articles will carry existing chip categories. Keep the chip set at 7.

REPORT (Golden Loop — stop after, no LOCK)
1. Files created/touched per task.
2. Confirm: app behavior unchanged with the flag OFF, walker no-ops on empty `WEEKS`, typecheck clean (minus the 2 known errors).
3. Any place the brief's shape conflicted with existing code, and how you resolved it.
Then stop. Next session I'll deliver Week 1 content (authored via the week-generator skill) and a separate PILOT prompt that flips the flag, wires the day-7 result reveal + strict sequencing (reveal → +10 → reset → advance), and routes the article reader through the walker — for device DIFF.

Constraints: pnpm only. Existing theme tokens / rs() / Playfair canonical. Reuse existing components; this is scaffolding, not a rebuild.
