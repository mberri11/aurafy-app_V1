import { FlagCompareVerdicts, FlagMultiResults } from '../../types';

/**
 * red_green_flag COMPARE (2 people) — standout-based verdicts (PROVIDED, verbatim).
 * {a} = the standout (larger |net|), {b} = the other person. Selected in
 * generateFlagMultiResult; replaced the old distribution-based group verdicts.
 */
export const redGreenFlagCompareVerdicts: FlagCompareVerdicts = {
  OPPOSITE: {
    title: { en: 'Split Signals', fr: 'Signaux opposés', ar: 'إشارتان متعاكستان', es: 'Señales opuestas' },
    line: {
      en: '{a} leans one way — {b} pulls the other.',
      fr: "{a} penche d'un côté — {b} tire de l'autre.",
      ar: '{a} يميل إلى جهة — و{b} يشدّ إلى الجهة الأخرى.',
      es: '{a} se inclina hacia un lado — {b} tira hacia el otro.',
    },
  },
  BOTH_GREEN: {
    title: { en: 'Both Green', fr: 'Tous deux verts', ar: 'كلاهما أخضر', es: 'Ambos verdes' },
    line: {
      en: 'Both lean green — {a} the clearest of the two.',
      fr: 'Tous deux penchent au vert — {a} le plus net des deux.',
      ar: 'كلاهما يميل إلى الأخضر — و{a} أوضحهما.',
      es: 'Ambos se inclinan al verde — {a} el más claro de los dos.',
    },
  },
  BOTH_RED: {
    title: { en: 'Both Flagged', fr: 'Tous deux signalés', ar: 'كلاهما مُعلَّم', es: 'Ambos señalados' },
    line: {
      en: 'Both raise flags — {a} the loudest of the two.',
      fr: 'Tous deux hissent des drapeaux — {a} le plus fort des deux.',
      ar: 'كلاهما يرفع رايات — و{a} أعلاهما صوتًا.',
      es: 'Ambos izan banderas — {a} el más fuerte de los dos.',
    },
  },
  ONE_POLE: {
    title: { en: 'One Stands Out', fr: 'Un se démarque', ar: 'واحدٌ يبرز', es: 'Uno destaca' },
    line: {
      en: '{a} stands out clearly — {b} reads mixed.',
      fr: '{a} se démarque nettement — {b} donne un signal mitigé.',
      ar: '{a} يبرز بوضوح — و{b} قراءته مختلطة.',
      es: '{a} destaca con claridad — {b} se lee mixto.',
    },
  },
  TOO_CLOSE: {
    title: { en: 'Too Close to Call', fr: 'Trop serré', ar: 'أقربُ من أن يُحسم', es: 'Demasiado parejo' },
    line: {
      en: 'Almost no signal between them — read them again another day.',
      fr: 'Presque aucun signal entre eux — relis-les un autre jour.',
      ar: 'لا إشارة تكاد تُذكر بينهما — أعد قراءتهما في يومٍ آخر.',
      es: 'Casi ninguna señal entre ellos — léelos otra vez otro día.',
    },
  },
};

/**
 * red_green_flag read in MULTI mode → which person in the circle carries the most
 * red-flag behaviour. POLARITY INVERTED vs the love modules: the "winner" is the
 * reddest flag, so the register is measured and protective, never gleeful and never
 * a character verdict. Insights name BEHAVIOUR patterns, never people.
 */
export const redGreenFlagResults: FlagMultiResults = {
  // 2-person standout verdicts (PROVIDED, verbatim) — see redGreenFlagCompareVerdicts below.
  compareVerdicts: redGreenFlagCompareVerdicts,
  winnerTemplate: {
    en: '{name} is the reddest flag in your circle.',
    fr: '{name} est le drapeau le plus rouge de ton cercle.',
    ar: '{name} هو الرايةُ الأشدُّ حُمرةً في دائرتك.',
    es: '{name} es la bandera más roja de tu círculo.',
  },
  tieTemplate: {
    en: '{names} carry the same weight of red — and that is its own answer.',
    fr: '{names} portent le même poids de rouge — et c\'est déjà une réponse.',
    ar: 'يحمل {names} القدر نفسه من الحُمرة — وهذه بحد ذاتها إجابة.',
    es: '{names} cargan el mismo peso de rojo — y eso ya es una respuesta.',
  },
  insights: {
    consistency: {
      red: [
        {
          en: 'The pattern is not that they let you down. It is that you already knew they would.',
          fr: "Le problème n'est pas qu'il te déçoit. C'est que tu savais déjà qu'il le ferait.",
          ar: 'النمط ليس أنه يخذلك. النمط أنك كنت تعرف مسبقًا أنه سيفعل.',
          es: 'El patrón no es que te falle. Es que ya sabías que lo haría.',
        },
        {
          en: 'Intensity at the start is not devotion. Devotion is what is left in week twelve.',
          fr: "L'intensité du début n'est pas de la dévotion. La dévotion, c'est ce qui reste à la douzième semaine.",
          ar: 'الاندفاع في البداية ليس إخلاصًا. الإخلاص هو ما يتبقّى في الأسبوع الثاني عشر.',
          es: 'La intensidad del principio no es devoción. La devoción es lo que queda en la semana doce.',
        },
        {
          en: 'When someone is warm alone and cool in company, the private version is the performance.',
          fr: "Quand quelqu'un est chaleureux seul et froid en public, c'est la version privée qui est le numéro.",
          ar: 'حين يكون أحدهم دافئًا على انفراد وباردًا أمام الناس، فالنسخة الخاصة هي التمثيل.',
          es: 'Cuando alguien es cálido a solas y frío en compañía, la versión privada es la actuación.',
        },
        {
          en: 'You stopped planning around their word long before you admitted why.',
          fr: "Tu as cessé de compter sur sa parole bien avant d'admettre pourquoi.",
          ar: 'توقفت عن الاعتماد على كلمته قبل وقت طويل من اعترافك بالسبب.',
          es: 'Dejaste de contar con su palabra mucho antes de admitir por qué.',
        },
        {
          en: 'A promise that needs a reminder was never really a promise.',
          fr: "Une promesse qui a besoin d'un rappel n'a jamais vraiment été une promesse.",
          ar: 'الوعد الذي يحتاج إلى تذكير لم يكن وعدًا في الأصل.',
          es: 'Una promesa que necesita recordatorio nunca fue una promesa.',
        },
        {
          en: 'Consistency is unglamorous, and it is the only proof that ever counts.',
          fr: "La constance n'a rien de spectaculaire, et c'est la seule preuve qui compte.",
          ar: 'الثبات لا بريق له، وهو الدليل الوحيد الذي يُعتدّ به.',
          es: 'La constancia no es glamurosa, y es la única prueba que cuenta.',
        },
          ],
      green: [
      {
        en: 'They are the same person in every room — that is rarer than loyalty and harder to fake.',
        fr: "C'est la même personne dans chaque pièce — plus rare que la loyauté, et bien plus difficile à feindre.",
        ar: 'هو الشخص نفسه في كل غرفة — وهذا أندر من الوفاء وأصعب في التصنّع.',
        es: 'Es la misma persona en cada sala: eso es más raro que la lealtad y más difícil de fingir.',
      },
      {
        en: 'You plan around their word without thinking about it. That reflex took months to earn.',
        fr: 'Tu bâtis tes plans sur leur parole sans y penser. Ce réflexe a mis des mois à se gagner.',
        ar: 'تبني خططك على كلمته دون تفكير. هذا الانعكاس استغرق شهورًا ليُكتسب.',
        es: 'Planificas sobre su palabra sin pensarlo. Ese reflejo tardó meses en ganarse.',
      },
      {
        en: 'Month six looks like week one with them — most people cannot hold a shape that long.',
        fr: 'Le sixième mois ressemble à la première semaine avec eux — peu de gens tiennent une forme aussi longtemps.',
        ar: 'الشهر السادس معه يشبه الأسبوع الأول — قلّة تحافظ على شكلها هذه المدة.',
        es: 'El mes seis se parece a la semana uno con él: poca gente sostiene una forma tanto tiempo.',
      },
      {
        en: 'Their reliability is not glamorous, and it is the single hardest thing on this entire list to fake.',
        fr: "Leur fiabilité n'a rien de spectaculaire, et c'est la chose la plus difficile de toute cette liste à simuler.",
        ar: 'موثوقيّته لا بريق لها، وهي أصعب ما في هذه القائمة كلها على التصنّع.',
        es: 'Su fiabilidad no es glamurosa, y es lo más difícil de fingir de toda esta lista.',
      },
      {
        en: 'You have stopped bracing for the disappointment. Notice when that happened.',
        fr: 'Tu as cessé de te préparer à la déception. Remarque quand cela est arrivé.',
        ar: 'توقفت عن التحصّن ضد خيبة الأمل. لاحظ متى حدث ذلك.',
        es: 'Has dejado de prepararte para la decepción. Fíjate en cuándo pasó eso.',
      },
      {
        en: 'Tell them once that you noticed. Consistent people are almost never thanked for it.',
        fr: "Dis-leur une fois que tu l'as remarqué. Les gens constants ne sont presque jamais remerciés pour ça.",
        ar: 'أخبره مرة واحدة أنك لاحظت. الثابتون نادرًا ما يُشكَرون على ثباتهم.',
        es: 'Dile una vez que lo has notado. A la gente constante casi nunca se le agradece.',
      },
        ],
    },
    boundaries: {
      red: [
        {
          en: 'A "no" that has to be defended twice was already heard the first time.',
          fr: "Un « non » qu'il faut défendre deux fois a bien été entendu la première.",
          ar: 'كلمة «لا» التي تضطر للدفاع عنها مرتين قد سُمعت من المرة الأولى.',
          es: 'Un «no» que hay que defender dos veces ya se escuchó la primera.',
        },
        {
          en: 'The joke they will not drop is not a joke. It is a request being repeated.',
          fr: "La blague qu'il refuse d'abandonner n'est pas une blague. C'est une demande répétée.",
          ar: 'المزحة التي يرفض تركها ليست مزحة. إنها طلبٌ يُعاد.',
          es: 'La broma que no suelta no es una broma. Es una petición repetida.',
        },
        {
          en: 'Generosity you did not ask for and cannot refuse is not generosity.',
          fr: "Une générosité que tu n'as pas demandée et que tu ne peux pas refuser n'est pas de la générosité.",
          ar: 'الكرم الذي لم تطلبه ولا تستطيع رفضه ليس كرمًا.',
          es: 'La generosidad que no pediste y no puedes rechazar no es generosidad.',
        },
        {
          en: 'People who respect limits do not need to test them to believe they exist.',
          fr: "Ceux qui respectent les limites n'ont pas besoin de les tester pour croire qu'elles existent.",
          ar: 'مَن يحترم الحدود لا يحتاج إلى اختبارها ليصدّق أنها موجودة.',
          es: 'Quien respeta los límites no necesita probarlos para creer que existen.',
        },
        {
          en: 'Notice how often your boundary becomes a conversation about their feelings.',
          fr: "Remarque combien de fois ta limite devient une conversation sur ses émotions à lui.",
          ar: 'لاحظ كم مرة يتحوّل حدُّك أنت إلى نقاشٍ حول مشاعره هو.',
          es: 'Fíjate cuántas veces tu límite se convierte en una conversación sobre los sentimientos de él.',
        },
        {
          en: 'Access is not a right that closeness grants automatically. It is given, each time.',
          fr: "L'accès n'est pas un droit que la proximité accorde d'office. Il se donne, à chaque fois.",
          ar: 'الوصول إليك ليس حقًّا يمنحه القرب تلقائيًّا. إنه يُمنح، في كل مرة.',
          es: 'El acceso no es un derecho que la cercanía otorgue por defecto. Se da, cada vez.',
        },
          ],
      green: [
      {
        en: 'Your "no" lands the first time. You may not realize how much energy that saves you.',
        fr: 'Ton « non » passe du premier coup. Tu ne mesures peut-être pas l\'énergie que cela t\'épargne.',
        ar: '«لا» منك تصل من أول مرة. قد لا تدرك كم من الطاقة يوفّر عليك ذلك.',
        es: 'Tu «no» llega a la primera. Quizá no notas cuánta energía te ahorra eso.',
      },
      {
        en: 'They dropped the joke and never picked it back up — that is respect doing quiet, invisible work.',
        fr: "Ils ont abandonné la blague sans jamais la reprendre — c'est le respect à l'œuvre, discret et invisible.",
        ar: 'ترك المزحة ولم يعد إليها — هذا هو الاحترام وهو يعمل بصمتٍ لا يُرى.',
        es: 'Dejó la broma y nunca la retomó: eso es respeto haciendo un trabajo silencioso e invisible.',
      },
      {
        en: 'Being asked before being assumed about is a small courtesy that predicts very large things.',
        fr: "Être consulté plutôt que présumé est une petite courtoisie qui prédit de très grandes choses.",
        ar: 'أن يُستأذَن منك بدل أن يُفترَض عنك لطفٌ صغير يتنبّأ بأمورٍ كبيرة جدًّا.',
        es: 'Que te pregunten en vez de dar por supuesto es una cortesía pequeña que predice cosas muy grandes.',
      },
      {
        en: 'They give what you needed, not what they wanted to give. Those are different acts entirely.',
        fr: "Ils donnent ce dont tu avais besoin, pas ce qu'ils voulaient donner. Ce sont deux actes totalement différents.",
        ar: 'يمنحك ما احتجته أنت، لا ما أراد هو أن يمنحه. وهذان فعلان مختلفان تمامًا.',
        es: 'Te da lo que necesitabas, no lo que él quería dar. Son actos completamente distintos.',
      },
      {
        en: 'Around them your limits are facts, not opening positions. Your body already knows.',
        fr: 'Avec eux, tes limites sont des faits, pas des positions de départ. Ton corps le sait déjà.',
        ar: 'معه تكون حدودك حقائق، لا مواقف تفاوض أولية. جسدك يعرف ذلك سلفًا.',
        es: 'Con él tus límites son hechos, no posiciones de partida. Tu cuerpo ya lo sabe.',
      },
      {
        en: 'This is what safe access looks like — given each time, never assumed once and kept forever.',
        fr: "Voilà à quoi ressemble un accès sûr — donné à chaque fois, jamais présumé une fois pour toutes.",
        ar: 'هكذا يبدو الوصول الآمن — يُمنح في كل مرة، ولا يُفترَض مرة ويُحتفظ به إلى الأبد.',
        es: 'Así se ve el acceso seguro: dado cada vez, nunca supuesto una vez y conservado para siempre.',
      },
        ],
    },
    transparency: {
      red: [
        {
          en: 'A story that reshapes itself for each listener has no original.',
          fr: "Une histoire qui se remodèle pour chaque auditeur n'a pas d'original.",
          ar: 'الرواية التي تعيد تشكيل نفسها لكل مستمع ليس لها أصل.',
          es: 'Una historia que se remodela para cada oyente no tiene original.',
        },
        {
          en: 'Whoever brings you other people\'s secrets is practising for the day they carry yours.',
          fr: "Celui qui t'apporte les secrets des autres s'entraîne pour le jour où il portera les tiens.",
          ar: 'مَن يحمل إليك أسرار الآخرين يتدرّب لليوم الذي يحمل فيه أسرارك.',
          es: 'Quien te trae los secretos de otros ensaya para el día en que lleve los tuyos.',
        },
        {
          en: 'Kindness that requires editing the truth is usually protecting the editor.',
          fr: "Une gentillesse qui exige de retoucher la vérité protège en général celui qui retouche.",
          ar: 'اللطف الذي يستلزم تشذيب الحقيقة يحمي عادةً مَن يشذّبها.',
          es: 'La bondad que exige recortar la verdad suele proteger a quien recorta.',
        },
        {
          en: 'You do not need to read a screen to feel a room change when you enter it.',
          fr: "Tu n'as pas besoin de lire un écran pour sentir une pièce changer quand tu entres.",
          ar: 'لا تحتاج إلى قراءة شاشة لتشعر بأن الغرفة تغيّرت حين دخلت.',
          es: 'No necesitas leer una pantalla para sentir que la sala cambia cuando entras.',
        },
        {
          en: 'Half-truths are not smaller lies. They are lies with better manners.',
          fr: "Les demi-vérités ne sont pas de petits mensonges. Ce sont des mensonges mieux élevés.",
          ar: 'أنصاف الحقائق ليست أكاذيب أصغر. إنها أكاذيب بأخلاقٍ أفضل.',
          es: 'Las medias verdades no son mentiras pequeñas. Son mentiras con mejores modales.',
        },
        {
          en: 'Openness is not confession. It is simply not needing a second version.',
          fr: "La transparence n'est pas la confession. C'est simplement ne pas avoir besoin d'une deuxième version.",
          ar: 'الشفافية ليست اعترافًا. إنها ببساطة ألّا تحتاج إلى نسخةٍ ثانية.',
          es: 'La transparencia no es confesión. Es simplemente no necesitar una segunda versión.',
        },
          ],
      green: [
      {
        en: 'One story, every room, no edits. That takes no effort only for people who are not managing anything.',
        fr: "Une seule histoire, dans chaque pièce, sans retouche. Cela ne demande aucun effort uniquement à ceux qui ne gèrent rien.",
        ar: 'روايةٌ واحدة، في كل غرفة، بلا تعديل. هذا لا يكلّف جهدًا إلا لمن لا يُدير شيئًا.',
        es: 'Una sola historia, en cada sala, sin ediciones. Eso no cuesta esfuerzo solo a quien no está gestionando nada.',
      },
      {
        en: 'They told you the thing you did not want to hear. That is a form of respect most people avoid paying.',
        fr: "Ils t'ont dit ce que tu ne voulais pas entendre. C'est une forme de respect que la plupart évitent de payer.",
        ar: 'قال لك ما لم تُرِد سماعه. هذا شكلٌ من الاحترام يتفادى معظم الناس دفعه.',
        es: 'Te dijo lo que no querías oír. Esa es una forma de respeto que casi nadie quiere pagar.',
      },
      {
        en: 'They have never handed you someone else\'s secret — which is exactly why yours are safe.',
        fr: "Ils ne t'ont jamais livré le secret d'un autre — c'est précisément pourquoi les tiens sont en sécurité.",
        ar: 'لم يسلّمك يومًا سرّ غيره — ولهذا بالضبط فإن أسرارك عنده آمنة.',
        es: 'Nunca te ha entregado el secreto de otro: justo por eso los tuyos están a salvo.',
      },
      {
        en: 'You do not fact-check them afterwards. That silence in your head is the whole gift.',
        fr: "Tu ne vérifies pas leurs propos après coup. Ce silence dans ta tête, c'est tout le cadeau.",
        ar: 'لا تتحقق من كلامه بعد انصرافه. ذلك الصمت في رأسك هو الهبة كلها.',
        es: 'No verificas lo que dice después. Ese silencio en tu cabeza es todo el regalo.',
      },
      {
        en: 'A soft version was always available and they did not take it. Remember that next time honesty stings.',
        fr: "Une version douce était toujours disponible et ils ne l'ont pas prise. Souviens-t'en la prochaine fois que l'honnêteté pique.",
        ar: 'كانت النسخة الألطف متاحة دائمًا ولم يأخذها. تذكّر ذلك حين يوجعك الصدق مرة أخرى.',
        es: 'Siempre había una versión suave y no la tomó. Recuérdalo la próxima vez que la honestidad escueza.',
      },
      {
        en: 'Openness is not confession — it is simply never needing a second version. They never do.',
        fr: "La transparence n'est pas la confession — c'est ne jamais avoir besoin d'une deuxième version. Eux n'en ont jamais besoin.",
        ar: 'الشفافية ليست اعترافًا — إنها ألّا تحتاج إلى نسخة ثانية أبدًا. وهو لا يحتاج.',
        es: 'La transparencia no es confesión: es no necesitar nunca una segunda versión. Él nunca la necesita.',
      },
        ],
    },
    repair: {
      red: [
        {
          en: 'The measure of a person is not the fight. It is the walk back afterwards.',
          fr: "On ne mesure pas quelqu'un à la dispute. On le mesure au chemin du retour.",
          ar: 'لا يُقاس المرء بالخلاف. يُقاس بطريق العودة بعده.',
          es: 'A alguien no se le mide por la pelea. Se le mide por el camino de vuelta.',
        },
        {
          en: 'Silence after conflict is not calm. It is a punishment with a quiet face.',
          fr: "Le silence après un conflit n'est pas du calme. C'est une punition au visage tranquille.",
          ar: 'الصمت بعد الخلاف ليس هدوءًا. إنه عقابٌ بوجهٍ هادئ.',
          es: 'El silencio tras el conflicto no es calma. Es un castigo con cara serena.',
        },
        {
          en: 'A gift is not an apology. An apology names the thing and asks for nothing.',
          fr: "Un cadeau n'est pas une excuse. Une excuse nomme la chose et ne demande rien.",
          ar: 'الهدية ليست اعتذارًا. الاعتذار يسمّي الفعل ولا يطلب شيئًا.',
          es: 'Un regalo no es una disculpa. Una disculpa nombra el hecho y no pide nada.',
        },
        {
          en: 'If every conflict ends with your apology, you are not resolving — you are folding.',
          fr: "Si chaque conflit se termine par tes excuses, tu ne résous pas — tu plies.",
          ar: 'إن كان كل خلافٍ ينتهي باعتذارك أنت، فأنت لا تحلّ — أنت تنطوي.',
          es: 'Si cada conflicto termina con tu disculpa, no estás resolviendo: te estás plegando.',
        },
        {
          en: 'Anger that your hurt exists is a way of asking you to have less of it.',
          fr: "S'irriter que ta blessure existe, c'est une façon de te demander d'en avoir moins.",
          ar: 'الغضب من وجود ألمك هو طريقةٌ لمطالبتك بأن يقلّ.',
          es: 'Enfadarse de que tu dolor exista es pedirte que tengas menos.',
        },
        {
          en: 'Repair is a skill, not a mood. Some people have simply never been taught it.',
          fr: "La réparation est une compétence, pas une humeur. Certains ne l'ont simplement jamais apprise.",
          ar: 'الإصلاح مهارة لا مزاج. بعض الناس لم يتعلّموه ببساطة.',
          es: 'La reparación es una habilidad, no un ánimo. A algunos simplemente nunca se la enseñaron.',
        },
          ],
      green: [
      {
        en: 'They come back. Everything else in a relationship is negotiable — this one is not.',
        fr: "Ils reviennent. Tout le reste dans une relation est négociable — pas ça.",
        ar: 'إنه يعود. كل شيء آخر في العلاقة قابل للتفاوض — إلا هذا.',
        es: 'Vuelve. Todo lo demás en una relación es negociable; esto no.',
      },
      {
        en: 'An apology with no "but" in it is a skill. Someone taught them, or they taught themselves.',
        fr: "Une excuse sans « mais » est une compétence. Quelqu'un la leur a apprise, ou ils se la sont apprise.",
        ar: 'الاعتذار الخالي من «لكن» مهارة. علّمه إياها أحدهم، أو علّمها لنفسه.',
        es: 'Una disculpa sin «pero» es una habilidad. Alguien se la enseñó, o se la enseñó él mismo.',
      },
      {
        en: 'They check on you before defending themselves. That order — you first — is the entire measure.',
        fr: "Ils prennent de tes nouvelles avant de se défendre. Cet ordre — toi d'abord — est toute la mesure.",
        ar: 'يطمئنّ عليك قبل أن يدافع عن نفسه. هذا الترتيب — أنت أولًا — هو المقياس كله.',
        es: 'Se preocupa por ti antes de defenderse. Ese orden —tú primero— es toda la medida.',
      },
      {
        en: 'Arguments with them end with both of you lighter. You have probably known relationships where the opposite was normal.',
        fr: "Les disputes avec eux vous laissent tous les deux plus légers. Tu as sans doute connu des relations où l'inverse était la norme.",
        ar: 'الخلافات معه تنتهي وقد خفّ عنكما معًا. غالبًا عرفت علاقاتٍ كان العكس فيها هو الطبيعي.',
        es: 'Las discusiones con él terminan con los dos más ligeros. Probablemente conociste relaciones donde lo contrario era lo normal.',
      },
      {
        en: 'Repair is a skill, not a mood — and they have it. That is not luck; it is practice you are benefiting from.',
        fr: "La réparation est une compétence, pas une humeur — et ils l'ont. Ce n'est pas de la chance, c'est une pratique dont tu bénéficies.",
        ar: 'الإصلاح مهارة لا مزاج — وهو يملكها. ليس هذا حظًّا؛ إنه تمرّنٌ تستفيد أنت منه.',
        es: 'La reparación es una habilidad, no un ánimo, y él la tiene. Eso no es suerte: es práctica de la que te beneficias.',
      },
      {
        en: 'The fight is never the test. The walk back is, and they keep passing it.',
        fr: "La dispute n'est jamais le test. Le chemin du retour l'est, et ils le réussissent à chaque fois.",
        ar: 'الخلاف ليس الاختبار أبدًا. طريق العودة هو الاختبار، وهو ينجح فيه في كل مرة.',
        es: 'La pelea nunca es la prueba. El camino de vuelta lo es, y él sigue aprobándolo.',
      },
        ],
    },
    control: {
      red: [
        {
          en: 'Rehearsing your sentences before you speak is your body keeping score.',
          fr: "Répéter tes phrases avant de parler, c'est ton corps qui tient les comptes.",
          ar: 'تمرّنك على جُملك قبل النطق هو جسدك وهو يسجّل ما يجري.',
          es: 'Ensayar tus frases antes de hablar es tu cuerpo llevando la cuenta.',
        },
        {
          en: 'Wanting to know where you are is not the same as wanting to know you.',
          fr: "Vouloir savoir où tu es n'est pas la même chose que vouloir te connaître.",
          ar: 'الرغبة في معرفة مكانك ليست كالرغبة في معرفتك أنت.',
          es: 'Querer saber dónde estás no es lo mismo que querer conocerte.',
        },
        {
          en: 'Isolation rarely arrives as a demand. It arrives as a series of small inconveniences.',
          fr: "L'isolement arrive rarement comme une exigence. Il arrive comme une série de petits désagréments.",
          ar: 'العزل نادرًا ما يأتي كطلبٍ صريح. يأتي كسلسلةٍ من المضايقات الصغيرة.',
          es: 'El aislamiento rara vez llega como exigencia. Llega como una serie de pequeñas incomodidades.',
        },
        {
          en: 'Guilt about your other people is a fence being built where you cannot see it.',
          fr: "La culpabilité concernant tes proches est une clôture qu'on bâtit là où tu ne la vois pas.",
          ar: 'الشعور بالذنب تجاه بقية أحبّتك سياجٌ يُبنى حيث لا تراه.',
          es: 'La culpa por tus otras personas es una valla que se levanta donde no la ves.',
        },
        {
          en: 'Count how many of your friendships have quietly thinned since they arrived.',
          fr: "Compte combien de tes amitiés se sont discrètement délitées depuis son arrivée.",
          ar: 'أحصِ كم من صداقاتك خفتت بهدوء منذ وصوله.',
          es: 'Cuenta cuántas de tus amistades se han ido apagando desde que llegó.',
        },
        {
          en: 'Love does not need a smaller world to feel secure in.',
          fr: "L'amour n'a pas besoin d'un monde plus petit pour se sentir en sécurité.",
          ar: 'الحب لا يحتاج إلى عالمٍ أصغر ليشعر بالأمان.',
          es: 'El amor no necesita un mundo más pequeño para sentirse seguro.',
        },
          ],
      green: [
      {
        en: 'They ask how you are, not where you are. One of those is care; the other is inventory.',
        fr: "Ils demandent comment tu vas, pas où tu es. L'un est de l'attention ; l'autre, un inventaire.",
        ar: 'يسأل عن حالك لا عن مكانك. أحدهما اهتمام؛ والآخر جَرد.',
        es: 'Pregunta cómo estás, no dónde estás. Una de esas cosas es cariño; la otra, inventario.',
      },
      {
        en: 'Your other relationships got easier since they arrived. Count them — that number is the reading.',
        fr: "Tes autres relations sont devenues plus légères depuis leur arrivée. Compte-les — ce nombre est la lecture.",
        ar: 'صارت علاقاتك الأخرى أسهل منذ وصوله. أحصِها — ذلك العدد هو القراءة.',
        es: 'Tus otras relaciones se volvieron más fáciles desde que llegó. Cuéntalas: ese número es la lectura.',
      },
      {
        en: 'They are glad when you come back full of someone else. Security looks exactly like this and nothing else.',
        fr: "Ils sont heureux quand tu reviens rempli d'un autre. La sécurité ressemble exactement à ça et à rien d'autre.",
        ar: 'يفرح حين تعود ممتلئًا بغيره. الأمان يبدو هكذا بالضبط ولا شيء سواه.',
        es: 'Se alegra cuando vuelves lleno de otra persona. La seguridad se ve exactamente así y de ninguna otra forma.',
      },
      {
        en: 'You do not rehearse your sentences around them. Your nervous system decided that, not your opinion.',
        fr: "Tu ne répètes pas tes phrases avec eux. C'est ton système nerveux qui en a décidé, pas ton opinion.",
        ar: 'لا تتمرّن على جُملك أمامه. جهازك العصبي قرّر ذلك، لا رأيك.',
        es: 'No ensayas tus frases con él. Lo decidió tu sistema nervioso, no tu opinión.',
      },
      {
        en: 'Love that does not need a smaller world to feel safe in is the whole thing. This is it.',
        fr: "Un amour qui n'a pas besoin d'un monde plus petit pour se sentir en sécurité, c'est tout ce qui compte. C'est ça.",
        ar: 'الحب الذي لا يحتاج إلى عالمٍ أصغر ليشعر بالأمان هو كل شيء. وهذا هو.',
        es: 'Un amor que no necesita un mundo más pequeño para sentirse seguro lo es todo. Esto es eso.',
      },
      {
        en: 'Nothing about them makes your world smaller. Notice how much room you still have.',
        fr: "Rien chez eux ne rétrécit ton monde. Remarque tout l'espace qu'il te reste.",
        ar: 'لا شيء فيه يُصغّر عالمك. لاحظ كم من المساحة لا تزال لديك.',
        es: 'Nada en él encoge tu mundo. Fíjate en cuánto espacio sigues teniendo.',
      },
        ],
    },
  },
  shareLines: {
    consistency: {
      en: 'The app checked the receipts. The promises did not survive.',
      fr: "L'appli a vérifié les reçus. Les promesses n'ont pas survécu.",
      ar: 'راجع التطبيق الإيصالات. لم تنجُ الوعود.',
      es: 'La app revisó los recibos. Las promesas no sobrevivieron.',
    },
    boundaries: {
      en: 'My "no" was treated as a first offer. Flagged.',
      fr: "Mon « non » a été traité comme une première offre. Signalé.",
      ar: 'عُوملت كلمة «لا» مني كأنها عرضٌ أولي. تم رفع الراية.',
      es: 'Mi «no» fue tratado como una primera oferta. Señalado.',
    },
    transparency: {
      en: 'Three versions of one story. Zero of them original.',
      fr: "Trois versions d'une même histoire. Aucune originale.",
      ar: 'ثلاث روايات لقصة واحدة. ولا واحدة منها أصلية.',
      es: 'Tres versiones de una historia. Ninguna original.',
    },
    repair: {
      en: 'Somehow I was the one apologizing. Every single time.',
      fr: "Bizarrement, c'était moi qui m'excusais. À chaque fois.",
      ar: 'بطريقةٍ ما كنت أنا المعتذِر. في كل مرة.',
      es: 'De algún modo yo era quien se disculpaba. Siempre.',
    },
    control: {
      en: 'I rehearse my sentences before I say them. That was the answer.',
      fr: "Je répète mes phrases avant de les dire. C'était ça, la réponse.",
      ar: 'أتمرّن على جُملي قبل أن أقولها. تلك كانت الإجابة.',
      es: 'Ensayo mis frases antes de decirlas. Esa era la respuesta.',
    },
  },
};
