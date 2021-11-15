//Importation des packages
const express = require('express');
const router = express.Router();

//Importation du controllers 'user.js'
const userCtrl = require('../controllers/user');

//Création des routes
router.post('/signup', userCtrl.signup); //Route pour créer un compte
router.post('/login', userCtrl.login); //Route pour se connecter au compte

//Exportation des routes
module.exports = router;