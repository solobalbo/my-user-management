import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Vérifier si la méthode de la requête est POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    try {
        // Connexion à la base de données MongoDB
        await connectDB();

        const { email, password } = req.body;

        // Rechercher l'utilisateur dans la base de données
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier si le mot de passe est correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer un token JWT pour l'authentification
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '7d' }
        );

        // Renvoyer le token et les informations de l'utilisateur
        res.status(200).json({ token, user: { email: user.email } });
    } catch (error) {
        // Gérer les erreurs potentielles
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
}
