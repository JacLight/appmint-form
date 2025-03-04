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
 * Extract styling information from a schema object
 * 
 * @param schema The schema object that may contain styling information
 * @returns The extracted styling information as a ComponentStyling object
 */
export function extractStylingFromSchema(schema: any): ComponentStyling | undefined {
    if (!schema) {
        return undefined;
    }

    // Check if the schema has a styling property
    if (schema.styling && typeof schema.styling === 'object') {
        return schema.styling as ComponentStyling;
    }

    // Check if the schema has a style property
    if (schema.style && typeof schema.style === 'object') {
        return schema.style as ComponentStyling;
    }

    // Check if the schema has a theme property with styling
    if (schema.theme && typeof schema.theme === 'object' && schema.theme.styling) {
        return schema.theme.styling as ComponentStyling;
    }

    return undefined;
}

/**
 * Get styling for a component part
 * 
 * @param componentType The type of component (text, select, checkbox, etc.)
 * @param part The part of the component to style (container, label, input, etc.)
 * @param theme The theme to use (can be a string name or a theme object)
 * @param customStyling Custom styling to override theme styling
 * @returns The Tailwind classes for the component part
 */
export function getComponentPartStyling(
    componentType: string,
    part: string,
    theme: string | ThemeStyling = 'default',
    customStyling?: ComponentStyling
): string {
    // Get the theme object
    let themeObj: ThemeStyling;

    if (typeof theme === 'string') {
        // If theme is a string, look it up in the themes object
        themeObj = themes[theme] || themes.default;
    } else if (typeof theme === 'object') {
        // If theme is an object, use it directly
        themeObj = theme;
    } else {
        // Default to the default theme
        themeObj = themes.default;
    }

    // Get common styling for all components
    const commonStyling = themeObj.common || {};

    // Get component-specific styling
    const componentStyling = themeObj[componentType] || {};

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
 * @param theme The theme to use (can be a string name or a theme object)
 * @param customStyling Custom styling to override theme styling
 * @returns The Tailwind classes for the component part
 */
export function getNestedComponentPartStyling(
    componentType: string,
    parent: string,
    part: string,
    theme: string | ThemeStyling = 'default',
    customStyling?: ComponentStyling
): string {
    // Get the theme object
    let themeObj: ThemeStyling;

    if (typeof theme === 'string') {
        // If theme is a string, look it up in the themes object
        themeObj = themes[theme] || themes.default;
    } else if (typeof theme === 'object') {
        // If theme is an object, use it directly
        themeObj = theme;
    } else {
        // Default to the default theme
        themeObj = themes.default;
    }

    // Get common styling for all components
    const commonStyling = themeObj.common || {};

    // Get component-specific styling
    const componentStyling = themeObj[componentType] || {};

    // Get parent styling from common
    const commonParentStyling = commonStyling[parent] as ComponentStyling || {};

    // Get parent styling from component
    const componentParentStyling = componentStyling[parent] as ComponentStyling || {};

    // Get custom parent styling
    const customParentStyling = customStyling && customStyling[parent] as ComponentStyling;

    // Combine parent and custom parent styling
    let styling = '';

    // Add common parent styling for the part if it exists
    if (commonParentStyling && typeof commonParentStyling[part] === 'string') {
        styling = commonParentStyling[part] as string;
    }

    // Add component-specific parent styling for the part if it exists
    if (componentParentStyling && typeof componentParentStyling[part] === 'string') {
        styling = twMerge(styling, componentParentStyling[part] as string);
    }

    // Add custom parent styling for the part if it exists
    if (customParentStyling && typeof customParentStyling[part] === 'string') {
        styling = twMerge(styling, customParentStyling[part] as string);
    }

    return styling;
}

/**
 * Replacement for getElementTheme - provides backward compatibility
 * 
 * @param name The component type
 * @param theme The theme to use
 * @returns An object with classes, style, and className properties
 */
export function getElementTheme(name: string, theme: string = 'default'): { classes: string[], style: any, className: string } {
    if (!name) return null;

    if (theme === 'unstyled') return { classes: [], style: {}, className: '' };

    // Get styling for the component
    const styling = getComponentPartStyling(name, 'container', theme);

    // Split the styling into classes
    const classes = styling.split(' ').filter(Boolean);

    return {
        classes,
        style: {},
        className: styling
    };
}

/**
 * Base theme - the single source of truth for all styling
 * Every component must get its styling from this theme
 */
const baseTheme: ThemeStyling = {
    common: {
        container: 'relative my-2',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        'label-inner': 'text-sm font-medium text-gray-700',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
        helpContainer: 'ml-8',
        icon: 'h-5 w-5 text-gray-400',
        iconContainer: 'flex items-center justify-center',
        'input-container': 'w-full my-1',
    },
    // Add more component styling as needed
    control: {
        container: 'rounded-lg mx-auto mx-auto mt-2',
    },
    button: {
        container: 'relative my-2 flex',
        button: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    layout: {
        container: 'w-full mx-auto my-2',
        section: 'mb-4',
        row: 'flex flex-wrap -mx-2',
        column: 'px-2',
        divider: 'border-t border-gray-200 my-4',
    },
    form: {
        container: 'space-y-4',
        section: 'bg-white shadow rounded-lg p-4',
        header: 'text-lg font-medium text-gray-900 mb-4',
        footer: 'mt-4 flex justify-end space-x-3',
    },
    'form-root': {
        container: 'pb-2',
    },
    collapsible: {
        container: 'text-sm mb-2 mt-4 shadow w-full rounded',
    },
    'control-group': {
        container: 'flex gap-3 items-center mx-auto',
    },
    'control-label': {
        container: 'whitespace-nowrap',
    },
    'control-input': {
        container: 'mt-0',
    },
    help: {
        container: '',
    },
    label: {
        container: '',
    },
    date: {
        container: '',
    },
    array: {
        container: 'relative my-2 space-y-2',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        item: 'relative border border-gray-200 rounded-md p-3',
        addButton: 'mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        removeButton: 'absolute top-2 right-2 text-gray-400 hover:text-gray-500',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    popup: {
        container: '',
    },
    title: {
        container: '',
    },
    input: {
        container: '',
    },
};

/**
 * Filter theme - migrated from themeStyleMap.filter
 */
const filterTheme: ThemeStyling = {
    control: {
        container: 'rounded-lg mx-auto',
    },
    help: {
        container: 'hidden',
    },
    form: {
        container: 'h-full',
    },
    layout: {
        container: 'w-full mx-auto',
    },
    'form-root': {
        container: 'space-y-0',
    },
    date: {
        container: 'w-24',
    },
    collapsible: {
        container: 'text-sm shadow w-full rounded border-b border-b-gray-300 mt-1',
    },
};

/**
 * Schedule theme - migrated from themeStyleMap.schedule
 */
const scheduleTheme: ThemeStyling = {
    control: {
        container: 'rounded-lg mx-auto',
    },
    help: {
        container: 'hidden',
    },
    form: {
        container: 'h-full',
    },
    layout: {
        container: 'w-full mx-auto',
    },
    'form-root': {
        container: 'space-y-0',
    },
    collapsible: {
        container: 'text-sm shadow w-full rounded border-b border-b-gray-300 mt-1',
    },
};

/**
 * Quick meeting theme - migrated from themeStyleMap.quick-meeting
 */
const quickMeetingTheme: ThemeStyling = {
    date: {
        container: '!w-56',
    },
};

/**
 * Settings theme - migrated from themeStyleMap.settings
 */
const settingsTheme: ThemeStyling = {
    layout: {
        container: 'w-full mx-auto my-0',
    },
    'form-root': {
        container: '',
    },
    control: {
        container: 'rounded-lg mx-auto my-0 mt-1',
    },
    'control-group': {
        container: 'justify-start gap-3',
    },
    collapsible: {
        container: 'text-sm shadow w-full rounded border-b border-b-gray-300 mt-1',
    },
};

/**
 * Mintflow theme - migrated from themeStyleMap.mintflow
 */
const mintflowTheme: ThemeStyling = {
    label: {
        container: 'hidden',
    },
    layout: {
        container: 'w-full mx-auto my-0',
    },
    'form-root': {
        container: 'text-xs',
    },
    control: {
        container: 'rounded-lg mx-auto mt-0 my-2',
    },
    'control-group': {
        container: 'justify-start gap-1',
    },
    'control-input': {
        container: 'mt-0',
    },
    'input': {
        container: '!text-xs mt-0',
    },
    'text': {
        container: 'px-2 py-1',
    },
    'number': {
        container: 'px-2 py-1',
    },
    'popup': {
        container: 'w-[800px]',
    },
};

/**
 * Unstyled theme
 */
const unstyledTheme: ThemeStyling = {
    common: {
        container: '',
    },
};

/**
 * Built-in themes
 */
export const themes: Record<string, ThemeStyling> = {
    default: baseTheme,
    filter: filterTheme,
    schedule: scheduleTheme,
    'quick-meeting': quickMeetingTheme,
    settings: settingsTheme,
    mintflow: mintflowTheme,
    unstyled: unstyledTheme,
};
