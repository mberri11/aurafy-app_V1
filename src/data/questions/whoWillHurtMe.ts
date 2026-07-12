import { Question } from '../../types';

// ─────────────────────────────────────────────────────────────────────────────
// WHO WILL HURT ME? — sociometry framing: observable trust-risk behaviours in the
// user's circle, never fortune-telling. 3 dimensions:
//   trust_erosion  (8) — leaked confidences, broken promises, duplicity
//   self_interest  (7) — extraction, score-keeping, envy, boundary-testing
//   volatility     (5) — hot-cold cycles, displaced anger, past-pattern burns
// personWeight 2 marks the strongest predictors (6 of 20, mirrors whoHatesMe).
// SOLO POLARITY: every soloText states the WARNING behaviour, so Always/Often =
// sign present → the count result's `high` tier is the warning, `none` the relief
// (same inverted polarity as whoHatesMeCount).
// ─────────────────────────────────────────────────────────────────────────────

export const whoWillHurtMeQuestions: Question[] = [
  {
    id: 'who_will_hurt_me_q01',
    text: {
      en: 'Who repeats things you told them in confidence — as casual conversation?',
      fr: 'Qui répète ce que tu lui as confié — comme une simple conversation ?',
      ar: 'من يكرر ما أخبرته به سرًّا — وكأنه حديث عابر؟',
      es: '¿Quién repite lo que le contaste en confianza, como si fuera conversación casual?',
    },
    soloText: {
      en: '{name} repeats things you told them in confidence — as casual conversation.',
      fr: '{name} répète ce que tu lui as confié — comme une simple conversation.',
      ar: 'يكرر {name} ما أخبرته به سرًّا وكأنه حديث عابر.',
      es: '{name} repite lo que le contaste en confianza, como si fuera conversación casual.',
    },
    framework: 'sociometry',
    dimension: 'trust_erosion',
    personWeight: 2,
  },
  {
    id: 'who_will_hurt_me_q02',
    text: {
      en: 'Who makes promises easily and keeps them rarely?',
      fr: 'Qui fait des promesses facilement et les tient rarement ?',
      ar: 'من يُطلق الوعود بسهولة ونادرًا ما يفي بها؟',
      es: '¿Quién hace promesas con facilidad y las cumple rara vez?',
    },
    soloText: {
      en: '{name} makes promises easily and keeps them rarely.',
      fr: '{name} fait des promesses facilement et les tient rarement.',
      ar: 'يُطلق {name} الوعود بسهولة ونادرًا ما يفي بها.',
      es: '{name} hace promesas con facilidad y las cumple rara vez.',
    },
    framework: 'sociometry',
    dimension: 'trust_erosion',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q03',
    text: {
      en: 'Who is warmest to your face right after speaking about you behind your back?',
      fr: 'Qui est le plus chaleureux avec toi juste après avoir parlé dans ton dos ?',
      ar: 'من يكون الألطف في وجهك بعدما تحدث عنك من وراء ظهرك مباشرة؟',
      es: '¿Quién es más cálido contigo justo después de hablar a tus espaldas?',
    },
    soloText: {
      en: '{name} is warmest to your face right after speaking about you behind your back.',
      fr: '{name} se montre le plus chaleureux avec toi juste après avoir parlé dans ton dos.',
      ar: 'يكون {name} الألطف في وجهك بعدما يتحدث عنك من وراء ظهرك مباشرة.',
      es: '{name} es más cálido contigo justo después de hablar a tus espaldas.',
    },
    framework: 'sociometry',
    dimension: 'trust_erosion',
    personWeight: 2,
  },
  {
    id: 'who_will_hurt_me_q04',
    text: {
      en: "Who tells the same story differently depending on who's in the room?",
      fr: 'Qui raconte la même histoire différemment selon les personnes présentes ?',
      ar: 'من يروي القصة نفسها بصيغة مختلفة حسب الحاضرين؟',
      es: '¿Quién cuenta la misma historia de forma distinta según quién esté presente?',
    },
    soloText: {
      en: "{name} tells the same story differently depending on who's in the room.",
      fr: '{name} raconte la même histoire différemment selon les personnes présentes.',
      ar: 'يروي {name} القصة نفسها بصيغة مختلفة حسب الحاضرين.',
      es: '{name} cuenta la misma historia de forma distinta según quién esté presente.',
    },
    framework: 'sociometry',
    dimension: 'trust_erosion',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q05',
    text: {
      en: "Who 'forgets' plans with you but never forgets their own priorities?",
      fr: 'Qui « oublie » ses engagements envers toi, mais jamais ses propres priorités ?',
      ar: 'من «ينسى» مواعيده معك لكنه لا ينسى أولوياته أبدًا؟',
      es: "¿Quién 'olvida' los planes contigo pero nunca sus propias prioridades?",
    },
    soloText: {
      en: "{name} 'forgets' plans with you but never forgets their own priorities.",
      fr: '{name} « oublie » ses engagements envers toi, mais jamais ses propres priorités.',
      ar: '«ينسى» {name} مواعيده معك لكنه لا ينسى أولوياته أبدًا.',
      es: "{name} 'olvida' los planes contigo pero nunca sus propias prioridades.",
    },
    framework: 'sociometry',
    dimension: 'trust_erosion',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q06',
    text: {
      en: 'Who has turned something you shared in a weak moment into a joke or a jab?',
      fr: 'Qui a transformé une confidence faite dans un moment de faiblesse en blague ou en pique ?',
      ar: 'من حوّل شيئًا بُحت به في لحظة ضعف إلى نكتة أو طعنة؟',
      es: '¿Quién convirtió algo que compartiste en un momento débil en una broma o una indirecta?',
    },
    soloText: {
      en: '{name} has turned something you shared in a weak moment into a joke or a jab.',
      fr: '{name} a transformé une confidence faite dans un moment de faiblesse en blague ou en pique.',
      ar: 'حوّل {name} شيئًا بُحت به في لحظة ضعف إلى نكتة أو طعنة.',
      es: '{name} convirtió algo que compartiste en un momento débil en una broma o una indirecta.',
    },
    framework: 'sociometry',
    dimension: 'trust_erosion',
    personWeight: 2,
  },
  {
    id: 'who_will_hurt_me_q07',
    text: {
      en: 'Who dodges giving you a straight answer when you ask where you stand?',
      fr: "Qui évite de te répondre franchement quand tu demandes où tu en es avec lui ?",
      ar: 'من يراوغ في الإجابة حين تسأله بصراحة عن موقعك عنده؟',
      es: '¿Quién esquiva darte una respuesta clara cuando preguntas en qué punto estás con él?',
    },
    soloText: {
      en: '{name} dodges giving you a straight answer when you ask where you stand.',
      fr: '{name} évite de te répondre franchement quand tu demandes où tu en es avec lui.',
      ar: 'يراوغ {name} في الإجابة حين تسأله بصراحة عن موقعك عنده.',
      es: '{name} esquiva darte una respuesta clara cuando le preguntas en qué punto estás.',
    },
    framework: 'sociometry',
    dimension: 'trust_erosion',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q08',
    text: {
      en: "Who praises you in private but goes silent when you're criticized in front of others?",
      fr: 'Qui te félicite en privé mais se tait quand on te critique devant les autres ?',
      ar: 'من يمدحك في السرّ لكنه يصمت حين تُنتقد أمام الآخرين؟',
      es: '¿Quién te elogia en privado pero guarda silencio cuando te critican delante de otros?',
    },
    soloText: {
      en: "{name} praises you in private but goes silent when you're criticized in front of others.",
      fr: '{name} te félicite en privé mais se tait quand on te critique devant les autres.',
      ar: 'يمدحك {name} في السرّ لكنه يصمت حين تُنتقد أمام الآخرين.',
      es: '{name} te elogia en privado pero guarda silencio cuando te critican delante de otros.',
    },
    framework: 'sociometry',
    dimension: 'trust_erosion',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q09',
    text: {
      en: 'Who only reaches out when they need something from you?',
      fr: "Qui ne te contacte que lorsqu'il a besoin de quelque chose ?",
      ar: 'من لا يتواصل معك إلا حين يحتاج شيئًا منك؟',
      es: '¿Quién solo te busca cuando necesita algo de ti?',
    },
    soloText: {
      en: '{name} only reaches out when they need something from you.',
      fr: "{name} ne te contacte que lorsqu'il a besoin de quelque chose.",
      ar: 'لا يتواصل {name} معك إلا حين يحتاج شيئًا منك.',
      es: '{name} solo te busca cuando necesita algo de ti.',
    },
    framework: 'sociometry',
    dimension: 'self_interest',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q10',
    text: {
      en: 'Who gets a little quieter every time something good happens to you?',
      fr: "Qui devient un peu plus silencieux chaque fois qu'il t'arrive quelque chose de bien ?",
      ar: 'من يصبح أكثر صمتًا كلما حدث لك شيء جيد؟',
      es: '¿Quién se queda un poco más callado cada vez que te pasa algo bueno?',
    },
    soloText: {
      en: '{name} gets a little quieter every time something good happens to you.',
      fr: "{name} devient un peu plus silencieux chaque fois qu'il t'arrive quelque chose de bien.",
      ar: 'يصبح {name} أكثر صمتًا كلما حدث لك شيء جيد.',
      es: '{name} se queda un poco más callado cada vez que te pasa algo bueno.',
    },
    framework: 'sociometry',
    dimension: 'self_interest',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q11',
    text: {
      en: "Who keeps count of every favor they've ever done for you?",
      fr: "Qui tient le compte de chaque service qu'il t'a rendu ?",
      ar: 'من يُحصي كل معروف قدّمه لك يومًا؟',
      es: '¿Quién lleva la cuenta de cada favor que te ha hecho?',
    },
    soloText: {
      en: "{name} keeps count of every favor they've ever done for you.",
      fr: "{name} tient le compte de chaque service qu'il t'a rendu.",
      ar: 'يُحصي {name} كل معروف قدّمه لك يومًا.',
      es: '{name} lleva la cuenta de cada favor que te ha hecho.',
    },
    framework: 'sociometry',
    dimension: 'self_interest',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q12',
    text: {
      en: 'Who has taken credit for something that was actually yours?',
      fr: "Qui s'est attribué le mérite de quelque chose qui venait de toi ?",
      ar: 'من نسب لنفسه فضل شيء كان في الحقيقة لك؟',
      es: '¿Quién se llevó el crédito por algo que en realidad era tuyo?',
    },
    soloText: {
      en: '{name} has taken credit for something that was actually yours.',
      fr: "{name} s'est attribué le mérite de quelque chose qui venait de toi.",
      ar: 'نسب {name} لنفسه فضل شيء كان في الحقيقة لك.',
      es: '{name} se llevó el crédito por algo que en realidad era tuyo.',
    },
    framework: 'sociometry',
    dimension: 'self_interest',
    personWeight: 2,
  },
  {
    id: 'who_will_hurt_me_q13',
    text: {
      en: 'Who competes with you while calling it friendship?',
      fr: "Qui est en compétition avec toi tout en appelant ça de l'amitié ?",
      ar: 'من ينافسك وهو يسمّي ذلك صداقة؟',
      es: '¿Quién compite contigo mientras lo llama amistad?',
    },
    soloText: {
      en: '{name} competes with you while calling it friendship.',
      fr: "{name} est en compétition avec toi tout en appelant ça de l'amitié.",
      ar: 'ينافسك {name} وهو يسمّي ذلك صداقة.',
      es: '{name} compite contigo mientras lo llama amistad.',
    },
    framework: 'sociometry',
    dimension: 'self_interest',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q14',
    text: {
      en: 'Who pushes a boundary a little further every time you let one slide?',
      fr: 'Qui pousse une limite un peu plus loin chaque fois que tu en laisses passer une ?',
      ar: 'من يتجاوز حدودك أكثر قليلًا كلما تغاضيت عن تجاوز؟',
      es: '¿Quién empuja un límite un poco más lejos cada vez que dejas pasar uno?',
    },
    soloText: {
      en: '{name} pushes a boundary a little further every time you let one slide.',
      fr: '{name} pousse une limite un peu plus loin chaque fois que tu en laisses passer une.',
      ar: 'يتجاوز {name} حدودك أكثر قليلًا كلما تغاضيت عن تجاوز.',
      es: '{name} empuja un límite un poco más lejos cada vez que dejas pasar uno.',
    },
    framework: 'sociometry',
    dimension: 'self_interest',
    personWeight: 2,
  },
  {
    id: 'who_will_hurt_me_q15',
    text: {
      en: "Who apologizes with 'sorry you feel that way' — and changes nothing?",
      fr: "Qui s'excuse d'un « désolé que tu le prennes comme ça » — sans rien changer ?",
      ar: 'من يعتذر بعبارة «آسف أنك شعرت هكذا» — ثم لا يغيّر شيئًا؟',
      es: "¿Quién se disculpa con un 'siento que te lo tomes así' — y no cambia nada?",
    },
    soloText: {
      en: "{name} apologizes with 'sorry you feel that way' — and changes nothing.",
      fr: "{name} s'excuse d'un « désolé que tu le prennes comme ça » — sans rien changer.",
      ar: 'يعتذر {name} بعبارة «آسف أنك شعرت هكذا» ثم لا يغيّر شيئًا.',
      es: "{name} se disculpa con un 'siento que te lo tomes así' — y no cambia nada.",
    },
    framework: 'sociometry',
    dimension: 'self_interest',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q16',
    text: {
      en: 'Who runs hot and cold with you for reasons you can never trace?',
      fr: 'Qui souffle le chaud et le froid avec toi pour des raisons que tu ne comprends jamais ?',
      ar: 'من يتقلّب معك بين الدفء والبرود لأسباب لا تستطيع تتبّعها أبدًا؟',
      es: '¿Quién sopla frío y caliente contigo por razones que nunca logras rastrear?',
    },
    soloText: {
      en: '{name} runs hot and cold with you for reasons you can never trace.',
      fr: '{name} souffle le chaud et le froid avec toi pour des raisons que tu ne comprends jamais.',
      ar: 'يتقلّب {name} معك بين الدفء والبرود لأسباب لا تستطيع تتبّعها أبدًا.',
      es: '{name} sopla frío y caliente contigo por razones que nunca logras rastrear.',
    },
    framework: 'sociometry',
    dimension: 'volatility',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q17',
    text: {
      en: 'Who has burned someone who trusted them — and told the story laughing?',
      fr: "Qui a trahi quelqu'un qui lui faisait confiance — et l'a raconté en riant ?",
      ar: 'من خذل شخصًا وثق به — ثم روى القصة وهو يضحك؟',
      es: '¿Quién traicionó a alguien que confiaba en él — y contó la historia riéndose?',
    },
    soloText: {
      en: '{name} has burned someone who trusted them — and told the story laughing.',
      fr: "{name} a trahi quelqu'un qui lui faisait confiance — et l'a raconté en riant.",
      ar: 'خذل {name} شخصًا وثق به ثم روى القصة وهو يضحك.',
      es: '{name} traicionó a alguien que confiaba en él — y contó la historia riéndose.',
    },
    framework: 'sociometry',
    dimension: 'volatility',
    personWeight: 2,
  },
  {
    id: 'who_will_hurt_me_q18',
    text: {
      en: 'Whose anger flips fast — and lands on whoever is closest?',
      fr: 'Chez qui la colère monte vite — et retombe sur la personne la plus proche ?',
      ar: 'من يشتعل غضبه بسرعة — ويقع على أقرب الناس إليه؟',
      es: '¿A quién se le dispara el enojo rápido — y cae sobre quien esté más cerca?',
    },
    soloText: {
      en: 'When {name} gets angry, it flips fast — and lands on whoever is closest.',
      fr: 'Quand {name} se met en colère, ça monte vite — et ça retombe sur la personne la plus proche.',
      ar: 'يشتعل غضب {name} بسرعة ويقع على أقرب الناس إليه.',
      es: 'A {name} se le dispara el enojo rápido — y cae sobre quien esté más cerca.',
    },
    framework: 'sociometry',
    dimension: 'volatility',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q19',
    text: {
      en: "Who punishes you with silence when things don't go their way?",
      fr: 'Qui te punit par le silence quand les choses ne vont pas dans son sens ?',
      ar: 'من يعاقبك بالصمت حين لا تسير الأمور كما يريد؟',
      es: '¿Quién te castiga con el silencio cuando las cosas no salen como quiere?',
    },
    soloText: {
      en: "{name} punishes you with silence when things don't go their way.",
      fr: '{name} te punit par le silence quand les choses ne vont pas dans son sens.',
      ar: 'يعاقبك {name} بالصمت حين لا تسير الأمور كما يريد.',
      es: '{name} te castiga con el silencio cuando las cosas no salen como quiere.',
    },
    framework: 'sociometry',
    dimension: 'volatility',
    personWeight: 1,
  },
  {
    id: 'who_will_hurt_me_q20',
    text: {
      en: 'Around whom do you catch yourself being careful — without ever deciding to be?',
      fr: "Avec qui te surprends-tu à être prudent — sans jamais l'avoir décidé ?",
      ar: 'مع من تجد نفسك حذرًا — دون أن تقرر ذلك يومًا؟',
      es: '¿Con quién te descubres siendo cauteloso — sin haberlo decidido nunca?',
    },
    soloText: {
      en: 'You catch yourself being careful around {name} — without ever deciding to be.',
      fr: "Tu te surprends à être prudent avec {name} — sans jamais l'avoir décidé.",
      ar: 'تجد نفسك حذرًا مع {name} دون أن تقرر ذلك يومًا.',
      es: 'Te descubres siendo cauteloso con {name} — sin haberlo decidido nunca.',
    },
    framework: 'sociometry',
    dimension: 'volatility',
    personWeight: 1,
  },
];
