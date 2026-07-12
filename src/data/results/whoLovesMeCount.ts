import { CountResults } from '../../types';

/**
 * who_loves_me read in SOLO mode → a "signs present" COUNT about ONE person, tiered by
 * signal share. Insights are TIER-keyed (not dimension-keyed): a low/zero read must NEVER
 * draw affirming "their care is quiet but constant" copy — clarity is the kindness.
 *
 * Register: warm, direct, zero horoscope-fog. At the low end, HONEST WITHOUT CRUELTY.
 * The affirming lines (adapted from the who_loves_me multi pools) belong ONLY to `high`.
 */
export const whoLovesMeCountResults: CountResults = {
  tiers: {
    none: {
      en: "Based on your answers, the signs of love just aren't there.",
      fr: "D'après tes réponses, les signes d'amour ne sont tout simplement pas là.",
      ar: 'بناءً على إجاباتك، علامات الحب ببساطة ليست موجودة.',
      es: 'Según tus respuestas, las señales de amor simplemente no están.',
    },
    low: {
      en: 'A few signs, but not a pattern — right now the signal is faint.',
      fr: "Quelques signes, mais pas un schéma — pour l'instant, le signal est faible.",
      ar: 'بعض العلامات، لكنها ليست نمطاً — الإشارة الآن خافتة.',
      es: 'Algunas señales, pero no un patrón — por ahora la señal es débil.',
    },
    medium: {
      en: '{name} shows up in real ways — the pattern is forming, not yet settled.',
      fr: '{name} est là de façon réelle — le schéma se forme, sans être encore établi.',
      ar: '{name} يظهر بطرق حقيقية — النمط يتشكّل، لكنه لم يستقرّ بعد.',
      es: '{name} está presente de formas reales — el patrón se está formando, aún no asentado.',
    },
    high: {
      en: "{name} shows up for you — consistently, not just when it's easy.",
      fr: "{name} est là pour toi — avec constance, pas seulement quand c'est facile.",
      ar: '{name} يظهر لأجلك — بثبات، لا حين يكون الأمر سهلاً فقط.',
      es: '{name} está presente para ti — de forma constante, no solo cuando es fácil.',
    },
  },
  shareLines: {
    none: {
      en: 'I asked the honest questions. I got the honest answer.',
      fr: "J'ai posé les questions honnêtes. J'ai eu la réponse honnête.",
      ar: 'طرحتُ الأسئلة الصادقة، فجاءني الجواب الصادق.',
      es: 'Hice las preguntas honestas. Obtuve la respuesta honesta.',
    },
    low: {
      en: "A flicker isn't a fire. I'm reading the pattern, not the crumbs.",
      fr: "Une étincelle n'est pas un feu. Je lis le schéma, pas les miettes.",
      ar: 'الومضة ليست ناراً. أقرأ النمط لا الفُتات.',
      es: 'Un destello no es un fuego. Leo el patrón, no las migajas.',
    },
    medium: {
      en: "The pattern is forming. I'm paying attention to how it holds.",
      fr: 'Le schéma se dessine. Je regarde comment il tient.',
      ar: 'النمط يتشكّل. أنا أنتبه إلى مدى ثباته.',
      es: 'El patrón se está formando. Estoy atento a cómo se sostiene.',
    },
    high: {
      en: "The signs aren't subtle — they're just quiet.",
      fr: 'Les signes ne sont pas subtils — ils sont juste silencieux.',
      ar: 'العلامات ليست خفية — إنها صامتة فحسب.',
      es: 'Las señales no son sutiles — solo son silenciosas.',
    },
  },
  insights: {
    none: [
      {
        en: "When almost none of the signs show up, the simplest reading is usually the true one: the feeling isn't there right now.",
        fr: "Quand presque aucun signe n'apparaît, la lecture la plus simple est souvent la vraie : le sentiment n'est pas là pour l'instant.",
        ar: 'حين لا تظهر أيّ علامة تقريباً، فإن أبسط تفسير هو الأصحّ غالباً: المشاعر غير موجودة الآن.',
        es: 'Cuando casi ninguna señal aparece, la lectura más simple suele ser la verdadera: el sentimiento no está ahora.',
      },
      {
        en: "Notice who reaches out first, who follows up, who stays. If that's mostly you, the effort is flowing one way.",
        fr: "Regarde qui fait le premier pas, qui relance, qui reste. Si c'est surtout toi, l'effort ne va que dans un sens.",
        ar: 'لاحظ من يبادر أولاً، ومن يتابع، ومن يبقى. إن كان ذلك أنت غالباً، فالجهد يسير في اتجاه واحد.',
        es: 'Fíjate en quién da el primer paso, quién retoma, quién se queda. Si eres tú casi siempre, el esfuerzo va en una sola dirección.',
      },
      {
        en: "You don't have to audition for someone's attention. The right person never makes you prove you're worth staying for.",
        fr: "Tu n'as pas à passer une audition pour l'attention de quelqu'un. La bonne personne ne te fait jamais prouver que tu vaux la peine qu'on reste.",
        ar: 'لست مضطراً لأن تخوض اختباراً لتنال انتباه أحد. الشخص المناسب لا يجعلك تُثبت أبداً أنك تستحقّ البقاء.',
        es: 'No tienes que hacer una audición por la atención de alguien. La persona correcta nunca te hace demostrar que vales la pena.',
      },
      {
        en: 'A low count says something about the connection, not about you. Being unseen by one person is not a verdict on your worth.',
        fr: "Un faible score dit quelque chose sur le lien, pas sur toi. Ne pas être vu par une personne n'est pas un verdict sur ta valeur.",
        ar: 'قلّة العلامات تقول شيئاً عن العلاقة، لا عنك أنت. ألّا يراك شخصٌ واحد ليس حكماً على قيمتك.',
        es: 'Un conteo bajo dice algo sobre la conexión, no sobre ti. Que una persona no te vea no es un veredicto sobre tu valor.',
      },
      {
        en: 'From here, trust what they do far more than what they say. Consistency is the only proof that counts.',
        fr: "À partir de maintenant, fie-toi à ce qu'ils font bien plus qu'à ce qu'ils disent. La constance est la seule preuve qui compte.",
        ar: 'من الآن، ثِق بما يفعلونه أكثر بكثير مما يقولونه. الثبات هو الدليل الوحيد الذي يُعتدّ به.',
        es: 'De aquí en adelante, confía en lo que hacen mucho más que en lo que dicen. La constancia es la única prueba que cuenta.',
      },
      {
        en: 'People make time and room for what matters to them. Where their energy actually goes is your real answer.',
        fr: "Les gens font de la place et du temps pour ce qui compte pour eux. Là où va vraiment leur énergie, c'est ta vraie réponse.",
        ar: 'الناس يخصّصون الوقت والمساحة لما يهمّهم. حيث تذهب طاقتهم فعلاً، هناك جوابك الحقيقي.',
        es: 'La gente hace tiempo y espacio para lo que le importa. Adónde va realmente su energía es tu verdadera respuesta.',
      },
    ],
    low: [
      {
        en: "Occasional warmth is easy; consistent care is the rare thing. A few good moments don't yet add up to steady love.",
        fr: "La chaleur occasionnelle est facile ; le soin constant est ce qui est rare. Quelques bons moments ne font pas encore un amour stable.",
        ar: 'الدفء العابر سهل؛ الاهتمام الثابت هو النادر. لحظات جميلة قليلة لا تُكوّن بعد حباً مستقراً.',
        es: 'La calidez ocasional es fácil; el cuidado constante es lo raro. Unos buenos momentos aún no suman un amor firme.',
      },
      {
        en: "Ask whether they show up out of intention or just convenience. Being around isn't the same as choosing you.",
        fr: "Demande-toi s'ils sont là par intention ou par simple commodité. Être présent n'est pas la même chose que te choisir.",
        ar: 'اسأل نفسك: هل يحضرون عن قصد أم لمجرّد سهولة الأمر؟ الوجود قربك ليس كاختيارك.',
        es: 'Pregúntate si aparecen por intención o solo por comodidad. Estar cerca no es lo mismo que elegirte.',
      },
      {
        en: 'Try not to build a whole story out of a few crumbs. Let the pattern earn your hope before you spend it.',
        fr: "Essaie de ne pas bâtir toute une histoire à partir de quelques miettes. Laisse le schéma mériter ton espoir avant de le dépenser.",
        ar: 'حاول ألّا تبني قصة كاملة من فُتاتٍ قليل. دع النمط يستحقّ أملك قبل أن تمنحه إياه.',
        es: 'Procura no construir una historia entera con unas migajas. Deja que el patrón se gane tu esperanza antes de gastarla.',
      },
      {
        en: "Consistent interest looks like effort you don't have to request — steady, not seasonal.",
        fr: "L'intérêt constant ressemble à un effort que tu n'as pas à réclamer — régulier, pas saisonnier.",
        ar: 'الاهتمام الثابت يبدو كجهد لا تضطر لطلبه — منتظم لا موسمي.',
        es: 'El interés constante se parece a un esfuerzo que no tienes que pedir — estable, no de temporada.',
      },
      {
        en: "You're allowed to want more than a flicker. Wanting steadiness isn't asking for too much.",
        fr: "Tu as le droit de vouloir plus qu'une étincelle. Désirer de la constance, ce n'est pas trop demander.",
        ar: 'من حقك أن تريد أكثر من ومضة. الرغبة في الثبات ليست طلباً مبالغاً فيه.',
        es: 'Tienes derecho a querer más que un destello. Querer estabilidad no es pedir demasiado.',
      },
      {
        en: 'Feelings move. Read this again in a month — a faint signal can grow, or quietly confirm itself.',
        fr: 'Les sentiments évoluent. Relis ceci dans un mois — un signal faible peut grandir, ou se confirmer en silence.',
        ar: 'المشاعر تتغيّر. أعد قراءة هذا بعد شهر — قد تنمو الإشارة الخافتة، أو تؤكّد نفسها بهدوء.',
        es: 'Los sentimientos cambian. Vuelve a leer esto en un mes — una señal débil puede crecer, o confirmarse en silencio.',
      },
    ],
    medium: [
      {
        en: "There are solid signs here — and honest gaps. Both are real; don't erase either one.",
        fr: "Il y a de vrais signes ici — et des manques honnêtes. Les deux sont réels ; n'efface ni l'un ni l'autre.",
        ar: 'هناك علامات صلبة هنا — وثغرات صادقة أيضاً. كلاهما حقيقي؛ لا تُلغِ أياً منهما.',
        es: 'Hay señales sólidas aquí — y vacíos honestos. Ambos son reales; no borres ninguno.',
      },
      {
        en: 'Their care shows up in some rooms but not others. Notice where it comes easily and where it goes quiet.',
        fr: "Leur attention apparaît dans certaines situations, pas dans d'autres. Remarque où c'est facile pour eux et où ça se tait.",
        ar: 'اهتمامهم يظهر في مواقف دون أخرى. لاحظ أين يأتي بسهولة، وأين يصمت.',
        es: 'Su cuidado aparece en algunos espacios y en otros no. Fíjate dónde surge con facilidad y dónde se apaga.',
      },
      {
        en: "An early pattern isn't a settled one. What you have is promising — it just hasn't been tested by time yet.",
        fr: "Un schéma naissant n'est pas un schéma installé. Ce que tu as est prometteur — il n'a simplement pas encore été éprouvé par le temps.",
        ar: 'النمط الناشئ ليس نمطاً راسخاً. ما لديك واعد — لكنه لم يُختبر بالزمن بعد.',
        es: 'Un patrón temprano no es uno asentado. Lo que tienes es prometedor — solo que el tiempo aún no lo ha probado.',
      },
      {
        en: 'Watch the next few weeks more than the last few days. Consistency over time is what turns signs into trust.',
        fr: 'Observe les prochaines semaines plus que les derniers jours. La constance dans le temps transforme les signes en confiance.',
        ar: 'راقب الأسابيع القادمة أكثر من الأيام الماضية. الثبات عبر الزمن هو ما يحوّل العلامات إلى ثقة.',
        es: 'Observa las próximas semanas más que los últimos días. La constancia en el tiempo convierte las señales en confianza.',
      },
      {
        en: 'Check the balance: are you meeting each other halfway, or are you carrying most of the reaching?',
        fr: 'Vérifie l\'équilibre : vous rejoignez-vous à mi-chemin, ou portes-tu l\'essentiel des efforts ?',
        ar: 'افحص التوازن: هل تلتقيان في منتصف الطريق، أم أنك تحمل معظم المبادرة؟',
        es: 'Revisa el equilibrio: ¿se encuentran a mitad de camino, o cargas tú con casi todo el acercamiento?',
      },
      {
        en: 'Look for attention that is steady rather than performed — the quiet follow-through matters more than the grand gesture.',
        fr: "Cherche une attention régulière plutôt que jouée — le suivi discret compte plus que le grand geste.",
        ar: 'ابحث عن انتباهٍ ثابت لا مُتكلَّف — المتابعة الهادئة أهم من اللفتة الكبيرة.',
        es: 'Busca una atención estable en vez de actuada — el seguimiento discreto importa más que el gran gesto.',
      },
    ],
    high: [
      {
        en: 'They are drawn to be your anchor — the person you run to, not from.',
        fr: 'Ils sont attirés à être ton ancre — la personne vers qui tu cours, pas celle dont tu fuis.',
        ar: 'يُجذبون ليكونوا مرساتك — الشخص الذي تركض إليه، لا منه.',
        es: 'Se sienten atraídos a ser tu ancla — la persona a quien corres, no de quien huyes.',
      },
      {
        en: 'Their care is quiet but constant — like gravity, you may not see it, but it holds you.',
        fr: 'Leur amour est silencieux mais constant — comme la gravité, tu ne le vois peut-être pas, mais il te tient.',
        ar: 'اهتمامهم هادئ لكنه ثابت — كالجاذبية، قد لا تراه، لكنه يمسك بك.',
        es: 'Su cuidado es silencioso pero constante — como la gravedad, tal vez no lo ves, pero te sostiene.',
      },
      {
        en: "You don't have to perform for their love. You only have to exist.",
        fr: "Tu n'as pas à jouer un rôle pour leur amour. Tu n'as qu'à exister.",
        ar: 'لا يلزمك أن تتقمص دوراً لتنال حبهم. يكفي أن توجد.',
        es: 'No tienes que actuar para tener su amor. Solo necesitas existir.',
      },
      {
        en: 'They make safety feel ordinary, which is the rarest love there is.',
        fr: "Ils rendent la sécurité ordinaire, ce qui est l'amour le plus rare.",
        ar: 'يجعلون الأمان أمراً عادياً، وهذا أندر أنواع الحب.',
        es: 'Hacen que la seguridad se sienta normal, que es el amor más raro que hay.',
      },
      {
        en: 'You feel seen with them — not just looked at.',
        fr: 'Tu te sens vu avec eux — pas seulement regardé.',
        ar: 'تشعر بأنك مرئي معهم — لا مجرد منظور إليه.',
        es: 'Te sientes visto con ellos — no solo mirado.',
      },
      {
        en: 'Around them, you exhale. That ease is rare — treasure it.',
        fr: "Auprès d'eux, tu expires. Cette aisance est rare — chéris-la.",
        ar: 'في وجودهم، تتنفس الصعداء. هذه الراحة نادرة — احتفظ بها.',
        es: 'Con ellos, exhalas. Esa facilidad es rara — atesórala.',
      },
    ],
  },
};
