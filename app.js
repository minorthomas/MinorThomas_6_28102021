//Importation des packages
const express = require('express'); //Permet de faire des applications web avec node
const mongoose = require('mongoose'); //Permet la connexion à la BDD mongodb
const bodyParser = require('body-parser'); //Analyse les corps des requêtes et ajoute la propriété "req.body"
const path = require('path'); //Permet de travailler avec les chemins des fichiers

const session = require('express-session');//Permet d'éviter les attaques XSS dans les cookies

//Importation packages de sécurité
const helmet = require('helmet'); //Permet de sécurisé les en-tête http de notre application express

//Importation des routes
const saucesRoutes = require('./routes/sauces'); //Routes des sauces
const userRoutes = require('./routes/user'); //Routes des utilisateurs

require('dotenv').config(); //Importation du packages dotenv qui permet de protéger les informations de connexion vers la BDD

//Constante qui contient le link pour la connexion à la BDD
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`; 

//Connexion à la bdd
mongoose.connect(URI, { //URI est la constante au dessus qui récupère "DB_URI" dans le fichier .env 
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à la BDD réussie.')) //Renvoi un message si la connexion est réussie
    .catch(() => console.log('Connexion à la BDD échouée.')); //Renvoi un message si la connexion à échouée

const app = express();

//Ajout des privilèges
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.AUTHORIZED_ORIGIN); //En-tête qui permet de set les permissions pour accèder aux ressources (ip local)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //En-tête qui permet de set les en-tête utilisable
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //En-tête qui permet de set les méthodes http utilisable
    next();
  });


app.use(bodyParser.json());//Parse le body en objet json utilisable

app.use(helmet()); //Sécurise les en-tête http de notre application express

//Ajout des routes
app.use('/images', express.static(path.join(__dirname, 'images'))); //Ajout de la route images et enregistre l'image dans le dossier "images"
app.use('/api/auth', userRoutes); //Route vers l'authentification login et signup
app.use('/api/sauces', saucesRoutes); //Route vers les sauces

//Exportation de app
module.exports = app;