'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
    const router = useRouter();
    // État pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        biography: '',
    });

    useEffect(() => {
        // Fonction pour récupérer les données du profil
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Redirection vers la page de connexion si pas de token
                    router.push('/login');
                    return;
                }

                // Appel API pour récupérer les données du profil
                const response = await fetch('/api/profile/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Échec de la récupération du profil');
                }

                const data = await response.json();
                // Mise à jour de l'état avec les données du profil
                setFormData(data.user);
            } catch (err) {
                console.error('Erreur lors de la récupération du profil:', err);
            }
        };

        fetchProfile();
    }, [router]);

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirection vers la page de connexion si pas de token
                router.push('/login');
                return;
            }

            // Appel API pour mettre à jour le profil
            const response = await fetch('/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Échec de la mise à jour du profil');
            }

            const data = await response.json();
            // Mise à jour de l'état avec les données mises à jour
            setFormData(data.user);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mon Profil
            </h1>
            {/* Rendu du composant ProfileForm avec les props nécessaires */}
            <ProfileForm
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
        </div>
    );
}