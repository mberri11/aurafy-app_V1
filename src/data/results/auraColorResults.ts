import { CategoricalResults } from '../../types';

// ─────────────────────────────────────────────────────────────────────────────
// AURA COLOR — categorical results (`CategoricalResults`, src/types/index.ts —
// the rendering contract lives on the interface). 8 categories × (label,
// verdict, whatThisMeans, shareLine) + edgeTemplate + 6 insights per category.
// black + white joined in the 8-color expansion (2026-07-16).
// ─────────────────────────────────────────────────────────────────────────────

export const auraColorResults: CategoricalResults = {
  edgeTemplate: {
    en: 'with a {edge} edge',
    fr: 'avec une nuance {edge}',
    ar: 'بلمسة من {edge}',
    es: 'con un matiz {edge}',
  },

  categories: {
    violet: {
      label: { en: 'Violet', fr: 'Violet', ar: 'البنفسجي', es: 'Violeta' },
      verdict: {
        en: 'Your aura glows violet — the color of the mystic.',
        fr: 'Ton aura rayonne violet — la couleur du mystique.',
        ar: 'هالتك تتوهّج بالبنفسجي — لون العارف الغامض.',
        es: 'Tu aura brilla violeta: el color del místico.',
      },
      whatThisMeans: {
        en: 'You live one layer beneath the surface of things. You read rooms, sense what people hide, and carry an inner world most will never be invited into. Your intuition is not a mood — it is an instrument, and it is rarely wrong. Your work is trusting it out loud.',
        fr: 'Tu vis une couche sous la surface des choses. Tu lis les pièces, tu sens ce que les gens cachent, et tu portes un monde intérieur où peu seront invités. Ton intuition n\'est pas une humeur — c\'est un instrument, et il se trompe rarement. Ton travail est de lui faire confiance à voix haute.',
        ar: 'أنت تعيش طبقة تحت سطح الأشياء. تقرأ الأماكن، وتشعر بما يخفيه الناس، وتحمل عالمًا داخليًا لن يُدعى إليه إلا القليل. حدسك ليس مزاجًا عابرًا — بل أداة، ونادرًا ما يخطئ. مهمتك أن تثق به بصوت عالٍ.',
        es: 'Vives una capa por debajo de la superficie de las cosas. Lees las salas, percibes lo que la gente esconde y llevas un mundo interior al que pocos serán invitados. Tu intuición no es un estado de ánimo: es un instrumento, y rara vez se equivoca. Tu trabajo es confiar en ella en voz alta.',
      },
      shareLine: {
        en: 'My aura is violet. I see what you don\'t say.',
        fr: 'Mon aura est violette. Je vois ce que tu ne dis pas.',
        ar: 'هالتي بنفسجية — أرى ما لا تقوله.',
        es: 'Mi aura es violeta. Veo lo que no dices.',
      },
    },
    blue: {
      label: { en: 'Blue', fr: 'Bleu', ar: 'الأزرق', es: 'Azul' },
      verdict: {
        en: 'Your aura glows blue — the color of calm truth.',
        fr: 'Ton aura rayonne bleu — la couleur de la vérité calme.',
        ar: 'هالتك تتوهّج بالأزرق — لون الحقيقة الهادئة.',
        es: 'Tu aura brilla azul: el color de la verdad serena.',
      },
      whatThisMeans: {
        en: 'You are the still point in other people\'s storms. Where others perform, you simply say the true thing — once, calmly — and let it stand. People come to you when it matters because your word holds weight. Guard the ocean under your calm: still water is not empty water.',
        fr: 'Tu es le point fixe dans les tempêtes des autres. Là où d\'autres jouent un rôle, tu dis simplement la chose vraie — une fois, calmement — et tu la laisses tenir. On vient te voir quand c\'est important, parce que ta parole a du poids. Protège l\'océan sous ton calme : une eau calme n\'est pas une eau vide.',
        ar: 'أنت النقطة الساكنة في عواصف الآخرين. حيث يتصنّع الآخرون، تقول أنت الحقيقة ببساطة — مرة واحدة وبهدوء — وتتركها تثبت. يلجأ إليك الناس حين يهمّ الأمر لأن لكلمتك وزنًا. احرس المحيط الذي تحت هدوئك: الماء الساكن ليس ماءً فارغًا.',
        es: 'Eres el punto fijo en las tormentas de los demás. Donde otros actúan, tú simplemente dices lo verdadero —una vez, con calma— y lo dejas en pie. La gente acude a ti cuando importa porque tu palabra tiene peso. Cuida el océano bajo tu calma: el agua quieta no es agua vacía.',
      },
      shareLine: {
        en: 'Blue aura — calm outside, ocean inside.',
        fr: 'Aura bleue — calme dehors, océan dedans.',
        ar: 'هالة زرقاء — هدوء في الخارج ومحيط في الداخل.',
        es: 'Aura azul: calma por fuera, océano por dentro.',
      },
    },
    green: {
      label: { en: 'Green', fr: 'Vert', ar: 'الأخضر', es: 'Verde' },
      verdict: {
        en: 'Your aura glows green — the color of the healer.',
        fr: 'Ton aura rayonne vert — la couleur du guérisseur.',
        ar: 'هالتك تتوهّج بالأخضر — لون المُعالِج.',
        es: 'Tu aura brilla verde: el color del sanador.',
      },
      whatThisMeans: {
        en: 'Things grow around you — people, projects, wounds turning into scars. You notice what others need before they say it, and broken things instinctively find their way to your hands. It is a rare gift with one rule attached: the healer\'s energy is not infinite, and you count too.',
        fr: 'Les choses grandissent autour de toi — les gens, les projets, les blessures qui deviennent des cicatrices. Tu remarques ce dont les autres ont besoin avant qu\'ils le disent, et ce qui est cassé trouve instinctivement le chemin de tes mains. C\'est un don rare avec une seule règle : l\'énergie du guérisseur n\'est pas infinie, et tu comptes aussi.',
        ar: 'الأشياء تنمو من حولك — الناس والمشاريع والجروح التي تتحوّل إلى ندوب. تلاحظ ما يحتاجه الآخرون قبل أن ينطقوا به، والأشياء المكسورة تجد طريقها إلى يديك غريزيًا. إنها موهبة نادرة بشرط واحد: طاقة المُعالِج ليست بلا حدود، وأنت أيضًا تستحق الرعاية.',
        es: 'Las cosas crecen a tu alrededor: personas, proyectos, heridas que se vuelven cicatrices. Notas lo que otros necesitan antes de que lo digan, y lo roto encuentra instintivamente el camino a tus manos. Es un don raro con una sola regla: la energía del sanador no es infinita, y tú también cuentas.',
      },
      shareLine: {
        en: 'Green aura. I heal people who never ask about my wounds.',
        fr: 'Aura verte. Je guéris des gens qui ne demandent jamais rien de mes blessures.',
        ar: 'هالة خضراء — أشفي أناسًا لا يسألون عن جروحي أبدًا.',
        es: 'Aura verde. Sano a gente que nunca pregunta por mis heridas.',
      },
    },
    gold: {
      label: { en: 'Gold', fr: 'Or', ar: 'الذهبي', es: 'Dorado' },
      verdict: {
        en: 'Your aura glows gold — the color of the radiant.',
        fr: 'Ton aura rayonne or — la couleur du rayonnant.',
        ar: 'هالتك تتوهّج بالذهبي — لون المتألّق.',
        es: 'Tu aura brilla dorada: el color del radiante.',
      },
      whatThisMeans: {
        en: 'You are the reason rooms feel lighter. Joy is not something you chase — it is something you generate, and people orbit it without knowing why. Your optimism is not naivety; it is a decision you keep making. Just remember the sun is allowed cloudy days too.',
        fr: 'Tu es la raison pour laquelle les pièces semblent plus légères. La joie n\'est pas quelque chose que tu poursuis — c\'est quelque chose que tu génères, et les gens gravitent autour sans savoir pourquoi. Ton optimisme n\'est pas de la naïveté ; c\'est une décision que tu continues de prendre. Souviens-toi seulement que le soleil a droit à ses jours nuageux.',
        ar: 'أنت السبب في أن الأماكن تبدو أخفّ. الفرح ليس شيئًا تطارده — بل شيء تولّده، والناس يدورون حوله دون أن يعرفوا السبب. تفاؤلك ليس سذاجة؛ بل قرار تتخذه كل يوم من جديد. فقط تذكّر أن للشمس أيضًا حقّها في أيام غائمة.',
        es: 'Eres la razón por la que las salas se sienten más ligeras. La alegría no es algo que persigues: es algo que generas, y la gente orbita a su alrededor sin saber por qué. Tu optimismo no es ingenuidad; es una decisión que sigues tomando. Solo recuerda que al sol también se le permiten días nublados.',
      },
      shareLine: {
        en: 'Gold aura — I don\'t enter rooms, I light them.',
        fr: 'Aura dorée — je n\'entre pas dans les pièces, je les éclaire.',
        ar: 'هالة ذهبية — أنا لا أدخل الأماكن، بل أضيئها.',
        es: 'Aura dorada: no entro en las salas, las ilumino.',
      },
    },
    red: {
      label: { en: 'Red', fr: 'Rouge', ar: 'الأحمر', es: 'Rojo' },
      verdict: {
        en: 'Your aura glows red — the color of the flame.',
        fr: 'Ton aura rayonne rouge — la couleur de la flamme.',
        ar: 'هالتك تتوهّج بالأحمر — لون الشعلة.',
        es: 'Tu aura brilla roja: el color de la llama.',
      },
      whatThisMeans: {
        en: 'You run on fire — desire, drive, courage that other people borrow just by standing near you. You say the hard thing, take the leap, protect what\'s yours without apology. The flame\'s only enemy is what it burns by accident. Aimed, your intensity builds empires. Unaimed, it scorches the people closest to it.',
        fr: 'Tu carbures au feu — désir, élan, un courage que les autres empruntent rien qu\'en se tenant près de toi. Tu dis la chose difficile, tu sautes, tu protèges ce qui est à toi sans t\'excuser. Le seul ennemi de la flamme est ce qu\'elle brûle par accident. Dirigée, ton intensité bâtit des empires. Sans direction, elle brûle ceux qui en sont le plus proches.',
        ar: 'أنت تعمل بالنار — رغبة واندفاع وشجاعة يستعيرها الآخرون بمجرد وقوفهم قربك. تقول الكلمة الصعبة، وتقفز القفزة، وتحمي ما هو لك دون اعتذار. عدوّ الشعلة الوحيد هو ما تحرقه دون قصد. حين توجَّه، تبني شدّتك إمبراطوريات. وحين تُترك بلا وجهة، تلسع أقرب الناس إليها.',
        es: 'Funcionas con fuego: deseo, empuje, un coraje que otros toman prestado con solo estar cerca de ti. Dices lo difícil, das el salto, proteges lo tuyo sin disculparte. El único enemigo de la llama es lo que quema por accidente. Dirigida, tu intensidad construye imperios. Sin dirección, quema a los más cercanos.',
      },
      shareLine: {
        en: 'Red aura. I don\'t do lukewarm.',
        fr: 'Aura rouge. Je ne fais pas dans le tiède.',
        ar: 'هالة حمراء — أنا لا أعرف أنصاف المشاعر.',
        es: 'Aura roja. No sé de tibiezas.',
      },
    },
    rose: {
      label: { en: 'Rose', fr: 'Rose', ar: 'الوردي', es: 'Rosa' },
      verdict: {
        en: 'Your aura glows rose — the color of the soft heart.',
        fr: 'Ton aura rayonne rose — la couleur du cœur tendre.',
        ar: 'هالتك تتوهّج بالوردي — لون القلب الرقيق.',
        es: 'Tu aura brilla rosa: el color del corazón tierno.',
      },
      whatThisMeans: {
        en: 'You love the way most people only pretend to — fully, tenderly, without keeping score. People feel safer in your presence and rarely understand why. In a world that calls softness weakness, yours is the rarest kind of strength. Just make sure the love you pour outward has a way back to you.',
        fr: 'Tu aimes comme la plupart des gens font seulement semblant d\'aimer — pleinement, tendrement, sans compter. Les gens se sentent plus en sécurité en ta présence et comprennent rarement pourquoi. Dans un monde qui appelle la douceur une faiblesse, la tienne est la forme de force la plus rare. Assure-toi seulement que l\'amour que tu verses vers les autres ait un chemin de retour vers toi.',
        ar: 'أنت تحب كما يتظاهر معظم الناس بالحب فقط — بالكامل وبحنان ودون حساب. يشعر الناس بأمان أكبر في حضورك ونادرًا ما يفهمون السبب. في عالم يسمّي الرقّة ضعفًا، رقّتك هي أندر أنواع القوة. فقط تأكّد أن للحب الذي تسكبه على الآخرين طريقًا يعود به إليك.',
        es: 'Amas como la mayoría solo finge amar: por completo, con ternura, sin llevar la cuenta. La gente se siente más segura en tu presencia y rara vez entiende por qué. En un mundo que llama debilidad a la suavidad, la tuya es la forma más rara de fuerza. Solo asegúrate de que el amor que viertes hacia fuera tenga un camino de vuelta hacia ti.',
      },
      shareLine: {
        en: 'Rose aura — I love harder than I admit.',
        fr: 'Aura rose — j\'aime plus fort que je ne l\'avoue.',
        ar: 'هالة وردية — أحبّ أكثر مما أعترف.',
        es: 'Aura rosa: amo más fuerte de lo que admito.',
      },
    },
    // 8-color expansion (2026-07-16): black = the keeper (grounded mystery, protection,
    // boundaries, magnetism — premium register, never doom); white = the clear light
    // (clarity, renewal, openness, luminous calm).
    black: {
      label: { en: 'Black', fr: 'Noir', ar: 'الأسود', es: 'Negro' },
      verdict: {
        en: 'Your aura glows black — the color of the keeper.',
        fr: 'Ton aura rayonne noir — la couleur du gardien.',
        ar: 'هالتك تتوهّج بالأسود — لون الحارس.',
        es: 'Tu aura brilla negra: el color del guardián.',
      },
      whatThisMeans: {
        en: 'Your energy doesn\'t chase — it holds. You move through the world with edges people can feel and never cross uninvited, and that quiet sovereignty is exactly what pulls them closer. Your depth is not a wall; it is a vault, and entry is earned. Just remember: a door only you can open should still open sometimes.',
        fr: 'Ton énergie ne poursuit pas — elle tient. Tu traverses le monde avec des contours que les gens sentent et ne franchissent jamais sans y être invités, et c\'est précisément cette souveraineté tranquille qui les attire plus près. Ta profondeur n\'est pas un mur ; c\'est un coffre-fort, et l\'entrée se mérite. Souviens-toi seulement : une porte que toi seul peux ouvrir doit quand même s\'ouvrir parfois.',
        ar: 'طاقتك لا تلاحق أحدًا — بل تُمسك بثبات. تمضي في العالم بحدود يشعر بها الناس ولا يتجاوزونها دون دعوة، وهذه السيادة الهادئة هي بالضبط ما يجذبهم إليك أكثر. عمقك ليس جدارًا؛ بل خزينة، ودخولها يُستحق. فقط تذكّر: الباب الذي لا يفتحه أحد سواك ينبغي أن يُفتح أحيانًا.',
        es: 'Tu energía no persigue: sostiene. Te mueves por el mundo con bordes que la gente siente y nunca cruza sin invitación, y esa soberanía silenciosa es exactamente lo que los acerca más. Tu profundidad no es un muro; es una bóveda, y la entrada se gana. Solo recuerda: una puerta que solo tú puedes abrir también debería abrirse a veces.',
      },
      shareLine: {
        en: 'Black aura. You don\'t get in — you get invited.',
        fr: 'Aura noire. On n\'entre pas — on est invité.',
        ar: 'هالة سوداء — لا أحد يدخل، بل يُدعى.',
        es: 'Aura negra. No se entra: se es invitado.',
      },
    },
    white: {
      label: { en: 'White', fr: 'Blanc', ar: 'الأبيض', es: 'Blanco' },
      verdict: {
        en: 'Your aura glows white — the color of the clear light.',
        fr: 'Ton aura rayonne blanc — la couleur de la lumière claire.',
        ar: 'هالتك تتوهّج بالأبيض — لون النور الصافي.',
        es: 'Tu aura brilla blanca: el color de la luz clara.',
      },
      whatThisMeans: {
        en: 'You carry the rarest kind of energy: room to breathe. Where others bring noise, you bring a cleared table — no agenda, no residue, no yesterday dragged into today. People think clearly around you because you refuse to cloud things, and they start over around you because you genuinely believe they can. Guard that clarity: an open sky is a gift, not a vacancy.',
        fr: 'Tu portes l\'énergie la plus rare qui soit : de l\'espace pour respirer. Là où d\'autres apportent du bruit, tu apportes une table dégagée — sans agenda, sans résidu, sans hier traîné dans aujourd\'hui. Les gens pensent clairement près de toi parce que tu refuses de troubler les choses, et ils repartent de zéro près de toi parce que tu crois sincèrement qu\'ils le peuvent. Protège cette clarté : un ciel ouvert est un don, pas un vide.',
        ar: 'تحمل أندر أنواع الطاقة: مساحة للتنفّس. حيث يجلب الآخرون الضجيج، تجلب أنت مائدة نظيفة — بلا نوايا خفية، بلا رواسب، بلا أمسٍ يُجرّ إلى اليوم. يفكّر الناس بوضوح قربك لأنك ترفض تعكير الأشياء، ويبدأون من جديد قربك لأنك تؤمن حقًا بأنهم قادرون. احرس هذا الصفاء: السماء المفتوحة هبة، لا فراغ.',
        es: 'Llevas la energía más rara que existe: espacio para respirar. Donde otros traen ruido, tú traes una mesa despejada: sin agenda, sin residuos, sin un ayer arrastrado al hoy. La gente piensa con claridad a tu lado porque te niegas a enturbiar las cosas, y empieza de nuevo a tu lado porque crees de verdad que puede. Cuida esa claridad: un cielo abierto es un don, no un vacío.',
      },
      shareLine: {
        en: 'White aura — I don\'t carry yesterday into today.',
        fr: 'Aura blanche — je ne traîne pas hier dans aujourd\'hui.',
        ar: 'هالة بيضاء — لا أحمل الأمس إلى اليوم.',
        es: 'Aura blanca: no cargo el ayer en el hoy.',
      },
    },
  },

  insights: {
    violet: [
      { en: 'You have exits from every conversation that lead straight into your inner world — most people never notice you leave.', fr: 'Tu as des sorties dans chaque conversation qui mènent droit à ton monde intérieur — la plupart des gens ne remarquent jamais ton départ.', ar: 'لديك مخارج في كل حديث تقودك مباشرة إلى عالمك الداخلي — ومعظم الناس لا يلاحظون رحيلك أبدًا.', es: 'Tienes salidas en cada conversación que llevan directo a tu mundo interior; la mayoría nunca nota que te fuiste.' },
      { en: 'Your first read on people is almost always right — it\'s the second-guessing that gets you in trouble.', fr: 'Ta première lecture des gens est presque toujours juste — c\'est le doute qui vient après qui te met en difficulté.', ar: 'قراءتك الأولى للناس صحيحة في الغالب — الشك الذي يأتي بعدها هو ما يوقعك في المتاعب.', es: 'Tu primera lectura de la gente casi siempre acierta; es dudar de ella lo que te mete en problemas.' },
      { en: 'You collect other people\'s secrets like they weigh nothing. They don\'t — set some down sometimes.', fr: 'Tu collectionnes les secrets des autres comme s\'ils ne pesaient rien. Ils pèsent — pose-en parfois quelques-uns.', ar: 'تجمع أسرار الآخرين وكأنها بلا وزن. لكنها ثقيلة — ضع بعضها أرضًا أحيانًا.', es: 'Coleccionas secretos ajenos como si no pesaran. Pesan: suelta algunos de vez en cuando.' },
      { en: 'Being understood matters more to you than being liked — which is why so few people get all the way in.', fr: 'Être compris compte plus pour toi qu\'être aimé — c\'est pourquoi si peu de gens entrent jusqu\'au bout.', ar: 'أن تُفهم أهم عندك من أن تُحَب — ولهذا لا يصل إلى أعماقك إلا القليل.', es: 'Ser comprendido te importa más que caer bien; por eso tan pocos llegan hasta el fondo.' },
      { en: 'Your silence in a group is never empty — it\'s the sound of you reading everyone at once.', fr: 'Ton silence en groupe n\'est jamais vide — c\'est le bruit que tu fais en lisant tout le monde à la fois.', ar: 'صمتك وسط الجماعة ليس فراغًا أبدًا — إنه صوتك وأنت تقرأ الجميع في آن واحد.', es: 'Tu silencio en un grupo nunca está vacío: es el sonido de ti leyendo a todos a la vez.' },
      { en: 'The mystery people sense around you is real — but even mystics need one person who knows the whole map.', fr: 'Le mystère que les gens sentent autour de toi est réel — mais même les mystiques ont besoin d\'une personne qui connaît toute la carte.', ar: 'الغموض الذي يشعر به الناس حولك حقيقي — لكن حتى العارفين يحتاجون شخصًا واحدًا يعرف الخريطة كاملة.', es: 'El misterio que la gente siente a tu alrededor es real, pero hasta los místicos necesitan a una persona que conozca el mapa completo.' },
    ],
    blue: [
      { en: 'People mistake your calm for indifference. It\'s the opposite — you care enough to stay steady.', fr: 'Les gens confondent ton calme avec de l\'indifférence. C\'est l\'inverse — tu tiens assez aux choses pour rester stable.', ar: 'يخلط الناس بين هدوئك واللامبالاة. والحقيقة عكس ذلك — أنت تهتم بما يكفي لتبقى ثابتًا.', es: 'La gente confunde tu calma con indiferencia. Es lo contrario: te importa lo suficiente como para mantenerte firme.' },
      { en: 'You would rather lose someone with the truth than keep them with a lie — and it has cost you, and it was worth it.', fr: 'Tu préfères perdre quelqu\'un avec la vérité que le garder avec un mensonge — ça t\'a coûté, et ça en valait la peine.', ar: 'تفضّل أن تخسر شخصًا بالحقيقة على أن تُبقيه بكذبة — وقد كلّفك ذلك، وكان يستحق.', es: 'Prefieres perder a alguien con la verdad que retenerlo con una mentira; te ha costado, y valió la pena.' },
      { en: 'Your advice lands because you only give it when it\'s asked for — keep that rule.', fr: 'Tes conseils touchent juste parce que tu ne les donnes que lorsqu\'on te les demande — garde cette règle.', ar: 'نصيحتك تصيب لأنك لا تمنحها إلا حين تُطلب — حافظ على هذه القاعدة.', es: 'Tus consejos aciertan porque solo los das cuando te los piden: conserva esa regla.' },
      { en: 'Being everyone\'s still point is an honor and a tax. Find the person who steadies YOU.', fr: 'Être le point fixe de tout le monde est un honneur et un impôt. Trouve la personne qui TE stabilise.', ar: 'أن تكون نقطة الثبات للجميع شرفٌ وضريبة معًا. ابحث عن الشخص الذي يثبّتك أنت.', es: 'Ser el punto fijo de todos es un honor y un impuesto. Encuentra a la persona que te estabilice a TI.' },
      { en: 'You process feelings slowly and speak them precisely — never apologize for taking the long road to the right words.', fr: 'Tu digères les émotions lentement et tu les dis avec précision — ne t\'excuse jamais de prendre le chemin long vers les mots justes.', ar: 'تعالج مشاعرك ببطء وتنطقها بدقّة — لا تعتذر أبدًا عن سلوك الطريق الطويل نحو الكلمات الصحيحة.', es: 'Procesas los sentimientos despacio y los dices con precisión: nunca te disculpes por tomar el camino largo hacia las palabras correctas.' },
      { en: 'Your loyalty doesn\'t announce itself — it just shows up, every time, until people finally notice the pattern.', fr: 'Ta loyauté ne s\'annonce pas — elle se présente, à chaque fois, jusqu\'à ce que les gens remarquent enfin le motif.', ar: 'وفاؤك لا يعلن عن نفسه — بل يحضر في كل مرة حتى يلاحظ الناس النمط أخيرًا.', es: 'Tu lealtad no se anuncia: simplemente aparece, cada vez, hasta que la gente por fin nota el patrón.' },
    ],
    green: [
      { en: 'You can tell when someone is not okay from across a room — the gift and the burden are the same thing.', fr: 'Tu sais quand quelqu\'un ne va pas bien depuis l\'autre bout de la pièce — le don et le fardeau sont la même chose.', ar: 'تعرف أن أحدهم ليس بخير من الطرف الآخر للغرفة — الموهبة والعبء هنا شيء واحد.', es: 'Sabes cuándo alguien no está bien desde el otro lado de la sala: el don y la carga son la misma cosa.' },
      { en: 'You keep watering people who never ask if you\'re thirsty. Notice who brings YOU water.', fr: 'Tu continues d\'arroser des gens qui ne demandent jamais si tu as soif. Remarque qui T\'apporte de l\'eau.', ar: 'تظل تسقي أناسًا لا يسألون أبدًا إن كنت عطشًا. انتبه لمن يجلب الماء إليك أنت.', es: 'Sigues regando a gente que nunca pregunta si tienes sed. Fíjate en quién te trae agua a TI.' },
      { en: 'Not everything broken is yours to fix — some things just need a witness, not a repair.', fr: 'Tout ce qui est cassé n\'est pas à toi de réparer — certaines choses ont juste besoin d\'un témoin, pas d\'une réparation.', ar: 'ليس كل مكسور مسؤوليتك أن تصلحه — بعض الأشياء تحتاج شاهدًا فقط، لا إصلاحًا.', es: 'No todo lo roto te toca arreglarlo a ti: algunas cosas solo necesitan un testigo, no una reparación.' },
      { en: 'Growth follows you — jobs, friendships, plants, people. You are quietly the reason things got better.', fr: 'La croissance te suit — travail, amitiés, plantes, personnes. Tu es discrètement la raison pour laquelle les choses se sont améliorées.', ar: 'النمو يتبعك — في العمل والصداقات والنباتات والناس. أنت بهدوء السببُ في أن الأمور صارت أفضل.', es: 'El crecimiento te sigue: trabajos, amistades, plantas, personas. Eres, en silencio, la razón de que las cosas mejoraran.' },
      { en: 'Your care is so consistent that people stopped seeing it. That\'s not a reason to stop — it\'s a reason to say it out loud once.', fr: 'Ton attention est si constante que les gens ont cessé de la voir. Ce n\'est pas une raison d\'arrêter — c\'est une raison de le dire à voix haute, une fois.', ar: 'رعايتك ثابتة لدرجة أن الناس توقفوا عن رؤيتها. هذا ليس سببًا للتوقف — بل سبب لقولها بصوت عالٍ ولو مرة.', es: 'Tu cuidado es tan constante que la gente dejó de verlo. No es razón para parar: es razón para decirlo en voz alta una vez.' },
      { en: 'Healers heal fastest in gardens of their own — protect one hour a day that belongs to nobody but you.', fr: 'Les guérisseurs guérissent plus vite dans leurs propres jardins — protège une heure par jour qui n\'appartient à personne d\'autre que toi.', ar: 'المُعالِج يُشفى أسرع في حديقته الخاصة — احمِ ساعة واحدة في اليوم لا تخص أحدًا سواك.', es: 'Los sanadores sanan más rápido en jardines propios: protege una hora al día que no pertenezca a nadie más que a ti.' },
    ],
    gold: [
      { en: 'Your energy walks in before you do — people decide to feel better the moment you arrive.', fr: 'Ton énergie entre avant toi — les gens décident d\'aller mieux au moment où tu arrives.', ar: 'طاقتك تدخل قبلك — يقرر الناس أن يتحسّن مزاجهم لحظة وصولك.', es: 'Tu energía entra antes que tú: la gente decide sentirse mejor en cuanto llegas.' },
      { en: 'Being the light means nobody checks if you\'re burning out. Let someone check.', fr: 'Être la lumière signifie que personne ne vérifie si tu t\'épuises. Laisse quelqu\'un vérifier.', ar: 'أن تكون النور يعني ألا يتفقد أحد إن كنت تحترق. اسمح لأحدهم أن يتفقدك.', es: 'Ser la luz significa que nadie revisa si te estás quemando. Deja que alguien lo revise.' },
      { en: 'Your optimism is a discipline, not an accident — you rebuild it every morning and make it look easy.', fr: 'Ton optimisme est une discipline, pas un accident — tu le reconstruis chaque matin et tu fais croire que c\'est facile.', ar: 'تفاؤلك انضباط لا صدفة — تعيد بناءه كل صباح وتجعله يبدو سهلًا.', es: 'Tu optimismo es una disciplina, no un accidente: lo reconstruyes cada mañana y haces que parezca fácil.' },
      { en: 'People borrow hope from you and rarely return it. Good news: yours regenerates. Better news: you\'re allowed to say "not today".', fr: 'Les gens t\'empruntent de l\'espoir et le rendent rarement. Bonne nouvelle : le tien se régénère. Meilleure nouvelle : tu as le droit de dire « pas aujourd\'hui ».', ar: 'يستعير الناس الأمل منك ونادرًا ما يعيدونه. الخبر الجيد: أملك يتجدد. والأفضل: يحق لك أن تقول «ليس اليوم».', es: 'La gente te pide esperanza prestada y rara vez la devuelve. La buena noticia: la tuya se regenera. La mejor: puedes decir "hoy no".' },
      { en: 'Heavy rooms exhaust you faster than hard work does — choose your rooms like your life depends on it, because your light does.', fr: 'Les pièces lourdes t\'épuisent plus vite que le travail dur — choisis tes pièces comme si ta vie en dépendait, parce que ta lumière en dépend.', ar: 'الأماكن الثقيلة تستنزفك أسرع من العمل الشاق — اختر أماكنك وكأن حياتك تعتمد على ذلك، لأن نورك يعتمد عليه فعلًا.', es: 'Los ambientes pesados te agotan más rápido que el trabajo duro: elige tus espacios como si tu vida dependiera de ello, porque tu luz depende.' },
      { en: 'You make joy look effortless, which hides the truth: it\'s your craft. Own it like one.', fr: 'Tu rends la joie facile en apparence, ce qui cache la vérité : c\'est ton art. Assume-le comme tel.', ar: 'تجعل الفرح يبدو بلا جهد، وهذا يخفي الحقيقة: إنه حرفتك. فاعتز به كما تعتز بحرفة.', es: 'Haces que la alegría parezca sin esfuerzo, lo que esconde la verdad: es tu oficio. Asúmelo como tal.' },
    ],
    red: [
      { en: 'Your want is louder than most people\'s entire personality — that\'s not a flaw, it\'s horsepower.', fr: 'Ton désir est plus fort que la personnalité entière de la plupart des gens — ce n\'est pas un défaut, c\'est de la puissance.', ar: 'رغبتك أعلى صوتًا من شخصية معظم الناس بأكملها — هذا ليس عيبًا بل قوة محرّك.', es: 'Tu deseo suena más fuerte que la personalidad entera de la mayoría: no es un defecto, es potencia.' },
      { en: 'You don\'t hold grudges — you hold standards. The people who call it anger never met your loyalty.', fr: 'Tu ne gardes pas de rancunes — tu gardes des exigences. Ceux qui appellent ça de la colère n\'ont jamais rencontré ta loyauté.', ar: 'أنت لا تحمل الضغائن — بل تحمل المعايير. من يسمّون ذلك غضبًا لم يعرفوا وفاءك قط.', es: 'No guardas rencores: guardas estándares. Quienes lo llaman ira nunca conocieron tu lealtad.' },
      { en: 'Waiting is your kryptonite. Learn the difference between patience and permission to quit — you only need the first one.', fr: 'L\'attente est ta kryptonite. Apprends la différence entre la patience et la permission d\'abandonner — tu n\'as besoin que de la première.', ar: 'الانتظار نقطة ضعفك. تعلّم الفرق بين الصبر وإذن الاستسلام — فأنت لا تحتاج إلا الأول.', es: 'Esperar es tu kriptonita. Aprende la diferencia entre paciencia y permiso para rendirte: solo necesitas la primera.' },
      { en: 'People feel braver around you and never tell you. Half your circle\'s best decisions started with your push.', fr: 'Les gens se sentent plus courageux près de toi et ne te le disent jamais. La moitié des meilleures décisions de ton cercle ont commencé par ton élan.', ar: 'يشعر الناس بشجاعة أكبر قربك ولا يخبرونك أبدًا. نصف أفضل قرارات دائرتك بدأ بدفعة منك.', es: 'La gente se siente más valiente a tu lado y nunca te lo dice. La mitad de las mejores decisiones de tu círculo empezaron con tu empujón.' },
      { en: 'Your directness is a gift wrapped in sandpaper — the message lands better when you soften the wrapping, not the truth.', fr: 'Ta franchise est un cadeau emballé dans du papier de verre — le message passe mieux quand tu adoucis l\'emballage, pas la vérité.', ar: 'صراحتك هدية ملفوفة بورق خشن — تصل الرسالة أفضل حين تليّن الغلاف لا الحقيقة.', es: 'Tu franqueza es un regalo envuelto en lija: el mensaje llega mejor cuando suavizas el envoltorio, no la verdad.' },
      { en: 'Fire that protects and fire that destroys come from the same flame — you\'ve been learning to aim yours your whole life.', fr: 'Le feu qui protège et le feu qui détruit viennent de la même flamme — tu apprends à viser la tienne depuis toujours.', ar: 'النار التي تحمي والنار التي تدمّر تخرجان من الشعلة نفسها — وأنت تتعلّم توجيه شعلتك طوال حياتك.', es: 'El fuego que protege y el que destruye salen de la misma llama: llevas toda la vida aprendiendo a apuntar la tuya.' },
    ],
    rose: [
      { en: 'You remember the small things people said months ago — that\'s not memory, that\'s how you love.', fr: 'Tu te souviens des petites choses que les gens ont dites il y a des mois — ce n\'est pas de la mémoire, c\'est ta façon d\'aimer.', ar: 'تتذكّر التفاصيل الصغيرة التي قالها الناس قبل شهور — هذه ليست ذاكرة، بل طريقتك في الحب.', es: 'Recuerdas las pequeñas cosas que la gente dijo hace meses: eso no es memoria, es tu forma de amar.' },
      { en: 'Your softness has survived things that hardened everyone else — that\'s not fragility, that\'s the strongest thing about you.', fr: 'Ta douceur a survécu à des choses qui ont endurci tout le monde — ce n\'est pas de la fragilité, c\'est ta plus grande force.', ar: 'رقّتك نجت من أشياء قسّت قلوب الجميع — هذه ليست هشاشة، بل أقوى ما فيك.', es: 'Tu suavidad sobrevivió a cosas que endurecieron a todos los demás: eso no es fragilidad, es lo más fuerte que tienes.' },
      { en: 'You forgive fast because carrying anger hurts you more than the wound did — just make sure forgiving isn\'t forgetting the lesson.', fr: 'Tu pardonnes vite parce que porter la colère te fait plus mal que la blessure — assure-toi seulement que pardonner n\'est pas oublier la leçon.', ar: 'تسامح بسرعة لأن حمل الغضب يؤلمك أكثر من الجرح نفسه — فقط تأكد أن المسامحة لا تعني نسيان الدرس.', es: 'Perdonas rápido porque cargar la rabia te duele más que la herida; solo asegúrate de que perdonar no sea olvidar la lección.' },
      { en: 'People confess things to you they\'ve never said out loud — your presence feels like somewhere safe to put a heart down.', fr: 'Les gens te confient des choses qu\'ils n\'ont jamais dites à voix haute — ta présence ressemble à un endroit sûr pour poser un cœur.', ar: 'يعترف لك الناس بأشياء لم يقولوها بصوت عالٍ قط — حضورك يشبه مكانًا آمنًا يضع فيه المرء قلبه.', es: 'La gente te confiesa cosas que nunca ha dicho en voz alta: tu presencia se siente como un lugar seguro donde apoyar un corazón.' },
      { en: 'Loving without keeping score is beautiful — but check the scoreboard once a year anyway. Some people have been taking for free.', fr: 'Aimer sans compter est magnifique — mais regarde quand même le tableau une fois par an. Certains se servent gratuitement.', ar: 'الحب دون حساب جميل — لكن انظر إلى الميزان مرة في السنة على الأقل. بعض الناس يأخذون مجانًا منذ زمن.', es: 'Amar sin llevar la cuenta es hermoso, pero revisa el marcador una vez al año. Algunos llevan tiempo tomando gratis.' },
      { en: 'The tenderness you give so freely is exactly what you\'re quietly hoping someone gives back — say that hope out loud sometime.', fr: 'La tendresse que tu donnes si librement est exactement ce que tu espères en silence recevoir — dis cet espoir à voix haute un jour.', ar: 'الحنان الذي تمنحه بسخاء هو بالضبط ما تتمنى في صمت أن يبادلك به أحد — قل هذه الأمنية بصوت عالٍ يومًا ما.', es: 'La ternura que das tan libremente es exactamente lo que en silencio esperas recibir: di esa esperanza en voz alta algún día.' },
    ],
    black: [
      { en: 'People hand you their secrets and notice you never trade yours — that exchange rate is your magnetism, not an accident.', fr: 'Les gens te confient leurs secrets et remarquent que tu n\'échanges jamais les tiens — ce taux de change est ton magnétisme, pas un accident.', ar: 'يسلّمك الناس أسرارهم ويلاحظون أنك لا تقايض بأسرارك أبدًا — سعر الصرف هذا هو جاذبيتك، وليس صدفة.', es: 'La gente te entrega sus secretos y nota que tú nunca intercambias los tuyos: ese tipo de cambio es tu magnetismo, no un accidente.' },
      { en: 'Your "no" needs no explanation — you learned that before most people learn to say the word at all.', fr: 'Ton « non » n\'a besoin d\'aucune explication — tu l\'as appris avant que la plupart des gens apprennent à dire le mot.', ar: 'كلمة «لا» عندك لا تحتاج إلى تبرير — تعلّمت ذلك قبل أن يتعلّم معظم الناس نطق الكلمة أصلًا.', es: 'Tu "no" no necesita explicación: lo aprendiste antes de que la mayoría aprenda siquiera a decir la palabra.' },
      { en: 'You protect the people you love in ways they never see — the storms that never reached them were the ones you stood in front of.', fr: 'Tu protèges ceux que tu aimes d\'une manière qu\'ils ne voient jamais — les tempêtes qui ne les ont jamais atteints sont celles devant lesquelles tu t\'es tenu.', ar: 'تحمي من تحبهم بطرق لا يرونها أبدًا — العواصف التي لم تصلهم قط هي التي وقفت أنت في وجهها.', es: 'Proteges a quienes amas de maneras que nunca ven: las tormentas que jamás los alcanzaron fueron las que tú enfrentaste de pie.' },
      { en: 'Your stillness in chaos isn\'t distance — it\'s ground. You go quiet the way mountains do.', fr: 'Ton immobilité dans le chaos n\'est pas de la distance — c\'est du socle. Tu deviens silencieux comme les montagnes.', ar: 'سكونك وسط الفوضى ليس ابتعادًا — بل ثباتًا. أنت تصمت كما تصمت الجبال.', es: 'Tu quietud en el caos no es distancia: es suelo firme. Guardas silencio como lo hacen las montañas.' },
      { en: 'The less you announce yourself, the more the room turns toward you — you figured out early that presence outruns performance.', fr: 'Moins tu t\'annonces, plus la pièce se tourne vers toi — tu as compris tôt que la présence dépasse la mise en scène.', ar: 'كلّما قلّ إعلانك عن نفسك، ازداد التفات المكان نحوك — أدركت مبكرًا أن الحضور يسبق الاستعراض.', es: 'Cuanto menos te anuncias, más se gira la sala hacia ti: entendiste pronto que la presencia supera a la actuación.' },
      { en: 'Guarding the gate is your gift — just remember you\'re allowed to step out from behind it and be held too.', fr: 'Garder la porte est ton don — souviens-toi seulement que tu as le droit d\'en sortir et d\'être tenu à ton tour.', ar: 'حراسة الباب موهبتك — لكن تذكّر أن من حقك أن تخرج من خلفه وأن يحتضنك أحد أيضًا.', es: 'Custodiar la puerta es tu don; solo recuerda que también tienes permiso de salir de detrás de ella y dejarte sostener.' },
    ],
    white: [
      { en: 'You give people the thing they can\'t find anywhere else: a conversation with no residue. Nothing said to you today is used against them tomorrow.', fr: 'Tu offres aux gens ce qu\'ils ne trouvent nulle part ailleurs : une conversation sans résidu. Rien de ce qu\'on te dit aujourd\'hui n\'est utilisé contre eux demain.', ar: 'تمنح الناس ما لا يجدونه في أي مكان آخر: حديثًا بلا رواسب. لا شيء يُقال لك اليوم يُستخدم ضدهم غدًا.', es: 'Le das a la gente lo que no encuentra en ningún otro lugar: una conversación sin residuos. Nada de lo que te dicen hoy se usa en su contra mañana.' },
      { en: 'Fresh starts follow you around — new notebooks, cleared shelves, forgiven people. Beginning again is your native language.', fr: 'Les nouveaux départs te suivent partout — cahiers neufs, étagères dégagées, personnes pardonnées. Recommencer est ta langue maternelle.', ar: 'البدايات الجديدة تتبعك أينما ذهبت — دفاتر جديدة ورفوف مرتّبة وأناس غُفر لهم. أن تبدأ من جديد هو لغتك الأم.', es: 'Los nuevos comienzos te siguen a todas partes: cuadernos nuevos, estantes despejados, gente perdonada. Volver a empezar es tu lengua materna.' },
      { en: 'Your mind clears the way snow settles — not by force, but by letting things land and go quiet.', fr: 'Ton esprit s\'éclaircit comme la neige se pose — pas par la force, mais en laissant les choses atterrir et se taire.', ar: 'يصفو ذهنك كما يستقر الثلج — لا بالقوة، بل بترك الأشياء تهبط وتهدأ.', es: 'Tu mente se aclara como se asienta la nieve: no por la fuerza, sino dejando que las cosas aterricen y se aquieten.' },
      { en: 'People mistake your openness for simplicity. There is nothing simple about keeping a heart uncluttered on purpose.', fr: 'Les gens confondent ton ouverture avec de la simplicité. Il n\'y a rien de simple à garder un cœur désencombré volontairement.', ar: 'يخلط الناس بين انفتاحك والبساطة. لا شيء بسيطًا في أن تُبقي قلبك خاليًا من الفوضى عن قصد.', es: 'La gente confunde tu apertura con simpleza. No hay nada simple en mantener un corazón despejado a propósito.' },
      { en: 'You reset faster than people expect — not because you feel less, but because you refuse to redecorate your life around a wound.', fr: 'Tu te remets plus vite que les gens ne s\'y attendent — non parce que tu ressens moins, mais parce que tu refuses de redécorer ta vie autour d\'une blessure.', ar: 'تتعافى أسرع مما يتوقع الناس — ليس لأنك تشعر أقل، بل لأنك ترفض أن تعيد ترتيب حياتك حول جرح.', es: 'Te recuperas más rápido de lo que la gente espera: no porque sientas menos, sino porque te niegas a redecorar tu vida alrededor de una herida.' },
      { en: 'Clarity is your gift — just don\'t let anyone treat your clean slate as a dumping ground. Space held open still belongs to you.', fr: 'La clarté est ton don — ne laisse simplement personne traiter ta page blanche comme une décharge. Un espace laissé ouvert t\'appartient encore.', ar: 'الصفاء موهبتك — فقط لا تدع أحدًا يعامل صفحتك البيضاء كمكبّ لهمومه. المساحة التي تُبقيها مفتوحة ما زالت ملكك.', es: 'La claridad es tu don; solo no dejes que nadie trate tu página en blanco como un vertedero. El espacio que mantienes abierto sigue siendo tuyo.' },
    ],
  },
};
