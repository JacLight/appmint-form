import { FormSchema, FormData } from './types';

// Default form schema for the theme editor demo
export const defaultFormSchema: FormSchema = {
    type: 'object',
    properties: {
        text: {
            type: 'string',
            title: 'Text Input',
            description: 'This is a text input field'
        },
        number: {
            type: 'number',
            title: 'Number Input',
            description: 'This is a number input field'
        },
        select: {
            type: 'string',
            title: 'Select Input',
            description: 'This is a select input field',
            enum: ['Option 1', 'Option 2', 'Option 3']
        },
        selectMany: {
            type: 'array',
            'x-control': 'selectmany',
            title: 'Select Many Input',
            description: 'This is a multi-select input field',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        },
        date: {
            type: 'string',
            title: 'Date Input',
            description: 'This is a date input field',
            format: 'date'
        },
        switch: {
            type: 'boolean',
            title: 'Switch Input',
            description: 'This is a switch input field'
        },
        button: {
            type: 'null',
            title: 'Button',
            description: 'This is a button',
            'x-control': 'button',
            'x-button-text': 'Click Me'
        }
    }
};

// Default form data for the theme editor demo
export const defaultFormData: FormData = {
    text: 'Sample text',
    number: 42,
    select: 'Option 1',
    selectMany: ['Option A', 'Option B'],
    date: '2025-03-02',
    switch: true
};
