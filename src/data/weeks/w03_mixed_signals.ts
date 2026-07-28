/**
 * AURAFY — WEEK 3 CONTENT  ·  "Mixed Signals"  ·  category: love  ·  module: who_loves_me
 * Authored via the aurafy-week-generator skill. FR/AR/ES translated (translation session, batch W02-03).
 *
 * Measures: what is their contradictory behavior actually telling you?
 * 4 outcomes: leaning_yes · torn_inside · comfortable_gray · your_static
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w03_a1 … w03_a7.
 *  - Append `w03Articles` to the ARTICLES array (src/content/articles/index.ts).
 *  - Merge `w03ArticlesEn` into the EN content map (src/content/articles/content.en.ts). FR/AR/ES bodies
 *    live in content.fr.ts / content.ar.ts / content.es.ts under the same ids.
 *  - Push `w03Week` into WEEKS (src/data/weeks/index.ts), AFTER w02Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { WeeklyTheme } from './types';

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
/* EN is source-of-truth — never edit. FR/AR/ES bodies for these ids live in
 * content.fr.ts / content.ar.ts / content.es.ts under the same keys. */

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
        { title: 'Convenience', text: "They run warm when they need something — attention, comfort, an ego refill — and cool when they don't. Watch whether the warmth tracks YOUR life or THEIR needs." },
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
      { type: 'paragraph', text: 'A person parked in ambiguity keeps your attention, your affection, and your availability while paying the price of none of it. They enjoy being adored without being accountable. The tell is what happens when you reach for definition: the subject changes, the humor deploys, "why do we need labels" arrives right on schedule — and then, if you pull back, a burst of warmth reels you back to exactly the undefined spot you tried to leave.' },
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

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w03Week: WeeklyTheme = {
  id: 'w03_mixed_signals',
  title: {
    en: 'Mixed Signals',
    fr: 'Signaux mixtes',
    ar: 'إشارات متضاربة',
    es: 'Señales mixtas',
  },
  category: 'love',
  resultPrompt: {
    en: 'What is their contradictory behavior actually telling you?',
    fr: 'Que te dit vraiment son comportement contradictoire ?',
    ar: 'بماذا يخبرك سلوكه المتناقض فعليًا؟',
    es: '¿Qué te está diciendo realmente su comportamiento contradictorio?',
  },
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
      title: { en: 'Quietly Leaning Yes', fr: 'Doucement vers le oui', ar: 'يميل بهدوء نحو "نعم"', es: 'Inclinado hacia el sí' },
      body: {
        en: 'Strip away the noise and the signal underneath leans one way: toward you. The warmth is unprompted, the actions keep arriving, and when you reach for definition they stay in the room. What read as "mixed" was mostly ordinary human weather over a real yes. Stop re-testing it — and maybe be the one who says the clear thing first.',
        fr: "Enlève le bruit et le signal en dessous penche dans une seule direction : vers toi. La chaleur est spontanée, les actes continuent d'arriver, et quand tu cherches à définir les choses, il reste dans la pièce. Ce qui ressemblait à du « mixte » était surtout de la météo humaine ordinaire par-dessus un vrai oui. Arrête de le retester — et sois peut-être celui ou celle qui dit la chose claire en premier.",
        ar: 'أزل الضجيج وستجد أن الإشارة تحتها تميل في اتجاه واحد: نحوك أنت. الدفء غير مُستدعى، الأفعال تستمر في الحضور، وحين تسعى إلى التحديد يبقى في الغرفة. ما بدا "متضاربًا" كان في معظمه طقسًا إنسانيًا عاديًا فوق "نعم" حقيقية. توقف عن إعادة اختباره — وربما كن أنت من يقول الشيء الواضح أولًا.',
        es: 'Quita el ruido y la señal debajo se inclina en una sola dirección: hacia ti. La calidez es espontánea, los actos siguen llegando, y cuando buscas definición él se queda en la sala. Lo que se leía como «mixto» era sobre todo clima humano ordinario sobre un sí real. Deja de volver a probarlo —y quizás sé tú quien diga la cosa clara primero.',
      },
      shareLine: {
        en: 'Under the mixed signals, a quiet yes.',
        fr: 'Sous les signaux mixtes, un oui silencieux.',
        ar: 'تحت الإشارات المتضاربة، "نعم" هادئة.',
        es: 'Bajo las señales mixtas, un sí silencioso.',
      },
    },
    {
      key: 'torn_inside',
      title: { en: 'Torn Inside', fr: "Déchiré à l'intérieur", ar: 'ممزّق من الداخل', es: 'Dividido por dentro' },
      body: {
        en: "Both things you've felt are real: they want this, and something in them is terrified of it. The heat is the want; the cold is the fear winning that week. That's a war inside them — one you can have compassion for, but not one you can fight on their behalf. Decide how long you can love someone at the pace of their fear, and let that be YOUR clear answer.",
        fr: "Les deux choses que tu as ressenties sont réelles : il veut cette relation, et quelque chose en lui en a terriblement peur. La chaleur, c'est l'envie ; le froid, c'est la peur qui gagne cette semaine-là. C'est une guerre en lui — une guerre pour laquelle tu peux avoir de la compassion, mais pas une guerre que tu peux mener à sa place. Décide combien de temps tu peux aimer quelqu'un au rythme de sa peur, et laisse cela être TA réponse claire.",
        ar: 'كلا الشيئين اللذين شعرت بهما حقيقيان: هو يريد هذا، وشيء بداخله مرعوب منه. الحرارة هي الرغبة؛ البرودة هي الخوف وهو يفوز في ذلك الأسبوع. هذه حرب بداخله — حرب يمكنك أن تتعاطف معها، لكن ليست حربًا يمكنك خوضها نيابة عنه. قرّر إلى متى تستطيع أن تحب شخصًا بوتيرة خوفه، ودع هذا يكون إجابتك أنت الواضحة.',
        es: 'Las dos cosas que has sentido son reales: quiere esto, y algo en él está aterrado por ello. El calor es el deseo; el frío es el miedo ganando esa semana. Esa es una guerra dentro de él —una por la que puedes sentir compasión, pero no una que puedas pelear en su lugar. Decide cuánto tiempo puedes amar a alguien al ritmo de su miedo, y deja que esa sea TU respuesta clara.',
      },
      shareLine: {
        en: 'They want it and fear it — both are true.',
        fr: 'Il le veut et le craint — les deux sont vrais.',
        ar: 'يريده ويخافه — كلاهما صحيح.',
        es: 'Lo quiere y le teme — ambas cosas son ciertas.',
      },
    },
    {
      key: 'comfortable_gray',
      title: { en: 'Comfortable in the Gray', fr: 'À l\'aise dans le gris', ar: 'مرتاح في المنطقة الرمادية', es: 'Cómodo en el gris' },
      body: {
        en: "The hardest verdict, said kindly: the ambiguity isn't confusion — it's comfortable. You've been kept warm enough to stay and undefined enough to owe nothing, and every reach for clarity got charmed away. They may genuinely like you; that was never the question. They like the access more than they want the role. The gray is the answer, and you're free to stop living in it.",
        fr: "Le verdict le plus difficile, dit avec bienveillance : l'ambiguïté n'est pas de la confusion — c'est confortable. On t'a gardé assez chaleureux pour que tu restes et assez indéfini pour ne rien devoir, et chaque tentative de clarté a été charmée pour disparaître. Il peut réellement t'apprécier ; ça n'a jamais été la question. Il aime l'accès plus qu'il ne veut le rôle. Le gris est la réponse, et tu es libre d'arrêter d'y vivre.",
        ar: 'أصعب حكم، يُقال بلطف: الغموض ليس ارتباكًا — إنه مريح. أُبقيت دافئًا بما يكفي لتبقى، وغير مُحدَّد بما يكفي ليدين بشيء، وكل محاولة للوضوح سُحرت بعيدًا. قد يعجب بك بصدق؛ لم يكن ذلك السؤال أبدًا. هو يحب الوصول أكثر مما يريد الدور. المنطقة الرمادية هي الإجابة، وأنت حرّ في التوقف عن العيش فيها.',
        es: 'El veredicto más difícil, dicho con amabilidad: la ambigüedad no es confusión —es cómoda. Te han mantenido lo bastante cálido para que te quedes y lo bastante indefinido para no deber nada, y cada intento de claridad fue encantado hasta desaparecer. Puede que genuinamente le gustes; esa nunca fue la pregunta. Le gusta el acceso más de lo que quiere el papel. El gris es la respuesta, y eres libre de dejar de vivir en él.',
      },
      shareLine: {
        en: 'Warm enough to stay, vague enough to owe nothing.',
        fr: 'Assez chaleureux pour rester, assez flou pour ne rien devoir.',
        ar: 'دافئ بما يكفي لتبقى، غامض بما يكفي ليدين بشيء.',
        es: 'Lo bastante cálido para quedarse, lo bastante vago para no deber nada.',
      },
    },
    {
      key: 'your_static',
      title: { en: 'The Static Is Yours', fr: 'Le brouillage vient de toi', ar: 'التشويش تشويشك أنت', es: 'La estática es tuya' },
      body: {
        en: "Here's the plot twist, offered gently: the signals were mostly steady — the mixing happened in the space between texts, where your alarm system writes its scariest drafts. That alarm got sensitive for real, historical reasons; this isn't blame. But no amount of decoding THEM will quiet a noise that's coming from inside. Calibrate the instrument, ask instead of archive — the steadiness you're looking for may already be here.",
        fr: "Voici le rebondissement, offert avec douceur : les signaux étaient surtout stables — le mélange s'est produit dans l'espace entre les textos, là où ton système d'alarme écrit ses brouillons les plus effrayants. Cette alarme est devenue sensible pour de vraies raisons historiques ; ce n'est pas un blâme. Mais aucune quantité de décryptage de LUI ne fera taire un bruit qui vient de l'intérieur. Calibre l'instrument, demande au lieu d'archiver — la stabilité que tu cherches est peut-être déjà là.",
        ar: 'إليك المفاجأة، مُقدَّمة بلطف: كانت الإشارات ثابتة في معظمها — حدث الخلط في المساحة بين الرسائل، حيث يكتب نظام إنذارك أسوأ مسوَّداته. أصبح ذلك الإنذار حساسًا لأسباب تاريخية حقيقية؛ هذا ليس لومًا. لكن لن يُسكِت أي قدر من فكّ شيفرته هو ضجيجًا يأتي من الداخل. عايِر الأداة، اسأل بدلًا من أن تؤرشف — الثبات الذي تبحث عنه قد يكون موجودًا بالفعل هنا.',
        es: 'Aquí está el giro de la trama, ofrecido con suavidad: las señales eran en su mayoría estables —la mezcla ocurrió en el espacio entre mensajes, donde tu sistema de alarma escribe sus borradores más aterradores. Esa alarma se volvió sensible por razones históricas reales; esto no es culpa. Pero ninguna cantidad de descifrarlo A ÉL silenciará un ruido que viene de adentro. Calibra el instrumento, pregunta en vez de archivar —la estabilidad que buscas puede que ya esté aquí.',
      },
      shareLine: {
        en: 'Sometimes the mixed signal is the reader.',
        fr: 'Parfois, le signal mixte, c\'est celui qui le lit.',
        ar: 'أحيانًا تكون الإشارة المتضاربة هي القارئ نفسه.',
        es: 'A veces la señal mixta es quien la lee.',
      },
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
