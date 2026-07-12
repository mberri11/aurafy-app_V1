import { CountResults } from '../../types';

/**
 * who_cut_off read in SOLO mode → "signs of emotional withdrawal" count about ONE person.
 * INVERTED polarity: `none` = they are still fully here (the relief), `high` = they have
 * emotionally left (the module's elegiac slow-goodbye voice — dignity, no chasing).
 * High tier adapts the module's multi pools.
 */
export const whoCutOffCountResults: CountResults = {
  tiers: {
    none: {
      en: 'No drift detected — {name} is still fully here with you.',
      fr: 'Aucune dérive détectée — {name} est encore pleinement là, avec toi.',
      ar: 'لا انجراف مرصود — {name} ما زال حاضراً معك تماماً.',
      es: 'Sin deriva detectada — {name} sigue plenamente aquí contigo.',
    },
    low: {
      en: 'A little distance, but the door is open — this looks like life-noise, not an exit.',
      fr: "Un peu de distance, mais la porte est ouverte — cela ressemble au bruit de la vie, pas à une sortie.",
      ar: 'مسافة بسيطة، لكن الباب مفتوح — يبدو هذا ضجيج الحياة، لا خروجاً.',
      es: 'Un poco de distancia, pero la puerta está abierta — esto parece ruido de la vida, no una salida.',
    },
    medium: {
      en: '{name} is drifting — the pulling-away is real, but the leaving is not finished.',
      fr: "{name} dérive — l'éloignement est réel, mais le départ n'est pas achevé.",
      ar: '{name} ينجرف بعيداً — الابتعاد حقيقي، لكن الرحيل لم يكتمل.',
      es: '{name} está a la deriva — el alejamiento es real, pero la partida no está terminada.',
    },
    high: {
      en: 'The signs are consistent: {name} has emotionally withdrawn from you.',
      fr: "Les signes sont constants : {name} s'est retiré émotionnellement de toi.",
      ar: 'العلامات ثابتة: {name} انسحب منك عاطفياً.',
      es: 'Las señales son constantes: {name} se ha retirado emocionalmente de ti.',
    },
  },
  shareLines: {
    none: {
      en: 'Turns out the door was never closing. I just kept checking it.',
      fr: "En fait, la porte ne se fermait pas. Je n'arrêtais juste pas de la vérifier.",
      ar: 'اتضح أن الباب لم يكن يُغلق قط — أنا فقط كنت أتفقّده باستمرار.',
      es: 'Resulta que la puerta nunca se estaba cerrando. Yo solo la revisaba sin parar.',
    },
    low: {
      en: 'Busy is not gone. I checked.',
      fr: "Occupé n'est pas parti. J'ai vérifié.",
      ar: 'المشغول ليس راحلاً. لقد تحققت.',
      es: 'Ocupado no es ido. Lo comprobé.',
    },
    medium: {
      en: 'The drift is real. What happens next is a choice — theirs and mine.',
      fr: 'La dérive est réelle. La suite est un choix — le leur et le mien.',
      ar: 'الانجراف حقيقي. وما يأتي بعده اختيار — لهم ولي.',
      es: 'La deriva es real. Lo que sigue es una elección — suya y mía.',
    },
    high: {
      en: 'Some goodbyes happen long before the words.',
      fr: 'Certains adieux arrivent bien avant les mots.',
      ar: 'بعض الوداعات تحدث قبل الكلمات بكثير.',
      es: 'Algunas despedidas ocurren mucho antes que las palabras.',
    },
  },
  insights: {
    none: [
      {
        en: 'The withdrawal markers just did not show — the connection is intact, whatever your anxiety was telling you.',
        fr: "Les marqueurs de retrait ne sont tout simplement pas apparus — le lien est intact, quoi que ton anxiété te racontait.",
        ar: 'علامات الانسحاب لم تظهر ببساطة — الصلة سليمة، مهما كان ما يخبرك به قلقك.',
        es: 'Los marcadores de retirada simplemente no aparecieron — el vínculo está intacto, dijera lo que dijera tu ansiedad.',
      },
      {
        en: 'Fear of losing someone can imitate the evidence of losing them — this count separates the two.',
        fr: "La peur de perdre quelqu'un peut imiter les preuves de sa perte — ce compte sépare les deux.",
        ar: 'الخوف من فقدان شخص قد يقلّد أدلة فقدانه — هذا العدّ يفصل بين الاثنين.',
        es: 'El miedo a perder a alguien puede imitar la evidencia de perderlo — este conteo separa ambas cosas.',
      },
      {
        en: 'They still reach, still respond, still show up — let yourself actually receive that.',
        fr: "Ils tendent encore la main, répondent encore, sont encore là — autorise-toi à vraiment le recevoir.",
        ar: 'ما زالوا يبادرون ويجيبون ويحضرون — اسمح لنفسك أن تتقبّل ذلك فعلاً.',
        es: 'Aún se acercan, aún responden, aún están — permítete de verdad recibirlo.',
      },
      {
        en: 'Checking the lock too often wears the door — constant reassurance-seeking creates the distance it fears.',
        fr: "Vérifier la serrure trop souvent use la porte — chercher constamment à être rassuré crée la distance qu'il redoute.",
        ar: 'تفقّد القفل كثيراً يُبلي الباب — طلب الطمأنة المستمر يصنع المسافة التي يخشاها.',
        es: 'Revisar la cerradura demasiado desgasta la puerta — buscar reafirmación constante crea la distancia que teme.',
      },
      {
        en: 'If a specific moment planted this worry, name it to them once — then let the answer be the answer.',
        fr: "Si un moment précis a planté cette inquiétude, nomme-le-leur une fois — puis laisse la réponse être la réponse.",
        ar: 'إن كانت لحظة محددة زرعت هذا القلق، فاذكرها لهم مرة — ثم دع الجواب يكون الجواب.',
        es: 'Si un momento específico plantó esta preocupación, nómbralo una vez — y luego deja que la respuesta sea la respuesta.',
      },
      {
        en: 'Spend this relief well: presence enjoyed is better maintenance than presence monitored.',
        fr: 'Dépense bien ce soulagement : une présence savourée est un meilleur entretien qu\'une présence surveillée.',
        ar: 'أنفق هذا الارتياح جيداً: الحضور المُستمتَع به صيانةٌ أفضل من الحضور المُراقَب.',
        es: 'Gasta bien este alivio: la presencia disfrutada es mejor mantenimiento que la presencia vigilada.',
      },
    ],
    low: [
      {
        en: 'A few quieter stretches showed up — but quieter is not colder. Lives get loud; friendships breathe.',
        fr: "Quelques périodes plus calmes sont apparues — mais plus calme n'est pas plus froid. Les vies deviennent bruyantes ; les amitiés respirent.",
        ar: 'ظهرت فترات أهدأ قليلة — لكن الأهدأ ليس الأبرد. الحياة تعلو ضوضاؤها؛ والصداقات تتنفس.',
        es: 'Aparecieron algunos tramos más callados — pero más callado no es más frío. Las vidas se llenan de ruido; las amistades respiran.',
      },
      {
        en: 'Before reading distance as departure, check their whole season — stress shrinks everyone\'s reach.',
        fr: "Avant de lire la distance comme un départ, regarde toute leur saison — le stress réduit la portée de chacun.",
        ar: 'قبل أن تقرأ المسافة رحيلاً، انظر إلى موسمهم كاملاً — الضغط يقلّص مدى وصول الجميع.',
        es: 'Antes de leer la distancia como partida, mira toda su temporada — el estrés encoge el alcance de todos.',
      },
      {
        en: 'The test is response, not initiation — when you reach out, do they still meet you warmly? That is what counts.',
        fr: "Le test est la réponse, pas l'initiative — quand tu tends la main, te rejoignent-ils encore chaleureusement ? C'est ce qui compte.",
        ar: 'الاختبار هو الاستجابة لا المبادرة — حين تتواصل، هل ما زالوا يقابلونك بدفء؟ هذا ما يُحتسب.',
        es: 'La prueba es la respuesta, no la iniciativa — cuando te acercas, ¿todavía te reciben con calidez? Eso es lo que cuenta.',
      },
      {
        en: 'One honest "I miss you" outperforms weeks of silent measuring.',
        fr: "Un « tu me manques » honnête surpasse des semaines de mesure silencieuse.",
        ar: 'عبارة "اشتقت إليك" صادقة واحدة تتفوق على أسابيع من القياس الصامت.',
        es: 'Un "te extraño" honesto supera semanas de medición silenciosa.',
      },
      {
        en: 'Do not match their quiet with your quiet just to keep score even — that is how small gaps become real ones.',
        fr: "Ne réponds pas à leur silence par ton silence juste pour égaliser le score — c'est ainsi que les petits écarts deviennent réels.",
        ar: 'لا تقابل صمتهم بصمتك لمجرد تعادل النقاط — فهكذا تتحول الفجوات الصغيرة إلى حقيقية.',
        es: 'No respondas a su silencio con el tuyo solo por empatar el marcador — así los huecos pequeños se vuelven reales.',
      },
      {
        en: 'Mark this reading and take it again next month — direction matters more than today\'s level.',
        fr: "Note cette lecture et refais-la le mois prochain — la direction compte plus que le niveau d'aujourd'hui.",
        ar: 'سجّل هذه القراءة وأعدها الشهر القادم — الاتجاه أهم من مستوى اليوم.',
        es: 'Marca esta lectura y repítela el mes que viene — la dirección importa más que el nivel de hoy.',
      },
    ],
    medium: [
      {
        en: 'They reply, but every reply is shorter than the one before — that is a slow goodbye, still reversible.',
        fr: "Ils répondent, mais chaque réponse est plus courte que la précédente — c'est un adieu lent, encore réversible.",
        ar: 'يردّون، لكن كل ردّ أقصر من سابقه — هذا وداع بطيء، وما زال قابلاً للعكس.',
        es: 'Responden, pero cada respuesta es más corta que la anterior — es una despedida lenta, todavía reversible.',
      },
      {
        en: 'Some people cut off to protect themselves, not to punish you — the drift may be about their weather.',
        fr: "Certaines personnes s'éloignent pour se protéger, pas pour te punir — la dérive concerne peut-être leur météo.",
        ar: 'بعض الناس ينقطعون لحماية أنفسهم لا لمعاقبتك — قد يكون الانجراف عن أحوالهم هم.',
        es: 'Algunas personas se alejan para protegerse, no para castigarte — la deriva puede ser por su propio clima.',
      },
      {
        en: 'Name it once, gently and without accusation: "I feel you further away lately." Their answer is the map.',
        fr: "Nomme-le une fois, doucement et sans accusation : « Je te sens plus loin ces derniers temps. » Leur réponse est la carte.",
        ar: 'سمِّ الأمر مرة، بلطف وبلا اتهام: "أشعر أنك أبعد مؤخراً." جوابهم هو الخريطة.',
        es: 'Nómbralo una vez, con suavidad y sin acusación: "Te siento más lejos últimamente." Su respuesta es el mapa.',
      },
      {
        en: 'Watch what happens after the conversation, not during it — course corrections are made of actions.',
        fr: "Regarde ce qui se passe après la conversation, pas pendant — les corrections de trajectoire sont faites d'actes.",
        ar: 'راقب ما يحدث بعد المحادثة لا أثناءها — تصحيح المسار يُصنع من الأفعال.',
        es: 'Observa lo que pasa después de la conversación, no durante — las correcciones de rumbo se hacen de acciones.',
      },
      {
        en: 'Keep your dignity in the doorway: you can hold the door open without standing in it.',
        fr: "Garde ta dignité sur le seuil : tu peux tenir la porte ouverte sans rester planté dedans.",
        ar: 'احفظ كرامتك عند العتبة: يمكنك إبقاء الباب مفتوحاً دون أن تقف فيه.',
        es: 'Conserva tu dignidad en el umbral: puedes mantener la puerta abierta sin quedarte parado en ella.',
      },
      {
        en: 'A drift this size resolves within months, one way or the other — what you do now genuinely matters.',
        fr: "Une dérive de cette taille se résout en quelques mois, dans un sens ou dans l'autre — ce que tu fais maintenant compte vraiment.",
        ar: 'انجراف بهذا الحجم يُحسم خلال أشهر، في اتجاه أو آخر — ما تفعله الآن مهم فعلاً.',
        es: 'Una deriva de este tamaño se resuelve en meses, hacia un lado u otro — lo que hagas ahora importa de verdad.',
      },
    ],
    high: [
      {
        en: 'They removed themselves slowly enough that you almost didn\'t notice — almost.',
        fr: 'Ils se sont retirés assez lentement pour que tu ne le remarques presque pas — presque.',
        ar: 'انسحبوا ببطء كافٍ بحيث كدت لا تلاحظ — كدت.',
        es: 'Se retiraron lo suficientemente lento para que casi no lo notaras — casi.',
      },
      {
        en: 'A friendship can end without an argument — withdrawal is also a goodbye.',
        fr: 'Une amitié peut finir sans dispute — le retrait est aussi un adieu.',
        ar: 'يمكن لصداقة أن تنتهي دون شجار — الانسحاب وداع أيضاً.',
        es: 'Una amistad puede terminar sin pelea — la retirada también es una despedida.',
      },
      {
        en: 'Their silence is not indifference — it is unprocessed pain looking for an exit.',
        fr: "Leur silence n'est pas de l'indifférence — c'est une douleur non traitée cherchant une sortie.",
        ar: 'صمتهم ليس لامبالاة — بل هو ألم غير محلول يبحث عن مخرج.',
        es: 'Su silencio no es indiferencia — es dolor no procesado buscando una salida.',
      },
      {
        en: 'Stop chasing the version of them that used to call first — that person changed.',
        fr: 'Cesse de courir après la version qui appelait en premier — cette personne a changé.',
        ar: 'توقف عن مطاردة النسخة التي كانت تتصل أولاً — ذلك الشخص تغيّر.',
        es: 'Deja de perseguir la versión que llamaba primero — esa persona cambió.',
      },
      {
        en: 'A relationship requires two doors. Yours has been the only one open.',
        fr: 'Une relation a besoin de deux portes. La tienne a été la seule ouverte.',
        ar: 'العلاقة تحتاج إلى بابين. بابك كان الوحيد المفتوح.',
        es: 'Una relación necesita dos puertas. La tuya ha sido la única abierta.',
      },
      {
        en: "You don't need a closing scene to know the chapter is closed.",
        fr: "Tu n'as pas besoin d'une scène finale pour savoir que le chapitre est clos.",
        ar: 'لا تحتاج إلى مشهد ختامي لتعرف أن الفصل قد أُغلق.',
        es: 'No necesitas una escena final para saber que el capítulo está cerrado.',
      },
    ],
  },
};
