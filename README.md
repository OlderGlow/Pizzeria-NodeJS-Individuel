# TODO avant de lancer le projet
* Installer Node et exécuter à la racine du projet la commande : > npm install
* Créer une base de données du nom de votre choix
* Dupliquer le .env en .env.local et le remplir (Nom de la base de données, identifiants de connexion à la base de données, clé secrète JWT...)
* ⚠️ Par défaut, le serveur se lance sur le port 8000. Vous pouvez éditer ce port dans app.js 


# Projet Individuel Node.js

L'objectif du projet est de réaliser un système de gestion d'une pizzeria avec deux applications :

* Une application d'administration des données utilisée par les gestionnaires de la pizzeria

![e2416d58-e435-11e6-90ca-10c4ca1d05b9](https://cloud.githubusercontent.com/assets/1372183/25194963/6cd6b92c-253c-11e7-9dc7-9976ba2cad01.png)



* Une application utilisée par des clients pour effectuer des commandes

![6ca464c6-e438-11e6-8af1-6abc069e45c8](https://cloud.githubusercontent.com/assets/1372183/25195054/b89ed916-253c-11e7-8b6e-7eb04ac68873.png)


## Contraintes techniques

* Les données sont sauvegardées dans une base de données (relationnelle ou non)
* L'application d'administration est réalisée en multi-pages (génération de pages côté serveur)
* L'application Web destinée aux clients, vous avez le choix :
  * soit une application multi-pages
  * soit une application basée sur une seule page (Single Page Application)

## Fonctionnalités à développer

La symbolique :dart: périmètre minimum à réaliser.

### Administration

- [X] :dart: USA001 - Authentification - Page Login (*) roddet/2022-04-11-nodejs-projet-individuel#1
- [X] :dart: USA002 - Menu roddet/2022-04-11-nodejs-projet-individuel#2
- [X] :dart: USA003 - Utilisateur - CRUD roddet/2022-04-11-nodejs-projet-individuel#3
- [X] :dart: USA004 - Pizza - CRUD roddet/2022-04-11-nodejs-projet-individuel#4
- [X] :dart: USA005 - Livreur - CRUD roddet/2022-04-11-nodejs-projet-individuel#5
- [X] :dart: USA006 - Client - CRUD roddet/2022-04-11-nodejs-projet-individuel#6
- [X] :dart: USA007 - Commande - CRUD roddet/2022-04-11-nodejs-projet-individuel#7
- [X] USA008 - Statistiques (temps réel) roddet/2022-04-11-nodejs-projet-individuel#8
- [X] USA009 - Promotions - CRUD roddet/2022-04-11-nodejs-projet-individuel#9
- [ ] USA010 - Historique des emails envoyés roddet/2022-04-11-nodejs-projet-individuel#10
- [X] USA011 - Ingrédients - CRUD roddet/2022-04-11-nodejs-projet-individuel#11
- [X] :dart: USA012 - Visualiser activités (temps réel) roddet/2022-04-11-nodejs-projet-individuel#12
- [X] USA013 - Boissons - CRUD roddet/2022-04-11-nodejs-projet-individuel#13
- [X] USA014 - Desserts - CRUD roddet/2022-04-11-nodejs-projet-individuel#14
- [ ] USA015 - Menu - CRUD roddet/2022-04-11-nodejs-projet-individuel#15
- [ ] USA016 - Gestion des stocks (temps réel) roddet/2022-04-11-nodejs-projet-individuel#33


### Client

- [ ] USW001 - Accueil roddet/2022-04-11-nodejs-projet-individuel#16
- [ ] USW002 - Lister pizzas roddet/2022-04-11-nodejs-projet-individuel#17
- [ ] USW003 - Ajouter au panier roddet/2022-04-11-nodejs-projet-individuel#18
- [ ] USW004 - Gérer panier roddet/2022-04-11-nodejs-projet-individuel#19
- [ ] USW005 - S'inscrire roddet/2022-04-11-nodejs-projet-individuel#20
- [ ] USW006 - Se connecter roddet/2022-04-11-nodejs-projet-individuel#21
- [ ] USW007 - Créer une commande roddet/2022-04-11-nodejs-projet-individuel#22
- [ ] USW008 - Mon compte roddet/2022-04-11-nodejs-projet-individuel#23
- [ ] USW009 - Multilangues roddet/2022-04-11-nodejs-projet-individuel#24
- [ ] USW010 - Détail de la commande roddet/2022-04-11-nodejs-projet-individuel#25
- [ ] USW011 - Gestion de la promotion roddet/2022-04-11-nodejs-projet-individuel#26
- [ ] USW012 - Lister les menus roddet/2022-04-11-nodejs-projet-individuel#27
- [ ] USW013 - Lister les boissons roddet/2022-04-11-nodejs-projet-individuel#28
- [ ] USW014 - Lister les entrées roddet/2022-04-11-nodejs-projet-individuel#29
- [ ] USW015 - Lister les desserts roddet/2022-04-11-nodejs-projet-individuel#30
- [ ] USW016 - Notation des Pizzas roddet/2022-04-11-nodejs-projet-individuel#31
- [ ] USW017 - Composer sa pizza roddet/2022-04-11-nodejs-projet-individuel#32
