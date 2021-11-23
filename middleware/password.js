//Importation du schema de 'password'
const passwordSchema = require('../models/password');

module.exports = (req, res, next) => { // Vérifie que le mot de passe valide le schema décrit
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, "Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces", {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};