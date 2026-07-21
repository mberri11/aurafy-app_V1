import { Question } from '../../types';

/**
 * red_green_flag — "Red Flag or Green Flag?"
 *
 * MULTI module (same shape as who_will_hurt_me). POLARITY IS INVERTED vs the love
 * modules: a question fires when the RED-flag behaviour is present, so the multi
 * winner is the reddest flag in the circle, and in solo mode the count tier `none`
 * is the GREEN flag (relief) while `high` is the red one.
 *
 * Dimensions (4 questions each):
 *   consistency   — do words and actions match over time
 *   boundaries    — how they handle your "no"
 *   transparency  — honesty, openness, whose truth bends
 *   repair        — what happens after conflict
 *   control       — jealousy, isolation, monitoring
 *
 * Register: sharp, observational, never diagnostic. These name behaviours, never
 * people. Pooling standard: these 20 are `core: true`; counterparts q21–q40 are
 * authored in a follow-up pass and must mirror framework + dimension + personWeight.
 */
export const redGreenFlagQuestions: Question[] = [
  {
    id: 'red_green_flag_q01',
    text: {
      en: "Whose promises have the shortest shelf life?",
      fr: "Les promesses de qui ont la durée de vie la plus courte ?",
      ar: 'وعود مَن هي الأقصر عمرًا؟',
      es: '¿Las promesas de quién tienen la vida más corta?',
    },
    soloText: {
      en: "{name}'s promises have a short shelf life.",
      fr: "Les promesses de {name} ont une courte durée de vie.",
      ar: 'وعود {name} قصيرة العمر.',
      es: 'Las promesas de {name} duran poco.',
    },
    framework: 'mixed',
    dimension: 'consistency',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q02',
    text: {
      en: "Who treats your 'no' as the opening of a negotiation?",
      fr: "Qui traite ton « non » comme le début d'une négociation ?",
      ar: 'مَن يتعامل مع كلمة «لا» منك كأنها بداية تفاوض؟',
      es: '¿Quién trata tu «no» como el inicio de una negociación?',
    },
    soloText: {
      en: "{name} treats your 'no' as the opening of a negotiation.",
      fr: "{name} traite ton « non » comme le début d'une négociation.",
      ar: 'يتعامل {name} مع كلمة «لا» منك كأنها بداية تفاوض.',
      es: '{name} trata tu «no» como el inicio de una negociación.',
    },
    framework: 'attachment',
    dimension: 'boundaries',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q03',
    text: {
      en: "Whose version of the story changes depending on who is listening?",
      fr: "La version de qui change selon la personne qui écoute ?",
      ar: 'رواية مَن تتغيّر بحسب مَن يستمع؟',
      es: '¿La versión de quién cambia según quién esté escuchando?',
    },
    soloText: {
      en: "{name}'s version of the story changes depending on who is listening.",
      fr: "La version de {name} change selon la personne qui écoute.",
      ar: 'تتغيّر رواية {name} بحسب مَن يستمع.',
      es: 'La versión de {name} cambia según quién esté escuchando.',
    },
    framework: 'intuition',
    dimension: 'transparency',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q04',
    text: {
      en: "Who goes silent instead of fixing what broke?",
      fr: "Qui se tait au lieu de réparer ce qui s'est cassé ?",
      ar: 'مَن يصمت بدل أن يُصلح ما انكسر؟',
      es: '¿Quién se calla en lugar de arreglar lo que se rompió?',
    },
    soloText: {
      en: "{name} goes silent instead of fixing what broke.",
      fr: "{name} se tait au lieu de réparer ce qui s'est cassé.",
      ar: 'يصمت {name} بدل أن يُصلح ما انكسر.',
      es: '{name} se calla en lugar de arreglar lo que se rompió.',
    },
    framework: 'attachment',
    dimension: 'repair',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q05',
    text: {
      en: "Who needs to know where you are more than they need to know how you are?",
      fr: "Qui a plus besoin de savoir où tu es que comment tu vas ?",
      ar: 'مَن يحتاج أن يعرف أين أنت أكثر مما يحتاج أن يعرف كيف حالك؟',
      es: '¿Quién necesita saber dónde estás más que cómo estás?',
    },
    soloText: {
      en: "{name} needs to know where you are more than how you are.",
      fr: "{name} a plus besoin de savoir où tu es que comment tu vas.",
      ar: 'يحتاج {name} أن يعرف أين أنت أكثر مما يحتاج أن يعرف كيف حالك.',
      es: '{name} necesita saber dónde estás más que cómo estás.',
    },
    framework: 'sociometry',
    dimension: 'control',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q06',
    text: {
      en: "Who is one person with you alone and a different one in front of others?",
      fr: "Qui est une personne avec toi seul et une autre devant les autres ?",
      ar: 'مَن يكون شخصًا معك على انفراد وشخصًا آخر أمام الناس؟',
      es: '¿Quién es una persona contigo a solas y otra delante de los demás?',
    },
    soloText: {
      en: "{name} is one person with you alone and a different one in front of others.",
      fr: "{name} est une personne avec toi seul et une autre devant les autres.",
      ar: 'يكون {name} شخصًا معك على انفراد وشخصًا آخر أمام الناس.',
      es: '{name} es una persona contigo a solas y otra delante de los demás.',
    },
    framework: 'intuition',
    dimension: 'consistency',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q07',
    text: {
      en: "Who keeps 'joking' about the exact thing you asked them to drop?",
      fr: "Qui continue de « plaisanter » sur la seule chose que tu lui as demandé d'arrêter ?",
      ar: 'مَن يواصل «المزاح» بشأن الأمر نفسه الذي طلبت منه أن يتركه؟',
      es: '¿Quién sigue «bromeando» justo con lo que le pediste que dejara?',
    },
    soloText: {
      en: "{name} keeps 'joking' about the exact thing you asked them to drop.",
      fr: "{name} continue de « plaisanter » sur la seule chose que tu lui as demandé d'arrêter.",
      ar: 'يواصل {name} «المزاح» بشأن الأمر نفسه الذي طلبت منه أن يتركه.',
      es: '{name} sigue «bromeando» justo con lo que le pediste que dejara.',
    },
    framework: 'attachment',
    dimension: 'boundaries',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q08',
    text: {
      en: "Whose phone turns face-down the moment you walk in?",
      fr: "Le téléphone de qui se retourne dès que tu entres ?",
      ar: 'هاتف مَن يُقلَب على وجهه لحظة دخولك؟',
      es: '¿El teléfono de quién se voltea en cuanto entras?',
    },
    soloText: {
      en: "{name}'s phone turns face-down the moment you walk in.",
      fr: "Le téléphone de {name} se retourne dès que tu entres.",
      ar: 'يُقلَب هاتف {name} على وجهه لحظة دخولك.',
      es: 'El teléfono de {name} se voltea en cuanto entras.',
    },
    framework: 'mixed',
    dimension: 'transparency',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q09',
    text: {
      en: "Who apologizes with a gift instead of a sentence?",
      fr: "Qui s'excuse avec un cadeau plutôt qu'avec une phrase ?",
      ar: 'مَن يعتذر بهدية بدل أن يعتذر بجملة؟',
      es: '¿Quién se disculpa con un regalo en vez de con una frase?',
    },
    soloText: {
      en: "{name} apologizes with a gift instead of a sentence.",
      fr: "{name} s'excuse avec un cadeau plutôt qu'avec une phrase.",
      ar: 'يعتذر {name} بهدية بدل أن يعتذر بجملة.',
      es: '{name} se disculpa con un regalo en vez de con una frase.',
    },
    framework: 'loveLanguages',
    dimension: 'repair',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q10',
    text: {
      en: "Who makes you feel guilty for the time you give other people?",
      fr: "Qui te fait culpabiliser pour le temps que tu donnes aux autres ?",
      ar: 'مَن يُشعرك بالذنب على الوقت الذي تمنحه للآخرين؟',
      es: '¿Quién te hace sentir culpable por el tiempo que das a otras personas?',
    },
    soloText: {
      en: "{name} makes you feel guilty for the time you give other people.",
      fr: "{name} te fait culpabiliser pour le temps que tu donnes aux autres.",
      ar: 'يُشعرك {name} بالذنب على الوقت الذي تمنحه للآخرين.',
      es: '{name} te hace sentir culpable por el tiempo que das a otras personas.',
    },
    framework: 'attachment',
    dimension: 'control',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q11',
    text: {
      en: "Who arrives enormous at the beginning and thins out by the third week?",
      fr: "Qui arrive en immense au début et s'efface dès la troisième semaine ?",
      ar: 'مَن يأتي بحضور هائل في البداية ثم يخفت في الأسبوع الثالث؟',
      es: '¿Quién llega enorme al principio y se desvanece para la tercera semana?',
    },
    soloText: {
      en: "{name} arrived enormous at the beginning and thinned out by the third week.",
      fr: "{name} est arrivé en immense au début et s'est effacé dès la troisième semaine.",
      ar: 'جاء {name} بحضور هائل في البداية ثم خفت في الأسبوع الثالث.',
      es: '{name} llegó enorme al principio y se desvaneció para la tercera semana.',
    },
    framework: 'sociometry',
    dimension: 'consistency',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q12',
    text: {
      en: "Who helps themselves to your things — your phone, your food, your plans — without asking?",
      fr: "Qui se sert dans tes affaires — ton téléphone, ta nourriture, tes projets — sans demander ?",
      ar: 'مَن يتناول أشياءك — هاتفك، طعامك، خططك — دون أن يستأذن؟',
      es: '¿Quién dispone de tus cosas —tu teléfono, tu comida, tus planes— sin preguntar?',
    },
    soloText: {
      en: "{name} helps themselves to your things — your phone, your food, your plans — without asking.",
      fr: "{name} se sert dans tes affaires — ton téléphone, ta nourriture, tes projets — sans demander.",
      ar: 'يتناول {name} أشياءك — هاتفك، طعامك، خططك — دون أن يستأذن.',
      es: '{name} dispone de tus cosas —tu teléfono, tu comida, tus planes— sin preguntar.',
    },
    framework: 'intuition',
    dimension: 'boundaries',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q13',
    text: {
      en: "Who hands you other people's secrets and expects you to feel chosen?",
      fr: "Qui te livre les secrets des autres en attendant que tu te sentes élu ?",
      ar: 'مَن يسلّمك أسرار الآخرين وينتظر أن تشعر بأنك مُختار؟',
      es: '¿Quién te entrega los secretos de otros esperando que te sientas elegido?',
    },
    soloText: {
      en: "{name} hands you other people's secrets and expects you to feel chosen.",
      fr: "{name} te livre les secrets des autres en attendant que tu te sentes élu.",
      ar: 'يسلّمك {name} أسرار الآخرين وينتظر أن تشعر بأنك مُختار.',
      es: '{name} te entrega los secretos de otros esperando que te sientas elegido.',
    },
    framework: 'mixed',
    dimension: 'transparency',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q14',
    text: {
      en: "After a fight, who comes back angrier that you were hurt than sorry that they hurt you?",
      fr: "Après une dispute, qui revient plus fâché que tu aies été blessé que désolé de t'avoir blessé ?",
      ar: 'بعد الخلاف، مَن يعود غاضبًا لأنك تألمت أكثر مما هو نادم لأنه آلمك؟',
      es: 'Tras una discusión, ¿quién vuelve más enfadado porque te dolió que arrepentido por haberte dolido?',
    },
    soloText: {
      en: "After a fight, {name} comes back angrier that you were hurt than sorry for hurting you.",
      fr: "Après une dispute, {name} revient plus fâché que tu aies été blessé que désolé de t'avoir blessé.",
      ar: 'بعد الخلاف، يعود {name} غاضبًا لأنك تألمت أكثر مما هو نادم لأنه آلمك.',
      es: 'Tras una discusión, {name} vuelve más enfadado porque te dolió que arrepentido por haberte dolido.',
    },
    framework: 'attachment',
    dimension: 'repair',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q15',
    text: {
      en: "Who quietly makes it harder for you to stay close to your other people?",
      fr: "Qui rend discrètement plus difficile ta proximité avec les autres ?",
      ar: 'مَن يجعل قربك من بقية الناس أصعب، بهدوء ودون ضجيج؟',
      es: '¿Quién hace, sin ruido, que te resulte más difícil seguir cerca de los tuyos?',
    },
    soloText: {
      en: "{name} quietly makes it harder for you to stay close to your other people.",
      fr: "{name} rend discrètement plus difficile ta proximité avec les autres.",
      ar: 'يجعل {name} قربك من بقية الناس أصعب، بهدوء ودون ضجيج.',
      es: '{name} hace, sin ruido, que te resulte más difícil seguir cerca de los tuyos.',
    },
    framework: 'sociometry',
    dimension: 'control',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q16',
    text: {
      en: "Whose 'I'll be there' have you quietly stopped planning around?",
      fr: "Le « je serai là » de qui as-tu discrètement cessé d'intégrer à tes plans ?",
      ar: 'عبارة «سأكون هناك» من مَن توقفت بهدوء عن بناء خططك عليها؟',
      es: '¿En el «ahí estaré» de quién has dejado de apoyar tus planes?',
    },
    soloText: {
      en: "You've quietly stopped planning around {name}'s 'I'll be there'.",
      fr: "Tu as discrètement cessé d'intégrer le « je serai là » de {name} à tes plans.",
      ar: 'توقفت بهدوء عن بناء خططك على عبارة «سأكون هناك» من {name}.',
      es: 'Has dejado de apoyar tus planes en el «ahí estaré» de {name}.',
    },
    framework: 'intuition',
    dimension: 'consistency',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q17',
    text: {
      en: "Who gives you what they wanted to give, then counts it as love you owe back?",
      fr: "Qui te donne ce qu'il avait envie de donner, puis le compte comme un amour que tu lui dois ?",
      ar: 'مَن يمنحك ما أراد هو أن يمنحه، ثم يحسبه حبًّا عليك أن تردّه؟',
      es: '¿Quién te da lo que él quería dar y luego lo cobra como un amor que le debes?',
    },
    soloText: {
      en: "{name} gives you what they wanted to give, then counts it as love you owe back.",
      fr: "{name} te donne ce qu'il avait envie de donner, puis le compte comme un amour que tu lui dois.",
      ar: 'يمنحك {name} ما أراد هو أن يمنحه، ثم يحسبه حبًّا عليك أن تردّه.',
      es: '{name} te da lo que él quería dar y luego lo cobra como un amor que le debes.',
    },
    framework: 'loveLanguages',
    dimension: 'boundaries',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q18',
    text: {
      en: "Who edits the truth to keep the peace, then calls the editing kindness?",
      fr: "Qui retouche la vérité pour préserver la paix, puis appelle cette retouche de la gentillesse ?",
      ar: 'مَن يشذّب الحقيقة حفاظًا على السلام، ثم يسمّي هذا التشذيب لطفًا؟',
      es: '¿Quién recorta la verdad para mantener la paz y luego llama bondad a ese recorte?',
    },
    soloText: {
      en: "{name} edits the truth to keep the peace, then calls the editing kindness.",
      fr: "{name} retouche la vérité pour préserver la paix, puis appelle cette retouche de la gentillesse.",
      ar: 'يشذّب {name} الحقيقة حفاظًا على السلام، ثم يسمّي هذا التشذيب لطفًا.',
      es: '{name} recorta la verdad para mantener la paz y luego llama bondad a ese recorte.',
    },
    framework: 'sociometry',
    dimension: 'transparency',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q19',
    text: {
      en: "Who leaves you as the one apologizing at the end of every conflict?",
      fr: "Avec qui finis-tu par être celui qui s'excuse à la fin de chaque conflit ?",
      ar: 'مَن يجعلك أنت المعتذِر في نهاية كل خلاف؟',
      es: '¿Con quién acabas siendo tú quien se disculpa al final de cada conflicto?',
    },
    soloText: {
      en: "With {name}, you end up as the one apologizing at the end of every conflict.",
      fr: "Avec {name}, tu finis par être celui qui s'excuse à la fin de chaque conflit.",
      ar: 'مع {name}، تنتهي أنت المعتذِر في نهاية كل خلاف.',
      es: 'Con {name}, acabas siendo tú quien se disculpa al final de cada conflicto.',
    },
    framework: 'mixed',
    dimension: 'repair',
    personWeight: 1,
    core: true,
  },
  {
    id: 'red_green_flag_q20',
    text: {
      en: "Around whom do you rehearse your sentences before you say them?",
      fr: "Devant qui répètes-tu tes phrases avant de les dire ?",
      ar: 'أمام مَن تتمرّن على جُملك قبل أن تنطق بها؟',
      es: '¿Delante de quién ensayas tus frases antes de decirlas?',
    },
    soloText: {
      en: "Around {name}, you rehearse your sentences before you say them.",
      fr: "Devant {name}, tu répètes tes phrases avant de les dire.",
      ar: 'أمام {name}، تتمرّن على جُملك قبل أن تنطق بها.',
      es: 'Delante de {name}, ensayas tus frases antes de decirlas.',
    },
    framework: 'intuition',
    dimension: 'control',
    personWeight: 1,
    core: true,
  },
];
