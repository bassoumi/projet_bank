const Account = require('../models/AccountModels');

const createAccount = async (req, res) => {
    try {
        const { name, email, phone, address, dob, accountType, balance, notificationPreference } = req.body;

        // Validation des champs requis
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Le nom, l\'email et le téléphone sont obligatoires' });
        }

        // Validation du format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email invalide' });
        }

        // Validation du format du téléphone
        const phoneRegex = /^[0-9]{8,15}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Numéro de téléphone invalide (8 à 15 chiffres)' });
        }

        // Validation de la préférence de notification (si vide, on met "email" par défaut)
        const validNotificationTypes = ['email', 'sms'];
        if (!validNotificationTypes.includes(notificationPreference)) {
            return res.status(400).json({ message: 'Préférence de notification invalide' });
        }

        // Créer un nouveau document avec les champs fournis
        const newAccount = new Account({
            name,
            email,
            phone,
            address: {
                street: address?.street || '',
                city: address?.city || '',
                zip: address?.zip || '',
            },
            dob,
            accountType: accountType || 'épargne', // Valeur par défaut
            balance: balance || 0, // Valeur par défaut
            notifications: {
                email: notificationPreference === 'email',
                sms: notificationPreference === 'sms',
            }
        });

        // Sauvegarder dans la base de données
        const savedAccount = await newAccount.save();

        // Retourner l'objet créé avec un code 201
        res.status(201).json(savedAccount);
    } catch (error) {
        // Gestion des erreurs (ex. email unique ou autres)
        res.status(500).json({ message: 'Erreur lors de la création du compte', error: error.message });
    }
};



// GET - Récupérer tous les comptes
const getAccount = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la récupération des comptes : ${error.message}` });
    }
};

// GET - Récupérer un compte par ID
const getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Compte non trouvé' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la récupération du compte : ${error.message}` });
    }
};

// PUT - Mettre à jour un compte
const updateAccount = async (req, res) => {
    try {
        const { name, email, phone, address, dob, accountType, balance, status } = req.body;

        // Vérifier s'il y a au moins un champ valide à mettre à jour
        if (!name && !email && !phone && !address && !dob && !accountType && !balance && !status) {
            return res.status(400).json({ message: 'Aucun champ valide à mettre à jour' });
        }

        // Validation du format de l'email si présent
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Email invalide' });
            }
        }

        // Validation du format du téléphone si présent
        if (phone) {
            const phoneRegex = /^[0-9]{8,15}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ message: 'Numéro de téléphone invalide (8 à 15 chiffres)' });
            }
        }

        // Préparation des champs à mettre à jour
        const updatedFields = { name, email, phone, dob, accountType, balance, status };

        // Mise à jour de l'adresse si présente
        if (address) {
            updatedFields.address = {
                street: address.street || '',
                city: address.city || '',
                zip: address.zip || '',
            };
        }

        // Mise à jour du compte dans la base de données
        const updatedAccount = await Account.findByIdAndUpdate(
            req.params.id, // ID du compte à mettre à jour
            updatedFields, // Champs à mettre à jour
            { new: true, runValidators: true } // Options pour retourner le document mis à jour
        );

        // Vérifier si le compte existe
        if (!updatedAccount) {
            return res.status(404).json({ message: 'Compte non trouvé pour mise à jour' });
        }

        // Retourner le compte mis à jour
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la mise à jour du compte : ${error.message}` });
    }
};



// DELETE - Supprimer un compte
const deleteAccount = async (req, res) => {
    try {
        const deletedAccount = await Account.findByIdAndDelete(req.params.id);
        if (!deletedAccount) {
            return res.status(404).json({ message: 'Compte non trouvé pour suppression' });
        }
        res.status(200).json({ message: 'Compte supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la suppression du compte : ${error.message}` });
    }
};

module.exports = {
    createAccount,
    getAccount,
    getAccountById,
    updateAccount,
    deleteAccount
};
