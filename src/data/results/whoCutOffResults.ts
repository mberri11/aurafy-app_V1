// STUB — expand insight pools to 6 variants per dimension before production
import { MultiResults } from '../../types';

export const whoCutOffResults: MultiResults = {
  winnerTemplate: {
    en: '{name} has emotionally withdrawn the most.',
    fr: '{name} s\'est le plus retiré émotionnellement.',
    ar: '{name} انسحب عاطفياً أكثر من غيره.',
    es: '{name} se ha retirado emocionalmente más que los demás.',
  },
  insights: {
    withdrawal: [
      {
        en: 'Their silence is not indifference — it is unprocessed pain looking for an exit.',
        fr: 'Leur silence n\'est pas de l\'indifférence — c\'est une douleur non traitée cherchant une sortie.',
        ar: 'صمتهم ليس لامبالاة — بل هو ألم غير محلول يبحث عن مخرج.',
        es: 'Su silencio no es indiferencia — es dolor no procesado buscando una salida.',
      },
      {
        en: 'Some people cut off to protect themselves, not to punish you.',
        fr: 'Certaines personnes s\'éloignent pour se protéger, pas pour te punir.',
        ar: 'بعض الناس ينقطعون لحماية أنفسهم، لا لمعاقبتك.',
        es: 'Algunas personas se alejan para protegerse a sí mismas, no para castigarte.',
      },
    ],
    passive_withdrawal: [
      {
        en: 'Waiting to be chased is its own form of saying something.',
        fr: 'Attendre d\'être poursuivi est sa propre façon de dire quelque chose.',
        ar: 'الانتظار ليُطارَد هو طريقة خاصة لقول شيء ما.',
        es: 'Esperar ser perseguido es su propia forma de decir algo.',
      },
    ],
  },
};
