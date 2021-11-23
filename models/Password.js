//Importation du packages 'password-validator'
const passwordValidator = require('password-validator');

// Schema du password
const passwordSchema = new passwordValidator();

//Test du mot de passe pour chaques contraintes
passwordSchema
.is().min(8) // Longueur minimun : 8 caractères
.is().max(100) // Longueur maximum : 100 caractères
.has().uppercase() // Contient au moins une majuscule
.has().lowercase() // Contient au moins une minuscule
.has().digits() // Contient au moins un chiffre
.has().not().spaces() // Contient aucun espace
.is().not().oneOf(['Passw0rd', 'Password123', 'Azerty123']); // Blacklist de valeurs à proscrire

//Exportation du schema de 'password'
module.exports = passwordSchema;