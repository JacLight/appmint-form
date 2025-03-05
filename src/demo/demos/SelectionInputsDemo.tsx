import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        checkbox: {
            type: 'boolean',
            title: 'Select Single (Dropdown)',
            description: 'Single selection dropdown',
            enum: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            default: 'Option 1',
            group: 'checkbox',
            'x-control-variant': 'checkbox'
        },
        radio: {
            type: 'boolean',
            'x-control': 'selectsingle',
            description: 'Single selection dropdown',
            group: 'checkbox'
        },
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
            options: [{ label: 'Label 1', value: 'value1' }, { label: 'Label 2', value: 'value2' }, { label: 'Label 3', value: 'value3' }],
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
            'x-control': 'selectmany',
        },
        selectManyCombo: {
            type: 'array',
            title: 'Select Many (Multi-select)',
            description: 'Multiple selection control',
            dataSource: {
                source: 'json',
                value: [
                    { label: 'Option A', value: 'Option-A' },
                    { label: 'Option B', value: 'Option-B' },
                    { label: 'Option C', value: 'Option-C' },
                    { label: 'Option D', value: 'Option-D' },
                    { label: 'Option E', value: 'Option-E' }]
            },
            'x-control': 'selectmany',
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
            'x-control': 'selectmany',
            'x-control-variant': 'checkbox'
        },
        selectManyRadio: {
            type: 'string',
            title: 'Select Single (Radio)',
            description: 'Single selection with radio buttons',
            options: ['Small', 'Medium', 'Large', 'X-Large'],
            default: 'Medium',
            'x-control': 'selectmany',
            'x-control-variant': 'radio'
        },
        switch: {
            type: 'string',
            title: 'Switch',
            description: 'Boolean toggle switch',
            options: ['Small', 'Medium', 'Large', 'X-Large'],
            default: true,
            'x-control': 'selectmany',
            'x-control-variant': 'switch'
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

const SelectionInputsDemo: React.FC = () => {
    return (
        <CollectionForm
            schema={schema}
            id='selection-inputs-demo'
            data={{}}
        />
    );
};

export default SelectionInputsDemo;
