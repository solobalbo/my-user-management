'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/');
    };

    return (
        <header className="bg-black/[.05] dark:bg-white/[.06] shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        UserFlow
                    </Link>

                    <div className="flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Inscription
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/profile"
                                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                                >
                                    <UserIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Déconnexion
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
