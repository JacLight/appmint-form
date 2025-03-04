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

const TableDemo: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
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
        </div>
    );
};

export default TableDemo;
