'use client';

import { useState } from 'react';
import {useAuth} from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();
    // État pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    // État pour gérer les messages d'erreur
    const [error, setError] = useState('');

    // Gère les changements dans les champs du formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Gère la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Appel API pour l'authentification
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Stocke le token dans le localStorage
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            // Redirige vers la page de profil
            router.push('/profile');
        } catch (err) {
            // Gère les erreurs d'authentification
            setError(err instanceof Error ? err.message : 'Email ou mot de passe incorrect');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 animate-fade-in">
            <div className="w-full max-w-md space-y-8 p-8 rounded-xl border border-gray-200 dark:border-gray-700 animate-slide-up">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Connexion
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Accédez à votre espace personnel
                    </p>
                </div>

                <form className="space-y-6 animate-slide-up delay-100" onSubmit={handleSubmit}>
                    {/* Affiche le message d'erreur s'il y en a un */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Champ email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Champ mot de passe */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Se connecter
                    </button>
                </form>

                {/* Lien vers la page d'inscription */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 animate-slide-up delay-200">
                    Pas encore de compte ?{' '}
                    <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline transition-all duration-300">
                        Créer un compte
                    </Link>
                </p>
            </div>
        </div>
    );
}