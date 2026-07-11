/**
 * AURAFY — WEEK 8 CONTENT  ·  "The Chase"  ·  category: love  ·  module: who_loves_me
 * Authored via the aurafy-week-generator skill. FR/AR/ES translated (translation session, batch W04-08).
 *
 * Measures: your role in pursuit-and-withdrawal patterns.
 * 4 outcomes: the_pursuer · the_distancer · addicted_chase · balanced_dance
 *
 * INTEGRATION (Claude Code):
 *  - All 7 articles are NEW: w08_a1 … w08_a7.
 *  - Append `w08Articles` to ARTICLES (src/content/articles/index.ts), after ...w07Articles.
 *  - Merge `w08ArticlesEn` into content.en.ts. FR/AR/ES bodies live in content.fr.ts / content.ar.ts /
 *    content.es.ts under the same ids.
 *  - Append `w08Questions` to the daily-question pool (src/data/dailyQuestions.ts), after ...w07Questions.
 *  - Push `w08Week` into WEEKS (src/data/weeks/index.ts), AFTER w07Week, and run validateWeek().
 */

import type { Article, ArticleContent } from '../../content/articles';
import type { DailyQuestion } from '../dailyQuestions';
import type { WeeklyTheme } from './types';

/* ───────────────────────── ARTICLES (metadata) — Days 1–7 ───────────────────────── */

export const w08Articles: Article[] = [
  { id: 'w08_a1', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-24' },
  { id: 'w08_a2', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-25' },
  { id: 'w08_a3', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-26' },
  { id: 'w08_a4', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-27' },
  { id: 'w08_a5', category: 'love', readMinutes: 4, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-28' },
  { id: 'w08_a6', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-29' },
  { id: 'w08_a7', category: 'love', readMinutes: 5, relatedModuleId: 'who_loves_me', featured: true, publishedAt: '2026-08-30' },
];

/* ───────────────────────── ARTICLE BODIES (EN) — Days 1–7 ───────────────────────── */
/* EN is source-of-truth — never edit. FR/AR/ES bodies for these ids live in
 * content.fr.ts / content.ar.ts / content.es.ts under the same keys. */

export const w08ArticlesEn: Record<string, ArticleContent> = {
  w08_a1: {
    title: 'The Psychology of the Chase',
    subtitle: 'Why the pursuit can feel better than the person',
    blocks: [
      { type: 'paragraph', text: "The chase has a logic older than dating apps: pursuit generates a specific, addictive high that steady affection doesn't. When someone is just out of reach, your whole system organizes around closing the gap — focused, alive, a little obsessed. It feels like love, and often it is partly love. But some of what you're feeling isn't about them at all. It's about the gap." },
      { type: 'heading', text: 'The gap is the drug' },
      { type: 'paragraph', text: "Desire feeds on distance. The uncertainty of not-quite-having someone keeps the wanting system firing at full volume, because that system evolved to intensify effort exactly when a reward is close but unsecured. Close the gap — get the person, secure the affection — and the very chemistry that felt like passion quiets down. This is why some people feel wild longing during the chase and a strange flatness the moment they've won." },
      { type: 'paragraph', text: "This week is a mirror, not a lecture. It's not asking who's chasing whom in the abstract — it's asking about YOUR role. Are you the one pursuing? The one creating the distance others chase? Hooked on the chase itself more than any particular person? Or in something rarer, where nobody's running? Knowing your pattern is how you stop repeating it by accident." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'The wanting system intensifies with uncertainty and proximity-to-unsecured-reward, then quiets on attainment. This is why pursuit can feel more activating than the secured relationship — the arousal was partly about the gap, not only the person.' },
    ],
  },
  w08_a2: {
    title: 'Why We Want What Runs From Us',
    subtitle: 'The unavailable are not more valuable — they only feel it',
    blocks: [
      { type: 'paragraph', text: "It's almost embarrassing how reliably it works: the person who wants you plainly becomes slightly less interesting, and the person who keeps you guessing becomes magnetic. This isn't a flaw in your taste. It's a set of predictable biases the mind runs, and naming them takes away most of their power." },
      { type: 'heading', text: 'Three reasons distance dazzles' },
      { type: 'orderedList', items: [
        { title: 'Scarcity', text: "We assign more value to what's hard to get. Availability reads as abundance, and abundance reads — wrongly — as low worth. The unavailable person borrows prestige purely from being unavailable." },
        { title: 'The projection screen', text: "Someone who reveals little becomes a blank canvas you paint your ideal onto. You're not in love with them; you're in love with the version of them you got to invent in the gaps." },
        { title: 'The challenge', text: "Winning the reluctant one promises a hit of validation the willing one can't. It stops being about connection and becomes about proof." },
      ] },
      { type: 'paragraph', text: "See the pattern clearly and the spell weakens. The next time someone's distance makes them feel precious, ask the deflating, clarifying question: do I actually like this person — their mind, their kindness, their presence — or do I just like that they're hard to catch? The answers are different, and only one of them is worth chasing." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Scarcity bias, idealized projection onto ambiguous targets, and validation-seeking all inflate the appeal of unavailable people. The perceived value comes from the unavailability itself, not from the person.' },
    ],
  },
  w08_a3: {
    title: 'The Pursuer and the Distancer: A Dance With Steps',
    subtitle: 'The most common pattern in struggling relationships',
    blocks: [
      { type: 'paragraph', text: "Watch enough relationships and one choreography appears again and again: one person pursues — seeks closeness, reassurance, more — and the other distances — pulls back, needs space, goes quiet. The heartbreaking part is that each one's move triggers the other's. The more one chases, the more the other retreats; the more one retreats, the more the other chases. It's a loop that feeds itself." },
      { type: 'heading', text: 'Why the dance locks in' },
      { type: 'paragraph', text: "The pursuer's chasing comes from a real fear of abandonment — closeness soothes them. The distancer's retreating comes from a real fear of engulfment — space soothes them. So they're both trying to feel safe, using opposite strategies, and each strategy is the other's nightmare. The pursuer's reach reads as pressure to the distancer; the distancer's pullback reads as abandonment to the pursuer. Nobody's a villain. Everybody's scared." },
      { type: 'paragraph', text: "The crucial insight: the roles aren't fixed personalities — they're positions in a system, and the dance intensifies both. A person who's secure with one partner can become a desperate pursuer with an extreme distancer, and vice versa. Which means the way out isn't finding your 'true' role; it's noticing the step you keep taking and choosing, just once, to stop taking it — because a dance needs both dancers to continue." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: "The pursue-withdraw (or demand-withdraw) pattern is one of the most robustly documented dynamics in relationship research, and it is self-reinforcing: each partner's coping behavior triggers the other's. The roles are positions in a system, not fixed traits." },
    ],
  },
  w08_a4: {
    title: 'When Wanting Becomes Winning',
    subtitle: 'The moment love turns into a competition',
    blocks: [
      { type: 'paragraph', text: "There's a line the chase can quietly cross, where it stops being about wanting someone and starts being about winning them. The shift is subtle but total. Wanting is about them — their presence, their warmth, a future together. Winning is about you — your pride, your validation, the unbearable thought of not getting what you set out to get. Same pursuit on the outside; opposite engine underneath." },
      { type: 'heading', text: "How to tell which one you're in" },
      { type: 'paragraph', text: "The test is what happens when you imagine actually getting them. If the fantasy is full of THEM — ordinary days, real closeness, who they are — that's wanting. If the fantasy is mostly the moment of victory, the relief of having won, the proving of something to yourself or others — and it goes strangely blank after that moment — that's winning. Winning fantasies are always about the finish line, because for the competitor the person was never the prize. Being right was." },
      { type: 'paragraph', text: "This matters because winning-driven pursuit is a trap even when it succeeds. Win someone you didn't actually want, and you're now holding a prize that stopped mattering the instant it was secured — which is how people end up leaving relationships they fought desperately to get into. The chase was never about the person. It was about not losing. And you can't build a life on a victory." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'When pursuit is driven by ego and validation rather than genuine desire, attainment collapses the motivation — the "reward" was winning, not the relationship. This predicts the well-documented pattern of losing interest immediately after securing a hard-won partner.' },
    ],
  },
  w08_a5: {
    title: 'The Thrill of the Unavailable',
    subtitle: 'Why safe love can feel like no love at all',
    blocks: [
      { type: 'paragraph', text: "If you've only ever felt intense attraction toward unavailable people — the taken, the distant, the ones who can't fully show up — there's a pattern worth looking at honestly. It's not that you have bad luck. It's that unavailability has become a requirement for your desire to switch on, and available people feel, confusingly, like nothing." },
      { type: 'heading', text: 'Why the unavailable feel safe to want' },
      { type: 'paragraph', text: "Here's the hidden logic: wanting someone who can't fully have you back is actually the SAFEST kind of wanting. You get all the intensity of longing with none of the risk of real intimacy, because real intimacy can't happen — they're unavailable, so you're protected from ever being truly seen, truly close, truly exposed to being hurt at close range. The unavailability isn't a bug in your attraction. For a part of you, it's the entire appeal." },
      { type: 'paragraph', text: "This is why available love can feel flat or even suffocating to someone with this pattern — the absence of the chase removes the very thing that was generating the feeling, and the presence of real closeness triggers the fear the chase was protecting against. If someone steady leaves you cold, the question isn't 'where's the spark?' It's 'am I only able to feel safe wanting people who can't come close?' That's a different question, with a much more hopeful answer." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Chronic attraction to unavailable partners often functions as intimacy avoidance: longing without real exposure. The "thrill" is partly the safety of a connection that cannot actually reach you — which is why available closeness can register as flat or threatening.' },
    ],
  },
  w08_a6: {
    title: 'How to Stop Chasing and Start Attracting',
    subtitle: 'The shift from pursuit to presence',
    blocks: [
      { type: 'paragraph', text: "The advice to 'stop chasing' is everywhere and almost useless, because it's usually delivered as a manipulation tactic — pull back to make them want you, play the game better. That's just chasing in disguise, with the same anxious engine. Real attraction comes from something the tactics can't fake: actually having a life you're not willing to abandon for a maybe." },
      { type: 'heading', text: 'Attraction is a byproduct, not a strategy' },
      { type: 'paragraph', text: "Chasing broadcasts a message underneath the words: your attention is worth more than mine, so I'll pour mine at you and hope. It's not the effort that repels — effort is beautiful when it's mutual — it's the imbalance, the self-abandonment, the visible willingness to accept less. Presence broadcasts the opposite: I'm genuinely interested AND my life is full and good without you, so this is an invitation, not a plea. That's not a trick to withhold warmth. It's the natural result of having a center of gravity that isn't them." },
      { type: 'paragraph', text: "So the real move isn't 'text back slower.' It's 'build a life so engaging that waiting by the phone stops being an option you'd even want.' Pour the pursuit-energy back into your work, your friends, your body, the things that were yours before this person and will be yours after. Attraction follows fullness. And the beautiful side effect: even if this particular person doesn't turn around, you end up with a life instead of a wait." },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: 'Attraction responds to perceived value and self-sufficiency, not to withholding tactics. Investment in one\'s own life reliably shifts the dynamic more than any pull-back "game," because it changes the actual signal being sent, not just its timing.' },
    ],
  },
  w08_a7: {
    title: 'What Happens When You Stop Running After Them',
    subtitle: 'The clarity that only arrives when you stand still',
    blocks: [
      { type: 'paragraph', text: "There's a specific terror in stopping the chase: the fear that if you stop running toward them, you'll lose them entirely. And sometimes you will. But that's not the loss it feels like — it's the single most useful piece of information the whole pursuit could ever give you, arriving the moment you finally stop generating the motion yourself." },
      { type: 'heading', text: 'The stillness test' },
      { type: 'paragraph', text: "When you stop chasing, one of two things happens, and both are gifts. Either they move toward you — the space you created let them step forward, and you discover there was something real that your chasing was actually smothering. Or they simply drift away — which reveals that the entire connection was being powered by your effort alone, a one-person relationship you were mistaking for two. You needed to know that. You just couldn't see it while you were the engine keeping it running." },
      { type: 'paragraph', text: "This is the quiet resolution of the whole week. The chase keeps you in motion precisely so you never have to find out what's real — as long as you're running, you can believe the connection is mutual. Standing still is how you finally read the truth. And whatever it shows you, you win: either a real thing that can stand on its own, or your freedom from a mirage you were exhausting yourself to sustain. The people who are yours don't need to be chased. They walk toward you when you stop running." },
      { type: 'quote', text: 'Stop running, and you find out fast who was actually walking beside you.', attribution: 'On standing still' },
      { type: 'callout', variant: 'info', title: 'Why we can say this', text: "Removing one's own pursuit is diagnostic: it distinguishes a mutual bond from an effort-sustained illusion. What a relationship does when you stop powering it single-handedly is among the clearest available signals of whether it was ever mutual." },
    ],
  },
};

/* ───────────────────────── DAILY QUESTIONS (7) — each a 4-way vote ───────────────────────── */

export const w08Questions: DailyQuestion[] = [
  {
    id: 'w08_q1',
    text: {
      en: 'In the situation on your mind, where do you actually stand?',
      fr: 'Dans la situation à laquelle tu penses, où te situes-tu réellement ?',
      ar: 'في الموقف الذي يشغل بالك، أين تقف فعليًا؟',
      es: '¿En la situación que tienes en mente, dónde te encuentras realmente?',
    },
    answers: [
      { label: { en: "I'm the one reaching, initiating, closing the gap", fr: "Je suis celui qui tend la main, initie, comble l'écart", ar: 'أنا من يمدّ يده، يبادر، يسدّ الفجوة', es: 'Soy quien tiende la mano, inicia, cierra la brecha' }, insight: { en: "Being the one who always closes the gap is the pursuer's position.", fr: "Être celui qui comble toujours l'écart est la position du poursuivant.", ar: 'أن تكون من يسدّ الفجوة دائمًا هو موقع المطارِد.', es: 'Ser quien siempre cierra la brecha es la posición del perseguidor.' } },
      { label: { en: "I'm the one pulling back while they reach", fr: "Je suis celui qui se retire pendant qu'il tend la main", ar: 'أنا من ينسحب بينما يمدّ هو يده', es: 'Soy quien se retira mientras él tiende la mano' }, insight: { en: "Being the one who creates the space others chase is the distancer's role.", fr: "Être celui qui crée l'espace que d'autres poursuivent est le rôle du distant.", ar: 'أن تكون من يخلق المساحة التي يطاردها الآخرون هو دور المبتعِد.', es: 'Ser quien crea el espacio que otros persiguen es el rol del distanciador.' } },
      { label: { en: "I'm hooked on the gap itself more than on them", fr: "Je suis accro à l'écart lui-même plus qu'à lui", ar: 'أنا مدمن على الفجوة نفسها أكثر منه هو', es: 'Estoy enganchado a la brecha misma más que a él' }, insight: { en: "When the gap thrills you more than the person, you're chasing the chase.", fr: "Quand l'écart t'excite plus que la personne, tu poursuis la poursuite.", ar: 'حين تُثيرك الفجوة أكثر من الشخص، فأنت تطارد المطاردة.', es: 'Cuando la brecha te emociona más que la persona, estás persiguiendo la persecución.' } },
      { label: { en: "Neither of us runs — we just meet in the middle", fr: "Aucun de nous ne court — on se rejoint simplement au milieu", ar: 'لا أحد منّا يركض — نلتقي فقط في المنتصف', es: 'Ninguno de los dos corre — simplemente nos encontramos en el medio' }, insight: { en: 'A connection where nobody has to run is the rare balanced one.', fr: "Une connexion où personne n'a à courir est la rare connexion équilibrée.", ar: 'الاتصال الذي لا يحتاج فيه أحد إلى الركض هو المتوازن النادر.', es: 'Una conexión donde nadie tiene que correr es la rara equilibrada.' } },
    ],
  },
  {
    id: 'w08_q2',
    text: {
      en: 'When someone makes their interest in you totally clear, what happens?',
      fr: 'Quand quelqu\'un rend son intérêt pour toi totalement clair, que se passe-t-il ?',
      ar: 'حين يجعل أحدهم اهتمامه بك واضحًا تمامًا، ماذا يحدث؟',
      es: 'Cuando alguien deja totalmente claro su interés en ti, ¿qué pasa?',
    },
    answers: [
      { label: { en: "I keep reaching anyway — their clarity doesn't cool me", fr: "Je continue de tendre la main quand même — sa clarté ne me refroidit pas", ar: 'أستمر في المبادرة رغم ذلك — وضوحه لا يبرّدني', es: 'Sigo tendiendo la mano de todos modos — su claridad no me enfría' }, insight: { en: "Wanting someone even when they're sure of you is desire, not the chase.", fr: "Désirer quelqu'un même quand il est sûr de toi est du désir, pas de la poursuite.", ar: 'الرغبة في شخص حتى حين يكون متأكدًا منك هي رغبة، لا مطاردة.', es: 'Desear a alguien incluso cuando está seguro de ti es deseo, no persecución.' } },
      { label: { en: 'I lose a little interest — the mystery was the pull', fr: "Je perds un peu d'intérêt — le mystère était l'attrait", ar: 'أفقد بعض الاهتمام — كان الغموض هو الجاذبية', es: 'Pierdo un poco de interés — el misterio era el atractivo' }, insight: { en: 'Interest that fades with availability was feeding on the distance.', fr: 'Un intérêt qui s\'estompe avec la disponibilité se nourrissait de la distance.', ar: 'الاهتمام الذي يخبو مع التوفّر كان يتغذّى على المسافة.', es: 'Un interés que se desvanece con la disponibilidad se alimentaba de la distancia.' } },
      { label: { en: "I get bored and start eyeing whoever's harder to get", fr: "Je m'ennuie et je commence à lorgner celui qui est plus difficile à obtenir", ar: 'أشعر بالملل وأبدأ بالنظر إلى من هو أصعب في الحصول عليه', es: 'Me aburro y empiezo a mirar a quien sea más difícil de conseguir' }, insight: { en: 'Turning toward the unavailable one is the thrill-of-the-chase pattern.', fr: "Se tourner vers celui qui est indisponible est le schéma de l'excitation de la poursuite.", ar: 'التوجّه نحو غير المتاح هو نمط إثارة المطاردة.', es: 'Volverse hacia el no disponible es el patrón de la emoción de la persecución.' } },
      { label: { en: "It's welcome — clear interest makes me feel safe, not bored", fr: "C'est bienvenu — un intérêt clair me fait sentir en sécurité, pas ennuyé", ar: 'الأمر مُرحَّب به — الاهتمام الواضح يشعرني بالأمان، لا بالملل', es: 'Es bienvenido — el interés claro me hace sentir seguro, no aburrido' }, insight: { en: 'Feeling safe rather than bored with clarity is a balanced nervous system.', fr: "Se sentir en sécurité plutôt qu'ennuyé face à la clarté est un système nerveux équilibré.", ar: 'الشعور بالأمان بدلًا من الملل مع الوضوح هو جهاز عصبي متوازن.', es: 'Sentirse seguro en vez de aburrido con la claridad es un sistema nervioso equilibrado.' } },
    ],
  },
  {
    id: 'w08_q3',
    text: {
      en: 'When you imagine actually "getting" this person, what fills the fantasy?',
      fr: 'Quand tu imagines réellement « obtenir » cette personne, qu\'est-ce qui remplit le fantasme ?',
      ar: 'حين تتخيّل "الحصول" على هذا الشخص فعليًا، ما الذي يملأ الخيال؟',
      es: 'Cuando imaginas realmente «conseguir» a esta persona, ¿qué llena la fantasía?',
    },
    answers: [
      { label: { en: 'Ordinary days with them — real closeness, who they are', fr: "Des journées ordinaires avec lui — une vraie proximité, qui il est", ar: 'أيام عادية معه — قرب حقيقي، من هو', es: 'Días ordinarios con él — cercanía real, quién es' }, insight: { en: 'A fantasy full of them, not the finish line, is genuine wanting.', fr: "Un fantasme plein de lui, pas de la ligne d'arrivée, est un désir sincère.", ar: 'خيال مليء به هو، لا بخط النهاية، هو رغبة صادقة.', es: 'Una fantasía llena de él, no de la línea de meta, es deseo genuino.' } },
      { label: { en: 'The moment of winning — and then it goes blank', fr: "Le moment de la victoire — puis ça devient vide", ar: 'لحظة الفوز — ثم يصبح الأمر فارغًا', es: 'El momento de ganar — y luego se vuelve vacío' }, insight: { en: 'A fantasy that ends at victory means you wanted to win, not to have.', fr: 'Un fantasme qui se termine à la victoire signifie que tu voulais gagner, pas avoir.', ar: 'الخيال الذي ينتهي عند الانتصار يعني أنك أردت الفوز، لا الامتلاك.', es: 'Una fantasía que termina en la victoria significa que querías ganar, no tener.' } },
      { label: { en: 'The high of finally beating the distance', fr: "L'excitation de finalement vaincre la distance", ar: 'نشوة التغلّب أخيرًا على المسافة', es: 'El subidón de finalmente vencer la distancia' }, insight: { en: 'When the prize is conquering the gap, the person was never the point.', fr: "Quand le prix est de conquérir l'écart, la personne n'a jamais été le but.", ar: 'حين تكون الجائزة هي هزيمة الفجوة، لم يكن الشخص هو المقصود أبدًا.', es: 'Cuando el premio es conquistar la brecha, la persona nunca fue el punto.' } },
      { label: { en: 'A calm, steady life — nothing to win, just to share', fr: "Une vie calme et stable — rien à gagner, juste à partager", ar: 'حياة هادئة وثابتة — لا شيء لتفوز به، فقط لتشاركه', es: 'Una vida calmada y estable — nada que ganar, solo compartir' }, insight: { en: 'Imagining sharing rather than winning is love without the scoreboard.', fr: "Imaginer le partage plutôt que la victoire, c'est de l'amour sans tableau de score.", ar: 'تخيّل المشاركة بدلًا من الفوز هو حب بلا لوحة نتائج.', es: 'Imaginar compartir en vez de ganar es amor sin marcador.' } },
    ],
  },
  {
    id: 'w08_q4',
    text: {
      en: 'Be honest: do you like THIS person, or that they\'re hard to catch?',
      fr: 'Sois honnête : aimes-tu CETTE personne, ou le fait qu\'elle soit difficile à attraper ?',
      ar: 'كن صادقًا: هل يعجبك هذا الشخص، أم أنه صعب المنال؟',
      es: 'Sé honesto: ¿te gusta ESTA persona, o que sea difícil de atrapar?',
    },
    answers: [
      { label: { en: "Them — I'd want them even if they were easy", fr: "Lui — je le désirerais même s'il était facile", ar: 'إياه — سأريده حتى لو كان سهل المنال', es: 'A él — lo desearía incluso si fuera fácil' }, insight: { en: 'Wanting them regardless of difficulty is the person, not the pursuit.', fr: 'Le désirer indépendamment de la difficulté, c\'est la personne, pas la poursuite.', ar: 'الرغبة فيه بغضّ النظر عن الصعوبة هي الشخص، لا المطاردة.', es: 'Desearlo sin importar la dificultad es la persona, no la persecución.' } },
      { label: { en: "Their distance is most of the appeal, if I'm honest", fr: "Sa distance est la majeure partie de l'attrait, si je suis honnête", ar: 'مسافته هي معظم الجاذبية، إن كنت صادقًا', es: 'Su distancia es la mayor parte del atractivo, si soy honesto' }, insight: { en: "When the distance is the draw, you're in love with the gap.", fr: "Quand la distance est l'attrait, tu es amoureux de l'écart.", ar: 'حين تكون المسافة هي الجاذبية، فأنت واقع في حب الفجوة.', es: 'Cuando la distancia es el atractivo, estás enamorado de la brecha.' } },
      { label: { en: "The catch — I always want whoever's just out of reach", fr: "La difficulté — je désire toujours celui qui est juste hors de portée", ar: 'الصيد الصعب — أريد دائمًا من هو بعيد المنال قليلًا', es: 'Lo difícil de atrapar — siempre quiero a quien está justo fuera de alcance' }, insight: { en: 'Always craving the out-of-reach one is unavailability as a requirement.', fr: "Toujours désirer celui qui est hors de portée, c'est l'indisponibilité comme condition.", ar: 'الرغبة الدائمة في بعيد المنال هي عدم التوفّر كشرط.', es: 'Siempre anhelar al fuera de alcance es la no disponibilidad como requisito.' } },
      { label: { en: "Them, and it happens they're available too", fr: "Lui, et il se trouve qu'il est aussi disponible", ar: 'إياه، ويصادف أنه متاح أيضًا', es: 'A él, y resulta que también está disponible' }, insight: { en: 'Liking a real, reachable person is the ground steady love grows on.', fr: "Aimer une personne réelle et accessible est le sol sur lequel pousse l'amour stable.", ar: 'الإعجاب بشخص حقيقي ويمكن الوصول إليه هو الأرض التي ينمو عليها الحب الثابت.', es: 'Que te guste una persona real y accesible es el terreno donde crece el amor estable.' } },
    ],
  },
  {
    id: 'w08_q5',
    text: {
      en: 'Think of your strongest attractions. What did they have in common?',
      fr: 'Pense à tes attirances les plus fortes. Qu\'avaient-elles en commun ?',
      ar: 'فكّر في أقوى انجذاباتك. ما القاسم المشترك بينها؟',
      es: 'Piensa en tus atracciones más fuertes. ¿Qué tenían en común?',
    },
    answers: [
      { label: { en: 'Mixed — some available, some not; no clear pattern', fr: "Mélangées — certains disponibles, d'autres non ; pas de schéma clair", ar: 'متنوّعة — بعضهم متاح، بعضهم لا؛ لا نمط واضح', es: 'Mixtas — algunos disponibles, otros no; sin patrón claro' }, insight: { en: "No single pattern usually means your desire isn't ruled by the chase.", fr: "Aucun schéma unique signifie généralement que ton désir n'est pas gouverné par la poursuite.", ar: 'غياب نمط واحد يعني عادة أن رغبتك لا تحكمها المطاردة.', es: 'Ningún patrón único generalmente significa que tu deseo no está gobernado por la persecución.' } },
      { label: { en: 'I was usually the one wanting more than they did', fr: "J'étais généralement celui qui désirait plus qu'eux", ar: 'كنت عادة من يريد أكثر منهم', es: 'Yo era generalmente el que deseaba más que ellos' }, insight: { en: "A history of wanting more than the other is the pursuer's recurring seat.", fr: "Un historique de désirer plus que l'autre est la place récurrente du poursuivant.", ar: 'تاريخ من الرغبة أكثر من الآخر هو المقعد المتكرّر للمطارِد.', es: 'Un historial de desear más que el otro es el asiento recurrente del perseguidor.' } },
      { label: { en: 'Almost all unavailable — taken, distant, unreachable', fr: "Presque tous indisponibles — pris, distants, inaccessibles", ar: 'جميعهم تقريبًا غير متاحين — مرتبطون، بعيدون، يتعذّر الوصول إليهم', es: 'Casi todos no disponibles — comprometidos, distantes, inalcanzables' }, insight: { en: 'A pattern of only wanting the unreachable is longing that avoids real closeness.', fr: "Un schéma où l'on ne désire que l'inaccessible est un désir qui évite la vraie proximité.", ar: 'نمط الرغبة فقط في من يتعذّر الوصول إليه هو شوق يتجنّب القرب الحقيقي.', es: 'Un patrón de desear solo lo inalcanzable es anhelo que evita la cercanía real.' } },
      { label: { en: 'People who could actually show up for me', fr: "Des gens qui pouvaient réellement être là pour moi", ar: 'أشخاص استطاعوا فعليًا أن يحضروا من أجلي', es: 'Personas que realmente podían estar presentes para mí' }, insight: { en: 'Being drawn to people who can show up is desire pointed at the reachable.', fr: "Être attiré par des gens qui peuvent être présents est un désir dirigé vers l'accessible.", ar: 'الانجذاب لأشخاص يستطيعون الحضور هو رغبة موجّهة نحو من يمكن الوصول إليه.', es: 'Sentirse atraído por personas que pueden estar presentes es deseo dirigido a lo alcanzable.' } },
    ],
  },
  {
    id: 'w08_q6',
    text: {
      en: 'When you pull back from someone, why do you usually do it?',
      fr: 'Quand tu te retires de quelqu\'un, pourquoi le fais-tu généralement ?',
      ar: 'حين تنسحب من أحدهم، لماذا تفعل ذلك عادة؟',
      es: 'Cuando te alejas de alguien, ¿por qué lo haces normalmente?',
    },
    answers: [
      { label: { en: "I don't pull back — I lean in, sometimes too much", fr: "Je ne me retire pas — je m'engage, parfois trop", ar: 'لا أنسحب — أقترب، أحيانًا أكثر من اللازم', es: 'No me retiro — me acerco, a veces demasiado' }, insight: { en: 'Leaning in rather than pulling back marks the pursuer, not the distancer.', fr: "S'engager plutôt que se retirer marque le poursuivant, pas le distant.", ar: 'الاقتراب بدلًا من الانسحاب يميّز المطارِد، لا المبتعِد.', es: 'Acercarse en vez de retirarse marca al perseguidor, no al distanciador.' } },
      { label: { en: 'Closeness starts to feel like pressure, so I need air', fr: "La proximité commence à ressembler à de la pression, alors j'ai besoin d'air", ar: 'يبدأ القرب يشعرني بالضغط، فأحتاج إلى هواء', es: 'La cercanía empieza a sentirse como presión, así que necesito aire' }, insight: { en: 'Needing air when closeness rises is the distancer soothing a real fear.', fr: "Avoir besoin d'air quand la proximité augmente, c'est le distant qui apaise une vraie peur.", ar: 'الحاجة إلى الهواء حين يرتفع القرب هي المبتعِد يهدّئ خوفًا حقيقيًا.', es: 'Necesitar aire cuando la cercanía aumenta es el distanciador calmando un miedo real.' } },
      { label: { en: 'To reset the chase — distance makes it exciting again', fr: "Pour réinitialiser la poursuite — la distance la rend excitante à nouveau", ar: 'لإعادة ضبط المطاردة — المسافة تجعلها مثيرة مجددًا', es: 'Para reiniciar la persecución — la distancia la hace emocionante otra vez' }, insight: { en: 'Pulling back to re-spark the hunt is addiction to the chase itself.', fr: "Se retirer pour raviver la chasse est une addiction à la poursuite elle-même.", ar: 'الانسحاب لإعادة إشعال المطاردة هو إدمان على المطاردة نفسها.', es: 'Retirarse para reavivar la caza es adicción a la persecución misma.' } },
      { label: { en: "Only when something's genuinely off — not as a game", fr: "Seulement quand quelque chose ne va vraiment pas — pas comme un jeu", ar: 'فقط حين يكون هناك خطأ حقيقي — لا كلعبة', es: 'Solo cuando algo genuinamente no está bien — no como un juego' }, insight: { en: 'Stepping back only for real reasons, never as strategy, is a steady pattern.', fr: "Se retirer seulement pour de vraies raisons, jamais comme stratégie, est un schéma stable.", ar: 'التراجع فقط لأسباب حقيقية، لا كاستراتيجية أبدًا، هو نمط ثابت.', es: 'Retirarse solo por razones reales, nunca como estrategia, es un patrón estable.' } },
    ],
  },
  {
    id: 'w08_q7',
    text: {
      en: 'If you stopped chasing tomorrow and stood completely still, what would happen?',
      fr: 'Si tu arrêtais de poursuivre demain et restais complètement immobile, que se passerait-il ?',
      ar: 'لو توقفت عن المطاردة غدًا ووقفت ساكنًا تمامًا، ماذا سيحدث؟',
      es: 'Si dejaras de perseguir mañana y te quedaras completamente quieto, ¿qué pasaría?',
    },
    answers: [
      { label: { en: "I'm scared they'd vanish — which tells me I'm the engine", fr: "J'ai peur qu'il disparaisse — ce qui me dit que je suis le moteur", ar: 'أخاف أن يختفي — وهذا يخبرني أنني المحرّك', es: 'Me da miedo que desaparezca — lo cual me dice que soy el motor' }, insight: { en: "Fearing they'd vanish if you stopped reveals a one-person relationship.", fr: "Craindre qu'il disparaisse si tu t'arrêtais révèle une relation à une seule personne.", ar: 'الخوف من اختفائه لو توقفت يكشف علاقة من شخص واحد.', es: 'Temer que desaparezca si te detienes revela una relación de una sola persona.' } },
      { label: { en: "They'd probably chase me — they only relax when I retreat", fr: "Il me poursuivrait probablement — il ne se détend que quand je me retire", ar: 'سيطاردني على الأرجح — لا يرتاح إلا حين أنسحب', es: 'Probablemente me perseguiría — solo se relaja cuando me retiro' }, insight: { en: "If they only approach when you retreat, you're both locked in the dance.", fr: "S'il ne s'approche que quand tu te retires, vous êtes tous les deux enfermés dans la danse.", ar: 'إن كان لا يقترب إلا حين تنسحب، فكلاكما محبوسان في الرقصة.', es: 'Si solo se acerca cuando te retiras, ambos están atrapados en el baile.' } },
      { label: { en: "I'd get restless and manufacture a new chase somewhere", fr: "Je deviendrais agité et fabriquerais une nouvelle poursuite ailleurs", ar: 'سأصبح متململًا وأصنع مطاردة جديدة في مكان ما', es: 'Me pondría inquieto e inventaría una nueva persecución en algún lugar' }, insight: { en: 'Inventing a fresh chase when it goes still is the habit running you.', fr: "Inventer une nouvelle poursuite quand tout devient calme, c'est l'habitude qui te dirige.", ar: 'اختراع مطاردة جديدة حين يسكن كل شيء هو العادة وهي تديرك.', es: 'Inventar una nueva persecución cuando todo se calma es el hábito controlándote.' } },
      { label: { en: "They'd walk toward me — we don't need the running", fr: "Il marcherait vers moi — nous n'avons pas besoin de courir", ar: 'سيمشي نحوي — لا نحتاج إلى الركض', es: 'Caminaría hacia mí — no necesitamos correr' }, insight: { en: 'People who walk toward you when you stand still were never a chase.', fr: "Les gens qui marchent vers toi quand tu restes immobile n'ont jamais été une poursuite.", ar: 'الأشخاص الذين يمشون نحوك حين تقف ساكنًا لم يكونوا مطاردة أبدًا.', es: 'Las personas que caminan hacia ti cuando te quedas quieto nunca fueron una persecución.' } },
    ],
  },
];

/* ───────────────────────── WEEKLY THEME (days + 4 outcomes + answer mapping) ───────────────────────── */

export const w08Week: WeeklyTheme = {
  id: 'w08_the_chase',
  title: {
    en: 'The Chase',
    fr: 'La poursuite',
    ar: 'المطاردة',
    es: 'La persecución',
  },
  category: 'love',
  resultPrompt: {
    en: 'What is your role in pursuit-and-withdrawal patterns?',
    fr: 'Quel est ton rôle dans les schémas de poursuite et de retrait ?',
    ar: 'ما دورك في أنماط المطاردة والانسحاب؟',
    es: '¿Cuál es tu papel en los patrones de persecución y retirada?',
  },
  days: [
    { articleId: 'w08_a1', questionId: 'w08_q1' },
    { articleId: 'w08_a2', questionId: 'w08_q2' },
    { articleId: 'w08_a3', questionId: 'w08_q3' },
    { articleId: 'w08_a4', questionId: 'w08_q4' },
    { articleId: 'w08_a5', questionId: 'w08_q5' },
    { articleId: 'w08_a6', questionId: 'w08_q6' },
    { articleId: 'w08_a7', questionId: 'w08_q7' },
  ],
  outcomes: [
    {
      key: 'the_pursuer',
      title: { en: 'The Pursuer', fr: 'Le poursuivant', ar: 'المطارِد', es: 'El perseguidor' },
      body: {
        en: "You're the one who reaches. You initiate, you close the gap, you pour more in than you get back — and underneath it, usually, is a real fear of being abandoned that closeness quiets. There's nothing shameful here; effort is beautiful when it's mutual. But your reach can read as pressure to the very people you want, and your self-abandonment sends a signal you don't mean: that your attention is worth less than theirs. The work isn't to care less. It's to build a center of gravity that isn't them — because attraction follows fullness, not pursuit.",
        fr: "Tu es celui qui tend la main. Tu inities, tu combles l'écart, tu verses plus que ce que tu reçois en retour — et en dessous, généralement, il y a une vraie peur d'être abandonné que la proximité apaise. Il n'y a rien de honteux ici ; l'effort est beau quand il est mutuel. Mais ta tentative peut se lire comme une pression pour les personnes mêmes que tu désires, et ton abandon de toi-même envoie un signal que tu ne veux pas dire : que ton attention vaut moins que la leur. Le travail n'est pas de moins tenir à eux. C'est de construire un centre de gravité qui ne soit pas eux — parce que l'attirance suit la plénitude, pas la poursuite.",
        ar: 'أنت من يمدّ يده. تبادر، تسدّ الفجوة، تصبّ أكثر مما تستعيد — وتحت ذلك، عادة، خوف حقيقي من الهجر يهدّئه القرب. لا شيء مخجل هنا؛ الجهد جميل حين يكون متبادلًا. لكن محاولتك قد تُقرأ كضغط على الأشخاص أنفسهم الذين تريدهم، وتخلّيك عن ذاتك يُرسل إشارة لا تقصدها: أن انتباهك يستحق أقل من انتباههم. العمل ليس أن تهتم أقل. إنه أن تبني مركز جاذبية ليس هم — لأن الانجذاب يتبع الاكتمال، لا المطاردة.',
        es: 'Eres quien tiende la mano. Inicias, cierras la brecha, viertes más de lo que recibes de vuelta —y debajo de eso, normalmente, hay un miedo real al abandono que la cercanía calma. No hay nada vergonzoso aquí; el esfuerzo es hermoso cuando es mutuo. Pero tu alcance puede leerse como presión para las mismas personas que deseas, y tu autoabandono envía una señal que no pretendes: que tu atención vale menos que la de ellos. El trabajo no es que te importe menos. Es construir un centro de gravedad que no sea ellos —porque la atracción sigue a la plenitud, no a la persecución.',
      },
      shareLine: {
        en: "I'm always the one reaching. Time to build a life worth reaching for.",
        fr: 'Je suis toujours celui qui tend la main. Il est temps de construire une vie qui vaille la peine d\'être atteinte.',
        ar: 'أنا دائمًا من يمدّ يده. حان الوقت لبناء حياة تستحق أن يُمَدّ إليها اليد.',
        es: 'Siempre soy quien tiende la mano. Es hora de construir una vida que valga la pena alcanzar.',
      },
    },
    {
      key: 'the_distancer',
      title: { en: 'The Distancer', fr: 'Le distant', ar: 'المبتعِد', es: 'El distanciador' },
      body: {
        en: "You're the one who pulls back. When closeness rises, it starts to feel like pressure, and space is how you feel safe again — a real fear of being engulfed, soothed by distance. You're not cold, and you're not a villain; you're using the opposite strategy from the pursuer, and each of you is the other's nightmare. But notice what your pullback does: it reads as abandonment to someone who's reaching, and it keeps a self-feeding loop alive. The way out isn't finding your 'true' role — it's staying, once, when everything in you says to create space.",
        fr: "Tu es celui qui se retire. Quand la proximité augmente, ça commence à ressembler à de la pression, et l'espace est comment tu te sens de nouveau en sécurité — une vraie peur d'être englouti, apaisée par la distance. Tu n'es pas froid, et tu n'es pas un méchant ; tu utilises la stratégie opposée à celle du poursuivant, et chacun de vous est le cauchemar de l'autre. Mais remarque ce que fait ton retrait : il se lit comme un abandon pour quelqu'un qui tend la main, et il maintient une boucle qui s'auto-alimente en vie. La sortie n'est pas de trouver ton « vrai » rôle — c'est de rester, une fois, quand tout en toi dit de créer de l'espace.",
        ar: 'أنت من ينسحب. حين يرتفع القرب، يبدأ الأمر يشعرك بالضغط، والمساحة هي كيف تشعر بالأمان مجددًا — خوف حقيقي من الابتلاع، تهدّئه المسافة. أنت لست باردًا، ولست شريرًا؛ أنت تستخدم الاستراتيجية المعاكسة للمطارِد، وكل منكما كابوس الآخر. لكن لاحظ ما يفعله انسحابك: يُقرأ كهجر بالنسبة لمن يمدّ يده، ويُبقي حلقة تتغذّى على نفسها حيّة. المخرج ليس إيجاد دورك "الحقيقي" — إنه البقاء، ولو مرة واحدة، حين يقول كل شيء بداخلك أن تخلق مساحة.',
        es: 'Eres quien se retira. Cuando la cercanía aumenta, empieza a sentirse como presión, y el espacio es cómo te sientes seguro de nuevo —un miedo real a ser engullido, calmado por la distancia. No eres frío, y no eres un villano; estás usando la estrategia opuesta a la del perseguidor, y cada uno es la pesadilla del otro. Pero nota lo que hace tu retirada: se lee como abandono para alguien que está tendiendo la mano, y mantiene vivo un bucle autoalimentado. La salida no es encontrar tu «verdadero» rol —es quedarte, una vez, cuando todo en ti dice que crees espacio.',
      },
      shareLine: {
        en: 'I create the distance others chase. The space is my safety — and my trap.',
        fr: "Je crée la distance que d'autres poursuivent. L'espace est ma sécurité — et mon piège.",
        ar: 'أنا أخلق المسافة التي يطاردها الآخرون. المساحة هي أماني — وفخّي.',
        es: 'Yo creo la distancia que otros persiguen. El espacio es mi seguridad — y mi trampa.',
      },
    },
    {
      key: 'addicted_chase',
      title: { en: 'Hooked on the Chase', fr: 'Accro à la poursuite', ar: 'مدمن على المطاردة', es: 'Enganchado a la persecución' },
      body: {
        en: "The honest, uncomfortable read: it's the gap you love, more than any particular person. Interest cools the second someone's sure of you; your eye drifts to whoever's just out of reach; the fantasy is always the moment of winning, never the ordinary days after. Wanting the unavailable is actually the safest wanting there is — all the intensity of longing, none of the risk of being truly close and truly seen. That's the real thing to look at. The spark you keep chasing isn't love; it's the arcade lights of a gap. Available closeness isn't flat — you've just never let it reach you.",
        fr: "La lecture honnête et inconfortable : c'est l'écart que tu aimes, plus que n'importe quelle personne en particulier. L'intérêt se refroidit à la seconde où quelqu'un est sûr de toi ; ton regard dérive vers celui qui est juste hors de portée ; le fantasme est toujours le moment de la victoire, jamais les journées ordinaires après. Désirer l'indisponible est en réalité le désir le plus sûr qui soit — toute l'intensité du désir, aucun risque d'être vraiment proche et vraiment vu. C'est la vraie chose à regarder. L'étincelle que tu continues de poursuivre n'est pas de l'amour ; ce sont les lumières d'arcade d'un écart. La proximité disponible n'est pas plate — tu ne l'as juste jamais laissée t'atteindre.",
        ar: 'القراءة الصادقة وغير المريحة: إنها الفجوة التي تحبها، أكثر من أي شخص معيّن. يبرد الاهتمام في اللحظة التي يتأكد فيها أحدهم منك؛ تنجرف عينك نحو من هو بعيد المنال قليلًا؛ الخيال دائمًا لحظة الفوز، لا الأيام العادية بعدها أبدًا. الرغبة في غير المتاح هي في الحقيقة أكثر أنواع الرغبة أمانًا — كل كثافة الشوق، دون أي من مخاطر أن تكون قريبًا حقًا وتُرى حقًا. هذا هو الشيء الحقيقي الذي يجب النظر إليه. الشرارة التي تستمر في مطاردتها ليست حبًا؛ إنها أضواء صالة الألعاب لفجوة. القرب المتاح ليس مسطّحًا — أنت فقط لم تدعه يصلك أبدًا.',
        es: 'La lectura honesta e incómoda: es la brecha lo que amas, más que cualquier persona en particular. El interés se enfría en el segundo en que alguien está seguro de ti; tu mirada se desvía hacia quien está justo fuera de alcance; la fantasía siempre es el momento de ganar, nunca los días ordinarios después. Desear lo no disponible es en realidad el deseo más seguro que existe —toda la intensidad del anhelo, ningún riesgo de estar realmente cerca y ser realmente visto. Eso es lo real que hay que mirar. La chispa que sigues persiguiendo no es amor; son las luces de la sala de máquinas de una brecha. La cercanía disponible no es plana —simplemente nunca la has dejado alcanzarte.',
      },
      shareLine: {
        en: "Maybe I don't want them. Maybe I just want the chase.",
        fr: 'Peut-être que je ne le désire pas. Peut-être que je désire juste la poursuite.',
        ar: 'ربما لا أريده. ربما أريد المطاردة فقط.',
        es: 'Quizás no lo deseo a él. Quizás solo deseo la persecución.',
      },
    },
    {
      key: 'balanced_dance',
      title: { en: 'No One Is Running', fr: 'Personne ne court', ar: 'لا أحد يركض', es: 'Nadie está corriendo' },
      body: {
        en: "Here's the rare one, and you've earned the read: nobody's chasing, nobody's fleeing — you meet in the middle. Clear interest makes you feel safe rather than bored; you're drawn to people who can actually show up; when you imagine 'getting' someone, the fantasy is full of ordinary shared days, not a finish line. This is what desire looks like when it isn't feeding on distance. Protect it — and trust it, especially the next time some unavailable person's gap tries to convince you that flatness means something's missing. It doesn't. Steady isn't the absence of the spark. It's the spark with a floor under it.",
        fr: "Voici le résultat rare, et tu as gagné cette lecture : personne ne poursuit, personne ne fuit — vous vous rejoignez au milieu. Un intérêt clair te fait sentir en sécurité plutôt qu'ennuyé ; tu es attiré par des gens qui peuvent réellement être présents ; quand tu imagines « obtenir » quelqu'un, le fantasme est plein de journées ordinaires partagées, pas d'une ligne d'arrivée. C'est à quoi ressemble le désir quand il ne se nourrit pas de la distance. Protège-le — et fais-lui confiance, surtout la prochaine fois que l'écart d'une personne indisponible essaie de te convaincre que la platitude signifie qu'il manque quelque chose. Ce n'est pas le cas. La stabilité n'est pas l'absence d'étincelle. C'est l'étincelle avec un plancher dessous.",
        ar: 'إليك النتيجة النادرة، وقد كسبت هذه القراءة: لا أحد يطارد، لا أحد يهرب — تلتقيان في المنتصف. الاهتمام الواضح يشعرك بالأمان لا بالملل؛ أنت منجذب إلى أشخاص يستطيعون فعليًا الحضور؛ حين تتخيّل "الحصول" على شخص، يكون الخيال مليئًا بأيام مشتركة عادية، لا بخط نهاية. هذا هو شكل الرغبة حين لا تتغذّى على المسافة. احمها — وثق بها، خاصة في المرة القادمة التي تحاول فيها فجوة شخص غير متاح أن تقنعك بأن التسطّح يعني نقصان شيء ما. إنه لا يعني ذلك. الثبات ليس غياب الشرارة. إنه الشرارة وتحتها أرضية.',
        es: 'Aquí está el resultado raro, y te has ganado esta lectura: nadie persigue, nadie huye —se encuentran en el medio. El interés claro te hace sentir seguro en vez de aburrido; te sientes atraído por personas que realmente pueden estar presentes; cuando imaginas «conseguir» a alguien, la fantasía está llena de días ordinarios compartidos, no de una línea de meta. Así es como se ve el deseo cuando no se alimenta de la distancia. Protégelo —y confía en él, especialmente la próxima vez que la brecha de alguna persona no disponible intente convencerte de que la planitud significa que falta algo. No es así. Lo estable no es la ausencia de la chispa. Es la chispa con un suelo debajo.',
      },
      shareLine: {
        en: "The people who are mine don't need to be chased.",
        fr: "Les gens qui sont à moi n'ont pas besoin d'être poursuivis.",
        ar: 'الأشخاص الذين هم لي لا يحتاجون إلى أن يُطارَدوا.',
        es: 'Las personas que son mías no necesitan ser perseguidas.',
      },
    },
  ],
  // questionId → [outcomeKey for answer 0..3], index-aligned. Balanced 7/7/7/7, all rows 4-distinct.
  answerOutcomes: {
    w08_q1: ['the_pursuer', 'the_distancer', 'addicted_chase', 'balanced_dance'],
    w08_q2: ['balanced_dance', 'the_pursuer', 'addicted_chase', 'the_distancer'],
    w08_q3: ['balanced_dance', 'the_pursuer', 'addicted_chase', 'the_distancer'],
    w08_q4: ['the_pursuer', 'the_distancer', 'addicted_chase', 'balanced_dance'],
    w08_q5: ['balanced_dance', 'the_pursuer', 'addicted_chase', 'the_distancer'],
    w08_q6: ['the_pursuer', 'the_distancer', 'addicted_chase', 'balanced_dance'],
    w08_q7: ['the_pursuer', 'the_distancer', 'addicted_chase', 'balanced_dance'],
  },
};
