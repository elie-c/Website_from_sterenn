# Website

## Présentation du projet
Le but de ce projet est la migration de notre application web NestJS/Angular vers une architecture type "micro-service", en utilisant la conteneurisation Docker.
A l'origine, cette application permet, entre autres, la création, l'enregistrement, la recherche et la modification d'utilisateurs et d'associations (pour en savoir plus cliquez [ici](https://github.com/SterennLeHir/Website/blob/main/front/README.md)).
On souhaite pouvoir lui rajouter d'autres services.

## Schéma de l'architecture
Vous trouverez ci-dessous un schéma de notre architecture "micro-service".

## Liste des services
* Serveur HTTP + Front

Pour le mode de fonctionnement production, nos services Angular et Nginx sont fusionnés en un seul service car nous avons fait le choix de copier notre build du frontend Angular dans notre serveur Nginx. Ainsi on gagne en performances car on évite des requêtes inutiles entre le sesrveur Nginx et Angular.

Pour le mode développement par contre, les deux services sont "distincts" car le serveur Nginx communique avec le serveur Angular qui lui est lancé en mode start:dev; permettant de mettre à jour notre application dès qu'on modifie notre frontend Angularr, sans devoir tout re déployer. Pour son implémetation on utilise un proxy-pass pour rediriger les requêtes au serveur Http Nginx à notre serveur Angular. Malheureusement cela n'est pas encore fonctionnel.

* Back



* BDD

## Comment utiliser l'application
1. Cloner ce projet Github sur votre machine personnelle
2. Installer Docker : https://docs.docker.com/get-docker/
3. Ouvrir le projet et executer la commande :
```
docker compose up
```

## Sécurité
Nous avons fait le choix de n'exposer que le serveur http Nginx sur Internet car il embarque par défaut le protocole https pour communiquer avec le navigateur, qui encrypte tous les échanges. Le reste de notre architecture échange en clair car nos serveurs se situent sur un réseau privé.

## Feedback sur le module Architecture Logicielle
