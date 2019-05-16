# Infos

## Description des différents fichiers

* Affichage.html : dans ce fichier les différents fichier .js sont chargé(ipynb.js, jquerry et autres dépendances)
* ipynb.ts : Permet de mettre les informations contenues des les fichier /ipynb dans des objets types script (CelluleDTO et NotebookInfosDTO). Et permet aussi de retransformer ses objets dans un fichier .ipynb
* monaco.ts : Transforme une balise div en un editeur monaco contenant du code, gère aussi les éditeurs monaco (récupération des valeurs, suppression des éditeurs).
* Fichiers .ipynb : différents fichiers sources permettant de tester l'affichage avec différents fichiers sources (pour changer de fichier il faut changer la variable i au début du code du fichier ipynb.ts).
* Dossier compiledJS : dossier contenant les fichier typeScript compilés en JavaScript.
* CelluleDTO.ts : Permet de transporter les informations concernant une cellule (source, langage, outputs ect...).
* NotebookInfosDTO.ts : Permet de transporter toutes les informations du notebook (dont les cellules).
* ContextMenuManager : gère le menu contextuel qui s'ouvre lors d'un click droit sur une cellule
* tsconfig.json : fichier de configuration de typescript (de préférence ne pas trop y toucher)

## TODO

* Résoudre les problèmes dû aux types MIME : Le script à l’adresse «URL» a été chargé alors que son type MIME (« text/css ») n’est pas un type MIME JavaScript valide.
* Faire discuter les cellules Monaco avec un serveur LSP.
* Voir si il existe un moyen plus simple de transporter les informations.

## Maladresse existantes

## Futurs problèmes possibles

* Comme il y aura des détections d'erreurs dans chaque cellules, en imaginant que dans une première cellule on écrive 'x=3' et dans une deuxième : 'print(x)' => monaco affichera sûrement une erreur du type 'x is not defined' dans la deuxième cellule. => finalement il arrive à se débrouiller