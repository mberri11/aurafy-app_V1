import { CountResults } from '../../types';

/**
 * who_admires read in SOLO mode → "signs of quiet admiration" count about ONE person.
 * POSITIVE polarity, intuition-flavored voice (glances, remembered details, the almost-
 * said). `none` deflates gently — it corrects a hopeful projection without mocking it.
 * High tier adapts the module's multi pools.
 */
export const whoAdmiresCountResults: CountResults = {
  tiers: {
    none: {
      en: "The signs of admiration aren't showing — what you're reading may be politeness, not pull.",
      fr: "Les signes d'admiration ne se montrent pas — ce que tu lis est peut-être de la politesse, pas de l'attirance.",
      ar: 'علامات الإعجاب لا تظهر — ما تقرؤه قد يكون مجاملةً لا انجذاباً.',
      es: 'Las señales de admiración no aparecen — lo que estás leyendo puede ser cortesía, no atracción.',
    },
    low: {
      en: 'A few warm glances, but the attention is casual — friendly regard, not quiet admiration.',
      fr: "Quelques regards chaleureux, mais l'attention reste légère — de la sympathie, pas une admiration silencieuse.",
      ar: 'نظرات دافئة قليلة، لكن الانتباه عابر — مودّة ودّية، لا إعجاب صامت.',
      es: 'Algunas miradas cálidas, pero la atención es casual — simpatía amistosa, no admiración callada.',
    },
    medium: {
      en: "{name}'s warmth keeps slipping out — admiration is forming behind the composure.",
      fr: 'La chaleur de {name} continue de transparaître — une admiration se forme derrière la retenue.',
      ar: 'دفء {name} يتسرّب باستمرار — إعجاب يتشكّل خلف رباطة الجأش.',
      es: 'La calidez de {name} se sigue escapando — una admiración se forma detrás de la compostura.',
    },
    high: {
      en: '{name} admires you far more than they let on — the signs are everywhere.',
      fr: "{name} t'admire bien plus qu'il ne le laisse paraître — les signes sont partout.",
      ar: '{name} يُعجب بك أكثر بكثير مما يُظهر — العلامات في كل مكان.',
      es: '{name} te admira mucho más de lo que deja ver — las señales están por todas partes.',
    },
  },
  shareLines: {
    none: {
      en: 'I stopped reading meaning into politeness. Growth.',
      fr: "J'ai arrêté de chercher du sens dans la politesse. Une évolution.",
      ar: 'توقفت عن قراءة المعاني في المجاملة. نضج.',
      es: 'Dejé de buscarle significado a la cortesía. Crecimiento.',
    },
    low: {
      en: 'Friendly is a temperature, not a signal.',
      fr: "Amical, c'est une température, pas un signal.",
      ar: 'الودّ درجة حرارة، لا إشارة.',
      es: 'Lo amistoso es una temperatura, no una señal.',
    },
    medium: {
      en: 'Something keeps slipping past their poker face.',
      fr: 'Quelque chose continue de percer leur visage impassible.',
      ar: 'شيء ما يفلت باستمرار من وجههم المتحفّظ.',
      es: 'Algo se sigue escapando de su cara de póker.',
    },
    high: {
      en: "Someone watches you like you're the answer.",
      fr: "Quelqu'un te regarde comme si tu étais la réponse.",
      ar: 'أحدهم يراقبك وكأنك الجواب.',
      es: 'Alguien te mira como si fueras la respuesta.',
    },
  },
  insights: {
    none: [
      {
        en: 'The admiration markers just did not appear — kindness spread evenly to everyone is character, not a signal.',
        fr: "Les marqueurs d'admiration ne sont tout simplement pas apparus — une gentillesse répartie également entre tous est un trait de caractère, pas un signal.",
        ar: 'علامات الإعجاب لم تظهر ببساطة — اللطف الموزَّع بالتساوي على الجميع طبعٌ، لا إشارة.',
        es: 'Los marcadores de admiración simplemente no aparecieron — la amabilidad repartida por igual a todos es carácter, no una señal.',
      },
      {
        en: 'Hope is a lens — it makes neutral moments look meaningful. This count is the picture without the lens.',
        fr: "L'espoir est une lentille — il rend les moments neutres significatifs. Ce compte est l'image sans la lentille.",
        ar: 'الأمل عدسة — يجعل اللحظات المحايدة تبدو ذات معنى. هذا العدّ هو الصورة بلا عدسة.',
        es: 'La esperanza es un lente — hace que los momentos neutros parezcan significativos. Este conteo es la imagen sin el lente.',
      },
      {
        en: 'No admiration detected says nothing about whether you are admirable — one person is a sample of one.',
        fr: "Aucune admiration détectée ne dit rien sur ta valeur admirable — une personne est un échantillon d'un.",
        ar: 'عدم رصد إعجاب لا يقول شيئاً عن كونك جديراً بالإعجاب — شخص واحد عيّنة من واحد.',
        es: 'Que no se detecte admiración no dice nada sobre si eres admirable — una persona es una muestra de uno.',
      },
      {
        en: 'The attention you were hoping for exists — this reading just says to stop looking for it at this address.',
        fr: "L'attention que tu espérais existe — cette lecture dit seulement d'arrêter de la chercher à cette adresse.",
        ar: 'الانتباه الذي كنت تأمله موجود — هذه القراءة تقول فقط: كفّ عن البحث عنه في هذا العنوان.',
        es: 'La atención que esperabas existe — esta lectura solo dice que dejes de buscarla en esta dirección.',
      },
      {
        en: 'Notice who already gives you the attention you were hunting for here — it is usually someone overlooked.',
        fr: "Remarque qui te donne déjà l'attention que tu cherchais ici — c'est souvent quelqu'un que tu négliges.",
        ar: 'لاحظ من يمنحك أصلاً الانتباه الذي كنت تطارده هنا — غالباً هو شخص تتجاهله.',
        es: 'Fíjate en quién ya te da la atención que buscabas aquí — suele ser alguien que pasas por alto.',
      },
      {
        en: 'Wanting to be seen is human. Just aim it at eyes that are actually looking.',
        fr: "Vouloir être vu est humain. Vise simplement des yeux qui regardent vraiment.",
        ar: 'الرغبة في أن تُرى إنسانية. فقط وجّهها نحو عيونٍ تنظر فعلاً.',
        es: 'Querer ser visto es humano. Solo apúntalo a ojos que de verdad estén mirando.',
      },
    ],
    low: [
      {
        en: 'A few genuine moments landed — but scattered warmth is friendliness doing its normal job.',
        fr: 'Quelques moments sincères ont eu lieu — mais une chaleur éparse, c\'est la sympathie qui fait son travail normal.',
        ar: 'حدثت لحظات صادقة قليلة — لكن الدفء المتفرّق هو الودّ يقوم بعمله المعتاد.',
        es: 'Hubo algunos momentos genuinos — pero la calidez dispersa es la simpatía haciendo su trabajo normal.',
      },
      {
        en: 'Real admiration repeats itself and aims at you specifically — this pattern does neither yet.',
        fr: "La vraie admiration se répète et te vise spécifiquement — ce schéma ne fait encore ni l'un ni l'autre.",
        ar: 'الإعجاب الحقيقي يتكرر ويستهدفك تحديداً — وهذا النمط لا يفعل أيّاً منهما بعد.',
        es: 'La admiración real se repite y apunta a ti específicamente — este patrón aún no hace ninguna de las dos.',
      },
      {
        en: 'Do not replay one warm glance until it becomes a story — a glance is a moment, not a message.',
        fr: "Ne rejoue pas un regard chaleureux jusqu'à en faire une histoire — un regard est un moment, pas un message.",
        ar: 'لا تُعِد تشغيل نظرة دافئة واحدة حتى تصبح قصة — النظرة لحظة، لا رسالة.',
        es: 'No repitas una mirada cálida hasta volverla una historia — una mirada es un momento, no un mensaje.',
      },
      {
        en: 'The test of quiet admiration is memory: do they keep the small details you mention? Watch that.',
        fr: "Le test de l'admiration silencieuse, c'est la mémoire : retiennent-ils les petits détails que tu mentionnes ? Observe ça.",
        ar: 'اختبار الإعجاب الصامت هو الذاكرة: هل يحفظون التفاصيل الصغيرة التي تذكرها؟ راقب ذلك.',
        es: 'La prueba de la admiración callada es la memoria: ¿guardan los pequeños detalles que mencionas? Observa eso.',
      },
      {
        en: 'You can enjoy their friendliness for exactly what it is — not everything needs to become more.',
        fr: "Tu peux apprécier leur sympathie pour exactement ce qu'elle est — tout n'a pas besoin de devenir plus.",
        ar: 'يمكنك الاستمتاع بودّهم كما هو تماماً — ليس كل شيء يحتاج أن يصبح أكثر.',
        es: 'Puedes disfrutar su simpatía por exactamente lo que es — no todo necesita convertirse en más.',
      },
      {
        en: 'If the attention grows, it will grow visibly — quiet admiration never stays this quiet for long.',
        fr: "Si l'attention grandit, elle grandira visiblement — une admiration silencieuse ne reste jamais si discrète longtemps.",
        ar: 'إن نما الانتباه فسينمو ظاهراً — الإعجاب الصامت لا يبقى بهذا الصمت طويلاً.',
        es: 'Si la atención crece, crecerá visiblemente — la admiración callada nunca se queda tan callada por mucho tiempo.',
      },
    ],
    medium: [
      {
        en: 'Warmth that only shows around one person is rarely an accident — and it keeps showing around you.',
        fr: "Une chaleur qui n'apparaît qu'auprès d'une seule personne est rarement un hasard — et elle continue d'apparaître auprès de toi.",
        ar: 'الدفء الذي يظهر بقرب شخص واحد فقط نادراً ما يكون مصادفة — وهو يستمر في الظهور بقربك.',
        es: 'La calidez que solo aparece junto a una persona rara vez es casualidad — y sigue apareciendo junto a ti.',
      },
      {
        en: 'They remember more about you than the friendship strictly requires — that surplus is the signal.',
        fr: "Ils se souviennent de plus de choses sur toi que l'amitié ne l'exige — ce surplus est le signal.",
        ar: 'يتذكرون عنك أكثر مما تتطلبه الصداقة بدقة — هذا الفائض هو الإشارة.',
        es: 'Recuerdan más sobre ti de lo que la amistad estrictamente exige — ese excedente es la señal.',
      },
      {
        en: 'The admiration is real but still deciding whether to be known — do not force the reveal.',
        fr: "L'admiration est réelle mais hésite encore à se faire connaître — ne force pas la révélation.",
        ar: 'الإعجاب حقيقي لكنه ما زال يقرر هل يُعلن نفسه — لا تُجبر الكشف.',
        es: 'La admiración es real pero aún decide si darse a conocer — no fuerces la revelación.',
      },
      {
        en: 'Watch the small sacrifices — staying later, going out of their way. Effort is admiration made visible.',
        fr: "Observe les petits sacrifices — rester plus tard, faire un détour. L'effort est de l'admiration rendue visible.",
        ar: 'راقب التضحيات الصغيرة — البقاء أطول، تكبّد العناء لأجلك. الجهد إعجابٌ صار مرئياً.',
        es: 'Observa los pequeños sacrificios — quedarse más tarde, desviarse por ti. El esfuerzo es admiración hecha visible.',
      },
      {
        en: 'If you enjoy their attention, make room for it — half-open doors decide most almost-stories.',
        fr: "Si leur attention te plaît, fais-lui de la place — les portes entrouvertes décident de la plupart des presque-histoires.",
        ar: 'إن كان انتباههم يروق لك، فأفسح له مكاناً — الأبواب نصف المفتوحة تحسم معظم القصص شبه المكتملة.',
        es: 'Si su atención te gusta, hazle espacio — las puertas entreabiertas deciden la mayoría de las casi-historias.',
      },
      {
        en: 'Composure is not absence of feeling — some people admire most carefully when it matters most.',
        fr: "La retenue n'est pas l'absence de sentiment — certains admirent avec le plus de précaution quand cela compte le plus.",
        ar: 'رباطة الجأش ليست غياب الشعور — بعض الناس يُعجبون بأشد حذر حين يكون الأمر أهم.',
        es: 'La compostura no es ausencia de sentimiento — algunos admiran con más cuidado justo cuando más importa.',
      },
    ],
    high: [
      {
        en: 'People remember what they treasure — and they remember everything about you.',
        fr: "On se souvient de ce que l'on chérit — et il se souvient de tout à ton sujet.",
        ar: 'يتذكر المرء ما يثمّنه — وهو يتذكر كل شيء عنك.',
        es: 'La gente recuerda lo que atesora — y esa persona recuerda todo sobre ti.',
      },
      {
        en: 'Attention is the most honest form of admiration, and theirs keeps finding you.',
        fr: "L'attention est la forme la plus honnête d'admiration, et la sienne te retrouve sans cesse.",
        ar: 'الانتباه هو أصدق أشكال الإعجاب، وانتباهه يجدك مراراً.',
        es: 'La atención es la forma más honesta de admiración, y la suya te sigue encontrando.',
      },
      {
        en: 'They save a softer version of themselves just for you.',
        fr: 'Il garde une version plus douce de lui-même rien que pour toi.',
        ar: 'يحتفظ بنسخة ألطف من نفسه لك وحدك.',
        es: 'Guarda una versión más suave de sí mismo solo para ti.',
      },
      {
        en: "They defend you, help you, and root for you — that's the tell.",
        fr: "Il te défend, t'aide et te soutient — c'est le signe.",
        ar: 'يدافع عنك ويساعدك ويشجعك — تلك هي العلامة.',
        es: 'Te defiende, te ayuda y te apoya — esa es la señal.',
      },
      {
        en: "A gaze held a second too long is a sentence they haven't found the courage for.",
        fr: "Un regard soutenu une seconde de trop est une phrase pour laquelle il n'a pas trouvé le courage.",
        ar: 'نظرة تطول ثانية زائدة هي جملة لم يجد الشجاعة لقولها.',
        es: 'Una mirada sostenida un segundo de más es una frase para la que no ha encontrado el valor.',
      },
      {
        en: "They stay a little longer, hoping you'll notice — so notice.",
        fr: "Il s'attarde un peu plus, espérant que tu le remarques — alors remarque-le.",
        ar: 'يبقى أطول قليلاً آملاً أن تلاحظ — فلاحظ.',
        es: 'Se queda un poco más, esperando que lo notes — así que nótalo.',
      },
    ],
  },
};
