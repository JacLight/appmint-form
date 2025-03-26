import React from 'react';
import CollectionForm from '../../library/form-view';

// Simple schema for testing multiple form instances
const formSchema = {
    type: 'object',
    title: 'Test Form',
    properties: {
        name: {
            type: 'string',
            title: 'Name',
            default: ''
        },
        email: {
            type: 'string',
            title: 'Email',
            format: 'email',
            'x-control': 'email'
        },
        message: {
            type: 'string',
            title: 'Message',
            'x-control': 'textarea'
        }
    }
};

const MultiFormDemo: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Multiple Form Instances Demo</h1>
            <p className="mb-6 text-center">This demo shows multiple form instances working independently.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Form 1</h2>
                    <CollectionForm
                        schema={formSchema}
                        id='form-1'
                        data={{ name: 'John Doe', email: 'john@example.com' }}
                    />
                </div>

                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Form 2A Sharing with Form 2B</h2>
                    <CollectionForm
                        schema={formSchema}
                        id='form-2'
                        data={{ name: 'Jane Smith', email: 'jane@example.com' }}
                    />
                </div>
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Form 2B Sharing with Form 2A</h2>
                    <CollectionForm
                        schema={formSchema}
                        id='form-2'
                        data={{ name: 'Jane Smith', email: 'jane@example.com' }}
                    />
                </div>

                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Form 3</h2>
                    <CollectionForm
                        schema={formSchema}
                        id='form-3'
                        data={{ name: 'Bob Johnson', email: 'bob@example.com' }}
                    />
                </div>

                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Form 4</h2>
                    <CollectionForm
                        schema={formSchema}
                        id='form-4'
                        data={{ name: 'Alice Brown', email: 'alice@example.com' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MultiFormDemo;
