/**
 * AURAFY — WEEK 1 CONTENT  ·  "Secret Signs of Love"  ·  category: love  ·  module: who_loves_me
 * Authored via the aurafy-week-generator skill. EN-first; fr/ar/es stubbed = en via L() until translated.
 *
 * Measures: how clearly is someone showing they love you?
 * 4 outcomes: clearly_loved · quietly_cared · mixed_signals · reading_into_it
 *
 * INTEGRATION (Claude Code):
 *  - Day 1 reuses the EXISTING article id 'ten_signs_secret_love' (already in ARTICLES + content.en.ts) —
 *    do NOT recreate it. Days 2–7 are the new articles below.
 *  - Append `w01Articles` to the ARTICLES array (src/content/articles/index.ts).
 *  - Merge `w01ArticlesEn` into the EN content map (src/content/articles/content.en.ts). FR/AR/ES use the
 *    existing getArticleContent EN-fallback — no stubs needed for article bodies.
 *  - Append `w01Questions` to the daily-question pool (src/data/dailyQuestions.ts).
 *  - Push `w01Week` into WEEKS (src/data/weeks/index.ts) and run validateWeek().
 *  - `L()` is a local stub helper; reuse it or inline {en,fr,ar,es} per your conventions.
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { LocalizedString } from '../../types';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

/** Locale stub: write EN, mirror into fr/ar/es until real translations land (fallback renders cleanly). */
const L = (en: string): LocalizedString => ({ en, fr: en, ar: en, es: en });

/* ───────────────────────── ARTICLES (metadata) — Days 2–7 ───────────────────────── */

export const w01Articles: Article[] = [
  { id: 'w01_a2', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-07' },
  { id: 'w01_a3', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-08' },
  { id: 'w01_a4', category: 'love', readMinutes: 6, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-09' },
  { id: 'w01_a5', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-10' },
  { id: 'w01_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-11' },
  { id: 'w01_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-07-12' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 2–7 ───────────────────────── */

export const w01ArticlesEn: Record<string, ArticleContent> = {
  w01_a2: {
    title: "The Things People Do When They Can't Say \"I Love You\"",
    subtitle: 'When the words are stuck, the hands keep talking',
    blocks: [
      { type: 'paragraph', text: "Not everyone can say it. For some people the three words sit behind a lifetime of reasons not to risk them — pride, fear, a childhood where affection was rationed. So the love finds another door. It comes out as the charged phone you didn't ask them to charge, the seat they save without mentioning it, the way they suddenly know your coffee order." },
      { type: 'heading', text: 'Love that travels in disguise' },
      { type: 'paragraph', text: "Watch for the gestures that cost them something — time, effort, a little of their comfort. A person who drives across town to fix your one broken thing is saying it. A person who stays on the phone while you fall asleep is saying it. The words are just the caption; these are the photograph." },
      { type: 'paragraph', text: "The tell is consistency. Anyone can do a kind thing once. The ones who love you do the small, unglamorous things again and again, when no one is watching and there is nothing to win." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Psychologists call these instrumental expressions of love — care shown through action rather than declaration. They draw on relational psychology, not astrology: observable, repeatable, and very human.' },
    ],
  },
  w01_a3: {
    title: 'Why Real Love Hides in Small, Boring Gestures',
    subtitle: 'The unromantic proof that outlasts the romantic kind',
    blocks: [
      { type: 'paragraph', text: "Grand gestures are easy to perform and easy to fake. The flowers, the speech, the surprise — they photograph beautifully and ask very little of the person making them. Real love tends to live somewhere far less cinematic: in the refilled water glass, the topped-up tank, the text that just says \"home safe?\"" },
      { type: 'paragraph', text: "These gestures are boring on purpose. They are love stripped of performance — nobody is applauding, nobody is even meant to notice. That is exactly what makes them honest. A person doing the dull, repeating work of caring for you has no audience and no motive except you." },
      { type: 'quote', text: "You can tell who loves you by what they do when there's no story in it for them.", attribution: 'On ordinary devotion' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Consistency of low-cost, repeated care predicts relationship security far better than occasional grand gestures — a finding from relational research, not the stars.' },
    ],
  },
  w01_a4: {
    title: "Bids for Connection: The Tiny Tests You're Always Passing or Failing",
    subtitle: "The micro-moments that quietly decide a relationship",
    blocks: [
      { type: 'paragraph', text: "All day long, people throw small lines toward the ones they love. \"Look at that sky.\" \"I had the weirdest dream.\" \"Did you see this?\" Each one is a bid — a tiny invitation that means: notice me, be with me for a second. They almost never look like a big deal. They are." },
      { type: 'heading', text: 'Turning toward, away, or against' },
      { type: 'orderedList', items: [
        { title: 'Turning toward', text: "They answer the bid — they look, they ask, they engage. This is the quiet yes that builds trust drop by drop." },
        { title: 'Turning away', text: "They miss it or ignore it — not cruelly, just absently. A few of these are nothing. A pattern of them is erosion." },
        { title: 'Turning against', text: "They snap or dismiss. Rare, but corrosive, because the person learns to stop reaching." },
      ] },
      { type: 'paragraph', text: "If someone turns toward your smallest bids — the dumb joke, the half-thought — they are choosing you in a language older than words. Watch how often they say yes to your nothings." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'The "bids for connection" framework comes from decades of observational relationship science: how often partners turn toward each other strongly predicts whether a bond lasts.' },
    ],
  },
  w01_a5: {
    title: 'When Someone Remembers What You Forgot You Said',
    subtitle: 'Memory is just attention with a longer shelf life',
    blocks: [
      { type: 'paragraph', text: "You mentioned it once, months ago, in passing — the book you wanted, the food you can't eat, the name of the dog you had as a kid. You forgot you ever said it. They didn't. And when it resurfaces in something they do, you feel a small, startling warmth: they were listening more closely than you knew." },
      { type: 'paragraph', text: "Memory like this isn't a trick of a good brain. It's attention. We remember what we care about. When someone holds onto your offhand details, they are telling you where their focus has quietly been pointed all along — at you." },
      { type: 'paragraph', text: "It's also one of the hardest signs to fake, because it can't be produced on demand. It only exists if the listening already happened, weeks ago, when nothing was at stake." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Attention drives encoding — we retain what we deem important. Remembering your trivial details is observable evidence of sustained attention, grounded in cognitive and relational psychology.' },
    ],
  },
  w01_a6: {
    title: 'The Body Speaks First: Posture, Distance, and Desire',
    subtitle: 'What people say before they say anything',
    blocks: [
      { type: 'paragraph', text: "Long before a word is chosen, the body has already answered. Where someone points their feet, how close they drift, whether they lean in or hold their ground — people broadcast interest in a language they don't know they're speaking, and can't easily lie in." },
      { type: 'heading', text: 'The honest channel' },
      { type: 'paragraph', text: "Watch for the small, involuntary tells: the angle of their shoulders turning to face you, the way distance shrinks when you talk, the mirroring of your gestures without either of you noticing. We unconsciously copy the people we feel close to — synchronized movement is closeness made visible." },
      { type: 'paragraph', text: "None of these is proof on its own. But the body rarely contradicts itself for long. When the posture, the proximity, and the eye contact all say the same thing, believe them before you believe the words." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Nonverbal synchrony and orientation are well-documented markers of rapport and attraction in psychology — patterns you can watch for, not fortune-telling.' },
    ],
  },
  w01_a7: {
    title: 'How to Tell Attention From Affection',
    subtitle: 'Being seen and being loved are not the same thing',
    blocks: [
      { type: 'paragraph', text: "Some people are wonderful at attention. They make you feel like the only person in the room — bright, curious, fully there. It's intoxicating, and it's easy to mistake for love. But attention can be a habit, a charm, a way of moving through the world. Affection is something else: attention that keeps showing up after the room empties." },
      { type: 'heading', text: 'The difference is the follow-through' },
      { type: 'paragraph', text: "Attention is the spotlight; affection is the staying. Ask not how someone makes you feel in the moment, but what they do the next day, and the day after. Do they remember? Do they return? Does the warmth survive distance and inconvenience? Affection is attention that has decided to be loyal." },
      { type: 'paragraph', text: "This is the kindest thing you can learn to read, because it protects you from charming people who feel like love and aren't — and helps you notice the quieter people whose affection doesn't dazzle, but doesn't leave." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Consistency over time is what separates genuine attachment from momentary engagement — a distinction drawn from relational psychology, observable in behavior rather than read from the stars.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w01Questions: DailyQuestion[] = [
  {
    id: 'w01_q1',
    text: L('When they talk to you, where does their attention go?'),
    answers: [
      { label: L('Fully on me, every time'), insight: L('Undivided attention is the rarest tell of all.') },
      { label: L('Warm, but a little guarded'), insight: L("Care that hasn't quite found its courage yet.") },
      { label: L('Hot one day, distant the next'), insight: L('Inconsistency usually means a fight going on inside them.') },
      { label: L("Honestly, I'm guessing"), insight: L("When you have to guess, you're reading hope, not signal.") },
    ],
  },
  {
    id: 'w01_q2',
    text: L('Do they remember the small things you mention in passing?'),
    answers: [
      { label: L('Quietly — it shows up later'), insight: L('Memory is attention with a longer shelf life.') },
      { label: L('Always, in detail'), insight: L('Remembering your trivia is love doing its quiet homework.') },
      { label: L("Not really that I've noticed"), insight: L("If nothing lands, the listening may not be happening yet.") },
      { label: L('Only when it benefits them'), insight: L('Selective memory points to selective interest.') },
    ],
  },
  {
    id: 'w01_q3',
    text: L('When something matters to you, do they show up?'),
    answers: [
      { label: L('Every time, no asking'), insight: L('Showing up unprompted is devotion you can set your watch by.') },
      { label: L('Sometimes — it depends on their mood'), insight: L('Conditional presence is a mixed signal wearing kindness.') },
      { label: L('Quietly, without making it a thing'), insight: L('Understated reliability is its own love language.') },
      { label: L("I haven't really seen it tested"), insight: L("Untested care is a hope, not yet a pattern.") },
    ],
  },
  {
    id: 'w01_q4',
    text: L('Who reaches out first, more often?'),
    answers: [
      { label: L('It swings back and forth unpredictably'), insight: L('Push-pull keeps you guessing — and that is the signal.') },
      { label: L('They do, consistently'), insight: L('Consistent initiation is someone choosing you on purpose.') },
      { label: L("Mostly me, if I'm honest"), insight: L('When you carry the whole bridge, check who else is building.') },
      { label: L('Rarely, but warmly when they do'), insight: L('Low frequency, high warmth — care that is shy, not absent.') },
    ],
  },
  {
    id: 'w01_q5',
    text: L('How does their body act when you are near?',),
    answers: [
      { label: L('They drift a little closer, quietly'), insight: L('Shrinking distance is the body saying yes before the mouth does.') },
      { label: L("I can't really tell"), insight: L("If the body gives you nothing, you may be filling in the blanks.") },
      { label: L('Open, turned toward me, every time'), insight: L('Orientation and openness are rapport made visible.') },
      { label: L('Closed off some days, warm on others'), insight: L('A body that keeps changing its mind is telling you something true.') },
    ],
  },
  {
    id: 'w01_q6',
    text: L('Do their words and their actions agree?'),
    answers: [
      { label: L('I mostly go on words — actions are thin'), insight: L('When you only have words, you are reading promise, not proof.') },
      { label: L('They say sweet things, then go quiet'), insight: L('A gap between words and follow-through is the classic mixed signal.') },
      { label: L('Few words, but the actions are steady'), insight: L('Quiet hands that keep showing up outrank loud sentences.') },
      { label: L('Both line up, again and again'), insight: L('When words and actions agree over time, believe them.') },
    ],
  },
  {
    id: 'w01_q7',
    text: L('How do you feel in the day or two after you see them?'),
    answers: [
      { label: L('Settled and sure'), insight: L('Calm certainty is what secure affection leaves behind.') },
      { label: L('Warm, but wishing I knew more'), insight: L('Warmth with a question mark is care still finding its voice.') },
      { label: L('Anxious, replaying everything'), insight: L('When you have to decode it afterward, the signal was unclear.') },
      { label: L('Up, then down, then unsure'), insight: L('An emotional rollercoaster usually means the signals were mixed.') },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w01Week: WeeklyTheme = {
  id: 'w01_secret_signs_of_love',
  title: L('Secret Signs of Love'),
  category: 'love',
  resultPrompt: L('How clearly is someone showing they love you?'),
  days: [
    { articleId: 'ten_signs_secret_love', questionId: 'w01_q1' }, // Day 1 = existing flagship article
    { articleId: 'w01_a2', questionId: 'w01_q2' },
    { articleId: 'w01_a3', questionId: 'w01_q3' },
    { articleId: 'w01_a4', questionId: 'w01_q4' },
    { articleId: 'w01_a5', questionId: 'w01_q5' },
    { articleId: 'w01_a6', questionId: 'w01_q6' },
    { articleId: 'w01_a7', questionId: 'w01_q7' },
  ],
  outcomes: [
    {
      key: 'clearly_loved',
      title: L('Clearly Loved'),
      body: L("The signs aren't subtle once you stop second-guessing them. This person shows up, remembers, and turns toward you again and again — the quiet, repeating proof that someone has chosen you. You're not imagining the warmth. You're reading it correctly."),
      shareLine: L("The signs aren't subtle — they're just quiet."),
    },
    {
      key: 'quietly_cared',
      title: L('Quietly Cared For'),
      body: L("There is real care here, but it speaks softly. This is love that hasn't fully found its voice yet — warm in the actions, shy in the words. Don't mistake the quiet for absence. Some of the deepest affection is the kind that hasn't learned how to announce itself."),
      shareLine: L('Some love is just shy, not small.'),
    },
    {
      key: 'mixed_signals',
      title: L('Mixed Signals'),
      body: L("Hot then cold, present then gone — the inconsistency you're feeling is real, not paranoia. Often it means a genuine pull fighting with a genuine fear inside them. That's their work to resolve, not yours to decode forever. Watch the pattern, and let actions outweigh words."),
      shareLine: L('Hot and cold is still an answer.'),
    },
    {
      key: 'reading_into_it',
      title: L('Reading Into It'),
      body: L("Be gentle with yourself here: most of what you're holding is hope, not evidence. The signals are thin, and a longing heart fills in the blanks with what it wishes were true. That doesn't make you foolish — it makes you human. But the proof isn't there yet."),
      shareLine: L('Sometimes the heart reads hope as signal.'),
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Order rotated per question.
  answerOutcomes: {
    w01_q1: ['clearly_loved', 'quietly_cared', 'mixed_signals', 'reading_into_it'],
    w01_q2: ['quietly_cared', 'clearly_loved', 'reading_into_it', 'mixed_signals'],
    w01_q3: ['clearly_loved', 'mixed_signals', 'quietly_cared', 'reading_into_it'],
    w01_q4: ['mixed_signals', 'clearly_loved', 'reading_into_it', 'quietly_cared'],
    w01_q5: ['quietly_cared', 'reading_into_it', 'clearly_loved', 'mixed_signals'],
    w01_q6: ['reading_into_it', 'mixed_signals', 'quietly_cared', 'clearly_loved'],
    w01_q7: ['clearly_loved', 'quietly_cared', 'reading_into_it', 'mixed_signals'],
  },
};
