import React from 'react';
import { elementToNameMap } from './all-elements';

// Type for custom component registry
type CustomComponentsRegistry = {
    [key: string]: React.ComponentType<any>;
};

// Global registry for custom components
const customComponentsRegistry: CustomComponentsRegistry = {};

/**
 * Register a custom component for a specific field type
 * @param fieldType The field type to register the component for
 * @param component The React component to use for this field type
 */
export const registerCustomComponent = (
    fieldType: string,
    component: React.ComponentType<any>
): void => {
    customComponentsRegistry[fieldType] = component;
};

/**
 * Register multiple custom components at once
 * @param components Object mapping field types to React components
 */
export const registerCustomComponents = (
    components: CustomComponentsRegistry
): void => {
    Object.entries(components).forEach(([fieldType, component]) => {
        registerCustomComponent(fieldType, component);
    });
};

/**
 * Get the component to use for a specific field type
 * @param fieldType The field type to get the component for
 * @returns The React component to use for this field type
 */
export const getComponentForFieldType = (
    fieldType: string
): React.ComponentType<any> => {
    // First check if there's a custom component registered
    if (customComponentsRegistry[fieldType]) {
        return customComponentsRegistry[fieldType];
    }

    // Fall back to the built-in component
    return elementToNameMap[fieldType] || elementToNameMap.default;
};

/**
 * Clear all custom component registrations
 */
export const clearCustomComponents = (): void => {
    Object.keys(customComponentsRegistry).forEach((key) => {
        delete customComponentsRegistry[key];
    });
};
