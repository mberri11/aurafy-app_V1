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
 *  - Append `w07Questions` to the daily-question pool (src/data/dailyQuestions.ts), after ...w06Questions.
 *  - Push `w07Week` into WEEKS (src/data/weeks/index.ts), AFTER w06Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { DailyQuestion } from '../dailyQuestions';
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

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w07Questions: DailyQuestion[] = [
  {
    id: 'w07_q1',
    text: {
      en: 'Think of the person you suspect. How are they different with YOU than with others?',
      fr: 'Pense à la personne que tu soupçonnes. En quoi est-elle différente avec TOI qu\'avec les autres ?',
      ar: 'فكّر في الشخص الذي تشكّ فيه. كيف يختلف معك أنت عن الآخرين؟',
      es: '¿Piensa en la persona que sospechas. ¿En qué es diferente CONTIGO que con los demás?',
    },
    answers: [
      { label: { en: 'Noticeably different — softer, sharper, more present', fr: 'Sensiblement différente — plus douce, plus vive, plus présente', ar: 'مختلف بشكل ملحوظ — ألطف، أكثر حدّة، أكثر حضورًا', es: 'Notablemente diferente — más suave, más agudo, más presente' }, insight: { en: 'A person who is a different self only around you is leaking something.', fr: "Une personne qui est une version différente d'elle-même seulement avec toi laisse fuir quelque chose.", ar: 'الشخص الذي يكون نسخة مختلفة من نفسه فقط حولك يسرّب شيئًا.', es: 'Una persona que es una versión diferente de sí misma solo contigo está filtrando algo.' } },
      { label: { en: 'They go oddly quiet and careful near me', fr: 'Il devient étrangement silencieux et prudent près de moi', ar: 'يصبح صامتًا وحذرًا بغرابة قربي', es: 'Se pone extrañamente callado y cauteloso cerca de mí' }, insight: { en: 'Careful, jagged distance around one person is often hidden feeling, not cooling.', fr: 'Une distance prudente et en dents de scie autour d\'une seule personne est souvent un sentiment caché, pas un refroidissement.', ar: 'المسافة الحذرة والمتعرّجة حول شخص واحد غالبًا ما تكون شعورًا مخفيًا، لا برودًا.', es: 'Una distancia cautelosa e irregular alrededor de una sola persona suele ser un sentimiento oculto, no enfriamiento.' } },
      { label: { en: 'Honestly the same as with everyone — warm to all', fr: 'Honnêtement pareil qu\'avec tout le monde — chaleureux avec tous', ar: 'بصراحة نفس الشيء مع الجميع — دافئ مع الكل', es: 'Honestamente lo mismo que con todos — cálido con todos' }, insight: { en: "When the warmth isn't special to you, it may just be their baseline.", fr: "Quand la chaleur ne t'est pas spéciale, c'est peut-être juste sa base.", ar: 'حين لا يكون الدفء خاصًا بك، فقد يكون فقط خط أساسه.', es: 'Cuando la calidez no es especial para ti, puede que sea solo su línea base.' } },
      { label: { en: "I want them to be different, but I can't point to how", fr: "Je veux qu'il soit différent, mais je ne peux pas dire comment", ar: 'أريده أن يكون مختلفًا، لكن لا أستطيع تحديد كيف', es: 'Quiero que sea diferente, pero no puedo señalar cómo' }, insight: { en: 'A difference you can feel but never name may live in you, not them.', fr: 'Une différence que tu peux ressentir mais jamais nommer vit peut-être en toi, pas en lui.', ar: 'الاختلاف الذي تشعر به لكن لا تسمّيه أبدًا قد يعيش فيك أنت، لا فيه.', es: 'Una diferencia que puedes sentir pero nunca nombrar puede que viva en ti, no en él.' } },
    ],
  },
  {
    id: 'w07_q2',
    text: {
      en: 'What do they seem to remember about you?',
      fr: "Qu'est-ce qu'il semble se souvenir de toi ?",
      ar: 'ماذا يبدو أنه يتذكّر عنك؟',
      es: '¿Qué parece recordar de ti?',
    },
    answers: [
      { label: { en: 'Tiny things I barely mentioned, resurfaced months later', fr: "De petites choses que j'ai à peine mentionnées, refaisant surface des mois plus tard", ar: 'أشياء صغيرة ذكرتها بالكاد، عادت للظهور بعد أشهر', es: 'Cosas pequeñas que apenas mencioné, que resurgieron meses después' }, insight: { en: 'Effortless memory of your small details is attention pointing one way.', fr: 'Une mémoire sans effort de tes petits détails est une attention qui pointe dans une seule direction.', ar: 'الذاكرة السهلة لتفاصيلك الصغيرة هي انتباه يشير في اتجاه واحد.', es: 'Una memoria sin esfuerzo de tus pequeños detalles es atención apuntando en una dirección.' } },
      { label: { en: 'They recall things but stay guarded about why they care', fr: "Il se souvient des choses mais reste sur ses gardes sur pourquoi il tient à ça", ar: 'يتذكّر أشياء لكنه يبقى متحفّظًا حول سبب اهتمامه', es: 'Recuerda cosas pero se mantiene reservado sobre por qué le importa' }, insight: { en: "Remembering closely while hiding the interest is a quiet admirer's tell.", fr: "Se souvenir de près tout en cachant l'intérêt est le signe d'un admirateur discret.", ar: 'التذكّر الدقيق مع إخفاء الاهتمام علامة معجب صامت.', es: 'Recordar de cerca mientras oculta el interés es la señal de un admirador silencioso.' } },
      { label: { en: 'About as much as any attentive friend would', fr: "À peu près autant que n'importe quel ami attentif", ar: 'بقدر ما يفعله أي صديق منتبه', es: 'Más o menos lo que haría cualquier amigo atento' }, insight: { en: 'Ordinary friendly recall is not the same as a fixed gaze.', fr: "Un souvenir amical ordinaire n'est pas la même chose qu'un regard fixe.", ar: 'التذكّر الودّي العادي ليس نفس الشيء كنظرة ثابتة.', es: 'Un recuerdo amistoso ordinario no es lo mismo que una mirada fija.' } },
      { label: { en: "I've replayed our talks so much I'm not sure what's real", fr: "J'ai tellement rejoué nos conversations que je ne sais plus ce qui est réel", ar: 'أعدت تشغيل محادثاتنا كثيرًا لدرجة أنني لست متأكدًا مما هو حقيقي', es: 'He repasado tanto nuestras conversaciones que ya no sé qué es real' }, insight: { en: 'When you\'ve rehearsed the evidence, some of it may be your own writing.', fr: 'Quand tu as répété la preuve, une partie est peut-être ta propre écriture.', ar: 'حين تكون قد تدرّبت على الدليل، فبعضه قد يكون من كتابتك أنت.', es: 'Cuando has ensayado la evidencia, parte de ella puede ser tu propia escritura.' } },
    ],
  },
  {
    id: 'w07_q3',
    text: {
      en: 'How do they behave physically around you — space, nerves, reactions?',
      fr: "Comment se comporte-t-il physiquement autour de toi — l'espace, la nervosité, les réactions ?",
      ar: 'كيف يتصرّف جسديًا حولك — المسافة، التوتر، ردود الفعل؟',
      es: '¿Cómo se comporta físicamente contigo — espacio, nervios, reacciones?',
    },
    answers: [
      { label: { en: 'They end up near me and react a beat too strongly', fr: 'Il finit près de moi et réagit un peu trop fort', ar: 'ينتهي به الأمر قربي ويتفاعل بقوة أكبر من اللازم بلحظة', es: 'Termina cerca de mí y reacciona un poco demasiado fuerte' }, insight: { en: "Proximity plus outsized reactions is the body saying what the mouth won't.", fr: "La proximité plus des réactions démesurées, c'est le corps qui dit ce que la bouche ne dira pas.", ar: 'القرب مع ردود فعل مبالغ فيها هو الجسد يقول ما لن يقوله الفم.', es: 'La proximidad más reacciones desmedidas es el cuerpo diciendo lo que la boca no dirá.' } },
      { label: { en: "Flustered, over-formal, awkward — like they're managing something", fr: "Troublé, trop formel, maladroit — comme s'il gérait quelque chose", ar: 'مرتبك، رسمي أكثر من اللازم، محرَج — كأنه يدير شيئًا', es: 'Nervioso, demasiado formal, torpe — como si estuviera gestionando algo' }, insight: { en: "Static and formality around one person is feeling that can't come out as warmth.", fr: "L'électricité statique et la formalité autour d'une seule personne, c'est un sentiment qui ne peut pas sortir en chaleur.", ar: 'التشويش والرسمية حول شخص واحد شعور لا يمكنه الخروج كدفء.', es: 'La estática y la formalidad alrededor de una sola persona es sentimiento que no puede salir como calidez.' } },
      { label: { en: 'Relaxed and normal, same as with anyone', fr: "Détendu et normal, comme avec n'importe qui", ar: 'مسترخٍ وطبيعي، مثل أي شخص آخر', es: 'Relajado y normal, igual que con cualquiera' }, insight: { en: "An easy, unflustered nervous system usually isn't hiding a charge.", fr: "Un système nerveux calme et imperturbable ne cache généralement pas de charge.", ar: 'الجهاز العصبي الهادئ وغير المرتبك لا يخفي عادة شحنة.', es: 'Un sistema nervioso tranquilo y sereno normalmente no esconde una carga.' } },
      { label: { en: 'I search their face for signs more than I observe it', fr: "Je fouille son visage à la recherche de signes plus que je ne l'observe", ar: 'أبحث في وجهه عن علامات أكثر مما أراقبه', es: 'Busco señales en su rostro más de lo que lo observo' }, insight: { en: 'Hunting for tells can manufacture the very tells you find.', fr: 'Chasser les signes peut fabriquer les signes mêmes que tu trouves.', ar: 'البحث عن العلامات قد يصنع العلامات نفسها التي تجدها.', es: 'Cazar señales puede fabricar las mismas señales que encuentras.' } },
    ],
  },
  {
    id: 'w07_q4',
    text: {
      en: "If they tease or joke with you, what's underneath it?",
      fr: "S'il te taquine ou plaisante avec toi, qu'y a-t-il en dessous ?",
      ar: 'إن كان يضايقك أو يمزح معك، ما الذي يكمن تحت ذلك؟',
      es: 'Si te molesta o bromea contigo, ¿qué hay debajo?',
    },
    answers: [
      { label: { en: 'Warmth aimed only at me, plus real attention', fr: 'Une chaleur dirigée seulement vers moi, plus une vraie attention', ar: 'دفء موجّه نحوي فقط، بالإضافة إلى اهتمام حقيقي', es: 'Calidez dirigida solo a mí, más atención real' }, insight: { en: 'Warm, targeted teasing with care underneath is flirtation in a mask.', fr: 'Une taquinerie chaleureuse et ciblée avec de l\'attention en dessous est du flirt masqué.', ar: 'المضايقة الدافئة والموجّهة مع اهتمام تحتها غزل في قناع.', es: 'Bromas cálidas y dirigidas con cuidado debajo es coqueteo con máscara.' } },
      { label: { en: 'A charged banter they hide behind, never quite sincere', fr: "Une taquinerie chargée derrière laquelle il se cache, jamais tout à fait sincère", ar: 'مداعبة مشحونة يختبئ خلفها، لا صادقة تمامًا أبدًا', es: 'Una broma cargada detrás de la cual se esconde, nunca del todo sincera' }, insight: { en: "Deniable teasing that avoids sincerity keeps an admirer's exit open.", fr: "Une taquinerie déniable qui évite la sincérité garde la sortie d'un admirateur ouverte.", ar: 'المضايقة القابلة للإنكار التي تتجنّب الصدق تُبقي مخرج المعجب مفتوحًا.', es: 'Las bromas negables que evitan la sinceridad mantienen abierta la salida de un admirador.' } },
      { label: { en: 'The same joking they do with the whole group', fr: "Les mêmes blagues qu'il fait avec tout le groupe", ar: 'نفس المزاح الذي يمارسه مع المجموعة كلها', es: 'Las mismas bromas que hace con todo el grupo' }, insight: { en: "Teasing performed for everyone isn't a private signal to you.", fr: "Une taquinerie jouée pour tout le monde n'est pas un signal privé pour toi.", ar: 'المضايقة المؤدّاة أمام الجميع ليست إشارة خاصة لك.', es: 'Las bromas hechas para todos no son una señal privada para ti.' } },
      { label: { en: 'I read flirtation into pretty ordinary banter', fr: 'Je lis du flirt dans des taquineries plutôt ordinaires', ar: 'أقرأ غزلًا في مزاح عادي جدًا', es: 'Leo coqueteo en bromas bastante ordinarias' }, insight: { en: 'Reading romance into normal joking is hope doing the decoding.', fr: "Lire du romantisme dans des plaisanteries normales, c'est l'espoir qui fait le décodage.", ar: 'قراءة الرومانسية في مزاح عادي هو الأمل وهو يقوم بفكّ الشيفرة.', es: 'Leer romance en bromas normales es la esperanza haciendo el descifrado.' } },
    ],
  },
  {
    id: 'w07_q5',
    text: {
      en: 'When feelings might be getting close, what do they do?',
      fr: 'Quand les sentiments pourraient devenir proches, que fait-il ?',
      ar: 'حين قد تصبح المشاعر أقرب، ماذا يفعل؟',
      es: '¿Cuándo los sentimientos podrían acercarse, qué hace?',
    },
    answers: [
      { label: { en: 'Lean in, nervous but there', fr: 'Il se penche vers moi, nerveux mais présent', ar: 'يقترب، متوترًا لكنه حاضر', es: 'Se acerca, nervioso pero presente' }, insight: { en: "Approaching despite the nerves is someone whose feeling beats their fear.", fr: "S'approcher malgré la nervosité, c'est quelqu'un dont le sentiment bat sa peur.", ar: 'الاقتراب رغم التوتر هو شخص شعوره يتغلّب على خوفه.', es: 'Acercarse a pesar de los nervios es alguien cuyo sentimiento vence a su miedo.' } },
      { label: { en: 'Retreat hard — the closer we get, the more they vanish', fr: 'Il se retire fortement — plus on se rapproche, plus il disparaît', ar: 'ينسحب بشدة — كلما اقتربنا، اختفى أكثر', es: 'Se retira con fuerza — cuanto más nos acercamos, más desaparece' }, insight: { en: 'Fleeing hardest at closeness can be overwhelmed feeling, not absence.', fr: "Fuir le plus fort à l'approche peut être un sentiment débordé, pas une absence.", ar: 'الهروب بأقصى قوة عند القرب قد يكون شعورًا مُرهَقًا، لا غيابًا.', es: 'Huir con más fuerza ante la cercanía puede ser sentimiento abrumado, no ausencia.' } },
      { label: { en: "Nothing changes — there's no charge to react to", fr: "Rien ne change — il n'y a pas de charge à laquelle réagir", ar: 'لا شيء يتغيّر — لا توجد شحنة ليتفاعل معها', es: 'Nada cambia — no hay carga a la cual reaccionar' }, insight: { en: 'No shift at closeness often means there was no hidden charge.', fr: "Aucun changement à l'approche signifie souvent qu'il n'y avait pas de charge cachée.", ar: 'غياب أي تغيّر عند القرب يعني غالبًا أنه لم تكن هناك شحنة مخفية.', es: 'Ningún cambio ante la cercanía a menudo significa que no había carga oculta.' } },
      { label: { en: "I create the 'close moments' myself, then read into them", fr: "Je crée moi-même les « moments proches », puis j'y lis des choses", ar: 'أخلق "اللحظات القريبة" بنفسي، ثم أقرأ فيها معاني', es: 'Yo mismo creo los «momentos cercanos», y luego les busco significado' }, insight: { en: "Moments you engineer aren't evidence of what they feel.", fr: "Les moments que tu organises ne sont pas la preuve de ce qu'il ressent.", ar: 'اللحظات التي تهندسها بنفسك ليست دليلًا على ما يشعر به هو.', es: 'Los momentos que tú diseñas no son evidencia de lo que él siente.' } },
    ],
  },
  {
    id: 'w07_q6',
    text: {
      en: "They act like they don't care. What does their behavior actually do?",
      fr: "Il agit comme s'il s'en fichait. Que fait réellement son comportement ?",
      ar: 'يتصرّف وكأنه لا يهتم. ماذا يفعل سلوكه فعليًا؟',
      es: 'Actúa como si no le importara. ¿Qué hace realmente su comportamiento?',
    },
    answers: [
      { label: { en: 'Betrays them — they show up, remember, react anyway', fr: 'Le trahit — il se présente, se souvient, réagit quand même', ar: 'يفضحه — يحضر، يتذكّر، يتفاعل رغم كل شيء', es: 'Lo traiciona — aparece, recuerda, reacciona de todos modos' }, insight: { en: 'When stated indifference and real behavior disagree, behavior is the truth.', fr: "Quand l'indifférence déclarée et le comportement réel se contredisent, le comportement est la vérité.", ar: 'حين تتناقض اللامبالاة المُعلَنة مع السلوك الحقيقي، يكون السلوك هو الحقيقة.', es: 'Cuando la indiferencia declarada y el comportamiento real no coinciden, el comportamiento es la verdad.' } },
      { label: { en: "Carefully casual — 'unbothered' in a clearly bothered way", fr: "Soigneusement décontracté — « imperturbable » d'une manière clairement perturbée", ar: 'عفوي بحذر — "غير منزعج" بطريقة واضحة الانزعاج', es: 'Cuidadosamente casual — «despreocupado» de una manera claramente preocupada' }, insight: { en: "Effortful indifference is fear wearing a costume; real not-caring needs no performance.", fr: "Une indifférence laborieuse est la peur portant un costume ; le vrai désintérêt n'a besoin d'aucune performance.", ar: 'اللامبالاة المجهدة هي الخوف مرتديًا زيًا؛ عدم الاهتمام الحقيقي لا يحتاج إلى أداء.', es: 'La indiferencia laboriosa es el miedo con disfraz; el verdadero no-importarle no necesita actuación.' } },
      { label: { en: 'Matches the words — they genuinely spend no energy on me', fr: "Correspond aux mots — il ne dépense vraiment aucune énergie sur moi", ar: 'يتطابق مع الكلمات — لا ينفق فعليًا أي طاقة عليّ', es: 'Coincide con las palabras — genuinamente no gasta energía en mí' }, insight: { en: 'True indifference is absent, not cold; no effort means no hidden feeling.', fr: "La vraie indifférence est absente, pas froide ; aucun effort signifie aucun sentiment caché.", ar: 'اللامبالاة الحقيقية غائبة، لا باردة؛ لا جهد يعني لا شعور مخفي.', es: 'La indiferencia real está ausente, no fría; sin esfuerzo significa sin sentimiento oculto.' } },
      { label: { en: 'I keep hoping the coldness is secretly a yes', fr: "Je continue d'espérer que la froideur est secrètement un oui", ar: 'أستمر في الأمل بأن البرود هو "نعم" سرّية', es: 'Sigo esperando que la frialdad sea en secreto un sí' }, insight: { en: 'Hoping coldness is a disguise is sometimes just hope refusing a no.', fr: "Espérer que la froideur est un déguisement, c'est parfois juste l'espoir qui refuse un non.", ar: 'الأمل بأن البرود تنكّر هو أحيانًا مجرد أمل يرفض قبول "لا".', es: 'Esperar que la frialdad sea un disfraz a veces es solo esperanza negándose a aceptar un no.' } },
    ],
  },
  {
    id: 'w07_q7',
    text: {
      en: 'Would a neutral stranger, shown only the facts, agree with you?',
      fr: "Un inconnu neutre, à qui on ne montrerait que les faits, serait-il d'accord avec toi ?",
      ar: 'هل سيوافقك غريب محايد، لو عُرضت عليه الحقائق فقط؟',
      es: '¿Un extraño neutral, al que solo se le mostraran los hechos, estaría de acuerdo contigo?',
    },
    answers: [
      { label: { en: 'Yes — the pattern is consistent across weeks and settings', fr: 'Oui — le schéma est cohérent à travers les semaines et les situations', ar: 'نعم — النمط متسق عبر الأسابيع والمواقف', es: 'Sí — el patrón es consistente a través de semanas y situaciones' }, insight: { en: 'A pattern a stranger would also see is real evidence, not a wish.', fr: 'Un schéma qu\'un inconnu verrait aussi est une vraie preuve, pas un souhait.', ar: 'النمط الذي سيراه غريب أيضًا دليل حقيقي، لا أمنية.', es: 'Un patrón que un extraño también vería es evidencia real, no un deseo.' } },
      { label: { en: '"Someone is clearly holding something back"', fr: "« Quelqu'un retient clairement quelque chose »", ar: '"من الواضح أن أحدهم يخفي شيئًا"', es: '«Es evidente que alguien se está guardando algo»' }, insight: { en: 'When outsiders read concealment too, the hidden feeling is likely real.', fr: "Quand des personnes extérieures lisent aussi la dissimulation, le sentiment caché est probablement réel.", ar: 'حين يقرأ الغرباء أيضًا الإخفاء، من المرجّح أن يكون الشعور المخفي حقيقيًا.', es: 'Cuando los de afuera también leen el ocultamiento, el sentimiento oculto probablemente sea real.' } },
      { label: { en: "They'd probably say we're just friendly", fr: "Il dirait probablement qu'on est juste amicaux", ar: 'سيقول على الأرجح إننا مجرد وديّين', es: 'Probablemente diría que solo somos amistosos' }, insight: { en: 'If the neutral read is "just friends," that\'s worth trusting over the spark.', fr: "Si la lecture neutre est « juste amis », ça vaut la peine de lui faire confiance plutôt qu'à l'étincelle.", ar: 'إن كانت القراءة المحايدة "مجرد أصدقاء"، فهذا يستحق الثقة أكثر من الشرارة.', es: 'Si la lectura neutral es «solo amigos», eso vale la pena confiar más que la chispa.' } },
      { label: { en: "Honestly? They'd say it's mostly in my head", fr: "Honnêtement ? Il dirait que c'est surtout dans ma tête", ar: 'بصراحة؟ سيقول إن الأمر في رأسي في الغالب', es: '¿Sinceramente? Diría que está mayormente en mi cabeza' }, insight: { en: 'Naming that the trail is yours frees you from a foundation that was never there.', fr: "Nommer que la trace est la tienne te libère d'une fondation qui n'a jamais existé.", ar: 'تسمية أن الأثر أثرك أنت يحرّرك من أساس لم يكن موجودًا أبدًا.', es: 'Nombrar que el rastro es tuyo te libera de unos cimientos que nunca estuvieron ahí.' } },
    ],
  },
];

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
