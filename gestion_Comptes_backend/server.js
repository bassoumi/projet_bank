const express = require('express');
const accountRoute = require('./routes/AccountRoute');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const User = require('./models/User');
const AuthRoute = require('./routes/AuthController'); 

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gestion_comptes',)
    .then(() => {
        console.log('Database connected');

        // Vérifiez si l'utilisateur existe déjà
        return User.findOne({ username: "admin123" })
            .then((user) => {
                if (!user) {
                    // Si l'utilisateur n'existe pas, créez-le
                    const newUser = new User({
                        username: "admin123",
                        password: "password123" // N'oubliez pas de hasher le mot de passe dans un vrai environnement
                    });
                    return newUser.save();
                }
            });
    });

app.use(express.json()); // Doit être déclaré avant vos routes
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:4200',  // Autoriser uniquement les requêtes provenant de http://localhost:4200
    methods: 'GET,POST,PUT,DELETE',  // Méthodes autorisées
    allowedHeaders: 'Content-Type, Authorization' // En-têtes autorisés
}));

// Gérer les requêtes préalables OPTIONS (preflight)
app.options('*', cors());

// Routes
app.use('/api', AuthRoute);
app.use('/account', accountRoute); // Assurez-vous que le fichier `AccountRoute.js` existe bien

// Lancer le serveur sur le port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
