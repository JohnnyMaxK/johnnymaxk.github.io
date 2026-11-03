---
title: "Un contrôle après le geste constate. Un contrôle avant le geste empêche."
description: "Une consigne ne tient pas un agent IA. Ce qui le tient : le minimum de pouvoir, des frontières que le système fait respecter, des contrôles avant le geste."
kind: note
tag: "Agents IA, la gouvernance"
permalink: "agents-ia-garde-fous"
anchor: "agents"
order: 5
date: 2026-11-03
---

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
Si vous préférez répondre en privé, [écrivez-moi](mailto:johnny@knoblauch.fr).
