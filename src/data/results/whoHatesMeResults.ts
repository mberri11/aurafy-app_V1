// STUB — expand insight pools to 6 variants per dimension before production
import { MultiResults } from '../../types';

export const whoHatesMeResults: MultiResults = {
  winnerTemplate: {
    en: '{name} harbors the most resentment toward you.',
    fr: '{name} nourrit le plus de ressentiment envers toi.',
    ar: '{name} يحمل أكبر قدر من الضغينة تجاهك.',
    es: '{name} alberga más resentimiento hacia ti.',
  },
  insights: {
    negative_affect: [
      {
        en: 'The tension you feel is real — your instincts are reading the room correctly.',
        fr: 'La tension que tu ressens est réelle — tes instincts lisent correctement la situation.',
        ar: 'التوتر الذي تشعر به حقيقي — غرائزك تقرأ الموقف بشكل صحيح.',
        es: 'La tensión que sientes es real — tus instintos están leyendo la situación correctamente.',
      },
      {
        en: 'Their negativity says more about their unresolved pain than it does about you.',
        fr: 'Leur négativité en dit plus sur leur douleur non résolue que sur toi.',
        ar: 'سلبيتهم تقول الكثير عن ألمهم غير المحلول أكثر مما تقول عنك.',
        es: 'Su negatividad dice más sobre su dolor no resuelto que sobre ti.',
      },
    ],
    social_undermining: [
      {
        en: 'People who try to diminish you are usually fighting something within themselves.',
        fr: 'Les personnes qui essaient de te diminuer se battent généralement contre quelque chose en elles-mêmes.',
        ar: 'الأشخاص الذين يحاولون النيل منك عادةً ما يصارعون شيئاً بداخلهم.',
        es: 'Las personas que intentan disminuirte generalmente están luchando con algo en sí mismas.',
      },
      {
        en: 'Protect your energy — distance is not defeat, it is wisdom.',
        fr: 'Protège ton énergie — la distance n\'est pas une défaite, c\'est de la sagesse.',
        ar: 'احمِ طاقتك — البُعد ليس هزيمة، بل حكمة.',
        es: 'Protege tu energía — la distancia no es derrota, es sabiduría.',
      },
    ],
  },
};
