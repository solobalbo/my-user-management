'use client';

import { useEffect, useState } from 'react';

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bienvenue sur UserFlow
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Votre solution complète de gestion utilisateur. {!isAuthenticated && 'Créez un compte ou connectez-vous pour accéder à votre espace personnel.'}
            </p>

            {!isAuthenticated && (
                <div className="flex gap-4 flex-col sm:flex-row">
                    <a
                        href="/login"
                        className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Commencer
                    </a>
                    <a
                        href="/signup"
                        className="px-8 py-3 text-lg font-medium text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                        Créer un compte
                    </a>
                </div>
            )}

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


const features = [
    {
        title: "Authentification Sécurisée",
        description: "Protocoles de sécurité aux normes de l'industrie pour protéger vos données"
    },
    {
        title: "Gestion de Profil",
        description: "Interface intuitive pour gérer vos informations personnelles"
    },
    {
        title: "Mises à jour Instantanées",
        description: "Modifications de profil en temps réel avec synchronisation fluide"
    }
];
