import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CollectionForm } from './library/form-view';
import './theme-test.css';

const ThemeTest = () => {
    const [currentTheme, setCurrentTheme] = useState('default');

    const themes = [
        'default',
        'primary',
        'secondary',
        'minimal',
        'filter',
        'schedule',
        'quick-meeting',
        'settings',
        'mintflow'
    ];

    const testSchema = {
        type: 'object',
        title: 'Theme Test Form',
        properties: {
            text: {
                type: 'string',
                title: 'Text Input',
                description: 'This is a text input field'
            },
            number: {
                type: 'number',
                title: 'Number Input',
                description: 'This is a number input field'
            },
            select: {
                type: 'string',
                title: 'Select Input',
                description: 'This is a select input field',
                enum: ['Option 1', 'Option 2', 'Option 3']
            },
            checkbox: {
                type: 'boolean',
                title: 'Checkbox Input',
                description: 'This is a checkbox input field'
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Theme Test</h1>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Theme:
                </label>
                <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={currentTheme}
                    onChange={(e) => setCurrentTheme(e.target.value)}
                    aria-label="Select theme"
                >
                    {themes.map(theme => (
                        <option key={theme} value={theme}>{theme}</option>
                    ))}
                </select>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
                <h2 className="text-lg font-semibold mb-2">Current Theme: {currentTheme}</h2>
                <CollectionForm
                    schema={testSchema}
                    theme={currentTheme}
                    data={{}}
                />
            </div>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<ThemeTest />);
