import React, { useState, useEffect } from 'react';
import { ThemeStyling } from '../../../library/form-elements/styling/style-utils';
import { componentParts } from './component-definitions';
import { elementThemes } from './theme-definitions';
import { defaultFormSchema, defaultFormData } from './form-data';
import { StyleItem, ComponentSelectionState, StyleEditorState } from './types';
import ThemeSelector from './ThemeSelector';
import ThemePanel from './ThemePanel';
import FormPreview from './FormPreview';

const ThemeEditorDemo: React.FC = () => {
    // Generate a unique ID
    const generateId = () => {
        return Math.random().toString(36).substring(2, 9);
    };


    // State for the form schema and data
    const [schema, setSchema] = useState(defaultFormSchema);
    const [formData, setFormData] = useState(defaultFormData);

    // State for the theme
    const [theme, setTheme] = useState<ThemeStyling>({
        selectsingle: {
            container: 'bg-blue-50 p-4 border-2 border-blue-300 rounded-lg',
            label: 'text-red-600 font-bold mb-2 p-1 border border-red-200',
            dropdown: 'bg-green-100 p-2 border-2 border-green-500 rounded text-green-800',
            option: 'bg-yellow-50 p-2 border-b border-yellow-200 hover:bg-yellow-100',
            description: 'text-purple-600 italic mt-1 p-1 border-l-2 border-purple-300',
            error: 'text-pink-600 font-semibold mt-1 p-1 border border-pink-300 bg-pink-50 rounded'
        },
        selectmany: {
            container: 'bg-indigo-50 p-4 border-2 border-indigo-300 rounded-lg',
            label: 'text-orange-600 font-bold mb-2 p-1 border border-orange-200',
            dropdown: 'bg-teal-100 p-2 border-2 border-teal-500 rounded text-teal-800',
            option: 'bg-amber-50 p-2 border-b border-amber-200 hover:bg-amber-100',
            description: 'text-violet-600 italic mt-1 p-1 border-l-2 border-violet-300',
            error: 'text-rose-600 font-semibold mt-1 p-1 border border-rose-300 bg-rose-50 rounded'
        }
    });

    // State for the style items
    const [styleItems, setStyleItems] = useState<StyleItem[]>([
        // SelectSingle styles
        {
            id: generateId(),
            componentType: 'selectsingle',
            componentPart: 'container',
            classes: 'bg-blue-50 p-4 border-2 border-blue-300 rounded-lg'
        },
        {
            id: generateId(),
            componentType: 'selectsingle',
            componentPart: 'label',
            classes: 'text-red-600 font-bold mb-2 p-1 border border-red-200'
        },
        {
            id: generateId(),
            componentType: 'selectsingle',
            componentPart: 'dropdown',
            classes: 'bg-green-100 p-2 border-2 border-green-500 rounded text-green-800'
        },
        {
            id: generateId(),
            componentType: 'selectsingle',
            componentPart: 'option',
            classes: 'bg-yellow-50 p-2 border-b border-yellow-200 hover:bg-yellow-100'
        },
        {
            id: generateId(),
            componentType: 'selectsingle',
            componentPart: 'description',
            classes: 'text-purple-600 italic mt-1 p-1 border-l-2 border-purple-300'
        },
        {
            id: generateId(),
            componentType: 'selectsingle',
            componentPart: 'error',
            classes: 'text-pink-600 font-semibold mt-1 p-1 border border-pink-300 bg-pink-50 rounded'
        },

        // SelectMany styles
        {
            id: generateId(),
            componentType: 'selectmany',
            componentPart: 'container',
            classes: 'bg-indigo-50 p-4 border-2 border-indigo-300 rounded-lg'
        },
        {
            id: generateId(),
            componentType: 'selectmany',
            componentPart: 'label',
            classes: 'text-orange-600 font-bold mb-2 p-1 border border-orange-200'
        },
        {
            id: generateId(),
            componentType: 'selectmany',
            componentPart: 'dropdown',
            classes: 'bg-teal-100 p-2 border-2 border-teal-500 rounded text-teal-800'
        },
        {
            id: generateId(),
            componentType: 'selectmany',
            componentPart: 'option',
            classes: 'bg-amber-50 p-2 border-b border-amber-200 hover:bg-amber-100'
        },
        {
            id: generateId(),
            componentType: 'selectmany',
            componentPart: 'description',
            classes: 'text-violet-600 italic mt-1 p-1 border-l-2 border-violet-300'
        },
        {
            id: generateId(),
            componentType: 'selectmany',
            componentPart: 'error',
            classes: 'text-rose-600 font-semibold mt-1 p-1 border border-rose-300 bg-rose-50 rounded'
        }
    ]);

    // State for the current style being edited
    const [currentStyle, setCurrentStyle] = useState<StyleItem>({
        id: '',
        componentType: 'text',
        componentPart: 'container',
        classes: ''
    });

    // State for the form key (used to force re-render)
    const [formKey, setFormKey] = useState(0);

    // State for the selected theme
    const [selectedTheme, setSelectedTheme] = useState('');

    // State for the background color
    const [backgroundColor, setBackgroundColor] = useState('#f3f4f6');

    // State for showing the style editor
    const [showStyleEditor, setShowStyleEditor] = useState(false);

    // State for the component checkboxes
    const [selectedComponents, setSelectedComponents] = useState<Record<string, boolean>>({
        root: true,
        layout: true,
        text: true,
        number: true,
        textarea: true,
        selectsingle: true,
        selectmany: true,
        checkbox: true,
        radio: true,
        switch: true,
        button: true,
        date: true,
        color: true,
        file: true,
        shadow: true,
        label: true,
        paragraph: true,
        notice: true,
        markdown: true,
        question: true,
        preview: true,
        richtext: true,
        map: true,
        'legal-consent': true,
        rating: true,
        ranking: true,
        slider: true,
        'slider-range': true,
        'number-range': true,
        'social-textarea': true,
        'data-view': true,
        generated: true,
        'date-time-picker': true,
        code: true,
        cron: true,
        'icon-picker': true,
        uuid: true,
        phone: true,
        'data-lookup-combo': true
    });

    // Apply a theme to all components
    const applyTheme = (themeName: string) => {
        if (!elementThemes[themeName]) return;

        setSelectedTheme(themeName);
        const theme = elementThemes[themeName];
        const newItems: StyleItem[] = [];

        // Add styles for all components in the theme
        Object.entries(theme).forEach(([componentType, componentStyles]) => {
            // Set all components to selected
            setSelectedComponents(prev => ({
                ...prev,
                [componentType]: true
            }));

            // Add styles for each component part
            Object.entries(componentStyles).forEach(([part, classes]) => {
                newItems.push({
                    id: generateId(),
                    componentType,
                    componentPart: part,
                    classes: classes as string
                });
            });
        });

        setStyleItems(newItems);
        applyStyles(newItems);
    };

    // Add a new style item
    const addStyleItem = () => {
        if (!currentStyle.classes.trim()) return;

        const newItem: StyleItem = {
            ...currentStyle,
            id: currentStyle.id || generateId()
        };

        if (currentStyle.id) {
            // Update existing item
            const updatedItems = styleItems.map(item =>
                item.id === currentStyle.id ? newItem : item
            );
            setStyleItems(updatedItems);
            applyStyles(updatedItems);
        } else {
            // Add new item
            const newItems = [...styleItems, newItem];
            setStyleItems(newItems);
            applyStyles(newItems);
        }

        // Reset the current style
        setCurrentStyle({
            id: '',
            componentType: currentStyle.componentType,
            componentPart: currentStyle.componentPart,
            classes: ''
        });
    };

    // Remove a style item
    const removeStyleItem = (id: string) => {
        const updatedItems = styleItems.filter(item => item.id !== id);
        setStyleItems(updatedItems);
        applyStyles(updatedItems);
    };

    // Edit a style item
    const editStyleItem = (item: StyleItem) => {
        setCurrentStyle(item);
        setShowStyleEditor(true);
    };

    // Apply all styles to the theme
    const applyStyles = (items: StyleItem[]) => {
        const newTheme: ThemeStyling = {};

        items.forEach(item => {
            if (!newTheme[item.componentType]) {
                newTheme[item.componentType] = {};
            }

            // Handle nested component styling
            if (item.parentPart) {
                // Create parent object if it doesn't exist
                if (!newTheme[item.componentType][item.parentPart]) {
                    newTheme[item.componentType][item.parentPart] = {};
                }

                // Add child styling to parent
                (newTheme[item.componentType][item.parentPart] as any)[item.componentPart] = item.classes;
            } else {
                // Regular styling
                newTheme[item.componentType][item.componentPart] = item.classes;
            }
        });

        setTheme(newTheme);
        setFormKey(prevKey => prevKey + 1);
    };

    // Reset the theme
    const resetTheme = () => {
        setTheme({});
        setStyleItems([]);
        setCurrentStyle({
            id: '',
            componentType: 'text',
            componentPart: 'container',
            classes: ''
        });
        setSelectedTheme('');
        setFormKey(prevKey => prevKey + 1);
    };

    // Toggle component selection
    const toggleComponent = (componentType: string) => {
        setSelectedComponents(prev => ({
            ...prev,
            [componentType]: !prev[componentType]
        }));
    };

    // Cancel editing
    const cancelEdit = () => {
        setCurrentStyle({
            id: '',
            componentType: 'text',
            componentPart: 'container',
            classes: ''
        });
    };

    // Toggle style editor
    const toggleStyleEditor = () => {
        setShowStyleEditor(!showStyleEditor);
    };

    // Update the current style when component type or part changes
    useEffect(() => {
        if (currentStyle.id && theme[currentStyle.componentType]?.[currentStyle.componentPart]) {
            setCurrentStyle({
                ...currentStyle,
                classes: theme[currentStyle.componentType][currentStyle.componentPart] as string
            });
        }
    }, [currentStyle.componentType, currentStyle.componentPart]);

    // Create component selection state
    const componentSelectionState: ComponentSelectionState = {
        selectedComponents
    };

    // Create style editor state
    const styleEditorState: StyleEditorState = {
        currentStyle,
        showStyleEditor
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Theme Editor</h2>
            </div>

            {/* Pre-made Themes - Moved above form preview */}
            <ThemeSelector
                selectedTheme={selectedTheme}
                backgroundColor={backgroundColor}
                onThemeSelect={applyTheme}
                onBackgroundColorChange={setBackgroundColor}
                componentSelectionState={componentSelectionState}
                onComponentToggle={toggleComponent}
            />

            <div className="grid grid-cols-3 gap-6">
                {/* Theme Editor Panel */}
                <ThemePanel
                    styleItems={styleItems}
                    styleEditorState={styleEditorState}
                    componentSelectionState={componentSelectionState}
                    onStyleChange={setCurrentStyle}
                    onToggleEditor={toggleStyleEditor}
                    onAddStyle={addStyleItem}
                    onCancelEdit={cancelEdit}
                    onEditStyle={editStyleItem}
                    onRemoveStyle={removeStyleItem}
                    onResetStyles={resetTheme}
                />

                {/* Form Preview */}
                <FormPreview
                    schema={schema}
                    formData={formData}
                    theme={theme}
                    formKey={formKey}
                    backgroundColor={backgroundColor}
                    onFormDataChange={setFormData}
                />
            </div>
        </div>
    );
};

export default ThemeEditorDemo;
