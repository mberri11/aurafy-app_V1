import { CountResults } from '../../types';

/**
 * who_hates_me read in SOLO mode → "signs of resentment" count about ONE person.
 * POLARITY IS INVERTED vs the love modules: `none` is the RELIEF (no hostility found),
 * `high` is the warning (consistent hostility — protective advice, never alarmist).
 * Register: measured, validating-without-feeding-paranoia. High tier adapts the module's
 * multi pools (which describe the strong-hostility case).
 */
export const whoHatesMeCountResults: CountResults = {
  tiers: {
    none: {
      en: "Good news: the signs of resentment just aren't there.",
      fr: 'Bonne nouvelle : les signes de ressentiment ne sont tout simplement pas là.',
      ar: 'خبر جيد: علامات الضغينة ببساطة غير موجودة.',
      es: 'Buenas noticias: las señales de resentimiento simplemente no están.',
    },
    low: {
      en: 'A little friction, but no real hostility — this reads like ordinary human static.',
      fr: "Un peu de friction, mais pas de vraie hostilité — cela ressemble à des parasites ordinaires entre humains.",
      ar: 'قليل من الاحتكاك، لكن لا عداء حقيقياً — يبدو هذا تشويشاً بشرياً عادياً.',
      es: 'Un poco de fricción, pero sin hostilidad real — esto parece estática humana normal.',
    },
    medium: {
      en: 'There is real tension with {name} — not open war, but more than a bad day.',
      fr: "Il y a une vraie tension avec {name} — pas une guerre ouverte, mais plus qu'une mauvaise journée.",
      ar: 'هناك توتر حقيقي مع {name} — ليس حرباً معلنة، لكنه أكثر من يوم سيّئ.',
      es: 'Hay una tensión real con {name} — no una guerra abierta, pero más que un mal día.',
    },
    high: {
      en: 'The signs are consistent: {name} carries real resentment toward you.',
      fr: 'Les signes sont constants : {name} nourrit un vrai ressentiment envers toi.',
      ar: 'العلامات ثابتة: {name} يحمل ضغينة حقيقية تجاهك.',
      es: 'Las señales son constantes: {name} guarda un resentimiento real hacia ti.',
    },
  },
  shareLines: {
    none: {
      en: 'I checked the shadows. There was nothing there.',
      fr: "J'ai vérifié les ombres. Il n'y avait rien.",
      ar: 'تفقّدتُ الظلال، فلم أجد شيئاً.',
      es: 'Revisé las sombras. No había nada.',
    },
    low: {
      en: 'A little static is not a storm.',
      fr: "Un peu de parasites, ce n'est pas une tempête.",
      ar: 'قليل من التشويش ليس عاصفة.',
      es: 'Un poco de estática no es una tormenta.',
    },
    medium: {
      en: "I'm not imagining the tension. I'm just done pretending it isn't there.",
      fr: "Je n'imagine pas la tension. J'ai juste cessé de faire comme si elle n'existait pas.",
      ar: 'أنا لا أتخيّل التوتر — لكنني توقفت عن التظاهر بأنه غير موجود.',
      es: 'No imagino la tensión. Solo dejé de fingir que no está.',
    },
    high: {
      en: 'Not everyone clapping was cheering.',
      fr: "Tous ceux qui applaudissaient n'encourageaient pas.",
      ar: 'ليس كل من صفّق كان يهتف لك.',
      es: 'No todos los que aplaudían te animaban.',
    },
  },
  insights: {
    none: [
      {
        en: 'Almost none of the hostility markers showed up — whatever you feared, the pattern says otherwise.',
        fr: "Presque aucun marqueur d'hostilité n'est apparu — quoi que tu craignais, le schéma dit le contraire.",
        ar: 'لم تظهر تقريباً أيّ من علامات العداء — مهما كان ما خشيته، فالنمط يقول عكسه.',
        es: 'Casi ningún marcador de hostilidad apareció — temieras lo que temieras, el patrón dice lo contrario.',
      },
      {
        en: 'Sometimes the story in your head is louder than the person in front of you. Here, it was the story.',
        fr: "Parfois, l'histoire dans ta tête est plus forte que la personne en face de toi. Ici, c'était l'histoire.",
        ar: 'أحياناً تكون القصة في رأسك أعلى صوتاً من الشخص أمامك. هنا، كانت القصة.',
        es: 'A veces la historia en tu cabeza suena más fuerte que la persona frente a ti. Aquí, era la historia.',
      },
      {
        en: 'Distance or awkwardness can look like dislike from the inside — the signs say it never was.',
        fr: "La distance ou la gêne peuvent ressembler à de l'aversion vue de l'intérieur — les signes disent que ça ne l'a jamais été.",
        ar: 'قد يبدو البُعد أو الحرج كراهيةً من الداخل — لكن العلامات تقول إنه لم يكن كذلك قط.',
        es: 'La distancia o la torpeza pueden parecer antipatía desde dentro — las señales dicen que nunca lo fue.',
      },
      {
        en: 'A clean read like this is worth keeping: you can lower a shield you did not need.',
        fr: "Une lecture aussi nette vaut la peine d'être gardée : tu peux baisser un bouclier dont tu n'avais pas besoin.",
        ar: 'قراءة نظيفة كهذه تستحق الحفظ: يمكنك إنزال درعٍ لم تكن بحاجة إليه.',
        es: 'Una lectura tan limpia vale la pena guardarla: puedes bajar un escudo que no necesitabas.',
      },
      {
        en: 'If something still feels off, name it out loud with them — clarity beats detective work.',
        fr: "Si quelque chose semble encore étrange, nomme-le à voix haute avec eux — la clarté vaut mieux que le travail de détective.",
        ar: 'إن كان شيء ما لا يزال يبدو غريباً، فسمِّه بصوت عالٍ معهم — الوضوح خير من عمل المحقق.',
        es: 'Si algo aún se siente raro, nómbralo en voz alta con esa persona — la claridad vence al trabajo de detective.',
      },
      {
        en: 'Spend the energy you were using to watch them on the people who clearly enjoy you.',
        fr: "Dépense l'énergie que tu utilisais à les surveiller pour les gens qui t'apprécient clairement.",
        ar: 'أنفق الطاقة التي كنت تستخدمها في مراقبتهم على من يستمتعون بوجودك بوضوح.',
        es: 'Gasta la energía que usabas en vigilarlos en la gente que claramente disfruta de ti.',
      },
    ],
    low: [
      {
        en: 'A few rough moments showed up — but scattered friction is not a campaign against you.',
        fr: 'Quelques moments rugueux sont apparus — mais une friction éparse n\'est pas une campagne contre toi.',
        ar: 'ظهرت لحظات خشنة قليلة — لكن الاحتكاك المتفرّق ليس حملة ضدك.',
        es: 'Aparecieron algunos momentos ásperos — pero la fricción dispersa no es una campaña contra ti.',
      },
      {
        en: 'Most tension this size is about their day, their stress, their stuff — not about you.',
        fr: 'Une tension de cette taille concerne le plus souvent leur journée, leur stress, leurs affaires — pas toi.',
        ar: 'توتر بهذا الحجم غالباً يخصّ يومهم وضغطهم وشؤونهم — لا أنت.',
        es: 'Una tensión de este tamaño suele ser por su día, su estrés, sus cosas — no por ti.',
      },
      {
        en: "Don't promote an irritation into an enemy. The evidence doesn't support the promotion.",
        fr: "Ne promeus pas une irritation au rang d'ennemi. Les preuves ne soutiennent pas cette promotion.",
        ar: 'لا ترقِّ انزعاجاً إلى رتبة عدوّ. الأدلة لا تدعم هذه الترقية.',
        es: 'No asciendas una irritación a enemigo. La evidencia no respalda ese ascenso.',
      },
      {
        en: 'Watch whether the friction repeats in the same spot — a pattern has an address, noise does not.',
        fr: "Observe si la friction se répète au même endroit — un schéma a une adresse, le bruit n'en a pas.",
        ar: 'راقب إن كان الاحتكاك يتكرر في الموضع نفسه — النمط له عنوان، أما الضجيج فلا.',
        es: 'Observa si la fricción se repite en el mismo punto — un patrón tiene dirección, el ruido no.',
      },
      {
        en: 'One honest conversation would likely dissolve most of what you counted here.',
        fr: 'Une conversation honnête dissoudrait probablement la majeure partie de ce que tu as compté ici.',
        ar: 'محادثة صادقة واحدة ستذيب على الأرجح معظم ما عددته هنا.',
        es: 'Una conversación honesta probablemente disolvería la mayor parte de lo que contaste aquí.',
      },
      {
        en: 'Keep your warmth — guardedness at this level costs you more than it protects.',
        fr: 'Garde ta chaleur — la méfiance à ce niveau te coûte plus qu\'elle ne te protège.',
        ar: 'احتفظ بدفئك — الحذر عند هذا المستوى يكلّفك أكثر مما يحميك.',
        es: 'Conserva tu calidez — la desconfianza a este nivel te cuesta más de lo que te protege.',
      },
    ],
    medium: [
      {
        en: 'The tension you feel is real — your instincts are reading the room correctly.',
        fr: 'La tension que tu ressens est réelle — tes instincts lisent correctement la situation.',
        ar: 'التوتر الذي تشعر به حقيقي — غرائزك تقرأ الموقف بشكل صحيح.',
        es: 'La tensión que sientes es real — tus instintos están leyendo la situación correctamente.',
      },
      {
        en: 'Something between you has soured, but it has not fully hardened — this stage can still be talked to.',
        fr: "Quelque chose entre vous s'est aigri, mais n'a pas encore complètement durci — à ce stade, on peut encore se parler.",
        ar: 'شيء بينكما فسد، لكنه لم يتصلّب تماماً بعد — هذه المرحلة لا يزال يمكن مخاطبتها.',
        es: 'Algo entre ustedes se agrió, pero aún no se endureció del todo — esta etapa todavía admite una conversación.',
      },
      {
        en: 'Notice where the coldness spikes — the specific trigger tells you what this is actually about.',
        fr: 'Remarque où la froideur monte en flèche — le déclencheur précis te dit de quoi il s\'agit vraiment.',
        ar: 'لاحظ أين يشتدّ البرود — المحفّز المحدد يخبرك بحقيقة الأمر.',
        es: 'Fíjate dónde se dispara la frialdad — el detonante específico te dice de qué se trata realmente.',
      },
      {
        en: 'Their negativity may say more about their unresolved pain than it does about you.',
        fr: 'Leur négativité en dit peut-être plus sur leur douleur non résolue que sur toi.',
        ar: 'قد تقول سلبيتهم عن ألمهم غير المحلول أكثر مما تقول عنك.',
        es: 'Su negatividad puede decir más sobre su dolor no resuelto que sobre ti.',
      },
      {
        en: 'Stay polite, stay alert — give them nothing to build a case with while you watch the pattern.',
        fr: 'Reste poli, reste vigilant — ne leur donne rien pour bâtir un dossier pendant que tu observes le schéma.',
        ar: 'ابقَ مهذّباً ويقظاً — لا تعطهم شيئاً يبنون به ملفاً بينما تراقب النمط.',
        es: 'Mantente cortés, mantente alerta — no les des nada para armar un expediente mientras observas el patrón.',
      },
      {
        en: "Don't hand this person your unguarded stories yet — trust is earned back in increments.",
        fr: "Ne confie pas encore tes histoires sans défense à cette personne — la confiance se regagne par paliers.",
        ar: 'لا تسلّم هذا الشخص قصصك المكشوفة بعد — الثقة تُستعاد على دفعات.',
        es: 'No le entregues aún tus historias sin resguardo — la confianza se recupera por partes.',
      },
    ],
    high: [
      {
        en: 'You are not imagining it: their warmth runs cold the moment you arrive.',
        fr: "Tu n'imagines rien : leur chaleur devient froide dès que tu arrives.",
        ar: 'أنت لا تتخيّل: دفؤهم يبرد لحظة وصولك.',
        es: 'No lo imaginas: su calidez se enfría apenas llegas.',
      },
      {
        en: 'A small jab repeated often is not a joke — it is a strategy.',
        fr: "Un petit coup répété souvent n'est pas une blague — c'est une stratégie.",
        ar: 'الطعنة الصغيرة المتكررة ليست مزحة — بل خطة.',
        es: 'Un pequeño pinchazo repetido no es una broma — es una estrategia.',
      },
      {
        en: 'Protect your energy — distance is not defeat, it is wisdom.',
        fr: "Protège ton énergie — la distance n'est pas une défaite, c'est de la sagesse.",
        ar: 'احمِ طاقتك — البُعد ليس هزيمة، بل حكمة.',
        es: 'Protege tu energía — la distancia no es derrota, es sabiduría.',
      },
      {
        en: 'When someone keeps a list of your missteps, they are building a case, not a friendship.',
        fr: "Quand quelqu'un tient la liste de tes faux pas, il construit un dossier, pas une amitié.",
        ar: 'حين يحتفظ شخص بقائمة أخطائك، فهو يبني ملفاً، لا صداقة.',
        es: 'Cuando alguien lleva una lista de tus errores, construye un expediente, no una amistad.',
      },
      {
        en: "You don't owe warmth to someone whose presence asks you to flinch.",
        fr: "Tu ne dois pas la chaleur à quelqu'un dont la présence te fait sursauter.",
        ar: 'لا تدين بالدفء لشخص يجعلك حضوره ترتعد.',
        es: 'No le debes calidez a alguien cuya presencia te hace estremecer.',
      },
      {
        en: 'This is information, not a sentence — you get to decide the distance, calmly and on your terms.',
        fr: "C'est une information, pas une condamnation — c'est toi qui décides de la distance, calmement et selon tes termes.",
        ar: 'هذه معلومة، لا حكم — أنت من يقرر المسافة، بهدوء ووفق شروطك.',
        es: 'Esto es información, no una condena — tú decides la distancia, con calma y en tus términos.',
      },
    ],
  },
};
