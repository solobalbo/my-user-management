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
            currentPassword,
            newPassword,
            confirmNewPassword,
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
        if (newPassword && newPassword.length < 8) {
            errors.newPassword = "Le nouveau mot de passe doit contenir au moins 8 caractères";
        }
        if (newPassword && newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = "Les mots de passe ne correspondent pas";
        }
        if (newPassword && !currentPassword) {
            errors.currentPassword = "Le mot de passe actuel est requis pour changer le mot de passe";
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

        // Find the user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (currentPassword || newPassword || confirmNewPassword) {
            // Only validate and update password if any password field is provided
            if (!currentPassword || !newPassword || !confirmNewPassword) {
                return res.status(400).json({ message: 'Tous les champs de mot de passe sont requis pour changer le mot de passe' });
            }

            // Verify the current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Le mot de passe actuel est incorrect' });
            }

            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Update the user's password
            user.password = hashedPassword;
        }

        // Update other fields
        const updatedUser = await User.findByIdAndUpdate(
            decoded.userId,
            {
                firstName,
                lastName,
                birthDate,
                gender,
                address,
                postalCode,
                city,
                country,
                biography,
                // Only update password if it was changed
                ...(currentPassword && { password: user.password }),
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Merge the updated fields with the password change (if any)
        Object.assign(user, updatedUser);

        // Save the updated user
        await user.save();

        // Renvoyer les informations mises à jour de l'utilisateur
        res.status(200).json({
            message: 'Profil mis à jour avec succès',
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate ? user.birthDate.toISOString().split('T')[0] : '',
                gender: user.gender,
                address: user.address,
                postalCode: user.postalCode,
                city: user.city,
                country: user.country,
                biography: user.biography
            }
        });
    } catch (error) {
        // Gérer les erreurs potentielles
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
}
