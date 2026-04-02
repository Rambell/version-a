'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DarkMode() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Evita hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1
                bg-gray-200 dark:bg-[var(--color-primary)]"
        >
            <span className={`absolute w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300
                flex items-center justify-center
                ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
            >
                {isDark
                    ? <Moon size={14} className="text-[var(--color-primary)]" />
                    : <Sun size={14} className="text-[var(--color-primary)]" />
                }
            </span>
        </button>
    );
}