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
 *  - Push `w06Week` into WEEKS (src/data/weeks/index.ts), AFTER w05Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
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
