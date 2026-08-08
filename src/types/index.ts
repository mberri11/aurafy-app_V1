export type Language = 'en' | 'fr' | 'ar' | 'es';
export type ReadingMode = 'solo' | 'compare' | 'triangle' | 'circle';
export type Framework = 'attachment' | 'loveLanguages' | 'sociometry' | 'colorWheel' | 'intuition' | 'mixed';
export type ModuleType = 'multi' | 'solo';
/**
 * How a module's result is scored + rendered. Lets the engine + result screen branch on
 * intent rather than just `type`:
 * - `multi`       — pick-a-person, highest scorer wins (who_loves_me…).
 * - `valence`     — solo ±score total → positive/neutral/negative (am_i_problem).
 * - `count`       — solo "N of 20 signs present" (a relationship module read solo).
 * - `categorical` — solo, answers tagged to categories; winning category + a secondary
 *                   "edge" (attachment_style, aura_reading).
 */
export type ResultKind = 'valence' | 'count' | 'categorical' | 'multi';
export type ThemeId = 'cosmic' | 'desertOracle' | 'elvenGrove';

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
  es: string;
}

export interface SoloAnswer {
  label: LocalizedString;
  score: number; // -2 | -1 | 1 | 2 (valence/count modules)
  /** For `categorical` modules: the category this answer points to (e.g. 'secure',
   *  'anxious', or an aura colour like 'red'). Ignored by valence/count scoring. */
  category?: string;
  /** Optional weight for a categorical answer's contribution (defaults to 1). */
  weight?: number;
}

export interface Question {
  id: string;
  text: LocalizedString;
  /**
   * Statement form of a multi question for solo mode ("{name} cools a tense
   * moment just by being there."), answered with the generic frequency scale.
   * `{name}` is replaced with the person's name. Falls back to `text` when absent.
   */
  soloText?: LocalizedString;
  framework: Framework;
  dimension: string;
  personWeight?: number; // for multi-person questions, default 1
  soloAnswers?: SoloAnswer[]; // for solo questions, always exactly 4 options
  /** Pool-expanded modules only (see src/engine/questionPool.ts): `true` marks the
   *  curated original 20 served in authored order on a module's FIRST reading;
   *  `false` marks a pool counterpart eligible for repeat readings. Absent on
   *  modules that don't use pooling (their full array is always served as-is). */
  core?: boolean;
  /**
   * Which pole the question samples — `red` asks about a harmful behaviour,
   * `green` about a present, positive one. OPTIONAL and currently carried ONLY
   * by red_green_flag, whose pool is polarity-balanced instead of
   * variance-paired (see questionPool.ts → selectPolarityBalanced). The other
   * 12 pooled modules omit it entirely and are unaffected.
   *
   * Drives signed scoring in scoreMulti (`green` → +1, `red` → −1).
   */
  polarity?: 'red' | 'green';
}

export interface Person {
  id: string;
  name: string;
  color: string; // hex
}

/**
 * red_green_flag ONLY — where a person lands on the signed scale. Five bands,
 * because "leaning green" and "green" are genuinely different findings and must
 * never render identically (see FLAG_BAND_THEME in themes/categoryTheme.ts).
 * Fixed absolute cutoffs on the −10..+10 net scale — see flagBandFor.
 */
export type FlagBand = 'GREEN' | 'LEAN_GREEN' | 'NEUTRAL' | 'LEAN_RED' | 'RED';

/**
 * red_green_flag ONLY — the group verdict, derived from the DISTRIBUTION of
 * bands across ALL participants, never from a single extreme (a read where
 * A=−8 and B=−4 must not "clear" B). See classifyFlagGroup in scoringEngine.
 */
export type FlagGroupVerdict =
  | 'ALL_GREEN'
  | 'ALL_RED'
  | 'SPLIT'
  | 'SINGLE_POLE_GREEN'
  | 'SINGLE_POLE_RED'
  | 'CLUSTERED'
  | 'FLAT';

/** red_green_flag ONLY — the per-person breakdown behind their band. */
export interface FlagPersonStat {
  /** Questions where this person was picked on a GREEN question. */
  greenCount: number;
  /** …and on a RED question. */
  redCount: number;
  /** dimension → signed total for this person (green +1 / red −1). */
  dimensions: Record<string, number>;
  /** The dimension carrying this person's largest |signed| value. */
  dominantDimension: string;
  /** Sign of that dominant dimension — selects the .red/.green insight pool. */
  dominantSign: 'green' | 'red' | 'neutral';
}

export interface ResultData {
  moduleId: string;
  mode: ReadingMode;
  winner?: Person;
  /** Multi tie: ids of ALL persons sharing the max score (2+ entries), or [] for a
   *  clear winner. `winner` still holds the first max scorer for backward compat —
   *  rendering must gate on this, never on `winner` alone. Absent on readings
   *  persisted before ties shipped (treat as []). */
  tiedWinnerIds?: string[];
  /** The tied Persons themselves (names + colors for the reveal, verdict and share
   *  card) — carried on the result so History reopens don't depend on session state. */
  tiedWinners?: Person[];
  verdict?: 'positive' | 'neutral' | 'negative';
  scores: Record<string, number>; // personId -> score (multi/solo) or category -> tally (categorical)
  /** UNWEIGHTED pick tally per person (generic multi only): +1 per answered question,
   *  ignoring `personWeight`. DISPLAY ONLY — `scores` stays weighted and still decides
   *  the winner. Exists because weighted totals can exceed the question count, which the
   *  result card used to render as a bogus "12 / 23" denominator. Absent on readings
   *  persisted before this shipped (render falls back to `scores`). */
  pickCounts?: Record<string, number>;
  /** Generic multi only: the read came out FLAT across 3+ people (see scoreMulti).
   *  Nobody is crowned — the screen shows `clusterTitle` instead of a name and
   *  "too close to call" instead of the confidence bar. */
  isClustered?: boolean;
  /** NOBODY was picked even once — every question went to "No one" (or unanswered).
   *  Outranks `isClustered`: a zero-signal read is an ABSENCE of signal, never an
   *  evenly-shared outcome, and it applies at any person count. Confidence is 0 and
   *  no insight bullets are drawn. */
  isZeroSignal?: boolean;
  /** The name-free big-title verdict for a clustered OR zero-signal read ("Evenly
   *  Loved" / "No Signal Read"), localized at generation time from
   *  MultiResults.clusterTitle or .zeroTitle. One field on purpose, so the result
   *  screen and the share card need no second branch. Persisted so a History reopen
   *  renders identically. */
  clusterTitle?: LocalizedString;
  dominantDimension: string;
  /** For `categorical` results: the runner-up category ("…with an Anxious edge"). */
  secondaryDimension?: string;
  /** AURA only (AURA_PRISM_V2): the runner-up colour's hex when it scores ≥
   *  AURA_SECONDARY_THRESHOLD of the winner — drives the result orb's secondary rim arc.
   *  null/absent → pure aura (silver arc). Persisted so History + share match the reveal. */
  secondaryColor?: string | null;
  /** For `count` results (a relationship module read solo): how many of the total
   *  questions registered a "sign present", surfaced as "N of {signalTotal} signs present". */
  signalCount?: number;
  signalTotal?: number;
  /** TRUE only when the result was generated by generateCountResult (a MIGRATED multi
   *  module read solo). Necessary because signalCount/signalTotal are set for EVERY multi
   *  module read solo — including ones that still fall back to the winner-race
   *  generateMultiResult — so they alone can't tell the two apart at render time. */
  isCountResult?: boolean;
  // ── red_green_flag ONLY (signed scoring — see scoreMulti's polarity branch) ──
  /** Signed total per person: green +1, red −1, "No one" contributes nothing.
   *  Distinct from `scores`, which stays the UNSIGNED pick count so existing
   *  bar/percentage rendering keeps working. */
  netScores?: Record<string, number>;
  /** Every participant's band — classified INDEPENDENTLY, never relative to a
   *  single extreme, so one very red person can't clear anyone else. */
  bands?: Record<string, FlagBand>;
  /** Per-person greenCount / redCount / signed dimension breakdown. */
  flagStats?: Record<string, FlagPersonStat>;
  /** personId with the highest net / lowest net. */
  greenest?: string;
  reddest?: string;
  /** max(net) − min(net) across participants. */
  spread?: number;
  /** Multi only — the distribution-derived group verdict (still computed by the
   *  engine; red_green_flag now uses the compare selector instead — kept for any
   *  older persisted reading + future 3+ modes). */
  groupVerdict?: FlagGroupVerdict;
  /** red_green_flag compare ONLY — the standout verdict's big title, selected +
   *  localized at generation time so History reopens render identically. */
  verdictTitle?: LocalizedString;
  confidence: number; // clamped per scoring path (see scoringEngine)
  insights: LocalizedString[];
  /** Multi only: the winner template minus the name ("loves you the most.") — the
   *  subtitle under the reveal name. Derived per-locale from the RAW winnerTemplate at
   *  generation time, so it stays correct in locales where the name sits mid-sentence
   *  (render-time name-stripping of insights[0] did not). Absent on ties (insights[0]
   *  IS the tie verdict) and on readings persisted before this shipped (the result
   *  screen falls back to the legacy strip). */
  verdictLine?: LocalizedString;
  /** Punchy social-card quote picked at generation time (the dimension/verdict
   *  shareLine — see MultiResults/SoloResults.shareLines). Optional: readings
   *  persisted before the share card shipped don't carry one. */
  shareLine?: LocalizedString;
  attachmentLabel?: LocalizedString;
  loveLanguageLabel?: LocalizedString;
}

export interface Reading {
  id: string;
  moduleId: string;
  mode: ReadingMode;
  persons: Person[];
  answers: Record<string, string>; // questionId -> personId or answer index
  result: ResultData;
  createdAt: number; // unix timestamp
  /** The exact question ids served for THIS reading, in served order — lets History
   *  reopen show what was actually asked once pooled modules vary the set. Absent on
   *  readings persisted before question pooling shipped. */
  questionIds?: string[];
  /** Option C unlock state, as a property OF THIS READING rather than of the session.
   *  A History reopen used to be unconditionally unlocked, so Skip → Save & exit →
   *  reopen handed over the full reading for free and made the gate optional.
   *
   *  UNDEFINED MEANS UNLOCKED, deliberately: every reading saved before this field
   *  existed was already viewable in full under the old rules, and retroactively
   *  locking content someone has already seen is worse than the bypass. Only readings
   *  saved from this build forward can be locked. */
  unlocked?: boolean;
}

/**
 * The Phosphor icons the app bundles, by component name (2026-07-24 — replaces the
 * old emoji `Module.icon`). Emoji rendered from the device's system font, so module
 * glyphs looked different on every phone and could fall back to tofu; these are
 * bundled SVG, identical everywhere.
 *
 * This union is the CONTRACT: `ModuleIcon`'s registry is typed
 * `Record<ModuleIconName, Icon>`, so adding a name here without registering its
 * component is a compile error (and vice-versa). Deep-import the component in
 * `src/components/ModuleIcon.tsx` — never barrel-import `phosphor-react-native`,
 * which would pull all ~1500 icons into the bundle (Metro does not tree-shake).
 *
 * Named ModuleIconName, not PhosphorIconName: `Mirror` is drawn in-house
 * (src/components/MirrorIcon.tsx) because Phosphor has none, and it implements
 * Phosphor's own `Icon` contract so the registry stays uniform. Prefer that route
 * over a second icon library — see the mirror file's header for why.
 */
export type ModuleIconName =
  | 'Baby'
  | 'Eye'
  | 'Flame'
  | 'FlagPennant'
  | 'Heart'
  | 'HeartBreak'
  | 'Infinity'
  | 'Lightning'
  | 'MaskHappy'
  | 'Mirror'
  | 'MoonStars'
  | 'PawPrint'
  | 'Person'
  | 'Plant'
  | 'Scan'
  | 'Scissors'
  | 'SmileySad'
  | 'Sparkle';

export interface Module {
  id: string;
  type: ModuleType;
  /** How the result is scored/rendered. Defaults to `type` ('multi' | a solo kind) when
   *  unset; set explicitly to 'categorical' / 'count' for the non-valence solo modules. */
  resultKind?: ResultKind;
  starsCost: Record<ReadingMode, number>;
  /** The module's identity glyph — THE single source of truth for every surface
   *  (Home card, detail hero, unlock dialog, loading orb, result, History), all of
   *  which render it through `src/components/ModuleIcon.tsx`. */
  iconName: ModuleIconName;
  color: string; // accent hex for glow
  framework: Framework;
  /** Reading modes this module offers, in the reading-mode picker. Absent = all
   *  four (solo/compare/triangle/circle) — the default for every module. Set it
   *  to cap a module whose scoring degrades past a point: red_green_flag lists
   *  only ['solo','compare'] because with 3+ people its 20 picks spread too thin
   *  (~20/N each) and every read collapses to "no clear signal". A `multi` module
   *  MUST keep 'solo' + at least one multi mode; a mode omitted here is never
   *  reachable, so person-entry only ever sees an offered mode. */
  availableModes?: ReadingMode[];
  /** Placeholder module shown on Home as a dimmed "Coming soon" card (not playable). */
  comingSoon?: boolean;
  /** Star cost to permanently unlock a paid, buyable module. When set AND the id is not in
   *  `userStore.unlockedModules`, the module is locked-but-buyable: Home renders full-colour
   *  art + a ★cost pill, and entering the flow gates through `ModuleUnlockDialog`. Once
   *  unlocked it plays like any module (normal per-reading star costs apply). Absent = a free
   *  module with no unlock gate. */
  unlockCost?: number;
}

/**
 * Module-card skin under the active theme (Home cards + any surface mirroring
 * them). Tokens typed `string | null` follow one rule: **`null` = "derive from
 * the module's own accent"** (`Module.color` — today's per-module look), a
 * non-null value = the theme overrides that derivation so cards visually belong
 * to the theme. Resolution happens in ONE place —
 * `resolveModuleCardStyle()` (src/themes/moduleCardStyle.ts) — components never
 * read these tokens directly.
 *
 * NOTE: tokens that get an alpha suffix appended at resolve time (`iconTint`,
 * and `module.color` itself) must be 6-digit hex (`#RRGGBB`), never rgba().
 */
export interface ModuleCardTokens {
  /** Card fill behind the glass. null → GlassCard's platform default
   *  (bg2 + surface tint / iOS blur). */
  background: string | null;
  /** Optional top→bottom wash gradient over the fill. null → no gradient. */
  gradient: [string, string] | null;
  /** Card border. null → GlassCard's default (theme.surfaceBorder). */
  border: string | null;
  /** Shadow/glow color behind the card. null → `${accent}66` per module. */
  glow: string | null;
  /** Corner-bloom tint. null → the module accent. */
  bloom: string | null;
  /** Bloom radial opacity stops [peak @0%, mid @50%] (outer stop is always 0). */
  bloomOpacity: [number, number];
  /** Icon-tile tint — bg renders at `${tint}33`, border at `${tint}66`.
   *  null → the module accent. */
  iconTint: string | null;
  /** Locked-card treatment: overlay wash + lock-glyph color. */
  lockedOverlay: string;
  lockedTint: string;
  /** Coming-soon placeholder: dashed border + dimmed text/lock tint. */
  comingSoonBorder: string;
  comingSoonTint: string;
}

/**
 * Ambient particle layer painted over the shared field gradient (CosmicField) —
 * e.g. Desert Oracle's sand dusting. STATIC by design (Simo, 2026-07-19): the
 * motes are plain Views with no animation, so the layer costs nothing at
 * runtime — pure atmosphere, zero smoothness impact. `null` on ThemeColors = no
 * ambient particles (cosmic — zero visual change).
 */
export interface AmbientParticleTokens {
  /** Particle tints, cycled across the field. */
  colors: string[];
  count: number;
  /** Particle diameter range [min, max] dp. */
  size: [number, number];
  /** Per-mote opacity range [min, max] — each mote gets a fixed value inside it. */
  opacity: [number, number];
}

export interface ThemeColors {
  id: ThemeId;
  background: string;
  bg2: string;
  surface: string;
  surfaceBorder: string;
  borderStrong: string;
  primary: string;
  gradient: [string, string, string];
  /** The ambient screen-field gradient (top → mid → bottom) painted behind the
   *  navigator and mirrored inline by full-bleed screens. */
  fieldGradient: [string, string, string];
  text: string;
  textMuted: string;
  textDim: string;
  gold: string;
  rose: string;
  emerald: string;
  glow: string;
  /** How this theme skins module cards — see ModuleCardTokens. */
  moduleCard: ModuleCardTokens;
  /**
   * The daily-quote colour cycle: EXACTLY 7 accents, one per day of the ritual week,
   * in the aura-spectrum spirit. Indexed by `daysSinceAnchor % 7`, so it advances with
   * the quote itself.
   *
   * ⚠️ THE SEVEN MUST BE PERCEPTUALLY DISTINCT — seven shades of the theme's own hue
   * does NOT work. That was the first attempt: Desert Oracle got seven ambers and Elven
   * Grove seven greens, closest pairs only ΔE 8.9 and 12.6 apart, and on device the
   * daily colour simply vanished under the theme — every day looked identical. Aim for
   * ΔE ≥ 15 between the closest pair (CIE76) while keeping each one tonally at home on
   * this theme's `background`, and ΔE ≥ 40 against that background so blooms read.
   *
   * The THEME owns the base (background / surfaces / type); the DAY owns the light.
   * Per-theme by design — an unlocked theme recolours the whole cycle.
   */
  dailyAccents: [string, string, string, string, string, string, string];
  /** Ambient particle layer over the field gradient. null = none. */
  ambientParticles: AmbientParticleTokens | null;
}

/**
 * red_green_flag COMPARE (exactly 2 people) — the standout-based verdict.
 * Replaced the old distribution-based 6-way group verdicts (2026-07-22): now
 * that the module is solo + compare only, every multi read is a head-to-head,
 * and a standout selector reads better than a group classifier. `{a}` = the
 * standout (larger |net|), `{b}` = the other person.
 */
export type FlagCompareVerdictKey =
  | 'OPPOSITE'
  | 'BOTH_GREEN'
  | 'BOTH_RED'
  | 'ONE_POLE'
  | 'TOO_CLOSE';

export interface FlagCompareVerdict {
  /** The big result title (no placeholders). */
  title: LocalizedString;
  /** The subtitle line, with {a}/{b} filled at generation time. */
  line: LocalizedString;
}

export type FlagCompareVerdicts = Record<FlagCompareVerdictKey, FlagCompareVerdict>;

/**
 * red_green_flag ONLY — MultiResults with polarity-split insight pools and the
 * 2-person standout verdicts. Kept as its OWN type so the other 8 multi modules'
 * `MultiResults` shape (flat insight arrays) is untouched.
 *
 * `winnerTemplate` / `tieTemplate` are retained purely so readings persisted
 * before the signed rework still render through the legacy path.
 */
export interface FlagMultiResults {
  winnerTemplate: LocalizedString;
  tieTemplate: LocalizedString;
  compareVerdicts: FlagCompareVerdicts;
  /** dimension → { red, green }; the pool is chosen by the described person's
   *  `dominantSign`, so a green-leaning person never draws red-flag copy. */
  insights: Record<string, { red: LocalizedString[]; green: LocalizedString[] }>;
  shareLines: Record<string, LocalizedString>;
}

export interface MultiResults {
  winnerTemplate: LocalizedString;
  /** Tie verdict — used instead of winnerTemplate when 2+ persons share the max
   *  score. {names} is replaced with the tied names joined naturally per locale
   *  ("X and Y" / "X, Y, and Z" — see joinNames in scoringEngine). */
  tieTemplate: LocalizedString;
  /** CLUSTERED verdict — used instead of winnerTemplate/tieTemplate when the read comes
   *  out flat across 3+ people (ResultData.isClustered). Deliberately NAME-FREE: the whole
   *  point is that nobody stands out, so no {names} token belongs in either field.
   *  `clusterTitle` = the short serif big-title (2–4 words); `clusterLine` = the one-sentence
   *  verdict that becomes insights[0]. */
  clusterTitle: LocalizedString;
  clusterLine: LocalizedString;
  /** ZERO-SIGNAL verdict — nobody was picked even once (ResultData.isZeroSignal).
   *  Also name-free. The copy MUST frame this as the absence of a signal, never as a
   *  shared or even outcome, and never as reassurance: "nobody resents you" is a claim
   *  this reading cannot support — "nothing was detected" is. */
  zeroTitle: LocalizedString;
  zeroLine: LocalizedString;
  insights: Record<string, LocalizedString[]>;
  /** One designed share-card quote per dimension (same keys as `insights`) —
   *  the social-growth line on the exported card, NOT a truncated insight. */
  shareLines: Record<string, LocalizedString>;
}

/**
 * A `multi`-type module read in `solo` mode → a single-subject "signs present" COUNT
 * about ONE person, tiered by signal share (see scoreCount + generateCountResult).
 * Distinct from MultiResults: `{name}` is the SUBJECT being described, NEVER a contest
 * winner ("{name} loves you the most").
 */
export type CountTier = 'none' | 'low' | 'medium' | 'high';

export interface CountResults {
  /** Descriptive (not name-first winner) headline per tier; `{name}` = the one person,
   *  filled via localizeTemplate. Tiers by share: none <= 0.1, low < 0.4, medium < 0.7,
   *  high otherwise. */
  tiers: Record<CountTier, LocalizedString>;
  /** One share-card quote per tier. */
  shareLines: Record<CountTier, LocalizedString>;
  /** Insight pool keyed by TIER (>= 6 per tier; 3 picked per reading). Tier-keyed so a
   *  low/zero read never draws affirming copy — NOT dimension-keyed. */
  insights: Record<CountTier, LocalizedString[]>;
}

export interface SoloResults {
  verdicts: {
    positive: LocalizedString;
    neutral: LocalizedString;
    negative: LocalizedString;
  };
  /** Short headline word shown as the big result title (e.g. "Secure"). */
  verdictLabel: {
    positive: LocalizedString;
    neutral: LocalizedString;
    negative: LocalizedString;
  };
  whatThisMeans: {
    positive: LocalizedString;
    neutral: LocalizedString;
    negative: LocalizedString;
  };
  /** One designed share-card quote per verdict — first-person confession voice
   *  (the self-module card is the user talking about themselves). */
  shareLines: {
    positive: LocalizedString;
    neutral: LocalizedString;
    negative: LocalizedString;
  };
  insights: Record<string, LocalizedString[]>;
}

/**
 * Results for `categorical` solo modules (aura_color; attachment_style once converted).
 *
 * Rendering contract (result screen):
 *   - Reveal name  = categories[dominantDimension].label      (e.g. "Violet")
 *   - Verdict line = categories[dominantDimension].verdict, and when
 *     secondaryDimension exists append edgeTemplate with {edge} replaced by
 *     categories[secondaryDimension].label  (→ "…with a Rose edge")
 *   - Body card    = whatThisMeans; bullets = 3 insights selected by
 *     selectInsights(insights, dominantDimension, seed) — pools are keyed by
 *     CATEGORY (the winning color), not by question dimension.
 *   - Share card   = shareLine (first-person confession voice, per solo rules)
 */
export interface CategoricalResults {
  categories: Record<
    string,
    {
      /** Short headline shown as the big Playfair reveal (e.g. "Violet"). */
      label: LocalizedString;
      /** Full verdict statement ("Your aura glows violet."). */
      verdict: LocalizedString;
      /** "What this means" body copy. */
      whatThisMeans: LocalizedString;
      /** Share-card quote — first-person confession voice. */
      shareLine: LocalizedString;
    }
  >;
  /** Runner-up phrase; {edge} is replaced with the secondary category's label. */
  edgeTemplate: LocalizedString;
  /** 6 insight variants per category — selected by winning category. */
  insights: Record<string, LocalizedString[]>;
}
