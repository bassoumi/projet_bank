const express = require('express');
const { getAccount, getAccountById, updateAccount, deleteAccount,createAccount } = require('../controllers/AccountController');
const router = express.Router();

// Définir les routes
router.get('/', getAccount); // Récupérer tous les comptes
router.get('/:id', getAccountById); // Récupérer un compte par ID
router.put('/:id', updateAccount); // Mettre à jour un compte
router.post('/', createAccount);
router.delete('/:id', deleteAccount); // Supprimer un compte

module.exports = router;
