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

export default TextFieldDemo;