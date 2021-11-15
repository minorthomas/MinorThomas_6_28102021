//Importation de mongoose
const mongoose = require('mongoose');

//Importation du package de test unique
const uniqueValidator = require('mongoose-unique-validator');

//Schema de création de compte utilisateur (avec mongoose)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Ajout du package validator sur 'userSchema'
userSchema.plugin(uniqueValidator);

//Exportation de 'userSchema'
module.exports = mongoose.model('User', userSchema);