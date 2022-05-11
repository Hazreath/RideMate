# WALKTHROUGH.MD - Carnet de bord

## Preambule

J'ai décidé de mettre en place un carnet de bord pour mieux suivre mon avancement.
Moi qui déteste rendre des comptes, je pense tout de même que cela va m'aider à dépasser cela,
tout en me permettant de voir comment j'avance.
J'ai commencé le projet il y a 2 semaines, soit le Lundi 18 Avril 2022.
Il s'agit d'un site communautaire de patiscoot, et aussi d'un prétexte pour apprendre React & Node/Express en profondeur
J'aimerais beaucoup en faire quelque chose de concret, puisque le concept me tient particulièrement à coeur : depuis
la chute de SR et trotirider.com, plus moyen de communiquer entre riders... (sauf sur des groupes FB rincés 🤣)
Je chéris cette époque et tout ce que ça nous a apporté, et je compte bien remettre le couvert :)
Au programme : Tricklist, forum, OUT en ligne (matchmaking, rank etc)...
La liste sera amenée à bouger, j'ai trop d'idées 😁

## 28/04 - Bienvenue moi !

Lendemain de guimbarde, parfait pour un premier jour de carnet de bord ! 😎
J'ai remplacé les URLS en dur des API et BD Atlas par des références dans un fichier externe, absent de git
Changement titre et favicon
RiderTag : gestion échec chargement data

Côté workspace, j'ai créé un ws VSCODE, commencé à lier mon tél pour avoir une vue mobile, et créé ce présent doc', en
compagnie d'une boîte à idées !

Pas bien plus, fait bô dehors :D

## 29/04

Un peu casse couille today 😂
Système de génération d'URL API plus pratique et flex
Création d'un "playground", interface distincte du site principal, permettant de faire des calls au back tranquille
Ajouts des plateformes nécessaires et réflexion autour du sujet : les utilisateurs n'ajouteront pas de plateformes,
mais sélectionneront parmi celles dispos lors de l'ajout d'un trick.
Adaptation du système de CORS du back pour pouvoir accueillir ce playground (ce qui était fort kasskouy)
Bon, c'est l'heure du goûter, bisous 😘

## 01/05

Récupération de la liste des plateformes, ajout d'un trick.
Choix intervenu au milieu du dév, redondance de la plateforme dans le trick <=> PERFS
Récupération liste de tricks à faire
Changement de méthode : tri de la tricklist lors de la réception, par Plateforme <=> mieux, évite l'update du state avant le mount

tri à faire, nouveau chargement aussi

# COURTE ABSENCE

Correction du mémoire de ma chérie (aled 6h de taf), traitement d'un dégât des eaux à la maison, recherche de boulot/appart,
préparation d'un rdv pole chomage.. SEND HELP :(

## 03/05

J'EN AI CHIE BORDEL 😭
Changement de stratégie pour l'affichage des tricks : récup des plateformes uniques et filter/affichage
(en gros retour à la strat standard).
En effet, je galère à faire de pauvres boucles en React, qui
est bien plus adapté aux maps, reduce et filter, qui retournent directement des tableaux.
Suppression du tri, du coup devenu obsolète, et réalisation de CE F\*CK\*\*\* AFFICHAGE
Content que ce soit fini quand même. Je dois encore travailler ces trois opérations fonctionnelles, avec lesquelles
il semblerait que j'ai encore du mal.
Malgré tout, j'ai plus l'impression de m'être battu contre React, j'ai écrit plusieurs fois la même chose au
cours de ma recherche, pour aboutir à des résultats/erreurs différentes.
Par conséquent, je pense que mon env de travail (VSCODE) n'est PAS DU TOUT optimal.
(J'ai fait un merge Git YOUPI :D)
Donc pour la prochaine fois :
Petite session Workspace obligatoire : Autocomplétion JS/REACT aux fraises, serveur front aux fraises...

## 09/05

Reprise entre dégât des eaux, recherche de taf
Un peu de front pour se remettre en jambe, formulaire register
Pas fonctionnel en l'état <=> pas de push :(
Reste à faire : formulaire, gestion ouverture modal, back

## 10/05

Fin front inscription, need back
SOLUTION DE GITAN POUR UNE TECHNO DE MERDE AAAAAAAAAAA
impossible de passer le stateChanger du state registerModal de Login vers son enfant direct RegisterModal
(perte de contexte injustifiée et systématique LOL)
différence entre () =>, et function () { }
Petite session workspace pour compenser tout ce caca : installation de Prettier,config de emmet
(https://www.freecodecamp.org/news/vscode-react-setup/)

# 11/05

Cours sur Redux : React-Redux, React toolkit ... => gestion des states globaux (cours très naze d'ailleurs)
Backend pour register OK
Gestion front du form : Pseudo de min 4 lettres, mot de passe de 8c min, mdp == validation (format mail autogéré par react)
(mercé html5)
gestion duplicata pseudo et email OK
Réalisation du système de Toast : NOPE
Passage du plombier + carte bleue du frangin = journée niquée
J'ai quand même bien avancé 😀

TODO regarder les toasts sur https://www.npmjs.com/package/react-toastify
