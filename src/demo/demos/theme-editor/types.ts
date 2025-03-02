import { ThemeStyling } from '../../../library/form-elements/styling/style-utils';

// Interface for a style item
export interface StyleItem {
    id: string;
    componentType: string;
    componentPart: string;
    parentPart?: string; // Optional parent part for nested styling
    classes: string;
}

// Interface for the form schema
export interface FormSchema {
    type: string;
    properties: Record<string, any>;
}

// Interface for the form data
export interface FormData {
    [key: string]: any;
}

// Interface for the theme editor state
export interface ThemeEditorState {
    theme: ThemeStyling;
    styleItems: StyleItem[];
    selectedTheme: string;
    backgroundColor: string;
    formKey: number;
}

// Interface for the component selection state
export interface ComponentSelectionState {
    selectedComponents: Record<string, boolean>;
}

// Interface for the style editor state
export interface StyleEditorState {
    currentStyle: StyleItem;
    showStyleEditor: boolean;
}
