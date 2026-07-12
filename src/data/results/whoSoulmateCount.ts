import { CountResults } from '../../types';

/**
 * who_soulmate read in SOLO mode → "resonance signs" count about ONE person.
 * POSITIVE polarity, but with the module's mystic-tinged voice ("frequency",
 * "resonance") kept grounded: `none` must free the user, not crush them — no
 * "you'll never find love" fog. High tier adapts the module's multi pools.
 */
export const whoSoulmateCountResults: CountResults = {
  tiers: {
    none: {
      en: "The frequencies don't align — whatever this is, it isn't a soulmate signal right now.",
      fr: "Les fréquences ne s'alignent pas — quoi que ce soit, ce n'est pas un signal d'âme sœur pour l'instant.",
      ar: 'التردّدات غير متوافقة — مهما كان هذا، فهو ليس إشارة توأم روح الآن.',
      es: 'Las frecuencias no se alinean — sea lo que sea esto, no es una señal de alma gemela por ahora.',
    },
    low: {
      en: 'A pleasant connection, but the deep resonance is faint — friendly wavelengths, not matching ones.',
      fr: "Une connexion agréable, mais la résonance profonde est faible — des ondes amicales, pas des ondes accordées.",
      ar: 'صلة لطيفة، لكن الانسجام العميق خافت — موجات ودّية، لا موجات متطابقة.',
      es: 'Una conexión agradable, pero la resonancia profunda es débil — ondas amistosas, no acordadas.',
    },
    medium: {
      en: '{name} resonates with you in real ways — the frequency is finding itself, not yet locked.',
      fr: "{name} résonne avec toi de façon réelle — la fréquence se cherche encore, sans être verrouillée.",
      ar: '{name} ينسجم معك بطرق حقيقية — التردّد يجد طريقه، لكنه لم يثبت بعد.',
      es: '{name} resuena contigo de formas reales — la frecuencia se está encontrando, aún no fijada.',
    },
    high: {
      en: '{name} resonates with you deeply — this is what a soulmate frequency looks like.',
      fr: "{name} résonne profondément avec toi — voilà à quoi ressemble une fréquence d'âme sœur.",
      ar: '{name} ينسجم معك بعمق — هكذا يبدو تردّد توأم الروح.',
      es: '{name} resuena contigo profundamente — así se ve una frecuencia de alma gemela.',
    },
  },
  shareLines: {
    none: {
      en: 'Not every connection is a destination. Some are just directions.',
      fr: 'Toute connexion n\'est pas une destination. Certaines ne sont que des directions.',
      ar: 'ليست كل صلة وجهةً. بعضها مجرد اتجاهات.',
      es: 'No toda conexión es un destino. Algunas son solo direcciones.',
    },
    low: {
      en: 'A nice song. Just not my song.',
      fr: 'Une jolie chanson. Mais pas ma chanson.',
      ar: 'أغنية جميلة — لكنها ليست أغنيتي.',
      es: 'Una linda canción. Solo que no es mi canción.',
    },
    medium: {
      en: 'The frequency is real. Now I watch whether it holds.',
      fr: 'La fréquence est réelle. Maintenant je regarde si elle tient.',
      ar: 'التردّد حقيقي. والآن أراقب هل سيثبت.',
      es: 'La frecuencia es real. Ahora observo si se sostiene.',
    },
    high: {
      en: "Some souls don't meet. They recognize.",
      fr: 'Certaines âmes ne se rencontrent pas. Elles se reconnaissent.',
      ar: 'بعض الأرواح لا تلتقي — بل تتعارف.',
      es: 'Algunas almas no se conocen. Se reconocen.',
    },
  },
  insights: {
    none: [
      {
        en: 'Low resonance is not a verdict on either of you — some good people are simply not tuned to each other.',
        fr: "Une faible résonance n'est un verdict pour aucun de vous deux — certaines bonnes personnes ne sont simplement pas accordées entre elles.",
        ar: 'ضعف الانسجام ليس حكماً على أيّ منكما — بعض الطيبين ببساطة غير متناغمين معاً.',
        es: 'La baja resonancia no es un veredicto sobre ninguno de los dos — hay buenas personas que simplemente no están afinadas entre sí.',
      },
      {
        en: 'If being around them feels like work, believe that feeling — ease is the first language of a real match.',
        fr: "Si être avec eux te demande un effort, crois ce sentiment — l'aisance est la première langue d'une vraie compatibilité.",
        ar: 'إن كان وجودك معهم يشبه العمل، فصدّق هذا الشعور — السهولة هي أولى لغات التوافق الحقيقي.',
        es: 'Si estar con esa persona se siente como trabajo, cree en esa sensación — la facilidad es el primer idioma de una unión real.',
      },
      {
        en: 'You may be in love with the idea of them — the reading measured the person, not the idea.',
        fr: "Tu es peut-être amoureux de l'idée d'eux — la lecture a mesuré la personne, pas l'idée.",
        ar: 'ربما تحب فكرتهم لا شخصهم — القراءة قاست الشخص، لا الفكرة.',
        es: 'Puede que estés enamorado de la idea de esa persona — la lectura midió a la persona, no la idea.',
      },
      {
        en: 'Letting go of a frequency that never matched is not giving up — it is clearing the channel.',
        fr: "Lâcher une fréquence qui ne s'est jamais accordée n'est pas abandonner — c'est libérer le canal.",
        ar: 'التخلّي عن تردّد لم يتوافق يوماً ليس استسلاماً — بل إخلاءٌ للقناة.',
        es: 'Soltar una frecuencia que nunca coincidió no es rendirse — es despejar el canal.',
      },
      {
        en: 'Forcing resonance flattens both people. What fits you will not need this much pushing.',
        fr: "Forcer la résonance aplatit les deux personnes. Ce qui te correspond n'aura pas besoin d'autant d'efforts.",
        ar: 'إجبار الانسجام يُسطّح الشخصين معاً. ما يناسبك لن يحتاج كل هذا الدفع.',
        es: 'Forzar la resonancia aplana a ambos. Lo que te corresponde no necesitará tanto empuje.',
      },
      {
        en: 'This answer stings today and saves you months — clarity always arrives cheaper than regret.',
        fr: "Cette réponse pique aujourd'hui et t'épargne des mois — la clarté coûte toujours moins cher que le regret.",
        ar: 'هذا الجواب يؤلم اليوم ويوفّر عليك شهوراً — الوضوح دائماً أرخص من الندم.',
        es: 'Esta respuesta duele hoy y te ahorra meses — la claridad siempre sale más barata que el arrepentimiento.',
      },
    ],
    low: [
      {
        en: 'There is real warmth here — just not the deep, wordless understanding a soulmate read looks for.',
        fr: "Il y a une vraie chaleur ici — mais pas la compréhension profonde et muette qu'une lecture d'âme sœur recherche.",
        ar: 'هناك دفء حقيقي هنا — لكنه ليس الفهم العميق الصامت الذي تبحث عنه قراءة توأم الروح.',
        es: 'Hay una calidez real aquí — solo que no el entendimiento profundo y sin palabras que busca una lectura de alma gemela.',
      },
      {
        en: 'Enjoying someone and resonating with someone are different frequencies — you found the first.',
        fr: "Apprécier quelqu'un et résonner avec quelqu'un sont des fréquences différentes — tu as trouvé la première.",
        ar: 'الاستمتاع بشخص والانسجام معه تردّدان مختلفان — وقد وجدت الأول.',
        es: 'Disfrutar a alguien y resonar con alguien son frecuencias distintas — encontraste la primera.',
      },
      {
        en: 'A good companion is not a small thing — just do not label it destiny before it earns the word.',
        fr: "Un bon compagnon n'est pas une petite chose — mais ne l'appelle pas destin avant qu'il ne mérite le mot.",
        ar: 'الرفيق الجيد ليس شيئاً صغيراً — فقط لا تسمِّه قدراً قبل أن يستحق الكلمة.',
        es: 'Un buen compañero no es poca cosa — solo no lo llames destino antes de que se gane la palabra.',
      },
      {
        en: 'Notice whether you feel more yourself after seeing them, or slightly less — that direction is the data.',
        fr: 'Remarque si tu te sens plus toi-même après les avoir vus, ou légèrement moins — cette direction est la donnée.',
        ar: 'لاحظ هل تشعر بأنك أقرب لنفسك بعد لقائهم أم أبعد قليلاً — هذا الاتجاه هو المعطى.',
        es: 'Nota si te sientes más tú mismo después de verlos, o un poco menos — esa dirección es el dato.',
      },
      {
        en: 'Faint resonance can grow, but only through honesty — performing closeness will never become it.',
        fr: "Une résonance faible peut grandir, mais seulement par l'honnêteté — jouer la proximité ne la deviendra jamais.",
        ar: 'الانسجام الخافت قد ينمو، لكن بالصدق وحده — تمثيل القرب لن يصبح قرباً أبداً.',
        es: 'Una resonancia débil puede crecer, pero solo con honestidad — actuar la cercanía nunca la convertirá en real.',
      },
      {
        en: 'Keep your heart open in both directions: to this growing, and to someone who arrives already in tune.',
        fr: "Garde ton cœur ouvert dans les deux directions : à ce qui grandit ici, et à quelqu'un qui arrive déjà accordé.",
        ar: 'أبقِ قلبك مفتوحاً في الاتجاهين: لنموّ هذا، ولشخص يصل وهو متناغم أصلاً.',
        es: 'Mantén el corazón abierto en ambas direcciones: a que esto crezca, y a alguien que llegue ya afinado.',
      },
    ],
    medium: [
      {
        en: 'When two people share a rhythm, connection stops being work and starts being home — you are partway there.',
        fr: "Quand deux personnes partagent un rythme, le lien cesse d'être un effort et devient un foyer — vous êtes à mi-chemin.",
        ar: 'حين يتشارك شخصان الإيقاع نفسه، يتوقف التواصل عن كونه جهداً ويصبح وطناً — وأنتما في منتصف الطريق.',
        es: 'Cuando dos personas comparten un ritmo, el vínculo deja de ser esfuerzo y se vuelve hogar — van a medio camino.',
      },
      {
        en: 'The ease is real in some rooms and missing in others — watch where the connection goes quiet.',
        fr: "L'aisance est réelle dans certaines pièces et absente dans d'autres — regarde où la connexion se tait.",
        ar: 'السهولة حقيقية في بعض المواقف وغائبة في أخرى — راقب أين تصمت الصلة.',
        es: 'La facilidad es real en algunos espacios y falta en otros — observa dónde se apaga la conexión.',
      },
      {
        en: 'Resonance at this depth deserves time, not a verdict — let the next months tune it or expose it.',
        fr: "Une résonance de cette profondeur mérite du temps, pas un verdict — laisse les prochains mois l'accorder ou la révéler.",
        ar: 'انسجام بهذا العمق يستحق وقتاً لا حكماً — دع الأشهر القادمة تضبطه أو تكشفه.',
        es: 'Una resonancia de esta profundidad merece tiempo, no un veredicto — deja que los próximos meses la afinen o la expongan.',
      },
      {
        en: 'Check the choosing, not just the chemistry: do they keep making room for you when it costs them?',
        fr: "Vérifie le choix, pas seulement l'alchimie : continuent-ils à te faire de la place quand cela leur coûte ?",
        ar: 'افحص الاختيار لا الكيمياء فقط: هل يستمرون في إفساح مكان لك حين يكلّفهم ذلك؟',
        es: 'Revisa la elección, no solo la química: ¿siguen haciéndote lugar cuando les cuesta?',
      },
      {
        en: 'Being understood without explaining is already happening in flashes — flashes are how it starts.',
        fr: "Être compris sans expliquer arrive déjà par éclairs — c'est par éclairs que ça commence.",
        ar: 'أن تُفهم دون شرح يحدث بالفعل ومضاتٍ — وبالومضات يبدأ الأمر.',
        es: 'Ser comprendido sin explicar ya ocurre a destellos — y así es como empieza.',
      },
      {
        en: 'Do not rush the label. A frequency that is still finding itself breaks under the weight of "forever".',
        fr: "Ne précipite pas l'étiquette. Une fréquence qui se cherche encore se brise sous le poids de « pour toujours ».",
        ar: 'لا تستعجل التسمية. التردّد الذي ما زال يجد نفسه ينكسر تحت ثقل "إلى الأبد".',
        es: 'No apures la etiqueta. Una frecuencia que aún se encuentra se rompe bajo el peso de "para siempre".',
      },
    ],
    high: [
      {
        en: "Ease like this is rare — you don't have to translate yourself for them to understand.",
        fr: "Une telle aisance est rare — tu n'as pas à te traduire pour qu'il te comprenne.",
        ar: 'هذه السهولة نادرة — لست مضطراً لترجمة نفسك كي يفهمك.',
        es: 'Una comodidad así es rara — no tienes que traducirte para que te entienda.',
      },
      {
        en: "The silence between you isn't empty; it's the comfort most people never find.",
        fr: "Le silence entre vous n'est pas vide ; c'est le confort que la plupart des gens ne trouvent jamais.",
        ar: 'الصمت بينكما ليس فراغاً؛ بل راحة لا يجدها معظم الناس أبداً.',
        es: 'El silencio entre ustedes no está vacío; es la comodidad que la mayoría nunca encuentra.',
      },
      {
        en: 'Love is less about feeling and more about choosing — and they keep choosing you.',
        fr: "L'amour est moins une question de sentiment que de choix — et il continue de te choisir.",
        ar: 'الحب يتعلق بالاختيار أكثر من الشعور — وهو يستمر في اختيارك.',
        es: 'El amor tiene menos que ver con sentir y más con elegir — y esa persona te sigue eligiendo.',
      },
      {
        en: 'When someone rearranges their life to make room for you, that is the answer.',
        fr: "Quand quelqu'un réorganise sa vie pour te faire une place, c'est la réponse.",
        ar: 'حين يعيد أحدهم ترتيب حياته ليفسح لك مكاناً، فتلك هي الإجابة.',
        es: 'Cuando alguien reorganiza su vida para hacerte un lugar, esa es la respuesta.',
      },
      {
        en: "Home isn't a place with them; it's the feeling of not having to brace yourself.",
        fr: "Avec lui, le foyer n'est pas un lieu ; c'est le sentiment de ne plus avoir à se cuirasser.",
        ar: 'الوطن معه ليس مكاناً؛ بل شعور بأنك لست مضطراً لأن تتحصّن.',
        es: 'Con esa persona, el hogar no es un lugar; es la sensación de no tener que protegerte.',
      },
      {
        en: 'Peace, not sparks, is what makes a connection last — and they bring you peace.',
        fr: "C'est la paix, pas les étincelles, qui fait durer un lien — et il t'apporte la paix.",
        ar: 'السلام، لا الشرارات، هو ما يُديم العلاقة — وهو يمنحك السلام.',
        es: 'La paz, no las chispas, es lo que hace durar un vínculo — y esa persona te da paz.',
      },
    ],
  },
};
