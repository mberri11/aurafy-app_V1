// STUB — expand to 20 questions before production
import { Question } from '../../types';

export const amITheProblemQuestions: Question[] = [
  {
    id: 'am_i_problem_q01',
    text: {
      en: "When a friendship or relationship ends, what's your honest first reaction?",
      fr: "Quand une amitié ou une relation se termine, quelle est ta première réaction honnête ?",
      ar: "عندما تنتهي صداقة أو علاقة، ما هو رد فعلك الأول الصادق؟",
      es: "Cuando una amistad o relación termina, ¿cuál es tu primera reacción honesta?",
    },
    framework: 'mixed',
    dimension: 'accountability',
    soloAnswers: [
      { label: { en: 'I reflect on what I could have done better', fr: 'Je réfléchis à ce que j\'aurais pu mieux faire', ar: 'أتأمل ما كان يمكنني فعله بشكل أفضل', es: 'Reflexiono sobre lo que pude haber hecho mejor' }, score: 2 },
      { label: { en: 'I wonder if we were just incompatible', fr: 'Je me demande si on était juste incompatibles', ar: 'أتساءل إن كنا غير متوافقين فحسب', es: 'Me pregunto si simplemente éramos incompatibles' }, score: 1 },
      { label: { en: 'I mostly blame the other person', fr: 'Je blâme surtout l\'autre personne', ar: 'أُلقي اللوم في الغالب على الشخص الآخر', es: 'Mayormente culpo a la otra persona' }, score: -1 },
      { label: { en: 'I feel victimized and don\'t see my role', fr: 'Je me sens victime et ne vois pas mon rôle', ar: 'أشعر بأنني ضحية ولا أرى دوري', es: 'Me siento víctima y no veo mi rol' }, score: -2 },
    ],
  },
  {
    id: 'am_i_problem_q02',
    text: {
      en: "How often do people tell you they feel unheard or dismissed by you?",
      fr: "À quelle fréquence les gens te disent-ils qu'ils se sentent ignorés ou rejetés par toi ?",
      ar: "كم مرة يخبرك الناس أنهم يشعرون بأنهم غير مسموعين أو مرفوضين منك؟",
      es: "¿Con qué frecuencia la gente te dice que se siente no escuchada o ignorada por ti?",
    },
    framework: 'mixed',
    dimension: 'empathy_deficit',
    soloAnswers: [
      { label: { en: 'Rarely — I actively listen', fr: 'Rarement — j\'écoute activement', ar: 'نادراً — أستمع بفاعلية', es: 'Raramente — escucho activamente' }, score: 2 },
      { label: { en: 'Occasionally — I\'m working on it', fr: 'Occasionnellement — j\'y travaille', ar: 'أحياناً — أعمل على تحسين ذلك', es: 'Ocasionalmente — estoy trabajando en eso' }, score: 1 },
      { label: { en: 'Often — I get told I don\'t listen', fr: 'Souvent — on me dit que je n\'écoute pas', ar: 'كثيراً — يُقال لي أنني لا أستمع', es: 'Con frecuencia — me dicen que no escucho' }, score: -1 },
      { label: { en: 'I rarely let others speak for long', fr: 'Je laisse rarement les autres parler longtemps', ar: 'نادراً ما أدع الآخرين يتحدثون طويلاً', es: 'Raramente dejo que los demás hablen por mucho tiempo' }, score: -2 },
    ],
  },
  {
    id: 'am_i_problem_q03',
    text: {
      en: "When you realize you've hurt someone, how quickly do you apologize?",
      fr: "Quand tu réalises avoir blessé quelqu'un, à quelle vitesse t'excuses-tu ?",
      ar: "عندما تدرك أنك آذيت شخصاً ما، كم يستغرق منك الاعتذار؟",
      es: "Cuando te das cuenta de que has lastimado a alguien, ¿qué tan rápido te disculpas?",
    },
    framework: 'mixed',
    dimension: 'accountability',
    soloAnswers: [
      { label: { en: 'Immediately — I feel bad and apologize', fr: 'Immédiatement — je me sens mal et m\'excuse', ar: 'فوراً — أشعر بالأسف وأعتذر', es: 'Inmediatamente — me siento mal y me disculpo' }, score: 2 },
      { label: { en: 'Once I\'ve had time to reflect', fr: 'Une fois que j\'ai eu le temps de réfléchir', ar: 'بمجرد أن أتأمل', es: 'Una vez que he tenido tiempo para reflexionar' }, score: 1 },
      { label: { en: 'Only if they bring it up directly', fr: 'Seulement s\'ils l\'abordent directement', ar: 'فقط إذا أثاروه مباشرةً', es: 'Solo si ellos lo mencionan directamente' }, score: -1 },
      { label: { en: 'I rarely think I\'ve done something wrong', fr: 'Je pense rarement avoir fait quelque chose de mal', ar: 'نادراً ما أظن أنني أخطأت', es: 'Rara vez creo haber hecho algo mal' }, score: -2 },
    ],
  },
  {
    id: 'am_i_problem_q04',
    text: {
      en: "How often do you find yourself in conflict with multiple different people?",
      fr: "À quelle fréquence te retrouves-tu en conflit avec plusieurs personnes différentes ?",
      ar: "كم مرة تجد نفسك في صراع مع أشخاص مختلفين متعددين؟",
      es: "¿Con qué frecuencia te encuentras en conflicto con múltiples personas diferentes?",
    },
    framework: 'mixed',
    dimension: 'pattern_recognition',
    soloAnswers: [
      { label: { en: 'Rarely — I resolve conflict quickly', fr: 'Rarement — je résous les conflits rapidement', ar: 'نادراً — أحل الصراعات بسرعة', es: 'Raramente — resuelvo los conflictos rápidamente' }, score: 2 },
      { label: { en: 'Occasionally — it depends on the situation', fr: 'Occasionnellement — ça dépend de la situation', ar: 'أحياناً — يعتمد على الموقف', es: 'Ocasionalmente — depende de la situación' }, score: 1 },
      { label: { en: 'Often — conflicts seem to follow me', fr: 'Souvent — les conflits semblent me suivre', ar: 'كثيراً — يبدو أن الصراعات تتبعني', es: 'Con frecuencia — los conflictos parecen seguirme' }, score: -1 },
      { label: { en: 'I\'m almost always in some conflict', fr: 'Je suis presque toujours dans un conflit quelconque', ar: 'أنا دائماً تقريباً في صراع ما', es: 'Casi siempre estoy en algún conflicto' }, score: -2 },
    ],
  },
  {
    id: 'am_i_problem_q05',
    text: {
      en: "Do people feel comfortable setting boundaries with you?",
      fr: "Les gens se sentent-ils à l'aise pour établir des limites avec toi ?",
      ar: "هل يشعر الناس بالراحة لوضع حدود معك؟",
      es: "¿La gente se siente cómoda estableciendo límites contigo?",
    },
    framework: 'mixed',
    dimension: 'empathy_deficit',
    soloAnswers: [
      { label: { en: 'Yes — I respect and encourage it', fr: 'Oui — je respecte et l\'encourage', ar: 'نعم — أحترمه وأشجع عليه', es: 'Sí — lo respeto y lo animo' }, score: 2 },
      { label: { en: 'Mostly — I try my best', fr: 'Surtout — j\'essaie de mon mieux', ar: 'في الغالب — أحاول قدر الإمكان', es: 'Mayormente — hago mi mejor esfuerzo' }, score: 1 },
      { label: { en: 'Not always — I can get defensive', fr: 'Pas toujours — je peux devenir défensif', ar: 'ليس دائماً — قد أصبح دفاعياً', es: 'No siempre — puedo ponerme a la defensiva' }, score: -1 },
      { label: { en: 'I feel boundaries are often unreasonable', fr: 'Je sens que les limites sont souvent déraisonnables', ar: 'أشعر أن الحدود غالباً ما تكون غير معقولة', es: 'Siento que los límites suelen ser irrazonables' }, score: -2 },
    ],
  },
  // TODO: add 15 more questions
];
