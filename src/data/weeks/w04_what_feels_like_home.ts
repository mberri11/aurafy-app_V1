/**
 * AURAFY — WEEK 4 CONTENT  ·  "What Feels Like Home"  ·  category: love  ·  module: who_soulmate
 * Authored via the aurafy-week-generator skill. EN-first; fr/ar/es stubbed = en via L() until translated.
 *
 * Measures: is this connection built on safety, or on spark alone?
 * 4 outcomes: true_home · spark_alone · unread_peace · harbor_only
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w04_a1 … w04_a7.
 *  - Append `w04Articles` to the ARTICLES array (src/content/articles/index.ts).
 *  - Merge `w04ArticlesEn` into the EN content map (src/content/articles/content.en.ts). FR/AR/ES use the
 *    existing getArticleContent EN-fallback — no stubs needed for article bodies.
 *  - Append `w04Questions` to the daily-question pool (src/data/dailyQuestions.ts).
 *  - Push `w04Week` into WEEKS (src/data/weeks/index.ts), AFTER w03Week, and run validateWeek().
 *  - `L()` is a local stub helper; reuse it or inline {en,fr,ar,es} per your conventions.
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { LocalizedString } from '../../types';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

/** Locale stub: write EN, mirror into fr/ar/es until real translations land (fallback renders cleanly). */
const L = (en: string): LocalizedString => ({ en, fr: en, ar: en, es: en });

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w04Articles: Article[] = [
  { id: 'w04_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-27' },
  { id: 'w04_a2', category: 'love', readMinutes: 4, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-28' },
  { id: 'w04_a3', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-29' },
  { id: 'w04_a4', category: 'love', readMinutes: 4, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-30' },
  { id: 'w04_a5', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-31' },
  { id: 'w04_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-01' },
  { id: 'w04_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-02' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */

export const w04ArticlesEn: Record<string, ArticleContent> = {
  w04_a1: {
    title: 'Why Some People Feel Like Home',
    subtitle: 'The physiology of finally relaxing around someone',
    blocks: [
      { type: 'paragraph', text: "You know it the moment it happens, even if you've never had words for it: with certain people, something in your body stands down. The shoulders drop. The voice you use stops being curated. You say the half-formed thought instead of the polished one. It isn't fireworks — it's the opposite. It's the rare, almost physical sensation of being off-duty." },
      { type: 'heading', text: 'Home is a nervous-system verdict' },
      { type: 'paragraph', text: "That feeling isn't poetry; it's biology. Your nervous system is constantly scanning every person you're with for one question — am I safe here? — and with most people the answer stays \"mostly.\" The ones who feel like home are the ones with whom the scan quietly completes and shuts off. What's left over, once vigilance stops spending your energy, is the warmth you've been calling \"comfortable.\"" },
      { type: 'paragraph', text: "This is why home-feeling people are rarer than exciting people. Excitement can be produced by novelty, beauty, unpredictability — cheap and everywhere. Safety can only be produced by consistency over time: showing up the same, keeping small promises, staying kind when it would be easy not to. This week is about learning to read that difference — because one of them is a mood, and the other is a place you can live."},
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'The felt sense of safety with specific people reflects real co-regulation: nervous systems calibrate to reliable partners, lowering vigilance. "Feeling like home" is a measurable state, not a metaphor.' },
    ],
  },
  w04_a2: {
    title: 'The Quiet Kind of Love Nobody Posts About',
    subtitle: 'The best relationships photograph terribly',
    blocks: [
      { type: 'paragraph', text: "The loves that dominate feeds are the loud ones — airport reunions, surprise trips, paragraphs on anniversaries. And they're lovely. But there's a whole category of love that never makes it online because it doesn't produce content: the tea made without asking, the silence that's comfortable instead of tense, the person who noticed you were off before you said a word." },
      { type: 'paragraph', text: "This love is invisible almost by definition. It lives in prevention — the arguments that never happened because someone chose gentleness, the anxieties that never spiraled because someone was reliable. You can't photograph the storm that didn't come. So the quiet lovers scroll past the loud ones and sometimes wonder if they're missing something. Usually, it's the reverse." },
      { type: 'quote', text: 'The loudest love asks to be witnessed. The quietest one just keeps you warm.', attribution: 'On unposted devotion' },
      { type: 'paragraph', text: "None of this makes loud love fake — celebration is real too. But if you're measuring what you have against what people post, you're comparing your infrastructure to someone else's fireworks. One of those things holds a roof up." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Relationship research consistently finds that everyday responsiveness — small, frequent acts of noticing and care — predicts satisfaction and longevity far better than grand gestures or public displays.' },
    ],
  },
  w04_a3: {
    title: 'Safe vs. Exciting: The Love We Choose vs. the Love We Need',
    subtitle: 'The oldest tug-of-war in the heart',
    blocks: [
      { type: 'paragraph', text: "Almost everyone, at some point, stands between two doors. Behind one: the person who makes your pulse spike — unpredictable, magnetic, slightly out of reach. Behind the other: the person who makes your breath slow — steady, present, fully within reach. And almost everyone is shocked to discover which door their feet keep walking toward." },
      { type: 'heading', text: 'Why the pull and the good are different systems' },
      { type: 'paragraph', text: "Attraction and attachment run on different circuitry. The spike — dopamine, novelty, pursuit — is the wanting system, and it's loudest precisely when the outcome is uncertain. The calm — oxytocin, trust, familiarity — is the bonding system, and it only grows where safety already lives. The cruel joke is that the wanting system shouts and the bonding system whispers, so the exciting person always sounds like the answer even when they aren't." },
      { type: 'paragraph', text: "The mature move isn't choosing boredom over passion — that's a false menu. It's learning that the strongest connections have both, in the right order: safety as the foundation, spark as what you build on top of it. Spark on top of safety is a fireplace. Spark without safety is just a fire." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Desire and attachment involve distinct motivational systems — novelty-driven wanting versus security-driven bonding. Uncertainty amplifies the first and starves the second, which is why the "exciting" option so often feels louder than it is good.' },
    ],
  },
  w04_a4: {
    title: 'What a Calm Relationship Actually Feels Like',
    subtitle: 'A field guide, for people who have only known weather',
    blocks: [
      { type: 'paragraph', text: "If your history is stormy, calm love is genuinely disorienting — you have no reference for it. So here is the field guide. A calm relationship feels like: answering honestly without rehearsing first. Disagreeing without checking the exits. A phone that can sit face-up on the table. Plans that stay made. The absence of that low, ambient dread you stopped noticing because it was always there." },
      { type: 'paragraph', text: "What calm is not: flat. A calm relationship still has laughter that gets out of hand, real desire, hard conversations, bad days. The difference is the floor. In stormy love, every conflict threatens the foundation — you fight about the dishes and somehow the relationship itself is on the table. In calm love, the foundation is never in play. You can afford full honesty because honesty won't cost you the whole thing." },
      { type: 'paragraph', text: "People raised on chaos often mistake this floor for a ceiling — as if safety means nothing intense can happen here. It's the opposite. The floor is what makes intensity survivable. You can only go truly deep with someone when you're not simultaneously guarding the door." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Secure bonds function as a base: perceived safety expands honesty, exploration, and emotional depth rather than flattening them. Calm is the enabling condition of intensity, not its absence.' },
    ],
  },
  w04_a5: {
    title: 'The Difference Between Chemistry and Compatibility',
    subtitle: 'One gets you in the door. The other decides if you can live there.',
    blocks: [
      { type: 'paragraph', text: "Chemistry is instant and unmistakable: the conversation that ignores the clock, the gravity in a room, the feeling of being plugged into a socket. Compatibility is slower and quieter: how you both handle money, silence, stress, his mother, your bad week. Chemistry is discovered in one night. Compatibility is discovered in a hundred ordinary ones." },
      { type: 'heading', text: 'Where each one shows up' },
      { type: 'orderedList', items: [
        { title: 'Chemistry lives in the highlights', text: 'Dates, banter, attraction, the pull. It answers: do we ignite?' },
        { title: 'Compatibility lives in logistics', text: 'Conflict style, values, rhythms, repair. It answers: do we function?' },
        { title: 'The trap', text: 'Strong chemistry gets mistaken for the whole answer — so people keep re-testing the ignition while the engine quietly fails.' },
      ] },
      { type: 'paragraph', text: "You need a real amount of both; this isn't a lecture against desire. But they fail differently. Missing chemistry feels like a good roommate. Missing compatibility feels like a beautiful war. And only one of those failures can sometimes grow — attraction can deepen where respect and safety live, but compatibility almost never emerges from pure fire." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Longitudinal relationship research is blunt: initial passion predicts little about long-term outcomes, while conflict style, shared values, and day-to-day responsiveness predict a great deal.' },
    ],
  },
  w04_a6: {
    title: "When Peace Feels Boring Because You're Used to Chaos",
    subtitle: 'Your calibration, not your compass',
    blocks: [
      { type: 'paragraph', text: "Here is one of the most quietly life-ruining glitches in the human heart: if you grew up on — or got trained by — chaotic love, your body learned that love FEELS like adrenaline. Vigilance, longing, repair, relief, repeat. So when someone steady finally arrives, the alarm system finds nothing to do… and reports that as \"no feelings.\" Peace gets filed as boredom. Safety reads as the absence of love, because love was never safe before." },
      { type: 'heading', text: 'Boredom or unfamiliarity? The test' },
      { type: 'paragraph', text: "Ask yourself what, exactly, is missing. If it's them — their mind doesn't interest you, their touch does nothing, you don't respect who they are — that's real incompatibility, and no amount of healing will invent it. But if what's missing is the ACHE — the anxiety, the chase, the not-knowing — then nothing is missing from the relationship. Something is missing from the pattern your nervous system calls love. Those are profoundly different diagnoses with profoundly different cures." },
      { type: 'paragraph', text: "Give calm time to stop feeling foreign. Excitement addiction fades like any calibration, usually in months, not days — and on the other side of it, many people discover the steady person didn't lack depth at all. The depth was just quiet, and they'd never been still enough to hear it." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Nervous systems normalize whatever they repeat: chaotic bonds train arousal to mean attachment, so secure partners initially register as flat. The mislabeling of safety as boredom is a documented recalibration effect, and it is reversible.' },
    ],
  },
  w04_a7: {
    title: 'Building a Person Into a Home',
    subtitle: 'Home is not found. It is constructed, daily, by two people.',
    blocks: [
      { type: 'paragraph', text: "The soulmate myth says home is a person you find — fully built, move-in ready, somewhere out there. The truth is less romantic and far more hopeful: home is something two people construct, brick by unglamorous brick, out of kept promises and repaired ruptures and a thousand small choices to turn toward each other instead of away." },
      { type: 'heading', text: 'The building materials' },
      { type: 'paragraph', text: "Reliability: doing the small thing you said, again, until your word becomes load-bearing. Repair: going back after the fight — the couples who last aren't the ones who never rupture, they're the ones who always return. Witness: knowing each other's days, names, dreads; being the person who holds the context of a life. Sanctuary: being reliably softer with each other than the world was all day. None of these is a spark. All of them are walls." },
      { type: 'paragraph', text: "This reframe changes the question this week has been circling. Not just \"do they feel like home?\" but \"are we both laying bricks?\" Because a person who feels like home but never builds is a beautiful campsite. And a person who builds with you, steadily, even without fireworks every night — that's not settling. That's architecture." },
      { type: 'quote', text: 'Fireworks light the sky for a minute. Bricks hold a roof for a lifetime.', attribution: 'On construction' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Long-term bond research converges on the same builders: reliability, repair after conflict, and everyday turning-toward. Lasting "home" is behavioral and cumulative — built, not found.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w04Questions: DailyQuestion[] = [
  {
    id: 'w04_q1',
    text: L("What happens in your body when you're with them?"),
    answers: [
      { label: L('My shoulders drop — I stop performing'), insight: L('A nervous system that stands down has already given its verdict.') },
      { label: L('Racing pulse, high alert, delicious chaos'), insight: L('A body on alert is feeling voltage, not shelter.') },
      { label: L('Calm — almost suspiciously calm'), insight: L('When calm feels suspicious, the suspicion is the old training talking.') },
      { label: L("Comfortable, like a couch I've stopped noticing"), insight: L('Comfort you no longer notice may be shelter without current.') },
    ],
  },
  {
    id: 'w04_q2',
    text: L('How does their care usually arrive?'),
    answers: [
      { label: L('Big flashes when we\'re good, silence when we\'re not'), insight: L('Care that only comes in fireworks leaves the ordinary days cold.') },
      { label: L('Small, unposted, constant'), insight: L('Unwitnessed care is the kind that holds roofs up.') },
      { label: L('Steady — I catch myself calling it "nothing special"'), insight: L('"Nothing special" is often what safety sounds like to a chaos-trained ear.') },
      { label: L('Practical and kind, but it lands like duty'), insight: L('Care without warmth underneath is maintenance, not love.') },
    ],
  },
  {
    id: 'w04_q3',
    text: L('Be honest — what actually keeps you in this?'),
    answers: [
      { label: L('Both: I feel safe AND alive here'), insight: L('Safety with aliveness on top is the whole architecture.') },
      { label: L("The rush — I can't tell if I love them or the intensity"), insight: L('When you can\'t separate the person from the adrenaline, it\'s usually the adrenaline.') },
      { label: L('Habit, mostly — leaving feels harder than staying'), insight: L('Staying because leaving is hard is a harbor, not a home.') },
      { label: L('The calm — and honestly, the calm scares me a little'), insight: L('Being scared of peace says more about your history than this bond.') },
    ],
  },
  {
    id: 'w04_q4',
    text: L('Picture a completely ordinary Tuesday with them. What do you feel?'),
    answers: [
      { label: L("I can't picture a Tuesday — we only exist in highlights"), insight: L('A love with no ordinary days has no foundation to stand on.') },
      { label: L('Warm — small good moments come to mind instantly'), insight: L('If the ordinary day glows on its own, you\'re describing home.') },
      { label: L('Peaceful — and a little guilty for wanting more noise'), insight: L('Wanting noise inside peace is calibration, not incompatibility.') },
      { label: L('Flat — pleasant, but gray'), insight: L('Pleasant-but-gray is the honest sound of a missing current.') },
    ],
  },
  {
    id: 'w04_q5',
    text: L('Where do you two actually meet each other?'),
    answers: [
      { label: L('Values, humor, AND the pull — all three'), insight: L('Chemistry standing on compatibility is the rare full house.') },
      { label: L('Bodies and banter — the deep stuff stalls'), insight: L('Ignition without an engine keeps re-testing the same spark.') },
      { label: L('Deeper than I admit — I keep waiting for fireworks to "prove" it'), insight: L('Demanding fireworks as proof is the old wiring grading a new love.') },
      { label: L('Daily life runs smooth, but the spark is a rumor'), insight: L('A smooth machine with no heat is a good roommate arrangement.') },
    ],
  },
  {
    id: 'w04_q6',
    text: L('When things are good and quiet between you, what does your gut do?'),
    answers: [
      { label: L('Gets restless and starts hunting for a storm'), insight: L('A gut that hunts storms in peacetime was trained by storms.') },
      { label: L('Rests — quiet finally feels like mine'), insight: L('A gut that rests has found the thing it was scanning for.') },
      { label: L("There IS no quiet — we live between explosions"), insight: L('A love with no peacetime is running on voltage alone.') },
      { label: L('Quiet — but it feels more empty than peaceful'), insight: L('Empty and peaceful are different silences; trust which one you hear.') },
    ],
  },
  {
    id: 'w04_q7',
    text: L('Strip away all the intensity. What is left between you?'),
    answers: [
      { label: L("A person I'd still choose on the most boring day"), insight: L('Choosing someone on a boring day is the final proof of home.') },
      { label: L("I'm honestly scared to look"), insight: L('Being afraid to look under the spark usually means you already know.') },
      { label: L("More than I've been willing to admit"), insight: L('Underrating what\'s underneath is how chaos-trained hearts miss home.') },
      { label: L('A good roommate'), insight: L('A good roommate is a real answer — just not the one a heart builds on.') },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w04Week: WeeklyTheme = {
  id: 'w04_what_feels_like_home',
  title: L('What Feels Like Home'),
  category: 'love',
  resultPrompt: L('Is this built on safety, or on spark alone?'),
  days: [
    { articleId: 'w04_a1', questionId: 'w04_q1' },
    { articleId: 'w04_a2', questionId: 'w04_q2' },
    { articleId: 'w04_a3', questionId: 'w04_q3' },
    { articleId: 'w04_a4', questionId: 'w04_q4' },
    { articleId: 'w04_a5', questionId: 'w04_q5' },
    { articleId: 'w04_a6', questionId: 'w04_q6' },
    { articleId: 'w04_a7', questionId: 'w04_q7' },
  ],
  outcomes: [
    {
      key: 'true_home',
      title: L('Home and Fire'),
      body: L("This is the rare full house: a bond where your nervous system stands down AND the current still runs. You stop performing, the ordinary Tuesdays glow on their own, and the spark sits on top of a floor that never moves. Don't let anyone — including the loud loves on your feed — convince you this is settling. Safety with aliveness built on top isn't the boring option. It's the architecture everyone else is still looking for."),
      shareLine: L("Home isn't boring. Home is where I stop performing."),
    },
    {
      key: 'spark_alone',
      title: L('Spark Without Shelter'),
      body: L("The fire is real — nobody's denying the voltage. But look at what your answers kept circling: no ordinary Tuesdays, no floor under the fights, a pull you can't fully separate from adrenaline. That's ignition without an engine. Fireworks light the sky; they don't heat the house. You don't have to leave tonight — but stop mistaking intensity for foundation, and start asking whether this person can BUILD, not just burn."),
      shareLine: L("Fireworks light the sky. They don't heat the house."),
    },
    {
      key: 'unread_peace',
      title: L("Peace You Can't Read Yet"),
      body: L("Here's the gentle plot twist: the thing you've been calling boredom looks a lot like safety your nervous system hasn't learned to read. What's \"missing\" isn't depth or desire — it's the ache, the chase, the alarm. That was never love; that was weather you got used to. Give the calm real time to stop feeling foreign before you grade it. Many people discover the steady one had depth all along — it was just quiet, and they'd never been still enough to hear it."),
      shareLine: L("Maybe calm isn't boring. Maybe it's just new."),
    },
    {
      key: 'harbor_only',
      title: L('A Harbor, Not a Home'),
      body: L("This is the honest, unglamorous verdict: real safety, real kindness — and a current that genuinely isn't there. Not chaos-blindness, not miscalibration; you looked under the comfort and found a good roommate. A harbor matters, and nobody should shame you for having rested in one. But safety is where love starts, not where it hides. You're allowed to be grateful for the shelter and still admit you came here to live, not just to dock."),
      shareLine: L('Safe is where love starts — not where it hides.'),
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Order rotated per question.
  answerOutcomes: {
    w04_q1: ['true_home', 'spark_alone', 'unread_peace', 'harbor_only'],
    w04_q2: ['spark_alone', 'true_home', 'unread_peace', 'harbor_only'],
    w04_q3: ['true_home', 'spark_alone', 'harbor_only', 'unread_peace'],
    w04_q4: ['spark_alone', 'true_home', 'unread_peace', 'harbor_only'],
    w04_q5: ['true_home', 'spark_alone', 'unread_peace', 'harbor_only'],
    w04_q6: ['unread_peace', 'true_home', 'spark_alone', 'harbor_only'],
    w04_q7: ['true_home', 'spark_alone', 'unread_peace', 'harbor_only'],
  },
};
