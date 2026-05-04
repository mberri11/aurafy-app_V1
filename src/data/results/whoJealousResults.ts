// STUB — expand insight pools to 6 variants per dimension before production
import { MultiResults } from '../../types';

export const whoJealousResults: MultiResults = {
  winnerTemplate: {
    en: '{name} is the most envious of what you have.',
    fr: '{name} est le plus jaloux de ce que tu as.',
    ar: '{name} هو الأكثر حسداً لما تملكه.',
    es: '{name} es quien más envidia lo que tienes.',
  },
  insights: {
    envy_mirroring: [
      {
        en: 'Their mimicry is a backwards compliment — imitation reveals what they wish they had.',
        fr: 'Leur imitation est un compliment à rebours — elle révèle ce qu\'ils souhaiteraient avoir.',
        ar: 'تقليدهم لك مجاملة معكوسة — يكشف ما يتمنون امتلاكه.',
        es: 'Su imitación es un cumplido al revés — revela lo que desearían tener.',
      },
      {
        en: 'Jealousy from others is a sign you are living a life worth wanting.',
        fr: 'La jalousie des autres est un signe que tu vis une vie qui vaut la peine d\'être désirée.',
        ar: 'الغيرة من الآخرين علامة على أنك تعيش حياة تستحق الرغبة.',
        es: 'Los celos de los demás son una señal de que estás viviendo una vida que vale la pena desear.',
      },
    ],
    competitive_resentment: [
      {
        en: 'Their competition with you is one-sided — you didn\'t enter this race.',
        fr: 'Leur compétition avec toi est unilatérale — tu n\'as pas participé à cette course.',
        ar: 'منافستهم لك من طرف واحد — لم تدخل هذا السباق.',
        es: 'Su competencia contigo es unilateral — tú no entraste en esta carrera.',
      },
    ],
  },
};
