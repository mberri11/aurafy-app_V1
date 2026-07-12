import { SoloResults } from '../../types';

/**
 * SHADOW SELF — Jungian register: the shadow is disowned material, not evil; naming it
 * is the work ("what you deny owns you; what you own can't ambush you"). The negative
 * verdict is an invitation, never a condemnation (house rule from amITheProblemResults).
 * Insights are keyed by the question dimensions: projection / persona_gap /
 * disowned_feelings. Share lines are first-person confession voice (solo rule).
 */
export const shadowSelfResults: SoloResults = {
  verdictLabel: {
    positive: { en: 'Integrated', fr: 'Intégré', ar: 'متصالح', es: 'Integrado' },
    neutral: { en: 'Half-Lit', fr: 'Mi-éclairé', ar: 'نصف مُضاء', es: 'A media luz' },
    negative: { en: 'Unclaimed', fr: 'Non reconnu', ar: 'غير مُعترَف به', es: 'No reconocido' },
  },
  verdicts: {
    positive: {
      en: 'You know your shadow by name — it walks beside you, not behind you.',
      fr: 'Tu connais ton ombre par son nom — elle marche à côté de toi, pas derrière toi.',
      ar: 'تعرف ظلّك باسمه — إنه يمشي بجانبك، لا خلفك.',
      es: 'Conoces tu sombra por su nombre — camina a tu lado, no detrás de ti.',
    },
    neutral: {
      en: "You've met your shadow, but parts of it still speak through you unnoticed.",
      fr: "Tu as rencontré ton ombre, mais des parts d'elle parlent encore à travers toi sans que tu le remarques.",
      ar: 'قابلت ظلّك، لكن أجزاء منه ما زالت تتكلم من خلالك دون أن تلاحظ.',
      es: 'Has conocido tu sombra, pero partes de ella aún hablan a través de ti sin que lo notes.',
    },
    negative: {
      en: 'Your shadow is running pieces of your life from off-stage.',
      fr: 'Ton ombre dirige des pans de ta vie depuis les coulisses.',
      ar: 'ظلّك يدير أجزاء من حياتك من خلف الكواليس.',
      es: 'Tu sombra dirige partes de tu vida desde fuera del escenario.',
    },
  },
  whatThisMeans: {
    positive: {
      en: "Integration doesn't mean your dark side is gone — it means it has a seat at the table instead of a hand on the wheel. You catch your projections early, admit the ugly feelings before they ferment, and let the mask rest. Jung called this the beginning of real freedom: nothing in you is running the show unseen.",
      fr: "L'intégration ne veut pas dire que ton côté sombre a disparu — elle veut dire qu'il a une place à la table au lieu d'une main sur le volant. Tu attrapes tes projections tôt, tu admets les sentiments laids avant qu'ils ne fermentent, et tu laisses le masque se reposer. Jung appelait cela le début de la vraie liberté : rien en toi ne dirige le spectacle en secret.",
      ar: 'التصالح لا يعني أن جانبك المظلم اختفى — بل يعني أن له مقعدًا على الطاولة بدل يدٍ على المقود. تلتقط إسقاطاتك مبكرًا، وتعترف بالمشاعر القبيحة قبل أن تتخمّر، وتدع القناع يرتاح. سمّى يونغ هذا بداية الحرية الحقيقية: لا شيء فيك يدير المشهد دون أن تراه.',
      es: 'La integración no significa que tu lado oscuro se fue — significa que tiene un asiento en la mesa en vez de una mano en el volante. Atrapas tus proyecciones temprano, admites los sentimientos feos antes de que fermenten, y dejas descansar la máscara. Jung llamó a esto el comienzo de la libertad real: nada en ti dirige la función sin ser visto.',
    },
    neutral: {
      en: "You've done real work — the shadow isn't a stranger. But a few rooms stay locked: a feeling you rename, a trait you only see in others, a mask that works too well to take off. The next step is small and specific: when someone irritates you beyond reason, pause and ask what it touches in you. That question, asked honestly, is the whole practice.",
      fr: "Tu as fait un vrai travail — l'ombre n'est pas une étrangère. Mais quelques pièces restent fermées : un sentiment que tu renommes, un trait que tu ne vois que chez les autres, un masque qui marche trop bien pour être retiré. La prochaine étape est petite et précise : quand quelqu'un t'irrite au-delà du raisonnable, arrête-toi et demande ce que ça touche en toi. Cette question, posée honnêtement, est toute la pratique.",
      ar: 'لقد أنجزت عملًا حقيقيًّا — الظل ليس غريبًا عنك. لكن بعض الغرف ما زالت مقفلة: شعور تعيد تسميته، وصفة لا تراها إلا في الآخرين، وقناع يعمل جيدًا لدرجة يصعب خلعه. الخطوة التالية صغيرة ومحددة: حين يزعجك أحدهم فوق المعقول، توقّف واسأل ماذا يلمس فيك. هذا السؤال، إن طُرح بصدق، هو الممارسة كلها.',
      es: 'Has hecho un trabajo real — la sombra no es una extraña. Pero algunas habitaciones siguen cerradas: un sentimiento que renombras, un rasgo que solo ves en otros, una máscara que funciona demasiado bien como para quitártela. El siguiente paso es pequeño y específico: cuando alguien te irrite más allá de lo razonable, detente y pregunta qué toca en ti. Esa pregunta, hecha con honestidad, es toda la práctica.',
    },
    negative: {
      en: "This is not a verdict on your character — it's a map of where your energy goes. Strong reactions to certain people, a public self that costs effort to maintain, feelings that only surface as explosions: these are the shadow's signatures, and everyone has them. Jung's point was hopeful: what you face stops ambushing you. Taking this reading was itself a first act of facing it.",
      fr: "Ce n'est pas un verdict sur ton caractère — c'est une carte de là où va ton énergie. Des réactions fortes envers certaines personnes, un moi public qui coûte des efforts à maintenir, des sentiments qui n'émergent qu'en explosions : ce sont les signatures de l'ombre, et tout le monde les a. Le propos de Jung était plein d'espoir : ce que tu affrontes cesse de te tendre des embuscades. Faire cette lecture était déjà un premier acte pour l'affronter.",
      ar: 'هذا ليس حكمًا على شخصيتك — بل خريطة لمكان ذهاب طاقتك. ردود فعل قوية تجاه أشخاص بعينهم، وذات علنية تكلّفك جهدًا لإبقائها، ومشاعر لا تظهر إلا انفجارات: هذه تواقيع الظل، وكل الناس يحملونها. كانت فكرة يونغ مفعمة بالأمل: ما تواجهه يكفّ عن نصب الكمائن لك. وقيامك بهذه القراءة كان بحد ذاته أول فعل من أفعال المواجهة.',
      es: 'Esto no es un veredicto sobre tu carácter — es un mapa de adónde va tu energía. Reacciones fuertes hacia ciertas personas, un yo público que cuesta esfuerzo mantener, sentimientos que solo salen como explosiones: esas son las firmas de la sombra, y todo el mundo las tiene. El punto de Jung era esperanzador: lo que enfrentas deja de emboscarte. Hacer esta lectura ya fue un primer acto de enfrentarlo.',
    },
  },
  shareLines: {
    positive: {
      en: 'I met my shadow. We shook hands.',
      fr: "J'ai rencontré mon ombre. On s'est serré la main.",
      ar: 'قابلت ظلّي. وتصافحنا.',
      es: 'Conocí a mi sombra. Nos dimos la mano.',
    },
    neutral: {
      en: 'Turns out my dark side just wanted a seat at the table.',
      fr: 'Il s\'avère que mon côté sombre voulait juste une place à la table.',
      ar: 'اتضح أن جانبي المظلم أراد فقط مقعدًا على الطاولة.',
      es: 'Resulta que mi lado oscuro solo quería un asiento en la mesa.',
    },
    negative: {
      en: 'The parts of me I buried were still driving.',
      fr: 'Les parts de moi que j\'avais enterrées conduisaient encore.',
      ar: 'الأجزاء التي دفنتها منّي كانت لا تزال تقود.',
      es: 'Las partes de mí que enterré seguían conduciendo.',
    },
  },
  insights: {
    projection: [
      {
        en: 'The traits that enrage you in others are worth an honest inventory — irritation is often a mirror before it is a fact.',
        fr: "Les traits qui t'enragent chez les autres méritent un inventaire honnête — l'agacement est souvent un miroir avant d'être un fait.",
        ar: 'الصفات التي تُغضبك في الآخرين تستحق جردًا صادقًا — فالانزعاج غالبًا مرآة قبل أن يكون حقيقة.',
        es: 'Los rasgos que te enfurecen en otros merecen un inventario honesto — la irritación suele ser un espejo antes que un hecho.',
      },
      {
        en: "What you can't stand in them may be what you were never allowed to be.",
        fr: 'Ce que tu ne supportes pas chez eux est peut-être ce qu\'on ne t\'a jamais permis d\'être.',
        ar: 'ما لا تحتمله فيهم قد يكون ما لم يُسمح لك يومًا أن تكونه.',
        es: 'Lo que no soportas en ellos puede ser lo que a ti nunca te permitieron ser.',
      },
      {
        en: 'Envy is information: it points, with embarrassing precision, at what you actually want.',
        fr: "L'envie est une information : elle pointe, avec une précision gênante, vers ce que tu veux vraiment.",
        ar: 'الحسد معلومة: إنه يشير، بدقة محرجة، إلى ما تريده فعلًا.',
        es: 'La envidia es información: señala, con precisión vergonzosa, lo que de verdad quieres.',
      },
      {
        en: 'A dislike with no story usually has one — it just lives on your side of the fence.',
        fr: 'Une aversion sans histoire en a généralement une — elle vit juste de ton côté de la clôture.',
        ar: 'النفور بلا قصة له قصة عادةً — لكنها تسكن في جانبك أنت من السياج.',
        es: 'Una antipatía sin historia suele tener una — solo que vive de tu lado de la cerca.',
      },
      {
        en: 'Before you diagnose them, borrow the accusation for one minute and try it on. Then decide.',
        fr: "Avant de les diagnostiquer, emprunte l'accusation une minute et essaie-la sur toi. Puis décide.",
        ar: 'قبل أن تشخّصهم، استعر التهمة دقيقة واحدة وجرّبها على نفسك. ثم قرر.',
        es: 'Antes de diagnosticarlos, toma prestada la acusación un minuto y pruébatela. Luego decide.',
      },
      {
        en: 'The person who triggers you most is carrying a message from you to you. Rude courier, real letter.',
        fr: 'La personne qui te déclenche le plus porte un message de toi à toi. Messager grossier, vraie lettre.',
        ar: 'الشخص الذي يستفزك أكثر يحمل رسالة منك إليك. ساعي بريد فظّ، لكن الرسالة حقيقية.',
        es: 'La persona que más te altera lleva un mensaje de ti para ti. Mensajero grosero, carta real.',
      },
    ],
    persona_gap: [
      {
        en: 'A mask worn long enough starts to wear you back. Taking it off in safe rooms is maintenance, not weakness.',
        fr: "Un masque porté assez longtemps finit par te porter à son tour. L'enlever dans des lieux sûrs est de l'entretien, pas de la faiblesse.",
        ar: 'القناع الذي يُلبس طويلًا يبدأ بارتدائك أنت. خلعه في الغرف الآمنة صيانة، لا ضعف.',
        es: 'Una máscara usada demasiado tiempo empieza a usarte a ti. Quitártela en lugares seguros es mantenimiento, no debilidad.',
      },
      {
        en: 'The gap between your public self and your private self is the exact size of your exhaustion.',
        fr: "L'écart entre ton moi public et ton moi privé fait exactement la taille de ta fatigue.",
        ar: 'الفجوة بين ذاتك العلنية وذاتك الخاصة هي بالضبط بحجم إرهاقك.',
        es: 'La brecha entre tu yo público y tu yo privado tiene exactamente el tamaño de tu agotamiento.',
      },
      {
        en: "Let one trusted person meet the unedited version. The mask gets lighter when it isn't load-bearing.",
        fr: 'Laisse une personne de confiance rencontrer la version non éditée. Le masque devient plus léger quand il ne porte plus tout le poids.',
        ar: 'دع شخصًا واحدًا تثق به يقابل النسخة غير المحررة. يخفّ القناع حين يتوقف عن حمل البناء كله.',
        es: 'Deja que una persona de confianza conozca la versión sin editar. La máscara pesa menos cuando no carga toda la estructura.',
      },
      {
        en: 'What you perform hardest is what you trust least in yourself — that trait needs practice offstage, not louder applause.',
        fr: 'Ce que tu joues le plus fort est ce en quoi tu te fais le moins confiance — ce trait a besoin de pratique en coulisses, pas d\'applaudissements plus forts.',
        ar: 'ما تؤديه بأقصى جهد هو أقل ما تثق به في نفسك — تلك الصفة تحتاج تمرينًا خلف الكواليس، لا تصفيقًا أعلى.',
        es: 'Lo que actúas con más fuerza es lo que menos confías de ti — ese rasgo necesita práctica fuera del escenario, no más aplausos.',
      },
      {
        en: 'If being alone feels like losing an audience, start with ten minutes of being nobody. It grows on you.',
        fr: "Si être seul ressemble à perdre un public, commence par dix minutes à n'être personne. On y prend goût.",
        ar: 'إن كانت الوحدة تشبه فقدان الجمهور، فابدأ بعشر دقائق من أن تكون لا أحد. ستألف الأمر.',
        es: 'Si estar solo se siente como perder al público, empieza con diez minutos de no ser nadie. Le tomas el gusto.',
      },
      {
        en: "The private appetites you hide aren't proof you're fake — they're proof you're bigger than the brand.",
        fr: 'Les appétits privés que tu caches ne prouvent pas que tu es faux — ils prouvent que tu es plus grand que la marque.',
        ar: 'الشهوات الخاصة التي تخفيها ليست دليلًا على زيفك — بل دليل على أنك أكبر من الصورة المعلنة.',
        es: 'Los apetitos privados que escondes no prueban que seas falso — prueban que eres más grande que la marca.',
      },
    ],
    disowned_feelings: [
      {
        en: "A feeling you refuse to name doesn't leave — it changes costume and comes back as a mood, a snap, a headache.",
        fr: "Un sentiment que tu refuses de nommer ne part pas — il change de costume et revient en humeur, en éclat, en migraine.",
        ar: 'الشعور الذي ترفض تسميته لا يرحل — بل يغيّر زيّه ويعود مزاجًا أو انفجارًا أو صداعًا.',
        es: 'Un sentimiento que te niegas a nombrar no se va — se cambia de disfraz y vuelve como un humor, un estallido, un dolor de cabeza.',
      },
      {
        en: 'Anger is a messenger with terrible manners and accurate mail. Read the letter before you shoot the courier.',
        fr: 'La colère est un messager aux manières terribles et au courrier exact. Lis la lettre avant de tirer sur le facteur.',
        ar: 'الغضب رسول سيّئ الأخلاق لكن بريده دقيق. اقرأ الرسالة قبل أن تُردي الساعي.',
        es: 'La ira es un mensajero de pésimos modales y correo exacto. Lee la carta antes de dispararle al cartero.',
      },
      {
        en: 'The explosion over something small was never about the small thing. Follow the fuse back.',
        fr: "L'explosion pour un détail n'a jamais concerné le détail. Remonte la mèche.",
        ar: 'الانفجار بسبب شيء صغير لم يكن يومًا عن الشيء الصغير. تتبّع الفتيل إلى الوراء.',
        es: 'La explosión por algo pequeño nunca fue por lo pequeño. Sigue la mecha hacia atrás.',
      },
      {
        en: "Wanting attention, money, desire, power — these aren't crimes. Unnamed, though, they negotiate in your name.",
        fr: "Vouloir de l'attention, de l'argent, du désir, du pouvoir — ce ne sont pas des crimes. Mais non nommés, ils négocient en ton nom.",
        ar: 'أن تريد الاهتمام والمال والرغبة والسلطة — هذه ليست جرائم. لكنها إن بقيت بلا اسم، تفاوضت باسمك.',
        es: 'Querer atención, dinero, deseo, poder — no son crímenes. Pero sin nombre, negocian en tu nombre.',
      },
      {
        en: "Grief keeps every appointment you cancel. It's kinder to choose the time yourself.",
        fr: 'Le chagrin honore chaque rendez-vous que tu annules. Il est plus doux de choisir l\'heure toi-même.',
        ar: 'الحزن يحضر كل موعد تلغيه أنت. من الألطف أن تختار الموعد بنفسك.',
        es: 'El duelo acude a cada cita que cancelas. Es más amable elegir tú mismo la hora.',
      },
      {
        en: "Saying 'I'm envious', 'I'm hurt', 'I need' out loud once a week is the cheapest therapy there is.",
        fr: "Dire « j'envie », « j'ai mal », « j'ai besoin » à voix haute une fois par semaine est la thérapie la moins chère qui soit.",
        ar: 'قولك «أنا أحسد»، «أنا متألم»، «أنا محتاج» بصوت عالٍ مرة في الأسبوع هو أرخص علاج موجود.',
        es: "Decir 'envidio', 'me duele', 'necesito' en voz alta una vez por semana es la terapia más barata que existe.",
      },
    ],
  },
};
