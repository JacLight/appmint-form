import React from 'react';
import { demoRegistry } from '../demos';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    currentRoute: string;
    onNavigate: (route: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentRoute, onNavigate }) => {
    // Group demos by category
    const demosByCategory = demoRegistry.reduce((acc, demo) => {
        if (!acc[demo.category]) {
            acc[demo.category] = [];
        }
        acc[demo.category].push(demo);
        return acc;
    }, {} as Record<string, typeof demoRegistry>);

    return (
        <aside
            className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-md transition-all duration-300 z-10 ${isOpen ? 'w-64' : 'w-16'
                }`}
        >
            <div className="flex flex-col h-full">
                {/* Logo/Header */}
                <div className="p-4 border-b dark:border-gray-700 flex items-center justify-center">
                    {isOpen ? (
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">AppMint Form</h2>
                    ) : (
                        <span className="text-lg font-bold dark:text-gray-200">AF</span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul>
                        {/* Home Link */}
                        <li>
                            <button
                                onClick={() => onNavigate('home')}
                                className={`w-full text-left px-4 py-2 flex items-center ${currentRoute === 'home'
                                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                aria-label="Home"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {isOpen && <span>Home</span>}
                            </button>
                        </li>

                        {/* Demo Categories */}
                        {Object.entries(demosByCategory).map(([category, demos]) => (
                            <li key={category} className="mt-4">
                                {isOpen && (
                                    <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {category}
                                    </h3>
                                )}
                                <ul>
                                    {demos.map(demo => (
                                        <li key={demo.id}>
                                            <button
                                                onClick={() => onNavigate(demo.id)}
                                                className={`w-full text-left px-4 py-2 flex items-center ${currentRoute === demo.id
                                                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                                aria-label={demo.title}
                                            >
                                                <span className="h-5 w-5 mr-3 flex items-center justify-center">
                                                    {demo.icon || '•'}
                                                </span>
                                                {isOpen && <span>{demo.title}</span>}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
                    {isOpen && <span>AppMint Form Library Demo</span>}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
