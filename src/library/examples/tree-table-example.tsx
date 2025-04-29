import React, { useState } from 'react';
import { CollectionTable } from '../table-view/';
import { IconRenderer } from '../common/icons/icon-renderer';

// Sample data type with parent-child relationship
interface Department {
  id: string;
  name: string;
  parentId: string | null;
  manager: string;
  budget: number;
  employees: number;
  location: string;
  established: string;
  status: 'active' | 'inactive' | 'restructuring';
}

// Sample hierarchical data
const sampleData: Department[] = [
  // Root departments
  {
    id: 'dept-1',
    name: 'Executive',
    parentId: null,
    manager: 'John Smith',
    budget: 5000000,
    employees: 10,
    location: 'Headquarters',
    established: '2010-01-01',
    status: 'active'
  },
  {
    id: 'dept-2',
    name: 'Operations',
    parentId: null,
    manager: 'Sarah Johnson',
    budget: 3000000,
    employees: 150,
    location: 'Main Campus',
    established: '2010-03-15',
    status: 'active'
  },
  {
    id: 'dept-3',
    name: 'Finance',
    parentId: null,
    manager: 'Michael Brown',
    budget: 2000000,
    employees: 45,
    location: 'Headquarters',
    established: '2010-02-01',
    status: 'active'
  },
  
  // Second level departments
  {
    id: 'dept-11',
    name: 'Board of Directors',
    parentId: 'dept-1',
    manager: 'Various',
    budget: 1000000,
    employees: 8,
    location: 'Headquarters',
    established: '2010-01-01',
    status: 'active'
  },
  {
    id: 'dept-12',
    name: 'Executive Leadership',
    parentId: 'dept-1',
    manager: 'John Smith',
    budget: 4000000,
    employees: 2,
    location: 'Headquarters',
    established: '2010-01-01',
    status: 'active'
  },
  {
    id: 'dept-21',
    name: 'Manufacturing',
    parentId: 'dept-2',
    manager: 'David Wilson',
    budget: 1500000,
    employees: 80,
    location: 'Factory A',
    established: '2010-05-10',
    status: 'active'
  },
  {
    id: 'dept-22',
    name: 'Logistics',
    parentId: 'dept-2',
    manager: 'Emily Davis',
    budget: 1000000,
    employees: 40,
    location: 'Distribution Center',
    established: '2011-02-15',
    status: 'active'
  },
  {
    id: 'dept-23',
    name: 'Quality Control',
    parentId: 'dept-2',
    manager: 'Robert Martinez',
    budget: 500000,
    employees: 30,
    location: 'Main Campus',
    established: '2012-07-22',
    status: 'active'
  },
  {
    id: 'dept-31',
    name: 'Accounting',
    parentId: 'dept-3',
    manager: 'Lisa Anderson',
    budget: 800000,
    employees: 20,
    location: 'Headquarters',
    established: '2010-02-15',
    status: 'active'
  },
  {
    id: 'dept-32',
    name: 'Financial Planning',
    parentId: 'dept-3',
    manager: 'James Taylor',
    budget: 600000,
    employees: 15,
    location: 'Headquarters',
    established: '2010-03-01',
    status: 'active'
  },
  {
    id: 'dept-33',
    name: 'Treasury',
    parentId: 'dept-3',
    manager: 'Patricia White',
    budget: 400000,
    employees: 10,
    location: 'Headquarters',
    established: '2011-01-10',
    status: 'inactive'
  },
  
  // Third level departments
  {
    id: 'dept-211',
    name: 'Assembly Line A',
    parentId: 'dept-21',
    manager: 'Thomas Moore',
    budget: 800000,
    employees: 40,
    location: 'Factory A',
    established: '2010-06-01',
    status: 'active'
  },
  {
    id: 'dept-212',
    name: 'Assembly Line B',
    parentId: 'dept-21',
    manager: 'Jennifer Lee',
    budget: 700000,
    employees: 40,
    location: 'Factory A',
    established: '2010-06-01',
    status: 'restructuring'
  },
  {
    id: 'dept-221',
    name: 'Shipping',
    parentId: 'dept-22',
    manager: 'Daniel Clark',
    budget: 600000,
    employees: 25,
    location: 'Distribution Center',
    established: '2011-03-01',
    status: 'active'
  },
  {
    id: 'dept-222',
    name: 'Receiving',
    parentId: 'dept-22',
    manager: 'Sophia Rodriguez',
    budget: 400000,
    employees: 15,
    location: 'Distribution Center',
    established: '2011-03-15',
    status: 'active'
  },
  {
    id: 'dept-311',
    name: 'Accounts Payable',
    parentId: 'dept-31',
    manager: 'William Johnson',
    budget: 400000,
    employees: 10,
    location: 'Headquarters',
    established: '2010-03-01',
    status: 'active'
  },
  {
    id: 'dept-312',
    name: 'Accounts Receivable',
    parentId: 'dept-31',
    manager: 'Olivia Martin',
    budget: 400000,
    employees: 10,
    location: 'Headquarters',
    established: '2010-03-01',
    status: 'active'
  }
];

// Custom cell renderers
const cellRenderers = {
  status: (value) => {
    let statusColor = '';
    
    switch (value) {
      case 'active':
        statusColor = 'bg-green-100 text-green-800';
        break;
      case 'inactive':
        statusColor = 'bg-red-100 text-red-800';
        break;
      case 'restructuring':
        statusColor = 'bg-yellow-100 text-yellow-800';
        break;
      default:
        statusColor = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
        {value}
      </span>
    );
  },
  budget: (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  },
  established: (value) => {
    const date = new Date(value);
    return date.toLocaleDateString();
  }
};

export const TreeTableExample: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'tree'>('tree');
  
  // Handle row events
  const handleRowEvent = (event, rowId, row) => {
    console.log('Row event:', event, rowId, row);
  };
  
  // Handle table events
  const handleTableEvent = (event, option, selected) => {
    console.log('Table event:', event, option, selected);
    return false; // Allow default handling
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tree Table Example</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This example demonstrates a hierarchical tree table with parent-child relationships.
          The table uses the 'parentId' field to establish the hierarchy.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <CollectionTable
          data={sampleData}
          title="Department Structure"
          description="Organizational hierarchy with budget and staff information"
        //   datatype="department"
          onRowEvent={handleRowEvent}
          onTableEvent={handleTableEvent}
          cellRenderers={cellRenderers}
          options={{
            search: true,
            pagination: true,
            treeView: viewMode === 'tree',
            
            // Tree configuration
            treeConfig: {
              parentField: 'parentId',
              idField: 'id',
              expandedByDefault: true
            }
          }}
        />
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">View Controls</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-md ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}
          >
            Flat Table View
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`px-4 py-2 rounded-md ${viewMode === 'tree' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}
          >
            Tree View
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreeTableExample;
