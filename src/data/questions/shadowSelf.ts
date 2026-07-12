import { Question } from '../../types';

// ─────────────────────────────────────────────────────────────────────────────
// SHADOW SELF — Jungian framing: the shadow is the disowned side of the psyche,
// not a villain. 3 dimensions:
//   projection        (7) — disowned traits seen (and judged) in other people
//   persona_gap       (7) — distance between the public mask and the private self
//   disowned_feelings (6) — denied anger/envy/need ("I'm not angry"), buried wants
// Scoring: +2 = the shadow is met and owned (integration), −2 = denied or projected.
// Verdict polarity: positive = Integrated, negative = the shadow runs unseen —
// rendered as an invitation, never a condemnation (register: amITheProblemResults).
// ─────────────────────────────────────────────────────────────────────────────

export const shadowSelfQuestions: Question[] = [
  {
    id: 'shadow_self_q01',
    text: {
      en: "Someone irritates you instantly — before they've done anything. Your honest read:",
      fr: "Quelqu'un t'irrite instantanément — avant même d'avoir fait quoi que ce soit. Ta lecture honnête :",
      ar: 'شخص يزعجك فورًا — قبل أن يفعل أي شيء. قراءتك الصادقة:',
      es: 'Alguien te irrita al instante — antes de haber hecho nada. Tu lectura honesta:',
    },
    framework: 'mixed',
    dimension: 'projection',
    soloAnswers: [
      { label: { en: 'I ask what they might be mirroring back at me', fr: 'Je me demande ce qu\'il me renvoie de moi', ar: 'أسأل نفسي ماذا يعكس هذا الشخص منّي', es: 'Me pregunto qué me estará reflejando de mí' }, score: 2 },
      { label: { en: 'I notice the reaction and stay curious', fr: 'Je remarque ma réaction et je reste curieux', ar: 'ألاحظ ردّة فعلي وأبقى فضوليًّا', es: 'Noto la reacción y me quedo con la curiosidad' }, score: 1 },
      { label: { en: 'Some people are just annoying', fr: 'Certaines personnes sont juste agaçantes', ar: 'بعض الناس مزعجون فحسب', es: 'Algunas personas simplemente son irritantes' }, score: -1 },
      { label: { en: "I trust the irritation — it's them, always", fr: "Je fais confiance à l'agacement — c'est eux, toujours", ar: 'أثق بانزعاجي — الخطأ فيهم دائمًا', es: 'Confío en la irritación — son ellos, siempre' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q02',
    text: {
      en: 'The flaw you criticize most loudly in others is:',
      fr: 'Le défaut que tu critiques le plus fort chez les autres est :',
      ar: 'العيب الذي تنتقده بأعلى صوت في الآخرين هو:',
      es: 'El defecto que más fuerte criticas en otros es:',
    },
    framework: 'mixed',
    dimension: 'projection',
    soloAnswers: [
      { label: { en: "One I've caught in myself, honestly", fr: 'Un défaut que j\'ai déjà surpris chez moi, honnêtement', ar: 'عيب ضبطت نفسي عليه، بصراحة', es: 'Uno que ya me he pillado a mí mismo, sinceramente' }, score: 2 },
      { label: { en: "Something I'm probably capable of too", fr: 'Quelque chose dont je suis sans doute capable aussi', ar: 'شيء أنا على الأرجح قادر عليه أيضًا', es: 'Algo de lo que probablemente también soy capaz' }, score: 1 },
      { label: { en: 'Something I would never do', fr: 'Quelque chose que je ne ferais jamais', ar: 'شيء لن أفعله أبدًا', es: 'Algo que yo jamás haría' }, score: -1 },
      { label: { en: "Proof that I'm nothing like them", fr: 'La preuve que je ne leur ressemble en rien', ar: 'دليل على أنني لا أشبههم في شيء', es: 'La prueba de que no me parezco en nada a ellos' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q03',
    text: {
      en: 'A friend succeeds at the exact thing you want. Inside, you feel:',
      fr: 'Un ami réussit exactement ce que tu veux. À l\'intérieur, tu ressens :',
      ar: 'صديق ينجح في الشيء ذاته الذي تريده أنت. في داخلك تشعر بـ:',
      es: 'Un amigo triunfa en justo lo que tú quieres. Por dentro, sientes:',
    },
    framework: 'mixed',
    dimension: 'projection',
    soloAnswers: [
      { label: { en: 'The sting — and I name it as envy', fr: 'La piqûre — et je la nomme : envie', ar: 'الوخزة — وأسمّيها حسدًا', es: 'La punzada — y la nombro: envidia' }, score: 2 },
      { label: { en: 'Happy for them, with a twinge I admit', fr: 'Heureux pour lui, avec un pincement que j\'admets', ar: 'فرح له، مع وخزة أعترف بها', es: 'Alegría por él, con una punzada que admito' }, score: 1 },
      { label: { en: "I look for reasons it wasn't earned", fr: 'Je cherche des raisons pour lesquelles ce n\'était pas mérité', ar: 'أبحث عن أسباب تجعل نجاحه غير مستحق', es: 'Busco razones por las que no fue merecido' }, score: -1 },
      { label: { en: "Nothing — I don't do envy", fr: "Rien — l'envie, ce n'est pas mon truc", ar: 'لا شيء — أنا لا أعرف الحسد', es: 'Nada — yo no siento envidia' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q04',
    text: {
      en: "You dislike someone 'for no reason.' How often does the reason turn out to be yours?",
      fr: "Tu n'aimes pas quelqu'un « sans raison ». À quelle fréquence la raison s'avère-t-elle être la tienne ?",
      ar: 'لا تحب شخصًا «بلا سبب». كم مرة يتبيّن أن السبب يخصّك أنت؟',
      es: "Alguien te cae mal 'sin motivo'. ¿Con qué frecuencia el motivo resulta ser tuyo?",
    },
    framework: 'mixed',
    dimension: 'projection',
    soloAnswers: [
      { label: { en: 'Usually — the reason tends to be mine', fr: 'Souvent — la raison est généralement la mienne', ar: 'غالبًا — السبب يكون عادةً عندي', es: 'Casi siempre — el motivo suele ser mío' }, score: 2 },
      { label: { en: 'Sometimes, if I sit with it', fr: 'Parfois, si je prends le temps d\'y réfléchir', ar: 'أحيانًا، إن جلست مع نفسي', es: 'A veces, si me detengo a pensarlo' }, score: 1 },
      { label: { en: 'Rarely — my dislikes are accurate', fr: 'Rarement — mes aversions sont justes', ar: 'نادرًا — نفوري دقيق', es: 'Rara vez — mis antipatías son certeras' }, score: -1 },
      { label: { en: 'Never — my gut simply detects bad people', fr: 'Jamais — mon instinct détecte juste les mauvaises personnes', ar: 'أبدًا — حدسي يكشف الأشخاص السيئين فحسب', es: 'Nunca — mi instinto solo detecta a la mala gente' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q05',
    text: {
      en: 'Your strongest judgments usually land on people who are:',
      fr: 'Tes jugements les plus durs tombent généralement sur des gens qui sont :',
      ar: 'أقسى أحكامك تقع عادةً على أشخاص هم:',
      es: 'Tus juicios más duros suelen caer sobre gente que es:',
    },
    framework: 'mixed',
    dimension: 'projection',
    soloAnswers: [
      { label: { en: "Free in ways I don't allow myself to be", fr: 'Libres comme je ne me permets pas de l\'être', ar: 'أحرار بطرق لا أسمح بها لنفسي', es: 'Libre de maneras que yo no me permito' }, score: 2 },
      { label: { en: 'Doing things I was taught to suppress', fr: 'En train de faire ce qu\'on m\'a appris à réprimer', ar: 'يفعلون ما تعلّمت أن أكبته', es: 'Haciendo cosas que a mí me enseñaron a reprimir' }, score: 1 },
      { label: { en: 'Simply behaving badly', fr: 'Simplement en train de mal se comporter', ar: 'يتصرفون بسوء فحسب', es: 'Simplemente portándose mal' }, score: -1 },
      { label: { en: 'Beneath the standards I keep', fr: 'En dessous des standards que je tiens', ar: 'دون المعايير التي ألتزم بها', es: 'Por debajo de los estándares que yo mantengo' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q06',
    text: {
      en: 'Someone accuses you of the exact flaw you see in them. You:',
      fr: "Quelqu'un t'accuse du défaut exact que tu vois en lui. Tu :",
      ar: 'شخص يتهمك بالعيب ذاته الذي تراه فيه. أنت:',
      es: 'Alguien te acusa del mismo defecto que tú ves en él. Tú:',
    },
    framework: 'mixed',
    dimension: 'projection',
    soloAnswers: [
      { label: { en: 'Check — projection runs both ways', fr: 'Je vérifie — la projection marche dans les deux sens', ar: 'أتحقق — الإسقاط يعمل في الاتجاهين', es: 'Lo compruebo — la proyección va en ambos sentidos' }, score: 2 },
      { label: { en: 'Consider it before answering', fr: "J'y réfléchis avant de répondre", ar: 'أفكر فيه قبل أن أجيب', es: 'Lo considero antes de responder' }, score: 1 },
      { label: { en: "Explain why they're wrong", fr: 'J\'explique pourquoi il a tort', ar: 'أشرح لماذا هو مخطئ', es: 'Explico por qué se equivoca' }, score: -1 },
      { label: { en: "Know it's deflection — the flaw is theirs", fr: 'Je sais que c\'est une diversion — le défaut est le sien', ar: 'أعرف أنه تهرّب — العيب عيبه هو', es: 'Sé que es una maniobra — el defecto es suyo' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q07',
    text: {
      en: 'The people who trigger you the most tend to share:',
      fr: 'Les gens qui te déclenchent le plus ont tendance à partager :',
      ar: 'الأشخاص الذين يستفزونك أكثر يشتركون عادةً في:',
      es: 'Las personas que más te alteran suelen compartir:',
    },
    framework: 'mixed',
    dimension: 'projection',
    soloAnswers: [
      { label: { en: 'A pattern I recognize from my own denied side', fr: 'Un schéma que je reconnais de mon propre côté nié', ar: 'نمطًا أعرفه من جانبي المُنكَر', es: 'Un patrón que reconozco de mi propio lado negado' }, score: 2 },
      { label: { en: "A few traits I'm uneasy about in me", fr: 'Quelques traits qui me mettent mal à l\'aise chez moi', ar: 'بضع صفات تقلقني في نفسي', es: 'Algunos rasgos que me incomodan de mí' }, score: 1 },
      { label: { en: 'Nothing — the triggers are random', fr: 'Rien — les déclencheurs sont aléatoires', ar: 'لا شيء — الاستفزازات عشوائية', es: 'Nada — los detonantes son aleatorios' }, score: -1 },
      { label: { en: 'Only their own badness', fr: 'Seulement leur propre méchanceté', ar: 'سوءهم هم فقط', es: 'Solo su propia maldad' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q08',
    text: {
      en: 'How different is the public you from the 2 a.m. you?',
      fr: 'À quel point le toi public diffère-t-il du toi de 2 h du matin ?',
      ar: 'ما مدى اختلاف نسختك أمام الناس عن نسختك في الثانية فجرًا؟',
      es: '¿Qué tan distinto es tu yo público de tu yo de las 2 de la madrugada?',
    },
    framework: 'mixed',
    dimension: 'persona_gap',
    soloAnswers: [
      { label: { en: 'Same person, softer voice', fr: 'La même personne, la voix plus douce', ar: 'الشخص نفسه، بصوت أهدأ', es: 'La misma persona, con voz más suave' }, score: 2 },
      { label: { en: 'Close — a few edits', fr: 'Proche — quelques retouches', ar: 'قريبة — مع بعض التعديلات', es: 'Parecido — con algunos retoques' }, score: 1 },
      { label: { en: "Different enough that it's work", fr: 'Assez différent pour que ce soit un effort', ar: 'مختلفة بما يكفي ليكون الأمر مجهدًا', es: 'Lo bastante distinto como para ser un esfuerzo' }, score: -1 },
      { label: { en: 'Two strangers', fr: 'Deux étrangers', ar: 'شخصان غريبان', es: 'Dos desconocidos' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q09',
    text: {
      en: 'Something embarrassing about you surfaces in a group. You:',
      fr: 'Quelque chose de gênant sur toi remonte en groupe. Tu :',
      ar: 'شيء محرج عنك يطفو أمام مجموعة. أنت:',
      es: 'Algo vergonzoso sobre ti sale a la luz en un grupo. Tú:',
    },
    framework: 'mixed',
    dimension: 'persona_gap',
    soloAnswers: [
      { label: { en: "Own it — it's mine either way", fr: "Je l'assume — c'est à moi de toute façon", ar: 'أتحمّله — إنه لي في كل الأحوال', es: 'Lo asumo — es mío de todos modos' }, score: 2 },
      { label: { en: 'Wince, then admit it', fr: 'Je grimace, puis je l\'admets', ar: 'أتألم قليلًا ثم أعترف به', es: 'Hago una mueca y luego lo admito' }, score: 1 },
      { label: { en: 'Deny first, feel later', fr: 'Je nie d\'abord, je ressens ensuite', ar: 'أنكر أولًا وأشعر لاحقًا', es: 'Niego primero, siento después' }, score: -1 },
      { label: { en: 'Make sure that story dies', fr: 'Je m\'assure que cette histoire meure', ar: 'أتأكد من أن تلك القصة تموت', es: 'Me aseguro de que esa historia muera' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q10',
    text: {
      en: 'How much of your kindness is image management?',
      fr: 'Quelle part de ta gentillesse est de la gestion d\'image ?',
      ar: 'كم من لطفك هو إدارة للصورة؟',
      es: '¿Cuánta de tu amabilidad es gestión de imagen?',
    },
    framework: 'mixed',
    dimension: 'persona_gap',
    soloAnswers: [
      { label: { en: "Little — I'm kind offstage too", fr: 'Peu — je suis gentil aussi en coulisses', ar: 'القليل — أنا لطيف خلف الكواليس أيضًا', es: 'Poca — también soy amable fuera del escenario' }, score: 2 },
      { label: { en: 'Mostly real, sometimes strategic', fr: 'Surtout réelle, parfois stratégique', ar: 'حقيقي غالبًا، واستراتيجي أحيانًا', es: 'Mayormente real, a veces estratégica' }, score: 1 },
      { label: { en: "More than I'd like to admit", fr: 'Plus que je ne voudrais l\'admettre', ar: 'أكثر مما أودّ الاعتراف به', es: 'Más de lo que me gustaría admitir' }, score: -1 },
      { label: { en: "Kindness is a currency — everyone's is", fr: 'La gentillesse est une monnaie — pour tout le monde', ar: 'اللطف عملة — عند الجميع كذلك', es: 'La amabilidad es una moneda — la de todos lo es' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q11',
    text: {
      en: "You're alone, with no one to perform for. The feeling is:",
      fr: 'Tu es seul, sans personne pour qui jouer. Le sentiment est :',
      ar: 'أنت وحدك، ولا أحد تؤدي أمامه. الشعور هو:',
      es: 'Estás solo, sin nadie ante quien actuar. La sensación es:',
    },
    framework: 'mixed',
    dimension: 'persona_gap',
    soloAnswers: [
      { label: { en: "Relief — I like who's left", fr: 'Du soulagement — j\'aime bien celui qui reste', ar: 'راحة — يعجبني من يتبقى', es: 'Alivio — me gusta quien queda' }, score: 2 },
      { label: { en: 'Mostly comfortable', fr: 'Plutôt confortable', ar: 'مريح في الغالب', es: 'Bastante cómodo' }, score: 1 },
      { label: { en: 'Restless — I reach for an audience', fr: 'Agité — je cherche un public', ar: 'قلِق — أبحث عن جمهور', es: 'Inquieto — busco una audiencia' }, score: -1 },
      { label: { en: "Empty — I don't know who that is", fr: 'Vide — je ne sais pas qui c\'est', ar: 'فارغ — لا أعرف من ذاك الشخص', es: 'Vacío — no sé quién es ese' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q12',
    text: {
      en: "A compliment arrives that doesn't match your self-image. You:",
      fr: 'Un compliment arrive qui ne colle pas à ton image de toi. Tu :',
      ar: 'تصلك مجاملة لا تطابق صورتك عن نفسك. أنت:',
      es: 'Llega un cumplido que no encaja con tu imagen de ti. Tú:',
    },
    framework: 'mixed',
    dimension: 'persona_gap',
    soloAnswers: [
      { label: { en: 'Notice the gap and get curious', fr: 'Je remarque l\'écart et ça m\'intrigue', ar: 'ألاحظ الفجوة ويثيرني الفضول', es: 'Noto la brecha y me da curiosidad' }, score: 2 },
      { label: { en: 'Accept it, slightly puzzled', fr: 'Je l\'accepte, un peu perplexe', ar: 'أقبلها بشيء من الحيرة', es: 'Lo acepto, algo desconcertado' }, score: 1 },
      { label: { en: 'Perform the trait harder from then on', fr: 'Je joue ce trait encore plus fort ensuite', ar: 'أؤدي تلك الصفة بجهد أكبر بعدها', es: 'Actúo ese rasgo con más fuerza desde entonces' }, score: -1 },
      { label: { en: 'Make sure the image stays intact', fr: 'Je m\'assure que l\'image reste intacte', ar: 'أتأكد من بقاء الصورة سليمة', es: 'Me aseguro de que la imagen quede intacta' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q13',
    text: {
      en: 'If people could hear your unfiltered thoughts for a day:',
      fr: 'Si les gens pouvaient entendre tes pensées sans filtre pendant un jour :',
      ar: 'لو استطاع الناس سماع أفكارك دون فلترة ليوم واحد:',
      es: 'Si la gente pudiera oír tus pensamientos sin filtro por un día:',
    },
    framework: 'mixed',
    dimension: 'persona_gap',
    soloAnswers: [
      { label: { en: "They'd meet a rougher, honest version of me", fr: 'Ils rencontreraient une version plus brute mais honnête de moi', ar: 'سيقابلون نسخة أخشن مني لكنها صادقة', es: 'Conocerían una versión más áspera y honesta de mí' }, score: 2 },
      { label: { en: 'A few surprises, nothing fatal', fr: 'Quelques surprises, rien de fatal', ar: 'بضع مفاجآت، لا شيء قاتل', es: 'Algunas sorpresas, nada fatal' }, score: 1 },
      { label: { en: "Some relationships wouldn't survive", fr: 'Certaines relations n\'y survivraient pas', ar: 'بعض العلاقات لن تنجو', es: 'Algunas relaciones no sobrevivirían' }, score: -1 },
      { label: { en: "I'd have to leave town", fr: 'Je devrais quitter la ville', ar: 'سأضطر لمغادرة المدينة', es: 'Tendría que irme de la ciudad' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q14',
    text: {
      en: "How often do you privately enjoy things you'd condemn out loud?",
      fr: 'À quelle fréquence apprécies-tu en privé ce que tu condamnerais tout haut ?',
      ar: 'كم مرة تستمتع سرًّا بأشياء كنت ستدينها علنًا؟',
      es: '¿Con qué frecuencia disfrutas en privado cosas que condenarías en voz alta?',
    },
    framework: 'mixed',
    dimension: 'persona_gap',
    soloAnswers: [
      { label: { en: 'Often — and I admit the appetite', fr: 'Souvent — et j\'assume cet appétit', ar: 'كثيرًا — وأعترف بهذه الشهية', es: 'A menudo — y admito el apetito' }, score: 2 },
      { label: { en: 'Sometimes, privately', fr: 'Parfois, en privé', ar: 'أحيانًا، في السر', es: 'A veces, en privado' }, score: 1 },
      { label: { en: 'I keep those two selves separate', fr: 'Je garde ces deux moi bien séparés', ar: 'أُبقي هاتين النسختين منفصلتين', es: 'Mantengo esos dos yo separados' }, score: -1 },
      { label: { en: 'Never — my taste is exactly my image', fr: 'Jamais — mes goûts sont exactement mon image', ar: 'أبدًا — ذوقي مطابق تمامًا لصورتي', es: 'Nunca — mi gusto es exactamente mi imagen' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q15',
    text: {
      en: "'I'm not angry.' How often is that sentence true when you say it?",
      fr: "« Je ne suis pas en colère. » À quelle fréquence cette phrase est-elle vraie quand tu la dis ?",
      ar: '«أنا لست غاضبًا.» كم مرة تكون هذه الجملة صادقة حين تقولها؟',
      es: "'No estoy enojado.' ¿Con qué frecuencia esa frase es verdad cuando la dices?",
    },
    framework: 'mixed',
    dimension: 'disowned_feelings',
    soloAnswers: [
      { label: { en: "I rarely need it — I say when I'm angry", fr: 'J\'en ai rarement besoin — je dis quand je suis en colère', ar: 'نادرًا ما أحتاجها — أقول حين أغضب', es: 'Rara vez la necesito — digo cuándo estoy enojado' }, score: 2 },
      { label: { en: 'Mostly true, with exceptions', fr: 'Vraie la plupart du temps, avec des exceptions', ar: 'صادقة غالبًا، مع استثناءات', es: 'Casi siempre verdad, con excepciones' }, score: 1 },
      { label: { en: 'It buys me time to stew', fr: 'Elle me donne du temps pour ruminer', ar: 'تمنحني وقتًا لأغلي في صمت', es: 'Me compra tiempo para rumiar' }, score: -1 },
      { label: { en: "It's my most-used lie", fr: 'C\'est mon mensonge le plus utilisé', ar: 'إنها كذبتي الأكثر استخدامًا', es: 'Es mi mentira más usada' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q16',
    text: {
      en: 'The feeling you are least willing to say out loud:',
      fr: 'Le sentiment que tu es le moins prêt à dire tout haut :',
      ar: 'الشعور الذي أنت أقل استعدادًا لقوله بصوت عالٍ:',
      es: 'El sentimiento que menos dispuesto estás a decir en voz alta:',
    },
    framework: 'mixed',
    dimension: 'disowned_feelings',
    soloAnswers: [
      { label: { en: 'None are off-limits — just hard', fr: 'Aucun n\'est interdit — juste difficile', ar: 'لا شيء محظور — فقط صعب', es: 'Ninguno está prohibido — solo cuesta' }, score: 2 },
      { label: { en: 'One or two get delayed', fr: 'Un ou deux prennent du retard', ar: 'واحد أو اثنان يتأخران', es: 'Uno o dos se retrasan' }, score: 1 },
      { label: { en: 'Envy or need — I dress them up first', fr: 'L\'envie ou le besoin — je les déguise d\'abord', ar: 'الحسد أو الحاجة — أُلبسهما قناعًا أولًا', es: 'La envidia o la necesidad — primero las disfrazo' }, score: -1 },
      { label: { en: 'Weakness of any kind — I delete it', fr: 'Toute faiblesse — je la supprime', ar: 'أي ضعف — أحذفه', es: 'Cualquier debilidad — la borro' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q17',
    text: {
      en: 'When grief or hurt shows up at a bad time, you:',
      fr: 'Quand le chagrin ou la douleur arrive au mauvais moment, tu :',
      ar: 'حين يظهر الحزن أو الألم في وقت غير مناسب، أنت:',
      es: 'Cuando el duelo o el dolor llegan en mal momento, tú:',
    },
    framework: 'mixed',
    dimension: 'disowned_feelings',
    soloAnswers: [
      { label: { en: 'Schedule its return — and keep the appointment', fr: 'Je lui fixe un rendez-vous — et je le tiens', ar: 'أحدد له موعد عودة — وألتزم بالموعد', es: 'Le agendo su regreso — y cumplo la cita' }, score: 2 },
      { label: { en: 'Park it, then mostly come back to it', fr: 'Je le mets de côté, puis j\'y reviens le plus souvent', ar: 'أُنحّيه جانبًا ثم أعود إليه غالبًا', es: 'Lo aparco y luego casi siempre vuelvo a él' }, score: 1 },
      { label: { en: 'Bury it and stay busy', fr: 'Je l\'enterre et je reste occupé', ar: 'أدفنه وأبقى مشغولًا', es: 'Lo entierro y me mantengo ocupado' }, score: -1 },
      { label: { en: 'What grief? I move on instantly', fr: 'Quel chagrin ? Je passe à autre chose aussitôt', ar: 'أي حزن؟ أتجاوز فورًا', es: '¿Qué duelo? Sigo adelante al instante' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q18',
    text: {
      en: "Your 'unacceptable' wants — attention, desire, money, power:",
      fr: 'Tes désirs « inacceptables » — attention, désir, argent, pouvoir :',
      ar: 'رغباتك «غير المقبولة» — الاهتمام، الشهوة، المال، السلطة:',
      es: "Tus deseos 'inaceptables' — atención, deseo, dinero, poder:",
    },
    framework: 'mixed',
    dimension: 'disowned_feelings',
    soloAnswers: [
      { label: { en: 'Named and negotiated with, openly', fr: 'Nommés et négociés, ouvertement', ar: 'مُسمّاة وأتفاوض معها بانفتاح', es: 'Nombrados y negociados, abiertamente' }, score: 2 },
      { label: { en: 'Admitted to myself, mostly', fr: 'Admis pour moi-même, en général', ar: 'أعترف بها لنفسي، غالبًا', es: 'Admitidos ante mí mismo, casi siempre' }, score: 1 },
      { label: { en: 'Admitted only when caught', fr: 'Admis seulement quand je suis pris', ar: 'أعترف بها فقط حين أُضبط', es: 'Admitidos solo cuando me descubren' }, score: -1 },
      { label: { en: "I don't have those. Others do.", fr: 'Je n\'ai pas ça. Les autres, oui.', ar: 'أنا لا أملك هذه الرغبات. الآخرون يملكونها.', es: 'Yo no tengo de eso. Otros sí.' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q19',
    text: {
      en: 'When you finally explode over something small:',
      fr: 'Quand tu finis par exploser pour un détail :',
      ar: 'حين تنفجر أخيرًا بسبب شيء صغير:',
      es: 'Cuando al fin explotas por algo pequeño:',
    },
    framework: 'mixed',
    dimension: 'disowned_feelings',
    soloAnswers: [
      { label: { en: 'I trace it back to what I swallowed earlier', fr: 'Je remonte à ce que j\'ai ravalé plus tôt', ar: 'أتتبعه إلى ما ابتلعته سابقًا', es: 'Lo rastreo hasta lo que me tragué antes' }, score: 2 },
      { label: { en: 'I apologize and look for the real cause', fr: 'Je m\'excuse et je cherche la vraie cause', ar: 'أعتذر وأبحث عن السبب الحقيقي', es: 'Me disculpo y busco la causa real' }, score: 1 },
      { label: { en: 'The small thing deserved it', fr: 'Le détail le méritait', ar: 'ذلك الشيء الصغير استحق الانفجار', es: 'Esa pequeñez se lo merecía' }, score: -1 },
      { label: { en: "I don't explode — pressure just disappears", fr: 'Je n\'explose pas — la pression disparaît, c\'est tout', ar: 'أنا لا أنفجر — الضغط يختفي ببساطة', es: 'Yo no exploto — la presión simplemente desaparece' }, score: -2 },
    ],
  },
  {
    id: 'shadow_self_q20',
    text: {
      en: 'The parts of yourself you hide the hardest are:',
      fr: 'Les parts de toi que tu caches le plus fort sont :',
      ar: 'الأجزاء التي تخفيها من نفسك بأقصى جهد هي:',
      es: 'Las partes de ti que escondes con más fuerza son:',
    },
    framework: 'mixed',
    dimension: 'disowned_feelings',
    soloAnswers: [
      { label: { en: 'Familiar — I visit them on purpose', fr: 'Familières — je leur rends visite exprès', ar: 'مألوفة — أزورها عمدًا', es: 'Familiares — las visito a propósito' }, score: 2 },
      { label: { en: "Known, if I'm honest", fr: 'Connues, si je suis honnête', ar: 'معروفة، إن كنت صادقًا', es: 'Conocidas, si soy honesto' }, score: 1 },
      { label: { en: 'Better left alone', fr: 'Mieux vaut ne pas y toucher', ar: 'من الأفضل تركها وشأنها', es: 'Mejor no tocarlas' }, score: -1 },
      { label: { en: 'Not there. I have no hidden parts.', fr: 'Inexistantes. Je n\'ai rien de caché.', ar: 'غير موجودة. لا أجزاء خفية عندي.', es: 'No existen. No tengo partes ocultas.' }, score: -2 },
    ],
  },
];
