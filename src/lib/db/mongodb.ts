import mongoose from 'mongoose';

// Récupération de l'URI de connexion MongoDB depuis les variables d'environnement
const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        // Vérification de la présence de l'URI de connexion
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI n\'est pas défini');
        }

        // Tentative de connexion à MongoDB
        await mongoose.connect(MONGODB_URI);

        // Affichage d'un message de succès dans la console
        console.log('Connexion à MongoDB réussie');
    } catch (error) {
        // En cas d'erreur, affichage du message d'erreur dans la console
        console.error('Erreur de connexion à MongoDB:', error);

        // Lancement d'une nouvelle erreur pour être gérée par l'appelant
        throw new Error('Échec de la connexion à MongoDB');
    }
};