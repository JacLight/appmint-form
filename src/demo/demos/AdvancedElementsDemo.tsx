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

const AdvancedElementsDemo: React.FC = () => {
    return (
        <CollectionForm
            schema={schema}
            id='advanced-elements-demo'
            data={{}}
        />
    );
};

export default AdvancedElementsDemo;
