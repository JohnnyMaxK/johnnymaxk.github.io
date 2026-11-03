---
title: "Ce que le Brésil m’a appris"
description: "Un audit, une fusion, un framework trop malin : la compréhension partagée compte plus que la brillance technique."
kind: article
permalink: "ce-que-le-bresil-m-a-appris"
date: 2026-11-03
tags: ["équipes"]
---

J’avais la vingtaine, et je n’avais pas envie d’aller au Brésil. Travel Technology Interactive prévoyait d’acheter une entreprise là-bas, et j’ai dû conduire l’audit technologique.

Sur place, j’ai rencontré des gens très accueillants.

## L’audit

Leur entreprise était plus ancienne que la nôtre, et une partie du produit tournait encore en VB6 avec du COM+. À chaque livraison, toute l’équipe technique passait le week-end à réinstaller les composants sur chaque serveur. Pendant ce temps, le service de la compagnie aérienne cliente était arrêté.

Nous étions connectés aux grands systèmes de réservation, comme Amadeus, Sabre ou Galileo ; eux non. Leur produit était taillé pour le marché brésilien et sa comptabilité. L’entreprise fonctionnait bien ; il lui manquait l’international. Travel Technology Interactive l’a rachetée.

## Le choc

En France, je confiais un sujet à un développeur, et il le menait de la spécification jusqu’à la mise en production. Seul.

Au Brésil, on travaillait par groupes de quatre.

Je sortais d’une réunion de présentation avec beaucoup de « oui », et je découvrais ensuite que personne n’avait vraiment compris. Pour eux, la compréhension venait après, et le travail repartait de zéro. Chez nous, on attaquait juste après.

J’avais l’habitude d’interlocuteurs qui disent « je n’ai pas compris » ou remettent les choses en question. Là, ils acceptaient tout. J’y vois un mélange : la culpabilité de ne pas savoir, ne pas oser le dire, la culture. Et pas seulement : d’un coup, des personnes leur donnaient des projets ; ils étaient potentiellement mal à l’aise, pas habitués à ce contexte. C’est comme ça que je vois les choses.

J’ai d’abord voulu travailler comme en France, un sujet par développeur. Le développeur saturait : il n’avait pas l’habitude de porter seul autant de responsabilités.

Plus grande que notre start-up, leur entreprise avait sur nous une avance en management que je ne voyais pas. Sur le papier, des coordinateurs ; dans les faits, des managers à la très grande autorité. Les développeurs avaient envie de bien faire, mais ils attendaient qu’on leur dise quoi faire, et avaient peur de mal faire.

J’ai beaucoup aimé la vie de l’entreprise : une cantine où l’on voyait les mamas préparer le même repas pour tout le monde, une piscine, un anniversaire fêté chaque mois.

## La fusion

Quand on a décidé de fusionner les deux produits, les développeurs brésiliens ont eu peur qu’on leur prenne leur travail. Et intégrer leur modèle de données au nôtre n’était pas simple. Quand certains ont tenté leurs propres approches, la comparaison a créé des tensions, dures à vivre pour eux.

Notre produit avait aussi un défaut : à l’intérieur, il ne suivait pas les standards, à commencer par la norme IATA, et il était difficile à relier aux systèmes qui les suivaient. Deux options : patcher l’existant pour le rendre compatible, ou repartir d’une page neuve, une nouvelle version qui respecte les standards dès sa conception.

On a choisi la page neuve. Elle a aussi permis à l’équipe brésilienne, en construisant cette version avec nous, de s’approprier le produit et notre manière de travailler. Petit à petit, les équipes ont été plus à l’aise.

Le reste n’a pas été simple : décalage horaire, mails dans une langue que personne ne maîtrisait, procédures à écrire, nous qui faisions beaucoup à l’oral.

## Le framework dont je ne suis pas fier

Notre framework maison, une surcouche de .NET, demandait des compétences pointues et une formation que les développeurs n’avaient pas envie de suivre.

Il permettait d’écrire du code sans l’écrire (programmation orientée aspect, AOP). Pour qu’une méthode note dans un journal son entrée et sa sortie, on n’écrivait rien : on posait dessus une étiquette « log », et ça se faisait tout seul. C’était à la mode et ça nous plaisait. Mais cette magie n’est pas une bonne chose : difficile à déboguer, difficile à coder sans connaître les étiquettes par cœur.

On n’avait pas recréé la roue : on avait créé quelque chose de trop compliqué pour une équipe aussi vaste, aux niveaux aussi différents.

Plus tard, une formation avec Greg Young m’a fait revoir ce choix. Je regrette d’être allé dans cette direction. Mais ça forme.

De leur côté, beaucoup de copier-coller, et un modèle très explicite, tout en portugais, que je lisais mal. Du nôtre, une grosse dette technique non traitée, et des parties écrites en français, qui auraient posé problème à l’équipe brésilienne.

## Ce qui m’a manqué

J’étais jeune, je manquais de recul et de sagesse. Je n’avais pas été formé pour ça, ni suivi par un coach. J’ai vécu des moments humainement difficiles, et je pense que les personnes autour de moi aussi.

## Ce que j’en retiens aujourd’hui

Ce qui a fait avancer la fusion, ce n’est pas notre avance technique : nous avions nous aussi notre dette. C’est le moment où l’équipe brésilienne a construit avec nous la nouvelle version du produit. La compréhension partagée passe avant la brillance technique.

Depuis, je m’appuie toujours sur des standards plutôt que d’inventer mon propre modèle. Pas en traduisant mon modèle pour l’extérieur : c’est le produit lui-même qui est standard, ce qui crée de la valeur et un avantage compétitif. Ça ouvre des portes, ça anticipe des problèmes qu’on ne voit pas encore, ça aide à mieux nommer et articuler le produit. Et on évite de payer la conversion plus tard.

C’est aussi une question d’organisation : au rachat, faute de standards dans notre produit, il a fallu choisir entre le patcher et le reconstruire. Ne pas respecter un standard dès le départ, pour moi, c’est une erreur de conception.

Jusqu’à l’arrivée de l’IA, un framework maison épargnait aux développeurs de construire et de tester des briques complexes. Aujourd’hui, l’IA écrit ces bibliothèques, et centraliser la complexité dans un framework que toute l’équipe doit apprendre n’est plus aussi vital. Ce qui le reste : que tout le monde [comprenne la même chose en sortant de la réunion](/idees/petites-equipes/).

La dernière fois que votre équipe a dit « oui » en réunion, qu’est-ce qui vous a montré qu’elle avait vraiment compris ?

Si vous préférez répondre en privé : johnny@knoblauch.fr.
