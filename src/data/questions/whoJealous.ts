// STUB — expand to 20 questions before production
import { Question } from '../../types';

export const whoJealousQuestions: Question[] = [
  {
    id: 'who_jealous_q01',
    text: {
      en: "Who seems to copy your moves, your style, or your plans shortly after you share them?",
      fr: "Qui semble copier tes idées, ton style ou tes projets peu après que tu les aies partagés ?",
      ar: "من يبدو أنه ينسخ خطواتك أو أسلوبك أو خططك بعد وقت قصير من مشاركتك لها؟",
      es: "¿Quién parece copiar tus movimientos, tu estilo o tus planes poco después de que los compartes?",
    },
    framework: 'sociometry',
    dimension: 'envy_mirroring',
    personWeight: 2,
  },
  {
    id: 'who_jealous_q02',
    text: {
      en: "Who brings up your past failures when your present is going well?",
      fr: "Qui évoque tes échecs passés quand ton présent va bien ?",
      ar: "من يذكر إخفاقاتك الماضية عندما يسير حاضرك بشكل جيد؟",
      es: "¿Quién saca a relucir tus fracasos pasados cuando tu presente va bien?",
    },
    framework: 'sociometry',
    dimension: 'competitive_resentment',
    personWeight: 2,
  },
  {
    id: 'who_jealous_q03',
    text: {
      en: "Who questions or doubts your achievements rather than accepting them at face value?",
      fr: "Qui remet en question ou doute de tes réussites plutôt que de les accepter telles quelles ?",
      ar: "من يشكك في إنجازاتك بدلاً من قبولها كما هي؟",
      es: "¿Quién cuestiona o duda de tus logros en lugar de aceptarlos tal como son?",
    },
    framework: 'sociometry',
    dimension: 'envy_mirroring',
    personWeight: 1,
  },
  {
    id: 'who_jealous_q04',
    text: {
      en: "Who gets unusually quiet or withdrawn when attention shifts positively toward you?",
      fr: "Qui devient inhabituellement silencieux ou renfermé quand l'attention se porte positivement sur toi ?",
      ar: "من يصبح هادئاً أو منسحباً بشكل غير اعتيادي عندما تنتقل الانتباه إيجابياً نحوك؟",
      es: "¿Quién se vuelve inusualmente callado o retraído cuando la atención se dirige positivamente hacia ti?",
    },
    framework: 'sociometry',
    dimension: 'competitive_resentment',
    personWeight: 1,
  },
  {
    id: 'who_jealous_q05',
    text: {
      en: "Who seems more interested in what you have than in who you are?",
      fr: "Qui semble plus intéressé par ce que tu as que par qui tu es ?",
      ar: "من يبدو أنه مهتم بما لديك أكثر من اهتمامه بمن أنت؟",
      es: "¿Quién parece más interesado en lo que tienes que en quién eres?",
    },
    framework: 'sociometry',
    dimension: 'envy_mirroring',
    personWeight: 1,
  },
  // TODO: add 15 more questions
];
