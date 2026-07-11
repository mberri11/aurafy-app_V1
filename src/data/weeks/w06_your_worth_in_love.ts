/**
 * AURAFY — WEEK 6 CONTENT  ·  "Your Worth in Love"  ·  category: self  ·  module: am_i_problem
 * Authored via the aurafy-week-generator skill. FR/AR/ES translated (translation session, batch W04-08).
 *
 * Measures: your standards — and where you abandon them.
 * 4 outcomes: rooted_worth · self_editor · over_giver · approval_seeker
 *
 * NOTE ON category: this is a SELF-DISCOVERY week (about the user, not a target person).
 * category is 'self' so the week's chip/accent theme reads as self-discovery, not love.
 * relatedModuleId is am_i_problem (self module).
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w06_a1 … w06_a7.
 *  - Append `w06Articles` to ARTICLES (src/content/articles/index.ts), after ...w05Articles.
 *  - Merge `w06ArticlesEn` into content.en.ts. FR/AR/ES bodies live in content.fr.ts / content.ar.ts /
 *    content.es.ts under the same ids.
 *  - Append `w06Questions` to the daily-question pool (src/data/dailyQuestions.ts), after ...w05Questions.
 *  - Push `w06Week` into WEEKS (src/data/weeks/index.ts), AFTER w05Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w06Articles: Article[] = [
  { id: 'w06_a1', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-10' },
  { id: 'w06_a2', category: 'self', readMinutes: 4, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-11' },
  { id: 'w06_a3', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-12' },
  { id: 'w06_a4', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-13' },
  { id: 'w06_a5', category: 'self', readMinutes: 4, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-14' },
  { id: 'w06_a6', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-15' },
  { id: 'w06_a7', category: 'self', readMinutes: 5, relatedModuleId: 'am_i_problem', featured: true, publishedAt: '2026-08-16' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */
/* EN is source-of-truth — never edit. FR/AR/ES bodies for these ids live in
 * content.fr.ts / content.ar.ts / content.es.ts under the same keys. */

export const w06ArticlesEn: Record<string, ArticleContent> = {
  w06_a1: {
    title: 'Knowing Your Worth When You Want Them Anyway',
    subtitle: 'Self-worth is easy in theory and hard at 2 a.m.',
    blocks: [
      { type: 'paragraph', text: "Everyone agrees you should know your worth. It fits on a mug. The trouble is that self-worth isn't tested when you're calm and single and reading affirmations — it's tested at 2 a.m. when someone who treats you carelessly texts back, and every principle you hold evaporates in the warm rush of their attention. Worth you can feel only when it's easy isn't worth. It's a mood." },
      { type: 'heading', text: 'Worth is what survives wanting' },
      { type: 'paragraph', text: 'Real self-worth isn\'t the absence of longing. You can ache for someone and still keep your standards — in fact that\'s the only place standards mean anything. The question this week asks isn\'t "do you know your worth?" It\'s the harder one: does your worth hold WHEN you want them? Or does the wanting quietly rewrite the rules every single time?' },
      { type: 'paragraph', text: 'This isn\'t a week about pretending to need no one. It\'s about noticing the exact moment where desire starts negotiating your worth down — where "I deserve consistency" becomes "well, they\'re just bad at texting," where a boundary becomes a suggestion becomes a memory. That moment is findable. And once you can see it, you can stop being surprised by it.' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Self-worth researchers distinguish stable self-worth from contingent self-worth — the latter rises and falls with others\' approval. Standards that collapse under wanting are a sign worth is being sourced externally, which is both common and changeable.' },
    ],
  },
  w06_a2: {
    title: 'The Standards You Drop When You Like Someone',
    subtitle: 'The quiet renegotiation nobody notices themselves doing',
    blocks: [
      { type: 'paragraph', text: "Ask anyone their standards and they'll list them cleanly: honesty, consistency, effort, respect. Watch the same person fall for someone who has none of those, and the list performs a quiet magic trick. It doesn't disappear — that would be too obvious. It bends. Each requirement gets a personalized exception, tailored precisely to the person failing it." },
      { type: 'heading', text: 'How the bending sounds' },
      { type: 'paragraph', text: '"I need someone emotionally available" becomes "they\'re just guarded because of their past." "I won\'t be someone\'s secret" becomes "they\'re private, it\'s not personal." "I need consistency" becomes "they\'re going through a lot right now." Every one of these MIGHT be true. That\'s what makes the trick work — the exceptions are always plausible. But stack them up and a pattern emerges: the standards don\'t bend for everyone. They bend for the people you want, in exact proportion to how much you want them.' },
      { type: 'quote', text: 'A standard that has an exception for everyone you desire was never a standard. It was a wish.', attribution: 'On the bending' },
      { type: 'paragraph', text: "The fix isn't to become rigid or cold. It's to catch the renegotiation in real time — to notice the exact sentence where you start defending someone's failure to meet a bar you set for good reasons. You're allowed to keep a standard AND have compassion for why someone falls short of it. Compassion for them doesn't require abandoning it for you." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Motivated reasoning is well documented: we generate plausible justifications for what we already want. Standards erode not through decision but through a series of individually reasonable-sounding exceptions.' },
    ],
  },
  w06_a3: {
    title: 'Why You Over-Give to People Who Under-Give',
    subtitle: 'The math that never balances, and why you keep doing it',
    blocks: [
      { type: 'paragraph', text: "There's a specific, exhausting pattern: the less someone gives you, the more you give them. You over-explain, over-accommodate, over-function — pouring effort into the exact people who pour the least back. It feels like generosity. Often it's something else wearing generosity's clothes: an attempt to earn a love that's being withheld." },
      { type: 'heading', text: 'The withholding creates the chasing' },
      { type: 'paragraph', text: "When someone gives freely, you relax — there's nothing to earn, so you stop performing. When someone gives sparingly, a different circuit fires: their scarcity reads as a puzzle you can solve with enough effort. If I just give MORE — more understanding, more patience, more of myself — surely they'll finally give back. So you increase your investment in response to their decreasing one, which is exactly backwards, and exactly what keeps the imbalance alive." },
      { type: 'paragraph', text: "Notice the tell: your effort tends to spike right after they pull back, not after they show up. Healthy giving responds to presence — you pour into people who pour into you. Compensatory over-giving responds to absence — you pour hardest into the void, hoping to fill it. The first builds relationships. The second builds resentment with a smile on it." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Effort that increases in response to a partner\'s withdrawal reflects compensatory investment — trying to restore a bond through unilateral over-function. It reliably deepens imbalance rather than correcting it.' },
    ],
  },
  w06_a4: {
    title: 'Anxious Generosity: Love as a Bargaining Chip',
    subtitle: 'When giving is really asking',
    blocks: [
      { type: 'paragraph', text: "Some generosity is pure — you give because giving is joy, with no invoice attached. And some generosity is anxious — you give as a down payment on security, a way of buying reassurance that you won't be left. From the outside they look identical. From the inside, only one of them leaves you keeping score." },
      { type: 'heading', text: 'The receipt test' },
      { type: 'paragraph', text: "Here's how to tell which one you're running. After you give, do you feel lighter — or do you feel owed? Pure giving ends when the gift lands; there's no residue. Anxious giving leaves a receipt in your hand: a quiet expectation of return, a little flare of resentment when the return doesn't come, a running tally of everything you've done that they haven't matched. If your generosity generates a ledger, it was never fully a gift. It was a transaction you hoped they'd honor." },
      { type: 'paragraph', text: "This isn't a character flaw — it's usually a survival strategy from somewhere love felt conditional, where being useful was how you stayed safe. But naming it matters, because anxious generosity quietly corrodes both people. It burdens them with a debt they never agreed to, and it teaches you that love must be purchased. Real security is the ability to give freely AND to stop giving to someone who only takes — without either one feeling like a catastrophe." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Giving motivated by attachment anxiety functions as reassurance-seeking rather than generosity, and it correlates with resentment and burnout — the "gift" carries an unspoken demand for security in return.' },
    ],
  },
  w06_a5: {
    title: 'The Difference Between Compromise and Self-Abandonment',
    subtitle: 'One builds a relationship. The other dissolves a person.',
    blocks: [
      { type: 'paragraph', text: "Every relationship requires compromise — that's not in question. The danger is that \"compromise\" becomes the word we use for something much costlier: the slow disappearing of yourself to keep someone else comfortable. They sound similar. They are opposites. And the line between them is one of the most important lines you'll ever learn to see." },
      { type: 'heading', text: 'Where the line runs' },
      { type: 'orderedList', items: [
        { title: 'Compromise', text: 'You give up a preference. You wanted Italian, you have sushi. You wanted to move, you stay a year. It costs you something you can afford — a want, not a core.' },
        { title: 'Self-abandonment', text: 'You give up a piece of who you are. Your values, your needs, your friendships, your voice, the things that make you YOU. It costs you something you can\'t afford to lose and stay whole.' },
        { title: 'The test', text: 'After it, do you feel like a partner who bent — or a person who vanished a little? Compromise is survivable indefinitely. Self-abandonment has a body count, and the body is you.' },
      ] },
      { type: 'paragraph', text: 'The insidious part is gradualism. Nobody abandons themselves in one dramatic act. It happens in increments so small each one seems reasonable — a hobby dropped, an opinion swallowed, a friend seen less, a need stopped being mentioned. Then one day you look up and can\'t find yourself in your own life. The prevention is to track the trend, not the increment: not "is this one thing okay?" but "which direction have I been moving for months?"' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Self-concept clarity reliably declines under chronic self-silencing in relationships, and that erosion predicts depression and dissatisfaction. Self-abandonment is a measurable loss of self, not a personality trait.' },
    ],
  },
  w06_a6: {
    title: 'Wanting Someone vs. Needing Their Approval',
    subtitle: 'Two feelings that hide inside each other',
    blocks: [
      { type: 'paragraph', text: "You can want a person — their company, their mind, their presence in your life. And you can need their approval — their validation as proof that you're okay, lovable, enough. These feel like the same longing pointed at the same person, but they're profoundly different, and telling them apart changes everything about how you love." },
      { type: 'heading', text: 'How to feel the difference' },
      { type: 'paragraph', text: "Wanting someone is expansive: their presence adds to a life that was already yours and already fine. If they left, you'd grieve — and you'd remain a whole person. Needing approval is contingent: their opinion of you becomes the thermostat of your self-worth. A cool text drops your entire mood; a warm one restores you. You're not responding to the relationship anymore. You're responding to a verdict about yourself that you've handed them the power to issue." },
      { type: 'paragraph', text: "Here's why it matters so much: needing someone's approval quietly hands them the controls. Every choice bends toward keeping their good opinion — you shrink, perform, agree, over-give, all to protect a supply of validation you've decided you can't generate yourself. Wanting keeps you sovereign; you choose them freely, from wholeness. Needing approval makes you a supplicant to your own relationship. The work of this week is moving, inch by inch, from the second to the first." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Externally contingent self-worth — sourcing your okayness from others\' approval — is linked to anxiety, instability, and diminished autonomy. Distinguishing genuine desire from approval-dependence is a documented lever for healthier attachment.' },
    ],
  },
  w06_a7: {
    title: "How Self-Respect Changes Who's Attracted to You",
    subtitle: 'The standards you keep quietly reshape who stays',
    blocks: [
      { type: 'paragraph', text: "There's a quiet mechanism most people never notice: the way you treat yourself sets the terms for how others are allowed to treat you — and over time, it filters WHO stays around at all. Not through mystical energy, but through something far more concrete. Your boundaries are a sorting mechanism, and they're always sorting, whether or not you're paying attention." },
      { type: 'heading', text: 'The sorting, made visible' },
      { type: 'paragraph', text: "When you hold self-respect — you name your needs, you don't chase, you leave what's beneath you — two things happen at once. People who wanted access to someone with weak boundaries lose interest and drift; there's no more free labor, no more one-sided supply to extract. And people capable of mutual, respectful love find you far more attractive, because self-respect reads to a healthy person as safety and substance. You're not becoming a different person. You're becoming legible — and different people answer." },
      { type: 'paragraph', text: 'This reframes the fear that keeps so many standards low: "if I ask for more, I\'ll end up alone." The truth is nearly the reverse. Lowering yourself doesn\'t win love; it wins the kind of people who are looking for someone lowered. Raising your standards doesn\'t cost you love; it costs you the people who were never going to love you well — and clears the doorway for the ones who could. Self-respect isn\'t a wall that keeps people out. It\'s a filter that lets the right ones in.' },
      { type: 'quote', text: "You don't lose people by respecting yourself. You lose the ones who needed you not to.", attribution: 'On the filter' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Boundaries function as selection pressure: consistent self-respect deters extractive dynamics and signals security to well-matched partners. Who remains around you shifts predictably as your standards stabilize.' },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w06Questions: DailyQuestion[] = [
  {
    id: 'w06_q1',
    text: {
      en: 'When someone you want treats you carelessly, what happens to your standards?',
      fr: 'Quand quelqu\'un que tu désires te traite avec négligence, qu\'arrive-t-il à tes exigences ?',
      ar: 'حين يعاملك شخص تريده بإهمال، ماذا يحدث لمعاييرك؟',
      es: 'Cuando alguien que deseas te trata con descuido, ¿qué pasa con tus estándares?',
    },
    answers: [
      { label: { en: 'They hold — I can ache for them and still expect better', fr: 'Elles tiennent — je peux souffrir pour lui et quand même attendre mieux', ar: 'تصمد — يمكنني أن أتألم لأجله وأتوقّع الأفضل مع ذلك', es: 'Se mantienen — puedo dolerme por él y aun así esperar algo mejor' }, insight: { en: 'Standards that survive wanting are the only real kind.', fr: "Les exigences qui survivent au désir sont les seules qui soient réelles.", ar: 'المعايير التي تنجو من الرغبة هي النوع الحقيقي الوحيد.', es: 'Los estándares que sobreviven al deseo son el único tipo real.' } },
      { label: { en: 'They bend — I find a reason their behavior is okay', fr: 'Elles se plient — je trouve une raison pour laquelle son comportement va', ar: 'تنحني — أجد سببًا يجعل سلوكه مقبولًا', es: 'Se doblan — encuentro una razón por la que su comportamiento está bien' }, insight: { en: 'A bar with an exception for everyone you desire was a wish, not a standard.', fr: "Une barre avec une exception pour chaque personne désirée était un souhait, pas une exigence.", ar: 'معيار له استثناء لكل من ترغب فيهم كان أمنية، لا معيارًا.', es: 'Una barra con excepción para cada persona deseada era un deseo, no un estándar.' } },
      { label: { en: 'I give even more, hoping to earn better treatment', fr: 'Je donne encore plus, espérant gagner un meilleur traitement', ar: 'أعطي أكثر، آملًا في كسب معاملة أفضل', es: 'Doy aún más, esperando ganar un mejor trato' }, insight: { en: 'Answering carelessness with more effort is chasing, not loving.', fr: 'Répondre à la négligence par plus d\'effort, c\'est poursuivre, pas aimer.', ar: 'الردّ على الإهمال بجهد أكبر هو مطاردة، لا حب.', es: 'Responder al descuido con más esfuerzo es perseguir, no amar.' } },
      { label: { en: 'My whole mood hangs on their next message', fr: 'Tout mon humeur dépend de son prochain message', ar: 'مزاجي كله معلّق على رسالته التالية', es: 'Todo mi ánimo depende de su próximo mensaje' }, insight: { en: 'When one text runs your worth, the worth is being sourced from them.', fr: 'Quand un seul texto dirige ta valeur, cette valeur vient de lui.', ar: 'حين تدير رسالة واحدة قيمتك، فالقيمة تُستمَد منه.', es: 'Cuando un solo mensaje dirige tu valor, ese valor viene de él.' } },
    ],
  },
  {
    id: 'w06_q2',
    text: {
      en: 'Think of your last strong attraction. What did you talk yourself into?',
      fr: "Pense à ta dernière forte attirance. Qu'est-ce que tu t'es convaincu d'accepter ?",
      ar: 'فكّر في آخر انجذاب قوي شعرت به. بماذا أقنعت نفسك؟',
      es: 'Piensa en tu última atracción fuerte. ¿De qué te convenciste?',
    },
    answers: [
      { label: { en: 'Nothing — I held the line even though I wanted them', fr: "Rien — j'ai tenu la ligne même si je le désirais", ar: 'لا شيء — التزمت بالحدّ رغم أنني كنت أريده', es: 'Nada — mantuve el límite aunque lo deseaba' }, insight: { en: 'Holding the line under desire is self-worth doing its actual job.', fr: "Tenir la ligne sous le désir, c'est l'estime de soi qui fait vraiment son travail.", ar: 'الالتزام بالحدّ تحت الرغبة هو تقدير الذات وهو يؤدي عمله الحقيقي.', es: 'Mantener el límite bajo el deseo es la autoestima haciendo su trabajo real.' } },
      { label: { en: 'A personalized exception for every flag', fr: "Une exception personnalisée pour chaque signal d'alarme", ar: 'استثناء مُخصَّص لكل علامة تحذير', es: 'Una excepción personalizada para cada señal de alarma' }, insight: { en: 'When every failing gets excused, the standard quietly dissolved.', fr: "Quand chaque manquement est excusé, l'exigence s'est discrètement dissoute.", ar: 'حين يُعذَر كل تقصير، يكون المعيار قد ذاب بهدوء.', es: 'Cuando se excusa cada falla, el estándar se disolvió en silencio.' } },
      { label: { en: 'That over-giving would finally make them choose me', fr: 'Que donner trop finirait par le faire me choisir', ar: 'أن الإفراط في العطاء سيجعله يختارني أخيرًا', es: 'Que dar de más finalmente lo haría elegirme' }, insight: { en: "Believing more output earns their love is the over-giver's trap.", fr: "Croire que plus de production gagne son amour est le piège de celui qui donne trop.", ar: 'الاعتقاد بأن مزيدًا من العطاء يكسب حبه هو فخّ المُفرِط في العطاء.', es: 'Creer que más esfuerzo gana su amor es la trampa de quien da de más.' } },
      { label: { en: "That if they approved of me, I'd finally feel okay", fr: "Que si il m'approuvait, je me sentirais enfin bien", ar: 'أنه لو وافق عليّ، سأشعر أخيرًا أنني بخير', es: 'Que si él me aprobaba, por fin me sentiría bien' }, insight: { en: 'Making their approval your okayness hands them the thermostat.', fr: "Faire de son approbation ton bien-être, c'est lui remettre le thermostat.", ar: 'جعل موافقته مقياس شعورك بأنك بخير هو تسليمه الترمومتر.', es: 'Hacer que su aprobación sea tu bienestar es entregarle el termostato.' } },
    ],
  },
  {
    id: 'w06_q3',
    text: {
      en: 'Your effort in relationships tends to spike right after…',
      fr: 'Ton effort dans les relations a tendance à augmenter juste après…',
      ar: 'جهدك في العلاقات يميل إلى الارتفاع مباشرة بعد…',
      es: 'Tu esfuerzo en las relaciones tiende a dispararse justo después de…',
    },
    answers: [
      { label: { en: 'They show up for me — I pour into people who pour into me', fr: 'Il est là pour moi — je verse dans les gens qui versent en moi', ar: 'يحضر من أجلي — أصبّ في من يصبّون فيّ', es: 'Él aparece para mí — vierto en la gente que vierte en mí' }, insight: { en: 'Effort that answers presence is generosity that builds.', fr: "Un effort qui répond à la présence est une générosité qui construit.", ar: 'الجهد الذي يستجيب للحضور هو سخاء يبني.', es: 'Un esfuerzo que responde a la presencia es generosidad que construye.' } },
      { label: { en: 'They pull back — I chase the void with more of myself', fr: 'Il se retire — je poursuis le vide avec plus de moi-même', ar: 'ينسحب — أطارد الفراغ بمزيد من نفسي', es: 'Se retira — persigo el vacío con más de mí mismo' }, insight: { en: 'Effort that spikes at absence is compensatory over-giving.', fr: "Un effort qui monte à l'absence est un don excessif compensatoire.", ar: 'الجهد الذي يرتفع عند الغياب هو إفراط في العطاء تعويضي.', es: 'Un esfuerzo que se dispara ante la ausencia es dar de más compensatorio.' } },
      { label: { en: "I quietly note I've done more than them again", fr: 'Je note discrètement que j\'ai encore fait plus que lui', ar: 'ألاحظ بهدوء أنني فعلت أكثر منه مجددًا', es: 'Noto en silencio que he hecho más que él otra vez' }, insight: { en: 'A running ledger under your giving means it was a transaction.', fr: 'Un décompte permanent sous ton don signifie que c\'était une transaction.', ar: 'جرد مستمر تحت عطائك يعني أنه كان صفقة.', es: 'Un recuento constante bajo tu dar significa que era una transacción.' } },
      { label: { en: 'They seem cooler — I perform harder to win them back', fr: 'Il semble plus froid — je joue un rôle plus fort pour le reconquérir', ar: 'يبدو أكثر برودًا — أتظاهر بجهد أكبر لأستعيده', es: 'Se muestra más frío — actúo más fuerte para recuperarlo' }, insight: { en: "Performing for warmth is approval-seeking wearing effort's clothes.", fr: "Jouer un rôle pour la chaleur, c'est la recherche d'approbation habillée en effort.", ar: 'التظاهر من أجل الدفء هو السعي وراء الموافقة مرتديًا ثوب الجهد.', es: 'Actuar para conseguir calidez es buscar aprobación disfrazada de esfuerzo.' } },
    ],
  },
  {
    id: 'w06_q4',
    text: {
      en: 'After you give something big to someone, how do you feel?',
      fr: 'Après avoir donné quelque chose d\'important à quelqu\'un, comment te sens-tu ?',
      ar: 'بعد أن تعطي شيئًا كبيرًا لأحدهم، كيف تشعر؟',
      es: 'Después de darle algo grande a alguien, ¿cómo te sientes?',
    },
    answers: [
      { label: { en: 'Lighter — the gift landed and that was enough', fr: 'Plus léger — le cadeau est arrivé et ça a suffi', ar: 'أخفّ — وصلت الهدية وكان ذلك كافيًا', es: 'Más ligero — el regalo llegó y eso fue suficiente' }, insight: { en: 'Giving that ends when the gift lands is the free kind.', fr: 'Un don qui se termine quand le cadeau arrive est le genre libre.', ar: 'العطاء الذي ينتهي حين تصل الهدية هو النوع الحرّ.', es: 'Dar que termina cuando el regalo llega es del tipo libre.' } },
      { label: { en: 'Owed — I catch myself waiting for the return', fr: 'Créancier — je me surprends à attendre le retour', ar: 'بأن لي دَينًا — ألاحظ نفسي أنتظر المقابل', es: 'Con derecho a algo — me sorprendo esperando el retorno' }, insight: { en: 'A receipt left in your hand means the gift was a down payment.', fr: 'Un reçu laissé dans ta main signifie que le cadeau était un acompte.', ar: 'إيصال متروك في يدك يعني أن الهدية كانت دفعة أولى.', es: 'Un recibo dejado en tu mano significa que el regalo era un anticipo.' } },
      { label: { en: 'Drained but unable to stop myself giving more', fr: "Épuisé mais incapable de m'arrêter de donner plus", ar: 'منهَك لكن غير قادر على التوقف عن إعطاء المزيد', es: 'Agotado pero incapaz de dejar de dar más' }, insight: { en: "Giving you can't stop, to someone who won't return it, is self-erasure.", fr: "Un don que tu ne peux pas arrêter, envers quelqu'un qui ne le rendra pas, est un effacement de soi.", ar: 'العطاء الذي لا تستطيع إيقافه، لمن لن يردّه، هو محو للذات.', es: 'Dar que no puedes detener, a alguien que no lo devolverá, es borrarte a ti mismo.' } },
      { label: { en: 'Anxious until they show they still approve of me', fr: "Anxieux jusqu'à ce qu'il montre qu'il m'approuve toujours", ar: 'قلقًا إلى أن يُظهر أنه ما زال يوافق عليّ', es: 'Ansioso hasta que él muestra que todavía me aprueba' }, insight: { en: 'Giving to secure approval is reassurance-seeking, not generosity.', fr: "Donner pour sécuriser l'approbation est une recherche de réassurance, pas de la générosité.", ar: 'العطاء لتأمين الموافقة هو سعي للطمأنة، لا سخاء.', es: 'Dar para asegurar la aprobación es buscar tranquilidad, no generosidad.' } },
    ],
  },
  {
    id: 'w06_q5',
    text: {
      en: 'Over the last few months in your closest relationship, you have…',
      fr: 'Au cours des derniers mois, dans ta relation la plus proche, tu as…',
      ar: 'خلال الأشهر القليلة الماضية في أقرب علاقاتك، لقد…',
      es: 'Durante los últimos meses, en tu relación más cercana, has…',
    },
    answers: [
      { label: { en: 'Stayed fully myself — bent on wants, never on core', fr: 'Suis resté pleinement moi-même — plié sur les envies, jamais sur le noyau', ar: 'بقيت نفسي تمامًا — انحنيت في الرغبات، لا في الجوهر أبدًا', es: 'Me he mantenido plenamente yo mismo — cediendo en deseos, nunca en el núcleo' }, insight: { en: 'Bending preferences while keeping your core is healthy compromise.', fr: 'Plier les préférences tout en gardant son noyau est un compromis sain.', ar: 'الانحناء في التفضيلات مع الحفاظ على جوهرك تنازل صحي.', es: 'Ceder en preferencias mientras mantienes tu núcleo es un compromiso saludable.' } },
      { label: { en: 'Traded a preference here and there, nothing vital', fr: "Échangé une préférence par-ci par-là, rien de vital", ar: 'بدّلت تفضيلًا هنا وهناك، لا شيء حيويًا', es: 'He cambiado una preferencia aquí y allá, nada vital' }, insight: { en: 'Small affordable trades are the ordinary cost of togetherness.', fr: 'De petits échanges abordables sont le coût ordinaire de la vie à deux.', ar: 'المقايضات الصغيرة المقدور عليها هي التكلفة العادية للحياة المشتركة.', es: 'Los pequeños intercambios asequibles son el costo ordinario de estar juntos.' } },
      { label: { en: 'Slowly dropped hobbies, friends, opinions, needs', fr: 'Abandonné lentement des loisirs, des amis, des opinions, des besoins', ar: 'تخلّيت ببطء عن هوايات، وأصدقاء، وآراء، واحتياجات', es: 'Abandoné lentamente pasatiempos, amigos, opiniones, necesidades' }, insight: { en: 'Incremental disappearing is self-abandonment, one small piece at a time.', fr: 'Une disparition progressive est un abandon de soi, un petit morceau à la fois.', ar: 'الاختفاء التدريجي هو تخلٍّ عن الذات، قطعة صغيرة تلو الأخرى.', es: 'Desaparecer de forma incremental es abandonarte a ti mismo, un pedacito a la vez.' } },
      { label: { en: 'Gone quiet about my needs to keep them comfortable', fr: "Devenu silencieux sur mes besoins pour le garder à l'aise", ar: 'صمتّ عن احتياجاتي لأبقيه مرتاحًا', es: 'Me he callado sobre mis necesidades para mantenerlo cómodo' }, insight: { en: 'Silencing your needs for their comfort trades your self for their ease.', fr: 'Faire taire tes besoins pour son confort échange ton moi contre sa facilité.', ar: 'إسكات احتياجاتك من أجل راحته يستبدل ذاتك براحته.', es: 'Silenciar tus necesidades por su comodidad cambia tu yo por su facilidad.' } },
    ],
  },
  {
    id: 'w06_q6',
    text: {
      en: "Be honest about what you feel for the person on your mind. It's mostly…",
      fr: 'Sois honnête sur ce que tu ressens pour la personne à qui tu penses. C\'est surtout…',
      ar: 'كن صادقًا حيال ما تشعر به تجاه الشخص الذي يشغل بالك. إنه في الغالب…',
      es: 'Sé honesto sobre lo que sientes por la persona en la que piensas. Es sobre todo…',
    },
    answers: [
      { label: { en: 'Wanting them — they add to a life already mine and fine', fr: 'Le désirer — il s\'ajoute à une vie déjà mienne et déjà bien', ar: 'أريده — يضيف إلى حياة هي بالفعل حياتي وبخير', es: 'Lo deseo — se suma a una vida que ya es mía y ya está bien' }, insight: { en: 'Desire from wholeness keeps you sovereign in your own love.', fr: 'Un désir venant de la plénitude te garde souverain dans ton propre amour.', ar: 'الرغبة النابعة من الاكتمال تُبقيك سيّد حبك الخاص.', es: 'El deseo que viene de la plenitud te mantiene soberano en tu propio amor.' } },
      { label: { en: "Wanting them so much I've quietly excused their worst", fr: "Le désirer tellement que j'ai discrètement excusé le pire chez lui", ar: 'أريده كثيرًا لدرجة أنني عذرت بهدوء أسوأ ما فيه', es: 'Lo deseo tanto que he excusado en silencio lo peor de él' }, insight: { en: 'Desire that rewrites the rules for them is the standards editor at work.', fr: "Un désir qui réécrit les règles pour lui, c'est l'éditeur d'exigences au travail.", ar: 'الرغبة التي تعيد كتابة القواعد من أجله هي محرّر المعايير وهو يعمل.', es: 'Un deseo que reescribe las reglas para él es el editor de estándares trabajando.' } },
      { label: { en: "Needing to prove I'm worth it — so I keep over-giving", fr: 'Avoir besoin de prouver que je le vaux — alors je continue de trop donner', ar: 'أحتاج إلى إثبات أنني أستحق — لذا أستمر في الإفراط بالعطاء', es: 'Necesito demostrar que lo valgo — así que sigo dando de más' }, insight: { en: "Trying to earn your place through output is the over-giver's engine.", fr: "Essayer de gagner sa place par la production est le moteur de celui qui donne trop.", ar: 'محاولة كسب مكانك بالعطاء هي محرّك المُفرِط في العطاء.', es: 'Intentar ganarte tu lugar a través del esfuerzo es el motor de quien da de más.' } },
      { label: { en: 'Their approval running my thermostat, hot and cold', fr: 'Son approbation dirige mon thermostat, chaud et froid', ar: 'موافقته تدير ترمومتري، حارًا وباردًا', es: 'Su aprobación dirige mi termostato, cálido y frío' }, insight: { en: "When their opinion sets your temperature, you've handed them the controls.", fr: "Quand son opinion règle ta température, tu lui as remis les commandes.", ar: 'حين يضبط رأيه درجة حرارتك، تكون قد سلّمته زمام التحكّم.', es: 'Cuando su opinión fija tu temperatura, le has entregado los controles.' } },
    ],
  },
  {
    id: 'w06_q7',
    text: {
      en: '"If I asked for more or walked away, I\'d end up alone." How true does that feel?',
      fr: '« Si je demandais plus ou si je partais, je finirais seul. » À quel point ça sonne vrai ?',
      ar: '"لو طلبت المزيد أو رحلت، سأنتهي وحيدًا." إلى أي مدى يبدو هذا صحيحًا؟',
      es: '«Si pidiera más o me fuera, terminaría solo.» ¿Cuán cierto se siente eso?',
    },
    answers: [
      { label: { en: 'False — self-respect filters IN the right people', fr: "Faux — le respect de soi filtre et fait entrer les bonnes personnes", ar: 'خطأ — احترام الذات يُصفّي فيدخل الأشخاص المناسبون', es: 'Falso — el respeto propio deja entrar a la gente correcta' }, insight: { en: 'Knowing standards attract the well-matched is worth standing on solid ground.', fr: "Savoir que les exigences attirent les bien assortis vaut la peine de tenir un sol solide.", ar: 'معرفة أن المعايير تجذب المتوافقين تستحق الوقوف على أرض صلبة.', es: 'Saber que los estándares atraen a los bien emparejados vale la pena para pararse en terreno sólido.' } },
      { label: { en: "Mostly false — I've seen better people show up when I rise", fr: "Surtout faux — j'ai vu de meilleures personnes se présenter quand je m'élève", ar: 'خطأ في الغالب — رأيت أشخاصًا أفضل يظهرون حين أرتقي', es: 'Mayormente falso — he visto aparecer mejores personas cuando me elevo' }, insight: { en: 'Watching the room improve when you rise is the filter working.', fr: "Voir la pièce s'améliorer quand tu t'élèves, c'est le filtre qui fonctionne.", ar: 'مشاهدة الغرفة تتحسّن حين ترتقي هو المصفاة وهي تعمل.', es: 'Ver que la sala mejora cuando te elevas es el filtro funcionando.' } },
      { label: { en: 'Painfully true — so I keep over-giving to not lose them', fr: 'Douloureusement vrai — alors je continue de trop donner pour ne pas le perdre', ar: 'صحيح بشكل مؤلم — لذا أستمر في الإفراط بالعطاء كي لا أخسره', es: 'Dolorosamente cierto — así que sigo dando de más para no perderlo' }, insight: { en: 'Believing you must stay lowered to be loved keeps you giving into a void.', fr: 'Croire que tu dois rester rabaissé pour être aimé te fait donner dans le vide.', ar: 'الاعتقاد بأنك يجب أن تبقى منخفض المستوى لتُحَب يُبقيك تعطي في فراغ.', es: 'Creer que debes mantenerte rebajado para ser amado te mantiene dando al vacío.' } },
      { label: { en: 'True — losing their approval feels like losing everything', fr: 'Vrai — perdre son approbation ressemble à tout perdre', ar: 'صحيح — فقدان موافقته يشبه فقدان كل شيء', es: 'Cierto — perder su aprobación se siente como perderlo todo' }, insight: { en: 'When their approval feels like your whole worth, that fear runs the show.', fr: 'Quand son approbation ressemble à toute ta valeur, cette peur mène la danse.', ar: 'حين تبدو موافقته وكأنها كل قيمتك، هذا الخوف هو من يدير العرض.', es: 'Cuando su aprobación se siente como todo tu valor, ese miedo dirige el espectáculo.' } },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w06Week: WeeklyTheme = {
  id: 'w06_your_worth_in_love',
  title: {
    en: 'Your Worth in Love',
    fr: 'Ta valeur en amour',
    ar: 'قيمتك في الحب',
    es: 'Tu valor en el amor',
  },
  category: 'self',
  resultPrompt: {
    en: 'Where do you hold your standards — and where do you abandon them?',
    fr: 'Où maintiens-tu tes exigences — et où les abandonnes-tu ?',
    ar: 'أين تحافظ على معاييرك — وأين تتخلّى عنها؟',
    es: '¿Dónde mantienes tus estándares — y dónde los abandonas?',
  },
  days: [
    { articleId: 'w06_a1', questionId: 'w06_q1' },
    { articleId: 'w06_a2', questionId: 'w06_q2' },
    { articleId: 'w06_a3', questionId: 'w06_q3' },
    { articleId: 'w06_a4', questionId: 'w06_q4' },
    { articleId: 'w06_a5', questionId: 'w06_q5' },
    { articleId: 'w06_a6', questionId: 'w06_q6' },
    { articleId: 'w06_a7', questionId: 'w06_q7' },
  ],
  outcomes: [
    {
      key: 'rooted_worth',
      title: { en: 'Rooted in Your Worth', fr: 'Enraciné dans ta valeur', ar: 'متجذّر في قيمتك', es: 'Arraigado en tu valor' },
      body: {
        en: "Here's what your answers keep showing: your worth holds even when you want someone. You can ache for a person and still expect to be treated well — the desire doesn't rewrite your rules. You give from wholeness, not to earn, and you'd grieve a loss without dissolving into one. This is the rare, quietly powerful thing self-help mugs promise and few people actually own. Protect it. And know that it's exactly what draws healthy love toward you.",
        fr: "Voici ce que tes réponses n'ont cessé de montrer : ta valeur tient même quand tu désires quelqu'un. Tu peux souffrir pour une personne et quand même attendre d'être bien traité — le désir ne réécrit pas tes règles. Tu donnes depuis la plénitude, pas pour gagner, et tu ferais ton deuil d'une perte sans t'y dissoudre. C'est la chose rare et discrètement puissante que promettent les tasses de développement personnel, et que peu de gens possèdent vraiment. Protège-la. Et sache que c'est exactement ce qui attire l'amour sain vers toi.",
        ar: 'إليك ما استمرت إجاباتك في إظهاره: قيمتك تصمد حتى حين تريد شخصًا. يمكنك أن تتألم لأجل شخص وأن تتوقّع مع ذلك أن تُعامَل جيدًا — الرغبة لا تعيد كتابة قواعدك. تعطي من اكتمالك، لا لتكسب، وستحزن على خسارة دون أن تذوب فيها. هذا هو الشيء النادر والقوي بهدوء الذي تعد به أكواب تطوير الذات ولا يمتلكه سوى القليل فعليًا. احمِه. واعلم أنه بالضبط ما يجذب الحب الصحي نحوك.',
        es: 'Esto es lo que tus respuestas siguen mostrando: tu valor se sostiene incluso cuando deseas a alguien. Puedes doler por una persona y aun así esperar ser tratado bien —el deseo no reescribe tus reglas. Das desde la plenitud, no para ganar, y harías duelo por una pérdida sin disolverte en ella. Esta es la cosa rara y silenciosamente poderosa que prometen las tazas de autoayuda y que pocas personas realmente poseen. Protégela. Y sabe que es exactamente lo que atrae el amor sano hacia ti.',
      },
      shareLine: {
        en: "Worth you can feel only when it's easy isn't worth. Mine holds when I want them.",
        fr: 'Une valeur que tu ne peux ressentir que quand c\'est facile n\'est pas une valeur. La mienne tient quand je le désire.',
        ar: 'القيمة التي تشعر بها فقط حين يكون الأمر سهلًا ليست قيمة. قيمتي تصمد حين أريده.',
        es: 'Un valor que solo puedes sentir cuando es fácil no es valor. El mío se sostiene cuando lo deseo.',
      },
    },
    {
      key: 'self_editor',
      title: { en: 'The Standards Editor', fr: "L'éditeur d'exigences", ar: 'محرّر المعايير', es: 'El editor de estándares' },
      body: {
        en: "You have real standards — until you want someone, and then the quiet renegotiation begins. Each flag gets a personalized, plausible exception, tailored precisely to the person failing it. The bar doesn't vanish; it bends, in exact proportion to how much you want them. This isn't about becoming cold — it's about catching the sentence where you start defending someone's failure to meet a bar you set for good reasons. You can keep the standard AND have compassion for why they fall short. The compassion is for them. The standard is for you.",
        fr: "Tu as de vraies exigences — jusqu'à ce que tu désires quelqu'un, et alors commence la renégociation discrète. Chaque signal d'alarme obtient une exception personnalisée et plausible, taillée précisément pour la personne qui n'y répond pas. La barre ne disparaît pas ; elle se plie, en proportion exacte de combien tu le désires. Il ne s'agit pas de devenir froid — il s'agit de surprendre la phrase où tu commences à défendre l'échec de quelqu'un à atteindre une barre que tu as fixée pour de bonnes raisons. Tu peux garder l'exigence ET avoir de la compassion pour les raisons de son échec. La compassion est pour lui. L'exigence est pour toi.",
        ar: 'لديك معايير حقيقية — إلى أن تريد شخصًا، وعندها تبدأ إعادة التفاوض الهادئة. كل علامة تحذير تحصل على استثناء مُخصَّص ومعقول، مُفصَّل بدقة على مقاس من يفشل فيها. لا تختفي البارة؛ بل تنحني، بتناسب دقيق مع مقدار رغبتك به. الأمر لا يتعلّق بأن تصبح باردًا — بل بأن تضبط الجملة التي تبدأ فيها بالدفاع عن فشل أحدهم في بلوغ بارة وضعتها لأسباب وجيهة. يمكنك أن تحافظ على المعيار وأن تتعاطف مع أسباب تقصيره في آنٍ واحد. التعاطف له. المعيار لك.',
        es: 'Tienes estándares reales —hasta que deseas a alguien, y entonces comienza la renegociación silenciosa. Cada señal de alarma obtiene una excepción personalizada y plausible, hecha a medida precisamente para la persona que la falla. La barra no desaparece; se dobla, en proporción exacta a cuánto lo deseas. Esto no se trata de volverse frío —se trata de atrapar la frase donde empiezas a defender el fracaso de alguien en cumplir una barra que pusiste por buenas razones. Puedes mantener el estándar Y tener compasión por las razones por las que no la alcanza. La compasión es para él. El estándar es para ti.',
      },
      shareLine: {
        en: 'A standard with an exception for everyone I want was never a standard.',
        fr: "Une exigence avec une exception pour chaque personne que je désire n'a jamais été une exigence.",
        ar: 'معيار له استثناء لكل من أريدهم لم يكن معيارًا قط.',
        es: 'Un estándar con excepción para cada persona que deseo nunca fue un estándar.',
      },
    },
    {
      key: 'over_giver',
      title: { en: 'The Over-Giver', fr: 'Celui qui donne trop', ar: 'المُفرِط في العطاء', es: 'Quien da de más' },
      body: {
        en: "Your pattern is loud once it's named: the less someone gives, the more you pour in — and your effort spikes right after they pull back, not after they show up. That's not generosity; it's an attempt to earn a love that's being withheld, and it runs exactly backwards, feeding the imbalance it's trying to fix. You've been pouring hardest into the void. The work isn't to give less to everyone — it's to give to people who give back, and to let the void stay empty long enough to show you what it really is.",
        fr: "Ton schéma est évident une fois nommé : moins quelqu'un donne, plus tu verses — et ton effort monte juste après qu'il se retire, pas après qu'il se présente. Ce n'est pas de la générosité ; c'est une tentative de gagner un amour qui t'est refusé, et ça fonctionne exactement à l'envers, nourrissant le déséquilibre qu'elle tente de corriger. Tu as versé le plus fort dans le vide. Le travail n'est pas de donner moins à tout le monde — c'est de donner aux gens qui rendent, et de laisser le vide rester vide assez longtemps pour te montrer ce qu'il est réellement.",
        ar: 'نمطك واضح بمجرد أن يُسمّى: كلما أعطى أحدهم أقل، صببت أكثر — وجهدك يرتفع مباشرة بعد أن ينسحب، لا بعد أن يحضر. هذا ليس سخاءً؛ إنه محاولة لكسب حب يُحجَب عنك، ويعمل بشكل معكوس تمامًا، يغذّي عدم التوازن الذي يحاول إصلاحه. كنت تصبّ بأقصى قوة في الفراغ. العمل ليس أن تعطي أقل للجميع — بل أن تعطي لمن يردّون العطاء، وأن تدع الفراغ يبقى فارغًا لفترة كافية ليريك ما هو عليه فعليًا.',
        es: 'Tu patrón es evidente una vez nombrado: cuanto menos da alguien, más viertes tú —y tu esfuerzo se dispara justo después de que él se retira, no después de que aparece. Eso no es generosidad; es un intento de ganar un amor que se te está negando, y funciona exactamente al revés, alimentando el desequilibrio que intenta arreglar. Has estado vertiendo con más fuerza en el vacío. El trabajo no es dar menos a todos —es dar a la gente que devuelve, y dejar que el vacío permanezca vacío el tiempo suficiente para mostrarte lo que realmente es.',
      },
      shareLine: {
        en: 'I pour hardest into the people who pour back the least. Not anymore.',
        fr: 'Je verse le plus fort dans les gens qui rendent le moins. Plus maintenant.',
        ar: 'أصبّ بأقصى قوة في الأشخاص الذين يردّون الأقل. ليس بعد الآن.',
        es: 'Vierto con más fuerza en la gente que menos devuelve. Ya no más.',
      },
    },
    {
      key: 'approval_seeker',
      title: { en: 'Seeking the Verdict', fr: 'En quête du verdict', ar: 'بحثًا عن الحكم', es: 'Buscando el veredicto' },
      body: {
        en: "The tender, honest read: you don't just want them — you need their approval to feel okay, and you've handed them a thermostat on your entire self-worth. A cool text drops your mood; a warm one restores you. This usually got wired somewhere love felt conditional, where being enough for someone was how you stayed safe — so this isn't a flaw, it's a survival strategy that outlived its use. But it quietly makes you a supplicant in your own love. The whole of this week points one way: worth generated inside you can't be revoked by a text. Start taking the controls back, one inch at a time.",
        fr: "La lecture tendre et honnête : tu ne le désires pas seulement — tu as besoin de son approbation pour te sentir bien, et tu lui as remis un thermostat sur toute ton estime de toi-même. Un texto froid fait chuter ton humeur ; un texto chaleureux te restaure. Ça s'est généralement câblé quelque part où l'amour semblait conditionnel, où être suffisant pour quelqu'un était ta façon de rester en sécurité — donc ce n'est pas un défaut, c'est une stratégie de survie qui a survécu à son utilité. Mais elle fait discrètement de toi un suppliant dans ton propre amour. Toute cette semaine pointe dans une direction : la valeur générée à l'intérieur de toi ne peut pas être révoquée par un texto. Commence à reprendre les commandes, centimètre par centimètre.",
        ar: 'القراءة الرقيقة والصادقة: أنت لا تريده فقط — أنت تحتاج موافقته لتشعر بأنك بخير، وقد منحته ترمومترًا على تقديرك الكامل لذاتك. رسالة باردة تُسقِط مزاجك؛ رسالة دافئة تعيدك. عادة ما يتشكّل هذا في مكان بدا فيه الحب مشروطًا، حيث كانت كفايتك لشخص ما هي طريقتك للبقاء آمنًا — لذا هذا ليس عيبًا، إنه استراتيجية بقاء تجاوزت فائدتها. لكنها تجعلك بهدوء متوسّلًا في حبك الخاص. هذا الأسبوع بأكمله يشير في اتجاه واحد: القيمة المُولَّدة بداخلك لا يمكن إلغاؤها برسالة واحدة. ابدأ باستعادة زمام التحكّم، سنتيمترًا بعد آخر.',
        es: 'La lectura tierna y honesta: no solo lo deseas —necesitas su aprobación para sentirte bien, y le has entregado un termostato sobre toda tu autoestima. Un mensaje frío hunde tu ánimo; uno cálido te restaura. Esto normalmente se cableó en algún lugar donde el amor se sintió condicional, donde ser suficiente para alguien era tu manera de mantenerte a salvo —así que esto no es un defecto, es una estrategia de supervivencia que sobrevivió a su utilidad. Pero te convierte silenciosamente en un suplicante en tu propio amor. Toda esta semana apunta en una dirección: el valor generado dentro de ti no puede ser revocado por un mensaje. Empieza a recuperar los controles, centímetro a centímetro.',
      },
      shareLine: {
        en: "I handed someone the thermostat on my worth. I'm taking it back.",
        fr: 'J\'ai remis à quelqu\'un le thermostat de ma valeur. Je le reprends.',
        ar: 'منحت أحدهم ترمومتر قيمتي. أنا أستعيده.',
        es: 'Le entregué a alguien el termostato de mi valor. Lo estoy recuperando.',
      },
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Balanced 7/7/7/7.
  answerOutcomes: {
    w06_q1: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q2: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q3: ['rooted_worth', 'over_giver', 'self_editor', 'approval_seeker'],
    w06_q4: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q5: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q6: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
    w06_q7: ['rooted_worth', 'self_editor', 'over_giver', 'approval_seeker'],
  },
};
