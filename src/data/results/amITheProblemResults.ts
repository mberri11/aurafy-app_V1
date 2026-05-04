// STUB — expand insight pools to 6 variants per dimension before production
import { SoloResults } from '../../types';

export const amITheProblemResults: SoloResults = {
  verdicts: {
    positive: {
      en: 'You show strong self-awareness and accountability.',
      fr: 'Tu fais preuve d\'une forte conscience de soi et d\'une grande responsabilisation.',
      ar: 'تُظهر وعياً ذاتياً قوياً ومسؤولية.',
      es: 'Muestras una fuerte autoconciencia y responsabilidad.',
    },
    neutral: {
      en: 'You\'re self-aware but have blind spots worth exploring.',
      fr: 'Tu as conscience de toi-même mais as des angles morts qui méritent d\'être explorés.',
      ar: 'أنت واعٍ بذاتك لكن لديك نقاط عمياء تستحق الاستكشاف.',
      es: 'Eres consciente de ti mismo pero tienes puntos ciegos que vale la pena explorar.',
    },
    negative: {
      en: 'Your patterns may be causing more friction than you realize.',
      fr: 'Tes schémas causent peut-être plus de friction que tu ne le réalises.',
      ar: 'قد تُسبب أنماطك احتكاكاً أكثر مما تدرك.',
      es: 'Tus patrones pueden estar causando más fricción de lo que te das cuenta.',
    },
  },
  whatThisMeans: {
    positive: {
      en: 'Your capacity to reflect honestly on yourself is the foundation of healthy relationships. You\'re not perfect — but your self-awareness means you course-correct before patterns become damage.',
      fr: 'Ta capacité à réfléchir honnêtement sur toi-même est la base de relations saines. Tu n\'es pas parfait — mais ta conscience de soi signifie que tu corriges le tir avant que les schémas ne deviennent des dommages.',
      ar: 'قدرتك على التأمل الصادق في نفسك هي أساس العلاقات الصحية. لست مثالياً — لكن وعيك الذاتي يعني أنك تصحح مسارك قبل أن تتحول الأنماط إلى أضرار.',
      es: 'Tu capacidad para reflexionar honestamente sobre ti mismo es la base de las relaciones saludables. No eres perfecto — pero tu autoconciencia significa que corriges el rumbo antes de que los patrones se conviertan en daño.',
    },
    neutral: {
      en: 'You have genuine intentions and care about your relationships. The work ahead is small but meaningful — identifying the areas where you deflect or disengage, and practicing staying present in uncomfortable moments.',
      fr: 'Tu as de bonnes intentions et tu te soucies de tes relations. Le travail à venir est petit mais significatif — identifier les domaines où tu esquives ou tu te désengages, et pratiquer à rester présent dans les moments inconfortables.',
      ar: 'لديك نوايا صادقة وتهتم بعلاقاتك. العمل المقبل صغير لكنه ذو معنى — تحديد المجالات التي تتهرب فيها أو تنسحب، وممارسة البقاء حاضراً في اللحظات المزعجة.',
      es: 'Tienes intenciones genuinas y te importan tus relaciones. El trabajo que queda es pequeño pero significativo — identificar las áreas donde te esquivas o te desconectas, y practicar mantenerte presente en momentos incómodos.',
    },
    negative: {
      en: 'This reading is not a verdict — it\'s an invitation. The fact that you took this quiz suggests part of you already knows something needs examination. That honesty is your greatest asset right now.',
      fr: 'Cette lecture n\'est pas un verdict — c\'est une invitation. Le fait que tu aies pris ce quiz suggère qu\'une partie de toi sait déjà que quelque chose doit être examiné.',
      ar: 'هذه القراءة ليست حكماً — بل هي دعوة. حقيقة أنك أجريت هذا الاختبار تشير إلى أن جزءاً منك يعرف بالفعل أن شيئاً ما يحتاج إلى فحص.',
      es: 'Esta lectura no es un veredicto — es una invitación. El hecho de que hayas tomado este cuestionario sugiere que una parte de ti ya sabe que algo necesita examinarse.',
    },
  },
  insights: {
    accountability: [
      {
        en: 'The willingness to ask "was I wrong?" is one of the rarest and most powerful traits a person can have.',
        fr: 'La volonté de se demander "avais-je tort ?" est l\'un des traits les plus rares et les plus puissants qu\'une personne puisse avoir.',
        ar: 'الاستعداد للسؤال "هل كنت مخطئاً؟" هو أحد أندر وأقوى الصفات التي يمكن أن يمتلكها الشخص.',
        es: 'La voluntad de preguntar "¿estaba equivocado?" es uno de los rasgos más raros y poderosos que puede tener una persona.',
      },
    ],
    empathy_deficit: [
      {
        en: 'Listening is not waiting for your turn to speak. Real presence changes everything.',
        fr: 'Écouter, ce n\'est pas attendre son tour de parler. La vraie présence change tout.',
        ar: 'الاستماع ليس انتظاراً لدورك في الكلام. الحضور الحقيقي يغير كل شيء.',
        es: 'Escuchar no es esperar tu turno para hablar. La presencia real lo cambia todo.',
      },
    ],
    pattern_recognition: [
      {
        en: 'When the same conflict follows you across different relationships, the common thread is worth examining.',
        fr: 'Quand le même conflit te suit dans différentes relations, le fil commun vaut la peine d\'être examiné.',
        ar: 'عندما يتبعك نفس الصراع عبر علاقات مختلفة، الخيط المشترك يستحق الفحص.',
        es: 'Cuando el mismo conflicto te sigue a través de diferentes relaciones, el hilo común vale la pena examinar.',
      },
    ],
  },
};
