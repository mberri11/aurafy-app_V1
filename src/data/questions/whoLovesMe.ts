// STUB — expand to 20 questions before production
import { Question } from '../../types';

export const whoLovesMeQuestions: Question[] = [
  {
    id: 'who_loves_me_q01',
    text: {
      en: "When you're at your lowest, who do you picture showing up without being called?",
      fr: "Dans tes pires moments, qui imagines-tu arriver sans que tu l'aies appelé ?",
      ar: "في أصعب لحظاتك، من تتخيل يحضر دون أن تطلب منه ذلك؟",
      es: "En tus peores momentos, ¿a quién imaginas aparecer sin que lo hayas llamado?",
    },
    framework: 'attachment',
    dimension: 'secure_base',
    personWeight: 2,
  },
  {
    id: 'who_loves_me_q02',
    text: {
      en: "Who notices when something is slightly off with you, even before you say anything?",
      fr: "Qui remarque quand quelque chose ne va pas chez toi, avant même que tu parles ?",
      ar: "من يلاحظ حين يكون هناك شيء خاطئ معك، حتى قبل أن تتكلم؟",
      es: "¿Quién nota cuando algo no está bien contigo, incluso antes de que digas algo?",
    },
    framework: 'attachment',
    dimension: 'attunement',
    personWeight: 1,
  },
  {
    id: 'who_loves_me_q03',
    text: {
      en: "If you achieved something great, who would be the first to genuinely celebrate with you?",
      fr: "Si tu accomplissais quelque chose de grand, qui serait le premier à célébrer sincèrement avec toi ?",
      ar: "إذا حققت شيئاً عظيماً، من سيكون أول من يحتفل معك بصدق؟",
      es: "Si lograras algo grande, ¿quién sería el primero en celebrar genuinamente contigo?",
    },
    framework: 'attachment',
    dimension: 'secure_base',
    personWeight: 1,
  },
  {
    id: 'who_loves_me_q04',
    text: {
      en: "Who remembers the small details you've shared — your fears, your dreams, your favorites?",
      fr: "Qui se souvient des petits détails que tu as partagés — tes peurs, tes rêves, tes préférences ?",
      ar: "من يتذكر التفاصيل الصغيرة التي شاركتها — مخاوفك، أحلامك، تفضيلاتك؟",
      es: "¿Quién recuerda los pequeños detalles que has compartido — tus miedos, tus sueños, tus favoritos?",
    },
    framework: 'attachment',
    dimension: 'attunement',
    personWeight: 1,
  },
  {
    id: 'who_loves_me_q05',
    text: {
      en: "Who makes you feel safe enough to be completely honest, even about your failures?",
      fr: "Qui te donne assez de sécurité pour être complètement honnête, même à propos de tes échecs ?",
      ar: "من يجعلك تشعر بأمان كافٍ لتكون صادقاً تماماً، حتى بشأن إخفاقاتك؟",
      es: "¿Quién te hace sentir suficientemente seguro como para ser completamente honesto, incluso sobre tus fracasos?",
    },
    framework: 'attachment',
    dimension: 'emotional_safety',
    personWeight: 2,
  },
  // TODO: add 15 more questions
];
