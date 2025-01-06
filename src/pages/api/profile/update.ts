import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Vérifier si la méthode de la requête est PUT
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
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

        // Récupérer les données du profil à mettre à jour depuis le corps de la requête
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

        // Field validation
        const errors: { [key: string]: string } = {};

        if (!firstName || firstName.trim().length === 0) {
            errors.firstName = "Le prénom ne peut pas être vide";
        }
        if (!lastName || lastName.trim().length === 0) {
            errors.lastName = "Le nom ne peut pas être vide";
        }
        if (!birthDate) {
            errors.birthDate = "La date de naissance est requise";
        }
        if (!gender) {
            errors.gender = "Veuillez sélectionner un genre";
        }
        if (password && password.length < 8) {
            errors.password = "Le mot de passe doit contenir au moins 8 caractères";
        }
        if (!address || address.trim().length === 0) {
            errors.address = "L'adresse ne peut pas être vide";
        }
        if (!postalCode || postalCode.trim().length === 0) {
            errors.postalCode = "Le code postal ne peut pas être vide";
        }
        if (!city || city.trim().length === 0) {
            errors.city = "La ville ne peut pas être vide";
        }
        if (biography && biography.length > 120) {
            errors.biography = "La biographie ne doit pas dépasser 120 caractères";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

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


        // Mettre à jour le profil de l'utilisateur dans la base de données
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

        // Renvoyer les informations mises à jour de l'utilisateur
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
        // Gérer les erreurs potentielles
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
}
