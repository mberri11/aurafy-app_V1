// ─────────────────────────────────────────────────────────────────────────────
// DISCOVERY NOTIFICATIONS — the varied, module-teasing local pushes.
// ─────────────────────────────────────────────────────────────────────────────
// Distinct from the two RITUAL reminders (which live in src/utils/notifications.ts
// and use the i18n `notify.*` chrome):
//   • quote reminder  — "Tonight's quote is waiting…", at the user's reminderTime
//   • streak reminder — "You haven't read today's quote yet…", 22:00, unread days only
//
// These are different: they sell the READING MODULES. Two per day, on fixed slots,
// with the copy ROTATING so the user never sees the same nudge twice in a week:
//   • NOON  (12:00) — daytime framing: the room you're about to walk into, the day
//                     ahead, who you'll see.
//   • NIGHT (23:00) — after-dark framing: the thought you can't put down, the name
//                     you keep circling.
//
// Long-form copy lives HERE, not in src/i18n/*.json (same rule as articles/quotes —
// that file is short UI chrome only).
//
// EVERY `moduleId` MUST be a live (non-comingSoon) id from src/data/modules.ts, or
// the tap-through lands on a locked screen. Validated by validateTeasers() in __DEV__.
// ─────────────────────────────────────────────────────────────────────────────

import type { LocalizedString } from '../../types';

export type TeaserSlot = 'noon' | 'night';

export interface TeaserNotification {
  id: string;
  /** Live Module.id — the reading this nudge sells. Deep-links to /module/<id>. */
  moduleId: string;
  slot: TeaserSlot;
  title: LocalizedString;
  body: LocalizedString;
}

/** 7 per slot — a full week rotates before anything repeats. */
export const TEASERS: TeaserNotification[] = [
  // ── NOON (12:00) — the day ahead ───────────────────────────────────────────
  {
    id: 'noon_energy',
    moduleId: 'energy_reading',
    slot: 'noon',
    title: {
      en: 'The room reads you first ✦',
      fr: 'La pièce te lit en premier ✦',
      ar: 'الغرفة تقرأك أولاً ✦',
      es: 'La sala te lee primero ✦',
    },
    body: {
      en: 'People decide how you feel before you speak. Read the energy you carry into today.',
      fr: "Les gens ressentent ton énergie avant que tu parles. Lis celle que tu portes aujourd'hui.",
      ar: 'يشعر الناس بطاقتك قبل أن تتكلم. اقرأ الطاقة التي تحملها اليوم.',
      es: 'La gente siente tu energía antes de que hables. Lee la que llevas hoy.',
    },
  },
  {
    id: 'noon_admires',
    moduleId: 'who_admires',
    slot: 'noon',
    title: {
      en: 'Someone noticed you this week',
      fr: "Quelqu'un t'a remarqué cette semaine",
      ar: 'شخص ما لاحظك هذا الأسبوع',
      es: 'Alguien te notó esta semana',
    },
    body: {
      en: 'Admiration is quiet. It rarely announces itself. Find out who has been watching you rise.',
      fr: "L'admiration est discrète. Elle s'annonce rarement. Découvre qui te regarde grandir.",
      ar: 'الإعجاب هادئ، ونادراً ما يُعلن عن نفسه. اكتشف من يراقب صعودك.',
      es: 'La admiración es silenciosa. Rara vez se anuncia. Descubre quién te ha visto crecer.',
    },
  },
  {
    id: 'noon_aura',
    moduleId: 'aura_color',
    slot: 'noon',
    title: {
      en: 'What colour did you wake up as?',
      fr: 'De quelle couleur t’es-tu réveillé ?',
      ar: 'بأي لون استيقظت اليوم؟',
      es: '¿De qué color despertaste hoy?',
    },
    body: {
      en: 'Your aura shifts with the week you are having. See which colour is running you today.',
      fr: 'Ton aura change avec la semaine que tu vis. Vois quelle couleur te guide aujourd’hui.',
      ar: 'هالتك تتغير مع أسبوعك. اعرف أي لون يقودك اليوم.',
      es: 'Tu aura cambia con la semana que vives. Mira qué color te guía hoy.',
    },
  },
  {
    id: 'noon_attachment',
    moduleId: 'attachment_style',
    slot: 'noon',
    title: {
      en: 'Why some days feel heavier',
      fr: 'Pourquoi certains jours pèsent plus',
      ar: 'لماذا تبدو بعض الأيام أثقل',
      es: 'Por qué algunos días pesan más',
    },
    body: {
      en: 'The way you attach shapes how you read a silence. Twenty questions, one honest pattern.',
      fr: 'Ta façon de t’attacher change ta lecture d’un silence. Vingt questions, un schéma honnête.',
      ar: 'طريقة تعلّقك تغيّر كيف تقرأ الصمت. عشرون سؤالاً، ونمط صادق واحد.',
      es: 'Cómo te vinculas cambia cómo lees un silencio. Veinte preguntas, un patrón honesto.',
    },
  },
  {
    id: 'noon_problem',
    moduleId: 'am_i_problem',
    slot: 'noon',
    title: {
      en: 'The honest mirror ✦',
      fr: 'Le miroir honnête ✦',
      ar: 'المرآة الصادقة ✦',
      es: 'El espejo honesto ✦',
    },
    body: {
      en: 'Asking the question already says something good about you. Get the answer, gently.',
      fr: 'Poser la question dit déjà quelque chose de bien sur toi. Reçois la réponse, en douceur.',
      ar: 'مجرد طرحك للسؤال يقول شيئاً جميلاً عنك. تلقَّ الإجابة بلطف.',
      es: 'Hacerte la pregunta ya dice algo bueno de ti. Recibe la respuesta, con calma.',
    },
  },
  {
    id: 'noon_redgreen',
    moduleId: 'red_green_flag',
    slot: 'noon',
    title: {
      en: 'One name. One straight answer.',
      fr: 'Un nom. Une réponse nette.',
      ar: 'اسم واحد. جواب واضح.',
      es: 'Un nombre. Una respuesta clara.',
    },
    body: {
      en: 'Red flag or green? Twenty behaviours decide it — no guessing, no wishful reading.',
      fr: 'Drapeau rouge ou vert ? Vingt comportements tranchent — sans deviner, sans se mentir.',
      ar: 'راية حمراء أم خضراء؟ عشرون سلوكاً تحسم الأمر — بلا تخمين ولا تمنٍّ.',
      es: '¿Bandera roja o verde? Veinte conductas lo deciden — sin adivinar, sin ilusiones.',
    },
  },
  {
    id: 'noon_soulmate',
    moduleId: 'who_soulmate',
    slot: 'noon',
    title: {
      en: 'Who feels like home?',
      fr: 'Qui te fait sentir chez toi ?',
      ar: 'من يشعرك بأنك في بيتك؟',
      es: '¿Quién se siente como hogar?',
    },
    body: {
      en: 'Not the loudest one. The one your shoulders drop around. See who it actually is.',
      fr: 'Pas le plus bruyant. Celui près de qui tes épaules se relâchent. Vois qui c’est vraiment.',
      ar: 'ليس الأعلى صوتاً، بل من ترتخي كتفاك بقربه. اعرف من هو حقاً.',
      es: 'No el más ruidoso. Aquel con quien bajas los hombros. Descubre quién es de verdad.',
    },
  },

  // ── NIGHT (23:00) — the thought you can't put down ─────────────────────────
  {
    id: 'night_loves',
    moduleId: 'who_loves_me',
    slot: 'night',
    title: {
      en: 'Still wondering who really cares?',
      fr: 'Tu te demandes encore qui tient à toi ?',
      ar: 'ما زلت تتساءل من يهتم بك حقاً؟',
      es: '¿Sigues preguntándote quién te quiere de verdad?',
    },
    body: {
      en: 'Stop replaying it. Twenty questions and you will know who has been choosing you all along.',
      fr: 'Arrête de rejouer la scène. Vingt questions et tu sauras qui te choisit depuis le début.',
      ar: 'توقف عن إعادة المشهد. عشرون سؤالاً وستعرف من كان يختارك طوال الوقت.',
      es: 'Deja de darle vueltas. Veinte preguntas y sabrás quién te ha elegido desde siempre.',
    },
  },
  {
    id: 'night_jealous',
    moduleId: 'who_jealous',
    slot: 'night',
    title: {
      en: 'The smile that never reached their eyes',
      fr: 'Ce sourire qui n’atteignait pas ses yeux',
      ar: 'تلك الابتسامة التي لم تصل إلى عينيه',
      es: 'Esa sonrisa que no llegó a sus ojos',
    },
    body: {
      en: 'Envy hides inside advice and half-congratulations. Find out who it is coming from.',
      fr: 'L’envie se cache dans les conseils et les demi-félicitations. Découvre d’où elle vient.',
      ar: 'الحسد يختبئ في النصائح والتهاني الناقصة. اكتشف ممن يأتي.',
      es: 'La envidia se esconde en consejos y medias felicitaciones. Descubre de quién viene.',
    },
  },
  {
    id: 'night_cutoff',
    moduleId: 'who_cut_off',
    slot: 'night',
    title: {
      en: 'Someone has been pulling away',
      fr: 'Quelqu’un prend ses distances',
      ar: 'شخص ما يبتعد عنك تدريجياً',
      es: 'Alguien se ha estado alejando',
    },
    body: {
      en: 'It starts long before the last message. See who is already halfway out the door.',
      fr: 'Ça commence bien avant le dernier message. Vois qui est déjà à moitié parti.',
      ar: 'يبدأ الأمر قبل آخر رسالة بكثير. اعرف من قطع نصف الطريق للخروج.',
      es: 'Empieza mucho antes del último mensaje. Mira quién ya está medio fuera.',
    },
  },
  {
    id: 'night_hates',
    moduleId: 'who_hates_me',
    slot: 'night',
    title: {
      en: 'Not everyone smiling is on your side',
      fr: 'Tous ceux qui sourient ne sont pas de ton côté',
      ar: 'ليس كل مبتسم في صفك',
      es: 'No todos los que sonríen están de tu lado',
    },
    body: {
      en: 'Some warmth is performance. Twenty questions will tell you whose is real.',
      fr: 'Certaines chaleurs sont jouées. Vingt questions te diront laquelle est vraie.',
      ar: 'بعض الدفء تمثيل. عشرون سؤالاً ستخبرك أيّها حقيقي.',
      es: 'Algo de esa calidez es actuación. Veinte preguntas te dirán cuál es real.',
    },
  },
  {
    id: 'night_hurt',
    moduleId: 'who_will_hurt_me',
    slot: 'night',
    title: {
      en: 'The one you should be watching',
      fr: 'Celui que tu devrais surveiller',
      ar: 'الشخص الذي يجب أن تنتبه له',
      es: 'A quien deberías estar mirando',
    },
    body: {
      en: 'The pattern is usually visible months early. Read it before it costs you something.',
      fr: 'Le schéma est visible des mois à l’avance. Lis-le avant qu’il ne te coûte cher.',
      ar: 'النمط يظهر قبل شهور عادةً. اقرأه قبل أن يكلّفك شيئاً.',
      es: 'El patrón suele verse meses antes. Léelo antes de que te cueste algo.',
    },
  },
  {
    id: 'night_shadow',
    moduleId: 'shadow_self',
    slot: 'night',
    title: {
      en: 'The part of you that only shows up at night',
      fr: 'Cette part de toi qui ne sort que la nuit',
      ar: 'ذلك الجزء منك الذي يظهر ليلاً فقط',
      es: 'La parte de ti que solo aparece de noche',
    },
    body: {
      en: 'Everyone has one. Meeting it is how it stops running the show.',
      fr: 'Tout le monde en a une. La rencontrer, c’est l’empêcher de tout diriger.',
      ar: 'لدى الجميع واحد. مواجهته هي ما يمنعه من إدارة حياتك.',
      es: 'Todos tenemos una. Enfrentarla es lo que le quita el mando.',
    },
  },
  {
    id: 'night_energy',
    moduleId: 'energy_reading',
    slot: 'night',
    title: {
      en: 'Why are you this tired?',
      fr: 'Pourquoi es-tu si fatigué ?',
      ar: 'لماذا أنت متعب إلى هذا الحد؟',
      es: '¿Por qué estás tan cansado?',
    },
    body: {
      en: 'Some people cost more than they give. Read the energy moving between you.',
      fr: 'Certaines personnes coûtent plus qu’elles ne donnent. Lis l’énergie qui circule entre vous.',
      ar: 'بعض الناس يأخذون أكثر مما يعطون. اقرأ الطاقة التي تتحرك بينكما.',
      es: 'Algunas personas cuestan más de lo que dan. Lee la energía que circula entre ustedes.',
    },
  },
];

/** Whole days since the epoch for a `YYYY-MM-DD` key. Parsed as UTC so the number only
 *  ever changes when the LOCAL calendar date does — no DST drift mid-cycle. */
function dayNumber(dateKey: string): number {
  const [y, m, d] = dateKey.split('-').map(Number);
  return Math.floor(Date.UTC(y, (m ?? 1) - 1, d ?? 1) / 86_400_000);
}

/** Offsets the night cycle so the two slots don't advance as an obvious pair. */
const NIGHT_PHASE = 3;

/**
 * The teaser for a given local day + slot. Deterministic and stable all day, identical
 * across a reschedule, reproducible in the dev panel.
 *
 * A straight ROTATION (`dayNumber % poolSize`), not a hash: a hash is "random" but it
 * collides, so the same nudge could land twice inside one week while others never fire.
 * Rotating walks the whole pool exactly once per 7 days — genuinely new copy every day.
 * Night is phase-shifted so noon and night never move in lockstep.
 */
export function getTeaserForDay(dateKey: string, slot: TeaserSlot): TeaserNotification {
  const pool = TEASERS.filter((tz) => tz.slot === slot);
  const phase = slot === 'night' ? NIGHT_PHASE : 0;
  return pool[(((dayNumber(dateKey) + phase) % pool.length) + pool.length) % pool.length];
}

/**
 * DEV-ONLY structural check. Returns a list of problems (empty = valid).
 * Asserts: unique ids · both slots populated · every moduleId is a live, non-comingSoon
 * module · all 4 locales present on every string.
 */
export function validateTeasers(moduleIds: Set<string>): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const tz of TEASERS) {
    if (seen.has(tz.id)) errors.push(`duplicate teaser id "${tz.id}"`);
    seen.add(tz.id);
    if (!moduleIds.has(tz.moduleId)) {
      errors.push(`teaser "${tz.id}" → "${tz.moduleId}" is not a live module`);
    }
    for (const field of ['title', 'body'] as const) {
      for (const loc of ['en', 'fr', 'ar', 'es'] as const) {
        if (!tz[field][loc]?.trim()) errors.push(`teaser "${tz.id}".${field} missing ${loc}`);
      }
    }
  }
  for (const slot of ['noon', 'night'] as TeaserSlot[]) {
    if (!TEASERS.some((tz) => tz.slot === slot)) errors.push(`no teasers for slot "${slot}"`);
  }
  return errors;
}
