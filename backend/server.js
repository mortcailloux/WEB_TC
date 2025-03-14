require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const PORT = 80;
const MONGO_URI = process.env.BD_URL;
// Connexion à MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

//Protection CSRF, enregistrée 
const csrfProtection = csrf({ 
    cookie: true,
    
    cookie: { httpOnly: true, secure: false } //mettre true pour la prod pour secure
  });


// Définition d'un modèle simple
const Test = mongoose.model('Test', new mongoose.Schema({
    name: String
}));
//attention les routes sont toutes sans le /api parce que le serveur nginx le supprime (pour économiser un /api par definition de fonction)
// Route pour récupérer les items
app.get('/test', async (req, res) => {
    try {
        const items = await Test.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur'+ err });
    }
});
//génération token csrf, le demander à chaque requête POST/PUT/DELETE (GET on s'en fout)
app.get("/csrf-token",csrfProtection, async (req,res) => {
    try{
        res.json({csrfToken: req.csrfToken()});
    } catch (err) {
        res.status(500).json({error: err})
    }
})

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
