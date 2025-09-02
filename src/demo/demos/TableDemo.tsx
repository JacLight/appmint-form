import React, { useState } from 'react';
import CollectionTable from '../../library/table-view';

// Basic table schema
const basicSchema = {
    type: 'object',
    title: 'Employee Data',
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
        department: {
            type: 'string',
            title: 'Department',
            enum: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
        },
        role: {
            type: 'string',
            title: 'Role'
        },
        salary: {
            type: 'number',
            title: 'Salary'
        },
        startDate: {
            type: 'string',
            title: 'Start Date',
            format: 'date'
        }
    }
};

// Compact/Slim table schema
const slimSchema = {
    type: 'object',
    title: 'Product Inventory',
    properties: {
        sku: {
            type: 'string',
            title: 'SKU'
        },
        product: {
            type: 'string',
            title: 'Product'
        },
        quantity: {
            type: 'number',
            title: 'Qty'
        },
        price: {
            type: 'number',
            title: 'Price'
        },
        inStock: {
            type: 'boolean',
            title: 'In Stock'
        }
    }
};

// Card view schema
const cardSchema = {
    type: 'object',
    title: 'Customer Profiles',
    properties: {
        avatar: {
            type: 'string',
            title: 'Avatar',
            'x-control': 'icon'
        },
        name: {
            type: 'string',
            title: 'Customer Name'
        },
        company: {
            type: 'string',
            title: 'Company'
        },
        email: {
            type: 'string',
            title: 'Email',
            format: 'email'
        },
        phone: {
            type: 'string',
            title: 'Phone',
            'x-control': 'phone'
        },
        status: {
            type: 'string',
            title: 'Status',
            enum: ['VIP', 'Regular', 'New', 'Inactive']
        },
        totalPurchases: {
            type: 'number',
            title: 'Total Purchases'
        },
        lastContact: {
            type: 'string',
            title: 'Last Contact',
            format: 'date'
        }
    }
};

// Advanced table with grouping schema
const advancedSchema = {
    type: 'object',
    title: 'Project Management',
    properties: {
        project: {
            type: 'string',
            title: 'Project'
        },
        client: {
            type: 'string',
            title: 'Client'
        },
        team: {
            type: 'string',
            title: 'Team',
            enum: ['Frontend', 'Backend', 'Mobile', 'DevOps', 'QA']
        },
        lead: {
            type: 'string',
            title: 'Team Lead'
        },
        status: {
            type: 'string',
            title: 'Status',
            enum: ['Planning', 'In Progress', 'Testing', 'Completed', 'On Hold']
        },
        priority: {
            type: 'string',
            title: 'Priority',
            enum: ['Low', 'Medium', 'High', 'Critical']
        },
        budget: {
            type: 'number',
            title: 'Budget'
        },
        spent: {
            type: 'number',
            title: 'Spent'
        },
        deadline: {
            type: 'string',
            title: 'Deadline',
            format: 'date'
        },
        progress: {
            type: 'number',
            title: 'Progress %',
            minimum: 0,
            maximum: 100
        }
    }
};

const TableDemo: React.FC = () => {
    const [activeTable, setActiveTable] = useState<'basic' | 'slim' | 'card' | 'advanced'>('basic');

    const tables = {
        basic: {
            title: 'Basic Table',
            description: 'Standard table with search, sorting, and pagination',
            component: (
                <CollectionTable
                    title="Employee Directory"
                    description="Complete list of all employees with their details"
                    schema={basicSchema}
                    isDemo={true}
                    data={[]}
                    path="employees"
                    filterPreset={[]}
                    options={{
                        search: true,
                        pagination: true,
                        grouping: false,
                        slimRow: false,
                        cardView: false
                    }}
                />
            )
        },
        slim: {
            title: 'Slim/Compact Table',
            description: 'Condensed table view for displaying more data in less space',
            component: (
                <CollectionTable
                    title="Product Inventory"
                    description="Quick overview of product stock levels"
                    schema={slimSchema}
                    isDemo={true}
                    data={[]}
                    path="products"
                    filterPreset={[]}
                    options={{
                        search: true,
                        pagination: true,
                        grouping: false,
                        slimRow: true,
                        cardView: false
                    }}
                />
            )
        },
        card: {
            title: 'Card View Table',
            description: 'Grid-based card layout for rich visual presentation',
            component: (
                <CollectionTable
                    title="Customer Profiles"
                    description="Visual customer information cards"
                    schema={cardSchema}
                    isDemo={true}
                    data={[]}
                    path="customers"
                    filterPreset={[]}
                    options={{
                        search: true,
                        pagination: true,
                        grouping: false,
                        slimRow: false,
                        cardView: true
                    }}
                />
            )
        },
        advanced: {
            title: 'Advanced Table with Grouping',
            description: 'Full-featured table with grouping, filtering, and advanced options',
            component: (
                <CollectionTable
                    title="Project Management Dashboard"
                    description="Comprehensive project tracking with team grouping"
                    schema={advancedSchema}
                    isDemo={true}
                    data={[]}
                    path="projects"
                    filterPreset={[]}
                    options={{
                        search: true,
                        pagination: true,
                        grouping: true,
                        slimRow: false,
                        cardView: false
                    }}
                />
            )
        }
    };

    return (
        <div className="space-y-6">
            {/* Table Type Selector */}
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="w-full text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Select Table Type:
                </h3>
                {Object.entries(tables).map(([key, table]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTable(key as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTable === key
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        {table.title}
                    </button>
                ))}
            </div>

            {/* Table Description */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    {tables[activeTable].title}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                    {tables[activeTable].description}
                </p>
            </div>

            {/* Active Table Display */}
            <div className="h-[600px] border rounded-lg overflow-hidden">
                {tables[activeTable].component}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Basic Table</h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Standard row layout</li>
                        <li>• Sorting & filtering</li>
                        <li>• Pagination</li>
                        <li>• Search functionality</li>
                    </ul>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Slim Table</h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Compact row height</li>
                        <li>• More data visible</li>
                        <li>• Optimized for lists</li>
                        <li>• Reduced padding</li>
                    </ul>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Card View</h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Grid layout</li>
                        <li>• Visual presentation</li>
                        <li>• Rich media support</li>
                        <li>• Mobile friendly</li>
                    </ul>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Advanced Table</h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Row grouping</li>
                        <li>• Advanced filters</li>
                        <li>• Bulk operations</li>
                        <li>• Export options</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TableDemo;