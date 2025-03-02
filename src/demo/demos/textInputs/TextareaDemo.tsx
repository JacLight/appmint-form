import React from 'react';
import CollectionForm from '../../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        basicTextarea: {
            type: 'string',
            title: 'Basic Textarea',
            description: 'Standard multi-line text input with default settings',
            'x-control-variant': 'textarea',
            default: 'This is a\nmulti-line\ntext area'
        },
        textareaWithRows: {
            type: 'string',
            title: 'Textarea with Rows',
            description: 'Textarea with specified number of visible rows for better content visibility',
            'x-control-variant': 'textarea',
            rows: 4,
            default: 'This textarea has 4 visible rows.\nLine 2\nLine 3\nLine 4'
        },
        textareaWithPlaceholder: {
            type: 'string',
            title: 'Textarea with Placeholder',
            description: 'Textarea with placeholder text that disappears when user starts typing',
            'x-control-variant': 'textarea',
            placeholder: 'Enter multiple lines of text here...',
        },
        styledTextarea: {
            type: 'string',
            title: 'Styled Textarea',
            description: 'Textarea with custom styling using the x-ui property',
            'x-control-variant': 'textarea',
            'x-ui': {
                textarea: {
                    classes: ['bg-gray-50', 'text-blue-800', 'border-blue-300']
                },
                input: {
                    classes: ['font-medium']
                },
                label: {
                    classes: ['text-blue-700']
                },
                control: {
                    classes: ['border-l-4', 'border-l-blue-500', 'pl-2']
                }
            },
            default: 'This textarea has custom styling applied through x-ui configuration.'
        },
        styledWithGradient: {
            type: 'string',
            title: 'Gradient Styled Textarea',
            description: 'Textarea with gradient background styling',
            'x-control-variant': 'textarea',
            'x-ui': {
                input: {
                    classes: ['bg-gradient-to-r', 'from-sky-50', 'to-indigo-50', 'border-indigo-200']
                }
            },
            default: 'This textarea has a gradient background style.'
        },
        textareaWithPrefix: {
            type: 'string',
            title: 'Textarea with Prefix',
            description: 'Textarea with text prefix added before the input area',
            'x-control-variant': 'textarea',
            prefix: 'Note:',
            'x-ui': {
                input: {
                    classes: ['pl-2']
                }
            },
            default: 'This textarea has a prefix that can be used as a label or context indicator.'
        },
        textareaWithSuffix: {
            type: 'string',
            title: 'Textarea with Suffix',
            description: 'Textarea with text suffix added after the input area',
            'x-control-variant': 'textarea',
            suffix: '(optional)',
            default: 'This textarea has a suffix indicating that it\'s optional.'
        },
        requiredTextarea: {
            type: 'string',
            title: 'Required Textarea',
            description: 'Textarea that must be filled in before form submission',
            'x-control-variant': 'textarea',
            required: true
        },
        disabledTextarea: {
            type: 'string',
            title: 'Disabled Textarea',
            description: 'Textarea that cannot be edited or interacted with',
            'x-control-variant': 'textarea',
            disabled: true,
            default: 'This textarea is disabled.\nYou cannot interact with it.'
        },
        readOnlyTextarea: {
            type: 'string',
            title: 'Read-only Textarea',
            description: 'Textarea that displays content but cannot be edited',
            'x-control-variant': 'textarea',
            readOnly: true,
            default: 'This is a read-only textarea.\nYou cannot edit this content, but you can still select and copy it.'
        },
        textareaWithMinMax: {
            type: 'string',
            title: 'Textarea with Min/Max Length',
            description: 'Textarea with character length constraints for input validation',
            'x-control-variant': 'textarea',
            minLength: 10,
            maxLength: 500,
            default: 'This textarea has length constraints. It must be at least 10 characters long.'
        },
        socialTextareaDefault: {
            type: 'string',
            title: 'Social Textarea (Default)',
            description: 'Textarea with social features enabled',
            'x-control-variant': 'textarea',
            default: 'This is a social textarea that supports @mentions and #hashtags.'
        },
        socialTextareaDisabled: {
            type: 'string',
            title: 'Social Textarea with Hidden Social Features',
            description: 'Textarea with social features disabled using x-hide-social property',
            'x-control-variant': 'textarea',
            'x-hide-social': true,
            default: 'This textarea has social features disabled.\nNo special handling for @mentions or #hashtags.'
        }
    }
};

const TextareaDemo = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <CollectionForm
                schema={schema}
                id='textarea-demo'
                data={{}}
            />
        </div>
    );
};

export default TextareaDemo;
