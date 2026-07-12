import { MultiResults } from '../../types';

/**
 * WHO WILL HURT ME? — multi (winner-race) results. Sociometry register: protective,
 * measured, never fortune-telling — the verdict names a PATTERN of warning signs, not
 * a destiny ("most likely", "signs", "information, not a sentence"). Mirrors the
 * whoHatesMe house voice: validating without feeding paranoia.
 */
export const whoWillHurtMeResults: MultiResults = {
  winnerTemplate: {
    en: '{name} is the one most likely to hurt you.',
    fr: '{name} est la personne la plus susceptible de te blesser.',
    ar: '{name} هو الأكثر احتمالًا أن يجرحك.',
    es: '{name} es quien tiene más probabilidades de hacerte daño.',
  },
  tieTemplate: {
    en: 'The warning signs are split — {names} carry them in equal measure.',
    fr: "Les signaux d'alerte sont partagés — {names} les portent à parts égales.",
    ar: 'علامات التحذير منقسمة — {names} يحملونها بالتساوي.',
    es: 'Las señales de advertencia están divididas — {names} las llevan por igual.',
  },
  shareLines: {
    trust_erosion: {
      en: "Secrets don't leak. People do.",
      fr: 'Les secrets ne fuient pas. Les gens, si.',
      ar: 'الأسرار لا تتسرّب — الناس هم من يسرّبونها.',
      es: 'Los secretos no se filtran. La gente sí.',
    },
    self_interest: {
      en: 'They loved the favor, not the friend.',
      fr: "Ils aimaient le service, pas l'ami.",
      ar: 'أحبّوا المعروف، لا صاحبه.',
      es: 'Amaban el favor, no al amigo.',
    },
    volatility: {
      en: "How they burned others is how they'll burn you.",
      fr: 'Comme ils ont brûlé les autres, ils te brûleront.',
      ar: 'كما أحرقوا غيرك، سيحرقونك.',
      es: 'Como quemaron a otros, te quemarán a ti.',
    },
  },
  insights: {
    trust_erosion: [
      {
        en: 'A pattern of small leaks predicts the big one — trust is built in the details, and broken there too.',
        fr: "Un schéma de petites fuites annonce la grande — la confiance se construit dans les détails, et s'y brise aussi.",
        ar: 'نمط التسريبات الصغيرة ينبئ بالتسريب الكبير — الثقة تُبنى في التفاصيل، وتنكسر فيها أيضًا.',
        es: 'Un patrón de pequeñas filtraciones predice la grande — la confianza se construye en los detalles, y ahí también se rompe.',
      },
      {
        en: 'You can care about someone and still stop handing them ammunition.',
        fr: "Tu peux tenir à quelqu'un et cesser quand même de lui fournir des munitions.",
        ar: 'يمكنك أن تهتم بشخص وتتوقف مع ذلك عن تسليمه الذخيرة.',
        es: 'Puedes querer a alguien y aun así dejar de entregarle municiones.',
      },
      {
        en: 'Watch what they do with the little things you share — that is the test that never lies.',
        fr: 'Observe ce qu\'ils font des petites choses que tu partages — c\'est le test qui ne ment jamais.',
        ar: 'راقب ما يفعلونه بالأشياء الصغيرة التي تشاركها — هذا هو الاختبار الذي لا يكذب أبدًا.',
        es: 'Observa qué hacen con las cosas pequeñas que compartes — esa es la prueba que nunca miente.',
      },
      {
        en: 'Broken promises feel forgivable one at a time. Count them together and they make a shape.',
        fr: "Les promesses brisées semblent pardonnables une par une. Comptées ensemble, elles dessinent une forme.",
        ar: 'الوعود المنكوثة تبدو قابلة للغفران واحدةً واحدة. اجمعها معًا فترسم شكلًا.',
        es: 'Las promesas rotas parecen perdonables de una en una. Cuéntalas juntas y forman una figura.',
      },
      {
        en: 'The kindest boundary is quiet: share less, watch more, decide later.',
        fr: 'La limite la plus douce est silencieuse : partage moins, observe plus, décide plus tard.',
        ar: 'ألطف الحدود صامتة: شارك أقل، راقب أكثر، وقرر لاحقًا.',
        es: 'El límite más amable es silencioso: comparte menos, observa más, decide después.',
      },
      {
        en: 'People show you how they treat trust long before they break yours.',
        fr: 'Les gens te montrent comment ils traitent la confiance bien avant de briser la tienne.',
        ar: 'يُريك الناس كيف يتعاملون مع الثقة قبل أن يكسروا ثقتك بزمن.',
        es: 'La gente te muestra cómo trata la confianza mucho antes de romper la tuya.',
      },
    ],
    self_interest: [
      {
        en: 'When every exchange leaves you a little poorer, the relationship is an invoice, not a bond.',
        fr: "Quand chaque échange te laisse un peu plus pauvre, la relation est une facture, pas un lien.",
        ar: 'حين تتركك كل مبادلة أفقر قليلًا، فالعلاقة فاتورة لا رابطة.',
        es: 'Cuando cada intercambio te deja un poco más pobre, la relación es una factura, no un vínculo.',
      },
      {
        en: "Score-keepers aren't saving favors — they're saving leverage.",
        fr: 'Ceux qui tiennent les comptes ne gardent pas des services — ils gardent des leviers.',
        ar: 'من يُحصون المعروف لا يدّخرونه — بل يدّخرون وسيلة ضغط.',
        es: 'Los que llevan la cuenta no guardan favores — guardan palancas.',
      },
      {
        en: 'Notice who celebrates your wins with their whole face. The half-smiles are data.',
        fr: 'Remarque qui célèbre tes victoires avec tout son visage. Les demi-sourires sont des données.',
        ar: 'لاحظ من يحتفل بانتصاراتك بوجهه كله. الابتسامات الناقصة معلومات.',
        es: 'Fíjate en quién celebra tus logros con toda la cara. Las medias sonrisas son datos.',
      },
      {
        en: 'A boundary tested is a question asked: "how much will you allow?" Answer early.',
        fr: "Une limite testée est une question posée : « jusqu'où me laisseras-tu aller ? » Réponds tôt.",
        ar: 'الحدّ الذي يُختبر سؤالٌ يُطرح: «كم ستسمح لي؟» أجب مبكرًا.',
        es: 'Un límite puesto a prueba es una pregunta: «¿cuánto vas a permitir?». Responde temprano.',
      },
      {
        en: 'You are allowed to keep people at the distance their behavior earns.',
        fr: "Tu as le droit de garder les gens à la distance que leur comportement mérite.",
        ar: 'يحق لك أن تُبقي الناس على المسافة التي يستحقها سلوكهم.',
        es: 'Tienes derecho a mantener a la gente a la distancia que su conducta merece.',
      },
      {
        en: 'Being useful to someone is not the same as being valued by them.',
        fr: "Être utile à quelqu'un n'est pas la même chose qu'être précieux pour lui.",
        ar: 'أن تكون مفيدًا لشخص ليس كأن تكون ذا قيمة عنده.',
        es: 'Ser útil para alguien no es lo mismo que ser valioso para esa persona.',
      },
    ],
    volatility: [
      {
        en: "The best predictor of how they'll treat you is how they treated the last person who trusted them.",
        fr: 'Le meilleur indicateur de la façon dont ils te traiteront est la façon dont ils ont traité la dernière personne qui leur a fait confiance.',
        ar: 'أفضل مؤشر على معاملتهم لك هو كيف عاملوا آخر شخص وثق بهم.',
        es: 'El mejor predictor de cómo te tratarán es cómo trataron a la última persona que confió en ellos.',
      },
      {
        en: 'Unpredictability is not passion — it is a weather system you keep planning your life around.',
        fr: "L'imprévisibilité n'est pas de la passion — c'est une météo autour de laquelle tu organises ta vie.",
        ar: 'التقلّب ليس شغفًا — بل نظام طقس تُخطط حياتك حوله باستمرار.',
        es: 'La imprevisibilidad no es pasión — es un sistema meteorológico alrededor del cual planeas tu vida.',
      },
      {
        en: 'Silence used as punishment is still aggression — it just leaves no fingerprints.',
        fr: "Le silence utilisé comme punition reste de l'agression — il ne laisse simplement pas d'empreintes.",
        ar: 'الصمت المستخدم عقابًا يظل عدوانًا — لكنه لا يترك بصمات.',
        es: 'El silencio usado como castigo sigue siendo agresión — solo que no deja huellas.',
      },
      {
        en: 'Your body noticed first: the carefulness you never chose is your oldest alarm.',
        fr: "Ton corps l'a remarqué en premier : la prudence que tu n'as jamais choisie est ta plus vieille alarme.",
        ar: 'جسدك لاحظ أولًا: الحذر الذي لم تختره يومًا هو أقدم إنذاراتك.',
        es: 'Tu cuerpo lo notó primero: la cautela que nunca elegiste es tu alarma más antigua.',
      },
      {
        en: "You don't have to catch the storm mid-air. You just have to stop standing where it lands.",
        fr: "Tu n'as pas à attraper la tempête en plein vol. Tu dois juste cesser de te tenir là où elle frappe.",
        ar: 'لست مضطرًا لالتقاط العاصفة في الهواء. يكفي أن تكفّ عن الوقوف حيث تهبط.',
        es: 'No tienes que atrapar la tormenta en el aire. Solo deja de pararte donde cae.',
      },
      {
        en: 'This is a forecast, not a verdict — people change climates, but you plan with the weather you can see.',
        fr: "C'est une prévision, pas un verdict — les gens changent de climat, mais toi, tu planifies avec la météo que tu vois.",
        ar: 'هذه توقعات لا حكم — الناس تتغير مناخاتهم، لكنك تخطط بالطقس الذي تراه.',
        es: 'Esto es un pronóstico, no un veredicto — la gente cambia de clima, pero tú planeas con el tiempo que puedes ver.',
      },
    ],
  },
};
