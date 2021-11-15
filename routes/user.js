//Importation des packages
const express = require('express');
const router = express.Router();

//Importation du controllers 'user.js'
const userCtrl = require('../controllers/user');

//Création des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//Exportation des routes
module.exports = router;