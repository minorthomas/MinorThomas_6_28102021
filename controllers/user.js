//Importation des packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Importation du modéle de création utilisateur
const User = require('../models/User');

//Exportation de 'signup'
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //Hashage du password avec bcrypt (hash 10)
    .then(hash => { //Création de l'utilisateur
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save() //Sauvegarde de l'utilisateur vers la BDD
        .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Exportation de 'login'
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //Cherche l'adresse mail rentrée par l'utilisateur dans la BDD
    .then(user => {
        if (!user) { //Si aucune adresse mail trouvé, renvoi une erreur
            return res.status(401).json({ error });
        }
        bcrypt.compare(req.body.password, user.password) //Compare le password rentré et le password dans la BDD
        .then(valid => {
            if(!valid) { //Si le password est faux, renvoi une erreur
                return res.status(401).json({ error });
            }
            res.status(200).json({ //Si le password est correct, renvoi 'user id, un token random, et une date d'expiration du token'
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })  
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};