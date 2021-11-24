//Importation des packages
const express = require('express'); //Permet de faire des applications web avec node
const mongoose = require('mongoose'); //Permet la connexion à la BDD mongodb
const bodyParser = require('body-parser'); //Analyse les corps des requêtes et ajoute la propriété "req.body"
const path = require('path'); //Permet de travailler avec les chemins des fichiers

//Importation packages de sécurité
const helmet = require('helmet'); //Permet de sécurisé les en-tête http de notre application express

//Importation des routes
const saucesRoutes = require('./routes/sauces'); //Routes des sauces
const userRoutes = require('./routes/user'); //Routes des utilisateurs

require('dotenv').config(); //Importation du packages dotenv qui permet de protéger les informations de connexion vers la BDD
const URI = process.env.DB_URI; //Variable qui récupère "DB_URI" dans le fichier .env

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
    res.setHeader('Access-Control-Allow-Origin', '*'); //En-tête qui permet de set les permissions pour d'accèder au ressource
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //En-tête qui permet de set les en-tête utilisable
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //En-tête qui permet de set les méthodes http utilisable
    next();
  });


app.use(bodyParser.json());//Parse le body en objet json utilisable

app.use(helmet()); //Permet de sécurisé les en-tête http de notre application express

//Ajout des routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

//Exportation de app
module.exports = app;