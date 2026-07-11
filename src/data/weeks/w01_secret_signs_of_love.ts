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
 *  - Append `w01Questions` to the daily-question pool (src/data/dailyQuestions.ts).
 *  - Push `w01Week` into WEEKS (src/data/weeks/index.ts) and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { DailyQuestion } from '../dailyQuestions';
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

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w01Questions: DailyQuestion[] = [
  {
    id: 'w01_q1',
    text: {
      en: 'When they talk to you, where does their attention go?',
      fr: 'Quand cette personne te parle, où va son attention ?',
      ar: 'حين يتحدث معك، إلى أين يذهب انتباهه؟',
      es: 'Cuando te habla, ¿adónde va su atención?',
    },
    answers: [
      {
        label: { en: 'Fully on me, every time', fr: 'Entièrement sur moi, à chaque fois', ar: 'عليّ بالكامل، في كل مرة', es: 'Totalmente en mí, siempre' },
        insight: { en: 'Undivided attention is the rarest tell of all.', fr: "Une attention entière est le signe le plus rare qui soit.", ar: 'الانتباه الكامل هو أندر علامة على الإطلاق.', es: 'La atención plena es la señal más rara de todas.' },
      },
      {
        label: { en: 'Warm, but a little guarded', fr: 'Chaleureux, mais un peu réservé', ar: 'دافئ، لكن بشيء من التحفظ', es: 'Cálido, pero algo reservado' },
        insight: { en: "Care that hasn't quite found its courage yet.", fr: "Une attention qui n'a pas encore trouvé son courage.", ar: 'اهتمام لم يجد شجاعته الكاملة بعد.', es: 'Un cariño que todavía no ha encontrado su valentía.' },
      },
      {
        label: { en: 'Hot one day, distant the next', fr: 'Brûlant un jour, distant le lendemain', ar: 'حارّ يومًا، بعيدًا في اليوم التالي', es: 'Ardiente un día, distante al siguiente' },
        insight: { en: 'Inconsistency usually means a fight going on inside them.', fr: "L'inconstance signale souvent un combat intérieur chez l'autre.", ar: 'عدم الثبات غالبًا ما يعني صراعًا داخليًا يعيشه.', es: 'La inconstancia suele significar una lucha interna en la otra persona.' },
      },
      {
        label: { en: "Honestly, I'm guessing", fr: 'Honnêtement, je devine', ar: 'بصراحة، أنا أخمّن فقط', es: 'Sinceramente, estoy adivinando' },
        insight: { en: "When you have to guess, you're reading hope, not signal.", fr: "Quand tu dois deviner, tu lis de l'espoir, pas un signal.", ar: 'حين تضطر إلى التخمين، فأنت تقرأ الأمل لا الإشارة.', es: 'Cuando tienes que adivinar, estás leyendo esperanza, no una señal.' },
      },
    ],
  },
  {
    id: 'w01_q2',
    text: {
      en: 'Do they remember the small things you mention in passing?',
      fr: 'Se souvient-il des petites choses que tu mentionnes en passant ?',
      ar: 'هل يتذكّر الأشياء الصغيرة التي تذكرها عرضًا؟',
      es: '¿Recuerda las pequeñas cosas que mencionas de pasada?',
    },
    answers: [
      {
        label: { en: 'Quietly — it shows up later', fr: 'Discrètement — ça ressort plus tard', ar: 'بهدوء — يظهر ذلك لاحقًا', es: 'En silencio — reaparece después' },
        insight: { en: 'Memory is attention with a longer shelf life.', fr: 'La mémoire est une attention à la durée de vie plus longue.', ar: 'الذاكرة هي انتباه ذو عمر أطول.', es: 'La memoria es atención con una vida útil más larga.' },
      },
      {
        label: { en: 'Always, in detail', fr: 'Toujours, en détail', ar: 'دائمًا، وبالتفصيل', es: 'Siempre, con detalle' },
        insight: { en: 'Remembering your trivia is love doing its quiet homework.', fr: "Se souvenir de tes détails, c'est l'amour qui fait ses devoirs en silence.", ar: 'تذكّر تفاصيلك التافهة هو الحب وهو يؤدي واجبه بصمت.', es: 'Recordar tus detalles es el amor haciendo su tarea en silencio.' },
      },
      {
        label: { en: "Not really that I've noticed", fr: 'Pas vraiment, à ma connaissance', ar: 'لا، على حدّ علمي', es: 'La verdad es que no, que yo haya notado' },
        insight: { en: 'If nothing lands, the listening may not be happening yet.', fr: "Si rien ne reste, c'est que l'écoute n'a peut-être pas encore lieu.", ar: 'إن لم يبقَ شيء، فربما الإصغاء لم يبدأ بعد.', es: 'Si nada queda, puede que la escucha aún no esté ocurriendo.' },
      },
      {
        label: { en: 'Only when it benefits them', fr: 'Seulement quand ça l\'arrange', ar: 'فقط حين يخدمه ذلك', es: 'Solo cuando le conviene' },
        insight: { en: 'Selective memory points to selective interest.', fr: 'Une mémoire sélective indique un intérêt sélectif.', ar: 'الذاكرة الانتقائية تشير إلى اهتمام انتقائي.', es: 'Una memoria selectiva apunta a un interés selectivo.' },
      },
    ],
  },
  {
    id: 'w01_q3',
    text: {
      en: 'When something matters to you, do they show up?',
      fr: 'Quand quelque chose compte pour toi, est-il présent ?',
      ar: 'حين يهمّك أمر ما، هل يكون حاضرًا؟',
      es: 'Cuando algo te importa, ¿aparece?',
    },
    answers: [
      {
        label: { en: 'Every time, no asking', fr: "À chaque fois, sans qu'on demande", ar: 'في كل مرة، دون أن أطلب', es: 'Siempre, sin que se lo pida' },
        insight: { en: 'Showing up unprompted is devotion you can set your watch by.', fr: "Être présent sans qu'on le demande, c'est une dévotion sur laquelle on peut régler sa montre.", ar: 'الحضور دون طلب هو إخلاص يمكنك أن تضبط ساعتك عليه.', es: 'Aparecer sin que se lo pidan es una devoción con la que puedes poner el reloj en hora.' },
      },
      {
        label: { en: 'Sometimes — it depends on their mood', fr: 'Parfois — ça dépend de son humeur', ar: 'أحيانًا — يعتمد على مزاجه', es: 'A veces — depende de su humor' },
        insight: { en: 'Conditional presence is a mixed signal wearing kindness.', fr: 'Une présence conditionnelle est un signal mixte déguisé en gentillesse.', ar: 'الحضور المشروط هو إشارة مختلطة متنكّرة في ثوب اللطف.', es: 'Una presencia condicional es una señal contradictoria disfrazada de amabilidad.' },
      },
      {
        label: { en: 'Quietly, without making it a thing', fr: "Discrètement, sans en faire tout un plat", ar: 'بهدوء، دون أن يجعل من الأمر ضجّة', es: 'Con calma, sin hacer alarde de ello' },
        insight: { en: 'Understated reliability is its own love language.', fr: 'Une fiabilité discrète est un langage de l\'amour à part entière.', ar: 'الموثوقية الهادئة هي لغة حب قائمة بذاتها.', es: 'Una fiabilidad discreta es su propio lenguaje del amor.' },
      },
      {
        label: { en: "I haven't really seen it tested", fr: "Je n'ai pas vraiment eu l'occasion de vérifier", ar: 'لم أختبر الأمر فعليًا بعد', es: 'La verdad es que no lo he visto puesto a prueba' },
        insight: { en: 'Untested care is a hope, not yet a pattern.', fr: "Une attention jamais mise à l'épreuve est un espoir, pas encore une habitude.", ar: 'الاهتمام غير المُختبَر هو أمل، وليس نمطًا بعد.', es: 'Un cariño sin poner a prueba es una esperanza, todavía no un patrón.' },
      },
    ],
  },
  {
    id: 'w01_q4',
    text: {
      en: 'Who reaches out first, more often?',
      fr: 'Qui prend contact en premier, le plus souvent ?',
      ar: 'من يبادر بالتواصل أولًا، في أغلب الأحيان؟',
      es: '¿Quién da el primer paso más a menudo?',
    },
    answers: [
      {
        label: { en: 'It swings back and forth unpredictably', fr: 'Ça change sans arrêt, imprévisible', ar: 'يتأرجح الأمر بلا انتظام', es: 'Cambia sin ningún patrón claro' },
        insight: { en: 'Push-pull keeps you guessing — and that is the signal.', fr: 'Le jeu du chaud-froid te laisse deviner — et c\'est ça, le signal.', ar: 'لعبة الجذب والدفع تُبقيك في حيرة — وهذه هي الإشارة بحدّ ذاتها.', es: 'El vaivén te mantiene adivinando — y esa es la señal.' },
      },
      {
        label: { en: 'They do, consistently', fr: 'Lui, systématiquement', ar: 'هو، وبثبات', es: 'Él, de forma constante' },
        insight: { en: 'Consistent initiation is someone choosing you on purpose.', fr: 'Une initiative constante, c\'est quelqu\'un qui te choisit délibérément.', ar: 'المبادرة الثابتة هي شخص يختارك عن قصد.', es: 'Una iniciativa constante es alguien que te elige a propósito.' },
      },
      {
        label: { en: "Mostly me, if I'm honest", fr: 'Surtout moi, si je suis honnête', ar: 'أنا غالبًا، إن كنت صادقًا', es: 'Sobre todo yo, si soy sincero' },
        insight: { en: 'When you carry the whole bridge, check who else is building.', fr: 'Quand tu portes tout le pont, regarde qui d\'autre construit.', ar: 'حين تحمل الجسر وحدك، تأكّد من وجود من يبنيه معك.', es: 'Cuando tú cargas todo el puente, fíjate en quién más está construyendo.' },
      },
      {
        label: { en: 'Rarely, but warmly when they do', fr: 'Rarement, mais avec chaleur quand ça arrive', ar: 'نادرًا، لكن بدفء حين يفعل', es: 'Poco frecuente, pero con calidez cuando ocurre' },
        insight: { en: 'Low frequency, high warmth — care that is shy, not absent.', fr: 'Peu fréquent mais très chaleureux — une attention timide, pas absente.', ar: 'تكرار قليل، ودفء كبير — اهتمام خجول لا غائب.', es: 'Baja frecuencia, alta calidez — un cariño tímido, no ausente.' },
      },
    ],
  },
  {
    id: 'w01_q5',
    text: {
      en: 'How does their body act when you are near?',
      fr: 'Comment son corps réagit-il quand tu es proche ?',
      ar: 'كيف تتصرف لغة جسده حين تكون قريبًا منه؟',
      es: '¿Cómo reacciona su cuerpo cuando estás cerca?',
    },
    answers: [
      {
        label: { en: 'They drift a little closer, quietly', fr: 'Il se rapproche discrètement', ar: 'يقترب قليلًا وبهدوء', es: 'Se acerca un poco, discretamente' },
        insight: { en: 'Shrinking distance is the body saying yes before the mouth does.', fr: 'Réduire la distance, c\'est le corps qui dit oui avant la bouche.', ar: 'تقلّص المسافة هو الجسد يقول نعم قبل أن ينطق الفم.', es: 'Reducir la distancia es el cuerpo diciendo sí antes que la boca.' },
      },
      {
        label: { en: "I can't really tell", fr: "Je n'arrive pas vraiment à savoir", ar: 'لا أستطيع أن أميّز ذلك حقًا', es: 'La verdad, no logro notarlo' },
        insight: { en: "If the body gives you nothing, you may be filling in the blanks.", fr: 'Si le corps ne te donne rien, tu combles peut-être les vides toi-même.', ar: 'إن لم يمنحك الجسد شيئًا، فربما أنت من يملأ الفراغات.', es: 'Si el cuerpo no te da nada, puede que estés rellenando los huecos tú.' },
      },
      {
        label: { en: 'Open, turned toward me, every time', fr: 'Ouvert, tourné vers moi, à chaque fois', ar: 'منفتح، ومتّجه نحوي، في كل مرة', es: 'Abierto, orientado hacia mí, siempre' },
        insight: { en: 'Orientation and openness are rapport made visible.', fr: "L'orientation et l'ouverture rendent la connexion visible.", ar: 'الاتجاه والانفتاح هما الألفة وقد أصبحت مرئية.', es: 'La orientación y la apertura son la conexión hecha visible.' },
      },
      {
        label: { en: 'Closed off some days, warm on others', fr: 'Fermé certains jours, chaleureux d\'autres fois', ar: 'منغلق في بعض الأيام، دافئ في أخرى', es: 'Cerrado algunos días, cálido en otros' },
        insight: { en: 'A body that keeps changing its mind is telling you something true.', fr: "Un corps qui change sans cesse d'avis te dit quelque chose de vrai.", ar: 'الجسد الذي يغيّر رأيه باستمرار يخبرك بشيء حقيقي.', es: 'Un cuerpo que cambia de parecer constantemente te está diciendo algo real.' },
      },
    ],
  },
  {
    id: 'w01_q6',
    text: {
      en: 'Do their words and their actions agree?',
      fr: 'Ses mots et ses actes vont-ils dans le même sens ?',
      ar: 'هل تتّفق كلماته مع أفعاله؟',
      es: '¿Sus palabras y sus actos coinciden?',
    },
    answers: [
      {
        label: { en: 'I mostly go on words — actions are thin', fr: 'Je me fie surtout aux mots — les actes sont minces', ar: 'أعتمد غالبًا على الكلمات — الأفعال قليلة', es: 'Me fío sobre todo de las palabras — los actos son escasos' },
        insight: { en: 'When you only have words, you are reading promise, not proof.', fr: "Quand tu n'as que des mots, tu lis une promesse, pas une preuve.", ar: 'حين لا تملك سوى الكلمات، فأنت تقرأ وعدًا لا برهانًا.', es: 'Cuando solo tienes palabras, estás leyendo una promesa, no una prueba.' },
      },
      {
        label: { en: 'They say sweet things, then go quiet', fr: 'Il dit des choses douces, puis se tait', ar: 'يقول كلامًا رقيقًا، ثم يصمت', es: 'Dice cosas dulces, y luego desaparece' },
        insight: { en: 'A gap between words and follow-through is the classic mixed signal.', fr: 'Un écart entre les mots et les actes est le signal mixte classique.', ar: 'الفجوة بين الكلام والفعل هي الإشارة المختلطة الكلاسيكية.', es: 'Una brecha entre las palabras y los hechos es la señal contradictoria clásica.' },
      },
      {
        label: { en: 'Few words, but the actions are steady', fr: 'Peu de mots, mais des actes constants', ar: 'كلمات قليلة، لكن الأفعال ثابتة', es: 'Pocas palabras, pero actos constantes' },
        insight: { en: 'Quiet hands that keep showing up outrank loud sentences.', fr: 'Des gestes discrets mais réguliers valent plus que de grandes phrases.', ar: 'أيادٍ صامتة تحضر باستمرار تفوق قيمتها الجمل الصاخبة.', es: 'Unas manos discretas que siguen apareciendo valen más que frases grandilocuentes.' },
      },
      {
        label: { en: 'Both line up, again and again', fr: 'Les deux concordent, encore et encore', ar: 'كلاهما يتطابقان، مرة بعد مرة', es: 'Ambos coinciden, una y otra vez' },
        insight: { en: 'When words and actions agree over time, believe them.', fr: "Quand les mots et les actes s'accordent dans la durée, crois-les.", ar: 'حين تتّفق الكلمات مع الأفعال على مرّ الوقت، صدّقهما.', es: 'Cuando las palabras y los actos concuerdan con el tiempo, créelos.' },
      },
    ],
  },
  {
    id: 'w01_q7',
    text: {
      en: 'How do you feel in the day or two after you see them?',
      fr: 'Comment te sens-tu le jour ou les deux jours suivant votre rencontre ?',
      ar: 'كيف تشعر في اليوم أو اليومين اللذين يليان لقاءك به؟',
      es: '¿Cómo te sientes el día o los dos días después de verlo?',
    },
    answers: [
      {
        label: { en: 'Settled and sure', fr: 'Apaisé et sûr de moi', ar: 'مطمئنًا وواثقًا', es: 'Tranquilo y seguro' },
        insight: { en: 'Calm certainty is what secure affection leaves behind.', fr: 'Une certitude calme est ce que laisse derrière elle une affection sécurisante.', ar: 'اليقين الهادئ هو ما يتركه الحب الآمن خلفه.', es: 'La certeza serena es lo que deja tras de sí un cariño seguro.' },
      },
      {
        label: { en: 'Warm, but wishing I knew more', fr: "Chaleureux, mais j'aimerais en savoir plus", ar: 'دافئًا، لكن أتمنى لو عرفت أكثر', es: 'Cálido, pero deseando saber más' },
        insight: { en: 'Warmth with a question mark is care still finding its voice.', fr: "Une chaleur avec un point d'interrogation, c'est une attention qui cherche encore sa voix.", ar: 'الدفء المصحوب بعلامة استفهام هو اهتمام لا يزال يبحث عن صوته.', es: 'La calidez con un signo de interrogación es un cariño que aún busca su voz.' },
      },
      {
        label: { en: 'Anxious, replaying everything', fr: 'Anxieux, à tout repasser en boucle', ar: 'قلقًا، أعيد كل شيء في ذهني', es: 'Ansioso, repasándolo todo una y otra vez' },
        insight: { en: 'When you have to decode it afterward, the signal was unclear.', fr: "Quand tu dois tout décoder après coup, c'est que le signal n'était pas clair.", ar: 'حين تضطر إلى فكّ الشيفرة لاحقًا، فالإشارة لم تكن واضحة.', es: 'Cuando tienes que descifrarlo después, es que la señal no fue clara.' },
      },
      {
        label: { en: 'Up, then down, then unsure', fr: 'En haut, puis en bas, puis perdu', ar: 'مرتفعًا، ثم منخفضًا، ثم حائرًا', es: 'Arriba, luego abajo, luego confundido' },
        insight: { en: 'An emotional rollercoaster usually means the signals were mixed.', fr: 'Des montagnes russes émotionnelles signalent souvent des signaux mêlés.', ar: 'الأفعوانية العاطفية تعني غالبًا أن الإشارات كانت مختلطة.', es: 'Una montaña rusa emocional suele significar que las señales fueron contradictorias.' },
      },
    ],
  },
];

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
