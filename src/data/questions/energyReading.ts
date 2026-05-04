// STUB — expand to 20 questions before production
import { Question } from '../../types';

export const energyReadingQuestions: Question[] = [
  {
    id: 'energy_reading_q01',
    text: {
      en: "Who makes you feel more energized after spending time with them?",
      fr: "Qui te donne plus d'énergie après avoir passé du temps avec lui ?",
      ar: "من يجعلك تشعر بطاقة أكبر بعد قضاء الوقت معه؟",
      es: "¿Quién te hace sentir más energizado después de pasar tiempo con ellos?",
    },
    framework: 'colorWheel',
    dimension: 'vitality',
    personWeight: 2,
  },
  {
    id: 'energy_reading_q02',
    text: {
      en: "Whose presence brings an immediate sense of calm when you're anxious?",
      fr: "La présence de qui apporte une sensation de calme immédiate quand tu es anxieux ?",
      ar: "من يجلب حضوره شعوراً فورياً بالهدوء عندما تشعر بالقلق؟",
      es: "¿La presencia de quién trae una sensación inmediata de calma cuando estás ansioso?",
    },
    framework: 'colorWheel',
    dimension: 'calm_energy',
    personWeight: 1,
  },
  {
    id: 'energy_reading_q03',
    text: {
      en: "Who inspires you to be a better version of yourself just by being around them?",
      fr: "Qui t'inspire à être une meilleure version de toi-même juste en étant autour de lui ?",
      ar: "من يلهمك لتكون نسخة أفضل من نفسك فقط بوجوده حولك؟",
      es: "¿Quién te inspira a ser una mejor versión de ti mismo solo por estar cerca de ellos?",
    },
    framework: 'colorWheel',
    dimension: 'inspirational_energy',
    personWeight: 2,
  },
  {
    id: 'energy_reading_q04',
    text: {
      en: "Who do you instinctively think of when you need creative or intellectual stimulation?",
      fr: "À qui penses-tu instinctivement quand tu as besoin de stimulation créative ou intellectuelle ?",
      ar: "من تفكر فيه غريزياً عندما تحتاج إلى تحفيز إبداعي أو فكري؟",
      es: "¿En quién piensas instintivamente cuando necesitas estimulación creativa o intelectual?",
    },
    framework: 'colorWheel',
    dimension: 'vitality',
    personWeight: 1,
  },
  {
    id: 'energy_reading_q05',
    text: {
      en: "Who, when they walk into a room, makes the whole atmosphere feel lighter and brighter?",
      fr: "Qui, quand il entre dans une pièce, donne l'impression que toute l'atmosphère est plus légère et lumineuse ?",
      ar: "من، عندما يدخل الغرفة، يجعل الجو كله يبدو أخف وأكثر إشراقاً؟",
      es: "¿Quién, cuando entra a una habitación, hace que toda la atmósfera se sienta más ligera y brillante?",
    },
    framework: 'colorWheel',
    dimension: 'calm_energy',
    personWeight: 1,
  },
  // TODO: add 15 more questions
];
