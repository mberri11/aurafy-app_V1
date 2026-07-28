// ─────────────────────────────────────────────────────────────────────────────
// DAILY QUOTE — content layer for the daily ritual.
// ─────────────────────────────────────────────────────────────────────────────
// Generated from aurafy-quotes.v3.ts (2026-07-25). The Daily Quote IS the whole
// daily ritual now: open → read → tap Done → +1★, streak +1. No daily question,
// no weekly outcome, no article coupling.
//
// Quotes have their OWN id space (q_001…q_056). Nothing gates on quote identity —
// the once-per-day guard is the store's local-day check, exactly as before. NEVER
// persist a quote id as economy state.
//
// QUOTE_SEQUENCE is ORDERED and index-addressed by days-since-anchor. Entries
// 0-6, 7-13, 14-20 … are thematically clustered in runs of 7 so a user sees a
// coherent week. Do not reorder, renumber, or regenerate.
//
// Long-form quote copy lives HERE (per-locale QUOTE_BODIES), never in
// src/i18n/*.json — that file is only short UI chrome (the `quotes.*` namespace).
//
// UNTOUCHED by this feature: ARTICLES, content.{en,fr,ar,es}.ts, every wNN_*.ts,
// the Insights feed and its components. Articles remain browsable editorial content.
// ─────────────────────────────────────────────────────────────────────────────

import type { Language } from '../../types';
import { getDaysSinceAnchor } from '../../utils/date';

export type QuoteTone = 'soft' | 'sharp' | 'grounding';

export type QuoteEntry = {
  id: string;
  /** null → render i18n quotes.originalAuthor ("Aurafy") */
  authorKey: string | null;
  tone: QuoteTone;
};

/** Ordered. Index = day offset from the user's anchor date. */
export const QUOTE_SEQUENCE: QuoteEntry[] = [
  // ── cluster 1
  { id: 'q_018', authorKey: 'weil', tone: 'soft' },
  { id: 'q_008', authorKey: null, tone: 'grounding' },
  { id: 'q_009', authorKey: 'angelou', tone: 'sharp' },
  { id: 'q_020', authorKey: null, tone: 'soft' },
  { id: 'q_030', authorKey: null, tone: 'grounding' },
  { id: 'q_035', authorKey: null, tone: 'soft' },
  { id: 'q_034', authorKey: null, tone: 'sharp' },
  // ── cluster 2
  { id: 'q_025', authorKey: null, tone: 'soft' },
  { id: 'q_016', authorKey: null, tone: 'sharp' },
  { id: 'q_010', authorKey: null, tone: 'sharp' },
  { id: 'q_029', authorKey: null, tone: 'soft' },
  { id: 'q_038', authorKey: null, tone: 'soft' },
  { id: 'q_046', authorKey: null, tone: 'grounding' },
  { id: 'q_031', authorKey: null, tone: 'sharp' },
  // ── cluster 3
  { id: 'q_019', authorKey: null, tone: 'sharp' },
  { id: 'q_015', authorKey: null, tone: 'sharp' },
  { id: 'q_013', authorKey: null, tone: 'sharp' },
  { id: 'q_024', authorKey: null, tone: 'grounding' },
  { id: 'q_049', authorKey: null, tone: 'sharp' },
  { id: 'q_048', authorKey: null, tone: 'sharp' },
  { id: 'q_005', authorKey: null, tone: 'sharp' },
  // ── cluster 4
  { id: 'q_050', authorKey: null, tone: 'sharp' },
  { id: 'q_003', authorKey: null, tone: 'grounding' },
  { id: 'q_007', authorKey: null, tone: 'soft' },
  { id: 'q_011', authorKey: null, tone: 'sharp' },
  { id: 'q_052', authorKey: null, tone: 'grounding' },
  { id: 'q_041', authorKey: null, tone: 'soft' },
  { id: 'q_012', authorKey: null, tone: 'grounding' },
  // ── cluster 5
  { id: 'q_021', authorKey: null, tone: 'sharp' },
  { id: 'q_026', authorKey: null, tone: 'sharp' },
  { id: 'q_022', authorKey: null, tone: 'sharp' },
  { id: 'q_023', authorKey: null, tone: 'sharp' },
  { id: 'q_027', authorKey: null, tone: 'sharp' },
  { id: 'q_028', authorKey: null, tone: 'grounding' },
  { id: 'q_033', authorKey: 'aristotle', tone: 'grounding' },
  // ── cluster 6
  { id: 'q_051', authorKey: null, tone: 'soft' },
  { id: 'q_053', authorKey: null, tone: 'soft' },
  { id: 'q_054', authorKey: 'roosevelt', tone: 'sharp' },
  { id: 'q_055', authorKey: null, tone: 'grounding' },
  { id: 'q_056', authorKey: null, tone: 'sharp' },
  { id: 'q_001', authorKey: null, tone: 'soft' },
  { id: 'q_006', authorKey: 'lamott', tone: 'soft' },
  // ── cluster 7
  { id: 'q_043', authorKey: 'jung', tone: 'sharp' },
  { id: 'q_044', authorKey: null, tone: 'soft' },
  { id: 'q_040', authorKey: null, tone: 'sharp' },
  { id: 'q_004', authorKey: 'socrates', tone: 'sharp' },
  { id: 'q_017', authorKey: 'rumi', tone: 'soft' },
  { id: 'q_045', authorKey: null, tone: 'soft' },
  { id: 'q_014', authorKey: 'aurelius', tone: 'grounding' },
  // ── cluster 8
  { id: 'q_002', authorKey: 'laoTzu', tone: 'grounding' },
  { id: 'q_032', authorKey: null, tone: 'sharp' },
  { id: 'q_036', authorKey: null, tone: 'soft' },
  { id: 'q_037', authorKey: null, tone: 'soft' },
  { id: 'q_039', authorKey: null, tone: 'grounding' },
  { id: 'q_042', authorKey: null, tone: 'grounding' },
  { id: 'q_047', authorKey: 'aurelius', tone: 'grounding' },
];

export function getQuoteForDay(daysSinceAnchor: number): QuoteEntry {
  const n = QUOTE_SEQUENCE.length;
  const i = ((Math.floor(daysSinceAnchor) % n) + n) % n;
  return QUOTE_SEQUENCE[i];
}

export function getQuoteById(id: string): QuoteEntry {
  return QUOTE_SEQUENCE.find((q) => q.id === id) ?? QUOTE_SEQUENCE[0];
}

export const QUOTE_BODIES = {
  en: {
    q_018: { text: "Attention is the rarest and purest form of generosity.", reflection: "Anyone can send a message. Very few can actually be present. Notice who gives you their full attention \u2014 that is the real signal." },
    q_008: { text: "Your energy introduces you before you speak.", reflection: "People read your posture, your pauses, your willingness to be present. The words arrive late and confirm what was already decided." },
    q_009: { text: "People will forget what you said, but people will never forget how you made them feel.", reflection: "This cuts both ways. The residue you leave is the real record. It is also the one thing you can still change." },
    q_020: { text: "Being chosen quietly beats being wanted loudly.", reflection: "Volume is not commitment. Consistency in small, unwitnessed moments is what actually holds." },
    q_030: { text: "Notice who celebrates you when there is nothing to gain.", reflection: "The absence of an audience is the real test. Look at who shows up when your win does not benefit them at all." },
    q_035: { text: "The friend who listens is worth ten who talk.", reflection: "Being heard is rarer than being advised. Protect the people who let you finish your sentences." },
    q_034: { text: "Jealousy wears the mask of advice.", reflection: "Listen for the concern that always arrives right after your good news. Care builds you up; envy edits you down." },
    q_025: { text: "Distance is not cruelty. Sometimes it is survival.", reflection: "Stepping back is not the same as abandoning. You are allowed to protect yourself from someone you still love." },
    q_016: { text: "You are not too much. You were with someone too little.", reflection: "Intensity is not a defect. Mismatched capacity is not your failure to shrink correctly." },
    q_010: { text: "You feel drained because you are lending energy you never agreed to give.", reflection: "Not every request deserves a yes. Notice which relationships end with you needing recovery time." },
    q_029: { text: "Some friendships expire. That does not make them failures.", reflection: "A friendship that carried you through one season did its job. Not everything is meant to scale into the next version of you." },
    q_038: { text: "Grief is love with nowhere to go.", reflection: "The weight is proportional to what mattered. You are not broken for still carrying it; you are just still loving something you cannot reach." },
    q_046: { text: "Growth feels like loss before it feels like freedom.", reflection: "You have to release the old version before the new one has room. The grief in between is normal and temporary." },
    q_031: { text: "A friend who only appears in your winter is not a friend.", reflection: "Some people are drawn to your struggle because it keeps them comfortable. Watch how they handle your good news." },
    q_019: { text: "If you have to decode it, it was never clear love.", reflection: "Mixed signals are a signal. Someone who wants you understood will make themselves understandable." },
    q_015: { text: "Love that requires your silence is not love.", reflection: "If the relationship only stays calm when you stop being honest, the calm is not peace. It is management." },
    q_013: { text: "The energy you tolerate is the energy you attract.", reflection: "Tolerance reads as invitation. What you let slide once becomes the baseline others work from." },
    q_024: { text: "You teach people how to treat you by what you accept.", reflection: "Every unchallenged behavior is a lesson delivered. Silence is curriculum." },
    q_049: { text: "You cannot heal what you keep pretending is fine.", reflection: "Naming it is not weakness; it is the precondition. Nothing gets treated while it stays undiagnosed." },
    q_048: { text: "Be honest about the version of you that you are protecting.", reflection: "Most defensiveness guards an old self-image. Ask what would actually be lost if you let it be revised." },
    q_005: { text: "You cannot read your own energy while performing for someone else\u2019s.", reflection: "Performance costs bandwidth. Every gesture you calculate is attention taken from noticing how you actually feel." },
    q_050: { text: "Stop auditioning for a place you already belong.", reflection: "Over-proving is a habit from rooms that never accepted you. Check whether you are still performing for people who already said yes." },
    q_003: { text: "Stillness is not emptiness. It is where you hear yourself.", reflection: "Noise is easy to hide inside. When it drops away, what surfaces first is usually what you have been avoiding \u2014 and what you most need to hear." },
    q_007: { text: "Return to yourself the way water returns to the sea.", reflection: "Not forced, not dramatic. Just the natural direction of things when you stop pushing against them." },
    q_011: { text: "Protect your peace like it pays your rent.", reflection: "Because it does. Everything you build \u2014 work, love, health \u2014 runs on a nervous system that can actually rest." },
    q_052: { text: "Confidence is not loud. It is unbothered.", reflection: "Real security does not need to argue for itself. Watch for the calm that does not require anyone to agree." },
    q_041: { text: "Softness after damage is the bravest thing.", reflection: "Hardening is the obvious response. Staying open after you have been given every reason not to is the harder, rarer choice." },
    q_012: { text: "Not every room deserves your full color.", reflection: "Discretion is not dishonesty. Some rooms have not earned your depth, and giving it anyway is how you end up feeling unseen." },
    q_021: { text: "Real love does not make you audition for it.", reflection: "If you are constantly proving you deserve to stay, you are not in a relationship. You are in an evaluation." },
    q_026: { text: "Being available always makes you valued never.", reflection: "Not a game, just economics of attention. What costs nothing to access rarely gets treated as precious." },
    q_022: { text: "\"No\" is a complete sentence.", reflection: "Explanation invites negotiation. You are allowed to decline without building a case for it." },
    q_023: { text: "Guilt is the tax people charge you for your first boundary.", reflection: "It fades. What feels like cruelty in week one usually reads as clarity by month three \u2014 to both of you." },
    q_027: { text: "Peace costs some relationships. Pay it.", reflection: "Some connections only survive your self-abandonment. Losing them is the price, not the tragedy." },
    q_028: { text: "Closing a door is also an act of self-respect.", reflection: "You do not owe anyone permanent access. An ending, chosen consciously, is not a failure of loyalty." },
    q_033: { text: "A friend to all is a friend to none.", reflection: "Depth requires selection. Spreading yourself across everyone leaves nothing substantial for anyone." },
    q_051: { text: "Your standards are not the reason you are alone.", reflection: "Waiting is not the same as being unwanted. Lowering the bar does not create connection; it just changes who is allowed near you." },
    q_053: { text: "You do not need permission to take up space.", reflection: "Shrinking to keep the peace is a habit, not a personality. Your presence was never conditional on someone else\u2019s approval." },
    q_054: { text: "No one can make you feel inferior without your consent.", reflection: "Not a claim that words do not land. A reminder that the final ruling on your worth is still yours to issue." },
    q_055: { text: "You are allowed to outgrow people who knew you first.", reflection: "Early access is not lifetime authority. The people who met you at your smallest do not get to define your ceiling." },
    q_056: { text: "Choose yourself. Nobody else has that job.", reflection: "You can be loved and still be the only one responsible for your own advocacy. Nobody is coming to do it for you." },
    q_001: { text: "You are not behind. You are becoming.", reflection: "Comparison collapses time. Someone else\u2019s chapter twelve is not your chapter three. The pace you are moving at is still movement." },
    q_006: { text: "Almost everything will work again if you unplug it for a few minutes \u2014 including you.", reflection: "Exhaustion is not a character flaw. It is data. Rest is not what you earn after the work; it is part of the work." },
    q_043: { text: "Everything that irritates us about others can lead us to an understanding of ourselves.", reflection: "The intensity of your reaction is the clue. Mild annoyance is preference; disproportionate anger is usually recognition." },
    q_044: { text: "The part of you that you hide is the part that needs air.", reflection: "Concealment does not resolve anything. What stays in the dark keeps its power over you and grows unchecked." },
    q_040: { text: "What you refuse to feel, you will repeat.", reflection: "Avoidance does not delete an emotion. It reroutes it \u2014 into your body, your patterns, your next relationship." },
    q_004: { text: "Know thyself.", reflection: "Two words, a lifetime of work. Most of what you call intuition is really memory. Learning the difference is the whole practice." },
    q_017: { text: "The wound is the place where the light enters you.", reflection: "Not a reason to seek pain. A reason to stop treating your damage as disqualifying. It is often the opening through which you finally understand someone else." },
    q_045: { text: "You are not your worst night.", reflection: "A single failure is an event, not an identity. You are the pattern across time, not the outlier you cannot stop replaying." },
    q_014: { text: "You have power over your mind \u2014 not outside events. Realize this, and you will find strength.", reflection: "You cannot control the room. You can control what you carry into it and what you agree to carry out." },
    q_002: { text: "The journey of a thousand miles begins with a single step.", reflection: "You do not need the full map today. You need the next step, taken honestly. Momentum is built, never found." },
    q_032: { text: "Loyalty is not proven in comfort. It is proven in cost.", reflection: "Anyone can stand beside you when it is free. The measure is what someone is willing to lose to stay." },
    q_036: { text: "Healing is not linear. It is a spiral with better views.", reflection: "Revisiting old pain does not mean you regressed. You are meeting the same thing from higher ground, with more capacity." },
    q_037: { text: "You survived every day you thought you would not.", reflection: "Your track record is one hundred percent. That is not luck \u2014 that is evidence of something in you that keeps holding." },
    q_039: { text: "Forgive for your own lightness, not for their comfort.", reflection: "Forgiveness is not permission or reconciliation. It is putting down something that was only ever heavy for you." },
    q_042: { text: "Time does not heal. What you do with time heals.", reflection: "Years alone just add distance. Attention, honesty, and support are what actually convert time into recovery." },
    q_047: { text: "The impediment to action advances action. What stands in the way becomes the way.", reflection: "The obstacle is not interrupting your path. Very often it is the specific thing that will build what you are missing." },
  },
  fr: {
    q_018: { text: "L\u2019attention est la forme la plus rare et la plus pure de g\u00e9n\u00e9rosit\u00e9.", reflection: "Tout le monde peut envoyer un message. Tr\u00e8s peu savent \u00eatre pr\u00e9sents. Observe qui te donne son attention enti\u00e8re." },
    q_008: { text: "Ton \u00e9nergie te pr\u00e9sente avant que tu parles.", reflection: "On lit ta posture, tes silences, ta pr\u00e9sence. Les mots arrivent en dernier et ne font que confirmer." },
    q_009: { text: "Les gens oublieront ce que tu as dit, mais jamais ce que tu leur as fait ressentir.", reflection: "Cela va dans les deux sens. La trace que tu laisses est le vrai bilan \u2014 et la seule chose encore modifiable." },
    q_020: { text: "\u00catre choisi en silence vaut mieux qu\u2019\u00eatre d\u00e9sir\u00e9 bruyamment.", reflection: "Le volume n\u2019est pas l\u2019engagement. C\u2019est la constance dans les petits moments sans t\u00e9moins qui tient." },
    q_030: { text: "Observe qui te c\u00e9l\u00e8bre quand il n\u2019y a rien \u00e0 y gagner.", reflection: "L\u2019absence de public est le vrai test. Regarde qui vient quand ta victoire ne lui rapporte rien." },
    q_035: { text: "L\u2019ami qui \u00e9coute en vaut dix qui parlent.", reflection: "\u00catre entendu est plus rare qu\u2019\u00eatre conseill\u00e9. Prot\u00e8ge ceux qui te laissent finir tes phrases." },
    q_034: { text: "La jalousie porte le masque du conseil.", reflection: "\u00c9coute l\u2019inqui\u00e9tude qui arrive juste apr\u00e8s ta bonne nouvelle. L\u2019affection \u00e9l\u00e8ve, l\u2019envie corrige." },
    q_025: { text: "La distance n\u2019est pas de la cruaut\u00e9. Parfois c\u2019est de la survie.", reflection: "Reculer n\u2019est pas abandonner. Tu as le droit de te prot\u00e9ger de quelqu\u2019un que tu aimes encore." },
    q_016: { text: "Tu n\u2019es pas trop. Tu \u00e9tais avec quelqu\u2019un de trop peu.", reflection: "L\u2019intensit\u00e9 n\u2019est pas un d\u00e9faut. Une capacit\u00e9 mal assortie n\u2019est pas ton \u00e9chec \u00e0 r\u00e9tr\u00e9cir." },
    q_010: { text: "Tu es \u00e9puis\u00e9 car tu pr\u00eates une \u00e9nergie que tu n\u2019as jamais promise.", reflection: "Toutes les demandes ne m\u00e9ritent pas un oui. Observe quelles relations te laissent en r\u00e9cup\u00e9ration." },
    q_029: { text: "Certaines amiti\u00e9s expirent. Ce ne sont pas des \u00e9checs.", reflection: "Une amiti\u00e9 qui t\u2019a port\u00e9 une saison a fait son travail. Tout n\u2019est pas fait pour durer." },
    q_038: { text: "Le deuil, c\u2019est l\u2019amour sans destination.", reflection: "Le poids est proportionnel \u00e0 ce qui comptait. Tu n\u2019es pas cass\u00e9 : tu aimes encore quelque chose d\u2019inatteignable." },
    q_046: { text: "La croissance ressemble \u00e0 une perte avant de ressembler \u00e0 la libert\u00e9.", reflection: "Il faut l\u00e2cher l\u2019ancienne version pour faire de la place. Le vide entre les deux est normal." },
    q_031: { text: "Un ami qui n\u2019appara\u00eet qu\u2019en hiver n\u2019est pas un ami.", reflection: "Certains sont attir\u00e9s par ta lutte car elle les rassure. Observe leur r\u00e9action \u00e0 tes bonnes nouvelles." },
    q_019: { text: "Si tu dois le d\u00e9coder, ce n\u2019\u00e9tait pas un amour clair.", reflection: "Les signaux flous sont eux-m\u00eames un signal. Qui veut \u00eatre compris se rend compr\u00e9hensible." },
    q_015: { text: "Un amour qui exige ton silence n\u2019est pas de l\u2019amour.", reflection: "Si la relation n\u2019est calme que lorsque tu cesses d\u2019\u00eatre honn\u00eate, ce calme n\u2019est pas la paix. C\u2019est de la gestion." },
    q_013: { text: "L\u2019\u00e9nergie que tu tol\u00e8res est celle que tu attires.", reflection: "Tol\u00e9rer se lit comme inviter. Ce que tu laisses passer une fois devient la norme des autres." },
    q_024: { text: "Tu enseignes aux autres comment te traiter par ce que tu acceptes.", reflection: "Chaque comportement non relev\u00e9 est une le\u00e7on donn\u00e9e. Le silence est un programme." },
    q_049: { text: "Tu ne peux pas gu\u00e9rir ce que tu pr\u00e9tends aller bien.", reflection: "Nommer n\u2019est pas faiblir, c\u2019est la condition pr\u00e9alable. Rien ne se soigne sans diagnostic." },
    q_048: { text: "Sois honn\u00eate sur la version de toi que tu prot\u00e8ges.", reflection: "La d\u00e9fensive garde une vieille image de soi. Demande ce que tu perdrais vraiment \u00e0 la r\u00e9viser." },
    q_005: { text: "Tu ne peux pas lire ton \u00e9nergie en jouant celle d\u2019un autre.", reflection: "Jouer un r\u00f4le co\u00fbte de l\u2019attention. Chaque geste calcul\u00e9 est pris sur ta capacit\u00e9 \u00e0 sentir ce que tu ressens vraiment." },
    q_050: { text: "Cesse de passer une audition l\u00e0 o\u00f9 tu as d\u00e9j\u00e0 ta place.", reflection: "Trop prouver est une habitude venue de pi\u00e8ces qui ne t\u2019acceptaient pas. V\u00e9rifie qui a d\u00e9j\u00e0 dit oui." },
    q_003: { text: "Le calme n\u2019est pas le vide. C\u2019est l\u00e0 que tu t\u2019entends.", reflection: "Le bruit est un bon refuge. Quand il tombe, ce qui remonte d\u2019abord est souvent ce que tu \u00e9vitais \u2014 et ce que tu dois entendre." },
    q_007: { text: "Reviens \u00e0 toi comme l\u2019eau revient \u00e0 la mer.", reflection: "Sans force, sans drame. Simplement la direction naturelle des choses quand tu cesses de lutter." },
    q_011: { text: "Prot\u00e8ge ta paix comme si elle payait ton loyer.", reflection: "Parce que c\u2019est le cas. Tout ce que tu construis repose sur un syst\u00e8me nerveux capable de se reposer." },
    q_052: { text: "La confiance n\u2019est pas bruyante. Elle est imperturbable.", reflection: "La vraie s\u00e9curit\u00e9 n\u2019a pas besoin de plaider. Cherche le calme qui n\u2019exige l\u2019accord de personne." },
    q_041: { text: "La douceur apr\u00e8s la blessure est le plus grand courage.", reflection: "Durcir est la r\u00e9ponse \u00e9vidente. Rester ouvert malgr\u00e9 tout est le choix rare." },
    q_012: { text: "Toutes les pi\u00e8ces ne m\u00e9ritent pas ta pleine couleur.", reflection: "La r\u00e9serve n\u2019est pas de la malhonn\u00eatet\u00e9. Certains lieux n\u2019ont pas m\u00e9rit\u00e9 ta profondeur." },
    q_021: { text: "Le v\u00e9ritable amour ne te fait pas passer d\u2019audition.", reflection: "Si tu prouves sans cesse que tu m\u00e9rites de rester, ce n\u2019est pas une relation. C\u2019est une \u00e9valuation." },
    q_026: { text: "\u00catre toujours disponible, c\u2019est n\u2019\u00eatre jamais valoris\u00e9.", reflection: "Ce n\u2019est pas un jeu, c\u2019est l\u2019\u00e9conomie de l\u2019attention. Ce qui ne co\u00fbte rien est rarement trait\u00e9 comme pr\u00e9cieux." },
    q_022: { text: "\u00ab Non \u00bb est une phrase compl\u00e8te.", reflection: "Expliquer ouvre la n\u00e9gociation. Tu as le droit de refuser sans plaider ta cause." },
    q_023: { text: "La culpabilit\u00e9 est la taxe impos\u00e9e \u00e0 ta premi\u00e8re limite.", reflection: "Elle s\u2019efface. Ce qui semble cruel la premi\u00e8re semaine devient de la clart\u00e9 au bout de trois mois." },
    q_027: { text: "La paix co\u00fbte certaines relations. Paie le prix.", reflection: "Certains liens ne survivent qu\u2019\u00e0 ton abandon de toi. Les perdre est le prix, pas la trag\u00e9die." },
    q_028: { text: "Fermer une porte est aussi un acte d\u2019amour-propre.", reflection: "Tu ne dois \u00e0 personne un acc\u00e8s permanent. Une fin choisie n\u2019est pas une trahison." },
    q_033: { text: "Un ami de tous n\u2019est l\u2019ami de personne.", reflection: "La profondeur demande un choix. \u00catre partout ne laisse rien de solide nulle part." },
    q_051: { text: "Tes exigences ne sont pas la raison de ta solitude.", reflection: "Attendre n\u2019est pas \u00eatre ind\u00e9sirable. Baisser la barre ne cr\u00e9e pas de lien, cela change juste qui approche." },
    q_053: { text: "Tu n\u2019as pas besoin de permission pour prendre ta place.", reflection: "Se faire petit pour garder la paix est une habitude, pas une personnalit\u00e9. Ta pr\u00e9sence n\u2019a jamais \u00e9t\u00e9 conditionnelle." },
    q_054: { text: "Personne ne peut te faire sentir inf\u00e9rieur sans ton consentement.", reflection: "Non pas que les mots ne blessent pas. Mais le verdict final sur ta valeur t\u2019appartient encore." },
    q_055: { text: "Tu as le droit de d\u00e9passer ceux qui t\u2019ont connu en premier.", reflection: "L\u2019anciennet\u00e9 n\u2019est pas une autorit\u00e9. Ceux qui t\u2019ont vu au plus petit ne fixent pas ton plafond." },
    q_056: { text: "Choisis-toi. Personne d\u2019autre n\u2019a ce poste.", reflection: "Tu peux \u00eatre aim\u00e9 et rester seul responsable de ta propre d\u00e9fense. Personne ne viendra le faire." },
    q_001: { text: "Tu n\u2019es pas en retard. Tu es en train de devenir.", reflection: "La comparaison \u00e9crase le temps. Le chapitre douze d\u2019un autre n\u2019est pas ton chapitre trois. Ton rythme reste du mouvement." },
    q_006: { text: "Presque tout refonctionne si on le d\u00e9branche quelques minutes \u2014 toi compris.", reflection: "L\u2019\u00e9puisement n\u2019est pas un d\u00e9faut de caract\u00e8re. C\u2019est une information. Le repos n\u2019est pas la r\u00e9compense du travail, il en fait partie." },
    q_043: { text: "Tout ce qui nous irrite chez les autres peut nous mener \u00e0 nous comprendre.", reflection: "L\u2019intensit\u00e9 de ta r\u00e9action est l\u2019indice. Une col\u00e8re disproportionn\u00e9e est souvent une reconnaissance." },
    q_044: { text: "La part de toi que tu caches est celle qui a besoin d\u2019air.", reflection: "Cacher ne r\u00e9sout rien. Ce qui reste dans l\u2019ombre garde son pouvoir sur toi." },
    q_040: { text: "Ce que tu refuses de ressentir, tu le r\u00e9p\u00e9teras.", reflection: "L\u2019\u00e9vitement n\u2019efface pas une \u00e9motion. Il la d\u00e9tourne \u2014 vers ton corps, tes sch\u00e9mas, ta prochaine relation." },
    q_004: { text: "Connais-toi toi-m\u00eame.", reflection: "Trois mots, une vie de travail. Ce que tu appelles intuition est souvent de la m\u00e9moire. Distinguer les deux, c\u2019est tout l\u2019exercice." },
    q_017: { text: "La blessure est l\u2019endroit o\u00f9 la lumi\u00e8re entre en toi.", reflection: "Pas une invitation \u00e0 souffrir. Une raison de cesser de voir tes blessures comme disqualifiantes." },
    q_045: { text: "Tu n\u2019es pas ta pire nuit.", reflection: "Un \u00e9chec est un \u00e9v\u00e9nement, pas une identit\u00e9. Tu es le motif d\u2019ensemble, pas l\u2019exception que tu rejoues." },
    q_014: { text: "Tu as pouvoir sur ton esprit, pas sur les \u00e9v\u00e9nements. Comprends-le et tu trouveras ta force.", reflection: "Tu ne contr\u00f4les pas la pi\u00e8ce. Tu contr\u00f4les ce que tu y apportes et ce que tu acceptes d\u2019en ressortir." },
    q_002: { text: "Un voyage de mille lieues commence par un seul pas.", reflection: "Tu n\u2019as pas besoin de la carte enti\u00e8re aujourd\u2019hui. Juste du prochain pas, fait honn\u00eatement. L\u2019\u00e9lan se construit, il ne se trouve pas." },
    q_032: { text: "La loyaut\u00e9 ne se prouve pas dans le confort, mais dans le prix pay\u00e9.", reflection: "Rester quand c\u2019est gratuit est facile. La mesure, c\u2019est ce que quelqu\u2019un accepte de perdre pour toi." },
    q_036: { text: "La gu\u00e9rison n\u2019est pas lin\u00e9aire. C\u2019est une spirale aux meilleures vues.", reflection: "Revisiter une vieille douleur n\u2019est pas r\u00e9gresser. Tu la retrouves depuis un point plus haut." },
    q_037: { text: "Tu as surv\u00e9cu \u00e0 chaque jour que tu croyais impossible.", reflection: "Ton taux de survie est de cent pour cent. Ce n\u2019est pas de la chance, c\u2019est une preuve." },
    q_039: { text: "Pardonne pour ta l\u00e9g\u00e8ret\u00e9, pas pour leur confort.", reflection: "Le pardon n\u2019est ni une permission ni une r\u00e9conciliation. C\u2019est poser un poids qui n\u2019\u00e9tait lourd que pour toi." },
    q_042: { text: "Le temps ne gu\u00e9rit pas. Ce que tu en fais gu\u00e9rit.", reflection: "Les ann\u00e9es seules ajoutent de la distance. L\u2019attention et l\u2019honn\u00eatet\u00e9 transforment le temps en gu\u00e9rison." },
    q_047: { text: "Ce qui fait obstacle \u00e0 l\u2019action fait avancer l\u2019action. L\u2019obstacle devient le chemin.", reflection: "L\u2019obstacle n\u2019interrompt pas ta route. Souvent, il construit exactement ce qui te manquait." },
  },
  ar: {
    q_018: { text: "\u0627\u0644\u0627\u0646\u062a\u0628\u0627\u0647 \u0623\u0646\u062f\u0631 \u0623\u0634\u0643\u0627\u0644 \u0627\u0644\u0643\u0631\u0645 \u0648\u0623\u0646\u0642\u0627\u0647\u0627.", reflection: "\u0623\u064a \u0623\u062d\u062f \u064a\u0633\u062a\u0637\u064a\u0639 \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u0629. \u0642\u0644\u064a\u0644\u0648\u0646 \u064a\u062d\u0636\u0631\u0648\u0646 \u062d\u0642\u064b\u0627. \u0644\u0627\u062d\u0638 \u0645\u0646 \u064a\u0645\u0646\u062d\u0643 \u0627\u0646\u062a\u0628\u0627\u0647\u0647 \u0643\u0627\u0645\u0644\u0627\u064b." },
    q_008: { text: "\u0637\u0627\u0642\u062a\u0643 \u062a\u064f\u0639\u0631\u0651\u0641 \u0639\u0646\u0643 \u0642\u0628\u0644 \u0623\u0646 \u062a\u062a\u0643\u0644\u0645.", reflection: "\u0627\u0644\u0646\u0627\u0633 \u064a\u0642\u0631\u0623\u0648\u0646 \u062d\u0636\u0648\u0631\u0643 \u0648\u0635\u0645\u062a\u0643 \u0648\u0627\u0633\u062a\u0639\u062f\u0627\u062f\u0643 \u0644\u0644\u0625\u0646\u0635\u0627\u062a. \u0627\u0644\u0643\u0644\u0627\u0645 \u064a\u0623\u062a\u064a \u0645\u062a\u0623\u062e\u0631\u064b\u0627 \u0644\u064a\u0624\u0643\u062f \u0645\u0627 \u062a\u0642\u0631\u0631 \u0633\u0644\u0641\u064b\u0627." },
    q_009: { text: "\u0633\u064a\u0646\u0633\u0649 \u0627\u0644\u0646\u0627\u0633 \u0645\u0627 \u0642\u0644\u062a\u0647\u060c \u0644\u0643\u0646\u0647\u0645 \u0644\u0646 \u064a\u0646\u0633\u0648\u0627 \u0645\u0627 \u062c\u0639\u0644\u062a\u0647\u0645 \u064a\u0634\u0639\u0631\u0648\u0646 \u0628\u0647.", reflection: "\u0648\u0627\u0644\u0623\u0645\u0631 \u064a\u0633\u0631\u064a \u0641\u064a \u0627\u0644\u0627\u062a\u062c\u0627\u0647\u064a\u0646. \u0627\u0644\u0623\u062b\u0631 \u0627\u0644\u0630\u064a \u062a\u062a\u0631\u0643\u0647 \u0647\u0648 \u0627\u0644\u0633\u062c\u0644 \u0627\u0644\u062d\u0642\u064a\u0642\u064a\u060c \u0648\u0647\u0648 \u0648\u062d\u062f\u0647 \u0645\u0627 \u0632\u0627\u0644 \u0642\u0627\u0628\u0644\u0627\u064b \u0644\u0644\u062a\u063a\u064a\u064a\u0631." },
    q_020: { text: "\u0623\u0646 \u062a\u064f\u062e\u062a\u0627\u0631 \u0628\u0647\u062f\u0648\u0621 \u062e\u064a\u0631 \u0645\u0646 \u0623\u0646 \u062a\u064f\u0634\u062a\u0647\u0649 \u0628\u0635\u062e\u0628.", reflection: "\u0627\u0644\u0635\u0648\u062a \u0627\u0644\u0639\u0627\u0644\u064a \u0644\u064a\u0633 \u0627\u0644\u062a\u0632\u0627\u0645\u064b\u0627. \u0627\u0644\u062b\u0628\u0627\u062a \u0641\u064a \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0635\u063a\u064a\u0631\u0629 \u062f\u0648\u0646 \u0634\u0647\u0648\u062f \u0647\u0648 \u0645\u0627 \u064a\u0635\u0645\u062f." },
    q_030: { text: "\u0644\u0627\u062d\u0638 \u0645\u0646 \u064a\u062d\u062a\u0641\u064a \u0628\u0643 \u062d\u064a\u0646 \u0644\u0627 \u0645\u0643\u0633\u0628 \u0644\u0647.", reflection: "\u063a\u064a\u0627\u0628 \u0627\u0644\u062c\u0645\u0647\u0648\u0631 \u0647\u0648 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u062d\u0642\u064a\u0642\u064a. \u0627\u0646\u0638\u0631 \u0645\u0646 \u064a\u062d\u0636\u0631 \u062d\u064a\u0646 \u0644\u0627 \u064a\u0646\u0627\u0644\u0647 \u0634\u064a\u0621 \u0645\u0646 \u0641\u0648\u0632\u0643." },
    q_035: { text: "\u0627\u0644\u0635\u062f\u064a\u0642 \u0627\u0644\u0630\u064a \u064a\u064f\u0646\u0635\u062a \u064a\u0633\u0627\u0648\u064a \u0639\u0634\u0631\u0629 \u064a\u062a\u0643\u0644\u0645\u0648\u0646.", reflection: "\u0623\u0646 \u062a\u064f\u0633\u0645\u0639 \u0623\u0646\u062f\u0631 \u0645\u0646 \u0623\u0646 \u062a\u064f\u0646\u0635\u062d. \u0627\u062d\u0645\u0650 \u0645\u0646 \u064a\u062f\u0639\u0648\u0646\u0643 \u062a\u064f\u0643\u0645\u0644 \u062c\u0645\u0644\u0643." },
    q_034: { text: "\u0627\u0644\u063a\u064a\u0631\u0629 \u062a\u0631\u062a\u062f\u064a \u0642\u0646\u0627\u0639 \u0627\u0644\u0646\u0635\u064a\u062d\u0629.", reflection: "\u0623\u0646\u0635\u062a \u0644\u0644\u0642\u0644\u0642 \u0627\u0644\u0630\u064a \u064a\u0623\u062a\u064a \u0641\u0648\u0631 \u062e\u0628\u0631\u0643 \u0627\u0644\u0633\u0639\u064a\u062f. \u0627\u0644\u0645\u062d\u0628\u0629 \u062a\u0631\u0641\u0639\u060c \u0648\u0627\u0644\u062d\u0633\u062f \u064a\u0642\u0644\u0651\u0645." },
    q_025: { text: "\u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0644\u064a\u0633\u062a \u0642\u0633\u0648\u0629. \u0623\u062d\u064a\u0627\u0646\u064b\u0627 \u0647\u064a \u0646\u062c\u0627\u0629.", reflection: "\u0627\u0644\u062a\u0631\u0627\u062c\u0639 \u0644\u064a\u0633 \u062a\u062e\u0644\u064a\u064b\u0627. \u064a\u062d\u0642 \u0644\u0643 \u062d\u0645\u0627\u064a\u0629 \u0646\u0641\u0633\u0643 \u0645\u0645\u0646 \u0644\u0627 \u062a\u0632\u0627\u0644 \u062a\u062d\u0628\u0647." },
    q_016: { text: "\u0644\u0633\u062a \u0643\u062b\u064a\u0631\u064b\u0627. \u0643\u0646\u062a \u0645\u0639 \u0634\u062e\u0635 \u0642\u0644\u064a\u0644.", reflection: "\u0627\u0644\u0634\u062f\u0629 \u0644\u064a\u0633\u062a \u0639\u064a\u0628\u064b\u0627. \u0627\u062e\u062a\u0644\u0627\u0641 \u0627\u0644\u0642\u062f\u0631\u0629 \u0644\u064a\u0633 \u0641\u0634\u0644\u0627\u064b \u0645\u0646\u0643 \u0641\u064a \u0627\u0644\u062a\u0642\u0644\u0651\u0635." },
    q_010: { text: "\u062a\u0634\u0639\u0631 \u0628\u0627\u0644\u0625\u0631\u0647\u0627\u0642 \u0644\u0623\u0646\u0643 \u062a\u064f\u0642\u0631\u0636 \u0637\u0627\u0642\u0629 \u0644\u0645 \u062a\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0645\u0646\u062d\u0647\u0627.", reflection: "\u0644\u064a\u0633 \u0643\u0644 \u0637\u0644\u0628 \u064a\u0633\u062a\u062d\u0642 \u0645\u0648\u0627\u0641\u0642\u0629. \u0644\u0627\u062d\u0638 \u0623\u064a \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a \u062a\u062a\u0631\u0643\u0643 \u0645\u062d\u062a\u0627\u062c\u064b\u0627 \u0644\u0644\u062a\u0639\u0627\u0641\u064a." },
    q_029: { text: "\u0628\u0639\u0636 \u0627\u0644\u0635\u062f\u0627\u0642\u0627\u062a \u062a\u0646\u062a\u0647\u064a \u0635\u0644\u0627\u062d\u064a\u062a\u0647\u0627. \u0648\u0644\u064a\u0633\u062a \u0641\u0634\u0644\u0627\u064b.", reflection: "\u0635\u062f\u0627\u0642\u0629 \u062d\u0645\u0644\u062a\u0643 \u0641\u064a \u0645\u0648\u0633\u0645 \u0623\u062f\u062a \u0645\u0647\u0645\u062a\u0647\u0627. \u0644\u064a\u0633 \u0643\u0644 \u0634\u064a\u0621 \u0645\u0639\u062f\u064b\u0627 \u0644\u064a\u062f\u0648\u0645." },
    q_038: { text: "\u0627\u0644\u062d\u0632\u0646 \u062d\u0628\u0651 \u0628\u0644\u0627 \u0648\u062c\u0647\u0629.", reflection: "\u0627\u0644\u062b\u0642\u0644 \u064a\u0648\u0627\u0632\u064a \u0642\u064a\u0645\u0629 \u0645\u0627 \u0641\u0642\u062f\u062a\u0647. \u0644\u0633\u062a \u0645\u0643\u0633\u0648\u0631\u064b\u0627\u060c \u0623\u0646\u062a \u0641\u0642\u0637 \u0645\u0627 \u0632\u0644\u062a \u062a\u062d\u0628 \u0645\u0627 \u0644\u0627 \u062a\u0637\u0627\u0644\u0647." },
    q_046: { text: "\u0627\u0644\u0646\u0645\u0648 \u064a\u0634\u0628\u0647 \u0627\u0644\u062e\u0633\u0627\u0631\u0629 \u0642\u0628\u0644 \u0623\u0646 \u064a\u0634\u0628\u0647 \u0627\u0644\u062d\u0631\u064a\u0629.", reflection: "\u0639\u0644\u064a\u0643 \u0625\u0637\u0644\u0627\u0642 \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u0642\u062f\u064a\u0645\u0629 \u0644\u062a\u062a\u0633\u0639 \u0627\u0644\u062c\u062f\u064a\u062f\u0629. \u0627\u0644\u0641\u0631\u0627\u063a \u0628\u064a\u0646\u0647\u0645\u0627 \u0637\u0628\u064a\u0639\u064a \u0648\u0645\u0624\u0642\u062a." },
    q_031: { text: "\u0635\u062f\u064a\u0642 \u064a\u0638\u0647\u0631 \u0641\u064a \u0634\u062a\u0627\u0626\u0643 \u0641\u0642\u0637 \u0644\u064a\u0633 \u0635\u062f\u064a\u0642\u064b\u0627.", reflection: "\u0628\u0639\u0636\u0647\u0645 \u064a\u0646\u062c\u0630\u0628 \u0644\u0645\u0639\u0627\u0646\u0627\u062a\u0643 \u0644\u0623\u0646\u0647\u0627 \u062a\u064f\u0631\u064a\u062d\u0647. \u0631\u0627\u0642\u0628 \u062a\u0639\u0627\u0645\u0644\u0647\u0645 \u0645\u0639 \u0623\u062e\u0628\u0627\u0631\u0643 \u0627\u0644\u0633\u0627\u0631\u0629." },
    q_019: { text: "\u0625\u0630\u0627 \u0627\u0636\u0637\u0631\u0631\u062a \u0644\u0641\u0643 \u0634\u0641\u0631\u062a\u0647\u060c \u0641\u0644\u0645 \u064a\u0643\u0646 \u062d\u0628\u064b\u0627 \u0648\u0627\u0636\u062d\u064b\u0627.", reflection: "\u0627\u0644\u0625\u0634\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u062e\u062a\u0644\u0637\u0629 \u0625\u0634\u0627\u0631\u0629 \u0628\u062d\u062f \u0630\u0627\u062a\u0647\u0627. \u0645\u0646 \u064a\u0631\u064a\u062f\u0643 \u0623\u0646 \u062a\u0641\u0647\u0645\u0647 \u064a\u062c\u0639\u0644 \u0646\u0641\u0633\u0647 \u0645\u0641\u0647\u0648\u0645\u064b\u0627." },
    q_015: { text: "\u062d\u0628\u0651 \u064a\u062a\u0637\u0644\u0628 \u0635\u0645\u062a\u0643 \u0644\u064a\u0633 \u062d\u0628\u064b\u0627.", reflection: "\u0625\u0646 \u0643\u0627\u0646\u062a \u0627\u0644\u0639\u0644\u0627\u0642\u0629 \u0644\u0627 \u062a\u0647\u062f\u0623 \u0625\u0644\u0627 \u062d\u064a\u0646 \u062a\u062a\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0635\u062f\u0642\u060c \u0641\u0630\u0627\u0643 \u0644\u064a\u0633 \u0633\u0644\u0627\u0645\u064b\u0627 \u0628\u0644 \u0625\u062f\u0627\u0631\u0629." },
    q_013: { text: "\u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u062a\u064a \u062a\u062a\u062d\u0645\u0644\u0647\u0627 \u0647\u064a \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u062a\u064a \u062a\u062c\u0630\u0628\u0647\u0627.", reflection: "\u0627\u0644\u062a\u0633\u0627\u0645\u062d \u064a\u064f\u0642\u0631\u0623 \u0643\u062f\u0639\u0648\u0629. \u0645\u0627 \u062a\u062a\u063a\u0627\u0636\u0649 \u0639\u0646\u0647 \u0645\u0631\u0629 \u064a\u0635\u0628\u062d \u0627\u0644\u0645\u0639\u064a\u0627\u0631." },
    q_024: { text: "\u062a\u064f\u0639\u0644\u0651\u0645 \u0627\u0644\u0646\u0627\u0633 \u0643\u064a\u0641 \u064a\u0639\u0627\u0645\u0644\u0648\u0646\u0643 \u0628\u0645\u0627 \u062a\u0642\u0628\u0644\u0647.", reflection: "\u0643\u0644 \u0633\u0644\u0648\u0643 \u0644\u0627 \u062a\u0639\u062a\u0631\u0636 \u0639\u0644\u064a\u0647 \u062f\u0631\u0633 \u062a\u0645\u0646\u062d\u0647. \u0627\u0644\u0635\u0645\u062a \u0645\u0646\u0647\u0627\u062c." },
    q_049: { text: "\u0644\u0627 \u062a\u0634\u0641\u064a \u0645\u0627 \u062a\u062f\u0651\u0639\u064a \u0623\u0646\u0647 \u0628\u062e\u064a\u0631.", reflection: "\u0627\u0644\u062a\u0633\u0645\u064a\u0629 \u0644\u064a\u0633\u062a \u0636\u0639\u0641\u064b\u0627 \u0628\u0644 \u0634\u0631\u0637\u064b\u0627 \u0645\u0633\u0628\u0642\u064b\u0627. \u0644\u0627 \u064a\u064f\u0639\u0627\u0644\u062c \u0634\u064a\u0621 \u062f\u0648\u0646 \u062a\u0634\u062e\u064a\u0635." },
    q_048: { text: "\u0643\u0646 \u0635\u0627\u062f\u0642\u064b\u0627 \u0628\u0634\u0623\u0646 \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u062a\u064a \u062a\u062d\u0645\u064a\u0647\u0627 \u0645\u0646\u0643.", reflection: "\u0645\u0639\u0638\u0645 \u0627\u0644\u062f\u0641\u0627\u0639\u064a\u0629 \u062a\u062d\u0631\u0633 \u0635\u0648\u0631\u0629 \u0642\u062f\u064a\u0645\u0629 \u0639\u0646 \u0627\u0644\u0630\u0627\u062a. \u0627\u0633\u0623\u0644 \u0645\u0627 \u0627\u0644\u0630\u064a \u0633\u062a\u062e\u0633\u0631\u0647 \u062d\u0642\u064b\u0627 \u0625\u0646 \u0631\u0627\u062c\u0639\u062a\u0647\u0627." },
    q_005: { text: "\u0644\u0627 \u064a\u0645\u0643\u0646\u0643 \u0642\u0631\u0627\u0621\u0629 \u0637\u0627\u0642\u062a\u0643 \u0648\u0623\u0646\u062a \u062a\u0645\u062b\u0651\u0644 \u0637\u0627\u0642\u0629 \u063a\u064a\u0631\u0643.", reflection: "\u0627\u0644\u062a\u0645\u062b\u064a\u0644 \u064a\u0633\u062a\u0647\u0644\u0643 \u0627\u0646\u062a\u0628\u0627\u0647\u0643. \u0643\u0644 \u062d\u0631\u0643\u0629 \u0645\u062d\u0633\u0648\u0628\u0629 \u062a\u064f\u0642\u062a\u0637\u0639 \u0645\u0646 \u0642\u062f\u0631\u062a\u0643 \u0639\u0644\u0649 \u0627\u0644\u0634\u0639\u0648\u0631 \u0627\u0644\u062d\u0642\u064a\u0642\u064a." },
    q_050: { text: "\u062a\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u062a\u0642\u062f\u0651\u0645 \u0644\u0645\u0643\u0627\u0646 \u0623\u0646\u062a \u0645\u0646\u0647 \u0623\u0635\u0644\u0627\u064b.", reflection: "\u0627\u0644\u0625\u0641\u0631\u0627\u0637 \u0641\u064a \u0627\u0644\u0625\u062b\u0628\u0627\u062a \u0639\u0627\u062f\u0629 \u0645\u0646 \u063a\u0631\u0641 \u0644\u0645 \u062a\u0642\u0628\u0644\u0643. \u062a\u062d\u0642\u0642 \u0645\u0645\u0646 \u0642\u0627\u0644 \u0644\u0643 \u0646\u0639\u0645 \u0628\u0627\u0644\u0641\u0639\u0644." },
    q_003: { text: "\u0627\u0644\u0633\u0643\u0648\u0646 \u0644\u064a\u0633 \u0641\u0631\u0627\u063a\u064b\u0627. \u0625\u0646\u0647 \u062d\u064a\u062b \u062a\u0633\u0645\u0639 \u0646\u0641\u0633\u0643.", reflection: "\u0627\u0644\u0636\u062c\u064a\u062c \u0645\u0644\u062c\u0623 \u0633\u0647\u0644. \u062d\u064a\u0646 \u064a\u0646\u0642\u0637\u0639\u060c \u064a\u0637\u0641\u0648 \u0623\u0648\u0644\u064b\u0627 \u0645\u0627 \u0643\u0646\u062a \u062a\u062a\u062c\u0646\u0628\u0647 \u2014 \u0648\u0647\u0648 \u0645\u0627 \u062a\u062d\u062a\u0627\u062c \u0633\u0645\u0627\u0639\u0647." },
    q_007: { text: "\u0639\u064f\u062f \u0625\u0644\u0649 \u0646\u0641\u0633\u0643 \u0643\u0645\u0627 \u064a\u0639\u0648\u062f \u0627\u0644\u0645\u0627\u0621 \u0625\u0644\u0649 \u0627\u0644\u0628\u062d\u0631.", reflection: "\u0628\u0644\u0627 \u0625\u062c\u0628\u0627\u0631 \u0648\u0644\u0627 \u0636\u062c\u064a\u062c. \u0625\u0646\u0647\u0627 \u0627\u0644\u0648\u062c\u0647\u0629 \u0627\u0644\u0637\u0628\u064a\u0639\u064a\u0629 \u062d\u064a\u0646 \u062a\u062a\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629." },
    q_011: { text: "\u0627\u062d\u0645\u0650 \u0633\u0644\u0627\u0645\u0643 \u0643\u0623\u0646\u0647 \u064a\u062f\u0641\u0639 \u0625\u064a\u062c\u0627\u0631\u0643.", reflection: "\u0644\u0623\u0646\u0647 \u064a\u0641\u0639\u0644. \u0643\u0644 \u0645\u0627 \u062a\u0628\u0646\u064a\u0647 \u0645\u0646 \u0639\u0645\u0644 \u0648\u062d\u0628 \u0648\u0635\u062d\u0629 \u064a\u0642\u0648\u0645 \u0639\u0644\u0649 \u062c\u0647\u0627\u0632 \u0639\u0635\u0628\u064a \u0642\u0627\u062f\u0631 \u0639\u0644\u0649 \u0627\u0644\u0631\u0627\u062d\u0629." },
    q_052: { text: "\u0627\u0644\u062b\u0642\u0629 \u0644\u064a\u0633\u062a \u0635\u0627\u062e\u0628\u0629. \u0625\u0646\u0647\u0627 \u063a\u064a\u0631 \u0645\u0628\u0627\u0644\u064a\u0629.", reflection: "\u0627\u0644\u0623\u0645\u0627\u0646 \u0627\u0644\u062d\u0642\u064a\u0642\u064a \u0644\u0627 \u064a\u062d\u062a\u0627\u062c \u0644\u0644\u0645\u0631\u0627\u0641\u0639\u0629. \u0627\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0647\u062f\u0648\u0621 \u0627\u0644\u0630\u064a \u0644\u0627 \u064a\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0623\u062d\u062f." },
    q_041: { text: "\u0627\u0644\u0644\u064a\u0646 \u0628\u0639\u062f \u0627\u0644\u0623\u0630\u0649 \u0623\u0634\u062c\u0639 \u0645\u0627 \u064a\u0643\u0648\u0646.", reflection: "\u0627\u0644\u062a\u0635\u0644\u0651\u0628 \u0647\u0648 \u0627\u0644\u0631\u062f \u0627\u0644\u0628\u062f\u064a\u0647\u064a. \u0623\u0646 \u062a\u0628\u0642\u0649 \u0645\u0646\u0641\u062a\u062d\u064b\u0627 \u0631\u063a\u0645 \u0643\u0644 \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0647\u0648 \u0627\u0644\u062e\u064a\u0627\u0631 \u0627\u0644\u0623\u0646\u062f\u0631." },
    q_012: { text: "\u0644\u064a\u0633\u062a \u0643\u0644 \u063a\u0631\u0641\u0629 \u062a\u0633\u062a\u062d\u0642 \u0643\u0627\u0645\u0644 \u0644\u0648\u0646\u0643.", reflection: "\u0627\u0644\u062a\u062d\u0641\u0651\u0638 \u0644\u064a\u0633 \u062e\u062f\u0627\u0639\u064b\u0627. \u0628\u0639\u0636 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0644\u0645 \u062a\u0643\u0633\u0628 \u0639\u0645\u0642\u0643 \u0628\u0639\u062f." },
    q_021: { text: "\u0627\u0644\u062d\u0628 \u0627\u0644\u062d\u0642\u064a\u0642\u064a \u0644\u0627 \u064a\u062c\u0639\u0644\u0643 \u062a\u062e\u0648\u0636 \u0627\u062e\u062a\u0628\u0627\u0631\u064b\u0627.", reflection: "\u0625\u0646 \u0643\u0646\u062a \u062a\u064f\u062b\u0628\u062a \u062f\u0648\u0645\u064b\u0627 \u0623\u0646\u0643 \u062a\u0633\u062a\u062d\u0642 \u0627\u0644\u0628\u0642\u0627\u0621\u060c \u0641\u0623\u0646\u062a \u0644\u0633\u062a \u0641\u064a \u0639\u0644\u0627\u0642\u0629 \u0628\u0644 \u0641\u064a \u062a\u0642\u064a\u064a\u0645." },
    q_026: { text: "\u0627\u0644\u062a\u0648\u0641\u0631 \u062f\u0627\u0626\u0645\u064b\u0627 \u064a\u062c\u0639\u0644\u0643 \u063a\u064a\u0631 \u0645\u064f\u0642\u062f\u0651\u0631 \u0623\u0628\u062f\u064b\u0627.", reflection: "\u0644\u064a\u0633\u062a \u0644\u0639\u0628\u0629\u060c \u0628\u0644 \u0627\u0642\u062a\u0635\u0627\u062f \u0627\u0646\u062a\u0628\u0627\u0647. \u0645\u0627 \u0644\u0627 \u064a\u0643\u0644\u0641 \u0634\u064a\u0626\u064b\u0627 \u0646\u0627\u062f\u0631\u064b\u0627 \u0645\u0627 \u064a\u064f\u0639\u0627\u0645\u0644 \u0643\u062b\u0645\u064a\u0646." },
    q_022: { text: "\u00ab\u0644\u0627\u00bb \u062c\u0645\u0644\u0629 \u0643\u0627\u0645\u0644\u0629.", reflection: "\u0627\u0644\u062a\u0628\u0631\u064a\u0631 \u064a\u0641\u062a\u062d \u0628\u0627\u0628 \u0627\u0644\u0645\u0641\u0627\u0648\u0636\u0629. \u0645\u0646 \u062d\u0642\u0643 \u0623\u0646 \u062a\u0631\u0641\u0636 \u062f\u0648\u0646 \u0645\u0631\u0627\u0641\u0639\u0629." },
    q_023: { text: "\u0627\u0644\u0634\u0639\u0648\u0631 \u0628\u0627\u0644\u0630\u0646\u0628 \u0636\u0631\u064a\u0628\u0629 \u064a\u0641\u0631\u0636\u0648\u0646\u0647\u0627 \u0639\u0644\u0649 \u0623\u0648\u0644 \u062d\u062f\u0651 \u062a\u0631\u0633\u0645\u0647.", reflection: "\u0625\u0646\u0647 \u064a\u062e\u0641\u062a. \u0645\u0627 \u064a\u0628\u062f\u0648 \u0642\u0633\u0648\u0629 \u0641\u064a \u0627\u0644\u0623\u0633\u0628\u0648\u0639 \u0627\u0644\u0623\u0648\u0644 \u064a\u064f\u0642\u0631\u0623 \u0648\u0636\u0648\u062d\u064b\u0627 \u0628\u0639\u062f \u062b\u0644\u0627\u062b\u0629 \u0623\u0634\u0647\u0631." },
    q_027: { text: "\u0627\u0644\u0633\u0644\u0627\u0645 \u064a\u0643\u0644\u0641\u0643 \u0628\u0639\u0636 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a. \u0627\u062f\u0641\u0639.", reflection: "\u0628\u0639\u0636 \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0644\u0627 \u062a\u0639\u064a\u0634 \u0625\u0644\u0627 \u0639\u0644\u0649 \u062a\u062e\u0644\u064a\u0643 \u0639\u0646 \u0646\u0641\u0633\u0643. \u062e\u0633\u0627\u0631\u062a\u0647\u0627 \u062b\u0645\u0646\u060c \u0644\u0627 \u0645\u0623\u0633\u0627\u0629." },
    q_028: { text: "\u0625\u063a\u0644\u0627\u0642 \u0627\u0644\u0628\u0627\u0628 \u0623\u064a\u0636\u064b\u0627 \u0627\u062d\u062a\u0631\u0627\u0645 \u0644\u0644\u0630\u0627\u062a.", reflection: "\u0644\u0627 \u062a\u062f\u064a\u0646 \u0644\u0623\u062d\u062f \u0628\u0648\u0635\u0648\u0644 \u062f\u0627\u0626\u0645. \u0627\u0644\u0646\u0647\u0627\u064a\u0629 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629 \u0628\u0648\u0639\u064a \u0644\u064a\u0633\u062a \u062e\u064a\u0627\u0646\u0629." },
    q_033: { text: "\u0635\u062f\u064a\u0642 \u0627\u0644\u062c\u0645\u064a\u0639 \u0644\u064a\u0633 \u0635\u062f\u064a\u0642\u064b\u0627 \u0644\u0623\u062d\u062f.", reflection: "\u0627\u0644\u0639\u0645\u0642 \u064a\u062a\u0637\u0644\u0628 \u0627\u062e\u062a\u064a\u0627\u0631\u064b\u0627. \u0627\u0644\u062a\u0648\u0632\u0639 \u0639\u0644\u0649 \u0627\u0644\u062c\u0645\u064a\u0639 \u0644\u0627 \u064a\u062a\u0631\u0643 \u0634\u064a\u0626\u064b\u0627 \u062c\u0648\u0647\u0631\u064a\u064b\u0627 \u0644\u0623\u062d\u062f." },
    q_051: { text: "\u0645\u0639\u0627\u064a\u064a\u0631\u0643 \u0644\u064a\u0633\u062a \u0633\u0628\u0628 \u0648\u062d\u062f\u062a\u0643.", reflection: "\u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0644\u064a\u0633 \u0631\u0641\u0636\u064b\u0627. \u062e\u0641\u0636 \u0627\u0644\u0633\u0642\u0641 \u0644\u0627 \u064a\u0635\u0646\u0639 \u0627\u062a\u0635\u0627\u0644\u0627\u064b\u060c \u0628\u0644 \u064a\u063a\u064a\u0631 \u0645\u0646 \u064a\u064f\u0633\u0645\u062d \u0644\u0647 \u0628\u0627\u0644\u0627\u0642\u062a\u0631\u0627\u0628." },
    q_053: { text: "\u0644\u0627 \u062a\u062d\u062a\u0627\u062c \u0625\u0630\u0646\u064b\u0627 \u0644\u062a\u0623\u062e\u0630 \u0645\u0633\u0627\u062d\u062a\u0643.", reflection: "\u0627\u0644\u062a\u0642\u0644\u0651\u0635 \u062d\u0641\u0627\u0638\u064b\u0627 \u0639\u0644\u0649 \u0627\u0644\u0647\u062f\u0648\u0621 \u0639\u0627\u062f\u0629 \u0644\u0627 \u0634\u062e\u0635\u064a\u0629. \u062d\u0636\u0648\u0631\u0643 \u0644\u0645 \u064a\u0643\u0646 \u064a\u0648\u0645\u064b\u0627 \u0645\u0634\u0631\u0648\u0637\u064b\u0627." },
    q_054: { text: "\u0644\u0627 \u0623\u062d\u062f \u064a\u0633\u062a\u0637\u064a\u0639 \u0623\u0646 \u064a\u062c\u0639\u0644\u0643 \u062a\u0634\u0639\u0631 \u0628\u0627\u0644\u062f\u0648\u0646\u064a\u0629 \u062f\u0648\u0646 \u0645\u0648\u0627\u0641\u0642\u062a\u0643.", reflection: "\u0644\u064a\u0633 \u0625\u0646\u0643\u0627\u0631\u064b\u0627 \u0644\u0623\u062b\u0631 \u0627\u0644\u0643\u0644\u0645\u0627\u062a\u060c \u0628\u0644 \u062a\u0630\u0643\u064a\u0631 \u0628\u0623\u0646 \u0627\u0644\u062d\u0643\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0639\u0644\u0649 \u0642\u064a\u0645\u062a\u0643 \u0645\u0627 \u0632\u0627\u0644 \u0628\u064a\u062f\u0643." },
    q_055: { text: "\u064a\u062d\u0642 \u0644\u0643 \u0623\u0646 \u062a\u062a\u062c\u0627\u0648\u0632 \u0645\u0646 \u0639\u0631\u0641\u0648\u0643 \u0623\u0648\u0644\u0627\u064b.", reflection: "\u0627\u0644\u0623\u0633\u0628\u0642\u064a\u0629 \u0644\u064a\u0633\u062a \u0633\u0644\u0637\u0629 \u062f\u0627\u0626\u0645\u0629. \u0645\u0646 \u0631\u0622\u0643 \u0641\u064a \u0623\u0635\u063a\u0631 \u062d\u0627\u0644\u0627\u062a\u0643 \u0644\u0627 \u064a\u062d\u062f\u062f \u0633\u0642\u0641\u0643." },
    q_056: { text: "\u0627\u062e\u062a\u0631 \u0646\u0641\u0633\u0643. \u0644\u0627 \u0623\u062d\u062f \u063a\u064a\u0631\u0643 \u0645\u0643\u0644\u0651\u0641 \u0628\u0630\u0644\u0643.", reflection: "\u064a\u0645\u0643\u0646 \u0623\u0646 \u062a\u064f\u062d\u064e\u0628 \u0648\u062a\u0638\u0644 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0648\u062d\u064a\u062f \u0639\u0646 \u0627\u0644\u062f\u0641\u0627\u0639 \u0639\u0646 \u0646\u0641\u0633\u0643. \u0644\u0627 \u0623\u062d\u062f \u0642\u0627\u062f\u0645 \u0644\u064a\u0641\u0639\u0644\u0647\u0627." },
    q_001: { text: "\u0644\u0633\u062a \u0645\u062a\u0623\u062e\u0631\u064b\u0627. \u0623\u0646\u062a \u0641\u064a \u0637\u0648\u0631 \u0627\u0644\u062a\u0643\u0648\u0651\u0646.", reflection: "\u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u062a\u0637\u0648\u064a \u0627\u0644\u0632\u0645\u0646. \u0641\u0635\u0644 \u063a\u064a\u0631\u0643 \u0627\u0644\u062b\u0627\u0646\u064a \u0639\u0634\u0631 \u0644\u064a\u0633 \u0641\u0635\u0644\u0643 \u0627\u0644\u062b\u0627\u0644\u062b. \u0625\u064a\u0642\u0627\u0639\u0643 \u062d\u0631\u0643\u0629 \u0623\u064a\u0636\u064b\u0627." },
    q_006: { text: "\u0643\u0644 \u0634\u064a\u0621 \u062a\u0642\u0631\u064a\u0628\u064b\u0627 \u064a\u0639\u0645\u0644 \u0645\u062c\u062f\u062f\u064b\u0627 \u0625\u0646 \u0641\u0635\u0644\u062a\u0647 \u062f\u0642\u0627\u0626\u0642 \u2014 \u0628\u0645\u0627 \u0641\u064a \u0630\u0644\u0643 \u0623\u0646\u062a.", reflection: "\u0627\u0644\u0625\u0631\u0647\u0627\u0642 \u0644\u064a\u0633 \u0639\u064a\u0628\u064b\u0627 \u0641\u064a \u0627\u0644\u0634\u062e\u0635\u064a\u0629\u060c \u0628\u0644 \u0645\u0639\u0644\u0648\u0645\u0629. \u0627\u0644\u0631\u0627\u062d\u0629 \u0644\u064a\u0633\u062a \u0645\u0643\u0627\u0641\u0623\u0629 \u0628\u0639\u062f \u0627\u0644\u0639\u0645\u0644\u060c \u0628\u0644 \u062c\u0632\u0621 \u0645\u0646\u0647." },
    q_043: { text: "\u0643\u0644 \u0645\u0627 \u064a\u0632\u0639\u062c\u0646\u0627 \u0641\u064a \u0627\u0644\u0622\u062e\u0631\u064a\u0646 \u0642\u062f \u064a\u0642\u0648\u062f\u0646\u0627 \u0625\u0644\u0649 \u0641\u0647\u0645 \u0623\u0646\u0641\u0633\u0646\u0627.", reflection: "\u0634\u062f\u0629 \u0631\u062f \u0641\u0639\u0644\u0643 \u0647\u064a \u0627\u0644\u062f\u0644\u064a\u0644. \u0627\u0644\u0627\u0646\u0632\u0639\u0627\u062c \u0627\u0644\u0645\u0641\u0631\u0637 \u063a\u0627\u0644\u0628\u064b\u0627 \u0627\u0639\u062a\u0631\u0627\u0641 \u0645\u0642\u0646\u0651\u0639." },
    q_044: { text: "\u0627\u0644\u062c\u0632\u0621 \u0627\u0644\u0630\u064a \u062a\u062e\u0641\u064a\u0647 \u0645\u0646\u0643 \u0647\u0648 \u0627\u0644\u0645\u062d\u062a\u0627\u062c \u0644\u0644\u0647\u0648\u0627\u0621.", reflection: "\u0627\u0644\u0625\u062e\u0641\u0627\u0621 \u0644\u0627 \u064a\u062d\u0644 \u0634\u064a\u0626\u064b\u0627. \u0645\u0627 \u064a\u0628\u0642\u0649 \u0641\u064a \u0627\u0644\u0638\u0644\u0627\u0645 \u064a\u062d\u062a\u0641\u0638 \u0628\u0633\u0644\u0637\u062a\u0647 \u0639\u0644\u064a\u0643." },
    q_040: { text: "\u0645\u0627 \u062a\u0631\u0641\u0636 \u0627\u0644\u0634\u0639\u0648\u0631 \u0628\u0647\u060c \u0633\u062a\u0643\u0631\u0631\u0647.", reflection: "\u0627\u0644\u062a\u062c\u0646\u0628 \u0644\u0627 \u064a\u062d\u0630\u0641 \u0627\u0644\u0645\u0634\u0627\u0639\u0631\u060c \u0628\u0644 \u064a\u0639\u064a\u062f \u062a\u0648\u062c\u064a\u0647\u0647\u0627 \u0625\u0644\u0649 \u062c\u0633\u062f\u0643 \u0648\u0623\u0646\u0645\u0627\u0637\u0643 \u0648\u0639\u0644\u0627\u0642\u062a\u0643 \u0627\u0644\u0642\u0627\u062f\u0645\u0629." },
    q_004: { text: "\u0627\u0639\u0631\u0641 \u0646\u0641\u0633\u0643.", reflection: "\u0643\u0644\u0645\u062a\u0627\u0646\u060c \u0648\u0639\u0645\u0631 \u0645\u0646 \u0627\u0644\u0639\u0645\u0644. \u0645\u0639\u0638\u0645 \u0645\u0627 \u062a\u0633\u0645\u064a\u0647 \u062d\u062f\u0633\u064b\u0627 \u0647\u0648 \u0630\u0627\u0643\u0631\u0629. \u0648\u0627\u0644\u062a\u0645\u064a\u064a\u0632 \u0628\u064a\u0646\u0647\u0645\u0627 \u0647\u0648 \u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0629 \u0643\u0644\u0647\u0627." },
    q_017: { text: "\u0627\u0644\u062c\u0631\u062d \u0647\u0648 \u0627\u0644\u0645\u0648\u0636\u0639 \u0627\u0644\u0630\u064a \u064a\u062f\u062e\u0644 \u0645\u0646\u0647 \u0627\u0644\u0646\u0648\u0631.", reflection: "\u0644\u064a\u0633 \u062f\u0639\u0648\u0629 \u0644\u0637\u0644\u0628 \u0627\u0644\u0623\u0644\u0645\u060c \u0628\u0644 \u0633\u0628\u0628 \u0644\u0644\u062a\u0648\u0642\u0641 \u0639\u0646 \u0627\u0639\u062a\u0628\u0627\u0631 \u062c\u0631\u0648\u062d\u0643 \u0648\u0635\u0645\u0629 \u062a\u0642\u0635\u064a\u0643." },
    q_045: { text: "\u0644\u0633\u062a \u0623\u0633\u0648\u0623 \u0644\u064a\u0627\u0644\u064a\u0643.", reflection: "\u0627\u0644\u0641\u0634\u0644 \u0627\u0644\u0648\u0627\u062d\u062f \u062d\u062f\u062b \u0644\u0627 \u0647\u0648\u064a\u0629. \u0623\u0646\u062a \u0627\u0644\u0646\u0645\u0637 \u0639\u0628\u0631 \u0627\u0644\u0632\u0645\u0646\u060c \u0644\u0627 \u0627\u0644\u0627\u0633\u062a\u062b\u0646\u0627\u0621 \u0627\u0644\u0630\u064a \u062a\u0639\u064a\u062f \u062a\u0634\u063a\u064a\u0644\u0647." },
    q_014: { text: "\u0644\u062f\u064a\u0643 \u0633\u0644\u0637\u0629 \u0639\u0644\u0649 \u0639\u0642\u0644\u0643 \u0644\u0627 \u0639\u0644\u0649 \u0627\u0644\u0623\u062d\u062f\u0627\u062b. \u0623\u062f\u0631\u0650\u0643 \u0630\u0644\u0643 \u062a\u062c\u062f \u0627\u0644\u0642\u0648\u0629.", reflection: "\u0644\u0627 \u062a\u062a\u062d\u0643\u0645 \u0641\u064a \u0627\u0644\u063a\u0631\u0641\u0629\u060c \u0644\u0643\u0646\u0643 \u062a\u062a\u062d\u0643\u0645 \u0641\u064a\u0645\u0627 \u062a\u062f\u062e\u0644\u0647 \u0645\u0639\u0643 \u0648\u0645\u0627 \u062a\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u062d\u0645\u0644\u0647 \u0639\u0646\u062f \u0627\u0644\u062e\u0631\u0648\u062c." },
    q_002: { text: "\u0645\u0633\u064a\u0631\u0629 \u0623\u0644\u0641 \u0645\u064a\u0644 \u062a\u0628\u062f\u0623 \u0628\u062e\u0637\u0648\u0629 \u0648\u0627\u062d\u062f\u0629.", reflection: "\u0644\u0627 \u062a\u062d\u062a\u0627\u062c \u0627\u0644\u062e\u0631\u064a\u0637\u0629 \u0643\u0627\u0645\u0644\u0629 \u0627\u0644\u064a\u0648\u0645\u060c \u0628\u0644 \u0627\u0644\u062e\u0637\u0648\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629 \u0628\u0635\u062f\u0642. \u0627\u0644\u0632\u062e\u0645 \u064a\u064f\u0628\u0646\u0649 \u0648\u0644\u0627 \u064a\u064f\u0648\u062c\u062f." },
    q_032: { text: "\u0627\u0644\u0648\u0641\u0627\u0621 \u0644\u0627 \u064a\u064f\u062b\u0628\u062a \u0641\u064a \u0627\u0644\u0631\u0627\u062d\u0629\u060c \u0628\u0644 \u0641\u064a \u0627\u0644\u062b\u0645\u0646.", reflection: "\u0627\u0644\u0648\u0642\u0648\u0641 \u0645\u0639\u0643 \u062d\u064a\u0646 \u064a\u0643\u0648\u0646 \u0645\u062c\u0627\u0646\u064b\u0627 \u0633\u0647\u0644. \u0627\u0644\u0645\u0639\u064a\u0627\u0631 \u0647\u0648 \u0645\u0627 \u064a\u0633\u062a\u0639\u062f \u0623\u062d\u062f\u0647\u0645 \u0644\u062e\u0633\u0627\u0631\u062a\u0647 \u0644\u064a\u0628\u0642\u0649." },
    q_036: { text: "\u0627\u0644\u0634\u0641\u0627\u0621 \u0644\u064a\u0633 \u062e\u0637\u064b\u0627 \u0645\u0633\u062a\u0642\u064a\u0645\u064b\u0627. \u0625\u0646\u0647 \u062d\u0644\u0632\u0648\u0646 \u0628\u0645\u0646\u0627\u0638\u0631 \u0623\u062c\u0645\u0644.", reflection: "\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0623\u0644\u0645 \u0642\u062f\u064a\u0645 \u0644\u064a\u0633\u062a \u062a\u0631\u0627\u062c\u0639\u064b\u0627. \u0623\u0646\u062a \u062a\u0644\u0642\u0627\u0647 \u0645\u0646 \u0627\u0631\u062a\u0641\u0627\u0639 \u0623\u0639\u0644\u0649 \u0648\u0628\u0642\u062f\u0631\u0629 \u0623\u0648\u0633\u0639." },
    q_037: { text: "\u0646\u062c\u0648\u062a \u0645\u0646 \u0643\u0644 \u064a\u0648\u0645 \u0638\u0646\u0646\u062a \u0623\u0646\u0643 \u0644\u0646 \u062a\u0646\u062c\u0648 \u0645\u0646\u0647.", reflection: "\u0633\u062c\u0644\u0643 \u0645\u0627\u0626\u0629 \u0628\u0627\u0644\u0645\u0627\u0626\u0629. \u0648\u0630\u0644\u0643 \u0644\u064a\u0633 \u062d\u0638\u064b\u0627\u060c \u0628\u0644 \u062f\u0644\u064a\u0644 \u0639\u0644\u0649 \u0634\u064a\u0621 \u0641\u064a\u0643 \u0644\u0627 \u064a\u0632\u0627\u0644 \u064a\u0645\u0633\u0643." },
    q_039: { text: "\u0633\u0627\u0645\u062d \u0645\u0646 \u0623\u062c\u0644 \u062e\u0641\u0651\u062a\u0643\u060c \u0644\u0627 \u0645\u0646 \u0623\u062c\u0644 \u0631\u0627\u062d\u062a\u0647\u0645.", reflection: "\u0627\u0644\u0645\u0633\u0627\u0645\u062d\u0629 \u0644\u064a\u0633\u062a \u0625\u0630\u0646\u064b\u0627 \u0648\u0644\u0627 \u0645\u0635\u0627\u0644\u062d\u0629. \u0625\u0646\u0647\u0627 \u0648\u0636\u0639 \u062d\u0645\u0644 \u0644\u0645 \u064a\u0643\u0646 \u062b\u0642\u064a\u0644\u0627\u064b \u0625\u0644\u0627 \u0639\u0644\u064a\u0643." },
    q_042: { text: "\u0627\u0644\u0632\u0645\u0646 \u0644\u0627 \u064a\u0634\u0641\u064a. \u0645\u0627 \u062a\u0641\u0639\u0644\u0647 \u0628\u0627\u0644\u0632\u0645\u0646 \u064a\u0634\u0641\u064a.", reflection: "\u0627\u0644\u0633\u0646\u0648\u0627\u062a \u0648\u062d\u062f\u0647\u0627 \u062a\u0636\u064a\u0641 \u0645\u0633\u0627\u0641\u0629. \u0627\u0644\u0627\u0646\u062a\u0628\u0627\u0647 \u0648\u0627\u0644\u0635\u062f\u0642 \u0647\u0645\u0627 \u0645\u0627 \u064a\u062d\u0648\u0644\u0627\u0646 \u0627\u0644\u0648\u0642\u062a \u0625\u0644\u0649 \u062a\u0639\u0627\u0641\u064d." },
    q_047: { text: "\u0645\u0627 \u064a\u0639\u0631\u0642\u0644 \u0627\u0644\u0641\u0639\u0644 \u064a\u062f\u0641\u0639\u0647. \u0645\u0627 \u064a\u0642\u0641 \u0641\u064a \u0627\u0644\u0637\u0631\u064a\u0642 \u064a\u0635\u064a\u0631 \u0627\u0644\u0637\u0631\u064a\u0642.", reflection: "\u0627\u0644\u0639\u0642\u0628\u0629 \u0644\u0627 \u062a\u0642\u0637\u0639 \u0645\u0633\u0627\u0631\u0643. \u063a\u0627\u0644\u0628\u064b\u0627 \u0647\u064a \u0645\u0627 \u064a\u0628\u0646\u064a \u0641\u064a\u0643 \u0645\u0627 \u064a\u0646\u0642\u0635\u0643." },
  },
  es: {
    q_018: { text: "La atenci\u00f3n es la forma m\u00e1s rara y pura de generosidad.", reflection: "Cualquiera env\u00eda un mensaje. Muy pocos saben estar presentes. Nota qui\u00e9n te da su atenci\u00f3n completa." },
    q_008: { text: "Tu energ\u00eda te presenta antes de que hables.", reflection: "Leen tu postura, tus pausas, tu presencia. Las palabras llegan tarde y solo confirman lo ya decidido." },
    q_009: { text: "La gente olvidar\u00e1 lo que dijiste, pero nunca c\u00f3mo la hiciste sentir.", reflection: "Funciona en ambos sentidos. El rastro que dejas es el registro real \u2014 y lo \u00fanico que a\u00fan puedes cambiar." },
    q_020: { text: "Ser elegido en silencio vence a ser deseado a gritos.", reflection: "El volumen no es compromiso. La constancia en lo peque\u00f1o y sin testigos es lo que sostiene." },
    q_030: { text: "Nota qui\u00e9n te celebra cuando no hay nada que ganar.", reflection: "La ausencia de p\u00fablico es la prueba real. Mira qui\u00e9n aparece cuando tu logro no le beneficia." },
    q_035: { text: "El amigo que escucha vale diez que hablan.", reflection: "Ser o\u00eddo es m\u00e1s raro que ser aconsejado. Protege a quienes te dejan terminar tus frases." },
    q_034: { text: "Los celos usan la m\u00e1scara del consejo.", reflection: "Escucha la preocupaci\u00f3n que llega justo tras tu buena noticia. El cari\u00f1o eleva; la envidia corrige." },
    q_025: { text: "La distancia no es crueldad. A veces es supervivencia.", reflection: "Retroceder no es abandonar. Puedes protegerte de alguien a quien todav\u00eda amas." },
    q_016: { text: "No eres demasiado. Estabas con alguien insuficiente.", reflection: "La intensidad no es un defecto. Una capacidad desigual no es tu fracaso al encogerte." },
    q_010: { text: "Te agotas porque prestas energ\u00eda que nunca ofreciste.", reflection: "No toda petici\u00f3n merece un s\u00ed. Observa qu\u00e9 relaciones te dejan necesitando recuperaci\u00f3n." },
    q_029: { text: "Algunas amistades caducan. Eso no las hace fracasos.", reflection: "Una amistad que te sostuvo una temporada cumpli\u00f3 su funci\u00f3n. No todo est\u00e1 hecho para durar." },
    q_038: { text: "El duelo es amor sin destino.", reflection: "El peso es proporcional a lo que import\u00f3. No est\u00e1s roto; sigues amando algo que no puedes alcanzar." },
    q_046: { text: "Crecer se siente como p\u00e9rdida antes que como libertad.", reflection: "Hay que soltar la versi\u00f3n vieja para que quepa la nueva. El vac\u00edo intermedio es normal y temporal." },
    q_031: { text: "Un amigo que solo aparece en tu invierno no es amigo.", reflection: "A algunos les atrae tu lucha porque los tranquiliza. Observa c\u00f3mo reaccionan a tus buenas noticias." },
    q_019: { text: "Si debes descifrarlo, nunca fue amor claro.", reflection: "Las se\u00f1ales mixtas son una se\u00f1al. Quien quiere ser entendido se hace entendible." },
    q_015: { text: "Un amor que exige tu silencio no es amor.", reflection: "Si la relaci\u00f3n solo est\u00e1 en calma cuando dejas de ser honesto, esa calma no es paz. Es gesti\u00f3n." },
    q_013: { text: "La energ\u00eda que toleras es la que atraes.", reflection: "Tolerar se lee como invitar. Lo que dejas pasar una vez se vuelve la norma." },
    q_024: { text: "Ense\u00f1as a la gente c\u00f3mo tratarte con lo que aceptas.", reflection: "Cada conducta no cuestionada es una lecci\u00f3n dada. El silencio es programa." },
    q_049: { text: "No puedes sanar lo que finges que est\u00e1 bien.", reflection: "Nombrarlo no es debilidad, es el requisito. Nada se trata mientras siga sin diagn\u00f3stico." },
    q_048: { text: "S\u00e9 honesto sobre la versi\u00f3n tuya que est\u00e1s protegiendo.", reflection: "La defensiva custodia una imagen vieja de ti. Preg\u00fantate qu\u00e9 perder\u00edas si la revisaras." },
    q_005: { text: "No puedes leer tu energ\u00eda mientras act\u00faas la de otro.", reflection: "Actuar consume atenci\u00f3n. Cada gesto calculado se resta de tu capacidad de notar c\u00f3mo te sientes." },
    q_050: { text: "Deja de audicionar donde ya perteneces.", reflection: "Sobredemostrar es un h\u00e1bito de salas que no te aceptaron. Revisa qui\u00e9n ya dijo que s\u00ed." },
    q_003: { text: "La quietud no es vac\u00edo. Es donde te escuchas.", reflection: "El ruido es un buen escondite. Cuando cae, lo primero que emerge suele ser lo que evitabas \u2014 y lo que m\u00e1s necesitas o\u00edr." },
    q_007: { text: "Vuelve a ti como el agua vuelve al mar.", reflection: "Sin forzar, sin drama. Solo la direcci\u00f3n natural de las cosas cuando dejas de empujar." },
    q_011: { text: "Protege tu paz como si pagara tu renta.", reflection: "Porque lo hace. Todo lo que construyes corre sobre un sistema nervioso que necesita descansar." },
    q_052: { text: "La confianza no es ruidosa. Es imperturbable.", reflection: "La seguridad real no necesita alegar. Busca la calma que no exige que nadie est\u00e9 de acuerdo." },
    q_041: { text: "La suavidad tras el da\u00f1o es lo m\u00e1s valiente.", reflection: "Endurecerse es la respuesta obvia. Seguir abierto pese a todo es la elecci\u00f3n rara." },
    q_012: { text: "No toda sala merece tu color entero.", reflection: "La reserva no es deshonestidad. Algunos espacios no se han ganado tu profundidad." },
    q_021: { text: "El amor real no te hace audicionar.", reflection: "Si demuestras constantemente que mereces quedarte, no est\u00e1s en una relaci\u00f3n. Est\u00e1s en una evaluaci\u00f3n." },
    q_026: { text: "Estar siempre disponible te vuelve nunca valorado.", reflection: "No es un juego, es econom\u00eda de la atenci\u00f3n. Lo que no cuesta rara vez se trata como valioso." },
    q_022: { text: "\u00abNo\u00bb es una frase completa.", reflection: "Explicar abre la negociaci\u00f3n. Tienes derecho a rechazar sin construir un caso." },
    q_023: { text: "La culpa es el impuesto que cobran por tu primer l\u00edmite.", reflection: "Se desvanece. Lo que parece crueldad en la semana uno se lee como claridad al tercer mes." },
    q_027: { text: "La paz cuesta algunas relaciones. P\u00e1gala.", reflection: "Algunos v\u00ednculos solo sobreviven a tu autoabandono. Perderlos es el precio, no la tragedia." },
    q_028: { text: "Cerrar una puerta tambi\u00e9n es respeto propio.", reflection: "No le debes a nadie acceso permanente. Un final elegido con conciencia no es traici\u00f3n." },
    q_033: { text: "Un amigo de todos no es amigo de nadie.", reflection: "La profundidad exige selecci\u00f3n. Repartirte entre todos no deja nada s\u00f3lido para nadie." },
    q_051: { text: "Tus est\u00e1ndares no son la raz\u00f3n de tu soledad.", reflection: "Esperar no es ser rechazado. Bajar el list\u00f3n no crea conexi\u00f3n; solo cambia qui\u00e9n se acerca." },
    q_053: { text: "No necesitas permiso para ocupar espacio.", reflection: "Encogerte para mantener la paz es un h\u00e1bito, no una personalidad. Tu presencia nunca fue condicional." },
    q_054: { text: "Nadie puede hacerte sentir inferior sin tu consentimiento.", reflection: "No niega que las palabras duelan. Recuerda que el veredicto final sobre tu valor sigue siendo tuyo." },
    q_055: { text: "Puedes superar a quienes te conocieron primero.", reflection: "La antig\u00fcedad no es autoridad. Quienes te vieron m\u00e1s peque\u00f1o no definen tu techo." },
    q_056: { text: "El\u00edgete. Nadie m\u00e1s tiene ese trabajo.", reflection: "Puedes ser amado y a\u00fan ser el \u00fanico responsable de defenderte. Nadie vendr\u00e1 a hacerlo." },
    q_001: { text: "No vas tarde. Est\u00e1s naciendo.", reflection: "La comparaci\u00f3n colapsa el tiempo. El cap\u00edtulo doce de otro no es tu cap\u00edtulo tres. Tu ritmo sigue siendo movimiento." },
    q_006: { text: "Casi todo vuelve a funcionar si lo desconectas unos minutos \u2014 t\u00fa incluido.", reflection: "El agotamiento no es un defecto de car\u00e1cter. Es informaci\u00f3n. El descanso no es el premio del trabajo; es parte de \u00e9l." },
    q_043: { text: "Todo lo que nos irrita de los dem\u00e1s puede llevarnos a comprendernos.", reflection: "La intensidad de tu reacci\u00f3n es la pista. Una ira desproporcionada suele ser reconocimiento." },
    q_044: { text: "La parte de ti que ocultas es la que necesita aire.", reflection: "Ocultar no resuelve nada. Lo que queda en la sombra conserva su poder sobre ti." },
    q_040: { text: "Lo que te niegas a sentir, lo repetir\u00e1s.", reflection: "Evitar no borra una emoci\u00f3n. La desv\u00eda \u2014 a tu cuerpo, tus patrones, tu pr\u00f3xima relaci\u00f3n." },
    q_004: { text: "Con\u00f3cete a ti mismo.", reflection: "Tres palabras, una vida de trabajo. Casi todo lo que llamas intuici\u00f3n es memoria. Distinguirlas es toda la pr\u00e1ctica." },
    q_017: { text: "La herida es el lugar por donde entra la luz.", reflection: "No es una invitaci\u00f3n al dolor. Es una raz\u00f3n para dejar de tratar tus heridas como descalificaci\u00f3n." },
    q_045: { text: "No eres tu peor noche.", reflection: "Un fracaso es un evento, no una identidad. Eres el patr\u00f3n en el tiempo, no la excepci\u00f3n que repites." },
    q_014: { text: "Tienes poder sobre tu mente, no sobre los sucesos. Comprende esto y hallar\u00e1s fuerza.", reflection: "No controlas la sala. Controlas lo que llevas a ella y lo que aceptas sacar de ella." },
    q_002: { text: "Un viaje de mil millas comienza con un solo paso.", reflection: "No necesitas el mapa entero hoy. Necesitas el siguiente paso, dado con honestidad. El impulso se construye, no se encuentra." },
    q_032: { text: "La lealtad no se prueba en la comodidad, sino en el costo.", reflection: "Acompa\u00f1arte gratis es f\u00e1cil. La medida es qu\u00e9 est\u00e1 dispuesto a perder alguien por quedarse." },
    q_036: { text: "Sanar no es lineal. Es una espiral con mejores vistas.", reflection: "Revisitar un dolor viejo no es retroceder. Lo encuentras desde m\u00e1s arriba y con m\u00e1s capacidad." },
    q_037: { text: "Sobreviviste cada d\u00eda que cre\u00edste imposible.", reflection: "Tu historial es del cien por ciento. Eso no es suerte, es evidencia de algo en ti que sigue sosteniendo." },
    q_039: { text: "Perdona por tu ligereza, no por su comodidad.", reflection: "El perd\u00f3n no es permiso ni reconciliaci\u00f3n. Es soltar algo que solo pesaba para ti." },
    q_042: { text: "El tiempo no cura. Lo que haces con \u00e9l cura.", reflection: "Los a\u00f1os solos a\u00f1aden distancia. La atenci\u00f3n y la honestidad convierten el tiempo en recuperaci\u00f3n." },
    q_047: { text: "Lo que impide la acci\u00f3n impulsa la acci\u00f3n. Lo que estorba el camino se vuelve el camino.", reflection: "El obst\u00e1culo no interrumpe tu ruta. Muchas veces construye justo lo que te faltaba." },
  },
} as const;

/** One quote's localized prose. */
export interface QuoteContent {
  text: string;
  reflection: string;
}

export type QuoteContentMap = Record<string, QuoteContent>;

const BODIES_BY_LANG: Record<Language, QuoteContentMap> = {
  en: QUOTE_BODIES.en,
  fr: QUOTE_BODIES.fr,
  ar: QUOTE_BODIES.ar,
  es: QUOTE_BODIES.es,
};

/**
 * Localized body for a quote id, falling back to English when a locale is missing
 * an entry (mirrors getArticleContent) so a quote always renders.
 */
export function getQuoteContent(id: string, lang: Language): QuoteContent {
  return BODIES_BY_LANG[lang]?.[id] ?? BODIES_BY_LANG.en[id] ?? BODIES_BY_LANG.en[QUOTE_SEQUENCE[0].id];
}

/**
 * Today's quote for a user, paced off the SAME curriculum anchor the streak uses
 * (`userStore.weekAnchorDate`) via the SAME day-count definition the rest of the app
 * uses (`getDaysSinceAnchor`). Deliberately independent of WEEKS / getActiveWeek /
 * getTodayPairing / getDailyInsightId — the quote ritual does not run on the weekly
 * curriculum. Anchor null (no ritual completed yet) → day 0 → QUOTE_SEQUENCE[0].
 */
export function getTodayQuote(anchor: number | null, date: Date = new Date()): QuoteEntry {
  return getQuoteForDay(getDaysSinceAnchor(anchor, date));
}

/**
 * Index into the active theme's `dailyAccents` (0..6) — "today's colour".
 *
 * Paced off the SAME day count as the quote itself, so the colour turns over at local
 * midnight together with the line: day 0 violet, day 1 blue, day 2 cyan … then back
 * round. Read the actual hex as `theme.dailyAccents[getDailyAccentIndex(anchor)]` so an
 * unlocked theme recolours the whole cycle rather than just the base.
 *
 * QUOTE_SEQUENCE is clustered in runs of 7, so a cluster and a colour cycle stay in
 * step — a themed week reads as one colour progression.
 */
export function getDailyAccentIndex(anchor: number | null, date: Date = new Date()): number {
  return getDaysSinceAnchor(anchor, date) % 7;
}
