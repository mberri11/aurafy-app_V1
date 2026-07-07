/**
 * AURAFY — WEEK 2 CONTENT  ·  "When They Pull Away"  ·  category: love  ·  module: who_cut_off
 * Authored via the aurafy-week-generator skill. EN-first; fr/ar/es stubbed = en via L() until translated.
 *
 * Measures: is someone drifting, scared, or genuinely leaving?
 * 4 outcomes: still_anchored · needs_space · scared_close · slow_fade
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW (no existing article reuse this week): w02_a1 … w02_a7.
 *  - Append `w02Articles` to the ARTICLES array (src/content/articles/index.ts).
 *  - Merge `w02ArticlesEn` into the EN content map (src/content/articles/content.en.ts). FR/AR/ES use the
 *    existing getArticleContent EN-fallback — no stubs needed for article bodies.
 *  - Append `w02Questions` to the daily-question pool (src/data/dailyQuestions.ts).
 *  - Push `w02Week` into WEEKS (src/data/weeks/index.ts), AFTER w01Week, and run validateWeek().
 *  - `L()` is a local stub helper; reuse it or inline {en,fr,ar,es} per your conventions.
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { LocalizedString } from '../../types';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

/** Locale stub: write EN, mirror into fr/ar/es until real translations land (fallback renders cleanly). */
const L = (en: string): LocalizedString => ({ en, fr: en, ar: en, es: en });

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w02Articles: Article[] = [
  { id: 'w02_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_cut_off', featured: true, publishedAt: '2026-07-13' },
  { id: 'w02_a2', category: 'love', readMinutes: 5, relatedModuleId: 'who_cut_off', featured: true, publishedAt: '2026-07-14' },
  { id: 'w02_a3', category: 'love', readMinutes: 4, relatedModuleId: 'who_cut_off', featured: true, publishedAt: '2026-07-15' },
  { id: 'w02_a4', category: 'love', readMinutes: 4, relatedModuleId: 'who_cut_off', featured: true, publishedAt: '2026-07-16' },
  { id: 'w02_a5', category: 'love', readMinutes: 5, relatedModuleId: 'who_cut_off', featured: true, publishedAt: '2026-07-17' },
  { id: 'w02_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_cut_off', featured: true, publishedAt: '2026-07-18' },
  { id: 'w02_a7', category: 'love', readMinutes: 6, relatedModuleId: 'who_cut_off', featured: true, publishedAt: '2026-07-19' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */

export const w02ArticlesEn: Record<string, ArticleContent> = {
  w02_a1: {
    title: 'How to Tell When Someone Is Pulling Away',
    subtitle: 'Distance always announces itself — quietly',
    blocks: [
      { type: 'paragraph', text: "Nobody leaves all at once. Before the door, there is the drift: replies that arrive later and land lighter, plans that go from made to \"maybe,\" a warmth that hasn't disappeared but has somehow lost its weight. You feel it before you can prove it — and that gap between feeling and proof is exactly where people drive themselves crazy." },
      { type: 'heading', text: 'The three channels of drift' },
      { type: 'orderedList', items: [
        { title: 'Effort', text: 'Who initiates, who plans, who remembers. Drift shows up here first — the invisible labor of the relationship quietly changes hands.' },
        { title: 'Attention', text: 'Do they still ask follow-up questions? Do your small stories still get a reaction? Attention shrinks before presence does.' },
        { title: 'Repair', text: 'When something feels off and you name it, do they lean in to fix it — or shrug it flat? The will to repair is the last thing to go.' },
      ] },
      { type: 'paragraph', text: "One quiet week is not a verdict. People get sick, get slammed, get sad about things that have nothing to do with you. What you're watching for is not a bad day but a direction — three channels, all trending the same way, over weeks. That's not a mood. That's a message." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Relationship research consistently finds that declining responsiveness — slower, thinner engagement across multiple channels — precedes conscious withdrawal. You are reading a pattern, not a prophecy.' },
    ],
  },
  w02_a2: {
    title: 'The Difference Between Needing Space and Losing Interest',
    subtitle: 'Both go quiet. Only one comes back.',
    blocks: [
      { type: 'paragraph', text: "From the outside, they look identical: fewer messages, shorter calls, a person who used to be everywhere now rationing themselves. But needing space and losing interest are opposite creatures wearing the same coat — and there is a reliable way to tell them apart." },
      { type: 'heading', text: 'Space has a return address' },
      { type: 'paragraph', text: "A person who needs space still tends the bond while they take it. They tell you — maybe clumsily, but they tell you. The warmth in the little contact you do get stays intact. They ask for patience rather than pretending nothing changed. The distance has edges: a reason, a shape, some version of \"this is about me, not us.\"" },
      { type: 'paragraph', text: "Losing interest has none of that. It doesn't announce itself, because announcing would require caring how the silence lands on you. The replies aren't just rarer — they're flatter. Your news stops producing questions. The distance has no edges at all; it just spreads." },
      { type: 'quote', text: 'Space says "wait for me." Indifference says nothing at all.', attribution: 'On the two silences' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'The distinction is grounded in responsiveness research: invested partners maintain warmth and repair signals even while withdrawing, while genuine disengagement drops both. It is behavior you can observe, not energy you have to guess.' },
    ],
  },
  w02_a3: {
    title: 'Slow Fade: Reading the Quiet Exit',
    subtitle: 'The goodbye that never says the word',
    blocks: [
      { type: 'paragraph', text: "The slow fade is the exit for people who can't stand doors. Instead of ending things, they let things end — reply by shorter reply, plan by postponed plan — hoping the relationship will dissolve gently enough that no one can accuse them of leaving. It is the most common goodbye of the modern age, and the cruelest precisely because it's deniable." },
      { type: 'paragraph', text: "The signature of a fade is that nothing is ever wrong. Ask, and you'll get \"just busy,\" \"all good,\" a heart emoji doing the work a conversation should. Meanwhile every measurable thing declines: frequency, length, depth, initiative. The words say stay; the math says go." },
      { type: 'paragraph', text: "If you suspect a fade, don't audit each excuse — audit the trend. Excuses can each be true and the pattern still be the message. A person who wants to be in your life fights the calendar for you. A person fading lets the calendar win, every single time." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Avoidance of direct conflict is one of the best-documented reasons people withdraw passively rather than end things cleanly. The fade is a conflict-avoidance strategy — recognizing it protects you from months of decoding.' },
    ],
  },
  w02_a4: {
    title: 'When "Busy" Means Something Else',
    subtitle: 'The most honest lie people tell',
    blocks: [
      { type: 'paragraph', text: "\"Busy\" is real. Lives genuinely fill up — work, family, the private storms people don't post about. But \"busy\" is also the universal solvent of modern relationships: the word that can dissolve any obligation without anyone having to say a harder sentence. The question is never whether someone is busy. It's what their busy makes room for." },
      { type: 'heading', text: 'Busy is a ranking, not a schedule' },
      { type: 'paragraph', text: "Everyone you know is busy, and everyone you know still finds minutes for what they rank first. The overwhelmed friend who still sends you the meme that made them think of you. The exhausted person who still calls for four minutes from the car. Busy people don't vanish from the lives they treasure — they shrink their presence without breaking it." },
      { type: 'paragraph', text: "So read \"busy\" by its residue. Busy-but-anchored leaves crumbs: small check-ins, rain-checks that actually get cashed, an apology that sounds like it costs something. Busy-as-exit leaves nothing but the word itself, repeated until you stop asking." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Time-use research is blunt: people reliably find small pockets of time for their top priorities even under heavy load. Sustained zero-contact "busyness" toward one person is a choice pattern, not a calendar problem.' },
    ],
  },
  w02_a5: {
    title: 'The Anxiety of the Unanswered Text',
    subtitle: 'Three grey dots and a racing heart',
    blocks: [
      { type: 'paragraph', text: "You sent it hours ago. You've reread it eleven times — was it too much, too flat, too eager? You've watched them be \"online\" somewhere else. An unanswered message from someone you're attached to is a tiny event that the anxious brain inflates into a verdict, and by midnight you've written the whole ending in your head." },
      { type: 'heading', text: 'Why silence hurts more than no' },
      { type: 'paragraph', text: "The mind hates ambiguity more than it hates bad news. A no is painful but processable; silence is a blank the brain fills with its scariest draft. That's why one unanswered text can hurt more than an actual argument — you're not reacting to what happened, you're reacting to everything that might have." },
      { type: 'paragraph', text: "Here is the steadying move: judge the pattern, never the message. One slow reply means nothing — people drive, sleep, drown in their day. What matters is the baseline. If their normal is warm and this week is silent, note it as one data point and let the week finish speaking. And notice your own side honestly: if every gap sends you spiraling, some of what you're reading is your alarm system, not their signal." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Intolerance of uncertainty is a well-studied driver of anxious rumination — ambiguous silence activates threat responses faster than clear negative information. Naming that helps you separate their behavior from your alarm.' },
    ],
  },
  w02_a6: {
    title: 'Why People Withdraw Right When They Feel the Most',
    subtitle: 'The retreat that happens at the exact wrong moment',
    blocks: [
      { type: 'paragraph', text: "It's one of the strangest patterns in love: the weekend was perfect, something real cracked open, you finally felt them all the way there — and then they're gone. Not dramatically. Just suddenly further away, precisely when the closeness peaked. It feels like rejection. Often, it's the opposite." },
      { type: 'heading', text: 'Closeness can feel like danger' },
      { type: 'paragraph', text: "For people who learned early that depending on someone ends badly, intimacy sets off a silent alarm. The closer things get, the louder it rings — and the nervous system does what it was trained to do: create distance to feel safe again. Psychologists call these deactivating strategies: picking a small fight, going quiet, suddenly \"needing to focus on themselves\" the week after the best moment you've ever had together." },
      { type: 'paragraph', text: "This doesn't make the pattern okay, and it isn't yours to fix. But it changes what the distance means. Someone running from the depth of their own feeling is a different story than someone losing interest — the tell is that they keep coming back toward the very closeness they flee, in a loop. Whether you want to live inside that loop is a separate, honest question." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Deactivating strategies after moments of intimacy are a core, well-documented pattern in avoidant attachment research. The withdrawal tracks the closeness itself — which is why it lands at the "wrong" moment so precisely.' },
    ],
  },
  w02_a7: {
    title: "Letting Someone Go Before They've Finished Leaving",
    subtitle: 'You are allowed to stop waiting at the door',
    blocks: [
      { type: 'paragraph', text: "There is a particular kind of exhaustion that comes from loving someone in slow motion — watching them leave by degrees while you hold the door open, telling yourself that patience is loyalty. At some point the hardest question stops being \"are they going?\" and becomes \"how long am I willing to stand here?\"" },
      { type: 'paragraph', text: "Letting go before they've finished leaving isn't giving up on them. It's giving up on the job of being the only one holding the thing. You stop initiating everything and see what stands. You stop translating their silence into hopeful languages. You let the relationship weigh what it actually weighs without your hands under it — and you let the truth of that be information instead of an emergency." },
      { type: 'heading', text: 'What release actually looks like' },
      { type: 'paragraph', text: "It's rarely one dramatic goodbye. It's a hundred small reclamations: making the plan without checking their availability first, letting a message sit because your evening was full, noticing a whole afternoon passed without decoding anyone. Grief comes in visits, and between the visits, your life quietly comes back. If they turn around and walk toward you, let them do it with their own legs. And if they don't — you'll already be somewhere further down your own road." },
      { type: 'quote', text: "You can't lose someone who was already leaving. You can only lose the time you spend waiting.", attribution: 'On release' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Psychologists describe this as anticipatory grief and disengagement — beginning to process a loss while it is still in motion. Deliberate disengagement from an unresponsive bond is consistently linked to recovered wellbeing; it is self-respect, not coldness.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w02Questions: DailyQuestion[] = [
  {
    id: 'w02_q1',
    text: L('When did the distance actually start?'),
    answers: [
      { label: L('Right after things got really close'), insight: L('Distance that follows depth is usually fear, not fading.') },
      { label: L('Slowly, across everything at once'), insight: L('When every channel thins together, the drift has a direction.') },
      { label: L('When life got genuinely heavy for them'), insight: L('Storms shrink presence without breaking the bond.') },
      { label: L('When they told me they needed room'), insight: L('Named space is space with edges — and a return address.') },
    ],
  },
  {
    id: 'w02_q2',
    text: L('When you do reach them, what comes back?'),
    answers: [
      { label: L('The same warmth, just less time'), insight: L('Warmth intact under pressure is an anchor holding.') },
      { label: L('Kindness, with a "bear with me" attached'), insight: L('Asking for patience is tending the bond while stepping back.') },
      { label: L('Real warmth that vanishes if I lean in'), insight: L('Heat that flees your approach is running from closeness, not you.') },
      { label: L('Polite, flat, minimum-effort replies'), insight: L('Politeness without curiosity is how interest sounds while leaving.') },
    ],
  },
  {
    id: 'w02_q3',
    text: L('What does their "busy" actually look like?'),
    answers: [
      { label: L('Busy with a promise attached — and they keep it'), insight: L('A rain-check that gets cashed is busyness, not exit.') },
      { label: L('Busy, but small signs of me still slip through'), insight: L('Crumbs of contact under load are priority made visible.') },
      { label: L('Busy for me, somehow present everywhere else'), insight: L('Selective busyness is a ranking, and you can read your place in it.') },
      { label: L('Busy right after our closest moments'), insight: L('A calendar that fills up after intimacy is a nervous system, not a schedule.') },
    ],
  },
  {
    id: 'w02_q4',
    text: L('When your message sits unanswered, what usually follows?'),
    answers: [
      { label: L('Shorter and cooler replies each time'), insight: L('When the trend only points down, the silence is the answer.') },
      { label: L('A sudden burst of warmth, then quiet again'), insight: L('The loop of return-and-retreat is closeness at war with fear.') },
      { label: L('An apology and an honest reason'), insight: L('Repair after silence means the bond still matters to them.') },
      { label: L('A late reply as warm as ever'), insight: L('Slow but warm is a full life, not a fading heart.') },
    ],
  },
  {
    id: 'w02_q5',
    text: L('When did you last feel truly close to them?'),
    answers: [
      { label: L('Recently — the closeness is still under the quiet'), insight: L('If the depth is recent, the quiet is weather, not climate.') },
      { label: L('Right before they went distant'), insight: L('Closeness followed by retreat is the classic run-from-the-feeling.') },
      { label: L('A while ago — and they say they miss it too'), insight: L('Missing it out loud means the way back is still lit.') },
      { label: L("So long ago I can't clearly remember"), insight: L('When you have to reach for the memory, the fade has been long.') },
    ],
  },
  {
    id: 'w02_q6',
    text: L('Who is doing the reaching now?'),
    answers: [
      { label: L('Me for now — but they answer with real care'), insight: L('Uneven effort with warm response is a season, not a verdict.') },
      { label: L('Still both of us, just less often'), insight: L('Mutual but quieter is a bond breathing, not breaking.') },
      { label: L("Only me, and it's starting to feel like a job"), insight: L('When you carry the whole bridge, notice who stopped building.') },
      { label: L('Me — and they swing between close and gone'), insight: L('Push-pull answered reaching is fear steering the wheel.') },
    ],
  },
  {
    id: 'w02_q7',
    text: L('Deep down, what does your gut already say?'),
    answers: [
      { label: L('They want this, but something in them keeps running'), insight: L('You can love someone and still be fled from — the fear is theirs.') },
      { label: L("It'll pass — we're okay underneath"), insight: L('A settled gut under a quiet week is usually right.') },
      { label: L("I think I already know, I just haven't said it out loud"), insight: L('The knowing that waits to be spoken is still knowing.') },
      { label: L("They'll come back when their storm passes"), insight: L('Trusting a named absence is patience, not denial.') },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w02Week: WeeklyTheme = {
  id: 'w02_when_they_pull_away',
  title: L('When They Pull Away'),
  category: 'love',
  resultPrompt: L('Are they drifting, scared, or already leaving?'),
  days: [
    { articleId: 'w02_a1', questionId: 'w02_q1' },
    { articleId: 'w02_a2', questionId: 'w02_q2' },
    { articleId: 'w02_a3', questionId: 'w02_q3' },
    { articleId: 'w02_a4', questionId: 'w02_q4' },
    { articleId: 'w02_a5', questionId: 'w02_q5' },
    { articleId: 'w02_a6', questionId: 'w02_q6' },
    { articleId: 'w02_a7', questionId: 'w02_q7' },
  ],
  outcomes: [
    {
      key: 'still_anchored',
      title: L('Still Anchored'),
      body: L("Breathe — this reads like a full life, not a fading heart. The time got thinner, but the warmth didn't: they still answer with care, still repair, still let you in when it counts. What you've been calling drift looks a lot more like weather. Watch the warmth, not the clock."),
      shareLine: L("Distance isn't always drift. Sometimes it's just weather."),
    },
    {
      key: 'needs_space',
      title: L('Needing Space'),
      body: L("There's a real step back here — but it has edges. They've named it, or near enough: the patience they're asking for comes wrapped in warmth, and the little contact you get is still genuinely yours. This is space with a return address. Give it honestly, keep your own life loud in the meantime, and let them walk back on their own legs."),
      shareLine: L('Real space comes with a return address.'),
    },
    {
      key: 'scared_close',
      title: L('Scared of the Closeness'),
      body: L("The pattern is loud once you see it: the retreat lands right after the depth, every time. This isn't someone losing interest — it's someone whose alarm goes off when it gets real, running from the size of their own feeling. That's their loop to break, not yours to decode forever. You get to decide whether you can love someone at the pace of their fear."),
      shareLine: L('Some people run right when it gets real.'),
    },
    {
      key: 'slow_fade',
      title: L('The Slow Fade'),
      body: L("It hurts to see it named, but you've felt it for a while: the effort is going one direction, and it isn't toward you. Nothing is ever \"wrong,\" yet everything measurable keeps shrinking — that's not confusion, that's a quiet exit. You can't lose someone who was already leaving. You can only lose the time you spend waiting at the door."),
      shareLine: L('A quiet exit is still an exit.'),
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Order rotated per question.
  answerOutcomes: {
    w02_q1: ['scared_close', 'slow_fade', 'still_anchored', 'needs_space'],
    w02_q2: ['still_anchored', 'needs_space', 'scared_close', 'slow_fade'],
    w02_q3: ['needs_space', 'still_anchored', 'slow_fade', 'scared_close'],
    w02_q4: ['slow_fade', 'scared_close', 'needs_space', 'still_anchored'],
    w02_q5: ['still_anchored', 'scared_close', 'needs_space', 'slow_fade'],
    w02_q6: ['needs_space', 'still_anchored', 'slow_fade', 'scared_close'],
    w02_q7: ['scared_close', 'still_anchored', 'slow_fade', 'needs_space'],
  },
};
