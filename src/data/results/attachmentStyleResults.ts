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
      {
        en: 'When someone pulls away, your urgency is old — pause for a breath before you respond.',
        fr: 'Quand quelqu\'un s\'éloigne, ton urgence est ancienne — respire avant de réagir.',
        ar: 'حين يبتعد أحد، إلحاحك قديم — التقط نفساً قبل أن تتصرف.',
        es: 'Cuando alguien se aleja, tu urgencia es antigua — respira antes de responder.',
      },
      {
        en: 'Reassurance feels good, but a self that can soothe itself feels safer.',
        fr: 'La réassurance fait du bien, mais un soi qui sait se calmer est plus sûr.',
        ar: 'الطمأنينة تشعرك بالراحة، لكن ذاتاً تستطيع تهدئة نفسها أكثر أماناً.',
        es: 'La tranquilidad se siente bien, pero un yo que se calma a sí mismo se siente más seguro.',
      },
      {
        en: 'Not every silence is a goodbye — your nervous system is still learning the difference.',
        fr: 'Tout silence n\'est pas un adieu — ton système nerveux apprend encore la différence.',
        ar: 'ليس كل صمت وداعاً — جهازك العصبي لا يزال يتعلّم الفرق.',
        es: 'No todo silencio es un adiós — tu sistema nervioso aún está aprendiendo la diferencia.',
      },
      {
        en: 'You are allowed to ask for what you need — clearly, without shrinking the ask.',
        fr: 'Tu as le droit de demander ce dont tu as besoin — clairement, sans rapetisser la demande.',
        ar: 'يحقّ لك أن تطلب ما تحتاج — بوضوح، دون أن تصغّر الطلب.',
        es: 'Tienes derecho a pedir lo que necesitas — claramente, sin achicar la pregunta.',
      },
      {
        en: 'Your worth is not measured by how quickly someone replies.',
        fr: 'Ta valeur ne se mesure pas à la vitesse à laquelle quelqu\'un répond.',
        ar: 'قيمتك لا تُقاس بسرعة ردّ أحدهم.',
        es: 'Tu valor no se mide por la rapidez con que alguien responde.',
      },
    ],
    secure_base: [
      {
        en: 'You have learned that relationships are safe — that is wisdom earned, not luck.',
        fr: 'Tu as appris que les relations sont sûres — c\'est de la sagesse gagnée, pas de la chance.',
        ar: 'لقد تعلمت أن العلاقات آمنة — وهذه حكمة مكتسبة، لا حظاً.',
        es: 'Has aprendido que las relaciones son seguras — eso es sabiduría ganada, no suerte.',
      },
      {
        en: 'You can ask for help and stay yourself at the same time — that is the secure move.',
        fr: 'Tu peux demander de l\'aide et rester toi-même en même temps — c\'est le geste sécurisé.',
        ar: 'تستطيع أن تطلب المساعدة وتبقى نفسك في الوقت ذاته — هذه خطوة آمنة.',
        es: 'Puedes pedir ayuda y seguir siendo tú mismo al mismo tiempo — esa es la jugada segura.',
      },
      {
        en: 'Disagreement does not feel like the end of love to you — that is rare strength.',
        fr: 'Le désaccord ne te semble pas la fin de l\'amour — c\'est une force rare.',
        ar: 'الخلاف لا يبدو لك نهاية الحب — وهذه قوة نادرة.',
        es: 'El desacuerdo no se siente como el fin del amor para ti — esa es una fortaleza rara.',
      },
      {
        en: 'You can hold someone\'s honesty without making it about your worth.',
        fr: 'Tu peux accueillir l\'honnêteté de quelqu\'un sans en faire une question de valeur.',
        ar: 'تستطيع تقبّل صراحة أحدهم دون أن تجعلها مسألة قيمتك.',
        es: 'Puedes sostener la honestidad de alguien sin hacerla sobre tu valor.',
      },
      {
        en: 'You let people in slowly because you understand the cost of letting in too fast — that is care, not avoidance.',
        fr: 'Tu laisses entrer les gens lentement parce que tu comprends le coût d\'entrer trop vite — c\'est de l\'attention, pas de l\'évitement.',
        ar: 'تدخل الناس إلى حياتك ببطء لأنك تفهم ثمن التسرّع — هذا اهتمام، لا تجنب.',
        es: 'Dejas entrar a la gente despacio porque entiendes el costo de hacerlo rápido — eso es cuidado, no evitación.',
      },
      {
        en: 'A calm love feels normal to you — and that is what you will keep choosing.',
        fr: 'Un amour calme te semble normal — et c\'est ce que tu continueras de choisir.',
        ar: 'الحب الهادئ يبدو طبيعياً لك — وهذا ما ستظل تختاره.',
        es: 'Un amor calmo te parece normal — y eso es lo que seguirás eligiendo.',
      },
    ],
    avoidant_response: [
      {
        en: 'Your independence has protected you — but the walls you built may also be keeping out the love you deserve.',
        fr: 'Ton indépendance t\'a protégé — mais les murs que tu as construits peuvent aussi empêcher l\'amour que tu mérites.',
        ar: 'استقلاليتك حمتك — لكن الجدران التي بنيتها قد تحجب أيضاً الحب الذي تستحقه.',
        es: 'Tu independencia te ha protegido — pero los muros que construiste también pueden estar bloqueando el amor que mereces.',
      },
      {
        en: 'Closeness can feel like a demand — but it can also be a place to rest.',
        fr: 'La proximité peut ressembler à une exigence — mais elle peut aussi être un lieu de repos.',
        ar: 'القرب قد يبدو طلباً — لكنه قد يكون أيضاً مكاناً للراحة.',
        es: 'La cercanía puede sentirse como una exigencia — pero también puede ser un lugar para descansar.',
      },
      {
        en: 'When you go quiet, the other person doesn\'t hear "I need space" — they hear "I\'m gone." Use words.',
        fr: 'Quand tu te tais, l\'autre n\'entend pas « j\'ai besoin d\'espace » — il entend « je suis parti ». Utilise des mots.',
        ar: 'حين تصمت، لا يسمع الآخر \"أحتاج مساحة\" — بل يسمع \"لقد ذهبت\". استخدم الكلمات.',
        es: 'Cuando te quedas callado, la otra persona no oye "necesito espacio" — oye "me fui". Usa palabras.',
      },
      {
        en: 'Letting someone meet your need is not weakness — it\'s how relationships actually work.',
        fr: 'Laisser quelqu\'un répondre à ton besoin n\'est pas une faiblesse — c\'est ainsi que les relations fonctionnent.',
        ar: 'أن تدع أحداً يلبّي حاجتك ليس ضعفاً — هكذا تعمل العلاقات فعلاً.',
        es: 'Dejar que alguien atienda tu necesidad no es debilidad — así funcionan en realidad las relaciones.',
      },
      {
        en: 'Distance feels like safety, but loneliness is the long-term price of that strategy.',
        fr: 'La distance ressemble à la sécurité, mais la solitude est le prix à long terme de cette stratégie.',
        ar: 'البُعد يشبه الأمان، لكن الوحدة هي ثمنه على المدى الطويل.',
        es: 'La distancia se siente como seguridad, pero la soledad es el costo a largo plazo de esa estrategia.',
      },
      {
        en: 'You can stay yourself and still let someone close. You\'ve never been the kind of person who is small in love — only careful.',
        fr: 'Tu peux rester toi-même et laisser quelqu\'un t\'approcher. Tu n\'as jamais été petit en amour — seulement prudent.',
        ar: 'يمكنك أن تبقى أنت وتسمح لأحد بالاقتراب. لم تكن صغيراً في الحب — كنت حذراً فقط.',
        es: 'Puedes seguir siendo tú y aun así dejar entrar a alguien. Nunca fuiste pequeño en el amor — solo cauteloso.',
      },
    ],
    repair_behavior: [
      {
        en: 'How you handle rupture tells more about your attachment than how you behave in good times.',
        fr: 'La façon dont tu gères les ruptures en dit plus sur ton attachement que la façon dont tu te comportes dans les bons moments.',
        ar: 'كيفية تعاملك مع الانفصال تخبر أكثر عن تعلقك مما يفعله سلوكك في الأوقات الجيدة.',
        es: 'Cómo manejas las rupturas dice más sobre tu apego que cómo te comportas en los buenos momentos.',
      },
      {
        en: 'A real apology names the harm — not just the feeling. That is the move that repairs.',
        fr: 'Des excuses réelles nomment le tort — pas seulement le sentiment. C\'est ce qui répare.',
        ar: 'الاعتذار الحقيقي يسمّي الضرر — لا الشعور فقط. هذه هي الخطوة التي تُصلح.',
        es: 'Una disculpa real nombra el daño — no solo el sentimiento. Ese es el paso que repara.',
      },
      {
        en: 'You don\'t have to win the argument to keep the relationship — sometimes choosing the bond is the win.',
        fr: 'Tu n\'as pas à gagner la dispute pour garder la relation — parfois choisir le lien est la victoire.',
        ar: 'لست مضطراً للفوز بالجدال للحفاظ على العلاقة — أحياناً اختيار الرابط هو الفوز.',
        es: 'No tienes que ganar la discusión para mantener la relación — a veces elegir el vínculo es la victoria.',
      },
      {
        en: 'Repair only works if both people show up — your willingness is half of it, not all of it.',
        fr: 'La réparation ne fonctionne que si les deux personnes se présentent — ta volonté est la moitié, pas la totalité.',
        ar: 'الإصلاح لا يعمل إلا إذا حضر الطرفان — استعدادك نصفه، لا كلّه.',
        es: 'La reparación solo funciona si ambos se presentan — tu disposición es la mitad, no el todo.',
      },
      {
        en: 'When you shut down, ask yourself what you\'re protecting — and whether it still needs protecting.',
        fr: 'Quand tu te fermes, demande-toi ce que tu protèges — et si cela a encore besoin d\'être protégé.',
        ar: 'حين تنغلق، اسأل نفسك ما الذي تحميه — وما إذا كان لا يزال بحاجة إلى حماية.',
        es: 'Cuando te cierras, pregúntate qué estás protegiendo — y si aún necesita protección.',
      },
      {
        en: 'A good ending is also repair — not every relationship has to last to be honored.',
        fr: 'Une bonne fin est aussi une réparation — toutes les relations n\'ont pas à durer pour être honorées.',
        ar: 'النهاية الجيدة إصلاح أيضاً — ليس على كل علاقة أن تدوم لتُحترم.',
        es: 'Un buen final también es reparación — no toda relación debe durar para ser honrada.',
      },
    ],
  },
};
