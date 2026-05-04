// STUB — expand insight pools to 6 variants per dimension before production
import { MultiResults } from '../../types';

export const energyReadingResults: MultiResults = {
  winnerTemplate: {
    en: '{name} radiates the most positive energy toward you.',
    fr: '{name} rayonne le plus d\'énergie positive vers toi.',
    ar: '{name} يشع أكثر طاقة إيجابية تجاهك.',
    es: '{name} irradia la energía más positiva hacia ti.',
  },
  insights: {
    vitality: [
      {
        en: 'Their presence recharges you — that is a rare and precious gift.',
        fr: 'Leur présence te recharge — c\'est un cadeau rare et précieux.',
        ar: 'حضورهم يعيد شحنك — وهذه هبة نادرة وثمينة.',
        es: 'Su presencia te recarga — eso es un regalo raro y precioso.',
      },
      {
        en: 'Energy like theirs is contagious — stay close.',
        fr: 'Une énergie comme la leur est contagieuse — reste proche.',
        ar: 'طاقة مثل طاقتهم معدية — ابق قريباً.',
        es: 'La energía como la de ellos es contagiosa — mantente cerca.',
      },
    ],
    calm_energy: [
      {
        en: 'They are a harbor in your storm — the kind of person who makes chaos feel manageable.',
        fr: 'Ils sont un port dans ta tempête — le genre de personne qui rend le chaos gérable.',
        ar: 'هم ميناؤك في العاصفة — النوع من الأشخاص الذين يجعلون الفوضى محتملة.',
        es: 'Son un refugio en tu tormenta — el tipo de persona que hace que el caos se sienta manejable.',
      },
    ],
    inspirational_energy: [
      {
        en: 'They see the best in you — and that belief has power. Let it work.',
        fr: 'Ils voient le meilleur en toi — et cette croyance a du pouvoir. Laisse-la agir.',
        ar: 'يرون الأفضل فيك — وهذا الإيمان له قوة. دعه يعمل.',
        es: 'Ven lo mejor en ti — y esa creencia tiene poder. Déjala actuar.',
      },
    ],
  },
};
