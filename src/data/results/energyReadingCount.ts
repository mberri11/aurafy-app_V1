import { CountResults } from '../../types';

/**
 * energy_reading read in SOLO mode → "positive energy signs" count about ONE person.
 * POSITIVE polarity, battery/current metaphors (the module's established voice).
 * `none` here means their presence doesn't feed you — possibly drains you — said
 * plainly but without demonizing the person. High tier adapts the module's multi pools.
 */
export const energyReadingCountResults: CountResults = {
  tiers: {
    none: {
      en: 'Their energy barely reaches you — this presence costs more than it gives right now.',
      fr: "Leur énergie te parvient à peine — cette présence coûte plus qu'elle ne donne en ce moment.",
      ar: 'طاقتهم بالكاد تصلك — هذا الحضور يكلّف أكثر مما يمنح حالياً.',
      es: 'Su energía apenas te llega — esta presencia cuesta más de lo que da por ahora.',
    },
    low: {
      en: 'The current is faint — neutral company, with only an occasional lift.',
      fr: "Le courant est faible — une compagnie neutre, avec seulement un élan occasionnel.",
      ar: 'التيار خافت — صحبة محايدة، مع دفعة عابرة بين حين وآخر.',
      es: 'La corriente es débil — compañía neutra, con solo un impulso ocasional.',
    },
    medium: {
      en: '{name} feeds your energy in real moments — a genuine current, not yet a steady one.',
      fr: "{name} nourrit ton énergie par vrais moments — un courant sincère, pas encore constant.",
      ar: '{name} يغذّي طاقتك في لحظات حقيقية — تيار صادق، لكنه غير مستقر بعد.',
      es: '{name} alimenta tu energía en momentos reales — una corriente genuina, aún no constante.',
    },
    high: {
      en: '{name} radiates real energy toward you — their presence consistently feeds you.',
      fr: "{name} rayonne une vraie énergie vers toi — sa présence te nourrit avec constance.",
      ar: '{name} يشعّ طاقة حقيقية تجاهك — حضوره يغذّيك بثبات.',
      es: '{name} irradia energía real hacia ti — su presencia te alimenta con constancia.',
    },
  },
  shareLines: {
    none: {
      en: 'I finally checked who was draining the battery.',
      fr: "J'ai enfin vérifié qui vidait la batterie.",
      ar: 'أخيراً تحققت ممن كان يستنزف البطارية.',
      es: 'Por fin revisé quién estaba drenando la batería.',
    },
    low: {
      en: 'Neutral company is fine. Fuel is better.',
      fr: 'La compagnie neutre, ça va. Le carburant, c\'est mieux.',
      ar: 'الصحبة المحايدة لا بأس بها. الوقود أفضل.',
      es: 'La compañía neutra está bien. El combustible es mejor.',
    },
    medium: {
      en: 'The current is real. Now watching if it holds.',
      fr: 'Le courant est réel. Reste à voir s\'il tient.',
      ar: 'التيار حقيقي. أراقب الآن هل سيدوم.',
      es: 'La corriente es real. Ahora veo si se mantiene.',
    },
    high: {
      en: 'Some people are caffeine. Keep them close.',
      fr: 'Certaines personnes sont de la caféine. Garde-les près de toi.',
      ar: 'بعض الناس كالقهوة — أبقِهم قريبين.',
      es: 'Algunas personas son cafeína. Mantenlas cerca.',
    },
  },
  insights: {
    none: [
      {
        en: 'Notice how you feel one hour after seeing them — that afterglow, or its absence, is the real reading.',
        fr: "Remarque comment tu te sens une heure après les avoir vus — cette rémanence, ou son absence, est la vraie lecture.",
        ar: 'لاحظ شعورك بعد ساعة من لقائهم — ذلك الأثر، أو غيابه، هو القراءة الحقيقية.',
        es: 'Nota cómo te sientes una hora después de verlos — ese resplandor, o su ausencia, es la lectura real.',
      },
      {
        en: 'If you rehearse before seeing someone and recover after, the relationship is running on your battery.',
        fr: "Si tu répètes avant de voir quelqu'un et récupères après, la relation tourne sur ta batterie.",
        ar: 'إن كنت تتدرّب قبل لقاء شخص وتتعافى بعده، فالعلاقة تعمل على بطاريتك أنت.',
        es: 'Si ensayas antes de ver a alguien y te recuperas después, la relación funciona con tu batería.',
      },
      {
        en: 'Flat energy is not always malice — some people are simply pouring from an empty cup. It still costs you.',
        fr: "Une énergie plate n'est pas toujours de la malveillance — certains versent simplement d'une tasse vide. Cela te coûte quand même.",
        ar: 'الطاقة الفاترة ليست دائماً سوء نية — بعض الناس يسكبون من كوب فارغ ببساطة. ومع ذلك فهي تكلّفك.',
        es: 'La energía plana no siempre es malicia — algunas personas simplemente sirven de una taza vacía. Aun así te cuesta.',
      },
      {
        en: 'You are allowed to ration access to your energy — that is maintenance, not cruelty.',
        fr: "Tu as le droit de rationner l'accès à ton énergie — c'est de l'entretien, pas de la cruauté.",
        ar: 'يحق لك تقنين الوصول إلى طاقتك — هذه صيانة، لا قسوة.',
        es: 'Tienes derecho a racionar el acceso a tu energía — eso es mantenimiento, no crueldad.',
      },
      {
        en: 'Shorter visits, lighter topics, fewer explanations — you can shrink the drain without ending the relationship.',
        fr: 'Des visites plus courtes, des sujets plus légers, moins d\'explications — tu peux réduire la fuite sans terminer la relation.',
        ar: 'زيارات أقصر، مواضيع أخف، تفسيرات أقل — يمكنك تقليص الاستنزاف دون إنهاء العلاقة.',
        es: 'Visitas más cortas, temas más ligeros, menos explicaciones — puedes reducir el drenaje sin terminar la relación.',
      },
      {
        en: 'The energy you spend surviving this presence is energy the right people never get to see.',
        fr: "L'énergie que tu dépenses à survivre à cette présence est de l'énergie que les bonnes personnes ne verront jamais.",
        ar: 'الطاقة التي تنفقها في تحمّل هذا الحضور طاقةٌ لن يراها الأشخاص المناسبون أبداً.',
        es: 'La energía que gastas sobreviviendo a esta presencia es energía que la gente correcta nunca llega a ver.',
      },
    ],
    low: [
      {
        en: 'Neutral is not nothing — but do not confuse "doesn\'t drain me" with "feeds me."',
        fr: "Neutre n'est pas rien — mais ne confonds pas « ne me vide pas » avec « me nourrit ».",
        ar: 'المحايد ليس عدماً — لكن لا تخلط بين "لا يستنزفني" و"يغذّيني".',
        es: 'Neutro no es nada — pero no confundas "no me drena" con "me alimenta".',
      },
      {
        en: 'The occasional lift is real — notice exactly when it happens, because that is where this connection lives.',
        fr: "L'élan occasionnel est réel — remarque exactement quand il arrive, car c'est là que vit cette connexion.",
        ar: 'الدفعة العابرة حقيقية — لاحظ متى تحدث بالضبط، فهناك تعيش هذه الصلة.',
        es: 'El impulso ocasional es real — nota exactamente cuándo ocurre, porque ahí vive esta conexión.',
      },
      {
        en: 'Some relationships are climate, not weather — steady, mild, and unremarkable. That has its own place.',
        fr: "Certaines relations sont un climat, pas une météo — stables, douces et sans éclat. Cela a sa propre place.",
        ar: 'بعض العلاقات مناخ لا طقس — ثابتة، معتدلة، غير لافتة. ولذلك مكانه أيضاً.',
        es: 'Algunas relaciones son clima, no tiempo — estables, suaves y sin brillo. Eso tiene su propio lugar.',
      },
      {
        en: 'A faint current often means the two of you meet at the surface — depth is where energy transfers.',
        fr: "Un courant faible signifie souvent que vous vous rencontrez en surface — c'est en profondeur que l'énergie se transmet.",
        ar: 'التيار الخافت يعني غالباً أنكما تلتقيان عند السطح — وفي العمق تنتقل الطاقة.',
        es: 'Una corriente débil suele significar que se encuentran en la superficie — la energía se transfiere en la profundidad.',
      },
      {
        en: 'Try one real conversation instead of ten small ones — thin contact keeps connections dim.',
        fr: 'Essaie une vraie conversation au lieu de dix petites — un contact mince garde les liens ternes.',
        ar: 'جرّب محادثة حقيقية واحدة بدل عشر صغيرة — التواصل الرقيق يُبقي الصلات باهتة.',
        es: 'Prueba una conversación real en vez de diez pequeñas — el contacto delgado mantiene tenues las conexiones.',
      },
      {
        en: 'Keep your expectations honest: pleasant company you leave unchanged is fine — just budget accordingly.',
        fr: 'Garde des attentes honnêtes : une compagnie agréable qui te laisse inchangé, c\'est bien — budgète en conséquence.',
        ar: 'أبقِ توقعاتك صادقة: صحبة لطيفة تتركك كما أنت لا بأس بها — فقط وازن ميزانيتك وفقاً لذلك.',
        es: 'Mantén expectativas honestas: una compañía agradable que te deja igual está bien — solo presupuesta en consecuencia.',
      },
    ],
    medium: [
      {
        en: 'In the right setting, they genuinely light you up — the current is real, it just has conditions.',
        fr: "Dans le bon cadre, ils t'illuminent sincèrement — le courant est réel, il a juste des conditions.",
        ar: 'في الإطار المناسب، يضيئونك حقاً — التيار حقيقي، لكنه مشروط.',
        es: 'En el entorno correcto, te iluminan de verdad — la corriente es real, solo que tiene condiciones.',
      },
      {
        en: 'Notice which version of them feeds you — one-on-one, in groups, on good days — and seek that version.',
        fr: 'Remarque quelle version d\'eux te nourrit — en tête-à-tête, en groupe, les bons jours — et recherche cette version.',
        ar: 'لاحظ أيّ نسخة منهم تغذّيك — على انفراد، في المجموعات، في الأيام الجيدة — واقصد تلك النسخة.',
        es: 'Nota qué versión de esa persona te alimenta — a solas, en grupo, en días buenos — y busca esa versión.',
      },
      {
        en: 'An inconsistent current usually mirrors their own battery, not their feelings about you.',
        fr: 'Un courant irrégulier reflète généralement leur propre batterie, pas leurs sentiments pour toi.',
        ar: 'التيار المتقطع يعكس عادة بطاريتهم هم، لا مشاعرهم تجاهك.',
        es: 'Una corriente inconstante suele reflejar su propia batería, no sus sentimientos hacia ti.',
      },
      {
        en: 'Energy given should return — check that your exchanges leave both of you fuller, not just one.',
        fr: "L'énergie donnée doit revenir — vérifie que vos échanges vous laissent tous les deux plus remplis, pas un seul.",
        ar: 'الطاقة المبذولة يجب أن تعود — تأكد أن تبادلكما يترككما الاثنين أكثر امتلاءً، لا أحدكما فقط.',
        es: 'La energía dada debe volver — verifica que sus intercambios los dejen a ambos más llenos, no solo a uno.',
      },
      {
        en: 'Protect the settings where the connection glows — some currents just need the right room.',
        fr: 'Protège les cadres où la connexion brille — certains courants ont juste besoin de la bonne pièce.',
        ar: 'احمِ المواقف التي تتوهج فيها الصلة — بعض التيارات تحتاج فقط الغرفة المناسبة.',
        es: 'Protege los entornos donde la conexión brilla — algunas corrientes solo necesitan la sala correcta.',
      },
      {
        en: 'Growing currents reward patience — revisit this reading in a month and watch the direction, not the level.',
        fr: 'Les courants qui grandissent récompensent la patience — refais cette lecture dans un mois et regarde la direction, pas le niveau.',
        ar: 'التيارات النامية تكافئ الصبر — أعد هذه القراءة بعد شهر وراقب الاتجاه لا المستوى.',
        es: 'Las corrientes que crecen premian la paciencia — repite esta lectura en un mes y mira la dirección, no el nivel.',
      },
    ],
    high: [
      {
        en: 'Their presence recharges you — that is a rare and precious gift.',
        fr: "Leur présence te recharge — c'est un cadeau rare et précieux.",
        ar: 'حضورهم يعيد شحنك — وهذه هبة نادرة وثمينة.',
        es: 'Su presencia te recarga — eso es un regalo raro y precioso.',
      },
      {
        en: 'You laugh more, think faster, and feel more alive in their orbit.',
        fr: 'Tu ris plus, tu penses plus vite et tu te sens plus vivant dans leur orbite.',
        ar: 'تضحك أكثر، تفكر أسرع، وتشعر بالحياة أكثر في فلكهم.',
        es: 'Ríes más, piensas más rápido y te sientes más vivo en su órbita.',
      },
      {
        en: 'They are a harbor in your storm — the kind of person who makes chaos feel manageable.',
        fr: 'Ils sont un port dans ta tempête — le genre de personne qui rend le chaos gérable.',
        ar: 'هم ميناؤك في العاصفة — النوع من الأشخاص الذين يجعلون الفوضى محتملة.',
        es: 'Son un refugio en tu tormenta — el tipo de persona que hace que el caos se sienta manejable.',
      },
      {
        en: 'Around them, your shoulders drop. That is real proof of presence.',
        fr: "Auprès d'eux, tes épaules tombent. C'est une vraie preuve de présence.",
        ar: 'بقربهم، تنخفض كتفاك. هذا دليل حقيقي على الحضور.',
        es: 'Junto a ellos, tus hombros bajan. Esa es prueba real de presencia.',
      },
      {
        en: 'They invite a version of you that you forgot was available.',
        fr: 'Ils invitent une version de toi que tu avais oublié être disponible.',
        ar: 'يستدعون نسخة منك كنت قد نسيت أنها متاحة.',
        es: 'Invocan una versión de ti que habías olvidado que estaba disponible.',
      },
      {
        en: 'Hold on to who fills your battery — the world is full of people who drain it.',
        fr: 'Garde près de toi celui qui remplit ta batterie — le monde regorge de gens qui la vident.',
        ar: 'تمسّك بمن يملأ بطاريتك — فالعالم مليء بمن يستنزفها.',
        es: 'Aférrate a quien te llena la batería — el mundo está lleno de gente que la drena.',
      },
    ],
  },
};
