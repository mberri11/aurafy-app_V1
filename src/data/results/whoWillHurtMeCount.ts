import { CountResults } from '../../types';

/**
 * who_will_hurt_me read in SOLO mode → "warning signs" count about ONE person.
 * POLARITY IS INVERTED vs the love modules (same as whoHatesMeCount): `none` is the
 * RELIEF (no risk pattern found), `high` is the warning (a consistent pattern —
 * protective advice, never alarmist, never a verdict). Register: measured,
 * validating-without-feeding-paranoia; high tier echoes the module's multi pools.
 */
export const whoWillHurtMeCountResults: CountResults = {
  tiers: {
    none: {
      en: "Good news: the warning signs just aren't there.",
      fr: "Bonne nouvelle : les signaux d'alerte ne sont tout simplement pas là.",
      ar: 'خبر جيد: علامات التحذير ببساطة غير موجودة.',
      es: 'Buenas noticias: las señales de advertencia simplemente no están.',
    },
    low: {
      en: "A few flickers, but nothing that holds a shape — this doesn't read like danger.",
      fr: "Quelques lueurs, mais rien qui tienne une forme — cela ne ressemble pas à un danger.",
      ar: 'ومضات قليلة، لكن لا شيء يتماسك في نمط — هذا لا يُقرأ كخطر.',
      es: 'Algunos destellos, pero nada que mantenga una forma — esto no se lee como peligro.',
    },
    medium: {
      en: 'There are real warning signs with {name} — worth your attention, not your panic.',
      fr: "Il y a de vrais signaux d'alerte avec {name} — ils méritent ton attention, pas ta panique.",
      ar: 'هناك علامات تحذير حقيقية مع {name} — تستحق انتباهك، لا ذعرك.',
      es: 'Hay señales de advertencia reales con {name} — merecen tu atención, no tu pánico.',
    },
    high: {
      en: 'The signs are consistent: {name} fits the pattern of someone who could truly hurt you.',
      fr: 'Les signes sont constants : {name} correspond au profil de quelqu\'un qui pourrait vraiment te blesser.',
      ar: 'العلامات ثابتة: {name} يطابق نمط شخص قد يجرحك فعلًا.',
      es: 'Las señales son constantes: {name} encaja en el patrón de alguien que podría hacerte daño de verdad.',
    },
  },
  shareLines: {
    none: {
      en: 'I checked for sharp edges. Found none.',
      fr: "J'ai cherché les angles tranchants. Je n'en ai trouvé aucun.",
      ar: 'بحثت عن الحواف الحادة فلم أجد شيئًا.',
      es: 'Busqué bordes afilados. No encontré ninguno.',
    },
    low: {
      en: 'A flicker is not a fire.',
      fr: "Une étincelle n'est pas un incendie.",
      ar: 'الشرارة ليست حريقًا.',
      es: 'Un destello no es un incendio.',
    },
    medium: {
      en: "I saw the signs. I'm just done explaining them away.",
      fr: "J'ai vu les signes. J'ai juste fini de leur trouver des excuses.",
      ar: 'رأيت العلامات — لكنني توقفت عن تبريرها.',
      es: 'Vi las señales. Solo dejé de justificarlas.',
    },
    high: {
      en: "How they burned others is how they'll burn you.",
      fr: 'Comme ils ont brûlé les autres, ils te brûleront.',
      ar: 'كما أحرقوا غيرك، سيحرقونك.',
      es: 'Como quemaron a otros, te quemarán a ti.',
    },
  },
  insights: {
    none: [
      {
        en: 'Almost none of the warning markers showed up — whatever you braced for, the pattern says otherwise.',
        fr: "Presque aucun marqueur d'alerte n'est apparu — quoi que tu redoutais, le schéma dit le contraire.",
        ar: 'لم تظهر تقريبًا أيّ من علامات التحذير — مهما كان ما استعددت له، فالنمط يقول عكسه.',
        es: 'Casi ningún marcador de advertencia apareció — para lo que te preparabas, el patrón dice lo contrario.',
      },
      {
        en: 'The carefulness you felt may belong to an older story than this person.',
        fr: "La prudence que tu ressentais appartient peut-être à une histoire plus ancienne que cette personne.",
        ar: 'الحذر الذي شعرت به ربما يعود إلى قصة أقدم من هذا الشخص.',
        es: 'La cautela que sentías quizá pertenece a una historia más antigua que esta persona.',
      },
      {
        en: 'Imperfect is not dangerous — and the signs here say imperfect, at most.',
        fr: "Imparfait n'est pas dangereux — et les signes ici disent imparfait, tout au plus.",
        ar: 'الناقص ليس خطيرًا — والعلامات هنا تقول ناقصًا، على الأكثر.',
        es: 'Imperfecto no es peligroso — y las señales aquí dicen imperfecto, como mucho.',
      },
      {
        en: 'Keep this read: it lets you put down a guard you were carrying for nothing.',
        fr: "Garde cette lecture : elle te permet de baisser une garde que tu portais pour rien.",
        ar: 'احتفظ بهذه القراءة: فهي تتيح لك إنزال درعٍ كنت تحمله بلا سبب.',
        es: 'Guarda esta lectura: te permite bajar una guardia que cargabas por nada.',
      },
      {
        en: 'If a specific moment still bothers you, ask about it directly — clarity beats surveillance.',
        fr: 'Si un moment précis te dérange encore, pose la question directement — la clarté vaut mieux que la surveillance.',
        ar: 'إن كانت لحظة بعينها لا تزال تزعجك، اسأل عنها مباشرة — الوضوح خير من المراقبة.',
        es: 'Si un momento concreto aún te molesta, pregúntalo directamente — la claridad vence a la vigilancia.',
      },
      {
        en: 'Trust given where the pattern is clean is not naivety — it is accuracy.',
        fr: "La confiance accordée là où le schéma est net n'est pas de la naïveté — c'est de la justesse.",
        ar: 'الثقة الممنوحة حيث النمط نظيف ليست سذاجة — بل دقة.',
        es: 'La confianza dada donde el patrón está limpio no es ingenuidad — es precisión.',
      },
    ],
    low: [
      {
        en: 'A few rough edges showed up, but scattered moments are not a motive.',
        fr: 'Quelques aspérités sont apparues, mais des moments épars ne font pas un mobile.',
        ar: 'ظهرت بعض الحواف الخشنة، لكن اللحظات المتفرقة ليست دافعًا.',
        es: 'Aparecieron algunas asperezas, pero los momentos dispersos no son un motivo.',
      },
      {
        en: "Everyone fails a trust test occasionally — a pattern needs repetition, and this doesn't repeat.",
        fr: "Tout le monde échoue parfois à un test de confiance — un schéma exige de la répétition, et ici ça ne se répète pas.",
        ar: 'الجميع يخفق أحيانًا في اختبار للثقة — النمط يحتاج تكرارًا، وهذا لا يتكرر.',
        es: 'Todos fallan alguna prueba de confianza a veces — un patrón necesita repetición, y esto no se repite.',
      },
      {
        en: "Note where the flickers happened. If they return to the same spot, you'll know early.",
        fr: 'Note où les lueurs sont apparues. Si elles reviennent au même endroit, tu le sauras tôt.',
        ar: 'دوّن أين ظهرت الومضات. إن عادت إلى الموضع نفسه، ستعرف مبكرًا.',
        es: 'Anota dónde aparecieron los destellos. Si vuelven al mismo punto, lo sabrás temprano.',
      },
      {
        en: 'This is a person to stay ordinary-careful with — not guarded, just awake.',
        fr: "C'est une personne avec qui rester normalement prudent — pas sur la défensive, juste éveillé.",
        ar: 'هذا شخص تبقى معه حذرًا حذرًا عاديًا — لا متحصنًا، بل يقظًا فحسب.',
        es: 'Es una persona con quien mantener una cautela normal — no a la defensiva, solo despierto.',
      },
      {
        en: "Don't rewrite the whole relationship over a moment or two. The math doesn't support it.",
        fr: 'Ne réécris pas toute la relation pour un moment ou deux. Les chiffres ne le justifient pas.',
        ar: 'لا تُعِد كتابة العلاقة كلها بسبب لحظة أو اثنتين. الحساب لا يدعم ذلك.',
        es: 'No reescribas toda la relación por un momento o dos. Las cuentas no lo respaldan.',
      },
      {
        en: 'Your instinct flagged something worth watching, not something worth fearing.',
        fr: "Ton instinct a signalé quelque chose à observer, pas quelque chose à craindre.",
        ar: 'حدسك أشار إلى شيء يستحق المراقبة، لا شيء يستحق الخوف.',
        es: 'Tu instinto señaló algo que vale la pena observar, no algo que temer.',
      },
    ],
    medium: [
      {
        en: 'The signs are real but not total — this is attention territory, not exile territory.',
        fr: "Les signes sont réels mais pas totaux — c'est le territoire de l'attention, pas celui de l'exil.",
        ar: 'العلامات حقيقية لكنها ليست كاملة — هذه منطقة انتباه، لا منطقة نفي.',
        es: 'Las señales son reales pero no totales — este es territorio de atención, no de exilio.',
      },
      {
        en: 'Protect the soft things first: share fewer secrets while you watch how they handle small ones.',
        fr: "Protège d'abord ce qui est fragile : confie moins de secrets pendant que tu observes comment ils gèrent les petits.",
        ar: 'احمِ الأشياء الرقيقة أولًا: شارك أسرارًا أقل بينما تراقب كيف يتعاملون مع الصغيرة منها.',
        es: 'Protege primero lo frágil: comparte menos secretos mientras observas cómo manejan los pequeños.',
      },
      {
        en: 'What happens after the friction matters most — repair is a skill; watch whether they use it.',
        fr: "Ce qui se passe après la friction compte le plus — réparer est une compétence ; regarde s'ils l'utilisent.",
        ar: 'ما يحدث بعد الاحتكاك هو الأهم — الإصلاح مهارة؛ راقب هل يستخدمونها.',
        es: 'Lo que pasa después de la fricción importa más — reparar es una habilidad; observa si la usan.',
      },
      {
        en: 'Half the pattern here may be carelessness, not malice — but your boundaries work the same either way.',
        fr: "La moitié du schéma est peut-être de la négligence, pas de la malveillance — mais tes limites fonctionnent pareil dans les deux cas.",
        ar: 'نصف النمط هنا قد يكون إهمالًا لا خبثًا — لكن حدودك تعمل بالطريقة نفسها في الحالتين.',
        es: 'La mitad del patrón puede ser descuido, no malicia — pero tus límites funcionan igual en ambos casos.',
      },
      {
        en: "Set one clear limit and watch what they do with it — respect or trespass, it's the answer.",
        fr: "Pose une limite claire et regarde ce qu'ils en font — respect ou transgression, c'est la réponse.",
        ar: 'ضع حدًّا واحدًا واضحًا وراقب ما يفعلونه به — احترام أو تجاوز، تلك هي الإجابة.',
        es: 'Pon un límite claro y mira qué hacen con él — respeto o transgresión, esa es la respuesta.',
      },
      {
        en: 'You are not being dramatic. You are counting, calmly.',
        fr: "Tu ne fais pas de drame. Tu comptes, calmement.",
        ar: 'أنت لا تبالغ. أنت تَعُدّ، بهدوء.',
        es: 'No estás siendo dramático. Estás contando, con calma.',
      },
    ],
    high: [
      {
        en: 'The pattern is consistent: what you keep forgiving is not a phase — it is how they operate.',
        fr: "Le schéma est constant : ce que tu continues de pardonner n'est pas une phase — c'est leur façon de fonctionner.",
        ar: 'النمط ثابت: ما تواصل مسامحته ليس مرحلة — بل طريقتهم في العمل.',
        es: 'El patrón es constante: lo que sigues perdonando no es una fase — es su forma de operar.',
      },
      {
        en: "The best predictor of what they'll do with your trust is what they did with everyone else's.",
        fr: 'Le meilleur indicateur de ce qu\'ils feront de ta confiance est ce qu\'ils ont fait de celle des autres.',
        ar: 'أفضل مؤشر على ما سيفعلونه بثقتك هو ما فعلوه بثقة الآخرين.',
        es: 'El mejor predictor de lo que harán con tu confianza es lo que hicieron con la de los demás.',
      },
      {
        en: "Silence as punishment, kept score, tested boundaries — separately they're flaws; together they're a system.",
        fr: 'Le silence comme punition, les comptes tenus, les limites testées — séparément ce sont des défauts ; ensemble, un système.',
        ar: 'الصمت عقابًا، وإحصاء المعروف، واختبار الحدود — كل واحدة عيب؛ مجتمعةً نظام.',
        es: 'El silencio como castigo, la cuenta llevada, los límites probados — por separado son defectos; juntos son un sistema.',
      },
      {
        en: 'Protect your energy: distance is not cruelty, it is calibration.',
        fr: "Protège ton énergie : la distance n'est pas de la cruauté, c'est du calibrage.",
        ar: 'احمِ طاقتك: المسافة ليست قسوة، بل معايرة.',
        es: 'Protege tu energía: la distancia no es crueldad, es calibración.',
      },
      {
        en: "Safety here doesn't require a scene — just quieter shares and a longer distance.",
        fr: "La sécurité ici n'exige pas de scène — juste des confidences plus rares et une distance plus longue.",
        ar: 'الأمان هنا لا يتطلب مواجهة — فقط مشاركات أهدأ ومسافة أطول.',
        es: 'La seguridad aquí no exige una escena — solo confidencias más calladas y una distancia más larga.',
      },
      {
        en: 'This is information, not a sentence — you decide the distance, calmly and on your terms.',
        fr: "C'est une information, pas une condamnation — c'est toi qui décides de la distance, calmement et selon tes termes.",
        ar: 'هذه معلومة، لا حكم — أنت من يقرر المسافة، بهدوء ووفق شروطك.',
        es: 'Esto es información, no una condena — tú decides la distancia, con calma y en tus términos.',
      },
    ],
  },
};
