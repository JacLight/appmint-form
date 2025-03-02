import { twMerge } from 'tailwind-merge';

/**
 * Interface for component styling
 */
export interface ComponentStyling {
    [key: string]: string | ComponentStyling;
}

/**
 * Interface for theme styling
 */
export interface ThemeStyling {
    [componentType: string]: ComponentStyling;
}

/**
 * Built-in themes
 */
export const themes: Record<string, ThemeStyling> = {
    default: {
        // Common styling for all components
        common: {
            container: 'relative my-2',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-500',
        },
        // Text input styling
        text: {
            container: 'relative my-2',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-500',
            icon: 'h-5 w-5 text-gray-400',
            iconContainer: 'absolute inset-y-0 right-0 flex items-center pr-3',
        },
        // Select styling
        select: {
            container: 'relative my-2',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            select: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            option: 'py-2 px-3 cursor-pointer hover:bg-gray-100',
            placeholder: 'text-gray-400',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-500',
        },
        // Checkbox styling
        checkbox: {
            container: 'relative flex items-start my-2',
            input: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
            label: 'ml-3 block text-sm font-medium text-gray-700',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-500',
        },
        // Radio styling
        radio: {
            container: 'relative my-2',
            group: 'space-y-2',
            option: 'relative flex cursor-pointer rounded-lg border p-4 focus:outline-none',
            optionSelected: 'bg-indigo-50 border-indigo-200',
            optionUnselected: 'border-gray-200',
            input: 'h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500',
            label: 'ml-3 block text-sm font-medium text-gray-700',
            description: 'mt-1 text-xs text-gray-500 ml-7',
            error: 'mt-1 text-xs text-red-500',
        },
        // Switch styling
        switch: {
            container: 'relative flex items-center my-2',
            track: 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
            trackOn: 'bg-indigo-600',
            trackOff: 'bg-gray-200',
            thumb: 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            thumbOn: 'translate-x-5',
            thumbOff: 'translate-x-0',
            label: 'ml-3 text-sm font-medium text-gray-700',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-500',
        },
        // Array styling
        array: {
            container: 'relative my-2 space-y-2',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            item: 'relative border border-gray-200 rounded-md p-3',
            addButton: 'mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            removeButton: 'absolute top-2 right-2 text-gray-400 hover:text-gray-500',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-500',
        },
    },
    // Primary theme with blue accents
    primary: {
        common: {
            container: 'relative my-2',
            label: 'block text-sm font-medium text-blue-700 mb-1',
            description: 'mt-1 text-xs text-blue-500',
            error: 'mt-1 text-xs text-red-500',
        },
        text: {
            input: 'block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
        },
        select: {
            select: 'block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            option: 'py-2 px-3 cursor-pointer hover:bg-blue-50',
        },
        checkbox: {
            input: 'h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500',
        },
        radio: {
            optionSelected: 'bg-blue-50 border-blue-200',
            input: 'h-4 w-4 border-blue-300 text-blue-600 focus:ring-blue-500',
        },
        switch: {
            trackOn: 'bg-blue-600',
            trackOff: 'bg-gray-200',
        },
        array: {
            addButton: 'mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        },
    },
    // Secondary theme with green accents
    secondary: {
        common: {
            container: 'relative my-2',
            label: 'block text-sm font-medium text-green-700 mb-1',
            description: 'mt-1 text-xs text-green-500',
            error: 'mt-1 text-xs text-red-500',
        },
        text: {
            input: 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm',
        },
        select: {
            select: 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm',
            option: 'py-2 px-3 cursor-pointer hover:bg-green-50',
        },
        checkbox: {
            input: 'h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-500',
        },
        radio: {
            optionSelected: 'bg-green-50 border-green-200',
            input: 'h-4 w-4 border-green-300 text-green-600 focus:ring-green-500',
        },
        switch: {
            trackOn: 'bg-green-600',
            trackOff: 'bg-gray-200',
        },
        array: {
            addButton: 'mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
        },
    },
    // Minimal theme with subtle styling
    minimal: {
        common: {
            container: 'relative my-1',
            label: 'block text-xs font-medium text-gray-500 mb-1',
            description: 'mt-1 text-xs text-gray-400',
            error: 'mt-1 text-xs text-red-400',
        },
        text: {
            input: 'block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm',
        },
        select: {
            select: 'block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm',
            option: 'py-1 px-2 cursor-pointer hover:bg-gray-50 text-sm',
        },
        checkbox: {
            container: 'relative flex items-start my-1',
            input: 'h-3 w-3 rounded border-gray-300 text-gray-500 focus:ring-gray-400',
            label: 'ml-2 block text-xs font-medium text-gray-500',
        },
        radio: {
            container: 'relative my-1',
            group: 'space-y-1',
            option: 'relative flex cursor-pointer rounded-lg border p-2 focus:outline-none',
            optionSelected: 'bg-gray-50 border-gray-200',
            optionUnselected: 'border-gray-100',
            input: 'h-3 w-3 border-gray-300 text-gray-500 focus:ring-gray-400',
            label: 'ml-2 block text-xs font-medium text-gray-500',
        },
        switch: {
            container: 'relative flex items-center my-1',
            track: 'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1',
            trackOn: 'bg-gray-500',
            trackOff: 'bg-gray-200',
            thumb: 'pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            thumbOn: 'translate-x-4',
            thumbOff: 'translate-x-0',
            label: 'ml-2 text-xs font-medium text-gray-500',
        },
        array: {
            container: 'relative my-1 space-y-1',
            item: 'relative border border-gray-100 rounded-md p-2',
            addButton: 'mt-1 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-400',
            removeButton: 'absolute top-1 right-1 text-gray-300 hover:text-gray-400',
        },
    },
};

/**
 * Get styling for a component part
 * 
 * @param componentType The type of component (text, select, checkbox, etc.)
 * @param part The part of the component to style (container, label, input, etc.)
 * @param themeName The theme to use
 * @param customStyling Custom styling to override theme styling
 * @returns The Tailwind classes for the component part
 */
export function getComponentPartStyling(
    componentType: string,
    part: string,
    themeName: string = 'default',
    customStyling?: ComponentStyling
): string {
    // Get the theme
    const theme = themes[themeName] || themes.default;

    // Get common styling for all components
    const commonStyling = theme.common || {};

    // Get component-specific styling
    const componentStyling = theme[componentType] || {};

    // Combine common and component-specific styling
    let styling = '';

    // Add common styling for the part if it exists (group level)
    if (typeof commonStyling[part] === 'string') {
        styling = commonStyling[part] as string;
    }

    // Add component-specific styling for the part if it exists
    if (typeof componentStyling[part] === 'string') {
        styling = twMerge(styling, componentStyling[part] as string);
    }

    // Add custom styling at the group level if it exists
    if (customStyling && typeof customStyling[part] === 'string') {
        styling = twMerge(styling, customStyling[part] as string);
    }

    // Add custom styling at the specific level if it exists
    // Format: componentType.part (e.g., "text.input")
    const specificKey = `${componentType}.${part}`;
    if (customStyling && typeof customStyling[specificKey] === 'string') {
        styling = twMerge(styling, customStyling[specificKey] as string);
    }

    return styling;
}

/**
 * Get styling for a nested component part
 * 
 * @param componentType The type of component (text, select, checkbox, etc.)
 * @param parent The parent part (e.g., 'item')
 * @param part The part of the component to style (container, label, input, etc.)
 * @param themeName The theme to use
 * @param customStyling Custom styling to override theme styling
 * @returns The Tailwind classes for the component part
 */
export function getNestedComponentPartStyling(
    componentType: string,
    parent: string,
    part: string,
    themeName: string = 'default',
    customStyling?: ComponentStyling
): string {
    // Get the theme
    const theme = themes[themeName] || themes.default;

    // Get component-specific styling
    const componentStyling = theme[componentType] || {};

    // Get parent styling
    const parentStyling = componentStyling[parent] as ComponentStyling || {};

    // Get custom parent styling
    const customParentStyling = customStyling && customStyling[parent] as ComponentStyling;

    // Combine parent and custom parent styling
    let styling = '';

    // Add parent styling for the part if it exists
    if (typeof parentStyling[part] === 'string') {
        styling = parentStyling[part] as string;
    }

    // Add custom parent styling for the part if it exists
    if (customParentStyling && typeof customParentStyling[part] === 'string') {
        styling = twMerge(styling, customParentStyling[part] as string);
    }

    return styling;
}

/**
 * Extract styling from schema
 * 
 * @param schema The schema object
 * @returns The styling object
 */
export function extractStylingFromSchema(schema: any): ComponentStyling | undefined {
    if (!schema) return undefined;

    // Check for styling property
    if (schema.styling) {
        return schema.styling;
    }

    // Check for x-ui property (legacy support)
    if (schema['x-ui']) {
        // Convert x-ui format to styling format
        const styling: ComponentStyling = {};

        // Process each key in x-ui
        Object.keys(schema['x-ui']).forEach(key => {
            const uiItem = schema['x-ui'][key];

            // Convert classes array to string
            if (uiItem.classes && Array.isArray(uiItem.classes)) {
                styling[key] = uiItem.classes.join(' ');
            }

            // TODO: Handle style object if needed
        });

        return styling;
    }

    return undefined;
}
