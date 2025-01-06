import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/db/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Tentative de connexion à la base de données MongoDB
        await connectDB();

        // Si la connexion réussit, renvoyer un message de succès
        res.status(200).json({ message: 'Connexion à la base de données réussie' });
    } catch (error) {
        // En cas d'erreur lors de la connexion, renvoyer un message d'erreur
        res.status(500).json({ message: 'Échec de la connexion à la base de données' });
    }
}