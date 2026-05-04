// STUB — expand to 20 questions before production
import { Question } from '../../types';

export const whoCutOffQuestions: Question[] = [
  {
    id: 'who_cut_off_q01',
    text: {
      en: "Who has gone from consistent presence in your life to sudden silence or distance?",
      fr: "Qui est passé d'une présence constante dans ta vie à un silence ou une distance soudains ?",
      ar: "من انتقل من حضور ثابت في حياتك إلى صمت أو ابتعاد مفاجئ؟",
      es: "¿Quién ha pasado de una presencia constante en tu vida a un silencio o distancia repentinos?",
    },
    framework: 'mixed',
    dimension: 'withdrawal',
    personWeight: 2,
  },
  {
    id: 'who_cut_off_q02',
    text: {
      en: "Who stopped reaching out first, and only responds when you initiate?",
      fr: "Qui a arrêté de prendre contact en premier et ne répond que quand tu prends l'initiative ?",
      ar: "من توقف عن التواصل أولاً، ويرد فقط عندما تبادر أنت؟",
      es: "¿Quién dejó de comunicarse primero y solo responde cuando tú inicias?",
    },
    framework: 'mixed',
    dimension: 'passive_withdrawal',
    personWeight: 1,
  },
  {
    id: 'who_cut_off_q03',
    text: {
      en: "Who was the first to stop showing up at shared events or gatherings?",
      fr: "Qui a été le premier à ne plus se présenter aux événements ou rassemblements partagés ?",
      ar: "من كان أول من توقف عن الحضور في المناسبات أو التجمعات المشتركة؟",
      es: "¿Quién fue el primero en dejar de aparecer en eventos o reuniones compartidas?",
    },
    framework: 'mixed',
    dimension: 'withdrawal',
    personWeight: 1,
  },
  {
    id: 'who_cut_off_q04',
    text: {
      en: "Who has never explained a change in their behavior toward you?",
      fr: "Qui n'a jamais expliqué un changement dans son comportement envers toi ?",
      ar: "من لم يفسر أبداً تغيراً في سلوكه تجاهك؟",
      es: "¿Quién nunca ha explicado un cambio en su comportamiento hacia ti?",
    },
    framework: 'mixed',
    dimension: 'passive_withdrawal',
    personWeight: 2,
  },
  {
    id: 'who_cut_off_q05',
    text: {
      en: "Who would you say has emotionally 'left' the relationship, even if still physically present?",
      fr: "Qui dirais-tu a émotionnellement 'quitté' la relation, même s'il est encore physiquement présent ?",
      ar: "من تقول أنه غادر العلاقة عاطفياً، حتى لو كان لا يزال موجوداً جسدياً؟",
      es: "¿Quién dirías que ha 'abandonado' emocionalmente la relación, aunque todavía esté físicamente presente?",
    },
    framework: 'mixed',
    dimension: 'withdrawal',
    personWeight: 2,
  },
  // TODO: add 15 more questions
];
