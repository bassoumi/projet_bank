const mongoose = require('mongoose');

// Définition du schéma pour le modèle Compte
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Supprime les espaces en début/fin
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validation de format email
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{8,15}$/, // Numéro de téléphone de 10 à 15 chiffres
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        zip: { type: String, match: /^[0-9]{1,6}$/ }, // Code postal à 5 ou 6 chiffres
    },
    dob: {
        type: Date, // Date de naissance
    },
    accountType: {
        type: String,
        enum: ['épargne', 'courant', 'professionnel'], // Type de compte
        default: 'épargne',
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
        min: 0, // Empêche un solde négatif
    },
    status: {
        type: String,
        enum: ['actif', 'inactif', 'fermé'], // Statut du compte
        default: 'actif',
    },
    notifications: {
        email: { type: Boolean, default: true }, // Notifications par email
        sms: { type: Boolean, default: false },  // Notifications par SMS
    },
}, { 
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Virtual pour afficher le solde formaté
accountSchema.virtual('formattedBalance').get(function() {
    return `${this.balance.toFixed(2)} €`;
});

// Méthode pour calculer les intérêts
accountSchema.methods.calculateInterest = function(rate) {
    return this.balance * (rate / 100);
};

// Méthode statique pour rechercher un compte par email
accountSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

// Création et exportation du modèle Compte
const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
