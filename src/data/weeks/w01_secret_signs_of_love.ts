/**
 * AURAFY — WEEK 1 CONTENT  ·  "Secret Signs of Love"  ·  category: love  ·  module: who_loves_me
 * Authored via the aurafy-week-generator skill. FR/AR/ES translated (translation session, batch W01).
 *
 * Measures: how clearly is someone showing they love you?
 * 4 outcomes: clearly_loved · quietly_cared · mixed_signals · reading_into_it
 *
 * INTEGRATION (Claude Code):
 *  - Day 1 reuses the EXISTING article id 'ten_signs_secret_love' (already in ARTICLES + content.en.ts) —
 *    do NOT recreate it. Days 2–7 are the new articles below.
 *  - Append `w01Articles` to the ARTICLES array (src/content/articles/index.ts).
 *  - Merge `w01ArticlesEn` into the EN content map (src/content/articles/content.en.ts). FR/AR/ES bodies
 *    for w01_a2..w01_a7 are translated into content.fr.ts / content.ar.ts / content.es.ts.
 *  - Push `w01Week` into WEEKS (src/data/weeks/index.ts) and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { WeeklyTheme } from './types';

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
/* EN is source-of-truth — never edit. FR/AR/ES bodies for these ids live in
 * content.fr.ts / content.ar.ts / content.es.ts under the same keys. */

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

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w01Week: WeeklyTheme = {
  id: 'w01_secret_signs_of_love',
  title: {
    en: 'Secret Signs of Love',
    fr: "Signes secrets de l'amour",
    ar: 'علامات الحب الخفية',
    es: 'Señales secretas del amor',
  },
  category: 'love',
  resultPrompt: {
    en: 'How clearly is someone showing they love you?',
    fr: 'À quel point cette personne montre-t-elle clairement qu\'elle t\'aime ?',
    ar: 'إلى أي مدى يُظهر لك أحدهم بوضوح أنه يحبك؟',
    es: '¿Con cuánta claridad te está mostrando alguien que te ama?',
  },
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
      title: { en: 'Clearly Loved', fr: 'Clairement aimé', ar: 'محبوب بوضوح', es: 'Claramente amado' },
      body: {
        en: "The signs aren't subtle once you stop second-guessing them. This person shows up, remembers, and turns toward you again and again — the quiet, repeating proof that someone has chosen you. You're not imagining the warmth. You're reading it correctly.",
        fr: "Les signes ne sont plus discrets dès que tu arrêtes de douter d'eux. Cette personne est présente, se souvient, et se tourne vers toi encore et encore — la preuve tranquille et répétée que quelqu'un t'a choisi. Tu n'imagines pas cette chaleur. Tu la lis correctement.",
        ar: 'العلامات لم تعد خفية بمجرد أن تتوقف عن الشك فيها. هذا الشخص يحضر، ويتذكّر، ويتّجه نحوك مرارًا وتكرارًا — البرهان الهادئ والمتكرر على أن أحدهم اختارك. أنت لا تتخيّل هذا الدفء، بل تقرؤه بشكل صحيح.',
        es: 'Las señales dejan de ser sutiles en cuanto dejas de dudar de ellas. Esta persona aparece, recuerda y se vuelve hacia ti una y otra vez —la prueba tranquila y repetida de que alguien te ha elegido. No estás imaginando esa calidez. La estás leyendo correctamente.',
      },
      shareLine: {
        en: "The signs aren't subtle — they're just quiet.",
        fr: 'Les signes ne sont pas discrets — juste silencieux.',
        ar: 'العلامات ليست خفية — إنها هادئة فقط.',
        es: 'Las señales no son sutiles: solo son silenciosas.',
      },
    },
    {
      key: 'quietly_cared',
      title: { en: 'Quietly Cared For', fr: 'Aimé en silence', ar: 'محبوب بصمت', es: 'Amado en silencio' },
      body: {
        en: "There is real care here, but it speaks softly. This is love that hasn't fully found its voice yet — warm in the actions, shy in the words. Don't mistake the quiet for absence. Some of the deepest affection is the kind that hasn't learned how to announce itself.",
        fr: "Il y a une réelle attention ici, mais elle parle tout bas. C'est un amour qui n'a pas encore trouvé sa pleine voix — chaleureux dans les actes, timide dans les mots. Ne confonds pas le silence avec l'absence. Certaines des affections les plus profondes sont celles qui n'ont pas encore appris à s'annoncer.",
        ar: 'هناك اهتمام حقيقي هنا، لكنه يتحدّث بصوت خافت. هذا حب لم يجد صوته الكامل بعد — دافئ في الأفعال، خجول في الكلمات. لا تخلط بين الهدوء والغياب. بعض أعمق أنواع المودة هو ذلك الذي لم يتعلّم بعد كيف يُعلن عن نفسه.',
        es: 'Aquí hay un cariño real, pero habla en voz baja. Es un amor que aún no ha encontrado del todo su voz —cálido en los actos, tímido en las palabras. No confundas el silencio con la ausencia. Algunos de los afectos más profundos son los que todavía no han aprendido a anunciarse.',
      },
      shareLine: {
        en: 'Some love is just shy, not small.',
        fr: 'Certains amours sont timides, pas petits.',
        ar: 'بعض الحب خجول فقط، لا صغير.',
        es: 'Algunos amores solo son tímidos, no pequeños.',
      },
    },
    {
      key: 'mixed_signals',
      title: { en: 'Mixed Signals', fr: 'Signaux mixtes', ar: 'إشارات متضاربة', es: 'Señales mixtas' },
      body: {
        en: "Hot then cold, present then gone — the inconsistency you're feeling is real, not paranoia. Often it means a genuine pull fighting with a genuine fear inside them. That's their work to resolve, not yours to decode forever. Watch the pattern, and let actions outweigh words.",
        fr: "Chaud puis froid, présent puis absent — l'inconstance que tu ressens est réelle, ce n'est pas de la paranoïa. Elle signifie souvent une attirance sincère qui se bat contre une peur tout aussi sincère en eux. C'est leur travail à résoudre, pas le tien à déchiffrer éternellement. Observe le schéma, et laisse les actes peser plus lourd que les mots.",
        ar: 'حارّ ثم بارد، حاضر ثم غائب — عدم الثبات الذي تشعر به حقيقي، وليس وهمًا. غالبًا ما يعني ذلك انجذابًا صادقًا يصارع خوفًا صادقًا بداخله. هذا عملٌ عليه هو أن يحلّه، لا عليك أن تفكّ شيفرته إلى الأبد. راقب النمط، ودع الأفعال ترجح على الكلمات.',
        es: 'Ardiente y luego frío, presente y luego ausente —la inconstancia que sientes es real, no paranoia. A menudo significa un impulso genuino que lucha contra un miedo igual de genuino dentro de esa persona. Ese es su trabajo por resolver, no el tuyo por descifrar eternamente. Observa el patrón, y deja que los actos pesen más que las palabras.',
      },
      shareLine: {
        en: 'Hot and cold is still an answer.',
        fr: 'Le chaud-froid est déjà une réponse.',
        ar: 'الحرارة والبرودة معًا هما إجابة أيضًا.',
        es: 'Lo ardiente y lo frío también es una respuesta.',
      },
    },
    {
      key: 'reading_into_it',
      title: { en: 'Reading Into It', fr: "Trop d'espoir", ar: 'قراءة الأمل', es: 'Demasiada esperanza' },
      body: {
        en: "Be gentle with yourself here: most of what you're holding is hope, not evidence. The signals are thin, and a longing heart fills in the blanks with what it wishes were true. That doesn't make you foolish — it makes you human. But the proof isn't there yet.",
        fr: "Sois doux avec toi-même ici : la plupart de ce que tu portes est de l'espoir, pas des preuves. Les signaux sont ténus, et un cœur qui désire comble les vides avec ce qu'il souhaite être vrai. Cela ne fait pas de toi quelqu'un de naïf — cela fait de toi quelqu'un d'humain. Mais la preuve n'est pas encore là.",
        ar: 'كن رفيقًا بنفسك هنا: معظم ما تحمله هو أمل، لا دليل. الإشارات خافتة، وقلبٌ يتوق يملأ الفراغات بما يتمنى أن يكون حقيقيًا. هذا لا يجعلك ساذجًا — بل يجعلك إنسانًا. لكن البرهان لم يصل بعد.',
        es: 'Sé compasivo contigo mismo aquí: casi todo lo que sostienes es esperanza, no evidencia. Las señales son tenues, y un corazón anhelante rellena los vacíos con lo que desea que sea verdad. Eso no te hace ingenuo: te hace humano. Pero la prueba aún no está ahí.',
      },
      shareLine: {
        en: 'Sometimes the heart reads hope as signal.',
        fr: "Parfois, le cœur lit l'espoir comme un signal.",
        ar: 'أحيانًا يقرأ القلب الأمل على أنه إشارة.',
        es: 'A veces el corazón lee la esperanza como una señal.',
      },
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
