---
title: "Idées"
description: "Cinq idées contre l’usine à fonctionnalités : #NoBacklog, discovery continue, #mob, petites équipes, agents IA sous garde-fous."
---

<p class="lead">Ce que je combats : l’usine à fonctionnalités, qui produit plus vite qu’on ne comprend. Elle n’est la faute de personne. C’est un système : un contrat qui achète une liste, un backlog qui ne fait que grossir, des équipes mesurées au volume.</p>

Voici ce que je fais à la place. Chaque note dit d’où je tiens l’idée et où elle s’arrête.

- [#NoBacklog : un backlog n’est pas un plan](#nobacklog)
- [Discovery continue : on ne pose pas un diagnostic sans le docteur](#discovery)
- [#mob : quatre devs sur quatre projets, ce n’est pas une équipe](#mob)
- [Petites équipes cross-fonctionnelles : construire vite n’est pas comprendre vite](#equipes)
- [Agents IA : un contrôle avant le geste empêche](#agents)

<h2 id="nobacklog">Un backlog n’est pas un plan.</h2>

<p class="meta">#NoBacklog</p>

*Ce que je pense.* Un backlog est la liste de ce qu’on n’a pas le temps de faire. Il grossit toujours, et l’IA le fait grossir plus vite qu’elle ne le vide. Garder la liste, c’est garder l’usine.

*Concrètement.* #NoBacklog, au sens d’Allen Holub :

- jeter la liste ;
- garder une file courte, de taille fixe ;
- limiter le travail en cours ;
- chercher le détail au dernier moment, juste avant de construire.

Ma règle : un sujet en cours, trois opportunités en attente au plus. Ce qui entre fait sortir autre chose.

*Où ça s’arrête.* Une file courte ne garantit pas que ce qu’on y met a de la valeur. Elle rend seulement visible le travail de faible valeur. La valeur, c’est la discovery qui la trouve ([note suivante](#discovery)).

*D’où je le tiens.* Allen Holub, « #NoBacklog » et « The Last Responsible Moment », juillet 2026 : « Throw it out. All of it. » (jetez-le, en entier). John Cutler, *North Star Playbook* (Amplitude) : la North Star est un résultat, qui dépend des leviers sur lesquels on agit.

*Une question.* Sur votre dernier projet, qu’est-ce qui est sorti de la liste sans que personne ne le regrette ?
Si vous préférez répondre en privé, [écrivez-moi](mailto:johnny@knoblauch.fr) : je ne cite personne.

<h2 id="discovery">On ne pose pas un diagnostic sans le docteur.</h2>

<p class="meta">Discovery continue</p>

*Ce que je pense.* Avec l’IA, le quoi se construit vite ; le pourquoi, non. Il se trouve avec le client, qui vit le problème, et avec ceux qui savent faire. Décider le pourquoi sans l’équipe ou sans le client, c’est perdre un angle crucial.

*Concrètement.* D’abord livrer, parler aux clients, ensuite décider des opportunités qui valent le coup. La discovery ne se fait pas à côté de l’équipe : on l’intègre dans l’équipe. Un Opportunity Solution Tree relie chaque développement à un résultat client. On juge le travail à ce résultat, jamais au volume livré.

*Où ça s’arrête.* Parler aux clients ne veut pas dire leur demander des idées de fonctionnalités. On leur demande quels problèmes ils doivent résoudre, et comment ils s’y prennent aujourd’hui.

*D’où je le tiens.* Jeff Patton, *User Story Mapping*, et sa formation suivie aux États-Unis. Teresa Torres, *Continuous Discovery Habits*. Allen Holub, « Adding Features Makes Your Product Worse », août 2026 : « You cannot compete by adding features. » (on ne gagne pas en ajoutant des fonctionnalités).

*Une question.* Sur le dernier projet qui s’est bien passé, à quel moment ceux qui l’ont construit ont-ils entendu le client pour la première fois ?
Si vous préférez répondre en privé, [écrivez-moi](mailto:johnny@knoblauch.fr) : je ne cite personne.

<h2 id="mob">Quatre devs sur quatre projets, ce n’est pas une équipe.</h2>

<p class="meta">#mob</p>

*Ce que je pense.* Quand chaque dev a son projet, il n’y a plus de partage. Le coût de se mettre d’accord sur le pourquoi, le quoi et le comment est ignoré. On crée une dépendance à une personne par zone du logiciel, et on finit par garder l’information pour garder sa place.

*Concrètement.* Tous ensemble sur le sujet le plus important, et rien d’autre : c’est le mob programming. Avec l’IA, celui qui tient le clavier, c’est l’IA : l’équipe pense, l’IA tape, et quelqu’un relit à chaque pas.

*Où ça s’arrête.* L’IA n’est pas un équipier comme les autres au clavier :

- elle n’apprend pas d’une session à l’autre, sauf ce que l’équipe écrit pour elle ;
- elle ne tourne pas ;
- elle prend des initiatives qu’on ne lui a pas demandées.

Alors on fait tourner celui qui lui parle et celui qui relit. On garde des pas courts, vérifiés par les tests. Et on garde des moments où un humain tape, pour apprendre.

*D’où je le tiens.* Je l’ai pratiqué avec mon équipe, avant l’IA. Llewellyn Falco, « strong-style pairing », 2014 : une idée passe par les mains de quelqu’un d’autre. Allen Holub, mars 2026 : selon lui, quand toute l’équipe travaille ensemble toute la journée, le coût de coordination disparaît. Retours publics d’équipes en mob avec l’IA, où un humain tient l’outil et ce rôle tourne : Atlassian, décembre 2025 ; Flurdy, février 2026.

*Une question.* La dernière fois que toute une équipe a travaillé ensemble sur un seul sujet, qu’est-ce que ça a changé ?
Si vous préférez répondre en privé, [écrivez-moi](mailto:johnny@knoblauch.fr) : je ne cite personne.

<h2 id="equipes">Construire vite n’est pas comprendre vite.</h2>

<p class="meta">Petites équipes cross-fonctionnelles</p>

*Ce que je pense.* Avec l’IA, construire va vite. À vouloir en faire trop, on crée un gap de connaissance entre ce qui est dans le produit et ce que comprennent les devs, le support, les ventes, le marketing et la direction. Alors je lève le pied sur le codage, pour que tous suivent.

*Concrètement.* De petites équipes cross-fonctionnelles, où chacun apporte une compétence différente : une seule équipe pour le produit et la tech. Des lots plus petits plutôt qu’une avalanche. On mesure la maîtrise que l’équipe a de son produit et la satisfaction de ceux qui l’utilisent, pas le nombre de choses livrées.

*Où ça s’arrête.* Lever le pied ne veut pas dire livrer moins souvent. Livrer petit et souvent, c’est ce qui laisse à chacun le temps de comprendre.

*D’où je le tiens.* Allen Holub, « The Real AI Advantage », mai 2026 : le vrai avantage de l’IA est une boucle de retour client plus courte, pas plus de code ; et « Value Is Not Proportional to Quantity ». Clare Liguori (AWS), au AI Engineer, été 2026 : selon elle, sur une cinquantaine d’équipes d’Amazon suivies un an avec le même outil, ce qui sépare celles qui gagnent le plus n’est pas l’outil, c’est la façon de travailler.

*Une question.* Sur le dernier lancement qui s’est bien passé, comment le support et les ventes ont-ils appris ce qui changeait ?
Si vous préférez répondre en privé, [écrivez-moi](mailto:johnny@knoblauch.fr) : je ne cite personne.

<h2 id="agents">Un contrôle après le geste constate. Un contrôle avant le geste empêche.</h2>

<p class="meta">Agents IA, la gouvernance</p>

*Ce que je pense.* Une consigne écrite à un agent IA ne suffit pas à le tenir. Ce qui le tient, c’est ce qu’il ne peut pas faire : le strict minimum de pouvoir, des frontières que le système fait respecter, des contrôles qui passent avant le geste.

*Concrètement.* Devant un projet fait avec de l’IA, je poserais trois questions :

- qu’est-ce que l’outil peut toucher, et qui l’a décidé ?
- quelle règle est vérifiée par le système, et laquelle seulement écrite dans une consigne ?
- qui relit, et à quel moment ?

Des tests au vert ne prouvent pas qu’une règle d’architecture a été respectée, sauf si un test vérifie justement cette règle.

*Où ça s’arrête.* Les garde-fous ne remplacent pas le jugement humain sur le pourquoi. Un contrôle avant le geste n’empêche que ce qu’il sait reconnaître : ce que l’outil ne peut pas atteindre tient mieux qu’une liste d’interdits. À mon avis, les garde-fous déplacent une partie de la relecture : avant de relire le code, on décide de ce que l’outil a le droit de faire, et on garde la relecture humaine pour ce qu’on ne peut pas défaire.

*D’où je le tiens.* Des études publiques, chacune selon ses auteurs, sur des modèles de 2025 :

- la [fiche système de Claude Opus 4 et Sonnet 4](https://www-cdn.anthropic.com/6be99a52cb68eb70eb9572b4cafad13df32ed995.pdf) d’Anthropic (mai 2025) ;
- [ImpossibleBench](https://arxiv.org/abs/2510.20270) (Zhong, Raghunathan, Carlini, octobre 2025) ;
- [METR](https://metr.org/blog/2025-06-05-recent-reward-hacking/) (juin 2025).

Elles ne disent pas toutes la même chose, et c’est le point. Quand tricher paie, des modèles contournent les tests. Une consigne contre la triche réduit fortement ce contournement chez certains modèles, presque pas chez d’autres. Une consigne est un levier, pas une garantie. Côté presse, l’incident Replit / SaaStr ([The Register](https://www.theregister.com/2025/07/22/replit_saastr_response/), [Fortune](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/), juillet 2025) : le premier correctif annoncé par le dirigeant de Replit était de séparer automatiquement les bases de développement et de production, pas une nouvelle consigne.

*Une question.* Sur votre dernier projet, quel contrôle a vraiment arrêté une erreur avant qu’elle parte ?
Si vous préférez répondre en privé, [écrivez-moi](mailto:johnny@knoblauch.fr) : je ne cite personne.
