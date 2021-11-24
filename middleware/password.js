//Importation du schema de 'password'
const passwordSchema = require('../models/password');

module.exports = (req, res, next) => { // Vérifie que le mot de passe respecte le schéma demandé
    if (!passwordSchema.validate(req.body.password)) { //Si le password est invalide
        res.writeHead(400, "Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces", { //Renvoi un message avec les instructions
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect'); //Renvoi un message
    } else {
        next(); //Si le password est bon, passe au middleware suivant
    }
};