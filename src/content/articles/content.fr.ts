// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — French long-form content
// ─────────────────────────────────────────────────────────────────────────────
// Same shape as content.en.ts (keyed by article id). Untranslated ids fall back
// to English automatically (see getArticleContent in ./index.ts), so this can be
// filled article-by-article without breaking the feed.
// ─────────────────────────────────────────────────────────────────────────────

import type { ArticleContentMap } from './index';

export const articlesFr: ArticleContentMap = {
  // ── Week 1 "Secret Signs of Love" — days 2–7 (day 1 = ten_signs_secret_love,
  // still pending translation in a BASE_ARTICLES batch) ──────────────────────
  w01_a2: {
    title: "Ce que font les gens quand ils n'arrivent pas à dire « je t'aime »",
    subtitle: 'Quand les mots restent bloqués, les mains continuent de parler',
    blocks: [
      { type: 'paragraph', text: "Tout le monde n'y arrive pas. Pour certains, les trois mots se cachent derrière toute une vie de raisons de ne pas les risquer — la fierté, la peur, une enfance où l'affection était rationnée. Alors l'amour trouve une autre porte. Il ressort dans le téléphone chargé que tu n'as pas demandé, la place qu'on te garde sans le dire, la façon dont on connaît soudain ta commande de café." },
      { type: 'heading', text: "L'amour qui voyage déguisé" },
      { type: 'paragraph', text: "Observe les gestes qui leur coûtent quelque chose — du temps, de l'effort, un peu de leur confort. Une personne qui traverse la ville pour réparer ta seule chose cassée le dit. Une personne qui reste au téléphone pendant que tu t'endors le dit. Les mots ne sont que la légende ; ceci est la photographie." },
      { type: 'paragraph', text: "Le vrai signe, c'est la constance. N'importe qui peut faire une chose gentille une fois. Ceux qui t'aiment font les petites choses sans éclat, encore et encore, quand personne ne regarde et qu'il n'y a rien à gagner." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les psychologues appellent cela des expressions instrumentales de l'amour — une attention manifestée par l'action plutôt que par la déclaration. Elles s'appuient sur la psychologie relationnelle, pas sur l'astrologie : observables, reproductibles, et profondément humaines." },
    ],
  },
  w01_a3: {
    title: "Pourquoi le véritable amour se cache dans les petits gestes ennuyeux",
    subtitle: "La preuve peu romantique qui dure plus longtemps que l'autre",
    blocks: [
      { type: 'paragraph', text: "Les grands gestes sont faciles à exécuter et faciles à feindre. Les fleurs, le discours, la surprise — ils sont photogéniques et ne demandent presque rien à la personne qui les fait. L'amour véritable habite plutôt un endroit beaucoup moins cinématographique : dans le verre d'eau rempli à nouveau, le réservoir refait le plein, le texto qui dit simplement « bien arrivé ? »" },
      { type: 'paragraph', text: "Ces gestes sont ennuyeux exprès. Ce sont de l'amour dépouillé de toute mise en scène — personne n'applaudit, personne n'est même censé le remarquer. C'est exactement ce qui les rend sincères. Une personne qui accomplit le travail terne et répétitif de prendre soin de toi n'a ni public ni motif, à part toi." },
      { type: 'quote', text: "Tu reconnais qui t'aime à ce qu'il fait quand il n'y a aucune histoire à en tirer.", attribution: 'Sur la dévotion ordinaire' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La régularité d'une attention peu coûteuse mais répétée prédit bien mieux la sécurité d'une relation que des grands gestes occasionnels — un constat de la recherche relationnelle, pas des astres." },
    ],
  },
  w01_a4: {
    title: "Appels à la connexion : les petits tests que tu réussis ou rates sans arrêt",
    subtitle: "Les micro-moments qui décident tranquillement d'une relation",
    blocks: [
      { type: 'paragraph', text: "Toute la journée, les gens lancent de petites phrases vers ceux qu'ils aiment. « Regarde ce ciel. » « J'ai fait le rêve le plus étrange. » « Tu as vu ça ? » Chacune est un appel — une minuscule invitation qui signifie : remarque-moi, sois avec moi une seconde. Elles n'ont presque jamais l'air d'être importantes. Elles le sont." },
      { type: 'heading', text: "Se tourner vers, s'éloigner, ou se retourner contre" },
      { type: 'orderedList', items: [
        { title: 'Se tourner vers', text: "Ils répondent à l'appel — ils regardent, ils demandent, ils s'impliquent. C'est le oui silencieux qui bâtit la confiance goutte à goutte." },
        { title: "S'éloigner", text: "Ils la manquent ou l'ignorent — pas par cruauté, juste par distraction. Quelques-unes ne sont rien. Un schéma de celles-ci est une érosion." },
        { title: 'Se retourner contre', text: "Ils réagissent sèchement ou balaient l'appel d'un revers. Rare, mais corrosif, car la personne apprend à ne plus tendre la main." },
      ] },
      { type: 'paragraph', text: "Si quelqu'un se tourne vers tes plus petits appels — la blague idiote, la pensée à moitié formée — il te choisit dans un langage plus ancien que les mots. Observe à quelle fréquence il dit oui à tes riens." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le cadre des « appels à la connexion » vient de décennies de science relationnelle observationnelle : la fréquence à laquelle les partenaires se tournent l'un vers l'autre prédit fortement si un lien va durer." },
    ],
  },
  w01_a5: {
    title: "Quand quelqu'un se souvient de ce que tu avais oublié d'avoir dit",
    subtitle: "La mémoire n'est que de l'attention à la durée de conservation plus longue",
    blocks: [
      { type: 'paragraph', text: "Tu l'as mentionné une fois, il y a des mois, en passant — le livre que tu voulais, l'aliment que tu ne peux pas manger, le nom du chien que tu avais enfant. Tu avais oublié l'avoir dit. Pas eux. Et quand ça refait surface dans quelque chose qu'ils font, tu ressens une petite chaleur surprenante : ils écoutaient plus attentivement que tu ne le savais." },
      { type: 'paragraph', text: "Une mémoire comme celle-ci n'est pas un tour de passe-passe d'un bon cerveau. C'est de l'attention. On se souvient de ce qui nous importe. Quand quelqu'un retient tes détails dits sans y penser, il te dit où son attention a discrètement été dirigée depuis le début — vers toi." },
      { type: 'paragraph', text: "C'est aussi l'un des signes les plus difficiles à feindre, car il ne peut pas être produit à la demande. Il n'existe que si l'écoute a déjà eu lieu, des semaines plus tôt, quand rien n'était en jeu." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'attention pilote la mémorisation — on retient ce qu'on juge important. Se souvenir de tes détails anodins est une preuve observable d'une attention soutenue, ancrée dans la psychologie cognitive et relationnelle." },
    ],
  },
  w01_a6: {
    title: "Le corps parle en premier : posture, distance et désir",
    subtitle: "Ce que les gens disent avant même de parler",
    blocks: [
      { type: 'paragraph', text: "Bien avant qu'un mot ne soit choisi, le corps a déjà répondu. Où quelqu'un pointe ses pieds, à quelle distance il dérive, s'il se penche en avant ou reste sur ses positions — les gens diffusent leur intérêt dans un langage qu'ils ignorent parler, et dans lequel il est difficile de mentir." },
      { type: 'heading', text: "Le canal honnête" },
      { type: 'paragraph', text: "Observe les petits signes involontaires : l'angle de leurs épaules qui se tournent vers toi, la façon dont la distance se réduit quand vous parlez, le mimétisme de tes gestes sans que ni l'un ni l'autre ne le remarque. On copie inconsciemment les gens dont on se sent proche — un mouvement synchronisé rend la proximité visible." },
      { type: 'paragraph', text: "Aucun de ces signes n'est une preuve à lui seul. Mais le corps se contredit rarement longtemps. Quand la posture, la proximité et le contact visuel disent tous la même chose, crois-les avant de croire les mots." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La synchronie non verbale et l'orientation du corps sont des marqueurs bien documentés de la connexion et de l'attirance en psychologie — des schémas que tu peux observer, pas de la voyance." },
    ],
  },
  w01_a7: {
    title: "Comment distinguer l'attention de l'affection",
    subtitle: "Être vu et être aimé ne sont pas la même chose",
    blocks: [
      { type: 'paragraph', text: "Certaines personnes excellent dans l'attention. Elles te donnent l'impression d'être la seule personne dans la pièce — vives, curieuses, entièrement présentes. C'est enivrant, et il est facile de le confondre avec l'amour. Mais l'attention peut être une habitude, un charme, une façon de traverser le monde. L'affection, c'est autre chose : une attention qui continue de se manifester après que la pièce s'est vidée." },
      { type: 'heading', text: "La différence, c'est la constance dans le temps" },
      { type: 'paragraph', text: "L'attention est le projecteur ; l'affection, c'est le fait de rester. Ne demande pas comment quelqu'un te fait sentir sur l'instant, mais ce qu'il fait le lendemain, et le jour d'après. Se souvient-il ? Revient-il ? La chaleur survit-elle à la distance et aux désagréments ? L'affection, c'est de l'attention qui a décidé d'être loyale." },
      { type: 'paragraph', text: "C'est la chose la plus bienveillante que tu puisses apprendre à lire, car elle te protège des personnes charmantes qui ressemblent à de l'amour sans en être — et t'aide à remarquer les personnes plus discrètes dont l'affection n'éblouit pas, mais qui ne partent pas." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La constance dans le temps est ce qui distingue un véritable attachement d'un engagement passager — une distinction issue de la psychologie relationnelle, observable dans le comportement plutôt que lue dans les astres." },
    ],
  },

  // ── Week 2 "When They Pull Away" — days 1–7 (all new articles) ─────────────
  w02_a1: {
    title: 'Comment savoir si quelqu\'un s\'éloigne',
    subtitle: 'La distance s\'annonce toujours — en silence',
    blocks: [
      { type: 'paragraph', text: "Personne ne part d'un coup. Avant la porte, il y a la dérive : des réponses qui arrivent plus tard et pèsent moins lourd, des projets qui passent de « prévus » à « peut-être », une chaleur qui n'a pas disparu mais qui a perdu son poids on ne sait comment. Tu le sens avant de pouvoir le prouver — et c'est exactement dans cet écart entre le ressenti et la preuve que les gens se rendent fous." },
      { type: 'heading', text: 'Les trois canaux de la dérive' },
      { type: 'orderedList', items: [
        { title: 'Effort', text: "Qui prend l'initiative, qui planifie, qui se souvient. La dérive apparaît ici en premier — le travail invisible de la relation change discrètement de mains." },
        { title: 'Attention', text: "Pose-t-il encore des questions de suivi ? Tes petites histoires suscitent-elles encore une réaction ? L'attention se réduit avant la présence." },
        { title: 'Réparation', text: "Quand quelque chose cloche et que tu le nommes, se penche-t-il pour arranger les choses — ou hausse-t-il les épaules ? La volonté de réparer est la dernière chose à disparaître." },
      ] },
      { type: 'paragraph', text: "Une semaine silencieuse n'est pas un verdict. Les gens tombent malades, se retrouvent débordés, deviennent tristes pour des raisons qui n'ont rien à voir avec toi. Ce que tu dois surveiller, ce n'est pas une mauvaise journée mais une direction — trois canaux, qui évoluent tous dans le même sens, sur plusieurs semaines. Ce n'est pas une humeur. C'est un message." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La recherche sur les relations montre systématiquement qu'une réactivité en baisse — un engagement plus lent et plus mince sur plusieurs canaux — précède un retrait conscient. Tu lis un schéma, pas une prophétie." },
    ],
  },
  w02_a2: {
    title: "La différence entre avoir besoin d'espace et perdre l'intérêt",
    subtitle: 'Les deux deviennent silencieux. Un seul revient.',
    blocks: [
      { type: 'paragraph', text: "Vu de l'extérieur, ils se ressemblent : moins de messages, des appels plus courts, une personne qui était partout et qui se rationne désormais. Mais avoir besoin d'espace et perdre l'intérêt sont deux créatures opposées portant le même manteau — et il existe un moyen fiable de les distinguer." },
      { type: 'heading', text: "L'espace a une adresse de retour" },
      { type: 'paragraph', text: "Une personne qui a besoin d'espace continue d'entretenir le lien pendant qu'elle le prend. Elle te le dit — peut-être maladroitement, mais elle te le dit. La chaleur dans le peu de contact que tu reçois reste intacte. Elle demande de la patience plutôt que de faire semblant que rien n'a changé. La distance a des contours : une raison, une forme, une version de « c'est à propos de moi, pas de nous »." },
      { type: 'paragraph', text: "Perdre l'intérêt n'a rien de tout ça. Ça ne s'annonce pas, car s'annoncer exigerait de se soucier de la façon dont le silence te touche. Les réponses ne sont pas seulement plus rares — elles sont plus plates. Tes nouvelles cessent de provoquer des questions. La distance n'a aucun contour ; elle s'étend simplement." },
      { type: 'quote', text: "L'espace dit « attends-moi ». L'indifférence ne dit rien du tout.", attribution: 'Sur les deux silences' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Cette distinction s'appuie sur la recherche sur la réactivité : les partenaires investis maintiennent la chaleur et les signaux de réparation même en se retirant, tandis qu'un véritable désengagement fait chuter les deux. C'est un comportement que tu peux observer, pas une énergie que tu dois deviner." },
    ],
  },
  w02_a3: {
    title: 'Le fondu lent : lire la sortie silencieuse',
    subtitle: "L'adieu qui ne prononce jamais le mot",
    blocks: [
      { type: 'paragraph', text: "Le fondu lent est la sortie de ceux qui ne supportent pas les portes. Au lieu de mettre fin aux choses, ils laissent les choses finir — réponse plus courte après réponse plus courte, projet reporté après projet reporté — en espérant que la relation se dissoudra assez doucement pour que personne ne puisse les accuser de partir. C'est l'adieu le plus courant de l'époque moderne, et le plus cruel précisément parce qu'il est niable." },
      { type: 'paragraph', text: "La signature d'un fondu, c'est que rien ne va jamais mal. Demande, et tu obtiendras « juste occupé », « tout va bien », un emoji cœur faisant le travail qu'une conversation devrait faire. Pendant ce temps, tout ce qui est mesurable décline : la fréquence, la longueur, la profondeur, l'initiative. Les mots disent de rester ; les chiffres disent de partir." },
      { type: 'paragraph', text: "Si tu soupçonnes un fondu, n'examine pas chaque excuse — examine la tendance. Chaque excuse peut être vraie et le schéma reste quand même le message. Une personne qui veut faire partie de ta vie se bat contre le calendrier pour toi. Une personne qui s'efface laisse le calendrier gagner, à chaque fois." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'évitement du conflit direct est l'une des raisons les mieux documentées pour lesquelles les gens se retirent passivement plutôt que de mettre fin aux choses proprement. Le fondu est une stratégie d'évitement du conflit — le reconnaître te protège de mois de décryptage." },
    ],
  },
  w02_a4: {
    title: 'Quand « occupé » veut dire autre chose',
    subtitle: 'Le mensonge le plus honnête que les gens racontent',
    blocks: [
      { type: 'paragraph', text: "« Occupé » est réel. Les vies se remplissent vraiment — le travail, la famille, les tempêtes privées dont les gens ne parlent pas. Mais « occupé » est aussi le solvant universel des relations modernes : le mot qui peut dissoudre n'importe quelle obligation sans que personne n'ait à dire une phrase plus dure. La question n'est jamais de savoir si quelqu'un est occupé. C'est ce à quoi son occupation laisse de la place." },
      { type: 'heading', text: "Occupé est un classement, pas un emploi du temps" },
      { type: 'paragraph', text: "Tout le monde que tu connais est occupé, et tout le monde que tu connais trouve quand même des minutes pour ce qu'il classe en premier. L'ami débordé qui t'envoie quand même le mème qui lui a fait penser à toi. La personne épuisée qui appelle quand même quatre minutes depuis la voiture. Les gens occupés ne disparaissent pas des vies qu'ils chérissent — ils réduisent leur présence sans la briser." },
      { type: 'paragraph', text: "Alors lis « occupé » à ses résidus. Occupé-mais-ancré laisse des miettes : de petits messages, des reports qui finissent par se concrétiser, des excuses qui semblent coûter quelque chose. Occupé-comme-sortie ne laisse rien d'autre que le mot lui-même, répété jusqu'à ce que tu arrêtes de demander." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La recherche sur l'usage du temps est sans détour : les gens trouvent de manière fiable de petites poches de temps pour leurs priorités absolues, même sous forte charge. Une « occupation » soutenue à contact zéro envers une seule personne est un schéma de choix, pas un problème d'emploi du temps." },
    ],
  },
  w02_a5: {
    title: "L'anxiété du texto sans réponse",
    subtitle: "Trois points gris et un cœur qui s'emballe",
    blocks: [
      { type: 'paragraph', text: "Tu l'as envoyé il y a des heures. Tu l'as relu onze fois — était-ce trop, trop plat, trop empressé ? Tu l'as vu « en ligne » ailleurs. Un message sans réponse venant de quelqu'un auquel tu es attaché est un minuscule événement que le cerveau anxieux gonfle en verdict, et à minuit tu as déjà écrit toute la fin dans ta tête." },
      { type: 'heading', text: "Pourquoi le silence fait plus mal qu'un non" },
      { type: 'paragraph', text: "L'esprit déteste l'ambiguïté plus qu'il ne déteste les mauvaises nouvelles. Un non est douloureux mais gérable ; le silence est un vide que le cerveau remplit avec son brouillon le plus effrayant. C'est pourquoi un seul texto sans réponse peut faire plus mal qu'une vraie dispute — tu ne réagis pas à ce qui s'est passé, tu réagis à tout ce qui aurait pu se passer." },
      { type: 'paragraph', text: "Voici le geste qui stabilise : juge le schéma, jamais le message. Une seule réponse lente ne veut rien dire — les gens conduisent, dorment, se noient dans leur journée. Ce qui compte, c'est la référence habituelle. Si leur normal est chaleureux et que cette semaine est silencieuse, note-le comme un seul point de données et laisse la semaine finir de parler. Et observe honnêtement ton propre côté : si chaque silence te fait spiraler, une partie de ce que tu lis est ton système d'alarme, pas leur signal." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'intolérance à l'incertitude est un moteur bien étudié de la rumination anxieuse — un silence ambigu active les réponses de menace plus vite qu'une information négative claire. Le nommer t'aide à séparer leur comportement de ton alarme." },
    ],
  },
  w02_a6: {
    title: 'Pourquoi les gens se retirent juste quand ils ressentent le plus',
    subtitle: 'Le repli qui survient au pire moment exact',
    blocks: [
      { type: 'paragraph', text: "C'est l'un des schémas les plus étranges de l'amour : le week-end était parfait, quelque chose de réel s'est ouvert, tu l'as enfin senti pleinement présent — et puis il disparaît. Pas de façon dramatique. Juste soudainement plus loin, précisément au moment où la proximité culminait. Ça ressemble à un rejet. C'est souvent l'inverse." },
      { type: 'heading', text: 'La proximité peut ressembler à un danger' },
      { type: 'paragraph', text: "Pour les personnes qui ont appris tôt que dépendre de quelqu'un finit mal, l'intimité déclenche une alarme silencieuse. Plus les choses se rapprochent, plus elle sonne fort — et le système nerveux fait ce pour quoi il a été entraîné : créer de la distance pour se sentir de nouveau en sécurité. Les psychologues appellent cela des stratégies de désactivation : chercher une petite dispute, se taire, soudainement « avoir besoin de se recentrer sur soi » la semaine après le meilleur moment que vous ayez jamais vécu ensemble." },
      { type: 'paragraph', text: "Cela ne rend pas le schéma acceptable, et ce n'est pas à toi de le réparer. Mais ça change ce que signifie la distance. Quelqu'un qui fuit la profondeur de son propre ressenti est une histoire différente de quelqu'un qui perd l'intérêt — le signe, c'est qu'il continue de revenir vers la proximité même qu'il fuit, en boucle. Que tu veuilles vivre à l'intérieur de cette boucle est une question honnête, mais différente." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les stratégies de désactivation après des moments d'intimité sont un schéma central et bien documenté dans la recherche sur l'attachement évitant. Le retrait suit la proximité elle-même — c'est pourquoi il survient si précisément au « mauvais » moment." },
    ],
  },
  w02_a7: {
    title: "Laisser partir quelqu'un avant qu'il ait fini de partir",
    subtitle: "Tu as le droit d'arrêter d'attendre à la porte",
    blocks: [
      { type: 'paragraph', text: "Il existe une forme particulière d'épuisement qui vient du fait d'aimer quelqu'un au ralenti — le regarder partir par degrés pendant que tu tiens la porte ouverte, en te disant que la patience est une forme de loyauté. À un moment donné, la question la plus difficile cesse d'être « part-il ? » et devient « combien de temps suis-je prêt à rester ici ? »" },
      { type: 'paragraph', text: "Lâcher prise avant qu'il ait fini de partir, ce n'est pas abandonner sur lui. C'est abandonner la tâche d'être le seul à porter la chose. Tu arrêtes de tout initier et tu vois ce qui tient. Tu arrêtes de traduire son silence en langages d'espoir. Tu laisses la relation peser ce qu'elle pèse réellement, sans tes mains dessous — et tu laisses cette vérité être une information plutôt qu'une urgence." },
      { type: 'heading', text: 'À quoi ressemble vraiment le lâcher-prise' },
      { type: 'paragraph', text: "C'est rarement un adieu dramatique unique. Ce sont cent petites reconquêtes : faire le projet sans vérifier d'abord sa disponibilité, laisser un message en attente parce que ta soirée était pleine, remarquer qu'un après-midi entier est passé sans décrypter personne. Le deuil vient par visites, et entre les visites, ta vie revient tranquillement. S'il se retourne et marche vers toi, laisse-le le faire avec ses propres jambes. Et s'il ne le fait pas — tu seras déjà quelque part plus loin sur ton propre chemin." },
      { type: 'quote', text: "Tu ne peux pas perdre quelqu'un qui était déjà en train de partir. Tu ne peux perdre que le temps passé à attendre.", attribution: 'Sur le lâcher-prise' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les psychologues décrivent cela comme un deuil anticipé et un désengagement — commencer à traiter une perte alors qu'elle est encore en mouvement. Le désengagement délibéré d'un lien qui ne répond plus est systématiquement lié à un mieux-être retrouvé ; c'est du respect de soi, pas de la froideur." },
    ],
  },

  // ── Week 3 "Mixed Signals" — days 1–7 (all new articles) ───────────────────
  w03_a1: {
    title: 'Lire les signaux mixtes sans perdre la tête',
    subtitle: 'Un guide de survie au pays du peut-être',
    blocks: [
      { type: 'paragraph', text: "Les signaux mixtes sont le type de message le plus coûteux : ils te coûtent des heures de décryptage, une véritable enquête de groupe de discussion, et du sommeil — et ils refusent quand même de se résoudre. Un jour, il t'écrit en premier avec trois points d'exclamation ; trois jours plus tard, tu es apparemment un inconnu. Le coup de fouet n'est pas dans ta tête. Mais la façon dont tu le lis décide s'il te rend fou." },
      { type: 'heading', text: 'Première règle : arrête de lire les messages, commence à lire les mois' },
      { type: 'paragraph', text: "Un seul signal isolé n'est que du bruit. Un mardi chaleureux ne veut pas dire plus qu'un vendredi froid — les gens ont des humeurs, des gueules de bois, des mauvaises nouvelles dont tu n'entends jamais parler. La contradiction ne devient une information que lorsqu'elle se répète. Alors prends du recul : pas « qu'est-ce que voulait dire cet emoji » mais « quelle forme prend le dernier mois ? » Les schémas ne peuvent pas se cacher comme les instants le peuvent." },
      { type: 'paragraph', text: "Deuxième règle : un signal mixte reste un signal. Quelqu'un qui est systématiquement inconstant te dit quelque chose de vrai sur où il en est — inachevé, en conflit, ou à l'aise de te garder indéfini. Cette semaine sépare ces possibilités, un fil par jour. Au septième jour, tu auras une vraie réponse au lieu d'une supposition." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La recherche sur le jugement est claire : les humains surinterprètent les événements isolés et sous-interprètent les schémas. Agréger le comportement dans le temps est l'antidote fiable — tu passes des anecdotes aux données." },
    ],
  },
  w03_a2: {
    title: "Chaud et froid : la psychologie de l'inconstance",
    subtitle: 'Pourquoi la même personne peut sembler être deux personnes',
    blocks: [
      { type: 'paragraph', text: "La partie la plus difficile du chaud-froid, ce n'est pas le froid. C'est que le chaud était réel. Tu n'as pas imaginé la conversation profonde à 1h du matin, la façon dont il te regardait, les projets qu'il a esquissés à voix haute. Puis la température a chuté, et maintenant tu portes deux vérités qui refusent de s'accorder." },
      { type: 'heading', text: "Trois moteurs de l'inconstance" },
      { type: 'orderedList', items: [
        { title: 'Le conflit', text: "Il le veut vraiment ET le craint vraiment. La chaleur, c'est l'envie ; le froid, c'est la peur qui gagne cette semaine-là. Celui-ci est une guerre en lui, pas un jeu joué contre toi." },
        { title: 'La commodité', text: "Il devient chaleureux quand il a besoin de quelque chose — attention, réconfort, un plein d'ego — et froid quand ce n'est pas le cas. Observe si la chaleur suit TA vie ou SES besoins." },
        { title: 'Les circonstances', text: "Le plus rare et le plus innocent : sa vie est réellement chaotique, et l'inconstance reflète son agenda, pas ses sentiments. Le signe, c'est que la qualité de la chaleur ne change jamais — seule la fréquence change." },
      ] },
      { type: 'paragraph', text: "En général, tu ne peux pas savoir quel moteur tourne à partir d'un seul épisode. Mais sur plusieurs semaines, chacun laisse une empreinte différente — et les questions de cette semaine sont conçues pour relever exactement ces empreintes." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le conflit d'approche-évitement est l'un des schémas les plus anciens et documentés de la psychologie de la motivation : le même objectif peut déclencher à la fois le désir et la peur, produisant exactement l'oscillation que tu observes." },
    ],
  },
  w03_a3: {
    title: 'Quand ses mots et ses actes se contredisent, crois les actes',
    subtitle: 'La plus vieille règle pour lire les gens, et pourquoi elle gagne toujours',
    blocks: [
      { type: 'paragraph', text: "Les mots ne coûtent rien à produire. Un « tu me manques » coûte trois secondes et zéro désagrément ; il peut être tapé depuis un canapé, à moitié sincère, à trois personnes en même temps. Les actes portent un coût — du temps, de l'effort, le fait de te choisir plutôt qu'une option plus facile. C'est exactement ce coût qui les rend honnêtes." },
      { type: 'paragraph', text: "Alors quand les deux canaux se contredisent, la contradiction elle-même est le message. Des mots doux plus un comportement absent ne sont pas un paradoxe à résoudre — c'est une préférence exprimée : il aime la façon dont tu te sens à son sujet plus qu'il n'est prêt à investir en toi. Inverse-le et la lecture bascule : des mots maladroits plus un comportement stable et présent, c'est de l'amour qui n'est simplement pas verbal. La bouche trébuche ; les pieds ne mentent pas." },
      { type: 'quote', text: "Les gens te disent où tu te situes par où ils se tiennent — pas par ce qu'ils disent de loin.", attribution: 'Sur les deux canaux' },
      { type: 'paragraph', text: "Une mise en garde : crois les actes dans la durée, pas un acte isolé sous la pression. N'importe qui peut faire un grand geste après avoir été confronté. Le canal honnête est le canal ennuyeux — ce qu'il fait un mercredi ordinaire, quand rien n'est en jeu." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La logique du signal coûteux traverse toute la science comportementale : les signaux qui exigent un véritable investissement sont de manière fiable plus honnêtes que les signaux bon marché. La parole est le signal le moins cher qui soit." },
    ],
  },
  w03_a4: {
    title: 'La danse du chaud-froid, et pourquoi elle rend accro',
    subtitle: "Ton cerveau sous l'effet du peut-être",
    blocks: [
      { type: 'paragraph', text: "Voici la science inconfortable : une affection inconstante est plus captivante qu'une affection stable. Pas parce que tu es cassé — mais à cause de la façon dont fonctionnent les systèmes de récompense. Une récompense qui arrive de façon imprévisible active le circuit du désir du cerveau bien plus fort qu'une récompense sur laquelle tu peux compter. C'est le même mécanisme qui garde les mains sur les machines à sous." },
      { type: 'heading', text: "Pourquoi les miettes ont l'air d'un festin" },
      { type: 'paragraph', text: "Quand la chaleur est rare et aléatoire, chaque goutte tombe avec une force disproportionnée. Le soulagement de voir son nom sur ton écran après quatre jours de silence peut sembler plus grand qu'une semaine entière de bonheur avec quelqu'un de stable — le soulagement et la joie se confondent chimiquement. Et donc l'éloignement n'affaiblit pas l'attachement. Il le resserre. Tu n'es pas amoureux de la distance ; tu es accro au retour." },
      { type: 'paragraph', text: "Nommer cela fait deux choses bienveillantes. Ça explique pourquoi il est tellement plus difficile de s'éloigner d'une personne inconstante que d'une personne froide — tu n'es pas faible, tu es câblé ainsi. Et ça te donne la question sobre autour de laquelle cette semaine tourne sans cesse : l'intensité que tu ressens est-elle vraiment une connexion, ou est-ce les lumières d'arcade d'une récompense intermittente ?" },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le fait que le renforcement intermittent produise l'attachement le plus fort et le plus résistant à l'extinction est l'une des conclusions les plus répliquées en psychologie comportementale. L'« étincelle » du chaud-froid, c'est ce schéma, ressenti de l'intérieur." },
    ],
  },
  w03_a5: {
    title: 'Est-ce lui qui est confus, ou toi ?',
    subtitle: 'La question que personne ne veut poser au miroir',
    blocks: [
      { type: 'paragraph', text: "Avant que cette semaine ne condamne qui que ce soit, un détour honnête s'impose : parfois les signaux sont stables et c'est nous qui créons le bruit statique. Un système d'attachement anxieux est un instrument sensible — il peut lire une réponse lente comme un rejet, une soirée fatiguée comme de la froideur, un besoin normal de solitude comme le début de la fin. La personne n'a jamais changé de température ; c'est notre alarme qui a changé." },
      { type: 'heading', text: 'Un rapide auto-examen' },
      { type: 'paragraph', text: "Essaie ces trois questions. Un : un ami neutre, à qui l'on montrerait les faits bruts du dernier mois, verrait-il de l'inconstance — ou juste un humain ordinaire et occupé ? Deux : le « froid » coïncide-t-il toujours avec quelque chose dans TA semaine (stress, pics d'insécurité, trop de temps pour réfléchir) ? Trois : les partenaires précédents ont-ils aussi été « déroutants » — chacun d'entre eux ? Un schéma de oui ici ne signifie pas que rien ne va mal. Ça signifie que l'instrument a besoin d'être calibré avant que tu fasses confiance à sa lecture." },
      { type: 'paragraph', text: "Il ne s'agit pas de te blâmer — une alarme sensible le devient généralement pour de bonnes raisons historiques. Il s'agit de précision. Si le bruit est en partie le tien, aucune quantité de décryptage de LUI ne le fera taire. Et si l'examen ressort propre — l'inconstance survit même à une lecture neutre — alors tu peux faire confiance pleinement au reste du verdict de cette semaine." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La recherche sur l'attachement montre que l'activation anxieuse biaise la perception : un comportement ambigu du partenaire est lu comme une menace de manière significativement plus fréquente. Vérifier l'instrument est une étape légitime dans la lecture du signal." },
    ],
  },
  w03_a6: {
    title: "Le confort de l'ambiguïté (et pourquoi les gens s'y cachent)",
    subtitle: 'Certaines personnes vivent dans le gris exprès',
    blocks: [
      { type: 'paragraph', text: "Tous les signaux mixtes ne viennent pas de la confusion. Certains viennent d'une stratégie — consciente ou à moitié consciente. L'ambiguïté est un endroit remarquablement confortable pour garder une autre personne : toute la chaleur, aucune des obligations. On ne peut pas rompre avec des choses indéfinies. On ne peut pas trahir des choses jamais promises." },
      { type: 'heading', text: 'Les avantages du gris (pour lui)' },
      { type: 'paragraph', text: "Une personne garée dans l'ambiguïté garde ton attention, ton affection et ta disponibilité sans en payer le prix. Elle aime être adorée sans avoir de comptes à rendre. Le signe, c'est ce qui se passe quand tu cherches à définir les choses : le sujet change, l'humour se déploie, « pourquoi a-t-on besoin d'étiquettes » arrive pile à l'heure — et puis, si tu te retires, une bouffée de chaleur te ramène exactement à l'endroit indéfini que tu essayais de quitter." },
      { type: 'paragraph', text: "Comprends bien ceci : quelqu'un peut vraiment t'apprécier et faire ça quand même. T'apprécier n'a jamais été la question. La question est de savoir s'il veut le rôle ou juste l'accès — et le gris existe précisément pour que cette question n'ait jamais à trouver de réponse. Parfois, le signal le plus profond dans le mélange, c'est le refus de le démêler." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Garder des partenaires dans des schémas d'attente à faible engagement tout en conservant leur investissement est bien documenté dans la recherche sur l'asymétrie d'engagement dans les relations. L'ambiguïté est la stratégie, pas l'accident." },
    ],
  },
  w03_a7: {
    title: 'Comment demander de la clarté sans la faire fuir',
    subtitle: "Une conversation honnête vaut mieux qu'un mois de plus à décrypter",
    blocks: [
      { type: 'paragraph', text: "Après six jours à lire des signaux, voici la vérité libératrice : tu as le droit d'arrêter de décrypter et de simplement demander. Le fantasme selon lequel la « bonne » analyse finira par percer le code te garde dans les archives pendant des mois. Une conversation claire récupère en cinq minutes ce que le décryptage ne peut récupérer en une saison." },
      { type: 'heading', text: 'Comment demander sans tendre un piège' },
      { type: 'paragraph', text: "Garde-la petite, calme, et centrée sur toi — pas un procès à son sujet. Quelque chose comme : « J'aime ce que c'est, et j'ai remarqué que je suis confus sur où ça va. Je préfère juste demander que deviner : comment vois-tu ce qu'on est ? » Aucune accusation contre laquelle se défendre, aucun ultimatum contre lequel se rebeller. Juste une porte, ouverte une fois, en plein jour. Ensuite — et c'est là la discipline — laisse la réponse être la réponse. Y compris une réponse vague." },
      { type: 'paragraph', text: "Car voici le dernier décryptage de la semaine : une personne qui te veut répond à cette question avec soulagement. La clarté ne lui coûte rien — elle espérait que tu demandes. Une personne qui l'esquive, la contourne par l'humour, ou te fait sentir dramatique pour avoir demandé, a aussi répondu. « Je ne sais pas » EST une réponse. Le flou en réponse à une question directe et bienveillante, c'est le gris qui se choisit lui-même — et maintenant tu le sais enfin, ce qui veut dire que tu es libre." },
      { type: 'quote', text: "Tu as demandé de la clarté. Quoi qu'il soit revenu — même le brouillard — c'était la clarté.", attribution: 'Sur le dernier décryptage' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La divulgation relationnelle directe et à faible menace surpasse de manière fiable les tests de signaux indirects pour résoudre l'incertitude — et les réponses aux demandes de définition sont elles-mêmes hautement révélatrices de l'engagement." },
    ],
  },

  // ── Week 4 "What Feels Like Home" — days 1–7 (all new articles) ────────────
  w04_a1: {
    title: 'Pourquoi certaines personnes ressemblent à un foyer',
    subtitle: 'La physiologie de se détendre enfin auprès de quelqu\'un',
    blocks: [
      { type: 'paragraph', text: "Tu le sais dès que ça arrive, même si tu n'as jamais eu de mots pour ça : avec certaines personnes, quelque chose en toi baisse sa garde. Les épaules se détendent. La voix que tu utilises cesse d'être soignée. Tu dis la pensée à moitié formée au lieu de la version polie. Ce n'est pas un feu d'artifice — c'est l'inverse. C'est la sensation rare, presque physique, d'être enfin hors service." },
      { type: 'heading', text: 'Le foyer est un verdict du système nerveux' },
      { type: 'paragraph', text: "Ce sentiment n'est pas de la poésie ; c'est de la biologie. Ton système nerveux scanne en permanence chaque personne avec qui tu es pour une seule question — suis-je en sécurité ici ? — et avec la plupart des gens, la réponse reste « plus ou moins ». Ceux qui ressemblent à un foyer sont ceux avec qui le scan se termine et s'éteint tranquillement. Ce qu'il reste, une fois que la vigilance arrête de dépenser ton énergie, c'est la chaleur que tu appelais « confortable »." },
      { type: 'paragraph', text: "C'est pourquoi les personnes qui donnent ce sentiment de foyer sont plus rares que les personnes excitantes. L'excitation peut être produite par la nouveauté, la beauté, l'imprévisibilité — bon marché et partout. La sécurité, elle, ne peut être produite que par la constance dans le temps : se présenter de la même façon, tenir de petites promesses, rester gentil quand ce serait facile de ne pas l'être. Cette semaine consiste à apprendre à lire cette différence — parce que l'une de ces choses est une humeur, et l'autre un lieu où l'on peut vivre." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le sentiment de sécurité ressenti avec certaines personnes reflète une véritable corégulation : les systèmes nerveux se calibrent sur des partenaires fiables, ce qui abaisse la vigilance. « Ressembler à un foyer » est un état mesurable, pas une métaphore." },
    ],
  },
  w04_a2: {
    title: "Le genre d'amour discret dont personne ne parle",
    subtitle: 'Les meilleures relations se photographient terriblement mal',
    blocks: [
      { type: 'paragraph', text: "Les amours qui dominent les fils d'actualité sont les bruyantes — retrouvailles à l'aéroport, voyages surprises, paragraphes pour les anniversaires. Et elles sont adorables. Mais il existe toute une catégorie d'amour qui ne se retrouve jamais en ligne parce qu'elle ne produit pas de contenu : le thé préparé sans qu'on le demande, le silence confortable au lieu de tendu, la personne qui a remarqué que tu n'allais pas bien avant que tu ne dises un mot." },
      { type: 'paragraph', text: "Cet amour est invisible presque par définition. Il vit dans la prévention — les disputes qui n'ont jamais eu lieu parce que quelqu'un a choisi la douceur, les angoisses qui n'ont jamais dégénéré parce que quelqu'un était fiable. On ne peut pas photographier la tempête qui n'est pas venue. Alors les amoureux discrets font défiler les amours bruyantes et se demandent parfois s'ils ratent quelque chose. En général, c'est l'inverse." },
      { type: 'quote', text: "L'amour le plus bruyant demande à être vu. Le plus silencieux te garde juste au chaud.", attribution: 'Sur la dévotion non publiée' },
      { type: 'paragraph', text: "Rien de tout cela ne rend l'amour bruyant faux — la célébration est réelle aussi. Mais si tu mesures ce que tu as par rapport à ce que les gens publient, tu compares ton infrastructure aux feux d'artifice de quelqu'un d'autre. Une seule de ces deux choses tient un toit." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La recherche sur les relations montre systématiquement que la réactivité au quotidien — de petits actes fréquents d'attention et de soin — prédit la satisfaction et la longévité bien mieux que les grands gestes ou les démonstrations publiques." },
    ],
  },
  w04_a3: {
    title: "Sûr contre excitant : l'amour qu'on choisit contre l'amour dont on a besoin",
    subtitle: 'Le plus vieux tiraillement du cœur',
    blocks: [
      { type: 'paragraph', text: "Presque tout le monde, à un moment donné, se tient entre deux portes. Derrière l'une : la personne qui fait s'emballer ton pouls — imprévisible, magnétique, légèrement hors de portée. Derrière l'autre : la personne qui ralentit ton souffle — stable, présente, entièrement à ta portée. Et presque tout le monde est choqué de découvrir vers quelle porte ses pieds continuent de marcher." },
      { type: 'heading', text: "Pourquoi l'attraction et le bien sont des systèmes différents" },
      { type: 'paragraph', text: "L'attirance et l'attachement fonctionnent sur des circuits différents. Le pic — dopamine, nouveauté, poursuite — c'est le système du désir, et il est le plus bruyant précisément quand l'issue est incertaine. Le calme — ocytocine, confiance, familiarité — c'est le système du lien, et il ne grandit que là où la sécurité existe déjà. La blague cruelle, c'est que le système du désir crie et que le système du lien chuchote, alors la personne excitante ressemble toujours à la réponse, même quand elle ne l'est pas." },
      { type: 'paragraph', text: "Le geste mature n'est pas de choisir l'ennui plutôt que la passion — c'est un faux menu. C'est d'apprendre que les connexions les plus fortes ont les deux, dans le bon ordre : la sécurité comme fondation, l'étincelle comme ce qu'on construit par-dessus. Une étincelle par-dessus la sécurité, c'est une cheminée. Une étincelle sans sécurité, ce n'est qu'un feu." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le désir et l'attachement impliquent des systèmes motivationnels distincts — le désir mû par la nouveauté contre le lien mû par la sécurité. L'incertitude amplifie le premier et affame le second, ce qui explique pourquoi l'option « excitante » semble si souvent plus forte qu'elle n'est bonne." },
    ],
  },
  w04_a4: {
    title: "À quoi ressemble vraiment une relation calme",
    subtitle: "Un guide de terrain, pour ceux qui n'ont connu que la tempête",
    blocks: [
      { type: 'paragraph', text: "Si ton histoire a été orageuse, un amour calme est vraiment déstabilisant — tu n'as aucune référence pour ça. Voici donc le guide de terrain. Une relation calme, ça ressemble à : répondre honnêtement sans répéter d'abord. Ne pas être d'accord sans vérifier les sorties. Un téléphone qui peut rester face visible sur la table. Des projets qui restent tels quels. L'absence de cette angoisse sourde et ambiante que tu avais arrêté de remarquer parce qu'elle était toujours là." },
      { type: 'paragraph', text: "Ce que le calme n'est pas : plat. Une relation calme a quand même des fous rires incontrôlables, un vrai désir, des conversations difficiles, des mauvais jours. La différence, c'est le plancher. Dans un amour orageux, chaque conflit menace les fondations — tu te disputes à propos de la vaisselle et, d'une manière ou d'une autre, c'est la relation elle-même qui est en jeu. Dans un amour calme, les fondations ne sont jamais en jeu. Tu peux te permettre une honnêteté totale parce que l'honnêteté ne te coûtera pas tout." },
      { type: 'paragraph', text: "Les personnes élevées dans le chaos confondent souvent ce plancher avec un plafond — comme si la sécurité signifiait que rien d'intense ne peut se passer ici. C'est l'inverse. Le plancher, c'est ce qui rend l'intensité supportable. On ne peut vraiment aller en profondeur avec quelqu'un que lorsqu'on ne garde pas simultanément la porte." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les liens sécurisants fonctionnent comme une base : la sécurité perçue élargit l'honnêteté, l'exploration et la profondeur émotionnelle au lieu de les aplatir. Le calme est la condition qui permet l'intensité, pas son absence." },
    ],
  },
  w04_a5: {
    title: "La différence entre l'alchimie et la compatibilité",
    subtitle: "L'une te fait franchir la porte. L'autre décide si tu peux y vivre.",
    blocks: [
      { type: 'paragraph', text: "L'alchimie est instantanée et indéniable : la conversation qui ignore l'horloge, la gravité dans une pièce, la sensation d'être branché sur une prise. La compatibilité est plus lente et plus discrète : comment vous gérez tous les deux l'argent, le silence, le stress, sa mère, ta mauvaise semaine. L'alchimie se découvre en une nuit. La compatibilité se découvre en cent nuits ordinaires." },
      { type: 'heading', text: 'Où chacune se manifeste' },
      { type: 'orderedList', items: [
        { title: "L'alchimie vit dans les temps forts", text: "Les rendez-vous, les taquineries, l'attirance, l'attraction. Elle répond à : est-ce qu'on s'embrase ?" },
        { title: 'La compatibilité vit dans la logistique', text: "Le style de conflit, les valeurs, les rythmes, la réparation. Elle répond à : est-ce qu'on fonctionne ?" },
        { title: 'Le piège', text: "Une forte alchimie est prise pour toute la réponse — alors les gens continuent de retester l'allumage pendant que le moteur tombe en panne en silence." },
      ] },
      { type: 'paragraph', text: "Tu as besoin d'une vraie dose des deux ; ceci n'est pas un sermon contre le désir. Mais elles échouent différemment. L'absence d'alchimie ressemble à un bon colocataire. L'absence de compatibilité ressemble à une belle guerre. Et un seul de ces échecs peut parfois grandir — l'attirance peut s'approfondir là où vivent le respect et la sécurité, mais la compatibilité n'émerge presque jamais d'un pur feu." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La recherche longitudinale sur les relations est sans détour : la passion initiale prédit peu de choses sur les résultats à long terme, tandis que le style de conflit, les valeurs partagées et la réactivité au quotidien en prédisent beaucoup." },
    ],
  },
  w04_a6: {
    title: "Quand la paix semble ennuyeuse parce que tu es habitué au chaos",
    subtitle: 'Ton étalonnage, pas ta boussole',
    blocks: [
      { type: 'paragraph', text: "Voici l'un des dysfonctionnements les plus discrètement dévastateurs du cœur humain : si tu as grandi avec — ou as été formé par — un amour chaotique, ton corps a appris que l'amour RESSEMBLE à de l'adrénaline. Vigilance, désir, réparation, soulagement, et on recommence. Alors quand quelqu'un de stable arrive enfin, le système d'alarme ne trouve rien à faire… et signale ça comme « aucun sentiment ». La paix est classée comme ennui. La sécurité se lit comme l'absence d'amour, parce que l'amour n'a jamais été sûr avant." },
      { type: 'heading', text: 'Ennui ou inconnu ? Le test' },
      { type: 'paragraph', text: "Demande-toi ce qui manque exactement. Si c'est la personne elle-même — son esprit ne t'intéresse pas, son toucher ne fait rien, tu ne respectes pas qui elle est — c'est une véritable incompatibilité, et aucune guérison ne l'inventera. Mais si ce qui manque, c'est le PINCEMENT — l'anxiété, la poursuite, le ne-pas-savoir — alors rien ne manque à la relation. C'est quelque chose qui manque au schéma que ton système nerveux appelle amour. Ce sont des diagnostics profondément différents, avec des remèdes profondément différents." },
      { type: 'paragraph', text: "Donne au calme le temps de cesser de te sembler étranger. L'addiction à l'excitation s'estompe comme n'importe quel étalonnage, généralement en mois, pas en jours — et de l'autre côté, beaucoup de gens découvrent que la personne stable ne manquait pas de profondeur du tout. La profondeur était juste silencieuse, et ils n'avaient jamais été assez immobiles pour l'entendre." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les systèmes nerveux normalisent tout ce qu'ils répètent : les liens chaotiques entraînent l'excitation à signifier attachement, si bien que les partenaires sécurisants sont d'abord perçus comme plats. Cette mauvaise étiquette qui prend la sécurité pour de l'ennui est un effet de recalibrage documenté, et il est réversible." },
    ],
  },
  w04_a7: {
    title: 'Construire un foyer avec une personne',
    subtitle: 'Le foyer ne se trouve pas. Il se construit, chaque jour, à deux.',
    blocks: [
      { type: 'paragraph', text: "Le mythe de l'âme sœur dit que le foyer est une personne qu'on trouve — déjà construite, prête à emménager, quelque part là-dehors. La vérité est moins romantique et bien plus porteuse d'espoir : le foyer est quelque chose que deux personnes construisent, brique par brique sans éclat, à partir de promesses tenues, de ruptures réparées, et de mille petits choix de se tourner l'un vers l'autre plutôt que de s'en détourner." },
      { type: 'heading', text: 'Les matériaux de construction' },
      { type: 'paragraph', text: "Fiabilité : faire la petite chose promise, encore, jusqu'à ce que ta parole devienne porteuse. Réparation : revenir après la dispute — les couples qui durent ne sont pas ceux qui ne se rompent jamais, ce sont ceux qui reviennent toujours. Témoignage : connaître les journées, les noms, les craintes de l'autre ; être la personne qui porte le contexte d'une vie. Sanctuaire : être avec l'autre, de façon fiable, plus doux que le monde ne l'a été toute la journée. Aucune de ces choses n'est une étincelle. Toutes sont des murs." },
      { type: 'paragraph', text: "Ce recadrage change la question autour de laquelle cette semaine a tourné. Pas seulement « est-ce que cette personne ressemble à un foyer ? » mais « posons-nous tous les deux des briques ? » Car une personne qui ressemble à un foyer mais ne construit jamais est un beau camping. Et une personne qui construit avec toi, régulièrement, même sans feu d'artifice tous les soirs — ce n'est pas se contenter de moins. C'est de l'architecture." },
      { type: 'quote', text: "Les feux d'artifice illuminent le ciel pendant une minute. Les briques tiennent un toit toute une vie.", attribution: 'Sur la construction' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La recherche sur les liens à long terme converge vers les mêmes bâtisseurs : la fiabilité, la réparation après le conflit, et le fait de se tourner vers l'autre au quotidien. Le « foyer » durable est comportemental et cumulatif — construit, pas trouvé." },
    ],
  },

  // ── Week 5 "Situationships" — days 1–7 (all new articles) ──────────────────
  w05_a1: {
    title: 'Le décodeur des relations floues',
    subtitle: "Une relation en tout sauf le nom — ou en rien sauf l'espoir ?",
    blocks: [
      { type: 'paragraph', text: "Une relation floue, c'est ce qui se passe quand deux personnes agissent comme un couple sans avoir accepté d'en être un. Il y a de l'intimité, une routine, parfois des mois d'histoire commune — et un silence étrange et porteur autour du mot « nous ». La confusion n'est pas un défaut chez toi. C'est toute la conception : une chose non définie ne peut pas te décevoir comme une chose définie le peut, ce qui est exactement pourquoi certaines personnes préfèrent la laisser non définie." },
      { type: 'heading', text: 'Les deux types de non-défini' },
      { type: 'paragraph', text: "Il y a la relation floue qui est non définie parce qu'elle est TÔT — deux personnes qui découvrent encore vraiment, qui avancent vers quelque chose, sans y être encore. Et il y a la relation floue qui est non définie parce que rester non définie est le but — une ou les deux personnes obtenant les bénéfices d'une relation tout en évitant son risque. De l'intérieur, un mardi quelconque, elles peuvent sembler identiques. La différence ne se révèle qu'avec le temps, dans la direction." },
      { type: 'paragraph', text: "Alors cette semaine ne demande pas « sommes-nous officiels ? » Elle pose une meilleure question : dans quel sens cette chose BOUGE-t-elle ? Vers plus de définition, plus d'intégration, plus d'avenir — ou dans un cercle confortable qui ne mène jamais nulle part ? D'ici vendredi, tu seras capable de distinguer les deux, ce qui est précisément la seule chose qu'une relation floue est conçue pour t'empêcher de faire." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'ambiguïté elle-même abaisse le risque perçu et la responsabilité — c'est pourquoi le stade de la relation compte moins que sa trajectoire. La direction dans le temps est le signal fiable qu'un statut non défini est conçu pour masquer." },
    ],
  },
  w05_a2: {
    title: 'Les presque-relations et l\'art de ne pas nommer les choses',
    subtitle: 'Pourquoi le mot « nous » est si soigneusement évité',
    blocks: [
      { type: 'paragraph', text: "Nommer une chose la rend réelle. Ce n'est pas que de la poésie — c'est pourquoi certaines personnes déploient des efforts remarquables pour éviter de nommer. Une fois que tu appelles ça une relation, des attentes s'y attachent : l'exclusivité, l'effort, le droit d'être déçu. Certaines personnes évitent le mot non pas parce qu'elles sont incertaines de leurs sentiments, mais parce qu'elles sont très certaines de ne pas vouloir les obligations que le mot apporte." },
      { type: 'paragraph', text: "Observe comment le non-nommage est entretenu. Le virage subtil quand une conversation dérive vers « qu'est-ce qu'on est ». Les présentations qui restent vagues — « voici [prénom] », jamais un titre. La façon dont les projets existent mais seulement à court terme. Rien de tout cela n'est accidentel. Chaque virage est un petit acte pour garder la porte entrouverte, garder les options ouvertes, te garder présent mais sans promesse." },
      { type: 'quote', text: "Une chose qui refuse d'être nommée te dit souvent son nom en refusant.", attribution: 'Sur le non-nommage' },
      { type: 'paragraph', text: "Une clause d'équité : au début, certaines personnes évitent les étiquettes par véritable attention — elles ne veulent pas précipiter une bonne chose dans une case prématurée. Le signe, c'est si l'évitement se RÉSOUT. La prudence saine envers les étiquettes a un horizon ; elle s'apaise à mesure que la confiance se construit. Le non-nommage stratégique ne se résout jamais, parce que la résolution n'a jamais été le but." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Définir une relation active les normes d'engagement et la responsabilité. L'évitement persistant et actif de la définition — par opposition à une prudence précoce qui se résout — est un marqueur documenté d'une faible intention d'engagement." },
    ],
  },
  w05_a3: {
    title: 'Pourquoi « on voit juste où ça va » ne va généralement nulle part',
    subtitle: 'La phrase la plus confortable des rencontres modernes',
    blocks: [
      { type: 'paragraph', text: "« Voyons juste où ça va » sonne ouvert, détendu, sage même — pourquoi forcer les choses ? Mais écoute la grammaire. Ça met la relation à la voix passive, comme si c'était une météo qui pourrait vous arriver à tous les deux plutôt que quelque chose que deux personnes dirigent. Et les choses qu'on laisse « voir où elles vont » ont une forte tendance à aller exactement là où elles sont déjà." },
      { type: 'heading', text: "La dérive n'est pas une direction" },
      { type: 'paragraph', text: "Les relations qui s'approfondissent le font parce que quelqu'un choisit de les approfondir — fait le projet, a la conversation, prend le petit risque de vouloir à voix haute. « Voir où ça va » est souvent une façon polie de refuser de faire ces choix tout en profitant quand même des résultats. Ce n'est pas neutre. C'est une décision de ne-pas-décider, déguisée en nonchalance." },
      { type: 'paragraph', text: "Voici le test qui tranche : est-ce que ça a réellement mené quelque part ? Compare la chose aujourd'hui à la chose il y a trois mois. Plus définie, plus tissée dans la vraie vie de l'autre, plus d'avenir dans la conversation ? Alors ça va réellement quelque part. Exactement pareil, juste plus vieux ? Alors « voir où ça va » n'a jamais été un voyage — c'était une place de parking avec une belle vue." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'escalade d'une relation est portée par des comportements d'investissement délibérés, pas par le temps passif. Sans approfondissement actif, les connexions ont tendance à plafonner à leur niveau actuel — la « dérive » préserve de manière fiable le statu quo plutôt que de le faire avancer." },
    ],
  },
  w05_a4: {
    title: 'Le coût de rester non défini',
    subtitle: 'La facture du gris confortable arrive à échéance — en silence',
    blocks: [
      { type: 'paragraph', text: "Les relations floues semblent peu coûteuses parce que les plus grosses dépenses sont cachées. Il n'y a pas de rupture à survivre, pas de titre à défendre — alors ça semble comme si tu obtenais une connexion à prix réduit. Mais le vrai prix est facturé ailleurs, dans une monnaie dont tu ne remarques pas qu'elle quitte ton compte jusqu'à ce qu'une grande partie en soit partie : le temps, l'opportunité, et la confiance en soi." },
      { type: 'heading', text: 'Ce que tu paies réellement' },
      { type: 'orderedList', items: [
        { title: 'Le temps', text: "Des mois, parfois des années, de la meilleure énergie émotionnelle versée dans quelque chose structurellement incapable de grandir. Ce temps ne revient pas." },
        { title: "L'opportunité", text: "Les personnes que tu n'as pas rencontrées, que tu n'as pas laissées entrer, parce que tu étais émotionnellement occupé par un presque. La disponibilité dépensée n'est pas une disponibilité économisée." },
        { title: 'La confiance en soi', text: "L'érosion lente de connaître ta propre valeur, parce que tu continuais d'accepter moins que ce que tu voulais et de l'appeler cool. C'est celle-là qui coûte le plus cher à reconstruire." },
      ] },
      { type: 'paragraph', text: "La chose non définie se présente comme de la liberté — sans attaches, sans pression. Mais regarde de près et c'est souvent l'arrangement le moins libre de tous : tu es attaché, tu es indisponible pour les autres, et tu n'obtiens aucune de la sécurité censée venir avec l'attachement. Ce n'est pas de la liberté. C'est payer le plein prix émotionnel pour un produit émotionnel partiel." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les relations ambiguës prolongées sont systématiquement liées à un moindre bien-être et à une détresse plus élevée qu'un engagement clair ou un célibat clair — l'incertitude elle-même, et le coût d'opportunité qu'elle cache, en sont le mécanisme." },
    ],
  },
  w05_a5: {
    title: 'Miettes : reconnaître le strict minimum',
    subtitle: 'Quand juste assez est calculé pour te garder là',
    blocks: [
      { type: 'paragraph', text: "Semer des miettes, c'est l'art de donner à quelqu'un juste assez pour rester, et jamais assez pour arriver. Un texto pile quand tu es sur le point d'abandonner. Une bouffée de chaleur qui remet le compteur à zéro. Assez de contact pour garder l'espoir vivant, calibré — consciemment ou non — pour ne jamais franchir la ligne d'un véritable engagement. Si tu t'es déjà senti affamé à l'intérieur de quelque chose qui « existe » techniquement, tu as mangé des miettes." },
      { type: 'heading', text: 'Le motif de la miette' },
      { type: 'paragraph', text: "La signature, c'est le timing. Les miettes n'arrivent pas quand tu es heureux et en sécurité, mais précisément quand tu commences à t'éloigner. Le système a un capteur pour ta sortie, et il déploie juste assez de chaleur pour te ramener au même endroit affamé. Remarque : après la miette, est-ce que quelque chose change réellement ? Ou tu obtiens une bonne journée puis tu retombes directement dans la sécheresse ? Une vraie connexion te nourrit. Une opération de miettes te gère." },
      { type: 'paragraph', text: "La partie la plus cruelle, c'est ce que ça fait à ton étalonnage. Affame une personne assez longtemps et une miette ressemble à un festin — tu deviens reconnaissant pour des restes qui t'auraient insulté au début. Si tu célèbres une réponse à un texto comme si c'était une étape importante, prends du recul et demande-toi ce qu'était réellement cette étape. Le strict minimum ne devrait jamais ressembler à un cadeau." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le renforcement minimal intermittent — de petites récompenses chronométrées pour empêcher la sortie — produit un attachement fort et persistant tout en supprimant l'escalade. Le timing de la miette autour de ton retrait est son empreinte diagnostique." },
    ],
  },
  w05_a6: {
    title: 'Quand tu es un bouche-trou et que tu ne le sais pas',
    subtitle: 'Le rôle pour lequel tu as été choisi sans audition',
    blocks: [
      { type: 'paragraph', text: "Certaines relations floues ne sont pas non définies parce que quelqu'un a peur ou est lent. Elles sont non définies parce que tu occupes une place — tenant compagnie à quelqu'un, répondant à ses besoins, comblant le vide — jusqu'à ce que la personne qu'il attend réellement arrive, ou jusqu'à ce que quelque chose de « mieux » arrive. La partie difficile, c'est que les bouche-trous sont souvent traités chaleureusement. La chaleur est ce qui garde le bouche-trou en place." },
      { type: 'heading', text: 'Les signes que tu occupes une place' },
      { type: 'paragraph', text: "Tu existes dans sa vie privée mais pas dans sa vie publique — pas d'amis, pas de famille, pas de publications, pas de futur dans les phrases. Les projets sont toujours à court terme ; tout ce qui dépasse quelques semaines devient vague. Il y a un ex jamais vraiment clos, ou un « un jour, quand les choses seront différentes ». Et quand tu pousses vers plus, la réponse n'est jamais non — c'est « pas encore », un pas-encore sans aucune condition qui pourrait un jour le transformer en oui. On ne te rejette pas. On te réserve." },
      { type: 'paragraph', text: "C'est douloureux précisément parce que les sentiments peuvent être réels de son côté — les bouche-trous reçoivent souvent une affection sincère. Mais l'affection n'est pas la question. La question est de savoir si tu es la destination ou la salle d'attente. Et une salle d'attente, aussi confortable soit-elle, est un endroit que les gens ont l'intention de quitter." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Être gardé comme une « solution de secours » à faible investissement pendant qu'un partenaire conserve des options de plus grande valeur est documenté dans la recherche sur les alternatives relationnelles. L'exclusion publique combinée à un « pas encore » perpétuel en est la signature comportementale." },
    ],
  },
  w05_a7: {
    title: 'Comment définir la chose sans y mettre fin',
    subtitle: 'La conversation que tu évites est celle qui te libère',
    blocks: [
      { type: 'paragraph', text: "La grande peur qui maintient les relations floues en vie : si je demande ce qu'est cette chose, je vais tout gâcher. Alors tu ne demandes pas, et le fait de ne pas demander devient sa propre ruine lente. Voici le recadrage — la conversation qui définit la relation ne met pas fin aux bonnes choses. Elle met fin aux choses INCERTAINES, ce qui est une grâce dans les deux cas : soit tu gagnes une vraie relation, soit tu arrêtes de te déverser dans un mirage." },
      { type: 'heading', text: "Comment l'avoir proprement" },
      { type: 'paragraph', text: "Pas d'ultimatum, pas d'embuscade, pas de texto de trois pages. Choisis un moment calme et parle de ton propre point de vue : « J'ai vraiment aimé ça, et j'ai réalisé que je veux quelque chose avec un peu plus de clarté. Je n'essaie pas de te piéger — je veux juste savoir si on va vers la même chose. » Puis garde le silence et laisse-le répondre. Les mots exacts comptent moins que la discipline qui suit : tu dois vraiment ÉCOUTER la réponse, y compris celles que tu ne veux pas." },
      { type: 'paragraph', text: "Parce que chaque réponse est un cadeau d'information. Le soulagement et un oui — magnifique, tu construisais quelque chose de réel. La panique, l'esquive, « pourquoi faut-il étiqueter ça » — c'est une réponse aussi, juste plus discrète. Et un « pas encore » sans conditions est la réponse la plus claire de toutes. Tu n'as rien gâché en demandant. Tu as juste découvert ce dans quoi tu étais réellement — ce qui est le seul sol assez solide pour s'y tenir." },
      { type: 'quote', text: "La conversation ne tue pas les choses réelles. Elle ne tue que celles qui n'ont jamais été vivantes.", attribution: 'Sur le fait de définir la chose' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les conversations de définition directe résolvent l'incertitude bien plus efficacement que la lecture continue des signaux, et la réponse à une demande de clarté calme et non coercitive est elle-même l'un des indicateurs d'engagement les plus fiables qui soient." },
    ],
  },

  // ── Week 6 "Your Worth in Love" — days 1–7 (all new articles) ──────────────
  w06_a1: {
    title: "Connaître sa valeur quand on désire quelqu'un malgré tout",
    subtitle: "L'estime de soi est facile en théorie et difficile à 2h du matin",
    blocks: [
      { type: 'paragraph', text: "Tout le monde est d'accord : tu devrais connaître ta valeur. Ça tient sur une tasse. Le problème, c'est que l'estime de soi ne se teste pas quand tu es calme, célibataire, et en train de lire des affirmations positives — elle se teste à 2h du matin, quand quelqu'un qui te traite avec négligence te répond enfin, et que tous les principes que tu tenais s'évaporent dans la bouffée chaleureuse de son attention. Une valeur que tu ne peux ressentir que quand c'est facile n'est pas une valeur. C'est une humeur." },
      { type: 'heading', text: 'La valeur est ce qui survit au désir' },
      { type: 'paragraph', text: "La véritable estime de soi n'est pas l'absence de désir. Tu peux souffrir pour quelqu'un et garder quand même tes exigences — c'est en réalité le seul endroit où les exigences ont un sens. La question de cette semaine n'est pas « connais-tu ta valeur ? » C'est la plus difficile : ta valeur tient-elle QUAND tu le désires ? Ou le désir réécrit-il discrètement les règles à chaque fois ?" },
      { type: 'paragraph', text: "Cette semaine ne consiste pas à prétendre n'avoir besoin de personne. Il s'agit de remarquer le moment exact où le désir commence à négocier ta valeur à la baisse — où « je mérite de la constance » devient « bon, il est juste mauvais pour répondre aux textos », où une limite devient une suggestion devient un souvenir. Ce moment est repérable. Et une fois que tu peux le voir, tu peux arrêter d'en être surpris." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les chercheurs en estime de soi distinguent l'estime de soi stable de l'estime de soi conditionnelle — cette dernière monte et descend avec l'approbation des autres. Des exigences qui s'effondrent sous le désir sont le signe que la valeur est puisée à l'extérieur, ce qui est à la fois courant et modifiable." },
    ],
  },
  w06_a2: {
    title: "Les exigences que tu abandonnes quand quelqu'un te plaît",
    subtitle: 'La renégociation discrète que personne ne se voit faire',
    blocks: [
      { type: 'paragraph', text: "Demande à n'importe qui ses exigences et il te les listera clairement : honnêteté, constance, effort, respect. Regarde cette même personne tomber amoureuse de quelqu'un qui n'a rien de tout ça, et la liste accomplit un discret tour de magie. Elle ne disparaît pas — ce serait trop évident. Elle se plie. Chaque exigence obtient une exception personnalisée, taillée précisément pour la personne qui n'y répond pas." },
      { type: 'heading', text: 'À quoi ressemble le pliage' },
      { type: 'paragraph', text: "« J'ai besoin de quelqu'un émotionnellement disponible » devient « il est juste sur ses gardes à cause de son passé ». « Je ne serai le secret de personne » devient « il est discret, ce n'est pas personnel ». « J'ai besoin de constance » devient « il traverse beaucoup de choses en ce moment ». Chacune de ces phrases PEUT être vraie. C'est ce qui fait fonctionner le tour — les exceptions sont toujours plausibles. Mais empile-les et un schéma émerge : les exigences ne se plient pas pour tout le monde. Elles se plient pour les personnes que tu désires, en proportion exacte de combien tu les désires." },
      { type: 'quote', text: "Une exigence qui a une exception pour chaque personne que tu désires n'a jamais été une exigence. C'était un souhait.", attribution: 'Sur le pliage' },
      { type: 'paragraph', text: "La solution n'est pas de devenir rigide ou froid. C'est de surprendre la renégociation en temps réel — de remarquer la phrase exacte où tu commences à défendre l'échec de quelqu'un à atteindre une barre que tu as fixée pour de bonnes raisons. Tu as le droit de garder une exigence ET d'avoir de la compassion pour les raisons pour lesquelles quelqu'un n'y arrive pas. La compassion pour lui ne nécessite pas de l'abandonner pour toi." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le raisonnement motivé est bien documenté : nous générons des justifications plausibles pour ce que nous voulons déjà. Les exigences s'érodent non pas par une décision mais par une série d'exceptions qui semblent chacune raisonnable." },
    ],
  },
  w06_a3: {
    title: 'Pourquoi tu donnes trop aux gens qui donnent trop peu',
    subtitle: "Le calcul qui ne s'équilibre jamais, et pourquoi tu continues",
    blocks: [
      { type: 'paragraph', text: "Il existe un schéma précis et épuisant : moins quelqu'un te donne, plus tu lui donnes. Tu sur-expliques, tu sur-accommodes, tu sur-fonctionnes — versant de l'effort exactement dans les personnes qui t'en rendent le moins. Ça ressemble à de la générosité. C'est souvent autre chose portant les habits de la générosité : une tentative de gagner un amour qui t'est refusé." },
      { type: 'heading', text: 'La rétention crée la poursuite' },
      { type: 'paragraph', text: "Quand quelqu'un donne librement, tu te détends — il n'y a rien à gagner, alors tu arrêtes de jouer un rôle. Quand quelqu'un donne avec parcimonie, un circuit différent s'active : sa rareté se lit comme une énigme que tu peux résoudre avec assez d'effort. Si je donne juste PLUS — plus de compréhension, plus de patience, plus de moi-même — sûrement qu'il finira par rendre. Alors tu augmentes ton investissement en réponse à la diminution du sien, ce qui est exactement à l'envers, et exactement ce qui maintient le déséquilibre en vie." },
      { type: 'paragraph', text: "Remarque le signe : ton effort a tendance à augmenter juste après qu'il se retire, pas après qu'il se présente. Le don sain répond à la présence — tu verses dans les gens qui versent en toi. Le don compensatoire excessif répond à l'absence — tu verses le plus fort dans le vide, espérant le combler. Le premier construit des relations. Le second construit du ressentiment avec un sourire dessus." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Un effort qui augmente en réponse au retrait d'un partenaire reflète un investissement compensatoire — tenter de restaurer un lien par une sur-fonction unilatérale. Cela approfondit de manière fiable le déséquilibre au lieu de le corriger." },
    ],
  },
  w06_a4: {
    title: "Générosité anxieuse : l'amour comme monnaie d'échange",
    subtitle: "Quand donner, c'est en réalité demander",
    blocks: [
      { type: 'paragraph', text: "Certaine générosité est pure — tu donnes parce que donner est une joie, sans facture jointe. Et certaine générosité est anxieuse — tu donnes comme un acompte sur la sécurité, une façon d'acheter l'assurance que tu ne seras pas abandonné. De l'extérieur, elles se ressemblent. De l'intérieur, une seule des deux te laisse compter les points." },
      { type: 'heading', text: 'Le test du reçu' },
      { type: 'paragraph', text: "Voici comment savoir laquelle tu pratiques. Après avoir donné, te sens-tu plus léger — ou te sens-tu créancier ? Le don pur se termine quand le cadeau arrive à destination ; il ne laisse pas de résidu. Le don anxieux laisse un reçu dans ta main : une attente discrète de retour, une petite flambée de ressentiment quand le retour ne vient pas, un décompte permanent de tout ce que tu as fait que l'autre n'a pas égalé. Si ta générosité génère un grand livre de comptes, ce n'était jamais entièrement un cadeau. C'était une transaction que tu espérais qu'il honorerait." },
      { type: 'paragraph', text: "Ce n'est pas un défaut de caractère — c'est généralement une stratégie de survie venant d'un endroit où l'amour semblait conditionnel, où être utile était ta façon de rester en sécurité. Mais le nommer compte, parce que la générosité anxieuse corrode discrètement les deux personnes. Elle accable l'autre d'une dette à laquelle il n'a jamais consenti, et elle t'apprend que l'amour doit s'acheter. La véritable sécurité, c'est la capacité de donner librement ET d'arrêter de donner à quelqu'un qui ne fait que prendre — sans que l'une ou l'autre de ces choses ne ressemble à une catastrophe." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le don motivé par l'anxiété d'attachement fonctionne comme une recherche de réassurance plutôt que comme de la générosité, et il est corrélé au ressentiment et à l'épuisement — le « cadeau » porte une demande tacite de sécurité en retour." },
    ],
  },
  w06_a5: {
    title: "La différence entre le compromis et l'abandon de soi",
    subtitle: "L'un construit une relation. L'autre dissout une personne.",
    blocks: [
      { type: 'paragraph', text: "Chaque relation exige un compromis — ce n'est pas en question. Le danger, c'est que « compromis » devienne le mot qu'on utilise pour quelque chose de bien plus coûteux : la lente disparition de toi-même pour garder l'autre à l'aise. Ça se ressemble. C'est le contraire. Et la ligne entre les deux est l'une des lignes les plus importantes que tu apprendras jamais à voir." },
      { type: 'heading', text: 'Où passe la ligne' },
      { type: 'orderedList', items: [
        { title: 'Le compromis', text: "Tu abandonnes une préférence. Tu voulais italien, tu manges des sushis. Tu voulais déménager, tu restes un an. Ça te coûte quelque chose que tu peux te permettre — une envie, pas un noyau." },
        { title: "L'abandon de soi", text: "Tu abandonnes un morceau de qui tu es. Tes valeurs, tes besoins, tes amitiés, ta voix, les choses qui font de toi TOI. Ça te coûte quelque chose que tu ne peux pas te permettre de perdre en restant entier." },
        { title: 'Le test', text: "Après coup, te sens-tu comme un partenaire qui s'est plié — ou une personne qui a un peu disparu ? Le compromis est supportable indéfiniment. L'abandon de soi a un bilan de morts, et le mort, c'est toi." },
      ] },
      { type: 'paragraph', text: "La partie insidieuse, c'est la progressivité. Personne ne s'abandonne en un seul acte dramatique. Ça arrive par incréments si petits que chacun semble raisonnable — un loisir abandonné, une opinion avalée, un ami vu moins souvent, un besoin qu'on cesse de mentionner. Puis un jour tu lèves les yeux et tu ne te retrouves plus dans ta propre vie. La prévention consiste à suivre la tendance, pas l'incrément : pas « est-ce que cette chose-là va ? » mais « dans quelle direction je me déplace depuis des mois ? »" },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La clarté du concept de soi décline de manière fiable sous l'effet d'un silence de soi chronique dans les relations, et cette érosion prédit la dépression et l'insatisfaction. L'abandon de soi est une perte de soi mesurable, pas un trait de personnalité." },
    ],
  },
  w06_a6: {
    title: "Désirer quelqu'un contre avoir besoin de son approbation",
    subtitle: "Deux sentiments qui se cachent l'un dans l'autre",
    blocks: [
      { type: 'paragraph', text: "Tu peux désirer une personne — sa compagnie, son esprit, sa présence dans ta vie. Et tu peux avoir besoin de son approbation — sa validation comme preuve que tu vas bien, que tu es aimable, que tu es suffisant. Ça ressemble au même désir pointé vers la même personne, mais c'est profondément différent, et distinguer les deux change tout dans ta façon d'aimer." },
      { type: 'heading', text: 'Comment sentir la différence' },
      { type: 'paragraph', text: "Désirer quelqu'un est expansif : sa présence s'ajoute à une vie qui était déjà la tienne et déjà bien. S'il partait, tu ferais ton deuil — et tu resterais une personne entière. Avoir besoin de l'approbation est conditionnel : son opinion de toi devient le thermostat de ton estime de toi-même. Un texto froid fait chuter tout ton humeur ; un texto chaleureux te restaure. Tu ne réponds plus à la relation. Tu réponds à un verdict sur toi-même que tu lui as remis le pouvoir de prononcer." },
      { type: 'paragraph', text: "Voici pourquoi ça compte autant : avoir besoin de l'approbation de quelqu'un lui remet discrètement les commandes. Chaque choix se plie pour préserver sa bonne opinion — tu te réduis, tu joues un rôle, tu es d'accord, tu donnes trop, tout ça pour protéger une source de validation que tu as décidé ne pas pouvoir générer toi-même. Le désir te garde souverain ; tu le choisis librement, depuis la plénitude. Avoir besoin de l'approbation fait de toi un suppliant dans ta propre relation. Le travail de cette semaine consiste à avancer, centimètre par centimètre, du second vers le premier." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'estime de soi conditionnée à l'extérieur — puiser ton bien-être dans l'approbation des autres — est liée à l'anxiété, à l'instabilité et à une autonomie diminuée. Distinguer le désir authentique de la dépendance à l'approbation est un levier documenté vers un attachement plus sain." },
    ],
  },
  w06_a7: {
    title: 'Comment le respect de soi change qui est attiré vers toi',
    subtitle: 'Les exigences que tu maintiens remodèlent discrètement qui reste',
    blocks: [
      { type: 'paragraph', text: "Il existe un mécanisme discret que la plupart des gens ne remarquent jamais : la façon dont tu te traites toi-même fixe les termes de la façon dont les autres sont autorisés à te traiter — et avec le temps, ça filtre QUI reste dans les parages. Pas par une énergie mystique, mais par quelque chose de bien plus concret. Tes limites sont un mécanisme de tri, et elles trient toujours, que tu y fasses attention ou non." },
      { type: 'heading', text: 'Le tri, rendu visible' },
      { type: 'paragraph', text: "Quand tu tiens le respect de toi-même — tu nommes tes besoins, tu ne cours pas après, tu quittes ce qui est en dessous de toi — deux choses se produisent en même temps. Les gens qui voulaient un accès à quelqu'un aux limites faibles perdent intérêt et s'éloignent ; il n'y a plus de travail gratuit, plus d'approvisionnement unilatéral à extraire. Et les gens capables d'un amour mutuel et respectueux te trouvent bien plus attirant, parce que le respect de soi se lit chez une personne saine comme de la sécurité et de la substance. Tu ne deviens pas une personne différente. Tu deviens lisible — et des personnes différentes répondent." },
      { type: 'paragraph', text: "Ceci recadre la peur qui maintient tant d'exigences basses : « si je demande plus, je finirai seul ». La vérité est presque l'inverse. Se rabaisser ne gagne pas l'amour ; ça gagne le genre de personnes qui cherchent quelqu'un de rabaissé. Élever tes exigences ne te coûte pas l'amour ; ça te coûte les gens qui n'allaient jamais bien t'aimer — et ça dégage le passage pour ceux qui le pourraient. Le respect de soi n'est pas un mur qui tient les gens à l'écart. C'est un filtre qui laisse entrer les bons." },
      { type: 'quote', text: "Tu ne perds pas des gens en te respectant toi-même. Tu perds ceux qui avaient besoin que tu ne le fasses pas.", attribution: 'Sur le filtre' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Les limites fonctionnent comme une pression de sélection : le respect de soi constant dissuade les dynamiques extractives et signale la sécurité aux partenaires bien assortis. Qui reste autour de toi évolue de manière prévisible à mesure que tes exigences se stabilisent." },
    ],
  },

  // ── Week 7 "Hidden Feelings" — days 1–7 (all new articles) ─────────────────
  w07_a1: {
    title: 'Quand quelqu\'un cache ses sentiments pour toi',
    subtitle: 'La dissimulation fuit — si tu sais où regarder',
    blocks: [
      { type: 'paragraph', text: "Les sentiments cachés sont rarement bien cachés. Les gens peuvent contrôler les grands signaux — ils ne se confesseront pas, ne flirteront pas ouvertement, ne feront pas le premier pas — mais les petits, involontaires, fuient constamment. L'attirance représente beaucoup de pression à retenir sous l'eau, et elle s'échappe par des fissures que la personne ne sait même pas exister." },
      { type: 'heading', text: 'Où se produisent les fuites' },
      { type: 'paragraph', text: "Dans l'attention : ils te suivent des yeux dans une pièce, savent des choses sur toi dont tu ne te souviens pas leur avoir dites, refont surface avec de vieux détails des mois plus tard. Dans la friction : ils deviennent étrangement troublés, trop formels, ou étrangement contrariants autour de toi — des sentiments qui ne peuvent pas sortir en chaleur sortent souvent en électricité statique. Dans le schéma : ils sont différents avec TOI qu'avec tout le monde, et cette différence est le signal, pas un moment isolé." },
      { type: 'paragraph', text: "Cette semaine consiste à lire ces fuites sans t'y noyer — parce que la même preuve peut pointer dans deux directions. Un vrai sentiment dissimulé laisse une trace cohérente dans le temps. Une lecture pleine d'espoir trouve une trace dans un seul après-midi chaleureux et bâtit une cathédrale dessus. La différence est tout le jeu, et d'ici le septième jour tu sauras laquelle tu tiens." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'attirance produit une attention et des signaux comportementaux involontaires difficiles à supprimer totalement. Le signal fiable est la cohérence à travers les situations — un schéma dans le temps — pas un seul moment ambigu." },
    ],
  },
  w07_a2: {
    title: "L'ami qui est devenu silencieux pour une raison",
    subtitle: "Parfois la distance est l'aveu le plus bruyant",
    blocks: [
      { type: 'paragraph', text: "Il existe un genre spécifique de silence qui signifie l'exact opposé de ne pas se soucier. Un ami qui était facile et constant devient soudainement prudent — des réponses plus courtes, il se tient en retrait, semble gérer quelque chose autour de toi. Il est tentant de lire ça comme un refroidissement. Parfois c'est exactement l'inverse : il est devenu silencieux parce que les sentiments sont devenus trop grands pour rester décontractés." },
      { type: 'heading', text: 'Pourquoi la proximité les fait se retirer' },
      { type: 'paragraph', text: "Quand un ami développe des sentiments, l'amitié cesse d'être simple pour lui. Chaque moment passé ensemble devient une petite performance de ne-pas-montrer. C'est épuisant, et certaines personnes gèrent ça en se retirant — créant de la distance non pas parce qu'ils ressentent moins, mais parce qu'être proche tout en cachant autant devient insupportable. Le retrait est une soupape de pression, pas un verdict." },
      { type: 'paragraph', text: "Le signe qui distingue ça d'une dérive ordinaire : l'ami silencieux refait quand même surface. Il se retire mais ne disparaît pas ; il devient maladroit mais pas froid ; il y a une charge à la distance, pas la platitude de quelqu'un qui est réellement passé à autre chose. La vraie dérive est fluide et indifférente. Le retrait porté par des sentiments est en dents de scie — plein de quasi-rapprochements et de retraits rapides, comme quelqu'un debout devant une porte qu'il n'arrive pas à décider d'ouvrir." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Gérer une attirance dissimulée dans une amitié existante est cognitivement épuisant, et le retrait est une réponse d'adaptation documentée. La qualité en dents de scie, toujours attachée, de la distance la distingue d'un véritable désengagement." },
    ],
  },
  w07_a3: {
    title: "Pourquoi les gens enterrent l'attirance sous les taquineries",
    subtitle: 'Le plus vieux déguisement du monde',
    blocks: [
      { type: 'paragraph', text: "La cour de récréation a enseigné une leçon que les gens ne désapprennent jamais tout à fait : quand tu aimes quelqu'un et que tu ne peux pas le dire, tu le taquines. Les adultes font une version plus sophistiquée — les taquineries constantes, la moquerie affectueuse, la personne qui ne rate jamais une occasion de te faire des misères. Les taquineries sont un déguisement que porte l'attirance quand la sincérité semble trop dangereuse." },
      { type: 'heading', text: 'Comment fonctionne le déguisement' },
      { type: 'paragraph', text: "La taquinerie est une intimité plausiblement niable. Elle permet à quelqu'un de te porter une attention énorme, de créer des blagues privées, et de générer une charge constante en tête-à-tête — tout en maintenant que ce n'est « que pour rigoler ». Si tu répondais avec chaleur, il pourrait se replier sur « je plaisantais seulement ». La taquinerie est une façon d'être proche de toi tout en gardant une sortie ouverte en permanence." },
      { type: 'paragraph', text: "Mais toutes les taquineries ne sont pas un béguin, et c'est là que les gens se trompent de lecture. La différence est la chaleur et la cible. La taquinerie affectueuse est chaleureuse en dessous, spécifiquement dirigée vers toi, et associée à une vraie attention — il te taquine ET se souvient de ta mauvaise semaine. La taquinerie méprisante est froide en dessous et souvent jouée pour les autres. L'une est du flirt masqué. L'autre est juste quelqu'un qui n'est pas gentil. Lis la température sous la blague, pas la blague." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La taquinerie ludique fonctionne fréquemment comme une affiliation et un flirt indirects — une façon à faible risque de signaler l'intérêt avec un déni intégré. La chaleur et la spécificité de la cible distinguent la taquinerie affectueuse de la simple hostilité." },
    ],
  },
  w07_a4: {
    title: "Les signes d'un béguin secret",
    subtitle: "Un guide de terrain de l'involontaire",
    blocks: [
      { type: 'paragraph', text: "Les gens gardent les signaux évidents et oublient les petits — et les petits sont plus honnêtes précisément parce qu'ils ne sont pas choisis. Voici le guide de terrain des signes involontaires, les choses qu'un béguin secret fait sans décider de les faire." },
      { type: 'heading', text: "L'ensemble involontaire" },
      { type: 'orderedList', items: [
        { title: 'Le balayage', text: "Ses yeux te trouvent quand tu entres, et te retrouvent quand tu ris de quelque chose. L'attention a une direction, et elle continue de pointer vers toi." },
        { title: 'La mémoire', text: "Il retient des choses que tu as à peine mentionnées — un groupe, une date, une inquiétude en passant. On se souvient sans effort de ce qui nous importe ; se rappeler avec effort de tes petits détails est un signe." },
        { title: 'La proximité', text: "Il finit toujours près de toi. En groupe, la géométrie se réarrange sans cesse pour qu'il soit dans ton orbite — généralement sans que ni l'un ni l'autre ne l'organise." },
        { title: 'La réaction', text: "Tu obtiens une réponse disproportionnée — un rire trop éclatant, une rougeur, une nervosité soudaine ou trop de formalité. Son système nerveux réagit à toi différemment qu'aux autres." },
      ] },
      { type: 'paragraph', text: "Un seul signe est du bruit. La force est dans l'accumulation : plusieurs de ces signes, dirigés systématiquement vers toi, sur des semaines. Un seul exemple ne prouve rien — n'importe qui peut se souvenir d'une chose ou s'asseoir près de toi une fois. Un schéma à travers les quatre canaux est beaucoup plus difficile à expliquer par la coïncidence, et beaucoup plus difficile à cacher pour la personne même quand elle essaie." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le biais attentionnel, la mémoire renforcée pour l'objet de l'attirance, la recherche de proximité, et la réactivité physiologique accrue sont tous des corrélats documentés de l'intérêt romantique. La convergence entre les indices est bien plus révélatrice qu'un seul d'entre eux." },
    ],
  },
  w07_a5: {
    title: "L'évitement comme langage de l'amour (le genre douloureux)",
    subtitle: 'Quand quelqu\'un gère ses sentiments en les fuyant',
    blocks: [
      { type: 'paragraph', text: "Pour certaines personnes, les sentiments forts ne produisent pas de rapprochement — ils produisent de l'évasion. Plus elles t'aiment, plus elles t'évitent, parce que la proximité elle-même est ce qui déclenche leur alarme. C'est l'un des schémas les plus cruels à subir, parce que leur comportement dit « va-t'en » alors que leur sentiment dit l'inverse, et tu te retrouves à porter une contradiction que tu n'as pas créée." },
      { type: 'heading', text: 'Pourquoi plus de sentiment signifie plus de distance' },
      { type: 'paragraph', text: "Pour quelqu'un au câblage évitant, l'intimité est réellement menaçante — elle a été, à un moment précoce, associée au fait d'être blessé ou englouti. Alors le système a appris une règle : quand ça devient réel, sors. Ça signifie que ses sentiments les plus forts déclenchent ses retraits les plus forts. La personne qu'il aime le plus est la personne qu'il fuit le plus fort, ce qui ressemble à un rejet et est en réalité son propre genre de dévotion débordée." },
      { type: 'paragraph', text: "Comprendre ça n'est pas la même chose que s'y inscrire. Le retrait évitant peut être un sentiment réel ET une mauvaise expérience sur laquelle construire une relation, parce que la distance est tout le but de sa stratégie — la proximité l'annule, donc le schéma se répète souvent sans fin. Lis-le clairement : cette personne peut réellement ressentir quelque chose. Que son sentiment puisse survivre à son propre besoin de le fuir est une question séparée, et ce n'est pas une question à laquelle tu peux répondre pour elle en l'aimant plus fort." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'attachement évitant produit une désactivation sous l'intimité : une proximité croissante déclenche un retrait croissant. Le retrait peut coexister avec une vraie attirance, ce qui est précisément ce qui rend ce schéma si douloureux et si persistant." },
    ],
  },
  w07_a6: {
    title: "Quand la peur du rejet ressemble à de l'indifférence",
    subtitle: 'Le masque qui coûte aux gens la chose qu\'ils désirent le plus',
    blocks: [
      { type: 'paragraph', text: "Voici une tragédie qui se joue constamment : quelqu'un t'aime tellement qu'il agit comme s'il ne t'aimait pas du tout. Terrifié par le rejet, il joue préventivement l'indifférence — froid, décontracté, imperturbable — comme une armure. La logique est désespérée mais humaine : si je ne montre jamais que je tiens à quelqu'un, je ne peux jamais être rejeté pour y tenir. L'armure fonctionne si bien qu'elle lui coûte souvent exactement ce qu'il voulait." },
      { type: 'heading', text: 'Comment repérer la peur portant un visage indifférent' },
      { type: 'paragraph', text: "La différence entre l'indifférence réelle et l'indifférence défensive est l'effort. Une personne réellement indifférente ne dépense aucune énergie sur toi — elle n'est pas froide, elle est juste absente. Une personne défensivement indifférente dépense une énergie énorme à AVOIR L'AIR indifférente, et cet effort fuit. Elle est soigneusement décontractée. Sa distance a une qualité gênée. Elle agit comme si de rien n'était d'une manière clairement pas rien — vérifiant ta réaction à sa non-réaction, présente exactement de la façon dont une personne absente ne le serait pas." },
      { type: 'paragraph', text: "L'autre signe est l'incohérence entre les canaux. Les mots et la posture disent « je m'en fiche », mais le comportement les trahit : il se présente quand même, trouve quand même des raisons d'être près de toi, se souvient quand même, réagit quand même. Quand l'indifférence déclarée de quelqu'un et son comportement réel se contredisent, le comportement est la vérité et l'indifférence est le costume. Le vrai désintérêt ne nécessite pas de performance." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La peur du rejet produit couramment une auto-présentation protectrice — un désintérêt feint comme défense préventive. La qualité laborieuse et consciente d'elle-même de « l'indifférence », et son décalage avec le comportement réel, révèlent le masque." },
    ],
  },
  w07_a7: {
    title: 'Lire la personne qui ne fera pas le premier pas',
    subtitle: "Le silence n'est pas toujours un non — mais il pourrait l'être",
    blocks: [
      { type: 'paragraph', text: "Après six jours à décoder des sentiments cachés, le chapitre final honnête : parfois aucun mouvement n'est fait parce qu'il n'y a aucun sentiment sur lequel agir — et toute la trace que tu as lue a été écrite par ton espoir, pas par son cœur. Ce n'est pas un échec de perception. C'est l'erreur la plus humaine qui soit : nous voyons le plus clairement ce que nous voulons le plus voir." },
      { type: 'heading', text: 'L\'unique question qui sépare le signal du souhait' },
      { type: 'paragraph', text: "Pose cette question : un observateur neutre, à qui l'on montrerait seulement les faits, arriverait-il à la même conclusion que moi ? Pas « est-ce que je sens une étincelle » — les sentiments ne sont pas la preuve de sentiments réciproques. Mais « y a-t-il un schéma cohérent, à travers les situations, qu'un inconnu remarquerait aussi ? » Si oui — si l'attention, la mémoire, la proximité, la réactivité pointent toutes dans le même sens sur des semaines — alors quelqu'un cache probablement quelque chose, et son absence de mouvement est de la peur, pas de l'absence. Si la réponse honnête est que tu enchaînes quelques moments chaleureux parmi beaucoup d'ordinaires, ça vaut aussi la peine de le savoir." },
      { type: 'paragraph', text: "Et voici la partie libératrice, quel que soit le résultat : tu n'as pas à rester dans le décodage pour toujours. Si le schéma est réel et que la seule chose qui manque est le courage — le sien ou le tien — un petit geste à faible enjeu peut mettre fin à des mois de suppositions. Si le schéma n'est pas réel, le voir clairement te libère de construire sur une fondation qui n'a jamais existé. Dans les deux cas, la sortie du labyrinthe est la même : arrête de lire dans le marc de café, et teste doucement l'eau réelle." },
      { type: 'quote', text: "Les sentiments ne sont pas la preuve de sentiments réciproques. Le schéma est la preuve — ou son absence l'est.", attribution: 'Sur la dernière lecture' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "La perception pleine d'espoir nous pousse à lire des résultats désirés dans des indices ambigus. Le test de l'observateur neutre — exigeant un schéma à travers les situations, pas une étincelle ressentie — est un correctif documenté à ce biais." },
    ],
  },

  // ── Week 8 "The Chase" — days 1–7 (all new articles) ───────────────────────
  w08_a1: {
    title: 'La psychologie de la poursuite',
    subtitle: 'Pourquoi la poursuite peut sembler meilleure que la personne',
    blocks: [
      { type: 'paragraph', text: "La poursuite a une logique plus vieille que les applications de rencontre : la poursuite génère un high spécifique et addictif que l'affection stable ne génère pas. Quand quelqu'un est juste hors de portée, tout ton système s'organise pour combler l'écart — concentré, vivant, un peu obsédé. Ça ressemble à de l'amour, et c'en est souvent en partie. Mais une partie de ce que tu ressens n'a rien à voir avec lui. Ça concerne l'écart." },
      { type: 'heading', text: "L'écart est la drogue" },
      { type: 'paragraph', text: "Le désir se nourrit de la distance. L'incertitude de ne pas tout à fait avoir quelqu'un maintient le système du désir qui carbure à plein volume, parce que ce système a évolué pour intensifier l'effort précisément quand une récompense est proche mais non sécurisée. Comble l'écart — obtiens la personne, sécurise l'affection — et la chimie même qui ressemblait à de la passion s'apaise. C'est pourquoi certaines personnes ressentent un désir sauvage pendant la poursuite et une étrange platitude au moment où elles ont gagné." },
      { type: 'paragraph', text: "Cette semaine est un miroir, pas un sermon. Elle ne demande pas qui poursuit qui dans l'abstrait — elle demande TON rôle. Es-tu celui qui poursuit ? Celui qui crée la distance que d'autres poursuivent ? Accro à la poursuite elle-même plus qu'à une personne en particulier ? Ou dans quelque chose de plus rare, où personne ne court ? Connaître ton schéma, c'est comment tu arrêtes de le répéter par accident." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le système du désir s'intensifie avec l'incertitude et la proximité d'une récompense non sécurisée, puis s'apaise lors de l'obtention. C'est pourquoi la poursuite peut sembler plus stimulante que la relation sécurisée — l'excitation concernait en partie l'écart, pas seulement la personne." },
    ],
  },
  w08_a2: {
    title: 'Pourquoi on désire ce qui nous fuit',
    subtitle: "Les indisponibles n'ont pas plus de valeur — ils le semblent seulement",
    blocks: [
      { type: 'paragraph', text: "C'est presque gênant à quel point ça fonctionne de manière fiable : la personne qui te désire clairement devient légèrement moins intéressante, et la personne qui te fait deviner devient magnétique. Ce n'est pas un défaut de goût chez toi. C'est un ensemble de biais prévisibles que l'esprit exécute, et les nommer leur enlève la plupart de leur pouvoir." },
      { type: 'heading', text: 'Trois raisons pour lesquelles la distance éblouit' },
      { type: 'orderedList', items: [
        { title: 'La rareté', text: "On attribue plus de valeur à ce qui est difficile à obtenir. La disponibilité se lit comme de l'abondance, et l'abondance se lit — à tort — comme une faible valeur. La personne indisponible emprunte du prestige purement au fait d'être indisponible." },
        { title: "L'écran de projection", text: "Quelqu'un qui se révèle peu devient une toile vierge sur laquelle tu peins ton idéal. Tu n'es pas amoureux de lui ; tu es amoureux de la version de lui que tu as pu inventer dans les vides." },
        { title: 'Le défi', text: "Gagner celui qui hésite promet une dose de validation que celui qui est partant ne peut pas offrir. Ça cesse d'être une question de connexion et devient une question de preuve." },
      ] },
      { type: 'paragraph', text: "Vois le schéma clairement et le sortilège s'affaiblit. La prochaine fois que la distance de quelqu'un le fait sembler précieux, pose la question dégonflante et clarifiante : est-ce que j'aime vraiment cette personne — son esprit, sa gentillesse, sa présence — ou est-ce que j'aime juste qu'elle soit difficile à attraper ? Les réponses sont différentes, et une seule vaut la peine d'être poursuivie." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le biais de rareté, la projection idéalisée sur des cibles ambiguës, et la recherche de validation gonflent tous l'attrait des personnes indisponibles. La valeur perçue vient de l'indisponibilité elle-même, pas de la personne." },
    ],
  },
  w08_a3: {
    title: 'Le poursuivant et le distant : une danse avec des pas',
    subtitle: 'Le schéma le plus courant dans les relations en difficulté',
    blocks: [
      { type: 'paragraph', text: "Observe assez de relations et une chorégraphie apparaît encore et encore : une personne poursuit — cherche la proximité, la réassurance, plus — et l'autre s'éloigne — se retire, a besoin d'espace, se tait. La partie déchirante, c'est que le mouvement de chacun déclenche celui de l'autre. Plus l'un poursuit, plus l'autre se retire ; plus l'un se retire, plus l'autre poursuit. C'est une boucle qui s'alimente elle-même." },
      { type: 'heading', text: 'Pourquoi la danse s\'enferme' },
      { type: 'paragraph', text: "La poursuite du poursuivant vient d'une vraie peur de l'abandon — la proximité l'apaise. Le retrait du distant vient d'une vraie peur d'être englouti — l'espace l'apaise. Alors les deux essaient de se sentir en sécurité, en utilisant des stratégies opposées, et chaque stratégie est le cauchemar de l'autre. La tentative du poursuivant se lit comme une pression pour le distant ; le retrait du distant se lit comme un abandon pour le poursuivant. Personne n'est un méchant. Tout le monde a peur." },
      { type: 'paragraph', text: "L'idée cruciale : les rôles ne sont pas des personnalités fixes — ce sont des positions dans un système, et la danse intensifie les deux. Une personne qui est sécurisée avec un partenaire peut devenir un poursuivant désespéré avec un distant extrême, et vice versa. Ce qui signifie que la sortie n'est pas de trouver son « vrai » rôle ; c'est de remarquer le pas que tu continues de faire et de choisir, juste une fois, d'arrêter de le faire — parce qu'une danse a besoin des deux danseurs pour continuer." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Le schéma de poursuite-retrait (ou demande-retrait) est l'une des dynamiques les plus solidement documentées dans la recherche sur les relations, et il s'auto-renforce : le comportement d'adaptation de chaque partenaire déclenche celui de l'autre. Les rôles sont des positions dans un système, pas des traits fixes." },
    ],
  },
  w08_a4: {
    title: 'Quand désirer devient gagner',
    subtitle: "Le moment où l'amour se transforme en compétition",
    blocks: [
      { type: 'paragraph', text: "Il y a une ligne que la poursuite peut silencieusement franchir, où elle cesse d'être une question de désirer quelqu'un et devient une question de le gagner. Le changement est subtil mais total. Désirer concerne l'autre — sa présence, sa chaleur, un avenir ensemble. Gagner te concerne toi — ta fierté, ta validation, la pensée insupportable de ne pas obtenir ce que tu t'étais fixé d'obtenir. Même poursuite en apparence ; moteur opposé en dessous." },
      { type: 'heading', text: 'Comment savoir dans laquelle tu te trouves' },
      { type: 'paragraph', text: "Le test, c'est ce qui se passe quand tu imagines réellement l'obtenir. Si le fantasme est plein de LUI — des journées ordinaires, une vraie proximité, qui il est — c'est désirer. Si le fantasme est surtout le moment de la victoire, le soulagement d'avoir gagné, le fait de prouver quelque chose à toi-même ou aux autres — et qu'il devient étrangement vide après ce moment — c'est gagner. Les fantasmes de victoire concernent toujours la ligne d'arrivée, parce que pour le compétiteur, la personne n'a jamais été le prix. Avoir raison l'était." },
      { type: 'paragraph', text: "Ça compte parce que la poursuite motivée par la victoire est un piège même quand elle réussit. Gagne quelqu'un que tu ne désirais pas vraiment, et tu tiens maintenant un prix qui a cessé de compter à l'instant où il a été sécurisé — c'est ainsi que les gens finissent par quitter des relations qu'ils se sont désespérément battus pour obtenir. La poursuite n'a jamais concerné la personne. Elle concernait le fait de ne pas perdre. Et on ne peut pas construire une vie sur une victoire." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Quand la poursuite est motivée par l'ego et la validation plutôt que par un désir sincère, l'obtention effondre la motivation — la « récompense » était de gagner, pas la relation. Cela prédit le schéma bien documenté de perte d'intérêt immédiatement après avoir sécurisé un partenaire durement gagné." },
    ],
  },
  w08_a5: {
    title: "L'excitation de l'indisponible",
    subtitle: "Pourquoi un amour sûr peut sembler ne pas être de l'amour du tout",
    blocks: [
      { type: 'paragraph', text: "Si tu n'as jamais ressenti d'attirance intense que pour des personnes indisponibles — les personnes prises, les distantes, celles qui ne peuvent pas être pleinement présentes — il y a un schéma qui vaut la peine d'être regardé honnêtement. Ce n'est pas que tu as mauvaise chance. C'est que l'indisponibilité est devenue une condition pour que ton désir s'allume, et les personnes disponibles te font, de façon déroutante, ne rien ressentir." },
      { type: 'heading', text: 'Pourquoi les indisponibles semblent sûrs à désirer' },
      { type: 'paragraph', text: "Voici la logique cachée : désirer quelqu'un qui ne peut pas t'avoir pleinement en retour est en réalité le genre de désir le plus SÛR. Tu obtiens toute l'intensité du désir sans le risque d'une véritable intimité, parce que la véritable intimité ne peut pas se produire — il est indisponible, donc tu es protégé d'être jamais vraiment vu, vraiment proche, vraiment exposé à être blessé de près. L'indisponibilité n'est pas un défaut de ton attirance. Pour une part de toi, c'est tout l'attrait." },
      { type: 'paragraph', text: "C'est pourquoi l'amour disponible peut sembler plat ou même étouffant pour quelqu'un avec ce schéma — l'absence de poursuite retire la chose même qui générait le sentiment, et la présence d'une vraie proximité déclenche la peur contre laquelle la poursuite protégeait. Si quelqu'un de stable te laisse froid, la question n'est pas « où est l'étincelle ? » C'est « suis-je seulement capable de me sentir en sécurité en désirant des gens qui ne peuvent pas s'approcher ? » C'est une question différente, avec une réponse bien plus porteuse d'espoir." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'attirance chronique pour des partenaires indisponibles fonctionne souvent comme un évitement de l'intimité : le désir sans exposition réelle. L'« excitation » est en partie la sécurité d'une connexion qui ne peut en réalité pas t'atteindre — c'est pourquoi la proximité disponible peut se lire comme plate ou menaçante." },
    ],
  },
  w08_a6: {
    title: 'Comment arrêter de poursuivre et commencer à attirer',
    subtitle: 'Le passage de la poursuite à la présence',
    blocks: [
      { type: 'paragraph', text: "Le conseil « arrête de poursuivre » est partout et presque inutile, parce qu'il est généralement présenté comme une tactique de manipulation — recule pour le faire te désirer, joue mieux au jeu. Ce n'est que de la poursuite déguisée, avec le même moteur anxieux. La véritable attirance vient de quelque chose que les tactiques ne peuvent pas simuler : avoir réellement une vie que tu n'es pas prêt à abandonner pour un peut-être." },
      { type: 'heading', text: "L'attirance est un sous-produit, pas une stratégie" },
      { type: 'paragraph', text: "La poursuite diffuse un message sous les mots : ton attention vaut plus que la mienne, alors je vais déverser la mienne sur toi et espérer. Ce n'est pas l'effort qui repousse — l'effort est beau quand il est mutuel — c'est le déséquilibre, l'abandon de soi, la volonté visible d'accepter moins. La présence diffuse l'inverse : je suis sincèrement intéressé ET ma vie est pleine et bonne sans toi, donc ceci est une invitation, pas une supplique. Ce n'est pas une astuce pour retenir la chaleur. C'est le résultat naturel d'avoir un centre de gravité qui n'est pas lui." },
      { type: 'paragraph', text: "Alors le vrai geste n'est pas « réponds plus lentement aux textos ». C'est « construis une vie si captivante qu'attendre près du téléphone cesse d'être une option que tu voudrais même ». Reverse l'énergie de la poursuite dans ton travail, tes amis, ton corps, les choses qui étaient à toi avant cette personne et qui seront à toi après. L'attirance suit la plénitude. Et l'effet secondaire magnifique : même si cette personne en particulier ne se retourne pas, tu te retrouves avec une vie au lieu d'une attente." },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "L'attirance répond à la valeur perçue et à l'autosuffisance, pas aux tactiques de rétention. Investir dans sa propre vie change de manière fiable la dynamique plus que n'importe quel « jeu » de retrait, parce que ça change le signal réel envoyé, pas seulement son timing." },
    ],
  },
  w08_a7: {
    title: 'Ce qui arrive quand tu arrêtes de courir après eux',
    subtitle: "La clarté qui n'arrive que lorsque tu restes immobile",
    blocks: [
      { type: 'paragraph', text: "Il y a une terreur spécifique à arrêter la poursuite : la peur que si tu arrêtes de courir vers lui, tu vas le perdre entièrement. Et parfois c'est ce qui arrivera. Mais ce n'est pas la perte que ça semble être — c'est la seule information la plus utile que toute la poursuite ait jamais pu te donner, arrivant au moment où tu arrêtes enfin de générer le mouvement toi-même." },
      { type: 'heading', text: "Le test de l'immobilité" },
      { type: 'paragraph', text: "Quand tu arrêtes de poursuivre, l'une de deux choses se produit, et les deux sont des cadeaux. Soit il se rapproche de toi — l'espace que tu as créé lui a permis d'avancer, et tu découvres qu'il y avait quelque chose de réel que ta poursuite étouffait en réalité. Soit il s'éloigne simplement — ce qui révèle que toute la connexion était alimentée par ton seul effort, une relation à une personne que tu prenais pour deux. Tu avais besoin de le savoir. Tu ne pouvais juste pas le voir tant que tu étais le moteur qui la faisait tourner." },
      { type: 'paragraph', text: "C'est la résolution tranquille de toute la semaine. La poursuite te maintient en mouvement précisément pour que tu n'aies jamais à découvrir ce qui est réel — tant que tu cours, tu peux croire que la connexion est mutuelle. Rester immobile, c'est comment tu lis enfin la vérité. Et quoi qu'elle te montre, tu gagnes : soit une chose réelle qui peut tenir seule, soit ta liberté d'un mirage que tu t'épuisais à maintenir. Les gens qui sont à toi n'ont pas besoin d'être poursuivis. Ils marchent vers toi quand tu arrêtes de courir." },
      { type: 'quote', text: "Arrête de courir, et tu découvriras vite qui marchait vraiment à tes côtés.", attribution: 'Sur le fait de rester immobile' },
      { type: 'callout', variant: 'info', title: "Pourquoi on peut l'affirmer", text: "Retirer sa propre poursuite est diagnostique : ça distingue un lien mutuel d'une illusion soutenue par l'effort. Ce que fait une relation quand tu arrêtes de l'alimenter seul est parmi les signaux disponibles les plus clairs pour savoir si elle a jamais été mutuelle." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // FULL ARTICLE — relatedModuleId: 'who_loves_me'
  // ───────────────────────────────────────────────────────────────────────────
  ten_signs_secret_love: {
    title: "10 signes que quelqu'un t'aime en secret",
    subtitle: 'Les indices discrets que presque personne ne voit',
    blocks: [
      {
        type: 'paragraph',
        text: "Certaines personnes annoncent leur amour. D'autres le laissent transparaître dans cent petits gestes délibérés — le texto qui arrive exactement quand tu en avais besoin, la façon dont elles se souviennent du café que tu as mentionné une fois, en passant, il y a des mois.",
      },
      {
        type: 'paragraph',
        text: "Les psychologues qui étudient l'attachement appellent cela des « appels à la connexion ». Ils sont faciles à manquer parce qu'ils ne ressemblent presque jamais à de grandes déclarations. Mais une fois que tu sais reconnaître le schéma, tu commences à remarquer qui, discrètement, te choisit depuis le début.",
      },
      { type: 'heading', text: 'Les signes qui ne mentent pas' },
      {
        type: 'paragraph',
        text: "Tu n'as pas besoin des dix. Trois ou quatre, qui reviennent régulièrement, racontent généralement toute l'histoire.",
      },
      {
        type: 'orderedList',
        items: [
          {
            title: "Ils se souviennent des petites choses que tu n'as mentionnées qu'une fois.",
            text: "Des détails anodins que tu avais oublié avoir partagés ressurgissent dans ce qu'ils font — le snack que tu aimes, la date que tu redoutais. La mémoire suit l'attention, et l'attention suit le sentiment.",
          },
          {
            title: "Ils défendent ton nom quand tu n'es pas dans la pièce.",
            text: "Protéger ta réputation quand il n'y a rien à y gagner est l'un des signes les plus purs qui soient. Ça leur coûte quelque chose, et ils le paient volontiers.",
          },
          {
            title: 'Ils inventent de petites raisons de rester près de toi.',
            text: "Une question qui aurait pu être un texto. Une course qui passe justement par chez toi. La raison n'est qu'un prétexte ; la proximité, elle, est le vrai but.",
          },
          {
            title: "Leur corps se tourne vers toi avant même qu'ils en décident.",
            text: "Les pieds, les épaules, le regard s'orientent vers ce à quoi le système nerveux tient déjà. Ça arrive un instant avant que la pensée consciente ne rattrape le geste.",
          },
          {
            title: 'Ils épousent ton rythme — tes mots, ton allure, ton humeur.',
            text: "L'imitation inconsciente du langage et de l'énergie, c'est le corps qui se synchronise avec quelqu'un auprès de qui il se sent en sécurité. On fait écho aux personnes qui nous attirent.",
          },
          {
            title: 'Ils protègent tes habitudes et ta tranquillité.',
            text: "Ils apprennent ce qui t'épuise et interviennent discrètement — ils règlent le petit problème avant même qu'il t'atteigne. L'attention ressemble souvent à de la logistique.",
          },
          {
            title: "Ils deviennent silencieux d'une façon particulière en ta présence.",
            text: "Pas distants — attentifs. Le trop-plein de paroles ou les pauses trop prudentes sont le son de quelqu'un qui se soucie soudain de l'image qu'il te renvoie.",
          },
          {
            title: 'Ils célèbrent tes victoires comme si elles étaient les leurs.',
            text: "L'envie est la réaction humaine par défaut face à la bonne nouvelle de quelqu'un d'autre. Une joie sincère et spontanée devant ta réussite en est l'exact opposé — et c'est rare.",
          },
          {
            title: 'Ils sont présents dans les moments sans éclat.',
            text: "N'importe qui vient à la fête. Ceux qui t'aiment sont là pour le déménagement, la mauvaise semaine, le service ennuyeux — les moments sans public.",
          },
          {
            title: 'Ils reposent la question, des jours plus tard.',
            text: "« Alors, ce rendez-vous, comment ça s'est passé ? » à propos d'un truc que tu as mentionné mardi dernier veut dire qu'ils ont gardé un fil de ta vie actif, discrètement, en arrière-plan.",
          },
        ],
      },
      { type: 'quote', text: "L'amour silencieux parle un langage plus fort que les mots." },
      {
        type: 'image',
        asset: 'ten-signs-hero',
        caption: 'Les appels à la connexion ressemblent rarement à des déclarations.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: "Pourquoi on peut l'affirmer",
        text: "Cette lecture s'appuie sur la théorie de l'attachement et la psychologie relationnelle — pas sur l'astrologie. Les schémas sont observables, reproductibles, et profondément humains.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // ÉDITORIAL BACKLOG — traduction des 8 articles courts.
  // ───────────────────────────────────────────────────────────────────────────
  energy_you_carry: {
    title: "L'énergie que tu apportes dans une pièce",
    subtitle: 'On te ressent avant que tu parles',
    blocks: [
      {
        type: 'paragraph',
        text: "Avant même de dire un mot, tu as déjà dit quelque chose. La posture, l'allure, la tenue des épaules, la direction du regard — les gens lisent tout ça en moins d'une seconde et s'y ajustent sans même s'en rendre compte.",
      },
      {
        type: 'paragraph',
        text: "On appelle ça de « l'énergie », mais c'est en réalité de la régulation : un système nerveux calme est contagieux, tout comme un système nerveux anxieux. La pièce a tendance à s'aligner sur celui qui est le plus certain de son propre état.",
      },
      { type: 'heading', text: 'Le choisir volontairement' },
      {
        type: 'paragraph',
        text: "Tu peux choisir le signal que tu envoies en premier. Une respiration lente avant d'entrer, une première phrase posée, une attention qui se pose entièrement sur une personne — de petits signaux qui disent à la pièce qu'elle peut se détendre.",
      },
      {
        type: 'callout',
        variant: 'info',
        title: "Pourquoi on peut l'affirmer",
        text: "La contagion émotionnelle et la synchronie non verbale sont bien documentées en psychologie sociale — ce n'est pas du mysticisme. Tu changes réellement les pièces dans lesquelles tu entres.",
      },
    ],
  },

  anxious_hearts_silence: {
    title: 'Pourquoi les cœurs anxieux lisent le silence comme un rejet',
    subtitle: "Un téléphone silencieux n'est pas un verdict",
    blocks: [
      {
        type: 'paragraph',
        text: "Pour un esprit à l'attachement anxieux, le silence est rarement neutre. Une réponse tardive devient une histoire — il s'éloigne, tu en as trop dit, c'est déjà fini — et cette histoire arrive toute faite, bien avant la moindre preuve.",
      },
      {
        type: 'paragraph',
        text: "Le système nerveux a appris tôt que la connexion pouvait disparaître sans prévenir, alors il traite l'absence comme une menace à résoudre immédiatement plutôt que comme un intervalle qui se refermera de lui-même.",
      },
      { type: 'heading', text: "Ralentis l'histoire" },
      {
        type: 'paragraph',
        text: "L'habileté ne consiste pas à arrêter de ressentir la pointe d'angoisse, mais à la nommer : « c'est mon alarme qui parle, pas les faits. » La plupart des silences concernent la disponibilité de l'autre, pas ta valeur.",
      },
      { type: 'quote', text: "L'histoire qu'écrit ta peur n'est pas la seule histoire possible." },
    ],
  },

  reading_auras_colors: {
    title: 'Lire les auras : ce que chaque couleur signifie vraiment',
    subtitle: 'Un vocabulaire pour les ambiances que tu perçois',
    blocks: [
      {
        type: 'paragraph',
        text: "Bien avant que « aura » ne devienne un mot de bien-être, les cultures utilisaient déjà la couleur pour décrire le tempérament — et les associations sont remarquablement constantes. Il s'agit moins d'une lueur littérale que d'un langage commun pour décrire l'énergie qu'une personne dégage.",
      },
      { type: 'heading', text: 'La palette de base' },
      {
        type: 'orderedList',
        items: [
          { title: "Rouge — l'élan.", text: 'Chaleur, appétit, action. Magnétique de près, épuisant en excès.' },
          { title: 'Or — la chaleur humaine.', text: 'Générosité et aisance ; la personne autour de qui une pièce se détend.' },
          { title: 'Bleu — le calme.', text: 'Stable, réfléchi, digne de confiance sous pression.' },
          { title: 'Violet — la profondeur.', text: 'Intuition et imagination ; vit un peu dans son monde intérieur.' },
          { title: 'Vert — le renouveau.', text: 'Équilibre et attention ; le stabilisateur discret.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: "Comment s'en servir",
        text: "Considère la couleur comme une piste, pas comme une étiquette. Demande-toi ce que la « couleur » d'une personne te dit sur ce dont elle a besoin en ce moment.",
      },
    ],
  },

  am_i_the_problem: {
    title: 'Est-ce moi, le problème ? Un miroir honnête',
    subtitle: 'La question la plus courageuse, posée avec douceur',
    blocks: [
      {
        type: 'paragraph',
        text: "C'est la question avec laquelle presque personne ne veut s'asseoir — et le simple fait de la poser est généralement le signe que tu n'es pas, en réalité, tout le problème. Les personnes qui font le plus de mal se demandent rarement si c'est le cas.",
      },
      {
        type: 'paragraph',
        text: "Pourtant, un miroir honnête est utile. Les schémas qui se répètent avec des personnes très différentes ont souvent un point commun : toi. Pas comme une accusation — comme une information.",
      },
      { type: 'heading', text: 'Cherche le schéma, pas le verdict' },
      {
        type: 'paragraph',
        text: "Repère le moment où les choses ont tendance à basculer — quand tu deviens froid, quand tu insistes, quand tu disparais. Nommer ton geste, c'est le premier pas vers le choix d'un autre.",
      },
      { type: 'quote', text: "La responsabilité sans la honte n'est que de la clarté sur ce que tu peux changer." },
    ],
  },

  quiet_tells_jealousy: {
    title: 'Les signes discrets de la jalousie',
    subtitle: "Elle s'annonce rarement",
    blocks: [
      {
        type: 'paragraph',
        text: "La jalousie ne ressemble presque jamais à de la jalousie. Elle se cache dans un « c'est sympa » un peu plat, une blague avec un peu trop de mordant, une froideur soudaine après ta bonne nouvelle, cet ami qui se met à rivaliser là où il n'y avait aucune compétition.",
      },
      {
        type: 'paragraph',
        text: "En dessous, ce n'est généralement pas de la malveillance mais de la peur — la peur que ton ascension réduise leur place à tes côtés. Le signe, c'est le décalage entre les mots et la température.",
      },
      { type: 'heading', text: "Qu'en faire" },
      {
        type: 'paragraph',
        text: "Tu n'as pas à t'éteindre pour gérer l'envie de quelqu'un d'autre. Mais la repérer tôt te dit qui peut accueillir tes victoires — et qui ne peut accueillir que tes difficultés.",
      },
    ],
  },

  someone_pulling_away: {
    title: "Comment savoir quand quelqu'un s'éloigne",
    subtitle: 'La distance laisse des empreintes',
    blocks: [
      {
        type: 'paragraph',
        text: "Le repli est généralement discret avant de devenir évident. Les textos deviennent plus courts et plus lents. Les projets se transforment en « bientôt ». Les conversations restent en surface, et les silences autrefois faciles commencent à demander un effort.",
      },
      { type: 'heading', text: "Les signaux, dans l'ordre" },
      {
        type: 'orderedList',
        items: [
          { title: 'La latence.', text: 'Les réponses arrivent plus tard, et contiennent moins de choses.' },
          { title: 'Le flou.', text: 'Les projets précis se dissolvent en formules du genre « un jour ».' },
          { title: 'La surface seulement.', text: 'Ils arrêtent de te partager ce qui compte vraiment.' },
          { title: 'La logistique plutôt que la chaleur.', text: 'Le contact devient fonctionnel, non plus affectueux.' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Avant de paniquer',
        text: "La distance peut signifier du stress, pas un rejet. Demande directement et avec bienveillance — tu mérites une réponse claire, pas un jeu de devinettes.",
      },
    ],
  },

  increase_your_aura: {
    title: 'Comment augmenter ton aura',
    subtitle: 'La présence est une pratique, pas un don',
    blocks: [
      {
        type: 'paragraph',
        text: "« Aura » est un raccourci pour désigner la présence — à quel point tu occupes pleinement ton propre espace. Ce n'est pas un charisme avec lequel on naît ; c'est un ensemble d'habitudes que tout le monde peut construire.",
      },
      { type: 'heading', text: "Quatre habitudes qui s'accumulent" },
      {
        type: 'orderedList',
        items: [
          { title: 'Ralentis.', text: 'Un mouvement sans précipitation se lit comme de la maîtrise de soi.' },
          { title: "Écoute jusqu'au bout.", text: 'Une attention totale est assez rare pour ressembler à du magnétisme.' },
          { title: 'Prends soin de ton état.', text: "Sommeil, lumière, mouvement — ta base, c'est ton aura." },
          { title: 'Tiens parole.', text: "L'intégrité est le signal le plus discret et le plus puissant qui soit." },
        ],
      },
      { type: 'quote', text: "Tu ne projettes pas une énergie que tu n'as pas. Remplis d'abord la coupe." },
    ],
  },

  who_secretly_resents_you: {
    title: "Qui t'en veut secrètement — et pourquoi",
    subtitle: 'La friction que personne ne nomme à voix haute',
    blocks: [
      {
        type: 'paragraph',
        text: "Le ressentiment est l'émotion que les gens travaillent le plus dur à cacher, parce que l'admettre donne une impression de petitesse. Alors il fuit de travers — à travers des compliments à double tranchant, un enthousiasme retenu, une générosité qui semble toujours accompagnée d'un décompte silencieux.",
      },
      {
        type: 'paragraph',
        text: "Il pousse généralement sur l'un de ces deux terrains : un service jamais rendu en retour, ou une comparaison que quelqu'un continue de perdre dans sa propre tête.",
      },
      { type: 'heading', text: 'Le repérer sans paranoïa' },
      {
        type: 'paragraph',
        text: "Cherche la répétition, pas les moments isolés. Une mauvaise journée, c'est du bruit ; une froideur constante autour de sujets précis, c'est un signal — qui mérite une conversation douce et directe.",
      },
    ],
  },
};
