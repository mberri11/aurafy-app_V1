import { MultiResults } from '../../types';

/**
 * red_green_flag read in MULTI mode → which person in the circle carries the most
 * red-flag behaviour. POLARITY INVERTED vs the love modules: the "winner" is the
 * reddest flag, so the register is measured and protective, never gleeful and never
 * a character verdict. Insights name BEHAVIOUR patterns, never people.
 */
export const redGreenFlagResults: MultiResults = {
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
    consistency: [
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
    boundaries: [
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
    transparency: [
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
    repair: [
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
    control: [
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
