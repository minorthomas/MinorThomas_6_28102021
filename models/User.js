//Importation de mongoose 
const mongoose = require('mongoose');

//Importation du package de test unicité dans la BDD
const uniqueValidator = require('mongoose-unique-validator');

//Schema de création de compte utilisateur (avec mongoose)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, //Email en string et unique (test d'unicité grave à 'mongoose-unique-validator')
    password: { type: String, required: true } //Password en string (hashage dans le fichier 'user' dans le dossier 'controller')
});

//Ajout du package validator sur 'userSchema'
userSchema.plugin(uniqueValidator);

//Exportation de 'userSchema'
module.exports = mongoose.model('User', userSchema);