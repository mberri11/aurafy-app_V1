/**
 * AURAFY — WEEK 3 CONTENT  ·  "Mixed Signals"  ·  category: love  ·  module: who_loves_me
 * Authored via the aurafy-week-generator skill. EN-first; fr/ar/es stubbed = en via L() until translated.
 *
 * Measures: what is their contradictory behavior actually telling you?
 * 4 outcomes: leaning_yes · torn_inside · comfortable_gray · your_static
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w03_a1 … w03_a7.
 *  - Append `w03Articles` to the ARTICLES array (src/content/articles/index.ts).
 *  - Merge `w03ArticlesEn` into the EN content map (src/content/articles/content.en.ts). FR/AR/ES use the
 *    existing getArticleContent EN-fallback — no stubs needed for article bodies.
 *  - Append `w03Questions` to the daily-question pool (src/data/dailyQuestions.ts).
 *  - Push `w03Week` into WEEKS (src/data/weeks/index.ts), AFTER w02Week, and run validateWeek().
 *  - `L()` is a local stub helper; reuse it or inline {en,fr,ar,es} per your conventions.
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { LocalizedString } from '../../types';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

/** Locale stub: write EN, mirror into fr/ar/es until real translations land (fallback renders cleanly). */
const L = (en: string): LocalizedString => ({ en, fr: en, ar: en, es: en });

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w03Articles: Article[] = [
  { id: 'w03_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-20' },
  { id: 'w03_a2', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-21' },
  { id: 'w03_a3', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-22' },
  { id: 'w03_a4', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-23' },
  { id: 'w03_a5', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-24' },
  { id: 'w03_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-25' },
  { id: 'w03_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-26' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */

export const w03ArticlesEn: Record<string, ArticleContent> = {
  w03_a1: {
    title: 'Reading Mixed Signals Without Losing Your Mind',
    subtitle: 'A survival guide for the land of maybe',
    blocks: [
      { type: 'paragraph', text: "Mixed signals are the most expensive kind of message: they cost hours of decoding, group-chat forensics, and sleep — and they still refuse to resolve. One day they text first with three exclamation points; three days later you're apparently a stranger. The whiplash isn't in your head. But how you read it decides whether it drives you insane." },
      { type: 'heading', text: 'The first rule: stop reading messages, start reading months' },
      { type: 'paragraph', text: "Any single signal is noise. A warm Tuesday means as little as a cold Friday — people have moods, hangovers, bad news you never hear about. Contradiction only becomes information when it repeats. So zoom out: not \"what did that emoji mean\" but \"what shape does the last month make?\" Patterns can't hide the way moments can." },
      { type: 'paragraph', text: "The second rule: a mixed signal is still a signal. Someone consistently inconsistent is telling you something true about where they are — unfinished, conflicted, or comfortable keeping you undefined. This week pulls those possibilities apart, one thread per day. By day seven you'll have a real answer instead of a guess." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Judgment research is clear: humans over-read single events and under-read patterns. Aggregating behavior over time is the reliable antidote — you are switching from anecdotes to data.' },
    ],
  },
  w03_a2: {
    title: 'Hot and Cold: The Psychology of Inconsistency',
    subtitle: 'Why the same person can feel like two people',
    blocks: [
      { type: 'paragraph', text: "The hardest part of hot-and-cold isn't the cold. It's that the hot was real. You didn't imagine the deep talk at 1 a.m., the way they looked at you, the plans they sketched out loud. Then the temperature dropped, and now you're holding two truths that refuse to fit together." },
      { type: 'heading', text: 'Three engines of inconsistency' },
      { type: 'orderedList', items: [
        { title: 'Conflict', text: 'They genuinely want it AND genuinely fear it. The heat is the want; the cold is the fear winning that week. This one is a war inside them, not a game played on you.' },
        { title: 'Convenience', text: 'They run warm when they need something — attention, comfort, an ego refill — and cool when they don\'t. Watch whether the warmth tracks YOUR life or THEIR needs.' },
        { title: 'Circumstance', text: 'The rarest and most innocent: their life is genuinely chaotic, and the inconsistency mirrors their calendar, not their feelings. The tell is that the warmth itself never changes quality — only frequency.' },
      ] },
      { type: 'paragraph', text: "You usually can't tell which engine is running from a single episode. But over weeks, each leaves a different fingerprint — and the questions this week are designed to lift exactly those prints." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Approach-avoidance conflict is one of the oldest documented patterns in motivation psychology: the same goal can trigger both desire and fear, producing exactly the oscillation you\'re seeing.' },
    ],
  },
  w03_a3: {
    title: 'When Their Words and Their Actions Disagree, Believe the Actions',
    subtitle: 'The oldest rule of reading people, and why it still wins',
    blocks: [
      { type: 'paragraph', text: "Words are cheap to produce. A \"miss you\" costs three seconds and zero inconvenience; it can be typed from a couch, half-meant, to three people at once. Actions carry cost — time, effort, the choosing of you over something easier. That cost is exactly what makes them honest." },
      { type: 'paragraph', text: "So when the two channels disagree, the disagreement itself is the message. Sweet words plus absent behavior isn't a paradox to solve — it's a preference being stated: they like how you feel about them more than they're willing to invest in you. Reverse it and the reading flips: clumsy words plus steady, showing-up behavior is love that just isn't verbal. The mouth stumbles; the feet don't lie." },
      { type: 'quote', text: 'People tell you where you stand by where they stand — not by what they say from far away.', attribution: 'On the two channels' },
      { type: 'paragraph', text: "One caution: believe actions over time, not one action under pressure. Anyone can perform a grand gesture after being confronted. The honest channel is the boring one — what they do on an average Wednesday when nothing is at stake." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Costly-signal logic runs through behavioral science: signals that require real investment are reliably more honest than cheap ones. Talk is the cheapest signal there is.' },
    ],
  },
  w03_a4: {
    title: "The Push-Pull Dance and Why It's Addictive",
    subtitle: 'Your brain on maybe',
    blocks: [
      { type: 'paragraph', text: "Here's the uncomfortable science: inconsistent affection is more gripping than steady affection. Not because you're broken — because of how reward systems work. A reward that arrives unpredictably fires the brain's wanting-circuitry far harder than one you can count on. It's the same mechanism that keeps hands on slot machines." },
      { type: 'heading', text: 'Why the crumbs feel like a feast' },
      { type: 'paragraph', text: "When warmth is scarce and random, each drop of it lands with disproportionate force. The relief of their name on your screen after four silent days can feel bigger than a whole good week with someone stable — relief and joy get chemically confused. And so the pull-away doesn't weaken the attachment. It tightens it. You're not in love with the distance; you're hooked on the return." },
      { type: 'paragraph', text: "Naming this does two kind things. It explains why walking away from an inconsistent person is so much harder than walking away from a cold one — you're not weak, you're wired. And it gives you the sober question this week keeps circling: is the intensity you feel actually connection, or is it the arcade lights of an intermittent reward?" },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Intermittent reinforcement producing the strongest, most extinction-resistant attachment is one of the most replicated findings in behavioral psychology. The push-pull "spark" is that schedule, felt from the inside.' },
    ],
  },
  w03_a5: {
    title: 'Are They Confused, or Are You?',
    subtitle: 'The question nobody wants to ask the mirror',
    blocks: [
      { type: 'paragraph', text: "Before this week convicts anyone, one honest detour: sometimes the signals are steady and the static is ours. An anxious attachment system is a sensitive instrument — it can read a slow reply as rejection, a tired evening as coldness, a normal need for solitude as the beginning of the end. The person never changed temperature; our alarm did." },
      { type: 'heading', text: 'A quick self-audit' },
      { type: 'paragraph', text: "Try these three questions. One: would a neutral friend, shown the raw facts of the last month, see inconsistency — or just an ordinary busy human? Two: does the \"cold\" always coincide with something in YOUR week (stress, insecurity spikes, too much time to think)? Three: have past partners been \"confusing\" too — every single one? A yes-pattern here doesn't mean nothing is wrong. It means the instrument needs calibrating before you trust its reading." },
      { type: 'paragraph', text: "This isn't about blaming yourself — a sensitive alarm usually got that way for good historical reasons. It's about accuracy. If the noise is partly yours, no amount of decoding THEM will quiet it. And if the audit comes back clean — the inconsistency survives even a neutral reading — then you can trust the rest of this week's verdict fully." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Attachment research shows anxious activation biases perception: ambiguous partner behavior gets read as threat significantly more often. Checking the instrument is a legitimate step in reading the signal.' },
    ],
  },
  w03_a6: {
    title: 'The Comfort of Ambiguity (and Why People Hide There)',
    subtitle: 'Some people live in the gray on purpose',
    blocks: [
      { type: 'paragraph', text: "Not all mixed signals come from confusion. Some come from strategy — conscious or half-conscious. Ambiguity is a remarkably comfortable place to keep another person: all of the warmth, none of the obligations. Undefined things can't be broken up with. Unpromised things can't be betrayed." },
      { type: 'heading', text: 'The benefits of the gray (to them)' },
      { type: 'paragraph', text: "A person parked in ambiguity keeps your attention, your affection, and your availability while paying the price of none of it. They enjoy being adored without being accountable. The tell is what happens when you reach for definition: the subject changes, the humor deploys, \"why do we need labels\" arrives right on schedule — and then, if you pull back, a burst of warmth reels you back to exactly the undefined spot you tried to leave." },
      { type: 'paragraph', text: "Understand this clearly: someone can genuinely like you and still do this. Liking you was never the question. The question is whether they want the role or just the access — and the gray exists precisely so that question never has to be answered. Sometimes the deepest signal in the mix is the refusal to unmix it." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Keeping partners in low-commitment holding patterns while retaining their investment is well documented in relationship research on commitment asymmetry. The ambiguity is the strategy, not the accident.' },
    ],
  },
  w03_a7: {
    title: 'How to Ask for Clarity Without Scaring It Off',
    subtitle: 'One honest conversation beats another month of decoding',
    blocks: [
      { type: 'paragraph', text: "After six days of reading signals, here is the liberating truth: you're allowed to stop decoding and just ask. The fantasy that the \"right\" analysis will crack the code keeps you in the archive for months. One clear conversation retrieves in five minutes what decoding can't retrieve in a season." },
      { type: 'heading', text: 'How to ask without an ambush' },
      { type: 'paragraph', text: "Keep it small, calm, and about you — not a trial about them. Something like: \"I like what this is, and I've noticed I'm confused about where it's going. I'd rather just ask than guess: how do you see us?\" No accusation to defend against, no ultimatum to rebel against. Just a door, opened once, in daylight. Then — and this is the discipline — let the answer be the answer. Including a vague one." },
      { type: 'paragraph', text: "Because here is the last decode of the week: a person who wants you answers that question with relief. Clarity costs them nothing — they were hoping you'd ask. A person who dodges it, jokes past it, or makes you feel dramatic for asking has also answered. \"I don't know\" IS an answer. Vagueness in response to a direct, kind question is the gray choosing itself — and now you finally know that, which means you're free." },
      { type: 'quote', text: 'You asked for clarity. Whatever came back — even the fog — was the clarity.', attribution: 'On the last decode' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Direct, low-threat relational disclosure reliably outperforms indirect signal-testing for resolving uncertainty — and responses to bids for definition are themselves highly diagnostic of commitment.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w03Questions: DailyQuestion[] = [
  {
    id: 'w03_q1',
    text: L('When you zoom out over the last month, what shape do their signals make?'),
    answers: [
      { label: L('Mostly warm — the cold days are rare exceptions'), insight: L('A warm baseline with rare dips is a yes wearing ordinary weather.') },
      { label: L('Real highs, real lows, in a loop'), insight: L('A repeating loop of hot and cold is a conflict, not a coincidence.') },
      { label: L('Warm whenever I start drifting away'), insight: L('Warmth that only fires when you leave is a leash, not a feeling.') },
      { label: L('Honestly steady — the chaos is in my head between texts'), insight: L('If the pattern is calm and the panic is yours, the instrument needs calibrating.') },
    ],
  },
  {
    id: 'w03_q2',
    text: L('Their warmth tends to show up when…'),
    answers: [
      { label: L('Something reminded them of me — no agenda attached'), insight: L('Unprompted warmth with nothing to gain is the honest kind.') },
      { label: L('They need attention, comfort, or an ego refill'), insight: L('Warmth that tracks their needs, not your life, is convenience.') },
      { label: L("They've been distant and seem to feel bad about it"), insight: L('Guilt-warmth after retreat is a war between want and fear.') },
      { label: L("It's always there — I just discount it when I'm anxious"), insight: L('Steady warmth you keep re-testing may already be the answer.') },
    ],
  },
  {
    id: 'w03_q3',
    text: L('When their words and their actions disagree, which way does it usually break?'),
    answers: [
      { label: L('Big sweet words, thin follow-through'), insight: L('When talk outruns behavior, the behavior is the real statement.') },
      { label: L('Few words, but the actions keep showing up'), insight: L('Quiet hands that keep arriving outrank loud sentences.') },
      { label: L('Both flip depending on the week'), insight: L('Channels that alternate together point to a conflict inside them.') },
      { label: L("They rarely disagree — I go looking for gaps"), insight: L('Hunting for contradictions in a consistent person is the static talking.') },
    ],
  },
  {
    id: 'w03_q4',
    text: L('What does the reunion after a cold stretch feel like?'),
    answers: [
      { label: L('A flood of intensity that hooks me all over again'), insight: L('A rush that erases the silence is the slot machine paying out.') },
      { label: L('Genuinely sorry — like they lost the fight with themselves'), insight: L('Remorse after retreat is fear apologizing for winning a round.') },
      { label: L('Warm and real — they close the gap, and it stays closed'), insight: L('A repair that holds is a yes rebuilding its own bridge.') },
      { label: L("There are no real cold stretches — just normal life gaps"), insight: L('If the "cold stretch" is a weekend, the drama may be internal.') },
    ],
  },
  {
    id: 'w03_q5',
    text: L('Be honest: what would a neutral friend say after seeing the raw facts?'),
    answers: [
      { label: L('"This person clearly likes you — relax"'), insight: L('When the outside view reads warm, believe the data over the alarm.') },
      { label: L('"They\'re into you but something is holding them back"'), insight: L('Outside eyes can see a want-versus-fear tug you feel as chaos.') },
      { label: L('"They\'re keeping you exactly where it benefits them"'), insight: L('A neutral read of convenient ambiguity is hard evidence.') },
      { label: L('"The problem isn\'t them — it\'s how you spiral between texts"'), insight: L('Sometimes the kindest outside view points the lens back gently.') },
    ],
  },
  {
    id: 'w03_q6',
    text: L('What happens when you reach for definition — even lightly?'),
    answers: [
      { label: L('They meet it — nervous maybe, but they engage'), insight: L('Engaging the question, even scared, is someone leaning yes.') },
      { label: L('They freeze up or need time, but they don\'t run'), insight: L('Fear that stays in the room is conflict, not rejection.') },
      { label: L('Jokes, subject changes, "why do we need labels"'), insight: L('Deflecting definition on schedule is the gray defending itself.') },
      { label: L("I've never actually asked — I keep decoding instead"), insight: L('A question never asked keeps the noise alive on your side too.') },
    ],
  },
  {
    id: 'w03_q7',
    text: L('If you had to bet everything on one reading of them, which is it?'),
    answers: [
      { label: L('They want this — the mess is just hesitation'), insight: L('When the gut bets yes under the noise, it has usually counted the evidence.') },
      { label: L('They want it AND fear it, and both are real'), insight: L('Two true things at war explains every flip you have seen.') },
      { label: L('They want the attention more than they want me'), insight: L('Betting on the access-not-the-role reading takes courage — and clears the fog.') },
      { label: L("They're fine — it's my anxiety writing the story"), insight: L('Owning the static is not defeat; it is the first accurate reading.') },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w03Week: WeeklyTheme = {
  id: 'w03_mixed_signals',
  title: L('Mixed Signals'),
  category: 'love',
  resultPrompt: L('What is their contradictory behavior actually telling you?'),
  days: [
    { articleId: 'w03_a1', questionId: 'w03_q1' },
    { articleId: 'w03_a2', questionId: 'w03_q2' },
    { articleId: 'w03_a3', questionId: 'w03_q3' },
    { articleId: 'w03_a4', questionId: 'w03_q4' },
    { articleId: 'w03_a5', questionId: 'w03_q5' },
    { articleId: 'w03_a6', questionId: 'w03_q6' },
    { articleId: 'w03_a7', questionId: 'w03_q7' },
  ],
  outcomes: [
    {
      key: 'leaning_yes',
      title: L('Quietly Leaning Yes'),
      body: L("Strip away the noise and the signal underneath leans one way: toward you. The warmth is unprompted, the actions keep arriving, and when you reach for definition they stay in the room. What read as \"mixed\" was mostly ordinary human weather over a real yes. Stop re-testing it — and maybe be the one who says the clear thing first."),
      shareLine: L('Under the mixed signals, a quiet yes.'),
    },
    {
      key: 'torn_inside',
      title: L('Torn Inside'),
      body: L("Both things you've felt are real: they want this, and something in them is terrified of it. The heat is the want; the cold is the fear winning that week. That's a war inside them — one you can have compassion for, but not one you can fight on their behalf. Decide how long you can love someone at the pace of their fear, and let that be YOUR clear answer."),
      shareLine: L('They want it and fear it — both are true.'),
    },
    {
      key: 'comfortable_gray',
      title: L('Comfortable in the Gray'),
      body: L("The hardest verdict, said kindly: the ambiguity isn't confusion — it's comfortable. You've been kept warm enough to stay and undefined enough to owe nothing, and every reach for clarity got charmed away. They may genuinely like you; that was never the question. They like the access more than they want the role. The gray is the answer, and you're free to stop living in it."),
      shareLine: L('Warm enough to stay, vague enough to owe nothing.'),
    },
    {
      key: 'your_static',
      title: L('The Static Is Yours'),
      body: L("Here's the plot twist, offered gently: the signals were mostly steady — the mixing happened in the space between texts, where your alarm system writes its scariest drafts. That alarm got sensitive for real, historical reasons; this isn't blame. But no amount of decoding THEM will quiet a noise that's coming from inside. Calibrate the instrument, ask instead of archive — the steadiness you're looking for may already be here."),
      shareLine: L('Sometimes the mixed signal is the reader.'),
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Order rotated per question.
  answerOutcomes: {
    w03_q1: ['leaning_yes', 'torn_inside', 'comfortable_gray', 'your_static'],
    w03_q2: ['leaning_yes', 'comfortable_gray', 'torn_inside', 'your_static'],
    w03_q3: ['comfortable_gray', 'leaning_yes', 'torn_inside', 'your_static'],
    w03_q4: ['comfortable_gray', 'torn_inside', 'leaning_yes', 'your_static'],
    w03_q5: ['leaning_yes', 'torn_inside', 'comfortable_gray', 'your_static'],
    w03_q6: ['leaning_yes', 'torn_inside', 'comfortable_gray', 'your_static'],
    w03_q7: ['leaning_yes', 'torn_inside', 'comfortable_gray', 'your_static'],
  },
};
