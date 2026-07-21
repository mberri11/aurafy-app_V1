// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — Spanish long-form content
// ─────────────────────────────────────────────────────────────────────────────
// Same shape as content.en.ts (keyed by article id). Untranslated ids fall back
// to English automatically (see getArticleContent in ./index.ts).
// ─────────────────────────────────────────────────────────────────────────────

import type { ArticleContentMap } from './index';

export const articlesEs: ArticleContentMap = {
  // ── Semana 1 "Señales secretas del amor" — días 2–7 (día 1 = ten_signs_secret_love,
  // todavía pendiente de traducir en un batch BASE_ARTICLES) ─────────────────
  w01_a2: {
    title: 'Lo que hace la gente cuando no puede decir «te quiero»',
    subtitle: 'Cuando las palabras se atascan, las manos siguen hablando',
    blocks: [
      { type: 'paragraph', text: 'No todo el mundo puede decirlo. Para algunas personas, las tres palabras se esconden tras toda una vida de razones para no arriesgarlas —el orgullo, el miedo, una infancia en la que el cariño se racionaba. Así que el amor encuentra otra puerta. Aparece en el teléfono cargado que no pediste que cargaran, en el asiento que te guardan sin mencionarlo, en la forma en que de repente conocen tu pedido de café.' },
      { type: 'heading', text: 'El amor que viaja disfrazado' },
      { type: 'paragraph', text: 'Fíjate en los gestos que les cuestan algo —tiempo, esfuerzo, un poco de su comodidad. Una persona que cruza la ciudad para arreglar tu única cosa rota lo está diciendo. Una persona que se queda al teléfono mientras te quedas dormido lo está diciendo. Las palabras son solo el pie de foto; esto es la fotografía.' },
      { type: 'paragraph', text: 'La señal real es la constancia. Cualquiera puede hacer algo amable una vez. Quienes te aman hacen las cosas pequeñas y poco vistosas una y otra vez, cuando nadie mira y no hay nada que ganar.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Los psicólogos llaman a esto expresiones instrumentales del amor: cuidado que se demuestra mediante la acción y no la declaración. Se basan en la psicología relacional, no en la astrología: observables, repetibles y muy humanas.' },
    ],
  },
  w01_a3: {
    title: 'Por qué el amor real se esconde en gestos pequeños y aburridos',
    subtitle: 'La prueba poco romántica que dura más que la romántica',
    blocks: [
      { type: 'paragraph', text: 'Los grandes gestos son fáciles de hacer y fáciles de fingir. Las flores, el discurso, la sorpresa: quedan preciosos en foto y piden muy poco a quien los hace. El amor real suele vivir en un lugar mucho menos cinematográfico: en el vaso de agua rellenado, el depósito lleno, el mensaje que solo dice «¿llegaste bien?».' },
      { type: 'paragraph', text: 'Estos gestos son aburridos a propósito. Son amor despojado de toda actuación —nadie aplaude, ni siquiera se espera que nadie los note. Eso es exactamente lo que los hace honestos. Una persona que hace el trabajo monótono y repetido de cuidarte no tiene público ni motivo, salvo tú.' },
      { type: 'quote', text: 'Se reconoce a quien te ama por lo que hace cuando no hay ninguna historia que sacar de ello.', attribution: 'Sobre la devoción ordinaria' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La constancia de un cuidado repetido y de bajo costo predice la seguridad de una relación mucho mejor que los grandes gestos ocasionales —un hallazgo de la investigación relacional, no de las estrellas.' },
    ],
  },
  w01_a4: {
    title: 'Invitaciones a conectar: las pequeñas pruebas que siempre estás pasando o fallando',
    subtitle: 'Los micromomentos que deciden en silencio una relación',
    blocks: [
      { type: 'paragraph', text: 'Durante todo el día, la gente lanza pequeñas frases hacia quienes ama. «Mira ese cielo.» «Tuve el sueño más extraño.» «¿Viste esto?» Cada una es una invitación —una pequeña petición que significa: fíjate en mí, quédate conmigo un segundo. Casi nunca parecen gran cosa. Lo son.' },
      { type: 'heading', text: 'Volverse hacia, alejarse, o volverse en contra' },
      { type: 'orderedList', items: [
        { title: 'Volverse hacia', text: 'Responden a la invitación —miran, preguntan, se involucran. Es el sí silencioso que construye la confianza gota a gota.' },
        { title: 'Alejarse', text: 'La pasan por alto o la ignoran —no por crueldad, solo por distracción. Unas pocas no son nada. Un patrón de ellas es erosión.' },
        { title: 'Volverse en contra', text: 'Responden con brusquedad o lo descartan. Es raro, pero corrosivo, porque la persona aprende a dejar de intentarlo.' },
      ] },
      { type: 'paragraph', text: 'Si alguien se vuelve hacia tus invitaciones más pequeñas —la broma tonta, el pensamiento a medias— te está eligiendo en un idioma más antiguo que las palabras. Fíjate en cuántas veces le dice sí a tus nadas.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El marco de las «invitaciones a conectar» proviene de décadas de ciencia relacional observacional: la frecuencia con la que los miembros de una pareja se vuelven el uno hacia el otro predice con fuerza si el vínculo perdurará.' },
    ],
  },
  w01_a5: {
    title: 'Cuando alguien recuerda lo que olvidaste que dijiste',
    subtitle: 'La memoria es solo atención con una vida útil más larga',
    blocks: [
      { type: 'paragraph', text: 'Lo mencionaste una vez, hace meses, de pasada —el libro que querías, la comida que no puedes comer, el nombre del perro que tenías de niño. Olvidaste haberlo dicho. Esa persona no. Y cuando reaparece en algo que hace, sientes una pequeña calidez sorprendente: estaba escuchando con más atención de la que sabías.' },
      { type: 'paragraph', text: 'Una memoria así no es un truco de un buen cerebro. Es atención. Recordamos lo que nos importa. Cuando alguien conserva tus detalles casuales, te está diciendo en silencio hacia dónde ha estado apuntando su foco todo este tiempo: hacia ti.' },
      { type: 'paragraph', text: 'También es una de las señales más difíciles de fingir, porque no se puede producir a demanda. Solo existe si la escucha ya ocurrió, semanas atrás, cuando no había nada en juego.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La atención impulsa la codificación: retenemos lo que consideramos importante. Recordar tus detalles triviales es evidencia observable de atención sostenida, basada en la psicología cognitiva y relacional.' },
    ],
  },
  w01_a6: {
    title: 'El cuerpo habla primero: postura, distancia y deseo',
    subtitle: 'Lo que la gente dice antes de decir nada',
    blocks: [
      { type: 'paragraph', text: 'Mucho antes de que se elija una palabra, el cuerpo ya ha respondido. Hacia dónde apuntan los pies de alguien, cuánto se acerca, si se inclina hacia delante o mantiene su posición: la gente transmite interés en un idioma que no sabe que está hablando, y en el que es difícil mentir.' },
      { type: 'heading', text: 'El canal honesto' },
      { type: 'paragraph', text: 'Fíjate en las pequeñas señales involuntarias: el ángulo de sus hombros girando hacia ti, cómo se acorta la distancia cuando hablan, el reflejo de tus gestos sin que ninguno de los dos lo note. Copiamos inconscientemente a las personas de las que nos sentimos cerca —el movimiento sincronizado es la cercanía hecha visible.' },
      { type: 'paragraph', text: 'Ninguna de estas señales es prueba por sí sola. Pero el cuerpo rara vez se contradice durante mucho tiempo. Cuando la postura, la proximidad y el contacto visual dicen todos lo mismo, créelos antes de creer las palabras.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La sincronía no verbal y la orientación corporal son marcadores bien documentados de conexión y atracción en psicología —patrones que puedes observar, no adivinación.' },
    ],
  },
  w01_a7: {
    title: 'Cómo distinguir la atención del cariño',
    subtitle: 'Que te vean y que te amen no es lo mismo',
    blocks: [
      { type: 'paragraph', text: 'Algunas personas son maravillosas prestando atención. Te hacen sentir como la única persona en la sala —brillantes, curiosas, plenamente presentes. Es embriagador, y es fácil confundirlo con amor. Pero la atención puede ser un hábito, un encanto, una forma de moverse por el mundo. El cariño es otra cosa: atención que sigue apareciendo después de que la sala se vacía.' },
      { type: 'heading', text: 'La diferencia está en la continuidad' },
      { type: 'paragraph', text: 'La atención es el foco; el cariño es la permanencia. No preguntes cómo te hace sentir alguien en el momento, sino qué hace al día siguiente, y al otro. ¿Recuerda? ¿Vuelve? ¿La calidez sobrevive a la distancia y a las molestias? El cariño es atención que ha decidido ser leal.' },
      { type: 'paragraph', text: 'Esto es lo más bondadoso que puedes aprender a leer, porque te protege de las personas encantadoras que se sienten como amor sin serlo —y te ayuda a notar a las personas más silenciosas cuyo cariño no deslumbra, pero tampoco se va.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La constancia a lo largo del tiempo es lo que separa el apego genuino del compromiso momentáneo —una distinción que proviene de la psicología relacional, observable en el comportamiento y no leída en las estrellas.' },
    ],
  },

  // ── Semana 2 "Cuando alguien se aleja" — días 1–7 (todos artículos nuevos) ──
  w02_a1: {
    title: 'Cómo saber si alguien se está alejando',
    subtitle: 'La distancia siempre se anuncia — en silencio',
    blocks: [
      { type: 'paragraph', text: 'Nadie se va de golpe. Antes de la puerta, está la deriva: respuestas que llegan más tarde y pesan menos, planes que pasan de «hechos» a «quizás», una calidez que no ha desaparecido pero que de algún modo ha perdido su peso. Lo sientes antes de poder probarlo —y es exactamente en esa brecha entre el sentir y la prueba donde la gente se vuelve loca.' },
      { type: 'heading', text: 'Los tres canales de la deriva' },
      { type: 'orderedList', items: [
        { title: 'Esfuerzo', text: 'Quién inicia, quién planea, quién recuerda. La deriva aparece aquí primero —el trabajo invisible de la relación cambia de manos en silencio.' },
        { title: 'Atención', text: '¿Sigue haciendo preguntas de seguimiento? ¿Tus pequeñas historias siguen provocando una reacción? La atención se reduce antes que la presencia.' },
        { title: 'Reparación', text: 'Cuando algo no va bien y lo nombras, ¿se inclina para arreglarlo, o se encoge de hombros? La voluntad de reparar es lo último que se va.' },
      ] },
      { type: 'paragraph', text: 'Una semana silenciosa no es un veredicto. La gente se enferma, se abruma, se entristece por cosas que no tienen nada que ver contigo. Lo que debes vigilar no es un mal día sino una dirección —tres canales, todos moviéndose en el mismo sentido, durante semanas. Eso no es un estado de ánimo. Es un mensaje.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La investigación sobre relaciones encuentra de forma constante que la disminución de la capacidad de respuesta —un compromiso más lento y más superficial en varios canales— precede a un retraimiento consciente. Estás leyendo un patrón, no una profecía.' },
    ],
  },
  w02_a2: {
    title: 'La diferencia entre necesitar espacio y perder el interés',
    subtitle: 'Ambos se quedan callados. Solo uno vuelve.',
    blocks: [
      { type: 'paragraph', text: 'Desde fuera, parecen idénticos: menos mensajes, llamadas más cortas, una persona que solía estar en todas partes y ahora se raciona. Pero necesitar espacio y perder el interés son criaturas opuestas que llevan el mismo abrigo —y hay una forma fiable de distinguirlas.' },
      { type: 'heading', text: 'El espacio tiene remitente' },
      { type: 'paragraph', text: 'Una persona que necesita espacio sigue cuidando el vínculo mientras lo toma. Te lo dice —quizás con torpeza, pero te lo dice. La calidez en el poco contacto que sí recibes se mantiene intacta. Pide paciencia en vez de fingir que nada cambió. La distancia tiene bordes: una razón, una forma, alguna versión de «esto es sobre mí, no sobre nosotros».' },
      { type: 'paragraph', text: 'Perder el interés no tiene nada de eso. No se anuncia, porque anunciarse exigiría que le importara cómo te afecta el silencio. Las respuestas no son solo más escasas: son más planas. Tus noticias dejan de generar preguntas. La distancia no tiene bordes en absoluto; simplemente se expande.' },
      { type: 'quote', text: 'El espacio dice «espérame». La indiferencia no dice nada en absoluto.', attribution: 'Sobre los dos silencios' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La distinción se basa en la investigación sobre capacidad de respuesta: los miembros de la pareja que están comprometidos mantienen la calidez y las señales de reparación incluso mientras se retiran, mientras que el desapego genuino hace caer ambas cosas. Es un comportamiento que puedes observar, no una energía que tengas que adivinar.' },
    ],
  },
  w02_a3: {
    title: 'El desvanecimiento lento: leer la salida silenciosa',
    subtitle: 'El adiós que nunca dice la palabra',
    blocks: [
      { type: 'paragraph', text: 'El desvanecimiento lento es la salida de quienes no soportan las puertas. En vez de terminar las cosas, dejan que las cosas terminen —respuesta cada vez más corta, plan tras plan pospuesto— esperando que la relación se disuelva con suavidad suficiente para que nadie pueda acusarlos de irse. Es la despedida más común de la era moderna, y la más cruel precisamente porque es negable.' },
      { type: 'paragraph', text: 'La firma de un desvanecimiento es que nunca hay nada mal. Pregunta, y obtendrás «solo ocupado», «todo bien», un emoji de corazón haciendo el trabajo que debería hacer una conversación. Mientras tanto, todo lo medible disminuye: frecuencia, duración, profundidad, iniciativa. Las palabras dicen quédate; los números dicen vete.' },
      { type: 'paragraph', text: 'Si sospechas un desvanecimiento, no audites cada excusa —audita la tendencia. Cada excusa puede ser cierta y el patrón seguir siendo el mensaje. Una persona que quiere estar en tu vida pelea contra el calendario por ti. Una persona que se desvanece deja que el calendario gane, todas las veces.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Evitar el conflicto directo es una de las razones mejor documentadas por las que la gente se retira de forma pasiva en lugar de terminar las cosas limpiamente. El desvanecimiento es una estrategia de evitación del conflicto —reconocerlo te protege de meses de descifrado.' },
    ],
  },
  w02_a4: {
    title: 'Cuando «ocupado» significa otra cosa',
    subtitle: 'La mentira más honesta que dice la gente',
    blocks: [
      { type: 'paragraph', text: '«Ocupado» es real. La vida realmente se llena —el trabajo, la familia, las tormentas privadas de las que la gente no habla. Pero «ocupado» es también el disolvente universal de las relaciones modernas: la palabra que puede disolver cualquier obligación sin que nadie tenga que decir una frase más dura. La pregunta nunca es si alguien está ocupado. Es para qué deja espacio su ocupación.' },
      { type: 'heading', text: 'Ocupado es un ranking, no una agenda' },
      { type: 'paragraph', text: 'Todos los que conoces están ocupados, y todos los que conoces igual encuentran minutos para lo que ponen primero en su lista. El amigo agobiado que igual te manda el meme que le hizo pensar en ti. La persona exhausta que igual llama cuatro minutos desde el coche. La gente ocupada no desaparece de las vidas que atesora: reduce su presencia sin romperla.' },
      { type: 'paragraph', text: 'Así que lee «ocupado» por su residuo. Ocupado-pero-anclado deja migajas: pequeños mensajes, aplazamientos que realmente se cumplen, una disculpa que suena como si costara algo. Ocupado-como-salida no deja nada más que la palabra misma, repetida hasta que dejas de preguntar.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La investigación sobre el uso del tiempo es contundente: la gente encuentra de forma fiable pequeños huecos de tiempo para sus principales prioridades incluso bajo mucha carga. Un «ocupado» sostenido de contacto cero hacia una sola persona es un patrón de elección, no un problema de agenda.' },
    ],
  },
  w02_a5: {
    title: 'La ansiedad del mensaje sin responder',
    subtitle: 'Tres puntos grises y un corazón acelerado',
    blocks: [
      { type: 'paragraph', text: 'Lo enviaste hace horas. Lo has releído once veces —¿fue demasiado, demasiado plano, demasiado ansioso? Lo has visto «en línea» en otro lugar. Un mensaje sin responder de alguien a quien estás apegado es un evento diminuto que el cerebro ansioso infla hasta convertirlo en un veredicto, y para medianoche ya has escrito todo el final en tu cabeza.' },
      { type: 'heading', text: 'Por qué el silencio duele más que un no' },
      { type: 'paragraph', text: 'La mente odia la ambigüedad más de lo que odia las malas noticias. Un no duele pero se puede procesar; el silencio es un vacío que el cerebro llena con su borrador más aterrador. Por eso un solo mensaje sin responder puede doler más que una discusión real —no estás reaccionando a lo que pasó, estás reaccionando a todo lo que podría haber pasado.' },
      { type: 'paragraph', text: 'Aquí está el gesto que estabiliza: juzga el patrón, nunca el mensaje. Una sola respuesta lenta no significa nada —la gente conduce, duerme, se ahoga en su día. Lo que importa es la línea base. Si lo normal en esa persona es la calidez y esta semana hay silencio, anótalo como un solo dato y deja que la semana termine de hablar. Y observa tu propio lado con honestidad: si cada vacío te hace entrar en espiral, parte de lo que estás leyendo es tu sistema de alarma, no su señal.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La intolerancia a la incertidumbre es un motor bien estudiado de la rumiación ansiosa —el silencio ambiguo activa las respuestas de amenaza más rápido que una información negativa clara. Nombrarlo te ayuda a separar su comportamiento de tu alarma.' },
    ],
  },
  w02_a6: {
    title: 'Por qué la gente se retira justo cuando más siente',
    subtitle: 'La retirada que ocurre en el momento exactamente equivocado',
    blocks: [
      { type: 'paragraph', text: 'Es uno de los patrones más extraños del amor: el fin de semana fue perfecto, algo real se abrió, por fin lo sentiste totalmente presente —y entonces desaparece. No dramáticamente. Solo de repente más lejos, justo cuando la cercanía llegó a su punto máximo. Se siente como un rechazo. A menudo es lo contrario.' },
      { type: 'heading', text: 'La cercanía puede sentirse como peligro' },
      { type: 'paragraph', text: 'Para quienes aprendieron temprano que depender de alguien termina mal, la intimidad activa una alarma silenciosa. Cuanto más cerca están las cosas, más fuerte suena —y el sistema nervioso hace lo que fue entrenado para hacer: crear distancia para sentirse seguro de nuevo. Los psicólogos llaman a esto estrategias de desactivación: buscar una pequeña pelea, quedarse callado, de repente «necesitar centrarse en sí mismo» la semana después del mejor momento que han vivido juntos.' },
      { type: 'paragraph', text: 'Esto no hace que el patrón esté bien, y no es tuyo de arreglar. Pero cambia lo que significa la distancia. Alguien que huye de la profundidad de su propio sentir es una historia distinta de alguien que pierde el interés —la señal es que sigue volviendo hacia la misma cercanía de la que huye, en un bucle. Si quieres vivir dentro de ese bucle es una pregunta honesta y aparte.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Las estrategias de desactivación después de momentos de intimidad son un patrón central y bien documentado en la investigación sobre el apego evitativo. El retraimiento sigue de cerca a la propia cercanía —por eso llega en el momento «equivocado» con tanta precisión.' },
    ],
  },
  w02_a7: {
    title: 'Dejar ir a alguien antes de que termine de irse',
    subtitle: 'Tienes permiso para dejar de esperar en la puerta',
    blocks: [
      { type: 'paragraph', text: 'Existe un tipo particular de agotamiento que viene de amar a alguien en cámara lenta —verlo irse por grados mientras sostienes la puerta abierta, diciéndote que la paciencia es lealtad. En algún momento la pregunta más difícil deja de ser «¿se está yendo?» y se convierte en «¿cuánto tiempo estoy dispuesto a quedarme aquí?»' },
      { type: 'paragraph', text: 'Soltar antes de que termine de irse no es darse por vencido con esa persona. Es renunciar al trabajo de ser el único que sostiene la cosa. Dejas de iniciar todo y ves qué se sostiene por sí solo. Dejas de traducir su silencio a idiomas esperanzados. Dejas que la relación pese lo que realmente pesa sin tus manos debajo —y dejas que esa verdad sea información en vez de una emergencia.' },
      { type: 'heading', text: 'Cómo es realmente soltar' },
      { type: 'paragraph', text: 'Rara vez es un único adiós dramático. Son cien pequeñas reconquistas: hacer el plan sin comprobar primero su disponibilidad, dejar un mensaje en espera porque tu tarde estaba llena, notar que pasó toda una tarde sin descifrar a nadie. El duelo llega en visitas, y entre visitas, tu vida vuelve en silencio. Si esa persona se da la vuelta y camina hacia ti, deja que lo haga con sus propias piernas. Y si no lo hace, tú ya estarás en algún lugar más adelante en tu propio camino.' },
      { type: 'quote', text: 'No puedes perder a alguien que ya se estaba yendo. Solo puedes perder el tiempo que pasas esperando.', attribution: 'Sobre soltar' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Los psicólogos describen esto como duelo anticipatorio y desapego —comenzar a procesar una pérdida mientras todavía está en marcha. El desapego deliberado de un vínculo que no responde está sistemáticamente vinculado a la recuperación del bienestar; es respeto propio, no frialdad.' },
    ],
  },

  // ── Semana 3 "Señales mixtas" — días 1–7 (todos artículos nuevos) ───────────
  w03_a1: {
    title: 'Leer señales mixtas sin perder la cabeza',
    subtitle: 'Una guía de supervivencia para la tierra del quizás',
    blocks: [
      { type: 'paragraph', text: 'Las señales mixtas son el tipo de mensaje más costoso: te cuestan horas de descifrado, una auténtica investigación forense del chat grupal, y sueño —y aun así se niegan a resolverse. Un día te escribe primero con tres signos de exclamación; tres días después eres aparentemente un extraño. El latigazo no está en tu cabeza. Pero cómo lo lees decide si te vuelve loco.' },
      { type: 'heading', text: 'La primera regla: deja de leer mensajes, empieza a leer meses' },
      { type: 'paragraph', text: 'Cualquier señal única es ruido. Un martes cálido significa tan poco como un viernes frío —la gente tiene estados de ánimo, resacas, malas noticias de las que nunca te enteras. La contradicción solo se convierte en información cuando se repite. Así que aléjate: no «qué significó ese emoji» sino «qué forma tiene el último mes». Los patrones no pueden esconderse como sí pueden hacerlo los momentos.' },
      { type: 'paragraph', text: 'Segunda regla: una señal mixta sigue siendo una señal. Alguien constantemente inconsistente te está diciendo algo cierto sobre dónde está: sin terminar, en conflicto, o cómodo manteniéndote indefinido. Esta semana separa esas posibilidades, un hilo por día. Para el día siete tendrás una respuesta real en lugar de una suposición.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La investigación sobre el juicio es clara: los humanos sobreinterpretan los eventos aislados y subinterpretan los patrones. Agregar el comportamiento a lo largo del tiempo es el antídoto fiable —estás pasando de anécdotas a datos.' },
    ],
  },
  w03_a2: {
    title: 'Caliente y frío: la psicología de la inconstancia',
    subtitle: 'Por qué la misma persona puede sentirse como dos personas',
    blocks: [
      { type: 'paragraph', text: 'La parte más difícil de lo caliente y frío no es lo frío. Es que lo caliente fue real. No imaginaste la conversación profunda a la 1 de la madrugada, la forma en que te miraba, los planes que esbozó en voz alta. Luego la temperatura bajó, y ahora sostienes dos verdades que se niegan a encajar.' },
      { type: 'heading', text: 'Tres motores de la inconstancia' },
      { type: 'orderedList', items: [
        { title: 'Conflicto', text: 'Realmente lo quiere Y realmente le teme. El calor es el deseo; el frío es el miedo ganando esa semana. Este es una guerra dentro de él, no un juego jugado contra ti.' },
        { title: 'Conveniencia', text: 'Se vuelve cálido cuando necesita algo —atención, consuelo, un refuerzo de ego— y frío cuando no. Observa si la calidez sigue TU vida o SUS necesidades.' },
        { title: 'Circunstancias', text: 'Lo más raro e inocente: su vida es genuinamente caótica, y la inconstancia refleja su calendario, no sus sentimientos. La señal es que la calidad de la calidez nunca cambia —solo la frecuencia.' },
      ] },
      { type: 'paragraph', text: 'Normalmente no puedes saber cuál motor está funcionando a partir de un solo episodio. Pero a lo largo de semanas, cada uno deja una huella diferente —y las preguntas de esta semana están diseñadas para levantar exactamente esas huellas.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El conflicto de aproximación-evitación es uno de los patrones más antiguos y documentados en la psicología de la motivación: la misma meta puede desencadenar tanto deseo como miedo, produciendo exactamente la oscilación que estás viendo.' },
    ],
  },
  w03_a3: {
    title: 'Cuando sus palabras y sus actos no coinciden, cree en los actos',
    subtitle: 'La regla más antigua para leer a la gente, y por qué sigue ganando',
    blocks: [
      { type: 'paragraph', text: 'Las palabras son baratas de producir. Un «te extraño» cuesta tres segundos y cero molestias; se puede escribir desde el sofá, a medias en serio, a tres personas a la vez. Los actos cargan un costo —tiempo, esfuerzo, el elegirte a ti en vez de algo más fácil. Ese costo es exactamente lo que los hace honestos.' },
      { type: 'paragraph', text: 'Así que cuando los dos canales no coinciden, el desacuerdo mismo es el mensaje. Palabras dulces más un comportamiento ausente no es una paradoja por resolver —es una preferencia que se está declarando: le gusta cómo te sientes respecto a él más de lo que está dispuesto a invertir en ti. Invierte esto y la lectura se voltea: palabras torpes más un comportamiento constante y presente es amor que simplemente no es verbal. La boca tropieza; los pies no mienten.' },
      { type: 'quote', text: 'La gente te dice dónde estás parado por dónde se paran ellos — no por lo que dicen desde lejos.', attribution: 'Sobre los dos canales' },
      { type: 'paragraph', text: 'Una advertencia: cree en los actos a lo largo del tiempo, no en un acto bajo presión. Cualquiera puede hacer un gran gesto después de ser confrontado. El canal honesto es el aburrido —lo que hace en un miércoles cualquiera, cuando no hay nada en juego.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La lógica de la señal costosa recorre toda la ciencia del comportamiento: las señales que requieren una inversión real son de forma fiable más honestas que las baratas. Hablar es la señal más barata que existe.' },
    ],
  },
  w03_a4: {
    title: 'El baile del tira y afloja, y por qué engancha',
    subtitle: 'Tu cerebro bajo el efecto del quizás',
    blocks: [
      { type: 'paragraph', text: 'Aquí está la ciencia incómoda: el afecto inconsistente es más cautivador que el afecto estable. No porque estés roto —sino por cómo funcionan los sistemas de recompensa. Una recompensa que llega de forma impredecible activa el circuito de deseo del cerebro mucho más fuerte que una con la que puedes contar. Es el mismo mecanismo que mantiene las manos en las máquinas tragamonedas.' },
      { type: 'heading', text: 'Por qué las migajas se sienten como un festín' },
      { type: 'paragraph', text: 'Cuando la calidez es escasa y aleatoria, cada gota de ella cae con una fuerza desproporcionada. El alivio de ver su nombre en tu pantalla tras cuatro días de silencio puede sentirse más grande que toda una buena semana con alguien estable —el alivio y la alegría se confunden químicamente. Y así, el alejamiento no debilita el apego. Lo aprieta. No estás enamorado de la distancia; estás enganchado al regreso.' },
      { type: 'paragraph', text: 'Nombrar esto hace dos cosas amables. Explica por qué alejarse de una persona inconsistente es mucho más difícil que alejarse de una fría —no eres débil, estás programado así. Y te da la pregunta sobria alrededor de la cual sigue girando esta semana: ¿la intensidad que sientes es realmente conexión, o son las luces de la sala de máquinas de una recompensa intermitente?' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Que el refuerzo intermitente produzca el apego más fuerte y más resistente a la extinción es uno de los hallazgos más replicados en la psicología conductual. La «chispa» del tira y afloja es ese esquema, sentido desde dentro.' },
    ],
  },
  w03_a5: {
    title: '¿Está confundido él, o tú?',
    subtitle: 'La pregunta que nadie quiere hacerle al espejo',
    blocks: [
      { type: 'paragraph', text: 'Antes de que esta semana condene a nadie, un desvío honesto: a veces las señales son estables y la estática es nuestra. Un sistema de apego ansioso es un instrumento sensible —puede leer una respuesta lenta como rechazo, una tarde cansada como frialdad, una necesidad normal de soledad como el principio del fin. La persona nunca cambió de temperatura; nuestra alarma sí.' },
      { type: 'heading', text: 'Una autoauditoría rápida' },
      { type: 'paragraph', text: 'Prueba estas tres preguntas. Uno: ¿un amigo neutral, si viera los hechos crudos del último mes, vería inconsistencia —o solo un humano ordinario y ocupado? Dos: ¿el «frío» siempre coincide con algo en TU semana (estrés, picos de inseguridad, demasiado tiempo para pensar)? Tres: ¿han sido «confusas» también las parejas anteriores —cada una de ellas? Un patrón de síes aquí no significa que nada esté mal. Significa que el instrumento necesita calibrarse antes de que confíes en su lectura.' },
      { type: 'paragraph', text: 'Esto no se trata de culparte —una alarma sensible normalmente se volvió así por buenas razones históricas. Se trata de precisión. Si el ruido es en parte tuyo, ninguna cantidad de descifrarlo A ÉL lo silenciará. Y si la auditoría sale limpia —la inconsistencia sobrevive incluso a una lectura neutral— entonces puedes confiar plenamente en el resto del veredicto de esta semana.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La investigación sobre el apego muestra que la activación ansiosa sesga la percepción: el comportamiento ambiguo de la pareja se lee como amenaza significativamente más a menudo. Revisar el instrumento es un paso legítimo al leer la señal.' },
    ],
  },
  w03_a6: {
    title: 'La comodidad de la ambigüedad (y por qué la gente se esconde ahí)',
    subtitle: 'Algunas personas viven en el gris a propósito',
    blocks: [
      { type: 'paragraph', text: 'No todas las señales mixtas vienen de la confusión. Algunas vienen de una estrategia —consciente o semiconsciente. La ambigüedad es un lugar notablemente cómodo para mantener a otra persona: toda la calidez, ninguna de las obligaciones. No se puede terminar con cosas indefinidas. No se puede traicionar cosas jamás prometidas.' },
      { type: 'heading', text: 'Los beneficios del gris (para él)' },
      { type: 'paragraph', text: 'Una persona estacionada en la ambigüedad conserva tu atención, tu cariño y tu disponibilidad sin pagar el precio de ninguna de ellas. Disfruta ser adorada sin tener que rendir cuentas. La señal es lo que pasa cuando buscas definición: el tema cambia, se despliega el humor, «para qué necesitamos etiquetas» llega puntual —y luego, si te retiras, una ráfaga de calidez te arrastra de vuelta exactamente al lugar indefinido que intentabas dejar.' },
      { type: 'paragraph', text: 'Entiende esto con claridad: alguien puede genuinamente apreciarte y aun así hacer esto. Que le gustes nunca fue la pregunta. La pregunta es si quiere el papel o solo el acceso —y el gris existe precisamente para que esa pregunta nunca tenga que responderse. A veces la señal más profunda en la mezcla es la negativa a desmezclarla.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Mantener a las parejas en patrones de espera de bajo compromiso mientras se conserva su inversión está bien documentado en la investigación de relaciones sobre la asimetría del compromiso. La ambigüedad es la estrategia, no el accidente.' },
    ],
  },
  w03_a7: {
    title: 'Cómo pedir claridad sin espantarla',
    subtitle: 'Una conversación honesta vale más que otro mes de descifrado',
    blocks: [
      { type: 'paragraph', text: 'Después de seis días leyendo señales, aquí está la verdad liberadora: tienes permiso para dejar de descifrar y simplemente preguntar. La fantasía de que el análisis «correcto» descifrará el código te mantiene en el archivo durante meses. Una conversación clara recupera en cinco minutos lo que el descifrado no puede recuperar en toda una temporada.' },
      { type: 'heading', text: 'Cómo preguntar sin tender una emboscada' },
      { type: 'paragraph', text: 'Mantenla pequeña, tranquila, y sobre ti —no un juicio sobre él. Algo como: «Me gusta lo que es esto, y he notado que estoy confundido sobre hacia dónde va. Prefiero preguntar en vez de adivinar: ¿cómo nos ves?» Sin acusación de la que defenderse, sin ultimátum contra el cual rebelarse. Solo una puerta, abierta una vez, a plena luz del día. Luego —y esta es la disciplina— deja que la respuesta sea la respuesta. Incluso una vaga.' },
      { type: 'paragraph', text: 'Porque aquí está el último descifrado de la semana: una persona que te quiere responde esa pregunta con alivio. La claridad no le cuesta nada —esperaba que preguntaras. Una persona que lo esquiva, lo bromea, o te hace sentir dramático por preguntar, también ha respondido. «No sé» ES una respuesta. La vaguedad como respuesta a una pregunta directa y amable es el gris eligiéndose a sí mismo —y ahora por fin lo sabes, lo cual significa que eres libre.' },
      { type: 'quote', text: 'Pediste claridad. Lo que sea que haya vuelto —incluso la niebla— fue la claridad.', attribution: 'Sobre el último descifrado' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La divulgación relacional directa y de baja amenaza supera de forma fiable las pruebas indirectas de señales para resolver la incertidumbre —y las respuestas a las peticiones de definición son en sí mismas altamente diagnósticas del compromiso.' },
    ],
  },

  // ── Semana 4 "Lo que se siente como un hogar" — días 1–7 (todos nuevos) ────
  w04_a1: {
    title: 'Por qué algunas personas se sienten como un hogar',
    subtitle: 'La fisiología de por fin relajarte junto a alguien',
    blocks: [
      { type: 'paragraph', text: 'Lo sabes en el momento en que ocurre, aunque nunca hayas tenido palabras para ello: con ciertas personas, algo en tu cuerpo baja la guardia. Los hombros se relajan. La voz que usas deja de estar cuidada. Dices el pensamiento a medio formar en vez de la versión pulida. No son fuegos artificiales —es lo contrario. Es la sensación rara, casi física, de estar por fin fuera de servicio.' },
      { type: 'heading', text: 'El hogar es un veredicto del sistema nervioso' },
      { type: 'paragraph', text: 'Ese sentimiento no es poesía; es biología. Tu sistema nervioso está escaneando constantemente a cada persona con la que estás para responder una sola pregunta —¿estoy a salvo aquí?— y con la mayoría de la gente la respuesta se queda en «más o menos». Las personas que se sienten como un hogar son aquellas con las que el escaneo se completa en silencio y se apaga. Lo que queda, una vez que la vigilancia deja de gastar tu energía, es la calidez que has estado llamando «cómoda».' },
      { type: 'paragraph', text: 'Por eso las personas que se sienten como hogar son más raras que las personas emocionantes. La emoción puede producirse con novedad, belleza, imprevisibilidad —barata y en todas partes. La seguridad solo puede producirse con constancia a lo largo del tiempo: presentarse de la misma manera, cumplir pequeñas promesas, seguir siendo amable cuando sería fácil no serlo. Esta semana se trata de aprender a leer esa diferencia —porque una de ellas es un estado de ánimo, y la otra es un lugar donde se puede vivir.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La sensación de seguridad con personas específicas refleja una corregulación real: los sistemas nerviosos se calibran con parejas fiables, reduciendo la vigilancia. «Sentirse como un hogar» es un estado medible, no una metáfora.' },
    ],
  },
  w04_a2: {
    title: 'El tipo de amor silencioso del que nadie publica',
    subtitle: 'Las mejores relaciones salen fatal en foto',
    blocks: [
      { type: 'paragraph', text: 'Los amores que dominan los feeds son los ruidosos —reencuentros en el aeropuerto, viajes sorpresa, párrafos por aniversarios. Y son hermosos. Pero hay toda una categoría de amor que nunca llega a internet porque no produce contenido: el té preparado sin que lo pidas, el silencio cómodo en vez de tenso, la persona que notó que algo andaba mal antes de que dijeras una palabra.' },
      { type: 'paragraph', text: 'Este amor es invisible casi por definición. Vive en la prevención —las peleas que nunca ocurrieron porque alguien eligió la suavidad, las ansiedades que nunca se dispararon porque alguien fue confiable. No puedes fotografiar la tormenta que no llegó. Así que los amantes silenciosos deslizan el dedo sobre los ruidosos y a veces se preguntan si se están perdiendo algo. Normalmente es al revés.' },
      { type: 'quote', text: 'El amor más ruidoso pide ser presenciado. El más silencioso solo te mantiene abrigado.', attribution: 'Sobre la devoción no publicada' },
      { type: 'paragraph', text: 'Nada de esto hace falso al amor ruidoso —la celebración también es real. Pero si estás midiendo lo que tienes contra lo que la gente publica, estás comparando tu infraestructura con los fuegos artificiales de otra persona. Solo una de esas dos cosas sostiene un techo.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La investigación sobre relaciones encuentra de forma constante que la capacidad de respuesta cotidiana —actos pequeños y frecuentes de atención y cuidado— predice la satisfacción y la longevidad mucho mejor que los grandes gestos o las demostraciones públicas.' },
    ],
  },
  w04_a3: {
    title: 'Seguro contra emocionante: el amor que elegimos contra el amor que necesitamos',
    subtitle: 'El tira y afloja más antiguo del corazón',
    blocks: [
      { type: 'paragraph', text: 'Casi todo el mundo, en algún momento, está de pie entre dos puertas. Detrás de una: la persona que te acelera el pulso —impredecible, magnética, un poco fuera de alcance. Detrás de la otra: la persona que te calma la respiración —estable, presente, totalmente a tu alcance. Y casi todo el mundo se sorprende al descubrir hacia qué puerta siguen caminando sus pies.' },
      { type: 'heading', text: 'Por qué la atracción y el bienestar son sistemas diferentes' },
      { type: 'paragraph', text: 'La atracción y el apego funcionan con circuitos diferentes. El pico —dopamina, novedad, persecución— es el sistema del deseo, y es más ruidoso precisamente cuando el resultado es incierto. La calma —oxitocina, confianza, familiaridad— es el sistema de vinculación, y solo crece donde ya existe seguridad. La broma cruel es que el sistema del deseo grita y el sistema de vinculación susurra, así que la persona emocionante siempre suena como la respuesta, incluso cuando no lo es.' },
      { type: 'paragraph', text: 'El gesto maduro no es elegir el aburrimiento sobre la pasión —ese es un menú falso. Es aprender que las conexiones más fuertes tienen ambas cosas, en el orden correcto: la seguridad como base, la chispa como lo que construyes encima de ella. Chispa sobre seguridad es una chimenea. Chispa sin seguridad es solo un incendio.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El deseo y el apego implican sistemas motivacionales distintos —el deseo impulsado por la novedad frente a la vinculación impulsada por la seguridad. La incertidumbre amplifica el primero y hambrea el segundo, por lo que la opción «emocionante» a menudo suena más fuerte de lo buena que realmente es.' },
    ],
  },
  w04_a4: {
    title: 'Cómo se siente en realidad una relación tranquila',
    subtitle: 'Una guía de campo, para quienes solo han conocido tormentas',
    blocks: [
      { type: 'paragraph', text: 'Si tu historia ha sido tormentosa, un amor tranquilo resulta genuinamente desorientador —no tienes ninguna referencia para ello. Así que aquí está la guía de campo. Una relación tranquila se siente como: responder con honestidad sin ensayar primero. No estar de acuerdo sin comprobar las salidas. Un teléfono que puede quedarse boca arriba sobre la mesa. Planes que se mantienen. La ausencia de ese temor bajo y ambiental que dejaste de notar porque siempre estuvo ahí.' },
      { type: 'paragraph', text: 'Lo que la calma no es: plana. Una relación tranquila igual tiene risas que se salen de control, deseo real, conversaciones difíciles, malos días. La diferencia está en el suelo. En el amor tormentoso, cada conflicto amenaza los cimientos —peleas por los platos y de alguna manera la relación misma está en juego. En el amor tranquilo, los cimientos nunca están en juego. Puedes permitirte una honestidad total porque la honestidad no te costará todo.' },
      { type: 'paragraph', text: 'Las personas criadas en el caos a menudo confunden este suelo con un techo —como si la seguridad significara que aquí no puede pasar nada intenso. Es lo contrario. El suelo es lo que hace que la intensidad sea sobrevivible. Solo puedes llegar realmente a lo profundo con alguien cuando no estás simultáneamente vigilando la puerta.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Los vínculos seguros funcionan como una base: la seguridad percibida amplía la honestidad, la exploración y la profundidad emocional en lugar de aplanarlas. La calma es la condición que habilita la intensidad, no su ausencia.' },
    ],
  },
  w04_a5: {
    title: 'La diferencia entre química y compatibilidad',
    subtitle: 'Una te deja entrar por la puerta. La otra decide si puedes vivir ahí.',
    blocks: [
      { type: 'paragraph', text: 'La química es instantánea e inconfundible: la conversación que ignora el reloj, la gravedad en una sala, la sensación de estar enchufado a una toma de corriente. La compatibilidad es más lenta y silenciosa: cómo manejan ambos el dinero, el silencio, el estrés, a su madre, tu mala semana. La química se descubre en una noche. La compatibilidad se descubre en cien noches ordinarias.' },
      { type: 'heading', text: 'Dónde aparece cada una' },
      { type: 'orderedList', items: [
        { title: 'La química vive en los momentos destacados', text: 'Las citas, las bromas, la atracción, el tirón. Responde: ¿nos encendemos?' },
        { title: 'La compatibilidad vive en la logística', text: 'El estilo de conflicto, los valores, los ritmos, la reparación. Responde: ¿funcionamos?' },
        { title: 'La trampa', text: 'Una química fuerte se confunde con la respuesta completa —así que la gente sigue reprobando el encendido mientras el motor falla en silencio.' },
      ] },
      { type: 'paragraph', text: 'Necesitas una cantidad real de ambas; esto no es un sermón contra el deseo. Pero fallan de manera diferente. La falta de química se siente como un buen compañero de piso. La falta de compatibilidad se siente como una hermosa guerra. Y solo uno de esos fracasos a veces puede crecer —la atracción puede profundizarse donde viven el respeto y la seguridad, pero la compatibilidad casi nunca surge del fuego puro.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La investigación longitudinal sobre relaciones es contundente: la pasión inicial predice poco sobre los resultados a largo plazo, mientras que el estilo de conflicto, los valores compartidos y la capacidad de respuesta diaria predicen mucho.' },
    ],
  },
  w04_a6: {
    title: 'Cuando la paz se siente aburrida porque estás acostumbrado al caos',
    subtitle: 'Tu calibración, no tu brújula',
    blocks: [
      { type: 'paragraph', text: 'Aquí está uno de los fallos más silenciosamente devastadores del corazón humano: si creciste con —o fuiste entrenado por— un amor caótico, tu cuerpo aprendió que el amor SE SIENTE como adrenalina. Vigilancia, anhelo, reparación, alivio, repetir. Así que cuando finalmente llega alguien estable, el sistema de alarma no encuentra nada que hacer… y reporta eso como «sin sentimientos». La paz se archiva como aburrimiento. La seguridad se lee como ausencia de amor, porque el amor nunca fue seguro antes.' },
      { type: 'heading', text: '¿Aburrimiento o desconocido? La prueba' },
      { type: 'paragraph', text: 'Pregúntate qué es exactamente lo que falta. Si es la persona misma —su mente no te interesa, su tacto no hace nada, no respetas quién es— eso es incompatibilidad real, y ninguna cantidad de sanación la inventará. Pero si lo que falta es el DOLOR —la ansiedad, la persecución, el no-saber— entonces no falta nada en la relación. Falta algo en el patrón que tu sistema nervioso llama amor. Esos son diagnósticos profundamente diferentes con curas profundamente diferentes.' },
      { type: 'paragraph', text: 'Dale tiempo a la calma para dejar de sentirse extraña. La adicción a la emoción se desvanece como cualquier calibración, normalmente en meses, no en días —y al otro lado, mucha gente descubre que la persona estable no carecía de profundidad en absoluto. La profundidad solo era silenciosa, y nunca habían estado lo bastante quietos como para escucharla.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Los sistemas nerviosos normalizan lo que sea que repitan: los vínculos caóticos entrenan la activación para que signifique apego, así que las parejas seguras se registran inicialmente como planas. El etiquetado erróneo de la seguridad como aburrimiento es un efecto de recalibración documentado, y es reversible.' },
    ],
  },
  w04_a7: {
    title: 'Construir un hogar con una persona',
    subtitle: 'El hogar no se encuentra. Se construye, a diario, entre dos personas.',
    blocks: [
      { type: 'paragraph', text: 'El mito del alma gemela dice que el hogar es una persona que se encuentra —ya construida, lista para mudarse, en algún lugar por ahí. La verdad es menos romántica y mucho más esperanzadora: el hogar es algo que dos personas construyen, ladrillo a ladrillo sin brillo, a partir de promesas cumplidas, rupturas reparadas, y mil pequeñas elecciones de volverse el uno hacia el otro en vez de alejarse.' },
      { type: 'heading', text: 'Los materiales de construcción' },
      { type: 'paragraph', text: 'Fiabilidad: hacer la pequeña cosa que dijiste, otra vez, hasta que tu palabra se vuelva portante. Reparación: volver después de la pelea —las parejas que duran no son las que nunca se rompen, son las que siempre regresan. Testigo: conocer los días, nombres, temores del otro; ser la persona que sostiene el contexto de una vida. Santuario: ser de forma fiable más suave el uno con el otro de lo que fue el mundo durante todo el día. Ninguna de estas es una chispa. Todas son muros.' },
      { type: 'paragraph', text: 'Este replanteamiento cambia la pregunta alrededor de la cual ha girado esta semana. No solo «¿se siente como un hogar?» sino «¿estamos ambos poniendo ladrillos?» Porque una persona que se siente como un hogar pero nunca construye es un hermoso campamento. Y una persona que construye contigo, de manera constante, incluso sin fuegos artificiales cada noche —eso no es conformarse. Eso es arquitectura.' },
      { type: 'quote', text: 'Los fuegos artificiales iluminan el cielo por un minuto. Los ladrillos sostienen un techo toda una vida.', attribution: 'Sobre la construcción' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La investigación sobre vínculos a largo plazo converge en los mismos constructores: fiabilidad, reparación tras el conflicto, y el volverse hacia el otro cada día. El «hogar» duradero es conductual y acumulativo —se construye, no se encuentra.' },
    ],
  },

  // ── Semana 5 "Relaciones difusas" — días 1–7 (todos artículos nuevos) ──────
  w05_a1: {
    title: 'El decodificador de la relación difusa',
    subtitle: '¿Una relación en todo menos el nombre — o en nada salvo la esperanza?',
    blocks: [
      { type: 'paragraph', text: 'Una relación difusa es lo que pasa cuando dos personas actúan como pareja sin haber acordado serlo. Hay intimidad, rutina, a veces meses de historia —y un silencio extraño y portante alrededor de la palabra «nosotros». La confusión no es un defecto tuyo. Es todo el diseño: una cosa indefinida no puede decepcionarte como sí puede una definida, que es exactamente por qué algunas personas prefieren dejarla indefinida.' },
      { type: 'heading', text: 'Los dos tipos de indefinido' },
      { type: 'paragraph', text: 'Está la relación difusa que es indefinida porque es TEMPRANA — dos personas que genuinamente todavía están descubriendo, avanzando hacia algo, solo que aún no llegan. Y está la relación difusa que es indefinida porque permanecer indefinida es el objetivo —una o ambas personas obtienen los beneficios de una relación mientras esquivan su riesgo. Desde dentro, en cualquier martes cualquiera, pueden sentirse idénticas. La diferencia solo aparece con el tiempo, en la dirección.' },
      { type: 'paragraph', text: 'Así que esta semana no pregunta «¿somos oficiales?» Hace una pregunta mejor: ¿hacia dónde se está MOVIENDO esta cosa? ¿Hacia más definición, más integración, más futuro —o en un círculo cómodo que nunca llega a ningún lado? Para el viernes podrás distinguir entre las dos, que es precisamente lo único que una relación difusa está diseñada para impedirte hacer.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La ambigüedad en sí misma reduce el riesgo percibido y la rendición de cuentas —por eso la etapa de la relación importa menos que su trayectoria. La dirección a lo largo del tiempo es la señal fiable que un estatus indefinido está diseñado para ocultar.' },
    ],
  },
  w05_a2: {
    title: 'Las casi-relaciones y el arte de no nombrar las cosas',
    subtitle: 'Por qué se evita tan cuidadosamente la palabra «nosotros»',
    blocks: [
      { type: 'paragraph', text: 'Nombrar algo lo hace real. Eso no es solo poesía —es por qué algunas personas se esfuerzan de manera notable en evitar el nombramiento. Una vez que lo llamas relación, se le pegan expectativas: exclusividad, esfuerzo, el derecho a decepcionarse. Algunas personas evitan la palabra no porque estén inseguras de sus sentimientos, sino porque están muy seguras de que no quieren las obligaciones que trae la palabra.' },
      { type: 'paragraph', text: 'Observa cómo se mantiene el no-nombramiento. El giro sutil cuando una conversación deriva hacia «qué somos». Las presentaciones que se quedan vagas —«este es [nombre]», nunca un título. La forma en que los planes existen pero solo a corto plazo. Nada de esto es accidental. Cada giro es un pequeño acto de mantener la puerta entreabierta, mantener las opciones abiertas, mantenerte presente pero sin promesas.' },
      { type: 'quote', text: 'Una cosa que se niega a ser nombrada a menudo te está diciendo su nombre al negarse.', attribution: 'Sobre el no-nombramiento' },
      { type: 'paragraph', text: 'Una cláusula de justicia: al principio, algunas personas evitan las etiquetas por cuidado genuino —no quieren apresurar algo bueno hacia una caja prematura. La señal es si la evitación se RESUELVE. La cautela saludable con las etiquetas tiene un horizonte; se alivia a medida que se construye la confianza. El no-nombramiento estratégico nunca se resuelve, porque la resolución nunca fue el objetivo.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Definir una relación activa las normas de compromiso y rendición de cuentas. La evitación persistente y activa de la definición —frente a la cautela temprana que se resuelve— es un marcador documentado de baja intención de compromiso.' },
    ],
  },
  w05_a3: {
    title: 'Por qué «solo estamos viendo hacia dónde va» normalmente no va a ningún lado',
    subtitle: 'La frase más cómoda de las citas modernas',
    blocks: [
      { type: 'paragraph', text: '«Solo veamos hacia dónde va» suena abierto, relajado, hasta sabio —¿por qué forzarlo? Pero escucha la gramática. Pone la relación en voz pasiva, como si fuera un clima que podría pasarles a ambos en lugar de algo que dos personas dirigen. Y las cosas que se dejan «ver hacia dónde van» tienen una fuerte tendencia a ir exactamente hacia donde ya están.' },
      { type: 'heading', text: 'La deriva no es una dirección' },
      { type: 'paragraph', text: 'Las relaciones que se profundizan lo hacen porque alguien elige profundizarlas —hace el plan, tiene la conversación, toma el pequeño riesgo de querer en voz alta. «Ver hacia dónde va» suele ser una forma educada de negarse a tomar esas decisiones mientras aún disfruta de los resultados. No es neutral. Es una decisión de no-decidir, disfrazada de despreocupación.' },
      { type: 'paragraph', text: 'Aquí está la prueba que lo resuelve: ¿ha llegado realmente a algún lado? Compara la cosa hoy con la cosa de hace tres meses. ¿Más definida, más entretejida en la vida real de cada uno, más futuro en la conversación? Entonces genuinamente va hacia algún lado. ¿Exactamente igual, solo más vieja? Entonces «ver hacia dónde va» nunca fue un viaje —era un lugar de estacionamiento con una linda vista.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La escalada de una relación es impulsada por comportamientos de inversión deliberados, no por el tiempo pasivo. Sin profundización activa, las conexiones tienden a estancarse en su nivel actual —la «deriva» preserva de forma fiable el estatus quo en lugar de hacerlo avanzar.' },
    ],
  },
  w05_a4: {
    title: 'El costo de quedarse indefinido',
    subtitle: 'La factura del gris cómodo vence — en silencio',
    blocks: [
      { type: 'paragraph', text: 'Las relaciones difusas se sienten de bajo costo porque los gastos más grandes están ocultos. No hay ruptura que sobrevivir, ni título que defender —así que parece que estás obteniendo conexión con descuento. Pero el precio real se cobra en otro lugar, en una moneda que no notas que sale de tu cuenta hasta que se ha ido mucho: tiempo, oportunidad, y confianza en ti mismo.' },
      { type: 'heading', text: 'Lo que realmente pagas' },
      { type: 'orderedList', items: [
        { title: 'Tiempo', text: 'Meses, a veces años, de la mejor energía emocional vertida en algo estructuralmente incapaz de crecer. Ese tiempo no vuelve.' },
        { title: 'Oportunidad', text: 'Las personas que no conociste, que no dejaste entrar, porque estabas emocionalmente ocupado por un casi. La disponibilidad gastada no es disponibilidad ahorrada.' },
        { title: 'Confianza en ti mismo', text: 'La erosión lenta de conocer tu propio valor, porque seguiste aceptando menos de lo que querías y lo llamaste estar tranquilo. Esa es la que más cuesta reconstruir.' },
      ] },
      { type: 'paragraph', text: 'Lo indefinido se comercializa a sí mismo como libertad —sin ataduras, sin presión. Pero míralo de cerca y a menudo es el arreglo menos libre de todos: estás apegado, no estás disponible para otros, y no obtienes nada de la seguridad que se supone viene con el apego. Eso no es libertad. Es pagar el precio emocional completo por un producto emocional parcial.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Las relaciones ambiguas prolongadas están sistemáticamente vinculadas a un menor bienestar y mayor angustia que el compromiso claro o la soltería clara —la incertidumbre misma, y el costo de oportunidad que oculta, son el mecanismo.' },
    ],
  },
  w05_a5: {
    title: 'Migajas: reconocer el mínimo indispensable',
    subtitle: 'Cuando lo justo y necesario está diseñado para mantenerte ahí',
    blocks: [
      { type: 'paragraph', text: 'Dar migajas es el arte de darle a alguien lo justo para quedarse, y nunca lo suficiente para llegar. Un mensaje justo cuando estás a punto de rendirte. Un arrebato de calidez que reinicia el reloj. Contacto suficiente para mantener viva la esperanza, calibrado —consciente o no— para nunca cruzar hacia un compromiso real. Si alguna vez te has sentido hambriento dentro de algo que técnicamente «existe», has comido migajas.' },
      { type: 'heading', text: 'El patrón de la migaja' },
      { type: 'paragraph', text: 'La firma es el momento. Las migajas no llegan cuando estás feliz y seguro, sino precisamente cuando te estás alejando. El sistema tiene un sensor para tu salida, y despliega justo la calidez suficiente para arrastrarte de vuelta al mismo punto de hambre. Nota: después de la migaja, ¿algo realmente cambia? ¿O tienes un buen día y luego resbalas directo de nuevo a la sequía? Una conexión real te alimenta. Una operación de migajas te gestiona.' },
      { type: 'paragraph', text: 'La parte más cruel es lo que le hace a tu calibración. Hambrea a una persona el tiempo suficiente y una migaja se siente como un festín —te vuelves agradecido por sobras que te habrían insultado al principio. Si estás celebrando que te respondan un mensaje como si fuera un hito, da un paso atrás y pregúntate qué era realmente el hito. El mínimo indispensable nunca debería sentirse como un regalo.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El refuerzo mínimo intermitente —pequeñas recompensas cronometradas para evitar la salida— produce un apego fuerte y persistente mientras suprime la escalada. El momento de la migaja alrededor de tu retirada es su huella diagnóstica.' },
    ],
  },
  w05_a6: {
    title: 'Cuando eres un relleno y no lo sabes',
    subtitle: 'El papel para el que te eligieron sin audición',
    blocks: [
      { type: 'paragraph', text: 'Algunas relaciones difusas no son indefinidas porque alguien esté asustado o sea lento. Son indefinidas porque estás ocupando un lugar —haciéndole compañía a alguien, satisfaciendo sus necesidades, llenando el vacío— hasta que llegue la persona que realmente está esperando, o hasta que llegue algo «mejor». Lo difícil es que a los rellenos a menudo se les trata con calidez. La calidez es lo que mantiene al relleno en su lugar.' },
      { type: 'heading', text: 'Las señales de que estás ocupando un asiento' },
      { type: 'paragraph', text: 'Existes en su vida privada pero no en la pública —sin amigos, sin familia, sin publicaciones, sin tiempo futuro. Los planes siempre tienen un horizonte corto; cualquier cosa más allá de unas semanas se vuelve vaga. Hay una ex que nunca está del todo cerrada, o un «algún día cuando las cosas sean diferentes». Y cuando presionas hacia más, la respuesta nunca es no —es «todavía no», un todavía-no sin ninguna condición que algún día lo convierta en sí. No te están rechazando. Te están reservando.' },
      { type: 'paragraph', text: 'Esto es doloroso precisamente porque los sentimientos pueden ser reales de su lado —los rellenos a menudo reciben afecto genuino. Pero el afecto no es la pregunta. La pregunta es si eres el destino o la sala de espera. Y una sala de espera, por cómoda que sea, es un lugar que la gente tiene intención de dejar.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Ser mantenido como un «respaldo» de baja inversión mientras una pareja conserva opciones de mayor valor está documentado en la investigación sobre alternativas de relación. La exclusión pública más el «todavía no» perpetuo es la firma conductual.' },
    ],
  },
  w05_a7: {
    title: 'Cómo definir la cosa sin acabar con ella',
    subtitle: 'La conversación que has estado evitando es la que te libera',
    blocks: [
      { type: 'paragraph', text: 'El gran miedo que mantiene vivas a las relaciones difusas: si pregunto qué es esto, lo arruinaré. Así que no preguntas, y el no-preguntar se convierte en su propia ruina lenta. Aquí está el replanteamiento —la conversación de definir la relación no acaba con las cosas buenas. Acaba con las cosas INCIERTAS, lo cual es una gracia en ambos casos: o ganas una relación real o dejas de verterte en un espejismo.' },
      { type: 'heading', text: 'Cómo tenerla limpiamente' },
      { type: 'paragraph', text: 'Sin ultimátum, sin emboscada, sin mensaje de tres páginas. Elige un momento tranquilo y habla desde tu propio lado: «Esto realmente me ha gustado, y me he dado cuenta de que quiero algo con un poco más de claridad. No estoy tratando de atraparte —solo quiero saber si vamos hacia lo mismo.» Luego sostén el silencio y déjalo responder. Las palabras exactas importan menos que la disciplina que sigue: tienes que realmente ESCUCHAR la respuesta, incluidas las que no quieres.' },
      { type: 'paragraph', text: 'Porque cada respuesta es un regalo de información. Alivio y un sí —hermoso, estabas construyendo algo real. Pánico, evasión, «por qué tenemos que etiquetarlo» —eso también es una respuesta, solo que más silenciosa. Y un «todavía no» sin condiciones es la respuesta más clara de todas. No arruinaste nada al preguntar. Solo descubriste en qué estabas realmente —que es el único terreno lo bastante sólido para sostenerte.' },
      { type: 'quote', text: 'La conversación no mata las cosas reales. Solo mata las que nunca estuvieron vivas.', attribution: 'Sobre definirla' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Las conversaciones de definición directa resuelven la incertidumbre de forma mucho más fiable que la lectura continua de señales, y la respuesta a una petición de claridad calmada y no coercitiva es en sí misma uno de los indicadores de compromiso más fuertes disponibles.' },
    ],
  },

  // ── Semana 6 "Tu valor en el amor" — días 1–7 (todos artículos nuevos) ─────
  w06_a1: {
    title: 'Conocer tu valor cuando lo deseas de todos modos',
    subtitle: 'La autoestima es fácil en teoría y difícil a las 2 de la madrugada',
    blocks: [
      { type: 'paragraph', text: 'Todo el mundo está de acuerdo en que deberías conocer tu valor. Cabe en una taza. El problema es que la autoestima no se pone a prueba cuando estás tranquilo, soltero y leyendo afirmaciones —se pone a prueba a las 2 de la madrugada, cuando alguien que te trata con descuido por fin te responde, y todos los principios que sostenías se evaporan en el cálido torrente de su atención. Un valor que solo puedes sentir cuando es fácil no es valor. Es un estado de ánimo.' },
      { type: 'heading', text: 'El valor es lo que sobrevive al deseo' },
      { type: 'paragraph', text: 'La autoestima real no es la ausencia de anhelo. Puedes doler por alguien y aun así mantener tus estándares —de hecho, ese es el único lugar donde los estándares significan algo. La pregunta de esta semana no es «¿conoces tu valor?» Es la más difícil: ¿tu valor se sostiene CUANDO lo deseas? ¿O el deseo reescribe silenciosamente las reglas cada vez?' },
      { type: 'paragraph', text: 'Esta semana no se trata de fingir que no necesitas a nadie. Se trata de notar el momento exacto en que el deseo empieza a negociar tu valor a la baja —donde «merezco constancia» se convierte en «bueno, es que él es malo para escribir mensajes», donde un límite se convierte en una sugerencia y luego en un recuerdo. Ese momento se puede encontrar. Y una vez que puedes verlo, puedes dejar de sorprenderte por él.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Los investigadores de la autoestima distinguen entre autoestima estable y autoestima contingente —esta última sube y baja con la aprobación de los demás. Los estándares que colapsan bajo el deseo son una señal de que el valor se está obteniendo externamente, lo cual es tanto común como modificable.' },
    ],
  },
  w06_a2: {
    title: 'Los estándares que abandonas cuando te gusta alguien',
    subtitle: 'La renegociación silenciosa que nadie nota que está haciendo',
    blocks: [
      { type: 'paragraph', text: 'Pregúntale a cualquiera sus estándares y los enumerará con claridad: honestidad, constancia, esfuerzo, respeto. Observa a esa misma persona enamorarse de alguien que no tiene nada de eso, y la lista realiza un truco de magia silencioso. No desaparece —eso sería demasiado obvio. Se dobla. Cada requisito obtiene una excepción personalizada, hecha a medida precisamente para la persona que no lo cumple.' },
      { type: 'heading', text: 'Cómo suena el doblez' },
      { type: 'paragraph', text: '«Necesito a alguien emocionalmente disponible» se convierte en «solo está reservado por su pasado». «No seré el secreto de nadie» se convierte en «es reservado, no es personal». «Necesito constancia» se convierte en «está pasando por mucho ahora mismo». Cada una de estas PODRÍA ser cierta. Eso es lo que hace que el truco funcione —las excepciones siempre son plausibles. Pero apílalas y surge un patrón: los estándares no se doblan para todos. Se doblan para las personas que deseas, en proporción exacta a cuánto las deseas.' },
      { type: 'quote', text: 'Un estándar que tiene una excepción para cada persona que deseas nunca fue un estándar. Era un deseo.', attribution: 'Sobre el doblez' },
      { type: 'paragraph', text: 'La solución no es volverse rígido o frío. Es atrapar la renegociación en tiempo real —notar la frase exacta donde empiezas a defender el fracaso de alguien en cumplir una barra que pusiste por buenas razones. Tienes permiso para mantener un estándar Y tener compasión por las razones por las que alguien no lo alcanza. La compasión por él no requiere abandonarlo por ti.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El razonamiento motivado está bien documentado: generamos justificaciones plausibles para lo que ya queremos. Los estándares se erosionan no por una decisión sino por una serie de excepciones que suenan razonables individualmente.' },
    ],
  },
  w06_a3: {
    title: 'Por qué das de más a quienes dan de menos',
    subtitle: 'La cuenta que nunca cuadra, y por qué la sigues haciendo',
    blocks: [
      { type: 'paragraph', text: 'Hay un patrón específico y agotador: cuanto menos te da alguien, más le das tú. Sobreexplicas, sobreacomodas, sobrefuncionas —volcando esfuerzo exactamente en las personas que menos te devuelven. Se siente como generosidad. A menudo es otra cosa vestida con la ropa de la generosidad: un intento de ganar un amor que se te está negando.' },
      { type: 'heading', text: 'La negación crea la persecución' },
      { type: 'paragraph', text: 'Cuando alguien da libremente, te relajas —no hay nada que ganar, así que dejas de actuar. Cuando alguien da con moderación, se activa un circuito diferente: su escasez se lee como un rompecabezas que puedes resolver con suficiente esfuerzo. Si solo doy MÁS —más comprensión, más paciencia, más de mí— seguramente al final me devolverá algo. Así que aumentas tu inversión en respuesta a la disminución de la suya, lo cual está exactamente al revés, y es exactamente lo que mantiene vivo el desequilibrio.' },
      { type: 'paragraph', text: 'Nota la señal: tu esfuerzo tiende a dispararse justo después de que él se retira, no después de que aparece. Dar sano responde a la presencia —viertes en la gente que vierte en ti. Dar de más compensatorio responde a la ausencia —viertes con más fuerza en el vacío, esperando llenarlo. Lo primero construye relaciones. Lo segundo construye resentimiento con una sonrisa encima.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Un esfuerzo que aumenta en respuesta a la retirada de una pareja refleja una inversión compensatoria —intentar restaurar un vínculo a través de un sobrefuncionamiento unilateral. Esto profundiza de forma fiable el desequilibrio en lugar de corregirlo.' },
    ],
  },
  w06_a4: {
    title: 'Generosidad ansiosa: el amor como moneda de cambio',
    subtitle: 'Cuando dar es en realidad pedir',
    blocks: [
      { type: 'paragraph', text: 'Algo de generosidad es pura —das porque dar es alegría, sin factura adjunta. Y algo de generosidad es ansiosa —das como un anticipo sobre la seguridad, una forma de comprar la garantía de que no te dejarán. Desde fuera, se ven idénticas. Desde dentro, solo una de las dos te deja llevando la cuenta.' },
      { type: 'heading', text: 'La prueba del recibo' },
      { type: 'paragraph', text: 'Aquí está cómo saber cuál de las dos estás practicando. Después de dar, ¿te sientes más ligero —o te sientes con derecho a algo? Dar puro termina cuando el regalo llega; no deja residuo. Dar ansioso deja un recibo en tu mano: una expectativa silenciosa de retorno, un pequeño destello de resentimiento cuando el retorno no llega, un recuento constante de todo lo que has hecho que él no ha igualado. Si tu generosidad genera un libro de cuentas, nunca fue del todo un regalo. Fue una transacción que esperabas que él honrara.' },
      { type: 'paragraph', text: 'Esto no es un defecto de carácter —suele ser una estrategia de supervivencia de algún lugar donde el amor se sintió condicional, donde ser útil era tu manera de mantenerte a salvo. Pero nombrarlo importa, porque la generosidad ansiosa corroe silenciosamente a ambas personas. Carga al otro con una deuda que nunca aceptó, y te enseña que el amor debe comprarse. La seguridad real es la capacidad de dar libremente Y de dejar de dar a alguien que solo toma —sin que ninguna de las dos cosas se sienta como una catástrofe.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Dar motivado por la ansiedad de apego funciona como búsqueda de tranquilidad más que como generosidad, y se correlaciona con el resentimiento y el agotamiento —el «regalo» lleva una demanda tácita de seguridad a cambio.' },
    ],
  },
  w06_a5: {
    title: 'La diferencia entre el compromiso y el abandono de uno mismo',
    subtitle: 'Uno construye una relación. El otro disuelve a una persona.',
    blocks: [
      { type: 'paragraph', text: 'Toda relación requiere compromiso —eso no está en duda. El peligro es que «compromiso» se convierta en la palabra que usamos para algo mucho más costoso: la lenta desaparición de ti mismo para mantener cómodo a otro. Suenan parecido. Son opuestos. Y la línea entre ellos es una de las líneas más importantes que aprenderás a ver.' },
      { type: 'heading', text: 'Dónde pasa la línea' },
      { type: 'orderedList', items: [
        { title: 'Compromiso', text: 'Renuncias a una preferencia. Querías comida italiana, comes sushi. Querías mudarte, te quedas un año. Te cuesta algo que puedes permitirte —un deseo, no un núcleo.' },
        { title: 'Abandono de uno mismo', text: 'Renuncias a una parte de quién eres. Tus valores, tus necesidades, tus amistades, tu voz, las cosas que te hacen TÚ. Te cuesta algo que no puedes permitirte perder y seguir entero.' },
        { title: 'La prueba', text: 'Después de eso, ¿te sientes como una pareja que se dobló —o una persona que desapareció un poco? El compromiso es sobrevivible indefinidamente. El abandono de uno mismo tiene un número de víctimas, y la víctima eres tú.' },
      ] },
      { type: 'paragraph', text: 'La parte insidiosa es la gradualidad. Nadie se abandona a sí mismo en un solo acto dramático. Ocurre en incrementos tan pequeños que cada uno parece razonable —un hobby abandonado, una opinión tragada, un amigo visto menos, una necesidad que deja de mencionarse. Luego un día levantas la vista y no te encuentras en tu propia vida. La prevención es rastrear la tendencia, no el incremento: no «¿está bien esto solo?» sino «¿en qué dirección me he estado moviendo durante meses?»' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La claridad del autoconcepto declina de forma fiable bajo el silenciamiento crónico de uno mismo en las relaciones, y esa erosión predice depresión e insatisfacción. El abandono de uno mismo es una pérdida medible del yo, no un rasgo de personalidad.' },
    ],
  },
  w06_a6: {
    title: 'Desear a alguien contra necesitar su aprobación',
    subtitle: 'Dos sentimientos que se esconden el uno dentro del otro',
    blocks: [
      { type: 'paragraph', text: 'Puedes desear a una persona —su compañía, su mente, su presencia en tu vida. Y puedes necesitar su aprobación —su validación como prueba de que estás bien, eres digno de amor, suficiente. Se sienten como el mismo anhelo dirigido a la misma persona, pero son profundamente diferentes, y distinguirlos cambia todo en cómo amas.' },
      { type: 'heading', text: 'Cómo sentir la diferencia' },
      { type: 'paragraph', text: 'Desear a alguien es expansivo: su presencia se suma a una vida que ya era tuya y ya estaba bien. Si se fuera, harías duelo —y seguirías siendo una persona completa. Necesitar aprobación es contingente: su opinión sobre ti se convierte en el termostato de tu autoestima. Un mensaje frío hunde todo tu ánimo; uno cálido te restaura. Ya no estás respondiendo a la relación. Estás respondiendo a un veredicto sobre ti mismo cuyo poder de emitirlo le has entregado.' },
      { type: 'paragraph', text: 'Aquí está por qué importa tanto: necesitar la aprobación de alguien le entrega silenciosamente los controles. Cada elección se dobla para mantener su buena opinión —te encoges, actúas, estás de acuerdo, das de más, todo para proteger un suministro de validación que has decidido que no puedes generar tú mismo. Desear te mantiene soberano; lo eliges libremente, desde la plenitud. Necesitar aprobación te convierte en un suplicante en tu propia relación. El trabajo de esta semana es moverse, centímetro a centímetro, de lo segundo a lo primero.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La autoestima externamente contingente —obtener tu bienestar de la aprobación de otros— está vinculada a la ansiedad, la inestabilidad y la autonomía disminuida. Distinguir el deseo genuino de la dependencia de la aprobación es una palanca documentada hacia un apego más saludable.' },
    ],
  },
  w06_a7: {
    title: 'Cómo el respeto propio cambia a quién atraes',
    subtitle: 'Los estándares que mantienes remodelan en silencio quién se queda',
    blocks: [
      { type: 'paragraph', text: 'Hay un mecanismo silencioso que la mayoría de la gente nunca nota: la forma en que te tratas a ti mismo establece los términos de cómo se les permite a los demás tratarte —y con el tiempo, filtra QUIÉN se queda cerca. No a través de energía mística, sino a través de algo mucho más concreto. Tus límites son un mecanismo de clasificación, y siempre están clasificando, prestes atención o no.' },
      { type: 'heading', text: 'La clasificación, hecha visible' },
      { type: 'paragraph', text: 'Cuando sostienes el respeto propio —nombras tus necesidades, no persigues, dejas lo que está por debajo de ti— suceden dos cosas a la vez. La gente que quería acceso a alguien con límites débiles pierde interés y se aleja; ya no hay más trabajo gratuito, ni más suministro unilateral que extraer. Y la gente capaz de un amor mutuo y respetuoso te encuentra mucho más atractivo, porque el respeto propio se lee para una persona sana como seguridad y sustancia. No te estás convirtiendo en una persona diferente. Te estás volviendo legible —y responde gente diferente.' },
      { type: 'paragraph', text: 'Esto replantea el miedo que mantiene tan bajos tantos estándares: «si pido más, terminaré solo». La verdad es casi lo contrario. Rebajarte no gana amor; gana el tipo de personas que buscan a alguien rebajado. Elevar tus estándares no te cuesta el amor; te cuesta a las personas que nunca te iban a amar bien —y despeja la puerta para las que sí podrían. El respeto propio no es un muro que mantiene a la gente fuera. Es un filtro que deja entrar a los correctos.' },
      { type: 'quote', text: 'No pierdes gente por respetarte a ti mismo. Pierdes a los que necesitaban que no lo hicieras.', attribution: 'Sobre el filtro' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Los límites funcionan como presión de selección: el respeto propio constante disuade las dinámicas extractivas y señala seguridad a las parejas bien emparejadas. Quién permanece a tu alrededor cambia de forma predecible a medida que tus estándares se estabilizan.' },
    ],
  },

  // ── Semana 7 "Sentimientos ocultos" — días 1–7 (todos artículos nuevos) ────
  w07_a1: {
    title: 'Cuando alguien esconde sus sentimientos por ti',
    subtitle: 'El ocultamiento se filtra — si sabes dónde mirar',
    blocks: [
      { type: 'paragraph', text: 'Los sentimientos ocultos rara vez se ocultan bien. La gente puede controlar las señales grandes —no confesarán, no coquetearán abiertamente, no darán el primer paso— pero las pequeñas, involuntarias, se filtran constantemente. La atracción es mucha presión para retener bajo el agua, y escapa por las grietas que la persona ni siquiera sabe que existen.' },
      { type: 'heading', text: 'Dónde ocurren las filtraciones' },
      { type: 'paragraph', text: 'En la atención: te siguen con la mirada en una sala, saben cosas de ti que no recuerdas haberles contado, sacan a relucir detalles viejos meses después. En la fricción: se ponen extrañamente nerviosos, demasiado formales, o extrañamente discutidores contigo —los sentimientos que no pueden salir como calidez a menudo salen como estática. En el patrón: son diferentes CONTIGO que con todos los demás, y esa diferencia es la señal, no un momento aislado.' },
      { type: 'paragraph', text: 'Esta semana se trata de leer esas filtraciones sin ahogarse en ellas —porque la misma evidencia puede apuntar en dos direcciones. Un sentimiento oculto real deja un rastro consistente a lo largo del tiempo. La lectura ilusoria encuentra un rastro en una sola tarde cálida y construye una catedral sobre él. La diferencia es todo el juego, y para el día siete podrás distinguir cuál de las dos tienes entre manos.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La atracción produce atención y señales conductuales involuntarias difíciles de suprimir por completo. La señal fiable es la consistencia a través de situaciones —un patrón a lo largo del tiempo— no un solo momento ambiguo.' },
    ],
  },
  w07_a2: {
    title: 'El amigo que se quedó callado por una razón',
    subtitle: 'A veces la distancia es la confesión más ruidosa',
    blocks: [
      { type: 'paragraph', text: 'Hay un tipo específico de silencio que significa lo opuesto de no importarle. Un amigo que era fácil y constante de repente se vuelve cauteloso —respuestas más cortas, se echa hacia atrás, parece estar gestionando algo cerca de ti. Es tentador leerlo como un enfriamiento. A veces es exactamente lo contrario: se quedó callado porque los sentimientos se volvieron demasiado grandes para ser casuales al respecto.' },
      { type: 'heading', text: 'Por qué la cercanía lo hace retirarse' },
      { type: 'paragraph', text: 'Cuando un amigo desarrolla sentimientos, la amistad deja de ser simple para él. Cada momento juntos se convierte en una pequeña actuación de no-mostrar. Eso es agotador, y algunas personas lo manejan retirándose —creando distancia no porque sientan menos, sino porque estar cerca mientras oculta tanto se vuelve insoportable. El retraimiento es una válvula de presión, no un veredicto.' },
      { type: 'paragraph', text: 'La señal que separa esto de una deriva ordinaria: el amigo silencioso todavía resurge. Se retira pero no desaparece; se vuelve torpe pero no frío; hay una carga en la distancia, no la planitud de alguien que genuinamente ha seguido adelante. La deriva real es suave e indiferente. El retraimiento impulsado por sentimientos es irregular —lleno de casi-acercamientos y retiradas rápidas, como alguien parado frente a una puerta que no puede decidir abrir.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Gestionar una atracción oculta dentro de una amistad existente es cognitivamente agotador, y el retraimiento es una respuesta de afrontamiento documentada. La cualidad irregular y aún vinculada de la distancia la distingue del desapego genuino.' },
    ],
  },
  w07_a3: {
    title: 'Por qué la gente entierra la atracción bajo las bromas',
    subtitle: 'El disfraz más antiguo del libro',
    blocks: [
      { type: 'paragraph', text: 'El patio del recreo enseñó una lección que la gente nunca termina de desaprender: cuando te gusta alguien y no puedes decirlo, lo molestas. Los adultos hacen una versión más sofisticada —las bromas constantes, la burla cariñosa, la persona que nunca pierde la oportunidad de fastidiarte. Las bromas son un disfraz que se pone la atracción cuando la sinceridad parece demasiado peligrosa.' },
      { type: 'heading', text: 'Cómo funciona el disfraz' },
      { type: 'paragraph', text: 'Las bromas son una intimidad con negación plausible. Le permiten a alguien prestarte una atención enorme, crear chistes privados, y generar una carga constante uno a uno —todo mientras mantiene que es «solo jugar». Si respondieras con calidez, podría retirarse a «solo estaba bromeando». Las bromas son una forma de estar cerca de ti mientras mantiene una salida permanentemente abierta.' },
      { type: 'paragraph', text: 'Pero no todas las bromas son un enamoramiento, y ahí es donde la gente lee mal. La diferencia es la calidez y el enfoque. Las bromas cariñosas son cálidas por dentro, dirigidas específicamente a ti, y van acompañadas de atención real —te molesta Y recuerda tu mala semana. Las bromas despectivas son frías por dentro y a menudo se actúan para otros. Una es coqueteo con máscara. La otra es simplemente alguien siendo poco amable. Lee la temperatura debajo del chiste, no el chiste.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Las bromas juguetonas frecuentemente funcionan como afiliación y coqueteo indirectos —una forma de bajo riesgo de señalar interés con negación incorporada. La calidez y la especificidad del objetivo distinguen las bromas cariñosas de la mera hostilidad.' },
    ],
  },
  w07_a4: {
    title: 'Las señales de un enamoramiento secreto',
    subtitle: 'Una guía de campo de lo involuntario',
    blocks: [
      { type: 'paragraph', text: 'La gente cuida las señales obvias y olvida las pequeñas —y las pequeñas son más honestas precisamente porque no son elegidas. Aquí está la guía de campo de las señales involuntarias, las cosas que hace un enamoramiento secreto sin decidir hacerlas.' },
      { type: 'heading', text: 'El conjunto involuntario' },
      { type: 'orderedList', items: [
        { title: 'El escaneo', text: 'Sus ojos te encuentran cuando entras, y te encuentran de nuevo cuando te ríes de algo. La atención tiene una dirección, y sigue apuntando hacia ti.' },
        { title: 'La memoria', text: 'Retiene cosas que apenas mencionaste —una banda, una fecha, una preocupación casual. Recordamos sin esfuerzo lo que nos importa; el recuerdo con esfuerzo de tus pequeños detalles es una señal.' },
        { title: 'La proximidad', text: 'Termina cerca de ti. En grupos, la geometría se reorganiza constantemente para que esté en su órbita —normalmente sin que ninguno de los dos lo planee.' },
        { title: 'La reacción', text: 'Obtienes una respuesta desproporcionada —una risa demasiado brillante, un sonrojo, nerviosismo repentino o exceso de formalidad. Su sistema nervioso reacciona ante ti de manera diferente que ante los demás.' },
      ] },
      { type: 'paragraph', text: 'Una señal es ruido. El poder está en la acumulación: varias de estas, dirigidas consistentemente hacia ti, durante semanas. Un solo caso no prueba nada —cualquiera puede recordar una cosa o sentarse cerca de ti una vez. Un patrón a través de los cuatro canales es mucho más difícil de explicar como coincidencia, y mucho más difícil de esconder para la persona incluso cuando lo intenta.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El sesgo atencional, la memoria mejorada para el objeto de atracción, la búsqueda de proximidad, y la reactividad fisiológica aumentada son todos correlatos documentados del interés romántico. La convergencia entre las señales es mucho más diagnóstica que cualquiera de ellas por sí sola.' },
    ],
  },
  w07_a5: {
    title: 'La evitación como lenguaje del amor (el tipo doloroso)',
    subtitle: 'Cuando alguien maneja los sentimientos huyendo de ellos',
    blocks: [
      { type: 'paragraph', text: 'Para algunas personas, los sentimientos fuertes no producen acercamiento —producen escape. Cuanto más les gustas, más te evitan, porque la cercanía misma es lo que dispara su alarma. Es uno de los patrones más crueles de recibir, porque su comportamiento dice «vete» mientras su sentimiento dice lo contrario, y te quedas sosteniendo una contradicción que no creaste.' },
      { type: 'heading', text: 'Por qué más sentimiento significa más distancia' },
      { type: 'paragraph', text: 'Para alguien con un cableado evitativo, la intimidad es genuinamente amenazante —estuvo, en algún punto temprano, asociada con ser herido o engullido. Así que el sistema aprendió una regla: cuando se vuelve real, sal. Esto significa que sus sentimientos más fuertes disparan sus retiradas más fuertes. La persona que más le gusta es la persona de la que huye con más fuerza, lo cual parece rechazo y en realidad es su propio tipo de devoción abrumada.' },
      { type: 'paragraph', text: 'Entender esto no es lo mismo que apuntarse a ello. La retirada evitativa puede ser un sentimiento real Y una mala experiencia sobre la cual construir una relación, porque la distancia es todo el propósito de su estrategia —la cercanía la deshace, así que el patrón a menudo se repite sin fin. Léelo con claridad: esta persona puede genuinamente sentir algo. Si su sentimiento puede sobrevivir a su propia necesidad de escapar de él es una pregunta aparte, y no una que puedas responder por él amándolo más fuerte.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El apego evitativo produce desactivación bajo la intimidad: el aumento de la cercanía dispara un aumento del retraimiento. La retirada puede coexistir con atracción real, que es precisamente lo que hace que el patrón sea tan doloroso y tan persistente.' },
    ],
  },
  w07_a6: {
    title: 'Cuando el miedo al rechazo parece indiferencia',
    subtitle: 'La máscara que le cuesta a la gente lo que más desea',
    blocks: [
      { type: 'paragraph', text: 'Aquí hay una tragedia que se repite constantemente: a alguien le gustas tanto que actúa como si no le gustaras en absoluto. Aterrado de rechazo, actúa preventivamente indiferencia —frío, casual, imperturbable— como armadura. La lógica es desesperada pero humana: si nunca muestro que me importa, nunca podré ser rechazado por que me importe. La armadura funciona tan bien que a menudo le cuesta exactamente lo que quería.' },
      { type: 'heading', text: 'Cómo detectar el miedo con un rostro indiferente' },
      { type: 'paragraph', text: 'La diferencia entre indiferencia real e indiferencia defensiva es el esfuerzo. Una persona genuinamente indiferente no gasta energía en ti —no es fría, simplemente está ausente. Una persona defensivamente indiferente está gastando una energía enorme en PARECER indiferente, y ese esfuerzo se filtra. Es cuidadosamente casual. Su distancia tiene una cualidad autoconsciente. Actúa despreocupada de una manera claramente preocupada —revisando tu reacción a su no-reacción, presente exactamente de la manera en que una persona ausente no lo estaría.' },
      { type: 'paragraph', text: 'La otra señal es la inconsistencia entre canales. Las palabras y la postura dicen «no me importa», pero el comportamiento lo traiciona: sigue apareciendo, sigue encontrando razones para estar cerca de ti, sigue recordando, sigue reaccionando. Cuando la indiferencia declarada de alguien y su comportamiento real no coinciden, el comportamiento es la verdad y la indiferencia es el disfraz. El verdadero no-importarle no requiere actuación.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El miedo al rechazo comúnmente produce una autopresentación protectora —desinterés fingido como defensa preventiva. La cualidad laboriosa y autoconsciente de la «indiferencia», y su desajuste con el comportamiento real, revelan la máscara.' },
    ],
  },
  w07_a7: {
    title: 'Leer a la persona que no dará el primer paso',
    subtitle: 'El silencio no siempre es un no — pero podría serlo',
    blocks: [
      { type: 'paragraph', text: 'Después de seis días descifrando sentimientos ocultos, el capítulo final honesto: a veces no se hace ningún movimiento porque no hay sentimiento sobre el cual actuar —y todo el rastro que has estado leyendo fue escrito por tu esperanza, no por su corazón. Esto no es un fallo de percepción. Es el error más humano que existe: vemos más vívidamente lo que más queremos ver.' },
      { type: 'heading', text: 'La única pregunta que separa la señal del deseo' },
      { type: 'paragraph', text: 'Pregunta esto: ¿un observador neutral, al que solo se le mostraran los hechos, llegaría a la misma conclusión que yo? No «¿siento una chispa?» —los sentimientos no son evidencia de sentimientos mutuos. Sino «¿hay un patrón consistente, a través de situaciones, que un extraño también notaría?» Si la respuesta es sí —si la atención, la memoria, la proximidad, la reactividad apuntan todas en la misma dirección durante semanas— entonces alguien probablemente SÍ está ocultando algo, y su no-moverse es miedo, no ausencia. Si la respuesta honesta es que estás encadenando unos pocos momentos cálidos entre muchos ordinarios, eso también vale la pena saberlo.' },
      { type: 'paragraph', text: 'Y aquí está la parte liberadora, sea cual sea el resultado: no tienes que quedarte descifrando para siempre. Si el patrón es real y lo único que falta es coraje —el suyo o el tuyo— un pequeño movimiento de bajo riesgo puede acabar con meses de suposiciones. Si el patrón no es real, verlo con claridad te libera de construir sobre unos cimientos que nunca estuvieron ahí. De cualquier manera, la salida del laberinto es la misma: deja de leer los posos del café, y prueba con suavidad el agua real.' },
      { type: 'quote', text: 'Los sentimientos no son evidencia de sentimientos mutuos. El patrón es la evidencia —o su ausencia lo es.', attribution: 'Sobre la última lectura' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La percepción ilusoria nos sesga hacia leer resultados deseados en señales ambiguas. La prueba del observador neutral —exigiendo un patrón a través de situaciones, no una chispa sentida— es un corrector documentado para ese sesgo.' },
    ],
  },

  // ── Semana 8 "La persecución" — días 1–7 (todos artículos nuevos) ──────────
  w08_a1: {
    title: 'La psicología de la persecución',
    subtitle: 'Por qué la persecución puede sentirse mejor que la persona',
    blocks: [
      { type: 'paragraph', text: 'La persecución tiene una lógica más antigua que las aplicaciones de citas: la persecución genera un subidón específico y adictivo que el afecto estable no genera. Cuando alguien está justo fuera de alcance, todo tu sistema se organiza para cerrar la brecha —enfocado, vivo, un poco obsesionado. Se siente como amor, y a menudo lo es en parte. Pero parte de lo que sientes no tiene nada que ver con él. Tiene que ver con la brecha.' },
      { type: 'heading', text: 'La brecha es la droga' },
      { type: 'paragraph', text: 'El deseo se alimenta de la distancia. La incertidumbre de no tener del todo a alguien mantiene el sistema del deseo funcionando a todo volumen, porque ese sistema evolucionó para intensificar el esfuerzo precisamente cuando una recompensa está cerca pero no asegurada. Cierra la brecha —consigue a la persona, asegura el afecto— y la misma química que se sentía como pasión se calma. Por eso algunas personas sienten un anhelo salvaje durante la persecución y una extraña planitud en el momento en que ganan.' },
      { type: 'paragraph', text: 'Esta semana es un espejo, no un sermón. No pregunta quién persigue a quién en abstracto —pregunta sobre TU papel. ¿Eres el que persigue? ¿El que crea la distancia que otros persiguen? ¿Enganchado a la persecución misma más que a cualquier persona en particular? ¿O en algo más raro, donde nadie corre? Conocer tu patrón es cómo dejas de repetirlo por accidente.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El sistema del deseo se intensifica con la incertidumbre y la proximidad a una recompensa no asegurada, luego se calma al conseguirla. Por eso la persecución puede sentirse más activadora que la relación asegurada —la excitación tenía que ver en parte con la brecha, no solo con la persona.' },
    ],
  },
  w08_a2: {
    title: 'Por qué queremos lo que huye de nosotros',
    subtitle: 'Los no disponibles no tienen más valor — solo lo parecen',
    blocks: [
      { type: 'paragraph', text: 'Es casi vergonzoso lo confiablemente que funciona: la persona que te desea claramente se vuelve ligeramente menos interesante, y la persona que te hace adivinar se vuelve magnética. Esto no es un defecto en tu gusto. Es un conjunto de sesgos predecibles que la mente ejecuta, y nombrarlos les quita la mayor parte de su poder.' },
      { type: 'heading', text: 'Tres razones por las que la distancia deslumbra' },
      { type: 'orderedList', items: [
        { title: 'Escasez', text: 'Le asignamos más valor a lo que es difícil de conseguir. La disponibilidad se lee como abundancia, y la abundancia se lee —erróneamente— como poco valor. La persona no disponible toma prestado su prestigio puramente de ser no disponible.' },
        { title: 'La pantalla de proyección', text: 'Alguien que revela poco se convierte en un lienzo en blanco sobre el cual pintas tu ideal. No estás enamorado de él; estás enamorado de la versión de él que inventaste en los vacíos.' },
        { title: 'El desafío', text: 'Ganar al reticente promete una dosis de validación que el dispuesto no puede ofrecer. Deja de tratarse de conexión y se convierte en cuestión de demostrar algo.' },
      ] },
      { type: 'paragraph', text: 'Ve el patrón con claridad y el hechizo se debilita. La próxima vez que la distancia de alguien lo haga parecer precioso, haz la pregunta desinflante y clarificadora: ¿realmente me gusta esta persona —su mente, su amabilidad, su presencia— o solo me gusta que sea difícil de atrapar? Las respuestas son diferentes, y solo una de ellas vale la pena perseguir.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El sesgo de escasez, la proyección idealizada sobre objetivos ambiguos, y la búsqueda de validación inflan todos el atractivo de las personas no disponibles. El valor percibido viene de la no disponibilidad misma, no de la persona.' },
    ],
  },
  w08_a3: {
    title: 'El perseguidor y el distanciador: un baile con pasos',
    subtitle: 'El patrón más común en las relaciones con dificultades',
    blocks: [
      { type: 'paragraph', text: 'Observa suficientes relaciones y aparece una coreografía una y otra vez: una persona persigue —busca cercanía, tranquilidad, más— y la otra se distancia —se retira, necesita espacio, se queda callada. La parte desgarradora es que el movimiento de cada uno dispara el del otro. Cuanto más persigue uno, más se retira el otro; cuanto más se retira uno, más persigue el otro. Es un bucle que se alimenta a sí mismo.' },
      { type: 'heading', text: 'Por qué el baile se atasca' },
      { type: 'paragraph', text: 'La persecución del perseguidor viene de un miedo real al abandono —la cercanía lo calma. La retirada del distanciador viene de un miedo real a ser engullido —el espacio lo calma. Así que ambos están tratando de sentirse seguros, usando estrategias opuestas, y cada estrategia es la pesadilla del otro. El alcance del perseguidor se lee como presión para el distanciador; la retirada del distanciador se lee como abandono para el perseguidor. Nadie es un villano. Todos tienen miedo.' },
      { type: 'paragraph', text: 'La idea crucial: los roles no son personalidades fijas —son posiciones en un sistema, y el baile intensifica a ambos. Una persona que está segura con una pareja puede convertirse en un perseguidor desesperado con un distanciador extremo, y viceversa. Lo cual significa que la salida no es encontrar tu «verdadero» rol; es notar el paso que sigues dando y elegir, solo una vez, dejar de darlo —porque un baile necesita a ambos bailarines para continuar.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'El patrón de perseguir-retirarse (o exigir-retirarse) es una de las dinámicas más sólidamente documentadas en la investigación de relaciones, y es autorreforzante: el comportamiento de afrontamiento de cada pareja dispara el del otro. Los roles son posiciones en un sistema, no rasgos fijos.' },
    ],
  },
  w08_a4: {
    title: 'Cuando desear se convierte en ganar',
    subtitle: 'El momento en que el amor se convierte en una competencia',
    blocks: [
      { type: 'paragraph', text: 'Hay una línea que la persecución puede cruzar silenciosamente, donde deja de tratarse de desear a alguien y empieza a tratarse de ganarlo. El cambio es sutil pero total. Desear se trata de él —su presencia, su calidez, un futuro juntos. Ganar se trata de ti —tu orgullo, tu validación, el pensamiento insoportable de no conseguir lo que te propusiste conseguir. Misma persecución por fuera; motor opuesto por dentro.' },
      { type: 'heading', text: 'Cómo saber en cuál de las dos estás' },
      { type: 'paragraph', text: 'La prueba es qué pasa cuando imaginas realmente conseguirlo. Si la fantasía está llena de ÉL —días ordinarios, cercanía real, quién es— eso es desear. Si la fantasía es sobre todo el momento de la victoria, el alivio de haber ganado, el demostrarte algo a ti mismo o a otros —y se vuelve extrañamente vacía después de ese momento— eso es ganar. Las fantasías de ganar siempre tratan sobre la línea de meta, porque para el competidor la persona nunca fue el premio. Tener razón lo era.' },
      { type: 'paragraph', text: 'Esto importa porque la persecución impulsada por ganar es una trampa incluso cuando tiene éxito. Gana a alguien que en realidad no querías, y ahora tienes en tus manos un premio que dejó de importar en el instante en que lo aseguraste —así es como la gente termina dejando relaciones por las que luchó desesperadamente para entrar. La persecución nunca se trató de la persona. Se trataba de no perder. Y no puedes construir una vida sobre una victoria.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Cuando la persecución está impulsada por el ego y la validación en lugar del deseo genuino, la consecución colapsa la motivación —la «recompensa» era ganar, no la relación. Esto predice el patrón bien documentado de perder el interés inmediatamente después de asegurar a una pareja ganada con esfuerzo.' },
    ],
  },
  w08_a5: {
    title: 'La emoción de lo no disponible',
    subtitle: 'Por qué el amor seguro puede sentirse como ningún amor en absoluto',
    blocks: [
      { type: 'paragraph', text: 'Si solo has sentido atracción intensa hacia personas no disponibles —las comprometidas, las distantes, las que no pueden presentarse por completo— hay un patrón que vale la pena mirar con honestidad. No es que tengas mala suerte. Es que la no disponibilidad se ha convertido en un requisito para que se active tu deseo, y las personas disponibles se sienten, confusamente, como nada.' },
      { type: 'heading', text: 'Por qué desear a los no disponibles se siente seguro' },
      { type: 'paragraph', text: 'Aquí está la lógica oculta: desear a alguien que no puede tenerte por completo de vuelta es en realidad el tipo de deseo MÁS SEGURO. Obtienes toda la intensidad del anhelo sin ninguno de los riesgos de la intimidad real, porque la intimidad real no puede ocurrir —no está disponible, así que estás protegido de ser realmente visto, realmente cercano, realmente expuesto a que te hieran de cerca. La no disponibilidad no es un fallo en tu atracción. Para una parte de ti, es todo el atractivo.' },
      { type: 'paragraph', text: 'Por eso el amor disponible puede sentirse plano o incluso sofocante para alguien con este patrón —la ausencia de la persecución elimina lo mismo que generaba el sentimiento, y la presencia de cercanía real dispara el miedo del cual la persecución protegía. Si alguien estable te deja frío, la pregunta no es «¿dónde está la chispa?» Es «¿solo puedo sentirme seguro deseando a personas que no pueden acercarse?» Esa es una pregunta diferente, con una respuesta mucho más esperanzadora.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La atracción crónica hacia parejas no disponibles a menudo funciona como evitación de la intimidad: anhelo sin exposición real. La «emoción» es en parte la seguridad de una conexión que en realidad no puede alcanzarte —por eso la cercanía disponible puede registrarse como plana o amenazante.' },
    ],
  },
  w08_a6: {
    title: 'Cómo dejar de perseguir y empezar a atraer',
    subtitle: 'El cambio de la persecución a la presencia',
    blocks: [
      { type: 'paragraph', text: 'El consejo de «dejar de perseguir» está en todas partes y es casi inútil, porque generalmente se presenta como una táctica de manipulación —retírate para hacer que te desee, juega mejor el juego. Eso es solo persecución disfrazada, con el mismo motor ansioso. La atracción real viene de algo que las tácticas no pueden fingir: tener realmente una vida que no estás dispuesto a abandonar por un quizás.' },
      { type: 'heading', text: 'La atracción es un subproducto, no una estrategia' },
      { type: 'paragraph', text: 'Perseguir transmite un mensaje debajo de las palabras: tu atención vale más que la mía, así que verteré la mía sobre ti y esperaré. No es el esfuerzo lo que repele —el esfuerzo es hermoso cuando es mutuo— es el desequilibrio, el autoabandono, la disposición visible a aceptar menos. La presencia transmite lo contrario: genuinamente estoy interesado Y mi vida está llena y es buena sin él, así que esto es una invitación, no una súplica. Eso no es un truco para retener la calidez. Es el resultado natural de tener un centro de gravedad que no es él.' },
      { type: 'paragraph', text: 'Así que el movimiento real no es «responder los mensajes más despacio». Es «construir una vida tan atractiva que esperar junto al teléfono deje de ser una opción que siquiera quisieras». Vierte la energía de la persecución de vuelta en tu trabajo, tus amigos, tu cuerpo, las cosas que eran tuyas antes de esta persona y seguirán siendo tuyas después. La atracción sigue a la plenitud. Y el hermoso efecto secundario: incluso si esta persona en particular no se da la vuelta, terminas con una vida en lugar de una espera.' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'La atracción responde al valor percibido y la autosuficiencia, no a las tácticas de retención. Invertir en la propia vida cambia de forma fiable la dinámica más que cualquier «juego» de retirada, porque cambia la señal real que se envía, no solo su momento.' },
    ],
  },
  w08_a7: {
    title: 'Lo que pasa cuando dejas de correr tras él',
    subtitle: 'La claridad que solo llega cuando te quedas quieto',
    blocks: [
      { type: 'paragraph', text: 'Hay un terror específico en detener la persecución: el miedo de que si dejas de correr hacia él, lo perderás por completo. Y a veces así será. Pero esa no es la pérdida que parece ser —es la única pieza de información más útil que toda la persecución podría darte jamás, y llega en el momento en que finalmente dejas de generar el movimiento tú mismo.' },
      { type: 'heading', text: 'La prueba de la quietud' },
      { type: 'paragraph', text: 'Cuando dejas de perseguir, sucede una de dos cosas, y ambas son regalos. O bien se mueve hacia ti —el espacio que creaste le permitió avanzar, y descubres que había algo real que tu persecución en realidad estaba sofocando. O simplemente se aleja a la deriva —lo cual revela que toda la conexión estaba siendo impulsada solo por tu esfuerzo, una relación de una sola persona que confundías con dos. Necesitabas saber eso. Simplemente no podías verlo mientras eras el motor que la mantenía funcionando.' },
      { type: 'paragraph', text: 'Esta es la resolución tranquila de toda la semana. La persecución te mantiene en movimiento precisamente para que nunca tengas que descubrir qué es real —mientras corres, puedes creer que la conexión es mutua. Quedarte quieto es cómo finalmente lees la verdad. Y sea lo que sea que te muestre, ganas: o bien algo real que puede sostenerse por sí mismo, o tu libertad de un espejismo que te estabas agotando por sostener. Las personas que son tuyas no necesitan ser perseguidas. Caminan hacia ti cuando dejas de correr.' },
      { type: 'quote', text: 'Deja de correr, y descubrirás rápido quién realmente caminaba a tu lado.', attribution: 'Sobre quedarse quieto' },
      { type: 'callout', variant: 'info', title: 'Por qué podemos afirmar esto', text: 'Retirar la propia persecución es diagnóstico: distingue un vínculo mutuo de una ilusión sostenida por el esfuerzo. Lo que hace una relación cuando dejas de impulsarla tú solo está entre las señales disponibles más claras de si alguna vez fue mutua.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // FULL ARTICLE — relatedModuleId: 'who_loves_me'
  // ───────────────────────────────────────────────────────────────────────────
  ten_signs_secret_love: {
    title: '10 señales de que alguien te ama en secreto',
    subtitle: 'Las señales discretas que casi nadie nota',
    blocks: [
      {
        type: 'paragraph',
        text: 'Algunas personas anuncian su amor. Otras dejan que se filtre en cien pequeños gestos deliberados — el mensaje que llega justo cuando lo necesitabas, la forma en que recuerdan el café que mencionaste una vez, de pasada, hace meses.',
      },
      {
        type: 'paragraph',
        text: 'Los psicólogos que estudian el apego llaman a esto «intentos de conexión». Son fáciles de pasar por alto porque casi nunca parecen grandes declaraciones. Pero en cuanto aprendes a ver el patrón, empiezas a notar quién te ha estado eligiendo en silencio todo este tiempo.',
      },
      { type: 'heading', text: 'Las señales que no mienten' },
      {
        type: 'paragraph',
        text: 'No necesitas las diez. Tres o cuatro, apareciendo de forma constante, suelen contar toda la historia.',
      },
      {
        type: 'orderedList',
        items: [
          {
            title: 'Recuerdan las pequeñas cosas que solo mencionaste una vez.',
            text: 'Detalles casuales que olvidaste haber compartido reaparecen en lo que hacen — el snack que te gusta, la fecha que temías. La memoria sigue a la atención, y la atención sigue al sentimiento.',
          },
          {
            title: 'Defienden tu nombre cuando no estás en la sala.',
            text: 'Proteger tu reputación cuando no hay nada que ganar con ello es una de las señales más puras que existen. Les cuesta algo, y lo pagan con gusto.',
          },
          {
            title: 'Inventan pequeñas razones para quedarse cerca de ti.',
            text: 'Una pregunta que podría haber sido un mensaje. Un recado que casualmente pasa por tu camino. La razón es un pretexto; la cercanía es lo que importa.',
          },
          {
            title: 'Su cuerpo se orienta hacia ti antes de que lo decidan.',
            text: 'Los pies, los hombros y la mirada se orientan hacia aquello que ya le importa al sistema nervioso. Ocurre un instante antes de que el pensamiento consciente lo alcance.',
          },
          {
            title: 'Reflejan tu ritmo — tus palabras, tu paso, tu ánimo.',
            text: 'La imitación inconsciente del lenguaje y la energía es el cuerpo sincronizándose con alguien junto a quien se siente seguro. Hacemos eco de las personas que nos atraen.',
          },
          {
            title: 'Protegen tus rutinas y tu paz.',
            text: 'Aprenden lo que te agota e intervienen en silencio — se encargan de lo pequeño antes de que llegue siquiera a ti. El cariño a menudo parece logística.',
          },
          {
            title: 'Se vuelven callados de una manera particular contigo.',
            text: 'No distantes — atentos. El hablar de más o las pausas cuidadosas son el sonido de alguien a quien de pronto le importa la impresión que da.',
          },
          {
            title: 'Celebran tus logros como si fueran suyos.',
            text: 'La envidia es la respuesta humana predeterminada ante la buena noticia de otra persona. La alegría genuina y espontánea por tu éxito es justo lo contrario, y es poco común.',
          },
          {
            title: 'Aparecen en los momentos poco vistosos.',
            text: 'Cualquiera viene a la fiesta. Quienes te aman están ahí para la mudanza, la semana difícil, el favor aburrido — los momentos sin público.',
          },
          {
            title: 'Hacen preguntas de seguimiento días después.',
            text: 'Un «¿cómo te fue en esa reunión?» sobre algo que mencionaste el martes pasado significa que mantuvieron un hilo de tu vida activo, en silencio, de fondo.',
          },
        ],
      },
      { type: 'quote', text: 'El amor silencioso habla un idioma más fuerte que las palabras.' },
      {
        type: 'image',
        asset: 'ten-signs-hero',
        caption: 'Los intentos de conexión rara vez parecen declaraciones.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Por qué podemos afirmar esto',
        text: 'Esta lectura se basa en la teoría del apego y la psicología relacional — no en la astrología. Los patrones son observables, se repiten y son profundamente humanos.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // EDITORIAL BACKLOG — traducción de los 8 artículos cortos.
  // ───────────────────────────────────────────────────────────────────────────
  energy_you_carry: {
    title: 'La energía que llevas a una habitación',
    subtitle: 'Te sienten antes de que hables',
    blocks: [
      {
        type: 'paragraph',
        text: 'Antes de decir una palabra, ya has dicho algo. La postura, el paso, la posición de los hombros, hacia dónde va tu mirada — la gente lee todo eso en menos de un segundo y se ajusta a ello sin saber que lo ha hecho.',
      },
      {
        type: 'paragraph',
        text: 'Lo llamamos «energía», pero en realidad es regulación: un sistema nervioso calmado es contagioso, y uno ansioso también. La sala tiende a igualar a quien esté más seguro de su propio estado.',
      },
      { type: 'heading', text: 'Elígela a propósito' },
      {
        type: 'paragraph',
        text: 'Puedes elegir la señal con la que empiezas. Una respiración lenta antes de entrar, una primera frase sin prisa, una atención que se posa por completo en una persona — pequeñas señales que le dicen a la sala que es seguro relajarse.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Por qué podemos afirmar esto',
        text: 'El contagio emocional y la sincronía no verbal están bien documentados en la psicología social — no es misticismo. De verdad cambias las salas a las que entras.',
      },
    ],
  },

  anxious_hearts_silence: {
    title: 'Por qué los corazones ansiosos leen el silencio como rechazo',
    subtitle: 'Un teléfono en silencio no es un veredicto',
    blocks: [
      {
        type: 'paragraph',
        text: 'Para una mente con apego ansioso, el silencio rara vez es neutral. Una respuesta tardía se convierte en una historia — se está alejando, dijiste demasiado, ya se acabó — y esa historia llega ya formada, mucho antes que cualquier prueba.',
      },
      {
        type: 'paragraph',
        text: 'El sistema nervioso aprendió pronto que la conexión podía desaparecer sin previo aviso, así que trata la ausencia como una amenaza que hay que resolver de inmediato, no como un vacío que se cerrará solo.',
      },
      { type: 'heading', text: 'Frena la historia' },
      {
        type: 'paragraph',
        text: 'La habilidad no consiste en dejar de sentir el pico de ansiedad, sino en nombrarlo: «esta es mi alarma, no los hechos». La mayoría de los silencios tienen que ver con la disponibilidad de la otra persona, no con tu valor.',
      },
      { type: 'quote', text: 'La historia que escribe tu miedo no es la única historia posible.' },
    ],
  },

  reading_auras_colors: {
    title: 'Leer auras: qué significa realmente cada color',
    subtitle: 'Un vocabulario para los estados de ánimo que percibes',
    blocks: [
      {
        type: 'paragraph',
        text: 'Mucho antes de que «aura» fuera una palabra de bienestar, las culturas usaban el color para describir el temperamento — y las asociaciones son sorprendentemente constantes. Son menos un resplandor literal que un lenguaje compartido para la energía que desprende una persona.',
      },
      { type: 'heading', text: 'La paleta base' },
      {
        type: 'orderedList',
        items: [
          { title: 'Rojo — el impulso.', text: 'Calor, apetito, acción. Magnético de cerca, agotador en exceso.' },
          { title: 'Dorado — la calidez.', text: 'Generosidad y soltura; la persona junto a la que una sala se relaja.' },
          { title: 'Azul — la calma.', text: 'Estable, reflexivo, confiable bajo presión.' },
          { title: 'Violeta — la profundidad.', text: 'Intuición e imaginación; vive un poco en su mundo interior.' },
          { title: 'Verde — la renovación.', text: 'Equilibrio y cuidado; el estabilizador silencioso.' },
          { title: 'Rosa — la devoción.', text: 'Ternura y lealtad; ama de cerca y da su calidez sin reservas.' },
          { title: 'Negro — el guardián.', text: 'Profundidad guardada tras bordes claros; una presencia que se siente y que nadie cruza sin invitación.' },
          { title: 'Blanco — la luz clara.', text: 'Un espacio despejado; aporta calma y honestidad, y deja que otros vuelvan a empezar.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Cómo usar esto',
        text: 'Trata el color como una pista, no como una etiqueta. Pregúntate qué te está diciendo el «color» de una persona sobre lo que necesita ahora mismo.',
      },
    ],
  },

  am_i_the_problem: {
    title: '¿Soy yo el problema? Un espejo honesto',
    subtitle: 'La pregunta más valiente, hecha con cariño',
    blocks: [
      {
        type: 'paragraph',
        text: 'Es la pregunta con la que casi nadie quiere sentarse — y el simple hecho de hacértela suele ser señal de que, en realidad, no eres todo el problema. Las personas que más daño causan rara vez se preguntan si lo hacen.',
      },
      {
        type: 'paragraph',
        text: 'Aun así, un espejo honesto es útil. Los patrones que se repiten con personas muy distintas suelen tener algo en común: tú. No como una acusación — como información.',
      },
      { type: 'heading', text: 'Busca el patrón, no el veredicto' },
      {
        type: 'paragraph',
        text: 'Fíjate en el momento en que las cosas tienden a cambiar — cuando te enfrías, cuando presionas, cuando desapareces. Nombrar tu movimiento es el primer paso para elegir uno distinto.',
      },
      { type: 'quote', text: 'La responsabilidad sin vergüenza no es más que claridad sobre lo que puedes cambiar.' },
    ],
  },

  quiet_tells_jealousy: {
    title: 'Las señales silenciosas de los celos',
    subtitle: 'Rara vez se anuncian',
    blocks: [
      {
        type: 'paragraph',
        text: 'Los celos casi nunca parecen celos. Se esconden dentro de un «qué bien» sin entusiasmo, una broma con un poco demasiado filo, una frialdad repentina tras tu buena noticia, el amigo que empieza a competir donde no había ninguna competencia.',
      },
      {
        type: 'paragraph',
        text: 'Debajo, normalmente no hay maldad sino miedo — el miedo de que tu ascenso reduzca su lugar a tu lado. La señal es el desajuste entre las palabras y la temperatura.',
      },
      { type: 'heading', text: 'Qué hacer con ello' },
      {
        type: 'paragraph',
        text: 'No tienes que apagarte para gestionar la envidia de otra persona. Pero notarla a tiempo te dice quién puede sostener tus logros — y quién solo puede sostener tus dificultades.',
      },
    ],
  },

  someone_pulling_away: {
    title: 'Cómo saber cuándo alguien se está alejando',
    subtitle: 'La distancia deja huellas',
    blocks: [
      {
        type: 'paragraph',
        text: 'El distanciamiento suele ser silencioso antes de volverse evidente. Los mensajes se hacen más cortos y más lentos. Los planes se convierten en «pronto». Las conversaciones se quedan en la superficie, y los silencios que antes eran fáciles empiezan a sentirse como un esfuerzo.',
      },
      { type: 'heading', text: 'Las señales, en orden' },
      {
        type: 'orderedList',
        items: [
          { title: 'La demora.', text: 'Las respuestas llegan más tarde, y con menos contenido dentro.' },
          { title: 'La vaguedad.', text: 'Los planes concretos se disuelven en un lenguaje de «algún día».' },
          { title: 'Solo superficie.', text: 'Dejan de compartir contigo lo que de verdad importa.' },
          { title: 'Logística en vez de calidez.', text: 'El contacto se vuelve funcional, ya no afectuoso.' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Antes de que te obsesiones',
        text: 'La distancia puede significar estrés, no rechazo. Pregunta directa y amablemente — mereces una respuesta clara, no un juego de adivinanzas.',
      },
    ],
  },

  increase_your_aura: {
    title: 'Cómo aumentar tu aura',
    subtitle: 'La presencia es una práctica, no un don',
    blocks: [
      {
        type: 'paragraph',
        text: '«Aura» es una forma abreviada de decir presencia — cuánto ocupas plenamente tu propio espacio. No es un carisma con el que naces; es un conjunto de hábitos que cualquiera puede construir.',
      },
      { type: 'heading', text: 'Cuatro hábitos que se acumulan' },
      {
        type: 'orderedList',
        items: [
          { title: 'Ve más despacio.', text: 'El movimiento sin prisa se lee como dominio de uno mismo.' },
          { title: 'Escucha hasta el final.', text: 'La atención plena es lo bastante rara como para sentirse como magnetismo.' },
          { title: 'Cuida tu estado.', text: 'Sueño, luz, movimiento — tu punto de partida es tu aura.' },
          { title: 'Cumple tu palabra.', text: 'La integridad es la señal más silenciosa y más fuerte que existe.' },
        ],
      },
      { type: 'quote', text: 'No proyectas una energía que no tienes. Llena primero la copa.' },
    ],
  },

  who_secretly_resents_you: {
    title: 'Quién te guarda rencor en secreto — y por qué',
    subtitle: 'La fricción que nadie nombra en voz alta',
    blocks: [
      {
        type: 'paragraph',
        text: 'El resentimiento es la emoción que más esfuerzo cuesta ocultar, porque admitirlo se siente pequeño. Así que se filtra de lado — a través de cumplidos con doble filo, entusiasmo contenido, una generosidad que siempre parece venir con una cuenta silenciosa.',
      },
      {
        type: 'paragraph',
        text: 'Suele crecer en uno de estos dos terrenos: un favor que nunca fue devuelto, o una comparación que alguien sigue perdiendo dentro de su propia cabeza.',
      },
      { type: 'heading', text: 'Leerlo sin paranoia' },
      {
        type: 'paragraph',
        text: 'Busca la repetición, no momentos aislados. Un mal día es ruido; una frialdad constante alrededor de temas concretos es una señal — y merece una conversación suave y directa.',
      },
    ],
  },
};
