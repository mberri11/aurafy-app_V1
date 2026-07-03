// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — English long-form content
// ─────────────────────────────────────────────────────────────────────────────
// One entry per article id (see ARTICLES in ./index.ts). English is the
// source-of-truth: other locales fall back here until translated.
// Long-form copy lives HERE, never in src/i18n/*.json.
// ─────────────────────────────────────────────────────────────────────────────

import type { ArticleContentMap } from './index';
// C-10 PILOT — Week 1 days 2–7 EN bodies (day 1 'ten_signs_secret_love' lives below).
import { w01ArticlesEn } from '../../data/weeks/w01_secret_signs_of_love';

export const articlesEn: ArticleContentMap = {
  ...w01ArticlesEn,
  // ───────────────────────────────────────────────────────────────────────────
  // FULL ARTICLE — relatedModuleId: 'who_loves_me'
  // ───────────────────────────────────────────────────────────────────────────
  ten_signs_secret_love: {
    title: '10 Signs Someone Secretly Loves You',
    subtitle: 'The quiet tells most people miss',
    blocks: [
      {
        type: 'paragraph',
        text: "Some people announce their love. Others let it leak out in a hundred small, deliberate gestures — the text that lands exactly when you needed it, the way they remember the coffee you mentioned once, in passing, months ago.",
      },
      {
        type: 'paragraph',
        text: 'Psychologists who study attachment call these "bids for connection." They are easy to miss because they almost never look like grand declarations. But once you can see the pattern, you start to notice who has quietly been choosing you all along.',
      },
      {
        type: 'heading',
        text: "The signs that don't lie",
      },
      {
        type: 'paragraph',
        text: "You don't need all ten. Three or four, showing up consistently, is usually the whole story.",
      },
      {
        type: 'orderedList',
        items: [
          {
            title: 'They remember the small things you only mentioned once.',
            text: 'Casual details you forgot you ever shared resurface in what they do — the snack you like, the date you were dreading. Memory follows attention, and attention follows feeling.',
          },
          {
            title: "They defend your name when you're not in the room.",
            text: "Protecting your reputation when there's nothing to gain from it is one of the purest tells. It costs them something and they pay it gladly.",
          },
          {
            title: 'They invent small reasons to stay close to you.',
            text: 'A question that could have been a text. An errand that happens to pass your way. The reason is a pretext; the closeness is the point.',
          },
          {
            title: 'Their body turns toward you before they decide to.',
            text: 'Feet, shoulders, and gaze orient toward what the nervous system already cares about. It happens a beat before conscious thought catches up.',
          },
          {
            title: 'They mirror your rhythm — your words, your pace, your mood.',
            text: 'Unconscious mimicry of phrasing and energy is the body syncing to someone it feels safe with. We echo the people we are drawn to.',
          },
          {
            title: 'They protect your routines and your peace.',
            text: 'They learn what drains you and quietly run interference — handling the small thing so it never reaches you. Care often looks like logistics.',
          },
          {
            title: 'They go a particular kind of quiet around you.',
            text: 'Not distant — attentive. The over-talking or the careful pauses are the sound of someone who suddenly cares how they come across.',
          },
          {
            title: 'They celebrate your wins like they were their own.',
            text: "Envy is the default human response to someone else's good news. Genuine, unforced delight at your success is the opposite, and it is rare.",
          },
          {
            title: 'They show up in the unglamorous moments.',
            text: 'Anyone will come to the party. The ones who love you are there for the move, the bad week, the boring favor — the moments with no audience.',
          },
          {
            title: 'They ask follow-up questions days later.',
            text: '"How did that meeting go?" about something you mentioned last Tuesday means they kept a thread of your life running quietly in the background.',
          },
        ],
      },
      {
        type: 'quote',
        text: 'Silent love speaks in a language louder than words.',
      },
      {
        type: 'image',
        asset: 'ten-signs-hero',
        caption: 'Bids for connection rarely look like declarations.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Why we can say this',
        text: 'This reading draws on attachment theory and relational psychology — not astrology. The patterns are observable, repeatable, and very human.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // EDITORIAL BACKLOG — titles + subtitles + STARTER bodies (a few blocks each).
  // These are intentionally short first drafts so the feed/reader are functional
  // and match the design; expand each body over time, same shape as the flagship
  // article above. (Other locales fall back to EN until translated.)
  // ───────────────────────────────────────────────────────────────────────────
  energy_you_carry: {
    title: 'The Energy You Carry Into a Room',
    subtitle: 'People feel you before you speak',
    blocks: [
      {
        type: 'paragraph',
        text: 'Before you say a word, you have already said something. Posture, pace, the set of your shoulders, where your eyes go — people read all of it in under a second and adjust to it without knowing they have.',
      },
      {
        type: 'paragraph',
        text: 'We call it "energy," but it is really regulation: a calm nervous system is contagious, and so is an anxious one. The room tends to match whoever is most certain of their own state.',
      },
      { type: 'heading', text: 'Set it on purpose' },
      {
        type: 'paragraph',
        text: 'You can choose the signal you lead with. A slow breath before you enter, an unhurried first sentence, attention that lands fully on one person — small inputs that tell the room it is safe to settle.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Why we can say this',
        text: 'Emotional contagion and nonverbal synchrony are well-documented in social psychology — not mysticism. You really do change the rooms you walk into.',
      },
    ],
  },

  anxious_hearts_silence: {
    title: 'Why Anxious Hearts Read Silence as Rejection',
    subtitle: 'A quiet phone is not a verdict',
    blocks: [
      {
        type: 'paragraph',
        text: 'For an anxiously attached mind, silence is rarely neutral. A delayed reply becomes a story — they are pulling away, you said too much, it is already over — and the story arrives fully formed, long before any evidence does.',
      },
      {
        type: 'paragraph',
        text: 'The nervous system learned early that connection could vanish without warning, so it treats absence as a threat to be solved immediately rather than a gap that will close on its own.',
      },
      { type: 'heading', text: 'Slow the story down' },
      {
        type: 'paragraph',
        text: 'The skill is not to stop feeling the spike, but to name it: "this is my alarm, not the facts." Most silences are about the other person\'s bandwidth, not your worth.',
      },
      {
        type: 'quote',
        text: 'The story your fear writes is not the only story available.',
      },
    ],
  },

  reading_auras_colors: {
    title: 'Reading Auras: What Each Color Really Means',
    subtitle: 'A vocabulary for the moods you sense',
    blocks: [
      {
        type: 'paragraph',
        text: 'Long before "aura" was a wellness word, cultures used color to describe temperament — and the associations are remarkably consistent. They are less a literal glow than a shared language for the energy a person gives off.',
      },
      { type: 'heading', text: 'The core palette' },
      {
        type: 'orderedList',
        items: [
          { title: 'Red — drive.', text: 'Heat, appetite, action. Magnetic up close, exhausting in excess.' },
          { title: 'Gold — warmth.', text: 'Generosity and ease; the person a room relaxes around.' },
          { title: 'Blue — calm.', text: 'Steady, reflective, trustworthy under pressure.' },
          { title: 'Violet — depth.', text: 'Intuition and imagination; lives a little in the inner world.' },
          { title: 'Green — renewal.', text: 'Balance and care; the quiet stabilizer.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'How to use this',
        text: 'Treat color as a prompt, not a label. Ask what a person\'s "color" is telling you about what they need right now.',
      },
    ],
  },

  am_i_the_problem: {
    title: 'Am I the Problem? An Honest Mirror',
    subtitle: 'The braver question, asked kindly',
    blocks: [
      {
        type: 'paragraph',
        text: 'It is the question almost no one wants to sit with — and asking it at all is usually a sign you are not, in fact, the whole problem. People who cause the most harm rarely wonder if they do.',
      },
      {
        type: 'paragraph',
        text: 'Still, an honest mirror is useful. Patterns that repeat across very different people often have one thing in common: you. Not as an accusation — as information.',
      },
      { type: 'heading', text: 'Look for the pattern, not the verdict' },
      {
        type: 'paragraph',
        text: 'Notice the moment things tend to turn — when you go cold, when you push, when you disappear. Naming your move is the start of choosing a different one.',
      },
      {
        type: 'quote',
        text: 'Accountability without shame is just clarity about what you can change.',
      },
    ],
  },

  quiet_tells_jealousy: {
    title: 'The Quiet Tells of Jealousy',
    subtitle: 'It rarely announces itself',
    blocks: [
      {
        type: 'paragraph',
        text: 'Jealousy almost never looks like jealousy. It hides inside a flat "that\'s nice," a joke with a little too much edge, a sudden coolness after your good news, the friend who competes where there was no contest.',
      },
      {
        type: 'paragraph',
        text: 'Underneath it is usually not malice but fear — that your rise means their place beside you shrinks. The tell is the mismatch between the words and the temperature.',
      },
      { type: 'heading', text: 'What to do with it' },
      {
        type: 'paragraph',
        text: 'You do not have to dim yourself to manage someone else\'s envy. But noticing it early tells you who can hold your wins — and who can only hold your struggles.',
      },
    ],
  },

  someone_pulling_away: {
    title: 'How to Tell When Someone Is Pulling Away',
    subtitle: 'Distance leaves fingerprints',
    blocks: [
      {
        type: 'paragraph',
        text: 'Withdrawal is usually quiet before it is obvious. The texts get shorter and slower. Plans become "soon." Conversations stay on the surface, and the easy silences start to feel like effort.',
      },
      { type: 'heading', text: 'The signals, in order' },
      {
        type: 'orderedList',
        items: [
          { title: 'Latency.', text: 'Replies arrive later, with less inside them.' },
          { title: 'Vagueness.', text: 'Specific plans dissolve into someday language.' },
          { title: 'Surface-only.', text: 'They stop bringing you the real stuff.' },
          { title: 'Logistics over warmth.', text: 'Contact becomes functional, not affectionate.' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Before you spiral',
        text: 'Distance can mean stress, not rejection. Ask directly and kindly — you deserve information, not a guessing game.',
      },
    ],
  },

  increase_your_aura: {
    title: 'How to Increase Your Aura',
    subtitle: 'Presence is a practice, not a gift',
    blocks: [
      {
        type: 'paragraph',
        text: '"Aura" is shorthand for presence — how fully you occupy your own space. It is not charisma you are born with; it is a set of habits anyone can build.',
      },
      { type: 'heading', text: 'Four habits that compound' },
      {
        type: 'orderedList',
        items: [
          { title: 'Slow down.', text: 'Unhurried movement reads as self-possession.' },
          { title: 'Listen all the way.', text: 'Full attention is rare enough to feel like magnetism.' },
          { title: 'Tend your state.', text: 'Sleep, light, movement — your baseline is your aura.' },
          { title: 'Keep your word.', text: 'Integrity is the quietest, strongest signal there is.' },
        ],
      },
      {
        type: 'quote',
        text: 'You do not project energy you do not have. Fill the cup first.',
      },
    ],
  },

  who_secretly_resents_you: {
    title: 'Who Secretly Resents You — and Why',
    subtitle: 'The friction no one names out loud',
    blocks: [
      {
        type: 'paragraph',
        text: 'Resentment is the emotion people work hardest to hide, because admitting it feels small. So it leaks sideways instead — through backhanded compliments, withheld enthusiasm, a generosity that always seems to come with a quiet tally.',
      },
      {
        type: 'paragraph',
        text: 'It usually grows in one of two soils: a favor that was never returned, or a comparison that someone keeps losing in their own head.',
      },
      { type: 'heading', text: 'Reading it without paranoia' },
      {
        type: 'paragraph',
        text: 'Look for repetition, not single moments. One bad day is noise; a consistent chill around specific topics is signal — and worth a gentle, direct conversation.',
      },
    ],
  },
};
