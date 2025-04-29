import React, { useState } from 'react';
import { TreeTableView } from '../table-view/tree-table-view';

// Sample schema with different field types
const sampleSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Full name of the person"
    },
    age: {
      type: "number",
      description: "Age in years"
    },
    isActive: {
      type: "boolean",
      description: "Whether the user is active"
    },
    role: {
      type: "string",
      enum: ["admin", "editor", "viewer", "guest"],
      description: "User role in the system"
    },
    joinDate: {
      type: "string",
      format: "date",
      description: "Date when the user joined"
    },
    email: {
      type: "string",
      format: "email",
      description: "User's email address"
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Tags associated with the user"
    },
    status: {
      type: "string",
      enum: ["active", "inactive", "pending"],
      description: "Current status"
    }
  }
};

// Sample initial data
const initialData = [
  {
    id: "1",
    name: "John Doe",
    age: 32,
    isActive: true,
    role: "admin",
    joinDate: "2023-01-15",
    email: "john.doe@example.com",
    tags: ["developer", "team-lead"],
    status: "active",
    parentId: null
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 28,
    isActive: true,
    role: "editor",
    joinDate: "2023-03-22",
    email: "jane.smith@example.com",
    tags: ["designer", "ux"],
    status: "active",
    parentId: null
  },
  {
    id: "3",
    name: "Bob Johnson",
    age: 45,
    isActive: false,
    role: "viewer",
    joinDate: "2022-11-05",
    email: "bob.johnson@example.com",
    tags: ["marketing"],
    status: "inactive",
    parentId: "1"
  },
  {
    id: "4",
    name: "Alice Williams",
    age: 36,
    isActive: true,
    role: "editor",
    joinDate: "2023-05-10",
    email: "alice.williams@example.com",
    tags: ["content", "editor"],
    status: "active",
    parentId: "1"
  },
  {
    id: "5",
    name: "Charlie Brown",
    age: 24,
    isActive: true,
    role: "guest",
    joinDate: "2023-07-18",
    email: "charlie.brown@example.com",
    tags: ["intern"],
    status: "pending",
    parentId: "2"
  }
];

// Custom cell renderers for better display
const cellRenderers = {
  'status': (value) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full ${statusColors[value] || ''}`}>
        {value}
      </span>
    );
  },
  'isActive': (value) => {
    return value ? (
      <span className="text-green-600">Active</span>
    ) : (
      <span className="text-red-600">Inactive</span>
    );
  },
  'tags': (value) => {
    if (!Array.isArray(value)) return null;
    
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((tag, index) => (
          <span 
            key={index} 
            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }
};

export const InlineEditExample = () => {
  const [data, setData] = useState(initialData);
  
  // Handle row events including edits
  const handleRowEvent = (event, rowId, row) => {
    if (event === 'edit') {
      console.log('Row edited:', row);
      
      // Update the data state with the edited row
      setData(prevData => 
        prevData.map(item => 
          item.id === rowId ? row : item
        )
      );
      
      // In a real application, you might make an API call here
      // to persist the changes to a backend
      return true; // Return true to indicate the event was handled
    }
    
    // Handle other row events if needed
    return false;
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inline Editing Example</h1>
      <p className="mb-4">
        This example demonstrates the schema-aware inline editing capabilities.
        Click on any cell to edit its value. The appropriate input type will be used
        based on the schema definition.
      </p>
      
      <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <h2 className="font-semibold">Instructions:</h2>
        <ul className="list-disc ml-5">
          <li>Hover over a cell to see the edit button</li>
          <li>Click the edit button to start editing</li>
          <li>Press Enter or click the checkmark to save</li>
          <li>Press Escape or click the X to cancel</li>
        </ul>
      </div>
      
      <TreeTableView
        data={data}
        schema={sampleSchema}
        inlineEdit={true}
        onRowEvent={handleRowEvent}
        cellRenderers={cellRenderers}
        treeConfig={{
          parentField: 'parentId',
          idField: 'id',
          expandedByDefault: true
        }}
        title="Users Table"
        description="A table of users with inline editing enabled"
        options={{
          search: true,
          pagination: true,
          grouping: false
        }}
      />
    </div>
  );
};

export default InlineEditExample;