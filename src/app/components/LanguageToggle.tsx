import { Globe, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation, Language } from '../utils/i18n';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LanguageToggle() {
    const { language, setLanguage } = useTranslation();

    const languages: { code: Language; label: string }[] = [
        { code: 'en', label: 'English' },
        { code: 'ta', label: 'தமிழ்' },
        { code: 'hi', label: 'हिन्दी' },
    ];

    return (
        <div className="flex bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-purple-100 shadow-lg shadow-purple-500/10 gap-1.5 ring-1 ring-purple-100/50">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${language === lang.code
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-200"
                            : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
