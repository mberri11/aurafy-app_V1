/**
 * AURAFY — WEEK 7 CONTENT  ·  "Hidden Feelings"  ·  category: love  ·  module: who_loves_me
 * Authored via the aurafy-week-generator skill. FR/AR/ES translated (translation session, batch W04-08).
 *
 * Measures: who around you is hiding how they feel — and how sure can you be?
 * 4 outcomes: someone_hiding · quiet_admirer · just_friendly · your_hope
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w07_a1 … w07_a7.
 *  - Append `w07Articles` to ARTICLES (src/content/articles/index.ts), after ...w06Articles.
 *  - Merge `w07ArticlesEn` into content.en.ts. FR/AR/ES bodies live in content.fr.ts / content.ar.ts /
 *    content.es.ts under the same ids.
 *  - Push `w07Week` into WEEKS (src/data/weeks/index.ts), AFTER w06Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { WeeklyTheme } from './types';

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
/* EN is source-of-truth — never edit. FR/AR/ES bodies for these ids live in
 * content.fr.ts / content.ar.ts / content.es.ts under the same keys. */

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
        { title: 'The proximity', text: "They end up near you. In group settings, geometry keeps rearranging so they're in your orbit — usually without either of you engineering it." },
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
      { type: 'paragraph', text: 'Ask this: would a neutral outsider, shown only the facts, reach the same conclusion I have? Not "do I feel a spark" — feelings are not evidence of mutual feelings. But "is there a consistent, cross-situational pattern that a stranger would also notice?" If yes — if the attention, the memory, the proximity, the reactivity all point the same way over weeks — then someone probably IS hiding something, and their not-moving is fear, not absence. If the honest answer is that you\'re stringing together a few warm moments across a lot of ordinary ones, that\'s worth knowing too.' },
      { type: 'paragraph', text: "And here's the freeing part, whichever way it lands: you don't have to stay in the decoding forever. If the pattern is real and the only thing missing is courage — theirs or yours — a small, low-stakes move can end months of guessing. If the pattern isn't real, seeing that clearly frees you from building on a foundation that was never there. Either way, the exit from the maze is the same: stop reading tea leaves, and gently test the actual water." },
      { type: 'quote', text: 'Feelings are not evidence of mutual feelings. The pattern is the evidence — or its absence is.', attribution: 'On the last read' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Wishful perception biases us toward reading desired outcomes into ambiguous cues. The neutral-observer test — demanding a cross-situational pattern, not a felt spark — is a documented corrective for that bias.' },
    ],
  },
};

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w07Week: WeeklyTheme = {
  id: 'w07_hidden_feelings',
  title: {
    en: 'Hidden Feelings',
    fr: 'Sentiments cachés',
    ar: 'مشاعر خفية',
    es: 'Sentimientos ocultos',
  },
  category: 'love',
  resultPrompt: {
    en: 'Who around you is hiding how they feel — and how sure can you be?',
    fr: 'Qui autour de toi cache ce qu\'il ressent — et à quel point peux-tu en être sûr ?',
    ar: 'من حولك يخفي مشاعره — وإلى أي مدى يمكنك أن تكون متأكدًا؟',
    es: '¿Quién a tu alrededor esconde lo que siente — y cuán seguro puedes estar?',
  },
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
      title: { en: 'Someone Is Hiding It', fr: "Quelqu'un le cache", ar: 'أحدهم يخفيه', es: 'Alguien lo está ocultando' },
      body: {
        en: "The evidence stacks up and it points one way: someone near you is holding a feeling underwater, and it keeps leaking through the cracks. The attention finds you, the memory holds your smallest details, the body reacts a beat too strongly — and a neutral stranger would see it too. This isn't your hope writing a story; it's a pattern across weeks and settings. Their not-moving is fear, not absence. The only thing missing now is a small, low-stakes move — theirs or yours — to end the guessing.",
        fr: "Les preuves s'accumulent et pointent dans une seule direction : quelqu'un près de toi retient un sentiment sous l'eau, et il continue de fuir par les fissures. L'attention te trouve, la mémoire retient tes plus petits détails, le corps réagit un peu trop fort — et un inconnu neutre le verrait aussi. Ce n'est pas ton espoir qui écrit une histoire ; c'est un schéma à travers des semaines et des situations. Son absence de mouvement est de la peur, pas de l'absence. La seule chose qui manque maintenant est un petit geste à faible enjeu — le sien ou le tien — pour mettre fin aux suppositions.",
        ar: 'تتراكم الأدلة وتشير في اتجاه واحد: أحدهم قربك يحمل شعورًا تحت الماء، ويستمر في التسرّب عبر الشقوق. الانتباه يجدك، الذاكرة تحمل أدقّ تفاصيلك، الجسد يتفاعل بقوة أكبر من اللازم بلحظة — وسيراه غريب محايد أيضًا. هذا ليس أملك وهو يكتب قصة؛ إنه نمط عبر أسابيع ومواقف. عدم تحرّكه خوف، لا غياب. الشيء الوحيد الناقص الآن هو خطوة صغيرة منخفضة المخاطر — خطوته أو خطوتك — لإنهاء التخمين.',
        es: 'La evidencia se acumula y apunta en una sola dirección: alguien cerca de ti está sosteniendo un sentimiento bajo el agua, y sigue filtrándose por las grietas. La atención te encuentra, la memoria retiene tus detalles más pequeños, el cuerpo reacciona un poco demasiado fuerte —y un extraño neutral también lo vería. Esto no es tu esperanza escribiendo una historia; es un patrón a través de semanas y situaciones. Su no-moverse es miedo, no ausencia. Lo único que falta ahora es un pequeño movimiento de bajo riesgo —el suyo o el tuyo— para acabar con las suposiciones.',
      },
      shareLine: {
        en: 'Hidden feelings leak. Theirs have been leaking for weeks.',
        fr: 'Les sentiments cachés fuient. Les siens fuient depuis des semaines.',
        ar: 'المشاعر المخفية تتسرّب. مشاعره تتسرّب منذ أسابيع.',
        es: 'Los sentimientos ocultos se filtran. Los suyos se han estado filtrando durante semanas.',
      },
    },
    {
      key: 'quiet_admirer',
      title: { en: 'The Quiet Admirer', fr: "L'admirateur discret", ar: 'المعجب الصامت', es: 'El admirador silencioso' },
      body: {
        en: "There's a real charge here — but it lives behind a mask. The teasing that never turns sincere, the closeness kept plausibly deniable, the person who is warmer with you than they'll admit: this is someone who feels something and is guarding every exit while they do. Concealed, but real. Whether it ever steps into the open depends on their courage more than your reading — but you're not imagining the charge. Sometimes the mask slips when it's given a safe, easy reason to.",
        fr: "Il y a une vraie charge ici — mais elle vit derrière un masque. La taquinerie qui ne devient jamais sincère, la proximité maintenue plausiblement niable, la personne qui est plus chaleureuse avec toi qu'elle ne l'admettra : c'est quelqu'un qui ressent quelque chose et garde chaque sortie ouverte pendant ce temps. Dissimulé, mais réel. Que ça sorte un jour au grand jour dépend plus de son courage que de ta lecture — mais tu n'imagines pas la charge. Parfois le masque glisse quand on lui donne une raison sûre et facile de le faire.",
        ar: 'هناك شحنة حقيقية هنا — لكنها تعيش خلف قناع. المضايقة التي لا تتحوّل أبدًا إلى صدق، القرب المحفوظ قابلًا للإنكار بشكل معقول، الشخص الأكثر دفئًا معك مما سيعترف به: هذا شخص يشعر بشيء ما ويحرس كل مخرج بينما يفعل ذلك. مخفيّ، لكنه حقيقي. أما إن كان سيخرج يومًا إلى العلن فيعتمد على شجاعته أكثر من قراءتك — لكنك لا تتخيّل الشحنة. أحيانًا ينزلق القناع حين يُمنح سببًا آمنًا وسهلًا لذلك.',
        es: 'Hay una carga real aquí —pero vive detrás de una máscara. Las bromas que nunca se vuelven sinceras, la cercanía mantenida con negación plausible, la persona que es más cálida contigo de lo que admitirá: esto es alguien que siente algo y guarda cada salida mientras lo hace. Oculto, pero real. Si alguna vez sale a la luz depende más de su coraje que de tu lectura —pero no estás imaginando la carga. A veces la máscara se desliza cuando se le da una razón segura y fácil para hacerlo.',
      },
      shareLine: {
        en: "Some people flirt in a mask, hoping you'll read it anyway.",
        fr: 'Certaines personnes flirtent masquées, espérant que tu le liras quand même.',
        ar: 'بعض الناس يغازلون مرتدين قناعًا، آملين أن تفهم رغم ذلك.',
        es: 'Algunas personas coquetean con máscara, esperando que de todos modos lo notes.',
      },
    },
    {
      key: 'just_friendly',
      title: { en: 'Just Genuinely Friendly', fr: 'Juste sincèrement amical', ar: 'ودود بصدق فحسب', es: 'Solo genuinamente amistoso' },
      body: {
        en: "Here's the clear-eyed read, offered gently: what you're seeing looks like warmth without a secret underneath. They're kind to you — but about as kind to everyone; they remember things — the way attentive friends do; nothing shifts when closeness rises, because there's no hidden charge to shift. That's not a rejection, and it's not nothing — genuine friendliness is its own good thing. It just isn't the concealed feeling you were testing for. Knowing that saves you months of decoding an ordinary kindness.",
        fr: "Voici la lecture lucide, offerte avec douceur : ce que tu vois ressemble à de la chaleur sans secret en dessous. Il est gentil avec toi — mais à peu près aussi gentil avec tout le monde ; il se souvient de choses — comme le font les amis attentifs ; rien ne change quand la proximité augmente, parce qu'il n'y a pas de charge cachée qui puisse changer. Ce n'est pas un rejet, et ce n'est pas rien — l'amitié sincère est une bonne chose en soi. Ce n'est juste pas le sentiment dissimulé que tu cherchais. Le savoir t'économise des mois à décrypter une gentillesse ordinaire.",
        ar: 'إليك القراءة الواضحة، مُقدَّمة بلطف: ما تراه يبدو دفئًا دون سرّ تحته. إنه لطيف معك — لكن بقدر ما هو لطيف مع الجميع تقريبًا؛ يتذكّر أشياء — كما يفعل الأصدقاء المنتبهون؛ لا شيء يتغيّر حين يرتفع القرب، لأنه لا توجد شحنة مخفية لتتغيّر. هذا ليس رفضًا، وليس لا شيء — الودّ الصادق شيء جيد بحدّ ذاته. إنه فقط ليس الشعور المخفي الذي كنت تختبر وجوده. معرفة ذلك توفّر عليك أشهرًا من فكّ شيفرة لطف عادي.',
        es: 'Aquí está la lectura clara, ofrecida con suavidad: lo que estás viendo se parece a calidez sin secreto debajo. Es amable contigo —pero más o menos igual de amable con todos; recuerda cosas —como hacen los amigos atentos; nada cambia cuando la cercanía aumenta, porque no hay carga oculta que cambiar. Eso no es un rechazo, y no es nada —la amistad genuina es algo bueno en sí misma. Simplemente no es el sentimiento oculto que estabas buscando. Saber eso te ahorra meses descifrando una amabilidad ordinaria.',
      },
      shareLine: {
        en: 'Not every warm person is a secret crush. Some are just warm.',
        fr: 'Toutes les personnes chaleureuses ne sont pas un béguin secret. Certaines sont juste chaleureuses.',
        ar: 'ليس كل شخص دافئ إعجابًا سريًا. بعضهم دافئ فحسب.',
        es: 'No toda persona cálida es un enamoramiento secreto. Algunas simplemente son cálidas.',
      },
    },
    {
      key: 'your_hope',
      title: { en: 'The Story Is Yours', fr: "L'histoire est la tienne", ar: 'القصة قصتك أنت', es: 'La historia es tuya' },
      body: {
        en: "The tender plot twist: most of the trail you've been reading, you wrote. The 'close moments' were ones you engineered; the evidence got rehearsed until it felt solid; the coldness became a puzzle you hoped hid a yes. Feelings are not evidence of mutual feelings — and a neutral stranger, shown the raw facts, wouldn't build the cathedral you built. This isn't foolish; it's the most human error there is, seeing most vividly what we most want. Seeing it clearly frees you from a foundation that was never really there.",
        fr: "Le retournement de situation, en douceur : la plupart de la trace que tu as lue, c'est toi qui l'as écrite. Les « moments proches » étaient ceux que tu as organisés ; la preuve a été répétée jusqu'à sembler solide ; la froideur est devenue une énigme dans laquelle tu espérais trouver un oui caché. Les sentiments ne sont pas la preuve de sentiments réciproques — et un inconnu neutre, à qui l'on montrerait les faits bruts, ne construirait pas la cathédrale que tu as construite. Ce n'est pas idiot ; c'est l'erreur la plus humaine qui soit, voir le plus clairement ce que l'on désire le plus. Le voir clairement te libère d'une fondation qui n'a jamais vraiment existé.",
        ar: 'المفاجأة اللطيفة: معظم الأثر الذي كنت تقرؤه، أنت من كتبه. "اللحظات القريبة" كانت من هندستها أنت؛ الدليل تدرّب عليه حتى بدا صلبًا؛ البرود أصبح لغزًا تمنّيت أن يخفي "نعم". المشاعر ليست دليلًا على مشاعر متبادلة — وغريب محايد، لو عُرضت عليه الحقائق الخام، لن يبني الكاتدرائية التي بنيتها أنت. هذا ليس غباءً؛ إنه أكثر خطأ إنساني على الإطلاق، رؤية ما نريده أكثر بأوضح صورة. رؤيته بوضوح تحرّرك من أساس لم يكن موجودًا حقًا أبدًا.',
        es: 'El giro de la trama, con ternura: la mayor parte del rastro que has estado leyendo, lo escribiste tú. Los «momentos cercanos» fueron los que diseñaste; la evidencia se ensayó hasta sentirse sólida; la frialdad se convirtió en un rompecabezas que esperabas que escondiera un sí. Los sentimientos no son evidencia de sentimientos mutuos —y un extraño neutral, al que se le mostraran los hechos crudos, no construiría la catedral que tú construiste. Esto no es tonto; es el error más humano que existe, ver más vívidamente lo que más queremos. Verlo con claridad te libera de unos cimientos que nunca estuvieron realmente ahí.',
      },
      shareLine: {
        en: "Feelings aren't evidence of mutual feelings. Sometimes the story is ours.",
        fr: "Les sentiments ne sont pas la preuve de sentiments réciproques. Parfois, l'histoire est la nôtre.",
        ar: 'المشاعر ليست دليلًا على مشاعر متبادلة. أحيانًا القصة قصتنا نحن.',
        es: 'Los sentimientos no son evidencia de sentimientos mutuos. A veces la historia es nuestra.',
      },
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
