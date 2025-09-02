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
        textarea: {
            type: 'string',
            title: 'Text Area',
            description: 'Multi-line text input',
            'x-control-variant': 'textarea',
            default: 'This is a\nmulti-line\ntext area'
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
            default: '# Markdown Heading\n\nThis is a **markdown** editor with *formatting* options.'
        },
        code: {
            type: 'string',
            title: 'Code Editor',
            description: 'Code editor with syntax highlighting',
            'x-control': 'code',
            default: 'function helloWorld() {\n  console.log("Hello, world!");\n}'
        }
    }
};

const TextInputsDemo: React.FC = () => {
    return (
        <CollectionForm
            schema={schema}
            id='text-inputs-demo'
            data={{}}
        />
    );
};

export default TextInputsDemo;
