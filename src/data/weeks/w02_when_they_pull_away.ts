/**
 * AURAFY — WEEK 2 CONTENT  ·  "When They Pull Away"  ·  category: love  ·  module: who_cut_off
 * Authored via the aurafy-week-generator skill. FR/AR/ES translated (translation session, batch W02-03).
 *
 * Measures: is someone drifting, scared, or genuinely leaving?
 * 4 outcomes: still_anchored · needs_space · scared_close · slow_fade
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW (no existing article reuse this week): w02_a1 … w02_a7.
 *  - Append `w02Articles` to the ARTICLES array (src/content/articles/index.ts).
 *  - Merge `w02ArticlesEn` into the EN content map (src/content/articles/content.en.ts). FR/AR/ES bodies
 *    live in content.fr.ts / content.ar.ts / content.es.ts under the same ids.
 *  - Append `w02Questions` to the daily-question pool (src/data/dailyQuestions.ts).
 *  - Push `w02Week` into WEEKS (src/data/weeks/index.ts), AFTER w01Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

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
/* EN is source-of-truth — never edit. FR/AR/ES bodies for these ids live in
 * content.fr.ts / content.ar.ts / content.es.ts under the same keys. */

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
    text: {
      en: 'When did the distance actually start?',
      fr: 'Quand la distance a-t-elle vraiment commencé ?',
      ar: 'متى بدأت المسافة فعليًا؟',
      es: '¿Cuándo empezó realmente la distancia?',
    },
    answers: [
      {
        label: { en: 'Right after things got really close', fr: 'Juste après que les choses sont devenues vraiment proches', ar: 'مباشرة بعد أن أصبحت الأمور قريبة جدًا', es: 'Justo después de que las cosas se volvieron muy cercanas' },
        insight: { en: 'Distance that follows depth is usually fear, not fading.', fr: "La distance qui suit la profondeur est généralement de la peur, pas un effacement.", ar: 'المسافة التي تتبع العمق غالبًا ما تكون خوفًا، لا تلاشيًا.', es: 'La distancia que sigue a la profundidad suele ser miedo, no desvanecimiento.' },
      },
      {
        label: { en: 'Slowly, across everything at once', fr: 'Lentement, sur tout à la fois', ar: 'ببطء، عبر كل شيء في آنٍ واحد', es: 'Poco a poco, en todo a la vez' },
        insight: { en: 'When every channel thins together, the drift has a direction.', fr: "Quand tous les canaux s'amincissent ensemble, la dérive a une direction.", ar: 'حين تتقلّص كل القنوات معًا، يكون للانجراف اتجاه.', es: 'Cuando todos los canales se adelgazan juntos, la deriva tiene una dirección.' },
      },
      {
        label: { en: 'When life got genuinely heavy for them', fr: 'Quand la vie est devenue vraiment lourde pour lui', ar: 'حين أصبحت الحياة ثقيلة عليه فعلًا', es: 'Cuando la vida se volvió realmente pesada para él' },
        insight: { en: 'Storms shrink presence without breaking the bond.', fr: 'Les tempêtes réduisent la présence sans briser le lien.', ar: 'العواصف تقلّص الحضور دون أن تكسر الرابطة.', es: 'Las tormentas reducen la presencia sin romper el vínculo.' },
      },
      {
        label: { en: 'When they told me they needed room', fr: "Quand il m'a dit qu'il avait besoin d'espace", ar: 'حين أخبرني أنه يحتاج إلى مساحة', es: 'Cuando me dijo que necesitaba espacio' },
        insight: { en: 'Named space is space with edges — and a return address.', fr: "L'espace nommé est un espace avec des contours — et une adresse de retour.", ar: 'المساحة المُسمّاة هي مساحة لها حدود — وعنوان للعودة.', es: 'El espacio nombrado es un espacio con bordes — y remitente.' },
      },
    ],
  },
  {
    id: 'w02_q2',
    text: {
      en: 'When you do reach them, what comes back?',
      fr: 'Quand tu arrives à le joindre, qu\'obtiens-tu en retour ?',
      ar: 'حين تصل إليه فعلًا، ماذا يعود إليك؟',
      es: 'Cuando logras contactarlo, ¿qué recibes de vuelta?',
    },
    answers: [
      {
        label: { en: 'The same warmth, just less time', fr: 'La même chaleur, juste moins de temps', ar: 'الدفء نفسه، لكن وقتًا أقل', es: 'La misma calidez, solo menos tiempo' },
        insight: { en: 'Warmth intact under pressure is an anchor holding.', fr: 'Une chaleur intacte sous la pression est une ancre qui tient.', ar: 'الدفء السليم تحت الضغط هو مرساة صامدة.', es: 'La calidez intacta bajo presión es un ancla que resiste.' },
      },
      {
        label: { en: 'Kindness, with a "bear with me" attached', fr: 'De la gentillesse, avec un « sois patient avec moi » en prime', ar: 'لطف، مصحوب بـ"تحمّلني قليلًا"', es: 'Amabilidad, con un «ten paciencia conmigo» incluido' },
        insight: { en: 'Asking for patience is tending the bond while stepping back.', fr: "Demander de la patience, c'est entretenir le lien tout en prenant du recul.", ar: 'طلب الصبر هو رعاية للرابطة أثناء التراجع.', es: 'Pedir paciencia es cuidar el vínculo mientras se da un paso atrás.' },
      },
      {
        label: { en: 'Real warmth that vanishes if I lean in', fr: "Une vraie chaleur qui disparaît si je m'approche", ar: 'دفء حقيقي يختفي إن اقتربت', es: 'Calidez real que desaparece si me acerco' },
        insight: { en: 'Heat that flees your approach is running from closeness, not you.', fr: 'Une chaleur qui fuit ton approche fuit la proximité, pas toi.', ar: 'الحرارة التي تهرب من اقترابك تهرب من القرب، لا منك.', es: 'Un calor que huye de tu acercamiento huye de la cercanía, no de ti.' },
      },
      {
        label: { en: 'Polite, flat, minimum-effort replies', fr: 'Des réponses polies, plates, à effort minimal', ar: 'ردود مهذّبة، جافة، بأقل جهد ممكن', es: 'Respuestas educadas, planas, de mínimo esfuerzo' },
        insight: { en: 'Politeness without curiosity is how interest sounds while leaving.', fr: "La politesse sans curiosité, c'est le son de l'intérêt qui s'en va.", ar: 'التهذيب دون فضول هو صوت الاهتمام وهو يرحل.', es: 'La cortesía sin curiosidad es cómo suena el interés cuando se va.' },
      },
    ],
  },
  {
    id: 'w02_q3',
    text: {
      en: 'What does their "busy" actually look like?',
      fr: 'À quoi ressemble vraiment son « occupé » ?',
      ar: 'كيف يبدو "انشغاله" فعليًا؟',
      es: '¿Cómo es realmente su «ocupado»?',
    },
    answers: [
      {
        label: { en: 'Busy with a promise attached — and they keep it', fr: 'Occupé, avec une promesse jointe — et il la tient', ar: 'مشغول مع وعد مرفق — ويفي به', es: 'Ocupado, con una promesa incluida — y la cumple' },
        insight: { en: 'A rain-check that gets cashed is busyness, not exit.', fr: 'Un report qui se concrétise, c\'est de l\'occupation, pas une sortie.', ar: 'الموعد المؤجّل الذي يتحقق فعلًا هو انشغال، لا خروج.', es: 'Un aplazamiento que se cumple es ocupación, no salida.' },
      },
      {
        label: { en: 'Busy, but small signs of me still slip through', fr: 'Occupé, mais de petits signes de moi passent quand même', ar: 'مشغول، لكن إشارات صغيرة مني ما زالت تتسرّب', es: 'Ocupado, pero pequeñas señales mías igual se cuelan' },
        insight: { en: 'Crumbs of contact under load are priority made visible.', fr: 'Des miettes de contact sous la charge, c\'est la priorité rendue visible.', ar: 'فتات التواصل تحت الضغط هو الأولوية وقد أصبحت مرئية.', es: 'Las migajas de contacto bajo carga son la prioridad hecha visible.' },
      },
      {
        label: { en: 'Busy for me, somehow present everywhere else', fr: 'Occupé pour moi, mais présent partout ailleurs', ar: 'مشغول من أجلي، لكنه حاضر في كل مكان آخر', es: 'Ocupado para mí, pero presente en todo lo demás' },
        insight: { en: 'Selective busyness is a ranking, and you can read your place in it.', fr: 'Une occupation sélective est un classement, et tu peux y lire ta place.', ar: 'الانشغال الانتقائي ترتيب أولويات، ويمكنك أن تقرأ مكانتك فيه.', es: 'La ocupación selectiva es un ranking, y puedes leer tu lugar en él.' },
      },
      {
        label: { en: 'Busy right after our closest moments', fr: 'Occupé juste après nos moments les plus proches', ar: 'مشغول تمامًا بعد أقرب لحظاتنا', es: 'Ocupado justo después de nuestros momentos más cercanos' },
        insight: { en: 'A calendar that fills up after intimacy is a nervous system, not a schedule.', fr: "Un agenda qui se remplit après l'intimité, c'est un système nerveux, pas un emploi du temps.", ar: 'جدول يمتلئ بعد اللحظات الحميمة هو جهاز عصبي، لا جدول زمني.', es: 'Una agenda que se llena después de la intimidad es un sistema nervioso, no un horario.' },
      },
    ],
  },
  {
    id: 'w02_q4',
    text: {
      en: 'When your message sits unanswered, what usually follows?',
      fr: 'Quand ton message reste sans réponse, que se passe-t-il généralement ensuite ?',
      ar: 'حين تبقى رسالتك دون رد، ماذا يحدث عادة بعد ذلك؟',
      es: 'Cuando tu mensaje se queda sin responder, ¿qué suele pasar después?',
    },
    answers: [
      {
        label: { en: 'Shorter and cooler replies each time', fr: 'Des réponses de plus en plus courtes et froides', ar: 'ردود أقصر وأبرد في كل مرة', es: 'Respuestas cada vez más cortas y frías' },
        insight: { en: 'When the trend only points down, the silence is the answer.', fr: 'Quand la tendance ne pointe que vers le bas, le silence est la réponse.', ar: 'حين لا يشير الاتجاه إلا إلى الأسفل، يكون الصمت هو الإجابة.', es: 'Cuando la tendencia solo apunta hacia abajo, el silencio es la respuesta.' },
      },
      {
        label: { en: 'A sudden burst of warmth, then quiet again', fr: 'Un élan soudain de chaleur, puis le silence à nouveau', ar: 'اندفاع مفاجئ من الدفء، ثم الصمت مجددًا', es: 'Un arrebato repentino de calidez, y luego silencio otra vez' },
        insight: { en: 'The loop of return-and-retreat is closeness at war with fear.', fr: 'La boucle de retour-et-repli est la proximité en guerre avec la peur.', ar: 'حلقة العودة والانسحاب هي القرب في حرب مع الخوف.', es: 'El bucle de vuelta-y-retirada es la cercanía en guerra con el miedo.' },
      },
      {
        label: { en: 'An apology and an honest reason', fr: 'Des excuses et une raison honnête', ar: 'اعتذار وسبب صادق', es: 'Una disculpa y una razón honesta' },
        insight: { en: 'Repair after silence means the bond still matters to them.', fr: 'La réparation après le silence signifie que le lien compte encore pour lui.', ar: 'الإصلاح بعد الصمت يعني أن الرابطة ما زالت تهمّه.', es: 'La reparación después del silencio significa que el vínculo todavía le importa.' },
      },
      {
        label: { en: 'A late reply as warm as ever', fr: "Une réponse tardive, aussi chaleureuse que d'habitude", ar: 'ردّ متأخر لكنه دافئ كالعادة', es: 'Una respuesta tardía, tan cálida como siempre' },
        insight: { en: 'Slow but warm is a full life, not a fading heart.', fr: "Lent mais chaleureux, c'est une vie pleine, pas un cœur qui s'éteint.", ar: 'البطء مع الدفء هو حياة مليئة، لا قلب يتلاشى.', es: 'Lento pero cálido es una vida llena, no un corazón que se apaga.' },
      },
    ],
  },
  {
    id: 'w02_q5',
    text: {
      en: 'When did you last feel truly close to them?',
      fr: 'Quand as-tu ressenti pour la dernière fois une vraie proximité avec lui ?',
      ar: 'متى شعرت آخر مرة بقرب حقيقي منه؟',
      es: '¿Cuándo fue la última vez que sentiste una cercanía real con él?',
    },
    answers: [
      {
        label: { en: 'Recently — the closeness is still under the quiet', fr: 'Récemment — la proximité est encore là, sous le silence', ar: 'مؤخرًا — القرب ما زال موجودًا تحت الهدوء', es: 'Hace poco — la cercanía sigue ahí, debajo del silencio' },
        insight: { en: 'If the depth is recent, the quiet is weather, not climate.', fr: 'Si la profondeur est récente, le silence est de la météo, pas du climat.', ar: 'إن كان العمق حديثًا، فالهدوء طقس عابر، لا مناخ دائم.', es: 'Si la profundidad es reciente, el silencio es clima pasajero, no clima permanente.' },
      },
      {
        label: { en: 'Right before they went distant', fr: "Juste avant qu'il ne prenne ses distances", ar: 'مباشرة قبل أن يبتعد', es: 'Justo antes de que se distanciara' },
        insight: { en: 'Closeness followed by retreat is the classic run-from-the-feeling.', fr: 'La proximité suivie d\'un repli, c\'est la fuite classique du ressenti.', ar: 'القرب الذي يليه انسحاب هو الهروب الكلاسيكي من الشعور.', es: 'La cercanía seguida de retirada es la huida clásica del sentimiento.' },
      },
      {
        label: { en: 'A while ago — and they say they miss it too', fr: 'Il y a un moment — et il dit que ça lui manque aussi', ar: 'منذ فترة — ويقول إنه يفتقد ذلك أيضًا', es: 'Hace un tiempo — y dice que también lo extraña' },
        insight: { en: 'Missing it out loud means the way back is still lit.', fr: 'Le dire à voix haute signifie que le chemin du retour est encore éclairé.', ar: 'الافتقاد المُعلَن بصوت عالٍ يعني أن طريق العودة ما زال مضاءً.', es: 'Decirlo en voz alta significa que el camino de vuelta sigue iluminado.' },
      },
      {
        label: { en: "So long ago I can't clearly remember", fr: 'Il y a si longtemps que je ne m\'en souviens plus clairement', ar: 'منذ زمن طويل لدرجة أنني لا أتذكّر بوضوح', es: 'Hace tanto que ya no lo recuerdo con claridad' },
        insight: { en: 'When you have to reach for the memory, the fade has been long.', fr: 'Quand tu dois fouiller pour trouver le souvenir, le fondu dure depuis longtemps.', ar: 'حين تضطر إلى البحث عن الذكرى، يكون التلاشي قد طال أمده.', es: 'Cuando tienes que rebuscar el recuerdo, el desvanecimiento ha sido largo.' },
      },
    ],
  },
  {
    id: 'w02_q6',
    text: {
      en: 'Who is doing the reaching now?',
      fr: "Qui fait l'effort de contact maintenant ?",
      ar: 'من يبادر بالتواصل الآن؟',
      es: '¿Quién está dando el paso ahora?',
    },
    answers: [
      {
        label: { en: 'Me for now — but they answer with real care', fr: "Moi pour l'instant — mais il répond avec une vraie attention", ar: 'أنا حاليًا — لكنه يستجيب باهتمام حقيقي', es: 'Yo por ahora — pero responde con verdadero cariño' },
        insight: { en: 'Uneven effort with warm response is a season, not a verdict.', fr: 'Un effort inégal avec une réponse chaleureuse, c\'est une saison, pas un verdict.', ar: 'الجهد غير المتكافئ مع استجابة دافئة هو موسم عابر، لا حكم نهائي.', es: 'Un esfuerzo desigual con una respuesta cálida es una temporada, no un veredicto.' },
      },
      {
        label: { en: 'Still both of us, just less often', fr: 'Toujours nous deux, juste moins souvent', ar: 'ما زلنا كلانا، لكن بوتيرة أقل', es: 'Todavía los dos, solo con menos frecuencia' },
        insight: { en: 'Mutual but quieter is a bond breathing, not breaking.', fr: 'Mutuel mais plus discret, c\'est un lien qui respire, pas qui se brise.', ar: 'التبادل الأهدأ هو رابطة تتنفّس، لا تنكسر.', es: 'Mutuo pero más tranquilo es un vínculo que respira, no que se rompe.' },
      },
      {
        label: { en: "Only me, and it's starting to feel like a job", fr: 'Seulement moi, et ça commence à ressembler à un travail', ar: 'أنا فقط، وبدأ الأمر يشبه وظيفة', es: 'Solo yo, y está empezando a sentirse como un trabajo' },
        insight: { en: 'When you carry the whole bridge, notice who stopped building.', fr: 'Quand tu portes tout le pont, remarque qui a arrêté de construire.', ar: 'حين تحمل الجسر وحدك، لاحظ من توقف عن البناء.', es: 'Cuando tú cargas todo el puente, fíjate en quién dejó de construir.' },
      },
      {
        label: { en: 'Me — and they swing between close and gone', fr: 'Moi — et il oscille entre proche et absent', ar: 'أنا — وهو يتأرجح بين القرب والغياب', es: 'Yo — y él oscila entre cerca y ausente' },
        insight: { en: 'Push-pull answered reaching is fear steering the wheel.', fr: 'Un chaud-froid en réponse à mes appels, c\'est la peur qui tient le volant.', ar: 'الاستجابة المتأرجحة للتواصل هي الخوف يمسك بالمقود.', es: 'Un vaivén como respuesta a mi acercamiento es el miedo llevando el volante.' },
      },
    ],
  },
  {
    id: 'w02_q7',
    text: {
      en: 'Deep down, what does your gut already say?',
      fr: 'Au fond, que te dit déjà ton instinct ?',
      ar: 'في أعماقك، ماذا يقول حدسك بالفعل؟',
      es: 'En el fondo, ¿qué te dice ya tu instinto?',
    },
    answers: [
      {
        label: { en: 'They want this, but something in them keeps running', fr: "Il veut cette relation, mais quelque chose en lui continue de fuir", ar: 'يريد هذا، لكن شيئًا بداخله يستمر في الهروب', es: 'Quiere esto, pero algo en él sigue huyendo' },
        insight: { en: 'You can love someone and still be fled from — the fear is theirs.', fr: 'On peut être aimé et quand même se faire fuir — la peur lui appartient.', ar: 'يمكن أن تُحَب وأن يُهرَب منك في الوقت نفسه — الخوف خوفه هو.', es: 'Se puede amar a alguien y aun así ser de quien huye — el miedo es suyo.' },
      },
      {
        label: { en: "It'll pass — we're okay underneath", fr: 'Ça passera — au fond, on va bien', ar: 'سيمر الأمر — نحن بخير في الأعماق', es: 'Va a pasar — en el fondo estamos bien' },
        insight: { en: 'A settled gut under a quiet week is usually right.', fr: 'Un instinct apaisé sous une semaine silencieuse a généralement raison.', ar: 'الحدس الهادئ تحت أسبوع صامت يكون محقًا غالبًا.', es: 'Un instinto tranquilo bajo una semana silenciosa suele tener razón.' },
      },
      {
        label: { en: "I think I already know, I just haven't said it out loud", fr: "Je crois que je sais déjà, je ne l'ai juste pas dit à voix haute", ar: 'أعتقد أنني أعرف بالفعل، لم أقلها بصوت عالٍ فقط', es: 'Creo que ya lo sé, solo que no lo he dicho en voz alta' },
        insight: { en: 'The knowing that waits to be spoken is still knowing.', fr: "Le savoir qui attend d'être dit reste du savoir.", ar: 'المعرفة التي تنتظر أن تُقال تبقى معرفة.', es: 'El saber que espera ser dicho sigue siendo saber.' },
      },
      {
        label: { en: "They'll come back when their storm passes", fr: 'Il reviendra quand sa tempête sera passée', ar: 'سيعود حين تمرّ عاصفته', es: 'Volverá cuando pase su tormenta' },
        insight: { en: 'Trusting a named absence is patience, not denial.', fr: 'Faire confiance à une absence nommée, c\'est de la patience, pas du déni.', ar: 'الثقة بغياب مُسمّى هي صبر، لا إنكار.', es: 'Confiar en una ausencia nombrada es paciencia, no negación.' },
      },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w02Week: WeeklyTheme = {
  id: 'w02_when_they_pull_away',
  title: {
    en: 'When They Pull Away',
    fr: "Quand quelqu'un s'éloigne",
    ar: 'حين يبتعد أحدهم',
    es: 'Cuando alguien se aleja',
  },
  category: 'love',
  resultPrompt: {
    en: 'Are they drifting, scared, or already leaving?',
    fr: "S'éloigne-t-il, a-t-il peur, ou est-il déjà en train de partir ?",
    ar: 'هل يبتعد، أم يخاف، أم أنه يرحل بالفعل؟',
    es: '¿Se está alejando, tiene miedo, o ya se está yendo?',
  },
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
      title: { en: 'Still Anchored', fr: 'Toujours ancré', ar: 'لا يزال راسيًا', es: 'Todavía anclado' },
      body: {
        en: "Breathe — this reads like a full life, not a fading heart. The time got thinner, but the warmth didn't: they still answer with care, still repair, still let you in when it counts. What you've been calling drift looks a lot more like weather. Watch the warmth, not the clock.",
        fr: "Respire — ça ressemble à une vie bien remplie, pas à un cœur qui s'éteint. Le temps s'est amenuisé, mais pas la chaleur : il répond toujours avec attention, répare toujours, te laisse toujours entrer quand ça compte. Ce que tu appelais dérive ressemble bien plus à de la météo. Observe la chaleur, pas l'horloge.",
        ar: 'خذ نفسًا — هذا يبدو كحياة مليئة، لا كقلب يتلاشى. الوقت تقلّص، لكن الدفء لم يتقلّص: ما زال يستجيب باهتمام، ما زال يُصلح، ما زال يدعك تدخل حين يهمّ الأمر. ما كنت تسمّيه انجرافًا يشبه إلى حدّ بعيد طقسًا عابرًا. راقب الدفء، لا الساعة.',
        es: 'Respira — esto se lee como una vida llena, no como un corazón que se apaga. El tiempo se redujo, pero la calidez no: sigue respondiendo con cuidado, sigue reparando, sigue dejándote entrar cuando importa. Lo que has estado llamando deriva se parece mucho más al clima pasajero. Observa la calidez, no el reloj.',
      },
      shareLine: {
        en: "Distance isn't always drift. Sometimes it's just weather.",
        fr: "La distance n'est pas toujours une dérive. Parfois, c'est juste la météo.",
        ar: 'المسافة ليست دائمًا انجرافًا. أحيانًا هي مجرد طقس عابر.',
        es: 'La distancia no siempre es deriva. A veces es solo clima.',
      },
    },
    {
      key: 'needs_space',
      title: { en: 'Needing Space', fr: "Besoin d'espace", ar: 'بحاجة إلى مساحة', es: 'Necesita espacio' },
      body: {
        en: "There's a real step back here — but it has edges. They've named it, or near enough: the patience they're asking for comes wrapped in warmth, and the little contact you get is still genuinely yours. This is space with a return address. Give it honestly, keep your own life loud in the meantime, and let them walk back on their own legs.",
        fr: "Il y a un vrai retrait ici — mais il a des contours. Il l'a nommé, ou presque : la patience qu'il demande vient enveloppée de chaleur, et le peu de contact que tu reçois t'appartient toujours vraiment. C'est un espace avec une adresse de retour. Accorde-le honnêtement, garde ta propre vie bien vivante entre-temps, et laisse-le revenir sur ses propres jambes.",
        ar: 'هناك تراجع حقيقي هنا — لكن له حدود. لقد سمّاه، أو كاد: الصبر الذي يطلبه يأتي ملفوفًا بالدفء، والتواصل القليل الذي تحصل عليه لا يزال ملكك فعلًا. هذه مساحة لها عنوان للعودة. امنحها بصدق، وأبقِ حياتك الخاصة صاخبة في الوقت نفسه، ودعه يعود بساقيه هو.',
        es: 'Hay un retroceso real aquí — pero tiene bordes. Lo ha nombrado, o casi: la paciencia que pide viene envuelta en calidez, y el poco contacto que recibes sigue siendo genuinamente tuyo. Este es un espacio con remitente. Dalo con honestidad, mantén tu propia vida sonando fuerte mientras tanto, y déjalo volver con sus propias piernas.',
      },
      shareLine: {
        en: 'Real space comes with a return address.',
        fr: "Le véritable espace a une adresse de retour.",
        ar: 'المساحة الحقيقية تأتي بعنوان للعودة.',
        es: 'El espacio real viene con remitente.',
      },
    },
    {
      key: 'scared_close',
      title: { en: 'Scared of the Closeness', fr: 'Effrayé par la proximité', ar: 'خائف من القرب', es: 'Asustado por la cercanía' },
      body: {
        en: "The pattern is loud once you see it: the retreat lands right after the depth, every time. This isn't someone losing interest — it's someone whose alarm goes off when it gets real, running from the size of their own feeling. That's their loop to break, not yours to decode forever. You get to decide whether you can love someone at the pace of their fear.",
        fr: "Le schéma est évident une fois qu'on le voit : le repli survient juste après la profondeur, à chaque fois. Ce n'est pas quelqu'un qui perd l'intérêt — c'est quelqu'un dont l'alarme se déclenche quand ça devient réel, qui fuit l'ampleur de son propre ressenti. C'est sa boucle à briser, pas la tienne à décrypter éternellement. C'est à toi de décider si tu peux aimer quelqu'un au rythme de sa peur.",
        ar: 'النمط واضح بمجرد أن تراه: الانسحاب يحدث مباشرة بعد العمق، في كل مرة. هذا ليس شخصًا يفقد اهتمامه — بل شخص يُطلق إنذاره حين يصبح الأمر حقيقيًا، هاربًا من حجم مشاعره الخاصة. هذه حلقته التي عليه هو أن يكسرها، لا عليك أن تفكّ شيفرتها إلى الأبد. لك أن تقرر ما إذا كنت تستطيع أن تحب شخصًا بوتيرة خوفه.',
        es: 'El patrón es evidente una vez que lo ves: la retirada llega justo después de la profundidad, cada vez. Esto no es alguien que pierde el interés —es alguien cuya alarma se dispara cuando se vuelve real, huyendo del tamaño de su propio sentir. Ese es su bucle por romper, no el tuyo por descifrar eternamente. Tú decides si puedes amar a alguien al ritmo de su miedo.',
      },
      shareLine: {
        en: 'Some people run right when it gets real.',
        fr: "Certaines personnes fuient au moment précis où ça devient réel.",
        ar: 'بعض الناس يهربون تحديدًا حين يصبح الأمر حقيقيًا.',
        es: 'Algunas personas huyen justo cuando se vuelve real.',
      },
    },
    {
      key: 'slow_fade',
      title: { en: 'The Slow Fade', fr: 'Le fondu lent', ar: 'التلاشي البطيء', es: 'El desvanecimiento lento' },
      body: {
        en: "It hurts to see it named, but you've felt it for a while: the effort is going one direction, and it isn't toward you. Nothing is ever \"wrong,\" yet everything measurable keeps shrinking — that's not confusion, that's a quiet exit. You can't lose someone who was already leaving. You can only lose the time you spend waiting at the door.",
        fr: "Ça fait mal de le voir nommé, mais tu le ressens depuis un moment : l'effort va dans une seule direction, et ce n'est pas vers toi. Rien ne va jamais « mal », et pourtant tout ce qui est mesurable continue de se réduire — ce n'est pas de la confusion, c'est une sortie silencieuse. Tu ne peux pas perdre quelqu'un qui était déjà en train de partir. Tu ne peux perdre que le temps passé à attendre à la porte.",
        ar: 'يؤلم أن تراه مُسمّى، لكنك شعرت به منذ فترة: الجهد يتّجه في اتجاه واحد، وليس نحوك. لا شيء يبدو "خاطئًا" أبدًا، ومع ذلك كل ما يمكن قياسه يستمر في التقلّص — هذا ليس ارتباكًا، بل خروج صامت. لا يمكنك أن تخسر شخصًا كان يرحل بالفعل. لا يمكنك أن تخسر سوى الوقت الذي تقضيه في الانتظار عند الباب.',
        es: 'Duele verlo nombrado, pero lo has sentido durante un tiempo: el esfuerzo va en una sola dirección, y no es hacia ti. Nada está nunca «mal», y sin embargo todo lo medible sigue reduciéndose —eso no es confusión, es una salida silenciosa. No puedes perder a alguien que ya se estaba yendo. Solo puedes perder el tiempo que pasas esperando en la puerta.',
      },
      shareLine: {
        en: 'A quiet exit is still an exit.',
        fr: "Une sortie silencieuse reste une sortie.",
        ar: 'الخروج الصامت يبقى خروجًا.',
        es: 'Una salida silenciosa sigue siendo una salida.',
      },
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
