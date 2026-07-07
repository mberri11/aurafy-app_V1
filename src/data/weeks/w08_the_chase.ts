/**
 * AURAFY — WEEK 8 CONTENT  ·  "The Chase"  ·  category: love  ·  module: who_loves_me
 * Authored via the aurafy-week-generator skill. EN-first; fr/ar/es stubbed = en via L() until translated.
 *
 * Measures: your role in pursuit-and-withdrawal patterns.
 * 4 outcomes: the_pursuer · the_distancer · addicted_chase · balanced_dance
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w08_a1 … w08_a7.
 *  - Append `w08Articles` to ARTICLES (src/content/articles/index.ts), after ...w07Articles.
 *  - Merge `w08ArticlesEn` into content.en.ts. FR/AR/ES ride the getArticleContent EN-fallback.
 *  - Append `w08Questions` to the daily-question pool (src/data/dailyQuestions.ts), after ...w07Questions.
 *  - Push `w08Week` into WEEKS (src/data/weeks/index.ts), AFTER w07Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { LocalizedString } from '../../types';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

const L = (en: string): LocalizedString => ({ en, fr: en, ar: en, es: en });

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w08Articles: Article[] = [
  { id: 'w08_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-24' },
  { id: 'w08_a2', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-25' },
  { id: 'w08_a3', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-26' },
  { id: 'w08_a4', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-27' },
  { id: 'w08_a5', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-28' },
  { id: 'w08_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-29' },
  { id: 'w08_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-30' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */

export const w08ArticlesEn: Record<string, ArticleContent> = {
  w08_a1: {
    title: 'The Psychology of the Chase',
    subtitle: 'Why the pursuit can feel better than the person',
    blocks: [
      { type: 'paragraph', text: "The chase has a logic older than dating apps: pursuit generates a specific, addictive high that steady affection doesn't. When someone is just out of reach, your whole system organizes around closing the gap — focused, alive, a little obsessed. It feels like love, and often it is partly love. But some of what you're feeling isn't about them at all. It's about the gap." },
      { type: 'heading', text: 'The gap is the drug' },
      { type: 'paragraph', text: "Desire feeds on distance. The uncertainty of not-quite-having someone keeps the wanting system firing at full volume, because that system evolved to intensify effort exactly when a reward is close but unsecured. Close the gap — get the person, secure the affection — and the very chemistry that felt like passion quiets down. This is why some people feel wild longing during the chase and a strange flatness the moment they've won." },
      { type: 'paragraph', text: "This week is a mirror, not a lecture. It's not asking who's chasing whom in the abstract — it's asking about YOUR role. Are you the one pursuing? The one creating the distance others chase? Hooked on the chase itself more than any particular person? Or in something rarer, where nobody's running? Knowing your pattern is how you stop repeating it by accident." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'The wanting system intensifies with uncertainty and proximity-to-unsecured-reward, then quiets on attainment. This is why pursuit can feel more activating than the secured relationship — the arousal was partly about the gap, not only the person.' },
    ],
  },
  w08_a2: {
    title: 'Why We Want What Runs From Us',
    subtitle: 'The unavailable are not more valuable — they only feel it',
    blocks: [
      { type: 'paragraph', text: "It's almost embarrassing how reliably it works: the person who wants you plainly becomes slightly less interesting, and the person who keeps you guessing becomes magnetic. This isn't a flaw in your taste. It's a set of predictable biases the mind runs, and naming them takes away most of their power." },
      { type: 'heading', text: 'Three reasons distance dazzles' },
      { type: 'orderedList', items: [
        { title: 'Scarcity', text: 'We assign more value to what\'s hard to get. Availability reads as abundance, and abundance reads — wrongly — as low worth. The unavailable person borrows prestige purely from being unavailable.' },
        { title: 'The projection screen', text: 'Someone who reveals little becomes a blank canvas you paint your ideal onto. You\'re not in love with them; you\'re in love with the version of them you got to invent in the gaps.' },
        { title: 'The challenge', text: 'Winning the reluctant one promises a hit of validation the willing one can\'t. It stops being about connection and becomes about proof.' },
      ] },
      { type: 'paragraph', text: "See the pattern clearly and the spell weakens. The next time someone's distance makes them feel precious, ask the deflating, clarifying question: do I actually like this person — their mind, their kindness, their presence — or do I just like that they're hard to catch? The answers are different, and only one of them is worth chasing." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Scarcity bias, idealized projection onto ambiguous targets, and validation-seeking all inflate the appeal of unavailable people. The perceived value comes from the unavailability itself, not from the person.' },
    ],
  },
  w08_a3: {
    title: 'The Pursuer and the Distancer: A Dance With Steps',
    subtitle: 'The most common pattern in struggling relationships',
    blocks: [
      { type: 'paragraph', text: "Watch enough relationships and one choreography appears again and again: one person pursues — seeks closeness, reassurance, more — and the other distances — pulls back, needs space, goes quiet. The heartbreaking part is that each one's move triggers the other's. The more one chases, the more the other retreats; the more one retreats, the more the other chases. It's a loop that feeds itself." },
      { type: 'heading', text: 'Why the dance locks in' },
      { type: 'paragraph', text: "The pursuer's chasing comes from a real fear of abandonment — closeness soothes them. The distancer's retreating comes from a real fear of engulfment — space soothes them. So they're both trying to feel safe, using opposite strategies, and each strategy is the other's nightmare. The pursuer's reach reads as pressure to the distancer; the distancer's pullback reads as abandonment to the pursuer. Nobody's a villain. Everybody's scared." },
      { type: 'paragraph', text: "The crucial insight: the roles aren't fixed personalities — they're positions in a system, and the dance intensifies both. A person who's secure with one partner can become a desperate pursuer with an extreme distancer, and vice versa. Which means the way out isn't finding your 'true' role; it's noticing the step you keep taking and choosing, just once, to stop taking it — because a dance needs both dancers to continue." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'The pursue-withdraw (or demand-withdraw) pattern is one of the most robustly documented dynamics in relationship research, and it is self-reinforcing: each partner\'s coping behavior triggers the other\'s. The roles are positions in a system, not fixed traits.' },
    ],
  },
  w08_a4: {
    title: 'When Wanting Becomes Winning',
    subtitle: 'The moment love turns into a competition',
    blocks: [
      { type: 'paragraph', text: "There's a line the chase can quietly cross, where it stops being about wanting someone and starts being about winning them. The shift is subtle but total. Wanting is about them — their presence, their warmth, a future together. Winning is about you — your pride, your validation, the unbearable thought of not getting what you set out to get. Same pursuit on the outside; opposite engine underneath." },
      { type: 'heading', text: 'How to tell which one you\'re in' },
      { type: 'paragraph', text: "The test is what happens when you imagine actually getting them. If the fantasy is full of THEM — ordinary days, real closeness, who they are — that's wanting. If the fantasy is mostly the moment of victory, the relief of having won, the proving of something to yourself or others — and it goes strangely blank after that moment — that's winning. Winning fantasies are always about the finish line, because for the competitor the person was never the prize. Being right was." },
      { type: 'paragraph', text: "This matters because winning-driven pursuit is a trap even when it succeeds. Win someone you didn't actually want, and you're now holding a prize that stopped mattering the instant it was secured — which is how people end up leaving relationships they fought desperately to get into. The chase was never about the person. It was about not losing. And you can't build a life on a victory." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'When pursuit is driven by ego and validation rather than genuine desire, attainment collapses the motivation — the "reward" was winning, not the relationship. This predicts the well-documented pattern of losing interest immediately after securing a hard-won partner.' },
    ],
  },
  w08_a5: {
    title: 'The Thrill of the Unavailable',
    subtitle: 'Why safe love can feel like no love at all',
    blocks: [
      { type: 'paragraph', text: "If you've only ever felt intense attraction toward unavailable people — the taken, the distant, the ones who can't fully show up — there's a pattern worth looking at honestly. It's not that you have bad luck. It's that unavailability has become a requirement for your desire to switch on, and available people feel, confusingly, like nothing." },
      { type: 'heading', text: 'Why the unavailable feel safe to want' },
      { type: 'paragraph', text: "Here's the hidden logic: wanting someone who can't fully have you back is actually the SAFEST kind of wanting. You get all the intensity of longing with none of the risk of real intimacy, because real intimacy can't happen — they're unavailable, so you're protected from ever being truly seen, truly close, truly exposed to being hurt at close range. The unavailability isn't a bug in your attraction. For a part of you, it's the entire appeal." },
      { type: 'paragraph', text: "This is why available love can feel flat or even suffocating to someone with this pattern — the absence of the chase removes the very thing that was generating the feeling, and the presence of real closeness triggers the fear the chase was protecting against. If someone steady leaves you cold, the question isn't 'where's the spark?' It's 'am I only able to feel safe wanting people who can't come close?' That's a different question, with a much more hopeful answer." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Chronic attraction to unavailable partners often functions as intimacy avoidance: longing without real exposure. The "thrill" is partly the safety of a connection that cannot actually reach you — which is why available closeness can register as flat or threatening.' },
    ],
  },
  w08_a6: {
    title: 'How to Stop Chasing and Start Attracting',
    subtitle: 'The shift from pursuit to presence',
    blocks: [
      { type: 'paragraph', text: "The advice to 'stop chasing' is everywhere and almost useless, because it's usually delivered as a manipulation tactic — pull back to make them want you, play the game better. That's just chasing in disguise, with the same anxious engine. Real attraction comes from something the tactics can't fake: actually having a life you're not willing to abandon for a maybe." },
      { type: 'heading', text: 'Attraction is a byproduct, not a strategy' },
      { type: 'paragraph', text: "Chasing broadcasts a message underneath the words: your attention is worth more than mine, so I'll pour mine at you and hope. It's not the effort that repels — effort is beautiful when it's mutual — it's the imbalance, the self-abandonment, the visible willingness to accept less. Presence broadcasts the opposite: I'm genuinely interested AND my life is full and good without you, so this is an invitation, not a plea. That's not a trick to withhold warmth. It's the natural result of having a center of gravity that isn't them." },
      { type: 'paragraph', text: "So the real move isn't 'text back slower.' It's 'build a life so engaging that waiting by the phone stops being an option you'd even want.' Pour the pursuit-energy back into your work, your friends, your body, the things that were yours before this person and will be yours after. Attraction follows fullness. And the beautiful side effect: even if this particular person doesn't turn around, you end up with a life instead of a wait." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Attraction responds to perceived value and self-sufficiency, not to withholding tactics. Investment in one\'s own life reliably shifts the dynamic more than any pull-back "game," because it changes the actual signal being sent, not just its timing.' },
    ],
  },
  w08_a7: {
    title: 'What Happens When You Stop Running After Them',
    subtitle: 'The clarity that only arrives when you stand still',
    blocks: [
      { type: 'paragraph', text: "There's a specific terror in stopping the chase: the fear that if you stop running toward them, you'll lose them entirely. And sometimes you will. But that's not the loss it feels like — it's the single most useful piece of information the whole pursuit could ever give you, arriving the moment you finally stop generating the motion yourself." },
      { type: 'heading', text: 'The stillness test' },
      { type: 'paragraph', text: "When you stop chasing, one of two things happens, and both are gifts. Either they move toward you — the space you created let them step forward, and you discover there was something real that your chasing was actually smothering. Or they simply drift away — which reveals that the entire connection was being powered by your effort alone, a one-person relationship you were mistaking for two. You needed to know that. You just couldn't see it while you were the engine keeping it running." },
      { type: 'paragraph', text: "This is the quiet resolution of the whole week. The chase keeps you in motion precisely so you never have to find out what's real — as long as you're running, you can believe the connection is mutual. Standing still is how you finally read the truth. And whatever it shows you, you win: either a real thing that can stand on its own, or your freedom from a mirage you were exhausting yourself to sustain. The people who are yours don't need to be chased. They walk toward you when you stop running." },
      { type: 'quote', text: 'Stop running, and you find out fast who was actually walking beside you.', attribution: 'On standing still' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Removing one\'s own pursuit is diagnostic: it distinguishes a mutual bond from an effort-sustained illusion. What a relationship does when you stop powering it single-handedly is among the clearest available signals of whether it was ever mutual.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w08Questions: DailyQuestion[] = [
  {
    id: 'w08_q1',
    text: L('In the situation on your mind, where do you actually stand?'),
    answers: [
      { label: L("I'm the one reaching, initiating, closing the gap"), insight: L('Being the one who always closes the gap is the pursuer\'s position.') },
      { label: L("I'm the one pulling back while they reach"), insight: L('Being the one who creates the space others chase is the distancer\'s role.') },
      { label: L("I'm hooked on the gap itself more than on them"), insight: L('When the gap thrills you more than the person, you\'re chasing the chase.') },
      { label: L('Neither of us runs — we just meet in the middle'), insight: L('A connection where nobody has to run is the rare balanced one.') },
    ],
  },
  {
    id: 'w08_q2',
    text: L('When someone makes their interest in you totally clear, what happens?'),
    answers: [
      { label: L("I keep reaching anyway — their clarity doesn't cool me"), insight: L('Wanting someone even when they\'re sure of you is desire, not the chase.') },
      { label: L('I lose a little interest — the mystery was the pull'), insight: L('Interest that fades with availability was feeding on the distance.') },
      { label: L('I get bored and start eyeing whoever\'s harder to get'), insight: L('Turning toward the unavailable one is the thrill-of-the-chase pattern.') },
      { label: L("It's welcome — clear interest makes me feel safe, not bored"), insight: L('Feeling safe rather than bored with clarity is a balanced nervous system.') },
    ],
  },
  {
    id: 'w08_q3',
    text: L('When you imagine actually "getting" this person, what fills the fantasy?'),
    answers: [
      { label: L('Ordinary days with them — real closeness, who they are'), insight: L('A fantasy full of them, not the finish line, is genuine wanting.') },
      { label: L('The moment of winning — and then it goes blank'), insight: L('A fantasy that ends at victory means you wanted to win, not to have.') },
      { label: L('The high of finally beating the distance'), insight: L('When the prize is conquering the gap, the person was never the point.') },
      { label: L('A calm, steady life — nothing to win, just to share'), insight: L('Imagining sharing rather than winning is love without the scoreboard.') },
    ],
  },
  {
    id: 'w08_q4',
    text: L('Be honest: do you like THIS person, or that they\'re hard to catch?'),
    answers: [
      { label: L('Them — I\'d want them even if they were easy'), insight: L('Wanting them regardless of difficulty is the person, not the pursuit.') },
      { label: L("Their distance is most of the appeal, if I'm honest"), insight: L('When the distance is the draw, you\'re in love with the gap.') },
      { label: L("The catch — I always want whoever's just out of reach"), insight: L('Always craving the out-of-reach one is unavailability as a requirement.') },
      { label: L('Them, and it happens they\'re available too'), insight: L('Liking a real, reachable person is the ground steady love grows on.') },
    ],
  },
  {
    id: 'w08_q5',
    text: L('Think of your strongest attractions. What did they have in common?'),
    answers: [
      { label: L('Mixed — some available, some not; no clear pattern'), insight: L('No single pattern usually means your desire isn\'t ruled by the chase.') },
      { label: L('I was usually the one wanting more than they did'), insight: L('A history of wanting more than the other is the pursuer\'s recurring seat.') },
      { label: L('Almost all unavailable — taken, distant, unreachable'), insight: L('A pattern of only wanting the unreachable is longing that avoids real closeness.') },
      { label: L('People who could actually show up for me'), insight: L('Being drawn to people who can show up is desire pointed at the reachable.') },
    ],
  },
  {
    id: 'w08_q6',
    text: L('When you pull back from someone, why do you usually do it?'),
    answers: [
      { label: L("I don't pull back — I lean in, sometimes too much"), insight: L('Leaning in rather than pulling back marks the pursuer, not the distancer.') },
      { label: L('Closeness starts to feel like pressure, so I need air'), insight: L('Needing air when closeness rises is the distancer soothing a real fear.') },
      { label: L('To reset the chase — distance makes it exciting again'), insight: L('Pulling back to re-spark the hunt is addiction to the chase itself.') },
      { label: L("Only when something's genuinely off — not as a game"), insight: L('Stepping back only for real reasons, never as strategy, is a steady pattern.') },
    ],
  },
  {
    id: 'w08_q7',
    text: L('If you stopped chasing tomorrow and stood completely still, what would happen?'),
    answers: [
      { label: L("I'm scared they'd vanish — which tells me I'm the engine"), insight: L('Fearing they\'d vanish if you stopped reveals a one-person relationship.') },
      { label: L("They'd probably chase me — they only relax when I retreat"), insight: L('If they only approach when you retreat, you\'re both locked in the dance.') },
      { label: L("I'd get restless and manufacture a new chase somewhere"), insight: L('Inventing a fresh chase when it goes still is the habit running you.') },
      { label: L("They'd walk toward me — we don't need the running"), insight: L('People who walk toward you when you stand still were never a chase.') },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w08Week: WeeklyTheme = {
  id: 'w08_the_chase',
  title: L('The Chase'),
  category: 'love',
  resultPrompt: L('What is your role in pursuit-and-withdrawal patterns?'),
  days: [
    { articleId: 'w08_a1', questionId: 'w08_q1' },
    { articleId: 'w08_a2', questionId: 'w08_q2' },
    { articleId: 'w08_a3', questionId: 'w08_q3' },
    { articleId: 'w08_a4', questionId: 'w08_q4' },
    { articleId: 'w08_a5', questionId: 'w08_q5' },
    { articleId: 'w08_a6', questionId: 'w08_q6' },
    { articleId: 'w08_a7', questionId: 'w08_q7' },
  ],
  outcomes: [
    {
      key: 'the_pursuer',
      title: L('The Pursuer'),
      body: L("You're the one who reaches. You initiate, you close the gap, you pour more in than you get back — and underneath it, usually, is a real fear of being abandoned that closeness quiets. There's nothing shameful here; effort is beautiful when it's mutual. But your reach can read as pressure to the very people you want, and your self-abandonment sends a signal you don't mean: that your attention is worth less than theirs. The work isn't to care less. It's to build a center of gravity that isn't them — because attraction follows fullness, not pursuit."),
      shareLine: L("I'm always the one reaching. Time to build a life worth reaching for."),
    },
    {
      key: 'the_distancer',
      title: L('The Distancer'),
      body: L("You're the one who pulls back. When closeness rises, it starts to feel like pressure, and space is how you feel safe again — a real fear of being engulfed, soothed by distance. You're not cold, and you're not a villain; you're using the opposite strategy from the pursuer, and each of you is the other's nightmare. But notice what your pullback does: it reads as abandonment to someone who's reaching, and it keeps a self-feeding loop alive. The way out isn't finding your 'true' role — it's staying, once, when everything in you says to create space."),
      shareLine: L('I create the distance others chase. The space is my safety — and my trap.'),
    },
    {
      key: 'addicted_chase',
      title: L('Hooked on the Chase'),
      body: L("The honest, uncomfortable read: it's the gap you love, more than any particular person. Interest cools the second someone's sure of you; your eye drifts to whoever's just out of reach; the fantasy is always the moment of winning, never the ordinary days after. Wanting the unavailable is actually the safest wanting there is — all the intensity of longing, none of the risk of being truly close and truly seen. That's the real thing to look at. The spark you keep chasing isn't love; it's the arcade lights of a gap. Available closeness isn't flat — you've just never let it reach you."),
      shareLine: L("Maybe I don't want them. Maybe I just want the chase."),
    },
    {
      key: 'balanced_dance',
      title: L('No One Is Running'),
      body: L("Here's the rare one, and you've earned the read: nobody's chasing, nobody's fleeing — you meet in the middle. Clear interest makes you feel safe rather than bored; you're drawn to people who can actually show up; when you imagine 'getting' someone, the fantasy is full of ordinary shared days, not a finish line. This is what desire looks like when it isn't feeding on distance. Protect it — and trust it, especially the next time some unavailable person's gap tries to convince you that flatness means something's missing. It doesn't. Steady isn't the absence of the spark. It's the spark with a floor under it."),
      shareLine: L("The people who are mine don't need to be chased."),
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned. Balanced 7/7/7/7, all rows 4-distinct.
  answerOutcomes: {
    w08_q1: ['the_pursuer', 'the_distancer', 'addicted_chase', 'balanced_dance'],
    w08_q2: ['balanced_dance', 'the_pursuer', 'addicted_chase', 'the_distancer'],
    w08_q3: ['balanced_dance', 'the_pursuer', 'addicted_chase', 'the_distancer'],
    w08_q4: ['the_pursuer', 'the_distancer', 'addicted_chase', 'balanced_dance'],
    w08_q5: ['balanced_dance', 'the_pursuer', 'addicted_chase', 'the_distancer'],
    w08_q6: ['the_pursuer', 'the_distancer', 'addicted_chase', 'balanced_dance'],
    w08_q7: ['the_pursuer', 'the_distancer', 'addicted_chase', 'balanced_dance'],
  },
};
