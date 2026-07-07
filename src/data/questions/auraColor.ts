import { Question } from '../../types';

// ─────────────────────────────────────────────────────────────────────────────
// AURA COLOR — categorical solo module (resultKind: 'categorical').
// Each answer carries a `category` (one of 6 aura colors: violet, blue, green,
// gold, red, rose). scoreCategorical() tallies categories; winner = the user's
// aura, runner-up = the "edge". `score` is REQUIRED by SoloAnswer but IGNORED
// on the categorical path — kept at 1 everywhere.
// Color balance across 80 answer slots: violet 14, gold 14, blue/green/red/rose 13.
// ─────────────────────────────────────────────────────────────────────────────

export const auraColorQuestions: Question[] = [
  {
    id: 'aura_color_q01',
    text: {
      en: 'You walk into a room full of strangers. What does your energy do first?',
      fr: "Tu entres dans une pièce pleine d'inconnus. Que fait ton énergie en premier ?",
      ar: 'تدخل غرفة مليئة بالغرباء. ماذا تفعل طاقتك أولًا؟',
      es: 'Entras en una sala llena de desconocidos. ¿Qué hace tu energía primero?',
    },
    framework: 'colorWheel',
    dimension: 'energy_expression',
    soloAnswers: [
      { label: { en: "Hangs back and reads the room's undercurrent", fr: 'Elle reste en retrait et lit les courants invisibles de la pièce', ar: 'تتراجع قليلًا وتقرأ التيار الخفي في المكان', es: 'Se queda atrás y lee la corriente oculta de la sala' }, score: 1, category: 'violet' },
      { label: { en: 'Settles into a calm corner and quietly observes', fr: "Elle s'installe dans un coin calme et observe en silence", ar: 'تستقر في زاوية هادئة وتراقب بصمت', es: 'Se acomoda en un rincón tranquilo y observa en silencio' }, score: 1, category: 'blue' },
      { label: { en: 'Warms the space — people start drifting toward me', fr: "Elle réchauffe l'espace — les gens commencent à venir vers moi", ar: 'تُدفئ المكان — يبدأ الناس بالانجذاب نحوي', es: 'Calienta el espacio: la gente empieza a acercarse a mí' }, score: 1, category: 'gold' },
      { label: { en: "Takes the room — I'd rather lead than blend in", fr: "Elle prend la pièce — je préfère mener que me fondre", ar: 'تستولي على الغرفة — أفضّل أن أقود على أن أذوب في الخلفية', es: 'Toma la sala: prefiero liderar antes que mezclarme' }, score: 1, category: 'red' },
    ],
  },
  {
    id: 'aura_color_q02',
    text: {
      en: 'A friend breaks down crying in front of you. What happens in your chest?',
      fr: "Un ami s'effondre en larmes devant toi. Que se passe-t-il dans ta poitrine ?",
      ar: 'ينهار صديق بالبكاء أمامك. ماذا يحدث في صدرك؟',
      es: 'Un amigo se derrumba llorando frente a ti. ¿Qué pasa en tu pecho?',
    },
    framework: 'attachment',
    dimension: 'emotional_holding',
    soloAnswers: [
      { label: { en: 'An instinct to heal — I start carrying part of it for them', fr: "Un instinct de guérison — je commence à porter une partie de leur poids", ar: 'غريزة للشفاء — أبدأ بحمل جزء من ألمه عنه', es: 'Un instinto de sanar: empiezo a cargar parte de su peso' }, score: 1, category: 'green' },
      { label: { en: 'Pure tenderness — I just want to hold them', fr: 'Une tendresse pure — je veux juste les serrer contre moi', ar: 'حنان خالص — أريد فقط أن أحتضنه', es: 'Pura ternura: solo quiero abrazarlo' }, score: 1, category: 'rose' },
      { label: { en: 'A steady calm — I become the still point they can lean on', fr: 'Un calme stable — je deviens le point fixe sur lequel ils peuvent s\'appuyer', ar: 'هدوء ثابت — أصبح النقطة الساكنة التي يستند إليها', es: 'Una calma firme: me convierto en el punto fijo donde apoyarse' }, score: 1, category: 'blue' },
      { label: { en: "A deep knowing — I feel what's underneath the tears", fr: 'Une connaissance profonde — je sens ce qui se cache sous les larmes', ar: 'معرفة عميقة — أشعر بما يختبئ خلف الدموع', es: 'Un saber profundo: siento lo que hay debajo de las lágrimas' }, score: 1, category: 'violet' },
    ],
  },
  {
    id: 'aura_color_q03',
    text: {
      en: "What actually recharges you when you're completely empty?",
      fr: 'Qu\'est-ce qui te recharge vraiment quand tu es complètement vide ?',
      ar: 'ما الذي يعيد شحنك فعلًا عندما تكون فارغًا تمامًا؟',
      es: '¿Qué te recarga de verdad cuando estás completamente vacío?',
    },
    framework: 'colorWheel',
    dimension: 'joy_source',
    soloAnswers: [
      { label: { en: 'Laughter, light, being around good energy', fr: 'Le rire, la lumière, être entouré de bonne énergie', ar: 'الضحك والنور ووجودي وسط طاقة جميلة', es: 'La risa, la luz, rodearme de buena energía' }, score: 1, category: 'gold' },
      { label: { en: 'Movement — doing something bold with my body or my plans', fr: 'Le mouvement — faire quelque chose d\'audacieux avec mon corps ou mes projets', ar: 'الحركة — أن أفعل شيئًا جريئًا بجسدي أو بخططي', es: 'El movimiento: hacer algo audaz con mi cuerpo o mis planes' }, score: 1, category: 'red' },
      { label: { en: 'Nature, quiet growth, tending to something alive', fr: 'La nature, la croissance silencieuse, prendre soin de quelque chose de vivant', ar: 'الطبيعة والنمو الهادئ والاعتناء بشيء حي', es: 'La naturaleza, el crecimiento silencioso, cuidar algo vivo' }, score: 1, category: 'green' },
      { label: { en: 'Closeness — a long talk with someone I love', fr: 'La proximité — une longue conversation avec quelqu\'un que j\'aime', ar: 'القرب — حديث طويل مع شخص أحبه', es: 'La cercanía: una charla larga con alguien que amo' }, score: 1, category: 'rose' },
    ],
  },
  {
    id: 'aura_color_q04',
    text: {
      en: 'In your circle of friends, which role keeps choosing you?',
      fr: 'Dans ton cercle d\'amis, quel rôle ne cesse de te choisir ?',
      ar: 'في دائرة أصدقائك، أي دور لا يتوقف عن اختيارك؟',
      es: 'En tu círculo de amigos, ¿qué papel te sigue eligiendo a ti?',
    },
    framework: 'sociometry',
    dimension: 'social_role',
    soloAnswers: [
      { label: { en: 'The one who sees what nobody says out loud', fr: 'Celui qui voit ce que personne ne dit à voix haute', ar: 'من يرى ما لا يقوله أحد بصوت عالٍ', es: 'El que ve lo que nadie dice en voz alta' }, score: 1, category: 'violet' },
      { label: { en: 'The spark — the one who lifts the mood', fr: "L'étincelle — celui qui remonte l'ambiance", ar: 'الشرارة — من يرفع المزاج', es: 'La chispa: el que levanta el ánimo' }, score: 1, category: 'gold' },
      { label: { en: "The advisor — the one they call when it's serious", fr: 'Le conseiller — celui qu\'on appelle quand c\'est sérieux', ar: 'المستشار — من يتصلون به حين يصبح الأمر جدّيًا', es: 'El consejero: al que llaman cuando es serio' }, score: 1, category: 'blue' },
      { label: { en: 'The safe place — the one they come to heal', fr: "Le refuge — celui vers qui l'on vient guérir", ar: 'المكان الآمن — من يأتون إليه ليتعافوا', es: 'El lugar seguro: al que acuden para sanar' }, score: 1, category: 'green' },
    ],
  },
  {
    id: 'aura_color_q05',
    text: {
      en: 'When you want something, how do you want it?',
      fr: 'Quand tu veux quelque chose, comment le veux-tu ?',
      ar: 'عندما تريد شيئًا، كيف تريده؟',
      es: 'Cuando quieres algo, ¿cómo lo quieres?',
    },
    framework: 'colorWheel',
    dimension: 'desire_pattern',
    soloAnswers: [
      { label: { en: 'With fire — all in, right now', fr: 'Avec feu — à fond, tout de suite', ar: 'بنار — بكل ما أملك وفورًا', es: 'Con fuego: a fondo, ahora mismo' }, score: 1, category: 'red' },
      { label: { en: 'Softly but completely — I hold it close to my heart', fr: 'Doucement mais complètement — je le garde près de mon cœur', ar: 'بهدوء لكن بالكامل — أحتفظ به قريبًا من قلبي', es: 'Suave pero completamente: lo guardo cerca del corazón' }, score: 1, category: 'rose' },
      { label: { en: 'Quietly and deeply — almost like a secret', fr: 'Silencieusement et profondément — presque comme un secret', ar: 'بصمت وعمق — كأنه سرّ تقريبًا', es: 'En silencio y profundamente: casi como un secreto' }, score: 1, category: 'violet' },
      { label: { en: 'Openly and brightly — wanting things is a joy to me', fr: 'Ouvertement et avec éclat — désirer est une joie pour moi', ar: 'بانفتاح وإشراق — الرغبة نفسها فرح بالنسبة لي', es: 'Abierta y luminosamente: desear es una alegría para mí' }, score: 1, category: 'gold' },
    ],
  },
  {
    id: 'aura_color_q06',
    text: {
      en: 'Your gut says no but everyone around you says yes. What do you do?',
      fr: 'Ton instinct dit non mais tout le monde autour dit oui. Que fais-tu ?',
      ar: 'حدسك يقول لا لكن كل من حولك يقول نعم. ماذا تفعل؟',
      es: 'Tu instinto dice no pero todos a tu alrededor dicen sí. ¿Qué haces?',
    },
    framework: 'intuition',
    dimension: 'gut_signal',
    soloAnswers: [
      { label: { en: 'Say my truth calmly, once, and let it stand', fr: 'Je dis ma vérité calmement, une fois, et je la laisse tenir', ar: 'أقول حقيقتي بهدوء مرة واحدة وأتركها تثبت', es: 'Digo mi verdad con calma, una vez, y la dejo en pie' }, score: 1, category: 'blue' },
      { label: { en: 'Look for the gentle middle path that protects everyone', fr: 'Je cherche la voie douce du milieu qui protège tout le monde', ar: 'أبحث عن الطريق الوسط اللطيف الذي يحمي الجميع', es: 'Busco el camino intermedio y amable que proteja a todos' }, score: 1, category: 'green' },
      { label: { en: 'Trust my gut and go against the room without blinking', fr: "Je fais confiance à mon instinct et je vais contre tous sans ciller", ar: 'أثق بحدسي وأخالف الجميع دون أن أرمش', es: 'Confío en mi instinto y voy contra todos sin pestañear' }, score: 1, category: 'red' },
      { label: { en: "Feel torn — I can't stand disappointing people I love", fr: 'Je me sens déchiré — je déteste décevoir les gens que j\'aime', ar: 'أشعر بالتمزق — لا أحتمل أن أخيّب من أحبهم', es: 'Me siento dividido: no soporto decepcionar a quienes amo' }, score: 1, category: 'rose' },
    ],
  },
  {
    id: 'aura_color_q07',
    text: {
      en: 'How do people actually get close to you?',
      fr: 'Comment les gens s\'approchent-ils vraiment de toi ?',
      ar: 'كيف يقترب الناس منك فعلًا؟',
      es: '¿Cómo se acerca de verdad la gente a ti?',
    },
    framework: 'attachment',
    dimension: 'closeness_style',
    soloAnswers: [
      { label: { en: 'Slowly — there are rooms in me few people ever see', fr: 'Lentement — il y a en moi des pièces que peu de gens verront', ar: 'ببطء — في داخلي غرف لا يراها إلا القليل', es: 'Lentamente: hay cuartos en mí que pocos llegan a ver' }, score: 1, category: 'violet' },
      { label: { en: 'Easily — my door is basically always open', fr: 'Facilement — ma porte est pratiquement toujours ouverte', ar: 'بسهولة — بابي مفتوح دائمًا تقريبًا', es: 'Fácilmente: mi puerta está prácticamente siempre abierta' }, score: 1, category: 'gold' },
      { label: { en: 'Through tenderness — softness is the only key that works', fr: 'Par la tendresse — la douceur est la seule clé qui fonctionne', ar: 'عبر الحنان — الرقّة هي المفتاح الوحيد الذي يفتحني', es: 'A través de la ternura: la suavidad es la única llave que funciona' }, score: 1, category: 'rose' },
      { label: { en: "Through honesty — say it real and you're in", fr: 'Par l\'honnêteté — parle vrai et tu es entré', ar: 'عبر الصدق — قلها بصدق وستدخل', es: 'A través de la honestidad: háblame en serio y ya entraste' }, score: 1, category: 'blue' },
    ],
  },
  {
    id: 'aura_color_q08',
    text: {
      en: "Mid-argument with someone you care about — what's your natural weapon?",
      fr: 'En pleine dispute avec quelqu\'un qui compte — quelle est ton arme naturelle ?',
      ar: 'في منتصف شجار مع شخص يهمّك — ما سلاحك الطبيعي؟',
      es: 'En plena discusión con alguien que te importa, ¿cuál es tu arma natural?',
    },
    framework: 'colorWheel',
    dimension: 'conflict_energy',
    soloAnswers: [
      { label: { en: 'De-escalation — I cool it down before it burns', fr: "L'apaisement — je refroidis avant que ça brûle", ar: 'التهدئة — أطفئ النار قبل أن تحرق', es: 'La desescalada: lo enfrío antes de que queme' }, score: 1, category: 'green' },
      { label: { en: 'Directness — I say the hard thing out loud', fr: 'La franchise — je dis la chose difficile à voix haute', ar: 'المباشرة — أقول الكلمة الصعبة بصوت عالٍ', es: 'La franqueza: digo lo difícil en voz alta' }, score: 1, category: 'red' },
      { label: { en: 'Silence — I retreat inward and process alone', fr: 'Le silence — je me retire en moi et je digère seul', ar: 'الصمت — أنسحب إلى داخلي وأعالج الأمر وحدي', es: 'El silencio: me repliego hacia dentro y lo proceso solo' }, score: 1, category: 'violet' },
      { label: { en: 'Humor — I break the tension with light', fr: "L'humour — je casse la tension avec de la lumière", ar: 'الفكاهة — أكسر التوتر بالنور', es: 'El humor: rompo la tensión con luz' }, score: 1, category: 'gold' },
    ],
  },
  {
    id: 'aura_color_q09',
    text: {
      en: 'What do people thank you for most often?',
      fr: 'Pour quoi les gens te remercient-ils le plus souvent ?',
      ar: 'على ماذا يشكرك الناس في أغلب الأحيان؟',
      es: '¿Por qué te agradece la gente más a menudo?',
    },
    framework: 'sociometry',
    dimension: 'perceived_by_others',
    soloAnswers: [
      { label: { en: 'Being honest with them when nobody else was', fr: 'Avoir été honnête avec eux quand personne d\'autre ne l\'était', ar: 'لأنني كنت صادقًا معهم حين لم يكن أحد كذلك', es: 'Ser honesto con ellos cuando nadie más lo fue' }, score: 1, category: 'blue' },
      { label: { en: 'Making them feel genuinely loved', fr: 'Leur avoir fait sentir qu\'ils étaient vraiment aimés', ar: 'لأنني جعلتهم يشعرون بأنهم محبوبون حقًا', es: 'Hacerlos sentir genuinamente amados' }, score: 1, category: 'rose' },
      { label: { en: 'Helping them through something heavy', fr: 'Les avoir aidés à traverser quelque chose de lourd', ar: 'لأنني ساعدتهم على عبور شيء ثقيل', es: 'Ayudarlos a atravesar algo pesado' }, score: 1, category: 'green' },
      { label: { en: 'Pushing them to finally do the thing', fr: 'Les avoir poussés à enfin passer à l\'action', ar: 'لأنني دفعتهم أخيرًا ليفعلوا ما كانوا يؤجلونه', es: 'Empujarlos a por fin hacer aquello' }, score: 1, category: 'red' },
    ],
  },
  {
    id: 'aura_color_q10',
    text: {
      en: "When you're completely alone, what's your inner weather?",
      fr: 'Quand tu es complètement seul, quel temps fait-il en toi ?',
      ar: 'عندما تكون وحيدًا تمامًا، كيف يكون طقسك الداخلي؟',
      es: 'Cuando estás completamente solo, ¿cuál es tu clima interior?',
    },
    framework: 'colorWheel',
    dimension: 'inner_weather',
    soloAnswers: [
      { label: { en: 'Sunny — I genuinely enjoy my own company', fr: 'Ensoleillé — j\'apprécie sincèrement ma propre compagnie', ar: 'مشمس — أستمتع حقًا بصحبة نفسي', es: 'Soleado: disfruto de verdad mi propia compañía' }, score: 1, category: 'gold' },
      { label: { en: 'Deep water — symbols, thoughts, big questions', fr: 'Eaux profondes — symboles, pensées, grandes questions', ar: 'مياه عميقة — رموز وأفكار وأسئلة كبرى', es: 'Aguas profundas: símbolos, pensamientos, grandes preguntas' }, score: 1, category: 'violet' },
      { label: { en: 'Clear sky — quiet, ordered, calm', fr: 'Ciel dégagé — silencieux, ordonné, calme', ar: 'سماء صافية — هدوء ونظام وسكينة', es: 'Cielo despejado: silencio, orden, calma' }, score: 1, category: 'blue' },
      { label: { en: 'A garden — I use alone time to restore myself', fr: 'Un jardin — j\'utilise la solitude pour me régénérer', ar: 'حديقة — أستخدم وقتي وحدي لأستعيد نفسي', es: 'Un jardín: uso la soledad para restaurarme' }, score: 1, category: 'green' },
    ],
  },
  {
    id: 'aura_color_q11',
    text: {
      en: 'You meet someone new. What do you read first, before any words?',
      fr: 'Tu rencontres quelqu\'un de nouveau. Que lis-tu en premier, avant les mots ?',
      ar: 'تقابل شخصًا جديدًا. ماذا تقرأ فيه أولًا قبل أي كلمة؟',
      es: 'Conoces a alguien nuevo. ¿Qué lees primero, antes de cualquier palabra?',
    },
    framework: 'intuition',
    dimension: 'first_impression_read',
    soloAnswers: [
      { label: { en: 'Their force — how much power they carry', fr: 'Sa force — la puissance qu\'il porte en lui', ar: 'قوّته — كم من السلطة يحمل في داخله', es: 'Su fuerza: cuánto poder lleva dentro' }, score: 1, category: 'red' },
      { label: { en: 'Their softness — how safe their heart feels', fr: 'Sa douceur — à quel point son cœur semble sûr', ar: 'رقّته — كم يبدو قلبه آمنًا', es: 'Su suavidad: cuán seguro se siente su corazón' }, score: 1, category: 'rose' },
      { label: { en: 'Their light — whether they lift a room or drain it', fr: 'Sa lumière — s\'il élève une pièce ou la vide', ar: 'نوره — هل يرفع طاقة المكان أم يستنزفها', es: 'Su luz: si eleva una sala o la drena' }, score: 1, category: 'gold' },
      { label: { en: "Their shadow — what they're hiding", fr: 'Son ombre — ce qu\'il cache', ar: 'ظلّه — ما الذي يخفيه', es: 'Su sombra: lo que esconde' }, score: 1, category: 'violet' },
    ],
  },
  {
    id: 'aura_color_q12',
    text: {
      en: 'How does your love actually show up, day to day?',
      fr: 'Comment ton amour se manifeste-t-il vraiment, au quotidien ?',
      ar: 'كيف يظهر حبّك فعلًا في الحياة اليومية؟',
      es: '¿Cómo se manifiesta tu amor realmente, en el día a día?',
    },
    framework: 'attachment',
    dimension: 'love_expression',
    soloAnswers: [
      { label: { en: 'Loyalty — a steady presence you can set a clock by', fr: 'La loyauté — une présence stable, réglée comme une horloge', ar: 'الوفاء — حضور ثابت يمكن ضبط الساعة عليه', es: 'Lealtad: una presencia firme con la que puedes poner el reloj en hora' }, score: 1, category: 'blue' },
      { label: { en: 'Care — I notice what you need before you say it', fr: 'Le soin — je remarque ce dont tu as besoin avant que tu le dises', ar: 'الرعاية — ألاحظ ما تحتاجه قبل أن تقوله', es: 'Cuidado: noto lo que necesitas antes de que lo digas' }, score: 1, category: 'green' },
      { label: { en: 'Affection — words, warmth, touch, tenderness', fr: "L'affection — mots, chaleur, contact, tendresse", ar: 'المودّة — كلمات ودفء ولمسة وحنان', es: 'Afecto: palabras, calidez, contacto, ternura' }, score: 1, category: 'rose' },
      { label: { en: "Protection — nobody touches what's mine", fr: 'La protection — personne ne touche à ce qui est à moi', ar: 'الحماية — لا أحد يمسّ ما هو لي', es: 'Protección: nadie toca lo que es mío' }, score: 1, category: 'red' },
    ],
  },
  {
    id: 'aura_color_q13',
    text: {
      en: 'What does your dream life actually look like?',
      fr: 'À quoi ressemble vraiment ta vie rêvée ?',
      ar: 'كيف تبدو حياتك التي تحلم بها فعلًا؟',
      es: '¿Cómo es realmente la vida de tus sueños?',
    },
    framework: 'colorWheel',
    dimension: 'ambition_shape',
    soloAnswers: [
      { label: { en: 'A meaningful one — depth, purpose, a life that means something', fr: 'Une vie de sens — profondeur, but, une vie qui veut dire quelque chose', ar: 'حياة ذات معنى — عمق وغاية وحياة تعني شيئًا', es: 'Una con sentido: profundidad, propósito, una vida que signifique algo' }, score: 1, category: 'violet' },
      { label: { en: 'A peaceful one — stability, clarity, no chaos', fr: 'Une vie paisible — stabilité, clarté, zéro chaos', ar: 'حياة هادئة — استقرار ووضوح وبلا فوضى', es: 'Una en paz: estabilidad, claridad, cero caos' }, score: 1, category: 'blue' },
      { label: { en: 'A bright one — joy, abundance, beautiful moments', fr: 'Une vie lumineuse — joie, abondance, beaux moments', ar: 'حياة مشرقة — فرح ووفرة ولحظات جميلة', es: 'Una brillante: alegría, abundancia, momentos hermosos' }, score: 1, category: 'gold' },
      { label: { en: 'A growing one — building things and people that flourish', fr: 'Une vie qui grandit — bâtir des choses et des gens qui fleurissent', ar: 'حياة تنمو — أبني أشياء وأناسًا يزدهرون', es: 'Una que crece: construir cosas y personas que florecen' }, score: 1, category: 'green' },
    ],
  },
  {
    id: 'aura_color_q14',
    text: {
      en: 'When you leave a room, what stays behind?',
      fr: 'Quand tu quittes une pièce, qu\'est-ce qui reste derrière toi ?',
      ar: 'عندما تغادر غرفة، ما الذي يبقى خلفك؟',
      es: 'Cuando sales de una sala, ¿qué queda detrás de ti?',
    },
    framework: 'sociometry',
    dimension: 'absence_effect',
    soloAnswers: [
      { label: { en: 'Heat — people remember my intensity', fr: 'De la chaleur — les gens se souviennent de mon intensité', ar: 'حرارة — يتذكّر الناس شدّتي', es: 'Calor: la gente recuerda mi intensidad' }, score: 1, category: 'red' },
      { label: { en: 'Warmth — people feel a little more loved', fr: 'De la douceur — les gens se sentent un peu plus aimés', ar: 'دفء — يشعر الناس بأنهم محبوبون أكثر قليلًا', es: 'Calidez: la gente se siente un poco más amada' }, score: 1, category: 'rose' },
      { label: { en: 'Mystery — people wonder what I was really thinking', fr: 'Du mystère — les gens se demandent ce que je pensais vraiment', ar: 'غموض — يتساءل الناس عمّا كنت أفكّر فيه حقًا', es: 'Misterio: la gente se pregunta qué pensaba realmente' }, score: 1, category: 'violet' },
      { label: { en: 'Calm — the room stays steadier than before', fr: 'Du calme — la pièce reste plus stable qu\'avant', ar: 'سكينة — تبقى الغرفة أكثر ثباتًا من قبل', es: 'Calma: la sala queda más estable que antes' }, score: 1, category: 'blue' },
    ],
  },
  {
    id: 'aura_color_q15',
    text: {
      en: 'What drains your energy fastest?',
      fr: 'Qu\'est-ce qui vide ton énergie le plus vite ?',
      ar: 'ما الذي يستنزف طاقتك بأسرع ما يمكن؟',
      es: '¿Qué drena tu energía más rápido?',
    },
    framework: 'intuition',
    dimension: 'energy_leak',
    soloAnswers: [
      { label: { en: 'Negativity — heavy moods dim my light', fr: 'La négativité — les humeurs lourdes éteignent ma lumière', ar: 'السلبية — المزاج الثقيل يُخفت نوري', es: 'La negatividad: los ánimos pesados apagan mi luz' }, score: 1, category: 'gold' },
      { label: { en: 'Being needed by everyone at once', fr: 'Être indispensable à tout le monde en même temps', ar: 'أن يحتاجني الجميع في الوقت نفسه', es: 'Que todos me necesiten a la vez' }, score: 1, category: 'green' },
      { label: { en: 'Slowness — waiting, hesitation, small thinking', fr: 'La lenteur — attendre, hésiter, penser petit', ar: 'البطء — الانتظار والتردّد والتفكير الصغير', es: 'La lentitud: esperar, dudar, pensar en pequeño' }, score: 1, category: 'red' },
      { label: { en: "Coldness — being around people who don't feel", fr: 'La froideur — être entouré de gens qui ne ressentent rien', ar: 'البرود — أن أكون وسط أناس لا يشعرون', es: 'La frialdad: estar rodeado de gente que no siente' }, score: 1, category: 'rose' },
    ],
  },
  {
    id: 'aura_color_q16',
    text: {
      en: 'Life offers you a huge leap with no guarantees. First instinct?',
      fr: "La vie t'offre un grand saut sans aucune garantie. Premier réflexe ?",
      ar: 'تعرض عليك الحياة قفزة كبيرة بلا أي ضمانات. ما أول ردّة فعل لديك؟',
      es: 'La vida te ofrece un gran salto sin garantías. ¿Primer instinto?',
    },
    framework: 'colorWheel',
    dimension: 'risk_response',
    soloAnswers: [
      { label: { en: 'I consult my inner voice — it already knows', fr: 'Je consulte ma voix intérieure — elle sait déjà', ar: 'أستشير صوتي الداخلي — فهو يعرف مسبقًا', es: 'Consulto mi voz interior: ya lo sabe' }, score: 1, category: 'violet' },
      { label: { en: 'I think it through until the picture is clear', fr: 'Je réfléchis jusqu\'à ce que l\'image soit claire', ar: 'أفكّر مليًّا حتى تتضح الصورة', es: 'Lo pienso hasta que la imagen está clara' }, score: 1, category: 'blue' },
      { label: { en: 'I say yes — luck likes me', fr: 'Je dis oui — la chance m\'aime bien', ar: 'أقول نعم — فالحظ يحبّني', es: 'Digo que sí: la suerte me quiere' }, score: 1, category: 'gold' },
      { label: { en: 'I jump — fear is just fuel', fr: 'Je saute — la peur n\'est que du carburant', ar: 'أقفز — فالخوف مجرد وقود', es: 'Salto: el miedo es solo combustible' }, score: 1, category: 'red' },
    ],
  },
  {
    id: 'aura_color_q17',
    text: {
      en: 'When someone hurts you deeply, what do you do with the wound?',
      fr: 'Quand quelqu\'un te blesse profondément, que fais-tu de la blessure ?',
      ar: 'عندما يجرحك أحدهم بعمق، ماذا تفعل بالجرح؟',
      es: 'Cuando alguien te hiere profundamente, ¿qué haces con la herida?',
    },
    framework: 'attachment',
    dimension: 'wound_response',
    soloAnswers: [
      { label: { en: 'Tend it — I actively work on healing it', fr: 'Je la soigne — je travaille activement à la guérir', ar: 'أعتني به — أعمل بجدّ على شفائه', es: 'La cuido: trabajo activamente en sanarla' }, score: 1, category: 'green' },
      { label: { en: "Forgive it — my heart can't stay closed for long", fr: 'Je pardonne — mon cœur ne sait pas rester fermé longtemps', ar: 'أسامح — فقلبي لا يعرف البقاء مغلقًا طويلًا', es: 'La perdono: mi corazón no sabe quedarse cerrado mucho tiempo' }, score: 1, category: 'rose' },
      { label: { en: 'Bury it deep — it becomes part of my inner world', fr: "Je l'enterre profondément — elle devient une partie de mon monde intérieur", ar: 'أدفنه عميقًا — فيصبح جزءًا من عالمي الداخلي', es: 'La entierro hondo: se vuelve parte de mi mundo interior' }, score: 1, category: 'violet' },
      { label: { en: 'Name it — I need the truth spoken before I can move on', fr: 'Je la nomme — j\'ai besoin que la vérité soit dite avant d\'avancer', ar: 'أسمّيه — أحتاج أن تُقال الحقيقة قبل أن أمضي', es: 'La nombro: necesito que la verdad se diga antes de seguir' }, score: 1, category: 'blue' },
    ],
  },
  {
    id: 'aura_color_q18',
    text: {
      en: "It's 2 AM and you can't sleep. Where does your mind go?",
      fr: 'Il est 2h du matin et tu ne dors pas. Où va ton esprit ?',
      ar: 'الساعة الثانية فجرًا ولا تستطيع النوم. إلى أين يذهب عقلك؟',
      es: 'Son las 2 AM y no puedes dormir. ¿A dónde va tu mente?',
    },
    framework: 'intuition',
    dimension: 'night_self',
    soloAnswers: [
      { label: { en: "Tomorrow's possibilities — I get excited, not anxious", fr: 'Les possibilités de demain — je m\'enthousiasme au lieu de m\'angoisser', ar: 'احتمالات الغد — أتحمّس بدل أن أقلق', es: 'Las posibilidades de mañana: me emociono en vez de angustiarme' }, score: 1, category: 'gold' },
      { label: { en: 'Unfinished battles — things I still need to win', fr: 'Les batailles inachevées — ce qu\'il me reste à gagner', ar: 'معارك لم تُحسم بعد — أشياء ما زلت أريد الفوز بها', es: 'Batallas inconclusas: cosas que aún necesito ganar' }, score: 1, category: 'red' },
      { label: { en: 'People I worry about — the ones I want to fix things for', fr: 'Les gens qui m\'inquiètent — ceux pour qui je veux arranger les choses', ar: 'أشخاص أقلق عليهم — من أريد إصلاح الأمور لأجلهم', es: 'La gente que me preocupa: aquellos a quienes quiero arreglarles las cosas' }, score: 1, category: 'green' },
      { label: { en: "Someone's face — the people I love or miss", fr: 'Un visage — les gens que j\'aime ou qui me manquent', ar: 'وجه أحدهم — من أحبّهم أو أشتاق إليهم', es: 'El rostro de alguien: la gente que amo o extraño' }, score: 1, category: 'rose' },
    ],
  },
  {
    id: 'aura_color_q19',
    text: {
      en: 'If your presence were a gift to others, what would it be?',
      fr: 'Si ta présence était un cadeau pour les autres, lequel serait-ce ?',
      ar: 'لو كان حضورك هدية للآخرين، فماذا ستكون؟',
      es: 'Si tu presencia fuera un regalo para los demás, ¿cuál sería?',
    },
    framework: 'colorWheel',
    dimension: 'gift_signature',
    soloAnswers: [
      { label: { en: 'Depth — I make people feel truly seen', fr: 'La profondeur — je fais sentir aux gens qu\'ils sont vraiment vus', ar: 'العمق — أجعل الناس يشعرون بأنهم مرئيون حقًا', es: 'Profundidad: hago que la gente se sienta vista de verdad' }, score: 1, category: 'violet' },
      { label: { en: 'Joy — I make life feel lighter', fr: 'La joie — je rends la vie plus légère', ar: 'الفرح — أجعل الحياة تبدو أخفّ', es: 'Alegría: hago que la vida se sienta más ligera' }, score: 1, category: 'gold' },
      { label: { en: 'Peace — I make the chaos go quiet', fr: 'La paix — je fais taire le chaos', ar: 'السلام — أُسكت الفوضى', es: 'Paz: hago que el caos se calle' }, score: 1, category: 'blue' },
      { label: { en: 'Courage — I make people braver', fr: 'Le courage — je rends les gens plus braves', ar: 'الشجاعة — أجعل الناس أكثر جرأة', es: 'Coraje: hago a la gente más valiente' }, score: 1, category: 'red' },
    ],
  },
  {
    id: 'aura_color_q20',
    text: {
      en: 'What do people trust you with that they trust no one else with?',
      fr: 'Que te confient les gens qu\'ils ne confient à personne d\'autre ?',
      ar: 'ما الذي يأتمنك الناس عليه ولا يأتمنون عليه أحدًا سواك؟',
      es: '¿Qué te confía la gente que no le confía a nadie más?',
    },
    framework: 'sociometry',
    dimension: 'trusted_with',
    soloAnswers: [
      { label: { en: "Their pain — I'm where they come to heal", fr: 'Leur douleur — c\'est vers moi qu\'ils viennent guérir', ar: 'ألمهم — أنا المكان الذي يأتون إليه ليتعافوا', es: 'Su dolor: soy a donde vienen a sanar' }, score: 1, category: 'green' },
      { label: { en: 'Their heart — the fragile things', fr: 'Leur cœur — les choses fragiles', ar: 'قلوبهم — الأشياء الهشّة', es: 'Su corazón: las cosas frágiles' }, score: 1, category: 'rose' },
      { label: { en: "Their secrets — the things they've never said out loud", fr: 'Leurs secrets — ce qu\'ils n\'ont jamais dit à voix haute', ar: 'أسرارهم — ما لم يقولوه بصوت عالٍ قط', es: 'Sus secretos: lo que nunca han dicho en voz alta' }, score: 1, category: 'violet' },
      { label: { en: "Their hopes — I'm the one who believes with them", fr: 'Leurs espoirs — je suis celui qui y croit avec eux', ar: 'آمالهم — أنا من يؤمن بها معهم', es: 'Sus esperanzas: soy quien cree junto a ellos' }, score: 1, category: 'gold' },
    ],
  },
];
