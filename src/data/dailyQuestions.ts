// TODO: expand to 365 questions before production
import { LocalizedString } from '../types';

export interface DailyQuestion {
  id: string;
  text: LocalizedString;
  answers: Array<{
    label: LocalizedString;
    insight: LocalizedString;
  }>;
}

export const dailyQuestions: DailyQuestion[] = [
  {
    id: 'daily_q01',
    text: {
      en: 'What is the emotional tone you are carrying into this week?',
      fr: 'Quel est le ton émotionnel que tu portes en entrant dans cette semaine ?',
      ar: 'ما هي النبرة العاطفية التي تحملها في هذا الأسبوع؟',
      es: '¿Cuál es el tono emocional que llevas al entrar a esta semana?',
    },
    answers: [
      {
        label: { en: 'Open and energized', fr: 'Ouvert et énergisé', ar: 'منفتح ومنشط', es: 'Abierto y energizado' },
        insight: { en: 'Your openness is a magnet for good things. Lean into it.', fr: 'Ton ouverture est un aimant pour les bonnes choses. Mise dessus.', ar: 'انفتاحك مغناطيس للأشياء الجيدة. تمسك به.', es: 'Tu apertura es un imán para las cosas buenas. Inclínate hacia ella.' },
      },
      {
        label: { en: 'Cautious but okay', fr: 'Prudent mais ça va', ar: 'حذر لكن بخير', es: 'Cauteloso pero bien' },
        insight: { en: 'Caution is wisdom in motion. You\'re protecting what matters.', fr: 'La prudence est la sagesse en mouvement. Tu protèges ce qui compte.', ar: 'الحذر هو الحكمة في الحركة. أنت تحمي ما يهم.', es: 'La cautela es la sabiduría en movimiento. Estás protegiendo lo que importa.' },
      },
      {
        label: { en: 'Drained and heavy', fr: 'Épuisé et lourd', ar: 'منهك وثقيل', es: 'Agotado y pesado' },
        insight: { en: 'Rest is not retreat — it\'s how you prepare for what\'s next.', fr: 'Le repos n\'est pas une retraite — c\'est comment tu te prépares à ce qui vient ensuite.', ar: 'الراحة ليست انسحاباً — إنها كيف تستعد لما هو قادم.', es: 'El descanso no es retiro — es cómo te preparas para lo que sigue.' },
      },
      {
        label: { en: 'Numb or disconnected', fr: 'Engourdi ou déconnecté', ar: 'بلا مشاعر أو منفصل', es: 'Entumecido o desconectado' },
        insight: { en: 'Numbness is the body asking for space to feel safely. Give it time.', fr: 'L\'engourdissement est le corps qui demande de l\'espace pour ressentir en sécurité. Donne-lui du temps.', ar: 'الخدر هو الجسم يطلب مساحة للشعور بأمان. أعطه الوقت.', es: 'El entumecimiento es el cuerpo pidiendo espacio para sentir con seguridad. Dale tiempo.' },
      },
    ],
  },
  {
    id: 'daily_q02',
    text: {
      en: 'When did you last feel truly proud of yourself?',
      fr: 'Quand t\'es-tu senti vraiment fier de toi pour la dernière fois ?',
      ar: 'متى آخر مرة شعرت فيها بالفخر الحقيقي بنفسك؟',
      es: '¿Cuándo fue la última vez que te sentiste verdaderamente orgulloso de ti mismo?',
    },
    answers: [
      {
        label: { en: 'Very recently', fr: 'Très récemment', ar: 'مؤخراً جداً', es: 'Muy recientemente' },
        insight: { en: 'That pride is fuel. Notice what created it and do more of that.', fr: 'Cette fierté est du carburant. Remarque ce qui l\'a créée et fais-en plus.', ar: 'هذا الفخر وقود. لاحظ ما الذي خلقه وافعل المزيد منه.', es: 'Ese orgullo es combustible. Nota qué lo creó y haz más de eso.' },
      },
      {
        label: { en: 'A few weeks ago', fr: 'Il y a quelques semaines', ar: 'منذ بضعة أسابيع', es: 'Hace unas semanas' },
        insight: { en: 'You have it in you. Look back at that moment when you need to remember what you\'re capable of.', fr: 'Tu en es capable. Repense à ce moment quand tu as besoin de te souvenir de ce dont tu es capable.', ar: 'لديك القدرة. عد إلى ذلك اللحظة حين تحتاج إلى تذكر ما تستطيع.', es: 'Lo tienes en ti. Mira ese momento cuando necesites recordar de lo que eres capaz.' },
      },
      {
        label: { en: 'A long time ago', fr: 'Il y a longtemps', ar: 'منذ فترة طويلة', es: 'Hace mucho tiempo' },
        insight: { en: 'You may be holding yourself to a standard no one else sees. Small moments count too.', fr: 'Tu te tiens peut-être à un standard que personne d\'autre ne voit. Les petits moments comptent aussi.', ar: 'ربما تضع نفسك أمام معيار لا يراه أحد غيرك. اللحظات الصغيرة تُحتسب أيضاً.', es: 'Puede que te estés manteniendo a un estándar que nadie más ve. Los pequeños momentos también cuentan.' },
      },
      {
        label: { en: 'I can\'t remember', fr: 'Je ne me souviens pas', ar: 'لا أتذكر', es: 'No recuerdo' },
        insight: { en: 'The fact that you showed up today is something. Start counting from here.', fr: 'Le fait que tu sois venu aujourd\'hui est quelque chose. Commence à compter à partir d\'ici.', ar: 'حقيقة أنك حضرت اليوم هي شيء. ابدأ بالعد من هنا.', es: 'El hecho de que hayas aparecido hoy es algo. Empieza a contar desde aquí.' },
      },
    ],
  },
  {
    id: 'daily_q03',
    text: {
      en: 'Which emotion have you been avoiding lately?',
      fr: 'Quelle émotion as-tu évitée ces derniers temps ?',
      ar: 'أي مشاعر كنت تتجنبها مؤخراً؟',
      es: '¿Qué emoción has estado evitando últimamente?',
    },
    answers: [
      {
        label: { en: 'Sadness or grief', fr: 'Tristesse ou deuil', ar: 'الحزن أو الفقد', es: 'Tristeza o duelo' },
        insight: { en: 'Grief is love with nowhere to go. Letting it move through you is not weakness.', fr: 'Le deuil est de l\'amour qui n\'a nulle part où aller. Le laisser traverser n\'est pas une faiblesse.', ar: 'الحزن هو حب ليس له مكان يذهب إليه. السماح له بالمرور ليس ضعفاً.', es: 'El duelo es amor sin ningún lugar a donde ir. Dejar que fluya a través de ti no es debilidad.' },
      },
      {
        label: { en: 'Anger or frustration', fr: 'Colère ou frustration', ar: 'الغضب أو الإحباط', es: 'Enojo o frustración' },
        insight: { en: 'Suppressed anger doesn\'t disappear — it turns inward. Find its source.', fr: 'La colère supprimée ne disparaît pas — elle se retourne vers l\'intérieur. Trouve sa source.', ar: 'الغضب المكبوت لا يختفي — يتحول نحو الداخل. ابحث عن مصدره.', es: 'El enojo suprimido no desaparece — se vuelve hacia adentro. Encuentra su origen.' },
      },
      {
        label: { en: 'Fear or anxiety', fr: 'Peur ou anxiété', ar: 'الخوف أو القلق', es: 'Miedo o ansiedad' },
        insight: { en: 'Fear lives in the future. Come back to this exact moment — right now, you are okay.', fr: 'La peur vit dans le futur. Reviens à ce moment précis — en ce moment, tu vas bien.', ar: 'الخوف يعيش في المستقبل. عد إلى هذه اللحظة بالضبط — الآن، أنت بخير.', es: 'El miedo vive en el futuro. Vuelve a este momento exacto — ahora mismo, estás bien.' },
      },
      {
        label: { en: 'Longing or loneliness', fr: 'Nostalgie ou solitude', ar: 'الشوق أو الوحدة', es: 'Añoranza o soledad' },
        insight: { en: 'Loneliness is often the signal that you are craving depth, not just company.', fr: 'La solitude est souvent le signal que tu aspires à la profondeur, pas juste à la compagnie.', ar: 'الوحدة غالباً ما تكون إشارة إلى أنك تشتاق إلى العمق، لا مجرد الرفقة.', es: 'La soledad es a menudo la señal de que anhelas profundidad, no solo compañía.' },
      },
    ],
  },
  {
    id: 'daily_q04',
    text: {
      en: 'How honest are you with the people closest to you?',
      fr: 'Dans quelle mesure es-tu honnête avec les personnes les plus proches de toi ?',
      ar: 'ما مدى صدقك مع الأشخاص الأقرب إليك؟',
      es: '¿Qué tan honesto eres con las personas más cercanas a ti?',
    },
    answers: [
      {
        label: { en: 'Very honest — I say what I mean', fr: 'Très honnête — je dis ce que je pense', ar: 'صادق جداً — أقول ما أعنيه', es: 'Muy honesto — digo lo que pienso' },
        insight: { en: 'Honesty is intimacy. People who get the real you are lucky.', fr: 'L\'honnêteté est l\'intimité. Les gens qui ont la vraie version de toi ont de la chance.', ar: 'الصدق هو الحميمية. الأشخاص الذين يحصلون على نسختك الحقيقية محظوظون.', es: 'La honestidad es intimidad. Las personas que obtienen al verdadero tú tienen suerte.' },
      },
      {
        label: { en: 'Mostly — I edit a little', fr: 'Surtout — je modifie un peu', ar: 'في الغالب — أُعدّل قليلاً', es: 'Mayormente — me edito un poco' },
        insight: { en: 'Some editing is social wisdom. The question is: what are you keeping back, and why?', fr: 'Un peu d\'édition est de la sagesse sociale. La question est : qu\'est-ce que tu retiens, et pourquoi ?', ar: 'بعض التعديل حكمة اجتماعية. السؤال هو: ماذا تكبت، ولماذا؟', es: 'Cierta edición es sabiduría social. La pregunta es: ¿qué estás guardando, y por qué?' },
      },
      {
        label: { en: 'I avoid topics that feel risky', fr: 'J\'évite les sujets qui semblent risqués', ar: 'أتجنب المواضيع التي تبدو محفوفة بالمخاطر', es: 'Evito temas que se sienten arriesgados' },
        insight: { en: 'The topics you avoid are often where the real connection lives.', fr: 'Les sujets que tu évites sont souvent là où vit la vraie connexion.', ar: 'المواضيع التي تتجنبها هي في الغالب حيث يعيش التواصل الحقيقي.', es: 'Los temas que evitas suelen ser donde vive la conexión real.' },
      },
      {
        label: { en: 'I tell people what they want to hear', fr: 'Je dis aux gens ce qu\'ils veulent entendre', ar: 'أقول للناس ما يريدون سماعه', es: 'Le digo a la gente lo que quiere escuchar' },
        insight: { en: 'Keeping peace at the cost of truth is a form of loneliness too.', fr: 'Maintenir la paix au détriment de la vérité est aussi une forme de solitude.', ar: 'الحفاظ على السلام على حساب الحقيقة هو أيضاً شكل من أشكال الوحدة.', es: 'Mantener la paz a costa de la verdad también es una forma de soledad.' },
      },
    ],
  },
  {
    id: 'daily_q05',
    text: {
      en: 'What pattern keeps showing up in your relationships?',
      fr: 'Quel schéma continue d\'apparaître dans tes relations ?',
      ar: 'ما النمط الذي يستمر في الظهور في علاقاتك؟',
      es: '¿Qué patrón sigue apareciendo en tus relaciones?',
    },
    answers: [
      {
        label: { en: 'I give more than I receive', fr: 'Je donne plus que je ne reçois', ar: 'أعطي أكثر مما أتلقى', es: 'Doy más de lo que recibo' },
        insight: { en: 'Generosity is beautiful, but sustainability matters. The people worth keeping will meet you halfway.', fr: 'La générosité est belle, mais la durabilité compte. Les personnes qui en valent la peine te rencontreront à mi-chemin.', ar: 'الكرم جميل، لكن الاستدامة مهمة. الأشخاص الذين يستحقون الاحتفاظ بهم سيلتقون بك في المنتصف.', es: 'La generosidad es hermosa, pero la sostenibilidad importa. Las personas que valen la pena te encontrarán a la mitad del camino.' },
      },
      {
        label: { en: 'I attract people who need fixing', fr: 'J\'attire des personnes qui ont besoin d\'être réparées', ar: 'أجذب أشخاصاً يحتاجون إلى إصلاح', es: 'Atraigo personas que necesitan ser arregladas' },
        insight: { en: 'The impulse to help others heal is not wrong — but ask yourself: who is helping you heal?', fr: 'L\'envie d\'aider les autres à guérir n\'est pas mauvaise — mais demande-toi : qui t\'aide à guérir ?', ar: 'الدافع لمساعدة الآخرين على الشفاء ليس خاطئاً — لكن اسأل نفسك: من يساعدك على الشفاء؟', es: 'El impulso de ayudar a otros a sanar no está mal — pero pregúntate: ¿quién te está ayudando a sanar?' },
      },
      {
        label: { en: 'People pull away when I get close', fr: 'Les gens s\'éloignent quand je m\'approche', ar: 'يبتعد الناس عني حين أقترب', es: 'La gente se aleja cuando me acerco' },
        insight: { en: 'Some of this is their pattern, not yours. But it\'s worth asking what you unconsciously signal about what you need.', fr: 'Une partie de cela est leur schéma, pas le tien. Mais ça vaut la peine de te demander ce que tu signales inconsciemment sur ce dont tu as besoin.', ar: 'بعض هذا نمطهم، ليس نمطك. لكن يستحق التساؤل عن ما ترسله لاشعورياً حول ما تحتاجه.', es: 'Parte de esto es su patrón, no el tuyo. Pero vale la pena preguntarte qué señales inconscientemente sobre lo que necesitas.' },
      },
      {
        label: { en: 'I keep choosing the same type of person', fr: 'Je continue de choisir le même type de personne', ar: 'أستمر في اختيار نفس النوع من الأشخاص', es: 'Sigo eligiendo el mismo tipo de persona' },
        insight: { en: 'Repetition in relationships is the psyche trying to resolve something unfinished. The pattern is the message.', fr: 'La répétition dans les relations est le psyché essayant de résoudre quelque chose d\'inachevé. Le schéma est le message.', ar: 'التكرار في العلاقات هو النفس التي تحاول حل شيء غير مكتمل. النمط هو الرسالة.', es: 'La repetición en las relaciones es la psique tratando de resolver algo inconcluso. El patrón es el mensaje.' },
      },
    ],
  },
  {
    id: 'daily_q06',
    text: {
      en: 'What does your inner voice say about you most often?',
      fr: 'Que dit le plus souvent ta voix intérieure de toi ?',
      ar: 'ماذا تقول صوتك الداخلي عنك في أغلب الأوقات؟',
      es: '¿Qué dice tu voz interior sobre ti con más frecuencia?',
    },
    answers: [
      {
        label: { en: 'Encouraging and supportive', fr: 'Encourageant et soutenant', ar: 'مشجع وداعم', es: 'Alentador y solidario' },
        insight: { en: 'A kind inner voice is built, not born. You\'ve done the work.', fr: 'Une voix intérieure bienveillante se construit, elle ne naît pas. Tu as fait le travail.', ar: 'الصوت الداخلي اللطيف يُبنى، لا يُولد. لقد قمت بالعمل.', es: 'Una voz interior amable se construye, no nace. Has hecho el trabajo.' },
      },
      {
        label: { en: 'Critical and demanding', fr: 'Critique et exigeant', ar: 'ناقد ومتطلب', es: 'Crítico y exigente' },
        insight: { en: 'High standards and self-punishment are not the same thing. You deserve the same grace you\'d give a friend.', fr: 'Les standards élevés et l\'auto-punition ne sont pas la même chose. Tu mérites la même grâce que tu donnerais à un ami.', ar: 'المعايير العالية والعقاب الذاتي ليسا نفس الشيء. تستحق نفس اللطف الذي ستعطيه لصديق.', es: 'Los altos estándares y el auto-castigo no son lo mismo. Mereces la misma gracia que le darías a un amigo.' },
      },
      {
        label: { en: 'Doubtful and uncertain', fr: 'Plein de doutes et incertain', ar: 'مشكك وغير متأكد', es: 'Dudoso e incierto' },
        insight: { en: 'Doubt is not the enemy of confidence — certainty without reflection is. Keep questioning.', fr: 'Le doute n\'est pas l\'ennemi de la confiance — c\'est la certitude sans réflexion. Continue à te questionner.', ar: 'الشك ليس عدو الثقة — اليقين بلا تأمل هو العدو. استمر في التساؤل.', es: 'La duda no es el enemigo de la confianza — la certeza sin reflexión lo es. Sigue cuestionando.' },
      },
      {
        label: { en: 'Quiet — I don\'t hear it much', fr: 'Silencieuse — je ne l\'entends pas souvent', ar: 'هادئ — لا أسمعه كثيراً', es: 'Silenciosa — no la escucho mucho' },
        insight: { en: 'The quietness might be protection. Check in with yourself more — that voice has things worth hearing.', fr: 'Le silence pourrait être une protection. Fais le point avec toi-même plus souvent — cette voix a des choses qui valent la peine d\'être entendues.', ar: 'الهدوء قد يكون حماية. تواصل مع نفسك أكثر — ذلك الصوت لديه أشياء تستحق السماع.', es: 'El silencio podría ser protección. Conéctate más contigo mismo — esa voz tiene cosas que vale la pena escuchar.' },
      },
    ],
  },
  {
    id: 'daily_q07',
    text: {
      en: 'What are you currently most afraid of losing?',
      fr: 'Qu\'as-tu le plus peur de perdre en ce moment ?',
      ar: 'ما الذي تخشى فقدانه أكثر في الوقت الحالي؟',
      es: '¿Qué es lo que más temes perder actualmente?',
    },
    answers: [
      {
        label: { en: 'A specific relationship', fr: 'Une relation spécifique', ar: 'علاقة بعينها', es: 'Una relación específica' },
        insight: { en: 'The fear of losing something real is a sign it matters. But clinging too tight changes the shape of love.', fr: 'La peur de perdre quelque chose de réel est un signe que ça compte. Mais s\'accrocher trop fort change la forme de l\'amour.', ar: 'الخوف من فقدان شيء حقيقي علامة على أهميته. لكن التشبث بشدة يغير شكل الحب.', es: 'El miedo a perder algo real es una señal de que importa. Pero aferrarse demasiado cambia la forma del amor.' },
      },
      {
        label: { en: 'My sense of self or direction', fr: 'Mon sens de moi-même ou de ma direction', ar: 'إحساسي بذاتي أو اتجاهي', es: 'Mi sentido de identidad o dirección' },
        insight: { en: 'The self is not a fixed thing — it is always being rebuilt. You are in the middle of construction, not collapse.', fr: 'Le soi n\'est pas une chose fixe — il est toujours en train d\'être reconstruit. Tu es au milieu d\'une construction, pas d\'un effondrement.', ar: 'الذات ليست شيئاً ثابتاً — إنها تُبنى دائماً. أنت في منتصف البناء، لا الانهيار.', es: 'El yo no es algo fijo — siempre se está reconstruyendo. Estás en medio de la construcción, no del colapso.' },
      },
      {
        label: { en: 'Financial stability or security', fr: 'Stabilité financière ou sécurité', ar: 'الاستقرار المالي أو الأمن', es: 'Estabilidad financiera o seguridad' },
        insight: { en: 'Security is not found — it is built, layer by layer. You have been building longer than you realize.', fr: 'La sécurité ne se trouve pas — elle se construit, couche par couche. Tu construis depuis plus longtemps que tu ne le réalises.', ar: 'الأمن لا يُوجد — يُبنى، طبقة بطبقة. لقد كنت تبني منذ وقت أطول مما تدرك.', es: 'La seguridad no se encuentra — se construye, capa por capa. Has estado construyendo por más tiempo del que te das cuenta.' },
      },
      {
        label: { en: 'Time — I feel it slipping', fr: 'Le temps — je le sens s\'échapper', ar: 'الوقت — أشعر أنه يفلت مني', es: 'El tiempo — siento que se escapa' },
        insight: { en: 'The urgency you feel is telling you something important. What would you do if you weren\'t afraid?', fr: 'L\'urgence que tu ressens te dit quelque chose d\'important. Que ferais-tu si tu n\'avais pas peur ?', ar: 'الإلحاح الذي تشعر به يخبرك بشيء مهم. ماذا ستفعل لو لم تكن خائفاً؟', es: 'La urgencia que sientes te está diciendo algo importante. ¿Qué harías si no tuvieras miedo?' },
      },
    ],
  },
  {
    id: 'daily_q08',
    text: {
      en: 'How do you typically handle conflict in close relationships?',
      fr: 'Comment gères-tu généralement les conflits dans les relations proches ?',
      ar: 'كيف تتعامل عادةً مع الصراع في العلاقات الوثيقة؟',
      es: '¿Cómo manejas típicamente el conflicto en relaciones cercanas?',
    },
    answers: [
      {
        label: { en: 'I address it head-on', fr: 'Je l\'aborde de front', ar: 'أتعامل معه مباشرةً', es: 'Lo abordo de frente' },
        insight: { en: 'Direct confrontation requires courage. Just make sure you\'re solving problems, not winning arguments.', fr: 'La confrontation directe exige du courage. Assure-toi juste de résoudre des problèmes, pas de gagner des disputes.', ar: 'المواجهة المباشرة تتطلب شجاعة. فقط تأكد من أنك تحل المشكلات، لا تفوز في الجدالات.', es: 'La confrontación directa requiere valentía. Solo asegúrate de resolver problemas, no de ganar discusiones.' },
      },
      {
        label: { en: 'I need time before I can talk', fr: 'J\'ai besoin de temps avant de pouvoir parler', ar: 'أحتاج وقتاً قبل أن أستطيع التحدث', es: 'Necesito tiempo antes de poder hablar' },
        insight: { en: 'Processing before speaking is a strength, as long as you come back and don\'t avoid forever.', fr: 'Traiter avant de parler est une force, à condition de revenir et de ne pas éviter pour toujours.', ar: 'المعالجة قبل الكلام قوة، طالما عدت ولم تتجنب إلى الأبد.', es: 'Procesar antes de hablar es una fortaleza, siempre que regreses y no evites para siempre.' },
      },
      {
        label: { en: 'I shut down or go quiet', fr: 'Je me ferme ou je me tais', ar: 'أغلق على نفسي أو أصمت', es: 'Me cierro o me quedo callado' },
        insight: { en: 'Stonewalling protects you in the moment but keeps the issue alive. The silence speaks its own language.', fr: 'Le mur protège dans le moment mais maintient le problème en vie. Le silence parle son propre langage.', ar: 'الصمت يحميك في اللحظة لكنه يبقي المشكلة حية. الصمت يتحدث بلغته الخاصة.', es: 'Cerrarse protege en el momento pero mantiene el problema vivo. El silencio habla su propio idioma.' },
      },
      {
        label: { en: 'I apologize to end it, even if I wasn\'t wrong', fr: 'Je m\'excuse pour y mettre fin, même si je n\'avais pas tort', ar: 'أعتذر لإنهائه، حتى لو لم أكن مخطئاً', es: 'Me disculpo para terminarlo, incluso si no estaba equivocado' },
        insight: { en: 'Peacemaking is a gift — but your feelings deserve airtime too. Swallowed resentment grows.', fr: 'Faire la paix est un don — mais tes sentiments méritent aussi d\'être exprimés. Le ressentiment avalé grandit.', ar: 'صنع السلام هبة — لكن مشاعرك تستحق أن تُعبَّر عنها أيضاً. الضغينة المكبوتة تنمو.', es: 'Hacer las paces es un regalo — pero tus sentimientos también merecen expresarse. El resentimiento tragado crece.' },
      },
    ],
  },
  {
    id: 'daily_q09',
    text: {
      en: 'What does your energy feel like by the end of most days?',
      fr: 'À quoi ressemble ton énergie à la fin de la plupart des journées ?',
      ar: 'كيف تشعر طاقتك في نهاية معظم الأيام؟',
      es: '¿Cómo se siente tu energía al final de la mayoría de los días?',
    },
    answers: [
      {
        label: { en: 'Satisfied and full', fr: 'Satisfait et plein', ar: 'راضٍ وممتلئ', es: 'Satisfecho y pleno' },
        insight: { en: 'A life that refills you at the end of the day is worth protecting.', fr: 'Une vie qui te remplit à la fin de la journée vaut la peine d\'être protégée.', ar: 'حياة تملؤك في نهاية اليوم تستحق الحماية.', es: 'Una vida que te recarga al final del día vale la pena proteger.' },
      },
      {
        label: { en: 'Tired but okay', fr: 'Fatigué mais ça va', ar: 'متعب لكن بخير', es: 'Cansado pero bien' },
        insight: { en: 'Good tired — from doing things that mattered — is its own kind of satisfaction.', fr: 'La bonne fatigue — d\'avoir fait des choses qui comptaient — est sa propre forme de satisfaction.', ar: 'التعب الجيد — من فعل أشياء ذات معنى — هو شكله الخاص من الرضا.', es: 'El buen cansancio — de hacer cosas que importaban — tiene su propia satisfacción.' },
      },
      {
        label: { en: 'Drained and depleted', fr: 'Épuisé et appauvri', ar: 'منهك ومستنزف', es: 'Agotado y agotado' },
        insight: { en: 'Chronic depletion is a signal. Something in your life is taking more than it gives.', fr: 'L\'épuisement chronique est un signal. Quelque chose dans ta vie prend plus qu\'il ne donne.', ar: 'الاستنزاف المزمن إشارة. شيء ما في حياتك يأخذ أكثر مما يعطي.', es: 'El agotamiento crónico es una señal. Algo en tu vida está tomando más de lo que da.' },
      },
      {
        label: { en: 'Anxious about tomorrow', fr: 'Anxieux à propos de demain', ar: 'قلق بشأن الغد', es: 'Ansioso por mañana' },
        insight: { en: 'Nighttime anxiety is the mind rehearsing for dangers that may not come. Try putting tomorrow\'s list down before bed.', fr: 'L\'anxiété nocturne est l\'esprit qui répète des dangers qui peuvent ne pas venir. Essaie de poser la liste de demain avant de dormir.', ar: 'القلق الليلي هو العقل يتدرب على مخاطر قد لا تأتي. حاول وضع قائمة الغد جانباً قبل النوم.', es: 'La ansiedad nocturna es la mente ensayando peligros que pueden no llegar. Intenta dejar la lista del mañana antes de dormir.' },
      },
    ],
  },
  {
    id: 'daily_q10',
    text: {
      en: 'If you could change one thing about how you show up in relationships, what would it be?',
      fr: 'Si tu pouvais changer une chose dans ta façon d\'être présent dans les relations, qu\'est-ce que ce serait ?',
      ar: 'إذا كان بإمكانك تغيير شيء واحد في طريقة حضورك في العلاقات، ماذا سيكون؟',
      es: 'Si pudieras cambiar una cosa sobre cómo te presentas en las relaciones, ¿cuál sería?',
    },
    answers: [
      {
        label: { en: 'I\'d be more open and vulnerable', fr: 'Je serais plus ouvert et vulnérable', ar: 'سأكون أكثر انفتاحاً وضعفاً', es: 'Sería más abierto y vulnerable' },
        insight: { en: 'Vulnerability is not exposure — it is the bridge between two people. Build it one honest word at a time.', fr: 'La vulnérabilité n\'est pas une exposition — c\'est le pont entre deux personnes. Construis-la un mot honnête à la fois.', ar: 'الضعف ليس تعرضاً — إنه الجسر بين شخصين. بنِه كلمة صادقة في كل مرة.', es: 'La vulnerabilidad no es exposición — es el puente entre dos personas. Constrúyelo palabra a palabra.' },
      },
      {
        label: { en: 'I\'d be more present and less distracted', fr: 'Je serais plus présent et moins distrait', ar: 'سأكون أكثر حضوراً وأقل تشتتاً', es: 'Estaría más presente y menos distraído' },
        insight: { en: 'The most loving thing you can give someone is your full attention. Even five minutes, fully present, changes things.', fr: 'La chose la plus aimante que tu puisses donner à quelqu\'un est toute ton attention. Même cinq minutes, pleinement présent, changent les choses.', ar: 'أكثر شيء محب يمكنك إعطاؤه لشخص ما هو انتباهك الكامل. حتى خمس دقائق، بحضور كامل، تغير الأمور.', es: 'Lo más amoroso que puedes darle a alguien es tu atención plena. Incluso cinco minutos, completamente presente, cambia las cosas.' },
      },
      {
        label: { en: 'I\'d set better boundaries', fr: 'Je mettrais de meilleures limites', ar: 'سأضع حدوداً أفضل', es: 'Pondría mejores límites' },
        insight: { en: 'Boundaries are not walls — they are the edges of where you end and another begins. They make real closeness possible.', fr: 'Les limites ne sont pas des murs — ce sont les contours de là où tu te termines et où l\'autre commence. Elles rendent la vraie proximité possible.', ar: 'الحدود ليست جدراناً — إنها حواف مكانك وبداية الآخر. إنها تجعل القرب الحقيقي ممكناً.', es: 'Los límites no son muros — son los bordes de donde terminas tú y comienza el otro. Hacen posible la cercanía real.' },
      },
      {
        label: { en: 'I\'d ask for what I need more directly', fr: 'Je demanderais ce dont j\'ai besoin plus directement', ar: 'سأطلب ما أحتاجه بشكل أكثر مباشرةً', es: 'Pediría lo que necesito de manera más directa' },
        insight: { en: 'People cannot meet needs they cannot see. Naming what you need is not weakness — it is the clearest form of self-respect.', fr: 'Les gens ne peuvent pas répondre à des besoins qu\'ils ne voient pas. Nommer ce dont tu as besoin n\'est pas une faiblesse — c\'est la forme la plus claire de respect de soi.', ar: 'الناس لا يستطيعون تلبية احتياجات لا يرونها. تسمية ما تحتاجه ليس ضعفاً — بل هو أوضح شكل من أشكال احترام الذات.', es: 'Las personas no pueden satisfacer necesidades que no ven. Nombrar lo que necesitas no es debilidad — es la forma más clara de autorespeto.' },
      },
    ],
  },
  // TODO: add 355 more daily questions before production
];
