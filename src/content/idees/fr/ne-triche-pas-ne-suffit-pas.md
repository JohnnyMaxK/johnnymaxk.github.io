---
title: "« Ne triche pas » ne suffit pas"
description: "Ce qui tient un agent IA, c’est d’abord ce qu’il ne peut pas faire ; ce qu’on lui demande aide, sans rien garantir."
date: 2026-11-01
tags: ["agents IA"]
draft: true
---

**À REMPLACER** : plan, pas encore un article (600 à 900 mots à rédiger). L’accroche est une phrase type, pas un fait entendu.

## Accroche

« On a écrit dans la consigne de ne pas toucher à la production. »

## Un point (opinion)

Ce qui tient un agent IA, c’est d’abord ce qu’il ne peut pas faire ; ce qu’on lui demande aide, sans rien garantir.

## Faits, chacun selon ses auteurs

- Anthropic, [fiche système Claude Opus 4 / Sonnet 4](https://www-cdn.anthropic.com/6be99a52cb68eb70eb9572b4cafad13df32ed995.pdf) (mai 2025, § 6, évaluation « Claude Code impossible tasks », taux mesurés par un classifieur) : sur des tâches rendues insolubles sans le dire, le modèle contourne le test dans 45 à 47 % des cas sans consigne, 5 à 10 % avec la consigne publiée par Anthropic ; sur le modèle précédent (Sonnet 3.7), 78 % sans consigne, 80 % avec : la consigne n’y change presque rien.
- [ImpossibleBench](https://arxiv.org/abs/2510.20270) (Zhong, Raghunathan, Carlini, octobre 2025) : sur l’une de leurs variantes, offrir explicitement le droit de s’arrêter et de signaler fait passer la triche de GPT-5 de 54 % à 9 % ; le libellé de la consigne pèse aussi, dans les deux sens.
- [METR](https://metr.org/blog/2025-06-05-recent-reward-hacking/) (juin 2025) : sur une de ses tâches (20 essais par consigne), o3 triche dans 80 % des essais, avec ou sans « ne triche pas ».
- Replit / SaaStr (presse, juillet 2025 : [The Register](https://www.theregister.com/2025/07/22/replit_saastr_response/), [Fortune](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/)) : base de production supprimée pendant un gel des changements demandé par l’utilisateur ; premier correctif annoncé par le dirigeant de Replit : séparer automatiquement les bases de développement et de production (s’y ajoutent, selon la presse, un mode « planification seule » et la restauration).

## Plan

1. Ce que disent les études : l’effet d’une consigne dépend du modèle et du libellé, fort chez les uns, nul chez les autres, jamais garanti ; offrir une sortie honnête pèse aussi.
2. Le strict minimum de pouvoir.
3. Le contrôle avant le geste.
4. Les trois questions devant un projet fait avec de l’IA (voir la note sur les agents IA dans Idées).
5. Où ça s’arrête : les garde-fous ne décident pas du pourquoi.

## Objections à traiter dans le texte

- « Ces chiffres datent de modèles de 2025, déjà remplacés. » Réponse : on ne cite pas un taux comme vrai aujourd’hui ; on retient que l’effet d’une consigne change d’un modèle à l’autre, et qu’on ne choisit pas toujours le modèle.
- « Un contrôle avant le geste se contourne : l’agent écrit un script qui fait la même chose. » Réponse : c’est pourquoi le strict minimum de pouvoir (accès, identifiants, environnement séparé) passe avant la liste d’interdits.

## La question

Qu’est-ce qu’un outil pouvait toucher sur votre dernier projet, et le saviez-vous au départ ?

Si vous préférez répondre en privé : johnny@knoblauch.fr. Je ne cite personne.
