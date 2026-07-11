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
 *  - Append `w05Questions` to the daily-question pool (src/data/dailyQuestions.ts), after ...w04Questions.
 *  - Push `w05Week` into WEEKS (src/data/weeks/index.ts), AFTER w04Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { DailyQuestion } from '../dailyQuestions';
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

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w05Questions: DailyQuestion[] = [
  {
    id: 'w05_q1',
    text: {
      en: 'Compare this thing today to three months ago. What changed?',
      fr: "Compare cette chose aujourd'hui à il y a trois mois. Qu'est-ce qui a changé ?",
      ar: 'قارن هذا الشيء اليوم بما كان عليه قبل ثلاثة أشهر. ماذا تغيّر؟',
      es: 'Compara esta cosa hoy con hace tres meses. ¿Qué cambió?',
    },
    answers: [
      { label: { en: 'More defined, more woven into real life', fr: 'Plus défini, plus tissé dans la vraie vie', ar: 'أكثر تحديدًا، أكثر نسجًا في الحياة الحقيقية', es: 'Más definida, más entretejida en la vida real' }, insight: { en: "A thing that keeps deepening is a thing that's actually going somewhere.", fr: "Une chose qui continue de s'approfondir est une chose qui va réellement quelque part.", ar: 'الشيء الذي يستمر في التعمّق هو شيء يصل فعليًا إلى مكان ما.', es: 'Algo que sigue profundizándose es algo que realmente va hacia algún lado.' } },
      { label: { en: 'Exactly the same, just older', fr: 'Exactement pareil, juste plus vieux', ar: 'نفسه تمامًا، فقط أقدم', es: 'Exactamente igual, solo más vieja' }, insight: { en: "Same-but-older isn't a journey; it's a parking spot with a view.", fr: "Pareil-mais-plus-vieux n'est pas un voyage ; c'est une place de parking avec une vue.", ar: 'نفسه-لكن-أقدم ليست رحلة؛ إنها موقف سيارات بإطلالة.', es: 'Igual-pero-más-vieja no es un viaje; es un lugar de estacionamiento con vista.' } },
      { label: { en: 'They warm up whenever I start to leave, then it resets', fr: 'Il se réchauffe chaque fois que je commence à partir, puis ça se réinitialise', ar: 'يصبح دافئًا كلّما بدأت بالرحيل، ثم يُعاد الأمر لنقطة الصفر', es: 'Se pone cálido cada vez que empiezo a irme, luego se reinicia' }, insight: { en: 'Progress that only appears when you exit is a leash, not movement.', fr: "Un progrès qui n'apparaît que quand tu pars est une laisse, pas un mouvement.", ar: 'التقدّم الذي يظهر فقط حين ترحل هو مقود، لا حركة.', es: 'Un progreso que solo aparece cuando te vas es una correa, no movimiento.' } },
      { label: { en: "I'm more invested; they're exactly where they started", fr: "Je suis plus investi ; il en est exactement là où il a commencé", ar: 'أنا أكثر استثمارًا؛ وهو بالضبط في المكان الذي بدأ منه', es: 'Estoy más invertido; él está exactamente donde empezó' }, insight: { en: 'When only one side deepens, the other side already chose their level.', fr: "Quand un seul côté s'approfondit, l'autre a déjà choisi son niveau.", ar: 'حين يتعمّق جانب واحد فقط، يكون الجانب الآخر قد اختار مستواه بالفعل.', es: 'Cuando solo un lado se profundiza, el otro ya eligió su nivel.' } },
    ],
  },
  {
    id: 'w05_q2',
    text: {
      en: 'What happens when the word "us" comes near the conversation?',
      fr: 'Que se passe-t-il quand le mot « nous » s\'approche de la conversation ?',
      ar: 'ماذا يحدث حين تقترب كلمة "نحن" من المحادثة؟',
      es: '¿Qué pasa cuando la palabra «nosotros» se acerca a la conversación?',
    },
    answers: [
      { label: { en: 'We talk about it — nervously, but honestly', fr: 'On en parle — nerveusement, mais honnêtement', ar: 'نتحدث عن الأمر — بتوتر، لكن بصدق', es: 'Hablamos de ello — con nervios, pero con honestidad' }, insight: { en: 'Engaging the word, even scared, is someone moving toward you.', fr: 'S\'engager avec le mot, même effrayé, c\'est quelqu\'un qui se rapproche de toi.', ar: 'الانخراط في الكلمة، حتى بخوف، هو شخص يتحرّك نحوك.', es: 'Involucrarse con la palabra, aunque con miedo, es alguien acercándose a ti.' } },
      { label: { en: 'A smooth swerve — subject changed, every time', fr: 'Un virage fluide — sujet changé, à chaque fois', ar: 'انعطاف سلس — يتغيّر الموضوع، في كل مرة', es: 'Un giro suave — cambia de tema, cada vez' }, insight: { en: 'A practiced swerve around "us" is the un-naming defending itself.', fr: 'Un virage entraîné autour de « nous » est le non-nommage qui se défend.', ar: 'الانعطاف المُتقَن حول "نحن" هو عدم التسمية يدافع عن نفسه.', es: 'Un giro practicado alrededor de «nosotros» es el no-nombramiento defendiéndose.' } },
      { label: { en: '"Why do we need labels?" on schedule', fr: '« Pourquoi a-t-on besoin d\'étiquettes ? » à l\'heure pile', ar: '"لماذا نحتاج إلى تسميات؟" في موعدها بالضبط', es: '«¿Por qué necesitamos etiquetas?» puntual' }, insight: { en: 'The anti-label speech, right on cue, is a script — not a philosophy.', fr: "Le discours anti-étiquette, pile au bon moment, est un script — pas une philosophie.", ar: 'خطاب معاداة التسميات، في توقيته بالضبط، هو نصّ محفوظ — لا فلسفة.', es: 'El discurso anti-etiquetas, justo a tiempo, es un guion, no una filosofía.' } },
      { label: { en: '"Not yet" — with no reason it\'d ever become yes', fr: '« Pas encore » — sans raison que ça devienne un jour oui', ar: '"ليس بعد" — دون سبب يجعله يومًا يتحوّل إلى نعم', es: '«Todavía no» — sin razón para que algún día se vuelva sí' }, insight: { en: 'A "not yet" with no conditions is a no wearing softer clothes.', fr: '« Pas encore » sans conditions est un non habillé plus doucement.', ar: '"ليس بعد" دون شروط هو "لا" يرتدي ثيابًا أنعم.', es: 'Un «todavía no» sin condiciones es un no vestido con ropa más suave.' } },
    ],
  },
  {
    id: 'w05_q3',
    text: {
      en: 'Where do you exist in their world?',
      fr: 'Où existes-tu dans son monde ?',
      ar: 'أين توجد في عالمه؟',
      es: '¿Dónde existes en su mundo?',
    },
    answers: [
      { label: { en: 'Everywhere — friends, family, future plans', fr: "Partout — les amis, la famille, les projets d'avenir", ar: 'في كل مكان — الأصدقاء، العائلة، خطط المستقبل', es: 'En todas partes — amigos, familia, planes futuros' }, insight: { en: 'Being woven into the public life is being treated as real.', fr: 'Être tissé dans la vie publique, c\'est être traité comme réel.', ar: 'أن تُنسَج في الحياة العلنية هو أن تُعامَل كشيء حقيقي.', es: 'Estar entretejido en la vida pública es ser tratado como real.' } },
      { label: { en: "Nowhere new lately — we've plateaued where we started", fr: "Nulle part de nouveau dernièrement — on a plafonné là où on a commencé", ar: 'لا مكان جديد مؤخرًا — ثبتنا حيث بدأنا', es: 'En ningún lugar nuevo últimamente — nos estancamos donde empezamos' }, insight: { en: 'A private thing that stopped moving is parked, not building.', fr: 'Une chose privée qui a arrêté de bouger est garée, pas en construction.', ar: 'شيء خاص توقف عن الحركة هو متوقّف، لا يُبنى.', es: 'Algo privado que dejó de moverse está estacionado, no construyéndose.' } },
      { label: { en: 'Only in private — no posts, no people, no future tense', fr: 'Seulement en privé — pas de publications, pas de gens, pas de futur', ar: 'فقط في الخاص — لا منشورات، لا أشخاص، لا زمن مستقبل', es: 'Solo en privado — sin publicaciones, sin gente, sin tiempo futuro' }, insight: { en: 'Kept out of the public life is often kept as a placeholder.', fr: 'Être tenu à l\'écart de la vie publique, c\'est souvent être gardé comme bouche-trou.', ar: 'أن تُستبعَد من الحياة العلنية غالبًا يعني أنك محفوظ كبديل مؤقت.', es: 'Ser mantenido fuera de la vida pública a menudo es ser mantenido como relleno.' } },
      { label: { en: 'In the gaps — when their "better" option isn\'t around', fr: 'Dans les interstices — quand son option « meilleure » n\'est pas là', ar: 'في الفجوات — حين لا يكون خياره "الأفضل" موجودًا', es: 'En los huecos — cuando su opción «mejor» no está cerca' }, insight: { en: "Existing in someone's gaps is a circle that never closes.", fr: "Exister dans les interstices de quelqu'un est un cercle qui ne se referme jamais.", ar: 'أن توجد في فجوات أحدهم هو دائرة لا تُغلَق أبدًا.', es: 'Existir en los huecos de alguien es un círculo que nunca se cierra.' } },
    ],
  },
  {
    id: 'w05_q4',
    text: {
      en: 'How far ahead can the two of you actually plan?',
      fr: 'Jusqu\'où pouvez-vous réellement planifier tous les deux ?',
      ar: 'إلى أي مدى يمكنكما التخطيط فعليًا؟',
      es: '¿Hasta dónde pueden planear realmente ustedes dos?',
    },
    answers: [
      { label: { en: 'Real future — trips, milestones, next year', fr: "Un vrai avenir — voyages, étapes importantes, l'année prochaine", ar: 'مستقبل حقيقي — رحلات، محطات مهمة، العام القادم', es: 'Futuro real — viajes, hitos, el próximo año' }, insight: { en: 'A shared long horizon is a relationship in everything but paperwork.', fr: 'Un horizon partagé et long est une relation en tout sauf la paperasse.', ar: 'أفق مشترك طويل هو علاقة في كل شيء إلا الأوراق الرسمية.', es: 'Un horizonte compartido y largo es una relación en todo menos el papeleo.' } },
      { label: { en: 'Plans exist — but they cancel the moment something better calls', fr: "Des projets existent — mais ils s'annulent dès qu'une meilleure option appelle", ar: 'توجد خطط — لكنها تُلغى لحظة ظهور شيء أفضل', es: 'Existen planes — pero se cancelan en cuanto llama algo mejor' }, insight: { en: 'Plans that lose to a better offer show whose priority you are.', fr: "Des projets qui perdent face à une meilleure offre montrent de qui tu es la priorité.", ar: 'الخطط التي تخسر أمام عرض أفضل تُظهر لمن تكون أنت الأولوية.', es: 'Los planes que pierden frente a una oferta mejor muestran de quién eres la prioridad.' } },
      { label: { en: "This weekend, maybe. It's been that way for months.", fr: "Ce week-end, peut-être. Ça dure comme ça depuis des mois.", ar: 'ربما نهاية هذا الأسبوع. الأمر كذلك منذ أشهر.', es: 'Este fin de semana, tal vez. Ha sido así por meses.' }, insight: { en: 'A horizon frozen short for months is a thing parked, not moving.', fr: "Un horizon figé si court depuis des mois est une chose garée, pas en mouvement.", ar: 'أفق مجمَّد قصيرًا منذ أشهر هو شيء متوقّف، لا يتحرّك.', es: 'Un horizonte congelado y corto durante meses es algo estacionado, no en movimiento.' } },
      { label: { en: "We don't plan — I stay free in case they want me", fr: "On ne planifie pas — je reste libre au cas où il voudrait de moi", ar: 'لا نخطّط — أبقى متاحًا في حال أراد أن يراني', es: 'No planeamos — me quedo libre por si me quiere' }, insight: { en: 'Staying on standby for someone is the shape of holding a place.', fr: "Rester en attente pour quelqu'un, c'est la forme même du bouche-trou.", ar: 'البقاء في وضع الاستعداد لأجل أحدهم هو شكل حجز المكان.', es: 'Quedarse en espera por alguien es la forma que toma ser el relleno.' } },
    ],
  },
  {
    id: 'w05_q5',
    text: {
      en: 'When they give you a scrap of attention, how does it land?',
      fr: "Quand il te donne un fragment d'attention, comment ça te touche ?",
      ar: 'حين يمنحك فتاتًا من الانتباه، كيف يقع عليك؟',
      es: 'Cuando te da una pizca de atención, ¿cómo te llega?',
    },
    answers: [
      { label: { en: 'Like a normal part of something steady', fr: "Comme une partie normale de quelque chose de stable", ar: 'كجزء طبيعي من شيء ثابت', es: 'Como una parte normal de algo estable' }, insight: { en: "When contact feels ordinary, you're being fed, not managed.", fr: "Quand le contact semble ordinaire, tu es nourri, pas géré.", ar: 'حين يبدو التواصل عاديًا، فأنت تُطعَم، لا تُدار.', es: 'Cuando el contacto se siente ordinario, te están alimentando, no gestionando.' } },
      { label: { en: 'Warm and building — each one adds to the last', fr: 'Chaleureux et croissant — chacun s\'ajoute au précédent', ar: 'دافئ ومتراكم — كل واحد يضيف إلى ما قبله', es: 'Cálida y creciente — cada una se suma a la anterior' }, insight: { en: 'Attention that accumulates is a thing on its way up.', fr: 'Une attention qui s\'accumule est une chose en train de monter.', ar: 'الانتباه المتراكم هو شيء في طريقه للأعلى.', es: 'Una atención que se acumula es algo que va en ascenso.' } },
      { label: { en: "It arrives exactly when I'm about to give up", fr: "Elle arrive exactement quand je suis sur le point d'abandonner", ar: 'تصل تحديدًا حين أوشك على الاستسلام', es: 'Llega exactamente cuando estoy a punto de rendirme' }, insight: { en: 'Warmth timed to your exit is a breadcrumb, not a feeling.', fr: 'Une chaleur chronométrée sur ta sortie est une miette, pas un sentiment.', ar: 'الدفء المُوقَّت مع خروجك هو فتات، لا شعور.', es: 'Una calidez cronometrada con tu salida es una migaja, no un sentimiento.' } },
      { label: { en: 'Nice, then nothing — same flat line for months', fr: 'Agréable, puis rien — la même ligne plate depuis des mois', ar: 'لطيف، ثم لا شيء — نفس الخط الثابت منذ أشهر', es: 'Agradable, y luego nada — la misma línea plana durante meses' }, insight: { en: 'A warm moment that never shifts the pattern is a stall.', fr: 'Un moment chaleureux qui ne change jamais le schéma est une stagnation.', ar: 'لحظة دافئة لا تغيّر النمط أبدًا هي توقّف تام.', es: 'Un momento cálido que nunca cambia el patrón es un estancamiento.' } },
    ],
  },
  {
    id: 'w05_q6',
    text: {
      en: 'If you asked "what are we" tomorrow, what would honestly happen?',
      fr: 'Si tu demandais « qu\'est-ce qu\'on est » demain, que se passerait-il honnêtement ?',
      ar: 'إن سألت "ما نحن" غدًا، ماذا سيحدث بصدق؟',
      es: 'Si preguntaras «qué somos» mañana, ¿qué pasaría honestamente?',
    },
    answers: [
      { label: { en: "Relief and a yes — I think they've wanted to", fr: 'Du soulagement et un oui — je pense qu\'il en avait envie', ar: 'ارتياح ونعم — أظن أنه كان يريد ذلك', es: 'Alivio y un sí — creo que él lo ha querido' }, insight: { en: 'A partner who answers with relief was waiting for you to ask.', fr: 'Un partenaire qui répond avec soulagement attendait que tu demandes.', ar: 'الشريك الذي يجيب بارتياح كان ينتظر أن تسأل.', es: 'Una pareja que responde con alivio estaba esperando que preguntaras.' } },
      { label: { en: '"Why label it? We\'re good as we are" — and nothing shifts', fr: '« Pourquoi étiqueter ça ? On est bien comme ça » — et rien ne bouge', ar: '"لماذا نسمّيها؟ نحن بخير كما نحن" — ولا شيء يتغيّر', es: '«¿Para qué etiquetarlo? Estamos bien así» — y nada cambia' }, insight: { en: 'Choosing the label-free status quo keeps the thing parked by choice.', fr: 'Choisir le statu quo sans étiquette garde la chose garée, par choix.', ar: 'اختيار الوضع الراهن بلا تسمية يُبقي الشيء متوقّفًا، بالاختيار.', es: 'Elegir el estatus quo sin etiqueta mantiene la cosa estacionada, por elección.' } },
      { label: { en: 'Panic, deflection, maybe distance after', fr: 'De la panique, de l\'esquive, peut-être de la distance après', ar: 'ذعر، تملّص، ربما مسافة بعد ذلك', es: 'Pánico, evasión, quizás distancia después' }, insight: { en: 'Fleeing the question is answering it in the quietest voice.', fr: 'Fuir la question, c\'est y répondre de la voix la plus discrète.', ar: 'الهروب من السؤال هو الإجابة عليه بأهدأ صوت.', es: 'Huir de la pregunta es responderla con la voz más silenciosa.' } },
      { label: { en: '"Let\'s not ruin a good thing" — and nothing moves', fr: '« Ne gâchons pas une bonne chose » — et rien ne bouge', ar: '"لنتجنّب إفساد شيء جيد" — ولا شيء يتحرّك', es: '«No arruinemos algo bueno» — y nada se mueve' }, insight: { en: 'Guarding the gray against the question is choosing the parking spot.', fr: 'Protéger le gris contre la question, c\'est choisir la place de parking.', ar: 'حماية المنطقة الرمادية من السؤال هي اختيار موقف السيارات.', es: 'Proteger el gris de la pregunta es elegir el lugar de estacionamiento.' } },
    ],
  },
  {
    id: 'w05_q7',
    text: {
      en: 'Strip the hope out of it. What does your gut actually report?',
      fr: "Enlève l'espoir de l'équation. Que rapporte réellement ton instinct ?",
      ar: 'أزل الأمل من المعادلة. بماذا يبلّغك حدسك فعليًا؟',
      es: 'Quita la esperanza de la ecuación. ¿Qué reporta realmente tu instinto?',
    },
    answers: [
      { label: { en: "We're becoming real — I can feel it building", fr: 'On devient réel — je le sens se construire', ar: 'نصبح حقيقيَّين — أشعر بأن الأمر يُبنى', es: 'Nos estamos volviendo reales — puedo sentir que se construye' }, insight: { en: 'A gut that feels it building is usually counting real evidence.', fr: "Un instinct qui sent que ça se construit compte généralement de vraies preuves.", ar: 'الحدس الذي يشعر بالبناء يُحصي عادة أدلة حقيقية.', es: 'Un instinto que siente que se está construyendo suele estar contando evidencia real.' } },
      { label: { en: 'Stuck — lovely, but going in a circle', fr: 'Coincé — agréable, mais en train de tourner en rond', ar: 'عالق — جميل، لكنه يسير في دائرة', es: 'Atascado — bonito, pero dando vueltas en círculo' }, insight: { en: 'Naming the circle is the first step out of it.', fr: 'Nommer le cercle est le premier pas pour en sortir.', ar: 'تسمية الدائرة هي الخطوة الأولى للخروج منها.', es: 'Nombrar el círculo es el primer paso para salir de él.' } },
      { label: { en: "I'm the option, not the choice", fr: "Je suis l'option, pas le choix", ar: 'أنا الخيار الاحتياطي، لا الاختيار', es: 'Soy la opción, no la elección' }, insight: { en: 'Admitting you\'re the option takes courage — and ends the confusion.', fr: 'Admettre que tu es l\'option demande du courage — et met fin à la confusion.', ar: 'الاعتراف بأنك الخيار الاحتياطي يتطلّب شجاعة — وينهي الارتباك.', es: 'Admitir que eres la opción requiere valor — y termina con la confusión.' } },
      { label: { en: "I'm holding a place for someone who isn't me", fr: "Je tiens une place pour quelqu'un qui n'est pas moi", ar: 'أنا أحجز مكانًا لشخص ليس أنا', es: 'Estoy ocupando un lugar para alguien que no soy yo' }, insight: { en: 'Seeing the waiting room clearly is how you finally leave it.', fr: "Voir clairement la salle d'attente, c'est comme ça qu'on finit par la quitter.", ar: 'رؤية غرفة الانتظار بوضوح هي كيف تغادرها أخيرًا.', es: 'Ver la sala de espera con claridad es cómo finalmente la dejas.' } },
    ],
  },
];

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
