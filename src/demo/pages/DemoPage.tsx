import React, { useState } from 'react';
import { Demo } from '../demos';

interface DemoPageProps {
    demo: Demo;
}

const DemoPage: React.FC<DemoPageProps> = ({ demo }) => {
    const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');

    const DemoComponent = demo.component;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{demo.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">{demo.description}</p>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex">
                    <button
                        className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'demo'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        onClick={() => setActiveTab('demo')}
                    >
                        Demo
                    </button>
                    <button
                        className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'code'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        onClick={() => setActiveTab('code')}
                    >
                        Code
                    </button>
                </div>
            </div>

            {/* Content */}
            <div>
                {activeTab === 'demo' ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <DemoComponent />
                    </div>
                ) : (
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 overflow-auto">
                        <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap">
                            {demo.code}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemoPage;
