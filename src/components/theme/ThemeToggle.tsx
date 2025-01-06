'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-4 left-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <MoonIcon className="h-6 w-6 text-gray-800" />
            ) : (
                <SunIcon className="h-6 w-6 text-gray-200" />
            )}
        </button>
    );
}
