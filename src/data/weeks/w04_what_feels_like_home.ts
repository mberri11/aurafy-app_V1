/**
 * AURAFY — WEEK 4 CONTENT  ·  "What Feels Like Home"  ·  category: love  ·  module: who_soulmate
 * Authored via the aurafy-week-generator skill. FR/AR/ES translated (translation session, batch W04-08).
 *
 * Measures: is this connection built on safety, or on spark alone?
 * 4 outcomes: true_home · spark_alone · unread_peace · harbor_only
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w04_a1 … w04_a7.
 *  - Append `w04Articles` to the ARTICLES array (src/content/articles/index.ts).
 *  - Merge `w04ArticlesEn` into the EN content map (src/content/articles/content.en.ts). FR/AR/ES bodies
 *    live in content.fr.ts / content.ar.ts / content.es.ts under the same ids.
 *  - Append `w04Questions` to the daily-question pool (src/data/dailyQuestions.ts).
 *  - Push `w04Week` into WEEKS (src/data/weeks/index.ts), AFTER w03Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w04Articles: Article[] = [
  { id: 'w04_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-27' },
  { id: 'w04_a2', category: 'love', readMinutes: 4, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-28' },
  { id: 'w04_a3', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-29' },
  { id: 'w04_a4', category: 'love', readMinutes: 4, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-30' },
  { id: 'w04_a5', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-07-31' },
  { id: 'w04_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-01' },
  { id: 'w04_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-02' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */
/* EN is source-of-truth — never edit. FR/AR/ES bodies for these ids live in
 * content.fr.ts / content.ar.ts / content.es.ts under the same keys. */

export const w04ArticlesEn: Record<string, ArticleContent> = {
  w04_a1: {
    title: 'Why Some People Feel Like Home',
    subtitle: 'The physiology of finally relaxing around someone',
    blocks: [
      { type: 'paragraph', text: "You know it the moment it happens, even if you've never had words for it: with certain people, something in your body stands down. The shoulders drop. The voice you use stops being curated. You say the half-formed thought instead of the polished one. It isn't fireworks — it's the opposite. It's the rare, almost physical sensation of being off-duty." },
      { type: 'heading', text: 'Home is a nervous-system verdict' },
      { type: 'paragraph', text: "That feeling isn't poetry; it's biology. Your nervous system is constantly scanning every person you're with for one question — am I safe here? — and with most people the answer stays \"mostly.\" The ones who feel like home are the ones with whom the scan quietly completes and shuts off. What's left over, once vigilance stops spending your energy, is the warmth you've been calling \"comfortable.\"" },
      { type: 'paragraph', text: "This is why home-feeling people are rarer than exciting people. Excitement can be produced by novelty, beauty, unpredictability — cheap and everywhere. Safety can only be produced by consistency over time: showing up the same, keeping small promises, staying kind when it would be easy not to. This week is about learning to read that difference — because one of them is a mood, and the other is a place you can live."},
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'The felt sense of safety with specific people reflects real co-regulation: nervous systems calibrate to reliable partners, lowering vigilance. "Feeling like home" is a measurable state, not a metaphor.' },
    ],
  },
  w04_a2: {
    title: 'The Quiet Kind of Love Nobody Posts About',
    subtitle: 'The best relationships photograph terribly',
    blocks: [
      { type: 'paragraph', text: "The loves that dominate feeds are the loud ones — airport reunions, surprise trips, paragraphs on anniversaries. And they're lovely. But there's a whole category of love that never makes it online because it doesn't produce content: the tea made without asking, the silence that's comfortable instead of tense, the person who noticed you were off before you said a word." },
      { type: 'paragraph', text: "This love is invisible almost by definition. It lives in prevention — the arguments that never happened because someone chose gentleness, the anxieties that never spiraled because someone was reliable. You can't photograph the storm that didn't come. So the quiet lovers scroll past the loud ones and sometimes wonder if they're missing something. Usually, it's the reverse." },
      { type: 'quote', text: 'The loudest love asks to be witnessed. The quietest one just keeps you warm.', attribution: 'On unposted devotion' },
      { type: 'paragraph', text: "None of this makes loud love fake — celebration is real too. But if you're measuring what you have against what people post, you're comparing your infrastructure to someone else's fireworks. One of those things holds a roof up." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Relationship research consistently finds that everyday responsiveness — small, frequent acts of noticing and care — predicts satisfaction and longevity far better than grand gestures or public displays.' },
    ],
  },
  w04_a3: {
    title: 'Safe vs. Exciting: The Love We Choose vs. the Love We Need',
    subtitle: 'The oldest tug-of-war in the heart',
    blocks: [
      { type: 'paragraph', text: "Almost everyone, at some point, stands between two doors. Behind one: the person who makes your pulse spike — unpredictable, magnetic, slightly out of reach. Behind the other: the person who makes your breath slow — steady, present, fully within reach. And almost everyone is shocked to discover which door their feet keep walking toward." },
      { type: 'heading', text: 'Why the pull and the good are different systems' },
      { type: 'paragraph', text: "Attraction and attachment run on different circuitry. The spike — dopamine, novelty, pursuit — is the wanting system, and it's loudest precisely when the outcome is uncertain. The calm — oxytocin, trust, familiarity — is the bonding system, and it only grows where safety already lives. The cruel joke is that the wanting system shouts and the bonding system whispers, so the exciting person always sounds like the answer even when they aren't." },
      { type: 'paragraph', text: "The mature move isn't choosing boredom over passion — that's a false menu. It's learning that the strongest connections have both, in the right order: safety as the foundation, spark as what you build on top of it. Spark on top of safety is a fireplace. Spark without safety is just a fire." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Desire and attachment involve distinct motivational systems — novelty-driven wanting versus security-driven bonding. Uncertainty amplifies the first and starves the second, which is why the "exciting" option so often feels louder than it is good.' },
    ],
  },
  w04_a4: {
    title: 'What a Calm Relationship Actually Feels Like',
    subtitle: 'A field guide, for people who have only known weather',
    blocks: [
      { type: 'paragraph', text: "If your history is stormy, calm love is genuinely disorienting — you have no reference for it. So here is the field guide. A calm relationship feels like: answering honestly without rehearsing first. Disagreeing without checking the exits. A phone that can sit face-up on the table. Plans that stay made. The absence of that low, ambient dread you stopped noticing because it was always there." },
      { type: 'paragraph', text: "What calm is not: flat. A calm relationship still has laughter that gets out of hand, real desire, hard conversations, bad days. The difference is the floor. In stormy love, every conflict threatens the foundation — you fight about the dishes and somehow the relationship itself is on the table. In calm love, the foundation is never in play. You can afford full honesty because honesty won't cost you the whole thing." },
      { type: 'paragraph', text: "People raised on chaos often mistake this floor for a ceiling — as if safety means nothing intense can happen here. It's the opposite. The floor is what makes intensity survivable. You can only go truly deep with someone when you're not simultaneously guarding the door." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Secure bonds function as a base: perceived safety expands honesty, exploration, and emotional depth rather than flattening them. Calm is the enabling condition of intensity, not its absence.' },
    ],
  },
  w04_a5: {
    title: 'The Difference Between Chemistry and Compatibility',
    subtitle: 'One gets you in the door. The other decides if you can live there.',
    blocks: [
      { type: 'paragraph', text: "Chemistry is instant and unmistakable: the conversation that ignores the clock, the gravity in a room, the feeling of being plugged into a socket. Compatibility is slower and quieter: how you both handle money, silence, stress, his mother, your bad week. Chemistry is discovered in one night. Compatibility is discovered in a hundred ordinary ones." },
      { type: 'heading', text: 'Where each one shows up' },
      { type: 'orderedList', items: [
        { title: 'Chemistry lives in the highlights', text: 'Dates, banter, attraction, the pull. It answers: do we ignite?' },
        { title: 'Compatibility lives in logistics', text: 'Conflict style, values, rhythms, repair. It answers: do we function?' },
        { title: 'The trap', text: 'Strong chemistry gets mistaken for the whole answer — so people keep re-testing the ignition while the engine quietly fails.' },
      ] },
      { type: 'paragraph', text: "You need a real amount of both; this isn't a lecture against desire. But they fail differently. Missing chemistry feels like a good roommate. Missing compatibility feels like a beautiful war. And only one of those failures can sometimes grow — attraction can deepen where respect and safety live, but compatibility almost never emerges from pure fire." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Longitudinal relationship research is blunt: initial passion predicts little about long-term outcomes, while conflict style, shared values, and day-to-day responsiveness predict a great deal.' },
    ],
  },
  w04_a6: {
    title: "When Peace Feels Boring Because You're Used to Chaos",
    subtitle: 'Your calibration, not your compass',
    blocks: [
      { type: 'paragraph', text: "Here is one of the most quietly life-ruining glitches in the human heart: if you grew up on — or got trained by — chaotic love, your body learned that love FEELS like adrenaline. Vigilance, longing, repair, relief, repeat. So when someone steady finally arrives, the alarm system finds nothing to do… and reports that as \"no feelings.\" Peace gets filed as boredom. Safety reads as the absence of love, because love was never safe before." },
      { type: 'heading', text: 'Boredom or unfamiliarity? The test' },
      { type: 'paragraph', text: "Ask yourself what, exactly, is missing. If it's them — their mind doesn't interest you, their touch does nothing, you don't respect who they are — that's real incompatibility, and no amount of healing will invent it. But if what's missing is the ACHE — the anxiety, the chase, the not-knowing — then nothing is missing from the relationship. Something is missing from the pattern your nervous system calls love. Those are profoundly different diagnoses with profoundly different cures." },
      { type: 'paragraph', text: "Give calm time to stop feeling foreign. Excitement addiction fades like any calibration, usually in months, not days — and on the other side of it, many people discover the steady person didn't lack depth at all. The depth was just quiet, and they'd never been still enough to hear it." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Nervous systems normalize whatever they repeat: chaotic bonds train arousal to mean attachment, so secure partners initially register as flat. The mislabeling of safety as boredom is a documented recalibration effect, and it is reversible.' },
    ],
  },
  w04_a7: {
    title: 'Building a Person Into a Home',
    subtitle: 'Home is not found. It is constructed, daily, by two people.',
    blocks: [
      { type: 'paragraph', text: "The soulmate myth says home is a person you find — fully built, move-in ready, somewhere out there. The truth is less romantic and far more hopeful: home is something two people construct, brick by unglamorous brick, out of kept promises and repaired ruptures and a thousand small choices to turn toward each other instead of away." },
      { type: 'heading', text: 'The building materials' },
      { type: 'paragraph', text: "Reliability: doing the small thing you said, again, until your word becomes load-bearing. Repair: going back after the fight — the couples who last aren't the ones who never rupture, they're the ones who always return. Witness: knowing each other's days, names, dreads; being the person who holds the context of a life. Sanctuary: being reliably softer with each other than the world was all day. None of these is a spark. All of them are walls." },
      { type: 'paragraph', text: 'This reframe changes the question this week has been circling. Not just "do they feel like home?" but "are we both laying bricks?" Because a person who feels like home but never builds is a beautiful campsite. And a person who builds with you, steadily, even without fireworks every night — that\'s not settling. That\'s architecture.' },
      { type: 'quote', text: 'Fireworks light the sky for a minute. Bricks hold a roof for a lifetime.', attribution: 'On construction' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Long-term bond research converges on the same builders: reliability, repair after conflict, and everyday turning-toward. Lasting "home" is behavioral and cumulative — built, not found.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w04Questions: DailyQuestion[] = [
  {
    id: 'w04_q1',
    text: {
      en: "What happens in your body when you're with them?",
      fr: 'Que se passe-t-il dans ton corps quand tu es avec lui ?',
      ar: 'ماذا يحدث في جسدك حين تكون معه؟',
      es: '¿Qué pasa en tu cuerpo cuando estás con él?',
    },
    answers: [
      { label: { en: 'My shoulders drop — I stop performing', fr: "Mes épaules se détendent — j'arrête de jouer un rôle", ar: 'كتفاي ترتخيان — أتوقف عن التمثيل', es: 'Mis hombros se relajan — dejo de actuar' }, insight: { en: 'A nervous system that stands down has already given its verdict.', fr: 'Un système nerveux qui baisse sa garde a déjà rendu son verdict.', ar: 'الجهاز العصبي الذي يتوقف عن الحراسة أصدر حكمه بالفعل.', es: 'Un sistema nervioso que baja la guardia ya dio su veredicto.' } },
      { label: { en: 'Racing pulse, high alert, delicious chaos', fr: 'Pouls qui s\'emballe, haute vigilance, chaos délicieux', ar: 'نبض متسارع، يقظة عالية، فوضى لذيذة', es: 'Pulso acelerado, alerta máxima, caos delicioso' }, insight: { en: 'A body on alert is feeling voltage, not shelter.', fr: 'Un corps en alerte ressent du voltage, pas un abri.', ar: 'الجسد المتأهب يشعر بالتيار الكهربائي، لا بالمأوى.', es: 'Un cuerpo en alerta siente voltaje, no refugio.' } },
      { label: { en: 'Calm — almost suspiciously calm', fr: 'Calme — presque suspicieusement calme', ar: 'هادئ — هادئ بشكل مريب تقريبًا', es: 'Tranquilo — casi sospechosamente tranquilo' }, insight: { en: 'When calm feels suspicious, the suspicion is the old training talking.', fr: 'Quand le calme semble suspect, c\'est l\'ancien conditionnement qui parle.', ar: 'حين يبدو الهدوء مريبًا، فالريبة هي التدريب القديم يتحدث.', es: 'Cuando la calma se siente sospechosa, la sospecha es el viejo entrenamiento hablando.' } },
      { label: { en: "Comfortable, like a couch I've stopped noticing", fr: "Confortable, comme un canapé que j'ai arrêté de remarquer", ar: 'مريح، مثل أريكة توقفت عن ملاحظتها', es: 'Cómodo, como un sofá del que ya no me doy cuenta' }, insight: { en: 'Comfort you no longer notice may be shelter without current.', fr: 'Un confort que tu ne remarques plus est peut-être un abri sans courant.', ar: 'الراحة التي لم تعد تلاحظها قد تكون مأوى بلا تيار.', es: 'Una comodidad que ya no notas puede ser un refugio sin corriente.' } },
    ],
  },
  {
    id: 'w04_q2',
    text: {
      en: 'How does their care usually arrive?',
      fr: 'Comment son attention arrive-t-elle habituellement ?',
      ar: 'كيف تصل رعايته عادة؟',
      es: '¿Cómo suele llegar su cariño?',
    },
    answers: [
      { label: { en: "Big flashes when we're good, silence when we're not", fr: 'De grands éclats quand ça va bien, le silence sinon', ar: 'ومضات كبيرة حين نكون بخير، وصمت حين لا نكون كذلك', es: 'Grandes destellos cuando estamos bien, silencio cuando no' }, insight: { en: 'Care that only comes in fireworks leaves the ordinary days cold.', fr: "Une attention qui n'arrive qu'en feux d'artifice laisse les jours ordinaires froids.", ar: 'الرعاية التي تأتي فقط كألعاب نارية تترك الأيام العادية باردة.', es: 'Un cariño que solo llega en fuegos artificiales deja fríos los días ordinarios.' } },
      { label: { en: 'Small, unposted, constant', fr: 'Petite, non publiée, constante', ar: 'صغيرة، غير منشورة، ثابتة', es: 'Pequeño, no publicado, constante' }, insight: { en: 'Unwitnessed care is the kind that holds roofs up.', fr: "L'attention non témoignée est celle qui tient les toits.", ar: 'الرعاية غير المشهودة هي التي تحمل الأسقف.', es: 'El cariño sin testigos es el que sostiene los techos.' } },
      { label: { en: 'Steady — I catch myself calling it "nothing special"', fr: 'Stable — je me surprends à dire que ce n\'est « rien de spécial »', ar: 'ثابتة — ألاحظ أنني أسمّيها "لا شيء مميز"', es: 'Constante — me sorprendo llamándolo «nada especial»' }, insight: { en: '"Nothing special" is often what safety sounds like to a chaos-trained ear.', fr: '« Rien de spécial » est souvent le son de la sécurité pour une oreille formée au chaos.', ar: '"لا شيء مميز" غالبًا ما يكون صوت الأمان لأذن تدرّبت على الفوضى.', es: '«Nada especial» es a menudo cómo suena la seguridad para un oído entrenado en el caos.' } },
      { label: { en: 'Practical and kind, but it lands like duty', fr: "Pratique et gentille, mais ça ressemble à un devoir", ar: 'عملية ولطيفة، لكنها تبدو كواجب', es: 'Práctico y amable, pero se siente como obligación' }, insight: { en: 'Care without warmth underneath is maintenance, not love.', fr: "Une attention sans chaleur en dessous est de l'entretien, pas de l'amour.", ar: 'الرعاية دون دفء تحتها صيانة، لا حب.', es: 'Un cariño sin calidez debajo es mantenimiento, no amor.' } },
    ],
  },
  {
    id: 'w04_q3',
    text: {
      en: 'Be honest — what actually keeps you in this?',
      fr: 'Sois honnête — qu\'est-ce qui te retient vraiment dans cette relation ?',
      ar: 'كن صادقًا — ما الذي يبقيك فعليًا في هذا؟',
      es: 'Sé honesto — ¿qué es lo que realmente te mantiene en esto?',
    },
    answers: [
      { label: { en: 'Both: I feel safe AND alive here', fr: 'Les deux : je me sens en sécurité ET vivant ici', ar: 'كلاهما: أشعر بالأمان والحيوية هنا', es: 'Ambas cosas: me siento seguro Y vivo aquí' }, insight: { en: 'Safety with aliveness on top is the whole architecture.', fr: "La sécurité avec de la vivacité par-dessus, c'est l'architecture complète.", ar: 'الأمان مع الحيوية فوقه هو العمارة الكاملة.', es: 'La seguridad con vitalidad encima es la arquitectura completa.' } },
      { label: { en: "The rush — I can't tell if I love them or the intensity", fr: "L'excitation — je ne sais pas si j'aime la personne ou l'intensité", ar: 'الاندفاع — لا أعرف إن كنت أحبه أم أحب الكثافة', es: 'El subidón — no sé si lo amo a él o a la intensidad' }, insight: { en: "When you can't separate the person from the adrenaline, it's usually the adrenaline.", fr: "Quand tu ne peux pas séparer la personne de l'adrénaline, c'est généralement l'adrénaline.", ar: 'حين لا تستطيع فصل الشخص عن الأدرينالين، فهو الأدرينالين غالبًا.', es: 'Cuando no puedes separar a la persona de la adrenalina, suele ser la adrenalina.' } },
      { label: { en: 'Habit, mostly — leaving feels harder than staying', fr: "L'habitude, surtout — partir semble plus difficile que rester", ar: 'العادة في الغالب — الرحيل يبدو أصعب من البقاء', es: 'Costumbre, sobre todo — irme se siente más difícil que quedarme' }, insight: { en: 'Staying because leaving is hard is a harbor, not a home.', fr: 'Rester parce que partir est difficile, c\'est un port, pas un foyer.', ar: 'البقاء لأن الرحيل صعب هو ميناء، لا بيت.', es: 'Quedarse porque irse es difícil es un puerto, no un hogar.' } },
      { label: { en: 'The calm — and honestly, the calm scares me a little', fr: 'Le calme — et honnêtement, le calme me fait un peu peur', ar: 'الهدوء — وبصراحة، الهدوء يخيفني قليلًا', es: 'La calma — y sinceramente, la calma me asusta un poco' }, insight: { en: 'Being scared of peace says more about your history than this bond.', fr: 'Avoir peur de la paix en dit plus sur ton histoire que sur ce lien.', ar: 'الخوف من السلام يخبرك عن ماضيك أكثر مما يخبرك عن هذه الرابطة.', es: 'Tenerle miedo a la paz dice más sobre tu historia que sobre este vínculo.' } },
    ],
  },
  {
    id: 'w04_q4',
    text: {
      en: 'Picture a completely ordinary Tuesday with them. What do you feel?',
      fr: 'Imagine un mardi complètement ordinaire avec lui. Que ressens-tu ?',
      ar: 'تخيّل يوم ثلاثاء عاديًا تمامًا معه. ماذا تشعر؟',
      es: 'Imagina un martes completamente ordinario con él. ¿Qué sientes?',
    },
    answers: [
      { label: { en: "I can't picture a Tuesday — we only exist in highlights", fr: "Je n'arrive pas à imaginer un mardi — on n'existe que dans les temps forts", ar: 'لا أستطيع تخيّل يوم ثلاثاء — نحن نوجد فقط في اللحظات المميزة', es: 'No puedo imaginar un martes — solo existimos en los momentos destacados' }, insight: { en: 'A love with no ordinary days has no foundation to stand on.', fr: 'Un amour sans jours ordinaires n\'a aucune fondation sur laquelle tenir.', ar: 'حب بلا أيام عادية ليس له أساس يقف عليه.', es: 'Un amor sin días ordinarios no tiene cimientos sobre los cuales sostenerse.' } },
      { label: { en: 'Warm — small good moments come to mind instantly', fr: "Chaleureux — de petits bons moments me viennent instantanément à l'esprit", ar: 'دافئ — لحظات جيدة صغيرة تخطر ببالي فورًا', es: 'Cálido — pequeños buenos momentos me vienen a la mente al instante' }, insight: { en: "If the ordinary day glows on its own, you're describing home.", fr: "Si le jour ordinaire brille tout seul, tu décris un foyer.", ar: 'إن كان اليوم العادي يتوهّج بذاته، فأنت تصف بيتًا.', es: 'Si el día ordinario brilla por sí solo, estás describiendo un hogar.' } },
      { label: { en: 'Peaceful — and a little guilty for wanting more noise', fr: 'Paisible — et un peu coupable de vouloir plus de bruit', ar: 'هادئ — وأشعر بذنب طفيف لرغبتي في مزيد من الضجيج', es: 'Tranquilo — y un poco culpable por querer más ruido' }, insight: { en: 'Wanting noise inside peace is calibration, not incompatibility.', fr: "Vouloir du bruit à l'intérieur de la paix, c'est de l'étalonnage, pas de l'incompatibilité.", ar: 'الرغبة في الضجيج داخل السلام هي معايرة، لا عدم توافق.', es: 'Querer ruido dentro de la paz es calibración, no incompatibilidad.' } },
      { label: { en: 'Flat — pleasant, but gray', fr: 'Plat — agréable, mais gris', ar: 'مسطّح — لطيف، لكن رمادي', es: 'Plano — agradable, pero gris' }, insight: { en: 'Pleasant-but-gray is the honest sound of a missing current.', fr: 'Agréable-mais-gris est le son honnête d\'un courant manquant.', ar: 'لطيف-لكن-رمادي هو الصوت الصادق لتيار مفقود.', es: 'Agradable-pero-gris es el sonido honesto de una corriente ausente.' } },
    ],
  },
  {
    id: 'w04_q5',
    text: {
      en: 'Where do you two actually meet each other?',
      fr: 'Où vous rencontrez-vous vraiment tous les deux ?',
      ar: 'أين تلتقيان فعليًا أنتما الاثنان؟',
      es: '¿Dónde se encuentran realmente ustedes dos?',
    },
    answers: [
      { label: { en: 'Values, humor, AND the pull — all three', fr: "Les valeurs, l'humour, ET l'attraction — les trois", ar: 'القيم، الفكاهة، والانجذاب — الثلاثة معًا', es: 'Los valores, el humor, Y el tirón — los tres' }, insight: { en: 'Chemistry standing on compatibility is the rare full house.', fr: 'Une alchimie posée sur la compatibilité, c\'est la rare main pleine.', ar: 'الكيمياء القائمة على التوافق هي الحظ الكامل النادر.', es: 'La química apoyada en la compatibilidad es la rara jugada completa.' } },
      { label: { en: 'Bodies and banter — the deep stuff stalls', fr: 'Les corps et les taquineries — le fond stagne', ar: 'الأجساد والمداعبات — الأمور العميقة تتعثّر', es: 'Los cuerpos y las bromas — lo profundo se estanca' }, insight: { en: 'Ignition without an engine keeps re-testing the same spark.', fr: 'L\'allumage sans moteur continue de retester la même étincelle.', ar: 'الاشتعال دون محرّك يستمر في إعادة اختبار الشرارة نفسها.', es: 'El encendido sin motor sigue reprobando la misma chispa.' } },
      { label: { en: 'Deeper than I admit — I keep waiting for fireworks to "prove" it', fr: 'Plus profondément que je ne l\'admets — j\'attends toujours des feux d\'artifice pour le « prouver »', ar: 'أعمق مما أعترف به — ما زلت أنتظر ألعابًا نارية "لإثبات" ذلك', es: 'Más profundo de lo que admito — sigo esperando fuegos artificiales que lo «prueben»' }, insight: { en: 'Demanding fireworks as proof is the old wiring grading a new love.', fr: 'Exiger des feux d\'artifice comme preuve, c\'est l\'ancien câblage qui note un nouvel amour.', ar: 'طلب الألعاب النارية كدليل هو التوصيلات القديمة تُقيّم حبًا جديدًا.', es: 'Exigir fuegos artificiales como prueba es el viejo cableado calificando un amor nuevo.' } },
      { label: { en: 'Daily life runs smooth, but the spark is a rumor', fr: "La vie quotidienne roule bien, mais l'étincelle est une rumeur", ar: 'الحياة اليومية تسير بسلاسة، لكن الشرارة مجرد شائعة', es: 'La vida diaria fluye bien, pero la chispa es un rumor' }, insight: { en: 'A smooth machine with no heat is a good roommate arrangement.', fr: 'Une machine qui tourne bien sans chaleur, c\'est un bon arrangement de colocation.', ar: 'آلة تعمل بسلاسة دون حرارة هي ترتيب جيد لزملاء سكن.', es: 'Una máquina que funciona bien sin calor es un buen arreglo de compañeros de piso.' } },
    ],
  },
  {
    id: 'w04_q6',
    text: {
      en: 'When things are good and quiet between you, what does your gut do?',
      fr: 'Quand les choses vont bien et sont calmes entre vous, que fait ton instinct ?',
      ar: 'حين تكون الأمور جيدة وهادئة بينكما، ماذا يفعل حدسك؟',
      es: 'Cuando las cosas van bien y están tranquilas entre ustedes, ¿qué hace tu instinto?',
    },
    answers: [
      { label: { en: 'Gets restless and starts hunting for a storm', fr: "Il s'agite et commence à chercher une tempête", ar: 'يصبح متململًا ويبدأ في البحث عن عاصفة', es: 'Se inquieta y empieza a buscar una tormenta' }, insight: { en: 'A gut that hunts storms in peacetime was trained by storms.', fr: 'Un instinct qui chasse les tempêtes en temps de paix a été formé par des tempêtes.', ar: 'الحدس الذي يبحث عن العواصف في زمن السلام تدرّب على يد العواصف.', es: 'Un instinto que caza tormentas en tiempos de paz fue entrenado por tormentas.' } },
      { label: { en: 'Rests — quiet finally feels like mine', fr: 'Il se repose — le calme me semble enfin m\'appartenir', ar: 'يرتاح — الهدوء أخيرًا يشبه شيئًا يخصني', es: 'Descansa — la calma por fin se siente mía' }, insight: { en: 'A gut that rests has found the thing it was scanning for.', fr: 'Un instinct qui se repose a trouvé ce qu\'il cherchait.', ar: 'الحدس الذي يرتاح وجد ما كان يبحث عنه.', es: 'Un instinto que descansa encontró lo que estaba buscando.' } },
      { label: { en: 'There IS no quiet — we live between explosions', fr: "Il n'y a PAS de calme — on vit entre les explosions", ar: 'لا يوجد هدوء على الإطلاق — نعيش بين الانفجارات', es: 'NO hay calma — vivimos entre explosiones' }, insight: { en: 'A love with no peacetime is running on voltage alone.', fr: 'Un amour sans temps de paix ne fonctionne que sur du voltage.', ar: 'حب بلا زمن سلام يعمل على التيار الكهربائي وحده.', es: 'Un amor sin tiempo de paz funciona solo con voltaje.' } },
      { label: { en: 'Quiet — but it feels more empty than peaceful', fr: 'Calme — mais ça semble plus vide que paisible', ar: 'هادئ — لكنه يبدو فارغًا أكثر منه سلميًا', es: 'Tranquilo — pero se siente más vacío que en paz' }, insight: { en: 'Empty and peaceful are different silences; trust which one you hear.', fr: 'Le vide et la paix sont des silences différents ; fais confiance à celui que tu entends.', ar: 'الفراغ والسلام صمتان مختلفان؛ ثق بالذي تسمعه فعلًا.', es: 'Vacío y en paz son silencios diferentes; confía en cuál de los dos oyes.' } },
    ],
  },
  {
    id: 'w04_q7',
    text: {
      en: 'Strip away all the intensity. What is left between you?',
      fr: 'Enlève toute l\'intensité. Que reste-t-il entre vous ?',
      ar: 'أزل كل الكثافة. ماذا يبقى بينكما؟',
      es: 'Quita toda la intensidad. ¿Qué queda entre ustedes?',
    },
    answers: [
      { label: { en: "A person I'd still choose on the most boring day", fr: 'Une personne que je choisirais encore le jour le plus ennuyeux', ar: 'شخص سأختاره حتى في أكثر الأيام ملالًا', es: 'Una persona que seguiría eligiendo en el día más aburrido' }, insight: { en: 'Choosing someone on a boring day is the final proof of home.', fr: 'Choisir quelqu\'un un jour ennuyeux est la preuve ultime du foyer.', ar: 'اختيار شخص في يوم ممل هو البرهان النهائي على البيت.', es: 'Elegir a alguien en un día aburrido es la prueba final del hogar.' } },
      { label: { en: "I'm honestly scared to look", fr: "J'ai honnêtement peur de regarder", ar: 'بصراحة أنا خائف من أن أنظر', es: 'Sinceramente tengo miedo de mirar' }, insight: { en: 'Being afraid to look under the spark usually means you already know.', fr: 'Avoir peur de regarder sous l\'étincelle signifie généralement que tu sais déjà.', ar: 'الخوف من النظر تحت الشرارة يعني عادة أنك تعرف بالفعل.', es: 'Tener miedo de mirar debajo de la chispa suele significar que ya lo sabes.' } },
      { label: { en: "More than I've been willing to admit", fr: "Plus que je n'ai été prêt à l'admettre", ar: 'أكثر مما كنت مستعدًا للاعتراف به', es: 'Más de lo que he estado dispuesto a admitir' }, insight: { en: 'Underrating what\'s underneath is how chaos-trained hearts miss home.', fr: 'Sous-estimer ce qu\'il y a en dessous est ainsi que les cœurs formés au chaos manquent le foyer.', ar: 'التقليل من قيمة ما هو تحت هو كيف تُفوّت القلوب المدرَّبة على الفوضى البيت.', es: 'Subestimar lo que hay debajo es cómo los corazones entrenados en el caos se pierden el hogar.' } },
      { label: { en: 'A good roommate', fr: 'Un bon colocataire', ar: 'زميل سكن جيد', es: 'Un buen compañero de piso' }, insight: { en: 'A good roommate is a real answer — just not the one a heart builds on.', fr: 'Un bon colocataire est une vraie réponse — juste pas celle sur laquelle un cœur construit.', ar: 'زميل السكن الجيد إجابة حقيقية — لكنها ليست ما يبني عليه القلب.', es: 'Un buen compañero de piso es una respuesta real — solo que no una sobre la cual construye un corazón.' } },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w04Week: WeeklyTheme = {
  id: 'w04_what_feels_like_home',
  title: {
    en: 'What Feels Like Home',
    fr: 'Ce qui ressemble à un foyer',
    ar: 'ما يشبه البيت',
    es: 'Lo que se siente como un hogar',
  },
  category: 'love',
  resultPrompt: {
    en: 'Is this built on safety, or on spark alone?',
    fr: "Est-ce construit sur la sécurité, ou sur la seule étincelle ?",
    ar: 'هل هذا مبني على الأمان، أم على الشرارة وحدها؟',
    es: '¿Está esto construido sobre la seguridad, o solo sobre la chispa?',
  },
  days: [
    { articleId: 'w04_a1', questionId: 'w04_q1' },
    { articleId: 'w04_a2', questionId: 'w04_q2' },
    { articleId: 'w04_a3', questionId: 'w04_q3' },
    { articleId: 'w04_a4', questionId: 'w04_q4' },
    { articleId: 'w04_a5', questionId: 'w04_q5' },
    { articleId: 'w04_a6', questionId: 'w04_q6' },
    { articleId: 'w04_a7', questionId: 'w04_q7' },
  ],
  outcomes: [
    {
      key: 'true_home',
      title: { en: 'Home and Fire', fr: 'Foyer et feu', ar: 'بيتٌ ونار', es: 'Hogar y fuego' },
      body: {
        en: "This is the rare full house: a bond where your nervous system stands down AND the current still runs. You stop performing, the ordinary Tuesdays glow on their own, and the spark sits on top of a floor that never moves. Don't let anyone — including the loud loves on your feed — convince you this is settling. Safety with aliveness built on top isn't the boring option. It's the architecture everyone else is still looking for.",
        fr: "C'est la rare main pleine : un lien où ton système nerveux baisse sa garde ET où le courant passe toujours. Tu arrêtes de jouer un rôle, les mardis ordinaires brillent tout seuls, et l'étincelle repose sur un plancher qui ne bouge jamais. Ne laisse personne — y compris les amours bruyantes de ton fil d'actualité — te convaincre que c'est te contenter de moins. La sécurité avec de la vivacité construite par-dessus n'est pas l'option ennuyeuse. C'est l'architecture que tout le monde cherche encore.",
        ar: 'هذا هو الحظ الكامل النادر: رابطة يتوقف فيها جهازك العصبي عن الحراسة ويستمر فيها التيار في الجريان. تتوقف عن التمثيل، وأيام الثلاثاء العادية تتوهّج بذاتها، والشرارة تجلس فوق أرضية لا تتحرّك أبدًا. لا تدع أحدًا — بما في ذلك الأحباب الصاخبون على خلاصتك — يقنعك بأن هذا قبول بأقل مما تستحق. الأمان مع الحيوية المبنية فوقه ليس الخيار الممل. إنه العمارة التي ما زال الجميع يبحثون عنها.',
        es: 'Esta es la rara jugada completa: un vínculo donde tu sistema nervioso baja la guardia Y la corriente sigue fluyendo. Dejas de actuar, los martes ordinarios brillan por sí solos, y la chispa se asienta sobre un suelo que nunca se mueve. No dejes que nadie —incluidos los amores ruidosos de tu feed— te convenza de que esto es conformarse. La seguridad con vitalidad construida encima no es la opción aburrida. Es la arquitectura que todos los demás todavía están buscando.',
      },
      shareLine: {
        en: "Home isn't boring. Home is where I stop performing.",
        fr: "Le foyer n'est pas ennuyeux. Le foyer, c'est là où j'arrête de jouer un rôle.",
        ar: 'البيت ليس مملًا. البيت هو حيث أتوقف عن التمثيل.',
        es: 'El hogar no es aburrido. El hogar es donde dejo de actuar.',
      },
    },
    {
      key: 'spark_alone',
      title: { en: 'Spark Without Shelter', fr: 'Étincelle sans abri', ar: 'شرارة بلا مأوى', es: 'Chispa sin refugio' },
      body: {
        en: "The fire is real — nobody's denying the voltage. But look at what your answers kept circling: no ordinary Tuesdays, no floor under the fights, a pull you can't fully separate from adrenaline. That's ignition without an engine. Fireworks light the sky; they don't heat the house. You don't have to leave tonight — but stop mistaking intensity for foundation, and start asking whether this person can BUILD, not just burn.",
        fr: "Le feu est réel — personne ne nie le voltage. Mais regarde autour de quoi tes réponses n'ont cessé de tourner : pas de mardis ordinaires, pas de plancher sous les disputes, une attraction que tu ne peux pas complètement séparer de l'adrénaline. C'est l'allumage sans moteur. Les feux d'artifice illuminent le ciel ; ils ne chauffent pas la maison. Tu n'as pas à partir ce soir — mais arrête de confondre l'intensité avec une fondation, et commence à te demander si cette personne peut CONSTRUIRE, pas juste brûler.",
        ar: 'النار حقيقية — لا أحد ينكر التيار الكهربائي. لكن انظر إلى ما استمرت إجاباتك في الدوران حوله: لا أيام ثلاثاء عادية، لا أرضية تحت الشجارات، انجذاب لا تستطيع فصله تمامًا عن الأدرينالين. هذا اشتعال دون محرّك. الألعاب النارية تضيء السماء؛ لكنها لا تُدفئ المنزل. لست مضطرًا للرحيل الليلة — لكن توقف عن الخلط بين الكثافة والأساس، وابدأ في التساؤل عمّا إذا كان هذا الشخص قادرًا على البناء، لا الاحتراق فقط.',
        es: 'El fuego es real —nadie niega el voltaje. Pero mira alrededor de qué siguieron girando tus respuestas: sin martes ordinarios, sin suelo bajo las peleas, un tirón que no puedes separar del todo de la adrenalina. Eso es encendido sin motor. Los fuegos artificiales iluminan el cielo; no calientan la casa. No tienes que irte esta noche —pero deja de confundir la intensidad con los cimientos, y empieza a preguntarte si esta persona puede CONSTRUIR, no solo arder.',
      },
      shareLine: {
        en: "Fireworks light the sky. They don't heat the house.",
        fr: "Les feux d'artifice illuminent le ciel. Ils ne chauffent pas la maison.",
        ar: 'الألعاب النارية تضيء السماء. لكنها لا تُدفئ المنزل.',
        es: 'Los fuegos artificiales iluminan el cielo. No calientan la casa.',
      },
    },
    {
      key: 'unread_peace',
      title: { en: "Peace You Can't Read Yet", fr: 'Une paix que tu ne sais pas encore lire', ar: 'سلام لم تتعلّم قراءته بعد', es: 'Una paz que aún no sabes leer' },
      body: {
        en: 'Here\'s the gentle plot twist: the thing you\'ve been calling boredom looks a lot like safety your nervous system hasn\'t learned to read. What\'s "missing" isn\'t depth or desire — it\'s the ache, the chase, the alarm. That was never love; that was weather you got used to. Give the calm real time to stop feeling foreign before you grade it. Many people discover the steady one had depth all along — it was just quiet, and they\'d never been still enough to hear it.',
        fr: "Voici le retournement de situation, en douceur : ce que tu appelais ennui ressemble beaucoup à une sécurité que ton système nerveux n'a pas encore appris à lire. Ce qui « manque » n'est ni la profondeur ni le désir — c'est le pincement, la poursuite, l'alarme. Ça n'a jamais été de l'amour ; c'était une météo à laquelle tu t'étais habitué. Donne au calme un vrai temps pour cesser de te sembler étranger avant de le juger. Beaucoup de gens découvrent que la personne stable avait de la profondeur depuis le début — elle était juste silencieuse, et ils n'avaient jamais été assez immobiles pour l'entendre.",
        ar: 'إليك المفاجأة اللطيفة: ما كنت تسمّيه ملالًا يشبه إلى حدّ كبير أمانًا لم يتعلّم جهازك العصبي قراءته بعد. ما "ينقص" ليس العمق ولا الرغبة — بل الألم، والمطاردة، والإنذار. لم يكن ذلك حبًا قط؛ كان طقسًا اعتدت عليه. امنح الهدوء وقتًا حقيقيًا ليتوقف عن الشعور بالغرابة قبل أن تُقيّمه. يكتشف كثير من الناس أن الشخص الثابت كان يملك عمقًا طوال الوقت — كان هادئًا فحسب، ولم يكونوا هادئين بما يكفي من قبل ليسمعوه.',
        es: 'Aquí está el giro gentil de la trama: eso que has estado llamando aburrimiento se parece mucho a una seguridad que tu sistema nervioso aún no ha aprendido a leer. Lo que «falta» no es profundidad ni deseo —es el dolor, la persecución, la alarma. Eso nunca fue amor; era un clima al que te habías acostumbrado. Dale a la calma tiempo real para dejar de sentirse extraña antes de calificarla. Mucha gente descubre que la persona estable tenía profundidad todo el tiempo —solo era silenciosa, y nunca habían estado lo bastante quietos como para escucharla.',
      },
      shareLine: {
        en: "Maybe calm isn't boring. Maybe it's just new.",
        fr: "Peut-être que le calme n'est pas ennuyeux. Peut-être qu'il est juste nouveau.",
        ar: 'ربما الهدوء ليس مملًا. ربما هو فقط جديد.',
        es: 'Quizás la calma no es aburrida. Quizás solo es nueva.',
      },
    },
    {
      key: 'harbor_only',
      title: { en: 'A Harbor, Not a Home', fr: 'Un port, pas un foyer', ar: 'ميناء، لا بيت', es: 'Un puerto, no un hogar' },
      body: {
        en: "This is the honest, unglamorous verdict: real safety, real kindness — and a current that genuinely isn't there. Not chaos-blindness, not miscalibration; you looked under the comfort and found a good roommate. A harbor matters, and nobody should shame you for having rested in one. But safety is where love starts, not where it hides. You're allowed to be grateful for the shelter and still admit you came here to live, not just to dock.",
        fr: "Voici le verdict honnête et sans éclat : une vraie sécurité, une vraie gentillesse — et un courant qui, en toute honnêteté, n'est pas là. Ni aveuglement au chaos, ni mauvais étalonnage ; tu as regardé sous le confort et trouvé un bon colocataire. Un port compte, et personne ne devrait te faire honte de t'y être reposé. Mais la sécurité, c'est là où l'amour commence, pas là où il se cache. Tu as le droit d'être reconnaissant pour l'abri tout en admettant que tu es venu ici pour vivre, pas juste pour accoster.",
        ar: 'إليك الحكم الصادق وغير البرّاق: أمان حقيقي، لطف حقيقي — وتيار غير موجود بصدق. ليس عمى فوضى، ولا سوء معايرة؛ نظرت تحت الراحة ووجدت زميل سكن جيدًا. الميناء مهم، ولا ينبغي أن يخجلك أحد من أنك ارتحت فيه. لكن الأمان هو حيث يبدأ الحب، لا حيث يختبئ. يحقّ لك أن تكون ممتنًا للمأوى وأن تعترف في الوقت نفسه بأنك أتيت إلى هنا لتعيش، لا لترسو فحسب.',
        es: 'Este es el veredicto honesto y sin brillo: seguridad real, amabilidad real —y una corriente que genuinamente no está ahí. No es ceguera al caos, ni mala calibración; miraste bajo la comodidad y encontraste un buen compañero de piso. Un puerto importa, y nadie debería avergonzarte por haber descansado en uno. Pero la seguridad es donde empieza el amor, no donde se esconde. Tienes permiso para estar agradecido por el refugio y aun así admitir que viniste aquí a vivir, no solo a atracar.',
      },
      shareLine: {
        en: 'Safe is where love starts — not where it hides.',
        fr: "La sécurité, c'est là où l'amour commence — pas là où il se cache.",
        ar: 'الأمان هو حيث يبدأ الحب — لا حيث يختبئ.',
        es: 'Lo seguro es donde empieza el amor — no donde se esconde.',
      },
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Order rotated per question.
  answerOutcomes: {
    w04_q1: ['true_home', 'spark_alone', 'unread_peace', 'harbor_only'],
    w04_q2: ['spark_alone', 'true_home', 'unread_peace', 'harbor_only'],
    w04_q3: ['true_home', 'spark_alone', 'harbor_only', 'unread_peace'],
    w04_q4: ['spark_alone', 'true_home', 'unread_peace', 'harbor_only'],
    w04_q5: ['true_home', 'spark_alone', 'unread_peace', 'harbor_only'],
    w04_q6: ['unread_peace', 'true_home', 'spark_alone', 'harbor_only'],
    w04_q7: ['true_home', 'spark_alone', 'unread_peace', 'harbor_only'],
  },
};
