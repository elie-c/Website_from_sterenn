# Website

## Présentation du projet
Le but de ce projet est la migration de notre application web NestJS/Angular vers une architecture type "micro-service", en utilisant la conteneurisation Docker.
A l'origine, cette application permet, entre autres, la création, l'enregistrement, la recherche et la modification d'utilisateurs et d'associations (pour en savoir plus cliquez [ici](https://github.com/SterennLeHir/Website/blob/main/front/README.md)).
On souhaite pouvoir lui rajouter d'autres services.

## Schéma de l'architecture
Vous trouverez ci-dessous un schéma de notre architecture "micro-service".

![](images/structure.png)
## Liste des services

### Terminés
* Serveur HTTP + Front

Pour le mode de fonctionnement production, nos services Angular et Nginx sont fusionnés en un seul service car nous avons fait le choix de copier notre build du front-end Angular dans notre serveur Nginx. Ainsi on gagne en performances car on évite des requêtes inutiles entre le serveur Nginx et Angular.

* Back
  
En mode production, le service backend, codé en NestJS, communique avec le frontend et la base de donnée. On utilise la commande node dist/main.js
En mode développement, on utilise la commande npm run start:dev pour que les modifications soient prises en compte en temps réel et rebuild automatiquement le serveur et donc l'application. On utilise dans ce cas aussi un bind-mount.

* BDD

La base de donnée, implémentée par Postgres, permet la persistance des données. Elle communique avec le backend. On sauvegarde les donnnées par l'utilisation d'un volume. 
A ajouter : Pourquoi Postgres
### En cours
Nous allons détailler ici les services que nous avons essayé de fournir mais pour lesquels nous ne sommes pas parvenus au bout à cause de nombreuses erreurs que nous n'avons pas réussi à comprendre et régler. Chaque service à sa propre branche où vous pouvez aller voir notre travail. 

* Mode développement

Pour le mode développement, nous avons fait un nouveau docker compose nommé `docker-compose.dev.yml` et une nouvelle configuration pour le serveur Http `nginx-dev.conf`. Dans certains Dockerfile (back et Nginx), nous avons deux images, une pour la production (AS prod) et une pour le développement (AS dev). Nous indiquons l'image à construire dans le `docker-compose.dev.yml` avec `target : dev`. Notre front-end à son propre container; notre serveur Angular est lancé avec `npm start`. Nous souhaitions pouvoir mettre à jour notre application dès qu'on modifie notre frontend Angular, sans devoir tout re déployer. Pour son implémentation on utilise le bind-mount pour le dossier src et un proxy-pass dans la configuration de Nginx pour rediriger les requêtes sur le serveur Http à notre serveur Angular.
Nous voulions également pouvoir modifier le code du back-end sans avoir à redéployer les containers. Nous avons aussi voulu utilisé du bind-mount.
Malheureusement nous n'avons pas réussi à terminer cette fonctionnalité car nous avions une erreur 502 en accédant au localhost, sans savoir pourquoi et malgré nos différentes tentatives de correction.

* Notifications

Pour le système de notifications avec Quarkus, nous avons repris le projet mailer du get started de Quarkus. Nous avons ensuite inséré RabbitMQ dans notre projet back-end. Nous avons eu beaucoup d'erreurs à ce niveau là. Des dépendances n'étaient pas installées, chose que nous avons ajouté dans le Dockerfile de l'image pour le back. Nous avons ajouté du code à notre service users pour envoyer un mail à la création d'un compte. Cependant, au lancement du docker compose, nous avions une propriété qui n'était pas set, mais qui l'était pourtant dans un fichier. Nous ne pouvions alors pas construire tous les containers.
A ajouter : pourquoi RabbitMQ

* Load Testing
Pour le load testing, nous avons voulu utilisé k6 et grafana. Cependant, même en se documentant sur grafana, nous n'avons pas réussi à le faire fonctionner avec tous les autres containers. Nous réussissions à accéder sur la page de login de grafana en lançant uniquement l'image de grafana, mais cela ne fonctionnait pas avec notre docker-compose. 
A ajouter : pourquoi k6 et grafana

## Comment utiliser l'application
1. Cloner ce projet Github sur votre machine personnelle
2. Installer Docker : https://docs.docker.com/get-docker/
3. Ouvrir le projet et exécuter la commande :
```
docker compose up
```

## Sécurité
Nous avons fait le choix de n'exposer que le serveur http Nginx sur Internet car il peut embarquer le protocole https pour communiquer avec le navigateur, qui encrypte tous les échanges. Le reste de l'architecture échange alors en clair car les serveurs se situent sur un réseau privé. 

## Feedback sur le module Architecture Logicielle
Pendant les cours magistraux, nous avons pu énormément développer notre culture générale. Nous avons discuté de nombreux aspects intéressants en informatique (licences open sources, micro-services, etc). 
Cependant, il nous a manqué du temps et de la connaissance pour réussir ce projet. Même en se documentant sur les sites officielles, sur des forums avec le code de nos erreurs, nous ne sommes pas parvenus à régler nos soucis, ce qui est très frustrant. 
