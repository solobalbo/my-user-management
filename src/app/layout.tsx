import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import {ThemeProvider} from "@/components/theme/ThemeProvider";
import {AuthProvider} from "@/contexts/AuthContext";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Système de gestion des utilisateurs',
    description: 'Système de gestion des profils d\'utilisateurs et de l\'authentification',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={inter.className}>
        <AuthProvider>
        <ThemeProvider>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <ThemeToggle />
            <ToastContainer />
        </ThemeProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
