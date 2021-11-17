//Importation des packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//Importation des routes
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

//Connexion à la bdd
mongoose.connect('mongodb+srv://totoske:piiquante@cluster0.plpwa.mongodb.net/piiquante?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
      .then(() => console.log('Connexion à la BDD réussie.'))
      .catch(() => console.log('Connexion à la BDD échouée.'));

const app = express();

//Ajout des privilèges
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Parse le body en json
app.use(bodyParser.json());

//Ajout des routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

//Exportation de app
module.exports = app;
