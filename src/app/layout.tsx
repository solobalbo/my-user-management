import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import {ThemeProvider} from "@/components/theme/ThemeProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";

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
        <ThemeProvider>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <ThemeToggle />
        </ThemeProvider>
        </body>
        </html>
    );
}
