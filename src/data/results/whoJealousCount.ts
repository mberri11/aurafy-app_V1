import { CountResults } from '../../types';

/**
 * who_jealous read in SOLO mode → "signs of envy" count about ONE person.
 * INVERTED polarity: `none` = clean (their happiness for you is genuine), `high` =
 * consistent envy (grounded caution — never feeds paranoia, never gloats). High tier
 * adapts the module's multi pools.
 */
export const whoJealousCountResults: CountResults = {
  tiers: {
    none: {
      en: 'Clean read: no real signs of envy — their happiness for you looks genuine.',
      fr: 'Lecture nette : pas de vrais signes de jalousie — leur joie pour toi semble sincère.',
      ar: 'قراءة نظيفة: لا علامات حسد حقيقية — فرحهم لك يبدو صادقاً.',
      es: 'Lectura limpia: sin señales reales de envidia — su alegría por ti parece genuina.',
    },
    low: {
      en: 'A flicker of comparison here and there — human, not hostile.',
      fr: 'Une étincelle de comparaison çà et là — humain, pas hostile.',
      ar: 'ومضة مقارنة هنا وهناك — أمر بشري، لا عدائي.',
      es: 'Un destello de comparación aquí y allá — humano, no hostil.',
    },
    medium: {
      en: '{name} is keeping quiet score — the envy is forming, not yet fixed.',
      fr: '{name} tient un compte silencieux — la jalousie se forme, sans être encore figée.',
      ar: '{name} يحتفظ بحسابٍ صامت — الحسد يتشكّل، لكنه لم يترسّخ بعد.',
      es: '{name} lleva una cuenta silenciosa — la envidia se está formando, aún no fija.',
    },
    high: {
      en: 'The signs are consistent: {name} is watching your life with a quiet edge.',
      fr: 'Les signes sont constants : {name} observe ta vie avec une pointe silencieuse.',
      ar: 'العلامات ثابتة: {name} يراقب حياتك بحدّة صامتة.',
      es: 'Las señales son constantes: {name} observa tu vida con un filo silencioso.',
    },
  },
  shareLines: {
    none: {
      en: 'Turns out some people just love you out loud.',
      fr: 'Il s\'avère que certaines personnes t\'aiment tout haut, tout simplement.',
      ar: 'اتضح أن بعض الناس يحبونك بصوت عالٍ فحسب.',
      es: 'Resulta que hay gente que simplemente te quiere en voz alta.',
    },
    low: {
      en: 'A glance at your lane is not a race.',
      fr: "Un coup d'œil sur ta voie n'est pas une course.",
      ar: 'نظرة إلى مسارك ليست سباقاً.',
      es: 'Una mirada a tu carril no es una carrera.',
    },
    medium: {
      en: 'Some applause comes with a scoreboard behind it.',
      fr: 'Certains applaudissements cachent un tableau des scores.',
      ar: 'بعض التصفيق يخفي خلفه لوحة نتائج.',
      es: 'Algunos aplausos traen un marcador detrás.',
    },
    high: {
      en: 'Your wins are keeping someone up at night.',
      fr: "Tes victoires empêchent quelqu'un de dormir.",
      ar: 'انتصاراتك تُبقي أحدهم مستيقظاً في الليل.',
      es: 'Tus victorias le quitan el sueño a alguien.',
    },
  },
  insights: {
    none: [
      {
        en: 'The envy markers just did not show — when this person claps for you, they mean it.',
        fr: "Les marqueurs de jalousie ne sont tout simplement pas apparus — quand cette personne t'applaudit, elle le pense.",
        ar: 'علامات الحسد لم تظهر ببساطة — حين يصفّق لك هذا الشخص، فهو يعني ذلك.',
        es: 'Los marcadores de envidia simplemente no aparecieron — cuando esta persona te aplaude, lo dice en serio.',
      },
      {
        en: 'Someone who can celebrate you without flinching is rarer than you think — keep them.',
        fr: "Quelqu'un qui peut te célébrer sans ciller est plus rare que tu ne le crois — garde-le.",
        ar: 'من يستطيع الاحتفاء بك دون أن يجفل أندر مما تظن — تمسّك به.',
        es: 'Alguien que puede celebrarte sin inmutarse es más raro de lo que crees — consérvalo.',
      },
      {
        en: 'You can share your good news with this person at full volume — the signs say it lands as joy.',
        fr: 'Tu peux partager tes bonnes nouvelles avec cette personne à plein volume — les signes disent qu\'elles atterrissent en joie.',
        ar: 'يمكنك مشاركة أخبارك السعيدة مع هذا الشخص بأعلى صوت — العلامات تقول إنها تصل فرحاً.',
        es: 'Puedes compartir tus buenas noticias con esta persona a todo volumen — las señales dicen que aterrizan como alegría.',
      },
      {
        en: 'If you have been shrinking your wins around them, this read says you never needed to.',
        fr: "Si tu minimisais tes victoires devant eux, cette lecture dit que tu n'en as jamais eu besoin.",
        ar: 'إن كنت تُصغّر انتصاراتك أمامهم، فهذه القراءة تقول إنك لم تكن بحاجة لذلك قط.',
        es: 'Si has estado achicando tus logros frente a esa persona, esta lectura dice que nunca hizo falta.',
      },
      {
        en: 'Suspicion is expensive. Here, you can put that budget somewhere better.',
        fr: 'La suspicion coûte cher. Ici, tu peux mettre ce budget ailleurs, mieux.',
        ar: 'الريبة مكلفة. هنا يمكنك وضع تلك الميزانية في مكان أفضل.',
        es: 'La sospecha es cara. Aquí puedes poner ese presupuesto en algo mejor.',
      },
      {
        en: 'A clean read is also a mirror: notice how good it feels, and be this person for someone else.',
        fr: "Une lecture nette est aussi un miroir : remarque comme c'est bon, et sois cette personne pour quelqu'un d'autre.",
        ar: 'القراءة النظيفة مرآة أيضاً: لاحظ كم هي شعور جميل، وكن أنت هذا الشخص لغيرك.',
        es: 'Una lectura limpia también es un espejo: nota lo bien que se siente, y sé esa persona para alguien más.',
      },
    ],
    low: [
      {
        en: 'A few comparison flickers showed up — the kind almost everyone has and almost no one acts on.',
        fr: 'Quelques étincelles de comparaison sont apparues — du genre que presque tout le monde a et sur lequel presque personne n\'agit.',
        ar: 'ظهرت ومضات مقارنة قليلة — من النوع الذي يملكه الجميع تقريباً ولا يتصرف بموجبه أحد تقريباً.',
        es: 'Aparecieron algunos destellos de comparación — del tipo que casi todos tienen y con el que casi nadie actúa.',
      },
      {
        en: 'Noticing your life is not the same as resenting it — the count stayed on the safe side.',
        fr: "Remarquer ta vie n'est pas la même chose que lui en vouloir — le compte est resté du côté sûr.",
        ar: 'ملاحظة حياتك ليست كالاستياء منها — بقي العدّ في الجانب الآمن.',
        es: 'Notar tu vida no es lo mismo que resentirla — el conteo quedó del lado seguro.',
      },
      {
        en: 'Envy at this level usually reads as "I want that too," not "I want you to lose it."',
        fr: 'À ce niveau, la jalousie se lit généralement comme « je veux ça aussi », pas « je veux que tu le perdes ».',
        ar: 'الحسد عند هذا المستوى يُقرأ عادةً: "أريد ذلك أيضاً"، لا "أريدك أن تخسره".',
        es: 'La envidia a este nivel suele leerse como "yo también quiero eso", no "quiero que lo pierdas".',
      },
      {
        en: 'Keep sharing honestly — hiding your wins would create the distance you are trying to avoid.',
        fr: 'Continue à partager honnêtement — cacher tes victoires créerait la distance que tu essaies d\'éviter.',
        ar: 'واصل المشاركة بصدق — إخفاء انتصاراتك سيصنع المسافة التي تحاول تجنّبها.',
        es: 'Sigue compartiendo con honestidad — esconder tus logros crearía la distancia que intentas evitar.',
      },
      {
        en: 'Watch one thing only: whether their flickers turn into digs. Flickers pass; digs repeat.',
        fr: "Surveille une seule chose : si leurs étincelles deviennent des piques. Les étincelles passent ; les piques se répètent.",
        ar: 'راقب شيئاً واحداً فقط: هل تتحول ومضاتهم إلى طعنات. الومضات تمرّ؛ الطعنات تتكرر.',
        es: 'Vigila una sola cosa: si sus destellos se vuelven indirectas. Los destellos pasan; las indirectas se repiten.',
      },
      {
        en: 'A little envy inside a real friendship is weather, not climate.',
        fr: "Un peu de jalousie dans une vraie amitié, c'est de la météo, pas du climat.",
        ar: 'قليل من الحسد داخل صداقة حقيقية هو طقسٌ عابر، لا مناخ.',
        es: 'Un poco de envidia dentro de una amistad real es clima del día, no del año.',
      },
    ],
    medium: [
      {
        en: 'They tell your wins as luck and theirs as merit — that imbalance is the tell.',
        fr: 'Ils racontent tes victoires comme de la chance et les leurs comme du mérite — ce déséquilibre les trahit.',
        ar: 'يصفون انتصاراتك بالحظ وانتصاراتهم بالاستحقاق — هذا التفاوت يفضحهم.',
        es: 'Cuentan tus triunfos como suerte y los suyos como mérito — ese desequilibrio los delata.',
      },
      {
        en: 'The pattern is forming but not fixed — some envy softens when life gives the person their own win.',
        fr: 'Le schéma se forme mais n\'est pas figé — certaines jalousies s\'adoucissent quand la vie offre à la personne sa propre victoire.',
        ar: 'النمط يتشكّل لكنه غير ثابت — بعض الحسد يلين حين تمنح الحياة صاحبه انتصاره الخاص.',
        es: 'El patrón se forma pero no está fijo — parte de la envidia se suaviza cuando la vida le da a esa persona su propio triunfo.',
      },
      {
        en: 'Notice which of your wins lands hardest on them — that is the wound talking, and it predates you.',
        fr: "Remarque laquelle de tes victoires les frappe le plus fort — c'est la blessure qui parle, et elle te précède.",
        ar: 'لاحظ أيّ انتصاراتك يقع عليهم أثقل — فذاك هو الجرح يتكلم، وهو أقدم منك.',
        es: 'Nota cuál de tus triunfos les cae más pesado — esa es la herida hablando, y es anterior a ti.',
      },
      {
        en: 'You can stay warm without narrating your whole life to them — share the headlines, keep the details.',
        fr: 'Tu peux rester chaleureux sans leur raconter toute ta vie — partage les gros titres, garde les détails.',
        ar: 'يمكنك البقاء ودوداً دون سرد حياتك كلها لهم — شارك العناوين واحتفظ بالتفاصيل.',
        es: 'Puedes mantenerte cálido sin narrarles toda tu vida — comparte los titulares, guarda los detalles.',
      },
      {
        en: 'Half-competition can still turn back into friendship — but only if they do that work, not you.',
        fr: "Une demi-compétition peut encore redevenir une amitié — mais seulement si c'est eux qui font ce travail, pas toi.",
        ar: 'نصف المنافسة قد يعود صداقةً — لكن فقط إذا قاموا هم بذلك العمل، لا أنت.',
        es: 'Una media competencia aún puede volver a ser amistad — pero solo si ese trabajo lo hacen ellos, no tú.',
      },
      {
        en: 'Do not audition for their approval — you would be feeding the exact scoreboard that hurts you.',
        fr: "Ne passe pas d'audition pour leur approbation — tu nourrirais exactement le tableau des scores qui te blesse.",
        ar: 'لا تخضع لاختبار نيل رضاهم — فستغذّي لوحة النتائج ذاتها التي تؤذيك.',
        es: 'No hagas audición por su aprobación — alimentarías justo el marcador que te lastima.',
      },
    ],
    high: [
      {
        en: 'Their competition with you is one-sided — you didn\'t enter this race.',
        fr: "Leur compétition avec toi est unilatérale — tu n'as pas participé à cette course.",
        ar: 'منافستهم لك من طرف واحد — لم تدخل هذا السباق.',
        es: 'Su competencia contigo es unilateral — tú no entraste en esta carrera.',
      },
      {
        en: 'They study you when they think you\'re not looking — that is the shape of envy.',
        fr: "Ils t'étudient quand ils pensent que tu ne regardes pas — c'est la forme de l'envie.",
        ar: 'يدرسونك حين يظنون أنك لا تنظر — تلك هي ملامح الحسد.',
        es: 'Te estudian cuando creen que no miras — esa es la forma de la envidia.',
      },
      {
        en: 'When your good news lands as a wound for them, the wound is older than you.',
        fr: 'Quand tes bonnes nouvelles atterrissent comme une blessure chez eux, la blessure est plus ancienne que toi.',
        ar: 'حين تقع أخبارك الجيدة كجرح عندهم، فالجرح أقدم منك.',
        es: 'Cuando tus buenas noticias aterrizan como una herida en ellos, la herida es más vieja que tú.',
      },
      {
        en: "You don't need to dim yourself so they can feel taller.",
        fr: "Tu n'as pas à t'éteindre pour qu'ils se sentent plus grands.",
        ar: 'لست مضطراً لأن تخفّض نورك ليشعروا بالعلو.',
        es: 'No necesitas apagarte para que ellos se sientan más altos.',
      },
      {
        en: 'You can be friendly to someone you have stopped explaining yourself to.',
        fr: "Tu peux être aimable avec quelqu'un à qui tu as cessé de t'expliquer.",
        ar: 'يمكنك أن تكون لطيفاً مع شخص توقفت عن تبرير نفسك أمامه.',
        es: 'Puedes ser amable con alguien a quien dejaste de explicarte.',
      },
      {
        en: 'Jealousy from others is a sign you are living a life worth wanting — protect it, don\'t apologize for it.',
        fr: "La jalousie des autres est un signe que tu vis une vie qui vaut la peine d'être désirée — protège-la, ne t'en excuse pas.",
        ar: 'غيرة الآخرين علامة أنك تعيش حياة تستحق الرغبة — احمِها ولا تعتذر عنها.',
        es: 'Los celos ajenos son señal de que vives una vida digna de desear — protégela, no te disculpes por ella.',
      },
    ],
  },
};
