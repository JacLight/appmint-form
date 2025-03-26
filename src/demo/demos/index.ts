import React from 'react';

// Define the type for a demo
export interface Demo {
    id: string;
    title: string;
    description: string;
    category: string;
    icon?: React.ReactNode;
    component: React.ComponentType<any>;
    code: string;
}

// Import demo components
import TextInputsDemo from './TextInputsDemo';
import NumberInputsDemo from './NumberInputsDemo';
import SelectionInputsDemo from './SelectionInputsDemo';
import DateTimeInputsDemo from './DateTimeInputsDemo';
import SpecialInputsDemo from './SpecialInputsDemo';
import LayoutElementsDemo from './LayoutElementsDemo';
import AdvancedElementsDemo from './AdvancedElementsDemo';
import TableDemo from './TableDemo';
import FormDemo from './FormDemo';
import ThemeEditorDemo from './ThemeEditorDemo';
import MultiFormDemo from './MultiFormDemo';
import CustomComponentsDemo from './CustomComponentsDemo';

// Text Input Elements
import TextFieldDemo from './textInputs/TextFieldDemo';
import TextareaDemo from './textInputs/TextareaDemo';
import RichtextDemo from './textInputs/RichtextDemo';
import { Bus } from 'lucide-react';
import BusinessMadeDemo from './business-nade';
import PageDemo from './page-demo';

// Demo registry
export const demoRegistry: Demo[] = [
    // Multiple Form Instances Demo
    {
        id: 'multi-form-demo',
        title: 'Multiple Form Instances',
        description: 'Demonstrates multiple form instances working independently without overriding each other\'s data.',
        category: 'Views',
        component: MultiFormDemo,
        code: `// Multiple Form Instances Demo Code`
    },

    // Custom Components Demo
    {
        id: 'custom-components-demo',
        title: 'Custom Components',
        description: 'Shows how to create and register custom form components.',
        category: 'Views',
        component: CustomComponentsDemo,
        code: `// Custom Components Demo Code`
    },

    // Theme Editor
    {
        id: 'business-made',
        title: 'Business Made',
        description: 'Create and customize themes for form elements with a live preview.',
        category: 'Tools',
        component: BusinessMadeDemo,
        code: `// Theme Editor Demo Code`
    },

    {
        id: 'paged-schema',
        title: 'Multi Page Form',
        description: 'Create a multi-page form with navigation and validation.',
        category: 'Tools',
        component: PageDemo,
        code: `// Theme Editor Demo Code`
    },
    {
        id: 'theme-editor',
        title: 'Theme Editor',
        description: 'Create and customize themes for form elements with a live preview.',
        category: 'Tools',
        component: ThemeEditorDemo,
        code: `// Theme Editor Demo Code
import React from 'react';
import ThemeEditor from './theme-editor';

// The ThemeEditor component is split into multiple modular components:
// - ThemeSelector: For selecting pre-made themes and component types
// - StyleEditor: For editing individual component styles
// - StyleList: For managing the list of applied styles
// - FormPreview: For previewing the form with applied styles
// - ThemePanel: Container for StyleEditor and StyleList

const ThemeEditorDemo: React.FC = () => {
    return <ThemeEditor />;
};

export default ThemeEditorDemo;

// Main ThemeEditor component (in theme-editor/index.tsx)
// Manages state and coordinates between components
import React, { useState, useEffect } from 'react';
import { ThemeStyling } from '../../../library/form-elements/styling/style-utils';
import { componentParts } from './component-definitions';
import { elementThemes } from './theme-definitions';
import { defaultFormSchema, defaultFormData } from './form-data';
import { StyleItem, ComponentSelectionState, StyleEditorState } from './types';
import ThemeSelector from './ThemeSelector';
import ThemePanel from './ThemePanel';
import FormPreview from './FormPreview';

const ThemeEditor: React.FC = () => {
    // State management for theme, styles, and UI
    const [theme, setTheme] = useState<ThemeStyling>({});
    const [styleItems, setStyleItems] = useState<StyleItem[]>([]);
    const [selectedTheme, setSelectedTheme] = useState('');
    
    // Apply a theme to selected components
    const applyTheme = (themeName: string) => {
        if (!elementThemes[themeName]) return;
        
        setSelectedTheme(themeName);
        const theme = elementThemes[themeName];
        // Apply theme to selected components...
    };
    
    return (
        <div className="grid grid-cols-1 gap-6">
            <h2 className="text-lg font-semibold mb-4">Theme Editor</h2>
            
            {/* Theme Selector Component */}
            <ThemeSelector
                selectedTheme={selectedTheme}
                onThemeSelect={applyTheme}
                // Other props...
            />
            
            <div className="grid grid-cols-3 gap-6">
                {/* Theme Panel Component */}
                <ThemePanel
                    styleItems={styleItems}
                    // Other props...
                />
                
                {/* Form Preview Component */}
                <FormPreview
                    schema={defaultFormSchema}
                    formData={defaultFormData}
                    theme={theme}
                    // Other props...
                />
            </div>
        </div>
    );
};`
    },
    {
        id: 'text-inputs',
        title: 'Text Inputs',
        description: 'Various text input components including text fields, text areas, rich text editors, and more.',
        category: 'Element Groups',
        component: TextInputsDemo,
        code: `// Text Inputs Demo Code
import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        textField: {
            type: 'string',
            title: 'Text Field',
            description: 'Basic text input field',
            default: 'Sample text'
        },
        textFieldWithPlaceholder: {
            type: 'string',
            title: 'Text Field with Placeholder',
            description: 'Text field with placeholder text',
            placeholder: 'Enter some text here'
        },
        textFieldWithPattern: {
            type: 'string',
            title: 'Text Field with Pattern',
            description: 'Text field with pattern validation (only letters)',
            pattern: '^[A-Za-z]+$'
        },
        textFieldWithMinMax: {
            type: 'string',
            title: 'Text Field with Min/Max Length',
            description: 'Text field with minimum and maximum length constraints',
            minLength: 5,
            maxLength: 10
        },
        email: {
            type: 'string',
            title: 'Email Field',
            description: 'Email input with validation',
            format: 'email',
            'x-control': 'email'
        },
        textarea: {
            type: 'string',
            title: 'Text Area',
            description: 'Multi-line text input',
            'x-control': 'textarea',
            default: 'This is a\\nmulti-line\\ntext area'
        },
        richtext: {
            type: 'string',
            title: 'Rich Text Editor',
            description: 'Rich text editor with formatting options',
            'x-control': 'richtext',
            default: '<p>This is a <strong>rich text</strong> editor with <em>formatting</em> options.</p>'
        },
        markdown: {
            type: 'string',
            title: 'Markdown Editor',
            description: 'Markdown text editor',
            'x-control': 'markdown',
            default: '# Markdown Heading\\n\\nThis is a **markdown** editor with *formatting* options.'
        },
        code: {
            type: 'string',
            title: 'Code Editor',
            description: 'Code editor with syntax highlighting',
            'x-control': 'code',
            default: 'function helloWorld() {\\n  console.log("Hello, world!");\\n}'
        }
    }
};

const TextInputsDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='text-inputs-demo'
                data={{}}
            />
    );
};

export default TextInputsDemo;`
    },
    // ...existing group demos...
    {
        id: 'number-inputs',
        title: 'Number Inputs',
        description: 'Number input components including basic number fields, sliders, and range inputs.',
        category: 'Element Groups',
        component: NumberInputsDemo,
        code: `// Number Inputs Demo Code
import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        number: {
            type: 'number',
            title: 'Number Field',
            description: 'Basic number input',
            default: 42
        },
        numberWithMinMax: {
            type: 'number',
            title: 'Number with Min/Max',
            description: 'Number input with minimum and maximum constraints',
            minimum: 0,
            maximum: 100,
            default: 50
        },
        numberWithStep: {
            type: 'number',
            title: 'Number with Step',
            description: 'Number input with step value',
            minimum: 0,
            maximum: 100,
            multipleOf: 5,
            default: 25
        },
        slider: {
            type: 'number',
            title: 'Slider',
            description: 'Slider input for selecting a number',
            'x-control-variant': 'slider',
            minimum: 0,
            maximum: 100,
            default: 50
        },
        numberRange: {
            type: 'object',
            title: 'Number Range',
            description: 'Range input for selecting a range of numbers',
            'x-control': 'numberrange',
            properties: {
                min: {
                    type: 'number',
                    title: 'Min',
                    default: 20
                },
                max: {
                    type: 'number',
                    title: 'Max',
                    default: 80
                }
            }
        }
    }
};

const NumberInputsDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='number-inputs-demo'
                data={{}}
            />
    );
};

export default NumberInputsDemo;`
    },
    {
        id: 'selection-inputs',
        title: 'Selection Inputs',
        description: 'Selection input components including dropdowns, checkboxes, radio buttons, and more.',
        category: 'Element Groups',
        component: SelectionInputsDemo,
        code: `// Selection Inputs Demo Code
import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        selectSingle: {
            type: 'string',
            title: 'Select Single (Dropdown)',
            description: 'Single selection dropdown',
            enum: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            default: 'Option 1'
        },
        selectSingleWithLabels: {
            type: 'string',
            title: 'Select Single with Labels',
            description: 'Single selection dropdown with custom labels',
            enum: ['value1', 'value2', 'value3'],
            enumNames: ['Display Label 1', 'Display Label 2', 'Display Label 3'],
            default: 'value1'
        },
        selectMany: {
            type: 'array',
            title: 'Select Many (Multi-select)',
            description: 'Multiple selection control',
            items: {
                type: 'string',
                enum: ['Option A', 'Option B', 'Option C', 'Option D', 'Option E']
            },
            default: ['Option A', 'Option C'],
            'x-control': 'selectmany'
        },
        selectManyCombo: {
            type: 'array',
            title: 'Select Many (Checkboxes)',
            description: 'Multiple selection with checkboxes',
            items: {
                type: 'string',
                enum: ['Red', 'Green', 'Blue', 'Yellow', 'Purple']
            },
            default: ['Red', 'Blue'],
            'x-control': 'selectmany'
            'x-control-variant': 'combo'
        },
        selectManyCheckbox: {
            type: 'array',
            title: 'Select Many (Checkboxes)',
            description: 'Multiple selection with checkboxes',
            items: {
                type: 'string',
                enum: ['Red', 'Green', 'Blue', 'Yellow', 'Purple']
            },
            default: ['Red', 'Blue'],
            'x-control': 'selectmany'
            'x-control-variant': 'checkbox'
        },
        selectManyRadio: {
            type: 'string',
            title: 'Select Single (Radio)',
            description: 'Single selection with radio buttons',
            enum: ['Small', 'Medium', 'Large', 'X-Large'],
            default: 'Medium',
            'x-control': 'selectmany'
            'x-control-variant': 'radio'
        },
        switch: {
            type: 'boolean',
            title: 'Switch',
            description: 'Boolean toggle switch',
            default: true,
            'x-control': 'selectsingle'
            'x-control': 'switch'
        },
        rating: {
            type: 'number',
            title: 'Rating',
            description: 'Star rating input',
            'x-control': 'rating',
            minimum: 0,
            maximum: 5,
            default: 3
        },
        ranking: {
            type: 'array',
            title: 'Ranking',
            description: 'Drag and drop ranking of items',
            'x-control': 'ranking',
            items: {
                type: 'string'
            },
            default: ['First Item', 'Second Item', 'Third Item', 'Fourth Item']
        }
    }
};

const SelectionInputsDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='selection-inputs-demo'
                data={{}}
            />
    );
};

export default SelectionInputsDemo;`
    },
    {
        id: 'date-time-inputs',
        title: 'Date & Time Inputs',
        description: 'Date and time input components including date pickers, time pickers, and date range pickers.',
        category: 'Element Groups',
        component: DateTimeInputsDemo,
        code: `// Date & Time Inputs Demo Code
import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        date: {
            type: 'string',
            title: 'Date Picker',
            description: 'Date selection input',
            format: 'date',
            'x-control': 'date',
            default: '2025-02-26'
        },
        dateTime: {
            type: 'string',
            title: 'Date Time Picker',
            description: 'Date and time selection input',
            format: 'date-time',
            'x-control': 'date',
            default: '2025-02-26T12:30:00'
        },
        time: {
            type: 'string',
            title: 'Time Picker',
            description: 'Time selection input',
            format: 'time',
            'x-control': 'date',
            default: '12:30:00'
        },
        dateRange: {
            type: 'object',
            title: 'Date Range',
            description: 'Date range selection input',
            'x-control': 'daterange',
            properties: {
                start: {
                    type: 'string',
                    format: 'date',
                    title: 'Start Date',
                    default: '2025-02-20'
                },
                end: {
                    type: 'string',
                    format: 'date',
                    title: 'End Date',
                    default: '2025-03-05'
                }
            }
        },
        cron: {
            type: 'string',
            title: 'Cron Expression',
            description: 'Cron expression editor for scheduling',
            'x-control': 'cron',
            default: '0 0 * * *'
        }
    }
};

const DateTimeInputsDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='date-time-inputs-demo'
                data={{}}
            />
    );
};

export default DateTimeInputsDemo;`
    },
    {
        id: 'special-inputs',
        title: 'Special Inputs',
        description: 'Special input components including color pickers, file uploads, maps, and more.',
        category: 'Element Groups',
        component: SpecialInputsDemo,
        code: `// Special Inputs Demo Code
import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        color: {
            type: 'string',
            title: 'Color Picker',
            description: 'Color selection input',
            'x-control': 'color',
            default: '#3b82f6'
        },
        file: {
            type: 'string',
            title: 'File Upload',
            description: 'File upload input',
            'x-control': 'file'
        },
        multipleFiles: {
            type: 'array',
            title: 'Multiple File Upload',
            description: 'Multiple file upload input',
            items: {
                type: 'string'
            },
            'x-control': 'file'
        },
        map: {
            type: 'object',
            title: 'Map Location',
            description: 'Map location picker',
            'x-control': 'map',
            properties: {
                lat: {
                    type: 'number',
                    title: 'Latitude',
                    default: 40.7128
                },
                lng: {
                    type: 'number',
                    title: 'Longitude',
                    default: -74.0060
                }
            }
        },
        phone: {
            type: 'string',
            title: 'Phone Number',
            description: 'International phone number input with country code',
            'x-control': 'phone',
            default: '+1 (555) 123-4567'
        },
        iconPicker: {
            type: 'string',
            title: 'Icon Picker',
            description: 'Icon selection input',
            'x-control': 'icon',
            default: 'home'
        },
        uuid: {
            type: 'string',
            title: 'UUID',
            description: 'Auto-generated UUID field',
            'x-control': 'uuid'
        },
        socialLinks: {
            type: 'object',
            title: 'Social Links',
            description: 'Social media links input',
            'x-control': 'sociallinks',
            properties: {
                facebook: {
                    type: 'string',
                    title: 'Facebook',
                    default: 'https://facebook.com/example'
                },
                twitter: {
                    type: 'string',
                    title: 'Twitter',
                    default: 'https://twitter.com/example'
                },
                linkedin: {
                    type: 'string',
                    title: 'LinkedIn',
                    default: 'https://linkedin.com/in/example'
                }
            }
        }
    }
};

const SpecialInputsDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='special-inputs-demo'
                data={{}}
            />
    );
};

export default SpecialInputsDemo;`
    },
    {
        id: 'layout-elements',
        title: 'Layout Elements',
        description: 'Layout elements including paragraphs, labels, notices, buttons, and collapsible sections.',
        category: 'Element Groups',
        component: LayoutElementsDemo,
        code: `// Layout Elements Demo Code
import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        paragraph: {
            type: 'null',
            title: 'Paragraph',
            description: 'Static paragraph text element',
            'x-control': 'paragraph',
            'x-content': 'This is a static paragraph element that displays text without any input controls.'
        },
        label: {
            type: 'null',
            title: 'Label',
            description: 'Static label element',
            'x-control': 'label',
            'x-content': 'This is a static label element'
        },
        notice: {
            type: 'null',
            title: 'Notice',
            description: 'Notification or alert element',
            'x-control': 'notice',
            'x-content': 'This is an important notice that stands out to the user.',
            'x-notice-type': 'info' // Can be info, warning, error, success
        },
        button: {
            type: 'null',
            title: 'Button',
            description: 'Clickable button element',
            'x-control': 'button',
            'x-button-text': 'Click Me',
            'x-button-action': 'console.log("Button clicked")'
        },
        collapsible: {
            type: 'object',
            title: 'Collapsible Section',
            description: 'Expandable/collapsible section',
            collapsible: true,
            properties: {
                collapsibleContent: {
                    type: 'string',
                    title: 'Content inside collapsible',
                    default: 'This content is inside a collapsible section'
                }
            }
        }
    }
};

const LayoutElementsDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='layout-elements-demo'
                data={{}}
            />
    );
};

export default LayoutElementsDemo;`
    },
    {
        id: 'advanced-elements',
        title: 'Advanced Elements',
        description: 'Advanced form elements including nested objects, arrays, conditional fields, and more.',
        category: 'Element Groups',
        component: AdvancedElementsDemo,
        code: `// Advanced Elements Demo Code
import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        nestedObject: {
            type: 'object',
            title: 'Nested Object',
            description: 'Object with nested properties',
            properties: {
                name: {
                    type: 'string',
                    title: 'Name',
                    default: 'John Doe'
                },
                age: {
                    type: 'number',
                    title: 'Age',
                    default: 30
                },
                contact: {
                    type: 'object',
                    title: 'Contact Information',
                    properties: {
                        email: {
                            type: 'string',
                            title: 'Email',
                            format: 'email',
                            default: 'john.doe@example.com'
                        },
                        phone: {
                            type: 'string',
                            title: 'Phone',
                            default: '(555) 123-4567'
                        }
                    }
                }
            }
        },
        arrayOfItems: {
            type: 'array',
            title: 'Array of Items',
            description: 'Dynamic array of items that can be added/removed',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        title: 'Item Name',
                        default: 'New Item'
                    },
                    quantity: {
                        type: 'number',
                        title: 'Quantity',
                        default: 1
                    }
                }
            },
            default: [
                { name: 'First Item', quantity: 1 },
                { name: 'Second Item', quantity: 2 }
            ]
        },
        conditionalFields: {
            type: 'object',
            title: 'Conditional Fields',
            description: 'Fields that appear based on conditions',
            properties: {
                showAdditionalFields: {
                    type: 'boolean',
                    title: 'Show additional fields?',
                    default: false
                },
                additionalField1: {
                    type: 'string',
                    title: 'Additional Field 1',
                    default: '',
                    rules: [
                        {
                            effect: 'hide',
                            condition: "!data.conditionalFields.showAdditionalFields"
                        }
                    ]
                },
                additionalField2: {
                    type: 'string',
                    title: 'Additional Field 2',
                    default: '',
                    rules: [
                        {
                            effect: 'hide',
                            condition: "!data.conditionalFields.showAdditionalFields"
                        }
                    ]
                }
            }
        },
        dataLookup: {
            type: 'string',
            title: 'Data Lookup',
            description: 'Lookup data from external source',
            'x-control': 'lookup',
            'x-lookup-options': [
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
            ]
        },
        legalConsent: {
            type: 'boolean',
            title: 'Legal Consent',
            description: 'Legal consent checkbox with terms',
            'x-control': 'legalconsent',
            'x-consent-text': 'I agree to the Terms and Conditions and Privacy Policy.',
            default: false
        },
        generatedField: {
            type: 'string',
            title: 'Generated Field',
            description: 'Field with generated value',
            'x-control': 'generated',
            'x-generator': 'uuid' // Could be uuid, timestamp, etc.
        }
    }
};

const AdvancedElementsDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='advanced-elements-demo'
                data={{}}
            />
    );
};

export default AdvancedElementsDemo;`
    },

    // Views
    {
        id: 'table-demo',
        title: 'Table View',
        description: 'Table view component for displaying and interacting with tabular data.',
        category: 'Views',
        component: TableDemo,
        code: `// Table Demo Code
import React from 'react';
import CollectionTable from '../../library/table-view';

const schema = {
    type: 'object',
    title: 'User Information',
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        email: {
            type: 'string',
            title: 'Email',
            format: 'email'
        },
        age: {
            type: 'number',
            title: 'Age'
        },
        status: {
            type: 'string',
            title: 'Status',
            enum: ['Active', 'Inactive', 'Pending']
        },
        joinDate: {
            type: 'string',
            title: 'Join Date',
            format: 'date'
        },
        subscription: {
            type: 'object',
            title: 'Subscription',
            properties: {
                plan: {
                    type: 'string',
                    title: 'Plan',
                    enum: ['Free', 'Basic', 'Premium', 'Enterprise']
                },
                price: {
                    type: 'number',
                    title: 'Price'
                }
            }
        }
    }
};

const TableDemo = () => {
    return (
            <div className="h-[600px]">
                <CollectionTable
                    title="User Information Table"
                    description="A table displaying user information with various data types"
                    schema={schema}
                    isDemo={true}
                    data={[]} // The isDemo flag will generate fake data, but we need to provide an empty array
                    path="users" // Path for the data (required prop)
                    filterPreset={[]} // Empty filter preset (required prop)
                    options={{
                        search: true,
                        pagination: true,
                        grouping: true,
                        slimRow: false,
                        cardView: false
                    }}
                />
            </div>
    );
};

export default TableDemo;`
    },
    {
        id: 'form-demo',
        title: 'Complete Form',
        description: 'Complete form with various layouts and all available form elements.',
        category: 'Views',
        component: FormDemo,
        code: `// Complete Form Demo Code
import React from 'react';
import CollectionForm from '../../library/form-view';

// Comprehensive schema showcasing all component types and their variants
const schema = {
    type: 'object',
    title: 'Form Library Components Demo',
    'x-layout': {
        main: {
            type: 'tab',
            id: 'main',
            items: [
                { id: 'text-inputs', title: 'Text Inputs' },
                { id: 'number-inputs', title: 'Number Inputs' },
                { id: 'selection-inputs', title: 'Selection Inputs' },
                { id: 'date-time-inputs', title: 'Date & Time' },
                { id: 'special-inputs', title: 'Special Inputs' },
                { id: 'layout-elements', title: 'Layout Elements' },
                { id: 'advanced-elements', title: 'Advanced Elements' }
            ]
        }
    },
    properties: {
        // Text Inputs
        textField: {
            type: 'string',
            title: 'Text Field',
            description: 'Basic text input field',
            default: 'Sample text',
            layoutGroup: 'x-layout.main.items.0'
        },
        email: {
            type: 'string',
            title: 'Email Field',
            description: 'Email input with validation',
            format: 'email',
            'x-control': 'email',
            layoutGroup: 'x-layout.main.items.0'
        },
        richtext: {
            type: 'string',
            title: 'Rich Text Editor',
            description: 'Rich text editor with formatting options',
            'x-control': 'richtext',
            default: '<p>This is a <strong>rich text</strong> editor with <em>formatting</em> options.</p>',
            layoutGroup: 'x-layout.main.items.0'
        },
        
        // Number Inputs
        number: {
            type: 'number',
            title: 'Number Field',
            description: 'Basic number input',
            default: 42,
            layoutGroup: 'x-layout.main.items.1'
        },
        slider: {
            type: 'number',
            title: 'Slider',
            description: 'Slider input for selecting a number',
            'x-control-variant': 'slider',
            minimum: 0,
            maximum: 100,
            default: 50,
            layoutGroup: 'x-layout.main.items.1'
        },
        
        // Selection Inputs
        selectSingle: {
            type: 'string',
            title: 'Select Single (Dropdown)',
            description: 'Single selection dropdown',
            enum: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            default: 'Option 1',
            layoutGroup: 'x-layout.main.items.2'
        },
        selectMany: {
            type: 'array',
            title: 'Select Many (Multi-select)',
            description: 'Multiple selection control',
            items: {
                type: 'string',
                enum: ['Option A', 'Option B', 'Option C', 'Option D', 'Option E']
            },
            default: ['Option A', 'Option C'],
            'x-control': 'selectmany',
            layoutGroup: 'x-layout.main.items.2'
        },
        
        // Date & Time Inputs
        date: {
            type: 'string',
            title: 'Date Picker',
            description: 'Date selection input',
            format: 'date',
            'x-control': 'date',
            default: '2025-02-26',
            layoutGroup: 'x-layout.main.items.3'
        },
        dateRange: {
            type: 'object',
            title: 'Date Range',
            description: 'Date range selection input',
            'x-control': 'daterange',
            properties: {
                start: {
                    type: 'string',
                    format: 'date',
                    title: 'Start Date',
                    default: '2025-02-20'
                },
                end: {
                    type: 'string',
                    format: 'date',
                    title: 'End Date',
                    default: '2025-03-05'
                }
            },
            layoutGroup: 'x-layout.main.items.3'
        },
        
        // Special Inputs
        color: {
            type: 'string',
            title: 'Color Picker',
            description: 'Color selection input',
            'x-control': 'color',
            default: '#3b82f6',
            layoutGroup: 'x-layout.main.items.4'
        },
        map: {
            type: 'object',
            title: 'Map Location',
            description: 'Map location picker',
            'x-control': 'map',
            properties: {
                lat: {
                    type: 'number',
                    title: 'Latitude',
                    default: 40.7128
                },
                lng: {
                    type: 'number',
                    title: 'Longitude',
                    default: -74.0060
                }
            },
            layoutGroup: 'x-layout.main.items.4'
        },
        
        // Layout Elements
        paragraph: {
            type: 'null',
            title: 'Paragraph',
            description: 'Static paragraph text element',
            'x-control': 'paragraph',
            'x-content': 'This is a static paragraph element that displays text without any input controls.',
            layoutGroup: 'x-layout.main.items.5'
        },
        notice: {
            type: 'null',
            title: 'Notice',
            description: 'Notification or alert element',
            'x-control': 'notice',
            'x-content': 'This is an important notice that stands out to the user.',
            'x-notice-type': 'info', // Can be info, warning, error, success
            layoutGroup: 'x-layout.main.items.5'
        },
        
        // Advanced Elements
        nestedObject: {
            type: 'object',
            title: 'Nested Object',
            description: 'Object with nested properties',
            properties: {
                name: {
                    type: 'string',
                    title: 'Name',
                    default: 'John Doe'
                },
                contact: {
                    type: 'object',
                    title: 'Contact Information',
                    properties: {
                        email: {
                            type: 'string',
                            title: 'Email',
                            format: 'email',
                            default: 'john.doe@example.com'
                        }
                    }
                }
            },
            layoutGroup: 'x-layout.main.items.6'
        }
    }
};

const FormDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='form-demo'
                data={{}}
            />
    );
};

export default FormDemo;`
    },

    // Individual Text Input Elements
    {
        id: 'text-field',
        title: 'Text Field',
        description: 'Basic text input field with various configurations, including validation, formatting, and styling options.',
        category: 'Text Inputs',
        component: TextFieldDemo,
        code: `// Text Field Demo Code
import React from 'react';
import CollectionForm from '../../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        basicTextField: {
            type: 'string',
            title: 'Basic Text Field',
            description: 'Standard text input with no special configuration',
            default: 'Default text value'
        },
        textFieldWithPlaceholder: {
            type: 'string',
            title: 'Text Field with Placeholder',
            description: 'Text field with placeholder text',
            placeholder: 'Type something here...'
        },
        requiredTextField: {
            type: 'string',
            title: 'Required Text Field',
            description: 'Text field that must be filled in',
            required: true
        },
        textFieldWithPattern: {
            type: 'string',
            title: 'Text Field with Pattern Validation',
            description: 'Text field that only accepts alphabetic characters',
            pattern: '^[A-Za-z]+$',
            default: 'OnlyLetters'
        },
        textFieldWithMinMax: {
            type: 'string',
            title: 'Text Field with Length Constraints',
            description: 'Text field with minimum and maximum length requirements',
            minLength: 5,
            maxLength: 10,
            default: 'Seven'
        },
        textFieldWithAutocomplete: {
            type: 'string',
            title: 'Text Field with Autocomplete',
            description: 'Text field with browser autocomplete functionality',
            'x-autocomplete': 'email',
            placeholder: 'Enter your email'
        },
        textFieldWithAutofocus: {
            type: 'string',
            title: 'Text Field with Autofocus',
            description: 'Text field that automatically receives focus when the form loads',
            'x-autofocus': true
        },
        textFieldWithCustomWidth: {
            type: 'string',
            title: 'Text Field with Custom Width',
            description: 'Text field with specified width',
            'x-width': '300px',
            default: 'Custom width field'
        },
        textFieldWithPrefix: {
            type: 'string',
            title: 'Text Field with Prefix',
            description: 'Text field with text or icon prefix',
            'x-prefix': '$',
            default: '100'
        },
        textFieldWithSuffix: {
            type: 'string',
            title: 'Text Field with Suffix',
            description: 'Text field with text or icon suffix',
            'x-suffix': '.00',
            default: '99'
        },
        textFieldWithCustomError: {
            type: 'string',
            title: 'Text Field with Custom Error Message',
            description: 'Text field with a custom error message for validation',
            pattern: '^[0-9]+$',
            'x-error-message': 'This field only accepts numbers',
            default: 'abc123'
        },
        textFieldWithTransform: {
            type: 'string',
            title: 'Text Field with Transform',
            description: 'Text field with input transformation (uppercase)',
            'x-transform': 'uppercase',
            default: 'will be uppercase'
        },
        textFieldWithHelperText: {
            type: 'string',
            title: 'Text Field with Helper Text',
            description: 'Text field with additional guidance below the input',
            'x-helper-text': 'This is a helpful tip about using this field.'
        },
        textFieldReadOnly: {
            type: 'string',
            title: 'Read-only Text Field',
            description: 'Text field that cannot be edited',
            default: 'This text cannot be changed',
            readOnly: true
        },
        textFieldDisabled: {
            type: 'string',
            title: 'Disabled Text Field',
            description: 'Text field that is disabled',
            default: 'This field is disabled',
            disabled: true
        },
        textFieldWithClass: {
            type: 'string',
            title: 'Text Field with Custom Class',
            description: 'Text field with custom CSS class',
            'x-class': 'custom-text-field',
            default: 'Custom styled field'
        }
    }
};

const TextFieldDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='text-field-demo'
                data={{}}
            />
    );
};

export default TextFieldDemo;`
    },
    {
        id: 'textarea',
        title: 'Textarea',
        description: 'Multi-line text input field with various configurations, supporting both standard and social textarea variants.',
        category: 'Text Inputs',
        component: TextareaDemo,
        code: `// Textarea Demo Code
import React from 'react';
import CollectionForm from '../../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        basicTextarea: {
            type: 'string',
            title: 'Basic Textarea',
            description: 'Standard multi-line text input',
            'ui:widget': 'textarea',  // This is the standard JSONSchema way to specify textarea
            default: 'This is a\\nmulti-line\\ntext area'
        },
        textareaWithRows: {
            type: 'string',
            title: 'Textarea with Rows',
            description: 'Textarea with specified number of visible rows',
            'ui:widget': 'textarea',
            'ui:options': {
                rows: 8
            },
            default: 'This textarea has 8 visible rows.\\nLine 2\\nLine 3\\nLine 4\\nLine 5\\nLine 6\\nLine 7\\nLine 8'
        },
        textareaWithPlaceholder: {
            type: 'string',
            title: 'Textarea with Placeholder',
            description: 'Textarea with placeholder text',
            'ui:widget': 'textarea',
            'ui:placeholder': 'Enter multiple lines of text here...'
        },
        requiredTextarea: {
            type: 'string',
            title: 'Required Textarea',
            description: 'Textarea that must be filled in',
            'ui:widget': 'textarea',
            required: true
        },
        textareaWithCharCount: {
            type: 'string',
            title: 'Textarea with Character Counter',
            description: 'Textarea showing character count',
            'ui:widget': 'textarea',
            'ui:options': {
                showCounter: true,
                maxLength: 200
            },
            default: 'This textarea shows a character counter. It has a maximum of 200 characters.'
        },
        autoResizingTextarea: {
            type: 'string',
            title: 'Auto-resizing Textarea',
            description: 'Textarea that automatically resizes based on content',
            'ui:widget': 'textarea',
            'ui:options': {
                autoResize: true
            },
            default: 'This textarea will automatically resize as you type more content. Try adding several lines to see how it expands.'
        },
        disabledTextarea: {
            type: 'string',
            title: 'Disabled Textarea',
            description: 'Textarea that is disabled',
            'ui:widget': 'textarea',
            'ui:disabled': true,
            default: 'This textarea is disabled.\\nYou cannot interact with it.'
        },
        readOnlyTextarea: {
            type: 'string',
            title: 'Read-only Textarea',
            description: 'Textarea that cannot be edited',
            'ui:widget': 'textarea',
            'ui:readonly': true,
            default: 'This is a read-only textarea.\\nYou cannot edit this content.'
        },
        styledTextarea: {
            type: 'string',
            title: 'Styled Textarea',
            description: 'Textarea with custom styling',
            'ui:widget': 'textarea',
            'ui:classNames': 'custom-textarea',
            default: 'This textarea has custom styling applied through classNames.'
        },
        // Alternative format using x-control for textarea
        alternativeTextarea: {
            type: 'string',
            title: 'Alternative Textarea Format',
            description: 'Using x-control instead of ui:widget',
            'x-control': 'textarea',
            default: 'This demonstrates the alternative way to specify a textarea using x-control syntax.'
        }
    }
};

const TextareaDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='textarea-demo'
                data={{}}
            />
    );
};

export default TextareaDemo;`
    },
    {
        id: 'richtext',
        title: 'Rich Text Editor',
        description: 'WYSIWYG editor for formatted text with customizable toolbar options, height settings, and read-only capabilities.',
        category: 'Text Inputs',
        component: RichtextDemo,
        code: `// Rich Text Editor Demo Code
import React from 'react';
import CollectionForm from '../../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        basicRichText: {
            type: 'string',
            title: 'Basic Rich Text Editor',
            description: 'Standard rich text editor with default toolbar',
            'x-control': 'richtext',
            default: '<p>This is a <strong>rich text</strong> editor with <em>formatting</em> options.</p>'
        },
        minimalRichText: {
            type: 'string',
            title: 'Minimal Rich Text Editor',
            description: 'Rich text editor with minimal toolbar options',
            'x-control': 'richtext',
            'x-toolbar': 'minimal',
            default: '<p>This is a minimal editor with only basic formatting options.</p>'
        },
        fullRichText: {
            type: 'string',
            title: 'Full-Featured Rich Text Editor',
            description: 'Rich text editor with expanded toolbar and capabilities',
            'x-control': 'richtext',
            'x-toolbar': 'full',
            default: '<h2>Full-Featured Editor</h2><p>This editor includes <strong>all available</strong> formatting options.</p><ul><li>Lists</li><li>Tables</li><li>Images</li><li>And more...</li></ul>'
        },
        customRichText: {
            type: 'string',
            title: 'Custom Rich Text Editor',
            description: 'Rich text editor with custom toolbar configuration',
            'x-control': 'richtext',
            'x-toolbar-buttons': ['bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList'],
            default: '<p>This editor has a <strong>custom toolbar</strong> with specific options.</p>'
        },
        heightRichText: {
            type: 'string',
            title: 'Rich Text Editor with Custom Height',
            description: 'Rich text editor with specified height',
            'x-control': 'richtext',
            'x-height': 300,
            default: '<p>This editor has a specific height of 300px.</p><p>It provides more space for content editing.</p><p>Additional lines will appear within the scrollable area.</p><p>This makes it suitable for longer content.</p>'
        },
        readOnlyRichText: {
            type: 'string',
            title: 'Read-only Rich Text Editor',
            description: 'Rich text content that cannot be edited',
            'x-control': 'richtext',
            readOnly: true,
            default: '<p>This is <strong>read-only</strong> rich text content.</p><p><em>You cannot edit this content.</em></p>'
        }
    }
};

const RichtextDemo = () => {
    return (
            <CollectionForm
                schema={schema}
                id='richtext-demo'
                data={{}}
            />
    );
};

export default RichtextDemo;`
    }
];
