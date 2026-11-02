---
title: "Ce que le Brésil m’a appris"
description: "Un audit, une fusion, un framework trop malin : la compréhension partagée compte plus que la brillance technique."
date: 2026-11-02
tags: ["équipes"]
draft: true
---

J’avais la vingtaine, et je n’avais pas envie d’aller au Brésil. Travel Technology Interactive prévoyait d’acheter une entreprise là-bas, et je devais participer à l’audit.

Sur place, j’ai rencontré des gens très accueillants.
<!-- [À VALIDER] v6, coupes pour la place : « dont une personne qui parlait mieux anglais que moi » ; dans L’audit, « Eux aussi faisaient du .NET. Mais » ; « aux GDS » devenu « aux grands systèmes de réservation » (plus clair pour un dirigeant non technique) et « n’avaient pas franchi ce pas » devenu « eux non » -->

## L’audit

Leur entreprise était plus ancienne que la nôtre, et une partie du produit tournait encore en VB6 avec du COM+. À chaque livraison, toute l’équipe technique passait le week-end à réinstaller les composants sur chaque serveur. Pendant ce temps, le service de la compagnie aérienne cliente était arrêté.

Nous étions connectés aux grands systèmes de réservation, comme Amadeus, Sabre ou Galileo ; eux non. Leur produit était taillé pour le marché brésilien et sa comptabilité. L’entreprise fonctionnait bien ; il lui manquait l’international. Travel Technology Interactive l’a rachetée.

## Le choc

En France, je confiais un sujet à un développeur, et il le menait de la spécification jusqu’à la mise en production. Seul.

Au Brésil, on travaillait par groupes de quatre.

Je sortais d’une réunion de présentation avec beaucoup de « oui », et je découvrais ensuite que personne n’avait vraiment compris. Pour eux, la compréhension venait après, et le travail repartait de zéro. Chez nous, on attaquait juste après.

J’ai d’abord voulu travailler comme en France, un sujet par développeur. Il saturait : il n’avait pas l’habitude de porter seul autant de responsabilités.

Plus grande que notre start-up, leur entreprise avait sur nous une avance en management que je ne voyais pas. Sur le papier, des coordinateurs ; dans les faits, des managers à la très grande autorité. Les développeurs avaient envie de bien faire, mais ils attendaient qu’on leur dise quoi faire, et avaient peur de mal faire.
<!-- [À VALIDER] v6, resserrés : « un sujet, un développeur. Le développeur saturait » devenu « un sujet par développeur. Il saturait » ; « avait une avance sur nous en management, dont je n’avais pas conscience » devenu « avait sur nous une avance en management que je ne voyais pas » ; « et ils avaient » devenu « et avaient » -->

J’ai beaucoup aimé la vie de l’entreprise : une cantine où l’on voyait les mamas préparer le même repas pour tout le monde, une piscine, un anniversaire fêté chaque mois.

## La fusion

Quand on a décidé de fusionner les deux produits, les développeurs brésiliens ont eu peur qu’on leur prenne leur travail. Et intégrer leur modèle de données au nôtre n’était pas simple.

Notre produit avait aussi un défaut : à l’intérieur, il ne suivait pas les standards, et il était difficile à relier aux systèmes qui les suivaient. Deux options : rapiécer l’existant pour le rendre compatible, ou repartir d’une page neuve, une nouvelle version qui respecte les standards dès sa conception.

On a choisi la page neuve. Elle a aussi permis à l’équipe brésilienne, en construisant cette version avec nous, de s’approprier le produit et notre manière de travailler. <!-- [À VALIDER] v6, partie 8 de la dictée : « Notre produit avait aussi un défaut : à l’intérieur, il ne suivait pas les standards » (« notre produit, comme il n’était pas au standard de l’intérieur ») ; « et il était difficile à relier aux systèmes qui les suivaient » (« pour qu’il soit en relation avec d’autres systèmes qui respectent le standard eux aussi », resserré) ; « Deux options : rapiécer l’existant pour le rendre compatible » pour « on avait deux solutions, soit patcher le produit existant en rajoutant ce qu’il fallait pour être compatible » (« patcher » est du jargon) ; « page neuve » (ses mots) ; « Elle a aussi permis à l’équipe brésilienne, en construisant cette version avec nous, de s’approprier » (« pour avoir la collaboration avec l’équipe du Brésil », réuni avec « l’équipe brésilienne s’est approprié » de la v4, toujours à valider) --> Petit à petit, les équipes ont été plus à l’aise.

Le reste n’a pas été simple : décalage horaire, mails dans une langue que personne ne maîtrisait, procédures à écrire, nous qui faisions tout à l’oral.
<!-- [À VALIDER] v6 : « De notre côté, on voulait intégrer leur modèle de données au nôtre, et ce n’était pas simple » devenu « Et intégrer leur modèle de données au nôtre n’était pas simple » ; « Le reste n’a pas été de tout repos : le décalage horaire, des mails…, et des procédures » devenu « Le reste n’a pas été simple : décalage horaire, mails…, procédures » ; coupée : « Quand certains ont tenté leurs propres approches, la comparaison a créé des tensions, dures à vivre pour eux » ; « Alors on a fait autrement : » remplacé par le choix rapiécer ou page neuve -->

## Le framework dont je ne suis pas fier

Notre framework maison, une surcouche de .NET, demandait des compétences pointues et une formation que les développeurs n’avaient pas envie de suivre.

Il permettait d’écrire du code sans l’écrire (programmation orientée aspect, AOP). Pour qu’une méthode note dans un journal son entrée et sa sortie, on n’écrivait rien : on posait dessus une étiquette « log », et ça se faisait tout seul. C’était à la mode et ça nous plaisait. Mais cette magie n’est pas une bonne chose : difficile à déboguer, difficile à coder sans connaître les étiquettes par cœur. <!-- [À VALIDER] v6, partie 9 de la dictée : l’exemple du log remplace « C’était une utilisation extrême de la programmation orientée aspect (AOP), au runtime. Des attributs posés sur une classe ou une méthode lui injectaient un comportement » (jargon). « écrire du code sans l’écrire » (ses mots) ; « note dans un journal » pour « log » (lecteur non technique), « étiquette » pour « attribut » ; « au runtime » retiré ; « difficile à coder sans connaître les étiquettes par cœur » (« attributs » devenu « étiquettes », par cohérence). Coupes pour tenir 900 mots : « En France, on avait une culture technique stricte » ; « ses contraintes comptables » devenu « sa comptabilité » ; « cette part de magie » devenu « cette magie » ; « vraiment » retiré de « que personne ne maîtrisait vraiment » -->

On n’avait pas recréé la roue : on avait créé quelque chose de trop compliqué pour une équipe aussi vaste, aux niveaux aussi différents. <!-- [À VALIDER] ses mots (partie 6) passés à l’imparfait ; « avec des niveaux » devenu « aux niveaux » ; remplace « Dans une grande équipe, ça ne pouvait pas marcher » -->

Plus tard, une formation avec Greg Young m’a fait revoir ce choix. Je regrette d’être allé dans cette direction. Mais ça forme.

De leur côté, beaucoup de copier-coller, et un modèle très explicite, tout en portugais, que je lisais mal. Du nôtre, une grosse dette technique jamais traitée, et des parties écrites en français, un problème pour l’équipe brésilienne.
<!-- [À VALIDER] v6 : coupée « Le développeur écrivait peu de code, le framework beaucoup : d’où une forte dépendance à sa maintenance et à la formation » (la formation revient dans le paragraphe IA) ; les deux paragraphes copier-coller et dette réunis en un (« De leur côté…, du nôtre… », « Notre produit n’était pas parfait non plus » coupé) -->

## Ce qui m’a manqué

J’étais jeune, je manquais de recul et de sagesse. Je n’avais pas été formé pour ça, ni suivi par un coach. J’ai vécu des moments humainement difficiles, et je pense que les personnes autour de moi aussi.

## Ce que j’en retiens aujourd’hui

Ce qui a fait avancer la fusion, ce n’est pas notre avance technique : nous avions nous aussi notre dette. C’est le moment où l’équipe brésilienne a construit avec nous la nouvelle version du produit. La compréhension partagée passe avant la brillance technique.

Depuis, je m’appuie toujours sur des standards plutôt que d’inventer mon propre modèle. Pas en traduisant mon modèle pour l’extérieur : c’est le produit lui-même qui est standard, ce qui crée de la valeur et un avantage compétitif. Ça ouvre des portes, ça anticipe des problèmes qu’on ne voit pas encore, ça aide à mieux nommer et articuler le produit. Et on évite de payer la conversion plus tard.

C’est aussi une question d’organisation : au rachat, faute de standards dans notre produit, il a fallu choisir entre le rapiécer et le reconstruire. Ne pas respecter un standard dès le départ, pour moi, c’est une erreur de conception.
<!-- [À VALIDER] ces deux paragraphes : ma mise en forme de la partie 7, au plus près de ses mots. « je m’appuie toujours sur des standards plutôt que d’inventer mon propre modèle » (« utiliser toujours des standards plutôt que d’inventer quelque chose de mon côté ») ; « en traduisant » pour « en faisant une conversion de mon modèle vers l’extérieur » ; « ce qui crée de la valeur et un avantage compétitif » (ses mots, resserrés) ; « erreur de conception » pour « erreur de design » (en français, « design » se lit souvent graphisme) ; « sans recréer la roue » retiré (partie 6 : le framework n’était pas une roue recréée, la formule prêtait à confusion). v6 (partie 8) : « Au rachat, notre produit n’était pas standard : il a fallu construire exprès la nouvelle version pour que la filiale puisse travailler avec nous » devient « au rachat, faute de standards dans notre produit, il a fallu choisir entre le rapiécer et le reconstruire » (rappel court du choix raconté dans « La fusion » ; la nouvelle version n’était pas faite seulement pour la filiale) ; « C’est aussi une question d’organisation. » et la phrase suivante réunies par deux-points -->

Jusqu’à l’arrivée de l’IA, un framework maison épargnait aux développeurs de construire et de tester des briques complexes. Aujourd’hui, l’IA écrit ces bibliothèques, et centraliser la complexité dans un framework que toute l’équipe doit apprendre n’est plus aussi vital. Ce qui le reste : que tout le monde [comprenne la même chose en sortant de la réunion](/ecrits/construire-vite-comprendre-vite/).
<!-- [À VALIDER] v6 : paragraphe IA rétabli à la demande de Johnny (il ouvre sur un autre sujet), resserré en 2 phrases depuis la v4 (« le framework maison servait à épargner aux développeurs la peine de » devient « un framework maison épargnait aux développeurs de » ; « n’est plus aussi vital. Ce qui le reste : » inchangé). [LIEN EN ATTENTE] cible : construire-vite-comprendre-vite.md, encore draft: true (un plan, pas un article). Ne pas publier cet article (draft: false) avant la cible ; sinon retirer le lien et garder le texte. Tant que les deux sont en brouillon, le build ne génère aucune des deux pages. -->

La dernière fois que votre équipe a dit « oui » en réunion, qu’est-ce qui vous a montré qu’elle avait vraiment compris ?

Si vous préférez répondre en privé : johnny@knoblauch.fr. Je ne cite personne.
