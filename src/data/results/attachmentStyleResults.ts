// STUB — expand insight pools to 6 variants per dimension before production
import { SoloResults } from '../../types';

export const attachmentStyleResults: SoloResults = {
  verdicts: {
    positive: {
      en: 'Your attachment style is Secure.',
      fr: 'Ton style d\'attachement est Sécurisé.',
      ar: 'أسلوب تعلقك آمن.',
      es: 'Tu estilo de apego es Seguro.',
    },
    neutral: {
      en: 'Your attachment style is Anxious-Secure.',
      fr: 'Ton style d\'attachement est Anxieux-Sécurisé.',
      ar: 'أسلوب تعلقك قلق-آمن.',
      es: 'Tu estilo de apego es Ansioso-Seguro.',
    },
    negative: {
      en: 'Your attachment style is Avoidant or Anxious.',
      fr: 'Ton style d\'attachement est Évitant ou Anxieux.',
      ar: 'أسلوب تعلقك تجنبي أو قلق.',
      es: 'Tu estilo de apego es Evasivo o Ansioso.',
    },
  },
  whatThisMeans: {
    positive: {
      en: 'You approach relationships from a place of security. You trust others and yourself, communicate openly, and can handle conflict without losing your sense of self. This is the healthiest attachment pattern.',
      fr: 'Tu abordes les relations depuis un lieu de sécurité. Tu fais confiance aux autres et à toi-même, tu communiques ouvertement, et tu peux gérer les conflits sans perdre ton sens de toi-même.',
      ar: 'تتعامل مع العلاقات من مكان الأمان. تثق بالآخرين وبنفسك، وتتواصل بانفتاح، وتستطيع التعامل مع الصراعات دون فقدان إحساسك بذاتك.',
      es: 'Te acercas a las relaciones desde un lugar de seguridad. Confías en otros y en ti mismo, te comunicas abiertamente y puedes manejar conflictos sin perder tu sentido de identidad.',
    },
    neutral: {
      en: 'You have a mix of secure and anxious tendencies. You are capable of deep connection but sometimes need reassurance. Self-awareness is your strongest tool here.',
      fr: 'Tu as un mélange de tendances sécurisées et anxieuses. Tu es capable de connexions profondes mais as parfois besoin de réassurance.',
      ar: 'لديك مزيج من الميول الآمنة والقلقة. أنت قادر على التواصل العميق لكن أحياناً تحتاج إلى الطمأنينة.',
      es: 'Tienes una mezcla de tendencias seguras y ansiosas. Eres capaz de conexión profunda pero a veces necesitas tranquilidad.',
    },
    negative: {
      en: 'Your attachment shows patterns of anxiety or avoidance — common results of past wounds. Awareness of your pattern is the first step to changing it. These patterns can shift with intention and practice.',
      fr: 'Ton attachement montre des schémas d\'anxiété ou d\'évitement — résultats courants de blessures passées. La conscience de ton schéma est la première étape pour le changer.',
      ar: 'يُظهر تعلقك أنماطاً من القلق أو التجنب — نتائج شائعة لجروح ماضية. إدراك نمطك هو الخطوة الأولى لتغييره.',
      es: 'Tu apego muestra patrones de ansiedad o evitación — resultados comunes de heridas pasadas. La conciencia de tu patrón es el primer paso para cambiarlo.',
    },
  },
  insights: {
    anxious_response: [
      {
        en: 'Your need for closeness is not weakness — it is the voice of a heart that knows how to love deeply.',
        fr: 'Ton besoin de proximité n\'est pas une faiblesse — c\'est la voix d\'un cœur qui sait aimer profondément.',
        ar: 'حاجتك للقرب ليست ضعفاً — بل هي صوت قلب يعرف كيف يحب بعمق.',
        es: 'Tu necesidad de cercanía no es debilidad — es la voz de un corazón que sabe amar profundamente.',
      },
    ],
    secure_base: [
      {
        en: 'You have learned that relationships are safe — that is wisdom earned, not luck.',
        fr: 'Tu as appris que les relations sont sûres — c\'est de la sagesse gagnée, pas de la chance.',
        ar: 'لقد تعلمت أن العلاقات آمنة — وهذه حكمة مكتسبة، لا حظاً.',
        es: 'Has aprendido que las relaciones son seguras — eso es sabiduría ganada, no suerte.',
      },
    ],
    avoidant_response: [
      {
        en: 'Your independence has protected you — but the walls you built may also be keeping out the love you deserve.',
        fr: 'Ton indépendance t\'a protégé — mais les murs que tu as construits peuvent aussi empêcher l\'amour que tu mérites.',
        ar: 'استقلاليتك حمتك — لكن الجدران التي بنيتها قد تحجب أيضاً الحب الذي تستحقه.',
        es: 'Tu independencia te ha protegido — pero los muros que construiste también pueden estar bloqueando el amor que mereces.',
      },
    ],
    repair_behavior: [
      {
        en: 'How you handle rupture tells more about your attachment than how you behave in good times.',
        fr: 'La façon dont tu gères les ruptures en dit plus sur ton attachement que la façon dont tu te comportes dans les bons moments.',
        ar: 'كيفية تعاملك مع الانفصال تخبر أكثر عن تعلقك مما يفعله سلوكك في الأوقات الجيدة.',
        es: 'Cómo manejas las rupturas dice más sobre tu apego que cómo te comportas en los buenos momentos.',
      },
    ],
  },
};
