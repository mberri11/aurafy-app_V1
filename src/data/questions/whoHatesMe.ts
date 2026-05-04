// STUB — expand to 20 questions before production
import { Question } from '../../types';

export const whoHatesMeQuestions: Question[] = [
  {
    id: 'who_hates_me_q01',
    text: {
      en: "Who do you feel subtly tense around, even when nothing is explicitly said?",
      fr: "Avec qui ressens-tu une tension subtile, même quand rien n'est dit explicitement ?",
      ar: "من الذي تشعر بتوتر خفي معه، حتى عندما لا يُقال شيء صراحةً؟",
      es: "¿Con quién sientes una tensión sutil, incluso cuando no se dice nada explícitamente?",
    },
    framework: 'sociometry',
    dimension: 'negative_affect',
    personWeight: 2,
  },
  {
    id: 'who_hates_me_q02',
    text: {
      en: "Who seems to find ways to minimize your achievements, directly or indirectly?",
      fr: "Qui semble trouver des façons de minimiser tes réussites, directement ou indirectement ?",
      ar: "من يبدو أنه يجد طرقاً لتقليل إنجازاتك، مباشرةً أو بشكل غير مباشر؟",
      es: "¿Quién parece encontrar maneras de minimizar tus logros, directa o indirectamente?",
    },
    framework: 'sociometry',
    dimension: 'social_undermining',
    personWeight: 1,
  },
  {
    id: 'who_hates_me_q03',
    text: {
      en: "Who rarely or never asks how you're doing, but notices when you mess up?",
      fr: "Qui ne demande rarement ou jamais comment tu vas, mais remarque quand tu fais une erreur ?",
      ar: "من نادراً ما يسألك كيف حالك، لكنه يلاحظ عندما تخطئ؟",
      es: "¿Quién rara vez o nunca pregunta cómo estás, pero nota cuando cometes un error?",
    },
    framework: 'sociometry',
    dimension: 'negative_affect',
    personWeight: 1,
  },
  {
    id: 'who_hates_me_q04',
    text: {
      en: "Who seems to prefer the version of you that is struggling or failing?",
      fr: "Qui semble préférer la version de toi qui est en difficulté ou qui échoue ?",
      ar: "من يبدو أنه يفضل النسخة منك التي تعاني أو تفشل؟",
      es: "¿Quién parece preferir la versión de ti que está luchando o fallando?",
    },
    framework: 'sociometry',
    dimension: 'social_undermining',
    personWeight: 2,
  },
  {
    id: 'who_hates_me_q05',
    text: {
      en: "Who changes the energy of the room when you receive good news?",
      fr: "Qui change l'énergie de la pièce quand tu reçois de bonnes nouvelles ?",
      ar: "من يغير طاقة الغرفة عندما تتلقى أخباراً جيدة؟",
      es: "¿Quién cambia la energía del ambiente cuando recibes buenas noticias?",
    },
    framework: 'sociometry',
    dimension: 'negative_affect',
    personWeight: 2,
  },
  // TODO: add 15 more questions
];
