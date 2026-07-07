/**
 * AURAFY — WEEK 5 CONTENT  ·  "Situationships"  ·  category: love  ·  module: who_soulmate
 * Authored via the aurafy-week-generator skill. EN-first; fr/ar/es stubbed = en via L() until translated.
 *
 * Measures: where is your undefined thing really headed?
 * 4 outcomes: becoming_real · stalled_limbo · youre_the_option · placeholder
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w05_a1 … w05_a7.
 *  - Append `w05Articles` to ARTICLES (src/content/articles/index.ts), after ...w04Articles.
 *  - Merge `w05ArticlesEn` into content.en.ts. FR/AR/ES ride the getArticleContent EN-fallback.
 *  - Append `w05Questions` to the daily-question pool (src/data/dailyQuestions.ts), after ...w04Questions.
 *  - Push `w05Week` into WEEKS (src/data/weeks/index.ts), AFTER w04Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { LocalizedString } from '../../types';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

const L = (en: string): LocalizedString => ({ en, fr: en, ar: en, es: en });

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w05Articles: Article[] = [
  { id: 'w05_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-03' },
  { id: 'w05_a2', category: 'love', readMinutes: 4, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-04' },
  { id: 'w05_a3', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-05' },
  { id: 'w05_a4', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-06' },
  { id: 'w05_a5', category: 'love', readMinutes: 4, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-07' },
  { id: 'w05_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-08' },
  { id: 'w05_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-09' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */

export const w05ArticlesEn: Record<string, ArticleContent> = {
  w05_a1: {
    title: 'The Situationship Decoder',
    subtitle: 'A relationship in everything but name — or in nothing but hope?',
    blocks: [
      { type: 'paragraph', text: "A situationship is what happens when two people act like a couple without agreeing to be one. There's intimacy, routine, sometimes months of history — and a strange, load-bearing silence around the word \"us.\" The confusion isn't a flaw in you. It's the whole design: an undefined thing can't disappoint you the way a defined one can, which is exactly why some people prefer to leave it undefined." },
      { type: 'heading', text: 'The two kinds of undefined' },
      { type: 'paragraph', text: "There's the situationship that's undefined because it's EARLY — two people genuinely still finding out, moving toward something, just not there yet. And there's the situationship that's undefined because staying undefined is the point — one or both people getting relationship benefits while dodging relationship risk. From inside, on any given Tuesday, they can feel identical. The difference only shows up over time, in direction." },
      { type: 'paragraph', text: "So this week doesn't ask \"are we official?\" It asks a better question: which way is this thing MOVING? Toward more definition, more integration, more future — or in a comfortable circle that never gets anywhere? By Friday you'll be able to tell the two apart, which is the one thing a situationship is built to keep you from doing." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Ambiguity itself lowers perceived risk and accountability — which is why relationship stage matters less than trajectory. Direction over time is the reliable signal an undefined status is designed to obscure.' },
    ],
  },
  w05_a2: {
    title: 'Almost-Relationships and the Art of Not Naming Things',
    subtitle: 'Why the word "us" gets so carefully avoided',
    blocks: [
      { type: 'paragraph', text: "Naming a thing makes it real. That's not just poetry — it's why some people go to remarkable lengths to avoid the naming. Once you call it a relationship, expectations attach: exclusivity, effort, the right to be disappointed. Some people avoid the word not because they're unsure of their feelings, but because they're very sure they don't want the obligations the word brings." },
      { type: 'paragraph', text: "Watch how the un-naming is maintained. The subtle swerve when a conversation drifts toward \"what are we.\" The introductions that stay vague — \"this is [name],\" never a title. The way plans exist but only ever short-range. None of it is accidental. Each swerve is a small act of keeping the door propped open, keeping options unclosed, keeping you present but unpromised." },
      { type: 'quote', text: 'A thing that refuses to be named is often telling you its name by refusing.', attribution: 'On the un-naming' },
      { type: 'paragraph', text: "One fairness clause: early on, some people avoid labels out of genuine care — they don't want to rush a good thing into a premature box. The tell is whether the avoidance RESOLVES. Healthy label-caution has a horizon; it eases as trust builds. Strategic un-naming never resolves, because resolution was never the goal." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Defining a relationship activates commitment norms and accountability. Persistent, active avoidance of definition — versus early, resolving caution — is a documented marker of low commitment intent.' },
    ],
  },
  w05_a3: {
    title: 'Why "We\'re Just Seeing Where It Goes" Usually Goes Nowhere',
    subtitle: 'The most comfortable sentence in modern dating',
    blocks: [
      { type: 'paragraph', text: "\"Let's just see where it goes\" sounds open, relaxed, wise even — why force it? But listen to the grammar. It puts the relationship in the passive voice, as if it were weather that might happen TO you both rather than something two people steer. And things left to \"see where they go\" have a strong tendency to go exactly where they already are." },
      { type: 'heading', text: 'Drift is not a direction' },
      { type: 'paragraph', text: "Relationships that deepen do so because someone chooses to deepen them — makes the plan, has the talk, takes the small risk of wanting out loud. \"Seeing where it goes\" is often a polite way of declining to make those choices while still enjoying the results. It's not neutral. It's a decision to not-decide, dressed up as easygoingness." },
      { type: 'paragraph', text: "Here's the test that cuts through it: has it actually gone anywhere? Compare the thing today to the thing three months ago. More defined, more woven into each other's real lives, more future in the conversation? Then it's genuinely going somewhere. Exactly the same, just older? Then \"seeing where it goes\" was never a journey — it was a parking spot with a nice view." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Relationship escalation is driven by deliberate investment behaviors, not passive time. Without active deepening, connections tend to plateau at their current level — "drift" reliably preserves the status quo rather than advancing it.' },
    ],
  },
  w05_a4: {
    title: 'The Cost of Staying Undefined',
    subtitle: 'The bill for the comfortable gray comes due — quietly',
    blocks: [
      { type: 'paragraph', text: "Situationships feel low-cost because the biggest expenses are hidden. There's no breakup to survive, no title to defend — so it seems like you're getting connection at a discount. But the real price is charged elsewhere, in a currency you don't notice leaving your account until a lot of it is gone: time, opportunity, and self-trust." },
      { type: 'heading', text: 'What you actually pay' },
      { type: 'orderedList', items: [
        { title: 'Time', text: 'Months, sometimes years, of prime emotional energy poured into something structurally incapable of growing. That time doesn\'t come back.' },
        { title: 'Opportunity', text: 'The people you didn\'t meet, didn\'t let in, because you were emotionally occupied by an almost. Availability spent isn\'t availability saved.' },
        { title: 'Self-trust', text: 'The slow erosion of knowing your own worth, because you kept accepting less than you wanted and calling it chill. That one costs the most to rebuild.' },
      ] },
      { type: 'paragraph', text: "The undefined thing markets itself as freedom — no strings, no pressure. But look closely and it's often the least free arrangement of all: you're attached, you're unavailable to others, and you're getting none of the security that's supposed to come with attachment. That's not freedom. That's paying full emotional price for a partial emotional product." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Prolonged ambiguous relationships are consistently linked to lower wellbeing and higher distress than either clear commitment or clear singleness — the uncertainty itself, and the opportunity cost it hides, are the mechanism.' },
    ],
  },
  w05_a5: {
    title: 'Breadcrumbs: Recognizing the Bare Minimum',
    subtitle: 'When just enough is engineered to keep you there',
    blocks: [
      { type: 'paragraph', text: "Breadcrumbing is the art of giving someone just enough to stay, and never enough to arrive. A text right when you're about to give up. A burst of warmth that resets the clock. Enough contact to keep hope alive, calibrated — consciously or not — to never cross into actual commitment. If you've ever felt starved inside something that technically \"exists,\" you've eaten breadcrumbs." },
      { type: 'heading', text: 'The pattern of the crumb' },
      { type: 'paragraph', text: "The signature is timing. Breadcrumbs arrive not when you're happy and secure, but precisely when you're pulling away. The system has a sensor for your exit, and it deploys just enough warmth to reel you back to the same starving spot. Notice: after the crumb, does anything actually change? Or do you get one good day and then slide right back to the drought? A real connection feeds you. A breadcrumb operation manages you." },
      { type: 'paragraph', text: "The cruelest part is what it does to your calibration. Starve a person long enough and a crumb feels like a feast — you become grateful for scraps you'd have been insulted by at the start. If you're celebrating a text back like it's a milestone, step back and ask what the milestone actually was. The bare minimum should never feel like a gift." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Intermittent minimal reinforcement — small rewards timed to prevent exit — produces strong, persistent attachment while suppressing escalation. The crumb\'s timing around your withdrawal is its diagnostic fingerprint.' },
    ],
  },
  w05_a6: {
    title: "When You're a Placeholder and Don't Know It",
    subtitle: 'The role you were cast in without an audition',
    blocks: [
      { type: 'paragraph', text: "Some situationships aren't undefined because someone is scared or slow. They're undefined because you're holding a place — keeping someone company, meeting their needs, filling the gap — until the person they're actually waiting for arrives, or until something \"better\" does. The hard part is that placeholders are often treated warmly. Warmth is what keeps the placeholder in place." },
      { type: 'heading', text: 'The signs you\'re holding a seat' },
      { type: 'paragraph', text: "You exist in their private life but not their public one — no friends, no family, no posts, no future tense. Plans are always short-horizon; anything past a few weeks gets vague. There's an ex who's never quite closed, or a \"someday when things are different.\" And when you push toward more, the answer is never no — it's \"not yet,\" a not-yet with no conditions that would ever turn it into a yes. You're not being rejected. You're being reserved." },
      { type: 'paragraph', text: "This is painful precisely because the feelings can be real on their side — placeholders often get genuine affection. But affection isn't the question. The question is whether you're the destination or the waiting room. And a waiting room, however comfortable, is a place people intend to leave." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Being kept as a low-investment "backup" while a partner retains higher-value options is documented in research on relationship alternatives. Public exclusion plus perpetual "not yet" is the behavioral signature.' },
    ],
  },
  w05_a7: {
    title: 'How to Define the Thing Without Ending It',
    subtitle: 'The conversation you\'ve been avoiding is the one that frees you',
    blocks: [
      { type: 'paragraph', text: "The great fear that keeps situationships alive: if I ask what this is, I'll ruin it. So you don't ask, and the not-asking becomes its own slow ruin. Here's the reframe — the define-the-relationship conversation doesn't end good things. It ends UNCERTAIN things, which is a mercy either way: you either gain a real relationship or you stop pouring yourself into a mirage." },
      { type: 'heading', text: 'How to have it cleanly' },
      { type: 'paragraph', text: "No ultimatum, no ambush, no three-page text. Pick a calm moment and speak from your own side: \"I've really liked this, and I've realized I want something with a bit more clarity. I'm not trying to trap you — I just want to know if we're moving toward the same thing.\" Then hold the silence and let them answer. The exact words matter less than the discipline that follows: you have to actually LISTEN to the answer, including the ones you don't want." },
      { type: 'paragraph', text: "Because every response is a gift of information. Relief and a yes — beautiful, you were building something real. Panic, deflection, \"why do we have to label it\" — that's an answer too, just a quieter one. And \"not yet\" with no conditions is the clearest answer of all. You didn't ruin anything by asking. You just found out what you were actually in — which is the only ground solid enough to stand on." },
      { type: 'quote', text: "The talk doesn't kill real things. It only kills the ones that were never alive.", attribution: 'On defining it' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Direct definition conversations resolve uncertainty far more reliably than continued signal-reading, and the response to a calm, non-coercive bid for clarity is itself one of the strongest available indicators of commitment.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w05Questions: DailyQuestion[] = [
  {
    id: 'w05_q1',
    text: L('Compare this thing today to three months ago. What changed?'),
    answers: [
      { label: L('More defined, more woven into real life'), insight: L('A thing that keeps deepening is a thing that\'s actually going somewhere.') },
      { label: L('Exactly the same, just older'), insight: L('Same-but-older isn\'t a journey; it\'s a parking spot with a view.') },
      { label: L('They warm up whenever I start to leave, then it resets'), insight: L('Progress that only appears when you exit is a leash, not movement.') },
      { label: L('I\'m more invested; they\'re exactly where they started'), insight: L('When only one side deepens, the other side already chose their level.') },
    ],
  },
  {
    id: 'w05_q2',
    text: L('What happens when the word "us" comes near the conversation?'),
    answers: [
      { label: L('We talk about it — nervously, but honestly'), insight: L('Engaging the word, even scared, is someone moving toward you.') },
      { label: L('A smooth swerve — subject changed, every time'), insight: L('A practiced swerve around "us" is the un-naming defending itself.') },
      { label: L('"Why do we need labels?" on schedule'), insight: L('The anti-label speech, right on cue, is a script — not a philosophy.') },
      { label: L('"Not yet" — with no reason it\'d ever become yes'), insight: L('A "not yet" with no conditions is a no wearing softer clothes.') },
    ],
  },
  {
    id: 'w05_q3',
    text: L('Where do you exist in their world?'),
    answers: [
      { label: L('Everywhere — friends, family, future plans'), insight: L('Being woven into the public life is being treated as real.') },
      { label: L('Nowhere new lately — we\'ve plateaued where we started'), insight: L('A private thing that stopped moving is parked, not building.') },
      { label: L('Only in private — no posts, no people, no future tense'), insight: L('Kept out of the public life is often kept as a placeholder.') },
      { label: L('In the gaps — when their "better" option isn\'t around'), insight: L('Existing in someone\'s gaps is a circle that never closes.') },
    ],
  },
  {
    id: 'w05_q4',
    text: L('How far ahead can the two of you actually plan?'),
    answers: [
      { label: L('Real future — trips, milestones, next year'), insight: L('A shared long horizon is a relationship in everything but paperwork.') },
      { label: L('Plans exist — but they cancel the moment something better calls'), insight: L('Plans that lose to a better offer show whose priority you are.') },
      { label: L('This weekend, maybe. It\'s been that way for months.'), insight: L('A horizon frozen short for months is a thing parked, not moving.') },
      { label: L('We don\'t plan — I stay free in case they want me'), insight: L('Staying on standby for someone is the shape of holding a place.') },
    ],
  },
  {
    id: 'w05_q5',
    text: L("When they give you a scrap of attention, how does it land?"),
    answers: [
      { label: L('Like a normal part of something steady'), insight: L('When contact feels ordinary, you\'re being fed, not managed.') },
      { label: L('Warm and building — each one adds to the last'), insight: L('Attention that accumulates is a thing on its way up.') },
      { label: L('It arrives exactly when I\'m about to give up'), insight: L('Warmth timed to your exit is a breadcrumb, not a feeling.') },
      { label: L('Nice, then nothing — same flat line for months'), insight: L('A warm moment that never shifts the pattern is a stall.') },
    ],
  },
  {
    id: 'w05_q6',
    text: L('If you asked "what are we" tomorrow, what would honestly happen?'),
    answers: [
      { label: L('Relief and a yes — I think they\'ve wanted to'), insight: L('A partner who answers with relief was waiting for you to ask.') },
      { label: L('"Why label it? We\'re good as we are" — and nothing shifts'), insight: L('Choosing the label-free status quo keeps the thing parked by choice.') },
      { label: L('Panic, deflection, maybe distance after'), insight: L('Fleeing the question is answering it in the quietest voice.') },
      { label: L('"Let\'s not ruin a good thing" — and nothing moves'), insight: L('Guarding the gray against the question is choosing the parking spot.') },
    ],
  },
  {
    id: 'w05_q7',
    text: L('Strip the hope out of it. What does your gut actually report?'),
    answers: [
      { label: L("We're becoming real — I can feel it building"), insight: L('A gut that feels it building is usually counting real evidence.') },
      { label: L("Stuck — lovely, but going in a circle"), insight: L('Naming the circle is the first step out of it.') },
      { label: L("I'm the option, not the choice"), insight: L('Admitting you\'re the option takes courage — and ends the confusion.') },
      { label: L("I'm holding a place for someone who isn't me"), insight: L('Seeing the waiting room clearly is how you finally leave it.') },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w05Week: WeeklyTheme = {
  id: 'w05_situationships',
  title: L('Situationships'),
  category: 'love',
  resultPrompt: L('Where is your undefined thing really headed?'),
  days: [
    { articleId: 'w05_a1', questionId: 'w05_q1' },
    { articleId: 'w05_a2', questionId: 'w05_q2' },
    { articleId: 'w05_a3', questionId: 'w05_q3' },
    { articleId: 'w05_a4', questionId: 'w05_q4' },
    { articleId: 'w05_a5', questionId: 'w05_q5' },
    { articleId: 'w05_a6', questionId: 'w05_q6' },
    { articleId: 'w05_a7', questionId: 'w05_q7' },
  ],
  outcomes: [
    {
      key: 'becoming_real',
      title: L('Actually Becoming Something'),
      body: L("Good news, and you've earned the confidence to trust it: this one is moving. It's more defined than it was, more woven into real life, and the future tense keeps showing up in the conversation. The lack of a label here reads like early caution, not strategy — the kind that resolves as trust builds. Stop bracing for a trapdoor. And if you want to name it out loud, you'll likely find they were waiting for you to."),
      shareLine: L("Not every undefined thing is a dead end. Some are just early."),
    },
    {
      key: 'stalled_limbo',
      title: L('Stuck in the Comfortable Gray'),
      body: L("Here's the honest read: it's real, it's warm, and it hasn't moved in months. Same shape, just older — a parking spot with a nice view. \"Seeing where it goes\" was never a journey here; it was a decision to not-decide. The gray is comfortable precisely because it costs them nothing and costs you time you keep not counting. One calm, direct \"what are we\" won't ruin it — it'll finally reveal whether there's anything to ruin."),
      shareLine: L('Drift is not a direction. A parking spot is not a journey.'),
    },
    {
      key: 'youre_the_option',
      title: L("You're the Option, Not the Choice"),
      body: L("This stings, so take it gently but take it: you're being fed just enough to stay and never enough to arrive. The warmth arrives right as you're leaving, resets the clock, and then it's back to the drought. That's not a connection with bad timing — it's a pattern with a sensor for your exit. You've been getting so little that scraps started to feel like milestones. They don't get to keep you starving and call it chill. You're allowed to want a full plate."),
      shareLine: L('The bare minimum should never feel like a gift.'),
    },
    {
      key: 'placeholder',
      title: L("You're Holding a Place"),
      body: L("The hardest verdict of the week, said with care: you're keeping a seat warm for someone who isn't you. You live in their private life but never the public one; every plan is short-range; the answer to \"more\" is a \"not yet\" with no conditions that could ever turn into yes. The affection may be genuine — placeholders often get real warmth. But warmth isn't the question. A waiting room is a place people intend to leave, and you deserve to be the destination, not the wait."),
      shareLine: L("A waiting room is comfortable. It's still a place people leave."),
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Order rotated per question.
  answerOutcomes: {
    w05_q1: ['becoming_real', 'stalled_limbo', 'youre_the_option', 'placeholder'],
    w05_q2: ['becoming_real', 'stalled_limbo', 'youre_the_option', 'placeholder'],
    w05_q3: ['becoming_real', 'stalled_limbo', 'placeholder', 'youre_the_option'],
    w05_q4: ['becoming_real', 'youre_the_option', 'stalled_limbo', 'placeholder'],
    w05_q5: ['stalled_limbo', 'becoming_real', 'youre_the_option', 'placeholder'],
    w05_q6: ['becoming_real', 'stalled_limbo', 'youre_the_option', 'placeholder'],
    w05_q7: ['becoming_real', 'stalled_limbo', 'youre_the_option', 'placeholder'],
  },
};
