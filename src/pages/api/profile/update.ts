import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string };

        const {
            firstName,
            lastName,
            birthDate,
            gender,
            password,
            address,
            postalCode,
            city,
            country,
            biography
        } = req.body;

        // Hash password if it's being updated
        const updates = {
            firstName,
            lastName,
            birthDate,
            gender,
            password,
            address,
            postalCode,
            city,
            country,
            biography
        };

        if (password) {
            updates.password = await bcrypt.hash(password, 12);
        }


        const updatedUser = await User.findByIdAndUpdate(
            decoded.userId,
            {
                ...updates,
                birthDate: new Date(birthDate)
            },
            { new: true }
        );


        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({
            message: 'Profil mis à jour avec succès',
            user: {
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                birthDate: updatedUser.birthDate ? new Date(updatedUser.birthDate).toISOString().split('T')[0] : '',
                gender: updatedUser.gender,
                password: updatedUser.password || '',
                newPassword: '',  // Add this line
                address: updatedUser.address,
                postalCode: updatedUser.postalCode,
                city: updatedUser.city,
                country: updatedUser.country,
                biography: updatedUser.biography
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
}
