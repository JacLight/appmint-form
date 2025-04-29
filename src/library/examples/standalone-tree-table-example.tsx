import React from 'react';
import { TreeTableView, TreeConfig } from '../table-view';

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

// Define columns for the tree table
const columns = [
  {
    accessorKey: 'name',
    header: 'Department Name',
    size: 200,
  },
  {
    accessorKey: 'manager',
    header: 'Manager',
    size: 150,
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
    size: 120,
  },
  {
    accessorKey: 'employees',
    header: 'Employees',
    size: 100,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    size: 150,
  },
  {
    accessorKey: 'established',
    header: 'Established',
    size: 120,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 120,
  }
];

// Tree configuration
const treeConfig: TreeConfig = {
  parentField: 'parentId',
  idField: 'id',
  expandedByDefault: true
};

export const StandaloneTreeTableExample: React.FC = () => {
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Standalone Tree Table Example</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This example demonstrates the standalone TreeTableView component with hierarchical data.
          The table uses the 'parentId' field to establish the hierarchy.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <TreeTableView
          data={sampleData}
          columns={columns}
          title="Department Structure"
          description="Organizational hierarchy with budget and staff information"
          datatype="department"
          onRowEvent={handleRowEvent}
          onTableEvent={handleTableEvent}
          cellRenderers={cellRenderers}
          treeConfig={treeConfig}
          options={{
            search: true,
            pagination: true,
          }}
        />
      </div>
    </div>
  );
};

export default StandaloneTreeTableExample;
