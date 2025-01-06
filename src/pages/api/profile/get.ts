import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Vérifier si la méthode de la requête est GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Connexion à la base de données MongoDB
        await connectDB();

        // Récupérer le token d'authentification depuis les en-têtes
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // Vérifier et décoder le token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string };

        // Rechercher l'utilisateur dans la base de données (sans inclure le mot de passe)
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Renvoyer les informations de l'utilisateur
        res.status(200).json({
            user: {
                email: user.email,
                password: user.password || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '',
                gender: user.gender || '',
                address: user.address || '',
                postalCode: user.postalCode || '',
                city: user.city || '',
                country: user.country || '',
                biography: user.biography || ''
            }
        });
    } catch (error) {
        // Gérer les erreurs potentielles
        res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
    }
}
