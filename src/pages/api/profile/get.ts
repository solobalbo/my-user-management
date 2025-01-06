import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string };

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

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
        res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
    }
}
