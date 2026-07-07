/**
 * AURAFY — WEEK 7 CONTENT  ·  "Hidden Feelings"  ·  category: love  ·  module: who_loves_me
 * Authored via the aurafy-week-generator skill. EN-first; fr/ar/es stubbed = en via L() until translated.
 *
 * Measures: who around you is hiding how they feel — and how sure can you be?
 * 4 outcomes: someone_hiding · quiet_admirer · just_friendly · your_hope
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w07_a1 … w07_a7.
 *  - Append `w07Articles` to ARTICLES (src/content/articles/index.ts), after ...w06Articles.
 *  - Merge `w07ArticlesEn` into content.en.ts. FR/AR/ES ride the getArticleContent EN-fallback.
 *  - Append `w07Questions` to the daily-question pool (src/data/dailyQuestions.ts), after ...w06Questions.
 *  - Push `w07Week` into WEEKS (src/data/weeks/index.ts), AFTER w06Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { LocalizedString } from '../../types';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

const L = (en: string): LocalizedString => ({ en, fr: en, ar: en, es: en });

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w07Articles: Article[] = [
  { id: 'w07_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-17' },
  { id: 'w07_a2', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-18' },
  { id: 'w07_a3', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-19' },
  { id: 'w07_a4', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-20' },
  { id: 'w07_a5', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-21' },
  { id: 'w07_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-22' },
  { id: 'w07_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-23' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */

export const w07ArticlesEn: Record<string, ArticleContent> = {
  w07_a1: {
    title: 'When Someone Is Hiding Their Feelings for You',
    subtitle: 'Concealment leaks — if you know where to look',
    blocks: [
      { type: 'paragraph', text: "Hidden feelings are rarely hidden well. People can control the big signals — they won't confess, won't obviously flirt, won't make a move — but the small, involuntary ones leak constantly. Attraction is a lot of pressure to hold underwater, and it escapes through the cracks the person doesn't even know are there." },
      { type: 'heading', text: 'Where the leaks happen' },
      { type: 'paragraph', text: "In attention: they track you in a room, know things about you that you don't remember telling them, resurface old details months later. In friction: they get oddly flustered, over-formal, or strangely argumentative around you — feelings that can't come out as warmth often come out as static. In pattern: they're different with YOU than with everyone else, and that difference is the signal, not any single moment." },
      { type: 'paragraph', text: "This week is about reading those leaks without drowning in them — because the same evidence can point two ways. Real concealed feeling leaves a consistent trail across time. Wishful reading finds a trail in a single warm afternoon and builds a cathedral on it. The difference is the whole game, and by day seven you'll be able to tell which one you're holding." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Attraction produces involuntary attention and behavioral cues that are difficult to fully suppress. The reliable signal is cross-situational consistency — a pattern over time — not any single ambiguous moment.' },
    ],
  },
  w07_a2: {
    title: 'The Friend Who Went Quiet for a Reason',
    subtitle: 'Sometimes distance is the loudest confession',
    blocks: [
      { type: 'paragraph', text: "There's a specific kind of quiet that means the opposite of not caring. A friend who was easy and constant suddenly gets careful — replies shorter, hangs back, seems to be managing something around you. It's tempting to read it as cooling off. Sometimes it's the exact reverse: they went quiet because the feelings got too big to be casual about." },
      { type: 'heading', text: 'Why closeness makes them retreat' },
      { type: 'paragraph', text: "When a friend develops feelings, the friendship stops being simple for them. Every hangout becomes a small performance of not-showing. That's exhausting, and some people manage it by pulling back — creating distance not because they feel less, but because being close while hiding so much is unbearable. The withdrawal is a pressure valve, not a verdict." },
      { type: 'paragraph', text: "The tell that separates this from ordinary drift: the quiet friend still surfaces. They pull back but they don't disappear; they get awkward but not cold; there's a charge to the distance, not the flatness of someone who's genuinely moved on. Real drift is smooth and indifferent. Feelings-driven retreat is jagged — full of near-approaches and quick withdrawals, like someone standing at a door they can't decide to open." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Managing concealed attraction in an existing friendship is cognitively taxing, and withdrawal is a documented coping response. The jagged, still-tethered quality of the distance distinguishes it from genuine disengagement.' },
    ],
  },
  w07_a3: {
    title: 'Why People Bury Attraction Under Teasing',
    subtitle: 'The oldest disguise in the book',
    blocks: [
      { type: 'paragraph', text: "The playground taught a lesson people never quite unlearn: when you like someone and can't say it, you poke at them. Adults do a more sophisticated version — the constant banter, the affectionate mockery, the person who never misses a chance to give you a hard time. Teasing is a disguise attraction wears when sincerity feels too dangerous." },
      { type: 'heading', text: 'How the disguise works' },
      { type: 'paragraph', text: "Teasing is plausibly deniable intimacy. It lets someone pay you enormous attention, create private in-jokes, and generate constant one-on-one charge — all while maintaining that it's 'just messing around.' If you responded warmly, they could retreat to 'I was only joking.' The teasing is a way of being close to you while keeping an exit permanently open." },
      { type: 'paragraph', text: "But not all teasing is a crush, which is where people misread. The difference is warmth and focus. Affectionate teasing is warm underneath, specifically aimed at you, and paired with real attention — they tease you AND they remember your bad week. Contemptuous teasing is cold underneath and often performed for others. One is flirtation in a mask. The other is just someone being unkind. Read the temperature under the joke, not the joke." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Playful teasing frequently functions as indirect affiliation and flirtation — a low-risk way to signal interest with built-in deniability. Warmth and target-specificity distinguish affectionate teasing from mere hostility.' },
    ],
  },
  w07_a4: {
    title: 'The Tells of a Secret Crush',
    subtitle: 'A field guide to the involuntary',
    blocks: [
      { type: 'paragraph', text: "People guard the obvious signals and forget the small ones — and the small ones are more honest precisely because they're not chosen. Here's the field guide to the involuntary tells, the things a secret crush does without deciding to." },
      { type: 'heading', text: 'The involuntary set' },
      { type: 'orderedList', items: [
        { title: 'The scan', text: 'Their eyes find you when you enter, and find you again when you laugh at something. Attention has a direction, and it keeps pointing at you.' },
        { title: 'The memory', text: 'They retain things you barely mentioned — a band, a date, an offhand worry. We effortlessly remember what we care about; effortful recall of your small details is a tell.' },
        { title: 'The proximity', text: 'They end up near you. In group settings, geometry keeps rearranging so they\'re in your orbit — usually without either of you engineering it.' },
        { title: 'The reaction', text: 'You get a disproportionate response — too-bright laughter, a flush, sudden nervousness or over-formality. Their nervous system reacts to you differently than to others.' },
      ] },
      { type: 'paragraph', text: "One tell is noise. The power is in the stack: several of these, aimed consistently at you, over weeks. A single instance proves nothing — anyone can remember one thing or sit near you once. A pattern across all four channels is much harder to explain as coincidence, and much harder for the person to hide even when they're trying." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Attentional bias, enhanced memory for the object of attraction, proximity-seeking, and heightened physiological reactivity are all documented correlates of romantic interest. Convergence across cues is far more diagnostic than any single one.' },
    ],
  },
  w07_a5: {
    title: 'Avoidance as a Love Language (the Painful Kind)',
    subtitle: 'When someone handles feelings by fleeing them',
    blocks: [
      { type: 'paragraph', text: "For some people, strong feelings don't produce approach — they produce escape. The more they like you, the more they avoid you, because closeness itself is what sets off their alarm. It's one of the cruelest patterns to be on the receiving end of, because their behavior says 'go away' while their feeling says the opposite, and you're left holding a contradiction you didn't create." },
      { type: 'heading', text: 'Why more feeling means more distance' },
      { type: 'paragraph', text: "For someone with an avoidant wiring, intimacy is genuinely threatening — it was, at some early point, associated with being hurt or engulfed. So the system learned a rule: when it gets real, get out. This means their strongest feelings trigger their strongest retreats. The person they like most is the person they flee hardest from, which looks like rejection and is actually its own kind of overwhelmed devotion." },
      { type: 'paragraph', text: "Understanding this is not the same as signing up for it. Avoidant retreat can be real feeling AND a bad experience to build a relationship on, because the distance is the whole point of their strategy — closeness undoes it, so the pattern often repeats endlessly. Read it clearly: this person may genuinely feel something. Whether their feeling can survive their own need to escape it is a separate question, and not one you can answer for them by loving them harder." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Avoidant attachment produces deactivation under intimacy: increasing closeness triggers increasing withdrawal. The retreat can co-exist with real attraction, which is precisely what makes the pattern so painful and so persistent.' },
    ],
  },
  w07_a6: {
    title: 'When Fear of Rejection Looks Like Indifference',
    subtitle: 'The mask that costs people the thing they want most',
    blocks: [
      { type: 'paragraph', text: "Here's a tragedy that plays out constantly: someone likes you so much they act like they don't like you at all. Terrified of rejection, they pre-emptively perform indifference — cool, casual, unbothered — as armor. The logic is desperate but human: if I never show I care, I can never be rejected for caring. The armor works so well it often costs them exactly what they wanted." },
      { type: 'heading', text: 'How to spot fear wearing an indifferent face' },
      { type: 'paragraph', text: "The difference between real indifference and defensive indifference is effort. A genuinely indifferent person spends no energy on you — they're not cold, they're just absent. A defensively indifferent person is spending enormous energy LOOKING indifferent, and that effort leaks. They're carefully casual. Their aloofness has a self-conscious quality. They act unbothered in a way that's clearly bothered — checking your reaction to their non-reaction, present in the exact way an absent person wouldn't be." },
      { type: 'paragraph', text: "The other tell is inconsistency between channels. The words and posture say 'I don't care,' but the behavior betrays them: they still show up, still find reasons to be near you, still remember, still react. When someone's stated indifference and actual behavior disagree, the behavior is the truth and the indifference is the costume. Real not-caring doesn't require a performance." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Fear of rejection commonly produces protective self-presentation — feigned disinterest as pre-emptive defense. The effortful, self-conscious quality of the "indifference," and its mismatch with actual behavior, reveal the mask.' },
    ],
  },
  w07_a7: {
    title: "Reading the Person Who Won't Make the First Move",
    subtitle: 'Silence is not always a no — but it might be',
    blocks: [
      { type: 'paragraph', text: "After six days of decoding hidden feelings, the honest final chapter: sometimes no move gets made because there's no feeling to move on — and the whole trail you've been reading was written by your hope, not their heart. This isn't a failure of perception. It's the most human error there is: we see most vividly what we most want to see." },
      { type: 'heading', text: 'The one question that separates signal from wish' },
      { type: 'paragraph', text: "Ask this: would a neutral outsider, shown only the facts, reach the same conclusion I have? Not 'do I feel a spark' — feelings are not evidence of mutual feelings. But 'is there a consistent, cross-situational pattern that a stranger would also notice?' If yes — if the attention, the memory, the proximity, the reactivity all point the same way over weeks — then someone probably IS hiding something, and their not-moving is fear, not absence. If the honest answer is that you're stringing together a few warm moments across a lot of ordinary ones, that's worth knowing too." },
      { type: 'paragraph', text: "And here's the freeing part, whichever way it lands: you don't have to stay in the decoding forever. If the pattern is real and the only thing missing is courage — theirs or yours — a small, low-stakes move can end months of guessing. If the pattern isn't real, seeing that clearly frees you from building on a foundation that was never there. Either way, the exit from the maze is the same: stop reading tea leaves, and gently test the actual water." },
      { type: 'quote', text: 'Feelings are not evidence of mutual feelings. The pattern is the evidence — or its absence is.', attribution: 'On the last read' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Wishful perception biases us toward reading desired outcomes into ambiguous cues. The neutral-observer test — demanding a cross-situational pattern, not a felt spark — is a documented corrective for that bias.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w07Questions: DailyQuestion[] = [
  {
    id: 'w07_q1',
    text: L('Think of the person you suspect. How are they different with YOU than with others?'),
    answers: [
      { label: L('Noticeably different — softer, sharper, more present'), insight: L('A person who is a different self only around you is leaking something.') },
      { label: L('They go oddly quiet and careful near me'), insight: L('Careful, jagged distance around one person is often hidden feeling, not cooling.') },
      { label: L("Honestly the same as with everyone — warm to all"), insight: L('When the warmth isn\'t special to you, it may just be their baseline.') },
      { label: L("I want them to be different, but I can't point to how"), insight: L('A difference you can feel but never name may live in you, not them.') },
    ],
  },
  {
    id: 'w07_q2',
    text: L('What do they seem to remember about you?'),
    answers: [
      { label: L('Tiny things I barely mentioned, resurfaced months later'), insight: L('Effortless memory of your small details is attention pointing one way.') },
      { label: L('They recall things but stay guarded about why they care'), insight: L('Remembering closely while hiding the interest is a quiet admirer\'s tell.') },
      { label: L("About as much as any attentive friend would"), insight: L('Ordinary friendly recall is not the same as a fixed gaze.') },
      { label: L("I've replayed our talks so much I'm not sure what's real"), insight: L('When you\'ve rehearsed the evidence, some of it may be your own writing.') },
    ],
  },
  {
    id: 'w07_q3',
    text: L('How do they behave physically around you — space, nerves, reactions?'),
    answers: [
      { label: L('They end up near me and react a beat too strongly'), insight: L('Proximity plus outsized reactions is the body saying what the mouth won\'t.') },
      { label: L('Flustered, over-formal, awkward — like they\'re managing something'), insight: L('Static and formality around one person is feeling that can\'t come out as warmth.') },
      { label: L('Relaxed and normal, same as with anyone'), insight: L('An easy, unflustered nervous system usually isn\'t hiding a charge.') },
      { label: L("I search their face for signs more than I observe it"), insight: L('Hunting for tells can manufacture the very tells you find.') },
    ],
  },
  {
    id: 'w07_q4',
    text: L('If they tease or joke with you, what\'s underneath it?'),
    answers: [
      { label: L('Warmth aimed only at me, plus real attention'), insight: L('Warm, targeted teasing with care underneath is flirtation in a mask.') },
      { label: L('A charged banter they hide behind, never quite sincere'), insight: L('Deniable teasing that avoids sincerity keeps an admirer\'s exit open.') },
      { label: L('The same joking they do with the whole group'), insight: L('Teasing performed for everyone isn\'t a private signal to you.') },
      { label: L("I read flirtation into pretty ordinary banter"), insight: L('Reading romance into normal joking is hope doing the decoding.') },
    ],
  },
  {
    id: 'w07_q5',
    text: L('When feelings might be getting close, what do they do?'),
    answers: [
      { label: L('Lean in, nervous but there'), insight: L('Approaching despite the nerves is someone whose feeling beats their fear.') },
      { label: L('Retreat hard — the closer we get, the more they vanish'), insight: L('Fleeing hardest at closeness can be overwhelmed feeling, not absence.') },
      { label: L('Nothing changes — there\'s no charge to react to'), insight: L('No shift at closeness often means there was no hidden charge.') },
      { label: L("I create the 'close moments' myself, then read into them"), insight: L('Moments you engineer aren\'t evidence of what they feel.') },
    ],
  },
  {
    id: 'w07_q6',
    text: L('They act like they don\'t care. What does their behavior actually do?'),
    answers: [
      { label: L('Betrays them — they show up, remember, react anyway'), insight: L('When stated indifference and real behavior disagree, behavior is the truth.') },
      { label: L("Carefully casual — 'unbothered' in a clearly bothered way"), insight: L('Effortful indifference is fear wearing a costume; real not-caring needs no performance.') },
      { label: L('Matches the words — they genuinely spend no energy on me'), insight: L('True indifference is absent, not cold; no effort means no hidden feeling.') },
      { label: L("I keep hoping the coldness is secretly a yes"), insight: L('Hoping coldness is a disguise is sometimes just hope refusing a no.') },
    ],
  },
  {
    id: 'w07_q7',
    text: L('Would a neutral stranger, shown only the facts, agree with you?'),
    answers: [
      { label: L('Yes — the pattern is consistent across weeks and settings'), insight: L('A pattern a stranger would also see is real evidence, not a wish.') },
      { label: L("They'd say 'someone is clearly holding something back'"), insight: L('When outsiders read concealment too, the hidden feeling is likely real.') },
      { label: L("They'd probably say we're just friendly"), insight: L('If the neutral read is "just friends," that\'s worth trusting over the spark.') },
      { label: L("Honestly? They'd say it's mostly in my head"), insight: L('Naming that the trail is yours frees you from a foundation that was never there.') },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w07Week: WeeklyTheme = {
  id: 'w07_hidden_feelings',
  title: L('Hidden Feelings'),
  category: 'love',
  resultPrompt: L('Who around you is hiding how they feel — and how sure can you be?'),
  days: [
    { articleId: 'w07_a1', questionId: 'w07_q1' },
    { articleId: 'w07_a2', questionId: 'w07_q2' },
    { articleId: 'w07_a3', questionId: 'w07_q3' },
    { articleId: 'w07_a4', questionId: 'w07_q4' },
    { articleId: 'w07_a5', questionId: 'w07_q5' },
    { articleId: 'w07_a6', questionId: 'w07_q6' },
    { articleId: 'w07_a7', questionId: 'w07_q7' },
  ],
  outcomes: [
    {
      key: 'someone_hiding',
      title: L('Someone Is Hiding It'),
      body: L("The evidence stacks up and it points one way: someone near you is holding a feeling underwater, and it keeps leaking through the cracks. The attention finds you, the memory holds your smallest details, the body reacts a beat too strongly — and a neutral stranger would see it too. This isn't your hope writing a story; it's a pattern across weeks and settings. Their not-moving is fear, not absence. The only thing missing now is a small, low-stakes move — theirs or yours — to end the guessing."),
      shareLine: L("Hidden feelings leak. Theirs have been leaking for weeks."),
    },
    {
      key: 'quiet_admirer',
      title: L('The Quiet Admirer'),
      body: L("There's a real charge here — but it lives behind a mask. The teasing that never turns sincere, the closeness kept plausibly deniable, the person who is warmer with you than they'll admit: this is someone who feels something and is guarding every exit while they do. Concealed, but real. Whether it ever steps into the open depends on their courage more than your reading — but you're not imagining the charge. Sometimes the mask slips when it's given a safe, easy reason to."),
      shareLine: L('Some people flirt in a mask, hoping you\'ll read it anyway.'),
    },
    {
      key: 'just_friendly',
      title: L('Just Genuinely Friendly'),
      body: L("Here's the clear-eyed read, offered gently: what you're seeing looks like warmth without a secret underneath. They're kind to you — but about as kind to everyone; they remember things — the way attentive friends do; nothing shifts when closeness rises, because there's no hidden charge to shift. That's not a rejection, and it's not nothing — genuine friendliness is its own good thing. It just isn't the concealed feeling you were testing for. Knowing that saves you months of decoding an ordinary kindness."),
      shareLine: L('Not every warm person is a secret crush. Some are just warm.'),
    },
    {
      key: 'your_hope',
      title: L('The Story Is Yours'),
      body: L("The tender plot twist: most of the trail you've been reading, you wrote. The 'close moments' were ones you engineered; the evidence got rehearsed until it felt solid; the coldness became a puzzle you hoped hid a yes. Feelings are not evidence of mutual feelings — and a neutral stranger, shown the raw facts, wouldn't build the cathedral you built. This isn't foolish; it's the most human error there is, seeing most vividly what we most want. Seeing it clearly frees you from a foundation that was never really there."),
      shareLine: L("Feelings aren't evidence of mutual feelings. Sometimes the story is ours."),
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned. Balanced 7/7/7/7, all rows 4-distinct.
  answerOutcomes: {
    w07_q1: ['someone_hiding', 'quiet_admirer', 'just_friendly', 'your_hope'],
    w07_q2: ['someone_hiding', 'quiet_admirer', 'just_friendly', 'your_hope'],
    w07_q3: ['someone_hiding', 'quiet_admirer', 'just_friendly', 'your_hope'],
    w07_q4: ['someone_hiding', 'quiet_admirer', 'just_friendly', 'your_hope'],
    w07_q5: ['someone_hiding', 'quiet_admirer', 'just_friendly', 'your_hope'],
    w07_q6: ['someone_hiding', 'quiet_admirer', 'just_friendly', 'your_hope'],
    w07_q7: ['someone_hiding', 'quiet_admirer', 'just_friendly', 'your_hope'],
  },
};
