import { CountResults } from '../../types';

/**
 * red_green_flag read in SOLO mode → the actual "red flag or green flag?" verdict
 * about ONE person. POLARITY IS INVERTED vs the love modules (same as
 * whoWillHurtMeCount / whoHatesMeCount): `none` is the GREEN flag (the relief),
 * `high` is the red one.
 *
 * Tier → flag mapping used in the copy:
 *   none   → Green Flag
 *   low    → mostly green, a couple of ordinary human edges
 *   medium → Mixed Signals
 *   high   → Red Flag
 *
 * Register: protective, specific, never alarmist and never a character verdict.
 * The `high` tier names behaviour and returns agency to the reader — it never
 * instructs them to leave, accuse, or confront anyone.
 */
export const redGreenFlagCountResults: CountResults = {
  tiers: {
    none: {
      en: 'Green flag. {name} reads clean — the patterns simply are not there.',
      fr: "Drapeau vert. {name} est net — les schémas ne sont tout simplement pas là.",
      ar: 'رايةٌ خضراء. {name} صافٍ — الأنماط ببساطة غير موجودة.',
      es: 'Bandera verde. {name} se lee limpio — los patrones simplemente no están.',
    },
    low: {
      en: 'Mostly green. A couple of human edges with {name}, but nothing that forms a pattern.',
      fr: "Majoritairement vert. Quelques aspérités humaines avec {name}, mais rien qui forme un schéma.",
      ar: 'أخضر في معظمه. بضع حوافّ بشرية مع {name}، لكن لا شيء يتشكّل كنمط.',
      es: 'Verde en su mayoría. Un par de aristas humanas con {name}, pero nada que forme un patrón.',
    },
    medium: {
      en: 'Mixed signals. Real flags are showing with {name} — worth watching, not worth panicking over.',
      fr: "Signaux mitigés. De vrais drapeaux apparaissent avec {name} — à surveiller, pas de quoi paniquer.",
      ar: 'إشاراتٌ مختلطة. تظهر رايات حقيقية مع {name} — تستحق الانتباه، لا الذعر.',
      es: 'Señales mixtas. Aparecen banderas reales con {name} — para observar, no para entrar en pánico.',
    },
    high: {
      en: 'Red flag. The behaviour with {name} holds a consistent shape, and you already felt it.',
      fr: "Drapeau rouge. Le comportement avec {name} garde une forme constante, et tu le sentais déjà.",
      ar: 'رايةٌ حمراء. السلوك مع {name} يحافظ على شكلٍ ثابت، وأنت شعرت بذلك سلفًا.',
      es: 'Bandera roja. La conducta con {name} mantiene una forma constante, y ya lo sentías.',
    },
  },
  shareLines: {
    none: {
      en: 'Ran them through the flag test. Came out green.',
      fr: "Je l'ai passé au test des drapeaux. Ressorti vert.",
      ar: 'أخضعته لاختبار الرايات. خرج أخضر.',
      es: 'Le pasé el test de banderas. Salió verde.',
    },
    low: {
      en: 'Green, with two very human dents.',
      fr: 'Vert, avec deux bosses très humaines.',
      ar: 'أخضر، مع خدشين إنسانيين جدًّا.',
      es: 'Verde, con dos abolladuras muy humanas.',
    },
    medium: {
      en: 'Not red. Not green. The colour nobody wants.',
      fr: 'Ni rouge. Ni vert. La couleur que personne ne veut.',
      ar: 'لا أحمر ولا أخضر. اللون الذي لا يريده أحد.',
      es: 'Ni rojo. Ni verde. El color que nadie quiere.',
    },
    high: {
      en: 'I asked the app. The app said run the flag up.',
      fr: "J'ai demandé à l'appli. Elle a dit : hisse le drapeau.",
      ar: 'سألت التطبيق. قال: ارفع الراية.',
      es: 'Le pregunté a la app. La app dijo: iza la bandera.',
    },
  },
  insights: {
    none: [
      {
        en: 'Nothing here needs decoding. That in itself is the result.',
        fr: "Rien ici n'a besoin d'être décodé. C'est déjà le résultat.",
        ar: 'لا شيء هنا يحتاج إلى فكّ شفرة. وهذا بحد ذاته هو النتيجة.',
        es: 'Aquí no hay nada que descifrar. Eso ya es el resultado.',
      },
      {
        en: 'Their words and their actions point the same direction. That is rarer than it should be.',
        fr: "Ses mots et ses actes vont dans le même sens. C'est plus rare que ça ne devrait l'être.",
        ar: 'كلماته وأفعاله تشير إلى الاتجاه نفسه. وهذا أندر مما ينبغي.',
        es: 'Sus palabras y sus actos apuntan a lo mismo. Eso es más raro de lo que debería.',
      },
      {
        en: 'You did not have to translate anything to answer these questions. Notice that.',
        fr: "Tu n'as rien eu à traduire pour répondre à ces questions. Remarque-le.",
        ar: 'لم تضطر إلى ترجمة أي شيء للإجابة عن هذه الأسئلة. لاحظ ذلك.',
        es: 'No tuviste que traducir nada para responder estas preguntas. Fíjate en eso.',
      },
      {
        en: 'Safety is quiet. It rarely announces itself, which is why it is easy to undervalue.',
        fr: "La sécurité est silencieuse. Elle s'annonce rarement, c'est pourquoi on la sous-estime.",
        ar: 'الأمان هادئ. نادرًا ما يعلن عن نفسه، ولهذا يسهل التقليل من شأنه.',
        es: 'La seguridad es silenciosa. Rara vez se anuncia, por eso es fácil subestimarla.',
      },
      {
        en: 'A green flag is not perfection. It is someone whose pattern you can rest against.',
        fr: "Un drapeau vert n'est pas la perfection. C'est quelqu'un sur le schéma duquel tu peux te reposer.",
        ar: 'الراية الخضراء ليست كمالًا. إنها شخصٌ يمكنك أن تستريح إلى نمطه.',
        es: 'Una bandera verde no es perfección. Es alguien en cuyo patrón puedes descansar.',
      },
      {
        en: 'Keep this reading. Compare it against whoever comes next.',
        fr: 'Garde cette lecture. Compare-la à celui ou celle qui viendra ensuite.',
        ar: 'احتفظ بهذه القراءة. قارنها بمن سيأتي بعده.',
        es: 'Guarda esta lectura. Compárala con quien venga después.',
      },
    ],
    low: [
      {
        en: 'A flaw is not a flag. A flag is a flaw that repeats after it has been named.',
        fr: "Un défaut n'est pas un drapeau. Un drapeau, c'est un défaut qui se répète après avoir été nommé.",
        ar: 'العيب ليس راية. الراية عيبٌ يتكرّر بعد أن يُسمّى.',
        es: 'Un defecto no es una bandera. Una bandera es un defecto que se repite tras ser nombrado.',
      },
      {
        en: 'One or two rough edges is what people actually look like up close.',
        fr: "Une ou deux aspérités, c'est à ça que ressemblent vraiment les gens de près.",
        ar: 'حافّة أو اثنتان خشنتان — هكذا يبدو الناس فعلًا عن قرب.',
        es: 'Una o dos aristas es como se ven las personas de cerca.',
      },
      {
        en: 'Watch whether the small things get smaller over time, or quietly grow.',
        fr: 'Observe si les petites choses diminuent avec le temps, ou grandissent discrètement.',
        ar: 'راقب إن كانت الأمور الصغيرة تصغر مع الوقت، أم تكبر بهدوء.',
        es: 'Observa si las cosas pequeñas se encogen con el tiempo o crecen sin ruido.',
      },
      {
        en: 'Naming a small thing early is how it stays small.',
        fr: "Nommer tôt une petite chose, c'est ainsi qu'elle reste petite.",
        ar: 'تسمية الأمر الصغير مبكرًا هي ما يُبقيه صغيرًا.',
        es: 'Nombrar algo pequeño a tiempo es lo que lo mantiene pequeño.',
      },
      {
        en: 'How someone responds to being told is more informative than what they did.',
        fr: "La façon dont quelqu'un réagit quand on le lui dit en dit plus que ce qu'il a fait.",
        ar: 'كيف يستجيب المرء حين يُقال له، أكثر دلالةً مما فعله.',
        es: 'Cómo responde alguien cuando se le dice informa más que lo que hizo.',
      },
      {
        en: 'This reads like a person, not a pattern. Keep it that way by staying honest with them.',
        fr: "Cela ressemble à une personne, pas à un schéma. Garde-le ainsi en restant honnête avec elle.",
        ar: 'هذا يُقرأ كشخص، لا كنمط. أبقِه كذلك بالبقاء صادقًا معه.',
        es: 'Esto se lee como una persona, no como un patrón. Mantenlo así siendo honesto con ella.',
      },
    ],
    medium: [
      {
        en: 'Mixed signals are still signals. Ambiguity is information, not an absence of it.',
        fr: "Des signaux mitigés restent des signaux. L'ambiguïté est une information, pas son absence.",
        ar: 'الإشارات المختلطة تبقى إشارات. الغموض معلومة، لا غياب لها.',
        es: 'Las señales mixtas siguen siendo señales. La ambigüedad es información, no su ausencia.',
      },
      {
        en: 'The exhausting part of this tier is not the behaviour. It is the guessing.',
        fr: "Le plus épuisant à ce niveau n'est pas le comportement. Ce sont les suppositions.",
        ar: 'المُرهِق في هذه المرتبة ليس السلوك. بل التخمين.',
        es: 'Lo agotador de este nivel no es la conducta. Es adivinar.',
      },
      {
        en: 'Write down what you would need to see change. Then watch for three weeks.',
        fr: 'Note ce que tu aurais besoin de voir changer. Puis observe pendant trois semaines.',
        ar: 'دوّن ما تحتاج أن تراه يتغيّر. ثم راقب ثلاثة أسابيع.',
        es: 'Anota qué necesitarías ver cambiar. Luego observa durante tres semanas.',
      },
      {
        en: 'You are allowed to name a pattern out loud before you are certain of it.',
        fr: "Tu as le droit de nommer un schéma à voix haute avant d'en être certain.",
        ar: 'يحق لك أن تسمّي النمط بصوتٍ عالٍ قبل أن تتيقّن منه.',
        es: 'Tienes derecho a nombrar un patrón en voz alta antes de estar seguro.',
      },
      {
        en: 'Ask which of these you would accept forever. That question sorts most of them.',
        fr: "Demande-toi lesquels tu accepterais pour toujours. Cette question en règle la plupart.",
        ar: 'اسأل نفسك أيّها كنت ستقبله إلى الأبد. هذا السؤال يفرز معظمها.',
        es: 'Pregúntate cuáles aceptarías para siempre. Esa pregunta ordena casi todas.',
      },
      {
        en: 'Mixed does not mean doomed. It means this needs a real conversation, not a verdict.',
        fr: "Mitigé ne veut pas dire condamné. Cela veut dire qu'il faut une vraie conversation, pas un verdict.",
        ar: 'المختلط لا يعني المحكوم عليه. يعني أن الأمر يحتاج حوارًا حقيقيًّا، لا حُكمًا.',
        es: 'Mixto no significa condenado. Significa que esto necesita una conversación real, no un veredicto.',
      },
    ],
    high: [
      {
        en: 'You did not need this reading to know. You needed it to stop arguing with yourself.',
        fr: "Tu n'avais pas besoin de cette lecture pour savoir. Tu en avais besoin pour cesser de te contredire.",
        ar: 'لم تكن بحاجة إلى هذه القراءة لتعرف. كنت بحاجة إليها لتتوقف عن مجادلة نفسك.',
        es: 'No necesitabas esta lectura para saberlo. La necesitabas para dejar de discutir contigo.',
      },
      {
        en: 'A pattern is different from a bad day. Patterns keep their shape under pressure.',
        fr: "Un schéma est différent d'un mauvais jour. Les schémas gardent leur forme sous pression.",
        ar: 'النمط يختلف عن يومٍ سيئ. الأنماط تحتفظ بشكلها تحت الضغط.',
        es: 'Un patrón es distinto de un mal día. Los patrones mantienen su forma bajo presión.',
      },
      {
        en: 'This describes behaviour, not a person\'s worth — and behaviour is the only thing you can measure.',
        fr: "Ceci décrit un comportement, pas la valeur d'une personne — et le comportement est la seule chose mesurable.",
        ar: 'هذا يصف سلوكًا، لا قيمة إنسان — والسلوك هو الشيء الوحيد الذي يمكنك قياسه.',
        es: 'Esto describe conducta, no el valor de una persona — y la conducta es lo único medible.',
      },
      {
        en: 'You are the only person who knows the full context. This reading is a mirror, not an order.',
        fr: 'Tu es la seule personne à connaître tout le contexte. Cette lecture est un miroir, pas un ordre.',
        ar: 'أنت الوحيد الذي يعرف السياق كاملًا. هذه القراءة مرآة، لا أمر.',
        es: 'Eres la única persona que conoce todo el contexto. Esta lectura es un espejo, no una orden.',
      },
      {
        en: 'Tell one person you trust what came up here. Patterns lose power once they are spoken.',
        fr: "Parle de ce qui est ressorti ici à une personne de confiance. Les schémas perdent leur pouvoir une fois dits.",
        ar: 'أخبر شخصًا تثق به بما ظهر هنا. الأنماط تفقد قوّتها حين تُقال.',
        es: 'Cuéntale a alguien de confianza lo que salió aquí. Los patrones pierden fuerza al decirse.',
      },
      {
        en: 'If any of this ever stops feeling like a flag and starts feeling unsafe, please talk to someone you trust.',
        fr: "Si tout cela cesse un jour de ressembler à un drapeau et devient un sentiment d'insécurité, parles-en à une personne de confiance.",
        ar: 'إن توقّف هذا يومًا عن كونه راية وبدأ يشعرك بعدم الأمان، فتحدّث من فضلك إلى شخصٍ تثق به.',
        es: 'Si algo de esto deja de sentirse como una bandera y empieza a sentirse inseguro, habla con alguien de confianza.',
      },
    ],
  },
};
