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
 *  - Append `w03Questions` to the daily-question pool (src/data/dailyQuestions.ts).
 *  - Push `w03Week` into WEEKS (src/data/weeks/index.ts), AFTER w02Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { DailyQuestion } from '../dailyQuestions';
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

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w03Questions: DailyQuestion[] = [
  {
    id: 'w03_q1',
    text: {
      en: 'When you zoom out over the last month, what shape do their signals make?',
      fr: 'Quand tu prends du recul sur le dernier mois, quelle forme prennent ses signaux ?',
      ar: 'حين تنظر بشمولية إلى الشهر الأخير، ما الشكل الذي ترسمه إشاراته؟',
      es: 'Cuando te alejas y miras el último mes, ¿qué forma toman sus señales?',
    },
    answers: [
      {
        label: { en: 'Mostly warm — the cold days are rare exceptions', fr: 'Chaleureux la plupart du temps — les jours froids sont de rares exceptions', ar: 'دافئ في معظمه — الأيام الباردة استثناءات نادرة', es: 'Cálido la mayor parte del tiempo — los días fríos son excepciones raras' },
        insight: { en: 'A warm baseline with rare dips is a yes wearing ordinary weather.', fr: 'Une base chaleureuse avec de rares baisses, c\'est un oui habillé en météo ordinaire.', ar: 'خط أساسي دافئ مع انخفاضات نادرة هو "نعم" يرتدي طقسًا عاديًا.', es: 'Una base cálida con caídas raras es un sí vestido de clima ordinario.' },
      },
      {
        label: { en: 'Real highs, real lows, in a loop', fr: 'De vrais hauts, de vrais bas, en boucle', ar: 'ارتفاعات حقيقية، وانخفاضات حقيقية، في حلقة متكررة', es: 'Altibajos reales, en bucle' },
        insight: { en: 'A repeating loop of hot and cold is a conflict, not a coincidence.', fr: 'Une boucle répétée de chaud et froid est un conflit, pas une coïncidence.', ar: 'حلقة متكررة من الحرارة والبرودة هي صراع، لا مصادفة.', es: 'Un bucle repetido de calor y frío es un conflicto, no una coincidencia.' },
      },
      {
        label: { en: 'Warm whenever I start drifting away', fr: "Chaleureux à chaque fois que je commence à m'éloigner", ar: 'دافئ كلّما بدأت أنا بالابتعاد', es: 'Cálido cada vez que empiezo a alejarme yo' },
        insight: { en: 'Warmth that only fires when you leave is a leash, not a feeling.', fr: 'Une chaleur qui ne s\'active que quand tu pars est une laisse, pas un sentiment.', ar: 'الدفء الذي لا يشتعل إلا حين ترحل هو مقود، لا شعور.', es: 'Una calidez que solo se activa cuando te vas es una correa, no un sentimiento.' },
      },
      {
        label: { en: 'Honestly steady — the chaos is in my head between texts', fr: 'Honnêtement stable — le chaos est dans ma tête entre les textos', ar: 'ثابت بصراحة — الفوضى في رأسي بين الرسائل', es: 'Sinceramente estable — el caos está en mi cabeza entre mensajes' },
        insight: { en: 'If the pattern is calm and the panic is yours, the instrument needs calibrating.', fr: 'Si le schéma est calme et que la panique est la tienne, l\'instrument a besoin d\'être calibré.', ar: 'إن كان النمط هادئًا والذعر ذعرك أنت، فالأداة تحتاج إلى معايرة.', es: 'Si el patrón está tranquilo y el pánico es tuyo, el instrumento necesita calibrarse.' },
      },
    ],
  },
  {
    id: 'w03_q2',
    text: {
      en: 'Their warmth tends to show up when…',
      fr: 'Sa chaleur a tendance à apparaître quand…',
      ar: 'دفئه يميل إلى الظهور حين…',
      es: 'Su calidez tiende a aparecer cuando…',
    },
    answers: [
      {
        label: { en: 'Something reminded them of me — no agenda attached', fr: 'Quelque chose lui a rappelé moi — sans arrière-pensée', ar: 'شيء ذكّره بي — دون أي غرض', es: 'Algo le hizo acordarse de mí — sin ninguna intención oculta' },
        insight: { en: 'Unprompted warmth with nothing to gain is the honest kind.', fr: 'Une chaleur spontanée sans rien à gagner est la chaleur honnête.', ar: 'الدفء غير المُستدعى دون أي مكسب هو النوع الصادق.', es: 'Una calidez espontánea sin nada que ganar es la clase honesta.' },
      },
      {
        label: { en: 'They need attention, comfort, or an ego refill', fr: "Il a besoin d'attention, de réconfort, ou d'un plein d'ego", ar: 'حين يحتاج إلى انتباه، أو عزاء، أو تعزيز لغروره', es: 'Necesita atención, consuelo, o un refuerzo de ego' },
        insight: { en: 'Warmth that tracks their needs, not your life, is convenience.', fr: 'Une chaleur qui suit ses besoins, pas ta vie, est de la commodité.', ar: 'الدفء الذي يتبع احتياجاته، لا حياتك، هو مصلحة.', es: 'Una calidez que sigue sus necesidades, no tu vida, es conveniencia.' },
      },
      {
        label: { en: "They've been distant and seem to feel bad about it", fr: "Il a été distant et semble s'en vouloir", ar: 'كان بعيدًا ويبدو أنه يشعر بالسوء حيال ذلك', es: 'Ha estado distante y parece sentirse mal por ello' },
        insight: { en: 'Guilt-warmth after retreat is a war between want and fear.', fr: 'La chaleur de culpabilité après un repli est une guerre entre l\'envie et la peur.', ar: 'دفء الشعور بالذنب بعد الانسحاب هو حرب بين الرغبة والخوف.', es: 'La calidez de culpa después de la retirada es una guerra entre el deseo y el miedo.' },
      },
      {
        label: { en: "It's always there — I just discount it when I'm anxious", fr: 'Elle est toujours là — je la minimise juste quand je suis anxieux', ar: 'إنه موجود دائمًا — أنا فقط أقلّل من شأنه حين أكون قلقًا', es: 'Siempre está ahí — solo la descarto cuando estoy ansioso' },
        insight: { en: 'Steady warmth you keep re-testing may already be the answer.', fr: 'Une chaleur stable que tu continues de retester est peut-être déjà la réponse.', ar: 'الدفء الثابت الذي تستمر في إعادة اختباره قد يكون الإجابة بالفعل.', es: 'Una calidez estable que sigues volviendo a probar puede que ya sea la respuesta.' },
      },
    ],
  },
  {
    id: 'w03_q3',
    text: {
      en: 'When their words and their actions disagree, which way does it usually break?',
      fr: 'Quand ses mots et ses actes se contredisent, dans quel sens ça penche généralement ?',
      ar: 'حين تتناقض كلماته مع أفعاله، لأي جهة يميل الأمر عادة؟',
      es: 'Cuando sus palabras y sus actos no coinciden, ¿hacia qué lado suele inclinarse?',
    },
    answers: [
      {
        label: { en: 'Big sweet words, thin follow-through', fr: 'De grands mots doux, un suivi mince', ar: 'كلمات رقيقة كبيرة، ومتابعة ضعيفة', es: 'Grandes palabras dulces, poco seguimiento' },
        insight: { en: 'When talk outruns behavior, the behavior is the real statement.', fr: 'Quand la parole dépasse le comportement, le comportement est la vraie déclaration.', ar: 'حين يتفوّق الكلام على السلوك، يكون السلوك هو التصريح الحقيقي.', es: 'Cuando las palabras superan al comportamiento, el comportamiento es la declaración real.' },
      },
      {
        label: { en: 'Few words, but the actions keep showing up', fr: 'Peu de mots, mais les actes continuent d\'arriver', ar: 'كلمات قليلة، لكن الأفعال تستمر في الحضور', es: 'Pocas palabras, pero los actos siguen apareciendo' },
        insight: { en: 'Quiet hands that keep arriving outrank loud sentences.', fr: 'Des mains discrètes qui continuent d\'arriver valent plus que des phrases bruyantes.', ar: 'أيادٍ صامتة تستمر في الحضور تفوق قيمتها الجمل الصاخبة.', es: 'Unas manos discretas que siguen llegando valen más que frases ruidosas.' },
      },
      {
        label: { en: 'Both flip depending on the week', fr: 'Les deux basculent selon la semaine', ar: 'كلاهما يتبدّل تبعًا للأسبوع', es: 'Ambos cambian según la semana' },
        insight: { en: 'Channels that alternate together point to a conflict inside them.', fr: 'Des canaux qui alternent ensemble pointent vers un conflit en lui.', ar: 'قناتان تتناوبان معًا تشيران إلى صراع بداخله.', es: 'Canales que alternan juntos apuntan a un conflicto dentro de él.' },
      },
      {
        label: { en: "They rarely disagree — I go looking for gaps", fr: "Ils se contredisent rarement — c'est moi qui cherche des failles", ar: 'نادرًا ما يتناقضان — أنا من يبحث عن ثغرات', es: 'Rara vez no coinciden — soy yo quien busca fisuras' },
        insight: { en: 'Hunting for contradictions in a consistent person is the static talking.', fr: 'Chasser les contradictions chez une personne constante, c\'est le bruit statique qui parle.', ar: 'البحث عن تناقضات لدى شخص ثابت هو التشويش وهو يتحدث.', es: 'Cazar contradicciones en una persona constante es la estática hablando.' },
      },
    ],
  },
  {
    id: 'w03_q4',
    text: {
      en: 'What does the reunion after a cold stretch feel like?',
      fr: 'Que ressens-tu lors des retrouvailles après une période froide ?',
      ar: 'كيف يبدو شعور اللقاء مجددًا بعد فترة باردة؟',
      es: '¿Cómo se siente el reencuentro después de una racha fría?',
    },
    answers: [
      {
        label: { en: 'A flood of intensity that hooks me all over again', fr: "Une vague d'intensité qui m'accroche de nouveau entièrement", ar: 'فيض من الكثافة يشدّني إليه من جديد بالكامل', es: 'Una oleada de intensidad que me engancha otra vez por completo' },
        insight: { en: 'A rush that erases the silence is the slot machine paying out.', fr: 'Un afflux qui efface le silence, c\'est la machine à sous qui paie.', ar: 'اندفاع يمحو الصمت هو ماكينة القمار وهي تدفع جائزتها.', es: 'Un torrente que borra el silencio es la tragamonedas pagando el premio.' },
      },
      {
        label: { en: 'Genuinely sorry — like they lost the fight with themselves', fr: 'Vraiment désolé — comme s\'il avait perdu le combat contre lui-même', ar: 'آسف بصدق — كأنه خسر معركته مع نفسه', es: 'Genuinamente arrepentido — como si hubiera perdido la pelea consigo mismo' },
        insight: { en: 'Remorse after retreat is fear apologizing for winning a round.', fr: 'Le remords après un repli, c\'est la peur qui s\'excuse d\'avoir gagné une manche.', ar: 'الندم بعد الانسحاب هو الخوف يعتذر عن فوزه بجولة.', es: 'El remordimiento tras la retirada es el miedo disculpándose por ganar una ronda.' },
      },
      {
        label: { en: 'Warm and real — they close the gap, and it stays closed', fr: 'Chaleureux et vrai — il comble l\'écart, et ça reste comblé', ar: 'دافئ وحقيقي — يسدّ الفجوة، وتبقى مسدودة', es: 'Cálido y real — cierra la brecha, y se queda cerrada' },
        insight: { en: 'A repair that holds is a yes rebuilding its own bridge.', fr: 'Une réparation qui tient, c\'est un oui qui reconstruit son propre pont.', ar: 'الإصلاح الذي يصمد هو "نعم" يعيد بناء جسره الخاص.', es: 'Una reparación que se sostiene es un sí reconstruyendo su propio puente.' },
      },
      {
        label: { en: 'There are no real cold stretches — just normal life gaps', fr: 'Il n\'y a pas de vraies périodes froides — juste des pauses de vie normale', ar: 'لا توجد فترات باردة حقيقية — مجرد فجوات حياة طبيعية', es: 'No hay rachas frías reales — solo pausas normales de la vida' },
        insight: { en: 'If the "cold stretch" is a weekend, the drama may be internal.', fr: 'Si la « période froide » ne dure qu\'un week-end, le drame est peut-être interne.', ar: 'إن كانت "الفترة الباردة" مجرد عطلة نهاية أسبوع، فقد يكون الدراما داخليًا.', es: 'Si la «racha fría» dura un fin de semana, el drama puede ser interno.' },
      },
    ],
  },
  {
    id: 'w03_q5',
    text: {
      en: 'Be honest: what would a neutral friend say after seeing the raw facts?',
      fr: 'Sois honnête : que dirait un ami neutre après avoir vu les faits bruts ?',
      ar: 'كن صادقًا: ماذا سيقول صديق محايد بعد رؤية الحقائق الخام؟',
      es: 'Sé honesto: ¿qué diría un amigo neutral después de ver los hechos crudos?',
    },
    answers: [
      {
        label: { en: '"This person clearly likes you — relax"', fr: '« Cette personne t\'aime clairement — détends-toi »', ar: '"هذا الشخص معجب بك بوضوح — استرخِ"', es: '«Esta persona claramente te quiere — relájate»' },
        insight: { en: 'When the outside view reads warm, believe the data over the alarm.', fr: 'Quand le regard extérieur lit de la chaleur, crois les données plutôt que l\'alarme.', ar: 'حين تقرأ النظرة الخارجية دفئًا، صدّق البيانات لا الإنذار.', es: 'Cuando la mirada externa lee calidez, cree en los datos y no en la alarma.' },
      },
      {
        label: { en: '"They\'re into you but something is holding them back"', fr: '« Il est intéressé, mais quelque chose le retient »', ar: '"هو معجب بك لكن شيئًا ما يمنعه"', es: '«Le gustas pero algo lo detiene»' },
        insight: { en: 'Outside eyes can see a want-versus-fear tug you feel as chaos.', fr: 'Des yeux extérieurs peuvent voir une lutte envie-contre-peur que tu ressens comme du chaos.', ar: 'العيون الخارجية يمكنها أن ترى صراع الرغبة مقابل الخوف الذي تشعر به أنت كفوضى.', es: 'Ojos externos pueden ver un tira y afloja entre deseo y miedo que tú sientes como caos.' },
      },
      {
        label: { en: '"They\'re keeping you exactly where it benefits them"', fr: '« Il te garde exactement là où ça l\'arrange »', ar: '"يبقيك بالضبط حيث يخدمه ذلك"', es: '«Te mantiene exactamente donde le conviene»' },
        insight: { en: 'A neutral read of convenient ambiguity is hard evidence.', fr: 'Une lecture neutre d\'une ambiguïté pratique est une preuve solide.', ar: 'قراءة محايدة لغموض مريح هي دليل دامغ.', es: 'Una lectura neutral de ambigüedad conveniente es evidencia sólida.' },
      },
      {
        label: { en: '"The problem isn\'t them — it\'s how you spiral between texts"', fr: '« Le problème, ce n\'est pas lui — c\'est ta façon de paniquer entre les textos »', ar: '"المشكلة ليست فيه — بل في كيف تنهار بين الرسائل"', es: '«El problema no es él — es cómo te desmoronas entre mensajes»' },
        insight: { en: 'Sometimes the kindest outside view points the lens back gently.', fr: 'Parfois, le regard extérieur le plus bienveillant retourne doucement l\'objectif vers toi.', ar: 'أحيانًا ألطف نظرة خارجية توجّه العدسة نحوك أنت بلطف.', es: 'A veces la mirada externa más amable devuelve el lente hacia ti con suavidad.' },
      },
    ],
  },
  {
    id: 'w03_q6',
    text: {
      en: 'What happens when you reach for definition — even lightly?',
      fr: 'Que se passe-t-il quand tu cherches à définir les choses — même légèrement ?',
      ar: 'ماذا يحدث حين تسعى إلى التحديد — حتى لو بخفّة؟',
      es: '¿Qué pasa cuando buscas definición — aunque sea con suavidad?',
    },
    answers: [
      {
        label: { en: 'They meet it — nervous maybe, but they engage', fr: 'Il répond présent — nerveux peut-être, mais il s\'implique', ar: 'يستجيب — ربما بتوتر، لكنه ينخرط', es: 'Responde — nervioso quizás, pero se involucra' },
        insight: { en: 'Engaging the question, even scared, is someone leaning yes.', fr: 'S\'engager dans la question, même effrayé, c\'est quelqu\'un qui penche vers le oui.', ar: 'الانخراط في السؤال، حتى وإن كان خائفًا، هو شخص يميل إلى "نعم".', es: 'Involucrarse en la pregunta, aunque con miedo, es alguien inclinándose hacia el sí.' },
      },
      {
        label: { en: "They freeze up or need time, but they don't run", fr: 'Il se fige ou a besoin de temps, mais il ne fuit pas', ar: 'يتجمّد أو يحتاج إلى وقت، لكنه لا يهرب', es: 'Se paraliza o necesita tiempo, pero no huye' },
        insight: { en: 'Fear that stays in the room is conflict, not rejection.', fr: 'Une peur qui reste dans la pièce est un conflit, pas un rejet.', ar: 'الخوف الذي يبقى في الغرفة هو صراع، لا رفض.', es: 'Un miedo que se queda en la sala es conflicto, no rechazo.' },
      },
      {
        label: { en: 'Jokes, subject changes, "why do we need labels"', fr: 'Des blagues, des changements de sujet, « pourquoi a-t-on besoin d\'étiquettes »', ar: 'مزحات، تغييرات في الموضوع، "لماذا نحتاج إلى تسميات"', es: 'Bromas, cambios de tema, «para qué necesitamos etiquetas»' },
        insight: { en: 'Deflecting definition on schedule is the gray defending itself.', fr: 'Détourner la définition à chaque fois, c\'est le gris qui se défend.', ar: 'التهرّب من التحديد بانتظام هو المنطقة الرمادية تدافع عن نفسها.', es: 'Esquivar la definición cada vez es el gris defendiéndose a sí mismo.' },
      },
      {
        label: { en: "I've never actually asked — I keep decoding instead", fr: 'Je n\'ai jamais vraiment demandé — je continue de décrypter à la place', ar: 'لم أسأل فعليًا من قبل — أستمر في فكّ الشيفرة بدلًا من ذلك', es: 'Nunca he preguntado en realidad — sigo descifrando en su lugar' },
        insight: { en: 'A question never asked keeps the noise alive on your side too.', fr: 'Une question jamais posée garde le bruit vivant de ton côté aussi.', ar: 'السؤال الذي لم يُطرح أبدًا يُبقي الضجيج حيًا في جانبك أنت أيضًا.', es: 'Una pregunta nunca hecha mantiene el ruido vivo también de tu lado.' },
      },
    ],
  },
  {
    id: 'w03_q7',
    text: {
      en: 'If you had to bet everything on one reading of them, which is it?',
      fr: 'Si tu devais tout parier sur une seule lecture de lui, laquelle serait-ce ?',
      ar: 'إن كان عليك أن تراهن بكل شيء على قراءة واحدة له، فما هي؟',
      es: 'Si tuvieras que apostarlo todo a una sola lectura de él, ¿cuál sería?',
    },
    answers: [
      {
        label: { en: 'They want this — the mess is just hesitation', fr: 'Il veut cette relation — le désordre n\'est qu\'une hésitation', ar: 'يريد هذا — الفوضى مجرد تردّد', es: 'Quiere esto — el desorden es solo vacilación' },
        insight: { en: 'When the gut bets yes under the noise, it has usually counted the evidence.', fr: 'Quand l\'instinct parie sur le oui sous le bruit, il a généralement déjà compté les preuves.', ar: 'حين يراهن الحدس على "نعم" تحت الضجيج، يكون عادة قد أحصى الأدلة بالفعل.', es: 'Cuando el instinto apuesta por el sí bajo el ruido, suele haber contado ya la evidencia.' },
      },
      {
        label: { en: 'They want it AND fear it, and both are real', fr: 'Il le veut ET le craint, et les deux sont réels', ar: 'يريده ويخافه في آنٍ واحد، وكلاهما حقيقي', es: 'Lo quiere Y le teme, y ambas cosas son reales' },
        insight: { en: 'Two true things at war explains every flip you have seen.', fr: 'Deux vérités en guerre expliquent chaque revirement que tu as vu.', ar: 'حقيقتان في حرب تفسّران كل انقلاب رأيته.', es: 'Dos verdades en guerra explican cada cambio que has visto.' },
      },
      {
        label: { en: 'They want the attention more than they want me', fr: 'Il veut l\'attention plus qu\'il ne me veut moi', ar: 'يريد الاهتمام أكثر مما يريدني أنا', es: 'Quiere la atención más de lo que me quiere a mí' },
        insight: { en: 'Betting on the access-not-the-role reading takes courage — and clears the fog.', fr: 'Parier sur la lecture accès-pas-rôle demande du courage — et dissipe le brouillard.', ar: 'المراهنة على قراءة "الوصول لا الدور" تتطلّب شجاعة — وتُبدّد الضباب.', es: 'Apostar por la lectura de acceso-no-el-papel requiere valor — y despeja la niebla.' },
      },
      {
        label: { en: "They're fine — it's my anxiety writing the story", fr: 'Il va bien — c\'est mon anxiété qui écrit l\'histoire', ar: 'هو بخير — قلقي أنا من يكتب القصة', es: 'Él está bien — es mi ansiedad escribiendo la historia' },
        insight: { en: 'Owning the static is not defeat; it is the first accurate reading.', fr: 'Assumer le bruit statique n\'est pas une défaite ; c\'est la première lecture précise.', ar: 'الاعتراف بالتشويش ليس هزيمة؛ إنه أول قراءة دقيقة.', es: 'Asumir la estática no es una derrota; es la primera lectura precisa.' },
      },
    ],
  },
];

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
