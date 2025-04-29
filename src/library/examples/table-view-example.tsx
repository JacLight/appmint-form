import React, { useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { CollectionViewContainer, CardFieldsMap } from '../table-view';
import { IconRenderer } from '../common/icons/icon-renderer';

// Sample data type
interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
  avatar?: string;
  tags: string[];
}

// Sample data
const sampleData: Person[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Developer',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-01-15',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    tags: ['frontend', 'react']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Designer',
    status: 'active',
    department: 'Design',
    joinDate: '2021-11-03',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    tags: ['ui', 'figma']
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Product Manager',
    status: 'inactive',
    department: 'Product',
    joinDate: '2020-08-21',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    tags: ['strategy', 'roadmap']
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'QA Engineer',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-03-10',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    tags: ['testing', 'automation']
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    role: 'Backend Developer',
    status: 'pending',
    department: 'Engineering',
    joinDate: '2022-05-22',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    tags: ['backend', 'node']
  },
  {
    id: '6',
    name: 'Jessica Taylor',
    email: 'jessica.t@example.com',
    role: 'Marketing Specialist',
    status: 'active',
    department: 'Marketing',
    joinDate: '2021-09-15',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    tags: ['content', 'social']
  },
  {
    id: '7',
    name: 'Robert Martinez',
    email: 'robert.m@example.com',
    role: 'DevOps Engineer',
    status: 'active',
    department: 'Engineering',
    joinDate: '2021-07-08',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    tags: ['infrastructure', 'aws']
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    role: 'HR Manager',
    status: 'inactive',
    department: 'Human Resources',
    joinDate: '2020-03-12',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    tags: ['recruitment', 'policy']
  }
];

// Column helper
const columnHelper = createColumnHelper<Person>();

// Define columns
const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      let statusColor = '';
      
      switch (status) {
        case 'active':
          statusColor = 'bg-green-100 text-green-800';
          break;
        case 'inactive':
          statusColor = 'bg-red-100 text-red-800';
          break;
        case 'pending':
          statusColor = 'bg-yellow-100 text-yellow-800';
          break;
        default:
          statusColor = 'bg-gray-100 text-gray-800';
      }
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('department', {
    header: 'Department',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('joinDate', {
    header: 'Join Date',
    cell: info => {
      const date = new Date(info.getValue());
      return date.toLocaleDateString();
    },
  }),
  columnHelper.accessor('avatar', {
    header: 'Avatar',
    cell: info => {
      const avatar = info.getValue();
      return avatar ? (
        <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <IconRenderer icon="User" className="w-4 h-4 text-gray-500" />
        </div>
      );
    },
  }),
  columnHelper.accessor('tags', {
    header: 'Tags',
    cell: info => {
      const tags = info.getValue();
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      );
    },
  }),
];

// Card fields mapping
const cardFieldsMap: CardFieldsMap = {
  title: 'name',
  subtitle: 'role',
  status: 'status',
  timestamp: 'joinDate',
  image: 'avatar',
  tags: 'tags',
  type: 'department'
};

export const TableViewExample: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [viewType, setViewType] = useState<'table' | 'card' | 'tab'>('table');
  
  // Set up the table
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  
  // Handle row selection
  const handleSelectRow = (row) => {
    const rowId = row.id;
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  
  // Handle row events
  const handleRowEvent = (event, option, selected) => {
    console.log('Row event:', event, option, selected);
  };
  
  // Handle row data events
  const handleRowDataEvent = (event, id, row) => {
    console.log('Row data event:', event, id, row);
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Table View Example</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This example demonstrates the different view types available for displaying tabular data.
          Use the view switcher in the top-right corner to toggle between table, card, and tab views.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <CollectionViewContainer
          table={table}
          selectRow={handleSelectRow}
          selectedRows={selectedRows}
          slimRow={false}
          onRowEvent={handleRowEvent}
          options={{}}
          onRowDataEvent={handleRowDataEvent}
          datatype="person"
          
          // View configuration
          defaultViewType={viewType}
          onViewTypeChange={setViewType}
          
          // Card view configuration
          cardFieldsMap={cardFieldsMap}
          
          // Tab view configuration
          tabField="department"
          contentViewType="card"
        />
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">View Controls</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setViewType('table')}
            className={`px-4 py-2 rounded-md ${viewType === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}
          >
            Table View
          </button>
          <button
            onClick={() => setViewType('card')}
            className={`px-4 py-2 rounded-md ${viewType === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewType('tab')}
            className={`px-4 py-2 rounded-md ${viewType === 'tab' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}
          >
            Tab View
          </button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Selected Rows</h2>
        <div className="text-gray-600 dark:text-gray-300">
          {selectedRows.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedRows.map(id => {
                const person = sampleData.find(p => p.id === id);
                return person ? (
                  <li key={id}>{person.name} ({person.role})</li>
                ) : null;
              })}
            </ul>
          ) : (
            <p>No rows selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableViewExample;
