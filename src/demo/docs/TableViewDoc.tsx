import React, { useState } from 'react';
import { Table, Copy, Check, AlertCircle, CheckCircle } from 'lucide-react';

const CodeBlock = ({ code, language = 'typescript', title }: { code: string; language?: string; title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-8">
      {title && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 px-4 py-2 text-sm font-medium rounded-t-lg">
          {title}
        </div>
      )}
      <div className={`relative bg-gray-950 ${title ? 'rounded-b-lg' : 'rounded-lg'} border border-gray-800`}>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <pre className="p-6 overflow-x-auto">
          <code className={`language-${language} text-sm text-gray-300 font-mono`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

const TableViewDoc: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Main Title */}
      <h1 className="flex items-center gap-4 text-5xl font-bold text-gray-900 dark:text-white mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
          <Table className="h-10 w-10" />
        </div>
        AppMint Table Documentation
      </h1>
      
      {/* Lead Paragraph */}
      <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-4xl">
        AppMint Table is built on TanStack Table. Pass your data and schema, and it handles everything else.
        A powerful, flexible data grid solution for React applications.
      </p>

      {/* Section 1 */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-16 mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-800">
        Basic Usage
      </h2>
      
      <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
        The simplest way to get started is to pass your schema and data to the CollectionTable component:
      </p>

      <CodeBlock 
        title="Basic Implementation"
        code={`import CollectionTable from '../../library/table-view';

// That's it. Pass schema and data.
<CollectionTable
  schema={yourSchema}
  data={yourDataArray}
/>`}
      />

      {/* All Props Section */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-16 mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-800">
        Complete API Reference
      </h2>
      
      <CodeBlock 
        title="All Available Props"
        code={`<CollectionTable
  // Core Props
  schema={schema}              // JSON Schema - defines columns
  data={data}                  // Array of objects to display
  
  // Optional Props
  title="Table Title"          // Table heading
  description="Description"    // Subtitle text
  path="/api/data"            // API endpoint path
  hash={hash}                 // For refresh detection
  
  // Display Options
  options={{
    search: true,             // Show search box (default: true)
    pagination: true,         // Show pagination (default: true)
    grouping: true,           // Enable row grouping (default: true)
    slimRow: false,           // Compact rows
    compact: false,           // Same as slimRow
    cardView: false,          // Card layout instead of table
    treeView: false,          // Tree table view
    parentField: 'parentId',  // For tree view - parent field
    idField: 'id',            // For tree view - id field
    rowActions: []            // Custom row actions
  }}
  
  // Filtering
  filters={filters}            // Column filters
  filterPreset={[]}           // Preset filter conditions
  globalFilter=""             // Global search value
  
  // Data Management
  datatype="users"            // Data type name
  datatypeOptions={[]}        // Datatype dropdown options
  isDemo={false}              // Generate fake data (ignores data prop)
  isLoading={false}           // Loading state
  
  // Selection
  selectedIds={[]}            // Pre-selected row IDs
  
  // Editing
  inlineEdit={false}          // Enable inline editing
  accessMode="edit"           // Access mode
  
  // Custom Rendering
  cellRenderers={{}}          // Custom cell renderers
  itemRenderer={Component}    // Custom item renderer
  
  // Event Handlers
  onRowEvent={(event, rowId, row) => {}}     // Row events
  onTableEvent={(event, option, selected) => {}} // Table events
/>`}
      />

      {/* Events Section */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-16 mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-800">
        Event Handling
      </h2>

      <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mt-8 mb-4">
        Row Events
      </h3>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Available Events:</strong> edit | delete | view | clone | select
        </p>
      </div>

      <CodeBlock 
        title="Row Event Handler"
        code={`type RowEvents = 'edit' | 'delete' | 'view' | 'clone' | 'select';

onRowEvent={(event, rowId, row) => {
  switch(event) {
    case 'edit':
      // Edit row
      break;
    case 'delete':
      // Delete row
      break;
    case 'view':
      // View row details
      break;
    case 'clone':
      // Clone row
      break;
    case 'select':
      // Row selected/deselected
      break;
  }
}}`}
      />

      <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mt-8 mb-4">
        Table Events
      </h3>
      
      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 mb-6">
        <p className="text-sm text-purple-800 dark:text-purple-200">
          <strong>Available Events:</strong> data-request | data-loaded | select | export | refresh | delete | add | datatype
        </p>
      </div>

      <CodeBlock 
        title="Table Event Handler"
        code={`type TableEvents = 'data-request' | 'data-loaded' | 'select' | 
                   'export' | 'refresh' | 'delete' | 'add' | 'datatype';

onTableEvent={(event, option, selected) => {
  switch(event) {
    case 'data-request':
      // Request data (pagination, etc)
      return fetchData(option.page);
    case 'data-loaded':
      // Data loaded notification
      break;
    case 'select':
      // Bulk selection changed
      break;
    case 'export':
      // Export data
      break;
    case 'refresh':
      // Refresh table
      break;
    case 'delete':
      // Delete selected rows
      break;
    case 'add':
      // Add new row
      break;
    case 'datatype':
      // Datatype changed
      break;
  }
}}`}
      />

      {/* View Types */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-16 mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-800">
        Available View Types
      </h2>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Standard Table</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Traditional rows and columns layout</p>
          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">cardView: false, treeView: false</code>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Card View</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Grid-based card layout</p>
          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">cardView: true</code>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Tree Table</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Hierarchical data display</p>
          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">treeView: true</code>
        </div>
      </div>

      {/* Tree View Example */}
      <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mt-8 mb-4">
        Tree Table Configuration
      </h3>

      <CodeBlock 
        title="Tree View Setup"
        code={`<CollectionTable
  schema={schema}
  data={hierarchicalData}
  options={{
    treeView: true,
    parentField: 'parentId',  // Field that references parent
    idField: 'id'             // Unique ID field
  }}
/>

// Your data needs parent-child relationships:
const hierarchicalData = [
  { id: 1, name: 'Root', parentId: null },
  { id: 2, name: 'Child 1', parentId: 1 },
  { id: 3, name: 'Child 2', parentId: 1 },
  { id: 4, name: 'Grandchild', parentId: 2 }
];`}
      />

      {/* Features Section */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-16 mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-800">
        Key Features
      </h2>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="flex gap-3">
          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Demo Mode</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Set <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">isDemo={true}</code> to generate fake data automatically</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">No Header Option</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Don't pass title prop to hide the header completely</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Custom Cell Renderers</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pass custom render functions for any column</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Inline Editing</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Enable inline cell editing with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">inlineEdit={true}</code></p>
          </div>
        </div>
      </div>

      {/* Exported Components */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-16 mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-800">
        Available Exports
      </h2>

      <CodeBlock 
        title="All Exported Components and Types"
        code={`// Components
export { CollectionTable } from './app';
export { InlineEditCell } from './inline-edit-cell';
export { CollectionTableView } from './view-table';
export { CollectionTableCardView } from './view-cards';
export { CollectionTreeView } from './renderer/view-tree';
export { TreeTableView } from './tree-table-view';
export { CollectionTabView } from './view-tabs';
export { ViewSwitcher } from './view-switcher';
export { CollectionViewContainer } from './collection-view-container';
export { TableCardRenderer } from './view-card-renderer';
export { CollectionTableCardPopup } from './view-card-popup';

// Types
export type { RowEvents, TableEvents } from './app';
export type { TreeConfig } from './tree-table-view';
export type { CardFieldsMap } from './index';`}
      />

      {/* Complete Example */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-16 mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-800">
        Complete Working Example
      </h2>

      <CodeBlock 
        title="Full Implementation"
        language="tsx"
        code={`import React from 'react';
import CollectionTable from '../../library/table-view';

const MyTable = () => {
  const schema = {
    type: 'object',
    properties: {
      id: { type: 'number', title: 'ID' },
      name: { type: 'string', title: 'Name' },
      email: { type: 'string', title: 'Email' },
      role: { type: 'string', title: 'Role' },
      status: { 
        type: 'string', 
        title: 'Status',
        enum: ['Active', 'Inactive', 'Pending']
      }
    }
  };

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active' }
  ];

  return (
    <CollectionTable
      title="User Management"
      description="Manage system users and permissions"
      schema={schema}
      data={data}
      options={{
        search: true,
        pagination: true,
        grouping: false
      }}
      onRowEvent={(event, rowId, row) => {
        console.log(\`Row \${event}:\`, rowId, row);
      }}
      onTableEvent={(event, option, selected) => {
        console.log(\`Table \${event}:\`, option, selected);
        if (event === 'data-request') {
          // Fetch and return data
        }
      }}
    />
  );
};

export default MyTable;`}
      />

      {/* Summary Box */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
        <div className="flex gap-4">
          <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Key Takeaway
            </h3>
            <p className="text-blue-800 dark:text-blue-200">
              AppMint Table is a wrapper around TanStack Table. You provide the schema and data,
              and it handles all the complex table functionality. For advanced customization,
              refer to the TanStack Table documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableViewDoc;