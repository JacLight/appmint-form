import React from 'react';
import { elementThemes } from './theme-definitions';
import { ComponentSelectionState } from './types';

interface ThemeSelectorProps {
    selectedTheme: string;
    backgroundColor: string;
    onThemeSelect: (themeName: string) => void;
    onBackgroundColorChange: (color: string) => void;
    componentSelectionState: ComponentSelectionState;
    onComponentToggle: (componentType: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
    selectedTheme,
    backgroundColor,
    onThemeSelect,
    onBackgroundColorChange,
    componentSelectionState,
    onComponentToggle
}) => {
    const { selectedComponents } = componentSelectionState;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-md font-medium mb-4">Pre-made Themes</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
                {Object.keys(elementThemes).map(themeName => (
                    <button
                        key={themeName}
                        onClick={() => onThemeSelect(themeName)}
                        className={`p-4 rounded-md text-sm font-medium ${selectedTheme === themeName ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                        {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                    </button>
                ))}
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <h3 className="text-md font-medium">Background Color:</h3>
                <div className="flex items-center space-x-2 flex-grow">
                    <div
                        className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer"
                        style={{ backgroundColor }}
                    ></div>
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => onBackgroundColorChange(e.target.value)}
                        className="h-8 w-full max-w-xs rounded border border-gray-300"
                        aria-label="Select background color"
                    />
                </div>
            </div>

            {/* Component selection is now handled in the ThemePanel dropdown */}
        </div>
    );
};

export default ThemeSelector;
