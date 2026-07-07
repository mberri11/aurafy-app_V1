/**
 * AURAFY — WEEK 6 CONTENT  ·  "Your Worth in Love"  ·  category: self  ·  module: am_i_problem
 * Authored via the aurafy-week-generator skill. EN-first; fr/ar/es stubbed = en via L() until translated.
 *
 * Measures: your standards — and where you abandon them.
 * 4 outcomes: rooted_worth · self_editor · over_giver · approval_seeker
 *
 * NOTE ON category: this is a SELF-DISCOVERY week (about the user, not a target person).
 * category is 'self' so the week's chip/accent theme reads as self-discovery, not love.
 * relatedModuleId is am_i_problem (self module).
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w06_a1 … w06_a7.
 *  - Append `w06Articles` to ARTICLES (src/content/articles/index.ts), after ...w05Articles.
 *  - Merge `w06ArticlesEn` into content.en.ts. FR/AR/ES ride the getArticleContent EN-fallback.
 *  - Append `w06Questions` to the daily-question pool (src/data/dailyQuestions.ts), after ...w05Questions.
 *  - Push `w06Week` into WEEKS (src/data/weeks/index.ts), AFTER w05Week, and run validateWeek().
 *  - This is the FIRST week with category:'self' — confirm the article feed chip + weekly-result
 *    theming resolve 'self' correctly (they should; categoryTheme already maps am_i_problem → self).
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { LocalizedString } from '../../types';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

const L = (en: string): LocalizedString => ({ en, fr: en, ar: en, es: en });

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w06Articles: Article[] = [
  { id: 'w06_a1', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-10' },
  { id: 'w06_a2', category: 'self', readMinutes: 4, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-11' },
  { id: 'w06_a3', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-12' },
  { id: 'w06_a4', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-13' },
  { id: 'w06_a5', category: 'self', readMinutes: 4, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-14' },
  { id: 'w06_a6', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-15' },
  { id: 'w06_a7', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-16' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */

export const w06ArticlesEn: Record<string, ArticleContent> = {
  w06_a1: {
    title: 'Knowing Your Worth When You Want Them Anyway',
    subtitle: 'Self-worth is easy in theory and hard at 2 a.m.',
    blocks: [
      { type: 'paragraph', text: "Everyone agrees you should know your worth. It fits on a mug. The trouble is that self-worth isn't tested when you're calm and single and reading affirmations — it's tested at 2 a.m. when someone who treats you carelessly texts back, and every principle you hold evaporates in the warm rush of their attention. Worth you can feel only when it's easy isn't worth. It's a mood." },
      { type: 'heading', text: 'Worth is what survives wanting' },
      { type: 'paragraph', text: "Real self-worth isn't the absence of longing. You can ache for someone and still keep your standards — in fact that's the only place standards mean anything. The question this week asks isn't \"do you know your worth?\" It's the harder one: does your worth hold WHEN you want them? Or does the wanting quietly rewrite the rules every single time?" },
      { type: 'paragraph', text: "This isn't a week about pretending to need no one. It's about noticing the exact moment where desire starts negotiating your worth down — where \"I deserve consistency\" becomes \"well, they're just bad at texting,\" where a boundary becomes a suggestion becomes a memory. That moment is findable. And once you can see it, you can stop being surprised by it." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Self-worth researchers distinguish stable self-worth from contingent self-worth — the latter rises and falls with others\' approval. Standards that collapse under wanting are a sign worth is being sourced externally, which is both common and changeable.' },
    ],
  },
  w06_a2: {
    title: 'The Standards You Drop When You Like Someone',
    subtitle: 'The quiet renegotiation nobody notices themselves doing',
    blocks: [
      { type: 'paragraph', text: "Ask anyone their standards and they'll list them cleanly: honesty, consistency, effort, respect. Watch the same person fall for someone who has none of those, and the list performs a quiet magic trick. It doesn't disappear — that would be too obvious. It bends. Each requirement gets a personalized exception, tailored precisely to the person failing it." },
      { type: 'heading', text: 'How the bending sounds' },
      { type: 'paragraph', text: "\"I need someone emotionally available\" becomes \"they're just guarded because of their past.\" \"I won't be someone's secret\" becomes \"they're private, it's not personal.\" \"I need consistency\" becomes \"they're going through a lot right now.\" Every one of these MIGHT be true. That's what makes the trick work — the exceptions are always plausible. But stack them up and a pattern emerges: the standards don't bend for everyone. They bend for the people you want, in exact proportion to how much you want them." },
      { type: 'quote', text: 'A standard that has an exception for everyone you desire was never a standard. It was a wish.', attribution: 'On the bending' },
      { type: 'paragraph', text: "The fix isn't to become rigid or cold. It's to catch the renegotiation in real time — to notice the exact sentence where you start defending someone's failure to meet a bar you set for good reasons. You're allowed to keep a standard AND have compassion for why someone falls short of it. Compassion for them doesn't require abandoning it for you." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Motivated reasoning is well documented: we generate plausible justifications for what we already want. Standards erode not through decision but through a series of individually reasonable-sounding exceptions.' },
    ],
  },
  w06_a3: {
    title: 'Why You Over-Give to People Who Under-Give',
    subtitle: 'The math that never balances, and why you keep doing it',
    blocks: [
      { type: 'paragraph', text: "There's a specific, exhausting pattern: the less someone gives you, the more you give them. You over-explain, over-accommodate, over-function — pouring effort into the exact people who pour the least back. It feels like generosity. Often it's something else wearing generosity's clothes: an attempt to earn a love that's being withheld." },
      { type: 'heading', text: 'The withholding creates the chasing' },
      { type: 'paragraph', text: "When someone gives freely, you relax — there's nothing to earn, so you stop performing. When someone gives sparingly, a different circuit fires: their scarcity reads as a puzzle you can solve with enough effort. If I just give MORE — more understanding, more patience, more of myself — surely they'll finally give back. So you increase your investment in response to their decreasing one, which is exactly backwards, and exactly what keeps the imbalance alive." },
      { type: 'paragraph', text: "Notice the tell: your effort tends to spike right after they pull back, not after they show up. Healthy giving responds to presence — you pour into people who pour into you. Compensatory over-giving responds to absence — you pour hardest into the void, hoping to fill it. The first builds relationships. The second builds resentment with a smile on it." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Effort that increases in response to a partner\'s withdrawal reflects compensatory investment — trying to restore a bond through unilateral over-function. It reliably deepens imbalance rather than correcting it.' },
    ],
  },
  w06_a4: {
    title: 'Anxious Generosity: Love as a Bargaining Chip',
    subtitle: 'When giving is really asking',
    blocks: [
      { type: 'paragraph', text: "Some generosity is pure — you give because giving is joy, with no invoice attached. And some generosity is anxious — you give as a down payment on security, a way of buying reassurance that you won't be left. From the outside they look identical. From the inside, only one of them leaves you keeping score." },
      { type: 'heading', text: 'The receipt test' },
      { type: 'paragraph', text: "Here's how to tell which one you're running. After you give, do you feel lighter — or do you feel owed? Pure giving ends when the gift lands; there's no residue. Anxious giving leaves a receipt in your hand: a quiet expectation of return, a little flare of resentment when the return doesn't come, a running tally of everything you've done that they haven't matched. If your generosity generates a ledger, it was never fully a gift. It was a transaction you hoped they'd honor." },
      { type: 'paragraph', text: "This isn't a character flaw — it's usually a survival strategy from somewhere love felt conditional, where being useful was how you stayed safe. But naming it matters, because anxious generosity quietly corrodes both people. It burdens them with a debt they never agreed to, and it teaches you that love must be purchased. Real security is the ability to give freely AND to stop giving to someone who only takes — without either one feeling like a catastrophe." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Giving motivated by attachment anxiety functions as reassurance-seeking rather than generosity, and it correlates with resentment and burnout — the "gift" carries an unspoken demand for security in return.' },
    ],
  },
  w06_a5: {
    title: 'The Difference Between Compromise and Self-Abandonment',
    subtitle: 'One builds a relationship. The other dissolves a person.',
    blocks: [
      { type: 'paragraph', text: "Every relationship requires compromise — that's not in question. The danger is that \"compromise\" becomes the word we use for something much costlier: the slow disappearing of yourself to keep someone else comfortable. They sound similar. They are opposites. And the line between them is one of the most important lines you'll ever learn to see." },
      { type: 'heading', text: 'Where the line runs' },
      { type: 'orderedList', items: [
        { title: 'Compromise', text: 'You give up a preference. You wanted Italian, you have sushi. You wanted to move, you stay a year. It costs you something you can afford — a want, not a core.' },
        { title: 'Self-abandonment', text: 'You give up a piece of who you are. Your values, your needs, your friendships, your voice, the things that make you YOU. It costs you something you can\'t afford to lose and stay whole.' },
        { title: 'The test', text: 'After it, do you feel like a partner who bent — or a person who vanished a little? Compromise is survivable indefinitely. Self-abandonment has a body count, and the body is you.' },
      ] },
      { type: 'paragraph', text: "The insidious part is gradualism. Nobody abandons themselves in one dramatic act. It happens in increments so small each one seems reasonable — a hobby dropped, an opinion swallowed, a friend seen less, a need stopped being mentioned. Then one day you look up and can't find yourself in your own life. The prevention is to track the trend, not the increment: not \"is this one thing okay?\" but \"which direction have I been moving for months?\"" },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Self-concept clarity reliably declines under chronic self-silencing in relationships, and that erosion predicts depression and dissatisfaction. Self-abandonment is a measurable loss of self, not a personality trait.' },
    ],
  },
  w06_a6: {
    title: 'Wanting Someone vs. Needing Their Approval',
    subtitle: 'Two feelings that hide inside each other',
    blocks: [
      { type: 'paragraph', text: "You can want a person — their company, their mind, their presence in your life. And you can need their approval — their validation as proof that you're okay, lovable, enough. These feel like the same longing pointed at the same person, but they're profoundly different, and telling them apart changes everything about how you love." },
      { type: 'heading', text: 'How to feel the difference' },
      { type: 'paragraph', text: "Wanting someone is expansive: their presence adds to a life that was already yours and already fine. If they left, you'd grieve — and you'd remain a whole person. Needing approval is contingent: their opinion of you becomes the thermostat of your self-worth. A cool text drops your entire mood; a warm one restores you. You're not responding to the relationship anymore. You're responding to a verdict about yourself that you've handed them the power to issue." },
      { type: 'paragraph', text: "Here's why it matters so much: needing someone's approval quietly hands them the controls. Every choice bends toward keeping their good opinion — you shrink, perform, agree, over-give, all to protect a supply of validation you've decided you can't generate yourself. Wanting keeps you sovereign; you choose them freely, from wholeness. Needing approval makes you a supplicant to your own relationship. The work of this week is moving, inch by inch, from the second to the first." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Externally contingent self-worth — sourcing your okayness from others\' approval — is linked to anxiety, instability, and diminished autonomy. Distinguishing genuine desire from approval-dependence is a documented lever for healthier attachment.' },
    ],
  },
  w06_a7: {
    title: "How Self-Respect Changes Who's Attracted to You",
    subtitle: 'The standards you keep quietly reshape who stays',
    blocks: [
      { type: 'paragraph', text: "There's a quiet mechanism most people never notice: the way you treat yourself sets the terms for how others are allowed to treat you — and over time, it filters WHO stays around at all. Not through mystical energy, but through something far more concrete. Your boundaries are a sorting mechanism, and they're always sorting, whether or not you're paying attention." },
      { type: 'heading', text: 'The sorting, made visible' },
      { type: 'paragraph', text: "When you hold self-respect — you name your needs, you don't chase, you leave what's beneath you — two things happen at once. People who wanted access to someone with weak boundaries lose interest and drift; there's no more free labor, no more one-sided supply to extract. And people capable of mutual, respectful love find you far more attractive, because self-respect reads to a healthy person as safety and substance. You're not becoming a different person. You're becoming legible — and different people answer." },
      { type: 'paragraph', text: "This reframes the fear that keeps so many standards low: \"if I ask for more, I'll end up alone.\" The truth is nearly the reverse. Lowering yourself doesn't win love; it wins the kind of people who are looking for someone lowered. Raising your standards doesn't cost you love; it costs you the people who were never going to love you well — and clears the doorway for the ones who could. Self-respect isn't a wall that keeps people out. It's a filter that lets the right ones in." },
      { type: 'quote', text: "You don't lose people by respecting yourself. You lose the ones who needed you not to.", attribution: 'On the filter' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Boundaries function as selection pressure: consistent self-respect deters extractive dynamics and signals security to well-matched partners. Who remains around you shifts predictably as your standards stabilize.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w06Questions: DailyQuestion[] = [
  {
    id: 'w06_q1',
    text: L('When someone you want treats you carelessly, what happens to your standards?'),
    answers: [
      { label: L("They hold — I can ache for them and still expect better"), insight: L('Standards that survive wanting are the only real kind.') },
      { label: L("They bend — I find a reason their behavior is okay"), insight: L('A bar with an exception for everyone you desire was a wish, not a standard.') },
      { label: L("I give even more, hoping to earn better treatment"), insight: L('Answering carelessness with more effort is chasing, not loving.') },
      { label: L("My whole mood hangs on their next message"), insight: L('When one text runs your worth, the worth is being sourced from them.') },
    ],
  },
  {
    id: 'w06_q2',
    text: L('Think of your last strong attraction. What did you talk yourself into?'),
    answers: [
      { label: L("Nothing — I held the line even though I wanted them"), insight: L('Holding the line under desire is self-worth doing its actual job.') },
      { label: L('A personalized exception for every flag'), insight: L('When every failing gets excused, the standard quietly dissolved.') },
      { label: L('That over-giving would finally make them choose me'), insight: L('Believing more output earns their love is the over-giver\'s trap.') },
      { label: L('That if they approved of me, I\'d finally feel okay'), insight: L('Making their approval your okayness hands them the thermostat.') },
    ],
  },
  {
    id: 'w06_q3',
    text: L('Your effort in relationships tends to spike right after…'),
    answers: [
      { label: L("They show up for me — I pour into people who pour into me"), insight: L('Effort that answers presence is generosity that builds.') },
      { label: L('They pull back — I chase the void with more of myself'), insight: L('Effort that spikes at absence is compensatory over-giving.') },
      { label: L("I quietly note I've done more than them again"), insight: L('A running ledger under your giving means it was a transaction.') },
      { label: L("They seem cooler — I perform harder to win them back"), insight: L('Performing for warmth is approval-seeking wearing effort\'s clothes.') },
    ],
  },
  {
    id: 'w06_q4',
    text: L('After you give something big to someone, how do you feel?'),
    answers: [
      { label: L('Lighter — the gift landed and that was enough'), insight: L('Giving that ends when the gift lands is the free kind.') },
      { label: L('Owed — I catch myself waiting for the return'), insight: L('A receipt left in your hand means the gift was a down payment.') },
      { label: L('Drained but unable to stop myself giving more'), insight: L('Giving you can\'t stop, to someone who won\'t return it, is self-erasure.') },
      { label: L('Anxious until they show they still approve of me'), insight: L('Giving to secure approval is reassurance-seeking, not generosity.') },
    ],
  },
  {
    id: 'w06_q5',
    text: L('Over the last few months in your closest relationship, you have…'),
    answers: [
      { label: L('Stayed fully myself — bent on wants, never on core'), insight: L('Bending preferences while keeping your core is healthy compromise.') },
      { label: L('Traded a preference here and there, nothing vital'), insight: L('Small affordable trades are the ordinary cost of togetherness.') },
      { label: L('Slowly dropped hobbies, friends, opinions, needs'), insight: L('Incremental disappearing is self-abandonment, one small piece at a time.') },
      { label: L('Gone quiet about my needs to keep them comfortable'), insight: L('Silencing your needs for their comfort trades your self for their ease.') },
    ],
  },
  {
    id: 'w06_q6',
    text: L('Be honest about what you feel for the person on your mind. It\'s mostly…'),
    answers: [
      { label: L('Wanting them — they add to a life already mine and fine'), insight: L('Desire from wholeness keeps you sovereign in your own love.') },
      { label: L("Wanting them so much I've quietly excused their worst"), insight: L('Desire that rewrites the rules for them is the standards editor at work.') },
      { label: L("Needing to prove I'm worth it — so I keep over-giving"), insight: L('Trying to earn your place through output is the over-giver\'s engine.') },
      { label: L('Their approval running my thermostat, hot and cold'), insight: L('When their opinion sets your temperature, you\'ve handed them the controls.') },
    ],
  },
  {
    id: 'w06_q7',
    text: L('"If I asked for more or walked away, I\'d end up alone." How true does that feel?'),
    answers: [
      { label: L('False — self-respect filters IN the right people'), insight: L('Knowing standards attract the well-matched is worth standing on solid ground.') },
      { label: L("Mostly false — I've seen better people show up when I rise"), insight: L('Watching the room improve when you rise is the filter working.') },
      { label: L('Painfully true — so I keep over-giving to not lose them'), insight: L('Believing you must stay lowered to be loved keeps you giving into a void.') },
      { label: L('True — losing their approval feels like losing everything'), insight: L('When their approval feels like your whole worth, that fear runs the show.') },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w06Week: WeeklyTheme = {
  id: 'w06_your_worth_in_love',
  title: L('Your Worth in Love'),
  category: 'self',
  resultPrompt: L('Where do you hold your standards — and where do you abandon them?'),
  days: [
    { articleId: 'w06_a1', questionId: 'w06_q1' },
    { articleId: 'w06_a2', questionId: 'w06_q2' },
    { articleId: 'w06_a3', questionId: 'w06_q3' },
    { articleId: 'w06_a4', questionId: 'w06_q4' },
    { articleId: 'w06_a5', questionId: 'w06_q5' },
    { articleId: 'w06_a6', questionId: 'w06_q6' },
    { articleId: 'w06_a7', questionId: 'w06_q7' },
  ],
  outcomes: [
    {
      key: 'rooted_worth',
      title: L('Rooted in Your Worth'),
      body: L("Here's what your answers keep showing: your worth holds even when you want someone. You can ache for a person and still expect to be treated well — the desire doesn't rewrite your rules. You give from wholeness, not to earn, and you'd grieve a loss without dissolving into one. This is the rare, quietly powerful thing self-help mugs promise and few people actually own. Protect it. And know that it's exactly what draws healthy love toward you."),
      shareLine: L("Worth you can feel only when it's easy isn't worth. Mine holds when I want them."),
    },
    {
      key: 'self_editor',
      title: L('The Standards Editor'),
      body: L("You have real standards — until you want someone, and then the quiet renegotiation begins. Each flag gets a personalized, plausible exception, tailored precisely to the person failing it. The bar doesn't vanish; it bends, in exact proportion to how much you want them. This isn't about becoming cold — it's about catching the sentence where you start defending someone's failure to meet a bar you set for good reasons. You can keep the standard AND have compassion for why they fall short. The compassion is for them. The standard is for you."),
      shareLine: L('A standard with an exception for everyone I want was never a standard.'),
    },
    {
      key: 'over_giver',
      title: L('The Over-Giver'),
      body: L("Your pattern is loud once it's named: the less someone gives, the more you pour in — and your effort spikes right after they pull back, not after they show up. That's not generosity; it's an attempt to earn a love that's being withheld, and it runs exactly backwards, feeding the imbalance it's trying to fix. You've been pouring hardest into the void. The work isn't to give less to everyone — it's to give to people who give back, and to let the void stay empty long enough to show you what it really is."),
      shareLine: L('I pour hardest into the people who pour back the least. Not anymore.'),
    },
    {
      key: 'approval_seeker',
      title: L('Seeking the Verdict'),
      body: L("The tender, honest read: you don't just want them — you need their approval to feel okay, and you've handed them a thermostat on your entire self-worth. A cool text drops your mood; a warm one restores you. This usually got wired somewhere love felt conditional, where being enough for someone was how you stayed safe — so this isn't a flaw, it's a survival strategy that outlived its use. But it quietly makes you a supplicant in your own love. The whole of this week points one way: worth generated inside you can't be revoked by a text. Start taking the controls back, one inch at a time."),
      shareLine: L('I handed someone the thermostat on my worth. I\'m taking it back.'),
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Balanced 7/7/7/7.
  answerOutcomes: {
    w06_q1: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q2: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q3: ['rooted_worth', 'over_giver', 'self_editor', 'approval_seeker'],
    w06_q4: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q5: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q6: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q7: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
  },
};
