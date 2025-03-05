import React from 'react';
import { demoRegistry } from '../demos';

interface HomeProps {
    onNavigate: (route: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    // Group demos by category
    const demosByCategory = demoRegistry.reduce((acc, demo) => {
        if (!acc[demo.category]) {
            acc[demo.category] = [];
        }
        acc[demo.category].push(demo);
        return acc;
    }, {} as Record<string, typeof demoRegistry>);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">AppMint Form Library Demo</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Explore the comprehensive form and table components available in the AppMint Form Library.
                    Click on any card below to see a detailed demo of each component.
                </p>
            </div>

            {/* Categories */}
            {Object.entries(demosByCategory).map(([category, demos]) => (
                <div key={category} className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {demos.map(demo => (
                            <div
                                key={demo.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                onClick={() => onNavigate(demo.id)}
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{demo.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{demo.description}</p>
                                    <div className="flex justify-end">
                                        <button
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onNavigate(demo.id);
                                            }}
                                        >
                                            View Demo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
