/**
 * AURAFY — WEEK 5 CONTENT  ·  "Situationships"  ·  category: love  ·  module: who_soulmate
 * Authored via the aurafy-week-generator skill. FR/AR/ES translated (translation session, batch W04-08).
 *
 * Measures: where is your undefined thing really headed?
 * 4 outcomes: becoming_real · stalled_limbo · youre_the_option · placeholder
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w05_a1 … w05_a7.
 *  - Append `w05Articles` to ARTICLES (src/content/articles/index.ts), after ...w04Articles.
 *  - Merge `w05ArticlesEn` into content.en.ts. FR/AR/ES bodies live in content.fr.ts / content.ar.ts /
 *    content.es.ts under the same ids.
 *  - Push `w05Week` into WEEKS (src/data/weeks/index.ts), AFTER w04Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { WeeklyTheme } from './types';

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w05Articles: Article[] = [
  { id: 'w05_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-03' },
  { id: 'w05_a2', category: 'love', readMinutes: 4, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-04' },
  { id: 'w05_a3', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-05' },
  { id: 'w05_a4', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-06' },
  { id: 'w05_a5', category: 'love', readMinutes: 4, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-07' },
  { id: 'w05_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-08' },
  { id: 'w05_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_soulmate', featured: true, publishedAt: '2026-08-09' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */
/* EN is source-of-truth — never edit. FR/AR/ES bodies for these ids live in
 * content.fr.ts / content.ar.ts / content.es.ts under the same keys. */

export const w05ArticlesEn: Record<string, ArticleContent> = {
  w05_a1: {
    title: 'The Situationship Decoder',
    subtitle: 'A relationship in everything but name — or in nothing but hope?',
    blocks: [
      { type: 'paragraph', text: "A situationship is what happens when two people act like a couple without agreeing to be one. There's intimacy, routine, sometimes months of history — and a strange, load-bearing silence around the word \"us.\" The confusion isn't a flaw in you. It's the whole design: an undefined thing can't disappoint you the way a defined one can, which is exactly why some people prefer to leave it undefined." },
      { type: 'heading', text: 'The two kinds of undefined' },
      { type: 'paragraph', text: "There's the situationship that's undefined because it's EARLY — two people genuinely still finding out, moving toward something, just not there yet. And there's the situationship that's undefined because staying undefined is the point — one or both people getting relationship benefits while dodging relationship risk. From inside, on any given Tuesday, they can feel identical. The difference only shows up over time, in direction." },
      { type: 'paragraph', text: 'So this week doesn\'t ask "are we official?" It asks a better question: which way is this thing MOVING? Toward more definition, more integration, more future — or in a comfortable circle that never gets anywhere? By Friday you\'ll be able to tell the two apart, which is the one thing a situationship is built to keep you from doing.' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Ambiguity itself lowers perceived risk and accountability — which is why relationship stage matters less than trajectory. Direction over time is the reliable signal an undefined status is designed to obscure.' },
    ],
  },
  w05_a2: {
    title: 'Almost-Relationships and the Art of Not Naming Things',
    subtitle: 'Why the word "us" gets so carefully avoided',
    blocks: [
      { type: 'paragraph', text: "Naming a thing makes it real. That's not just poetry — it's why some people go to remarkable lengths to avoid the naming. Once you call it a relationship, expectations attach: exclusivity, effort, the right to be disappointed. Some people avoid the word not because they're unsure of their feelings, but because they're very sure they don't want the obligations the word brings." },
      { type: 'paragraph', text: 'Watch how the un-naming is maintained. The subtle swerve when a conversation drifts toward "what are we." The introductions that stay vague — "this is [name]," never a title. The way plans exist but only ever short-range. None of it is accidental. Each swerve is a small act of keeping the door propped open, keeping options unclosed, keeping you present but unpromised.' },
      { type: 'quote', text: 'A thing that refuses to be named is often telling you its name by refusing.', attribution: 'On the un-naming' },
      { type: 'paragraph', text: "One fairness clause: early on, some people avoid labels out of genuine care — they don't want to rush a good thing into a premature box. The tell is whether the avoidance RESOLVES. Healthy label-caution has a horizon; it eases as trust builds. Strategic un-naming never resolves, because resolution was never the goal." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Defining a relationship activates commitment norms and accountability. Persistent, active avoidance of definition — versus early, resolving caution — is a documented marker of low commitment intent.' },
    ],
  },
  w05_a3: {
    title: 'Why "We\'re Just Seeing Where It Goes" Usually Goes Nowhere',
    subtitle: 'The most comfortable sentence in modern dating',
    blocks: [
      { type: 'paragraph', text: '"Let\'s just see where it goes" sounds open, relaxed, wise even — why force it? But listen to the grammar. It puts the relationship in the passive voice, as if it were weather that might happen TO you both rather than something two people steer. And things left to "see where they go" have a strong tendency to go exactly where they already are.' },
      { type: 'heading', text: 'Drift is not a direction' },
      { type: 'paragraph', text: '"Relationships that deepen do so because someone chooses to deepen them — makes the plan, has the talk, takes the small risk of wanting out loud. "Seeing where it goes" is often a polite way of declining to make those choices while still enjoying the results. It\'s not neutral. It\'s a decision to not-decide, dressed up as easygoingness.' },
      { type: 'paragraph', text: 'Here\'s the test that cuts through it: has it actually gone anywhere? Compare the thing today to the thing three months ago. More defined, more woven into each other\'s real lives, more future in the conversation? Then it\'s genuinely going somewhere. Exactly the same, just older? Then "seeing where it goes" was never a journey — it was a parking spot with a nice view.' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Relationship escalation is driven by deliberate investment behaviors, not passive time. Without active deepening, connections tend to plateau at their current level — "drift" reliably preserves the status quo rather than advancing it.' },
    ],
  },
  w05_a4: {
    title: 'The Cost of Staying Undefined',
    subtitle: 'The bill for the comfortable gray comes due — quietly',
    blocks: [
      { type: 'paragraph', text: "Situationships feel low-cost because the biggest expenses are hidden. There's no breakup to survive, no title to defend — so it seems like you're getting connection at a discount. But the real price is charged elsewhere, in a currency you don't notice leaving your account until a lot of it is gone: time, opportunity, and self-trust." },
      { type: 'heading', text: 'What you actually pay' },
      { type: 'orderedList', items: [
        { title: 'Time', text: 'Months, sometimes years, of prime emotional energy poured into something structurally incapable of growing. That time doesn\'t come back.' },
        { title: 'Opportunity', text: 'The people you didn\'t meet, didn\'t let in, because you were emotionally occupied by an almost. Availability spent isn\'t availability saved.' },
        { title: 'Self-trust', text: 'The slow erosion of knowing your own worth, because you kept accepting less than you wanted and calling it chill. That one costs the most to rebuild.' },
      ] },
      { type: 'paragraph', text: "The undefined thing markets itself as freedom — no strings, no pressure. But look closely and it's often the least free arrangement of all: you're attached, you're unavailable to others, and you're getting none of the security that's supposed to come with attachment. That's not freedom. That's paying full emotional price for a partial emotional product." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Prolonged ambiguous relationships are consistently linked to lower wellbeing and higher distress than either clear commitment or clear singleness — the uncertainty itself, and the opportunity cost it hides, are the mechanism.' },
    ],
  },
  w05_a5: {
    title: 'Breadcrumbs: Recognizing the Bare Minimum',
    subtitle: 'When just enough is engineered to keep you there',
    blocks: [
      { type: 'paragraph', text: 'Breadcrumbing is the art of giving someone just enough to stay, and never enough to arrive. A text right when you\'re about to give up. A burst of warmth that resets the clock. Enough contact to keep hope alive, calibrated — consciously or not — to never cross into actual commitment. If you\'ve ever felt starved inside something that technically "exists," you\'ve eaten breadcrumbs.' },
      { type: 'heading', text: 'The pattern of the crumb' },
      { type: 'paragraph', text: "The signature is timing. Breadcrumbs arrive not when you're happy and secure, but precisely when you're pulling away. The system has a sensor for your exit, and it deploys just enough warmth to reel you back to the same starving spot. Notice: after the crumb, does anything actually change? Or do you get one good day and then slide right back to the drought? A real connection feeds you. A breadcrumb operation manages you." },
      { type: 'paragraph', text: "The cruelest part is what it does to your calibration. Starve a person long enough and a crumb feels like a feast — you become grateful for scraps you'd have been insulted by at the start. If you're celebrating a text back like it's a milestone, step back and ask what the milestone actually was. The bare minimum should never feel like a gift." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Intermittent minimal reinforcement — small rewards timed to prevent exit — produces strong, persistent attachment while suppressing escalation. The crumb\'s timing around your withdrawal is its diagnostic fingerprint.' },
    ],
  },
  w05_a6: {
    title: "When You're a Placeholder and Don't Know It",
    subtitle: 'The role you were cast in without an audition',
    blocks: [
      { type: 'paragraph', text: 'Some situationships aren\'t undefined because someone is scared or slow. They\'re undefined because you\'re holding a place — keeping someone company, meeting their needs, filling the gap — until the person they\'re actually waiting for arrives, or until something "better" does. The hard part is that placeholders are often treated warmly. Warmth is what keeps the placeholder in place.' },
      { type: 'heading', text: "The signs you're holding a seat" },
      { type: 'paragraph', text: 'You exist in their private life but not their public one — no friends, no family, no posts, no future tense. Plans are always short-horizon; anything past a few weeks gets vague. There\'s an ex who\'s never quite closed, or a "someday when things are different." And when you push toward more, the answer is never no — it\'s "not yet," a not-yet with no conditions that would ever turn it into a yes. You\'re not being rejected. You\'re being reserved.' },
      { type: 'paragraph', text: "This is painful precisely because the feelings can be real on their side — placeholders often get genuine affection. But affection isn't the question. The question is whether you're the destination or the waiting room. And a waiting room, however comfortable, is a place people intend to leave." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Being kept as a low-investment "backup" while a partner retains higher-value options is documented in research on relationship alternatives. Public exclusion plus perpetual "not yet" is the behavioral signature.' },
    ],
  },
  w05_a7: {
    title: 'How to Define the Thing Without Ending It',
    subtitle: 'The conversation you\'ve been avoiding is the one that frees you',
    blocks: [
      { type: 'paragraph', text: "The great fear that keeps situationships alive: if I ask what this is, I'll ruin it. So you don't ask, and the not-asking becomes its own slow ruin. Here's the reframe — the define-the-relationship conversation doesn't end good things. It ends UNCERTAIN things, which is a mercy either way: you either gain a real relationship or you stop pouring yourself into a mirage." },
      { type: 'heading', text: 'How to have it cleanly' },
      { type: 'paragraph', text: '"No ultimatum, no ambush, no three-page text. Pick a calm moment and speak from your own side: "I\'ve really liked this, and I\'ve realized I want something with a bit more clarity. I\'m not trying to trap you — I just want to know if we\'re moving toward the same thing." Then hold the silence and let them answer. The exact words matter less than the discipline that follows: you have to actually LISTEN to the answer, including the ones you don\'t want.' },
      { type: 'paragraph', text: 'Because here is the last decode of the week: a person who wants you answers that question with relief. Clarity costs them nothing — they were hoping you\'d ask. A person who dodges it, jokes past it, or makes you feel dramatic for asking has also answered. "I don\'t know" IS an answer. Vagueness in response to a direct, kind question is the gray choosing itself — and now you finally know that, which means you\'re free.' },
      { type: 'quote', text: "The talk doesn't kill real things. It only kills the ones that were never alive.", attribution: 'On defining it' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Direct definition conversations resolve uncertainty far more reliably than continued signal-reading, and the response to a calm, non-coercive bid for clarity is itself one of the strongest available indicators of commitment.' },
    ],
  },
};

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w05Week: WeeklyTheme = {
  id: 'w05_situationships',
  title: {
    en: 'Situationships',
    fr: 'Relations floues',
    ar: 'علاقات غامضة',
    es: 'Relaciones difusas',
  },
  category: 'love',
  resultPrompt: {
    en: 'Where is your undefined thing really headed?',
    fr: "Où va vraiment cette chose non définie ?",
    ar: 'إلى أين تتّجه فعليًا علاقتك غير المحدَّدة؟',
    es: '¿Hacia dónde va realmente esa cosa indefinida?',
  },
  days: [
    { articleId: 'w05_a1', questionId: 'w05_q1' },
    { articleId: 'w05_a2', questionId: 'w05_q2' },
    { articleId: 'w05_a3', questionId: 'w05_q3' },
    { articleId: 'w05_a4', questionId: 'w05_q4' },
    { articleId: 'w05_a5', questionId: 'w05_q5' },
    { articleId: 'w05_a6', questionId: 'w05_q6' },
    { articleId: 'w05_a7', questionId: 'w05_q7' },
  ],
  outcomes: [
    {
      key: 'becoming_real',
      title: { en: 'Actually Becoming Something', fr: 'En train de devenir quelque chose', ar: 'يتحوّل فعليًا إلى شيء', es: 'Realmente convirtiéndose en algo' },
      body: {
        en: "Good news, and you've earned the confidence to trust it: this one is moving. It's more defined than it was, more woven into real life, and the future tense keeps showing up in the conversation. The lack of a label here reads like early caution, not strategy — the kind that resolves as trust builds. Stop bracing for a trapdoor. And if you want to name it out loud, you'll likely find they were waiting for you to.",
        fr: "Bonne nouvelle, et tu as gagné la confiance nécessaire pour t'y fier : celle-ci avance. Elle est plus définie qu'avant, plus tissée dans la vraie vie, et le futur continue d'apparaître dans la conversation. L'absence d'étiquette ici se lit comme une prudence précoce, pas une stratégie — le genre qui se résout à mesure que la confiance se construit. Arrête de te préparer à une trappe. Et si tu veux le nommer à voix haute, tu découvriras probablement qu'il attendait que tu le fasses.",
        ar: 'خبر جيد، وقد كسبت الثقة اللازمة لتثق به: هذا الشيء يتحرّك. إنه أكثر تحديدًا مما كان، أكثر نسجًا في الحياة الحقيقية، وزمن المستقبل يستمر في الظهور في المحادثة. غياب التسمية هنا يُقرأ كحذر مبكر، لا كاستراتيجية — النوع الذي يُحسَم مع بناء الثقة. توقف عن الاستعداد لبوابة مصيدة. وإن أردت أن تسمّيه بصوت عالٍ، ستكتشف على الأرجح أنه كان ينتظر منك أن تفعل.',
        es: 'Buenas noticias, y te has ganado la confianza para creerlo: esto se está moviendo. Es más definido de lo que era, más entretejido en la vida real, y el tiempo futuro sigue apareciendo en la conversación. La falta de etiqueta aquí se lee como cautela temprana, no estrategia —del tipo que se resuelve a medida que se construye la confianza. Deja de prepararte para una trampilla. Y si quieres nombrarlo en voz alta, probablemente descubrirás que estaba esperando que lo hicieras.',
      },
      shareLine: {
        en: 'Not every undefined thing is a dead end. Some are just early.',
        fr: "Tout ce qui est non défini n'est pas une impasse. Certaines choses sont juste précoces.",
        ar: 'ليس كل شيء غير محدَّد طريقًا مسدودًا. بعضها فقط مبكر.',
        es: 'No todo lo indefinido es un callejón sin salida. Algunas cosas solo son tempranas.',
      },
    },
    {
      key: 'stalled_limbo',
      title: { en: 'Stuck in the Comfortable Gray', fr: 'Coincé dans le gris confortable', ar: 'عالق في المنطقة الرمادية المريحة', es: 'Atascado en el gris cómodo' },
      body: {
        en: 'Here\'s the honest read: it\'s real, it\'s warm, and it hasn\'t moved in months. Same shape, just older — a parking spot with a nice view. "Seeing where it goes" was never a journey here; it was a decision to not-decide. The gray is comfortable precisely because it costs them nothing and costs you time you keep not counting. One calm, direct "what are we" won\'t ruin it — it\'ll finally reveal whether there\'s anything to ruin.',
        fr: "Voici la lecture honnête : c'est réel, c'est chaleureux, et ça n'a pas bougé depuis des mois. Même forme, juste plus vieille — une place de parking avec une belle vue. « Voir où ça va » n'a jamais été un voyage ici ; c'était une décision de ne-pas-décider. Le gris est confortable précisément parce qu'il ne coûte rien à l'autre et te coûte un temps que tu continues de ne pas compter. Un « qu'est-ce qu'on est » calme et direct ne va pas le gâcher — il va enfin révéler s'il y a quelque chose à gâcher.",
        ar: 'إليك القراءة الصادقة: إنه حقيقي، إنه دافئ، ولم يتحرّك منذ أشهر. الشكل نفسه، فقط أقدم — موقف سيارات بإطلالة جميلة. "رؤية إلى أين يصل" لم تكن رحلة هنا قط؛ كانت قرارًا بعدم القرار. المنطقة الرمادية مريحة تحديدًا لأنها لا تكلّفه شيئًا وتكلّفك وقتًا تستمر في عدم إحصائه. سؤال هادئ ومباشر "ما نحن" لن يفسد الأمر — بل سيكشف أخيرًا ما إذا كان هناك أي شيء ليُفسَد.',
        es: 'Aquí está la lectura honesta: es real, es cálido, y no se ha movido en meses. La misma forma, solo más vieja —un lugar de estacionamiento con una linda vista. «Ver hacia dónde va» nunca fue un viaje aquí; fue una decisión de no-decidir. El gris es cómodo precisamente porque no le cuesta nada a él y te cuesta a ti tiempo que sigues sin contar. Un «qué somos» calmado y directo no lo arruinará —finalmente revelará si hay algo que arruinar.',
      },
      shareLine: {
        en: 'Drift is not a direction. A parking spot is not a journey.',
        fr: "La dérive n'est pas une direction. Une place de parking n'est pas un voyage.",
        ar: 'الانجراف ليس اتجاهًا. موقف السيارات ليس رحلة.',
        es: 'La deriva no es una dirección. Un lugar de estacionamiento no es un viaje.',
      },
    },
    {
      key: 'youre_the_option',
      title: { en: "You're the Option, Not the Choice", fr: "Tu es l'option, pas le choix", ar: 'أنت الخيار الاحتياطي، لا الاختيار', es: 'Eres la opción, no la elección' },
      body: {
        en: "This stings, so take it gently but take it: you're being fed just enough to stay and never enough to arrive. The warmth arrives right as you're leaving, resets the clock, and then it's back to the drought. That's not a connection with bad timing — it's a pattern with a sensor for your exit. You've been getting so little that scraps started to feel like milestones. They don't get to keep you starving and call it chill. You're allowed to want a full plate.",
        fr: "Ça pique, alors prends-le avec douceur mais prends-le : on te donne juste assez pour rester et jamais assez pour arriver. La chaleur arrive juste quand tu pars, remet le compteur à zéro, puis c'est retour à la sécheresse. Ce n'est pas une connexion avec un mauvais timing — c'est un schéma doté d'un capteur pour ta sortie. Tu recevais si peu que des restes ont commencé à ressembler à des étapes importantes. Il n'a pas le droit de te laisser affamé et d'appeler ça de la décontraction. Tu as le droit de vouloir une assiette pleine.",
        ar: 'هذا يؤلم، فتقبّله بلطف لكن تقبّله: يُمنَح لك القدر الكافي فقط لتبقى ولا القدر الكافي أبدًا لتصل. الدفء يصل تحديدًا حين ترحل، يعيد ضبط الساعة، ثم يعود الجفاف. هذا ليس اتصالًا بتوقيت سيئ — إنه نمط لديه مستشعر لخروجك. كنت تحصل على القليل جدًا لدرجة أن الفتات بدأت تبدو كإنجازات. لا يحقّ له أن يبقيك جائعًا ويسمّي ذلك هدوءًا. يحقّ لك أن تريد طبقًا كاملًا.',
        es: 'Esto duele, así que tómalo con suavidad pero tómalo: te están alimentando lo justo para quedarte y nunca lo suficiente para llegar. La calidez llega justo cuando te vas, reinicia el reloj, y luego vuelve la sequía. Eso no es una conexión con mal momento —es un patrón con un sensor para tu salida. Has estado recibiendo tan poco que las sobras empezaron a sentirse como hitos. Él no tiene derecho a mantenerte hambriento y llamarlo estar relajado. Tienes permiso para querer un plato lleno.',
      },
      shareLine: {
        en: 'The bare minimum should never feel like a gift.',
        fr: 'Le strict minimum ne devrait jamais ressembler à un cadeau.',
        ar: 'الحدّ الأدنى يجب ألا يبدو أبدًا كهدية.',
        es: 'El mínimo indispensable nunca debería sentirse como un regalo.',
      },
    },
    {
      key: 'placeholder',
      title: { en: "You're Holding a Place", fr: 'Tu occupes une place', ar: 'أنت تحجز مكانًا', es: 'Estás ocupando un lugar' },
      body: {
        en: 'The hardest verdict of the week, said with care: you\'re keeping a seat warm for someone who isn\'t you. You live in their private life but never the public one; every plan is short-range; the answer to "more" is a "not yet" with no conditions that could ever turn into yes. The affection may be genuine — placeholders often get real warmth. But warmth isn\'t the question. A waiting room is a place people intend to leave, and you deserve to be the destination, not the wait.',
        fr: "Le verdict le plus difficile de la semaine, dit avec attention : tu gardes une place au chaud pour quelqu'un qui n'est pas toi. Tu vis dans sa vie privée mais jamais dans sa vie publique ; chaque projet est à court terme ; la réponse à « plus » est un « pas encore » sans aucune condition qui pourrait un jour se transformer en oui. L'affection peut être sincère — les bouche-trous reçoivent souvent une vraie chaleur. Mais la chaleur n'est pas la question. Une salle d'attente est un endroit que les gens ont l'intention de quitter, et tu mérites d'être la destination, pas l'attente.",
        ar: 'أصعب حكم هذا الأسبوع، يُقال باهتمام: أنت تُبقي مقعدًا دافئًا لشخص ليس أنت. تعيش في حياته الخاصة لكن أبدًا في حياته العلنية؛ كل خطة قصيرة المدى؛ الإجابة على "المزيد" هي "ليس بعد" دون أي شروط قد تتحوّل يومًا إلى نعم. قد تكون المودة صادقة — البدلاء المؤقتون غالبًا ما يحصلون على دفء حقيقي. لكن الدفء ليس السؤال. غرفة الانتظار مكان ينوي الناس مغادرته، وأنت تستحق أن تكون الوجهة، لا الانتظار.',
        es: 'El veredicto más difícil de la semana, dicho con cuidado: estás manteniendo caliente un asiento para alguien que no eres tú. Vives en su vida privada pero nunca en la pública; cada plan es a corto plazo; la respuesta a «más» es un «todavía no» sin ninguna condición que algún día pudiera convertirse en sí. El afecto puede ser genuino —los rellenos a menudo reciben calidez real. Pero la calidez no es la pregunta. Una sala de espera es un lugar que la gente tiene intención de dejar, y mereces ser el destino, no la espera.',
      },
      shareLine: {
        en: "A waiting room is comfortable. It's still a place people leave.",
        fr: "Une salle d'attente est confortable. Ça reste un endroit que les gens quittent.",
        ar: 'غرفة الانتظار مريحة. لكنها تبقى مكانًا يغادره الناس.',
        es: 'Una sala de espera es cómoda. Sigue siendo un lugar que la gente deja.',
      },
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned to each question's answers. Order rotated per question.
  answerOutcomes: {
    w05_q1: ['becoming_real', 'stalled_limbo', 'youre_the_option', 'placeholder'],
    w05_q2: ['becoming_real', 'stalled_limbo', 'youre_the_option', 'placeholder'],
    w05_q3: ['becoming_real', 'stalled_limbo', 'placeholder', 'youre_the_option'],
    w05_q4: ['becoming_real', 'youre_the_option', 'stalled_limbo', 'placeholder'],
    w05_q5: ['stalled_limbo', 'becoming_real', 'youre_the_option', 'placeholder'],
    w05_q6: ['becoming_real', 'stalled_limbo', 'youre_the_option', 'placeholder'],
    w05_q7: ['becoming_real', 'stalled_limbo', 'youre_the_option', 'placeholder'],
  },
};
