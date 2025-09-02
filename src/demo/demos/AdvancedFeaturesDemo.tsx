import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    title: 'Advanced Features Demo',
    properties: {
        // Screen Capture
        screenshot: {
            type: 'string',
            title: 'Screen Capture',
            description: 'Capture screenshot, camera, or media',
            'x-control': 'capture'
        },
        
        // Data Lookup
        customer: {
            type: 'string',
            title: 'Customer Lookup',
            description: 'Search and select from external data source',
            'x-control': 'lookup',
            'x-lookup-url': '/api/customers',
            'x-lookup-display': 'name',
            'x-lookup-value': 'id'
        },
        
        // Cron Expression
        schedule: {
            type: 'string',
            title: 'Schedule (Cron Expression)',
            description: 'Set up recurring task schedule',
            'x-control': 'cron',
            default: '0 0 * * *'
        },
        
        // Rich Text Editor
        content: {
            type: 'string',
            title: 'Rich Content',
            description: 'Rich text editor with formatting options',
            'x-control': 'richtext',
            minLength: 50,
            maxLength: 5000
        },
        
        // Code Editor
        script: {
            type: 'string',
            title: 'Script Editor',
            description: 'Code editor with syntax highlighting',
            'x-control': 'code',
            'x-language': 'javascript',
            default: '// Enter your code here\nfunction example() {\n  console.log("Hello, World!");\n}'
        },
        
        // UUID Generator
        uniqueId: {
            type: 'string',
            title: 'Unique Identifier',
            description: 'Auto-generated UUID',
            'x-control': 'uuid'
        },
        
        // Map Location
        location: {
            type: 'object',
            title: 'Location',
            description: 'Select location on map',
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
        
        // Data Table View
        employees: {
            type: 'array',
            title: 'Employee Data',
            description: 'Tabular data display with sorting and filtering',
            'x-control': 'dataview',
            'x-view-type': 'table',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string', title: 'Name' },
                    department: { type: 'string', title: 'Department' },
                    role: { type: 'string', title: 'Role' },
                    salary: { type: 'number', title: 'Salary' }
                }
            },
            'x-columns': [
                { field: 'name', header: 'Name', sortable: true },
                { field: 'department', header: 'Department', filterable: true },
                { field: 'role', header: 'Role' },
                { field: 'salary', header: 'Salary', format: 'currency' }
            ],
            default: [
                { name: 'John Doe', department: 'Engineering', role: 'Senior Developer', salary: 120000 },
                { name: 'Jane Smith', department: 'Marketing', role: 'Marketing Manager', salary: 95000 },
                { name: 'Bob Johnson', department: 'Sales', role: 'Sales Rep', salary: 75000 }
            ]
        }
    }
};

const AdvancedFeaturesDemo: React.FC = () => {
    return (
        <CollectionForm
            schema={schema}
            id='advanced-features-demo'
            data={{}}
        />
    );
};

export default AdvancedFeaturesDemo;