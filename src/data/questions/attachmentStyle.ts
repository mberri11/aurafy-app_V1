// STUB — expand to 20 questions before production
import { Question } from '../../types';

export const attachmentStyleQuestions: Question[] = [
  {
    id: 'attachment_style_q01',
    text: {
      en: "When someone you care about pulls away, what is your first instinct?",
      fr: "Quand quelqu'un à qui tu tiens s'éloigne, quelle est ta première réaction ?",
      ar: "حين يبتعد شخص تهتم به، ما هو أول شيء تشعر به؟",
      es: "Cuando alguien que te importa se aleja, ¿cuál es tu primer instinto?",
    },
    framework: 'attachment',
    dimension: 'anxious_response',
    soloAnswers: [
      { label: { en: 'I reach out immediately', fr: 'Je contacte immédiatement', ar: 'أتواصل فوراً', es: 'Me comunico inmediatamente' }, score: 2 },
      { label: { en: 'I give it a day then check in', fr: "J'attends un jour puis je prends des nouvelles", ar: 'أنتظر يوماً ثم أتحقق', es: 'Le doy un día y luego escribo' }, score: 1 },
      { label: { en: 'I wait for them to come back', fr: "J'attends qu'ils reviennent", ar: 'أنتظر حتى يعودوا', es: 'Espero a que vuelvan' }, score: -1 },
      { label: { en: 'I pull away too', fr: "Je m'éloigne aussi", ar: 'أبتعد أنا أيضاً', es: 'Me alejo yo también' }, score: -2 },
    ],
  },
  {
    id: 'attachment_style_q02',
    text: {
      en: "How comfortable are you depending on others when you're struggling?",
      fr: "À quel point es-tu à l'aise pour dépendre des autres quand tu es en difficulté ?",
      ar: "ما مدى ارتياحك للاعتماد على الآخرين عندما تعاني؟",
      es: "¿Qué tan cómodo te sientes dependiendo de otros cuando estás pasando un momento difícil?",
    },
    framework: 'attachment',
    dimension: 'secure_base',
    soloAnswers: [
      { label: { en: 'Very comfortable — I ask for help easily', fr: 'Très à l\'aise — je demande de l\'aide facilement', ar: 'مرتاح جداً — أطلب المساعدة بسهولة', es: 'Muy cómodo — pido ayuda fácilmente' }, score: 2 },
      { label: { en: 'Somewhat — I ask close people only', fr: 'Assez — je demande uniquement aux gens proches', ar: 'نوعاً ما — أسأل الأشخاص المقربين فقط', es: 'Un poco — solo le pido a personas cercanas' }, score: 1 },
      { label: { en: 'Not really — I prefer handling it alone', fr: 'Pas vraiment — je préfère gérer seul', ar: 'ليس كثيراً — أفضل التعامل معه بمفردي', es: 'No realmente — prefiero manejarlo solo' }, score: -1 },
      { label: { en: 'Never — asking for help feels weak', fr: 'Jamais — demander de l\'aide me semble une faiblesse', ar: 'أبداً — طلب المساعدة يبدو ضعفاً', es: 'Nunca — pedir ayuda me hace sentir débil' }, score: -2 },
    ],
  },
  {
    id: 'attachment_style_q03',
    text: {
      en: "When you're in a relationship, how often do you worry about being abandoned?",
      fr: "Quand tu es en relation, à quelle fréquence t'inquiètes-tu d'être abandonné ?",
      ar: "عندما تكون في علاقة، كم مرة تقلق بشأن التخلي عنك؟",
      es: "Cuando estás en una relación, ¿con qué frecuencia te preocupa ser abandonado?",
    },
    framework: 'attachment',
    dimension: 'anxious_response',
    soloAnswers: [
      { label: { en: 'Rarely — I feel secure in relationships', fr: 'Rarement — je me sens en sécurité dans les relations', ar: 'نادراً — أشعر بالأمان في العلاقات', es: 'Raramente — me siento seguro en las relaciones' }, score: 2 },
      { label: { en: 'Sometimes, but I manage it', fr: 'Parfois, mais je le gère', ar: 'أحياناً، لكنني أتعامل معه', es: 'A veces, pero lo manejo' }, score: 1 },
      { label: { en: 'Often — it affects how I act', fr: 'Souvent — ça affecte mon comportement', ar: 'كثيراً — يؤثر على سلوكي', es: 'Con frecuencia — afecta cómo actúo' }, score: -1 },
      { label: { en: 'Constantly — it controls my relationships', fr: 'Constamment — ça contrôle mes relations', ar: 'باستمرار — يتحكم في علاقاتي', es: 'Constantemente — controla mis relaciones' }, score: -2 },
    ],
  },
  {
    id: 'attachment_style_q04',
    text: {
      en: "How do you feel about emotional intimacy and vulnerability with a partner?",
      fr: "Comment te sens-tu par rapport à l'intimité émotionnelle et à la vulnérabilité avec un partenaire ?",
      ar: "كيف تشعر حيال الحميمية العاطفية والضعف مع شريك؟",
      es: "¿Cómo te sientes respecto a la intimidad emocional y la vulnerabilidad con una pareja?",
    },
    framework: 'attachment',
    dimension: 'avoidant_response',
    soloAnswers: [
      { label: { en: 'I welcome it — it brings us closer', fr: 'Je l\'accueille — cela nous rapproche', ar: 'أرحب بها — تجلب التقارب', es: 'La acepto — nos acerca más' }, score: 2 },
      { label: { en: 'I\'m okay with it in small doses', fr: 'Je suis d\'accord avec ça en petites doses', ar: 'أنا بخير معها بجرعات صغيرة', es: 'Estoy bien con eso en pequeñas dosis' }, score: 1 },
      { label: { en: 'It makes me uncomfortable', fr: 'Ça me met mal à l\'aise', ar: 'يجعلني غير مرتاح', es: 'Me incomoda' }, score: -1 },
      { label: { en: 'I avoid it — it feels suffocating', fr: 'Je l\'évite — ça me semble étouffant', ar: 'أتجنبها — تشعرني بالاختناق', es: 'Lo evito — se siente sofocante' }, score: -2 },
    ],
  },
  {
    id: 'attachment_style_q05',
    text: {
      en: "After an argument with someone close, what do you do?",
      fr: "Après une dispute avec quelqu'un de proche, que fais-tu ?",
      ar: "بعد خلاف مع شخص مقرب، ماذا تفعل؟",
      es: "Después de una discusión con alguien cercano, ¿qué haces?",
    },
    framework: 'attachment',
    dimension: 'repair_behavior',
    soloAnswers: [
      { label: { en: 'I try to resolve it quickly and reconnect', fr: 'J\'essaie de le résoudre rapidement et de me reconnecter', ar: 'أحاول حله بسرعة وإعادة التواصل', es: 'Intento resolverlo rápido y reconectarme' }, score: 2 },
      { label: { en: 'I give it a little time, then reach out', fr: 'Je laisse passer un peu de temps, puis je prends contact', ar: 'أعطيه وقتاً قصيراً ثم أتواصل', es: 'Le doy algo de tiempo, luego me comunico' }, score: 1 },
      { label: { en: 'I wait for them to come to me', fr: "J'attends qu'ils viennent vers moi", ar: 'أنتظر أن يأتوا إليّ', es: 'Espero a que vengan a mí' }, score: -1 },
      { label: { en: 'I shut down and need significant time alone', fr: 'Je me ferme et j\'ai besoin d\'un temps seul significatif', ar: 'أغلق على نفسي وأحتاج إلى وقت طويل بمفردي', es: 'Me cierro y necesito mucho tiempo a solas' }, score: -2 },
    ],
  },
  // TODO: add 15 more questions
];
